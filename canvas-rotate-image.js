!(function () {
    /**
     *
     * @param imgBase64  图片的 base64
     * @param rotate 旋转角度
     * @param maxW 压缩的最大宽度
     * @param maxH 压缩的最大高度
     * @param callback 回调函数。
     */
    function rotateImg(imgBase64, rotate, maxW, maxH, callback) {
        var img = new Image();
        img.src = imgBase64;

        if (typeof maxW == 'function') {
            callback = maxW;
            maxW = null;
            maxH = null;
        }

        if (rotate) {
            if (rotate !== '90' && rotate !== '-90' && rotate !== '180') {
                rotate = null;
            }
        }

        img.onload = function (ev) {
            var originWidth = this.width;
            var originHeight = this.height;
            var targetWidth = originWidth;
            var targetHeight = originHeight;

            var maxWidth = maxW || 750, maxHeight = maxH || 750;

            if (originWidth > maxWidth || originHeight > maxHeight) {
                if (originWidth / originHeight > maxWidth / maxHeight) {
                    targetWidth = maxWidth;
                    targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                } else {
                    targetHeight = maxHeight;
                    targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                }
            }

            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            context.clearRect(0, 0, targetWidth, targetHeight);
            context.drawImage(img, 0, 0, originWidth, originHeight, 0, 0, targetWidth, targetHeight);
            var dataUrl = canvas.toDataURL("image/jpeg");

            if (rotate) {
                var angle = 0;
                var canvas2 = document.createElement('canvas');
                var context2 = canvas2.getContext('2d');
                canvas2.width = targetWidth;
                canvas2.height = targetHeight;

                var _setting = {
                    dx: 0,
                    dy: 0,
                    dw: 0,
                    dh: 0,
                    transX: 0,
                    transY: 0
                };
                var scale = 0;
                if (rotate === '180') {
                    angle = Math.PI;
                    _setting.dw = targetWidth;
                    _setting.dh = targetHeight;
                    context2.translate(targetWidth, targetHeight);
                    context2.rotate(angle);
                    context2.translate(0, 0);
                }
                else {
                    if (rotate === '90') {
                        angle = 90 * (Math.PI / 180);
                    }
                    else if (rotate === '-90') {
                        angle = -90 * (Math.PI / 180);
                    }
                    _setting.transX = parseFloat(targetHeight / 2);
                    _setting.transY = parseFloat(targetWidth / 2);
                    _setting.dw = targetHeight;
                    scale = targetWidth / targetHeight;
                    _setting.dh = parseFloat(_setting.dw / scale);
                    _setting.dy = (targetWidth - _setting.dh) / 2;
                    context2.translate(_setting.transX, _setting.transY);
                    context2.rotate(angle);
                    context2.scale(scale, scale);
                }

                /**
                 * ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                 *
                 * image: 可以是一个image ，或者一个canvas
                 * sx: 在画布所绘制图片本身的x轴的距离
                 * sy: 在画布所绘制图片本身y轴的距离
                 * sWidth:表示所绘制图片的宽度范围，一般默认是图片的完整大小。也可以是部分绘制。
                 * sHeight:表示所绘制图片的高度范围，一般默认是图片的完整大小。也可以是部分绘制。
                 * dx:表示在画布x轴的坐标值
                 * dy:表示在画布y轴的坐标值
                 * dWidth: 在画布绘制的宽度
                 * dHeight:在画布绘制的长度
                 */
                context2.drawImage(canvas, 0, 0, targetWidth, targetHeight, _setting.dx - _setting.transX, _setting.dy - _setting.transY, _setting.dw, _setting.dh);
                dataUrl = canvas2.toDataURL("image/jpeg");
            }
            callback(dataUrl);
        };
    }


    // RequireJS && SeaJS
    if (typeof define === 'function') {
        define(function () {
            return rotateImg;
        });
        // NodeJS
    } else if (typeof exports !== 'undefined') {
        module.exports = rotateImg;
    } else {
        // browser
        window.rotateImg = rotateImg;
    }
})();


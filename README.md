# canvas-rotate-image

canvas 旋转并压缩图片，支持 90，-90，180，压缩图片尺寸。

## 使用

```
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
```

见 demo 使用
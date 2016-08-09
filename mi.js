var mi = function (element, nature) {
    var ele = document.querySelector(element);
    if (ele.localName !== 'input') {
        console.warn('节点' + element + ',不是一个输入框');
        return;
    }

    init();

    // 将原先节点禁止写入
    ele.setAttribute('readonly', 'readonly');


    ele.addEventListener('click', function () {

    });

    // 初始化
    function init () {
        var newEle = document.createElement("div");
        newEle.id = 'J_MIBG';
        document.body.appendChild(newEle);
        styles(document.querySelector('#J_MIBG'), {
            'height' : '100px'
        })
    }

    // 样式方法
    function styles (element, css) {
        if (typeof (css) !== 'object') {
            console.warn('function styles 报错 传入css参数不是一个对象');
            return false;
        }
        var cssText = '';

        // 合并对象中的css样式
        for (var i in css) {
            cssText += i + ':' + css[i] + ';'
        }

        element.style.cssText = cssText;

        return true
    }

    // 潜复制
    function exend (target, options) {
        for (name in options) {
            target[name] = options[name];
        }
        return target;
    }
};
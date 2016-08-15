var mi = function (element, nature) {
    var ele = document.querySelector(element),
        availWidth = window.screen.availWidth,
        availHeight = window.screen.availHeight;
    if (ele.localName !== 'input') {
        console.warn('节点' + element + ',不是一个输入框');
        return;
    }

    // 将原先节点禁止写入
    ele.setAttribute('readonly', 'readonly');


    ele.addEventListener('click', function () {
        // 确保键盘弹出
        function waitListener(callback) {
            if (availHeight > window.screen.availHeight) {
                clearInterval(waitTimer);
                callback();
            } else {
                return false
            }
        }

        var waitTimer = setInterval(function() {
            return waitListener(function () {
                createEle({
                    id : 'J_MIBG',
                    styles : {
                        'height': availHeight + 'px',
                        'width': '100%',
                        'background': '#000000',
                        'position': 'fixed',
                        'top': '0',
                        'left': '0'
                    }

                });
            })
        }, 10);

    });

    // 创建节点
    function createEle (nature) {
        var init = {
            id: '',
            class: '',
            styles: {},
            type: 'div',
            parent: '',
            callback: function (){}
        };
        init = exend(init, nature);
        console.log(init);
        var newEle = document.createElement(init.type);
        newEle.id = init.id;
        newEle.className = init.class;
        if (!init.parent)
            document.body.appendChild(newEle);
        else
            document.querySelector(init.parent).appendChild(newEle);

        if (!init.id)
            styles(document.querySelector('.' + init.class.split(' ')[0], init.styles));
        else
            styles(document.querySelector('#' + init.id), init.styles);

        init.callback();
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

    // 隐藏节点
    function hide (element) {
        if (element.style.cssText.indexOf('display:none;') === -1) {
            element.style.cssText = element.style.cssText + 'display:none;';
        }
    };

    // 显示节点
    function show (element) {
        element.style.cssText.split('display:none').join('');
    }
};
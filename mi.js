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
                var newEle = document.createElement("div");
                newEle.id = 'J_MIBG';
                document.body.appendChild(newEle);
                styles(document.querySelector('#J_MIBG'), {
                    'height': availHeight + 'px',
                    'width' : '100%',
                    'background': '#000000',
                    'postion' : 'relative'
                });

                ele.hide();

            })
        }, 10);

    });

    // 创建节点
    function createEle (nature) {
        var nature = exend( {
            id : '',
            class : '',
            styles : {},
            type : 'div'
        },nature);
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
    Object.prototype.hide = function () {
        if (this.style.cssText.indexOf('display:none;') === -1) {
            this.style.cssText = this.style.cssText + 'display:none;';
        }
    };

    // 显示节点
    Object.prototype.show = function () {
        this.style.cssText.split('display:none').join('');
    }
};
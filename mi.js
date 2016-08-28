/*
 * 对于输入框的扩展 v0.0.1
 * Date: 2016-8-21
 * author:大力神
 * http://www.github.com/hehaosen
 */
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

        createEle({
            id: 'J_MIBG',
            styles: {
                'height': availHeight + 'px',
                'width': '100%',
                'background': '#000000',
                'position': 'fixed',
                'top': '0',
                'left': '0'
            },
            'callback': function () {
                var _miBgEle = document.querySelector(('#J_MIBG'));
                _miBgEle.addEventListener('click', function () {
                    ele.value = document.querySelector('#J_migicInput').value;
                    removeElement(this);
                });
                _miBgEle.onkeydown = function (e) {
                    var theEvent = e || window.event;
                    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
                    if (code == 13) {
                        ele.value = document.querySelector('#J_migicInput').value;
                        removeElement(this);
                        return false;
                    }
                    return true
                };
                createEle({
                    id: 'J_migicInput',
                    type: 'input',
                    attr: {
                        'type' : 'text'
                    },
                    styles: {
                        'width': '80%',
                        'margin-left': '-' + availWidth * 0.4 + 'px',
                        'left': '50%',
                        'position': 'absolute',
                        'font-size': availHeight * 0.4 + 'px',
                        'top': '50%',
                        'margin-top': '-' + availHeight * 0.4 + 'px',
                        'background': '#FFFFFF'
                    },
                    parent: '#J_MIBG',
                    'callback': function () {
                        document.querySelector('#J_migicInput').focus();
                    }
                });
            }
        });


        //// 确保键盘弹出
        //function waitListener(callback) {
        //    if (availHeight > window.screen.availHeight) {
        //        clearInterval(waitTimer);
        //        callback();
        //    } else {
        //        return false
        //    }
        //}
        //
        //var waitTimer = setInterval(function() {
        //    return waitListener(function () {
        //
        //    })
        //}, 10);

    });

    // 创建节点
    function createEle (nature) {

        var init = {
            id: '',
            class: '',
            styles: {},
            type: 'div',
            parent: '',
            attr: null,
            callback: function (){}
        };
        init = exend(init, nature);

        var newEle = document.createElement(init.type), selfEle;

        newEle.id = init.id;
        newEle.className = init.class;
        newEle.value = ele.value;
        if (!init.parent)
            document.body.appendChild(newEle);
        else
            document.querySelector(init.parent).appendChild(newEle);


        if (!init.id)
            selfEle = document.querySelector('.' + init.class.split(' ')[0]);
        else
            selfEle = document.querySelector('#' + init.id);


        if (init.attr && typeof (init.attr) == 'object') {
            for ( var key in init.attr) {
                selfEle.setAttribute(key, init.attr[key]);
            }

        }

        styles(selfEle, init.styles);

        init.callback();
    }

    // 样式方法
    function styles (_element, _css) {
        if (typeof (_css) !== 'object') {
            console.warn('function styles 报错 传入css参数不是一个对象');
            return false;
        }
        var _cssText = '';

        // 合并对象中的css样式
        for (var i in _css) {
            _cssText += i + ':' + _css[i] + ';'
        }
        _element.style.cssText = _cssText;

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
    function hide (_element) {
        if (_element.style.cssText.indexOf('display:none;') === -1) {
            _element.style.cssText = _element.style.cssText + 'display:none;';
        }
    }

    // 显示节点
    function show (_element) {
        _element.style.cssText.split('display:none').join('');
    }

    // 删除节点
    function removeElement(_element){
        var _parentElement = _element.parentNode;
        if(_parentElement){
            _parentElement.removeChild(_element);
        }
    }

    // 展现节点内容
    this.value = function () {
        return ele.value;
    };
};
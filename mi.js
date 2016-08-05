var mi = function (element, nature) {
    var ele = document.querySelector(element);

    if (ele.localName !== 'input') {
        console.warn('节点' + element + ',不是一个输入框');
        return;
    }

    //ele.readonly = 'readonly';

    // 潜复制
    function exend (target, options) {
        for (name in options) {
            target[name] = options[name];
        }
        return target;
    }
};
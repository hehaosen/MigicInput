var mi = function (element, nature) {
    var ele = document.querySelector(element);
    if (ele.localName !== 'input') {
        console.warn('节点' + element + ',不是一个输入框');
        return;
    }

    // 将原先节点禁止写入
    ele.setAttribute('readonly', 'readonly');

    ele.addEventListener('click', function () {
        console.log('aaa');
    });

    var newEle = document.createElement("div");
    newEle.id = 'J_MIBG';
    document.body.appendChild(newEle);

    // 潜复制
    function exend (target, options) {
        for (name in options) {
            target[name] = options[name];
        }
        return target;
    }
};
import { add, remove, update } from './base';
var config = {};
var updateConfig = function (data) {
    config.type = data.type ? data.type : config.type;
    config.color = data.color ? data.color : config.color;
    config.height = data.height ? data.height : config.height;
};
export default {
    // 开始从 0 显示进度条，并自动加载进度
    start: function (options) {
        return add(Yox.object.extend({}, options, config));
    },
    // 结束进度条，自动补全剩余进度
    finish: function () {
        update({
            percent: 100
        });
        setTimeout(function () {
            return remove();
        }, 1000);
    },
    // 精确加载到指定的进度
    update: function (data) {
        return update(data);
    },
    config: function (data) {
        updateConfig(data);
    },
    destroy: function () {
        config = {};
        element.remove();
    }
};
//# sourceMappingURL=LoadingBar.js.map
import MsgboxTpl from './template/Msgbox.hbs';
import ConfirmTpl from './template/Confirm.hbs';
import { TRUE, RAW_OBJECT, RAW_STRING, RAW_BOOLEAN, RAW_FUNCTION, RAW_NUMERIC, } from '../constant';
import Yox from 'yox';
import { onTransitionEnd } from '../util';
var id = 0;
var createAlert = function (data) {
    var namespace = '${prefix}msg-alert-' + id++;
    var body = Yox.dom.find('#${prefix}msgbox-wrapper');
    var element = Yox.dom.createElement('div');
    Yox.dom.prop(element, 'id', namespace);
    Yox.dom.append(body, element);
    var instance = new Yox({
        el: '#' + namespace,
        replace: true,
        template: MsgboxTpl,
        props: {
            title: data.title,
            closable: data.closable,
            content: data.content || data,
            button: data.button,
            maskClosable: data.maskClosable,
            onClose: data.onClose,
            width: data.width,
            mask: data.mask
        },
        propTypes: {
            title: {
                type: RAW_STRING,
                value: '温馨提示'
            },
            closable: {
                type: RAW_BOOLEAN,
                value: TRUE
            },
            mask: {
                type: RAW_BOOLEAN,
                value: TRUE
            },
            content: {
                type: RAW_STRING
            },
            button: {
                type: RAW_OBJECT,
                value: {
                    text: '我知道了',
                    type: 'primary'
                }
            },
            maskClosable: {
                type: RAW_BOOLEAN,
                value: TRUE
            },
            onClose: {
                type: RAW_FUNCTION
            },
            width: {
                type: RAW_NUMERIC
            }
        },
        data: function () {
            return {
                isHidden: true
            };
        },
        methods: {
            maskClick: function () {
                if (!this.get('maskClosable')) {
                    return;
                }
                this.hide();
            },
            hide: function () {
                var me = this;
                me.set({
                    isHidden: true
                });
                me.nextTick(function () {
                    onTransitionEnd(me.$el, function () {
                        me.get('onClose') && me.get('onClose')();
                        if (me.$el) {
                            me.destroy();
                        }
                    });
                });
            }
        },
        afterMount: function () {
            var me = this;
            setTimeout(function () {
                if (me.$el) {
                    me.set({
                        isHidden: false
                    });
                }
            }, 300);
        }
    });
};
var createConfirm = function (data) {
    var namespace = '${prefix}msg-confirm-' + id++;
    var body = Yox.dom.find('#${prefix}msgbox-wrapper');
    var element = Yox.dom.createElement('div');
    Yox.dom.prop(element, 'id', namespace);
    Yox.dom.append(body, element);
    var instance = new Yox({
        el: '#' + namespace,
        replace: TRUE,
        template: ConfirmTpl,
        props: {
            title: data.title || data,
            closable: data.closable,
            content: data.content || data,
            buttons: data.buttons,
            maskClosable: data.maskClosable,
            onClose: data.onClose,
            mask: data.mask,
            width: data.width
        },
        propTypes: {
            title: {
                type: RAW_STRING,
                value: '温馨提示'
            },
            closable: {
                type: RAW_BOOLEAN,
                value: TRUE
            },
            mask: {
                type: RAW_BOOLEAN,
                value: TRUE
            },
            content: {
                type: RAW_STRING
            },
            buttons: {
                type: RAW_OBJECT
            },
            maskClosable: {
                type: RAW_BOOLEAN,
                value: TRUE
            },
            onClose: {
                type: RAW_FUNCTION
            },
            width: {
                type: RAW_NUMERIC
            }
        },
        data: function () {
            return {
                isHidden: TRUE
            };
        },
        methods: {
            buttonClick: function (index) {
                this.get('buttons.' + index + '.action').call(instance);
            },
            maskClick: function () {
                if (!this.get('maskClosable')) {
                    return;
                }
                this.hide();
            },
            hide: function () {
                var me = this;
                me.set({
                    isHidden: true
                });
                me.nextTick(function () {
                    onTransitionEnd(me.$el, function () {
                        me.get('onClose') && me.get('onClose')();
                        if (me.$el) {
                            me.destroy();
                        }
                    });
                });
            }
        },
        afterMount: function () {
            var me = this;
            setTimeout(function () {
                me.set({
                    isHidden: false
                });
            }, 300);
        }
    });
};
export var addAlert = function (data) {
    createAlert(data);
};
export var addConfirm = function (data) {
    createConfirm(data);
};
//# sourceMappingURL=base.js.map
import Yox from 'yox';
import template from './template/Panel.hbs';
import { NULL, TRUE, FALSE, RAW_STRING, RAW_BOOLEAN, RAW_NUMERIC, } from '../constant';
import { findComponentUpward, onTransitionEnd, } from '../util';
export default Yox.define({
    propTypes: {
        title: {
            type: RAW_STRING
        },
        name: {
            type: RAW_NUMERIC
        },
        isActive: {
            type: RAW_BOOLEAN
        },
        showIcon: {
            type: RAW_BOOLEAN,
            value: TRUE
        },
        className: {
            type: RAW_STRING
        },
        style: {
            type: RAW_STRING
        }
    },
    template: template,
    data: function (options) {
        var collapse = findComponentUpward(options.parent, '${prefix}collapse');
        return {
            opened: FALSE,
            accordion: collapse
                ? collapse.get('accordion')
                : FALSE
        };
    },
    events: {
        'change.accordion': function (_, data) {
            this.set('accordion', data.accordion);
        },
        'change.opened': function (event, data) {
            if (event.phase === Yox.Event.PHASE_DOWNWARD) {
                var me = this;
                if (data.name === me.get('name')) {
                    data.opened ? me.open() : me.close();
                }
                else if (me.get('accordion')) {
                    me.close();
                }
            }
        }
    },
    methods: {
        click: function () {
            this.fire('change.opened', {
                name: this.get('name'),
                opened: !this.get('opened'),
            });
        },
        close: function () {
            var me = this, opened = me.get('opened');
            if (!opened) {
                return;
            }
            var content = me.$refs.content;
            content.style.height = content.clientHeight + 'px';
            me.nextTick(function () {
                if (!content) {
                    return;
                }
                content.style.height = '0px';
                onTransitionEnd(content, function () {
                    content.style.height = '';
                    me.set('opened', FALSE);
                });
            });
        },
        open: function () {
            var me = this, opened = me.get('opened');
            if (opened) {
                return;
            }
            me.set('opened', TRUE);
            me.nextTick(function () {
                var content = me.$refs.content;
                var height = content.clientHeight;
                content.style.height = '0px';
                setTimeout(function () {
                    if (!content) {
                        return;
                    }
                    content.style.height = height + 'px';
                    onTransitionEnd(content, function () {
                        content.style.height = '';
                    });
                });
            });
        }
    },
    afterMount: function () {
        this.watch('isActive', {
            watcher: function (isActive) {
                if (isActive == NULL) {
                    return;
                }
                this.fire('change.opened', {
                    name: this.get('name'),
                    opened: isActive
                });
            },
            immediate: TRUE
        });
    }
});
//# sourceMappingURL=Panel.js.map
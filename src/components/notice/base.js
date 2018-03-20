let id = 0;

let createNotice = function (data) {
    let namespace = 'bell-notice-' + id++;
    let body = document.getElementById('bell-notice-wrapper');
    let element = document.createElement('div');
    element.setAttribute('id', namespace);
    body.append(element);

    let instance = new Yox({
        el: '#' + namespace,
        replace: true,
        template: `
<div class="bell-notice bell-notice-{{type}}
{{#if isShow}} bell-show{{/if}}
" style="width: {{width}}px;
{{#if right}} right: {{right}}px;{{/if}}">
    <div class="bell-notice-title">
        {{title}}
    </div>
    <div class="bell-notice-desc">
        {{content}}
    </div>
    {{#if duration == 0}}
    <i class="bell-icon bell-notice-close icon-ios-close-empty" on-click="close()"></i>
    {{/if}}
</div>`,
        data: function () {
            let me = this;
            return {
                width: data.width || 320,
                right: 0,

                type: data.type,
                title: data.title,
                content: data.content,
                duration: data.duration,

                isShow: false
            }
        },

        methods: {
            close: function () {
                this.hide();
            },
            fadeIn: function () {
                let me = this;
                me.fadeInFuc = setTimeout(
                    function () {
                        me.set({
                            isShow: true,
                            right: me.right
                        });
                        if (data.duration == 0) {
                            return;
                        }
                        me.fadeOut();
                    },
                    me.fadeInTime
                );
            },
            fadeOut: function () {
                let me = this;
                me.showTimeFuc = setTimeout(
                    function () {
                        me.hide();
                    },
                    me.showTime
                );
            },
            hide: function () {
                let me = this;
                me.set({
                    isShow: false,
                    right: -me.$el.clientWidth
                });
                me.fadeOutFuc = setTimeout(
                    function () {
                        element.remove();
                        if (Yox.is.func(data.onClose)) {
                            data.onClose();
                        }
                        if (instance) {
                            instance.destroy();
                        }
                    },
                    me.fadeOutTime
                );
            }
        },

        afterMount: function () {
            let me = this;

            me.fadeInTime = 300;
            me.fadeOutTime = 300;
            me.showTime = data.duration || 4500;
            me.right = data.right || 15;

            me.set({
                right: -me.$el.clientWidth
            });
            me.fadeIn();
        },

        beforeDestroy: function () {
            let me = this;
            clearTimeout(me.fadeInFuc);
            clearTimeout(me.showTimeFuc);
            clearTimeout(me.fadeOutFuc);
        }
    });
};

export let add = function (data) {
    createNotice(data);
}
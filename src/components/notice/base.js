import NoticeTpl from './template/Notice.html'

let id = 0;

let createNotice = (data) => {

  let namespace = 'bell-notice-' + id++;
  let body = Yox.dom.find('#bell-notice-wrapper');
  let element = document.createElement('div');
  element.setAttribute('id', namespace);
  body.appendChild(element);

  let instance = new Yox({

    el: '#' + namespace,

    replace: true,

    template: NoticeTpl,

    data() {
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
      close() {
        this.hide();
      },
      fadeIn() {
        let me = this;
        me.fadeInFuc = setTimeout(
          () => {
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
      fadeOut() {
        let me = this;
        me.showTimeFuc = setTimeout(
          () => {
            me.hide();
          },
          me.showTime
        );
      },
      hide() {
        let me = this;
        me.set({
          isShow: false,
          right: -me.$el.clientWidth
        });
        me.fadeOutFuc = setTimeout(
          () => {
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

    afterMount() {
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

    beforeDestroy() {
      let me = this;
      clearTimeout(me.fadeInFuc);
      clearTimeout(me.showTimeFuc);
      clearTimeout(me.fadeOutFuc);
    }
  });
};

export let add = (data) => {
  createNotice(data);
};
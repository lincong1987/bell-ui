import Yox from 'yox'

import template from './template/Notice.hbs'

import {
  RAW_STRING,
  RAW_NUMERIC,
  RAW_TYPE_ARRAY,
  RAW_TYPE_PRIMARY,
} from '../constant'

import {
  oneOf,
  onTransitionEnd,
  toNumber,
} from '../util'

const CLASS_VISIBLE = '${prefix}notice-visible'

export default Yox.define({

  template,

  propTypes: {
    title: {
      type: RAW_STRING,
      value: '温馨提示',
    },
    content: {
      type: RAW_STRING,
    },
    type: {
      type: oneOf(RAW_TYPE_ARRAY),
      value: RAW_TYPE_PRIMARY,
    },
    duration: {
      type: RAW_NUMERIC,
      value: 4500,
    },
    width: {
      type: RAW_NUMERIC,
      value: 320,
    },
    right: {
      type: RAW_NUMERIC,
      value: 15,
    },
  },

  methods: {

    show() {

      const me = this

      Yox.dom.addClass(me.$el, CLASS_VISIBLE)

      const duration = toNumber(me.get('duration'))

      if (duration > 0) {
        setTimeout(
          function () {
            if (me.$el) {
              me.hide()
            }
          },
          duration
        )
      }

    },

    hide() {

      const me = this

      Yox.dom.removeClass(me.$el, CLASS_VISIBLE)

      me.nextTick(function () {
        if (!me.$el) {
          return
        }
        onTransitionEnd(
          me.$el,
          function () {
            if (me.$el) {
              me.fire('hide.notice')
            }
          }
        )
      })
    }
  }

})
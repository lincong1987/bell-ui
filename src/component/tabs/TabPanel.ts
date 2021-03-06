import Yox from 'yox'

import template from './template/TabPanel.hbs'

import {
  NULL,
  TRUE,
  FALSE,
  RAW_STRING,
  RAW_BOOLEAN,
} from '../constant'

import {
  findComponentUpward,
} from '../util'

export default Yox.define({

  template,

  name: '${prefix}TabPanel',

  propTypes: {
    name: {
      type: RAW_STRING,
    },
    icon: {
      type: RAW_STRING,
    },
    label: {
      type: RAW_STRING,
      required: TRUE,
    },
    disabled: {
      type: RAW_BOOLEAN,
      value: FALSE,
    },
    className: {
      type: RAW_STRING,
    },
    style: {
      type: RAW_STRING,
    }
  },

  data() {
    return {
      isActive: FALSE,
    }
  },

  watchers: {
    name() {
      this.fire('update.tabPanel')
    },
    icon() {
      this.fire('update.tabPanel')
    },
    label() {
      this.fire('update.tabPanel')
    },
    disabled() {
      this.fire('update.tabPanel')
    },
  },

  events: {
    'change.tabs': function (_, data) {
      this.set({
        isActive: this.get('name') == data.value
      })
    }
  },

  afterMount() {

    const tabs = findComponentUpward(this.$parent, '${prefix}Tabs')

    const index = Yox.array.indexOf(tabs.$children, this)

    let name = this.get('name')
    if (name == NULL) {
      name = '' + index
      this.set('name', name)
    }

    let value = tabs.get('value')
    if (value == NULL && index === 0) {
      value = name
    }

    const isActive = value === name

    this.set('isActive', isActive)

    this.fire(
      'add.tabPanel',
      {
        isActive,
      }
    )

  },

  beforeDestroy() {
    this.fire('remove.tabPanel')
  }

})

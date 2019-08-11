import Yox from 'yox'

import template from './template/TimeLineItem.hbs'

import {
  RAW_STRING,
} from '../constant'

export default Yox.define({
  template,
  propTypes: {
    color: {
      type: RAW_STRING,
      value: '#348EED',
    },
    className: {
      type: RAW_STRING,
    },
    style: {
      type: RAW_STRING,
    }
  },
})

import Yox from 'yox'

import template from './template/Badge.hbs'

import {
  FALSE,
  RAW_STRING,
  RAW_BOOLEAN,
  RAW_NUMBER,
  RAW_TYPE_ARRAY,
  RAW_TYPE_ERROR,
} from '../constant'

import {
  oneOf,
} from '../util'

export default Yox.define({
  propTypes: {
    text: {
      type: RAW_STRING
    },
    count: {
      type: RAW_NUMBER
    },
    maxCount: {
      type: RAW_NUMBER,
      value: 999
    },
    dot: {
      type: RAW_BOOLEAN,
      value: FALSE
    },
    hidden: {
      type: RAW_BOOLEAN,
      value: FALSE
    },
    type: {
      type: oneOf(RAW_TYPE_ARRAY),
      value: RAW_TYPE_ERROR
    },
    status: {
      type: oneOf(RAW_TYPE_ARRAY)
    },
    className: {
      type: RAW_STRING
    },
    style: {
      type: RAW_STRING
    }
  },

  template,

  filters: {
    isNumber: Yox.is.numeric,
    formatText(count: number, maxCount: number) {
      count = Yox.is.numeric(count) ? +count : 0
      maxCount = Yox.is.numeric(maxCount) ? +maxCount : 1
      return maxCount < count
        ? maxCount + '+'
        : count
    }
  }
})

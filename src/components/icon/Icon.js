import template from './template/Icon.html'

export default {
  propTypes: {
    type: {
      type: 'string'
    },
    size: {
      type: 'numeric',
      value: 14
    },
    color: {
      type: 'string'
    },
    spin: {
      type: 'Boolean',
      value: false
    },
    rotate: {
      type: 'numeric',
      value: 0
    },
    className: {
      type: 'string'
    },
    style: {
      type: 'string'
    }
  },
  template
};
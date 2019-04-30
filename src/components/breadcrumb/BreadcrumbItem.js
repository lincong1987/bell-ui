import BreadcrumbItemTpl from './BreadcrumbItem.html'

export default {
  template: BreadcrumbItemTpl,

  propTypes: {
    className: {
      type: 'string'
    },
    style: {
      type: 'string'
    },
    to: {
      type: 'string'
    },
    separator: {
      type: 'string'
    }
  }
};
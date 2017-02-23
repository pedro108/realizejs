import React from 'react';
import i18n from './i18n/i18n';

export default {
  ...React.PropTypes,
  localizedString: function(props, propName, componentName) {
    var value = props[propName];
    if (value === null || value === undefined || (typeof value === "string" && value.length === 0)) {
      return null;
    }

    var translatedValue = i18n.t(value);
    if (typeof value !== "string" || typeof translatedValue !== "string" || translatedValue.length === 0) {
      return new Error('Property ' + propName + ' from ' + componentName + ' is not a localized string.');
    }
  },
  component: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.element, React.PropTypes.string]),
}

'use strict';

module.exports = function(options) {
  this.name = options.name;

  let expression = /^[A-Z]+$/g;

  this.validate = word => {
    return !expression.test(word);
  };

  this.format = word => {
    return word.toLowerCase();
  };
};

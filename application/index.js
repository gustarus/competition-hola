'use strict';

const validators = {
  abbreviation: require('./validators/abbreviation'),
  apostrophe: require('./validators/apostrophe'),
  grams: require('./validators/grams'),
  forest: require('./validators/forest'),
  length: require('./validators/length'),
  neural: require('./validators/neural'),
  sounds: require('./validators/sounds'),
  string: require('./validators/string')
};

const Validator = require('./validator');

module.exports = new Validator({

  filters: [
    new validators.string({
      name: 'string'
    }),

    new validators.abbreviation({
      name: 'abbreviation'
    })
  ],

  validators: [
    new validators.string({
      name: 'string'
    }),

    new validators.abbreviation({
      name: 'abbreviation'
    }),

    new validators.apostrophe({
      name: 'apostrophe'
    }),

    new validators.length({
      name: 'length',
      min: 3,
      max: 15
    }),

    new validators.sounds({
      name: 'sounds',
      vowelsThreshold: 4,
      consonantsThreshold: 4
    }),

    new validators.grams({
      name: 'grams',
      lengthInner: 3,
      lengthBegin: 3,
      lengthEnd: 2
    }),

    new validators.forest({
      name: 'forest',
      trees: [
        {positions: [0, 1, 2, 3]}
      ]
    }),

    new validators.neural({
      name: 'neural',
      trainTimes: 33,
      lengthThreshold: 10,
      perceptron: {
        threshold: 1,
        learningRate: 0.1
      }
    })
  ]
});

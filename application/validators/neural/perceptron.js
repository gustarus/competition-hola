'use strict';

module.exports = function(options) {
  options || (options = {});
  this.weights = options.weights ? options.weights.slice() : [];
  this.threshold = options.threshold || 1;
  this.learningRate = options.learningRate || 0.1;

  let data = [];

  this.retrain = () => {
    let length = data.length;
    let percent = Math.floor(length / 100);
    let success = true;
    for (let i = 0; i < length; i++) {
      if ((i / percent) % 10  === 0) {
        this.log(`Retrain complete: ${i / percent}%.`);
      }

      let training = data.shift();
      success = this.train(training.input, training.target) && success;
    }

    return success;
  };

  this.train = (inputs, expected) => {
    while (this.weights.length < inputs.length) {
      this.weights.push(Math.random())
    }

    // add a bias weight for the threshold
    if (this.weights.length == inputs.length) {
      this.weights.push('bias' in options ? options.bias : 1)
    }

    let result = this.perceive(inputs);
    data.push({input: inputs, target: expected, prev: result});

    if (result == expected) {
      return true;
    } else {
      for (let i = 0; i < this.weights.length; i++) {
        let input = (i == inputs.length) ? this.threshold : inputs[i];
        this.adjust(result, expected, input, i)
      }

      return false;
    }
  };

  this.adjust = (result, expected, input, index)  => {
    this.weights[index] += this.delta(result, expected, input, this.learningRate);

    if (isNaN(this.weights[index])) {
      throw new Error('weights[' + index + '] went to NaN!!');
    }
  };

  this.delta = (actual, expected, input, learnrate) => {
    return (expected - actual) * learnrate * input;
  };

  this.perceive = (inputs, net) => {
    let result = 0;
    for (let i = 0; i < inputs.length; i++) {
      result += inputs[i] * this.weights[i]
    }

    result += this.threshold * this.weights[this.weights.length - 1];

    return net ? result : result > 0 ? 1 : 0;
  };

  this.log = message => {
    console.log(`[neural]->[perceptron] ${message}`);
  };
};

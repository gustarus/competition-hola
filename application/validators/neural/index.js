'use strict';

const Perceptron = require('./perceptron');

module.exports = function(options) {
  this.name = options.name;
  this.trainTimes = options.trainTimes;
  this.lengthThreshold = options.lengthThreshold;
  this.perceptron = new Perceptron(options.perceptron);

  let abc = 'abcdefghijklmnopqrstuvwxyz';

  this.build = (dictionary, broken) => {
    this.log('Begin train network...');

    // train with dictionary
    this.log('Train with dictionary and broken collection...');
    dictionary.forEach(word => {
      let wordBinary = this.binary(word);
      let noword = broken[Math.floor(Math.random() * broken.length)];
      let nowordBinary = this.binary(noword);
      this.perceptron.train(nowordBinary, 0);
      this.perceptron.train(wordBinary, 1);
      wordBinary = nowordBinary = noword = word = null;
    });

    // retrain network
    if (this.trainTimes) {
      for (let i = 0; i < this.trainTimes; i++) {
        this.log(`Retrain (${i + 1} of ${this.trainTimes})...`);
        if (this.perceptron.retrain()) {
          this.log(`Last retrain completed with success and we can stop retrain...`);
          break;
        }
      }
    }

    return this;
  };

  this.encode = () => {
    return this.perceptron.weights.join(';');
  };

  this.decode = raw => {
    // clear weights
    while (this.perceptron.weights.length) {
      this.perceptron.weights.pop();
    }

    // parse weights
    raw.split(';').forEach(weight=> {
      this.perceptron.weights.push(parseFloat(weight));
    });
  };

  this.validate = word => {
    return this.perceptron.perceive(this.binary(word));
  };

  this.format = word => {
    return word;
  };

  this.binary = string => {
    let binary = [];
    for (let x = 0; x < this.lengthThreshold; x++) {
      for (let y = 0; y < abc.length; y++) {
        binary.push(string[x] === abc[y] ? 1 : 0);
      }
    }

    return binary;
  };

  this.log = message => {
    console.log(`[neural] ${message}`);
  };
};

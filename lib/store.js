'use strict';

const pkg = require('../package.json');
const configStore = require('configstore');

const store = new configStore(pkg.name);



module.exports = {

  isConfigPresent: (key) => {
    if (key === undefined) {
      throw('key required !!');
    }
    return store.get(key) === undefined ? false : true;
  },

  putConfig: (key, obj, nestedKey) => {
    store.set(key, obj);
    return obj[nestedKey];
  },

  getConfigFromStore: (key, nestedKey) => {
    if (key === undefined) {
      throw('Key required.');
    }
    if (nestedKey === undefined) {
      throw('Nested Key required.');
    }
    
    const config = store.get(key);    
    if (config === undefined || config[nestedKey] === undefined) {
      throw('Configuration not present');
    } else {
      return config[nestedKey];
    }
  },

  deleteConfig: (key) => {
    if (key === undefined) {
      throw('key required.');
    }
    const config = store.get(key);    
    if (config === undefined) {
      throw('Configuration not present');
    } else {
      store.delete(key);
      return config;
    }
  }


}
import React, { Component, } from 'react';

global.instance = [];

class Store extends Component {
  set(k, v) {
    if (!global.instance[k]) global.instance[k] = {};
    global.instance[k].v = v;
    if (global.instance[k].comp) {
      global.instance[k].comp.map(v => v.forceUpdate());
    }
    return global.instance[k].v;
  }

  get(k) {
    if (!global.instance[k].comp) {
      global.instance[k].comp = [];
    }
    global.instance[k].comp.push(this);
    return global.instance[k].v;
  }
}

export default Store;

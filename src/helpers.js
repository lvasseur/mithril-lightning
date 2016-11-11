const onKey = (function onKey() {
  var keymap = {
    'enter': 13,
    'space': 31,
    'tab': 9,
    'esc': 27,
    'left': 37,
    'up': 38,
    'right': 39,
    'down': 40
  };

  return function bind(key, callback) {
    if (key in keymap) {
      key = keymap[key];
    }

    return function handler(e) {
      if (e && key === e.keyCode || key === String.fromCharCode(e.keyCode)) {
        callback.call(this, e);
      }
      else {
        e.redraw = false;
      }
    };
  };
}());

const highlighter = {
  simple(text, key) {
    let regex = new RegExp(key, "i");
    let index = text.toLowerCase().indexOf(key.toLowerCase());
    return m.trust(text.replace(regex, `<strong>${ text.slice(index, index + key.length) }</strong>`))
  }
};


export { onKey, highlighter }
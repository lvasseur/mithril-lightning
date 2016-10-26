var onKey = (function onKey() {
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

export {onKey}
var generator = {
  array: function generateArray(model, n) {
    n = n || 10;
    var keys = Object.keys(model);
    var r = [];

    for (i = 1; i <= n; i++) {
      var obj = {};
      keys.map(function (key) {
        if (typeof model[key] === "object" ) {
          obj[key] = model[key].field[model[key].type]()
        } else {
          obj[key] = model[key]()
        }
      });
      r.push(obj);
    }
    return r
  }
};
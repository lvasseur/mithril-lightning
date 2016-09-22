mlds = {};

mlds.card = require("./src/card");
mlds.datatable = require("./src/datatable.js");
mlds.form = require("./src/form.js");
mlds.icon = require("./src/icons.js");
mlds.menu = require("./src/menu.js");
mlds.modal = require("./src/modal.js");
mlds.nav = require("./src/navigation.js");
mlds.globalheader = require("./src/globalheader.js");
mlds.pageheader = require("./src/pageheader.js");
lookups = require("./src/lookups.js");
mlds.lookups = lookups['lookups'];
mlds.onKey =lookups['onKey'];
mlds.tabs = require("./src/tabs.js");
mlds.wizard = require("./src/wizard.js");


module.exports = mlds;

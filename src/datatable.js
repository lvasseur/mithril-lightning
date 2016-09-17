'use strict';

var Datatable = {

  oninit: function (vnode) {
    this.fields = Object.keys(vnode.attrs.fields);
    this.isStriped = vnode.attrs.isStriped;
  },

  header: function (fields) {
    return m("thead", [
      m("tr.slds-text-heading--label", [
        this.fields.map(function (key) {
          if (typeof fields[key] === "object") {
            return m("th[scope='col']", [
              // Labels here
              m('.slds-truncate', fields[key]['label'])
            ])
          } else {
            return m("th[scope='col']", [
              // Labels here
              m('.slds-truncate', fields[key])
            ])
          }
        })
      ])
    ])
  },

  view: function(vnode) {
    var table = "table.slds-table.slds-table--bordered.slds-table--cell-buffer";
    var fields = vnode.attrs.fields;
    if (this.isStriped) table += ".slds-table--striped";
    return m(table, [
      vnode.state.header(vnode.attrs.fields),
      m("tbody", [
        vnode.attrs.data.map(function (row) {
          return m("tr", { key: row[vnode.attrs.key] }, [
            // Loop in data here and validate if is th or td
            vnode.state.fields.map(function (key) {

              if (typeof fields[key] === "object") {
                var callback = fields[key]["callback"];
                var cellValue = row[key][fields[key]['field']] || row[key];
                return m("td[scope='row']", [
                  m(".slds-truncate", typeof callback === "function" ? callback(cellValue) : cellValue)
                ])
              }

              if (key === vnode.attrs.link.field) {
                return m("th[scope='row']", [
                  m(".slds-truncate", [
                    m("a", {
                      href: vnode.attrs.link.url + row[vnode.attrs.key],
                      oncreate: m.route.link
                    }, row[key])
                  ])
                ])

              } else {
                return m("td[scope='row']", [
                  m(".slds-truncate", row[key])
                ])
              }
            })
          ])
        })
      ])
    ])
  }

};

module.exports = Datatable;
var Pageheader = {};


function objByValue(item) {
  return item[this["field"]] === this["searchKey"];
};

Pageheader.home = {

  view: function (vnode) {
    return [m(".slds-page-header.slds-page-header--object-home[role='banner']", [
      m(".slds-grid", [
        m(".slds-col.slds-has-flexi-truncate", [
          m(".slds-media.slds-no-space.slds-grow", [
            m(".slds-media__figure", [
              vnode.attrs.icon
            ]),
            m(".slds-media__body", [
              m("p.slds-text-title--caps.slds-line-height--reset", vnode.attrs.module),
              m("button.slds-button.slds-type-focus.slds-m-right--small.slds-grid.slds-truncate[aria-haspopup='true']", [
                m(".slds-grid.slds-grid--vertical-align-center.slds-truncate", [
                  m("h1.slds-page-header__title.slds-truncate", { title: vnode.attrs.submodule}, vnode.attrs.submodule),
                  m("svg.slds-button__icon.slds-button__icon--right.slds-no-flex[aria-hidden='true']", [
                    m("use[xlink:href='/assets/icons/utility-sprite/svg/symbols.svg#down']")
                  ])
                ])
              ])
            ])
          ])
        ]),
        m(".slds-col.slds-no-flex.slds-grid.slds-align-top.slds-p-bottom--xx-small", [
          m(".slds-button-group[role='group']", [
            vnode.attrs.actionsOne
          ])
        ])
      ]),
      m(".slds-grid", [
        m(".slds-col.slds-align-bottom", [
          m("p.slds-text-body--small", vnode.attrs.desc)
        ]),
        m(".slds-col.slds-no-flex.slds-grid.slds-align-bottom", [
          vnode.attrs.actionsTwo
        ])
      ])
    ])]
  }

};

Pageheader.record = {

  view: function (vnode) {

    var fields = vnode.attrs.fields;
    var record = vnode.attrs.record || {};
    return [m(".slds-page-header[role='banner']", [
      m(".slds-grid", [
        m(".slds-col.slds-has-flexi-truncate", [
          m(".slds-media.slds-no-space.slds-grow", [
            m(".slds-media__figure", [
              vnode.attrs.icon
            ]),
            m(".slds-media__body", [
              m("p.slds-text-title--caps.slds-line-height--reset", vnode.attrs.type),
              m("h1.slds-page-header__title.slds-m-right--small.slds-align-middle.slds-truncate", { title: vnode.attrs.title }, vnode.attrs.title)
            ])
          ])
        ]),
        m(".slds-col.slds-no-flex.slds-grid.slds-align-top", [
          m(".slds-button-group[role='group']", [
            vnode.attrs.actions
          ])
        ])
      ]),
      m("ul.slds-grid.slds-page-header__detail-row", [
        fields ? Object.keys(fields).map(function (field) {

          if (typeof fields[field] === "object") {

              var callback = fields[field]["callback"] || false;

              return m("li.slds-page-header__detail-block", [
                m("p.slds-text-title.slds-truncate.slds-m-bottom--xx-small", { title: fields[field]["label"] }, fields[field]["label"]),
                m("p.slds-text-body--regular.slds-truncate", callback ? callback(record[field]) : record[field][fields[field]["field"]])
              ])

          } else {
            return m("li.slds-page-header__detail-block", [
              m("p.slds-text-title.slds-truncate.slds-m-bottom--xx-small", { title: fields[field] }, fields[field]),
              m("p.slds-text-body--regular.slds-truncate", record[field])
            ])
          }
        })
        : ""
      ])
    ])]
  }

};

var a = {field: "type", value: "test1"};
module.exports = Pageheader;
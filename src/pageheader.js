var Pageheader = {};

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


module.exports = Pageheader;
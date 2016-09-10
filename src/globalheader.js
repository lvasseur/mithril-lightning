var globalheader = {
  view: function (vnode) {
    return [m("header.slds-global-header_container", [
      m(".slds-global-header.slds-grid.slds-grid--align-spread", [
        m(".slds-global-header__item", [
          m(".slds-global-header__logo", [
            m("img", {
              src: vnode.attrs.logo
            })
          ])
        ]),
        vnode.children,
        m("ul.slds-global-header__item.slds-grid.slds-grid--vertical-align-center", [
          m("li.slds-dropdown-trigger.slds-dropdown-trigger--click.slds-m-left--x-small", [
            m("button.slds-button[aria-haspopup='true'][title='person name']", [
              m("span.slds-avatar.slds-avatar--circle.slds-avatar--medium", [
                m("img[alt='person name'][src='/assets/images/avatar1.jpg']")
              ])
            ])
          ])
        ])
      ])
    ])]
  }
};

module.exports = globalheader;
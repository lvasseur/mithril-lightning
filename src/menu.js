var Menu = {

  isOpen: m.prop(true),

  menuSwitch: function (e) {
    console.log("menuSwitch");
    switch (this.isOpen()) {
      case true:
        this.isOpen(false);
        break;
      case false:
        this.isOpen(true);
        break;
    }
  },

  view: function (vnode) {
    return m(".slds-dropdown-trigger.slds-dropdown-trigger--click",{
      class: this.isOpen() ? "slds-is-open" : ""
    }, [
      m("button.slds-button.slds-button--icon-border-filled[aria-haspopup='true']", {
        onclick: this.menuSwitch.bind(this)
      }, [
       icon.utility("down"),
        m("span.slds-assistive-text", "Show More")
      ]),
      m(".slds-dropdown.slds-dropdown--left", [
        m("ul.dropdown__list[role='menu']", [
          m("li.slds-dropdown__item", [
            m("a[href='javascript:void(0);'][role='menuitem']", [
              m("p.slds-truncate", "Menu Item One")
            ])
          ]),
          m("li.slds-dropdown__item", [
            m("a[href='javascript:void(0);'][role='menuitem']", [
              m("p.slds-truncate", "Menu Item Two")
            ])
          ]),
          m("li.slds-dropdown__item", [
            m("a[href='javascript:void(0);'][role='menuitem']", [
              m("p.slds-truncate", "Menu Item Three")
            ])
          ]),
          m("li.slds-dropdown__item.slds-has-divider--top-space", [
            m("a[href='javascript:void(0);'][role='menuitem']", [
              m("p.slds-truncate", "Menu Item Four")
            ])
          ])
        ])
      ])
    ])
  }

};

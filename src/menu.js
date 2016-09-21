var Menu = {

  SIZE_CLASS: {
    small: "slds-dropdown--small",
    medium: "slds-dropdown--medium",
    large: "slds-dropdown--large"
  },

  getSize: function (size) {
    return size ? this.SIZE_CLASS[size] : "";
  },

  menuSwitch: function (e) {
    if (this.isOpen()) this.isOpen(false)
      this.isOpen(true)
  },

  close: function (e) {

    if (!e.target.isParent(this.dom)) {
      console.log("out");
      this.state.isOpen(false);
      m.redraw()
    }

  },

  oninit: function(vnode) {
    this.isOpen = m.prop(false);
    this.itens = vnode.attrs.itens
  },

  oncreate: function (vnode) {
    document.body.addEventListener("click", vnode.state.close.bind(vnode))
  },

  onremove: function (vnode) {
    document.body.addEventListener("click", vnode.state.close.bind(vnode))
  },

  view: function (vnode) {
    return m(".slds-dropdown-trigger.slds-dropdown-trigger--click",{
      class: this.isOpen() ? "slds-is-open" : ""
    }, [
      m("button.slds-button.slds-button--icon-border-filled[aria-haspopup='true']", {
        onclick: this.menuSwitch.bind(this)
      }, [
        vnode.attrs.icon,
        m("span.slds-assistive-text", "Show More")
      ]),
      m(".slds-dropdown.slds-dropdown--left", {
        class: this.getSize(vnode.attrs.size)
      }, [
        m("ul.dropdown__list[role='menu']", [
          this.itens.map(function (item) {
            return m("li.slds-dropdown__item", [
              m("a[role='menuitem']", {
                href: item.href,
                oncreate: m.route.link,
                onclick: function () {
                  vnode.state.isOpen(false);
                }
              }, [
                m("p.slds-truncate", item.label)
              ])
            ])
          })
        ])
      ])
    ])
  }
};

module.exports = Menu;

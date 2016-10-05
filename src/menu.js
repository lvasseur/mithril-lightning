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

    if (e.target.isParent(this.dom) || !this.state.isOpen()) {
      e.redraw = false;
    } else {
      this.state.isOpen(false);
      m.redraw()
    }

  },

  oninit: function(vnode) {
    vnode.state.isOpen = m.prop(false);
    vnode.state.items = vnode.attrs.items;
    vnode.state.onclose = vnode.state.close.bind(vnode);
    vnode.state.attrs = {};
    vnode.state.attrs[vnode.attrs.event || "onclick"] = vnode.state.menuSwitch.bind(vnode.state);
  },

  oncreate: function (vnode) {
    document.body.addEventListener("click", vnode.state.onclose)
  },

  onremove: function (vnode) {
    document.body.addEventListener("click", vnode.state.onclose)
  },

  view: function (vnode) {
    return m(".slds-dropdown-trigger.slds-dropdown-trigger--click",{
      class: this.isOpen() ? "slds-is-open" : ""
    }, [
      m("button.slds-button.slds-button--icon-border-filled[aria-haspopup='true']", vnode.state.attrs, [
        vnode.attrs.icon,
        m("span.slds-assistive-text", "Show More")
      ]),
      m(".slds-dropdown.slds-dropdown--left", {
        class: this.getSize(vnode.attrs.size)
      }, [
        m("ul.dropdown__list[role='menu']", [
          vnode.state.items.map(function (item) {
            if (item.hasOwnProperty("header") || typeof item === "string") {
              return m("li.slds-dropdown__header[role='separator']", [
                m("span.slds-text-title--caps", item.header || item)
              ])
            } else {
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
            }
          })
        ])
      ])
    ])
  }
};

module.exports = Menu;

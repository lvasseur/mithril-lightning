var nav = {

  oninit: function (vnode) {
    this.active = m.prop(m.route.get());
    this.setActive = function (e) {
      var current = e.target.href.split("#!")[1];
      vnode.state.active(current);
    }
  },

  view: function (vnode) {
    return m(".slds-grid.slds-grid--vertical.slds-navigation-list--vertical", vnode.attrs.nav, [
      vnode.attrs.menus.map(function (menu) {
        return [
          m("h2.slds-text-title--caps.slds-p-around--small", {
            style: "background: #eef1f6"
          }, [menu.icon], menu.label),
          m("ul", {
            onclick: vnode.state.setActive
          }, [
          menu.sub.map(function (sub) {
            return m("li",
              {
                class: vnode.state.active() === sub.href ? "slds-is-active" : ""
              }, [
              m("a.slds-navigation-list--vertical__action.slds-text-link--reset",
                {
                  href: sub.href,
                  oncreate: m.route.link
                }, sub.label)
            ])
          })
        ])]
      })
    ])
  }

};

module.exports = nav;
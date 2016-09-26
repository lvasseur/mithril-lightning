var tabs = {

  oninit: function (vnode) {

    vnode.state.selectedTab = m.prop(0);

    vnode.state.changeTab = function (i) {
      vnode.state.selectedTab(i);
    };

  },

  view: function (vnode) {

    var tabs = vnode.children;

    return [
      m(".slds-tabs--default", [
        m("ul.slds-tabs--default__nav[role='tablist']",
          tabs.map(function (tab, i) {
            return m("li.slds-tabs--default__item.slds-text-title--caps[role='presentation'][title='Item One']",{
              class: vnode.state.selectedTab() === i ? "slds-active" : ""
            } ,[
              m("a.slds-tabs--default__link[href='javascript:void(0);'][role='tab']", {
                tabindex: vnode.state.selectedTab() === i ? 0 : -1,
                id: tab["name"] + "__item",
                onclick: vnode.state.changeTab.bind(null, i)
              }, tab["label"])
            ])
          })
        ),
        tabs.map(function (tab, i) {
          return m(".slds-tabs--default__content[role='tabpanel']", {
            class: vnode.state.selectedTab() === i ? "slds-show" : "slds-hide"
          }, tab["content"])
        })
      ])
    ]

  }

};


module.exports = tabs;
var tabs = {

  oninit: function (vnode) {

    console.log("Tabs ONINIT")
    vnode.state.items = vnode.attrs.items;

    vnode.state.selectedTab = m.prop(0);

    vnode.state.changeTab = function (i) {
      vnode.state.selectedTab(i);
    };

  },

  view: function (vnode) {

    var items = vnode.state.items;

    return [
      m(".slds-tabs--default", [
        m("ul.slds-tabs--default__nav[role='tablist']",
          items.map(function (item, i) {
            return m("li.slds-tabs--default__item.slds-text-title--caps[role='presentation'][title='Item One']",{
              class: vnode.state.selectedTab() === i ? "slds-active" : ""
            } ,[
              m("a.slds-tabs--default__link[href='#'][role='tab']", {
                tabindex: vnode.state.selectedTab() === i ? 0 : -1,
                id: item["name"] + "__item",
                onclick: vnode.state.changeTab.bind(null, i)
              } ,item["label"])
            ])
          })
        ),
        vnode.children.map(function (tabBody, i) {
          return m(".slds-tabs--default__content[role='tabpanel']", {
            class: vnode.state.selectedTab() === i ? "slds-show" : "slds-hide"
          }, tabBody)
        })
      ])
    ]

  }

};


module.exports = tabs;
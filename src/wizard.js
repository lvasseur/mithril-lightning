var wizard = {

  oninit: function (vnode) {
    console.log("wizard")
  },

  view: function (vnode) {
    var completed = 0;
    var total = 0;
    if (!vnode.children.length) {
      console.log("empty")
      return null
    } else {
      return [
        m(".slds-wizard[role='navigation']", vnode.attrs,[
          m("ol.slds-wizard__list", [
            vnode.children.map(function (item, i) {
              completed += item.completed ? 1 : 0;
              total = i+1;
              return m("li.slds-wizard__item", {
                class: item.completed ? "slds-is-active" : ""
              }, [
                m("a.slds-wizard__link']", [
                  m("span.slds-wizard__marker"),
                  m("span.slds-wizard__label.slds-text-title--caps.slds-truncate", item.label)
                ])
              ])
            })
          ]),
          m("span.slds-wizard__progress", [
            m("span.slds-wizard__progress-bar", {
              style: {
                "width": (completed/total) * 100 + "%"
              }
            })
          ])
        ])
      ]
    }
  }

};


module.exports = wizard;
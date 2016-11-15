

export default {

  view(vnode) {

    let fields = vnode.attrs.fields.splice(0, 4) || [];

    return m(".slds-page-header[role='banner']", [
      m(".slds-grid", [
        m(".slds-col.slds-has-flexi-truncate", [
          m(".slds-media.slds-no-space.slds-grow", [
            m(".slds-media__figure", vnode.attrs.icon),
            m(".slds-media__body",
              m("p.slds-text-title--caps.slds-line-height--reset", vnode.attrs.type),
              m("h1.slds-page-header__title.slds-m-right--small.slds-align-middle.slds-truncate", {
                title: vnode.attrs.title
              }, vnode.attrs.title)
            )
          ])
        ]),
        m(".slds-col.slds-no-flex.slds-grid.slds-align-top", vnode.attrs.actions)
      ]),
      m("ul.slds-grid.slds-page-header__detail-row", [

        fields.map((item) => {
          return m("li.slds-page-header__detail-block", [
            m("p.slds-text-title.slds-truncate.slds-m-bottom--xx-small[title='Field 1']", item.label),
            m("p.slds-text-body--regular.slds-truncate", { title: item.value }, item.value)
          ])
        })

      ])
    ])
  }

}
var Card = {

  tilesWrapper: function (tiles) {
    return m(".slds-card__body--inner.slds-grid.slds-wrap.slds-grid--pull-padded", [
      tiles.map(function (tile) {
        return tile
      })
    ])
  },

  view: function (vnode) {
    return [m("article.slds-card", {
      class: vnode.attrs.narrow ? "slds-card--narrow" : ""
    }, [
      m("header.slds-card__header.slds-grid", [
        m(".slds-media.slds-media--center.slds-has-flexi-truncate", [
          m(".slds-media__figure", [
            m("svg.slds-icon.slds-icon-standard-contact.slds-icon--small[aria-hidden='true']", [
              m("use[xlink:href='/assets/icons/standard-sprite/svg/symbols.svg#contact']")
            ])
          ]),
          m(".slds-media__body.slds-truncate", [
            m("h2", [
              m("a.slds-text-link--reset[href='javascript:void(0);']", [
                m("span.slds-text-heading--small", vnode.attrs.header)
              ])
            ])
          ])
        ]),
        m(".slds-no-flex", [
          vnode.attrs.action
        ])
      ]),
      m(".slds-card__body", {
        class: vnode.attrs.body.class
      }, vnode.attrs.body.content),
      m(".slds-card__footer", vnode.attrs.footer)
    ])]
  }

};


module.exports = Card;
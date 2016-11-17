
export const item = {

  view(vnode) {
    return m("li.slds-dropdown__item[role='presentation']",
      m("a[href='javascript:void(0);'][role='menuitem']", vnode.attrs,
        m("span.slds-truncate", vnode.children)
      )
    )
  }

};

export const divider = {

  view(vnode) {
    return m("li.slds-has-divider--top-space[role='separtor']")
  }

};

export const subHead  = {

  view(vnode) {
    return m("li.slds-dropdown__header[role='separator']",
      m("span.slds-text-title--caps", vnode.children)
    )
  }

};
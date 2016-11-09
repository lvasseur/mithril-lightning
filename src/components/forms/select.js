

const select = {

    view(vnode) {

      let attrs = vnode.attrs || {};
      attrs["id"] = "select-" + attrs.name;
      return m(".slds-form-element", [
        m("label.slds-form-element__label", {"for": attrs.id}, attrs.label),
        m(".slds-form-element__control", [
          m(".slds-select_container", [
            m("select.slds-select", attrs, vnode.children)
          ])
        ])
      ])

    }

};


export { select };
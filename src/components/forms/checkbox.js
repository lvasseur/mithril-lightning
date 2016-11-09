
const checkbox = {

  view(vnode) {
    let attrs = vnode.attrs.attrs || {};
    attrs["id"] = "checkbox-" + attrs.name;
    return m("span.slds-checkbox", [
      m("input[type='checkbox']", attrs),
      m("label.slds-checkbox__label", {"for": attrs["id"]}, [
        m("span.slds-checkbox--faux"),
        m("span.slds-form-element__label", vnode.children)
      ])
    ])

  }

};

const checkboxToggle = {

  view(vnode) {
    let attrs = vnode.attrs.attrs || {};
    attrs["id"] = "checkbox-" + attrs.name;
    return m(".slds-form-element", [
      m("label.slds-checkbox--toggle.slds-grid", [
        m("span.slds-form-element__label.slds-m-bottom--none", vnode.children),
        m("input[type='checkbox']", attrs),
        m("span.slds-checkbox--faux_container[aria-live='assertive'][id='toggle-desc']", [
          m("span.slds-checkbox--faux"),
          m("span.slds-checkbox--on", "Enabled"),
          m("span.slds-checkbox--off", "Disabled")
        ])
      ])
    ])
  }

};

export { checkbox, checkboxToggle }
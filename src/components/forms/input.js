

export default {

  view(vnode) {

    let attrs = vnode.attrs.attrs || {};

    return m(".slds-form-element", {
      className: vnode.attrs.error ? "slds-has-error" : ""
    }, [
      m("label.slds-form-element__label", {
        "for": vnode.attrs.name
      }, attrs.required ? m("abbr.slds-required[title='required']", "*") : null, vnode.children),
      m(".slds-form-element__control", [
        m("input.slds-input[type='text']", attrs)
      ]),
      vnode.attrs.error ? m(".slds-form-element__help[id='error-message']", vnode.attrs.error) : null
    ])
  }

}
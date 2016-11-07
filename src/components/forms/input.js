

export default {

  view(vnode) {
    return m(".slds-form-element", {
      className: vnode.attrs.error ? "slds-has-error" : ""
    }, [
      m("label.slds-form-element__label", {
        "for": vnode.attrs.name
      }, vnode.attrs.input.required ? m("abbr.slds-required[title='required']", "*") : null, vnode.children),
      m(".slds-form-element__control", [
        m("input.slds-input[type='text']", vnode.attrs.input)
      ]),
      vnode.attrs.error ? m(".slds-form-element__help[id='error-message']", vnode.attrs.error) : null
    ])
  }

}
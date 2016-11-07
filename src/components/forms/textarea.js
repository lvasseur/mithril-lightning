
export default {

  view(vnode) {
    return m(".slds-form-element", {
      className: vnode.attrs.error ? "slds-has-error" : ""
    }, [
      m("label.slds-form-element__label[for='textarea-input-01']", vnode.attrs.textarea.required ? m("abbr.slds-required[title='required']", "*") : null,vnode.children),
      m(".slds-form-element__control", [
        m("textarea.slds-textarea", vnode.attrs.textarea)
      ]),
      vnode.attrs.error ? m(".slds-form-element__help[id='error-message']", vnode.attrs.error) : null
    ])
  }

}
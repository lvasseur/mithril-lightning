
const radioWrapper = {

  view(vnode) {
    return m("fieldset.slds-form-element", vnode.attrs.attrs, [
      m("legend.slds-form-element__legend.slds-form-element__label", vnode.attrs.label),
      m(".slds-form-element__control", [
        vnode.children
      ])
    ])
  }

};


const radioGroup = {

  view(vnode) {
    return m("fieldset.slds-form-element", vnode.attrs.attrs, [
      m("legend.slds-form-element__legend.slds-form-element__label", vnode.attrs.label),
      m(".slds-form-element__control", [
        m(".slds-radio--button-group", vnode.children)
      ])
    ])
  }

};


const radio = {

  view(vnode) {
    let attrs = vnode.attrs.attrs;
    attrs["id"] = "radio-" + attrs.value;
    return m("span.slds-radio", [
      m("input[type='radio']", attrs),
      m("label.slds-radio__label", { "for": attrs["id"] }, [
        m("span.slds-radio--faux"),
        m("span.slds-form-element__label", vnode.attrs.label)
      ])
    ])
  }

};


const radioButton = {

  view(vnode) {
    let attrs = vnode.attrs.attrs;
    attrs["id"] = "radio-" + attrs.value;
    return m("span.slds-button.slds-radio--button", [
      m("input[type='radio']", attrs),
      m("label.slds-radio--button__label", { "for": attrs["id"] }, [
        m("span.slds-radio--faux", vnode.attrs.label)
      ])
    ])
  }

};



export { radioWrapper, radioGroup, radio, radioButton }
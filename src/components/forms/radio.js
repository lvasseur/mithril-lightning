

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


const radio = {

  counter: 0,

  oninit(vnode) {
    vnode.state.counter += 1;
    console.log(vnode.state.counter);
  },

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



export { radioWrapper, radio }
var form = {};

form.input = function (attrs) {
  return m(".slds-form-element", [
    m("label.slds-form-element__label", {
      for: attrs.name
    }, [
      attrs.input.required ? m("abbr.slds-required[title='required']", "*") : ""
    ], attrs.label),
    m(".slds-form-element__control", [
      m("input.slds-input[type='text']", attrs.input)
    ])
  ])
};

form.textarea = function (attrs) {
  return m(".slds-form-element", [
    m("label.slds-form-element__label[for='textarea-input-01']", attrs.label),
    m(".slds-form-element__control", [
      m("textarea.slds-textarea", attrs.textarea)
    ])
  ])
};




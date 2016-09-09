var form = {};

form.wrapper = {};

form.bindsData = function (data) {
  return {
    onchange: function (e) {
      // data[e.target.name](e.target.value);
      console.log(e.target.type);
      switch (e.target.type) {
        case 'checkbox':
          data[e.target.name](e.target.checked);
          break;
        default:
          data[e.target.name](e.target.value);
          break;
      }
    }
  }
};

form.input = function (attrs) {
  return m(".slds-form-element", attrs.wrapper, [
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

form.radio = function (attrs) {
  return m("fieldset.slds-form-element", [
    m("legend.slds-form-element__legend.slds-form-element__label", [
      attrs.required ? m("abbr.slds-required[title='required']", "*") : ""
    ], attrs.label),
    m(".slds-form-element__control", [
      attrs.itens.map(function (radio) {
        return m("label.slds-radio", [
          m("input[type='radio']", {
            name: attrs.name,
            value: radio.value,
            onclick: attrs.onclick
          }),
          m("span.slds-radio--faux"),
          m("span.slds-form-element__label", radio.label)
        ])
      })
    ])
  ])
};

form.radioGroup = function (attrs) {
  return m("fieldset.slds-form-element", [
    m("legend.slds-form-element__legend.slds-form-element__label", attrs.label),
    m(".slds-form-element__control", [
      m(".slds-radio--button-group", [
        attrs.itens.map(function (radio) {
        return m("label.slds-button.slds-radio--button", [
            m("input[type='radio']", {
              name: attrs.name,
              value: radio.value,
              onclick: attrs.onclick
            }),
            m("span.slds-radio--faux", radio.label)
          ])
        })
      ])
    ])
  ])
};

form.checkbox = function (attrs) {
  return m(".slds-form-element", [
    m(".slds-form-element__control", [
      m("label.slds-checkbox", [
        m("input[type='checkbox']", attrs.checkbox),
        m("span.slds-checkbox--faux"),
        m("span.slds-form-element__label", attrs.label)
      ])
    ])
  ])
};

form.wrapper.horizontal = {

  view: function (vnode) {
    return m("form.slds-form--horizontal", vnode.attrs,[
      vnode.children
    ])
  }

};

form.wrapper.stacked = {

  view: function (vnode) {
    return m("form.slds-form--stacked", vnode.attrs,[
      vnode.children
    ])
  }

};

form.wrapper.compound = {

  view: function (vnode) {
    return vnode.attrs.rows.map(function (row) {
      return [m("fieldset.slds-form--compound", [
          m("legend.slds-form-element__label.slds-text-title--caps", row.legend),
          m(".form-element__group", [
            m(".slds-form-element__row", [
              row.elements.map(function (element) {
                return element
              })
            ])
          ])
        ]
      )]
    })
  }

};

module.exports = form;

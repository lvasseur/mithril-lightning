var Lookups = {

  oninit: function (vnode) {

    vnode.state.list = vnode.attrs.data.list;

    vnode.state.isOpen = m.prop(false);

    vnode.state.selected = m.prop("");

    vnode.state.onOff = function () {
      if (vnode.state.isOpen) vnode.state.isOpen(false)
      else vnode.state.isOpen(true)
    };

    vnode.state.handleKey = function (e) {
      if (e.keyCode == 27) {
        e.target.blur();
        vnode.state.onOff();
        m.redraw();
      }
    };
    document.body.addEventListener("keyup", vnode.state.handleKey);
  },

  onremove: function (vnode) {
    document.body.removeEventListener("keyup", vnode.state.handleKey);
  },

  view: function (vnode) {

    var key = vnode.attrs.data.key;

    return [
      m(".slds-form-element.slds-lookup[data-select='single']", {
        class: vnode.state.isOpen() ? "slds-is-open" : "",
      }, [
        m("label.slds-form-element__label[for='lookup-348']", vnode.attrs.label),
        m(".slds-form-element__control", [
          vnode.attrs.value() ?
            [m(".slds-pill_container", [
              m("span.slds-pill.slds-size--1-of-1", [
                m("span.slds-pill__label[title='Salesforce.com, Inc.']", vnode.state.selected().name),
                m("button.slds-button.slds-button--icon.slds-pill__remove", {
                  onclick: function (e) {
                    vnode.state.selected(false)
                    vnode.attrs.value("");
                    if (typeof vnode.attrs.callbackUnselect === "function") {
                      vnode.attrs.callbackUnselect()
                    };
                  }
                }, [
                  m("svg.slds-button__icon[aria-hidden='true']", [
                    m("use[xlink:href='/assets/icons/utility-sprite/svg/symbols.svg#close']")
                  ]),
                  m("span.slds-assistive-text", "Remove")
                ])
              ])
            ])] : m(".slds-input-has-icon.slds-input-has-icon--right", [
              m("svg.slds-input__icon", [
                m("use[xlink:href='/assets/icons/utility-sprite/svg/symbols.svg#search']")
              ]),
              m("input.slds-lookup__search-input.slds-input[role='combobox'][type='search']", {
                disabled: vnode.attrs.disabled,
                placeholder: vnode.attrs.placeholder,
                oninput: vnode.attrs.searchOninput,
                onfocus: function (e) {
                  console.log("focus")
                  vnode.state.isOpen(true);
                }
              })
            ])

        ]),
        m(".slds-lookup__menu[id='lookup-348']", [
          m(".slds-lookup__item--label.slds-text-body--small", vnode.attrs.label),
          m("ul.slds-lookup__list[role='listbox']", [
            vnode.state.list.filter(vnode.attrs.filter).map(function (item) {
              return m("li[role='presentation']", {
                key: item[key],
                onclick: function (e) {
                  vnode.state.selected(item);
                  vnode.attrs.value(item);
                  vnode.attrs.query("");
                  vnode.state.isOpen(false);
                  if (typeof vnode.attrs.callbackSelect === "function") {
                    vnode.attrs.callbackSelect()
                  };
                }
              }, [
                m("span.slds-lookup__item-action.slds-media.slds-media--center[role='option']", [
                  vnode.attrs.icon,
                  m(".slds-media__body", [
                    m(".slds-lookup__result-text", item.name),
                    m("span.slds-lookup__result-meta.slds-text-body--small", item.description)
                  ])
                ])
              ])
            }),
            m("li[role='presentation']", [
              vnode.attrs.newButton ? m("a", {
                href: vnode.attrs.newButton.url,
                oncreate: m.route.link
              }, [
                m("span.slds-lookup__item-action.slds-lookup__item-action--label[id='lookup-option-356'][role='option']", [
                  m("svg.slds-icon.slds-icon--x-small.slds-icon-text-default[aria-hidden='true']", [
                    m("use[xlink:href='/assets/icons/utility-sprite/svg/symbols.svg#add']")
                  ]),
                  m("span.slds-truncate", vnode.attrs.newButton.label)
                ])
              ]) : null
            ])


          ])
        ])
      ])
    ]
  }

};


module.exports = Lookups;
var onKey = (function(){
  var keymap = {
    'enter' : 13,
    'space' : 31,
    'tab'   : 9,
    'esc'   : 27,
    'left'  : 37,
    'up'    : 38,
    'right' : 39,
    'down'  : 40
  };

  return function bind(key, callback) {
    if (key in keymap) {
      key = keymap[key];
    }

    return function handler(e) {
      if (e && key === e.keyCode || key === String.fromCharCode(e.keyCode)) {
        callback.call(this, e);
      }
      else {
        e.redraw = false;
      }
    };
  };
}());

var Lookups = {

  toggle: function (e) {
    console.log(this)
    if (!e.target.isParent(this.dom)) {
      this.state.isOpen(false);
      this.state.searchTerm("");
      m.redraw()
    } else {
      e.target.redraw = false;
    }
  },

  oninit: function (vnode) {

    vnode.state.isOpen = m.prop(false);

    vnode.state.searchTerm = m.prop("");

  },
  
  oncreate: function (vnode) {
    document.body.addEventListener("click", vnode.state.toggle.bind(vnode))
  },

  onremove: function (vnode) {
    document.body.removeEventListener("click", vnode.state.toggle.bind(vnode))
  },

  view: function (vnode) {

    var key = vnode.attrs.data.key;
    var items = vnode.attrs.data.list;
    console.log(vnode.state.isOpen())
    return [
      m(".slds-form-element.slds-lookup[data-select='single']", {
        class: vnode.state.isOpen() ? "slds-is-open" : ""
      }, [
        m("label.slds-form-element__label[for='lookup-348']", vnode.attrs.label),
        m(".slds-form-element__control", [
          vnode.attrs.value() ?
            [m(".slds-pill_container", [
              m("span.slds-pill.slds-size--1-of-1", [
                m("span.slds-pill__label", vnode.attrs.value().name),
                m("button.slds-button.slds-button--icon.slds-pill__remove", {
                  onclick: function (e) {
                    vnode.attrs.value("");
                    if (typeof vnode.attrs.onunselect === "function") {
                      vnode.attrs.onunselect()
                    }
                  }
                }, [
                  m("svg.slds-button__icon", [
                    m("use[xlink:href='/assets/icons/utility-sprite/svg/symbols.svg#close']")
                  ]),
                  m("span.slds-assistive-text", "Remove")
                ])
              ])
            ])] : m(".slds-input-has-icon.slds-input-has-icon--right", [
            m("svg.slds-input__icon", [
              m("use[xlink:href='/assets/icons/utility-sprite/svg/symbols.svg#search']")
            ]),
            m("input.slds-lookup__search-input.slds-input", {
              disabled: vnode.attrs.disabled,
              placeholder: vnode.attrs.placeholder,
              value: vnode.state.searchTerm(),

              oninput: m.withAttr("value", vnode.state.searchTerm),

              onkeypress: mlds.onKey('esc', function (e) {
                vnode.state.searchTerm("");
                vnode.state.isOpen(false);
                e.target.blur();
              }),

              onfocus: function (e) {
                vnode.state.isOpen(true);
              }
            })
          ])

        ]),
        m(".slds-lookup__menu", [
          m(".slds-lookup__item--label.slds-text-body--small", vnode.attrs.label),
          m("ul.slds-lookup__list", [
            items.filter(vnode.attrs.filtr, vnode.state).map(function (item) {
              return m("li[role='presentation']", {
                key: item[key],
                onclick: function (e) {
                  vnode.attrs.value(item);
                  vnode.state.searchTerm("");
                  vnode.state.isOpen(false);
                  if (typeof vnode.attrs.onselect === "function") {
                    vnode.attrs.onselect()
                  }
                }
              }, [
                m("span.slds-lookup__item-action.slds-media.slds-media--center", [
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
                m("span.slds-lookup__item-action.slds-lookup__item-action--label]", [
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

Node.prototype.isParent = function (target) {
  var node = this.parentNode;
  while (node != null) {
    if (node == target) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};

module.exports = {
  lookups: Lookups,
  onKey: onKey
};

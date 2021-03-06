import prop from 'mithril/stream';
import { onKey, highlighter } from "../../helpers.js";
import icons from "../icons.js";

export default {

  oninit(vnode) {

    this.lookupId = "lookup-" + vnode.attrs.input.name;
    this.selected = vnode.attrs.selected;
    this.isOpen = prop(false);
    this.searchTerm = vnode.attrs.searchTerm || prop("");

    this.isStatic = vnode.attrs.lookup.static == undefined ? true : vnode.attrs.lookup.static;

    this.input = vnode.attrs.input;
    Object.assign(this.input, {
      id: this.lookupId,
      onclick: (e) => {
        this.isOpen(true);
      },
      oninput: m.withAttr("value",  this.searchTerm)
    });

    this.onselect = vnode.attrs.onselect || false;
    this.onunselect = vnode.attrs.onunselect || false;

  },

  oncreate(vnode) {

    this.outClick = (e) => {
      if (!vnode.dom.contains(e.target) && this.isOpen()) {
        this.isOpen(false);
        m.redraw();
      }
    };

    document.addEventListener("click", this.outClick)

  },

  onremove(vnode) {

    document.removeEventListener("click", this.outClick)

  },

  view(vnode) {

    let lookup = vnode.attrs.lookup || {};

    return m(".slds-form-element.slds-lookup[data-select='single']", {
      className: this.isOpen() ? "slds-is-open" : "",
      onkeypress: onKey('esc', () => this.isOpen(false))
    }, [
      m("label.slds-form-element__label", {"for": this.lookupId}, vnode.attrs.label),
      m(".slds-form-element__control", [
        this.selected() ?
          this.selectedView(this.selected()) :
          this.inputView(this.input)
      ]),
      m(".slds-lookup__menu", {
        id: this.lookupId
      }, [
        m(".slds-lookup__item--label.slds-text-body--small", lookup.label),
        m("ul.slds-lookup__list[role='listbox']", [

          lookup.data.filter(this.lookupFilter, this.searchTerm).map((item) => {

            return m("li[role='presentation']", {
              key: lookup.itemKey ? item[lookup.itemKey] : null,
              onclick: () => {
                this.selected(item);
                this.onselect ? vnode.attrs.onselect(item) : null;
                this.isOpen(false);
              }
            }, [
              m("span.slds-lookup__item-action.slds-media.slds-media--center[role='option']", {
                id: "lookup-option-" + item[lookup.itemKey]
              }, [
                icons.standard(lookup.icon, "small", "", false),
                m(".slds-media__body", [
                  m(".slds-lookup__result-text", highlighter.simple(item.text, this.searchTerm())),
                  m("span.slds-lookup__result-meta.slds-text-body--small", highlighter.simple(item.meta, this.searchTerm()))
                ])
              ])
            ])

          }),
          this.actionView(vnode.attrs.action)
        ])
      ])
    ])

  },

  inputView(attrs) {
    return m(".slds-input-has-icon.slds-input-has-icon--right", [
      m("svg.slds-input__icon", [
        m("use[xlink:href='/assets/icons/utility-sprite/svg/symbols.svg#search']")
      ]),
      m("input.slds-lookup__search-input.slds-input[role='combobox'][type='search']", attrs)
    ])
  },

  selectedView(item) {
    return m(".slds-pill_container", [
      m("span.slds-pill.slds-size--1-of-1", [
        m("span.slds-icon_container.slds-icon-standard-account.slds-pill__icon_container", [
          m("svg.slds-icon[aria-hidden='true']", [
            m("use[xlink:href='/assets/icons/standard-sprite/svg/symbols.svg#account']")
          ])
        ]),
        m("span.slds-pill__label[title='Salesforce.com, Inc.']", item.text),
        m("button.slds-button.slds-button--icon.slds-pill__remove[title='Remove']", {
          onclick: () => {
            this.selected(null);
            this.onunselect ? this.onunselect() : null;
          }
        }, [
          m("svg.slds-button__icon[aria-hidden='true']", [
            m("use[xlink:href='/assets/icons/utility-sprite/svg/symbols.svg#close']")
          ])
        ])
      ])
    ])
  },

  itemView(item) {
    return m("li[role='presentation']", {
      key: lookup.itemKey ? item[lookup.itemKey] : null,
      onclick: () => {
        this.selected(item);
        this.onselect ? vnode.attrs.onselect(item) : null;
        this.isOpen(false);
      }
    }, [
      m("span.slds-lookup__item-action.slds-media.slds-media--center[id='lookup-option-359'][role='option']", [
        icons.standard(lookup.icon, "small", "", false),
        m(".slds-media__body", [
          m(".slds-lookup__result-text", highlighter.simple(item.text, this.searchTerm())),
          m("span.slds-lookup__result-meta.slds-text-body--small", highlighter.simple(item.meta, this.searchTerm()))
        ])
      ])
    ])
  },

  actionView(attrs) {
    return m("li[role='presentation']", [
      m("span.slds-lookup__item-action.slds-lookup__item-action--label[id='lookup-option-365'][role='option']", [
        m("svg.slds-icon.slds-icon--x-small.slds-icon-text-default[aria-hidden='true']", [
          m("use[xlink:href='/assets/icons/utility-sprite/svg/symbols.svg#add']")
        ]),
        m("span.slds-truncate", attrs, attrs.title)
      ])
    ])
  },

  lookupFilter(item) {
    return item.text.toLowerCase().indexOf(this().toLowerCase()) > -1 || item.meta.toLowerCase().indexOf(this().toLowerCase()) > -1
  }



};

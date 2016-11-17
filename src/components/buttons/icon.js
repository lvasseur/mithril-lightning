import icons from "../icons.js";

export default {

  oninit(vnode) {

    this.attrs = Object.assign({}, vnode.attrs || vnode.attrs);
    this.attrs["className"] = vnode.attrs.dropdown ? "slds-button--icon-more" : [
        vnode.attrs.type ? "slds-button--icon-" + vnode.attrs.type : "slds-button--icon",
        vnode.attrs.container ? "slds-button--icon-" + vnode.attrs.container : ""
      ].join(" ")

    delete this.attrs.type;
    delete this.attrs.container;
    delete this.attrs.dropdown;

  },

  view(vnode) {

    let hasDropdown = vnode.attrs.dropdown;

    return m("button.slds-button", this.attrs,
      icons.button(this.attrs.title),
      hasDropdown ? icons.button("down") : null,
      m("span.slds-assistive-text", vnode.children)
    )
  }

};
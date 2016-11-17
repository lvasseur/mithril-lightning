
const BTN_TYPES = [
  "neutral",
  "brand",
  "destructive",
  "inverse"
];

export default {

  oninit(vnode) {

    this.attrs = vnode.attrs || {};
    Object.assign(this.attrs, {
      className: BTN_TYPES.indexOf(vnode.attrs.type) > -1 ? "slds-button--" + vnode.attrs.type : ""
    });

    delete vnode.attrs.type;

  },

  view(vnode) {
    return m("button.slds-button", this.attrs, vnode.children)
  }

};
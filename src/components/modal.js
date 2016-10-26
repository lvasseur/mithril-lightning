/**
 * Created by mfeitoza on 10/25/16.
 */

import {onKey} from "../helpers.js";


export default {

  onupdate(vnode) {
    if (vnode.state.isOpen()) {
      vnode.state.oldActive = document.activeElement;
      setTimeout(() => {
        vnode.dom.children[0].focus()
      }, 10)
    } else {
      vnode.state.oldActive.focus()
    }
  },

  view(vnode) {

    vnode.state.isOpen = vnode.attrs.isOpen;

    return m("div", { id: "modal-" + vnode.attrs.id },
      m(".slds-modal[role='dialog'][tabindex='-1']", {
        onkeypress: onKey('esc', () => this.isOpen(false)),

        className: [
          vnode.state.isOpen() ? "slds-fade-in-open" : "",
          vnode.attrs.isLarge ? "slds-modal--large" : ""
        ].join(" ")
        },
        m(".slds-modal__container",
          vnode.state.headerView(vnode.attrs.header),
          m(".slds-modal__content.slds-p-around--medium", [
            m("div", vnode.children)
          ]),
          vnode.attrs.footer ? m(".slds-modal__footer", vnode.attrs.footer) : null
        ),
      ),
      m(".slds-backdrop", {
        className: vnode.state.isOpen() ? "slds-backdrop--open" : ""
      })
    )
  },

  close(e) {
    this.isOpen(false);
  },

  headerView(content=null, tagline=null) {
    return m(".slds-modal__header", {
      className: content ? "" : "slds-modal__header--empty"
      },
      m("button.slds-button.slds-modal__close.slds-button--icon-inverse", {
        onclick: this.close.bind(this)
      }, [
        m("svg.slds-button__icon.slds-button__icon--large[aria-hidden='true']", [
          m("use[xlink:href='/assets/icons/utility-sprite/svg/symbols.svg#close']")
        ]),
        m("span.slds-assistive-text", "Close")
      ]),
      content ? m("h2.slds-text-heading--medium", content) : null,
      tagline ? m("p.slds-m-top--x-small", tagline) : null
    )
  }

};
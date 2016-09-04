var Modal = {

  show: function (modal, id) {
    idNode = document.getElementById(id);
    modal.state.root = idNode;
    m.render(idNode, modal);
  },

  oninit: function (vnode) {
    console.log("oninit");
  },

  oncreate: function (vnode) {
    console.log("oncreate");
  },

  modalClose: function (e) {
    m.mount(this.state.root, null);
  },

  view: function (vnode) {
    return m(".modal-wrapper", [
      m(".slds-modal.slds-fade-in-open[role='dialog'][tabindex='-1']", [
        m(".slds-modal__container", [
          m(".slds-modal__header", {
            class: vnode.attrs.header ? "" : "slds-modal__header--empty"
          }, [
            m("button.slds-button.slds-button--icon-inverse.slds-modal__close", {
              onclick: this.modalClose.bind(vnode)
            }, [
              m("svg.slds-button__icon.slds-button__icon--large", [
                m("use[xlink:href='/assets/icons/action-sprite/svg/symbols.svg#close']")
              ]),
              m("span.slds-assistive-text", "Close")
            ]),
            // Header
            typeof vnode.attrs.header === "object" ? vnode.attrs.header : vnode.attrs.header
          ]),
          // Content
          m(".slds-modal__content.slds-p-around--medium", [
            m("div", [
              vnode.attrs.content
            ])
          ]),
          // Footer
          vnode.attrs.footer ?
          m(".slds-modal__footer", [
            vnode.attrs.footer
          ]) : ""
        ]),
    ]),
      m(".slds-backdrop.slds-backdrop--open")
    ])
  }

};

var a = m(Modal, {
  header: m("h2.slds-text-heading--medium", "Modal Header"),
  content: "Test"
});
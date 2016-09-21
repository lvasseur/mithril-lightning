var modal = {

  show: function (attr, id) {
    var modalWrapper = document.createElement("div");
    modalWrapper.id = id || "modal-default";
    document.body.appendChild(modalWrapper);
    attr['instanceId'] =  modalWrapper.id;
    m.render(modalWrapper, m(mlds.modal, attr));
  },

  close: function (id) {
    var modal = document.getElementById(id);
    if (modal) {
      m.mount(modal, null);
      modal.remove();
    }
  },

  oninit: function (vnode) {
    vnode.state.instanceId = vnode.attrs.instanceId;
    vnode.state.isOpen = m.prop(false);
  },

  view: function (vnode) {
    return [
      m(".slds-modal.slds-fade-in-open[role='dialog'][tabindex='-1']", {
        onclick: function (e) {
          if (e.target === vnode.dom)
            vnode.state.close(vnode.state.instanceId)
        }
      },[
        m(".slds-modal__container", [
          m(".slds-modal__header", {
            class: vnode.attrs.header ? "" : "slds-modal__header--empty"
          }, [
            m("button.slds-button.slds-button--icon-inverse.slds-modal__close", {
              onclick: this.close.bind(null, vnode.state.instanceId)
            }, [
              m("svg.slds-button__icon.slds-button__icon--large", [
                m("use[xlink:href='/assets/icons/action-sprite/svg/symbols.svg#close']")
              ]),
              m("span.slds-assistive-text", "Close")
            ]),
            // Header
            vnode.attrs.header
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
    ]
  }

};

module.exports = modal;
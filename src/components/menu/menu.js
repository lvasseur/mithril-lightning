import { btnIcon } from "../buttons/index.js";
//
export default {

  isOpen: false,

  menuSwitch(e) {

    this.isOpen = this.isOpen ? false : true;

  },

  oncreate(vnode) {

    this.closeOnOut = (e) => {
      if (!vnode.dom.contains(e.target)) {
        this.isOpen = false;
        m.redraw();
      } else {
        e.redraw = false;
      }
    };
    document.addEventListener("click", this.closeOnOut);

  },

  onremove(vnode) {

    document.removeEventListener("click", this.closeOnOut)

  },

  view(vnode) {

    return m(".slds-dropdown-trigger.slds-dropdown-trigger--click", {
      className: this.isOpen ? "slds-is-open" : ""
    }, m(btnIcon, { title: "down", type: "border", onclick: this.menuSwitch.bind(this) }),

      m(".slds-dropdown.slds-dropdown--left",
        m("ul.slds-dropdown__list[role='menu']", {
          onclick: (e) => {
            if (e.target.tagName.toLowerCase() === "a" || e.target.className === "slds-truncate") this.isOpen = false;
            else e.redraw = false;
          }
        }, vnode.children)
      )
    )

  }

};

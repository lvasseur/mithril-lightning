var icon = {

  SIZE_CLASS: {
    extraSmall: "slds-icon--x-small",
    small: "slds-icon--small",
    large: "slds-icon--large"
  },

  getSize: function (size) {
    return size ? this.SIZE_CLASS[size] : "";
  },

  standard: function (icon, attrs) {
    var attrs = attrs || {};
    return m("span.slds-icon_container", {
      class: "slds-icon-standard-" + icon
    }, [
      m("svg.slds-icon[aria-hidden='true']", {
        class: this.getSize(attrs.size)
      }, [
        m("use[xlink:href='/assets/icons/standard-sprite/svg/symbols.svg#" + icon + "']")
      ]),
      // TODO: Implement assistive
      m("span.slds-assistive-text", "Description of icon")
    ])
  },

  utility: function (icon, attrs) {
    var attrs = attrs || {};
    return m("span.slds-icon_container", {
      class: "slds-icon-action-" + icon
    }, [
      m("svg.slds-icon.slds-icon-text-default[aria-hidden='true']", {
        class: this.getSize(attrs.size) + " " + attrs.class,
        style: attrs.style
      }, [
        m("use[xlink:href='/assets/icons/utility-sprite/svg/symbols.svg#" + icon + "']")
      ]),
      // TODO: Implement assistive
      m("span.slds-assistive-text", "Description of icon")
    ])
  },

  action: function (icon, attrs) {
    var attrs = attrs || {};
    return m("span.slds-icon_container.slds-icon_container--circle.slds-icon-action-description", {
      class: "slds-icon-action-" + icon
    }, [
      m("svg.slds-icon[aria-hidden='true']", {
        class: this.getSize(attrs.size)
      }, [
        m("use[xlink:href='/assets/icons/action-sprite/svg/symbols.svg#" + icon + "']")
      ]),
      // TODO: Implement assistive
      m("span.slds-assistive-text", "Description of icon")
    ])
  },

  doctype: function (icon, attrs) {
    var attrs = attrs || {};
    return m("span.slds-icon_container", [
      m("svg.slds-icon[aria-hidden='true']", {
        class: this.getSize(attrs.size)
      }, [
        m("use[xlink:href='/assets/icons/doctype-sprite/svg/symbols.svg#" + icon + "']")
      ]),
      // TODO: Implement assistive
      m("span.slds-assistive-text", "Description of icon")
    ])
  },

  custom: function (icon, attrs) {
    var attrs = attrs || {};
    return m("span.slds-icon_container", {
      class: "slds-icon-custom-" + icon
    }, [
      m("svg.slds-icon[aria-hidden='true']", {
        class: this.getSize(attrs.size)
      }, [
        m("use[xlink:href='/assets/icons/custom-sprite/svg/symbols.svg#" + icon + "']")
      ]),
      // TODO: Implement assistive
      m("span.slds-assistive-text", "Description of icon")
    ])
  }
};

module.exports = icon;

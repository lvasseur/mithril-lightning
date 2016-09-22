var icon = {

  SIZE_CLASS: {
    extraSmall: "slds-icon--x-small",
    small: "slds-icon--small",
    large: "slds-icon--large"
  },

  getSize: function (size) {
    return size ? this.SIZE_CLASS[size] : "";
  },

  standard: function (icon, size, attrs) {
    var attrs = typeof size === "object" ? size : attrs || {};
    var size = typeof size === "object" ? null : size || "";
    return m("span.slds-icon_container", {
      class: "slds-icon-standard-" + icon.replace(/[_]+/g, "-")
    }, [
      m("svg.slds-icon[aria-hidden='true']", {
        class: this.getSize(size)
      }, [
        m("use[xlink:href='/assets/icons/standard-sprite/svg/symbols.svg#" + icon + "']")
      ])
    ])
  },

  utility: function (icon, size, attrs) {
    var attrs = typeof size === "object" ? size : attrs || {};
    var size = typeof size === "object" ? null : size || "";
    return m("span", {
      class: attrs.container || "slds-icon_container"
    }, [
      m("svg", {
        class: attrs.class ? attrs.class + " " + this.getSize(size || "small"): "slds-icon slds-icon-text-default " + this.getSize(size || "small")
      }, [
        m("use[xlink:href='/assets/icons/utility-sprite/svg/symbols.svg#" + icon + "']")
      ])
    ])
  },

  action: function (icon, size, attrs) {
    var attrs = typeof size === "object" ? size : attrs || {};
    var size = typeof size === "object" ? null : size || "";
    var cls = attrs.container || "slds-icon_container";
    return m("span", {
      class: cls + " " + "slds-icon_container--circle slds-icon-action-" + icon.replace(/[_]+/g, "-")
    }, [
      m("svg.slds-icon[aria-hidden='true']", {
        class: this.getSize(attrs.size || "small")
      }, [
        m("use[xlink:href='/assets/icons/action-sprite/svg/symbols.svg#" + icon + "']")
      ])
    ])
  },

  doctype: function (icon, size, attrs) {
    var attrs = typeof size === "object" ? size : attrs || {};
    var size = typeof size === "object" ? null : size || "";
    return m("span", {
      class: attrs.container || "slds-icon_container"
    }, [
      m("svg.slds-icon[aria-hidden='true']", {
        class: this.getSize(size)
      }, [
        m("use[xlink:href='/assets/icons/doctype-sprite/svg/symbols.svg#" + icon + "']")
      ])
    ])
  },

  custom: function (icon, size, attrs) {
    var attrs = typeof size === "object" ? size : attrs || {};
    var size = typeof size === "object" ? null : size || "";
    return m("span", {
      class: "slds-icon_container slds-icon-custom-" + icon
    }, [
      m("svg.slds-icon[aria-hidden='true']", {
        class: this.getSize(size)
      }, [
        m("use[xlink:href='/assets/icons/custom-sprite/svg/symbols.svg#" + icon + "']")
      ])
    ])
  }
};

module.exports = icon;

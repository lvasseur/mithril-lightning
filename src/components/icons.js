/**
 * Created by mfeitoza on 10/26/16.
 */

const iconSizes = {
  "x-small": "slds-icon--x-small",
  "small": "slds-icon--small",
  "large": "slds-icon--large"
};

function iconSvg(type, icon, attrs) {
  return m("svg.slds-icon", attrs,
    m("use", {
      "xlink:href": "/assets/icons/" + type + "-sprite/svg/symbols.svg#" + icon
    })
  )
}

export default {

  standard(icon, size = "default", className = "", container = true) {
    return container ? m("span.slds-icon_container", {
        className: "slds-icon-standard-" + icon.replace(/[_]+/g, "-")
      }, iconSvg("standard", icon, {
        className: iconSizes[size] ? iconSizes[size] : ""
      })
    ) : iconSvg("standard", icon, {
      className: [
        iconSizes[size] ? iconSizes[size] : "",
        "slds-icon-standard-" + icon.replace(/[_]+/g, "-")
      ].join(" ")
    })
  },

  utility(icon, size = "default", color = "default") {
    return m("span.slds-icon_container", iconSvg("utility", icon, {
        className: [
          iconSizes[size] ? iconSizes[size] : "",
          "slds-icon-text-" + color
        ].join(" ")
      })
    )
  },

  button(icon, float = "") {
    return m("svg.slds-button__icon", {
      className: float ? "slds-button__icon--" + float : ""
      },
      m("use", {
        "xlink:href": "/assets/icons/utility-sprite/svg/symbols.svg#" + icon
      })
    )
  },

  action(icon, size = "default") {
    return m("span.slds-icon_container", {
      className: [
        "slds-icon_container--circle",
        "slds-icon-action-" + icon.replace(/[_]+/g, "-")
      ].join(" ")
      }, iconSvg("action", icon, {
        className: [
          iconSizes[size] ? iconSizes[size] : ""
        ].join(" ")
      })
    )
  },

  doctype(icon, size = "default") {
    return m("span.slds-icon_container", iconSvg("doctype", icon, {
        className: [
          iconSizes[size] ? iconSizes[size] : ""
        ].join(" ")
      })
    )
  },

  custom(icon, size = "default") {
    return m("span.slds-icon_container", {
        className: "slds-icon-custom-" + icon
      }, iconSvg("custom", icon, {
        className: [
          iconSizes[size] ? iconSizes[size] : ""
        ].join(" ")
      })
    )
  }

}
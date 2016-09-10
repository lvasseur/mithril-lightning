/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	mlds = {};

	mlds.card = __webpack_require__(1);
	mlds.datatable = __webpack_require__(2);
	mlds.form = __webpack_require__(3);
	mlds.icon = __webpack_require__(4);
	mlds.menu = __webpack_require__(5);
	mlds.modal = __webpack_require__(6);
	mlds.nav = __webpack_require__(7);

	module.exports = mlds;



/***/ },
/* 1 */
/***/ function(module, exports) {

	var Card = {

	  tilesWrapper: function (tiles) {
	    return m(".slds-card__body--inner.slds-grid.slds-wrap.slds-grid--pull-padded", [
	      tiles.map(function (tile) {
	        return tile
	      })
	    ])
	  },

	  view: function (vnode) {
	    return [m("article.slds-card", {
	      class: vnode.attrs.narrow ? "slds-card--narrow" : ""
	    }, [
	      m("header.slds-card__header.slds-grid", [
	        m(".slds-media.slds-media--center.slds-has-flexi-truncate", [
	          m(".slds-media__figure", [
	            m("svg.slds-icon.slds-icon-standard-contact.slds-icon--small[aria-hidden='true']", [
	              m("use[xlink:href='/assets/icons/standard-sprite/svg/symbols.svg#contact']")
	            ])
	          ]),
	          m(".slds-media__body.slds-truncate", [
	            m("h2", [
	              m("a.slds-text-link--reset[href='javascript:void(0);']", [
	                m("span.slds-text-heading--small", vnode.attrs.header)
	              ])
	            ])
	          ])
	        ]),
	        m(".slds-no-flex", [
	          vnode.attrs.action
	        ])
	      ]),
	      m(".slds-card__body", {
	        class: vnode.attrs.body.class
	      }, vnode.attrs.body.content),
	      m(".slds-card__footer", vnode.attrs.footer)
	    ])]
	  }

	};


	module.exports = Card;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var Datatable = {

	  oninit: function (vnode) {
	    this.fields = Object.keys(vnode.attrs.fields);
	    this.isStriped = vnode.attrs.isStriped;
	  },

	  header: function (fields) {
	    return m("thead", [
	      m("tr.slds-text-heading--label", [
	        this.fields.map(function (key) {
	          return m("th[scope='col']", [
	            // Labels here
	            m('.slds-truncate', fields[key])
	          ])
	        })
	      ])
	    ])
	  },

	  view: function(vnode) {
	    var table = "table.slds-table.slds-table--bordered.slds-table--cell-buffer";
	    if (this.isStriped) table += ".slds-table--striped";
	    return m(table, [
	      vnode.state.header(vnode.attrs.fields),
	      m("tbody", [
	        vnode.attrs.data.map(function (row) {
	          return m("tr", { key: row[vnode.attrs.key] }, [
	            // Loop in data here and validate if is th or td
	            vnode.state.fields.map(function (key) {
	              if (key === vnode.attrs.key) {
	                return m("th[scope='row']", [
	                  m(".slds-truncate", [
	                    m("a[href='/']", { oncreate: m.route.link }, row[key])
	                  ])
	                ])
	              } else {
	                return m("td[scope='row']", [
	                  m(".slds-truncate", row[key])
	                ])
	              }
	            })
	          ])
	        })
	      ])
	    ])
	  }

	};

	module.exports = Datatable;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var form = {};

	form.wrapper = {};

	form.bindsData = function (data) {
	  return {
	    onchange: function (e) {
	      // data[e.target.name](e.target.value);
	      console.log(e.target.type);
	      switch (e.target.type) {
	        case 'checkbox':
	          data[e.target.name](e.target.checked);
	          break;
	        default:
	          data[e.target.name](e.target.value);
	          break;
	      }
	    }
	  }
	};

	form.input = function (attrs) {
	  return m(".slds-form-element", attrs.wrapper, [
	    m("label.slds-form-element__label", {
	      for: attrs.name
	    }, [
	      attrs.input.required ? m("abbr.slds-required[title='required']", "*") : ""
	    ], attrs.label),
	    m(".slds-form-element__control", [
	      m("input.slds-input[type='text']", attrs.input)
	    ])
	  ])
	};

	form.textarea = function (attrs) {
	  return m(".slds-form-element", [
	    m("label.slds-form-element__label[for='textarea-input-01']", attrs.label),
	    m(".slds-form-element__control", [
	      m("textarea.slds-textarea", attrs.textarea)
	    ])
	  ])
	};

	form.radio = function (attrs) {
	  return m("fieldset.slds-form-element", [
	    m("legend.slds-form-element__legend.slds-form-element__label", [
	      attrs.required ? m("abbr.slds-required[title='required']", "*") : ""
	    ], attrs.label),
	    m(".slds-form-element__control", [
	      attrs.itens.map(function (radio) {
	        return m("label.slds-radio", [
	          m("input[type='radio']", {
	            name: attrs.name,
	            value: radio.value,
	            onclick: attrs.onclick
	          }),
	          m("span.slds-radio--faux"),
	          m("span.slds-form-element__label", radio.label)
	        ])
	      })
	    ])
	  ])
	};

	form.radioGroup = function (attrs) {
	  return m("fieldset.slds-form-element", [
	    m("legend.slds-form-element__legend.slds-form-element__label", attrs.label),
	    m(".slds-form-element__control", [
	      m(".slds-radio--button-group", [
	        attrs.itens.map(function (radio) {
	        return m("label.slds-button.slds-radio--button", [
	            m("input[type='radio']", {
	              name: attrs.name,
	              value: radio.value,
	              onclick: attrs.onclick
	            }),
	            m("span.slds-radio--faux", radio.label)
	          ])
	        })
	      ])
	    ])
	  ])
	};

	form.checkbox = function (attrs) {
	  return m(".slds-form-element", [
	    m(".slds-form-element__control", [
	      m("label.slds-checkbox", [
	        m("input[type='checkbox']", attrs.checkbox),
	        m("span.slds-checkbox--faux"),
	        m("span.slds-form-element__label", attrs.label)
	      ])
	    ])
	  ])
	};

	form.wrapper.horizontal = {

	  view: function (vnode) {
	    return m("form.slds-form--horizontal", vnode.attrs,[
	      vnode.children
	    ])
	  }

	};

	form.wrapper.stacked = {

	  view: function (vnode) {
	    return m("form.slds-form--stacked", vnode.attrs,[
	      vnode.children
	    ])
	  }

	};

	form.wrapper.compound = {

	  view: function (vnode) {
	    return vnode.attrs.rows.map(function (row) {
	      return [m("fieldset.slds-form--compound", [
	          m("legend.slds-form-element__label.slds-text-title--caps", row.legend),
	          m(".form-element__group", [
	            m(".slds-form-element__row", [
	              row.elements.map(function (element) {
	                return element
	              })
	            ])
	          ])
	        ]
	      )]
	    })
	  }

	};

	module.exports = form;


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports) {

	var Menu = {

	  SIZE_CLASS: {
	    small: "slds-dropdown--small",
	    medium: "slds-dropdown--medium",
	    large: "slds-dropdown--large"
	  },

	  getSize: function (size) {
	    return size ? this.SIZE_CLASS[size] : "";
	  },

	  menuSwitch: function (e) {
	    switch (this.isOpen()) {
	      case true:
	        this.isOpen(false);
	        break;
	      case false:
	        this.isOpen(true);
	        break;
	    }
	  },

	  oninit: function(vnode) {
	    this.isOpen = m.prop(false);
	    this.itens = vnode.attrs.itens
	  },

	  view: function (vnode) {
	    return m(".slds-dropdown-trigger.slds-dropdown-trigger--click",{
	      class: this.isOpen() ? "slds-is-open" : ""
	    }, [
	      m("button.slds-button.slds-button--icon-border-filled[aria-haspopup='true']", {
	        onclick: this.menuSwitch.bind(this)
	      }, [
	        vnode.attrs.icon,
	        m("span.slds-assistive-text", "Show More")
	      ]),
	      m(".slds-dropdown.slds-dropdown--left", {
	        class: this.getSize(vnode.attrs.size)
	      }, [
	        m("ul.dropdown__list[role='menu']", [
	          this.itens.map(function (item) {
	            return m("li.slds-dropdown__item", [
	              m("a[role='menuitem']", {
	                href: item.href
	              }, [
	                m("p.slds-truncate", item.label)
	              ])
	            ])
	          })
	        ])
	      ])
	    ])
	  }
	};

	module.exports = Menu;


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var mlds = {

	  show: function (modal, id) {
	    var modalWrapper = document.createElement("div");
	    modalWrapper.id = id;
	    modal.state.root = modalWrapper;
	    document.body.appendChild(modalWrapper);
	    m.render(modalWrapper, modal);
	  },

	  modalClose: function (e) {
	    m.mount(this.state.root, null);
	    this.state.root.remove()
	  },

	  view: function (vnode) {
	    return [
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
	    ]
	  }

	};

	module.exports = mlds;

/***/ },
/* 7 */
/***/ function(module, exports) {

	var nav = {

	  oninit: function (vnode) {
	    this.active = m.prop(m.route.get());
	    this.setActive = function (e) {
	      var current = e.target.href.split("#!")[1];
	      vnode.state.active(current);
	    }
	  },

	  view: function (vnode) {
	    return m(".slds-grid.slds-grid--vertical.slds-navigation-list--vertical", vnode.attrs.nav, [
	      vnode.attrs.menus.map(function (menu) {
	        return [
	          m("h2.slds-text-title--caps.slds-p-around--small", {
	            style: "background: #eef1f6"
	          }, [menu.icon], menu.label),
	          m("ul", {
	            onclick: vnode.state.setActive
	          }, [
	          menu.sub.map(function (sub) {
	            return m("li",
	              {
	                class: vnode.state.active() === sub.href ? "slds-is-active" : ""
	              }, [
	              m("a.slds-navigation-list--vertical__action.slds-text-link--reset",
	                {
	                  href: sub.href,
	                  oncreate: m.route.link
	                }, sub.label)
	            ])
	          })
	        ])]
	      })
	    ])
	  }

	};

	module.exports = nav;

/***/ }
/******/ ]);
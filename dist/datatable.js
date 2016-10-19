var datatable =
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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @typedef {object} datatableAttrs
	 * @property {list} - Data to be displayed.
	 * @type {sortState} sort - Sorting state object.
	 * @type {recordLink} link - Object property to use as key and record href.
	 * @type {{col: colsObject}} cols - Object contains the columns to be displayed.
	 *
	 */

	/**
	 *
	 * @typedef {object} sortState
	 * @property {string} col - column key.
	 * @property {string} order - asc or desc.
	 */

	/**
	 *
	 * @typedef {object} recordLink
	 * @property {string} key - record unique identifier.
	 * @property {string} col - column key to be record link.
	 * @property {string} href - base href for record.
	 *
	 */

	/**
	 *
	 * @typedef {object} colsObject
	 * @property {string} label - record unique identifier.
	 * @type {formatCallback} format
	 * @property {boolean} sortable.
	 */

	/**
	 * This callback is used to format or add extra style to cell value.
	 * @callback formatCallback
	 * @param {string} value - the value to be formated
	 * @return {string|hyperscript}
	 */

	/**
	 * Datatable attributes.
	 *
	 * @param {datatableAttrs}
	 */
	var component = exports.component = {
	  errorMsg: function errorMsg(e) {
	    return e ? m(".error", e) : null;
	  },
	  sortTable: function sortTable(list, sort) {
	    console.log(sort);
	    switch (sort.order) {
	      case "asc":
	        list.sort(function (a, b) {
	          return a[sort.col] > b[sort.col] ? 1 : a[sort.col] < b[sort.col] ? -1 : 0;
	        });
	        break;
	      case "desc":
	        list.sort(function (b, a) {
	          return a[sort.col] > b[sort.col] ? 1 : a[sort.col] < b[sort.col] ? -1 : 0;
	        });
	        break;
	      default:
	        list.sort(function (a, b) {
	          return a[sort.col] > b[sort.col] ? 1 : a[sort.col] < b[sort.col] ? -1 : 0;
	        });
	    }
	  },
	  oninit: function oninit(vnode) {

	    vnode.state.cols = vnode.attrs.cols ? Object.keys(vnode.attrs.cols) : false;

	    vnode.state.error = vnode.attrs.data.error.run(vnode.state.errorMsg);

	    vnode.state.sort = vnode.attrs.sort || {
	      key: "",
	      order: ""
	    };

	    vnode.state.handleSort = function (e) {
	      var prop = e.target.getAttribute("data-sort-by");

	      if (vnode.state.sort.col != prop) {
	        vnode.state.sort.order = "desc";
	      } else {
	        vnode.state.sort.order = vnode.state.sort.order === "asc" ? "desc" : "asc";
	      }
	      vnode.state.sort.col = prop;
	      if (vnode.state.cols.indexOf(prop) === -1) {
	        e.redraw = false;
	      }
	    };

	    vnode.state.tableClass = "";
	    vnode.state.tableClass += vnode.attrs.striped ? "slds-table--striped " : "";
	    vnode.state.tableClass += vnode.attrs.hovered || vnode.attrs.hovered === undefined ? "" : "slds-no-row-hover ";
	  },
	  view: function view(vnode) {
	    if (!vnode.state.cols) return;

	    var data = typeof vnode.attrs.data === "function" ? vnode.attrs.data() : vnode.attrs.data;
	    var colsKeys = vnode.state.cols;
	    var cols = vnode.attrs.cols;
	    var hovered = vnode.attrs.hovered === undefined ? true : vnode.attrs.hovered;
	    var tableClass = "";

	    if (data && vnode.state.sort) {
	      vnode.state.sortTable(data, vnode.state.sort);
	    }

	    if (vnode.state.error()) {
	      return vnode.state.error();
	    } else {
	      return m("table.slds-table.slds-table--bordered.slds-table--cell-buffer", {
	        className: vnode.state.tableClass,
	        onclick: vnode.state.handleSort
	      }, [m("thead", [m("tr.slds-text-title--caps", colsKeys.map(function (col) {
	        if (cols[col]["sortable"]) {
	          var thClass = "";
	          thClass += "slds-is-sorted--" + vnode.state.sort.order;
	          thClass += col === vnode.state.sort.col ? " slds-is-sorted" : "";
	          return m("th.slds-is-sortable.slds-is-resizable", {
	            className: thClass
	          }, [m("a.slds-th__action.slds-text-link--reset[href='javascript:void(0);']", {
	            "data-sort-by": cols[col]["sortable"] ? col : ""
	          }, [m("span.slds-assistive-text", "Sort "), m("span.slds-truncate[title='Account Name']", cols[col]["label"]), m(".slds-icon_container", [m("svg.slds-icon.slds-icon--x-small.slds-icon-text-default.slds-is-sortable__icon[aria-hidden='true']", [m("use[xlink:href='/assets/icons/utility-sprite/svg/symbols.svg#arrowdown']")])])])]);
	        } else {
	          return m("th[scope='col']", [m(".slds-truncate", {
	            title: cols[col]["label"],
	            "data-sort-by": cols[col]["sortable"] ? col : ""
	          }, cols[col]["label"])]);
	        }
	      }))]), m("tbody", [data ? data.map(function (row) {
	        return m("tr", { key: row[vnode.attrs.link.key] }, colsKeys.map(function (col, i) {
	          if (i === 0 && vnode.attrs.link) {
	            return m("th[scope='row']", { "data-label": col }, m("div.slds-truncate", { title: row[col] }, m("a", {
	              href: vnode.attrs.link.href + row[vnode.attrs.link.key],
	              oncreate: m.route.link
	            }, row[col])));
	          } else {
	            return m("td", { "data-label": col }, m("div.slds-truncate", { title: row[col] }, cols[col].hasOwnProperty("format") ? cols[col]["format"](row[col]) : row[col]));
	          }
	        }));
	      }) : m("tr", m("td", { colspan: colsKeys.length }, "Loading data..."))])]);
	    }
	  },
	  tableHeader: function tableHeader() {}
	};
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL2RhdGF0YWJsZS5qcyJdLCJuYW1lcyI6WyJjb21wb25lbnQiLCJlcnJvck1zZyIsImUiLCJtIiwic29ydFRhYmxlIiwibGlzdCIsInNvcnQiLCJjb25zb2xlIiwibG9nIiwib3JkZXIiLCJhIiwiYiIsImNvbCIsIm9uaW5pdCIsInZub2RlIiwic3RhdGUiLCJjb2xzIiwiYXR0cnMiLCJPYmplY3QiLCJrZXlzIiwiZXJyb3IiLCJkYXRhIiwicnVuIiwia2V5IiwiaGFuZGxlU29ydCIsInByb3AiLCJ0YXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJpbmRleE9mIiwicmVkcmF3IiwidGFibGVDbGFzcyIsInN0cmlwZWQiLCJob3ZlcmVkIiwidW5kZWZpbmVkIiwidmlldyIsImNvbHNLZXlzIiwiY2xhc3NOYW1lIiwib25jbGljayIsIm1hcCIsInRoQ2xhc3MiLCJ0aXRsZSIsInJvdyIsImxpbmsiLCJpIiwiaHJlZiIsIm9uY3JlYXRlIiwicm91dGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNvbHNwYW4iLCJsZW5ndGgiLCJ0YWJsZUhlYWRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7QUFPQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBUUE7Ozs7Ozs7QUFRQTs7Ozs7QUFLTyxJQUFNQSxnQ0FBWTtBQUV2QkMsVUFGdUIsb0JBRWRDLENBRmMsRUFFWDtBQUNWLFdBQU9BLElBQUlDLEVBQUUsUUFBRixFQUFZRCxDQUFaLENBQUosR0FBcUIsSUFBNUI7QUFDRCxHQUpzQjtBQU12QkUsV0FOdUIscUJBTWJDLElBTmEsRUFNUEMsSUFOTyxFQU1EO0FBQ3BCQyxZQUFRQyxHQUFSLENBQVlGLElBQVo7QUFDQSxZQUFRQSxLQUFLRyxLQUFiO0FBQ0UsV0FBSyxLQUFMO0FBQ0VKLGFBQUtDLElBQUwsQ0FBVSxVQUFVSSxDQUFWLEVBQWFDLENBQWIsRUFBZ0I7QUFDeEIsaUJBQU9ELEVBQUVKLEtBQUtNLEdBQVAsSUFBY0Qs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LENBQ2I7QUF0SXNCLENBQWxCIiwiZmlsZSI6ImRhdGF0YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9tZmVpdG96YS9Db2RlL21pdGhyaWwtbGlnaHRuaW5nIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBkYXRhdGFibGVBdHRyc1xuICogQHByb3BlcnR5IHtsaXN0fSAtIERhdGEgdG8gYmUgZGlzcGxheWVkLlxuICogQHR5cGUge3NvcnRTdGF0ZX0gc29ydCAtIFNvcnRpbmcgc3RhdGUgb2JqZWN0LlxuICogQHR5cGUge3JlY29yZExpbmt9IGxpbmsgLSBPYmplY3QgcHJvcGVydHkgdG8gdXNlIGFzIGtleSBhbmQgcmVjb3JkIGhyZWYuXG4gKiBAdHlwZSB7e2NvbDogY29sc09iamVjdH19IGNvbHMgLSBPYmplY3QgY29udGFpbnMgdGhlIGNvbHVtbnMgdG8gYmUgZGlzcGxheWVkLlxuICpcbiAqL1xuXG4vKipcbiAqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBzb3J0U3RhdGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjb2wgLSBjb2x1bW4ga2V5LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IG9yZGVyIC0gYXNjIG9yIGRlc2MuXG4gKi9cblxuLyoqXG4gKlxuICogQHR5cGVkZWYge29iamVjdH0gcmVjb3JkTGlua1xuICogQHByb3BlcnR5IHtzdHJpbmd9IGtleSAtIHJlY29yZCB1bmlxdWUgaWRlbnRpZmllci5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjb2wgLSBjb2x1bW4ga2V5IHRvIGJlIHJlY29yZCBsaW5rLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGhyZWYgLSBiYXNlIGhyZWYgZm9yIHJlY29yZC5cbiAqXG4gKi9cblxuLyoqXG4gKlxuICogQHR5cGVkZWYge29iamVjdH0gY29sc09iamVjdFxuICogQHByb3BlcnR5IHtzdHJpbmd9IGxhYmVsIC0gcmVjb3JkIHVuaXF1ZSBpZGVudGlmaWVyLlxuICogQHR5cGUge2Zvcm1hdENhbGxiYWNrfSBmb3JtYXRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gc29ydGFibGUuXG4gKi9cblxuLyoqXG4gKiBUaGlzIGNhbGxiYWNrIGlzIHVzZWQgdG8gZm9ybWF0IG9yIGFkZCBleHRyYSBzdHlsZSB0byBjZWxsIHZhbHVlLlxuICogQGNhbGxiYWNrIGZvcm1hdENhbGxiYWNrXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSB0aGUgdmFsdWUgdG8gYmUgZm9ybWF0ZWRcbiAqIEByZXR1cm4ge3N0cmluZ3xoeXBlcnNjcmlwdH1cbiAqL1xuXG5cbi8qKlxuICogRGF0YXRhYmxlIGF0dHJpYnV0ZXMuXG4gKlxuICogQHBhcmFtIHtkYXRhdGFibGVBdHRyc31cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbXBvbmVudCA9IHtcblxuICBlcnJvck1zZyhlKSB7XG4gICAgcmV0dXJuIGUgPyBtKFwiLmVycm9yXCIsIGUpIDogbnVsbFxuICB9LFxuXG4gIHNvcnRUYWJsZShsaXN0LCBzb3J0KSB7XG4gICAgY29uc29sZS5sb2coc29ydCk7XG4gICAgc3dpdGNoIChzb3J0Lm9yZGVyKSB7XG4gICAgICBjYXNlIFwiYXNjXCI6XG4gICAgICAgIGxpc3Quc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgIHJldHVybiBhW3NvcnQuY29sXSA+IGJbc29ydC5jb2xdID8gMSA6IGFbc29ydC5jb2xdIDwgYltzb3J0LmNvbF0gPyAtMSA6IDBcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRlc2NcIjpcbiAgICAgICAgbGlzdC5zb3J0KGZ1bmN0aW9uIChiLCBhKSB7XG4gICAgICAgICAgcmV0dXJuIGFbc29ydC5jb2xdID4gYltzb3J0LmNvbF0gPyAxIDogYVtzb3J0LmNvbF0gPCBiW3NvcnQuY29sXSA/IC0xIDogMFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsaXN0LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICByZXR1cm4gYVtzb3J0LmNvbF0gPiBiW3NvcnQuY29sXSA/IDEgOiBhW3NvcnQuY29sXSA8IGJbc29ydC5jb2xdID8gLTEgOiAwXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBvbmluaXQodm5vZGUpIHtcblxuICAgIHZub2RlLnN0YXRlLmNvbHMgPSB2bm9kZS5hdHRycy5jb2xzID8gT2JqZWN0LmtleXModm5vZGUuYXR0cnMuY29scykgOiBmYWxzZTtcblxuICAgIHZub2RlLnN0YXRlLmVycm9yID0gdm5vZGUuYXR0cnMuZGF0YS5lcnJvci5ydW4odm5vZGUuc3RhdGUuZXJyb3JNc2cpO1xuXG4gICAgdm5vZGUuc3RhdGUuc29ydCA9IHZub2RlLmF0dHJzLnNvcnQgfHwge1xuICAgICAgICBrZXk6IFwiXCIsXG4gICAgICAgIG9yZGVyOiBcIlwiXG4gICAgICB9O1xuXG4gICAgdm5vZGUuc3RhdGUuaGFuZGxlU29ydCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIgcHJvcCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtc29ydC1ieVwiKTtcblxuICAgICAgaWYgKHZub2RlLnN0YXRlLnNvcnQuY29sICE9IHByb3ApIHtcbiAgICAgICAgdm5vZGUuc3RhdGUuc29ydC5vcmRlciA9IFwiZGVzY1wiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdm5vZGUuc3RhdGUuc29ydC5vcmRlciA9IHZub2RlLnN0YXRlLnNvcnQub3JkZXIgPT09IFwiYXNjXCIgPyBcImRlc2NcIiA6IFwiYXNjXCI7XG4gICAgICB9XG4gICAgICB2bm9kZS5zdGF0ZS5zb3J0LmNvbCA9IHByb3A7XG4gICAgICBpZiAodm5vZGUuc3RhdGUuY29scy5pbmRleE9mKHByb3ApID09PSAtMSkge1xuICAgICAgICBlLnJlZHJhdyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2bm9kZS5zdGF0ZS50YWJsZUNsYXNzID0gXCJcIjtcbiAgICB2bm9kZS5zdGF0ZS50YWJsZUNsYXNzICs9IHZub2RlLmF0dHJzLnN0cmlwZWQgPyBcInNsZHMtdGFibGUtLXN0cmlwZWQgXCIgOiBcIlwiO1xuICAgIHZub2RlLnN0YXRlLnRhYmxlQ2xhc3MgKz0gdm5vZGUuYXR0cnMuaG92ZXJlZCB8fCB2bm9kZS5hdHRycy5ob3ZlcmVkID09PSB1bmRlZmluZWQgPyBcIlwiIDogXCJzbGRzLW5vLXJvdy1ob3ZlciBcIjtcblxuICB9LFxuXG4gIHZpZXcodm5vZGUpIHtcbiAgICBpZiAoIXZub2RlLnN0YXRlLmNvbHMpIHJldHVybjtcblxuICAgIHZhciBkYXRhID0gdHlwZW9mIHZub2RlLmF0dHJzLmRhdGEgPT09IFwiZnVuY3Rpb25cIiA/IHZub2RlLmF0dHJzLmRhdGEoKSA6IHZub2RlLmF0dHJzLmRhdGE7XG4gICAgdmFyIGNvbHNLZXlzID0gdm5vZGUuc3RhdGUuY29scztcbiAgICB2YXIgY29scyA9IHZub2RlLmF0dHJzLmNvbHM7XG4gICAgdmFyIGhvdmVyZWQgPSB2bm9kZS5hdHRycy5ob3ZlcmVkID09PSB1bmRlZmluZWQgPyB0cnVlIDogdm5vZGUuYXR0cnMuaG92ZXJlZDtcbiAgICB2YXIgdGFibGVDbGFzcyA9IFwiXCI7XG5cbiAgICBpZiAoZGF0YSAmJiB2bm9kZS5zdGF0ZS5zb3J0KSB7XG4gICAgICB2bm9kZS5zdGF0ZS5zb3J0VGFibGUoZGF0YSwgdm5vZGUuc3RhdGUuc29ydClcbiAgICB9XG5cbiAgICBpZiAodm5vZGUuc3RhdGUuZXJyb3IoKSkge1xuICAgICAgcmV0dXJuIHZub2RlLnN0YXRlLmVycm9yKClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG0oXCJ0YWJsZS5zbGRzLXRhYmxlLnNsZHMtdGFibGUtLWJvcmRlcmVkLnNsZHMtdGFibGUtLWNlbGwtYnVmZmVyXCIsIHtcbiAgICAgICAgY2xhc3NOYW1lOiB2bm9kZS5zdGF0ZS50YWJsZUNsYXNzLFxuICAgICAgICBvbmNsaWNrOiB2bm9kZS5zdGF0ZS5oYW5kbGVTb3J0XG4gICAgICB9LCBbXG4gICAgICAgIG0oXCJ0aGVhZFwiLCBbXG4gICAgICAgICAgbShcInRyLnNsZHMtdGV4dC10aXRsZS0tY2Fwc1wiLFxuICAgICAgICAgICAgY29sc0tleXMubWFwKGNvbCA9PiB7XG4gICAgICAgICAgICAgIGlmIChjb2xzW2NvbF1bXCJzb3J0YWJsZVwiXSkge1xuICAgICAgICAgICAgICAgIHZhciB0aENsYXNzID0gXCJcIjtcbiAgICAgICAgICAgICAgICB0aENsYXNzICs9IFwic2xkcy1pcy1zb3J0ZWQtLVwiICsgdm5vZGUuc3RhdGUuc29ydC5vcmRlcjtcbiAgICAgICAgICAgICAgICB0aENsYXNzICs9IGNvbCA9PT0gdm5vZGUuc3RhdGUuc29ydC5jb2wgPyBcIiBzbGRzLWlzLXNvcnRlZFwiIDogXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gbShcInRoLnNsZHMtaXMtc29ydGFibGUuc2xkcy1pcy1yZXNpemFibGVcIiwge1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiB0aENsYXNzXG4gICAgICAgICAgICAgICAgfSwgW1xuICAgICAgICAgICAgICAgICAgbShcImEuc2xkcy10aF9fYWN0aW9uLnNsZHMtdGV4dC1saW5rLS1yZXNldFtocmVmPSdqYXZhc2NyaXB0OnZvaWQoMCk7J11cIiwge1xuICAgICAgICAgICAgICAgICAgICBcImRhdGEtc29ydC1ieVwiOiBjb2xzW2NvbF1bXCJzb3J0YWJsZVwiXSA/IGNvbCA6IFwiXCJcbiAgICAgICAgICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgbShcInNwYW4uc2xkcy1hc3Npc3RpdmUtdGV4dFwiLCBcIlNvcnQgXCIpLFxuICAgICAgICAgICAgICAgICAgICBtKFwic3Bhbi5zbGRzLXRydW5jYXRlW3RpdGxlPSdBY2NvdW50IE5hbWUnXVwiLCBjb2xzW2NvbF1bXCJsYWJlbFwiXSksXG4gICAgICAgICAgICAgICAgICAgIG0oXCIuc2xkcy1pY29uX2NvbnRhaW5lclwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcInN2Zy5zbGRzLWljb24uc2xkcy1pY29uLS14LXNtYWxsLnNsZHMtaWNvbi10ZXh0LWRlZmF1bHQuc2xkcy1pcy1zb3J0YWJsZV9faWNvblthcmlhLWhpZGRlbj0ndHJ1ZSddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJ1c2VbeGxpbms6aHJlZj0nL2Fzc2V0cy9pY29ucy91dGlsaXR5LXNwcml0ZS9zdmcvc3ltYm9scy5zdmcjYXJyb3dkb3duJ11cIilcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBtKFwidGhbc2NvcGU9J2NvbCddXCIsIFtcbiAgICAgICAgICAgICAgICAgIG0oXCIuc2xkcy10cnVuY2F0ZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBjb2xzW2NvbF1bXCJsYWJlbFwiXSxcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXNvcnQtYnlcIjogY29sc1tjb2xdW1wic29ydGFibGVcIl0gPyBjb2wgOiBcIlwiXG4gICAgICAgICAgICAgICAgICB9LCBjb2xzW2NvbF1bXCJsYWJlbFwiXSlcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgXSksXG4gICAgICAgIG0oXCJ0Ym9keVwiLCBbXG4gICAgICAgICAgZGF0YSA/XG4gICAgICAgICAgICBkYXRhLm1hcCgocm93KSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBtKFwidHJcIiwge2tleTogcm93W3Zub2RlLmF0dHJzLmxpbmsua2V5XX0sIGNvbHNLZXlzLm1hcCgoY29sLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCAmJiB2bm9kZS5hdHRycy5saW5rKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtKFwidGhbc2NvcGU9J3JvdyddXCIsIHtcImRhdGEtbGFiZWxcIjogY29sfSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiZGl2LnNsZHMtdHJ1bmNhdGVcIiwge3RpdGxlOiByb3dbY29sXX0sIG0oXCJhXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6IHZub2RlLmF0dHJzLmxpbmsuaHJlZiArIHJvd1t2bm9kZS5hdHRycy5saW5rLmtleV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rXG4gICAgICAgICAgICAgICAgICAgICAgfSwgcm93W2NvbF0pKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbShcInRkXCIsIHtcImRhdGEtbGFiZWxcIjogY29sfSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiZGl2LnNsZHMtdHJ1bmNhdGVcIiwge3RpdGxlOiByb3dbY29sXX0sIGNvbHNbY29sXS5oYXNPd25Qcm9wZXJ0eShcImZvcm1hdFwiKSA/IGNvbHNbY29sXVtcImZvcm1hdFwiXShyb3dbY29sXSkgOiByb3dbY29sXSkpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSkgOiBtKFwidHJcIiwgbShcInRkXCIsIHtjb2xzcGFuOiBjb2xzS2V5cy5sZW5ndGh9LCBcIkxvYWRpbmcgZGF0YS4uLlwiKSlcbiAgICAgICAgXSlcbiAgICAgIF0pXG4gICAgfVxuICB9LFxuXG4gIHRhYmxlSGVhZGVyKCkge1xuICB9XG5cbn07XG4iXX0=

/***/ }
/******/ ]);
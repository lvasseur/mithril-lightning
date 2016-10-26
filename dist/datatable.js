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
	exports.default = {
	  errorMsg: function errorMsg(e) {
	    return e ? m(".error", e) : null;
	  },
	  sortTable: function sortTable(list, sort) {
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
	      vnode.state.sort.order = vnode.state.sort.col !== prop ? "desc" : vnode.state.sort.order === "asc" ? "desc" : "asc";
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

	    if (data && vnode.state.sort) {
	      vnode.state.sortTable(data, vnode.state.sort);
	    }

	    if (vnode.state.error()) {
	      return vnode.state.error();
	    } else {
	      return m("table.slds-table.slds-table--bordered.slds-table--cell-buffer", {
	        className: vnode.state.tableClass,
	        onclick: vnode.state.handleSort
	      }, m("thead", m("tr.slds-text-title--caps", colsKeys.map(vnode.state.tableHeader, vnode))), m("tbody", data ? data.map(function (row) {
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
	      }) : m("tr", m("td", { colspan: colsKeys.length }, "Loading data..."))));
	    }
	  },
	  tableHeader: function tableHeader(col) {
	    var cols = this.attrs.cols;
	    if (cols[col]["sortable"]) {
	      var thClass = "";
	      thClass += "slds-is-sorted--" + this.state.sort.order;
	      thClass += col === this.state.sort.col ? " slds-is-sorted" : "";
	      return m("th.slds-is-sortable.slds-is-resizable", {
	        className: thClass
	      }, m("a.slds-th__action.slds-text-link--reset[href='javascript:void(0);']", {
	        "data-sort-by": cols[col]["sortable"] ? col : ""
	      }, m("span.slds-assistive-text", "Sort "), m("span.slds-truncate", {
	        "data-sort-by": cols[col]["sortable"] ? col : ""
	      }, cols[col]["label"]), m(".slds-icon_container", m("svg.slds-icon.slds-icon--x-small.slds-icon-text-default.slds-is-sortable__icon[aria-hidden='true']", [m("use[xlink:href='/assets/icons/utility-sprite/svg/symbols.svg#arrowdown']")]))));
	    } else {
	      return m("th[scope='col']", [m(".slds-truncate", {
	        title: cols[col]["label"],
	        "data-sort-by": cols[col]["sortable"] ? col : ""
	      }, cols[col]["label"])]);
	    }
	  }
	};
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL2RhdGF0YWJsZS5qcyJdLCJuYW1lcyI6WyJlcnJvck1zZyIsImUiLCJtIiwic29ydFRhYmxlIiwibGlzdCIsInNvcnQiLCJvcmRlciIsImEiLCJiIiwiY29sIiwib25pbml0Iiwidm5vZGUiLCJzdGF0ZSIsImNvbHMiLCJhdHRycyIsIk9iamVjdCIsImtleXMiLCJlcnJvciIsImRhdGEiLCJydW4iLCJrZXkiLCJoYW5kbGVTb3J0IiwicHJvcCIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsImluZGV4T2YiLCJyZWRyYXciLCJ0YWJsZUNsYXNzIiwic3RyaXBlZCIsImhvdmVyZWQiLCJ1bmRlZmluZWQiLCJ2aWV3IiwiY29sc0tleXMiLCJjbGFzc05hbWUiLCJvbmNsaWNrIiwibWFwIiwidGFibGVIZWFkZXIiLCJyb3ciLCJsaW5rIiwiaSIsInRpdGxlIiwiaHJlZiIsIm9uY3JlYXRlIiwicm91dGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNvbHNwYW4iLCJsZW5ndGgiLCJ0aENsYXNzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7Ozs7Ozs7QUFTQTs7Ozs7OztBQU9BOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFRQTs7Ozs7OztBQVFBOzs7OztrQkFLZTtBQUViQSxVQUZhLG9CQUVKQyxDQUZJLEVBRUQ7QUFDVixXQUFPQSxJQUFJQyxFQUFFLFFBQUYsRUFBWUQsQ0FBWixDQUFKLEdBQXFCLElBQTVCO0FBQ0QsR0FKWTtBQU1iRSxXQU5hLHFCQU1IQyxJQU5HLEVBTUdDLElBTkgsRUFNUztBQUNwQixZQUFRQSxLQUFLQyxLQUFiO0FBQ0UsV0FBSyxLQUFMO0FBQ0VGLGFBQUtDLElBQUwsQ0FBVSxVQUFVRSxDQUFWLEVBQWFDLENBQWIsRUFBZ0I7QUFDeEIsaUJBQU9ELEVBQUVGLEtBQUtJLEdBQVAsSUFBY0QsRUFBRUgsS0FBS0ksR0FBUCxDQUFkLEdBQTRCLENBQTVCLEdBQWdDRixFQUFFRixLQUFLSSxHQUFQLElBQWNELEVBQUVILEtB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QVd0QyxRQUFRLEtBQUtHLEtBQUwsQ0FBV1AsSUFBWCxDQUFnQkksR0FBeEIsR0FBOEIsaUJBQTlCLEdBQWtELEVBQTdEO0FBQ0EsYUFBT1AsRUFBRSx1Q0FBRixFQUEyQztBQUNoRCtCLG1CQUFXYztBQURxQyxPQUEzQyxFQUdMN0MsRUFBRSxxRUFBRixFQUF5RTtBQUN2RSx3QkFBZ0JXLEtBQUtKLEdBQUwsRUFBVSxVQUFWLElBQXdCQSxHQUF4QixHQUE4QjtBQUR5QixPQUF6RSxFQUdFUCxFQUFFLDBCQUFGLEVBQThCLE9BQTlCLENBSEYsRUFJRUEsRUFBRSxvQkFBRixFQUF3QjtBQUN0Qix3QkFBZ0JXLEtBQUtKLEdBQUwsRUFBVSxVQUFWLElBQXdCQSxHQUF4QixHQUE4QjtBQUR4QixPQUF4QixFQUVHSSxLQUFLSixHQUFMLEVBQVUsT0FBVixDQUZILENBSkYsRUFPRVAsRUFBRSxzQkFBRixFQUNFQSxFQUFFLG9HQUFGLEVBQXdHLENBQ3RHQSxFQUFFLDBFQUFGLENBRHNHLENBQXhHLENBREYsQ0FQRixDQUhLLENBQVA7QUFpQkQsS0FyQkQsTUFxQk87QUFDTCxhQUFPQSxFQUFFLGlCQUFGLEVBQXFCLENBQzFCQSxFQUFFLGdCQUFGLEVBQW9CO0FBQ2xCc0MsZUFBTzNCLEtBQUtKLEdBQUwsRUFBVSxPQUFWLENBRFc7QUFFbEIsd0JBQWdCSSxLQUFLSixHQUFMLEVBQVUsVUFBVixJQUF3QkEsR0FBeEIsR0FBOEI7QUFGNUIsT0FBcEIsRUFHR0ksS0FBS0osR0FBTCxFQUFVLE9BQVYsQ0FISCxDQUQwQixDQUFyQixDQUFQO0FBTUQ7QUFDRjtBQWhJWSxDIiwiZmlsZSI6ImRhdGF0YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9tZmVpdG96YS9Db2RlL21pdGhyaWwtbGlnaHRuaW5nIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBkYXRhdGFibGVBdHRyc1xuICogQHByb3BlcnR5IHtsaXN0fSAtIERhdGEgdG8gYmUgZGlzcGxheWVkLlxuICogQHR5cGUge3NvcnRTdGF0ZX0gc29ydCAtIFNvcnRpbmcgc3RhdGUgb2JqZWN0LlxuICogQHR5cGUge3JlY29yZExpbmt9IGxpbmsgLSBPYmplY3QgcHJvcGVydHkgdG8gdXNlIGFzIGtleSBhbmQgcmVjb3JkIGhyZWYuXG4gKiBAdHlwZSB7e2NvbDogY29sc09iamVjdH19IGNvbHMgLSBPYmplY3QgY29udGFpbnMgdGhlIGNvbHVtbnMgdG8gYmUgZGlzcGxheWVkLlxuICpcbiAqL1xuXG4vKipcbiAqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBzb3J0U3RhdGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjb2wgLSBjb2x1bW4ga2V5LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IG9yZGVyIC0gYXNjIG9yIGRlc2MuXG4gKi9cblxuLyoqXG4gKlxuICogQHR5cGVkZWYge29iamVjdH0gcmVjb3JkTGlua1xuICogQHByb3BlcnR5IHtzdHJpbmd9IGtleSAtIHJlY29yZCB1bmlxdWUgaWRlbnRpZmllci5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjb2wgLSBjb2x1bW4ga2V5IHRvIGJlIHJlY29yZCBsaW5rLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGhyZWYgLSBiYXNlIGhyZWYgZm9yIHJlY29yZC5cbiAqXG4gKi9cblxuLyoqXG4gKlxuICogQHR5cGVkZWYge29iamVjdH0gY29sc09iamVjdFxuICogQHByb3BlcnR5IHtzdHJpbmd9IGxhYmVsIC0gcmVjb3JkIHVuaXF1ZSBpZGVudGlmaWVyLlxuICogQHR5cGUge2Zvcm1hdENhbGxiYWNrfSBmb3JtYXRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gc29ydGFibGUuXG4gKi9cblxuLyoqXG4gKiBUaGlzIGNhbGxiYWNrIGlzIHVzZWQgdG8gZm9ybWF0IG9yIGFkZCBleHRyYSBzdHlsZSB0byBjZWxsIHZhbHVlLlxuICogQGNhbGxiYWNrIGZvcm1hdENhbGxiYWNrXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSB0aGUgdmFsdWUgdG8gYmUgZm9ybWF0ZWRcbiAqIEByZXR1cm4ge3N0cmluZ3xoeXBlcnNjcmlwdH1cbiAqL1xuXG5cbi8qKlxuICogRGF0YXRhYmxlIGF0dHJpYnV0ZXMuXG4gKlxuICogQHBhcmFtIHtkYXRhdGFibGVBdHRyc31cbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuXG4gIGVycm9yTXNnKGUpIHtcbiAgICByZXR1cm4gZSA/IG0oXCIuZXJyb3JcIiwgZSkgOiBudWxsXG4gIH0sXG5cbiAgc29ydFRhYmxlKGxpc3QsIHNvcnQpIHtcbiAgICBzd2l0Y2ggKHNvcnQub3JkZXIpIHtcbiAgICAgIGNhc2UgXCJhc2NcIjpcbiAgICAgICAgbGlzdC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgcmV0dXJuIGFbc29ydC5jb2xdID4gYltzb3J0LmNvbF0gPyAxIDogYVtzb3J0LmNvbF0gPCBiW3NvcnQuY29sXSA/IC0xIDogMFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZGVzY1wiOlxuICAgICAgICBsaXN0LnNvcnQoZnVuY3Rpb24gKGIsIGEpIHtcbiAgICAgICAgICByZXR1cm4gYVtzb3J0LmNvbF0gPiBiW3NvcnQuY29sXSA/IDEgOiBhW3NvcnQuY29sXSA8IGJbc29ydC5jb2xdID8gLTEgOiAwXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxpc3Quc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgIHJldHVybiBhW3NvcnQuY29sXSA+IGJbc29ydC5jb2xdID8gMSA6IGFbc29ydC5jb2xdIDwgYltzb3J0LmNvbF0gPyAtMSA6IDBcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIG9uaW5pdCh2bm9kZSkge1xuXG4gICAgdm5vZGUuc3RhdGUuY29scyA9IHZub2RlLmF0dHJzLmNvbHMgPyBPYmplY3Qua2V5cyh2bm9kZS5hdHRycy5jb2xzKSA6IGZhbHNlO1xuXG4gICAgdm5vZGUuc3RhdGUuZXJyb3IgPSB2bm9kZS5hdHRycy5kYXRhLmVycm9yLnJ1bih2bm9kZS5zdGF0ZS5lcnJvck1zZyk7XG5cbiAgICB2bm9kZS5zdGF0ZS5zb3J0ID0gdm5vZGUuYXR0cnMuc29ydCB8fCB7XG4gICAgICAgIGtleTogXCJcIixcbiAgICAgICAgb3JkZXI6IFwiXCJcbiAgICAgIH07XG5cbiAgICB2bm9kZS5zdGF0ZS5oYW5kbGVTb3J0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBwcm9wID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1zb3J0LWJ5XCIpO1xuICAgICAgdm5vZGUuc3RhdGUuc29ydC5vcmRlciA9IHZub2RlLnN0YXRlLnNvcnQuY29sICE9PSBwcm9wID8gXCJkZXNjXCIgOiB2bm9kZS5zdGF0ZS5zb3J0Lm9yZGVyID09PSBcImFzY1wiID8gXCJkZXNjXCIgOiBcImFzY1wiO1xuICAgICAgdm5vZGUuc3RhdGUuc29ydC5jb2wgPSBwcm9wO1xuICAgICAgaWYgKHZub2RlLnN0YXRlLmNvbHMuaW5kZXhPZihwcm9wKSA9PT0gLTEpIHtcbiAgICAgICAgZS5yZWRyYXcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdm5vZGUuc3RhdGUudGFibGVDbGFzcyA9IFwiXCI7XG4gICAgdm5vZGUuc3RhdGUudGFibGVDbGFzcyArPSB2bm9kZS5hdHRycy5zdHJpcGVkID8gXCJzbGRzLXRhYmxlLS1zdHJpcGVkIFwiIDogXCJcIjtcbiAgICB2bm9kZS5zdGF0ZS50YWJsZUNsYXNzICs9IHZub2RlLmF0dHJzLmhvdmVyZWQgfHwgdm5vZGUuYXR0cnMuaG92ZXJlZCA9PT0gdW5kZWZpbmVkID8gXCJcIiA6IFwic2xkcy1uby1yb3ctaG92ZXIgXCI7XG5cbiAgfSxcblxuICB2aWV3KHZub2RlKSB7XG4gICAgaWYgKCF2bm9kZS5zdGF0ZS5jb2xzKSByZXR1cm47XG5cbiAgICB2YXIgZGF0YSA9IHR5cGVvZiB2bm9kZS5hdHRycy5kYXRhID09PSBcImZ1bmN0aW9uXCIgPyB2bm9kZS5hdHRycy5kYXRhKCkgOiB2bm9kZS5hdHRycy5kYXRhO1xuICAgIHZhciBjb2xzS2V5cyA9IHZub2RlLnN0YXRlLmNvbHM7XG4gICAgdmFyIGNvbHMgPSB2bm9kZS5hdHRycy5jb2xzO1xuXG4gICAgaWYgKGRhdGEgJiYgdm5vZGUuc3RhdGUuc29ydCkge1xuICAgICAgdm5vZGUuc3RhdGUuc29ydFRhYmxlKGRhdGEsIHZub2RlLnN0YXRlLnNvcnQpXG4gICAgfVxuXG4gICAgaWYgKHZub2RlLnN0YXRlLmVycm9yKCkpIHtcbiAgICAgIHJldHVybiB2bm9kZS5zdGF0ZS5lcnJvcigpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtKFwidGFibGUuc2xkcy10YWJsZS5zbGRzLXRhYmxlLS1ib3JkZXJlZC5zbGRzLXRhYmxlLS1jZWxsLWJ1ZmZlclwiLCB7XG4gICAgICAgIGNsYXNzTmFtZTogdm5vZGUuc3RhdGUudGFibGVDbGFzcyxcbiAgICAgICAgb25jbGljazogdm5vZGUuc3RhdGUuaGFuZGxlU29ydFxuICAgICAgfSxcbiAgICAgICAgbShcInRoZWFkXCIsXG4gICAgICAgICAgbShcInRyLnNsZHMtdGV4dC10aXRsZS0tY2Fwc1wiLFxuICAgICAgICAgICAgY29sc0tleXMubWFwKHZub2RlLnN0YXRlLnRhYmxlSGVhZGVyLCB2bm9kZSlcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIG0oXCJ0Ym9keVwiLFxuICAgICAgICAgIGRhdGEgP1xuICAgICAgICAgICAgZGF0YS5tYXAoKHJvdykgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gbShcInRyXCIsIHtrZXk6IHJvd1t2bm9kZS5hdHRycy5saW5rLmtleV19LCBjb2xzS2V5cy5tYXAoKGNvbCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IDAgJiYgdm5vZGUuYXR0cnMubGluaykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbShcInRoW3Njb3BlPSdyb3cnXVwiLCB7XCJkYXRhLWxhYmVsXCI6IGNvbH0sXG4gICAgICAgICAgICAgICAgICAgICAgbShcImRpdi5zbGRzLXRydW5jYXRlXCIsIHt0aXRsZTogcm93W2NvbF19LCBtKFwiYVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBocmVmOiB2bm9kZS5hdHRycy5saW5rLmhyZWYgKyByb3dbdm5vZGUuYXR0cnMubGluay5rZXldLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25jcmVhdGU6IG0ucm91dGUubGlua1xuICAgICAgICAgICAgICAgICAgICAgIH0sIHJvd1tjb2xdKSlcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG0oXCJ0ZFwiLCB7XCJkYXRhLWxhYmVsXCI6IGNvbH0sXG4gICAgICAgICAgICAgICAgICAgICAgbShcImRpdi5zbGRzLXRydW5jYXRlXCIsIHt0aXRsZTogcm93W2NvbF19LCBjb2xzW2NvbF0uaGFzT3duUHJvcGVydHkoXCJmb3JtYXRcIikgPyBjb2xzW2NvbF1bXCJmb3JtYXRcIl0ocm93W2NvbF0pIDogcm93W2NvbF0pKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pIDogbShcInRyXCIsIG0oXCJ0ZFwiLCB7Y29sc3BhbjogY29sc0tleXMubGVuZ3RofSwgXCJMb2FkaW5nIGRhdGEuLi5cIikpXG4gICAgICAgIClcbiAgICAgIClcbiAgICB9XG4gIH0sXG5cbiAgdGFibGVIZWFkZXIoY29sKSB7XG4gICAgdmFyIGNvbHMgPSB0aGlzLmF0dHJzLmNvbHM7XG4gICAgaWYgKGNvbHNbY29sXVtcInNvcnRhYmxlXCJdKSB7XG4gICAgICB2YXIgdGhDbGFzcyA9IFwiXCI7XG4gICAgICB0aENsYXNzICs9IFwic2xkcy1pcy1zb3J0ZWQtLVwiICsgdGhpcy5zdGF0ZS5zb3J0Lm9yZGVyO1xuICAgICAgdGhDbGFzcyArPSBjb2wgPT09IHRoaXMuc3RhdGUuc29ydC5jb2wgPyBcIiBzbGRzLWlzLXNvcnRlZFwiIDogXCJcIjtcbiAgICAgIHJldHVybiBtKFwidGguc2xkcy1pcy1zb3J0YWJsZS5zbGRzLWlzLXJlc2l6YWJsZVwiLCB7XG4gICAgICAgIGNsYXNzTmFtZTogdGhDbGFzc1xuICAgICAgfSxcbiAgICAgICAgbShcImEuc2xkcy10aF9fYWN0aW9uLnNsZHMtdGV4dC1saW5rLS1yZXNldFtocmVmPSdqYXZhc2NyaXB0OnZvaWQoMCk7J11cIiwge1xuICAgICAgICAgIFwiZGF0YS1zb3J0LWJ5XCI6IGNvbHNbY29sXVtcInNvcnRhYmxlXCJdID8gY29sIDogXCJcIlxuICAgICAgICB9LFxuICAgICAgICAgIG0oXCJzcGFuLnNsZHMtYXNzaXN0aXZlLXRleHRcIiwgXCJTb3J0IFwiKSxcbiAgICAgICAgICBtKFwic3Bhbi5zbGRzLXRydW5jYXRlXCIsIHtcbiAgICAgICAgICAgIFwiZGF0YS1zb3J0LWJ5XCI6IGNvbHNbY29sXVtcInNvcnRhYmxlXCJdID8gY29sIDogXCJcIlxuICAgICAgICAgIH0sIGNvbHNbY29sXVtcImxhYmVsXCJdKSxcbiAgICAgICAgICBtKFwiLnNsZHMtaWNvbl9jb250YWluZXJcIixcbiAgICAgICAgICAgIG0oXCJzdmcuc2xkcy1pY29uLnNsZHMtaWNvbi0teC1zbWFsbC5zbGRzLWljb24tdGV4dC1kZWZhdWx0LnNsZHMtaXMtc29ydGFibGVfX2ljb25bYXJpYS1oaWRkZW49J3RydWUnXVwiLCBbXG4gICAgICAgICAgICAgIG0oXCJ1c2VbeGxpbms6aHJlZj0nL2Fzc2V0cy9pY29ucy91dGlsaXR5LXNwcml0ZS9zdmcvc3ltYm9scy5zdmcjYXJyb3dkb3duJ11cIilcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtKFwidGhbc2NvcGU9J2NvbCddXCIsIFtcbiAgICAgICAgbShcIi5zbGRzLXRydW5jYXRlXCIsIHtcbiAgICAgICAgICB0aXRsZTogY29sc1tjb2xdW1wibGFiZWxcIl0sXG4gICAgICAgICAgXCJkYXRhLXNvcnQtYnlcIjogY29sc1tjb2xdW1wic29ydGFibGVcIl0gPyBjb2wgOiBcIlwiXG4gICAgICAgIH0sIGNvbHNbY29sXVtcImxhYmVsXCJdKVxuICAgICAgXSlcbiAgICB9XG4gIH1cblxufTtcbiJdfQ==

/***/ }
/******/ ]);
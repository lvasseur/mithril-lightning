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
	      }, [m("thead", [m("tr.slds-text-title--caps", colsKeys.map(vnode.state.tableHeader, vnode))]), m("tbody", [data ? data.map(function (row) {
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
	  tableHeader: function tableHeader(col) {
	    var cols = this.attrs.cols;
	    if (cols[col]["sortable"]) {
	      var thClass = "";
	      thClass += "slds-is-sorted--" + this.state.sort.order;
	      thClass += col === this.state.sort.col ? " slds-is-sorted" : "";
	      return m("th.slds-is-sortable.slds-is-resizable", {
	        className: thClass
	      }, [m("a.slds-th__action.slds-text-link--reset[href='javascript:void(0);']", {
	        "data-sort-by": cols[col]["sortable"] ? col : ""
	      }, [m("span.slds-assistive-text", "Sort "), m("span.slds-truncate", {
	        "data-sort-by": cols[col]["sortable"] ? col : ""
	      }, cols[col]["label"]), m(".slds-icon_container", [m("svg.slds-icon.slds-icon--x-small.slds-icon-text-default.slds-is-sortable__icon[aria-hidden='true']", [m("use[xlink:href='/assets/icons/utility-sprite/svg/symbols.svg#arrowdown']")])])])]);
	    } else {
	      return m("th[scope='col']", [m(".slds-truncate", {
	        title: cols[col]["label"],
	        "data-sort-by": cols[col]["sortable"] ? col : ""
	      }, cols[col]["label"])]);
	    }
	  }
	};
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL2RhdGF0YWJsZS5qcyJdLCJuYW1lcyI6WyJjb21wb25lbnQiLCJlcnJvck1zZyIsImUiLCJtIiwic29ydFRhYmxlIiwibGlzdCIsInNvcnQiLCJvcmRlciIsImEiLCJiIiwiY29sIiwib25pbml0Iiwidm5vZGUiLCJzdGF0ZSIsImNvbHMiLCJhdHRycyIsIk9iamVjdCIsImtleXMiLCJlcnJvciIsImRhdGEiLCJydW4iLCJrZXkiLCJoYW5kbGVTb3J0IiwicHJvcCIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsImluZGV4T2YiLCJyZWRyYXciLCJ0YWJsZUNsYXNzIiwic3RyaXBlZCIsImhvdmVyZWQiLCJ1bmRlZmluZWQiLCJ2aWV3IiwiY29sc0tleXMiLCJjbGFzc05hbWUiLCJvbmNsaWNrIiwibWFwIiwidGFibGVIZWFkZXIiLCJyb3ciLCJsaW5rIiwiaSIsInRpdGxlIiwiaHJlZiIsIm9uY3JlYXRlIiwicm91dGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNvbHNwYW4iLCJsZW5ndGgiLCJ0aENsYXNzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7Ozs7Ozs7QUFTQTs7Ozs7OztBQU9BOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFRQTs7Ozs7OztBQVFBOzs7OztBQUtPLElBQU1BLGdDQUFZO0FBRXZCQyxVQUZ1QixvQkFFZEMsQ0FGYyxFQUVYO0FBQ1YsV0FBT0EsSUFBSUMsRUFBRSxRQUFGLEVBQVlELENBQVosQ0FBSixHQUFxQixJQUE1QjtBQUNELEdBSnNCO0FBTXZCRSxXQU51QixxQkFNYkMsSUFOYSxFQU1QQyxJQU5PLEVBTUQ7QUFDcEIsWUFBUUEsS0FBS0MsS0FBYjtBQUNFLFdBQUssS0FBTDtBQUNFRixhQUFLQyxJQUFMLENBQVUsVUFBVUUsQ0FBVixFQUFhQyxDQUFiLEVBQWdCO0FBQ3hCLGlCQUFPRCxFQUFFRixLQUFLSSxHQUFQLElBQWNELEVBQUVILEtBQUtJLEdBQVAsQ0FBZCxHQUE0QixDQUE1QixHQUFnQ0YsRUFB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LEVBQWQ7QUFDQUEsaUJBQVcscUJBQXFCLEtBQUtuQyxLQUFMLENBQVdQLElBQVgsQ0FBZ0JDLEtBQWhEO0FBQ0F5QyxpQkFBV3RDLFFBQVEsS0FBS0csS0FBTCxDQUFXUCxJQUFYLENBQWdCSSxHQUF4QixHQUE4QixpQkFBOUIsR0FBa0QsRUFBN0Q7QUFDQSxhQUFPUCxFQUFFLHVDQUFGLEVBQTJDO0FBQ2hEK0IsbUJBQVdjO0FBRHFDLE9BQTNDLEVBRUosQ0FDRDdDLEVBQUUscUVBQUYsRUFBeUU7QUFDdkUsd0JBQWdCVyxLQUFLSixHQUFMLEVBQVUsVUFBVixJQUF3QkEsR0FBeEIsR0FBOEI7QUFEeUIsT0FBekUsRUFFRyxDQUNEUCxFQUFFLDBCQUFGLEVBQThCLE9BQTlCLENBREMsRUFFREEsRUFBRSxvQkFBRixFQUF3QjtBQUN0Qix3QkFBZ0JXLEtBQUtKLEdBQUwsRUFBVSxVQUFWLElBQXdCQSxHQUF4QixHQUE4QjtBQUR4QixPQUF4QixFQUVHSSxLQUFLSixHQUFMLEVBQVUsT0FBVixDQUZILENBRkMsRUFLRFAsRUFBRSxzQkFBRixFQUEwQixDQUN4QkEsRUFBRSxvR0FBRixFQUF3RyxDQUN0R0EsRUFBRSwwRUFBRixDQURzRyxDQUF4RyxDQUR3QixDQUExQixDQUxDLENBRkgsQ0FEQyxDQUZJLENBQVA7QUFpQkQsS0FyQkQsTUFxQk87QUFDTCxhQUFPQSxFQUFFLGlCQUFGLEVBQXFCLENBQzFCQSxFQUFFLGdCQUFGLEVBQW9CO0FBQ2xCc0MsZUFBTzNCLEtBQUtKLEdBQUwsRUFBVSxPQUFWLENBRFc7QUFFbEIsd0JBQWdCSSxLQUFLSixHQUFMLEVBQVUsVUFBVixJQUF3QkEsR0FBeEIsR0FBOEI7QUFGNUIsT0FBcEIsRUFHR0ksS0FBS0osR0FBTCxFQUFVLE9BQVYsQ0FISCxDQUQwQixDQUFyQixDQUFQO0FBTUQ7QUFDRjtBQWhJc0IsQ0FBbEIiLCJmaWxlIjoiZGF0YXRhYmxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL21mZWl0b3phL0NvZGUvbWl0aHJpbC1saWdodG5pbmciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IGRhdGF0YWJsZUF0dHJzXG4gKiBAcHJvcGVydHkge2xpc3R9IC0gRGF0YSB0byBiZSBkaXNwbGF5ZWQuXG4gKiBAdHlwZSB7c29ydFN0YXRlfSBzb3J0IC0gU29ydGluZyBzdGF0ZSBvYmplY3QuXG4gKiBAdHlwZSB7cmVjb3JkTGlua30gbGluayAtIE9iamVjdCBwcm9wZXJ0eSB0byB1c2UgYXMga2V5IGFuZCByZWNvcmQgaHJlZi5cbiAqIEB0eXBlIHt7Y29sOiBjb2xzT2JqZWN0fX0gY29scyAtIE9iamVjdCBjb250YWlucyB0aGUgY29sdW1ucyB0byBiZSBkaXNwbGF5ZWQuXG4gKlxuICovXG5cbi8qKlxuICpcbiAqIEB0eXBlZGVmIHtvYmplY3R9IHNvcnRTdGF0ZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNvbCAtIGNvbHVtbiBrZXkuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gb3JkZXIgLSBhc2Mgb3IgZGVzYy5cbiAqL1xuXG4vKipcbiAqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSByZWNvcmRMaW5rXG4gKiBAcHJvcGVydHkge3N0cmluZ30ga2V5IC0gcmVjb3JkIHVuaXF1ZSBpZGVudGlmaWVyLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNvbCAtIGNvbHVtbiBrZXkgdG8gYmUgcmVjb3JkIGxpbmsuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaHJlZiAtIGJhc2UgaHJlZiBmb3IgcmVjb3JkLlxuICpcbiAqL1xuXG4vKipcbiAqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBjb2xzT2JqZWN0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gbGFiZWwgLSByZWNvcmQgdW5pcXVlIGlkZW50aWZpZXIuXG4gKiBAdHlwZSB7Zm9ybWF0Q2FsbGJhY2t9IGZvcm1hdFxuICogQHByb3BlcnR5IHtib29sZWFufSBzb3J0YWJsZS5cbiAqL1xuXG4vKipcbiAqIFRoaXMgY2FsbGJhY2sgaXMgdXNlZCB0byBmb3JtYXQgb3IgYWRkIGV4dHJhIHN0eWxlIHRvIGNlbGwgdmFsdWUuXG4gKiBAY2FsbGJhY2sgZm9ybWF0Q2FsbGJhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBiZSBmb3JtYXRlZFxuICogQHJldHVybiB7c3RyaW5nfGh5cGVyc2NyaXB0fVxuICovXG5cblxuLyoqXG4gKiBEYXRhdGFibGUgYXR0cmlidXRlcy5cbiAqXG4gKiBAcGFyYW0ge2RhdGF0YWJsZUF0dHJzfVxuICovXG5leHBvcnQgY29uc3QgY29tcG9uZW50ID0ge1xuXG4gIGVycm9yTXNnKGUpIHtcbiAgICByZXR1cm4gZSA/IG0oXCIuZXJyb3JcIiwgZSkgOiBudWxsXG4gIH0sXG5cbiAgc29ydFRhYmxlKGxpc3QsIHNvcnQpIHtcbiAgICBzd2l0Y2ggKHNvcnQub3JkZXIpIHtcbiAgICAgIGNhc2UgXCJhc2NcIjpcbiAgICAgICAgbGlzdC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgcmV0dXJuIGFbc29ydC5jb2xdID4gYltzb3J0LmNvbF0gPyAxIDogYVtzb3J0LmNvbF0gPCBiW3NvcnQuY29sXSA/IC0xIDogMFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZGVzY1wiOlxuICAgICAgICBsaXN0LnNvcnQoZnVuY3Rpb24gKGIsIGEpIHtcbiAgICAgICAgICByZXR1cm4gYVtzb3J0LmNvbF0gPiBiW3NvcnQuY29sXSA/IDEgOiBhW3NvcnQuY29sXSA8IGJbc29ydC5jb2xdID8gLTEgOiAwXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxpc3Quc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgIHJldHVybiBhW3NvcnQuY29sXSA+IGJbc29ydC5jb2xdID8gMSA6IGFbc29ydC5jb2xdIDwgYltzb3J0LmNvbF0gPyAtMSA6IDBcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIG9uaW5pdCh2bm9kZSkge1xuXG4gICAgdm5vZGUuc3RhdGUuY29scyA9IHZub2RlLmF0dHJzLmNvbHMgPyBPYmplY3Qua2V5cyh2bm9kZS5hdHRycy5jb2xzKSA6IGZhbHNlO1xuXG4gICAgdm5vZGUuc3RhdGUuZXJyb3IgPSB2bm9kZS5hdHRycy5kYXRhLmVycm9yLnJ1bih2bm9kZS5zdGF0ZS5lcnJvck1zZyk7XG5cbiAgICB2bm9kZS5zdGF0ZS5zb3J0ID0gdm5vZGUuYXR0cnMuc29ydCB8fCB7XG4gICAgICAgIGtleTogXCJcIixcbiAgICAgICAgb3JkZXI6IFwiXCJcbiAgICAgIH07XG5cbiAgICB2bm9kZS5zdGF0ZS5oYW5kbGVTb3J0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBwcm9wID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1zb3J0LWJ5XCIpO1xuICAgICAgdm5vZGUuc3RhdGUuc29ydC5vcmRlciA9IHZub2RlLnN0YXRlLnNvcnQuY29sICE9PSBwcm9wID8gXCJkZXNjXCIgOiB2bm9kZS5zdGF0ZS5zb3J0Lm9yZGVyID09PSBcImFzY1wiID8gXCJkZXNjXCIgOiBcImFzY1wiO1xuICAgICAgdm5vZGUuc3RhdGUuc29ydC5jb2wgPSBwcm9wO1xuICAgICAgaWYgKHZub2RlLnN0YXRlLmNvbHMuaW5kZXhPZihwcm9wKSA9PT0gLTEpIHtcbiAgICAgICAgZS5yZWRyYXcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdm5vZGUuc3RhdGUudGFibGVDbGFzcyA9IFwiXCI7XG4gICAgdm5vZGUuc3RhdGUudGFibGVDbGFzcyArPSB2bm9kZS5hdHRycy5zdHJpcGVkID8gXCJzbGRzLXRhYmxlLS1zdHJpcGVkIFwiIDogXCJcIjtcbiAgICB2bm9kZS5zdGF0ZS50YWJsZUNsYXNzICs9IHZub2RlLmF0dHJzLmhvdmVyZWQgfHwgdm5vZGUuYXR0cnMuaG92ZXJlZCA9PT0gdW5kZWZpbmVkID8gXCJcIiA6IFwic2xkcy1uby1yb3ctaG92ZXIgXCI7XG5cbiAgfSxcblxuICB2aWV3KHZub2RlKSB7XG4gICAgaWYgKCF2bm9kZS5zdGF0ZS5jb2xzKSByZXR1cm47XG5cbiAgICB2YXIgZGF0YSA9IHR5cGVvZiB2bm9kZS5hdHRycy5kYXRhID09PSBcImZ1bmN0aW9uXCIgPyB2bm9kZS5hdHRycy5kYXRhKCkgOiB2bm9kZS5hdHRycy5kYXRhO1xuICAgIHZhciBjb2xzS2V5cyA9IHZub2RlLnN0YXRlLmNvbHM7XG4gICAgdmFyIGNvbHMgPSB2bm9kZS5hdHRycy5jb2xzO1xuXG4gICAgaWYgKGRhdGEgJiYgdm5vZGUuc3RhdGUuc29ydCkge1xuICAgICAgdm5vZGUuc3RhdGUuc29ydFRhYmxlKGRhdGEsIHZub2RlLnN0YXRlLnNvcnQpXG4gICAgfVxuXG4gICAgaWYgKHZub2RlLnN0YXRlLmVycm9yKCkpIHtcbiAgICAgIHJldHVybiB2bm9kZS5zdGF0ZS5lcnJvcigpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtKFwidGFibGUuc2xkcy10YWJsZS5zbGRzLXRhYmxlLS1ib3JkZXJlZC5zbGRzLXRhYmxlLS1jZWxsLWJ1ZmZlclwiLCB7XG4gICAgICAgIGNsYXNzTmFtZTogdm5vZGUuc3RhdGUudGFibGVDbGFzcyxcbiAgICAgICAgb25jbGljazogdm5vZGUuc3RhdGUuaGFuZGxlU29ydFxuICAgICAgfSwgW1xuICAgICAgICBtKFwidGhlYWRcIiwgW1xuICAgICAgICAgIG0oXCJ0ci5zbGRzLXRleHQtdGl0bGUtLWNhcHNcIixcbiAgICAgICAgICAgIGNvbHNLZXlzLm1hcCh2bm9kZS5zdGF0ZS50YWJsZUhlYWRlciwgdm5vZGUpXG4gICAgICAgICAgKVxuICAgICAgICBdKSxcbiAgICAgICAgbShcInRib2R5XCIsIFtcbiAgICAgICAgICBkYXRhID9cbiAgICAgICAgICAgIGRhdGEubWFwKChyb3cpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIG0oXCJ0clwiLCB7a2V5OiByb3dbdm5vZGUuYXR0cnMubGluay5rZXldfSwgY29sc0tleXMubWFwKChjb2wsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChpID09PSAwICYmIHZub2RlLmF0dHJzLmxpbmspIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG0oXCJ0aFtzY29wZT0ncm93J11cIiwge1wiZGF0YS1sYWJlbFwiOiBjb2x9LFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJkaXYuc2xkcy10cnVuY2F0ZVwiLCB7dGl0bGU6IHJvd1tjb2xdfSwgbShcImFcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHJlZjogdm5vZGUuYXR0cnMubGluay5ocmVmICsgcm93W3Zub2RlLmF0dHJzLmxpbmsua2V5XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uY3JlYXRlOiBtLnJvdXRlLmxpbmtcbiAgICAgICAgICAgICAgICAgICAgICB9LCByb3dbY29sXSkpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtKFwidGRcIiwge1wiZGF0YS1sYWJlbFwiOiBjb2x9LFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJkaXYuc2xkcy10cnVuY2F0ZVwiLCB7dGl0bGU6IHJvd1tjb2xdfSwgY29sc1tjb2xdLmhhc093blByb3BlcnR5KFwiZm9ybWF0XCIpID8gY29sc1tjb2xdW1wiZm9ybWF0XCJdKHJvd1tjb2xdKSA6IHJvd1tjb2xdKSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KSA6IG0oXCJ0clwiLCBtKFwidGRcIiwge2NvbHNwYW46IGNvbHNLZXlzLmxlbmd0aH0sIFwiTG9hZGluZyBkYXRhLi4uXCIpKVxuICAgICAgICBdKVxuICAgICAgXSlcbiAgICB9XG4gIH0sXG5cbiAgdGFibGVIZWFkZXIoY29sKSB7XG4gICAgdmFyIGNvbHMgPSB0aGlzLmF0dHJzLmNvbHM7XG4gICAgaWYgKGNvbHNbY29sXVtcInNvcnRhYmxlXCJdKSB7XG4gICAgICB2YXIgdGhDbGFzcyA9IFwiXCI7XG4gICAgICB0aENsYXNzICs9IFwic2xkcy1pcy1zb3J0ZWQtLVwiICsgdGhpcy5zdGF0ZS5zb3J0Lm9yZGVyO1xuICAgICAgdGhDbGFzcyArPSBjb2wgPT09IHRoaXMuc3RhdGUuc29ydC5jb2wgPyBcIiBzbGRzLWlzLXNvcnRlZFwiIDogXCJcIjtcbiAgICAgIHJldHVybiBtKFwidGguc2xkcy1pcy1zb3J0YWJsZS5zbGRzLWlzLXJlc2l6YWJsZVwiLCB7XG4gICAgICAgIGNsYXNzTmFtZTogdGhDbGFzc1xuICAgICAgfSwgW1xuICAgICAgICBtKFwiYS5zbGRzLXRoX19hY3Rpb24uc2xkcy10ZXh0LWxpbmstLXJlc2V0W2hyZWY9J2phdmFzY3JpcHQ6dm9pZCgwKTsnXVwiLCB7XG4gICAgICAgICAgXCJkYXRhLXNvcnQtYnlcIjogY29sc1tjb2xdW1wic29ydGFibGVcIl0gPyBjb2wgOiBcIlwiXG4gICAgICAgIH0sIFtcbiAgICAgICAgICBtKFwic3Bhbi5zbGRzLWFzc2lzdGl2ZS10ZXh0XCIsIFwiU29ydCBcIiksXG4gICAgICAgICAgbShcInNwYW4uc2xkcy10cnVuY2F0ZVwiLCB7XG4gICAgICAgICAgICBcImRhdGEtc29ydC1ieVwiOiBjb2xzW2NvbF1bXCJzb3J0YWJsZVwiXSA/IGNvbCA6IFwiXCJcbiAgICAgICAgICB9LCBjb2xzW2NvbF1bXCJsYWJlbFwiXSksXG4gICAgICAgICAgbShcIi5zbGRzLWljb25fY29udGFpbmVyXCIsIFtcbiAgICAgICAgICAgIG0oXCJzdmcuc2xkcy1pY29uLnNsZHMtaWNvbi0teC1zbWFsbC5zbGRzLWljb24tdGV4dC1kZWZhdWx0LnNsZHMtaXMtc29ydGFibGVfX2ljb25bYXJpYS1oaWRkZW49J3RydWUnXVwiLCBbXG4gICAgICAgICAgICAgIG0oXCJ1c2VbeGxpbms6aHJlZj0nL2Fzc2V0cy9pY29ucy91dGlsaXR5LXNwcml0ZS9zdmcvc3ltYm9scy5zdmcjYXJyb3dkb3duJ11cIilcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICAgIF0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtKFwidGhbc2NvcGU9J2NvbCddXCIsIFtcbiAgICAgICAgbShcIi5zbGRzLXRydW5jYXRlXCIsIHtcbiAgICAgICAgICB0aXRsZTogY29sc1tjb2xdW1wibGFiZWxcIl0sXG4gICAgICAgICAgXCJkYXRhLXNvcnQtYnlcIjogY29sc1tjb2xdW1wic29ydGFibGVcIl0gPyBjb2wgOiBcIlwiXG4gICAgICAgIH0sIGNvbHNbY29sXVtcImxhYmVsXCJdKVxuICAgICAgXSlcbiAgICB9XG4gIH1cblxufTtcbiJdfQ==

/***/ }
/******/ ]);
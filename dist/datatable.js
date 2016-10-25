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
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL2RhdGF0YWJsZS5qcyJdLCJuYW1lcyI6WyJjb21wb25lbnQiLCJlcnJvck1zZyIsImUiLCJtIiwic29ydFRhYmxlIiwibGlzdCIsInNvcnQiLCJvcmRlciIsImEiLCJiIiwiY29sIiwib25pbml0Iiwidm5vZGUiLCJzdGF0ZSIsImNvbHMiLCJhdHRycyIsIk9iamVjdCIsImtleXMiLCJlcnJvciIsImRhdGEiLCJydW4iLCJrZXkiLCJoYW5kbGVTb3J0IiwicHJvcCIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsImluZGV4T2YiLCJyZWRyYXciLCJ0YWJsZUNsYXNzIiwic3RyaXBlZCIsImhvdmVyZWQiLCJ1bmRlZmluZWQiLCJ2aWV3IiwiY29sc0tleXMiLCJjbGFzc05hbWUiLCJvbmNsaWNrIiwibWFwIiwidGFibGVIZWFkZXIiLCJyb3ciLCJsaW5rIiwiaSIsInRpdGxlIiwiaHJlZiIsIm9uY3JlYXRlIiwicm91dGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNvbHNwYW4iLCJsZW5ndGgiLCJ0aENsYXNzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7Ozs7Ozs7QUFTQTs7Ozs7OztBQU9BOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFRQTs7Ozs7OztBQVFBOzs7OztBQUtPLElBQU1BLGdDQUFZO0FBRXZCQyxVQUZ1QixvQkFFZEMsQ0FGYyxFQUVYO0FBQ1YsV0FBT0EsSUFBSUMsRUFBRSxRQUFGLEVBQVlELENBQVosQ0FBSixHQUFxQixJQUE1QjtBQUNELEdBSnNCO0FBTXZCRSxXQU51QixxQkFNYkMsSUFOYSxFQU1QQyxJQU5PLEVBTUQ7QUFDcEIsWUFBUUEsS0FBS0MsS0FBYjtBQUNFLFdBQUssS0FBTDtBQUNFRixhQUFLQyxJQUFMLENBQVUsVUFBVUUsQ0FBVixFQUFhQyxDQUFiLEVBQWdCO0FBQ3hCLGlCQUFPRCxFQUFFRixLQUFLSSxHQUFQLElBQWNELEVBQUVILEtBQUtJLEdBQVAsQ0FBZCxHQUE0QixDQUE1QixHQUFnQ0YsRUFB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QyxLQUFMLENBQVdQLElBQVgsQ0FBZ0JDLEtBQWhEO0FBQ0F5QyxpQkFBV3RDLFFBQVEsS0FBS0csS0FBTCxDQUFXUCxJQUFYLENBQWdCSSxHQUF4QixHQUE4QixpQkFBOUIsR0FBa0QsRUFBN0Q7QUFDQSxhQUFPUCxFQUFFLHVDQUFGLEVBQTJDO0FBQ2hEK0IsbUJBQVdjO0FBRHFDLE9BQTNDLEVBR0w3QyxFQUFFLHFFQUFGLEVBQXlFO0FBQ3ZFLHdCQUFnQlcsS0FBS0osR0FBTCxFQUFVLFVBQVYsSUFBd0JBLEdBQXhCLEdBQThCO0FBRHlCLE9BQXpFLEVBR0VQLEVBQUUsMEJBQUYsRUFBOEIsT0FBOUIsQ0FIRixFQUlFQSxFQUFFLG9CQUFGLEVBQXdCO0FBQ3RCLHdCQUFnQlcsS0FBS0osR0FBTCxFQUFVLFVBQVYsSUFBd0JBLEdBQXhCLEdBQThCO0FBRHhCLE9BQXhCLEVBRUdJLEtBQUtKLEdBQUwsRUFBVSxPQUFWLENBRkgsQ0FKRixFQU9FUCxFQUFFLHNCQUFGLEVBQ0VBLEVBQUUsb0dBQUYsRUFBd0csQ0FDdEdBLEVBQUUsMEVBQUYsQ0FEc0csQ0FBeEcsQ0FERixDQVBGLENBSEssQ0FBUDtBQWlCRCxLQXJCRCxNQXFCTztBQUNMLGFBQU9BLEVBQUUsaUJBQUYsRUFBcUIsQ0FDMUJBLEVBQUUsZ0JBQUYsRUFBb0I7QUFDbEJzQyxlQUFPM0IsS0FBS0osR0FBTCxFQUFVLE9BQVYsQ0FEVztBQUVsQix3QkFBZ0JJLEtBQUtKLEdBQUwsRUFBVSxVQUFWLElBQXdCQSxHQUF4QixHQUE4QjtBQUY1QixPQUFwQixFQUdHSSxLQUFLSixHQUFMLEVBQVUsT0FBVixDQUhILENBRDBCLENBQXJCLENBQVA7QUFNRDtBQUNGO0FBaElzQixDQUFsQiIsImZpbGUiOiJkYXRhdGFibGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvbWZlaXRvemEvQ29kZS9taXRocmlsLWxpZ2h0bmluZyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gZGF0YXRhYmxlQXR0cnNcbiAqIEBwcm9wZXJ0eSB7bGlzdH0gLSBEYXRhIHRvIGJlIGRpc3BsYXllZC5cbiAqIEB0eXBlIHtzb3J0U3RhdGV9IHNvcnQgLSBTb3J0aW5nIHN0YXRlIG9iamVjdC5cbiAqIEB0eXBlIHtyZWNvcmRMaW5rfSBsaW5rIC0gT2JqZWN0IHByb3BlcnR5IHRvIHVzZSBhcyBrZXkgYW5kIHJlY29yZCBocmVmLlxuICogQHR5cGUge3tjb2w6IGNvbHNPYmplY3R9fSBjb2xzIC0gT2JqZWN0IGNvbnRhaW5zIHRoZSBjb2x1bW5zIHRvIGJlIGRpc3BsYXllZC5cbiAqXG4gKi9cblxuLyoqXG4gKlxuICogQHR5cGVkZWYge29iamVjdH0gc29ydFN0YXRlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY29sIC0gY29sdW1uIGtleS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBvcmRlciAtIGFzYyBvciBkZXNjLlxuICovXG5cbi8qKlxuICpcbiAqIEB0eXBlZGVmIHtvYmplY3R9IHJlY29yZExpbmtcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBrZXkgLSByZWNvcmQgdW5pcXVlIGlkZW50aWZpZXIuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY29sIC0gY29sdW1uIGtleSB0byBiZSByZWNvcmQgbGluay5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBocmVmIC0gYmFzZSBocmVmIGZvciByZWNvcmQuXG4gKlxuICovXG5cbi8qKlxuICpcbiAqIEB0eXBlZGVmIHtvYmplY3R9IGNvbHNPYmplY3RcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBsYWJlbCAtIHJlY29yZCB1bmlxdWUgaWRlbnRpZmllci5cbiAqIEB0eXBlIHtmb3JtYXRDYWxsYmFja30gZm9ybWF0XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHNvcnRhYmxlLlxuICovXG5cbi8qKlxuICogVGhpcyBjYWxsYmFjayBpcyB1c2VkIHRvIGZvcm1hdCBvciBhZGQgZXh0cmEgc3R5bGUgdG8gY2VsbCB2YWx1ZS5cbiAqIEBjYWxsYmFjayBmb3JtYXRDYWxsYmFja1xuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIGJlIGZvcm1hdGVkXG4gKiBAcmV0dXJuIHtzdHJpbmd8aHlwZXJzY3JpcHR9XG4gKi9cblxuXG4vKipcbiAqIERhdGF0YWJsZSBhdHRyaWJ1dGVzLlxuICpcbiAqIEBwYXJhbSB7ZGF0YXRhYmxlQXR0cnN9XG4gKi9cbmV4cG9ydCBjb25zdCBjb21wb25lbnQgPSB7XG5cbiAgZXJyb3JNc2coZSkge1xuICAgIHJldHVybiBlID8gbShcIi5lcnJvclwiLCBlKSA6IG51bGxcbiAgfSxcblxuICBzb3J0VGFibGUobGlzdCwgc29ydCkge1xuICAgIHN3aXRjaCAoc29ydC5vcmRlcikge1xuICAgICAgY2FzZSBcImFzY1wiOlxuICAgICAgICBsaXN0LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICByZXR1cm4gYVtzb3J0LmNvbF0gPiBiW3NvcnQuY29sXSA/IDEgOiBhW3NvcnQuY29sXSA8IGJbc29ydC5jb2xdID8gLTEgOiAwXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkZXNjXCI6XG4gICAgICAgIGxpc3Quc29ydChmdW5jdGlvbiAoYiwgYSkge1xuICAgICAgICAgIHJldHVybiBhW3NvcnQuY29sXSA+IGJbc29ydC5jb2xdID8gMSA6IGFbc29ydC5jb2xdIDwgYltzb3J0LmNvbF0gPyAtMSA6IDBcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbGlzdC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgcmV0dXJuIGFbc29ydC5jb2xdID4gYltzb3J0LmNvbF0gPyAxIDogYVtzb3J0LmNvbF0gPCBiW3NvcnQuY29sXSA/IC0xIDogMFxuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgb25pbml0KHZub2RlKSB7XG5cbiAgICB2bm9kZS5zdGF0ZS5jb2xzID0gdm5vZGUuYXR0cnMuY29scyA/IE9iamVjdC5rZXlzKHZub2RlLmF0dHJzLmNvbHMpIDogZmFsc2U7XG5cbiAgICB2bm9kZS5zdGF0ZS5lcnJvciA9IHZub2RlLmF0dHJzLmRhdGEuZXJyb3IucnVuKHZub2RlLnN0YXRlLmVycm9yTXNnKTtcblxuICAgIHZub2RlLnN0YXRlLnNvcnQgPSB2bm9kZS5hdHRycy5zb3J0IHx8IHtcbiAgICAgICAga2V5OiBcIlwiLFxuICAgICAgICBvcmRlcjogXCJcIlxuICAgICAgfTtcblxuICAgIHZub2RlLnN0YXRlLmhhbmRsZVNvcnQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyIHByb3AgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNvcnQtYnlcIik7XG4gICAgICB2bm9kZS5zdGF0ZS5zb3J0Lm9yZGVyID0gdm5vZGUuc3RhdGUuc29ydC5jb2wgIT09IHByb3AgPyBcImRlc2NcIiA6IHZub2RlLnN0YXRlLnNvcnQub3JkZXIgPT09IFwiYXNjXCIgPyBcImRlc2NcIiA6IFwiYXNjXCI7XG4gICAgICB2bm9kZS5zdGF0ZS5zb3J0LmNvbCA9IHByb3A7XG4gICAgICBpZiAodm5vZGUuc3RhdGUuY29scy5pbmRleE9mKHByb3ApID09PSAtMSkge1xuICAgICAgICBlLnJlZHJhdyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2bm9kZS5zdGF0ZS50YWJsZUNsYXNzID0gXCJcIjtcbiAgICB2bm9kZS5zdGF0ZS50YWJsZUNsYXNzICs9IHZub2RlLmF0dHJzLnN0cmlwZWQgPyBcInNsZHMtdGFibGUtLXN0cmlwZWQgXCIgOiBcIlwiO1xuICAgIHZub2RlLnN0YXRlLnRhYmxlQ2xhc3MgKz0gdm5vZGUuYXR0cnMuaG92ZXJlZCB8fCB2bm9kZS5hdHRycy5ob3ZlcmVkID09PSB1bmRlZmluZWQgPyBcIlwiIDogXCJzbGRzLW5vLXJvdy1ob3ZlciBcIjtcblxuICB9LFxuXG4gIHZpZXcodm5vZGUpIHtcbiAgICBpZiAoIXZub2RlLnN0YXRlLmNvbHMpIHJldHVybjtcblxuICAgIHZhciBkYXRhID0gdHlwZW9mIHZub2RlLmF0dHJzLmRhdGEgPT09IFwiZnVuY3Rpb25cIiA/IHZub2RlLmF0dHJzLmRhdGEoKSA6IHZub2RlLmF0dHJzLmRhdGE7XG4gICAgdmFyIGNvbHNLZXlzID0gdm5vZGUuc3RhdGUuY29scztcbiAgICB2YXIgY29scyA9IHZub2RlLmF0dHJzLmNvbHM7XG5cbiAgICBpZiAoZGF0YSAmJiB2bm9kZS5zdGF0ZS5zb3J0KSB7XG4gICAgICB2bm9kZS5zdGF0ZS5zb3J0VGFibGUoZGF0YSwgdm5vZGUuc3RhdGUuc29ydClcbiAgICB9XG5cbiAgICBpZiAodm5vZGUuc3RhdGUuZXJyb3IoKSkge1xuICAgICAgcmV0dXJuIHZub2RlLnN0YXRlLmVycm9yKClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG0oXCJ0YWJsZS5zbGRzLXRhYmxlLnNsZHMtdGFibGUtLWJvcmRlcmVkLnNsZHMtdGFibGUtLWNlbGwtYnVmZmVyXCIsIHtcbiAgICAgICAgY2xhc3NOYW1lOiB2bm9kZS5zdGF0ZS50YWJsZUNsYXNzLFxuICAgICAgICBvbmNsaWNrOiB2bm9kZS5zdGF0ZS5oYW5kbGVTb3J0XG4gICAgICB9LFxuICAgICAgICBtKFwidGhlYWRcIixcbiAgICAgICAgICBtKFwidHIuc2xkcy10ZXh0LXRpdGxlLS1jYXBzXCIsXG4gICAgICAgICAgICBjb2xzS2V5cy5tYXAodm5vZGUuc3RhdGUudGFibGVIZWFkZXIsIHZub2RlKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgbShcInRib2R5XCIsXG4gICAgICAgICAgZGF0YSA/XG4gICAgICAgICAgICBkYXRhLm1hcCgocm93KSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBtKFwidHJcIiwge2tleTogcm93W3Zub2RlLmF0dHJzLmxpbmsua2V5XX0sIGNvbHNLZXlzLm1hcCgoY29sLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCAmJiB2bm9kZS5hdHRycy5saW5rKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtKFwidGhbc2NvcGU9J3JvdyddXCIsIHtcImRhdGEtbGFiZWxcIjogY29sfSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiZGl2LnNsZHMtdHJ1bmNhdGVcIiwge3RpdGxlOiByb3dbY29sXX0sIG0oXCJhXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6IHZub2RlLmF0dHJzLmxpbmsuaHJlZiArIHJvd1t2bm9kZS5hdHRycy5saW5rLmtleV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rXG4gICAgICAgICAgICAgICAgICAgICAgfSwgcm93W2NvbF0pKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbShcInRkXCIsIHtcImRhdGEtbGFiZWxcIjogY29sfSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiZGl2LnNsZHMtdHJ1bmNhdGVcIiwge3RpdGxlOiByb3dbY29sXX0sIGNvbHNbY29sXS5oYXNPd25Qcm9wZXJ0eShcImZvcm1hdFwiKSA/IGNvbHNbY29sXVtcImZvcm1hdFwiXShyb3dbY29sXSkgOiByb3dbY29sXSkpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSkgOiBtKFwidHJcIiwgbShcInRkXCIsIHtjb2xzcGFuOiBjb2xzS2V5cy5sZW5ndGh9LCBcIkxvYWRpbmcgZGF0YS4uLlwiKSlcbiAgICAgICAgKVxuICAgICAgKVxuICAgIH1cbiAgfSxcblxuICB0YWJsZUhlYWRlcihjb2wpIHtcbiAgICB2YXIgY29scyA9IHRoaXMuYXR0cnMuY29scztcbiAgICBpZiAoY29sc1tjb2xdW1wic29ydGFibGVcIl0pIHtcbiAgICAgIHZhciB0aENsYXNzID0gXCJcIjtcbiAgICAgIHRoQ2xhc3MgKz0gXCJzbGRzLWlzLXNvcnRlZC0tXCIgKyB0aGlzLnN0YXRlLnNvcnQub3JkZXI7XG4gICAgICB0aENsYXNzICs9IGNvbCA9PT0gdGhpcy5zdGF0ZS5zb3J0LmNvbCA/IFwiIHNsZHMtaXMtc29ydGVkXCIgOiBcIlwiO1xuICAgICAgcmV0dXJuIG0oXCJ0aC5zbGRzLWlzLXNvcnRhYmxlLnNsZHMtaXMtcmVzaXphYmxlXCIsIHtcbiAgICAgICAgY2xhc3NOYW1lOiB0aENsYXNzXG4gICAgICB9LFxuICAgICAgICBtKFwiYS5zbGRzLXRoX19hY3Rpb24uc2xkcy10ZXh0LWxpbmstLXJlc2V0W2hyZWY9J2phdmFzY3JpcHQ6dm9pZCgwKTsnXVwiLCB7XG4gICAgICAgICAgXCJkYXRhLXNvcnQtYnlcIjogY29sc1tjb2xdW1wic29ydGFibGVcIl0gPyBjb2wgOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgICAgbShcInNwYW4uc2xkcy1hc3Npc3RpdmUtdGV4dFwiLCBcIlNvcnQgXCIpLFxuICAgICAgICAgIG0oXCJzcGFuLnNsZHMtdHJ1bmNhdGVcIiwge1xuICAgICAgICAgICAgXCJkYXRhLXNvcnQtYnlcIjogY29sc1tjb2xdW1wic29ydGFibGVcIl0gPyBjb2wgOiBcIlwiXG4gICAgICAgICAgfSwgY29sc1tjb2xdW1wibGFiZWxcIl0pLFxuICAgICAgICAgIG0oXCIuc2xkcy1pY29uX2NvbnRhaW5lclwiLFxuICAgICAgICAgICAgbShcInN2Zy5zbGRzLWljb24uc2xkcy1pY29uLS14LXNtYWxsLnNsZHMtaWNvbi10ZXh0LWRlZmF1bHQuc2xkcy1pcy1zb3J0YWJsZV9faWNvblthcmlhLWhpZGRlbj0ndHJ1ZSddXCIsIFtcbiAgICAgICAgICAgICAgbShcInVzZVt4bGluazpocmVmPScvYXNzZXRzL2ljb25zL3V0aWxpdHktc3ByaXRlL3N2Zy9zeW1ib2xzLnN2ZyNhcnJvd2Rvd24nXVwiKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG0oXCJ0aFtzY29wZT0nY29sJ11cIiwgW1xuICAgICAgICBtKFwiLnNsZHMtdHJ1bmNhdGVcIiwge1xuICAgICAgICAgIHRpdGxlOiBjb2xzW2NvbF1bXCJsYWJlbFwiXSxcbiAgICAgICAgICBcImRhdGEtc29ydC1ieVwiOiBjb2xzW2NvbF1bXCJzb3J0YWJsZVwiXSA/IGNvbCA6IFwiXCJcbiAgICAgICAgfSwgY29sc1tjb2xdW1wibGFiZWxcIl0pXG4gICAgICBdKVxuICAgIH1cbiAgfVxuXG59O1xuIl19

/***/ }
/******/ ]);
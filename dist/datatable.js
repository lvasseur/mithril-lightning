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
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL2RhdGF0YWJsZS5qcyJdLCJuYW1lcyI6WyJlcnJvck1zZyIsImUiLCJtIiwic29ydFRhYmxlIiwibGlzdCIsInNvcnQiLCJvcmRlciIsImEiLCJiIiwiY29sIiwib25pbml0Iiwidm5vZGUiLCJzdGF0ZSIsImNvbHMiLCJhdHRycyIsIk9iamVjdCIsImtleXMiLCJlcnJvciIsImRhdGEiLCJydW4iLCJrZXkiLCJoYW5kbGVTb3J0IiwicHJvcCIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsImluZGV4T2YiLCJyZWRyYXciLCJ0YWJsZUNsYXNzIiwic3RyaXBlZCIsImhvdmVyZWQiLCJ1bmRlZmluZWQiLCJ2aWV3IiwiY29sc0tleXMiLCJjbGFzc05hbWUiLCJvbmNsaWNrIiwibWFwIiwidGFibGVIZWFkZXIiLCJyb3ciLCJsaW5rIiwiaSIsInRpdGxlIiwiaHJlZiIsIm9uY3JlYXRlIiwicm91dGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNvbHNwYW4iLCJsZW5ndGgiLCJ0aENsYXNzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7Ozs7Ozs7QUFTQTs7Ozs7OztBQU9BOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFRQTs7Ozs7OztBQU9BOzs7Ozs7a0JBTWU7QUFFYkEsVUFGYSxvQkFFSkMsQ0FGSSxFQUVEO0FBQ1YsV0FBT0EsSUFBSUMsRUFBRSxRQUFGLEVBQVlELENBQVosQ0FBSixHQUFxQixJQUE1QjtBQUNELEdBSlk7QUFNYkUsV0FOYSxxQkFNSEMsSUFORyxFQU1HQyxJQU5ILEVBTVM7QUFDcEIsWUFBUUEsS0FBS0MsS0FBYjtBQUNFLFdBQUssS0FBTDtBQUNFRixhQUFLQyxJQUFMLENBQVUsVUFBVUUsQ0FBVixFQUFhQyxDQUFiLEVBQWdCO0FBQ3hCLGlCQUFPRCxFQUFFRixLQUFLSSxHQUFQLElBQWNELEVBQUVILEtBQUtJLEdBQVAsQ0FBZCxHQUE0QixDQUE1QixHQUFnQ0YsRUFBRUYsS0FBS0ksR0FBUCxJQUFjRCxFQUFFSCxL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QUFXdEMsUUFBUSxLQUFLRyxLQUFMLENBQVdQLElBQVgsQ0FBZ0JJLEdBQXhCLEdBQThCLGlCQUE5QixHQUFrRCxFQUE3RDtBQUNBLGFBQU9QLEVBQUUsdUNBQUYsRUFBMkM7QUFDaEQrQixtQkFBV2M7QUFEcUMsT0FBM0MsRUFHTDdDLEVBQUUscUVBQUYsRUFBeUU7QUFDdkUsd0JBQWdCVyxLQUFLSixHQUFMLEVBQVUsVUFBVixJQUF3QkEsR0FBeEIsR0FBOEI7QUFEeUIsT0FBekUsRUFHRVAsRUFBRSwwQkFBRixFQUE4QixPQUE5QixDQUhGLEVBSUVBLEVBQUUsb0JBQUYsRUFBd0I7QUFDdEIsd0JBQWdCVyxLQUFLSixHQUFMLEVBQVUsVUFBVixJQUF3QkEsR0FBeEIsR0FBOEI7QUFEeEIsT0FBeEIsRUFFR0ksS0FBS0osR0FBTCxFQUFVLE9BQVYsQ0FGSCxDQUpGLEVBT0VQLEVBQUUsc0JBQUYsRUFDRUEsRUFBRSxvR0FBRixFQUF3RyxDQUN0R0EsRUFBRSwwRUFBRixDQURzRyxDQUF4RyxDQURGLENBUEYsQ0FISyxDQUFQO0FBaUJELEtBckJELE1BcUJPO0FBQ0wsYUFBT0EsRUFBRSxpQkFBRixFQUFxQixDQUMxQkEsRUFBRSxnQkFBRixFQUFvQjtBQUNsQnNDLGVBQU8zQixLQUFLSixHQUFMLEVBQVUsT0FBVixDQURXO0FBRWxCLHdCQUFnQkksS0FBS0osR0FBTCxFQUFVLFVBQVYsSUFBd0JBLEdBQXhCLEdBQThCO0FBRjVCLE9BQXBCLEVBR0dJLEtBQUtKLEdBQUwsRUFBVSxPQUFWLENBSEgsQ0FEMEIsQ0FBckIsQ0FBUDtBQU1EO0FBQ0Y7QUFoSVksQyIsImZpbGUiOiJkYXRhdGFibGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvbWZlaXRvemEvQ29kZS9taXRocmlsLWxpZ2h0bmluZyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gZGF0YXRhYmxlQXR0cnNcbiAqIEBwcm9wZXJ0eSB7bGlzdH0gLSBEYXRhIHRvIGJlIGRpc3BsYXllZC5cbiAqIEB0eXBlIHtzb3J0U3RhdGV9IHNvcnQgLSBTb3J0aW5nIHN0YXRlIG9iamVjdC5cbiAqIEB0eXBlIHtyZWNvcmRMaW5rfSBsaW5rIC0gT2JqZWN0IHByb3BlcnR5IHRvIHVzZSBhcyBrZXkgYW5kIHJlY29yZCBocmVmLlxuICogQHR5cGUge3tjb2w6IGNvbHNPYmplY3R9fSBjb2xzIC0gT2JqZWN0IGNvbnRhaW5zIHRoZSBjb2x1bW5zIHRvIGJlIGRpc3BsYXllZC5cbiAqXG4gKi9cblxuLyoqXG4gKlxuICogQHR5cGVkZWYge29iamVjdH0gc29ydFN0YXRlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY29sIC0gY29sdW1uIGtleS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBvcmRlciAtIGFzYyBvciBkZXNjLlxuICovXG5cbi8qKlxuICpcbiAqIEB0eXBlZGVmIHtvYmplY3R9IHJlY29yZExpbmtcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBrZXkgLSByZWNvcmQgdW5pcXVlIGlkZW50aWZpZXIuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY29sIC0gY29sdW1uIGtleSB0byBiZSByZWNvcmQgbGluay5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBocmVmIC0gYmFzZSBocmVmIGZvciByZWNvcmQuXG4gKlxuICovXG5cbi8qKlxuICpcbiAqIEB0eXBlZGVmIHtvYmplY3R9IGNvbHNPYmplY3RcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBsYWJlbCAtIHJlY29yZCB1bmlxdWUgaWRlbnRpZmllci5cbiAqIEB0eXBlIHtmb3JtYXRDYWxsYmFja30gZm9ybWF0XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHNvcnRhYmxlLlxuICovXG5cbi8qKlxuICogVGhpcyBjYWxsYmFjayBpcyB1c2VkIHRvIGZvcm1hdCBvciBhZGQgZXh0cmEgc3R5bGUgdG8gY2VsbCB2YWx1ZS5cbiAqIEBjYWxsYmFjayBmb3JtYXRDYWxsYmFja1xuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIGJlIGZvcm1hdGVkXG4gKiBAcmV0dXJuIHtzdHJpbmd8aHlwZXJzY3JpcHR9XG4gKi9cblxuLyoqXG4gKiBEYXRhdGFibGUgYXR0cmlidXRlcy5cbiAqXG4gKiBAcGFyYW0ge2RhdGF0YWJsZUF0dHJzfVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICBlcnJvck1zZyhlKSB7XG4gICAgcmV0dXJuIGUgPyBtKFwiLmVycm9yXCIsIGUpIDogbnVsbFxuICB9LFxuXG4gIHNvcnRUYWJsZShsaXN0LCBzb3J0KSB7XG4gICAgc3dpdGNoIChzb3J0Lm9yZGVyKSB7XG4gICAgICBjYXNlIFwiYXNjXCI6XG4gICAgICAgIGxpc3Quc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgIHJldHVybiBhW3NvcnQuY29sXSA+IGJbc29ydC5jb2xdID8gMSA6IGFbc29ydC5jb2xdIDwgYltzb3J0LmNvbF0gPyAtMSA6IDBcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRlc2NcIjpcbiAgICAgICAgbGlzdC5zb3J0KGZ1bmN0aW9uIChiLCBhKSB7XG4gICAgICAgICAgcmV0dXJuIGFbc29ydC5jb2xdID4gYltzb3J0LmNvbF0gPyAxIDogYVtzb3J0LmNvbF0gPCBiW3NvcnQuY29sXSA/IC0xIDogMFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsaXN0LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICByZXR1cm4gYVtzb3J0LmNvbF0gPiBiW3NvcnQuY29sXSA/IDEgOiBhW3NvcnQuY29sXSA8IGJbc29ydC5jb2xdID8gLTEgOiAwXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBvbmluaXQodm5vZGUpIHtcblxuICAgIHZub2RlLnN0YXRlLmNvbHMgPSB2bm9kZS5hdHRycy5jb2xzID8gT2JqZWN0LmtleXModm5vZGUuYXR0cnMuY29scykgOiBmYWxzZTtcblxuICAgIHZub2RlLnN0YXRlLmVycm9yID0gdm5vZGUuYXR0cnMuZGF0YS5lcnJvci5ydW4odm5vZGUuc3RhdGUuZXJyb3JNc2cpO1xuXG4gICAgdm5vZGUuc3RhdGUuc29ydCA9IHZub2RlLmF0dHJzLnNvcnQgfHwge1xuICAgICAgICBrZXk6IFwiXCIsXG4gICAgICAgIG9yZGVyOiBcIlwiXG4gICAgICB9O1xuXG4gICAgdm5vZGUuc3RhdGUuaGFuZGxlU29ydCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIgcHJvcCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtc29ydC1ieVwiKTtcbiAgICAgIHZub2RlLnN0YXRlLnNvcnQub3JkZXIgPSB2bm9kZS5zdGF0ZS5zb3J0LmNvbCAhPT0gcHJvcCA/IFwiZGVzY1wiIDogdm5vZGUuc3RhdGUuc29ydC5vcmRlciA9PT0gXCJhc2NcIiA/IFwiZGVzY1wiIDogXCJhc2NcIjtcbiAgICAgIHZub2RlLnN0YXRlLnNvcnQuY29sID0gcHJvcDtcbiAgICAgIGlmICh2bm9kZS5zdGF0ZS5jb2xzLmluZGV4T2YocHJvcCkgPT09IC0xKSB7XG4gICAgICAgIGUucmVkcmF3ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZub2RlLnN0YXRlLnRhYmxlQ2xhc3MgPSBcIlwiO1xuICAgIHZub2RlLnN0YXRlLnRhYmxlQ2xhc3MgKz0gdm5vZGUuYXR0cnMuc3RyaXBlZCA/IFwic2xkcy10YWJsZS0tc3RyaXBlZCBcIiA6IFwiXCI7XG4gICAgdm5vZGUuc3RhdGUudGFibGVDbGFzcyArPSB2bm9kZS5hdHRycy5ob3ZlcmVkIHx8IHZub2RlLmF0dHJzLmhvdmVyZWQgPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBcInNsZHMtbm8tcm93LWhvdmVyIFwiO1xuXG4gIH0sXG5cbiAgdmlldyh2bm9kZSkge1xuICAgIGlmICghdm5vZGUuc3RhdGUuY29scykgcmV0dXJuO1xuXG4gICAgdmFyIGRhdGEgPSB0eXBlb2Ygdm5vZGUuYXR0cnMuZGF0YSA9PT0gXCJmdW5jdGlvblwiID8gdm5vZGUuYXR0cnMuZGF0YSgpIDogdm5vZGUuYXR0cnMuZGF0YTtcbiAgICB2YXIgY29sc0tleXMgPSB2bm9kZS5zdGF0ZS5jb2xzO1xuICAgIHZhciBjb2xzID0gdm5vZGUuYXR0cnMuY29scztcblxuICAgIGlmIChkYXRhICYmIHZub2RlLnN0YXRlLnNvcnQpIHtcbiAgICAgIHZub2RlLnN0YXRlLnNvcnRUYWJsZShkYXRhLCB2bm9kZS5zdGF0ZS5zb3J0KVxuICAgIH1cblxuICAgIGlmICh2bm9kZS5zdGF0ZS5lcnJvcigpKSB7XG4gICAgICByZXR1cm4gdm5vZGUuc3RhdGUuZXJyb3IoKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbShcInRhYmxlLnNsZHMtdGFibGUuc2xkcy10YWJsZS0tYm9yZGVyZWQuc2xkcy10YWJsZS0tY2VsbC1idWZmZXJcIiwge1xuICAgICAgICBjbGFzc05hbWU6IHZub2RlLnN0YXRlLnRhYmxlQ2xhc3MsXG4gICAgICAgIG9uY2xpY2s6IHZub2RlLnN0YXRlLmhhbmRsZVNvcnRcbiAgICAgIH0sXG4gICAgICAgIG0oXCJ0aGVhZFwiLFxuICAgICAgICAgIG0oXCJ0ci5zbGRzLXRleHQtdGl0bGUtLWNhcHNcIixcbiAgICAgICAgICAgIGNvbHNLZXlzLm1hcCh2bm9kZS5zdGF0ZS50YWJsZUhlYWRlciwgdm5vZGUpXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBtKFwidGJvZHlcIixcbiAgICAgICAgICBkYXRhID9cbiAgICAgICAgICAgIGRhdGEubWFwKChyb3cpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIG0oXCJ0clwiLCB7a2V5OiByb3dbdm5vZGUuYXR0cnMubGluay5rZXldfSwgY29sc0tleXMubWFwKChjb2wsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChpID09PSAwICYmIHZub2RlLmF0dHJzLmxpbmspIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG0oXCJ0aFtzY29wZT0ncm93J11cIiwge1wiZGF0YS1sYWJlbFwiOiBjb2x9LFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJkaXYuc2xkcy10cnVuY2F0ZVwiLCB7dGl0bGU6IHJvd1tjb2xdfSwgbShcImFcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHJlZjogdm5vZGUuYXR0cnMubGluay5ocmVmICsgcm93W3Zub2RlLmF0dHJzLmxpbmsua2V5XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uY3JlYXRlOiBtLnJvdXRlLmxpbmtcbiAgICAgICAgICAgICAgICAgICAgICB9LCByb3dbY29sXSkpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtKFwidGRcIiwge1wiZGF0YS1sYWJlbFwiOiBjb2x9LFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJkaXYuc2xkcy10cnVuY2F0ZVwiLCB7dGl0bGU6IHJvd1tjb2xdfSwgY29sc1tjb2xdLmhhc093blByb3BlcnR5KFwiZm9ybWF0XCIpID8gY29sc1tjb2xdW1wiZm9ybWF0XCJdKHJvd1tjb2xdKSA6IHJvd1tjb2xdKSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KSA6IG0oXCJ0clwiLCBtKFwidGRcIiwge2NvbHNwYW46IGNvbHNLZXlzLmxlbmd0aH0sIFwiTG9hZGluZyBkYXRhLi4uXCIpKVxuICAgICAgICApXG4gICAgICApXG4gICAgfVxuICB9LFxuXG4gIHRhYmxlSGVhZGVyKGNvbCkge1xuICAgIHZhciBjb2xzID0gdGhpcy5hdHRycy5jb2xzO1xuICAgIGlmIChjb2xzW2NvbF1bXCJzb3J0YWJsZVwiXSkge1xuICAgICAgdmFyIHRoQ2xhc3MgPSBcIlwiO1xuICAgICAgdGhDbGFzcyArPSBcInNsZHMtaXMtc29ydGVkLS1cIiArIHRoaXMuc3RhdGUuc29ydC5vcmRlcjtcbiAgICAgIHRoQ2xhc3MgKz0gY29sID09PSB0aGlzLnN0YXRlLnNvcnQuY29sID8gXCIgc2xkcy1pcy1zb3J0ZWRcIiA6IFwiXCI7XG4gICAgICByZXR1cm4gbShcInRoLnNsZHMtaXMtc29ydGFibGUuc2xkcy1pcy1yZXNpemFibGVcIiwge1xuICAgICAgICBjbGFzc05hbWU6IHRoQ2xhc3NcbiAgICAgIH0sXG4gICAgICAgIG0oXCJhLnNsZHMtdGhfX2FjdGlvbi5zbGRzLXRleHQtbGluay0tcmVzZXRbaHJlZj0namF2YXNjcmlwdDp2b2lkKDApOyddXCIsIHtcbiAgICAgICAgICBcImRhdGEtc29ydC1ieVwiOiBjb2xzW2NvbF1bXCJzb3J0YWJsZVwiXSA/IGNvbCA6IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgICBtKFwic3Bhbi5zbGRzLWFzc2lzdGl2ZS10ZXh0XCIsIFwiU29ydCBcIiksXG4gICAgICAgICAgbShcInNwYW4uc2xkcy10cnVuY2F0ZVwiLCB7XG4gICAgICAgICAgICBcImRhdGEtc29ydC1ieVwiOiBjb2xzW2NvbF1bXCJzb3J0YWJsZVwiXSA/IGNvbCA6IFwiXCJcbiAgICAgICAgICB9LCBjb2xzW2NvbF1bXCJsYWJlbFwiXSksXG4gICAgICAgICAgbShcIi5zbGRzLWljb25fY29udGFpbmVyXCIsXG4gICAgICAgICAgICBtKFwic3ZnLnNsZHMtaWNvbi5zbGRzLWljb24tLXgtc21hbGwuc2xkcy1pY29uLXRleHQtZGVmYXVsdC5zbGRzLWlzLXNvcnRhYmxlX19pY29uW2FyaWEtaGlkZGVuPSd0cnVlJ11cIiwgW1xuICAgICAgICAgICAgICBtKFwidXNlW3hsaW5rOmhyZWY9Jy9hc3NldHMvaWNvbnMvdXRpbGl0eS1zcHJpdGUvc3ZnL3N5bWJvbHMuc3ZnI2Fycm93ZG93biddXCIpXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbShcInRoW3Njb3BlPSdjb2wnXVwiLCBbXG4gICAgICAgIG0oXCIuc2xkcy10cnVuY2F0ZVwiLCB7XG4gICAgICAgICAgdGl0bGU6IGNvbHNbY29sXVtcImxhYmVsXCJdLFxuICAgICAgICAgIFwiZGF0YS1zb3J0LWJ5XCI6IGNvbHNbY29sXVtcInNvcnRhYmxlXCJdID8gY29sIDogXCJcIlxuICAgICAgICB9LCBjb2xzW2NvbF1bXCJsYWJlbFwiXSlcbiAgICAgIF0pXG4gICAgfVxuICB9XG5cbn07XG4iXX0=

/***/ }
/******/ ]);
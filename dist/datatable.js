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
	var component = exports.component = {
	  errorMsg: function errorMsg(e) {
	    return e ? m(".error", e) : null;
	  },
	  sortTable: function sortTable(list, sort) {
	    var first = list[0];
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
	      vnode.state.sort.col = prop;
	      vnode.state.sort.order = vnode.state.sort.order === "asc" ? "desc" : "asc";
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
	        return m("th[scope='col']", [m(".slds-truncate", {
	          title: cols[col]["label"],
	          "data-sort-by": cols[col]["sortable"] ? col : ""
	        }, cols[col]["label"])]);
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
	  }
	};
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL2RhdGF0YWJsZS5qcyJdLCJuYW1lcyI6WyJjb21wb25lbnQiLCJlcnJvck1zZyIsImUiLCJtIiwic29ydFRhYmxlIiwibGlzdCIsInNvcnQiLCJmaXJzdCIsIm9yZGVyIiwiYSIsImIiLCJjb2wiLCJvbmluaXQiLCJ2bm9kZSIsInN0YXRlIiwiY29scyIsImF0dHJzIiwiT2JqZWN0Iiwia2V5cyIsImVycm9yIiwiZGF0YSIsInJ1biIsImtleSIsImhhbmRsZVNvcnQiLCJwcm9wIiwidGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwiaW5kZXhPZiIsInJlZHJhdyIsInRhYmxlQ2xhc3MiLCJzdHJpcGVkIiwiaG92ZXJlZCIsInVuZGVmaW5lZCIsInZpZXciLCJjb2xzS2V5cyIsImNsYXNzTmFtZSIsIm9uY2xpY2siLCJtYXAiLCJ0aXRsZSIsInJvdyIsImxpbmsiLCJpIiwiaHJlZiIsIm9uY3JlYXRlIiwicm91dGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNvbHNwYW4iLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQU8sSUFBTUEsZ0NBQVk7QUFFdkJDLFVBRnVCLG9CQUVkQyxDQUZjLEVBRVg7QUFDVixXQUFPQSxJQUFJQyxFQUFFLFFBQUYsRUFBWUQsQ0FBWixDQUFKLEdBQXFCLElBQTVCO0FBQ0QsR0FKc0I7QUFNdkJFLFdBTnVCLHFCQU1iQyxJQU5hLEVBTVBDLElBTk8sRUFNRDtBQUNwQixRQUFJQyxRQUFRRixLQUFLLENBQUwsQ0FBWjtBQUNBLFlBQVFDLEtBQUtFLEtBQWI7QUFDRSxXQUFLLEtBQUw7QUFDRUgsYUFBS0MsSUFBTCxDQUFVLFVBQVVHLENBQVYsRUFBYUMsQ0FBYixFQUFnQjtBQUN4QixpQkFBT0QsRUFBRUgsS0FBS0ssR0FBUCxJQUFjRCxFQUFFSixLQUFLSyxHQUFQLENBQWQsR0FBNEIsQ0FBNUIsR0FBZ0NGLEVBQUVILEtBQUtLLEdBQVAsSUFBY0QsRUFBRUosS0FBS0ssR0FBUCxDQUFkLEdBQTRCLENBQUMs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QXBDLENBQVIsQ0FqQkUsQ0FBWCxDQWJDLENBSEksQ0FBUDtBQW9DRDtBQUNGO0FBekdzQixDQUFsQiIsImZpbGUiOiJkYXRhdGFibGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvbWZlaXRvemEvQ29kZS9taXRocmlsLWxpZ2h0bmluZyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBjb21wb25lbnQgPSB7XG5cbiAgZXJyb3JNc2coZSkge1xuICAgIHJldHVybiBlID8gbShcIi5lcnJvclwiLCBlKSA6IG51bGxcbiAgfSxcblxuICBzb3J0VGFibGUobGlzdCwgc29ydCkge1xuICAgIHZhciBmaXJzdCA9IGxpc3RbMF07XG4gICAgc3dpdGNoIChzb3J0Lm9yZGVyKSB7XG4gICAgICBjYXNlIFwiYXNjXCI6XG4gICAgICAgIGxpc3Quc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgIHJldHVybiBhW3NvcnQuY29sXSA+IGJbc29ydC5jb2xdID8gMSA6IGFbc29ydC5jb2xdIDwgYltzb3J0LmNvbF0gPyAtMSA6IDBcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRlc2NcIjpcbiAgICAgICAgbGlzdC5zb3J0KGZ1bmN0aW9uIChiLCBhKSB7XG4gICAgICAgICAgcmV0dXJuIGFbc29ydC5jb2xdID4gYltzb3J0LmNvbF0gPyAxIDogYVtzb3J0LmNvbF0gPCBiW3NvcnQuY29sXSA/IC0xIDogMFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsaXN0LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICByZXR1cm4gYVtzb3J0LmNvbF0gPiBiW3NvcnQuY29sXSA/IDEgOiBhW3NvcnQuY29sXSA8IGJbc29ydC5jb2xdID8gLTEgOiAwXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBvbmluaXQodm5vZGUpIHtcblxuICAgIHZub2RlLnN0YXRlLmNvbHMgPSB2bm9kZS5hdHRycy5jb2xzID8gT2JqZWN0LmtleXModm5vZGUuYXR0cnMuY29scykgOiBmYWxzZTtcblxuICAgIHZub2RlLnN0YXRlLmVycm9yID0gdm5vZGUuYXR0cnMuZGF0YS5lcnJvci5ydW4odm5vZGUuc3RhdGUuZXJyb3JNc2cpO1xuXG4gICAgdm5vZGUuc3RhdGUuc29ydCA9IHZub2RlLmF0dHJzLnNvcnQgfHwge1xuICAgICAgICBrZXk6IFwiXCIsXG4gICAgICAgIG9yZGVyOiBcIlwiXG4gICAgfTtcblxuICAgIHZub2RlLnN0YXRlLmhhbmRsZVNvcnQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyIHByb3AgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNvcnQtYnlcIik7XG4gICAgICB2bm9kZS5zdGF0ZS5zb3J0LmNvbCA9IHByb3A7XG4gICAgICB2bm9kZS5zdGF0ZS5zb3J0Lm9yZGVyID0gdm5vZGUuc3RhdGUuc29ydC5vcmRlciA9PT0gXCJhc2NcIiA/IFwiZGVzY1wiIDogXCJhc2NcIjtcbiAgICAgIGlmICh2bm9kZS5zdGF0ZS5jb2xzLmluZGV4T2YocHJvcCkgPT09IC0xKSB7XG4gICAgICAgIGUucmVkcmF3ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZub2RlLnN0YXRlLnRhYmxlQ2xhc3MgPSBcIlwiO1xuICAgIHZub2RlLnN0YXRlLnRhYmxlQ2xhc3MgKz0gdm5vZGUuYXR0cnMuc3RyaXBlZCA/IFwic2xkcy10YWJsZS0tc3RyaXBlZCBcIiA6IFwiXCI7XG4gICAgdm5vZGUuc3RhdGUudGFibGVDbGFzcyArPSB2bm9kZS5hdHRycy5ob3ZlcmVkIHx8IHZub2RlLmF0dHJzLmhvdmVyZWQgPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBcInNsZHMtbm8tcm93LWhvdmVyIFwiO1xuXG4gIH0sXG5cbiAgdmlldyh2bm9kZSkge1xuICAgIGlmICghdm5vZGUuc3RhdGUuY29scykgcmV0dXJuO1xuXG4gICAgdmFyIGRhdGEgPSB0eXBlb2Ygdm5vZGUuYXR0cnMuZGF0YSA9PT0gXCJmdW5jdGlvblwiID8gdm5vZGUuYXR0cnMuZGF0YSgpIDogdm5vZGUuYXR0cnMuZGF0YTtcbiAgICB2YXIgY29sc0tleXMgPSB2bm9kZS5zdGF0ZS5jb2xzO1xuICAgIHZhciBjb2xzID0gdm5vZGUuYXR0cnMuY29scztcbiAgICB2YXIgaG92ZXJlZCA9IHZub2RlLmF0dHJzLmhvdmVyZWQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiB2bm9kZS5hdHRycy5ob3ZlcmVkO1xuICAgIHZhciB0YWJsZUNsYXNzID0gXCJcIjtcblxuICAgIGlmIChkYXRhICYmIHZub2RlLnN0YXRlLnNvcnQpIHtcbiAgICAgIHZub2RlLnN0YXRlLnNvcnRUYWJsZShkYXRhLCB2bm9kZS5zdGF0ZS5zb3J0KVxuICAgIH1cblxuICAgIGlmICh2bm9kZS5zdGF0ZS5lcnJvcigpKSB7XG4gICAgICByZXR1cm4gdm5vZGUuc3RhdGUuZXJyb3IoKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbShcInRhYmxlLnNsZHMtdGFibGUuc2xkcy10YWJsZS0tYm9yZGVyZWQuc2xkcy10YWJsZS0tY2VsbC1idWZmZXJcIiwge1xuICAgICAgICBjbGFzc05hbWU6IHZub2RlLnN0YXRlLnRhYmxlQ2xhc3MsXG4gICAgICAgIG9uY2xpY2s6IHZub2RlLnN0YXRlLmhhbmRsZVNvcnRcbiAgICAgIH0sIFtcbiAgICAgICAgbShcInRoZWFkXCIsIFtcbiAgICAgICAgICBtKFwidHIuc2xkcy10ZXh0LXRpdGxlLS1jYXBzXCIsXG4gICAgICAgICAgICBjb2xzS2V5cy5tYXAoY29sID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIG0oXCJ0aFtzY29wZT0nY29sJ11cIiwgW1xuICAgICAgICAgICAgICAgIG0oXCIuc2xkcy10cnVuY2F0ZVwiLCB7XG4gICAgICAgICAgICAgICAgICB0aXRsZTogY29sc1tjb2xdW1wibGFiZWxcIl0sXG4gICAgICAgICAgICAgICAgICBcImRhdGEtc29ydC1ieVwiOiBjb2xzW2NvbF1bXCJzb3J0YWJsZVwiXSA/IGNvbCA6IFwiXCJcbiAgICAgICAgICAgICAgICB9LCBjb2xzW2NvbF1bXCJsYWJlbFwiXSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICBdKSxcbiAgICAgICAgbShcInRib2R5XCIsIFtcbiAgICAgICAgICBkYXRhID9cbiAgICAgICAgICAgIGRhdGEubWFwKChyb3cpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIG0oXCJ0clwiLCB7a2V5OiByb3dbdm5vZGUuYXR0cnMubGluay5rZXldfSwgY29sc0tleXMubWFwKChjb2wsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChpID09PSAwICYmIHZub2RlLmF0dHJzLmxpbmspIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG0oXCJ0aFtzY29wZT0ncm93J11cIiwge1wiZGF0YS1sYWJlbFwiOiBjb2x9LFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJkaXYuc2xkcy10cnVuY2F0ZVwiLCB7dGl0bGU6IHJvd1tjb2xdfSwgbShcImFcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHJlZjogdm5vZGUuYXR0cnMubGluay5ocmVmICsgcm93W3Zub2RlLmF0dHJzLmxpbmsua2V5XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uY3JlYXRlOiBtLnJvdXRlLmxpbmtcbiAgICAgICAgICAgICAgICAgICAgICB9LCByb3dbY29sXSkpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtKFwidGRcIiwge1wiZGF0YS1sYWJlbFwiOiBjb2x9LFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJkaXYuc2xkcy10cnVuY2F0ZVwiLCB7dGl0bGU6IHJvd1tjb2xdfSwgY29sc1tjb2xdLmhhc093blByb3BlcnR5KFwiZm9ybWF0XCIpID8gY29sc1tjb2xdW1wiZm9ybWF0XCJdKHJvd1tjb2xdKSA6IHJvd1tjb2xdKSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KSA6IG0oXCJ0clwiLCBtKFwidGRcIiwge2NvbHNwYW46IGNvbHNLZXlzLmxlbmd0aH0sIFwiTG9hZGluZyBkYXRhLi4uXCIpKVxuICAgICAgICBdKVxuICAgICAgXSlcbiAgICB9XG4gIH1cblxufTtcbiJdfQ==

/***/ }
/******/ ]);
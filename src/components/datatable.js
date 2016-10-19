export const component = {

  errorMsg(e) {
    return e ? m(".error", e) : null
  },

  sortTable(list, sort) {
    var first = list[0];
    switch (sort.order) {
      case "asc":
        list.sort(function (a, b) {
          return a[sort.col] > b[sort.col] ? 1 : a[sort.col] < b[sort.col] ? -1 : 0
        });
        break;
      case "desc":
        list.sort(function (b, a) {
          return a[sort.col] > b[sort.col] ? 1 : a[sort.col] < b[sort.col] ? -1 : 0
        });
        break;
      default:
        list.sort(function (a, b) {
          return a[sort.col] > b[sort.col] ? 1 : a[sort.col] < b[sort.col] ? -1 : 0
        });
    }
  },

  oninit(vnode) {

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

  view(vnode) {
    if (!vnode.state.cols) return;

    var data = typeof vnode.attrs.data === "function" ? vnode.attrs.data() : vnode.attrs.data;
    var colsKeys = vnode.state.cols;
    var cols = vnode.attrs.cols;
    var hovered = vnode.attrs.hovered === undefined ? true : vnode.attrs.hovered;
    var tableClass = "";

    if (data && vnode.state.sort) {
      vnode.state.sortTable(data, vnode.state.sort)
    }

    if (vnode.state.error()) {
      return vnode.state.error()
    } else {
      return m("table.slds-table.slds-table--bordered.slds-table--cell-buffer", {
        className: vnode.state.tableClass,
        onclick: vnode.state.handleSort
      }, [
        m("thead", [
          m("tr.slds-text-title--caps",
            colsKeys.map(col => {
              return m("th[scope='col']", [
                m(".slds-truncate", {
                  title: cols[col]["label"],
                  "data-sort-by": cols[col]["sortable"] ? col : ""
                }, cols[col]["label"])
              ])
            })
          )
        ]),
        m("tbody", [
          data ?
            data.map((row) => {
              return m("tr", {key: row[vnode.attrs.link.key]}, colsKeys.map((col, i) => {
                  if (i === 0 && vnode.attrs.link) {
                    return m("th[scope='row']", {"data-label": col},
                      m("div.slds-truncate", {title: row[col]}, m("a", {
                        href: vnode.attrs.link.href + row[vnode.attrs.link.key],
                        oncreate: m.route.link
                      }, row[col]))
                    )
                  } else {
                    return m("td", {"data-label": col},
                      m("div.slds-truncate", {title: row[col]}, cols[col].hasOwnProperty("format") ? cols[col]["format"](row[col]) : row[col]))
                  }
                })
              )
            }) : m("tr", m("td", {colspan: colsKeys.length}, "Loading data..."))
        ])
      ])
    }
  }

};

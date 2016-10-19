import view from "./view.jsx";


export const component = {

  oninit(vnode) {

    vnode.state.cols = vnode.attrs.cols;

  },

  view(vnode) {

    var data = vnode.attrs.data;
    var cols = vnode.state.cols ? vnode.state.cols : data && data.length > 0 ? Object.keys(data[0]) : false;

    return (
      <table className="slds-table slds-table--bordered slds-table--cell-buffer">
        <thead>
        <tr className="slds-text-title--caps">
          {
            cols.map(col => {
            return (
              <th scope="col">
                <div className="slds-truncate" title={ col }>{ col }</div>
              </th>
              )
            })
          }
        </tr>
        </thead>
        <tbody>
        {
          data.map(row => {
            return (
              <tr>
                {
                  cols.map(col => {
                    return (
                      <td data-label="Account Name">
                        <div class="slds-truncate" title="Cloudhub">{ row[col] }</div>
                      </td>
                    )
                  })
                }
              </tr>
            )
          })
        }
        </tbody>
      </table>
    )

  }

};

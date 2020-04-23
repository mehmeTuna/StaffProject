import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const sweet = withReactContent(Swal)

function KioskRender({data, deleteKiosk}) {
  return data.map((val, key) => (
    <div key={key} className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <div className="col-sm-12 mb-4 mb-xl-0 d-flex justify-content-between legend-label">
            <div>
              <h4 className="font-weight-bold text-dark">{val.identifier}</h4>
            </div>
            <div className="">
              <button
                type="button"
                onClick={() => data.deleteKiosk(val.id)}
                className="m-2 btn btn-success btn-icon-text font-weight-bold"
              >
                Delete Kiosk
              </button>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-xl-3 flex-column d-flex grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">
                    Remote Address: <span className="text-muted">
                      {val.remoteAddress}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 d-flex grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <p className="text-center mb-2">
                    {val.logHistory.length > 0
                      ? 'Recent Transactions'
                      : 'No transactions were found'}
                  </p>
                  {val.logHistory.length > 0 && (
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="d-flex justify-content-between mt-2 text-dark mb-2">
                          <div>Toplam: {val.logHistory.count}</div>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="traffic-source-legend">
                          <div className="d-flex justify-content-between mb-1 mt-2">
                            <div className="font-weight-bold">Staff</div>
                            <div className="font-weight-bold">Time</div>
                            <div className="font-weight-bold">Status</div>
                          </div>
                          {val.logHistory.map(val => (
                            <div className="d-flex justify-content-between legend-label">
                              <div>{val.username}</div>
                              <div>{val.date}</div>
                              <div
                                className={
                                  val.status === 'Enter'
                                    ? 'badge badge-success'
                                    : 'badge badge-danger'
                                }
                              >
                                {val.status}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))
}

function KioskListTitle(props) {
  return (
    <React.Fragment>
      <div className="col-sm-12 mb-4 mb-xl-0">
        <h4 className="font-weight-bold text-dark">Kiosk List</h4>
      </div>
      <div className="col-12 mt-3">
        <KioskRender data={props.data} deleteKiosk={props.deleteKiosk} />
      </div>
    </React.Fragment>
  )
}

export default class KioskList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      listData: []
    }

    this.deleteKiosk = this.deleteKiosk.bind(this)
    this.getData = this.getData.bind(this)
    this.deleteData = this.deleteData.bind(this)
  }

  async componentDidMount() {
    this.getData()
  }

  async getData() {
    const { data } = await Axios.post('/business/kiosk/list')

    this.setState({ listData: data })
  }

  async deleteData(id) {
    const { data } = await axios.post('/business/kiosk/delete', {
      id: id
    })

    this.getData()
  }

  deleteKiosk(id) {
    sweet.fire('Are you sure you want to delete ?').then(result => {
      if (result.value === true) {
        this.deleteData(id)
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.listData === undefined ||
        this.state.listData.length === 0 ? (
          <div className="col-sm-12 col-md-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body text-center">
                <div className="card-title">
                  <h4 className="font-weight-bold text-dark">
                    No new kiosk was found, a new one do you want to define
                  </h4>
                </div>
                <div className="row display-3">
                  <Link
                    to={'/' + `${this.props.data.username + '/kiosk/create'}`}
                    className="nav-link mx-auto"
                  >
                    <button
                      type="button"
                      className="btn btn-success font-weight-bold mx-auto mt-4"
                    >
                      <span className="badge">
                        <i className="icon-circle-plus" />
                      </span>
                      <span>Create</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <KioskListTitle
            data={this.state.listData}
            deleteKiosk={this.deleteKiosk}
          />
        )}
      </React.Fragment>
    )
  }
}

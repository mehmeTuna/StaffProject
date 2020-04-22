import React, { useEffect } from 'react'

import PaymentHistory from './component/paymentHistory'

import { getStaffDetail } from './../../../api/staff'
import Loading from './../atoms/loading'
import PaymentDialog from './paymentDialog'

const StaffDetail = props => {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState([])
  const [isOpenDialog, setDialogOpen] = React.useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const data = await getStaffDetail(props.id)
      if (data.status) {
        setData(data)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return loading ? (
    <Loading />
  ) : (
    <React.Fragment>
      {isOpenDialog && <PaymentDialog id={props.id} isOpen={setDialogOpen} />}
      <div className="row">
        <div className="col-xl-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <h5 className="card-title">Payment Process</h5>
              </div>
              <div
                id="chart-legends-market-trend"
                className="chart-legends mt-1"
              >
                <div className="row">
                  <div className="col-6">
                    <div className="row">
                      <div className="col-sm-12 ml-sm-0 mr-sm-0 pr-md-0">
                        <h5 className="font-weight-bold text-dark">
                          {data.paymentHistoryData.total} ₺
                        </h5>
                      </div>
                    </div>
                    <div className="row align-items-center">
                      <div className="col-12">
                        <p className="text-muted m-0">Total payment</p>
                      </div>
                    </div>
                    <div className="row text-center">
                      <button
                        type="button"
                        className="m-2 btn btn-success btn-icon-text font-weight-bold"
                        onClick={() => setDialogOpen(true)}
                      >
                        Pay
                      </button>
                    </div>
                  </div>
                  <div className="col-6 ">
                    <div className="row">
                      <div className="col-sm-12 ml-sm-0 mr-sm-0 pr-md-0">
                        <h5 className="font-weight-bold text-dark">
                          {data.balance} ₺
                        </h5>
                      </div>
                    </div>
                    <div className="row align-items-center">
                      <div className="col-12">
                        <p className="text-muted m-0">Amount to be paid</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              {data.logHistory.length == 0 ? (
                <React.Fragment>
                  <p className="text-center text-dark">
                    Login Output Processes
                  </p>
                  <p className="text-center">
                    The user did not take any action
                  </p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p className="text-center mb-2">Entry-Exit Process History</p>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="d-flex justify-content-between mt-2 text-dark mb-2">
                        <div>Total: {data.logCount}</div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="traffic-source-legend">
                        <div className="d-flex justify-content-between mb-1 mt-2">
                          <div className="font-weight-bold">Time</div>
                          <div className="font-weight-bold">Operation</div>
                        </div>
                        {data.logHistory.map(val => (
                          <div className="d-flex justify-content-between legend-label">
                            <div>{val.created_at}</div>
                            <div
                              className={
                                val.traffic === 'Enter'
                                  ? 'badge badge-success'
                                  : 'badge badge-danger'
                              }
                            >
                              {val.traffic}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
        <div className="col-xl-4 grid-margin stretch-card mx-auto">
          {data.paymentHistory.length === 0 ? (
            <div className="card">
              <div className="card-body">
                <p className="text-center m-2">
                  You do not have any payment dates
                </p>
              </div>
            </div>
          ) : (
            <PaymentHistory data={data.paymentHistory} />
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default StaffDetail

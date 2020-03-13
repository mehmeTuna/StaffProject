import React, { useEffect } from "react";
import { getStaffDetail } from "./../../../api/staff";
import Loading from "./../atoms/loading";

const StaffDetail = props => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await getStaffDetail(props.id);
      if (data.status) {
        setData(data);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <React.Fragment>
      <div className="row">
        <div className="col-xl-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <h5 className="card-title">Odeme Islemi</h5>
              </div>
              <div
                id="chart-legends-market-trend"
                className="chart-legends mt-1"
              >
                <div className="row">
                  <div className="col-6 ">
                    <div className="row">
                      <div className="col-sm-12 ml-sm-0 mr-sm-0 pr-md-0">
                        <h5 className="font-weight-bold text-dark">
                          {data.paymentHistoryData.total} ₺
                        </h5>
                      </div>
                    </div>
                    <div className="row align-items-center">
                      <div className="col-12">
                        <p className="text-muted m-0">Toplam Odeme</p>
                      </div>
                    </div>
                    <div className="row text-center">
                      <button
                        type="button"
                        className="m-2 btn btn-success btn-icon-text font-weight-bold"
                      >
                        Odeme Yap
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
                        <p className="text-muted m-0">Odenmesi gereken tutar</p>
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
                  <p className="text-center text-dark">Giris Cikis Islemleri</p>
                  <p className="text-center">
                    Kullanici herhangi bir islemde bulunmadi
                  </p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p className="text-center mb-2">
                    Giris Cikis Islemleri Gecmisi
                  </p>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="d-flex justify-content-between mt-2 text-dark mb-2">
                        <div>Toplam: {data.logCount}</div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="traffic-source-legend">
                        <div className="d-flex justify-content-between mb-1 mt-2">
                          <div className="font-weight-bold">Zaman</div>
                          <div className="font-weight-bold">Islem</div>
                        </div>
                        {data.logHistory.map(val => (
                          <div className="d-flex justify-content-between legend-label">
                            <div>{val.Hour}</div>
                            <div
                              className={
                                val.Traffic === "Enter"
                                  ? "badge badge-success"
                                  : "badge badge-danger"
                              }
                            >
                              {val.Traffic}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
            {data.logHistory.length !== 0 && (
              <nav aria-label="row Page navigation example">
                <ul className="col-sm-12 pagination justify-content-center mt-4">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
        <div className="col-xl-4 grid-margin stretch-card mx-auto">
          <div className="card">
            <div className="card-body">
              {data.paymentHistory.length === 0 ? (
                <React.Fragment>
                  <p className="text-center text-dark">Odeme Gecmisi</p>
                  <p className="text-center m-2">
                    Herhangi bir odeme gecmisiniz bulunmuyor
                  </p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p className="card-title mb-2">Odeme Gecmisi</p>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="text-dark">
                        {data.paymentHistory.map(val => (
                          <div className="d-flex pb-3 border-bottom justify-content-between">
                            <div className="mr-3">
                              <i className="mdi mdi-signal-cellular-outline icon-md"></i>
                            </div>
                            <div className="font-weight-bold mr-sm-4 mt-2">
                              <div>Ödeme</div>
                              <div className="text-muted font-weight-normal mt-1">
                                {val.created_at}
                              </div>
                            </div>
                            <div>
                              <h6 className="font-weight-bold text-info ml-sm-2">
                                {val.pay} ₺
                              </h6>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
            {data.paymentHistory.length !== 0 && (
              <nav aria-label="row Page navigation example">
                <ul className="col-sm-12 pagination justify-content-center mt-4">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>{" "}
    </React.Fragment>
  );
};

export default StaffDetail;

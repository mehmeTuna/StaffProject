import React from "react";
import axios from "axios";

import { Alert } from "./components/atoms/app";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      alert: []
    };
  }

  async componentDidMount() {
    const { data } = await axios.post("/business/statistics");
    this.setState({ data });

    if (data.status === true) {
      this.setState({ alert: data.alert });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="container"></div>
        <div className="row w-100">
          <div className="col-sm-12 mb-4 mb-xl-0">
            {this.state.alert.length > 0 &&
              this.state.alert.map((val, key) => (
                <Alert context={val} key={key} />
              ))}
            <h4 className="font-weight-bold text-dark">
              Merhaba, tekrar hoş geldiniz!
            </h4>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

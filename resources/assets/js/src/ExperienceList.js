import React from "react";
import Axios from "axios";

function ExperienceTableList(value) {

    const list = value
        .data
        .map((value, key) => <tr key={key}>
            <td className="py-1">
                {value.Identifier}
            </td>
            <td>
                {value.WorkClass}
            </td>
            <td>
                {value.Pay}
            </td>
            <td>
                {value.Factor}
            </td>
            <td>
                {value.Periode}
            </td>
            <td>
                {value.Class}
            </td>
        </tr>);

    return list;
}

class ExperienceList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            list: []
        }
    }

    async componentDidMount() {
        const {data} = await Axios.post("/business/experience/list");

        this.setState({list: data});
    }

    render() {
        return (
            <React.Fragment>
                {this.state.list.length == 0
                    ? <div className="col-lg-12 grid-margin stretch-card">
                            Tanımlı Experience bulunamadı
                        </div>
                    : <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Experience List</h4>
                                <p className="card-description"></p>
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>
                                                    Name
                                                </th>
                                                <th>
                                                    Work Class
                                                </th>
                                                <th>
                                                    Pay
                                                </th>
                                                <th>
                                                    Factor
                                                </th>
                                                <th>
                                                    Periode
                                                </th>
                                                <th>
                                                    Class
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <ExperienceTableList data={this.state.list}/>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>}
            </React.Fragment>
        )
    };
};

export default ExperienceList;
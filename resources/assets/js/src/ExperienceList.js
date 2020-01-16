import React from "react";
import Axios from "axios";

function ExperienceTableList(value) {

    const list = value.map((value, key) => <tr key={key}>
        <td className="py-1">
            <img src={value.img} alt={value.fullName}/>
        </td>
        <td>
            {value.fullName}
        </td>
        <td>
            {value.class}
        </td>
        <td>
            {value.experience}
        </td>
        <td>
            {value.gsm}
        </td>
        <td>
            {value.workingTime}
        </td>
        <td>
            {value.working}
        </td>
    </tr>);

    return list;
}

class ExperienceList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: []
        }
    }

    async componentDidMount() {
        const {data} = await Axios.post("/business/staff/list");
        if (data.status === false) {
            window.location.href = "/";
        }

        this.setState({user: data});

        console.log(this.state.user);
    }
    render() {
        return (
            <div className="col-lg-12 grid-margin stretch-card">
               Tanımlı Experience bulunamadı
            </div>
        )
    };
};

export default ExperienceList;
import React from "react";

function StaffTableList(value) {

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

class StaffList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: [
                {
                    img: "../../images/faces/face1.jpg",
                    fullName: "Full Name",
                    class: "Boss",
                    experience: "Founder",
                    gsm: "5451245454",
                    workingTime: "Free Time",
                    working: "yes"
                }, {
                    img: "../../images/faces/face1.jpg",
                    fullName: "Full Name",
                    class: "Boss",
                    experience: "Founder",
                    gsm: "5451245454",
                    workingTime: "Free Time",
                    working: "yes"
                }, {
                    img: "../../images/faces/face1.jpg",
                    fullName: "Full Name",
                    class: "Boss",
                    experience: "Founder",
                    gsm: "5451245454",
                    workingTime: "Free Time",
                    working: "yes"
                }, {
                    img: "../../images/faces/face1.jpg",
                    fullName: "Full Name",
                    class: "Boss",
                    experience: "Founder",
                    gsm: "5451245454",
                    workingTime: "Free Time",
                    working: "yes"
                }, {
                    img: "../../images/faces/face1.jpg",
                    fullName: "Full Name",
                    class: "Boss",
                    experience: "Founder",
                    gsm: "5451245454",
                    workingTime: "Free Time",
                    working: "yes"
                }, {
                    img: "../../images/faces/face1.jpg",
                    fullName: "Full Name",
                    class: "Boss",
                    experience: "Founder",
                    gsm: "5451245454",
                    workingTime: "Free Time",
                    working: "yes"
                }, {
                    img: "../../images/faces/face1.jpg",
                    fullName: "Full Name",
                    class: "Boss",
                    experience: "Founder",
                    gsm: "5451245454",
                    workingTime: "Free Time",
                    working: "yes"
                }, {
                    img: "../../images/faces/face1.jpg",
                    fullName: "Full Name",
                    class: "Boss",
                    experience: "Founder",
                    gsm: "5451245454",
                    workingTime: "Free Time",
                    working: "yes"
                }, {
                    img: "../../images/faces/face1.jpg",
                    fullName: "Full Name",
                    class: "Boss",
                    experience: "Founder",
                    gsm: "5451245454",
                    workingTime: "Free Time",
                    working: "yes"
                }, {
                    img: "../../images/faces/face1.jpg",
                    fullName: "Full Name",
                    class: "Boss",
                    experience: "Founder",
                    gsm: "5451245454",
                    workingTime: "Free Time",
                    working: "yes"
                }, {
                    img: "../../images/faces/face1.jpg",
                    fullName: "Full Name",
                    class: "Boss",
                    experience: "Founder",
                    gsm: "5451245454",
                    workingTime: "Free Time",
                    working: "yes"
                }, {
                    img: "../../images/faces/face1.jpg",
                    fullName: "Full Name",
                    class: "Boss",
                    experience: "Founder",
                    gsm: "5451245454",
                    workingTime: "Free Time",
                    working: "yes"
                }, {
                    img: "../../images/faces/face1.jpg",
                    fullName: "Full Name",
                    class: "Boss",
                    experience: "Founder",
                    gsm: "5451245454",
                    workingTime: "Free Time",
                    working: "yes"
                }
            ]
        }
    }
    render() {
        return (
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Staff List</h4>
                        <p className="card-description"></p>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>
                                            User
                                        </th>
                                        <th>
                                            Full Name
                                        </th>
                                        <th>
                                            Class
                                        </th>
                                        <th>
                                            Experience
                                        </th>
                                        <th>
                                            GSM
                                        </th>
                                        <th>
                                            Working Time
                                        </th>
                                        <th>
                                            S. Working
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { StaffTableList(this.state.user)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
};

export default StaffList;
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import withReactContent from 'sweetalert2-react-content'

import { connect } from 'react-redux'
import { staffGetItems } from '../redux/reducers/StaffReducer'

import { Loading } from './components/app'
import { getStaffData, getDeleteStaff } from './../api/staff'
import Staff from './components/Staff/Staff'

const sweet = withReactContent(Swal)

class StaffList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      Loading: false,
      experience: [],
      staff: []
    }

    this.deleteStaff = this.deleteStaff.bind(this)
    this.delete = this.delete.bind(this)
  }

  async componentDidMount() {
    this.setState({ Loading: true })
    const data = await getStaffData()

    this.setState({ Loading: false, staff: data })
  }

  deleteStaff({ id, username }) {
    sweet
      .fire({
        title: `${username} are you sure you want to delete ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Delete'
      })
      .then(result => {
        if (result.value) {
          this.delete({ id, username })
        }
      })
  }

  async delete({ id, username }) {
    this.setState({ staff: this.state.staff.filter(e => e.id !== id) })
    const data = await getDeleteStaff(id)

    if (data.status === true) {
      sweet.fire({
        title: `${username} deleted`,
        timer: 1500
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.Loading === true ? (
          <Loading />
        ) : this.state.staff === undefined || this.state.staff.length === 0 ? (
          <div className="col-sm-12 col-md-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body text-center">
                <div className="card-title">
                  <h5 className="font-weight-bold text-dark">
                    No new staff was found, no new one do you want to define
                  </h5>
                </div>
                <div className="row display-3">
                  <Link
                    to={'/' + `${this.props.data.username + '/staff/create'}`}
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
          <React.Fragment>
            <div className="col-sm-12 mb-4 mb-xl-0">
              <h5 className="font-weight-bold text-dark">Staff List</h5>
            </div>
            <div className="col-12 mt-3">
              {this.state.staff.map((val, key) => (
                <Staff key={key} data={val} delete={this.deleteStaff} />
              ))}
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onGetStaff: () => dispatch(staffGetItems())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffList)

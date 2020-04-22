import React from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import withReactContent from 'sweetalert2-react-content'

import { connect } from 'react-redux'

import { Loading } from './components/app'
import { getDeleteStaff, getStaffData } from './../api/staff'
import Staff from './components/Staff/Staff'
import { PageHeader, PageTitle, TitleRightBtn } from './components/page-title'
import StaffFilter from './components/Staff/staff-filter'

const sweet = withReactContent(Swal)

class StaffList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      Loading: false,
      experience: [],
      staff: [],
      filteredData: [],
      filterData: {
        isFilterOpen: false,
        payment: false,
        balance: false,
        experience: 'All'
      }
    }

    this.deleteStaff = this.deleteStaff.bind(this)
    this.delete = this.delete.bind(this)
    this.filterOpen = this.filterOpen.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
  }

  async componentDidMount() {
    this.setState({ Loading: true })
    const data = await getStaffData()

    this.setState({ Loading: false, staff: data, filteredData: data })
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

  filterOpen(e) {
    this.setState({
      filterData: Object.assign({}, this.state.filterData, {
        isFilterOpen: e
      })
    })
  }

  applyFilter() {
    let data = this.state.staff
    if (this.state.filterData.experience !== 'All') {
      data = data.filter(e => e.experience === this.state.filterData.experience)
    }
    if (this.state.filterData.payment === true) {
      data = data.filter(e => e.totalPayment > 0)
    }
    if (this.state.filterData.balance === true) {
      data = data.filter(e => e.balance > 0)
    }
    this.setState({
      filteredData: data,
      filterData: Object.assign({}, this.state.filterData, {
        isFilterOpen: false
      })
    })
  }

  render() {
    return (
      <React.Fragment>
        <StaffFilter
          updateFilterData={e => this.setState({ filterData: e })}
          data={this.state.filterData}
          staff={this.state.staff}
          setOpen={this.filterOpen}
          applyFilter={this.applyFilter}
        />
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
            <PageHeader>
              <div></div>
              <PageTitle>Staff List</PageTitle>
              <TitleRightBtn onClick={() => this.filterOpen(true)}>
                Filter
              </TitleRightBtn>
            </PageHeader>
            <div className="col-12 mt-3">
              {this.state.filteredData.map((val, key) => (
                <Staff
                  key={key}
                  data={val}
                  delete={this.deleteStaff}
                  currencySymbolUtf8={this.props.data.currencySymbolUtf8}
                />
              ))}
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

export default StaffList

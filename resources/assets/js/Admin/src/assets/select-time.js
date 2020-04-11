import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import TimeField from 'react-simple-timefield'

const sweet = withReactContent(Swal)

const selectClock = (addPlan, day) => {
  let selectedStartTime = '08:30',
    selectedEndTime = '17:00'
  sweet
    .fire({
      title: 'Select Clock',
      html: (
        <div className="row">
          <div className="col-8 mb-2 mx-auto">
            Login
            <TimeField
              input={<input type="text" className="form-control" />}
              value={selectedStartTime}
              onChange={time => (selectedStartTime = time.target.value)}
            />
          </div>
          <div className="col-8 mx-auto">
            logout
            <TimeField
              input={<input type="text" className="form-control" />}
              value={selectedEndTime}
              onChange={time => (selectedEndTime = time.target.value)}
            />
          </div>
        </div>
      )
    })
    .then(result => {
      if (result.value === true) {
        if (dataSet(selectedStartTime, selectedEndTime)) {
          addPlan({
            start: selectedStartTime,
            end: selectedEndTime,
            day: day
          })
        }
      }
    })
}

const dataSet = (selectedStartTime, selectedEndTime) => {
  if (selectedStartTime === '' || selectedEndTime === '') return false

  if (compareTime(selectedStartTime, selectedEndTime) === 1) {
    sweet.fire({
      position: 'top-end',
      icon: 'info',
      title: 'The exit time cannot be before the entry time',
      showConfirmButton: false,
      timer: 1500
    })
    return false
  }

  return true
}

const compareTime = (str1, str2) => {
  if (str1 === str2) {
    return 0
  }
  let time1 = str1.split(':')
  let time2 = str2.split(':')

  if (time1[0][0] == 0) {
    time1 = time1[0][1]
  }

  if (time2[0][0] == 0) {
    time2 = time2[0][1]
  }

  if (eval(time1[0]) > eval(time2[0])) {
    return 1
  } else if (
    eval(time1[0]) === eval(time2[0]) &&
    eval(time1[1]) > eval(time2[1])
  ) {
    return 1
  } else {
    return -1
  }
}

export default selectClock

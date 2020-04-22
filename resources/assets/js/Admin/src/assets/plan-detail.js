import React from 'react'

import selectClock from './select-time'

const PlanDetail = ({ data, deletePlan, addPlan }) => {
  return Object.entries(data).map((key, index) => (
    <div key={index} className="row display-4 justify-content-sm-end">
      <div className="w-auto mx-auto">{key[0]}</div>
      <div className="flex-fill d-flex justify-content-end">
        {key[1].length !== 0 && (
          <PlanList
            data={key[1]}
            workingPlan={data}
            day={key[0]}
            deleteTime={deletePlan}
          />
        )}
        <button
          type="button"
          className="m-2 mr-lg-10 btn btn-info font-weight-bold"
          onClick={() => selectClock(addPlan, key[0])}
        >
          <span className="badge">
            <i className="icon-circle-plus" />
          </span>
          <span>Add new Plan</span>
        </button>
      </div>
    </div>
  ))
}

function PlanList({ data, deleteTime, day }) {
  if (typeof data !== 'object') return

  return data.map((value, key) => (
    <button
      key={key}
      type="button"
      onClick={() => deleteTime({ index: key, day: day })}
      className="m-2 btn btn-info font-weight-bold"
    >
      <span className="m-1">
        {value.start}- {value.end}
      </span>
      <span className="badge badge-light">
        <i className="icon-cross"></i>
      </span>
    </button>
  ))
}

export default PlanDetail

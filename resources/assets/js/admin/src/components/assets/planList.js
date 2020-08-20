import React from 'react'

export default function PlanList(props) {
  if (typeof props.data !== 'object') return

  return props.data.map((value, key) => (
    <button
      key={key}
      type="button"
      onClick={() => props.deleteTime(key, props.day)}
      className="m-2 btn btn-info font-weight-bold"
    >
      <span className="m-1">
        {value.start}- {value.end}
      </span>
      <span className="badge badge-light">
        <i className="icon-cross" />
      </span>
    </button>
  ))
}

import React from 'react'
import DatePicker from 'react-date-picker'
import Input from 'react-phone-number-input/input'

const FormInputElement = ({name, type, value, onChange}) => {
  return (
    <div className="col-md-6 form-group row justify-content-center align-items-center">
      <label className="col-sm-2 col-form-label text-center pb-0">{name}</label>
      <div className="col-sm-9 d-flex align-items-center">
        {(type === 'text' || type === 'password' || type === 'number') && (
          <input
            type={type}
            className="form-control"
            value={value}
            onChange={onChange}
          />
        )}
        {type === 'selectBox' && (
          <select
            value={value.value}
            onChange={onChange}
            className="form-control"
          >
            <option value="select">Select</option>
            {value.data.length > 0 &&
              value.data.map(e => (
                <option key={e.value} value={e.value}>
                  {e.name}
                </option>
              ))}
          </select>
        )}
        {type === 'date' && (
          <DatePicker
            value={value}
            calendarClassName="form-control"
            onChange={onChange}
          />
        )}
        {type === 'phone' && (
          <Input className="form-control" value={value} onChange={onChange} />
        )}
      </div>
    </div>
  )
}

export default FormInputElement

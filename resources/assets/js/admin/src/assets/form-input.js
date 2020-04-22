import React from 'react'
import DatePicker from 'react-date-picker'
import Input from 'react-phone-number-input/input'

const FormInputElement = ({ name, type, value, onChange, alert }) => {
  return (
    <div className="col-md-6 column justify-content-center align-items-center">
      <div className="mx-auto">
        <label
          className={
            alert === true
              ? 'col-form-label m-md-2 text-danger'
              : 'col-form-label m-md-2'
          }
        >
          {name}
        </label>
        {(type === 'text' || type === 'password' || type === 'number') && (
          <input
            type={type}
            className={
              alert ? 'form-control border border-danger' : 'form-control'
            }
            value={value}
            onChange={onChange}
          />
        )}
        {type === 'selectBox' && (
          <select
            value={value.value}
            onChange={onChange}
            className={
              alert ? 'form-control border border-danger' : 'form-control'
            }
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
            calendarClassName={
              alert ? 'form-control border border-danger' : 'form-control'
            }
            onChange={onChange}
          />
        )}
        {type === 'phone' && (
          <Input
            className={
              alert ? 'form-control border border-danger' : 'form-control'
            }
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  )
}

export default FormInputElement

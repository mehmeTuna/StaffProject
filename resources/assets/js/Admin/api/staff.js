import Axios from 'axios'

export async function getStaffData() {
  const { data } = await Axios.post('/business/staff/list')

  return data
}

export async function getDeleteStaff(id) {
  const { data } = await Axios.post('/business/staff/delete', {
    id: id
  })

  return data
}

export async function getStaffDetail(id) {
  const { data } = await Axios.post('/user/data', {
    userId: id,
    type: 'log'
  })

  return data
}

export async function staffPayment(value) {
  try {
    const { data } = await Axios.post('/business/staff/pay', {
      userId: value.id,
      pay: value.pay
    })
    return data
  } catch (error) {
    if (error.response) {
      return error.response
    }
  }

  return null
}

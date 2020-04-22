import Axios from 'axios'

let result = {
  status: true,
  data: [],
  error: ''
}

export async function businessData() {
  const { data } = await Axios.post('/business/data')

  return data.data
}

export async function businessUpdate(value) {
  const { data } = await Axios.post('/business/update', value)

  if (data.status === true) {
    location.reload()
  }
}

export async function experienceList(page = 1, count = 20) {
  try {
    const { data } = await Axios.post(
      `/business/experience/list/${page}/${count}`
    )
    result.data = data.data
    return result
  } catch (error) {
    if (error.response) {
      result.status = false
      result.error = error.response.data
      return result
    }
  }
}

export async function experienceDelete(id = null) {
  if (id === null) return
  try {
    const { data } = await Axios.post('/business/experience/delete', {
      id: id
    })
    result.data = data.data
    return result
  } catch (error) {
    if (error.response) {
      result.status = false
      result.error = error.response.data
      return result
    }
  }
}

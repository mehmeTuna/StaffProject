import Axios from 'axios'

export async function businessData() {
  const { data } = await Axios.post('/business/data')

  return data
}

export async function businessUpdate(value) {
  const { data } = await Axios.post('/business/update', value)

  console.log(data)
  if (data.status === true) {
    location.reload()
  }
}

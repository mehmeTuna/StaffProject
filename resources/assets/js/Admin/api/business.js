import Axios from "axios";

export async function businessData() {
  const { data } = await Axios.post("/business/data");

  return data;
}

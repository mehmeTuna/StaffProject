import Axios from "axios";

export async function getStaffData() {
  const { data } = await Axios.post("/business/staff/list");

  return data;
}

export async function getDeleteStaff(id) {
  const { data } = await Axios.post("/business/staff/delete", {
    id: id
  });

  return data;
}

export async function getStaffDetail(id) {
  const { data } = await Axios.post("/user/data", {
    userId: id,
    type: "log"
  });

  return data;
}

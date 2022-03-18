import axios from "axios";

export const adminLogin = async (data: any) => {
  const result = await axios
    .post("/auth/adminlogin", data)
    .then((res) => {
      localStorage.setItem("jwtToken", res.data.token);
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return result;
};

export const adminLogout = async () => {
  localStorage.removeItem("jwtToken");
  return true;
};
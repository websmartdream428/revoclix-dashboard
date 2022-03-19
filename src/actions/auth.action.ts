import axios from "axios";
import { API_URL } from "config";

export const adminLogin = async (data: any) => {
  const result = await axios
    .post(`${API_URL}/auth/adminlogin`, data)
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

import axios from "axios";

export const getAllCategory = async () => {
  try {
    const res = await axios.get("/category/get");
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

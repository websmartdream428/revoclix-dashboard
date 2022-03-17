import axios from "axios";

export const getAllBrand = async () => {
  try {
    const res = await axios.get("/brand/get");
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

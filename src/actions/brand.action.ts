import axios from "axios";

export const getAllBrand = async () => {
  try {
    const res = await axios.get("/brand/get");
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export const addBrand = async (data: any) => {
  let formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("id_lang", data.id_lang);
  formData.append("active", data.active);
  formData.append("meta_title", data.meta_title);
  formData.append("file", data.file[0]);

  try {
    const res = await axios.post("/brand/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export const editBrand = async (id: any, data: any) => {
  let formData;
  if (data.flag_updated) {
    formData = new FormData();
    formData.append("id", id);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("active", data.active);
    formData.append("meta_title", data.meta_title);
    formData.append("flag_updated", data.flag_updated);
    formData.append("file", data.file[0]);
    try {
      const res = await axios.post("/brand/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (err: any) {
      return err.response.data;
    }
  } else {
    formData = {
      ...data,
      id,
    };
    try {
      const res = await axios.post("/brand/edit", formData);
      return res.data;
    } catch (err: any) {
      return err.response.data;
    }
  }
};

export const removeBrand = async (brand_id: number) => {
  try {
    const res = await axios.post("/brand/remove", { brand_id });
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

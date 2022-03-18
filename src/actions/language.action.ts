import axios from "axios";

export const getAllLanguage = async () => {
  try {
    const res = await axios.get("/lang/get");
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export const addLanguage = async (data: any) => {
  let formData = new FormData();
  formData.append("name", data.name);
  formData.append("iso_code", data.iso_code);
  formData.append("date_format", data.date_format);
  formData.append("date_format_full", data.date_format_full);
  formData.append("code", data.code);
  formData.append("active", data.active);
  formData.append("file", data.file[0]);

  try {
    const res = await axios.post("/lang/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export const editLanguage = async (id: any, data: any) => {
  let formData;
  if (data.flag_updated) {
    formData = new FormData();
    formData.append("id", id);
    formData.append("name", data.name);
    formData.append("iso_code", data.iso_code);
    formData.append("date_format", data.date_format);
    formData.append("date_format_full", data.date_format_full);
    formData.append("code", data.code);
    formData.append("active", data.active);
    formData.append("flag_updated", data.flag_updated);
    formData.append("file", data.file[0]);
    try {
      const res = await axios.post("/lang/edit", formData, {
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
      const res = await axios.post("/lang/edit", formData);
      return res.data;
    } catch (err: any) {
      return err.response.data;
    }
  }
};

export const removeLanguage = async (language_id: number) => {
  try {
    const res = await axios.post("/lang/remove", { language_id });
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

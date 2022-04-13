export const addValidation = (
  // editId: number,
  data: any
) => {
  if (data.name === "") {
    return { valid: false, message: "Category name is required." };
  }
  // else if (data.file.length <= 0 && editId < 0) {
  //   return {
  //     valid: false,
  //     message: "Please select the flag image from your device.",
  //   };
  // }
  else {
    return { valid: true, message: "" };
  }
};

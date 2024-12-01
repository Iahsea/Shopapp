import axios from "../utils/axiosCustomize";

const postCategory = (name) => {
  return axios.post("api/v1/users/categories", {
    name: name,
  });
};

const getCategories = (page, limit) => {
  return axios.get(`api/v1/categories?page=${page}&limit=${limit}`);
};

const getProducts = (page, limit) => {
  return axios.get(`api/v1/products?page=${page}&limit=${limit}`);
};

const getProductById = (id) => {
  return axios.get(`api/v1/products/${id}`);
};

const postUploadProduct = (productId, file) => {
  const data = new FormData();
  data.append("files", file);

  return axios.post(`api/v1/products/uploads/${productId}`, data);
};

const postLogin = (phoneNumber, password) => {
  return axios.post(
    "api/v1/users/login",
    { phone_number: phoneNumber, password: password } // Dữ liệu JSON từ Postman
  );
};

const postRegister = (
  fullName,
  phoneNumber,
  address,
  password,
  retypePassword,
  dateOfBirth,
  facebookAccountId,
  googleAccountId,
  roleId
) => {
  return axios.post("api/v1/users/register", {
    fullname: fullName,
    phone_number: phoneNumber,
    address: address,
    password: password,
    retype_password: retypePassword,
    date_of_birth: dateOfBirth,
    facebook_account_id: facebookAccountId,
    google_account_id: googleAccountId,
    role_id: roleId,
  });
};

export {
  postLogin,
  postRegister,
  postCategory,
  getCategories,
  getProducts,
  postUploadProduct,
  getProductById,
};

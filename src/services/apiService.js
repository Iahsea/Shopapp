import axios from "../utils/axiosCustomize";

const postCategory = (name) => {
  return axios.post("api/v1/users/categories", {
    name: name,
  });
};

const getCategories = (page, limit) => {
  return axios.get(`api/v1/categories?page=${page}&limit=${limit}`);
};

const getProductByCategoryId = (id, page, limit) => {
  return axios.get(
    `api/v1/products/category/${id}?page=${page}&limit=${limit}`
  );
};

const getProducts = (page, limit, keyword, categoryId) => {
  return axios.get(
    `api/v1/products?page=${page}&limit=${limit}&keyword=${keyword}&category_id=${categoryId}`
  );
};

const getProductById = (id) => {
  return axios.get(`api/v1/products/${id}`);
};

const getOrderById = (id) => {
  return axios.get(`api/v1/orders/${id}`);
};

const getUserOrder = (id) => {
  return axios.get(`api/v1/orders/user/${id}`);
};

const deleteOrder = (id) => {
  return axios.delete(`api/v1/orders/${id}`);
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

const postRefreshToken = (refreshToken) => {
  return axios.post("api/v1/users/refreshToken", {
    refreshToken: refreshToken,
  });
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

const postOrder = (
  userId,
  fullName,
  email,
  phoneNumber,
  address,
  note,
  totalMoney,
  shippingMethod,
  paymentMethod
) => {
  return axios.post("api/v1/orders", {
    user_id: userId,
    fullname: fullName,
    email: email,
    phone_number: phoneNumber,
    address: address,
    note: note,
    total_money: totalMoney,
    shipping_method: shippingMethod,
    payment_method: paymentMethod,
  });
};

const postOrderDetail = (
  orderId,
  productId,
  price,
  numberOfProducts,
  totalMoney,
  color
) => {
  return axios.post("api/v1/order_details", {
    order_id: orderId,
    product_id: productId,
    price: price,
    number_of_products: numberOfProducts,
    total_money: totalMoney,
    color: color,
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
  postRefreshToken,
  getProductByCategoryId,
  postOrder,
  postOrderDetail,
  getOrderById,
  getUserOrder,
  deleteOrder,
};

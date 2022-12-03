import request from "@/utils/request";

// 登陆接口
export const LoginAPI = ({ username, password }) => {
  return request({
    method: "POST",
    url: "/api/login",
    data: {
      username,
      password,
    },
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};

//获取用户信息
export const userInfoAPI = (token) => {
  return request({
    url: "/my/userinfo",
    headers: { Authorization: token },
  });
};

// 获取商品信息
export const getGoodsAPI = () => {
  return request({
    url: "/api/goods",
  });
};

// 获取商品信息
export const getGoodsListAPI = (id) => {
  return request({
    url: "/api/goodsList",
    method: "post",
    data: {
      id,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

//修改商品信息
export const setGoodsInfoAPI = ({
  name,
  price,
  avatar,
  textarea,
  id,
  token,
}) => {
  return request({
    method: "post",
    url: "/my/update/goods",
    data: {
      name,
      price,
      avatar,
      textarea,
      id,
    },
    headers: {
      Authorization: token,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

//删除商品信息
export const delInfoAPI = (id, token) => {
  return request({
    method: "post",
    url: "/my/del/delgoods",
    data: {
      id,
    },
    headers: {
      Authorization: token,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

//添加商品信息
export const setGoodsAPI = ({ avatar, name, price, intro, token }) => {
  return request({
    method: "post",
    url: "/my/setgoods",
    data: {
      avatar,
      name,
      price,
      intro,
    },
    headers: {
      Authorization: token,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

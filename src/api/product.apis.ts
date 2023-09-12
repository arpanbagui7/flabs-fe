import {} from "@/interface/auth.interface";
import {
  addProductReq,
  productRes,
  updateProductReq,
} from "@/interface/product.interface";
import axios from "axios";

const authToken = localStorage.getItem("auth");

export const fetchProducts = async (): Promise<productRes[]> => {
  const headersList = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };
  return await axios
    .request({
      url: `${process.env.NEXT_PUBLIC_BASEURL}/product`,
      method: "GET",
      headers: headersList,
    })
    .then((res) => res.data);
};

export const addProduct = async (
  reqData: addProductReq
): Promise<productRes> => {
  const headersList = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };
  return await axios
    .request({
      url: `${process.env.NEXT_PUBLIC_BASEURL}/product`,
      method: "POST",
      data: reqData,
      headers: headersList,
    })
    .then((res) => res.data);
};

export const updateProduct = async (
  reqData: updateProductReq
): Promise<productRes> => {
  const headersList = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };
  const { id, ...product } = reqData;
  return await axios
    .request({
      url: `${process.env.NEXT_PUBLIC_BASEURL}/product/${id}`,
      method: "PATCH",
      data: product,
      headers: headersList,
    })
    .then((res) => res.data);
};

export const deleteProduct = async (id: string) => {
  const headersList = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };
  return await axios
    .request({
      url: `${process.env.NEXT_PUBLIC_BASEURL}/product/${id}`,
      method: "DELETE",
      headers: headersList,
    })
    .then((res) => res.data);
};

import { addProduct, updateProduct } from "@/api/product.apis";
import {
  ISelectedProduct,
  addProductReq,
  updateProductReq,
} from "@/interface/product.interface";
import { Button, Form, Input, InputNumber, message } from "antd";
import { AxiosError } from "axios";
import React, { Dispatch } from "react";
import { useMutation } from "react-query";

const AddProduct = ({
  selectedProduct,
  closeDrawer,
}: {
  selectedProduct: ISelectedProduct;
  closeDrawer: () => void;
}) => {
  const { TextArea } = Input;
  const [messageApi, contextHolder] = message.useMessage();
  const key = selectedProduct.id ? "updateProduct" : "addProduct";
  const {
    mutate: addProductMutate,
    isLoading: addProductLoading,
    isError: addProductError,
    isSuccess: addProductSuccess,
    error: addProductErrorRes,
  } = useMutation({
    mutationFn: (reqData: addProductReq) => addProduct(reqData),
  });

  const {
    mutate: updateProductMutate,
    isLoading: updateProductLoading,
    isError: updateProductError,
    isSuccess: updateProductSuccess,
    error: updateProductErrorRes,
  } = useMutation({
    mutationFn: (reqData: updateProductReq) => updateProduct(reqData),
  });

  const handleSubmit = (reqData: ISelectedProduct) => {
    if (selectedProduct.id) {
      updateProductMutate({ ...reqData, id: selectedProduct.id });
    } else {
      addProductMutate(reqData);
    }
  };

  if (updateProductError || addProductError) {
    const error = addProductError ? addProductErrorRes : updateProductErrorRes;
    if (error instanceof AxiosError) {
      if (error.response) {
        messageApi.open({
          key,
          duration: 1,
          type: "error",
          content: Array.isArray(error.response.data?.message)
            ? error.response.data.message[0]
            : error.response.data.message || "Something went wrong",
        });
      } else {
        messageApi.open({
          key,
          duration: 1,
          type: "error",
          content: error.message || "Something went wrong",
        });
      }
    } else {
      messageApi.open({
        key,
        duration: 1,
        type: "error",
        content: "Something went wrong",
      });
    }
  } else if (addProductSuccess) {
    messageApi.open({
      key,
      duration: 1,
      type: "success",
      content: "Product added successfully",
    });
    setTimeout(() => {
      closeDrawer();
    }, 700);
  } else if (updateProductSuccess) {
    messageApi.open({
      key,
      duration: 1,
      type: "success",
      content: "Product updated successfully",
    });
    setTimeout(() => {
      closeDrawer();
    }, 700);
  }

  return (
    <>
      {contextHolder}
      <Form
        layout='vertical'
        colon={false}
        labelAlign='left'
        name='signin'
        initialValues={selectedProduct}
        onFinish={handleSubmit}>
        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: "Please enter product name" }]}>
          <Input placeholder='Enter product name' />
        </Form.Item>
        <Form.Item
          label='Price'
          name='price'
          rules={[{ required: true, message: "Please enter product price" }]}>
          <InputNumber placeholder='Enter product price' />
        </Form.Item>
        <Form.Item label='Description' name='description'>
          <TextArea rows={4} placeholder='Enter product description' />
        </Form.Item>
        <Form.Item>
          <Button
            disabled={addProductLoading || updateProductLoading}
            type='primary'
            htmlType='submit'>
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddProduct;

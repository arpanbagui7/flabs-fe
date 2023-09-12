import { signup } from "@/api/auth.api";
import { authReq } from "@/interface/auth.interface";
import { Button, Form, Input, message } from "antd";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useMutation } from "react-query";

const Signup = () => {
  const key = "signup";
  const initialValues = {
    email: "",
    password: "",
  };
  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();

  const { mutate, isLoading, isError, isSuccess, error, data } = useMutation({
    mutationFn: (reqData: authReq) => signup(reqData),
  });

  if (isLoading) {
    messageApi.open({
      key,
      duration: 0,
      type: "loading",
      content: "Loading...",
    });
  } else if (isError) {
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
  } else if (isSuccess) {
    localStorage.setItem("auth", data.access_token);
    router.push("/dashboard");
  }

  const handleSubmit = (reqData: authReq) => {
    mutate(reqData);
  };

  return (
    <>
      {contextHolder}
      <Form
        layout='vertical'
        colon={false}
        labelAlign='left'
        name='signup'
        initialValues={initialValues}
        onFinish={handleSubmit}>
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: "Please enter your email" }]}>
          <Input placeholder='Enter your email' />
        </Form.Item>
        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: "Please enter your password" }]}>
          <Input.Password placeholder='Enter your password' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Signup;

import React from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, message } from "antd";
import { useMutation } from "react-query";
import { authReq } from "@/interface/auth.interface";
import { AxiosError } from "axios";
import { signin } from "@/api/auth.api";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const key = "login";
  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();

  const { mutate, isLoading, isError, isSuccess, error, data } = useMutation({
    mutationFn: (reqData: authReq) => signin(reqData),
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
          type: "error",
          duration: 1,
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
        name='signin'
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
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;

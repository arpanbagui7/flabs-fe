import React, { FC } from "react";
import { Result } from "antd";
import { IError } from "@/interface/error.interface";
import { AxiosError } from "axios";

const ErrorHandler: FC<IError> = ({ error }) => {
  const handlerError = () => {
    let err;
    if (error instanceof AxiosError && error.response?.data) {
      const {
        status,
        error: { message, reason },
      } = error.response.data as {
        status: number;
        error: {
          status: number;
          message: string;
          reason: string;
        };
      };
      err = {
        statusCode: status,
        message,
        reason,
      };
    } else {
      err = {
        statusCode: 500,
        message: "Error",
        reason: "Something went wrong",
      };
    }
    return <Result status='error' title={err.message} subTitle={err.reason} />;
  };

  return handlerError();
};

export default ErrorHandler;
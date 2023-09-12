import { authReq, authRes } from "@/interface/auth.interface";
import axios from "axios";

export const signin = async (req: authReq): Promise<authRes> => {
  const headersList = {
    "Content-Type": "application/json",
  };
  return await axios
    .request({
      url: `${process.env.NEXT_PUBLIC_BASEURL}/auth/signin`,
      method: "POST",
      data: JSON.stringify(req),
      headers: headersList,
    })
    .then((res) => res.data);
};

export const signup = async (req: authReq): Promise<authRes> => {
  const headersList = {
    "Content-Type": "application/json",
  };
  return await axios
    .request({
      url: `${process.env.NEXT_PUBLIC_BASEURL}/auth/signup`,
      method: "POST",
      data: JSON.stringify(req),
      headers: headersList,
    })
    .then((res) => res.data);
};

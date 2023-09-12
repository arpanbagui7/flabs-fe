"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { Spin } from "antd";
import ErrorHandler from "@/components/errorHanlder";
import Product from "@/components/product/product";
import { fetchProducts } from "@/api/product.apis";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!token) {
      router.push("/");
    }
  }, []);

  const { isLoading, isError, isSuccess, data, error, refetch } = useQuery({
    queryKey: ["product"],
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className='divCenter fullDiv'>
        <Spin tip='Loading'>
          <div />
        </Spin>
      </div>
    );
  } else if (isError) {
    return <ErrorHandler error={error} />;
  } else if (isSuccess) {
    return <Product products={data} refetch={refetch} />;
  }
};

export default Dashboard;

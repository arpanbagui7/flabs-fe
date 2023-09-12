import { productRes, ISelectedProduct } from "@/interface/product.interface";
import { DeleteTwoTone, EditTwoTone, LogoutOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import {
  Button,
  Drawer,
  Table,
  Popconfirm,
  message,
  Row,
  Col,
  Input,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "@/styles/dashboard.module.css";
import React, { useEffect, useRef, useState } from "react";
import AddProduct from "./addProduct";
import { UseQueryResult, useMutation } from "react-query";
import { deleteProduct } from "@/api/product.apis";
import { AxiosError } from "axios";

const Product = ({
  products,
  refetch,
}: {
  products: productRes[];
  refetch: (options: {
    throwOnError: boolean;
    cancelRefetch: boolean;
  }) => Promise<UseQueryResult>;
}) => {
  const router = useRouter();
  const columns: ColumnsType<productRes> = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      render: ({ id, name, description, price }: productRes) => (
        <div className={styles.tableAction}>
          <EditTwoTone
            className={styles.cursor}
            twoToneColor='green'
            onClick={() => openDrawer({ id, name, description, price })}
          />
          <Popconfirm
            title='Are you sure to delete this product?'
            okText='Yes'
            cancelText='No'
            onConfirm={() => handleDelete(id)}>
            <DeleteTwoTone className={styles.cursor} twoToneColor='red' />
          </Popconfirm>
        </div>
      ),
    },
  ];
  const [messageApi, contextHolder] = message.useMessage();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterProducts, setFilterProducts] = useState(products);

  const currentProduct = useRef<ISelectedProduct>({
    id: "",
    name: "",
    description: "",
    price: 0,
  });

  const isDeleted = useRef(false);

  useEffect(() => {
    setFilterProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText]);

  const { mutate, isError, isSuccess, error } = useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
  });

  const openDrawer = (selectedProduct?: ISelectedProduct) => {
    setDrawerOpen(true);
    if (selectedProduct) {
      currentProduct.current = selectedProduct;
    }
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    currentProduct.current = {
      id: "",
      name: "",
      description: "",
      price: 0,
    };
    refetch({ throwOnError: true, cancelRefetch: false });
  };

  const handleDelete = (id: string) => {
    isDeleted.current = true;
    mutate(id);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    router.push("/");
  };

  if (isError) {
    if (error instanceof AxiosError) {
      if (error.response) {
        messageApi.open({
          key: "deleteProduct",
          type: "error",
          duration: 1,
          content: Array.isArray(error.response.data?.message)
            ? error.response.data.message[0]
            : error.response.data.message || "Something went wrong",
        });
      } else {
        messageApi.open({
          key: "deleteProduct",
          type: "error",
          duration: 1,
          content: error.message || "Something went wrong",
        });
      }
    } else {
      messageApi.open({
        key: "deleteProduct",
        type: "error",
        duration: 1,
        content: "Something went wrong",
      });
    }
  } else if (isSuccess) {
    messageApi.open({
      key: "deleteProduct",
      type: "info",
      duration: 1,
      content: "Product deleted successfully",
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  return (
    <>
      {contextHolder}
      <Row gutter={16} className='mb1'>
        <Col span={12}>
          <Input
            placeholder='Search product by name'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
        <Col span={6} className='alignRight'>
          <Button onClick={() => openDrawer()}>Add Product</Button>
        </Col>
        <Col span={6} className='alignRight'>
          <LogoutOutlined className='logoutIcon' onClick={handleLogout} />
        </Col>
      </Row>
      <Table columns={columns} dataSource={filterProducts} rowKey='id' />
      {isDrawerOpen && (
        <Drawer onClose={closeDrawer} open={isDrawerOpen}>
          <AddProduct
            selectedProduct={currentProduct.current}
            closeDrawer={closeDrawer}
          />
        </Drawer>
      )}
    </>
  );
};

export default Product;

"use client";
import React, { useState } from "react";
import { Card, Col, Layout, Row, Switch } from "antd";
import styles from "@/styles/home.module.css";
import Login from "@/components/auth/login";
import Signup from "@/components/auth/signup";

const Home = () => {
  const [isExistingUser, setExistingUser] = useState(true);

  return (
    <>
      <Layout className='fullDiv'>
        <Layout.Content className='divCenter'>
          <Card
            className={styles.cardWidth}
            title={
              <Row>
                <Col span={12}>{isExistingUser ? "Sign In" : "Sign Up"}</Col>
                <Col span={12}>
                  <Switch
                    defaultChecked
                    checkedChildren='Sign Up'
                    unCheckedChildren='Sign In'
                    onChange={(checked) => setExistingUser(checked)}
                  />
                </Col>
              </Row>
            }>
            {isExistingUser ? <Login /> : <Signup />}
          </Card>
        </Layout.Content>
      </Layout>
    </>
  );
};

export default Home;

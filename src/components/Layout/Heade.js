import React, { useState } from "react";
import { Layout, Menu,Switch , Button, Drawer, Row, Col } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  MenuOutlined,
  FileProtectOutlined
} from "@ant-design/icons";
import { useRouter } from 'next/router';
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
const { Header } = Layout;
import Image from 'next/image';
const ResponsiveNav = () => {
  
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
  const [visible, setVisible] = useState(false);
const [theme, setTheme] = useState('light');
  const [current, setCurrent] = useState('1');
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const menu=<>     <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link style={{ textDecoration: 'none' }} href="/">
                Home
              </Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<FileProtectOutlined />}>
                <Link style={{ textDecoration: 'none' }} href="/categories">
                Featured Categories
                </Link>
    </Menu.Item>
    <Menu.SubMenu icon={<FileProtectOutlined />} title="Categories" key="3" style={{color: "cyan",textDecoration: 'none' }}>
      <Menu.Item key="3:7"><Link style={{ color: "green", textDecoration: 'none' }} href="/products/CPU-Processor">
        
                CPU-Processor
              </Link></Menu.Item>
              <Menu.Item key="3:1"><Link style={{ color: "green",textDecoration: 'none' }} href="/products/Motherboard">
                Motherboard
              </Link></Menu.Item>
              <Menu.Item key="3:2"><Link style={{ color: "green",textDecoration: 'none' }} href="/products/RAM">
                RAM
              </Link></Menu.Item>
              <Menu.Item key="3:3"><Link style={{ color: "green",textDecoration: 'none' }} href="/products/Power Supply Unit">
                Power Supply Unit
              </Link></Menu.Item>
              <Menu.Item key="3:4"><Link style={{ color: "green",textDecoration: 'none' }} href="/products/Storage Device">
                Storage Device
              </Link></Menu.Item>
              <Menu.Item key="3:5"><Link style={{ color: "green",textDecoration: 'none' }} href="/products/Monitor">
                Monitor
              </Link></Menu.Item>
              <Menu.Item key="3:6"><Link style={{ color: "green",textDecoration: 'none' }} href="/products/Others">
                Others
              </Link></Menu.Item>
              
            </Menu.SubMenu>
             
 
            </>
  return (
    <Layout className="layout">
      <Header style={{ padding: 0 }}>
        <Row justify="space-between" align="right">
          <Col xs={20} sm={20} md={8}>
            <div
              className="logo"
              style={{ color: "white", paddingLeft: "50px" }}
            >
              PC Builder
            </div>
          </Col>
          <Col xs={0} sm={0} md={10}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
         
              { menu}

              {/* <Menu.Item key="4">Item 4</Menu.Item> */}
           
            </Menu>
          </Col>
          <Col xs={25} sm={0} md={6}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="9" icon={<FileProtectOutlined />}>
                <Link style={{ textDecoration: 'none' }} href="/pcBuilder">
                PC Builder
                </Link>
            </Menu.Item>
            { 
      !session?.user ? <Menu.Item key="6">
                <Button type="primary" >
                  <Link style={{ color: "black",textDecoration: 'none' }} href="/login">
                Login
              </Link>
                </Button>
              </Menu.Item>: <Menu.SubMenu icon={<Image alt="User Name" src={session?.user?.image} width={25} height={25} />} title={session?.user?.name} key="7" style={{color: "cyan",textDecoration: 'none' }}>
              <Menu.Item key="7:1"><Link style={{ color: "green",textDecoration: 'none' }} href="/profile">
                Profile
              </Link></Menu.Item>
              
              <Menu.Item key="7:2" onClick={()=>signOut()}>Logout</Menu.Item>
    </Menu.SubMenu>
    }</Menu>
          </Col>
              
          <Col xs={2} sm={2} md={0}>
            <Button type="primary" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
          </Col>
        </Row>
        <Drawer
          title="Menu"
          placement="left"
          onClick={onClose}
          onClose={onClose}
          open={visible}
        >
          <Menu mode="vertical" defaultSelectedKeys={["1"]} selectedKeys={[current]}>
        <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      <br />
      <br />
            { menu}
     
               <Menu.Item key="8" icon={<FileProtectOutlined />}>
                <Link style={{ textDecoration: 'none' }} href="/pcBuilder">
                PC Builder
                </Link>
            </Menu.Item>
                {
      !session?.user ? <Menu.Item key="6">
                <Button type="primary" >
                  <Link style={{ color: "green",textDecoration: 'none' }} href="/login">
                Login
              </Link>
                </Button>
              </Menu.Item>: <Menu.SubMenu icon={<Image alt="User Name" src={session?.user?.image} width={25} height={25} />} title={session?.user?.name} key="7" style={{color: "cyan",textDecoration: 'none' }}>
              <Menu.Item key="7:1"><Link style={{ color: "green",textDecoration: 'none' }} href="/profile">
                Profile
              </Link></Menu.Item>
              
              <Menu.Item key="7:2" style={{ color: "green",textDecoration: 'none' }} onClick={()=>signOut()}>Logout</Menu.Item>
    </Menu.SubMenu>
    }
          </Menu>
          
        </Drawer>
      </Header>
    </Layout>
  );
};

export default ResponsiveNav;
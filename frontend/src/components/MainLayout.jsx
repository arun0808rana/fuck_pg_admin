import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import useStore from "../store";
import { getTableRows } from "../api";

const { Header, Content, Footer, Sider } = Layout;
const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const MainLayout = ({ children }) => {
  const {selectedDb, selectedTable, openedTables} = useStore(state=>state);
  console.log('--state', {selectedDb, selectedTable, openedTables});

  const setSelectedTable = useStore((state) => state.setSelectedTable);
  const setSelectedDb = useStore(state=>state.setSelectedDb);

  const handleTableClick = ({tableName})=>{
    try {
      getTableRows({tableName})
    } catch (error) {
      
    }
  }
  const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
      const key = String(index + 1);
      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: <div onClick={()=>setSelectedDb(`subnav ${key}`)}>`subnav ${key}`</div>,
        children: databasesMetaData.map((dbMetaData, j) => {
          const subKey = index * 4 + j + 1;
          return {
            key: subKey,
            label: <div onClick={()=>handleTableClick({dbMetaData..................tableName})}>`option--${subKey}`</div>,
          };
        }),
      };
    }
  );

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{
      height: '100%'
    }}>
      <Content style={{
        height: '100%'
      }}>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            height: '100%'
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
              maxHeight: '100%',
              overflow: 'scroll'
            }}
            width={200}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{
                height: "100%",
              }}
              items={items2}
            />
          </Sider>
          <Content
            style={{
              padding: "0 24px",
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};
export default MainLayout;

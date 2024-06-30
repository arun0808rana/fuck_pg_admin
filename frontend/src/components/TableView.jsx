import React, { useState } from "react";
import { Button, Divider, Flex, Radio, Table, Tooltip } from "antd";
import FilterAndSearch from "./FilterAndSearch";
import {
  FilterFilled,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
const { Search } = Input;


const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Disabled User",
    age: 99,
    address: "Sydney No. 1 Lake Park",
  },
];

const data2 = [
  {
    key: "1",
    name: "John Brown 2",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green 2",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black 2",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Disabled User 2",
    age: 99,
    address: "Sydney No. 1 Lake Park",
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};

const TableView = () => {
  const [selectionType, setSelectionType] = useState("checkbox");
  const [showModal, setShowModal] = useState(false);

  const columns = React.useMemo(()=>{
    return [
        {
          title: "Name",
          dataIndex: "name",
          render: (text) => <a>{text}</a>,
        },
        {
          title: "Age",
          dataIndex: "age",
        },
        {
          title: "Address",
          dataIndex: "address",
        },
      ]
  }, []);

  const handleFilterAndSort = () => {
    setShowModal(true);
  };
  return (
    <div>
      <Flex justify="flex-end" gap={2}>
        <Search
          placeholder="Search All Columns"
          //   onSearch={onSearch}
          style={{
            width: 200,
          }}
        />

        <Tooltip title="search">
          <Button type="text" icon={<FilterOutlined />} onClick={handleFilterAndSort}/>
        </Tooltip>
      </Flex>

      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
      <FilterAndSearch showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};
export default TableView;

import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Table } from "antd";
import { getApi } from "../callApi";
import { Link } from "react-router-dom";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text, item) => {
      return <Link to={`detail/${item.id}`}>{text}</Link>;
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "",
    dataIndex: "",
    key: "",
    render: (item) => {
      return (
        <button
          onClick={() => {
            //  console.log("xóa", item);
          }}>
          Xóa
        </button>
      );
    },
  },
];

export default function Employee() {
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    getApi("employee").then((data) => {
      console.log(data, "fghjkl;cccc");
      setEmployee(data.data);
    });
  }, []);
  return <Table columns={columns} dataSource={employee} />;
}

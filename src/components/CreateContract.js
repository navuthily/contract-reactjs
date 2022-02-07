import HtmlEditor, { Toolbar, Item } from "devextreme-react/html-editor";
import { useEffect, useRef, useState } from "react";
//import { markup } from "./contracttemplate";
import {  getApi } from "../callApi";
import "devextreme/dist/css/dx.light.css";
import "./../App.css";
import "antd/dist/antd.css";
import { Select, Form, Input, Button } from "antd";
import "./style.css";

const { Option } = Select;
const sizeValues = ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"];
const fontValues = [
  "Arial",
  "Courier New",
  "Georgia",
  "Impact",
  "Lucida Console",
  "Tahoma",
  "Times New Roman",
  "Verdana",
];
export default function CreateContract() {
  const htmlEditor = useRef(null);
  const [markup, setMarkup] = useState("");
  const [newMarkup, setNewMarkup] = useState(markup);
  const [atrb, setAtrb] = useState([]);
  const [employee, setEmployee] = useState([]);
  const value1 = [
    {
      name: "an",
      position: "IT",
      age: 2111,
      dob: "20/11/2000",
      address: "Da nang",
    },
    { name: "na", position: "IT", age: 21, phone: "090912312" },
  ];
  useEffect(() => {
    getApi("contract").then((data) => {
      setMarkup(data.data[0].content);
    });
    getApi("contract/attribute").then((data) => {
      console.log(data, "dtadd");
      setAtrb(data.data);
    });
    getApi("employee").then((data) => {
      setEmployee(data.data);
    });
  }, []);
  const changeText = (e) => {
    setMarkup(e);
    const key = Object.keys(value1[0]);
    let ContentCopy = e;
    key.forEach(
      (x) => (ContentCopy = ContentCopy.replaceAll(`{{${x}}}`, value1[0][x]))
    );
    setNewMarkup(ContentCopy);
  };
  const insertTextAtTheBeginning = (data) => {
    const item = `{{${data}}}`;
    htmlEditor.current.instance.insertText(
      htmlEditor.current.instance.getSelection().index,
      item,
      {
        bold: true,
        color: "green",
      }
    );
  };
  const onSaveTemplate = () => {
  };
  function onChange(value) {
    // console.log(`selected ${value}`);
    //     const key = Object.keys(value1[0]);
    //     let ContentCopy = markup;
    //     key.forEach(
    //       (x) =>
    //         (ContentCopy = ContentCopy.replaceAll(`{{${x}}}`, value1[0][x]))
    //     );
    //setNewMarkup(ContentCopy);
    console.log(value,'huhu');
  }

  function onSearch(val) {
    console.log("search:", val);
  }
  return (
    <div>
      <div className="main">
        <HtmlEditor ref={htmlEditor} value={markup} onValueChange={changeText}>
          <Toolbar>
            <Item name="undo" />
            <Item name="redo" />
            <Item name="separator" />
            <Item name="size" acceptedValues={sizeValues} />
            <Item name="font" acceptedValues={fontValues} />
            <Item name="separator" />
            <Item name="bold" />
            <Item name="italic" />
          </Toolbar>
        </HtmlEditor>
        <div className="form-create-contract">
          <Select
            showSearch
            placeholder="Select a employee"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            <Option></Option>
            {employee.length > 0 &&
              employee.map(function (item, index) {
                return (
                  <Option key={index} value={item.name}>
                    {item.name}
                  </Option>
                );
              })}
          </Select>

          <div>
            <div>Attribute :</div>
            <div>
              {atrb.length > 0 &&
                atrb.map(function (item, index) {
                  return (
                    <Button
                      className="btn-attr"
                      onClick={() => insertTextAtTheBeginning(item.name)}
                      key={index}>
                      {item.name}
                    </Button>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="div-save">
        <button onClick={onSaveTemplate}>Save</button>
      </div>
      <HtmlEditor value={newMarkup}></HtmlEditor>
    </div>
  );
}

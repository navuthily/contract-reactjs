import HtmlEditor, { Toolbar, Item } from "devextreme-react/html-editor";
import { useEffect, useRef, useState } from "react";
//import { markup } from "./contracttemplate";
import { getApi, patchApi } from "../callApi";
import "devextreme/dist/css/dx.light.css";
import "./../App.css";
import "./style.css";
import "antd/dist/antd.css";
import { Select, Button } from "antd";

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
export default function UpdateAllContract() {
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
      setAtrb(data.data);
    });
    getApi("employee").then((data) => {
      console.log(data, "dta nè");
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
    patchApi("contract/1", { content: markup });
    
  };

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
        <div>
          <ul>
            {atrb.length > 0 &&
              atrb.map(function (item, index) {
                return (
                  <button
                    onClick={() => insertTextAtTheBeginning(item.name)}
                    key={index}>
                    {item.name}
                  </button>
                );
              })}
          </ul>
        </div>
      </div>
      <div className="div-save">
        <button onClick={onSaveTemplate}>Save</button>
      </div>
      {/* <HtmlEditor value={newMarkup}></HtmlEditor> */}
    </div>
  );
}

import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { getApi } from "../callApi";

export default function EmployeeDetail() {
  const { id } = useParams();
  const [cvalue, setCValue] = useState([])
  useEffect(() => {
    getApi(`employee/join/${id}`).then((data) => {
      console.log(data.data.cval, "cvalue");
      setCValue(data.data.cval)
    });   
  }, []);

  return (
    <div>
      {cvalue.length > 0 &&
        cvalue.map(function (item, index) {
          return (
            <div key={index}>{item.attr.name} - {item.value }</div>
          );
        })}
    </div>
  );
}

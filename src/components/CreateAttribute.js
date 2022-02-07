import React,{useState} from 'react';
import { postApi } from '../callApi';

export default function CreateAttribute() {
  const [value, setValue] = useState('');
  const onChangeText = (e) => {
    setValue(e.target.value)
  }
  const onSubmit = () => {
    postApi("contract/create/attribute", {name:value});
  }
  return (
    <div>
      <div>
        Tạo attribute:
      </div>
      <input value={value} onChange={(e)=>{onChangeText(e)}}/>
      <button onClick={onSubmit}>Tạo</button>
    </div>
  )
}

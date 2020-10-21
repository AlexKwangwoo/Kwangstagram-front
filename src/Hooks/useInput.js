import { useState } from "react";

export default (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setValue(value);
  };

  return { value, onChange, setValue };
}; //setValue를 보여주려는 이유는 코맨트를 엔터치면 코맨트창에남아있는게아니라
// 업로드가 되어야함!

import React, { useState } from "react";
import { Input } from "@mui/material";
import styled from "styled-components";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const MakedInput = ({
  placeholder,
  type,
  className,
  value,
  name,
  handleChange,
}) => {
  const [TypeOf, setTypeOf] = useState(type);
  const handleTypeReplace = () =>
    setTypeOf((type) => (type === "password" ? "text" : "password"));

  return (
    <MyInput>
      <Input
        className={className}
        value={value}
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
        type={TypeOf}
      />
      {type === "password" && (
        <span onClick={handleTypeReplace}>
          {type === "password" && TypeOf === "password" ? (
            <VisibilityOffIcon />
          ) : (
            <RemoveRedEyeIcon />
          )}
        </span>
      )}
    </MyInput>
  );
};

const MyInput = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export default MakedInput;

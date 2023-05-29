import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const ControlledTextField = ({ name, control, label, type = undefined }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          onChange={onChange}
          value={value}
          label={label}
          type={type}
        />
      )}
    />
  );
};

export default ControlledTextField;

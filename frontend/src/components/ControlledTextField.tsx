import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { FC } from "react";

interface ControlledTextFieldProps {
  name: string;
  control: Control;
}

type ControlledTextFieldPropsUnited = ControlledTextFieldProps &
  Omit<TextFieldProps, "name">;

const ControlledTextField: FC<ControlledTextFieldPropsUnited> = (props) => {
  const { name, control, label, type, error, helperText } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          fullWidth={true}
          onChange={onChange}
          value={value}
          error={error}
          helperText={helperText}
          label={label}
          type={type}
        />
      )}
    />
  );
};

export default ControlledTextField;

import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { FC } from "react";

interface ControlledTextFieldProps {
  name: string;
  control: Control;
}

type ControlledTextFieldPropsUnited = ControlledTextFieldProps &
  Omit<TextFieldProps, "name">;

const ControlledTextField: FC<ControlledTextFieldPropsUnited> = ({
  name,
  control,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          fullWidth={true}
          value={value}
          onChange={onChange}
          {...props}
        />
      )}
    />
  );
};

export default ControlledTextField;

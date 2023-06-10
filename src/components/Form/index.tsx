import * as React from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { useForm, FieldValues } from "react-hook-form";

const Form: React.FC<{
  onSubmit: (values: FieldValues | undefined) => void;
  children: React.ReactNode;
}> = ({ children, onSubmit }) => {
  const { handleSubmit, register } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {(Array.isArray(children) ? children : [children]).map((field) =>
        React.cloneElement(field, {
          register,
        })
      )}
      <DialogActions>
        <Button autoFocus type="submit">
          Submit
        </Button>
        <Button>Cancel</Button>
      </DialogActions>
    </form>
  );
};

export default Form;

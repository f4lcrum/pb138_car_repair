import { FC } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ModalProps } from "../../types/interfaces.tsx";

const ConfirmModal: FC<
  ModalProps & { text: string; confirmAction: () => void }
> = ({ open, setOpen, text, confirmAction }) => {
  const onSubmit = () => {
    confirmAction();
    setOpen(false);
  };

  return (
    <Dialog maxWidth={"md"} open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogContent>{text}</DialogContent>
      <DialogActions>
        <Button variant={"outlined"} onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant={"contained"} onClick={() => onSubmit()}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;

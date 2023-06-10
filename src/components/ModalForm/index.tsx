import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const ModalForm: React.FC<{
  onSubmit: (e: React.BaseSyntheticEvent) => void;
  children: React.ReactNode;
  trigger?: React.ReactElement;
}> = ({ children, onSubmit, trigger }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    onSubmit(e);
    handleClose();
  };

  return (
    <div>
      {trigger ? (
        React.cloneElement(trigger, {
          onClick: handleClickOpen,
        })
      ) : (
        <Button variant="outlined" onClick={handleClickOpen}>
          search
        </Button>
      )}
      <BootstrapDialog
        onClose={handleClose}
        open={open}
        fullWidth={true}
        maxWidth={"lg"}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Modal title
        </BootstrapDialogTitle>
        <DialogContent
          style={{
            width: "100%",
          }}
          dividers
        >
          {children}
          <DialogActions>
            <Button variant="outlined" onClick={handleSubmit}>
              Submit
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default ModalForm;

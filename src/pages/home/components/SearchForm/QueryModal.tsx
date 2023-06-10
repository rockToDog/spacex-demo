import * as React from "react";
import { SxProps, styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SearchForm, { FormData } from "./SearchForm";
import { SearchOutlined } from "@mui/icons-material";

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

const QueryModal: React.FC<{
  sx?: SxProps;
  onOk: (values: FormData) => void;
}> = ({ onOk, sx = {} }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (values: FormData) => {
    onOk(values);
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleClickOpen}
        sx={{ ...sx }}
      >
        <SearchOutlined />
      </IconButton>
      <BootstrapDialog
        onClose={handleClose}
        open={open}
        fullWidth={true}
        maxWidth={"lg"}
        sx={{ ...sx }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          SEARCH
        </BootstrapDialogTitle>
        <DialogContent
          style={{
            width: "100%",
          }}
          dividers
        >
          <SearchForm onOk={handleSearch} onCancel={handleCancel} />
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default QueryModal;

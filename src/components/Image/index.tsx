import React from "react";
import { mergeClassNames } from "@/utils";
import styles from "./index.module.less";
import {
  Card,
  CardContent,
  CardHeader,
  Dialog,
  IconButton,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import placeholderImg from "@/assets/placeholder_1600x1600.svg";

const Image: React.FC<
  {
    lazy?: boolean;
    preview?: boolean;
    src: string;
    alt?: string;
  } & React.HTMLAttributes<HTMLImageElement>
> = ({ lazy = true, preview = true, className, src, alt, ...rest }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImageClick = () => {
    if (preview) {
      handleOpen();
    }
  };

  return (
    <div
      className={mergeClassNames(styles.imageContainer, className)}
      {...rest}
    >
      <img
        className="img"
        src={src ? src : placeholderImg}
        loading={lazy ? "lazy" : "eager"}
        alt={alt}
        onClick={handleImageClick}
      />
      {preview && src && (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth={"lg"}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Card
            sx={{
              width: "100%",
            }}
          >
            <CardHeader
              title={alt ?? ""}
              action={
                <IconButton onClick={handleClose}>
                  <CloseOutlined />
                </IconButton>
              }
            />
            <CardContent>
              <img
                src={src}
                style={{
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
                alt={alt}
              />
            </CardContent>
          </Card>
        </Dialog>
      )}
    </div>
  );
};

export default Image;

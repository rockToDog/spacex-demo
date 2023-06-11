/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";

import { createRoot } from "react-dom/client";
import { Snackbar } from "@mui/material";

const tasks: (() => void)[] = [];

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const getContainer = () => {
  const domNode = document.createElement("div");
  domNode.id = "toastContainer";
  document.body.append(domNode);
  return domNode;
};

export const toast = (
  type?: AlertColor,
  msg?: React.ReactNode,
  delay?: number
) => {
  const container = getContainer();
  const root = createRoot(container);
  root.render(
    <Snackbar open={true}>
      <Alert severity={type ?? "info"}>{msg ?? ""}</Alert>
    </Snackbar>
  );
  const task = () => {
    root.unmount();
    document.body.removeChild(container);
  };
  tasks.push(task);
  setTimeout(() => {
    tasks.find((i) => i === task)?.();
  }, delay ?? 2000);
};

export default {
  info: (msg?: React.ReactNode, delay?: number) => toast("info", msg, delay),
  success: (msg?: React.ReactNode, delay?: number) =>
    toast("success", msg, delay),
  warning: (msg?: React.ReactNode, delay?: number) =>
    toast("warning", msg, delay),
  error: (msg?: React.ReactNode, delay?: number) => toast("error", msg, delay),
};

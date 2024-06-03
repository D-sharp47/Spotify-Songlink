import React from "react";
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

export interface ModalProps {
  readonly fullWidth?: boolean;
  readonly maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  readonly isOpen: boolean;
  readonly title: string;
  readonly showCloseIcon?: boolean;
  readonly dismissDialog: () => void;
  readonly contents: JSX.Element;
  readonly footerActions?: JSX.Element;
}

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <Dialog
      fullWidth={props.fullWidth ?? true}
      maxWidth={props.maxWidth ?? "sm"}
      open={props.isOpen}
    >
      <DialogTitle>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" color="text.primary">
            {props.title}
          </Typography>
          {props.showCloseIcon && (
            <IconButton color="inherit" onClick={props.dismissDialog}>
              <Close />
            </IconButton>
          )}
        </div>
      </DialogTitle>
      <DialogContent>{props.contents}</DialogContent>
      {!!props.footerActions && (
        <DialogActions>{props.footerActions}</DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;
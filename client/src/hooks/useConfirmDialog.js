// hooks/useConfirmDialog.js
import { useState, useCallback } from "react";

export function useConfirmDialog() {
  const [open, setOpen] = useState(false);
  const [onConfirm, setOnConfirm] = useState(() => () => {});
  const [message, setMessage] = useState("");

  const ask = useCallback((msg, confirmCallback) => {
    setMessage(msg);
    setOnConfirm(() => confirmCallback);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return {
    open,
    message,
    ask,
    close,
    onConfirm,
  };
}
// @/common/Modal.tsx
import React from "react";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <Dialog
      isOpen={isOpen}
      onDismiss={onClose}
      style={{ zIndex: 9999 }} 
      aria-label="Modal"
    >
      <button onClick={onClose} className="absolute top-2 right-2 text-2xl">
        &times;
      </button>
      {children}
    </Dialog>
  );
}

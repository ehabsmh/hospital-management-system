import {
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";

type ValueType = {
  openName: string;
  close: () => void;
  open: React.Dispatch<React.SetStateAction<string>>;
};

const ModalContext = createContext<ValueType | null>(null);

function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  const value: ValueType = { openName, close, open };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

function Open<T extends { onClick: () => void }>({
  children,
  opens: opensWindowName,
}: {
  children: ReactElement<T>;
  opens: string;
}) {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Open must be used within a ModalContext.Provider");
  }
  const { open } = context;

  return cloneElement(children, {
    ...children.props,
    onClick: () => open(opensWindowName),
  });
}

function Window<T extends { onCloseModal: () => void }>({
  children,
  name,
}: {
  children: ReactElement<T>;
  name: string;
}) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("Open must be used within a ModalContext.Provider");
  }
  const { openName, close } = context;

  if (name !== openName) return null;

  return createPortal(
    <div
      id="overlay"
      className="overlay bg-white/85 fixed h-screen top-0 left-0 right-0 flex flex-col items-center justify-center"
    >
      {cloneElement(children, { ...children.props, onCloseModal: close })}
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

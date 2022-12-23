import React, { useContext, useEffect } from "react";
import { getScrollbarWidth } from "./utils";
import ModalContext, { IModalContext } from "./ModalContext";
import clsx from "clsx";

const sizes: { [key in IModalContext["size"]]: string } = {
  md: "md:max-w-md",
  lg: "md:max-w-lg",
  xl: "md:max-w-xl",
  "2xl": "md:max-w-2xl",
  "3xl": "md:max-w-3xl",
  "4xl": "md:max-w-4xl",
};

interface IProps {
  children: React.ReactNode;
}

const ModalInner = ({ children }: IProps) => {
  const context = useContext(ModalContext);

  useEffect(() => {
    const handleEscapeKeyDown = ({ key }: KeyboardEvent) => {
      if (key === "Escape") {
        context.onHide();
      }
    };

    document.addEventListener("keydown", handleEscapeKeyDown, false);

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyDown, false);
    };
  }, []);

  useEffect(() => {
    const bodyStyle = document.body.style;

    bodyStyle.paddingRight = `${getScrollbarWidth()}px`;
    bodyStyle.overflow = "hidden";

    return () => {
      bodyStyle.paddingRight = "";
      bodyStyle.overflow = "";
    };
  });

  const handleClickOutside = ({
    target,
    currentTarget,
  }: React.MouseEvent<HTMLDivElement>) => {
    if (target === currentTarget) {
      context.onHide();
    }
  };

  return (
    <>
      <div
        onClick={handleClickOutside}
        className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"
      />
      <div
        tabIndex={-1}
        aria-hidden="true"
        className={clsx(
          sizes[context.size],
          "overflow-hidden fixed top-0 md:top-1/2 left-0 md:left-1/2 z-50 p-4 w-full md:max-h-4/5 h-auto md:max-h-[80%] md:-translate-x-1/2 md:-translate-y-1/2 bg-white rounded-lg shadow p-4 flex flex-col"
        )}
      >
        {children}
      </div>
    </>
  );
};

export default ModalInner;

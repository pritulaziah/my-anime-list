import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

type Size = "md" | "lg";

const sizes: { [key in Size]: string } = {
  md: "text-sm px-5 py-2.5",
  lg: "text-base py-3 px-5",
};

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
  rounded?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Button = ({
  size = "md",
  rounded = false,
  fullWidth = false,
  children,
  ...restProps
}: IProps) => {
  return (
    <button
      {...restProps}
      type="button"
      className={clsx(
        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-center focus:outline-none flex items-center justify-center font-medium transition duration-150 ease-in-out",
        sizes[size],
        rounded ? "rounded-full" : "rounded-lg",
        fullWidth ? "w-full" : "w-auto"
      )}
    >
      {children}
    </button>
  );
};

export default Button;

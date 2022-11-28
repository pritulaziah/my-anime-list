import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

type Color = "default" | "red";
type Size = "md" | "lg";
type Variant = "filled" | "outlined";

const variants: { [key in Variant]: { [key in Color]: string } } = {
  filled: {
    default: "text-white bg-blue-700 hover:bg-blue-800",
    red: "text-white bg-red-700 hover:bg-red-800",
  },
  outlined: {
    default:
      "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800",
    red: "text-red-700 hover:text-white border border-red-700 hover:bg-red-800",
  },
};

const sizes: { [key in Size]: string } = {
  md: "text-sm px-5 py-2.5",
  lg: "text-base px-5 py-3",
};

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: Color;
  size?: Size;
  variant?: Variant;
  rounded?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Button = ({
  color = "default",
  size = "md",
  variant = "filled",
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
        "text-center focus:outline-none flex items-center justify-center font-medium transition duration-150 ease-in-out",
        sizes[size],
        variants[variant][color],
        rounded ? "rounded-full" : "rounded-lg",
        fullWidth ? "w-full" : "w-auto"
      )}
    >
      {children}
    </button>
  );
};

export default Button;

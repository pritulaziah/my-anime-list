import React, { InputHTMLAttributes } from "react";

const Input = React.forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ type = "text", id, ...restProps }, ref) => {
  return (
    <input
      {...restProps}
      ref={ref}
      type={type}
      id={id}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
  );
});

export default Input;

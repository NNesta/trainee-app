import React, { ReactNode } from "react";

const Button = ({
  children,
  variant,
  clickHandler,
  outlined,
  type,
}: {
  children: ReactNode;
  variant?: "small" | "large";
  clickHandler?: () => void;
  outlined?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}) => {
  return (
    <button
      onClick={clickHandler}
      className={`${
        outlined
          ? "text-primary-dark bg-white border-primary-dark border"
          : "bg-primary-dark  text-white"
      } py-3.5 font-medium text-base flex items-center justify-center ${
        variant === "small" ? "rounded-lg pl-4 pr-6" : "rounded-xl w-full"
      } text-center cursor-pointer`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;

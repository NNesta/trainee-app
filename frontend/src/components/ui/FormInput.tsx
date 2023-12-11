import React, { InputHTMLAttributes } from "react";

const FormInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={`text-3xl border-black hover:border-b outline-none py-1 px-0.5 ${props.className}`}
    />
  );
};

export default FormInput;

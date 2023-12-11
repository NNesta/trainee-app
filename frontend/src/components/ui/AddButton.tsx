import React, { ReactNode } from "react";
import Button from "./Button";
import Plus from "../../assets/Plus";

interface PropTypes {
  children: ReactNode;
  addHandler: () => void;
}

const AddButton = ({ children, addHandler }: PropTypes) => {
  return (
    <div className="flex justify-end items-center my-6">
      <Button clickHandler={addHandler} variant="small">
        <Plus />
        <span>{children}</span>
      </Button>
    </div>
  );
};

export default AddButton;

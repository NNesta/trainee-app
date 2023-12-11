import React from "react";

const DropDown = ({ options, selected }: any) => {
  return (
    <select
      className="form-select rounded-xl h-[58px] border-gray-200"
      // {...register("role")}
    >
      {options.map((option: any, index: number) => (
        <option key={index} value={option} selected={option === selected}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default DropDown;

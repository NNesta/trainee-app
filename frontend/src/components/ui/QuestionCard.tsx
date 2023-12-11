import React from "react";
// import Edit from "../../assets/Edit";
// import Delete from "../../assets/Delete";
import Loader from "./Loader";
import DropDown from "./DropDown";
import Edit from "../../assets/Edit";
import Delete from "../../assets/Delete";

const QuestionCard = ({ question }: any) => {
  const { title, options } = question;
  console.log({ options });
  return (
    <div className="flex gap-2">
      <div className="p-8 custom-shadow flex flex-1 items-center justify-between rounded-xl">
        {false && (
          <div className="absolute inset-0 h-full w-full">
            <Loader />
          </div>
        )}
        <div className="w-full justify-between gap-4- cursor-pointer">
          <div className="flex items-center gap-4">
            <input
              defaultValue={title}
              className="text-3xl flex-1 h-16 focus:bg-[#F8F9FA] focus:border-b-2 border-blue-400 outline-none py-1 px-0.5"
            />
            <DropDown options={["Text", "Dropdown"]} selected="Dropdown" />
          </div>
          <ol className="mt-4">
            {options.map((option: string, index: number) => (
              <li key={index} className="flex gap-3 items-center">
                <span>{index + 1}.</span>
                <input
                  defaultValue={option}
                  className="text-lg border-black focus:border-b outline-none py-1 px-0.5"
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="flex flex-col gap-6 p-4 custom-shadow rounded-xl">
        <button className="flex items-center gap-2">
          <Edit />
        </button>
        <button
          //   onClick={() => handleDeleteForm(form._id)}
          className="flex items-center gap-2"
        >
          <Delete />
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;

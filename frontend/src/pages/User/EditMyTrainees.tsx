import React, { useState } from "react";
import Button from "../../components/ui/Button";
import Plus from "../../assets/Plus";
import Sort from "../../assets/Sort";
import Edit from "../../assets/Edit";
import Delete from "../../assets/Delete";
import Cookies from "universal-cookie";
import Loader from "../../components/ui/Loader";
import { useGetMyTraineesQuery } from "../../features/user/apiSlice";
import AddingTraineeModal from "../../components/modals/AddingTraineeModal";

const EditMyTrainees = () => {
  const cookies = new Cookies();
  const jwt = cookies.get("jwt");
  const trainerData = useGetMyTraineesQuery(jwt);
  const [openPopup, setOpenPopup] = useState(false);
  console.log({ trainerData });
  return (
    <div className="py-8">
      
      <div className="flex items-center justify-between mt-24">
        <div className="flex w-full  items-center max-w-xl px-1 py-1 h-[58px] border border-[#DBD5E0] rounded-xl">
          <input
            className="px-2 flex-1 outline-none border-none h-full"
            placeholder="Enter name"
            name="search"
          />
          <Button variant="small">Search</Button>
        </div>
        <div className="flex gap-6 items-center">
          <label className="flex gap-6 items-center">
            <div className="flex gap-2 items-center">
              <Sort />
              <span className="text-base font-normal text-[#5B576A]">
                Sort trainees by:
              </span>
            </div>
            <select
              name="sort"
              className="forms-select outline-none bg-white gap-32 w-20 block py-2 "
            >
              <option selected>Name</option>
              <option>Coach</option>
            </select>
          </label>

          <label className="flex gap-6 items-center">
            <span className="text-base font-normal text-[#5B576A]">
              Trainees per page:
            </span>
            <select
              name="traineePerPage"
              className="forms-select outline-none bg-white gap-32 w-12 block py-2 "
            >
              <option selected>20</option>
              <option>30</option>
              <option>40</option>
              <option>50</option>
            </select>
          </label>
        </div>
      </div>
      <table className="w-full my-8">
        <thead className="bg-[#0077B6] bg-opacity-20 h-20">
          <tr className="">
            <td className="rounded-l-xl pl-12 font-semibold">No</td>
            <td className="pl-12 font-semibold">Name</td>
            <td className="pl-12 font-semibold">Coach</td>
            <td className="rounded-r-xl pl-12 font-semibold">Edit</td>
          </tr>
        </thead>
        {trainerData.status === "pending" ? (
          <div className="flex w-screen items-center justify-center h-[50vh]">
            <Loader />
          </div>
        ) : (
          <tbody className="w-full">
            {trainerData.data?.map((item: any, index: number) => (
              <tr className="border-b border-black h-[100px] ">
                <td className="text-base font-medium pl-12">{index + 1}</td>
                <td className="text-base font-medium pl-12">{item.name}</td>
                <td className="text-base font-medium pl-12">
                  {item.coach?.name || "No coach assigned"}
                </td>
                <td className="text-base font-medium pl-12">
                  <div className="flex items-center gap-4 w-full h-full">
                    <button>
                      <Edit />
                    </button>{" "}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {openPopup && (
        <AddingTraineeModal jwt={jwt} closePopup={() => setOpenPopup(false)} />
      )}
    </div>
  );
};

export default EditMyTrainees;
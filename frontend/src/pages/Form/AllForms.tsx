import React, { useState } from "react";
import SearchInput from "../../components/ui/SearchInput";
import AddButton from "../../components/ui/AddButton";
import {
  useCreateFormMutation,
  useGetAllFormsQuery,
} from "../../features/user/apiSlice";
import Cookies from "universal-cookie";
import FormCard from "../../components/ui/FormCard";
import { IFormType } from "../../utils/types";
import Loader from "../../components/ui/Loader";
import { useNavigate } from "react-router-dom";

const AllForms = () => {
  const [searchString, setSearchString] = useState("");
  const navigate = useNavigate();
  const cookie = new Cookies();
  const jwt = cookie.get("jwt");
  const [createForm] = useCreateFormMutation();
  const { data, isFetching } = useGetAllFormsQuery({ searchString, jwt });
  const onClickAddForm = async () => {
    const result = await createForm({
      jwt,
      body: { title: `Form ${data.length}` },
    });
    const id = result.data._id;
    navigate(`/forms/${id}`);
  };

  return (
    <div className="py-12">
      <div className="flex justify-between items-center">
        <SearchInput setSearchQuery={setSearchString} />
        <AddButton addHandler={onClickAddForm}>Add form</AddButton>
      </div>
      {isFetching ? (
        <div className="h-[50vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {data.map((form: IFormType, index: number) => (
            <FormCard form={form} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllForms;

import React, { useState } from "react";
import Cookies from "universal-cookie";
import {
  useDeleteTraineeMutation,
  useGetAllTraineesQuery,
} from "../../features/user/apiSlice";
import AddingTraineeModal from "../../components/modals/AddingTrainee";
import EditTrainee from "../../components/modals/EditTrainee";
import UserTable from "../../components/ui/UserTable";
import UserTableHeader from "../../components/ui/UserTableHeader";
import { getTrainees } from "../../utils/helper";
import {
  usersPerPageValues,
  traineeTableDataItems,
  traineeTableHeaders,
  traineeTableSortingValues,
} from "../../utils/data";
import AddUserButton from "../../components/ui/AddButton";

const TraineesInfo = () => {
  const cookies = new Cookies();
  const jwt: string = cookies.get("jwt");
  const [query, setQuery] = useState("");
  const [editTrainee, setEditTrainee] = useState<string[] | null>(null);
  const { data, isFetching: isGetAllTraineesLoading } = useGetAllTraineesQuery({
    jwt,
    query,
  });
  const [isAddingTrainee, setIsAddingTrainee] = useState(false);
  const [deleteTrainee, { isFetching: isDeleteTraineeLoading }] =
    useDeleteTraineeMutation();
  const handleDeleteTrainee = async (id: string) => {
    await deleteTrainee({ jwt, id });
  };

  const traineesList: string[][] = getTrainees(data, traineeTableDataItems);

  return (
    <div className="py-8">
      <AddUserButton addHandler={() => setIsAddingTrainee(true)}>
        Add trainee
      </AddUserButton>
      <UserTableHeader
        setQuery={setQuery}
        sortingValues={traineeTableSortingValues}
        usersPerPageValues={usersPerPageValues}
      />
      <UserTable
        headers={traineeTableHeaders}
        data={traineesList}
        actions={[
          { type: "edit", actionCaller: setEditTrainee },
          { type: "delete", actionCaller: handleDeleteTrainee },
        ]}
        isLoading={isDeleteTraineeLoading || isGetAllTraineesLoading}
      />
      {isAddingTrainee && (
        <AddingTraineeModal
          jwt={jwt}
          closePopup={() => setIsAddingTrainee(false)}
        />
      )}
      {editTrainee && (
        <EditTrainee
          jwt={jwt}
          closePopup={() => setEditTrainee(null)}
          traineeData={editTrainee}
          role="ADMIN"
        />
      )}
    </div>
  );
};

export default TraineesInfo;

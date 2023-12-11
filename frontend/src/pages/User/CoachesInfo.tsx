import React, { useState } from "react";
import AddUserButton from "../../components/ui/AddButton";
import Cookies from "universal-cookie";
import { useGetAllCoachesQuery } from "../../features/user/apiSlice";
import { useDeleteCoachMutation } from "../../features/user/apiSlice";
import AddingCoachModal from "../../components/modals/AddingCoach";
import UserTable from "../../components/ui/UserTable";
import EditCoach from "../../components/modals/EditCoach";
import UserTableHeader from "../../components/ui/UserTableHeader";
import { getCoaches } from "../../utils/helper";
import {
  usersPerPageValues,
  coachTableSortingValues,
  coachTableDataItems,
  coachTableHeaders,
} from "../../utils/data";

const CoachesInfo = () => {
  const cookies = new Cookies();
  const jwt = cookies.get("jwt");
  const [query, setQuery] = useState("");
  const { data, isFetching: isGetAllCoachesLoading } = useGetAllCoachesQuery({
    jwt,
    query,
  });
  const [isAddingCoach, setIsAddingCoach] = useState(false);
  const [editCoachData, setEditCoachData] = useState<string[] | null>(null);
  const [deleteCoach, { isFetching: isDeleteCoachLoading }] =
    useDeleteCoachMutation();
  const handleDeleteCoach = async (id: string) => {
    await deleteCoach({ jwt, id });
  };

  const coachesList = getCoaches(data, coachTableDataItems);

  return (
    <div>
      <div className="py-8">
        <AddUserButton addHandler={() => setIsAddingCoach(true)}>
          Add coach
        </AddUserButton>
        <UserTableHeader
          setQuery={setQuery}
          sortingValues={coachTableSortingValues}
          usersPerPageValues={usersPerPageValues}
        />
        <UserTable
          headers={coachTableHeaders}
          data={coachesList}
          actions={[
            { type: "edit", actionCaller: setEditCoachData },
            { type: "delete", actionCaller: handleDeleteCoach },
          ]}
          isLoading={isDeleteCoachLoading || isGetAllCoachesLoading}
        />
      </div>
      {isAddingCoach && (
        <AddingCoachModal
          jwt={jwt}
          closePopup={() => setIsAddingCoach(false)}
        />
      )}
      {editCoachData && (
        <EditCoach
          jwt={jwt}
          closePopup={() => setEditCoachData(null)}
          coachData={editCoachData}
        />
      )}
    </div>
  );
};

export default CoachesInfo;

import * as React from "react";
import { useSelector } from "react-redux";
import { selectUser, selectUserStatus } from "../../../state/users/UserSlice";
import { UserRole } from "../../../types";

export function AdminPage() {
  const user = useSelector(selectUser);

  return (
    <>
      {user?.role === UserRole.ADMIN ? (
        <h1>Admin page</h1>
      ) : (
        <h1>Access denied!</h1>
      )}
    </>
  );
}

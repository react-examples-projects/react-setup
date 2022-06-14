import React, { memo, useState, useEffect } from "react";
import css from "styles/User.module.scss";
import UserItem from "components/UserItem";
import useUserList from "hooks/useUserList";
import LoaderUserList from "components/Loaders/LoaderUserList";

function UserList() {
  const { data, isLoading, isError } = useUserList();
  const [users, setUsers] = useState(data || []);

  useEffect(() => {
    if (!!data) setUsers(data);
  }, [data]);

  if (isLoading) return <LoaderUserList />;

  if (isError) return "Error al solicitar los usuarios";

  return (
    <ul className={css.userList}>
      {users?.map((user, index) => (
        <UserItem {...user} key={user?._id || user?.email || index} />
      ))}
    </ul>
  );
}

export default memo(UserList);

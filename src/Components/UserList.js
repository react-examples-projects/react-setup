import React, { memo } from "react";
import css from "styles/User.module.scss";
import UserItem from "components/UserItem";
import useUserList from "hooks/useUserList";

function UserList() {
  const { data, isLoading, isError } = useUserList();

  if (isLoading) return "Cargando Usuarios...";

  if (isError) return "Error al solicitar los usuarios";

  return (
    <ul className={css.userList}>
      {data?.map((user, index) => (
        <UserItem {...user} key={user?._id || user?.email || index} />
      ))}
    </ul>
  );
}

export default memo(UserList);

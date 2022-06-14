import { memo } from "react";
import css from "styles/User.module.scss";
import useUsers from "hooks/useUsers";
import UserItem from "components/UserItem";
import LoaderUserList from "components/Loaders/LoaderUserList";

function UserList() {
  const { users, isLoading, isError } = useUsers();

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

import { memo } from "react";
import css from "styles/User.module.scss";
import useUsers from "hooks/users/useUsers";
import UserItem from "components/UserList/UserItem";
import LoaderUserList from "components/Loaders/LoaderUserList";
import UserListFilter from "components/UserList/UserListFilter";

function UserList() {
  const { users, isLoading, isError } = useUsers();

  if (isLoading) return <LoaderUserList />;

  if (isError) return "Error al solicitar los usuarios";

  return (
    <>
      <UserListFilter />

      <ul className={css.userList}>
        {users?.map((user, index) => (
          <UserItem {...user} key={user?._id || user?.email || index} />
        ))}
      </ul>
    </>
  );
}

export default memo(UserList);

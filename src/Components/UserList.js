import React, { memo } from "react";
import css from "styles/User.module.scss";
import UserItem from "components/UserItem";

function UserList() {
  return (
    <ul className={css.userList}>
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
    </ul>
  );
}

export default memo(UserList);

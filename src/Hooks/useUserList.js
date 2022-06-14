import { useState, useEffect, useCallback } from "react";
import { getAllUsers } from "helpers/api";
import { useQuery } from "react-query";

export default function useUserList() {
  const { data, ...args } = useQuery("users", getAllUsers);
  const [users, setUsers] = useState(data || []);

  useEffect(() => {
    if (!!data) setUsers(data);
  }, [data]);

  const addUser = useCallback((user) => {
    setUsers((users) => [user, ...users]);
  }, []);

  const editUser = useCallback((user) => {
    setUsers((users) => {
      return users.map((_user) => {
        if (_user._id === user._id) return user;
        return _user;
      });
    });
  }, []);

  const removeUser = useCallback((id) => {
    setUsers((users) => users.filter((_user) => _user._id !== id));
  }, []);

  return {
    users,
    addUser,
    editUser,
    removeUser,
    ...args,
  };
}

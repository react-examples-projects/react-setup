import { useState, useEffect, useCallback } from "react";
import { getAllUsers } from "helpers/api";
import { useQuery } from "react-query";
import { normalizeText } from "helpers/utils";

export default function useUserList() {
  const { data, ...args } = useQuery("users", getAllUsers);
  const [users, setUsers] = useState(data || []);
  const [usersFiltered, setUsersFiltered] = useState(data || []);

  useEffect(() => {
    if (!!data) setUsers(data);
  }, [data]);

  useEffect(() => {
    if (users.length) setUsersFiltered(users);
  }, [users]);

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

  const filterUsersByName = useCallback(
    (name) => {
      const normalizedName = normalizeText(name).toLowerCase();
      const filtered = users.filter((user) => {
        return user.name.toLowerCase().includes(normalizedName);
      });

      setUsersFiltered(filtered);
    },
    [users]
  );

  return { 
    users: usersFiltered,
    addUser,
    editUser,
    removeUser,
    filterUsersByName,
    ...args,
  };
}

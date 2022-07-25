import { useState, useEffect, useCallback } from "react";
import { getAllUsers } from "helpers/api";
import { useQuery } from "react-query";
import { normalizeText } from "helpers/utils";
import { USER_FILTERS } from "config/";

export default function useUserList() {
  const { data, ...args } = useQuery("users", getAllUsers);
  const [users, setUsers] = useState(data || []);
  const [usersFiltered, setUsersFiltered] = useState(data || []);

  const [isActiveFilter, setActiveFilter] = useState(null);

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
      if (!normalizedName) return setActiveFilter(null);

      const filtered = users.filter((user) => {
        return user.name.toLowerCase().includes(normalizedName);
      });

      setActiveFilter(USER_FILTERS.BY_NAME);
      setUsersFiltered(filtered);
    },
    [users]
  );

  const filterUsersByRank = useCallback(
    (rank) => {
      if (Array.isArray(rank) && !rank.length)
        return setUsersFiltered(users), setActiveFilter(null);

      const filtered = users.filter((user) => {
        if (Array.isArray(rank)) return rank.includes(user.rank);
        return user.rank === rank;
      });

      setActiveFilter(USER_FILTERS.BY_RANK);
      setUsersFiltered(filtered);
    },
    [users]
  );

  const removeAllUserFilters = useCallback(() => {
    setUsersFiltered(users), setActiveFilter(null);
  }, [users]);

  return {
    users: usersFiltered,
    addUser,
    editUser,
    removeUser,
    isActiveFilter,
    filterUsersByName,
    filterUsersByRank,
    removeAllUserFilters,
    ...args,
  };
}

import { useState, useEffect, useCallback } from "react";
import { getAllUsers } from "helpers/api";
import { useQuery } from "react-query";
import { normalizeText } from "helpers/utils";
import { USER_FILTERS } from "config/";

export default function useUserList() {
  const { data = [], ...args } = useQuery("users", getAllUsers);
  const [users, setUsers] = useState([]);
  const [usersFiltered, setUsersFiltered] = useState([]);
  const [isActiveFilter, setActiveFilter] = useState(null);
  /*
    Todas las asignaciones del estado que apunten a `users` deben ser
    clonadas para evitar una asignacion por referencia, asi solo copiamos el valor
    del arreglo de objetos
  */
  useEffect(() => {
    if (data.length) setUsers([...data]);
  }, [data]);

  useEffect(() => {
    if (users.length) setUsersFiltered([...users]);
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

  const removeAllUserFilters = useCallback(() => {
    setUsersFiltered([...users]), setActiveFilter(null);
  }, [users]);

  const filterUsersByName = useCallback(
    (name) => {
      const normalizedName = normalizeText(name).toLowerCase();
      if (!normalizedName) return removeAllUserFilters();

      const filtered = users.filter((user) => {
        return user.name.toLowerCase().includes(normalizedName);
      });

      setActiveFilter({
        type: USER_FILTERS.BY_NAME,
        data: name,
      });
      setUsersFiltered(filtered);
    },
    [users, removeAllUserFilters]
  );

  const filterUsersByRank = useCallback(
    (rank) => {
      if (Array.isArray(rank) && !rank.length) return removeAllUserFilters();
      const filtered = users.filter((user) => {
        if (Array.isArray(rank)) return rank.includes(user.rank);
        return user.rank === rank;
      });

      setActiveFilter({
        type: USER_FILTERS.BY_RANK,
        data: rank,
      });
      setUsersFiltered(filtered);
    },
    [users, removeAllUserFilters]
  );

  const filterUsersByDate = useCallback(() => {
    const filtered = usersFiltered.sort((userPrevius, userNext) => {
      return new Date(userNext.createdAt) - new Date(userPrevius.createdAt);
    });
    setActiveFilter({
      type: USER_FILTERS.BY_DATE,
      data: filtered,
    });
    setUsersFiltered(filtered);
  }, [usersFiltered]);

  const filterUserByStatus = useCallback(
    (status) => {
      const filtered = users.filter((user) => {
        if (status === "idle") return user.isIdle;
        return !user.isIdle;
      });
      setActiveFilter({
        type: USER_FILTERS.BY_STATUS,
        data: status,
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
    isActiveFilter,
    filterUsersByName,
    filterUsersByRank,
    filterUsersByDate,
    filterUserByStatus,
    removeAllUserFilters,
    ...args,
  };
}

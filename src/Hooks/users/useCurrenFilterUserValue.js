import useUsers from "hooks/users/useUsers";

export default function useCurrentFilterUsers(FILTER_NAME) {
  const { isActiveFilter, } = useUsers();
  const isActiveFilterUser = isActiveFilter?.type === FILTER_NAME;
  const defaultValueFilter = isActiveFilterUser ? isActiveFilter?.data : null;
  return defaultValueFilter
}

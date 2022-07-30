import useUsers from "hooks/users/useUsers";

export default function ActiveUsersFilterText() {
  const { users, isActiveFilter } = useUsers();
  if (!isActiveFilter) return null;

  return (
    <p className="text-muted">
      <small>
        Actualmente se encuentra activado un filtro ({users.length + " "}
        coincidencias)
      </small>
    </p>
  );
}

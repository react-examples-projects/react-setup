import { memo, useRef } from "react";
import css from "styles/User.module.scss";
import useUsers from "hooks/users/useUsers";
import UserItem from "components/UserItem";
import LoaderUserList from "components/Loaders/LoaderUserList";
import { Grid, Input, Select } from "@geist-ui/core";

function UserList() {
  const containerSelect = useRef(null);
  const { users, isLoading, isError, filterUsersByName } = useUsers();

  if (isLoading) return <LoaderUserList />;

  if (isError) return "Error al solicitar los usuarios";

  return (
    <>
      <Grid.Container gap={1}>
        <Grid xs={24} sm={10} md={10} lg={10} xl={10}>
          <Input
            htmlType="search"
            name="search"
            onChange={(e) => filterUsersByName(e.target.value)}
            id="search"
            placeholder="José Perez"
            width="100%"
          >
            Buscar usuarios
          </Input>
        </Grid>

        <Grid xs={24} sm={14} md={14} lg={14} xl={14}>
          <div className="w-100 position-relative" ref={containerSelect}>
            <label htmlFor="filter" className="label">
              Filtrar por:
            </label>
            <Select
              placeholder="Filtro"
              onChange={null}
              name="filter"
              id="filter"
              getPopupContainer={() => containerSelect.current}
              width="100%"
            >
              <Select.Option value="1">Rol</Select.Option>
              <Select.Option value="2">Estado</Select.Option>
              <Select.Option value="3">Fecha de ingreso</Select.Option>
            </Select>
          </div>
        </Grid>
      </Grid.Container>

      <ul className={css.userList}>
        {users?.map((user, index) => (
          <UserItem {...user} key={user?._id || user?.email || index} />
        ))}
      </ul>
    </>
  );
}

export default memo(UserList);

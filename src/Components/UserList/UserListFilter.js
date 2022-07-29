import useUsers from "hooks/users/useUsers";
import { Grid, Input, Select } from "@geist-ui/core";
import { useRef } from "react";
import useToggle from "hooks/utils/useToggle";
import ModalFilterUsersByRole from "modals/ModalFilterUsers/ModalFilterUsersByRole";
import ModalFilterUsersByRank from "modals/ModalFilterUsers/ModalFilterUsersByRank";

export default function UserListFilter() {
  const containerSelect = useRef(null);
  const [isOpenModalFilterRole, toggleOpenModalFilterRole] = useToggle();
  const [isOpenModalFilterRank, toggleOpenModalFilterRank] = useToggle();
  const {
    filterUsersByName,
    filterUsersByDate,
    removeAllUserFilters,
    users,
    isActiveFilter,
  } = useUsers();
  const ACTIONS_MODALS = {
    rol: toggleOpenModalFilterRole,
    rank: toggleOpenModalFilterRank,
    none: removeAllUserFilters,
    date: filterUsersByDate,
  };

  const onShowModalFilter = (v) => {
    if (v in ACTIONS_MODALS) ACTIONS_MODALS[v]();
  };

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
              name="filter"
              id="filter"
              getPopupContainer={() => containerSelect.current}
              onChange={onShowModalFilter}
              width="100%"
              initialValue="none"
            >
              <Select.Option value="rol">Rol</Select.Option>
              <Select.Option value="status">Estado</Select.Option>
              <Select.Option value="date">Más recientes</Select.Option>
              <Select.Option value="rank">Rango</Select.Option>
              <Select.Option value="none">Ninguno</Select.Option>
            </Select>
          </div>
        </Grid>
      </Grid.Container>
      {isActiveFilter && (
        <p className="text-muted">
          <small>
            Actualmente se encuentra activado un filtro ({users.length + " "}
            coincidencias)
          </small>
        </p>
      )}
      <ModalFilterUsersByRole
        isOpen={isOpenModalFilterRole}
        toggleOpen={toggleOpenModalFilterRole}
      />

      <ModalFilterUsersByRank
        isOpen={isOpenModalFilterRank}
        toggleOpen={toggleOpenModalFilterRank}
      />
    </>
  );
}

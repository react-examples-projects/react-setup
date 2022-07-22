import useUsers from "hooks/users/useUsers";
import { Grid, Input, Select } from "@geist-ui/core";
import { useRef } from "react";
import useToggle from "hooks/utils/useToggle";
import ModalFilterUsersByRole from "components/Modals/ModalFilterUsers/ModalFilterUsersByRole";

export default function UserListFilter() {
  const containerSelect = useRef(null);
  const [isOpen, toggleOpen] = useToggle();
  const { filterUsersByName } = useUsers();

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
              <Select.Option value="1" onClick={toggleOpen}>
                Rol
              </Select.Option>
              <Select.Option value="2">Estado</Select.Option>
              <Select.Option value="3">Fecha de ingreso</Select.Option>
              <Select.Option value="4">Rango</Select.Option>
            </Select>
          </div>
        </Grid>
      </Grid.Container>
      <ModalFilterUsersByRole {...{ isOpen, toggleOpen }} />
    </>
  );
}

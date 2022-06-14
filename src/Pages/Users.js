import React, { useRef } from "react";
import useToggle from "hooks/useToggle";
import UserList from "components/UserList";
import ModalCreateUser from "components/Modals/ModalCreateUser";
import { Text, Grid, Input, Select, Button } from "@geist-ui/core";

export default function Users() {
  const containerSelect = useRef(null);
  const [isOpenModalCreate, toggleOpenModalCreate] = useToggle();

  return (
    <>
      <Text h4>Usuarios Registrados</Text>
      <Text p>
        Se listan todo los usuarios registrado en la base de datos, para mejores
        resultados use los filtros de busquedas.
      </Text>

      <Button
        type="success"
        className="mb-3"
        scale={0.8}
        onClick={toggleOpenModalCreate}
      >
        Crear usuario
      </Button>

      <Grid.Container gap={1}>
        <Grid xs={24} sm={10} md={10} lg={10} xl={10}>
          <Input
            htmlType="search"
            name="search"
            id="search"
            placeholder="José Perez"
            width="100%"
          >
            Buscar usuarios
          </Input>
        </Grid>

        <Grid xs={24} sm={14} md={14} lg={14} xl={14}>
          <div className="w-100 position-relative" ref={containerSelect}>
            <label htmlFor="filter" className="label">Filtrar por:</label>
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

      <UserList />
      <ModalCreateUser {...{ isOpenModalCreate, toggleOpenModalCreate }} />
    </>
  );
}

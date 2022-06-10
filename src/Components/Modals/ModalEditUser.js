import React, { useRef } from "react";
import { Modal, Input, Select } from "@geist-ui/core";

export default function ModalEditUser({
  isOpenModalEdit,
  toggleOpenModalEdit,
}) {
  const containerUserRole = useRef(null);
  const onEditUser = (e) => {
    e.preventDefault();
  };

  return (
    <Modal visible={isOpenModalEdit} onClose={toggleOpenModalEdit}>
      <Modal.Title>Editar Usuario</Modal.Title>
      <Modal.Subtitle className="mt-3">
        Rellene los campos con los nuevos datos
      </Modal.Subtitle>
      <Modal.Content>
        <form onSubmit={onEditUser} id="edit-user">
          <Input id="username" name="username" width="100%" className="mb-2">
            Nombre
          </Input>

          <Input
            htmlType="email"
            id="email"
            name="email"
            width="100%"
            className="mb-2"
          >
            E-mail
          </Input>

          <div className="mb-2 position-relative" ref={containerUserRole}>
            <label className="label">Rol</label>
            <Select
              placeholder="Rol"
              onChange={null}
              name="role"
              id="role"
              getPopupContainer={() => containerUserRole.current}
              width="100%"
            >
              <Select.Option value="1">Administrador</Select.Option>
              <Select.Option value="2">Usuario</Select.Option>
            </Select>
          </div>
        </form>
      </Modal.Content>
      <Modal.Action passive onClick={toggleOpenModalEdit}>
        Cancelar
      </Modal.Action>
      <Modal.Action type="submit" form="edit-user">
        Editar
      </Modal.Action>
    </Modal>
  );
}

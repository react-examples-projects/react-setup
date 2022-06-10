import React from "react";
import { Modal, Input } from "@geist-ui/core";

export default function ModalDeleteUser({ isOpenModal, toggleOpenModal }) {
  const onDeleteUser = (e) => {
    e.preventDefault();
  };
  
  return (
    <Modal visible={isOpenModal} onClose={toggleOpenModal}>
      <Modal.Title>Confirmar eliminación</Modal.Title>
      <Modal.Subtitle className="mt-3">
        Para eliminar el usuario debe confirmar su contraseña
      </Modal.Subtitle>
      <Modal.Content>
        <form onSubmit={onDeleteUser} id="delete-user">
          <Input htmlType="password" id="password" name="password" width="100%">
            Contraseña
          </Input>
        </form>
      </Modal.Content>
      <Modal.Action passive onClick={toggleOpenModal}>
        Cancelar
      </Modal.Action>
      <Modal.Action type="submit" form="delete-user">
        Eliminar
      </Modal.Action>
    </Modal>
  );
}

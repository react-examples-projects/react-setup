import useUsers from "hooks/users/useUsers";
import { Modal, Select, Grid } from "@geist-ui/core";

export default function ModalFilterUsersByRole({ isOpen, toggleOpen }) {
  return (
    <Modal
      visible={isOpen}
      onClose={toggleOpen}
      width="600px"
    >
      <Modal.Title>Filtrar usuario por rol</Modal.Title>
      <Modal.Subtitle className="mt-3">
        Selecciona 
      </Modal.Subtitle>
      <Modal.Content></Modal.Content>
      <Modal.Action passive>Cancelar</Modal.Action>
      <Modal.Action htmlType="submit" form="edit-user">
        Crear
      </Modal.Action>
    </Modal>
  );
}

import useUsers from "hooks/users/useUsers";
import { useRef } from "react";
import { Modal, Select } from "@geist-ui/core";

export default function ModalFilterUsersByStatus({ isOpen, toggleOpen }) {
  const containerSelect = useRef(null);
  const { filterUserByStatus, isActiveFilter, users } = useUsers();
  const onChangeStatus = (status) => {
    filterUserByStatus(status);
  };
  return (
    <Modal
      visible={isOpen}
      onClose={toggleOpen}
      width="600px"
      wrapClassName="overflow-visible"
    >
      <Modal.Title>Filtrar usuario por estado</Modal.Title>
      <Modal.Subtitle className="mt-3">
        Selecciona el estado deseas aplicar para filtrar
      </Modal.Subtitle>
      <Modal.Content>
        <div className="w-100 mb-2 position-relative" ref={containerSelect}>
          <Select
            getPopupContainer={() => containerSelect.current}
            placeholder="Estado"
            width="100%"
          >
            <Select.Option value="active">Activo</Select.Option>
            <Select.Option value="idle">Deshabilitados</Select.Option>
          </Select>
        </div>
      </Modal.Content>
      <Modal.Action onClick={toggleOpen} passive>
        Cancelar
      </Modal.Action>
    </Modal>
  );
}

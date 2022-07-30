//import useUsers from "hooks/users/useUsers";
import { useRef } from "react";
import { Modal, Select } from "@geist-ui/core";

export default function ModalFilterUsersByRole({ isOpen, toggleOpen }) {
  const containerSelect = useRef(null);
  //const { users } = useUsers();

  return (
    <Modal
      visible={isOpen}
      onClose={toggleOpen}
      width="600px"
      wrapClassName="overflow-visible"
    >
      <Modal.Title>Filtrar usuario por rol</Modal.Title>
      <Modal.Subtitle className="mt-3">
        Selecciona los roles que deseas aplicar para filtrar
      </Modal.Subtitle>
      <Modal.Content>
        <div className="w-100 mb-2 position-relative" ref={containerSelect}>
          <Select
            getPopupContainer={() => containerSelect.current}
            placeholder="Frameworks"
            multiple
            initialValue={["1", "3"]}
            width="100%"
          >
            <Select.Option value="1">React</Select.Option>
            <Select.Option value="3">Vue</Select.Option>
          </Select>
        </div>
      </Modal.Content>
      <Modal.Action onClick={toggleOpen} passive>
        Cancelar
      </Modal.Action>
      <Modal.Action htmlType="submit" form="edit-user">
        Crear
      </Modal.Action>
    </Modal>
  );
}
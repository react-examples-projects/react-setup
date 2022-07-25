import useUsers from "hooks/users/useUsers";
import { useRef } from "react";
import { Modal, Select } from "@geist-ui/core";
import { USER_RANKS } from "config/";

export default function ModalFilterUsersByRank({ isOpen, toggleOpen }) {
  const { filterUsersByRank, isActiveFilter, users } = useUsers();
  const containerSelect = useRef(null);
  const ranks = Object.values(USER_RANKS);
  const onChangeRank = (ranks) => filterUsersByRank(ranks || []);

  return (
    <Modal
      visible={isOpen}
      onClose={toggleOpen}
      width="600px"
      wrapClassName="overflow-visible"
    >
      <Modal.Title>Filtrar usuario por rango</Modal.Title>
      <Modal.Subtitle className="mt-3">
        Selecciona los rangos que deseas aplicar para filtrar
      </Modal.Subtitle>
      <Modal.Content>
        <div className="w-100 mb-2 position-relative" ref={containerSelect}>
          <Select
            getPopupContainer={() => containerSelect.current}
            placeholder="Rangos"
            multiple
            onChange={onChangeRank}
            width="100%"
          >
            {ranks.map(({ label, name }) => (
              <Select.Option value={name} key={name}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </div>

        {isActiveFilter && (
          <p className="text-muted">
            <small>
              Se encontraron <strong>{users.length}</strong> coincidencias para
              los filtros
            </small>
          </p>
        )}
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

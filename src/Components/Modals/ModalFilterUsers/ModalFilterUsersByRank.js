import useUsers from "hooks/users/useUsers";
import useUserRanks from "hooks/users/useUserRanks";
import useCurrentFilterUserValue from "hooks/users/useCurrentFilterUserValue";
import ActiveUsersFilterText from "modals/ActiveUsersFilterText";
import { useRef } from "react";
import { Modal, Select } from "@geist-ui/core";
import { USER_FILTERS } from "config/";
 
export default function ModalFilterUsersByRank({ isOpen, toggleOpen }) {
  const { filterUsersByRank } = useUsers();
  const containerSelect = useRef(null);
  const ranks = useUserRanks();
  const defaultValueFilterRank = useCurrentFilterUserValue(USER_FILTERS.BY_RANK) || [];
  const onChangeRank = (ranks = []) => {
    filterUsersByRank(ranks);
  };    

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
            initialValue={defaultValueFilterRank}
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
        <ActiveUsersFilterText />
      </Modal.Content>
      <Modal.Action onClick={toggleOpen} passive>
        Cancelar
      </Modal.Action>
    </Modal>
  );
}

import ErrorText from "components/Text/ErrorText";
import useFormValidation from "hooks/useFormValidation";
import useToast from "hooks/useToast";
import useUsers from "hooks/useUsers";
import useDeleteUser from "hooks/useDeleteUser";
import deleteUserSchema from "helpers/schema/deleteUserSchema";
import { toFormDataObj, getErrorValidation } from "helpers/utils";
import { Modal, Input } from "@geist-ui/core";

export default function ModalDeleteUser({
  isOpenModal,
  toggleOpenModal,
  _id,
}) {
  const { error, success } = useToast();
  const { removeUser } = useUsers();
  const { isError, isLoading, ...deleteUseMutation } = useDeleteUser();
  const { errors, handleSubmit, register } =
    useFormValidation(deleteUserSchema);

  const onSubmit = async (e) => {
    const data = toFormDataObj({...e, _id});
    try {
      const user = await deleteUseMutation.mutateAsync(data);
      console.log(user);
      removeUser(_id);
      success("El usuario se eliminó correctamente");
      toggleOpenModal();
    } catch {
      error("Ocurrió un error al eliminar el usuario");
    }
  };

  return (
    <Modal
      visible={isOpenModal}
      onClose={toggleOpenModal}
      disableBackdropClick={isLoading}
    >
      <Modal.Title>Confirmar eliminación</Modal.Title>
      <Modal.Subtitle className="mt-3">
        Para eliminar el usuario debe confirmar su contraseña
      </Modal.Subtitle>
      <Modal.Content>
        <form onSubmit={handleSubmit(onSubmit)} id="delete-user">
          <Input.Password
            {...register("password")}
            id="password"
            name="password"
            width="100%"
          >
            Contraseña
          </Input.Password>
          <ErrorText
            className="mt-2"
            text={errors.password?.message}
            isVisible={!!errors.password?.message}
          />
        </form>

        <ErrorText
          isVisible={isError}
          text={getErrorValidation(deleteUseMutation)}
        />
      </Modal.Content>
      <Modal.Action passive onClick={toggleOpenModal}>
        Cancelar
      </Modal.Action>
      <Modal.Action htmlType="submit" form="delete-user">
        Eliminar
      </Modal.Action>
    </Modal>
  );
}

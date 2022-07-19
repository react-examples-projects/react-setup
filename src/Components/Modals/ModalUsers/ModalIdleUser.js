import ErrorText from "components/Text/ErrorText";
import useFormValidation from "hooks/validations/useFormValidation";
import useToast from "hooks/utils/useToast";
import useUsers from "hooks/users/useUsers";
import useToggleUserIdle from "hooks/users/crud/useToggleUserIdle";
import toggleIdleUserSchema from "helpers/schema/toggleIdleUserSchema";
import { toFormDataObj, getErrorValidation } from "helpers/utils";
import { Modal, Input } from "@geist-ui/core";

export default function ModalIdleUser({
  isOpenModalIdle,
  toggleOpenModalIdle,
  _id,
}) {
  const { error, success } = useToast();
  const { editUser } = useUsers();
  const { isError, isLoading, ...idleUserMutation } = useToggleUserIdle();
  const { errors, handleSubmit, register } =
    useFormValidation(toggleIdleUserSchema);

  const onSubmit = async (e) => {
    const data = toFormDataObj({ ...e, _id });
    try {
      const user = await idleUserMutation.mutateAsync(data);
      if (user.isIdle) {
        success("El usuario se desactivo correctamente");
      } else {
        success("El usuario se reactivo correctamente");
      }
      console.log(user);
      editUser(user);

      toggleOpenModalIdle();
    } catch {
      error("Ocurrió un error al cambiar el estado del usuario");
    }
  };

  return (
    <Modal
      visible={isOpenModalIdle}
      onClose={toggleOpenModalIdle}
      disableBackdropClick={isLoading}
    >
      <Modal.Title>Cambiar estado del usuario</Modal.Title>
      <Modal.Subtitle className="mt-3">
        Para cambiar el estado del usuario debe confirmar su contraseña
      </Modal.Subtitle>
      <Modal.Content>
        <form onSubmit={handleSubmit(onSubmit)} id="idle-user">
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
          text={getErrorValidation(idleUserMutation)}
        />
      </Modal.Content>
      <Modal.Action passive onClick={toggleOpenModalIdle}>
        Cancelar
      </Modal.Action>
      <Modal.Action htmlType="submit" form="idle-user">
        Eliminar
      </Modal.Action>
    </Modal>
  );
}

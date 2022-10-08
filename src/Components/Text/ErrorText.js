import { BiErrorCircle } from "react-icons/bi";
import { getErrorValidation } from "helpers/utils";
import { Text } from "@geist-ui/core";
import { memo } from "react";
import cls from "classnames";

function ErrorText({
  isVisible,
  text = "Ocurrió un error.",
  className,
  ...props
}) {
  const innerText = typeof text === "string" ? text : getErrorValidation(text);
  return isVisible ? (
    <div
      {...props}
      className={cls("d-flex align-items-center mb-1", className)}
    >
      <BiErrorCircle style={{ fill: "#ff005c" }} />
      <Text
        className="my-0"
        style={{ color: "#ff005c", marginLeft: "5px", marginTop: "-3px" }}
        small
      >
        {innerText}
      </Text>
    </div>
  ) : null;
}

export default memo(ErrorText);

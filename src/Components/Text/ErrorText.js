import { BiErrorCircle } from "react-icons/bi";
import { getErrorValidation } from "helpers/utils";
import { Text } from "@geist-ui/core";

export default function ErrorText({
  isVisible,
  text = "Ocurrió un error.",
  ...props
}) {
  const innerText = typeof text === "string" ? text : getErrorValidation(text);
  return isVisible ? (
    <div {...props} className="d-flex align-items-center mb-1">
      <BiErrorCircle style={{ fill: "#ff005c" }} />
      <Text
        className="my-0"
        style={{ color: "#ff005c", marginLeft: "5px" }}
        small
      >
        {innerText}
      </Text>
    </div>
  ) : null;
}

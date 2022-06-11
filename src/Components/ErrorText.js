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
    <div
      {...props}
      style={{ display: "flex", alignContent: "center", marginBottom: "1rem" }}
    >
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

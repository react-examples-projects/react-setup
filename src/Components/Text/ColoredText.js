import { Text } from "@geist-ui/core";
import cls from "classnames";

export default function ColoredText({ text, children, className, ...props }) {
  return (
    <Text className={cls("text-colored", className)} {...props}>
      {(text, children)}
    </Text>
  );
}

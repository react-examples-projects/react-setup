import { useToasts } from "@geist-ui/core";

export default function useToast({ delay = 2000 } = {}) {
  const { setToast } = useToasts();

  const toast = (text, type) => setToast({ text, delay, type });
  const error = (text) => toast(text, "error");
  const success = (text) => toast(text, "success");
  const warn = (text) => toast(text, "warning");

  return {
    error,
    success,
    warn,
    toast,
  };
}

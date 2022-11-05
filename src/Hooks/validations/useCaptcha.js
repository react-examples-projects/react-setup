import { useState, useRef } from "react";

export default function useCaptcha() {
  const captchaRef = useRef(null);
  const [isValidCaptcha, setIsValidCaptcha] = useState(false);
  function onChange() {
    if (captchaRef.current.getValue()) return setIsValidCaptcha(true);
    setIsValidCaptcha(false);
  }

  function onExpired() {
    setIsValidCaptcha(false);
  }

  function reset() {
    captchaRef.current.reset();
    setIsValidCaptcha(false);
  }
  return {
    isValidCaptcha,
    reset,
    onChange,
    onExpired,
    onErrored: onExpired,
    ref: captchaRef,
  };
}

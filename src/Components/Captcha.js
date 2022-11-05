import { forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Captcha = (props, ref) => {
  return (
    <ReCAPTCHA
      ref={ref}
      sitekey="6Le_BFAUAAAAAIuL8CTLqHOsLC8bto8XS-l3MuTf"
      {...props}
    />
  );
};

export default forwardRef(Captcha);

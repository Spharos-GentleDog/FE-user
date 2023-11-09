import React from "react";
import Logo from "@/shared/Logo/Logo";
import SignupForm from "@/components/SignupForm";


const PageSignUp = () => {
  return (
    <div className={`nc-PageSignUp `} data-nc-id="PageSignUp">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          <Logo isLogoName className="h-40" />
        </h2>
        <SignupForm />
      </div>
    </div>
  );
};

export default PageSignUp;

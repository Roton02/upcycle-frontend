import React, { Suspense } from "react";
import RegisterForm from "@/components/modules/auth/register/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Suspense fallback={<div>Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
};

export default RegisterPage;

import React from 'react';
import RegisterForm from "@/app/register/register-form";
import LoginForm from "@/app/login/login-form";

function Page() {
    return (
        <div>
            <h1 className="text-xl font-semibold text-center">Login page</h1>
            <div className={"flex justify-center"}>
                <LoginForm />
            </div>
        </div>
    );
}

export default Page;
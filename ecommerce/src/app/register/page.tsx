import RegisterForm from "@/app/register/register-form";

function RegisterPage() {
    // 1. Define your form.
    return (
        <>
            <h1 className="text-xl font-semibold text-center">Register page</h1>
            <div className={"flex justify-center"}>
                <RegisterForm />
            </div>
        </>
    );
}

export default RegisterPage;
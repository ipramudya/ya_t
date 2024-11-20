import { AppContainer, Header, RegisterForm } from "@/components";
import Link from "next/link";

export default function Page() {
    return (
        <AppContainer inputPage>
            <Header />
            <div className="mt-10 flex flex-col">
                <h2 className="mb-6 ml-4 text-2xl font-semibold">Register</h2>
                <RegisterForm />
            </div>
            <p className="mt-14 text-center text-sm text-golden">
                Have an account?{" "}
                <Link href="register" className="golden-text">
                    Login here
                </Link>
            </p>
        </AppContainer>
    );
}

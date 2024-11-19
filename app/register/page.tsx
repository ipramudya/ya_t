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
            <p className="text-golden mt-14 text-center text-sm">
                Have an account?{" "}
                <Link
                    href="register"
                    className="bg-gradient-to-t from-orange-100 to-orange-300 bg-clip-text text-transparent"
                >
                    Login here
                </Link>
            </p>
        </AppContainer>
    );
}

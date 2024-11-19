import { InputField } from "./InputField";
import { MainButton } from "./MainButton";

export function LoginForm() {
    return (
        <form className="flex flex-col">
            <InputField placeholder="Enter Username/Email" className="mb-3" />
            <div className="mb-6">
                <InputField placeholder="Enter Password" type="password" />
            </div>
            <MainButton>Login</MainButton>
        </form>
    );
}

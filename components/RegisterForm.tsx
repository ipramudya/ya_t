import { InputField } from "./InputField";
import { MainButton } from "./MainButton";

export function RegisterForm() {
    return (
        <form className="flex flex-col">
            <InputField placeholder="Enter Email" className="mb-3" />
            <InputField placeholder="Create Username" className="mb-3" />
            <div className="mb-3">
                <InputField placeholder="Create Password" type="password" />
            </div>
            <div className="mb-6">
                <InputField placeholder="Confirm Password" type="password" />
            </div>
            <MainButton>Register</MainButton>
        </form>
    );
}

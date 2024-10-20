import LoginForm from "./LogInForm";
import SignUpForm from "./SignUpForm";

import { useProjectStore } from "@/store";

function Authentication() {
    const { isSignUp, setIsSignUp } = useProjectStore();

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <div>
            {isSignUp ? (
                <LoginForm changeAuthneticationMode={toggleForm} />
            ) : (
                <SignUpForm changeAuthneticationMode={toggleForm} />
            )}
        </div>
    );
}

export default Authentication;

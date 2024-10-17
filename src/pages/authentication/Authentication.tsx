import { useState } from 'react';
import LoginForm from './LogInForm';
import SignUpForm from './SignUpForm';

function Authentication() {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleForm = () => {
        setIsSignUp((prev) => !prev);
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

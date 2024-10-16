import { LockIcon } from '@/assets/icons/LockIcon';
import { MailIcon } from '@/assets/icons/MailIcon';
import { useProjectStore } from '@/store';
import { Button } from '@nextui-org/button';
import { Input, Link } from '@nextui-org/react';
import axios from 'axios';

interface SignUpFormProps {
    changeAuthneticationMode: () => void;
}

function SignUpForm(props: SignUpFormProps) {
    const { changeAuthneticationMode } = props;

    const {
        email,
        username,
        password,
        setEmail,
        setUsername,
        setPassword,
        setLoading,
        setLoggedIn,
        setToken
    } = useProjectStore();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            await axios.post(`http://api.calmplete.net/api/InternalLogin/sign-up`, {
                email,
                password
            });
            const loginResponse = await axios.post(`http://api.calmplete.net/api/InternalLogin`, {
                username,
                password,
                state: "Internal"
            });

            const accessToken = loginResponse.data.access_token;
            setToken(accessToken);
            setLoggedIn(true);
        } catch (error) {
            console.error("Error during sign up or login:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <Input
                    endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    type="email"
                    className="mb-5"
                    label="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    endContent={
                        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    type="text"
                    className="mb-5"
                    label="Username"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    className="mb-5"
                    label="Password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="d-flex justify-between mb-5">
                    <Button type="submit" color="secondary">Sign Up</Button>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-small" > Already have an account?</span>
                    <Link className="text-small" onClick={changeAuthneticationMode}>Log in</Link>
                </div>
            </form>
        </>
    );
}

export default SignUpForm;
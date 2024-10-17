
import { LockIcon, UserIcon } from "@/assets/icons";
import { useProjectStore } from "@/store";
import { Login } from "@/utils/apiService";
import { Input } from "@nextui-org/input";
import { Button, Link } from '@nextui-org/react';
import { useEffect } from "react";

interface LoginFormProps {
    changeAuthneticationMode: () => void;
}

function LoginForm(props: LoginFormProps) {
    const { changeAuthneticationMode } = props;

    const {
        username,
        password,
        error,
        setError,
        setUsername,
        setPassword,
        setLoading,
        setLoggedIn,
        setToken
    } = useProjectStore();

    useEffect(() => {
        setError('');
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const accessToken = await Login(username, password);
            setToken(accessToken)
            setLoggedIn(true);
        } catch (error: any) {
            console.error("Error during login:", error);
            setError(error.response.data)
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <Input
                    endContent={
                        <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    type="text"
                    className="mb-5"
                    label="Username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <Input
                    endContent={
                        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    type="password"
                    className="mb-5"
                    label="Password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error &&
                    <span className='text-danger tex-small mb-5'>
                        Error: {error}
                    </span>
                }
                <div className="flex justify-center mb-5">
                    <Button type="submit" color="secondary">Log In</Button>
                </div>
                <div className="flex items-center">
                    <span className="text-small">Don't have an account?</span>
                    <Link className="text-small ml-1" onClick={changeAuthneticationMode}>Sign up</Link></div>
            </form>
        </>
    );
}

export default LoginForm;

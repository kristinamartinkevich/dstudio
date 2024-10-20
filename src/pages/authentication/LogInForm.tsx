
import { Input } from "@nextui-org/input";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Link } from '@nextui-org/react';
import { useEffect } from "react";

import { LockIcon, UserIcon } from "@/assets/icons";
import { useProjectStore } from "@/store";
import { Login } from "@/utils/apiService";

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
        setIsSignUp,
        setUsername,
        setPassword,
        setLoading,
        setLoggedIn,
        setToken
    } = useProjectStore();

    useEffect(() => {
        setError('');
        setUsername('');
        setPassword('');
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
            setError(error.response.data);
        } finally {
            setLoading(false);
            setIsSignUp(false)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card className="max-w-sm mx-auto">
                <CardHeader className="flex font-medium text-xl justify-center">
                    Log in
                </CardHeader>
                <CardBody>
                    <Input
                        required
                        className="mb-5"
                        endContent={
                            <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Username"
                        placeholder="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        required
                        className="mb-5"
                        endContent={
                            <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Password"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error &&
                        <span className='text-danger tex-small mb-5'>
                            Error: {error}
                        </span>
                    }
                    <div className="flex justify-center">
                        <Button color="secondary" type="submit">Log In</Button>
                    </div>
                </CardBody>
                <CardFooter className="flex items-center justify-center">
                    <span className="text-small">Don't have an account?</span>
                    <Link className="text-small ml-1" onClick={changeAuthneticationMode}>Sign up</Link>
                </CardFooter>
            </Card>
        </form >
    );
}

export default LoginForm;

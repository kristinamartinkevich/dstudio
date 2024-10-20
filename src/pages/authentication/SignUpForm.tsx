
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader, Input, Link } from '@nextui-org/react';
import { useEffect } from 'react';

import { LockIcon, MailIcon, UserIcon } from '@/assets/icons';
import { useProjectStore } from '@/store';
import { Login, Signup } from '@/utils/apiService';

interface SignUpFormProps {
    changeAuthneticationMode: () => void;
}

function SignUpForm(props: SignUpFormProps) {
    const { changeAuthneticationMode } = props;

    const {
        email,
        username,
        password,
        error,
        setEmail,
        setError,
        setUsername,
        setPassword,
        setLoading,
        setLoggedIn,
        setToken
    } = useProjectStore();

    useEffect(() => {
        setError('');
        setEmail('');
        setUsername('');
        setPassword('');
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await Signup(email, password);
            setLoading(true);
            const accessToken = await Login(username, password);

            setToken(accessToken);
            setLoggedIn(true);
        } catch (error: any) {
            console.error("Error during sign up or login:", error);
            setError(error.response.data)
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card className="max-w-sm mx-auto">
                <CardHeader className="flex font-medium text-xl justify-center">
                    Sign Up
                </CardHeader>
                <CardBody>
                    <Input
                        required
                        className="mb-5"
                        endContent={
                            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        required
                        className="mb-5"
                        endContent={
                            <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Username"
                        placeholder="Choose a username"
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
                        <Button color="secondary" type="submit">Sign Up</Button>
                    </div>
                </CardBody>
                <CardFooter className="flex items-center justify-center">
                    <span className="text-small">Already have an account?</span>
                    <Link className="text-small ml-1" onClick={changeAuthneticationMode}>Log in</Link>
                </CardFooter>
            </Card>
        </form>
    );
}

export default SignUpForm;
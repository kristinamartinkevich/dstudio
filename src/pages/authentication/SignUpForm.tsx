
import { LockIcon, MailIcon, UserIcon } from '@/assets/icons';
import { useProjectStore } from '@/store';
import { Login, Signup } from '@/utils/apiService';
import { Button } from '@nextui-org/button';
import { Input, Link } from '@nextui-org/react';
import { useEffect } from 'react';

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
                        <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
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
                    <Button type="submit" color="secondary">Sign Up</Button>
                </div>
                <div className="flex items-center">
                    <span className="text-small">Already have an account?</span>
                    <Link className="text-small ml-1" onClick={changeAuthneticationMode}>Log in</Link>
                </div>
            </form>
        </>
    );
}

export default SignUpForm;
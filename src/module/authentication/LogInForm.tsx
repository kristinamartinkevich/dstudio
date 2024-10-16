import { useProjectStore } from "@/store";
import { Input } from "@nextui-org/input";
import { Button, Checkbox, Link } from '@nextui-org/react';
import axios from "axios";

interface LoginFormProps {
    changeAuthneticationMode: () => void;
}

function LoginForm(props: LoginFormProps) {
    const { changeAuthneticationMode } = props;

    const {
        username,
        password,
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
            const loginResponse = await axios.post(`http://api.calmplete.net/api/InternalLogin`, {
                username,
                password,
                state: "Internal"
            });

            const accessToken = loginResponse.data.accessToken;
            setToken(accessToken);
            setLoggedIn(true);

        } catch (error) {
            console.error("Error during login:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <Input
                    type="text"
                    className="mb-5"
                    label="Username"
                    placeholder="Username"
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
                <div className="flex py-2 px-1 justify-between">
                    <Checkbox
                        classNames={{
                            label: "text-small",
                        }}
                    >
                        Remember me
                    </Checkbox>
                    <Link color="primary" href="#" size="sm">
                        Forgot password?
                    </Link>
                </div>
                <div className="d-flex justify-between mb-5">
                    <Button type="submit" color="secondary">Log In</Button>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-small" >Don't have an account? </span><Link className="text-small" onClick={changeAuthneticationMode}>Sign up</Link>
                </div>
            </form>
        </>
    );
}

export default LoginForm;

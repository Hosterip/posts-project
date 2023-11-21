import {FC} from "react";

interface IAuthForm {
    username: string
    password: string
    setUsername: (value: string) => void
    setPassword: (value: string) => void
}

const AuthForm: FC<IAuthForm> = ({username, password, setUsername, setPassword}) => {
    return (
        <form className='flex flex-col gap-3 my-4'>
            <input
                className='rounded border-2 border-amber-50 bg-transparent py-0.5 px-1'
                type="text"
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                className='rounded border-2 border-amber-50 bg-transparent py-0.5 px-1'
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </form>
    );
};

export default AuthForm;
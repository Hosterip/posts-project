import {FC} from "react";
import {firstLetterCapital} from "../../share/helpers/firstLetterCapital.ts";
import AuthForm from "./AuthForm.tsx";
import useAuth from "../../hooks/useAuth.tsx";
import AlreadyHave from "./AlreadyHave.tsx";
import LoadingAndError from "../../components/LoadingAndError.tsx";

interface IAuth {
    typeOfAuth: 'register' | 'login'
}

const Auth: FC<IAuth> = ({typeOfAuth}) => {
    const {
        username,
        password,
        error,
        setUsername,
        setPassword,
        handleAuth
    } = useAuth(typeOfAuth)

    return (
        <div className='text-2xl flex flex-col items-center justify-center w-full h-full '>
            <div className=' px-6 pt-6 pb-10 rounded border-2 border-amber-50 bg-red-950 text-zinc-100 w-fit m-auto'>
                <h1 className='text-3xl '>{firstLetterCapital(typeOfAuth)} page</h1>
                <div className='mx-3'>
                    <AuthForm
                        username={username} password={password}
                        setUsername={setUsername} setPassword={setPassword}
                    />
                    <LoadingAndError error={error.isError} errorMsg={error.errorMsg} loading={false}/>
                    <button
                        className='w-fit bg-zinc-50 text-slate-800 rounded py-0.5 px-3 my-1'
                        onClick={handleAuth}
                    >
                        {firstLetterCapital(typeOfAuth)}
                    </button>
                </div>
                <AlreadyHave type={typeOfAuth}/>
            </div>
        </div>
    );
};

export default Auth;
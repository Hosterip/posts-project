import {FormEvent, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useUserStore} from "../zustand/useUser.ts";
import {fetchAuth} from "../API/auth/fetchAuth.ts";

const useAuth = (type: 'login' | 'register') => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState({
        isError: false,
        errorMsg: ''
    })
    const navigate = useNavigate()

    // Getting user from global state
    const {user, setUser} = useUserStore()

    const resetStates = () => {
        setUsername('')
        setPassword('')
        setError({...error, isError: false})
    }

    const errorHandle = (status: number) => {
        if (status === 401 || status === 400) {
            type === 'register'
                ? setError({errorMsg: 'Username is taken, please try other one', isError: true})
                : setError({errorMsg: 'Username or password is incorrect', isError: true})
        } else {
            setError({errorMsg: 'Something went wrong, we are sorry', isError: true})
        }
    }
    const handleAuth = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()

        // Validation
        if (!(username.trim() && username.trim())) {
            setError({errorMsg: 'Please input proper username and password', isError: true})
            return
        }
        // Creation of body for post request
        const bodyObject = {
            username: username,
            password: password
        }

        // POST request to sign in user in or register user
        await fetchAuth(bodyObject, type)
            .then(res => {
                if (res.status === 400 || res.status === 401) {
                    errorHandle(res.status)
                    return res
                }
                resetStates()
                return res.json()
            })
            .then(res => {
                if (res.username && res.id) {
                    setUser(res)
                }
            })
            .catch(e => {
                console.error(e)
                console.log(e)
                errorHandle(500)
            })
    }

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user]);

    return {
        username,
        password,
        error,
        setUsername,
        setPassword,
        handleAuth,
    };
};

export default useAuth;
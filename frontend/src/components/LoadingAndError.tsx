import {FC} from "react";

interface ILoadingAndErrorProps {
    error: boolean
    errorMsg?: string
    loading: boolean
}

const LoadingAndError: FC<ILoadingAndErrorProps> = ({error, errorMsg = 'Something went wrong', loading}) => {
    return (
        <>
            {error && <h1 className='text-xl text-red-500'>{errorMsg}</h1>}
            {loading && <h1 className='text-2xl text-blue-400'>Loading...</h1>}
        </>
    );
};

export default LoadingAndError;
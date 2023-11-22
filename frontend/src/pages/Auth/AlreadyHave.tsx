import {Link} from "react-router-dom";
import {FC} from "react";

interface IAlreadyHave {
    type: 'register' | 'login'
}

const AlreadyHave: FC<IAlreadyHave> = ({type}) => {

    const opposite = () => type === 'register' ? 'Login' : 'Register'

    return (
        <p className='mt-4'>{type === 'register' ? 'Already have an account? ' : 'Wanna create an account? '}
            <Link
                className='text-blue-300'
                to={`/${opposite()}`}
            >
                {opposite()} page
            </Link>
        </p>
    );
};

export default AlreadyHave;
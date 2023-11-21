import {FC} from 'react';

interface INewPostInputProps {
    label: string
    value: string
    setValue: (value: string) => void
}

const NewPostInput:FC<INewPostInputProps> = ({label, value, setValue}) => {
    return (
        <label className='text-xl text-slate-900 flex justify-between w-full' >
            {label}: <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className='rounded p-1 text-slate-700'
            type="text"/>
        </label>
    );
};

export default NewPostInput;
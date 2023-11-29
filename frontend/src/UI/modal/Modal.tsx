import styles from './modal.module.css'
import {FC, FormEvent, ReactNode} from "react";

interface IModalProps {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void
    confirmCallback: () => void
    children: ReactNode
}

const Modal:FC<IModalProps> = ({isOpen, setIsOpen, confirmCallback, children}) => {
    const confirmHandler = (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
        e.preventDefault()
        confirmCallback()
    }
    return (
        <>
            <div onClick={() => setIsOpen(false)} className={`${styles.overlay} ${!isOpen && styles.closed}`}/>
            <div className={`${styles.modal} ${!isOpen && styles.closed}`}>
                <div className='bg-emerald-500 border-slate-800 border-2 rounded m-4 p-3'>
                    {children}
                </div>
                <div className='m-3'>
                    <button onClick={confirmHandler} className='text-xl bg-green-500 rounded p-1 mx-3'>Confirm</button>
                    <button onClick={() => setIsOpen(false)} className='text-xl bg-red-600 rounded p-1 mx-3'>Cancel</button>
                </div>
            </div>
        </>

    );
};

export default Modal;
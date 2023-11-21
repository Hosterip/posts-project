import Modal from "../../UI/modal/Modal.tsx";
import {useState} from "react";
import {fetchCreatePost} from "../../API/posts/fetchCreatePost.ts";
import LoadingAndError from "../LoadingAndError.tsx";
import NewPostInput from "./NewPostInput.tsx";

const NewPost = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [error, setError] = useState(false)

    const resetStates = () => {
        setIsOpen(false)
        setTitle('')
        setBody('')
    }

    const confirmCallback = async () => {
        if(!(title.trim() && body.trim())) { return }
        const bodyForFetch = {
            title,
            body
        }
        fetchCreatePost(bodyForFetch)
            .then(() => {
                resetStates()
            })
            .catch((e) => {
                console.error(e)
                setError(true)
            })
    }

    console.log(title, body)
    return (
        <>
            <button
                className='bg-blue-500 rounded p-2'
                onClick={() => setIsOpen(true)}
            >
                Create a new post
            </button>
            <Modal setIsOpen={setIsOpen} isOpen={isOpen} confirmCallback={confirmCallback}>
                <form className='flex flex-col gap-3 py-3'>
                    <NewPostInput value={title} setValue={setTitle} label={'Title'} />
                    <NewPostInput value={body} setValue={setBody} label={'Body'} />
                    <LoadingAndError error={error} errorMsg={'Something went wrong'} loading={false}/>
                </form>
            </Modal>
        </>
    );
};

export default NewPost;
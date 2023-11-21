import Modal from "../../UI/modal/Modal.tsx";
import {useState} from "react";
import {fetchCreatePost} from "../../API/posts/fetchCreatePost.ts";

const NewPost = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const resetStates = () => {
        setIsOpen(false)
        setTitle('')
        setBody('')
        console.log('RESETED')
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
                resetStates()
            })
    }

    console.log(title, body)
    return (
        <>
            <button onClick={() => setIsOpen(true)}>Create a new post</button>
            <Modal setIsOpen={setIsOpen} isOpen={isOpen} confirmCallback={confirmCallback}>
                <form className='flex flex-col gap-3 py-3'>
                    <label className='text-xl text-slate-900 flex justify-between w-full'>
                        Title: <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='rounded p-1  text-slate-700'
                        type="text"
                    />
                    </label>
                    <label className='text-xl text-slate-900 flex justify-between w-full' >
                        Body: <input
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className='rounded p-1 text-slate-700'
                        type="text"/>
                    </label>
                </form>
            </Modal>
        </>
    );
};

export default NewPost;
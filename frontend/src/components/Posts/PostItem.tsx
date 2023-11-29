import {FC} from 'react';
import {IPost} from "../../share/interfaces/IPost.ts";

interface IPostProps {
    post: IPost
}

const PostItem: FC<IPostProps> = ({post}) => {
    return (
        <div className='bg-slate-200 rounded m-3 p-3'>
            <p className='text-blue-900 text-3xl'>{post.title}</p>
            <p className='text-blue-600 text-xl'>{post.body}</p>
        </div>
    );
};


export default PostItem;
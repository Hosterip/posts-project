import {FC} from 'react';
import PostItem from "./PostItem.tsx";
import {IPost} from "../../share/interfaces/IPost.ts";

interface IPostListProps {
    posts: IPost[]
    lastElementRef: ((review: HTMLDivElement) => void ) | null
}

const PostList: FC<IPostListProps> = ({posts, lastElementRef}) => {
    return (
        <>
            {posts.length
                ?
                <>
                    {posts.map(post => (
                        <div ref={lastElementRef} key={post.id}>
                            <PostItem post={post}/>
                        </div>
                    ))}
                </>
                :
                <div className='text-3xl text-zinc-300'>No posts yet</div>
            }

        </>
    );
};

export default PostList;
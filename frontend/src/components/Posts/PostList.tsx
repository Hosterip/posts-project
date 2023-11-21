import {FC} from 'react';
import PostItem from "./PostItem.tsx";
import {IPost} from "../../share/interfaces/IPost.ts";

interface IPostListProps {
    posts: IPost[]
    lastElementRef: (review: HTMLDivElement) => void
}

const PostList: FC<IPostListProps> = ({posts, lastElementRef}) => {
    return (
        <>
            {posts.map(post => (
                <div ref={lastElementRef} key={post.id}>
                    <PostItem post={post}/>
                </div>
            ))}
        </>
    );
};

export default PostList;
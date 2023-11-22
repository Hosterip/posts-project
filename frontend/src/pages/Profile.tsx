import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchUserById} from "../API/user/fetchUserById.ts";
import {IUserWithPosts} from "../share/interfaces/User.ts";
import PostList from "../components/Posts/PostList.tsx";
import {useUserStore} from "../zustand/useUser.ts";
import NewPost from "../components/NewPost/NewPost.tsx";
import LoadingAndError from "../components/LoadingAndError.tsx";

const Profile = () => {
    const {id} = useParams()
    const [userById,setUserById] = useState<IUserWithPosts | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const {user} = useUserStore()

    useEffect(() => {
        if(id && typeof +id === 'number' ) {
            fetchUserById(id)
                .then(data => {
                    setUserById(data)
                })
                .catch((e) => {
                    console.error(e)
                    setError(true)
                })
                .finally(() => setLoading(false))
        }
    }, [id]);
    return (
        <div className='m-5'>
            {userById ?
                <div>
                    <div className='flex justify-between'>
                        <h1 className='text-4xl text-teal-50'>{userById.username}</h1>
                        {user?.id === userById.id && <NewPost/>}
                    </div>
                    <PostList posts={userById.posts} lastElementRef={null} />
                </div>
                : null
            }
            <LoadingAndError error={error} loading={loading} />
        </div>
    );
};

export default Profile;
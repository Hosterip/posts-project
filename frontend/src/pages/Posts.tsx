import {useUserStore} from "../zustand/useUser.ts";
import PostList from "../components/Posts/PostList.tsx";
import SearchForm from "../components/SearchForm.tsx";
import LoadingAndError from "../components/LoadingAndError.tsx";
import NewPost from "../components/NewPost/NewPost.tsx";
import usePosts from "../hooks/usePosts.tsx";

const Posts = () => {
    const {user} = useUserStore()
    const {
        search,
        setSearch,
        handleSearch,
        isLoading,
        posts,
        error,
        lastElementRef
    } = usePosts()

    return (
        <div className='m-5'>
            {user ?
                <div className='flex justify-between'>
                    <h1 className='text-zinc-100 text-2xl font-bold'>Hello {user.username}!</h1>
                    <NewPost/>
                </div>
                : null
            }
            <SearchForm search={search} setSearch={setSearch} handleRequest={handleSearch}/>
            <LoadingAndError error={error} loading={isLoading} />
            <div>
                {posts.length
                    ?
                    <PostList posts={posts} lastElementRef={lastElementRef}/>
                    :
                    <>
                        {!isLoading && ! error && <h1 className='text-blue-300 text-3xl'>Posts were not found</h1>}
                    </>
                }
            </div>
        </div>
    );
};

export default Posts;
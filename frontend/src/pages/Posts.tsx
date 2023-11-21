import {useUserStore} from "../zustand/useUser.ts";
import {FormEvent, useEffect, useState} from "react";
import {fetchPosts} from "../API/posts/fetchPosts.ts";
import useInfinityScroll from "../hooks/useInfinityScroll.tsx"
import PostList from "../components/Posts/PostList.tsx";
import {IPost} from "../share/interfaces/IPost.ts";
import PostsForm from "../components/Posts/PostsForm.tsx";

const Posts = () => {
    const {user} = useUserStore()
    const [posts, setPosts] = useState<IPost[] | []>([])
    const [query, setQuery] = useState<string>('')
    const [search, setSearch] = useState<string>('')
    const {page, setTotalPages, setPage, lastElementRef, setIsLoading} = useInfinityScroll()

    const handleSearch = (e: FormEvent<HTMLButtonElement | HTMLFormElement>) => {
        e.preventDefault()
        setPage(1)
        setPosts([])
        setQuery(search)
    }

    useEffect(() => {
        setIsLoading(true)
        fetchPosts(page, query)
            .then(res => {
                if (res) {
                    setPosts([...posts, ...res.posts])
                    setTotalPages(res.totalPages)
                }
            })
            .catch((e) => {
                console.error(e)
            })
    }, [page, query]);

    return (
        <div className='m-5'>
            {user && <h1 className='text-zinc-100 text-2xl font-bold'>Hello {user.username}!</h1>}
            <PostsForm search={search} setSearch={setSearch} handleSearch={handleSearch}/>
            <div>
                {posts.length
                    ?
                    <PostList posts={posts} lastElementRef={lastElementRef}/>
                    :
                    <h1 className='text-blue-300 text-3xl'>Posts were not found</h1>
                }
            </div>
        </div>
    );
};

export default Posts;
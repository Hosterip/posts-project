import {useEffect, useState} from 'react';
import {IPost} from "../share/interfaces/IPost.ts";
import useInfinityScroll from "./useInfinityScroll.tsx";
import {fetchPosts} from "../API/posts/fetchPosts.ts";

const usePosts = () => {
    const [posts, setPosts] = useState<IPost[] | []>([])
    const [query, setQuery] = useState<string>('')
    const [search, setSearch] = useState<string>('')
    const [error, setError] = useState(false)
    const {
        page,
        setTotalPages,
        setPage,
        lastElementRef,
        setIsLoading,
        isLoading
    } = useInfinityScroll()

    const handleSearch = () => {
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
                setError(true)
            })
            .finally(() => setIsLoading(false))
    }, [page, query]);
    return {
        posts,
        handleSearch,
        isLoading,
        error,
        lastElementRef,
        search,
        setSearch
    };
};

export default usePosts;
import SearchForm from "../../components/SearchForm.tsx";
import {useEffect, useState} from "react";
import useInfinityScroll from "../../hooks/useInfinityScroll.tsx";
import {fetchUserMany} from "../../API/user/fetchUserMany.ts";
import {Link} from "react-router-dom";
import {IUser} from "../../share/interfaces/User.ts";

const ProfileSearch = () => {
    const { page, lastElementRef, setPage, setTotalPages } = useInfinityScroll()
    const [search, setSearch] = useState('')
    const [query, setQuery] = useState('')
    const [users, setUsers] = useState<IUser[] | []>([])

    const handleRequest = () => {
        setUsers([])
        setPage(1)
        setQuery(search)
    }

    useEffect(() => {
        fetchUserMany(page, query)
            .then(res => {
                setUsers([...users, ...res.users])
                setTotalPages(res.totalPages)
            })
    }, [page, query]);

    return (
        <div>
            <SearchForm search={search} setSearch={setSearch} handleRequest={handleRequest}/>
            {users.length
                ?
                <div className='flex flex-col  items-center gap-3 m-6'>
                    {users.map(user => (
                        <div key={user.id} className='p-3 w-5/12 bg-blue-300 text-slate-700' ref={lastElementRef}>
                            <Link className='text-3xl' to={'/profiles/' + user.id}>{user.username}</Link>
                        </div>
                    ))}
                </div>
                :
                <h1>loading</h1>
            }
        </div>
    );
};

export default ProfileSearch;
import {FC, FormEvent} from 'react';

interface IPostsFormProps {
    search: string
    setSearch: (value: string) => void
    handleSearch: (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => void
}
const SearchForm: FC<IPostsFormProps> = ({search, setSearch, handleSearch}) => {
    return (
        <form onSubmit={handleSearch} className='rounded overflow-hidden w-8/12 my-4 mx-auto flex flex-nowrap'>
            <input
                className='w-full py-2 px-3 text-slate-800'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
            />
            <button
                onClick={handleSearch}
                className='px-2 bg-blue-500 text-zinc-50 text-xl'
            >
                Search!
            </button>
        </form>
    );
};

export default SearchForm;
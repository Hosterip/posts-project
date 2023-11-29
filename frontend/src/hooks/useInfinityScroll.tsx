import {useCallback, useRef, useState} from "react";


const useInfinityScroll = () => {
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(1)
    const observer = useRef<IntersectionObserver | undefined>()

    const lastElementRef = useCallback((review: HTMLDivElement) => {
        if (isLoading || page >= totalPages) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(reviews => {
            if (reviews[0].isIntersecting) {
                setPage(page + 1)
            }
        })
        if(review) observer.current?.observe(review)
    }, [isLoading, page, totalPages])

    return {
        lastElementRef,
        isLoading,
        setIsLoading,
        setTotalPages,
        setPage,
        page
    }
};

export default useInfinityScroll;
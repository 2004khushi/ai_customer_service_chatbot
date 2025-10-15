import { stat } from "fs";
import { useCallback, useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
    status: "CanLoadMore" | "LoadingMore" | "Exhausted" | "LoadingFirstPage",
    loadMore: (numItems: number) => void;
    loadSize?: number;
    observedEnabled?: boolean;
};

export const UseInfiniteScroll = ({
    status,
    loadMore,
    loadSize = 10,
    observedEnabled = true,
}: UseInfiniteScrollProps) => {
    const topElementRef = useRef<HTMLDivElement>(null);

    const handleLoadMore = useCallback(() => {
        if(status === "CanLoadMore") {
            loadMore(loadSize);
        }
    }, [status, loadMore, loadSize]);

    useEffect(() => {
        const topElement = topElementRef.current;
        if(!(topElement && observedEnabled)) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting){
                    handleLoadMore();
                }
            },
            {threshold: 0.1}
        );

        observer.observe(topElement);

        return () => {
            observer.disconnect();
        }; 


    }, [handleLoadMore, observedEnabled]);

    return {
        topElementRef,
        handleLoadMore,
        canLoadMore: status === "CanLoadMore",
        isLoadingMore: status === "LoadingMore",
        isLoadingFirstPage: status === "LoadingFirstPage",
        isExhausted: status === "Exhausted",
    }
};
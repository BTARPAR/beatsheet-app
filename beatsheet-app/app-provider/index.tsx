"use client";
import {ReactNode, useState} from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";

export const AppProvider = ({children}: { children: ReactNode }) => {
    const [queryClient, setQueryClient] = useState(new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
    );
};

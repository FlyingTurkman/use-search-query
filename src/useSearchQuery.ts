'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'



export type RouteOptions = {
    scroll?: boolean
    reset?: boolean
}

export type SetOptions = {
    reset?: boolean
}


export function useSearchQuery() {
    
    const searchParams = useSearchParams()
    const router = useRouter()

    const setSearchParams = useCallback((updates: Record<string, string | number | undefined | null>, options?: SetOptions) => {

        const params = options?.reset === true ? new URLSearchParams() : new URLSearchParams(searchParams.toString())

        Object.entries(updates).forEach(([key, value]) => {
            if (value  === undefined || value === null || value.toString().trim() == '') {
                params.delete(key)
            } else {
                params.set(key, String(value))
            }
        })

        const queryString = params.toString()

        return queryString
        
    }, [searchParams])


    const routeToSearchParams = useCallback((pathname: string, updates: Record<string, string | number | undefined | null>, options?: RouteOptions) => {
        const queryString = setSearchParams(updates, {
            reset: options?.reset ? options.reset : false
        })

        router.replace(`${pathname}?${queryString}`, { scroll: options?.scroll ? options?.scroll : false })
    }, [router, setSearchParams])

    return {
        setSearchParams,
        routeToSearchParams
    }
}
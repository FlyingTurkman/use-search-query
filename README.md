# Welcome to use-search-query
It's developed for [Next.js](https://nextjs.org/) developers.

use-search-query requires the next/navigation package as a peer dependency; therefore, **use-search-query only working with Next.js.**

## How to contribute? 
You can contribute via [Github](https://github.com/FlyingTurkman/use-search-query)

## How to install?
``bash
npm install use-search-query
``

### How to use?
#### routeToSearchParams
This function is used to update search params and navigate to a page.

| Parameter | Type | Required | Description |
|:---|:---|:---|:---|
| pathname | string | Yes | The base path for navigation. Similar to Next.js usePathname |
| updates | `Record<string, string \| number \| undefined \| null>` | Yes | An object containing your query updates. You can update one or multiple fields simultaneously. |
| scroll | boolean | No | Determines if the page should scroll to the top after navigation. Passed to router.replace. |

```tsx

"use client"
import { useSearchQuery } from 'use-search-query'
import { usePathname } from 'next/navigation'
import { useState } from 'react'




export default function Page() {


    const pathname = usePathname()

    const { routeToSearchParams } = useSearchQuery()

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [page, setPage] = useState<number>(1)

    return (
        <div>
            <input
            placeholder="Search a name..."
            onChange={((e) => {
                setSearchTerm(e.target.value)
            })}
            />
            <button
            onClick={routeToPage}
            >
                Search
            </button>
            <button
            onClick={() => {

                // Updates a single value without affecting other existing search params. Here, only the page number changes; the searchTerm remains the same.
                routeToSearchParams(pathname, { page: page - 1 }, true)
                setPage((prev) => prev - 1)
            }}
            >
                Previous Page
            </button>
            <button
            onClick={() => {
                // Updates a single value without affecting other existing search params. Here, only the page number changes; the searchTerm remains the same.
                routeToSearchParams(pathname, { page: page + 1 }, true)
                setPage((prev) => prev + 1)
            }}
            >
                Next Page
            </button>
        </div>
    )

    function routeToPage() {
        routeToSearchParams(pathname, { term: searchTerm, page: undefined })
    }
}
```

#### setSearchParams
This function returns a new query string without triggering navigation.
| Parameter | Type | Required | Description |
|:--- | :--- | :--- | :--- |
| updates | `Record<string, string \| number \| undefined \| null>` | Yes | An object containing your query updates. It generates a query string while preserving existing parameters. |


```tsx


"use client"
import { useSearchQuery } from 'use-search-query'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'




export default function Page() {


    const pathname = usePathname()
    const router = useRouter()

    const { setSearchParams } = useSearchQuery()

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [page, setPage] = useState<number>(1)

    return (
        <div>
            <input
            placeholder="Search a name..."
            onChange={((e) => {
                setSearchTerm(e.target.value)
            })}
            />
            <button
            onClick={routeToPage}
            >
                Search
            </button>
            <button
            onClick={() => {

                // Updates a single value without affecting other existing search params. Here, only the page number changes; the searchTerm remains the same.
                const newSearchQuery = setSearchParams({ page: page - 1 })
                router.replace(`${pathname}?${newSearchQuery}`)
                setPage((prev) => prev - 1)
            }}
            >
                Previous Page
            </button>
            <button
            onClick={() => {
                // Updates a single value without affecting other existing search params. Here, only the page number changes; the searchTerm remains the same.
                const newSearchQuery = setSearchParams({ page: page + 1 })
                router.replace(`${pathname}?${newSearchQuery}`)
                setPage((prev) => prev + 1)
            }}
            >
                Next Page
            </button>
        </div>
    )

    function routeToPage() {
        const newSearchQuery = setSearchParams({ term: serachTerm, page: undefined })
        router.replace(`${pathname}?${newSearchQuery}`)
    }
}
```
import axios from "axios"
import { useInfiniteQuery, useQueryClient } from "react-query"

export default function InfinateQuery() {
    const queryClient = useQueryClient()
    const cartoon = async ({ pageParam = 1 }) => {
        return await axios.get(`https://rickandmortyapi.com/api/character?page=${pageParam}`)
    }

    const {
        data,
        error,
        isError,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        isFetching,
        fetchNextPage
    } = useInfiniteQuery(['cartoon'], cartoon,
        {
            getNextPageParam: (_lastPage, pages) => {
                if (pages.length < 3) {
                    return pages.length + 1
                }
                else return undefined
            },
        },
        queryClient.invalidateQueries(['cartoon'])
    )

    if (isError) return <h1>Error:{error.message}</h1>
    if (isLoading) return <h1>Loading</h1>

    return (
        <div style={{ textAlign: 'center' }}>
            <div>
                {
                    data.pages?.map((datas, index) => {
                        return (
                            <div key={index} style={{ display: 'flex', flexWrap: 'wrap', gap: '25px', padding: '10px' }}>
                                {
                                    datas.data.results.map((charecters) => {
                                        return (
                                            <table key={charecters.id} border='1px solid'>
                                                <thead>
                                                    <tr>
                                                        <th>{charecters.name}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <img width='80px' height='80px' alt="img" src={charecters.image} />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                <button disabled={!hasNextPage} onClick={fetchNextPage}>Load more</button>
                <div>{!isFetchingNextPage && isFetching ? 'fetching...' : null}</div>
            </div>
        </div>
    )
}

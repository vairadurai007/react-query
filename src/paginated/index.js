import axios from "axios"
import { useState } from "react"
import { useQuery } from "react-query"

export function Pagination() {
    const [page, setPage] = useState(1)

    const cartoon = async ({ queryKey }) => {
        return await axios.get(`https://rickandmortyapi.com/api/character?page=${queryKey[1]}`)
    }

    const { data, error, isError, isLoading, isPreviousData } = useQuery(['cartoon', page], cartoon,
        {
            keepPreviousData: true
        }
    )
    if (isError) return <h1>Error:{error.message}</h1>
    if (isLoading) return <h1>Loading</h1>

    return (
        <div>
            <div>
                <button onClick={() => setPage(page - 1)}
                    disabled={page === 1} >
                    Previous
                </button>
                <button onClick={() => setPage(page + 1)}
                        disabled={isPreviousData && !data.data.info.next}
                >
                    Next
                </button>
            </div>
            {
                data.data.results?.map((datas, index) => {
                    return (
                        <table key={index}>
                            <thead>
                                <tr>
                                    <th>{datas.name}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <img width='80px' height='80px' alt="img" src={datas.image} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )
                })
            }
        </div>
    )
}

import axios from "axios"
import { useQuery } from "react-query"

export default function Queries() {
    const url = 'https://jsonplaceholder.typicode.com/todos'
    const dataList = async () => {
        return await axios.get(url)
    }

    const { data, isError, error, isLoading } = useQuery('data', dataList)

    if (isLoading) return <h1>Loading...</h1>
    if (isError) return <h1>Error:{error.message}</h1>

    return (
        <div>
            {
                data.data?.map((items, index) => {
                    return (
                        <ul key={index}>
                            <li>{items.title}</li>
                        </ul>
                    )
                })
            }
        </div>
    )
}

import axios from "axios"
import { useQuery } from "react-query"

export function BackgroundFetching() {

    const url = 'https://jsonplaceholder.typicode.com/todos'

    const dataList = async () => {
        return await axios.get(url)
    }

    const { status, data: todos, error, isFetching } = useQuery(
        'todos',
        dataList, {
        cacheTime: 1000,
        staleTime: 3000
    }
    )
    console.log({ isFetching });
    console.log({ error });
    console.log(status === 'loading');

    return status === 'loading' ? (
        <span>Loading...</span>
    ) : status === 'error' ? (
        <span>Error: {error.message}</span>
    ) : (
        <>
            {isFetching ? <div>Refreshing...</div> : null}

            <div>
                {
                    todos.data.map((todo, index) => (
                        <ul key={index}>
                            <li>
                                {
                                    todo.title
                                }
                            </li>
                        </ul>
                    ))
                }
            </div>
        </>
    )
}

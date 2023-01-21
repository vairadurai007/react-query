import axios from "axios"
import { useQuery } from "react-query"

export default function QueryFunction({ todoId }) {

    const Url = 'https://jsonplaceholder.typicode.com/todos'

    const fetchTodoById = async () => {
        return await axios.get(Url)
    }
    useQuery(['todos'], fetchTodoById)
    useQuery(['todos', todoId], () => fetchTodoById(todoId))
    useQuery(['todos', todoId], async () => {
        const data = await fetchTodoById(todoId)
        return data
    })

    const ThrowingErrors = useQuery(['todos', 'Throwing Errors'], ({ queryKey }) => fetchTodoById(queryKey[1]))
    const { isError, data } = useQuery(['todos', todoId], async () => {
        if (isError) {
            throw new Error('Oh no!')
        }

        return data
    })

    console.log(ThrowingErrors);

    const fetch = useQuery(['todos', 'fetch'], async () => {
        const response = await fetch(Url + todoId)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        return response.json()
    })
    console.log(fetch);

    return (<></>)
}
import axios from "axios"
import { useQuery } from "react-query"

export default function DisablingPausingQueries() {

    const quizData = () => {
        return axios.get(`https://opentdb.com/api.php?amount=10&category=21&difficulty=hard&type=multiple`)
    }
    const {
        isIdle,
        isLoading,
        isError,
        data,
        error,
        refetch,
        isFetching,
    } = useQuery('todos', quizData, {
        cacheTime:1000,
        staleTime:10000,
        enabled:false
    })
    console.log({ isFetching }, { isLoading });
    return (
        <>
            <button onClick={() => refetch()}>Fetch Quiz</button>
            {
                isIdle ? (
                    'Not ready...'
                ) : isLoading ? (
                    <span>Loading...</span>
                ) : isError ? (
                    <span>Error: {error.message}</span>
                ) : (
                    <>
                        <ul>
                            {data.data.results?.map(quiz => (
                                <li key={quiz.question}>{quiz.question}</li>
                            ))}
                        </ul>
                        <div>{isFetching ? 'Fetching...' : null}</div>
                    </>
                )}
        </>
    )

}

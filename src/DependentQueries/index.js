import axios from "axios"
import { useQuery } from "react-query"

export default function DependentQuery({ amount }) {

    const dataList = (amount) => {
        return axios.get(`https://opentdb.com/api.php?amount=${amount}&category=21&difficulty=hard&type=multiple`)
    }

    const { data: quizData } = useQuery({
        queryKey: ['todo', amount],
        queryFn: () => dataList(amount),
    })

    const type = quizData?.data.results[0]

    const postData = () => {
        return axios.get(`https://opentdb.com/api.php?amount=${10}&category=21&difficulty=hard&type=multiple`)
    }

    useQuery(['user', type], (type) => postData(type), {
        enabled: !!type,
    })

    return (
        <div>
            DependentQueries
            {
                !!quizData ? quizData.data.results?.map((quiz, index) => {
                    return (
                        <ul key={index}>
                            <li>{quiz.question}</li>
                        </ul>
                    )
                }) : ''
            }
        </div>
    )
}


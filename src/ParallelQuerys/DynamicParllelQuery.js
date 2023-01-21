import axios from "axios"
import { useQueries } from "react-query"


export default function DynamicParllelQuery({ questionAmount }) {

    const dataList = (id) => {
        return axios.get(`https://opentdb.com/api.php?amount=${id}&category=21&difficulty=hard&type=multiple`)
    }

    const value = useQueries(questionAmount.map((id) => {
        return {
            queryKey: ['dynamicQuery', id],
            queryFn: () => dataList(id)
        }
    }))

    return (
        <h1>
            DynamicParallelQuery
            {
                value[0].data?.data.results.map((data, index) => {
                    return (
                        <ul key={index}>
                            <li>{data.question}</li>
                        </ul>
                    )
                })
            }
        </h1>
    )
}

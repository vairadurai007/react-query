import axios from "axios"
import { useQuery } from "react-query"

export default function ParrellQuries() {
    const FirstUrl = 'https://jsonplaceholder.typicode.com/posts'
    const secondUrl = 'https://jsonplaceholder.typicode.com/todos'

    const FirstDataList = async () => {
        return await axios.get(FirstUrl)
    }

    const SecondDataList = async () => {
        return await axios.get(secondUrl)
    }

    const { data: FirstData, isError: FirstIsError, isLoading: FirstLoading } = useQuery('firstdata', FirstDataList)
    const { data: secondData, isError: secondError, isLoading: SecondLoading } = useQuery('seconddata2', SecondDataList)

    if (SecondLoading) return <h1>Loading...</h1>
    if (secondError) return <h1>FirstError</h1>
    if (FirstLoading) return <h1>Loading...</h1>
    if (FirstIsError) return <h1>secondError</h1>

    return (
        <div>
            {
                FirstData.data.map((items)=>{
                    return(
                        <ul key={items.id}>
                            <li>{items.title}</li>
                        </ul>
                    )
                })
            }
            {
                secondData.data.map((items)=>{
                    return(
                        <ul key={items.id}>
                            <li>{items.title}</li>
                        </ul>
                    )
                })
            }
        </div>
    )
}

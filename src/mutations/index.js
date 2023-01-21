import axios from "axios"
import { useState } from "react"
import { useMutation, useQueryClient } from "react-query";


export default function Mutations() {
    const [name, setName] = useState('');
    const [job, setJob] = useState('')
    const queryClient = useQueryClient()

    const mutateFunction = (userDetails) => {
        return axios.post('https://reqres.in/api/users', userDetails)
    }

    const mutation = useMutation(mutateFunction, {
        onSuccess: (response) => {
            console.log(response.data);
            queryClient.invalidateQueries(['data'])
        },
        onError:(error)=>{
            console.log(error);
        }
    })

    const updateDetails = (event) => {
        event.preventDefault();
        mutation.mutate({ name: name, job: job })
        setJob('')
        setName('')
    }

    return (
        <div>
            <label> Name
                <input name="name" placeholder="Enter Name" type='text' value={name} onChange={(event) => setName(event.target.value)} />
            </label>
            <label> Job
                <input name="job" placeholder="Enter Job" type='text' value={job} onChange={(event) => setJob(event.target.value)} />
            </label>
            <button onClick={updateDetails}>Submit</button>
        </div>
    )
}


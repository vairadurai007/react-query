
export default function IsFetching({ todo }) {
    console.log(todo);
    return (
        <>
            {
                !!todo ? todo?.map((items, index) => {
                    return (
                        <ul key={index}>
                            <li>{items.title}</li>
                        </ul>
                    )
                })
                    : ''
            }
        </>
    )
}
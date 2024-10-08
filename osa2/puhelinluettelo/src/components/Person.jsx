const Person = (props) => {
    return(
        <>
            {props.personData.name} {props.personData.number}
            <button onClick={(event) => props.handleDelete(event, props.personData)}>Delete</button>
        </>
    )
}
export default Person
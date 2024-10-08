import Person from './Person'
const Persons = (props) => {
    console.log(props.persons)
    
    return(
        <>
        {props.persons.map(person =>
            <p key={person.name}>
                <Person personData = {person} handleDelete = {props.handleDelete} />
            </p>
          )}
        </>
    );
};
export default Persons;
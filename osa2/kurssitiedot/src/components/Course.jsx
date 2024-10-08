const Header = (props) => (
    <h1>
      {props.course}
    </h1>
  )
const Content = (props) => (
  <>
  {props.parts.map(part =>
    <p key={part.id}>{part.name} {part.exercises}</p>
    )}
</>
  )
const Total = (props) => (
    <p>
      Number of exercises {props.parts.reduce((sum, part) => sum + part.exercises, 0)}
    </p>
  )

  const Course = ({course}) => {
    return(
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <h2>total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</h2>
      </>
  )}
  
  export default Course
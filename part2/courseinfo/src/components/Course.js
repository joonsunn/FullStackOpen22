const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => {
  
    return(
        <p>
            {part.name} {part.exercises}
        </p>
      )
  }

const Content = ({ parts }) => {
  
    return (
        <>
            {parts.map((part) =>
                <Part key = {part.id} part = {part}></Part>
            )}
        </>
    )
}
  
const TotalExercises = ({course}) => {
    const totalExercises = course.parts.reduce((accumulator, coursePart) => accumulator + coursePart.exercises, 0)
  
    return (
      <b>total of {totalExercises} exercises</b>
    )
}
  
const Course = ({ course }) => {
    
    const totalExercises = course.parts.reduce((accumulator, coursePart) => accumulator + coursePart.exercises, 0)
    
    return (
        <>
            <Header course = {course.name}></Header>
            <Content parts = {course.parts}></Content>
            <TotalExercises course={course}></TotalExercises>
        </>
    )
}

export default Course
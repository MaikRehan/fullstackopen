const Header = ({course}) => {
    //console.log(course)
    return (
        <div>
            <h1>{course.name}</h1>
        </div>
    )
}

const Part = ({part}) => {
    console.log(part)
    return (
        <div>
            <p>{part.name} has {part.exercises} exercises</p>
        </div>
    )
}

const Content = ({course}) => {
    return(
        <div>
            {course.parts.map(part =>
                <div key={part.id}>
                    <Part part={part}/>
                </div>
            )}
            <Total parts={course.parts}/>
        </div>
    )
}

const Total = ({parts}) => {
    const initialValue = 0;

    const totalSumOfParts = parts.reduce((sum, part) =>{
        return sum + part.exercises;
    }, initialValue)

    return(
        <div style={{fontWeight: 'bold'}}>
            total of {totalSumOfParts} exercises
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course}/>
            <Content course={course}/>
        </div>
    )
}

export default Course
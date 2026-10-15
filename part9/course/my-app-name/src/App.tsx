const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);


  const Header = (props) => {
    return (
        <h1>{props.name}</h1>
    )}

  const Total = (props) => {
    return (
        <p>
          Number of exercises {props.totalExercises}
        </p>
    )
  }

  const Content = (props) => {
    return(
        <div>
          <p>
            {props.parts[0].name} {props.parts[0].exerciseCount}
          </p>
          <p>
            {props.parts[1].name} {props.parts[1].exerciseCount}
          </p>
          <p>
            {props.parts[2].name} {props.parts[2].exerciseCount}
          </p>

        </div>
    )
  }


  return (
      <div>
        <Header name={courseName} />
        <Content parts={courseParts}/>
        <Total totalExercises={totalExercises}/>
      </div>
  );
};

export default App;
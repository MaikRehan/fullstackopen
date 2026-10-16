const courseName = "Half Stack application development";
const courseParts: CoursePart[] = [
    {
        name: "Fundamentals",
        exerciseCount: 10,
        description: "This is an awesome course part",
        kind: "basic"
    },
    {
        name: "Using props to pass data",
        exerciseCount: 7,
        groupProjectCount: 3,
        kind: "group"
    },
    {
        name: "Basics of type Narrowing",
        exerciseCount: 7,
        description: "How to go from unknown to string",
        kind: "basic"
    },
    {
        name: "Deeper type usage",
        exerciseCount: 14,
        description: "Confusing description",
        backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
        kind: "background"
    },
    {
        name: "TypeScript in frontend",
        exerciseCount: 10,
        description: "a hard part",
        kind: "basic",
    },
    {
        name: "Backend development",
        exerciseCount: 21,
        description: "Typing the backend",
        requirements: ["nodejs", "jest"],
        kind: "special"
    }
];
const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

interface HeaderProps {
    name: string;
}

export interface PartProps {
    part: CoursePart;
}

interface ContentProps {
    parts: CoursePart[];
}

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
    description: string;
}

interface CoursePartBasic extends CoursePartBaseWithDescription {
    kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number,
    kind: "group",
}

interface CoursePartBackground extends CoursePartBaseWithDescription {
    backgroundMaterial: string;
    kind: "background"
}

interface CoursePartSpecial {
    name: string,
    exerciseCount: number,
    description: string,
    requirements: string[]
    kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface TotalProps {
    total: number;
}

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = (props: PartProps) => {
    const {part} = props;
    switch (part.kind) {
        case "basic":
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <div>{part.description}</div>
                </div>)
        case "group":
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <div>{part.groupProjectCount}</div>
                </div>
            )
        case "background":
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <div>{part.description}</div>
                    <div>{part.backgroundMaterial}</div>
                </div>
            )
        case "special":
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <div>{part.description}</div>
                    {part.requirements.map((requirement, index) => (
                        <div key={index}> required skill: {requirement} </div>
                    ))}
                </div>
            )
        default:
            return assertNever(part);
    }
}

const Header = (props: HeaderProps) => {
    return (
        <h1>{props.name}</h1>
    )
}

const Total = (props: TotalProps) => {
    return (
        <p>
            Number of exercises {props.total}
        </p>
    )
}

const Content = (props: ContentProps) => {
    const {parts} = props;
    return (
        <div>
            {parts.map((part, index) => (
                <Part key={index} part={part}/>
            ))}
        </div>
    );
};

const App = () => {
    return (
        <div>
            <Header name={courseName}/>
            <Content parts={courseParts}/>
            <Total total={totalExercises}/>
        </div>
    );
};

export default App;
import React from 'react';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescribed extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseDescribed {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescribed {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecial extends CourseDescribed {
  type: "special"
  requirements:string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecial;


// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the leisured course part",
    type: "normal"
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the harded course part",
    type: "normal"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special"
  }
]

const assertNever = (value:never):never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}

const App = () => {
  const courseName = "Half Stack application development";
  /* const courseParts = [
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
  ]; */

  return (
    <div>
      <h1>{courseName}</h1>
      {courseParts.map(course => {
          {switch (course.type) {
            case 'normal':
              return (<div><h3>{course.name} {course.exerciseCount}</h3>
                <p>{course.description}</p></div>)
            case 'groupProject':
              return (<div><h3>{course.name} {course.exerciseCount}</h3>
              <p>{course.groupProjectCount}</p></div>)
            case 'submission':
              return (<div><h3>{course.name} {course.exerciseCount}</h3>
              <p>{course.description} {course.exerciseSubmissionLink}</p></div>)
            case 'special':
              return (<div><h3>{course.name} {course.exerciseCount}</h3>
              <p>{course.description} {course.requirements.join(' ')}</p></div>)
            default:
              assertNever(course)
          }}
      })}
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default App;

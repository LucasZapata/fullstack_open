import React from 'react'

const Header = (props) => {
  return (
    <div>
      <p>
        {props.course}
      </p>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>{props.part}</p>
      <p>{props.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  return(
    <div>
      <p><Part part = {props.part1} exercises = {props.exercises1} /></p>
      <p><Part part = {props.part2} exercises = {props.exercises2} /></p>
      <p><Part part = {props.part3} exercises = {props.exercises3} /></p>
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <p>
        Number of exercises {props.total}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }



  return (
    <div>
      <h1><Header course = {course.name} /></h1>
      <p>
        <Content part1 = {course.parts[0].name} part2 = {course.parts[1].name} part3 = {course.parts[2].name} exercises1 = {course.parts[0].exercises} exercises2 = {course.parts[1].exercises} exercises3 = {course.parts[2].exercises} />
        <Total total = {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
      </p>
    </div>
  )
}

export default App

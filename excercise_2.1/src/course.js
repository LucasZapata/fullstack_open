import React from 'react';

const Course = ({course}) =>{
    return(<div>
        <Header name = {course.name}/>
        <Content course = {course} />
        <Total parts = {course.parts} />
    </div>)}

const Content = ({ course }) => {
    const result = course.parts.map(p => <Part part={p}/>)
    return (
      <div>
        {result}
      </div>
    )
  }

  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }

  const Header = ({ name }) => {
    return (
      <h1>{name}</h1>
    )
  }

  const Total = ({parts}) => {
    const total = parts.reduce((res, part) => res += part.exercises, 0)
    return (
      <p><b>Total of excersises: {String(total)}</b></p>
    )
  }

export default Course
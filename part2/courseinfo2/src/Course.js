import React from 'react';

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
}
  
const Total = ({ course }) => {
    const sum = course.parts.reduce((a, b) => a + b.exercises, 0)
    return (
      <h4>total of {sum} exercises</h4>
    ) 
}
  
const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    )
}
  
const Content = ({ course }) => {
    return (
      <>
        {course.parts.map(part => 
          <Part key={part.id} part={part}/>
        )}
      </>
    )
}
  
const Course = ({ course }) => {
    return (
      <>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </>
    )
}

export default Course
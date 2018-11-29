import React, { Component } from 'react';
import Course from './Course';

const Semester = (props) => {
  const { number, courses, onCourseClick } = props;

  return (
    <div className="semester">
      <span style={{
        background: '#555D60',
        boxShadow: '2px 2px 3px #999',
        color: '#ffffff',
        border: '1px solid #000000',
        display: 'inline-block',
        padding: '10px',
      }}>
        Fase: {number}
      </span>

      <div style={{ marginTop: 20 }}>
        {courses.map((course) => (
          <div style={{ margin: '10px 0' }}>
            <Course {...course} onClick={onCourseClick}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Semester;

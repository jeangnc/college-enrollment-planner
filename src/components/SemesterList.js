import React from 'react';
import Semester from './Semester';

const SemesterList = (props) => {
  const { semesters, onCourseClick } = props;

  return (
    <div className="semester-list" style={{
      width: '100%',
      display: 'inline-flex',
      flexDirection: 'row',
      overflowX: 'auto',
    }}>
      {props.semesters.map((semester, index) => (
        <div style={{ flex: '0 0 150px', padding: 10 }}>
          <Semester
            number={index+1}
            courses={semester.courses}
            onCourseClick={onCourseClick}
          />
        </div>
      ))}
    </div>
  );
}

export default SemesterList;

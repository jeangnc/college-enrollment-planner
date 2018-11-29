import React, { Component } from 'react';
import PropTypes from 'prop-types';

const availableStyle = {
  borderColor: 'transparent',
  cursor: 'pointer',
};

const unavailableStyle = {
  borderColor: 'transparent',
  opacity: 0.3,
};

const statusStyles = {
  todo: {
  },
  doing: {
    borderColor: '#53A7D7',
    cursor: 'pointer',
  },
  next: {
    borderColor: '#3f883f',
    cursor: 'pointer',
  },
  done: {
    borderColor: 'transparent',
    textDecoration: 'line-through',
    background: '#eaeaea',
    cursor: 'pointer',
  },
}

const Course = (props) => {
  const {
    id,
    name,
    onClick,
    available = false,
    status = null
  } = props;

  const statusStyle = available ? statusStyles[status] : {};
  const availabilityStyle = available ? availableStyle : unavailableStyle;

  return (
    <div style={{
      background: '#ffffff',
      border: '5px solid transparent',
      boxShadow: '2px 2px 3px #999999',
      boxSizing: 'border-box',
      padding: 3,
      position: 'relative',
      ...availabilityStyle,
      ...statusStyle,
    }} onClick={() => onClick(id)}>
    <div>{name}</div>
    <div style={{ color: '#999999', marginTop: 5 }}>{id}</div>
  </div>
  );
}

Course.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  stats: PropTypes.oneOf(['done', 'doing', 'available', 'unavailable', 'next']),
};

export default Course;

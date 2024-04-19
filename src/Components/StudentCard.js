import React from 'react'

function StudentCard(props) {
  return (
    <div className="student-card">
        <img src={props.img} alt={props.name} className="student-card-image" />
        <p className="student-card-name">{props.name}</p>
        <p className="student-card-title">{props.title}</p>
    </div>
  );
}

export default StudentCard
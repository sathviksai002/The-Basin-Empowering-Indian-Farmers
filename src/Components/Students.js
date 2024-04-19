import React from 'react'
import StudentCard from "./StudentCard";
import '../Styles/Student.css';
import profile1 from "../Assets/profile1.png"
import profile2 from "../Assets/profile2.png"
import profile3 from "../Assets/profile3.png"
import profile4 from "../Assets/profile4.png"

function Students() {
  return (
    <div className="student-section">
        <div className="student-title-content">
            <h3 className="student-title">
                <span>Meet our Team</span>
            </h3>
        <p className="student_description">
        Meet our passionate team of student developers dedicated to crafting a user-friendly website tailored to meet the unique needs of farmers. With a blend of innovation and empathy, we're committed to empowering agricultural communities through technology.
        </p>
        </div>
    <div className="student-cards-content">
        <StudentCard 
        img = {profile1}
        name = "T Venkata Sai Sathvik"
        title = "Frontend, MiddleWare and Deployment"
        />
        <StudentCard 
        img = {profile2}
        name = "M Abhiram Sharma"
        title = "Backend, MiddleWare and Deployment"
        />
        <StudentCard 
        img = {profile3}
        name = "Ankush Kumar"
        title = "Backend and Testing"
        />
        <StudentCard 
        img = {profile4}
        name = "Shaik Abdul Shaan"
        title = "Frontend and Testing"
        />
    </div>
    </div>
  )
}

export default Students
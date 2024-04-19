// In your ContactUs component
import React, { useState, useEffect } from 'react';
import "../Styles/Contactus.css"

function ContactUs(props) {
    const [status, setStatus] = useState("Submit");

    // Prevent scrolling when Contact Us form is open
    useEffect(() => {
        if (props.trigger) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [props.trigger]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending the data..."); 
        const { name, email, message } = e.target.elements;
        let details = {
            name: name.value,
            email: email.value,
            message: message.value,
        };
        
        try {
            let response = await fetch("https://localhost:3000/Contact-Us", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(details),
            });
            setStatus("Submit");
            let result = await response.json();
            alert(result.status);
            props.setTrigger(false); // Close the form after successful submission
        } catch (error) {
            console.error('Error:', error);
            setStatus("Failed to send");
        }
    };

    return(
        <div className={props.trigger ? "container-contact-form show" : "container-contact-form"}>
            <button className="close-btn" onClick={() => props.setTrigger(false)}></button>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" name="name" required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" name="email" required />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message: </label>
                    <textarea id="message" name="message" required />
                </div>
                <button type="submit" className="submit-button">{status}</button>
            </form>
        </div>
    );
}

export default ContactUs;

import React from 'react';
import { useFormik } from 'formik';

export function UseSimpleForm() {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: ''
        },
        onSubmit: values => {
            console.log("Form submitted");
            console.log("name:", values.name);
            console.log("email:", values.email);
        }
    });
    
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input 
                type='text' 
                id="name" 
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
            />
            
            <label htmlFor="email">Email:</label>
            <input 
                type='email' 
                id="email" 
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
            />
            
            <button type='submit'>Submit</button>
        </form>
    );
}
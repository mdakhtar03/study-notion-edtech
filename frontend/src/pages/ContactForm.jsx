import React from 'react'
import ContactUsForm from "../components/ContactPage/ContactUsForm"
const ContactForm = () => {
  return (
    <div className='mx-auto text-center'>
        <h1 className=' text-richblack-5 font-semibold text-4xl'>Get In Touch</h1>
        <p className=' text-richblack-300 text-base font-medium mb-16'>We'd love to here for you, Please fill out this form.</p>
        <div className='mx-auto'>
            <ContactUsForm/>
        </div>
    </div>
  )
}

export default ContactForm
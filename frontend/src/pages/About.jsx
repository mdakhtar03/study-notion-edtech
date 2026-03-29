import React from 'react'

import HighlightText from '../components/core/HomePage/HighlightText'
import Image1 from "../assets/Images/aboutus1.webp"
import Image2 from "../assets/Images/aboutus2.webp"
import Image3 from "../assets/Images/aboutus3.webp"
import FoundingStory from "../assets/Images/FoundingStory.png"
import Quote from '../components/core/AboutPage/Quote'
import StatsComponent from "../components/core/AboutPage/StatsComponent"
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactForm from './ContactForm'
import Footer from '../components/common/Footer'


const About = () => {
  return (
    <div className=' mx-auto '>
            {/* Section 1 */}
            <section className='flex  flex-col items-center bg-richblack-800 '>
                <p className=' text-richblack-200 text-base font-medium'>About Us</p>
                <div>
                  <header className=' text-4xl font-semibold text-richblack-5 text-center w-[60%] mx-auto'>Driving Innovation is Online Education for a 
                  <HighlightText text={"Brighter Future"} /> 
                  <p className=' text-base text-richblack-300 font-medium'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                  </header>

                  <div className=' flex gap-x-3 justify-center'>
                    <img src={Image1} alt='about-us' />
                    <img src={Image2} alt='about-us' />
                    <img src={Image3} alt='about-us' />
                  </div>
                </div>
            </section>


            
            
            
            {/* Section 2 */}

            <section className=' text-richblack-100'>
              <Quote/>
            </section> 



            {/* Section 3 */}

            <section>
                <div>
                {/* Founding story div */}
                  <div className='flex text-richblack-5'>
                  {/* Founding story left box */}
                    <div>
                      <h1>Our Founding Story</h1>
                      <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                      <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                    {/* Founding story right box */}
                    <div>
                    <img src={FoundingStory} alt='FoundingStory' />
                    </div>
                  </div>
                  
                  {/* Vision and mission div */}
                  <div className=' flex justify-center gap-20 text-richblack-5'>
                      <div>
                        <h1> Our Vision </h1>
                        <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                      </div>
                      <div>
                        <h1>Our Mission</h1>
                        <p>
                          our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                        </p>
                      </div>
                  </div>

                </div>
            </section>


            {/* Section 4 */}

  
            <StatsComponent />
         
            {/* Section 5 */}

            <section className=' flex flex-col items-center justify-center'>
                <LearningGrid/>
                {/* Form */}
                <ContactForm/>
            </section>

            {/* Section 6 */}
            <section>
              <div>
                Review from other leaners
              </div>
            </section>

            {/* Footer */}
            <Footer/>
            
    </div>
  )
}

export default About
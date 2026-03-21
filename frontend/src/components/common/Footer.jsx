import React from 'react'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import FooterDataCard from '../core/HomePage/FooterDataCard'
import { FaHeart } from "react-icons/fa";
import {footerSections,Company,Resources,Community,Plans,bottomFooter, Support} from "../../data/footer-links"
import { Link } from 'react-router-dom';
const Footer = () => {
   
  return (
    <div className=' border-t border-richblack-700 flex flex-col items-center bg-richblack-800 font-semibold text-richblack-100 text-base py-14 px-28'>


        {/* Footer Body */}

        <div className='flex flex-row justify-between items-start w-11/12 mx-auto h-full border-b border-richblack-700 pb-8'>
            <div className='flex flex-row w-[50%] h-full  items-start gap-10 border-r-2 border-richblack-700'>
                <div className=' flex flex-col gap-2'>
                  <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><img src={Logo} alt='Logo-Full-Light' height={"32"} width={"160"}/></Link>
                <p>Company</p>
                {Company.map((data,index)=>{
                return <FooterDataCard data={data.title} link={data.link} key={index} />
            })}
            </div>

            <div >
                <div className=' flex flex-col gap-2 mb-9' >
                    <p>Resources</p>
                    {Resources.map((data,index)=>{
                    return <FooterDataCard data={data.title} key={index} link={data.link}/>
                    })}
                </div>
                
                <div className=' flex flex-col gap-2'>
                    <p>Support</p>
                    {Support.map((data,index)=>{
                        return <FooterDataCard data={data.title} key={index} link={data.link}/>
                    })}
                </div>

            </div>
            <div>
                <div className=' flex flex-col gap-2 mb-9'>
                           <p>Plans</p>
                            {
                            Plans.map((data,index)=>{
                            return <FooterDataCard data={data.title} key={index} link={data.link}/>}
                            )}
                </div>
                
                <div className=' flex flex-col gap-2'>
                    <p>Community</p>
                    {
                    Community.map((data,index)=>{
                    return <FooterDataCard data={data.title} key={index} link={data.link}/>}
                )}
                </div>
            </div>
            </div>
        
            <div className=' flex  gap-10 '>
                    {footerSections.map((section) => (
                            <div className=' flex flex-col gap-2' key={section.title} >
                            <h3>{section.title}</h3>

                            {section.links.map((item) => (
                            <FooterDataCard
                            key={item.title}
                            data={item.title}
                            link={item.link}
                            />
                            ))}
                            </div>
                    ))}
            </div>
        
        </div>




        {/* Bottom  */}
        <div className=' flex justify-between w-full p-5  '>
            <div className='flex gap-3'>
                {bottomFooter.map((data,index)=>{
                    return <FooterDataCard key={index} data={data.title} link={data.link} />
                })}
            </div>
            <div className='flex items-center  gap-3'>Build with <div><FaHeart className=' text-pink-300' /></div> for learners © 2026 StudyNotion</div>
        </div>
        
    </div>
  )
}

export default Footer
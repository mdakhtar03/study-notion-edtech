import React from 'react'
import CTAButton from "../HomePage/Button"
// import HighlightText from './HighlightText'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import {TypeAnimation} from 'react-type-animation'
const CodeBlocks = ({position, heading, subheading, ctabtn1, ctabtn2, 
    codeblock, backgroundGradient, codeColor}) => {
  return (
    <div className={`flex ${position} my-20 w-[100%] justify-between gap-10`}>
        {/* Section 1  */}
        <div className=' flex w-[50%] flex-col gap-8'>
                {heading}
                <div className='text-richblack-300 font-bold '>
                    {subheading}
                </div>
                <div className='flex gap-7 mt-8'>
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className='flex gap-2 items-center'>
                            {ctabtn1.btnText}
                            <MdOutlineKeyboardArrowRight />
                        </div>
                    </CTAButton>
                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        <div className='flex gap-2 items-center'>
                            {ctabtn2.btnText}
                            <MdOutlineKeyboardArrowRight />
                        </div>
                    </CTAButton>
                </div>
        </div>
        {/* Section 2 Type Animation */}
        <div className={` flex  w-[50%] card ${backgroundGradient}`}>
            {/* HW Gradient*/}
            <div className='text-center flex-col w-[10%] text-richblack-400 font-inter font-bold pt-4'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            <div className ={`w-[90%] flex flex-col gap-2 opacity-100 font-bold font-mono ${codeColor} pt-4`}>
                    <TypeAnimation
                        sequence={[codeblock, 5000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        style={
                            {
                                whiteSpace:"pre-line",
                                display:"block"
                            }

                        }
                        omitDeletionAnimation={true}
                    />
                </div>
        </div>
    </div>
  )
}

export default CodeBlocks

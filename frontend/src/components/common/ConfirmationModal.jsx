import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModal = ({ modalData }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      
      {/* Modal Box */}
      <div className="w-11/12 max-w-md rounded-lg bg-richblack-800 p-6 shadow-lg border border-richblack-700">
        
        {/* Title */}
        <p className="text-xl font-semibold text-richblack-5">
          {modalData.text1}
        </p>

        {/* Subtitle */}
        <p className="mt-2 text-sm text-richblack-300">
          {modalData.text2}
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          
          {/* Cancel */}
          <button
            onClick={modalData?.btn2Handler}
            className="px-4 py-2 rounded-md bg-richblack-600 text-richblack-5 hover:bg-richblack-500 transition"
          >
            {modalData?.btn2Text}
          </button>

          {/* Confirm */}
          <button
            onClick={modalData?.btn1Handler}
            className="px-4 py-2 rounded-md bg-yellow-50 text-richblack-900  font-semibold hover:bg-yellow-50 transition"
          >
            {modalData?.btn1Text}
          </button>

        </div>

      </div>
    </div>
  )
}

export default ConfirmationModal
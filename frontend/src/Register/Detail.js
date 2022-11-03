import React from 'react'
import "./Detail.css"
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Checkbox from '@mui/material/Checkbox';

function detail() {
  const steps = [
    '','','','','','','','',
  ];
  return (
    <>
    <div className='container'>
              <Stepper activeStep={4} alternativeLabel
                className='py-5 mt-7 '>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel >{label}</StepLabel>
                </Step>
              ))}
              </Stepper>
            </div>

      <div className='flex justify-between ml-5 mr-5 mt-8' >
          <a href="/cost">
            <button class="
                  bg-[#162B78] 
                  font-IBMPlexSansThai 
                  hover:bg-white 
                  hover:text-[#162B78] 
                  text-white 
                  py-2 
                  px-4 
                  rounded-full 
                  border border-[#162B78]
                  shadow-md shadow-[#162B78]
                  ">
                กลับ
            </button>
          </a>
          <a href="/image">
              <button
                  class="
                  bg-[#162B78] 
                  font-IBMPlexSansThai
                  hover:bg-white 
                  hover:text-[#162B78] 
                  text-white 
                  py-2 
                  px-4 
                  rounded-full 
                  border border-[#162B78]
                  shadow-md shadow-[#162B78]
                  ">
                    ถัดไป
              </button>
          </a>
      </div>
    </>
  )
}

export default detail

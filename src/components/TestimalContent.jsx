import React from 'react'

const TestimalContent = ({data,idx}) => {
    const {comment,name,position} = data;
  return (
    <>
            <div key={idx} className=" p-10 w-full h-full bg-pink-100 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl ">
                <p className=" italic mb-4">"{comment}"</p>
                <p className="text-pink-900 font-semibold pt-[3vw]">{name}</p>
                <p className="">{position}</p>
            </div>
    </>
  )
}

export default TestimalContent
import React, { useEffect, useState } from 'react';
const TempData = () => {

    const [data,setData] = useState(null);

    const getData = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:5000/api/bypass/verification");
            setData("fetched");
        }
        catch(error){
            console.log(error);
        }
    }   

    useEffect(()=>{
    },[])


    return (
      <>
              <section
          id="home"
          className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
        >
        <button onClick={getData}>GetData</button>
        <div>{data}</div>
        </section>
      </>
    );
  };
  
  export default TempData;
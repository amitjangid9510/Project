import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Home() {

  const[dataa , setdata ]=useState([])
  const[TodayBirthday , setTodayBirthday ]=useState([])
  const[hidden , sethidden ]=useState("")
  const[NetxMonth , setNetxMonth ]=useState([])
  const today = new Date();

  const currentDate = today.getDate();
  const currentYear = today.getFullYear()

  function calculateDaysLived(day, month, year) {
    const birthDate = new Date(year, month - 1, day);
    const currentDatee = new Date(); 
    const differenceMs = currentDatee - birthDate;
    const daysLived = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    return daysLived;
  }

  function daysUntilFutureEvent(day, month, year) {
    const currentDate = new Date();
    const futureEventDate = new Date(year, month - 1, day); 
    const differenceInMilliseconds = futureEventDate.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(differenceInMilliseconds / (1000 * 3600 * 24));
    return daysLeft;
}


  const getPost = async() => { 
    try {
       const response = await axios.post('/api/getpost')
       const response2 = await axios.post('/api/getNextMonthPost')
       setNetxMonth(response2.data.data)
        const filterdPoste = response.data.data.filter((item )=> (item.birthDate > currentDate))
        setdata(filterdPoste)
        const TodayPoste = response.data.data.filter((item )=> (item.birthDate == currentDate))
        setTodayBirthday(TodayPoste)
        if (TodayPoste.length == 0) {
          sethidden("hidden")
        }
    } catch (error) {
      console.log(error);
    }
  }
    useEffect(()=>{
      getPost()

    },[])
    
  return (
  <div>
        <div className="min-h-screen bg-slate-300 p-6 ">
        <div className="lg:text-3xl font-bold text-black rounded-md m-4 mb-8 text-2xl ">Today's Birthday {":)"}</div>
        <div className={`${hidden} bg-slate-500 rounded-md p-7 shadow-lg m-5` }>
        <ul className=" m-4 grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {TodayBirthday.map((item)=> (<li key={item.phoneNumber}><div className="rounded-xl bg-white p-4 shadow-lg">
            <img src={`${item.avatar}`} alt={`${item.firstname}`} className="mx-auto mb-4 rounded-full object-cover object-center h-32 w-32" />
            <h2 className="text-xl text-center m-2">{item.firstname}{" "}{item.lastname}</h2>
            <div className="mb-2 text-Black font-semibold text-center text-green-500 ">Lived {calculateDaysLived(item.birthDate, item.birthMonth,item.birthYear)} Days</div>
          </div></li>))}
          
        </ul>

        </div>
        <div className="lg:text-3xl font-bold text-Black rounded-md m-4 mb-8 text-2xl ">Upcoming This Month Birthday's :</div>
     <div className={` bg-slate-500 rounded-md p-7 shadow-lg m-5` }>
    <ul className=" m-4 grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {dataa.map((item)=> (<li key={item.phoneNumber}><div className="rounded-xl bg-white p-4 shadow-lg">
        <img src={`${item.avatar}`} alt={`${item.firstname}`} className="mx-auto mb-4 rounded-full object-cover object-center h-32 w-32" />
        <h2 className="text-xl text-center m-2">{item.firstname}{" "}{item.lastname}</h2>
        <div className="mb-2 text-Black text-center"><strong>B-day :</strong> {item.birthDate}-{item.birthMonth}-{item.birthYear}</div>
        <div className="mb-2 text-Black font-semibold text-center  text-red-400 ">Birthday in Next {item.birthDate-currentDate} Days</div>
      </div></li>))}
    </ul>
    </div>

 
    <div className="lg:text-3xl font-bold text-Black rounded-md m-4 mb-8 text-2xl ">Upcoming Next Month Birthday's :</div>
  <div className={` bg-slate-500 rounded-md p-7 shadow-lg m-5` }>
    <ul className=" m-4 grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {NetxMonth.map((item)=> (<li key={item.phoneNumber}><div className="rounded-xl bg-white p-4 shadow-lg">
        <img src={`${item.avatar}`} alt={`${item.firstname}`} className="mx-auto mb-4 rounded-full object-cover object-center h-32 w-32" />
        <h2 className="text-xl text-center m-2">{item.firstname}{" "}{item.lastname}</h2>
        <div className="mb-2 text-Black text-center"><strong>B-day :</strong> {item.birthDate}-{item.birthMonth}-{item.birthYear}</div>
        <div className="mb-2 text-Black font-semibold text-center  text-red-400 ">Birthday in Next {daysUntilFutureEvent(item.birthDate, item.birthMonth,currentYear)} Days</div>
      </div></li>))}
    </ul>
    </div>

  </div>

    </div>
  )
}

export default Home








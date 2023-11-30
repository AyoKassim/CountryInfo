'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Component } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import World from "../public/World.png";

const fetch = require('node-fetch');

export default function Page() {
  const router = useRouter();
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState("Loading")
  header('Access-Control-Allow-Origin: *')
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("https://country-info-rosy.vercel.app/country")
    .then(
      response => response.data
    )
    .then(
      data => {
        console.log(data);
        setMessage(data.message);
      }
    )
  })

/*   const { data, error, isLoading } = useSWR(
    'http://localhost:9000/country',
    fetcher
  )

  if (error){
    return (
      <p> Failed </p>
    )
  }

  if (isLoading){
    return (
      <p> Loading... </p>
    )
  } */


  const handleForm = async (e) => {
    e.preventDefault();

  
    await axios.post('https://country-info-rosy.vercel.app/country', {country})
    .then(response => console.log('Posting: ', response.data))
    .catch(err => console.log(err))


    console.log(country);
    //return router.push("/Results");
    return router.push("/CountryDetails");
  }

  const submitCountry = async (e) => {
    e.preventDefault();
    
    await axios.post('https://country-info-rosy.vercel.app/country', {country})
    .then(response => console.log('Posting: ', response.data))
    .catch(err => console.log(err))

  }


  return(
    <>
    <div style={{
      backgroundImage: `url(${World.src})`,
      backgroundSize: "cover",
      width: "100%",
      height: "100vh"
    }}>

    <div>
      <h1> Learn Countries </h1>
    </div>

    <div className='searchContainer'>
      <h6> Enter a country and get information about the country</h6>

    <div className='searchForm'>
      <form onSubmit={handleForm} method='POST'>
        <input className='searchFormInput' type='text' placeholder='Input country..' name='country' value={country} onChange={e => setCountry(e.target.value)}/>
        <button className='searchButton'> Search </button>
      </form>
    </div>
    </div>

    </div>
    </>
  )
}

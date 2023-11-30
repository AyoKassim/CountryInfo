'use client'

import React, { Component } from 'react';
import { useRouter } from 'next/navigation';
import { us, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';

const LoadData = async () => {
    const countryResponse = await axios.get("https://country-info-rosy.vercel.app/countryinfo");
    console.log(countryResponse);
    return countryResponse;
}

function CountryDetails(){
    const { data, error } = useSWR('details', LoadData)

    if (error){
        console.log(error);
        return(
            <>
            <div>
                <p> Not Found... </p>
            </div>
            </>
        )
    }
    
    if (!data){
        return(
            <>
            <div>
                <p> Loading... </p>
            </div>
            </>
        )
    }

    if (data.data.status != 200 && data.data.data.message == "Not Found" || data.data.data.message == "Page Not Found"){
    return(
        <>
        <div className='' >

                        
            <h2 className='text-red-400'> Couldn't Find Data </h2>
            <p className='text-red-400'> Please ensure you input a valid country name. </p>
            <div>
                <Link href="/">
                    Back to Main Page
                </Link>
            </div>
            
        </div>
        </>
    )
    } /* else if (data.status != 200) {
        return (
            <>
            <h2> Couldn't Find Data </h2>
            <div>
                <Link href="/">
                    Back to Main Page
                </Link>
            </div>
            </>
        )
    } */

    else {
        const currency = Object.values(data.data.data[0].currencies);
        const languages = Object.values(data.data.data[0].languages).join(", ");
        return(
            <div >
            <h1>Result Page</h1>
            <div className='countries' id='countries'>
            <p>The country you searched for is: {data.data.data[0].name.common}</p>
            <p>{data.data.data[0].name.common} is in: {data.data.data[0].continents}</p>
            <p>{data.data.data[0].name.common}'s capital city is: {data.data.data[0].capital}</p>
            <p>Languages spoken in {data.data.data[0].name.common}: {languages}</p>
            <p>The currency used in {data.data.data[0].name.common} is: {currency[0].name} ({currency[0].symbol})</p>
            <p>The population size of {data.data.data[0].name.common} is: {data.data.data[0].population}</p>
            <p>{data.data.data[0].name.common} has an area of: {data.data.data[0].area}km²</p>
            </div>
            <Link href={data.data.data[0].maps.googleMaps} target='_blank'>
                See Map
            </Link>
  {/*           <Image src={data.data.data[0].flags.png} width={500} height={500} /> */}
            <div>
                <Link href="/">
                    Back to Main Page
                </Link>
            </div>
        </div>
        )
    }
}

export default CountryDetails;

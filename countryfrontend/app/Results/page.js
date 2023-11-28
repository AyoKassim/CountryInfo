'use client'

import React, { Component } from 'react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

const LoadData = async () => {
    const countryResponse = await axios.get("http://localhost:9000/countryinfo")
    return countryResponse;
}

class CountryResults extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            name: '',
            capital: '',
            population: '',
            currencies: '[]',
            currencyName: '',
            currencySymbol: '',
            png: '',
            area: '',
            region: '',
            continent: '',
            map: ''
        })
    }


    getData(){
        axios.get("http://localhost:9000/countryinfo")
        .then(
          res => res.data
        )
        .then(
          data => {
            console.log(data);
            this.setState({
                name: data.data[0].name.common,
                capital: data.data[0].capital,
                currencies: Object.keys(data.data[0].currencies)[0],
                currencyName: data.data[0].currencies[Object.keys(data.data[0].currencies)].name,
                currencySymbol: data.data[0].currencies[Object.keys(data.data[0].currencies)].symbol,
                population: data.data[0].population,
                area: data.data[0].area,
                map: data.data[0].maps.googleMaps,
                png: data.data[0].flags.png,
                region: data.data[0].region,
                continent: data.data[0].continents[0]
            });
          }
        ) 
    }


    componentDidMount(){
/*         axios.get("http://localhost:9000/countryinfo")
        .then(
          res => res.data
        )
        .then(
          data => {
            console.log(data);
            this.setState({
                name: data.data[0].name.common,
                capital: data.data[0].capital,
                currencies: Object.keys(data.data[0].currencies)[0],
                currencyName: data.data[0].currencies[Object.keys(data.data[0].currencies)].name,
                currencySymbol: data.data[0].currencies[Object.keys(data.data[0].currencies)].symbol,
                population: data.data[0].population,
                area: data.data[0].area,
                map: data.data[0].maps.googleMaps,
                png: data.data[0].flags.png,
                region: data.data[0].region,
                continent: data.data[0].continents[0]
            });
          }
        ) */
        this.getData();

    }



    render() {
        const { state } = this.state;

/*         if (validData == false){
            return(
                <div>
                    <p> Country Not Found.. </p>
                    <Link href="/">
                        Back to Main Page
                    </Link>
                </div>
            )
        } else { */
        return(
            <div >
                <h1>Result Page</h1>
                <div className='countries' id='countries'>
                <p>The country you searched for is: {this.state.name}</p>
                <p>{this.state.name} is in: {this.state.continent}</p>
                <p>{this.state.name}'s capital city is: {this.state.capital}</p>
                <p>The currency used in {this.state.name} is: {this.state.currencyName}, {this.state.currencies}({this.state.currencySymbol})</p>
                <p>The population size of {this.state.name} is: {this.state.population}</p>
                <p>{this.state.name} has an area of: {this.state.area}km²</p>
                </div>
                <Link href={this.state.map} target='_blank'>
                    See Map
                </Link>
                {/* <Image src='${this.state.png}' width={500} height={500} /> */}
                <div>
                    <Link href="/">
                        Back to Main Page
                    </Link>
                </div>
            </div>
        )
/*         } */
    }
}

export default CountryResults;
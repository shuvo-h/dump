import { useRef } from 'react';
import { CountryType } from '../types/dataTypes';

type CpuntryListProp = {
    country : CountryType,
    countryHandler: (country) => void
}

const Country = ({country,countryHandler}:CpuntryListProp) => {
    
    return (
        <div className='country' onClick={()=>countryHandler(country)}>
            <span>{country.emoji}</span>
            <span>{country.name}</span>
            <span className='phone_code'>+{country.phone}</span>
        </div>
    );
};

export default Country;
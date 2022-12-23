import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { CountryType } from "../types/dataTypes";
import Country from "./Country";

import { SlArrowDown } from "react-icons/sl";
import useElementVisiable from "../hooks/useElementVisiable";

const PhoneNumberForm = () => {
  const { elementRef, isVisiable, setIsVisiable, handleClickInSideElement } =
    useElementVisiable(false);
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [filteredCountries, setfilteredCountries] = useState<CountryType[]>([]);
  const [countriesErr, setCountriesErr] = useState("");

  const [country, setCountry] = useState<CountryType>({} as CountryType);
  const [phone, setPhone] = useState<string>("");
  const [phoneErr, setPhoneErr] = useState<string>("");

  useEffect(() => {
    const countriesBody = {
      query: `
                query{
                    countries{
                        code
                        name
                        phone
                        emoji
                        emojiU
                    }
                }
            `,
    };
    fetch("https://countries.trevorblades.com/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(countriesBody),
    })
      .then((res) => res.json())
      .then((data) => {
        setCountries(data?.data?.countries);
        setfilteredCountries(data?.data?.countries);
        setCountry(data?.data?.countries[0]);
        setPhone(`+${data?.data?.countries[0].phone} `);
      })
      .catch((err) => {
        console.log(err);
        setCountriesErr(err.message);
      });
  }, []);

  const countryHandler = (countryDetails: CountryType) => {
    setCountry(countryDetails);
    setPhone(`+${countryDetails.phone} `);
    setPhoneErr("");
    setIsVisiable(false);
  };
  

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry({ ...country, name: e.target.value });
    const filteredCountryList = countries.filter(
      (countryEl) =>
        countryEl.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
    );
    
    setfilteredCountries(filteredCountryList);
  };

  const onChangePhoneHandler = (e: React.ChangeEvent<HTMLInputElement>) =>{
      setPhone(e.target.value);
      setPhoneErr("");
  }
  
  
 
  const phoneNumberBlurHandler = async() =>{
    const phoneValidateRegex = /^\+[1-9]\d{1,14}$/;
    
    if (phone.replace(/\s/g, '').length > 5 && phoneValidateRegex.test(phone.replace(/\s/g, ''))) {
        const verifyResult = await validatePhone(phone);
        console.log(verifyResult);
        if (verifyResult.message) {
            setPhoneErr(verifyResult.message)
        }
    }else{
        setPhoneErr("Invalid Phone number!")
    }
  }
  
  const validatePhone = async(phone:string) =>{
    const auth = {
        SID: process.env.REACT_APP_TWILIO_SID ?? "",
        AuthToken: process.env.REACT_APP_TWILIO_AUTH_TOKEN?? ""
    }
    try {
        const req = await fetch(`https://lookups.twilio.com/v1/PhoneNumbers/${phone}`,{
            headers: {
                'Authorization': 'Basic ' + btoa(`${auth.SID}:${auth.AuthToken}`)
            }
        })
        const result = await req.json();
        return result;
    } catch (error:any) {
        console.log(error);
        setPhoneErr(error.message);
        
    }
  }


  return (
    <section className="formContainer">
      <form>
        <div className="field_box">
          <div
            className="input_field country_input"
            ref={elementRef}
            onClick={handleClickInSideElement}
          >
            <label
              className="input_label"
              style={{ top: country.name || isVisiable ? "-12px" : "14px", fontSize: country.name || isVisiable ? "14px" : "18px"  }}
            >Country</label>
            <input
              type="text"
              value={country.name ?? ""}
              onChange={onChangeInputHandler}
              required
            />
            <span className="arrowIcon_wrapper">
              <span className="arrowIcon">
                <IconContext.Provider
                  value={{ color: "grey", className: "global-class-name" }}
                >
                  <SlArrowDown />
                </IconContext.Provider>
              </span>
            </span>
          </div>
          <div
            className="countryList_wrapper"
            style={{ display: isVisiable ? "block" : "none" }}
          >
            <div className="countryList">
              {filteredCountries.map((country, idx) => (
                <Country
                  country={country}
                  countryHandler={countryHandler}
                  key={country.code}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="field_box">
            <div className="input_field">
                <label className="input_label" style={{fontSize:"14px"}}>Phone Number</label>
                    <input
                        type="tel"
                        onChange={onChangePhoneHandler}
                        onBlur={phoneNumberBlurHandler}
                        value={phone}
                        required
                    />
            </div>
            <p style={{color:"red", margin:0,minHeight:"25px", fontSize:"13px"}}>{phoneErr}</p>
        </div>

        <div className="keepsign_check">
          <input type="checkbox" name="" id="" />
          <label htmlFor="">Keep me signed in</label>
        </div>
        <div>
          <p style={{ color: "red" }}>{countriesErr}</p>
        </div>
        <button className="btn next_btn">Next</button>
        <button className="btn qr_btn">Log in by QR Code</button>
      </form>
    </section>
  );
};

export default PhoneNumberForm;


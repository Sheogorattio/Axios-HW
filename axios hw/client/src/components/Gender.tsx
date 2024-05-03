import { useState, useEffect } from "react";

interface GenderType {
    male: boolean,
    female: boolean
}

interface GenderProps {
    handleGenderSelect: (gender: GenderType) => void
}

function Gender({handleGenderSelect}:GenderProps) {

    const [maleCheck, setMaleCheck] = useState(false);
    const [femaleCheck, setFemaleCheck] = useState(false);

    useEffect(()=>{
        const gender: GenderType = {
            male: maleCheck,
            female: femaleCheck
        }
        if(maleCheck){
            gender.male = true;
        }else if(femaleCheck){
            gender.female = true;
        }
        handleGenderSelect(gender)
    },[maleCheck, femaleCheck])
  return (
    <div  style={{margin:10}} className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                <input type="checkbox" checked={maleCheck} className="btn-check" id="btncheck1" onChange={(e)=>{
                    setMaleCheck(Boolean(e.target.value));
                    setFemaleCheck(false)
                }}/>
                <label className="btn btn-outline-primary" htmlFor="btncheck1">Male</label>

                <input type="checkbox" checked={femaleCheck} className="btn-check" id="btncheck2" onChange={(e)=>{
                    setFemaleCheck(Boolean(e.target.value))
                    setMaleCheck(false)
                }}/>
                <label className="btn btn-outline-primary" htmlFor="btncheck2">Female</label>
            </div>
  )
}

export default Gender;
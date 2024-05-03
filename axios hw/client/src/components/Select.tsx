import { useState, useEffect } from "react"

interface SelectProps {
  handleRoleSelect: (role: string) => void;
}

function Select({handleRoleSelect}:SelectProps) {
    const options = [
        'admin',
        'manager',
        'user' 
    ]

    const [selectedOption, setSelectedOption] = useState(" ");

    useEffect(() => {
        handleRoleSelect(selectedOption);
    }, [selectedOption]);

  return (
        <select className="form-select" onChange={(e) => {setSelectedOption(e.target.value);}}>
            <option disabled selected value="Select role"> Select role </option>
            {options.map((option)=>{
                return(
                    <option key={option} value={option}> {option} </option>
                )
            })}
        </select>
  )
}


export default Select;
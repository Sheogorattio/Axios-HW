import { useState } from "react";
import axios from "axios";
import Select from "./Select";
import Gender from "./Gender";
import EditForm from "./EditForm";

interface GenderType {
    male: boolean;
    female: boolean;
}

function Form() {
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");

    const [gender, setGender] = useState<GenderType>( {
        male: false,
        female: false,
    })
    const [role, setRole] = useState(' ');

    function handleRoleSelect(data:string){
        setRole(data);
    }

    function handleGenderSelect(genderData:GenderType){
        setGender(genderData);
    }

    function sendData(){
        axios.post("http://localhost:3000/users",
            {
                email: email,
                login: login,
                role: role,
                gender: gender.male? "male" : gender.female ? "female" : "undefined"
            })
    }
  return (
    <div>
        <div>
            <p>Email: {email}</p> 
            <p>Login: {login}</p>
            <p>Role: {role}</p>
            <p>Gender: {gender.male? "male" : gender.female ? "female" : ""}</p>
        </div>
        <hr />
        <div className="d-flex">
            <form className="col-6" onSubmit={sendData}>
                <div style={{marginTop:10}}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>setEmail(e.target.value)}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Login</label>
                        <input type="text" className="form-control" name='login' id="exampleInputLogin" onChange={(e)=>setLogin(e.target.value)}/>
                    </div>
        
                    <Select handleRoleSelect = {handleRoleSelect} ></Select>
        
                    <Gender handleGenderSelect = {handleGenderSelect}></Gender>
        
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div style={{ background: "#ced4da", width: 1.6, marginLeft:10, marginRight: 10}}></div>
            <EditForm></EditForm>
        </div>
    </div>
  )
}

export default Form;

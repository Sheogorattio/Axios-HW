import { useState,useEffect } from "react";
import axios from "axios";

interface User{
    id: string,
    email: string,
    login: string,
    role: string,
    gender: string
}

function EditForm() {
    const [email, setEmail] = useState(" ");
    const [login, setLogin] = useState(" ");
    const [userId, setUserId] = useState('');
    const [userData,setUserData] = useState<User>();
    const [prohibitEdit, setProhibitEdit] = useState(true);

    function sendData(){
        axios.put(`http://localhost:3000/users/${userId}`,
            {
                email: email,
                login: login,
                role: userData?.role,
                gender: userData?.gender
            }
        )
    }

    function loadData(){
         
         axios.get(`http://localhost:3000/users/${userId}`).then(r => {
           if(Number(r.status )!= 200 ){
            console.log("ERROR")
            setUserData({
                id: " ",
                email: " ",
                login: " ",
                role: " ",
                gender: " "
            });
           }
            else
            {
                const userD = r.data;
                setUserData(userD)
            }});
         
         console.log(userId);
    }

    useEffect(()=>{
        if(userData && userId.length >0){
            setProhibitEdit(false);
            setLogin(String(userData?.login));
            setEmail(String(userData?.email));
            console.log(userData);
        }
        else{
            setProhibitEdit(true);
        }
    },[userData])
  return (
    <div>
        <div className="d-flex">
            <label htmlFor="userIdInput" className="form-label">User Id</label>
            <input type="text" className="form-control" name='userIdInput' id="userIdInput" onChange={(e)=>setUserId(e.target.value)}/>
            <button onClick={loadData}>Load</button>
        </div>
        <form onSubmit={sendData}>
            <div style={{marginTop:10}}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>setEmail(e.target.value)}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputLogin" className="form-label">Login</label>
                    <input type="text" className="form-control" name='login' id="exampleInputLogin" onChange={(e)=>setLogin(e.target.value)}/>
                </div>
            </div>
            <button disabled={prohibitEdit} type="submit" className="btn btn-primary" onClick={sendData}>Submit</button>
        </form>
    </div>
  )
}


export default EditForm;
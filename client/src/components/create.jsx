import React, { useState } from 'react';   
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Create(){
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic here
      console.log('Email:', email);
      axios.post("https://curd-simple-frontend.vercel.app/create", {name,age,email})
      .then(result => {
        console.log(result);
        navigate('/')
      })
      .catch(err => console.log(err))
      
    };
    return(
        <div style={{background:'black',width:'100%',height:'100vh', padding:'30px'}}>
            <div className="container ">
      <div className="row justify-content-center ">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body bg-dark">
              <h3 className="card-title text-center text-light">Add</h3>
              <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="name" className="form-label text-light">Name</label>
                  <input
                    type="name"
                    className="form-control bg-dark text-light"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-light">Email address</label>
                  <input
                    type="name"
                    className="form-control bg-dark text-light"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-light">Age</label>
                  <input
                    type="name"
                    className="form-control bg-dark text-light"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
    )
}
export default Create
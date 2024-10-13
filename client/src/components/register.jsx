import React, { useState, useEffect } from 'react';   
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

  

    const handleSubmit = (e) => {
        e.preventDefault();
        const registerUser = {name, email, password };
        axios.post("http://localhost:8000/register", registerUser)
        .then(result => {
          console.log(result);
          
    })
    .catch(err => console.log(err));
    };
    return (
        <div style={{ background: 'black', width: '100%', height: '100vh', padding: '30px' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body bg-dark">
                                <h3 className="card-title text-center text-light">Register</h3>
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
                                    </div><div className="mb-3">
                                        <label htmlFor="email" className="form-label text-light">Email</label>
                                        <input
                                            type="email"
                                            className="form-control bg-dark text-light"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label text-light">Password</label>
                                        <input
                                            type="password"
                                            className="form-control bg-dark text-light"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3 ">
                                        <Link to="/forgot-password" className="text-light">
                                            Already have an Account
                                        </Link>
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                                    
                                </form>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;

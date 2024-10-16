import React, { useState, useEffect } from 'react';   
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Update() {
    const { id } = useParams();
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://3.27.186.9:8000/user/${id}`)
            .then(result => {
                const user = result.data;
                setEmail(user.email);
                setAge(user.age);
                setName(user.name);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = { name, email, age };
        axios.put(`http://3.27.186.9:8000/userUpdate/${id}`, updatedUser)
            .then(() => {
                console.log('User updated successfully');
                navigate('/');
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
                                <h3 className="card-title text-center text-light">Update</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label text-light">Name</label>
                                        <input
                                            type="text"
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
                                            type="email"
                                            className="form-control bg-dark text-light"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="age" className="form-label text-light">Age</label>
                                        <input
                                            type="number"
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
    );
}

export default Update;

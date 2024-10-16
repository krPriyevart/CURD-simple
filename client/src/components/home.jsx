import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://54.79.149.229:8000')
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));
    }, []);
    const handleDelete = (id) => {
        //console.log("id is : " + id);
        axios.delete(`http://54.79.149.229:8000/userDelete/${id}`)
            .then(() => {
                setUsers(users.filter(user => user._id !== id));
            })
            .catch(err => console.log(err));
    };
    return (
        <div style={{ background: 'black', width: '100%', height: '100vh' }}>
            <table className="table table-hover table-dark">
                <thead>
                    <tr>
                        <th scope="col"><Link to="/create" className="btn btn-success">Add+</Link></th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <th scope="row">{user.i}</th>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>{user.email}</td>
                            <td>
                                <button type="button" className="btn btn-danger px-4 m-2" onClick={(e) => handleDelete(user._id)}>Delete</button> 
                                <Link to={`/update/${user._id}`}>
                                    <button type="button" className="btn btn-primary px-4 m-2">Edit</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;

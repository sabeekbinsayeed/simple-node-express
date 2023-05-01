import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const user = useLoaderData()
    const [display, setDisplay] = useState(user)

    const handleDelete = (us) => {
        const agree = window.confirm(`are you sure to delete ${us.name}`)
        if (agree) {
            // console.log('deleting user with id: ', user._id)
            fetch(`http://localhost:5000/users/${us._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if (data.deletedCount > 0) {
                        alert('User deleted successfully.');
                        const remainingUsers = display
                            .filter(usr => usr._id !== us._id);
                        setDisplay(remainingUsers);
                    }
                });
        }
    }

    return (
        <div>
            <h1>thome</h1>
            {
                display.map(us =>
                    <div key={us._id}>
                        <p>{us.name}  {us.email} <Link to={`update/${us._id}`}> update</Link> <button onClick={() => handleDelete(us)}>X</button>

                        </p>
                    </div>)
            }
        </div >
    );
};

export default Home;
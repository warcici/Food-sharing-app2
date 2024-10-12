import React, { useEffect, useState } from 'react';
import ClientProfile from './ClientProfile';
import ChefProfile from './ChefProfile';

const Profile = () => {
    const [role, setRole] = useState('');

    useEffect(() => {
        // Fetch user data to get the role
        const fetchUserRole = async () => {
            const response = await fetch('http://localhost:5000/users/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setRole(data.role);
        };

        fetchUserRole();
    }, []);

    return (
        <div>
            {role === 'client' && <ClientProfile />}
            {role === 'chef' && <ChefProfile />}
        </div>
    );
};

export default Profile;

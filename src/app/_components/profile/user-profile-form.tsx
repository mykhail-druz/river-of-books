'use client'

import React, {useState, useEffect} from 'react';
import {User} from "@prisma/client";

const UserProfileForm = ({user}: { user: User }) => {
    const [userData, setUserData] = useState({
        name: user.name,
        password: user.password ? user.password : '',
        email: user.email,
        description: user.description ? user.description : '',
        image: user.image,
    });

    // State to track edit mode
    const [isEditMode, setEditMode] = useState(false);
    const [originalUserData, setOriginalUserData] = useState({ ...userData });

    // Function to handle form submission (update user data)
    const handleSubmit = async () => {
        const updatedUserData = {...userData, id: user.id};
        try {
            const response = await fetch('/api/user', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUserData),
            });

            if (response.ok) {
                setEditMode(false);
                setOriginalUserData({ ...userData });
            } else {
                console.error("Failed to update profile!");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Function to handle input changes in edit mode
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const {name, value} = e.target;

        // Update the userData state with the new value for the changed input
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    const handleCancel = () => {
        setEditMode(false);
        // Reset the form data to the original state
        setUserData({ ...originalUserData });
    };

    return (
        <div className="flex min-h-screen flex-col items-center p-24">
            <form className="bg-white p-8 rounded shadow-md">
                {Object.entries(userData).map(([key, value]) => (
                    <div className="mb-4" key={key}>
                        <label className="block text-gray-600 text-sm font-semibold mb-2">{key}</label>
                        <input
                            className={`w-full px-3 py-2 border ${isEditMode ? 'border-black' : 'border-gray-300'} 
                          rounded focus:outline-none focus:ring focus:border-blue-500`}
                            type={isEditMode ? 'text' : 'text'} // Change input type based on edit mode
                            name={key}
                            value={value}
                            readOnly={!isEditMode}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                {isEditMode ? (
                    <div className="menu bg-base-200 w-full rounded-box">
                        <button type="button" className="btn rounded-full" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button type="button" className="btn rounded-full" onClick={handleSubmit}>
                            Save
                        </button>
                    </div>
                ) : (
                    <button className="btn rounded-full w-full" onClick={() => setEditMode(true)}>
                        Edit
                    </button>
                )}
            </form>
        </div>
    );
};

export default UserProfileForm;

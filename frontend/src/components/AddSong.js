import React, { useState } from 'react';
import axios from 'axios';

const AddSong = ({ refreshSongs }) => {
    const [formData, setFormData] = useState({ title: '', artist: '', duration: '' });

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:5000/songs', formData, {
                headers: { Authorization: token }
            });
            setFormData({ title: '', artist: '', duration: '' }); // Clear the form
            refreshSongs(); // Refresh song list after successful addition
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="title" value={formData.title} onChange={onChange} placeholder="Title" required />
            <input type="text" name="artist" value={formData.artist} onChange={onChange} placeholder="Artist" required />
            <input type="text" name="duration" value={formData.duration} onChange={onChange} placeholder="Duration (e.g. 3:45)" required />
            <button type="submit">Add Song</button>
        </form>
    );
};

export default AddSong;

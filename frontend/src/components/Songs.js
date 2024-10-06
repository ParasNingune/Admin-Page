// src/Songs.js
import React from 'react';
import { Link } from 'react-router-dom';

const Songs = ({ songs }) => {
    return (
        <div>
            <h2>Your Songs</h2>
            {songs.length === 0 ? (
                <p>No songs available. Add some!</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs.map((song) => (
                            <tr key={song._id}>
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                                <td>
                                    <Link
                                        to={`/edit-song/${song._id}`}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Edit
                                    </Link>
                                    {/* Add Delete functionality as needed */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Songs;

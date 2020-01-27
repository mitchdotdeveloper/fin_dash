import React, { useState, useEffect } from 'react';
import '../../styles/profile.css';

const Profile = ({ user }) => {
  return (
    <div className="profile-container">
      <div className="name-card">{user.first_name + ' ' + user.last_name}</div>
      <button className="edit-profile card">edit</button>
    </div>
  );
};

export default Profile;

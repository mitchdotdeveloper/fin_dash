import React, { useState, useEffect } from 'react';
import '../../styles/profile.css';

const Profile = ({ user }) => {
  return (
    <div className="profile-container">
      <div className="card name">{user.first_name + ' ' + user.last_name}</div>
      <button className="card edit-profile">edit</button>
    </div>
  );
};

export default Profile;

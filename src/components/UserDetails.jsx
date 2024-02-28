import React from "react";
import PropTypes from "prop-types";

const UserDetails = ({ userDetails }) => (
  <div>
    <h2>User Details</h2>
    <img
      src={userDetails.avatar_url}
      alt="Avatar"
      style={{ width: 100, borderRadius: "50%" }}
    />
    <p>Name: {userDetails.name || "N/A"}</p>
    <p>Location: {userDetails.location || "N/A"}</p>
    <p>Bio: {userDetails.bio || "N/A"}</p>
  </div>
);

UserDetails.propTypes = {
  userDetails: PropTypes.shape({
    avatar_url: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
};

export default UserDetails;

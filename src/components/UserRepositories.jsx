import React from "react";
import PropTypes from "prop-types";

const UserRepositories = ({ userRepos }) => (
  <div>
    <h2>User Repositories</h2>
    <ul>
      {userRepos.map((repo) => (
        <li key={repo.id}>{repo.name}</li>
      ))}
    </ul>
  </div>
);

UserRepositories.propTypes = {
  userRepos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UserRepositories;

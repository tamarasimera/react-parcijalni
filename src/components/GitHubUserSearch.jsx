import React, { Component } from "react";
import UserDetails from "./UserDetails";
import UserRepositories from "./UserRepositories";

class GitHubUserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userDetails: null,
      userRepos: [],
      users: [],
      selectedUser: null,
    };
  }

  handleChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username } = this.state;
    try {
      const usersResponse = await fetch(
        `https://api.github.com/search/users?q=${username}&per_page=50`
      );
      const usersData = await usersResponse.json();
      this.setState({
        users: usersData.items,
        userDetails: null,
        userRepos: [],
        selectedUser: null,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  handleUserClick = async (user) => {
    this.setState({ userDetails: null, userRepos: [] });
    try {
      const userDetailsResponse = await fetch(user.url);
      const userDetails = await userDetailsResponse.json();
      const userReposResponse = await fetch(userDetails.repos_url);
      const userRepos = await userReposResponse.json();
      this.setState({ userDetails, userRepos, selectedUser: user });
    } catch (error) {
      console.error("Error fetching user details and repos:", error);
    }
  };

  render() {
    const { username, userDetails, userRepos, users, selectedUser } =
      this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="search-form">
          <label htmlFor="username">GitHub username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={this.handleChange}
            placeholder="Enter GitHub username"
          />
          <button type="submit">GO!</button>
        </form>
        <div className="users-container">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => this.handleUserClick(user)}
              className="user-card"
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="user-avatar"
              />
              <p>{user.login}</p>
            </div>
          ))}
        </div>
        {selectedUser && userDetails && (
          <UserDetails userDetails={userDetails} />
        )}
        {selectedUser && userRepos.length > 0 && (
          <UserRepositories userRepos={userRepos} />
        )}
      </div>
    );
  }
}

export default GitHubUserSearch;

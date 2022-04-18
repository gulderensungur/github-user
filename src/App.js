import React, { useState } from "react";
import {
  BsFillSunFill,
  BsTwitter,
  BsLink45Deg,
  BsGithub,
  BsSearch,
} from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import "./reset.css";
import "./App.css";

import Octocat from "./Octocat.jpg";

function App() {
  const [userObject, setUserObject] = useState({});
  const [username, setUsername] = useState("");
  //toLocaleDateString()
  const onChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const onClickHandler = () => {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setUserObject(data);

        setUserObject({
          ...data,
          createdDate: new Date(data.created_at).toLocaleDateString(),
        });
      });
  };

  const onThemeSwitcher = (event) => {
    event = document.body;
    event.classList.toggle("light-theme");
  };

  return (
    <div className="container">
      <div className="inner-container">
        <header className="app-header">
          <div className="logo">devfinder</div>
          <div className="theme-switcher">
            <button onClick={onThemeSwitcher}>
              Light
              <BsFillSunFill />
            </button>
          </div>
        </header>
        <div className="search-wrapper">
          <span className="search-input-wrapper">
            <BsSearch />
            <input
              type="text"
              onChange={onChangeHandler}
              placeholder="Search Github username"
            />
          </span>
          <button className="search-button" onClick={onClickHandler}>
            Search
          </button>
        </div>
        <main>
          <div className="user-img">
            <img
              src={userObject.avatar_url ? userObject.avatar_url : Octocat}
              alt=""
            />
          </div>
          <div className="user-info">
            <div className="user-info-header">
              <div className="user-name">
                <h2>{userObject.name ? `${userObject.name}` : "not found"}</h2>
                <p>@{userObject.login}</p>
              </div>
              <div className="join-date">
                <p>
                  {userObject.created_at
                    ? `Joined ${userObject.createdDate}`
                    : ""}
                </p>
              </div>
            </div>
            <div className="user-bio">
              <p>
                {userObject.bio
                  ? `${userObject.bio}`
                  : "This profile has not bio"}{" "}
              </p>
            </div>
            <div className="metrics">
              <div className="user-metric-item">
                <h5 className="metric-header">Repos</h5>
                <p className="metric-number">
                  {userObject.public_repos ? `${userObject.public_repos}` : "0"}
                </p>
              </div>
              <div className="user-metric-item">
                <h5 className="metric-header">Followers</h5>
                <p className="metric-number">
                  {userObject.followers ? `${userObject.followers}` : "0"}
                </p>
              </div>
              <div className="user-metric-item">
                <h5 className="metric-header">Following</h5>
                <p className="metric-number">
                  {userObject.following ? `${userObject.following}` : "0"}
                </p>
              </div>
            </div>
            <div className="user-meta">
              <div className="user-meta-item">
                <ImLocation />
                <p>San Francisco</p>
              </div>
              <div className="user-meta-item">
                <BsTwitter />
                <p>Not Avaliable</p>
              </div>
              <div className="user-meta-item">
                <BsLink45Deg />
                <p>https://github.blog</p>
              </div>
              <div className="user-meta-item">
                <BsGithub />
                <p>@github</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

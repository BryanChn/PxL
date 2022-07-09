import React from "react";
import Login from "../components/Login/Login";
import { UidContext } from "../components/AppContext";
import { useContext } from "react";

const Profil = () => {
  // check if user jtw token is valid for user
  const Uid = useContext(UidContext);

  return (
    <div className="profil-page">
      {Uid ? (
        <h1>Profil</h1>
      ) : (
        <div className="log-container">
          <Login signin={false} signup={true} />
          <div className="img-container">
            <img src="./img/log.svg" alt="logo" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;

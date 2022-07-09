import axios from "axios";
import React, { useEffect, useState } from "react";
import { UidContext } from "./components/AppContext";
import Routers from "./components/Routes/index";
import { Back } from "./env";

const App = () => {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      await axios
        .get(Back + "jwtid", { withCredentials: true })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchToken();
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routers />
    </UidContext.Provider>
  );
};

export default App;

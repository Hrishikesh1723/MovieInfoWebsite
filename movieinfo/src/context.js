import React, { useContext, useEffect, useState } from "react";
const AppContext = React.createContext();

const API_URL = `http://www.omdbapi.com/?apikey=727bbdc1&s=titanic`

//provider function
const AppProvider = ({ children }) => {
  const [isLoading, setIsloading] = useState(true);
  const [movie, setMovie] = useState([ ]);
  const [isError, setIsError] = useState({ show: "false", msg: ""});

  const getMovies = async (url) =>{
    try{
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if(data.Response === "True") {
        setIsloading(false);
        setMovie(data.Search);
      } else {
        setIsError({
          show: true,
          msg: data.error,
        });
      }
    }catch(error){
      console.log(error)
    }

  }

  useEffect(() => {
    getMovies(API_URL);
  }, []);

  return <AppContext.Provider value={{isLoading, isError, movie}}>
      {children}
    </AppContext.Provider>;
};

//Global custom hooks
const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext };
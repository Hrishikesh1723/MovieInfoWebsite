import React, { useContext, useEffect, useState } from "react";
const AppContext = React.createContext();

const API_URL = process.env.REACT_APP_API_KEY

//provider function
const AppProvider = ({ children }) => {
  const [isLoading, setIsloading] = useState(true);
  const [movie, setMovie] = useState([ ]);
  const [isError, setIsError] = useState({ show: "false", msg: ""});
  const [query, setQuery] = useState("titanic");

  const getMovies = async (url) =>{
    setIsloading(true);
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
    let timeout = setTimeout(() => {
      getMovies(`${API_URL}&s=${query}`);
    }, 800)

    return () =>  clearTimeout(timeout); 
  }, [query]);

  return <AppContext.Provider value={{isLoading, isError, movie, query, setQuery}}>
      {children}
    </AppContext.Provider>;
};

//Global custom hooks
const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext };
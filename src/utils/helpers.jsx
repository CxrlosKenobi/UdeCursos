import { useState, useEffect, useLayoutEffect } from  "react";
import { Link, useLocation } from "react-router-dom";
//
import "./helpers.scss";

export const useOutsideClick = (ref, initialState, exceptionID) => {
  const [isActive, setIsActive] = useState(initialState);
  
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current !== null && !ref.current.contains(e.target) && !exceptionID.includes(e.target.id)) {
        setIsActive(!isActive);
      }
    };

    if (isActive)
      window.addEventListener("click", onClick);
    
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isActive, ref, exceptionID])

  return [isActive, setIsActive];
};


export function ScrollWrapper({ children }){
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return children;
};


export function NavItem(props) {
  return (
    <li>
      <Link to={props.to}>
        {props.children}
      </Link>
    </li>
  );
};

export function parseDate(date) {
  let y = date.split("T")[0].split("-")[0]
  let m = date.split("T")[0].split("-")[1]
  let d = date.split("T")[0].split("-")[2]

  return `${d}/${m}/${y}`
};

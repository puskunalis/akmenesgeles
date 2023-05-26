import { useNavigate } from "react-router-dom";
import SpinnerWrapper from '../../components/SpinnerWrapper';
import * as React from 'react';

export default function NotFoundPage(){
  const navigate = useNavigate();

  React.useEffect(()=>{
    navigate("/");
  }, []);

  return (
    <SpinnerWrapper/>
  );
}
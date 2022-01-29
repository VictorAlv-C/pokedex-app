import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const RoutesProtected = () => {
    const name = useSelector(state => state.name)

    if(true){
        return <Outlet />
    }else{
        return <Navigate to="/" />
    }
};

export default RoutesProtected;
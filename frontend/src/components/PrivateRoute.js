import React, {useState, useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from "axios";

const PrivateRoute = ({ children }) => {
  	const [currentUser, setCurrentUser] = useState();

	useEffect(() => {
		const fetchUser = async () => {
		const response = await axios.get(`http://localhost:8082/api/users/token/${Cookies.get('authToken')}`);
		setCurrentUser(response.data);
	}
		
	fetchUser();
		
	}, [])
		
	if (currentUser !== undefined) {
		return currentUser.isAdmin===true ? children : <Navigate to="/login" />;
	}
		
	return 'Loading...';
}

export default PrivateRoute
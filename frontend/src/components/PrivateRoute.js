import React, {useEffect, useState} from 'react'
import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from "axios";

const PrivateRoute = ({children}) => {
	const [user, setUser] = useState();

	const fetchUser = async () => {
		const response = await axios.get(`/api/users/${Cookies.get('authToken')}`);
		return response.data[0]
	}

	useEffect(() => {
		fetchUser().then((res) => {
			setUser(res)
		})

	}, [])

	if (user !== undefined) {
		return user.isAdmin ? children : <Navigate to="/login"/>;
	}

	return 'Loading...';
}

export default PrivateRoute
import React from "react";
import axios from "../../../config/axios";

const AdminLogout = props => {
	axios
		.delete("/admin/logout", {
			headers: {
				"x-auth": localStorage.getItem("token")
			}
		})
		.then(() => {
			localStorage.removeItem("token");
			props.handleIsAuthenticated();
		})
		.catch(err => {
			return "somthing went worng";
		});
	props.history.push("/");
	return <div />;
};

export default AdminLogout;
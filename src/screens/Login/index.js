import React from "react";
import { Login } from "./login";
import { LocalStoragekeys, getData } from "../../helper";

class LoginParent extends React.Component {
    handleNavigate = async() => {
        const token = await getData(LocalStoragekeys?.token)
        if(token){
            this.props.navigation.navigate('Home');
        }
      };

    componentDidMount() {
        this.handleNavigate
    }

    render() {
        return <Login  {...this.props}/>;
    }
}

export default LoginParent;

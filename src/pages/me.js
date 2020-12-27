import React, {
    Component
}
from 'react';
import Spinner from 'react-bootstrap/Spinner';
import api from '../meta/api';

class Me extends Component {
    state = {
        code: null,
        user: null,
        loaded: false,
        servers: []
    };

    async componentDidMount() {
        let code = localStorage.getItem('code');
        if (code === "n/a") return window.location.href = api.getOauth()
        if (!code) return window.location.href = api.getOauth()

        let info = await api.servers(localStorage.getItem('user'));
        console.log(info)
        this.state({
            isLoaded: true,
            servers: info.servers
        });
    }

    render() {
        const {
            error, isLoaded, servers
        } = this.state;
        console.log(servers)

        if (!isLoaded) {
            return ( <div>
                <center> <br /> <br /> <br /> <br />
                 Spinner animation = "border" role = "status" >
                <span className = "sr-only" > Loading... < /span>  </Spinner> <h3> Please wait while we load your info </h3>
                <br />
                <small> If this does not stop spinning then something happened... </small> </center> 
                </div>
            )
        } else {

            return ( < div > { /* you can change this your self to look better so that its not just the server names :) */ } 
                    {
                    servers.map(guild => guild.name)
                    } < /div>
                )
            }
        }
    }

    export default (Me);

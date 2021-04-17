import React, {
    Component
}
    from 'react';
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

        return (
            <>

            </>
        )

    }
}

export default (Me);

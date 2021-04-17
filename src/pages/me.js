import React, {
    Component
}
from 'react';
import * as api from "../meta/api";

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

        this.setState({user: JSON.parse(localStorage.getItem('user'))})

    }

    render() {
        const {
            user
        } = this.state;
        console.log(user)

        return (
            <>
                {user ? (
                    <h3>Hello {user.username}</h3>
                ):(<></>)}
            </>
        )
    }
}

    export default (Me);

import React, {
    Component
}
    from 'react';
import * as api from "../meta/api";

class Me extends Component {
    state = {
        code: null,
        text: "Awaiting Code"
    };

    async componentDidMount() {
        const url = new URLSearchParams(window.location.search);
        const code = url.get("code");
        if (!code) return window.location.href = "/";

        if (code) {
            this.setState({text: "Please wait while we gather your details"});
        }

        if (localStorage.getItem("user")) {
            window.location.href = "/me";
        }

        this.fetch()

        setInterval(async () => {

            if (localStorage.getItem("user")) {
                this.setState({redirect: true, msg: "Successfully logged in!"});
            } else {
                this.fetch()
            }

        }, 2500);
    }


    async fetch() {
        const url = new URLSearchParams(window.location.search);
        const code = url.get("code");
        if (!code) return window.location.href = "/";

        try {
            let info = await api.user(code);
            console.log(info);
            if (info.error) {
                this.setState({text: "An error Occurred", error: true});
            } else {
                localStorage.setItem("user", JSON.stringify(info.user));
                localStorage.setItem("code", code);
                window.location.href = "/me";
                this.setState({text: "Redirecting", error: false});
            }
        } catch (e) {
            console.log(e)
            this.setState({text: "An error Occurred", error: true});
        }

    }

    render() {
        const {
            error, isLoaded, servers, text
        } = this.state;
        console.log(servers)

        return (
            <>
                <h3>{text}</h3>
            </>
        )

    }
}

export default (Me);

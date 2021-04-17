const baseURL = window.origin;
const api = "http://localhost:3001";
const ID = "675167375858991115";

const fetchStats = async () => {
    const res = await fetch(`${baseURL}/api/application`);
    const result = await res.json();
    return result;
};

const getInvite = function ()  {
    const url = new URL('https://discordapp.com/oauth2/authorize');
    url.search = new URLSearchParams([
        ['client_id', ID ],
        ['permissions', '0'],
        ['scope', 'bot']
    ]);
    return url.href;
}

const getOauth = function () {
    let re = "/me"
    const url = new URL("https://discordapp.com/oauth2/authorize");
    url.search = new URLSearchParams([
        ["redirect_uri", baseURL + "/callback"],
        ["response_type", "code"],
        ["scope", ["identify"].join(" ")],
        ["client_id", ID],
        ["prompt", "none"],
        ["state", re]
    ]);

    return url.href;
};

const user = async function (code) {
    if (!code || code === "n/a") return;
    const user = await fetch(`${api}/api/callback?code=${code}&redirect=${baseURL}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    }).then(res => res.json());

    console.log(user)
    return user;
};

const servers = async function (info) {
    const userServers = await fetch(`http://localhost:3001/api/servers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: info
    }).then(res => res.json());
    localStorage.setItem('guildsAuthorized', JSON.stringify(userServers));
    return userServers;
}

export {
    getOauth,
    fetchStats,
    user,
    getInvite,
    servers
}

export default api;
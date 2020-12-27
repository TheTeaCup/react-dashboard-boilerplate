const baseURL = "http://localhost:3000";
const ID = "BOT_ID";

exports.fetchStats = async () => {
    const res = await fetch(`${baseURL}/api/application`);
    const result = await res.json();
    return result;
};

exports.getInvite = () => {
    const url = new URL('https://discordapp.com/oauth2/authorize');
    url.search = new URLSearchParams([
        ['client_id', ID ],
        ['permissions', '0'],
        ['scope', 'bot']
    ]);
    return url.href;
}

exports.getOauth = () => {
    const url = new URL('https://discordapp.com/oauth2/authorize');
    url.search = new URLSearchParams([
        ['redirect_uri', baseURL + "/callback" ],
        ['response_type', 'code'],
        ['scope', ['identify', 'guilds'].join(' ')],
        ['client_id', ID ]
    ]);
    return url.href;
};

exports.user = async code => {
    if(!code || code === "n/a")return;
    const user = await fetch(`http://localhost:3001/api/callback?code=` + code, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    localStorage.setItem('user', JSON.stringify(user));
    return user;
}

exports.servers = async (info) => {
    const userServers = await fetch(`http://localhost:3001/api/servers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: info
    }).then(res => res.json());
    localStorage.setItem('guildsAuthorized', JSON.stringify(userServers));
    return userServers;
}

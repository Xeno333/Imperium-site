const servername = "Imperium";
const serverlist = 'https://servers.minetest.net/list'


async function update_info() {
    try {
        const response = await fetch(serverlist);
        const data = await response.json();

        const players = document.getElementById('players');
        players.innerHTML = "";
        const status = document.getElementById('status');

        var found = false;
        var Playercount = 0;
        var rank = 0;

        data.list.forEach(server => {
            if (!found) {
                rank++;
            }
            if (server.name == servername) {
                found = true;
                status.innerHTML = "Online:";
                document.getElementById('title').style.color = 'lightgreen';
                if (server.clients_list) {
                    server.clients_list.forEach(player => {
                        Playercount++;
                        var next = document.createElement('li');
                        next.textContent = player;
                        players.appendChild(next);
                    });
                }
            }
        });

        if (!found) {
            status.innerHTML = "Offline";
            document.getElementById('title').style.color = 'red';
            document.getElementById('rank').innerHTML = 'N/A';
            document.getElementById('Playercount').innerHTML = `No. of players online: N/A`;
        }
        else {
            document.getElementById('rank').innerHTML = rank + "/" + data.list.length;
            document.getElementById('Playercount').innerHTML = `No. of players online: ${Playercount}`;
        }

    } catch (error) {
        console.log('Error fetching data:' + error);
        document.getElementById('title').style.color = 'red';
        document.getElementById('rank').innerHTML = 'N/A';
        document.getElementById('Playercount').innerHTML = `No. of players online: N/A`;
    }
}



async function update_banner() {
    try {
        const response = await fetch(serverlist);
        const data = await response.json();

        var found = false;
        var Playercount = 0;

        data.list.forEach(server => {
            if (server.name == servername) {
                found = true;
                document.getElementById('title').style.color = 'lightgreen';
                if (server.clients_list) {
                    server.clients_list.forEach(player => {
                        Playercount++;
                    });
                }
            }
        });

        if (!found) {
            document.getElementById('title').style.color = 'red';
            document.getElementById('Playercount').innerHTML = `No. of players online: N/A`;
        }
        else {
            document.getElementById('Playercount').innerHTML = `No. of players online: ${Playercount}`;
        }

    } catch (error) {
        console.log('Error fetching data:' + error);
        document.getElementById('title').style.color = 'red';
        document.getElementById('Playercount').innerHTML = `No. of players online: N/A`;
    }
}

function extractPlayer(matchString) {
    // Assumes the format is always "Found partial match: player, on: server.name"
    const matchParts = matchString.split(", on: ");
    var playerPart;
    if (matchParts[0].startsWith("Found partial match: ")) 
        playerPart = matchParts[0].replace("Found partial match: ", "");
    else if (matchParts[0].startsWith("Found exact match: ")) 
        playerPart = matchParts[0].replace("Found exact match: ", "");

    return playerPart;
}

async function find_player(pname_o) {
    var pname = pname_o.toLowerCase()
    try {
        const response = await fetch(serverlist);
        const data = await response.json();

        var found = false;
        var Playercount = 0;
        var Servercount = 0;
        var ServerMcount = 0;
        var foundc = 0;
        const results = document.getElementById('results');

        var res = [];

        data.list.forEach(server => {
            Servercount++;
            var serverm = false;
            if (Array.isArray(server.clients_list)) {
                if (!(server.clients_list.length === 0)) {
                    server.clients_list.forEach(player => {
                        Playercount++;
                        if (player.toLowerCase().includes(pname)) {
                            if (serverm == false) {
                                serverm = true;
                                ServerMcount++;
                            }
                            found = true;
                            foundc++;
                            if (player == pname_o) {
                                res.push("Found exact match: " + player + ", on: " + server.name)
                            }
                            else {
                                res.push("Found partial match: " + player + ", on: " + server.name);
                            }
                        }
                    });
                }
            }
        });

        for (let i = 0; i < res.length - 1; i++) {
            for (let j = 0; j < res.length - 1; j++) {
                var n = extractPlayer(res[j+1])
                if (n.toLowerCase().startsWith(pname)) {
                    let temp = res[j];
                    if (!extractPlayer(res[j]).startsWith(pname_o)) {
                        res[j] = res[j + 1];
                        res[j + 1] = temp;
                    }
                }
            }
        }
        
        
        results.innerHTML = "";
        var next
        if (found)
            next = document.createElement('seachinfogood');
        else
            next = document.createElement('seachinfobad');

        next.textContent = "[Searched " + Servercount + " servers: results in " + ServerMcount + ", searched " + Playercount + " players: " + foundc + " matches found]";
        results.appendChild(next);

        if (found) {
            results.innerHTML += "\n";
        }
        
        res.forEach(e => {
            var next = document.createElement('li');
            next.textContent = e;
            results.appendChild(next);
        });
        
    } catch (error) {
        console.log('Error fetching data:' + error);
    }
}


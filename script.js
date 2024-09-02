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


async function find_player(pname_o) {
    var pname = pname_o.toLowerCase()
    try {
        const response = await fetch(serverlist);
        const data = await response.json();

        var ss = false;
        var ss_l = [];

        if (pname.startsWith("[server]")) {
            pname = pname.replace("[server]", "").trim();
            ss = true;
        }

        var found = false;
        var Playercount = 0;
        var Servercount = 0;
        var ServerMcount = 0;
        const results = document.getElementById('results');

        var res = [];
        var res_e = [];

        data.list.forEach(server => {
            Servercount++;
            var serverm = false;
            if (Array.isArray(server.clients_list)) {
                if (ss) {
                    if (server.name.toLowerCase().includes(pname)) {
                        found = true;
                        ServerMcount++;
                        ss_l.push([server.name, server.clients_list])
                    }
                }
                else if (!(server.clients_list.length === 0)) {
                    
                    server.clients_list.forEach(player => {
                        Playercount++;
                        if (pname == "*") {
                            found = true;
                            res.push([player, server.name]);
                            if (serverm == false) {
                                serverm = true;
                                ServerMcount++;
                            }
                        }
                        if (player.toLowerCase().includes(pname)) {
                            if (serverm == false) {
                                serverm = true;
                                ServerMcount++;
                            }
                            found = true;
                            if (player == pname_o)
                                res_e.push([player, server.name]);
                            else
                                res.push([player, server.name]);
                        }
                    });
                }
            }
        });

        if (ss) {
            results.innerHTML = "";
            var next
            if (found)
                next = document.createElement('seachinfogood');
            else
                next = document.createElement('seachinfobad');

            next.textContent = "[Searched " + Servercount + " servers: results in " + ServerMcount + ", searched " + Playercount + " players: " + res.length + " matches found]";
            results.appendChild(next);

            ss_l.forEach(([n, l]) => {
                var next_m = document.createElement('h3');
                var next_m1 = document.createElement('lightgreen-text');
                next_m1.textContent = "Found: " + n;
                next_m.appendChild(next_m1);
                results.appendChild(next_m);
                l.forEach(e => {
                    var next = document.createElement('li');
                    next.textContent = e;
                    next_m.appendChild(next);
                });
            });
        }
        else if (!ss) {
            if (pname != "*") {
                for (let i = 0; i < res.length; i++) {
                    for (let j = 0; j < res.length - 1; j++) {
                        var n = res[j+1][0]
                        let temp = res[j];
                        if (n.toLowerCase().startsWith(pname) && res[j][0].toLowerCase() != pname) {
                            res[j] = res[j + 1];
                            res[j + 1] = temp;
                        }
                    }
                }

                res = res_e.concat(res)
            }
            else {
                res.reverse()
            }
            
            
            results.innerHTML = "";
            var next
            if (found)
                next = document.createElement('seachinfogood');
            else
                next = document.createElement('seachinfobad');

            next.textContent = "[Searched " + Servercount + " servers: results in " + ServerMcount + ", searched " + Playercount + " players: " + res.length + " matches found]";
            results.appendChild(next);

            if (found) {
                results.innerHTML += "\n";
            }
            
            res.forEach(e => {
                var next = document.createElement('li');
                next.textContent = "Found " + e[0] + ", on " + e[1];
                results.appendChild(next);
            });
        }
        
    } catch (error) {
        console.log('Error fetching data:' + error);
    }
}


const servername = "Life Steal";
const serverlist = 'https://servers.minetest.net/list'


async function update_info() {
    var serverg;
    try {
        const response = await fetch(serverlist);
        const data = await response.json();

        const players = document.getElementById('players');
        players.innerHTML = "";
        const status = document.getElementById('status');

        var found = false;
        var rank = 0;

        data.list.forEach(server => {
            if (!found) {
                rank++;
            }
            if (server.name == servername) {
                serverg = server
                found = true;
                status.innerHTML = "Online:";
                document.getElementById('title').style.color = 'lightgreen';
                if (server.clients_list) {
                    server.clients_list.forEach(player => {
                        var next = document.createElement('li');
                        next.textContent = player;
                        players.appendChild(next);
                    });
                }
            }
        });

        if (!found) {
            status.innerHTML = "Offline";
            document.getElementById('Playercount').innerHTML = ` N/A`;
            document.getElementById('lag').innerHTML = ' N/A';

            document.getElementById('title').style.color = 'red';
            document.getElementById('rank').innerHTML = ' N/A';
            document.getElementById('address').innerHTML = ' N/A';
            document.getElementById('port').innerHTML = ' N/A';
            document.getElementById('game').innerHTML = " N/A";
            document.getElementById('serverversion').innerHTML = " N/A";
        }
        else {

            document.getElementById('Playercount').innerHTML = " " + serverg.clients + " of " + serverg.clients_max;
            const lag = Math.round(serverg.lag*1000 * 10) / 10;
            if (isNaN(lag)) 
                document.getElementById('Playercount').innerHTML = ` N/A`;
            else
                document.getElementById('lag').innerHTML = " " + lag + " ms";

            document.getElementById('address').innerHTML = " " + serverg.address;
            document.getElementById('port').innerHTML = "" + serverg.port;
            document.getElementById('game').innerHTML = " " + serverg.gameid;
            document.getElementById('serverversion').innerHTML = " " + serverg.version;
            document.getElementById('rank').innerHTML = rank + "/" + data.list.length;
        }

    } catch (error) {
        console.log('Error fetching data:' + error);
        document.getElementById('Playercount').innerHTML = ` N/A`;
        document.getElementById('lag').innerHTML = ' N/A';

        document.getElementById('title').style.color = 'red';
        document.getElementById('rank').innerHTML = ' N/A';
        document.getElementById('address').innerHTML = ' N/A';
        document.getElementById('port').innerHTML = ' N/A';
        document.getElementById('game').innerHTML = " N/A";
        document.getElementById('serverversion').innerHTML = " N/A";
    }
}



async function update_banner() {
    try {
        var serverg
        const response = await fetch(serverlist);
        const data = await response.json();

        var found = false;

        data.list.forEach(server => {
            if (server.name == servername) {
                found = true;
                serverg = server
                document.getElementById('title').style.color = 'lightgreen';
            }
        });

        if (!found) {
            document.getElementById('title').style.color = 'red';
            document.getElementById('Playercount').innerHTML = `No. of players online: N/A`;
        }
        else {
            document.getElementById('Playercount').innerHTML = " " + serverg.clients + " of " + serverg.clients_max;
        }

    } catch (error) {
        console.log('Error fetching data:' + error);
        document.getElementById('title').style.color = 'red';
        document.getElementById('Playercount').innerHTML = `No. of players online: N/A`;
    }
}


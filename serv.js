
const express = require('express');
const { Client } = require('ssh2');
let ssh = new Client();

function exec(command){
    let data = "";
    return new Promise((res, rej)=>{
        ssh.exec(command, (err, str)=>
            {
            if(err) return rej(err);

            str.on('close', (code, sig)=>{
                        res({sig, code, data}) 
                    //    ssh.end();
                    })
                .on('data', res=>{
                        data += res.toString();
                   });
        })
    })
}

const app = express();
app.listen(4201, ()=>{
    console.log("server działa http://localhost:4201");
    
})
app.use(express.static('dist/admin/browser/'))

app.get('/whois', async (req,res) =>{
    const { domena } = req.query;
    // res.send("");
    if(!domena) res.json({"error": "Nie podałeś domeny"}) 

    ssh = new Client();
    ssh.on('ready',async ()=>{
        try {
            const odpServera = await exec(`whois ${domena}`);
            res.json(odpServera); // Zwróć odpowiedź jako JSON
        } catch (err) {
            console.error('Błąd wykonania polecenia:', err);
            res.status(500).json({ error: 'Błąd podczas wykonywania polecenia whois' });
        } finally {
            ssh.end(); // Zamknij połączenie SSH
        }
    
    }).connect({
        host: '10.40.50.201',
        user: "uczen",
        password: 'uczenpti'
    })

})


// ssh.on('ready',async ()=>{
    // let groups = await exec('groups');
    // // console.log(groups);
    
    // if(groups.data.indexOf('sudo')>=0)
    // {
    //     console.log('User jest adminem');
    //     let nl = Math.round(Math.random()*1000);
    //     let user = 'pawell'+nl;
    //      let adduser =await  exec(`sudo useradd -m ${user} `);
    //      console.log(`dodaje konto ${user}`, adduser);
         
    //     if(adduser.code==0)
    //     {
    //             await exec(`echo "alamakota" | sudo passwd ${user}`);
    //             console.log("zmieniono passowrd");
                
    //     }
        
    // }
    // console.log(await exec('groups'))
//     ssh.end();

// }).connect({
//     host: '10.40.50.201',
//     user: "uczen",
//     password: 'uczenpti'
// })
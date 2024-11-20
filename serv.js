
const express = require('express');
const { Client } = require('ssh2');
const ssh = new Client();

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

ssh.on('ready',async ()=>{
    let groups = await exec('groups');
    // console.log(groups);
    
    if(groups.data.indexOf('sudo')>=0)
    {
        console.log('User jest adminem');
        let nl = Math.round(Math.random()*1000);
        let user = 'pawell'+nl;
         let adduser = exec(`sudo adduser ${user} --disable-password --gecos`);
        if(adduser.code==0)
        {
                 exec(`echo "${user}:alamakota" | sudo passwd`)
                console.log("zmieniono passowrd");
                
        }
        
    }
    console.log(await exec('groups'))
    ssh.end();

}).connect({
    host: '10.40.50.218',
    user: "uczen",
    password: 'uczenpti'
})
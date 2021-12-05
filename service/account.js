const {db} = require('../server/mysql')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')

async function getAccountWithToken(req,res){


    jwt.verify(req.token,'SECRET',(err,authData)=>{
        if(err){
            res.sendStatus(403)
        }
        else{
            
            var sql = "SELECT id,name,address,join_date,phone_number FROM merchant WHERE ?"
            var get = {
                id: authData.id
            }

            var result = db.query(sql,get,function(err, userDetail){
                if(err){
                    throw err
                }
                else{
                    res.send({
                     userDetail
                 })
                }
            })

            
        }
    })


}

async function getAllListAccout(req,res){
    
    var sql = "SELECT id,name FROM merchant"
    
    var result = db.query(sql,function(err,show){
        if(err){
            throw err
        }
        else{
            res.send(show)
        }
    })

}

async function createAccount(req,res){
    
    var {id,password,name,address,phone_number} = req.body

    try{
        const hashedPassword = await bcrypt.hash(password, 10)
        var sql = "INSERT INTO merchant SET ?";

        let post ={
            id:id,
            password:hashedPassword,
            name:name,
            address:address,
            phone_number:phone_number
        }

        var result = await db.query(sql,post,function(err,show){
            if(err){
                res.send("Data yang dibuat tidak sesuai")
                throw err;
            }
            else {
                res.send("Data berhasil dibuat")
            }
        }
        )
        return result
    }

    catch{
        res.status(500).send("Error ")
    }
}

async function deleteAccount(req,res){
   
    const {id} = req.params;
    var sql = "DELETE FROM merchant WHERE ?";
    let getDelete = {
        id:id
    }
    var result = await db.query(sql,getDelete,function(err,show){
        if(err){
            res.send("Data yang ingin dihapus tidak sesuai")
            throw err;
        }
        else {
            res.send("Data berhasil dihapus")
        }
    })
    return result
}

async function loginAccount(req,res){

    const {id,password} = req.body

    var sql = "SELECT * FROM merchant WHERE ?"
    let get = {
        id :id
    }

    var result = await db.query(sql,get, function(err,show){
        if(err){
            res.send("Data yang ingin ditampilkan tidak sesuai")
            throw err;
        }
        else { 
            var string = JSON.stringify(show)
            var string2 = JSON.parse(string)
            
            if(id==null||password==null){
                res.status(400).send('id/password tidak lengkap')
            }

            try{
                if(id == string2[0].id && bcrypt.compareSync(password, string2[0].password)){
                    jwt.sign({id:id},'SECRET',{expiresIn:'20s'},(err,token)=>{
                        res.send({
                            token
                        })
                    })
                    // res.send('login sukses silahkan gunakan token untuk melihat data')
                }
                else{
                    res.send('Not Allowed')
                }
            }
            
            catch{
                res.status(500).send("Data tidak ada")
            }
        }
    })

}

function verifyToken(req,res,next){

    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== undefined){
        
        const bearer = bearerHeader.split(' ')

        const bearerToken = bearer[1]

        req.token = bearerToken

        next()
    }
    else{
        res.send.status(403)
    }


}




module.exports={
    getAllListAccout,
    createAccount,
    deleteAccount,
    getAccountWithToken,
    loginAccount,
    verifyToken
}
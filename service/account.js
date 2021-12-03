const {db} = require('../server/mysql')
const bcrypt = require ('bcrypt')

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

    var sql = "SELECT id,password FROM merchant WHERE ?"
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
                    res.send('login sukses')
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


module.exports={
    createAccount,
    deleteAccount,
    loginAccount
}
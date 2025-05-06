const db =require('../util/database');

module.exports=class User{

    constructor (name, email,password){
        this.name=name;
        this.email=email;
        this.password=password;
    }

    static save (user){
         return db.execute(
            'ISERT INTO users(name,email,password) VALUES (?,?,?)',[user.name,user.email,user.password]
         )
    }
}
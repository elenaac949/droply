const admin =require('../config/firebase');

exports.registerUser= async(req,res)=>{
    const {email,password}= req.body;

    try{
        const userRecord =await admin.auth().createUser({
            email,
            password,
        });
        res.status(201).json({message: 'Usuario creado correctamente',userId: userRecord.uid});
    }catch(error){
        res.status(400).json({error:error.message});
    }
}

exports.loginUser =async (req,res)=>{
    res.status(200).json({message: 'Funciona el login mediante sdk'});
}

exports.getUser= async (req,res)=>{
    const {uid}=req.user;
    try {
        const userRecord=await admin.auth().getUser(uid);
        res.status(200).json({user: userRecord});
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}
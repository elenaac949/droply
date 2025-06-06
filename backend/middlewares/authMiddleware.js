const admin =require('../config/firebase');

const authMiddleware = async (req, res, next)=>{
    const token =req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message: 'No autorizado'});
    }

    try {
        const decodedToken =await admin.auth().verifyIdToken(token);
        req.user=decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Token invalido'
        });
    }
}

module.exports=authMiddleware;
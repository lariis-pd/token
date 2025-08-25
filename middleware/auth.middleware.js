import jwt from "jsonwebtoken";

function authMiddleware(req, res, next){
    const authMeader = req.headers["autorization"]

    if(!authMeader) return res.status(401).json({message: "Token não fornecido"});

    const token = authMeader.split("")(1);

    try{
        const decode = jwt.verify(token, "secret123");
        req.user = decode;
        next();
    }catch(err){
        res.status(401).json|({message:"Token invalido ou inspirado"})
    }
}

export default authMiddleware;
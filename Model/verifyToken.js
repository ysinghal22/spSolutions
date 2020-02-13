const jwt = require('jsonwebtoken');

function auth (req, res, next, role) {
    const auth_token = req.header('auth-token');

    if(!auth_token) return res.status(401).json({
        message: "Access denied!"
    })

    try{
        jwt.verify(auth_token, '*[A-Z]![0-9]~secretKey', (err, decodedToken)=>{
            if(decodedToken){
                if(!role || role == decodedToken.role){
                    req.user = decodedToken;
                    next();
                } else{
                    res.status(403).json({message: 'Access dennied'})
                }
            } else{
                res.json({
                    error: err
                })
            }
        });
    }catch(err) {
        res.status(400).json(
            {
                message: "Invalid Token"
            }
        );
    }
}

module.exports = auth;
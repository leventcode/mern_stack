

const jwt=require('jsonwebtoken')
const asyncHandler=require('express-async-handler');
const Kullanici=require('../models/kullaniciModel');


const kullaniciKontrol=asyncHandler(async (req,res,next)=>{

    let sifrelenmisToken;
     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {

            sifrelenmisToken=req.headers.authorization.split(' ')[1];
             const token=jwt.verify(sifrelenmisToken,process.env.JWT_SECRET)
              const user = await Kullanici.findById(token.id).select('-parola')


            req.user=user

            next()

        } catch (error){
            res.status(401)
            throw new Error('Giriş yapılamaz')
        }

    }

    if(!sifrelenmisToken){
        res.status(401)
        throw new Error('Giriş yapılamaz token bulunamadı')
    }

})


module.exports={
    kullaniciKontrol
}










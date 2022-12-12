
const asyncHandler=require('express-async-handler');
const Kullanici=require('../models/kullaniciModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')

const tokenOlustur=(id)=> {

    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

const registerKullanici=asyncHandler(async (req,res)=>{

    const {kullaniciAd,email,parola}=req.body;

    if(!kullaniciAd || !email || !parola){
        res.status(400)
        throw res.json({mesaj:'Lütfen gerekli alanları doldurunuzasdas'})
    }

    const kullanici=await Kullanici.findOne({email})

    if(kullanici){
        res.status(400)

        throw new Error('Bu email zaten var')
    }

    const salt=await bcrypt.genSalt(10);
    const sifrelenmisParola=await bcrypt.hash(parola,salt);


    const yeniKullanici=await Kullanici.create({
        kullaniciAd,
        email,
        parola:sifrelenmisParola

    })


    if(yeniKullanici){

        res.status(201).json({
            _id:yeniKullanici.id,
            kullaniciAd:yeniKullanici.kullaniciAd,
            email:yeniKullanici.email,
            token:tokenOlustur(yeniKullanici._id)
        })
    }else{
        res.status(400)

        throw new Error('Geçersiz kullanıcı verisi')
    }

    res.json({mesaj:'Kullanıcı Register İşlemleri'})
})

const loginKullanici=asyncHandler(async (req,res)=>{
    const{email,parola}=req.body;

    const kullanici=await Kullanici.findOne({email})

    if(kullanici && (await bcrypt.compare(parola,kullanici.parola))){
        res.json({
            _id:kullanici.id,
            kullaniciAd:kullanici.KullaniciAd,
            email:kullanici.email,
            token:tokenOlustur(kullanici._id)
        })
    }else{
        res.status(400)
        throw new Error('Geçersiz email ya da parola')
    }
})

const getKullanici=asyncHandler(async (req,res)=> {

   const {_id,kullaniciAd,email}=await Kullanici.findById(req.user.id)

    res.status(200).json({
        id:_id,
        kullaniciAd,
        email,
    })
})

module.exports={
    registerKullanici,
    loginKullanici,
    getKullanici
}


const mongoose=require('mongoose')

const kullaniciSchema=mongoose.Schema({
    kullaniciAd:{
        type:String,
        required:[true,"Lütfen kullanıcı ad giriniz"]
    },
    email:{
        type:String,
        required:[true,"Lütfen email giriniz"],
        unique:true
    },
    parola:{
        type:String,
        required:[true,"Lütfen parola giriniz"]
    }
},{
    timestamps:true
})

module.exports=mongoose.model('Kullanicis',kullaniciSchema)
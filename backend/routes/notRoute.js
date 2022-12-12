

const express=require('express')

const router=express.Router();

const {getNotlar,setNotlar,updateNotlar,deleteNotlar} =require('../controllers/notController');

const {kullaniciKontrol}=require('../middlewares/authMiddleware')

console.log("asdasdasd",kullaniciKontrol,getNotlar)
router.route('/').get(kullaniciKontrol,getNotlar).post(kullaniciKontrol,setNotlar);
router.route('/:id').put(kullaniciKontrol,updateNotlar).delete(kullaniciKontrol,deleteNotlar);

module.exports=router;
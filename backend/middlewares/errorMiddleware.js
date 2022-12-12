

const hataYakalama=(err,req,res)=> {

    const statusKod=res.statusCode ? res.statusCode : 500

    res.status(statusKod);

    res.json({
        mesaj: err.message,
        aciklama: procces.env.NODE_ENV==='production' ? null :err.stack
    })
}

module.export={
    hataYakalama
}
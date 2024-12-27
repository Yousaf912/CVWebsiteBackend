const test = async (req,res)=>{
try{
    res.send({message:'test api is working'})
}catch(er){
    throw er
}
}

module.exports = test
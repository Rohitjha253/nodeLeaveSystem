const express=require('express');
const jwt=require('jsonwebtoken');


const app=express();

app.listen(5000,()=>console.log("Server Started"));



app.post('/api/login',(req,res)=>{
    const user={
        id:1,
        name:'Rohit Jha',
        email:'rohit.jha1@gds.ey.com'
    }

    jwt.sign({user},'secretKey',(err,token)=>{
         
        res.json({token})
    });
});

app.post('/api/loginmanager',(req,res)=>{
    const user={
        id:2,
        name:'Manager',
        email:'Manager@gds.ey.com'
    }

    jwt.sign({user},'secretKey',(err,token)=>{
         
        res.json({token})
    });
});

app.get('/api/getleave',verifytoken,(req,res)=>{
    jwt.verify(req.token,'secretKey',(err,data)=>{
        if(err)
        {
            res.sendStatus(403);
        }
        else{
            res.json({
                message:"Get Leave"
            })
        }     
    })
})

app.post('/api/approveleave',verifytoken,(req,res)=>{

    const decoded=jwt.verify(req.token,'secretKey');

    jwt.verify(req.token,'secretKey',(err,data)=>{
        if(err)
        {
            res.sendStatus(403)
        }
        else{
            if(decoded.user.name==='Manager')
            {
                res.json({
                    message:'Leave Approved',
                    data
                })
            }
            else
            {
            res.json({
                message:'Leave not Approved'
            })
        }
        }
    })
}) 

app.post('/api/applyleave',verifytoken,(req,res)=>{

    jwt.verify(req.token,'secretKey',(err,data)=>{
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
                message:"Apply for Leave",
                data
            })
        }
    })

})

function verifytoken(req,res,next){
    const bearerHeader=req.headers['authorization'];

    if(typeof bearerHeader != 'undefined')
    {
        const bearer=bearerHeader.split(' ');
        const bearerToken=bearer[1];
        a=bearer[0];
        req.token=bearerToken
        next();
    }
    else
    {
        res.sendStatus(403);
    }
}
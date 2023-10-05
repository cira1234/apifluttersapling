const express = require('express') 
const cors =require('cors');
const mysql =require('mysql2');
const multer=require('multer');
require('dotenv').config();
const app=express()


app.use(cors())



const storage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,__dirname+"/uploads");
    },
    filename: function(req,file,callback){
        callback(null,file.originalname);
    

    }
})    

const uploads =multer({storage:storage});

app.post("/uploads",uploads.array("files"),(req,res)=>{
    // var image=req.params.uploads;
    console.log(req.body);
    res.json({status:"files recevied"});
    
})

const connection = mysql.createConnection(
process.env.DATABASE_URL
)

app.get('/',(req,res) => {
    console.log('Hi')
    res.send('Hello world')
})

app.get('/selectusergis',(req,res) =>{
    connection.query(
        'select * from user where pregis=0',
   
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),

app.get('/selectmember',(req,res) =>{
    connection.query(
        'select * from user where pregis=1 and status=0',
   
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),


    app.get('/selectuser',(req,res) =>{
    connection.query(
        'select * from user ',
    
        function(err,results,fields){
            console.log(results)
            //res.send(results)
            res.send(results);
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),

        app.get('/selectquiz',(req,res) =>{
    connection.query(
        'select * from quiz ',
    
        function(err,results,fields){
            console.log(results)
            //res.send(results)
            res.send(results);
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),

          app.get('/selectchoice/:type',(req,res) =>{
               var type=req.params.type;
    connection.query(
        'select * from quiz where type=?',[type],
    
        function(err,results,fields){
            console.log(results)
            //res.send(results)
            res.send(results);
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),


      app.get('/selectchoicestory/:story',(req,res) =>{
               var story=req.params.story;
    connection.query(
        'select * from quiz where storyname=?',[story],
    
        function(err,results,fields){
            console.log(results)
            //res.send(results)
            res.send(results);
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),


    app.get('/selectmember',(req,res) =>{
    connection.query(
        'select * from member ',
    
        function(err,results,fields){
            console.log(results)
            //res.send(results)
            res.send(results);
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),

    



     app.get('/selectuserban',(req,res) =>{
    connection.query(
        'select * from user where status=? ',['1'],
    
        function(err,results,fields){
            console.log(results)
            //res.send(results)
            res.send(results);
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),


    

//       app.get('/selectprofile/:iduser',(req,res) =>{
//            var iduser=req.params.iduser;
//     connection.query(
//         'SELECT id_user,name,imguser.imguser FROM user INNER JOIN imguser on id_user = id_imguser WHERE id_imguser=? ',[iduser],
    
//         function(err,results,fields){
//             console.log(results)
//             //res.send(results)
//             res.send(results);
//             //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
//         }
//     )
// }),


     app.get('/selectprofile/:iduser',(req,res) =>{
           var iduser=req.params.iduser;
    connection.query(
        'SELECT * FROM user  WHERE id_user=? ',[iduser],
    
        function(err,results,fields){
            console.log(results)
            //res.send(results)
            res.send(results);
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),


      app.get('/selectcomment/:idpost',(req,res) =>{
            var idpost=req.params.idpost;
    connection.query(
        'SELECT id_com,messege,imgcom,name,imguser FROM comment INNER JOIN user ON id_usercom = id_user WHERE id_postcom=?',
         [idpost],
        function(err,results,fields){
            console.log(results)
            //res.send(results)
            res.send(results);
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),


    app.get('/selectpost/:iduser',(req,res) =>{
            var iduser=req.params.iduser;
    connection.query(
        'select * from post where id_userpost=? ',[iduser],
    
        function(err,results,fields){
            console.log(results)
            //res.send(results)
            res.send(results);
              if(results.length==0){
                res.send('false')
              }
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),



    
    app.get('/selectfeedpost',(req,res) =>{
            var iduser=req.params.iduser
    connection.query(
        'select * from post  ',
    
        function(err,results,fields){
            console.log(results)
            //res.send(results)
            res.send(results);
              if(results.length==0){
                res.send('false')
              }
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),


        app.get('/selectpostreport',(req,res) =>{
                
    connection.query(
        'select * from post where report>=? ',['1'],
    
        function(err,results,fields){
            console.log(results)
            //res.send(results)
            res.send(results);
              if(results.length==0){
                res.send('false')
              }
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),


     app.get('/selectimguser/:iduser',(req,res) =>{
             var iduser=req.params.iduser;
    connection.query(
        'select * from  imguser where id_imguser=? ',[iduser],
    
        function(err,results,fields){
            console.log(results)
            //res.send(results)
            res.send(results);
              if(results.length==0){
                res.send('false')
              }
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),
     
     


    
    app.get('/selectvideo',(req,res) =>{
    connection.query(
        'select * from videostudy ',
    
        function(err,results,fields){
            console.log(results)
            // res.send(results)
              res.send(results)
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),



     app.get('/selectvideoid/:id',(req,res) =>{
           var idvideo=req.params.id;
    connection.query(
        'select * from videostudy where id_video=? ',[idvideo],
    
        function(err,results,fields){
            console.log(results)
            // res.send(results)
              res.send(results)
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),

    app.get('/insertuser/:email/:pass/:name/:tel',(req,res) =>{
    var email=req.params.email;
     var pass=req.params.pass;
     var name=req.params.name;
     var tel=req.params.tel;
      var img=req.params.imguser;
    connection.query(
        'insert into user(email,password,name,tel,imguser,pregis,active,status) values(?,?,?,?,?,?,?,?)',
        [email,pass,name,tel,'default.png','0','0','0'],
        function(err,results,fields){
            console.log(results )
            res.send(results)
              console.log('insert success');
        }
    )
})



    app.get('/insertcomment/:messege/:imgcom/:iduser/:idpost',(req,res) =>{
    var messege=req.params.messege;
     var imgcom=req.params.imgcom;
     var iduser=req.params.iduser;
     var idpost=req.params.idpost;
    connection.query(
        'insert into comment(messege,imgcom,id_usercom,id_postcom,status) values(?,?,?,?,?)',
        [messege,imgcom,iduser,idpost,''],
        function(err,results,fields){
            console.log(results )
            res.send(results)
              console.log('insert success');
        }
    )
})


  app.get('/insertquiznoimg/:quiz/:default/:type/:answer/:choice1/:choice2/:choice3/:choice4/:storyname',(req,res) =>{
    var quiz=req.params.quiz;
     var noimg=req.params.default;
       var type=req.params.type;
       var answer=req.params.answer;
       var choice1=req.params.choice1;
       var choice2=req.params.choice2;
       var choice3=req.params.choice3;
       var choice4=req.params.choice4;
       var storyname=req.params.storyname;
    connection.query(
        'insert into quiz(quiz,img,type,answer,choice1,choice2,choice3,choice4,storyname) values(?,?,?,?,?,?,?,?,?)',
        [quiz,noimg,type,answer,choice1,choice2,choice3,choice4,storyname],
        function(err,results,fields){
            console.log(results )
            res.send(results)
              console.log('insert success');
        }
    )
})


 app.get('/insertprofile/:imguser/:iduser',(req,res) =>{
     var imguser=req.params.imguser;
     var iduser=req.params.iduser;
    connection.query(
        'insert into imguser(imguserh,id_imguser) values(?,?)',
        [imguser,iduser],
        function(err,results,fields){
            console.log(results )
            res.send(results)
              console.log('insert success');
        }
    )
})



 app.get('/insertvideo/:name/:detail/:video/:img',(req,res) =>{
    var name=req.params.name;
     var detail=req.params.detail;
     var video=req.params.video;
     var img=req.params.img;

    connection.query(
        'insert into videostudy(namevideo,textexplain,video,imgvideo,report,typevideo) values(?,?,?,?,?,?)',
        [name,detail,video,img,0,'default'],
        function(err,results,fields){
            console.log(results )
            res.send(results)
              console.log('insert success');
        }
    )
})


 app.get('/insertpost/:section/:question/:img/:id',(req,res) =>{
    var section=req.params.section;
     var question=req.params.question;
     var img=req.params.img;
     var id=req.params.id;

    connection.query(
        'insert into post(section,textpost,img,id_userpost) values(?,?,?,?)',
        [section,question,img,id],
        function(err,results,fields){
            console.log(results )
            res.send(results)
              console.log('insert success');
        }
    )
})


    app.get('/insertcomment/:messege/:imgcom/:idusercom/:idpostcom/:status',(req,res) =>{
    var messege=req.params.messege;
     var imgcom=req.params.imgcom;
     var iduser=req.params.idusercom;
     var idpostcom=req.params.idpostcom;
    connection.query(
        'insert into comment(messege,imgcom,id_usercom,id_postcom,status) values(?,?,?,?,?)',
        [messege,imgcom,iduser,idpostcom],
        function(err,results,fields){
            console.log(results )
            res.send(results)
              console.log('insert success');
        }
    )
})


    app.get('/updateprofile/:imguser/:id',(req,res) =>{
        var imguser=req.params.imguser;
        var id=req.params.id;
    connection.query(
        'update user  set imguser=?  where id_user=?',[imguser,id],
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),


         app.get('/banuser/:id',(req,res) =>{
        var id=req.params.id;
    connection.query(
        'update user  set status=?  where id_user=?',['1',id],
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),

               app.get('/report/:id',(req,res) =>{
        var id=req.params.id;
    connection.query(
        'UPDATE post SET report=report+1 WHERE id_post=?',[id],
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),


          app.get('/unbanuser/:id',(req,res) =>{
        var id=req.params.id;
    connection.query(
        'update user  set status=?  where id_user=?',['0',id],
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),

    app.get('/profiledefault/:id',(req,res) =>{
        var imguser=req.params.imguser;
        var id=req.params.id;
    connection.query(
        'update user  set imguser=?  where id_user=?',['default.png',id],
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),


app.get('/deleteuser/:id',(req,res) =>{
        var id=req.params.id;
    connection.query(
        'delete from user where id_user=?',[id],
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),

    app.get('/deletepost/:id',(req,res) =>{
        var id=req.params.id;
    connection.query(
        'delete from post where id_post=?',[id],
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),

     app.get('/deletecomment/:id',(req,res) =>{
        var id=req.params.id;
    connection.query(
        'delete from comment where id_com=?',[id],
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),


           app.get('/deleteprofile/:id',(req,res) =>{
        var id=req.params.id;
    connection.query(
        'delete from imguser where imguserh=?',[id],
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),


           app.get('/deletehistory/:id',(req,res) =>{
        var id=req.params.id;
    connection.query(
        'delete from imguser where id=?',[id],
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),



    
app.get('/getid/:email/:pass',(req,res) =>{
           var email=req.params.email;
          var pass=req.params.pass;
    connection.query(
         'select id_user from user where email=? and password=? and pregis=1',[email,pass],
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),


    app.get('/checkpass/:id',(req,res) =>{
        var id=req.params.id;
    connection.query(
        'update user set pregis=1 where id_user=?',[id],
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),


         app.get('/editpost/:section/:text/:id',(req,res) =>{
             var section=req.params.section;
             var textpost=req.params.text;
             var id=req.params.id;
    connection.query(
        'update post set section=?,textpost=? where id_post=?',[section,textpost,id],
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),


//        app.get('/editprofile/:imguser/:iduser',(req,res) =>{
//              var imguser=req.params.imguser;
//              var iduser=req.params.iduser;
//     connection.query(
//         'update  set section=?,textpost=? where id_post=?',[imguser,iduser],
//         function(err,results,fields){
//             console.log(results )
//             res.send(results)
//         }
//     )
// }),

            app.get('/editimgpost/:img/:id',(req,res) =>{
     
             var img=req.params.img;
             var id=req.params.id;
    connection.query(
        'update post set img=? where id_post=?',[img,id],
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),

  


        app.get('/updateimg/:img',(req,res) =>{
        var img=req.params.img;
    connection.query(
        'update user set imguser=? where id_user=3',[img],
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),

    app.get('/checklogin/:email/:pass',(req,res) =>{
          var email=req.params.email;
          var pass=req.params.pass;
          const a=4;
        const b=5;
    connection.query(
      'select id_user from user where email=? and password=? and pregis=1',[email,pass],
        // res.send("foundaccount"),
        function(err,results,fields){
        
                if(email=="Admin69@gmail.com" && pass=="090165"){
                   res.send('admin')
               }
               else if(results.length==0){
                res.send('false')
        
            }
    else if(results.length>=1){
        // res.send(results)
        res.send('true')
          // res.send(results);
    }
        }
    )
}),
app.listen(process.env.POR || 3000) 

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

     app.get('/selectsearch',(req,res) =>{
    connection.query(
        'select * from typesearch ',
    
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


             app.get('/showmaxpoint/:iduser/:storyname',(req,res) =>{
          var iduser=req.params.iduser;
                 var sto=req.params.storyname;
    connection.query(
        'select * from quizpoint where id_user=? and id_sto=?',[iduser,sto],
    
        function(err,results,fields){
            console.log(results)
            //res.send(results)
            res.send(results);
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),



               app.get('/showsumpointend/:iduser/:storyname',(req,res) =>{
          var iduser=req.params.iduser;
                 var sto=req.params.storyname;
    connection.query(
        'select * from quizpoint where id_user=? and id_sto=?',[iduser,sto],
    
        function(err,results,fields){
                if(results.length>=1){
                   res.send('havepoint')
               }
               else if(results.length==0){
                res.send('nothavepoint')
        
            }
        }
    )
}),


                   app.get('/showsumpointendwrite/:iduser/:storyname',(req,res) =>{
          var iduser=req.params.iduser;
                 var sto=req.params.storyname;
    connection.query(
        'select * from writepoint where id_user=? and id_sto=?',[iduser,sto],
    
        function(err,results,fields){
                if(results.length>=1){
                   res.send('havepoint')
               }
               else if(results.length==0){
                res.send('nothavepoint')
        
            }
        }
    )
}),



    
            app.get('/showmaxpointwrite/:iduser/:storyname',(req,res) =>{
          var iduser=req.params.iduser;
                 var sto=req.params.storyname;
    connection.query(
        'select * from writepoint where id_user=? and id_sto=?',[iduser,sto],
    
        function(err,results,fields){
            console.log(results)
            //res.send(results)
            res.send(results);
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),
    

         app.get('/selectquizcard',(req,res) =>{
    connection.query(
        'select * from listquiz ',
    
        function(err,results,fields){
            console.log(results)
            //res.send(results)
            res.send(results);
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),

       app.get('/selectquizcardwrite',(req,res) =>{
    connection.query(
        'select * from listquizwrite ',
    
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


      app.get('/selectchoicestory/:story/:idquiz',(req,res) =>{
               var story=req.params.story;
          var idquiz=req.params.idquiz;
    connection.query(
        'select *  from quiz inner join listquiz on listquiz.storyname = quiz.storyname WHERE  quiz.storyname=? and number=?',[story,idquiz],
    
        function(err,results,fields){
            if(results.length==0){
                   res.send('false');
            }
            console.log(results)
            //res.send(results)
            res.send(results);
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),


          app.get('/selectwritequiz/:story',(req,res) =>{
               var story=req.params.story;
          var idquiz=req.params.idquiz;
    connection.query(
        'select *  from quizwrite inner join listquizwrite on storyname_write = quizwrite.storyname WHERE storyname=?',[story],
    
        function(err,results,fields){
            if(results.length==0){
                   res.send('false');
            }
            console.log(results)
            //res.send(results)
            res.send(results);
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),


     app.get('/selectvideosearch/:idtype',(req,res) =>{
          var idtype=req.params.idtype;
    connection.query(
        'select * from videostudy inner join typesearch on typevideo = id_type where typevideo=?',[idtype],
    
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
        'SELECT id_com,messege,imgcom,name,imguser FROM comment INNER JOIN user ON id_usercom = id_user WHERE id_postcom=? and imgcom!=?',
         [idpost,'default.jpg'],
        function(err,results,fields){
            console.log(results)
            //res.send(results)
            res.send(results);
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),
     app.get('/selectcommentnoimg/:idpost',(req,res) =>{
            var idpost=req.params.idpost;
    connection.query(
        'SELECT id_com,messege,imgcom,name,imguser FROM comment INNER JOIN user ON id_usercom = id_user WHERE id_postcom=? and imgcom=?',
         [idpost,'default.jpg'],
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
        'select * from post where id_userpost=? and img !=? ',[iduser,'default.jpg'],
    
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

      app.get('/selectsearch',(req,res) =>{
            var iduser=req.params.iduser;
    connection.query(
        'select * from typesearch',
    
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

      app.get('/selectnoimg/:iduser',(req,res) =>{
            var iduser=req.params.iduser;
    connection.query(
        'select * from post where id_userpost=? and img=? ',[iduser,'default.jpg'],
    
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

        app.get('/checkanswer/:answer',(req,res) =>{
            var answer=req.params.answer;
    connection.query(
        'select * from quiz where answer=? ',[answer],
    
        function(err,results,fields){
            // console.log(results)
            //res.send(results)
            // res.send(results);
              if(results.length<=0){
                res.send('false')
              }
             else if(results.length>=1){
             res.send('true')
        
        }
            
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),


       app.get('/checkanswerwrite/:answer',(req,res) =>{
            var answer=req.params.answer;
    connection.query(
        'select * from quizwrite where answer LIKE ? ',[answer],
    
        function(err,results,fields){
            // console.log(results)
            //res.send(results)
            // res.send(results);
              if(results.length<=0){
                res.send('false')
              }
             else if(results.length>=1){
             res.send('true')
        
        }
            
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),

    app.get('/selectanswer',(req,res) =>{
            var answer=req.params.answer;
    connection.query(
        'select answer from quiz   ',
    
        function(err,results,fields){
            // console.log(results)
            //res.send(results)
            // res.send(results);
              if(results.length<=0){
                res.send('false')
              }
             else if(results.length>=1){
             res.send(results)
        
        }
            
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),



    
    app.get('/selectfeedpost',(req,res) =>{
            var iduser=req.params.iduser
    connection.query(
        'select * from post where img !=? and privacy =?  ',['default.jpg','0'],
    
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

     app.get('/selectfeedpostnoimg',(req,res) =>{
            var iduser=req.params.iduser
    connection.query(
        'select * from post where img =? and privacy=?  ',['default.jpg','0'],
    
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
        'select * from post where report>=? and img!=? ',['1','default.jpg'],
    
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

           app.get('/selectpostreportnoimg',(req,res) =>{
                
    connection.query(
        'select * from post where report>=? and img=? ',['1','default.jpg'],
    
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
        'select * from videostudy order by id_video ',
    
        function(err,results,fields){
            console.log(results)
            // res.send(results)
              res.send(results)
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),

     app.get('/selectvideoindex',(req,res) =>{
    connection.query(
        'select * from videostudy order by id_video limit 3 ',
    
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

     app.get('/selectquizpoint/:idstory/:iduser',(req,res) =>{
           var idstory=req.params.idstory;
         var iduser=req.params.iduser;
    connection.query(
        'select * from quizpoint where id_sto=? and id_user=? ',[idstory,iduser],
    
        function(err,results,fields){
            console.log(results)
            // res.send(results)
              res.send(results)
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),


       app.get('/selectvideoui/:name',(req,res) =>{
           var namevideo=req.params.name;
    connection.query(
        'select * from videostudy where namevideo=? ',[namevideo],
    
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

 app.get('/insertcommentnoimg/:messege/:iduser/:idpost',(req,res) =>{
    var messege=req.params.messege;
     var iduser=req.params.iduser;
     var idpost=req.params.idpost;
    connection.query(
        'insert into comment(messege,imgcom,id_usercom,id_postcom,status) values(?,?,?,?,?)',
        [messege,'default.jpg',iduser,idpost,''],
        function(err,results,fields){
            console.log(results )
            res.send(results)
              console.log('insert success');
        }
    )
})

   app.get('/insertcardquiz/:storyname/:textplain/:type/:idstory/:maxpoint',(req,res) =>{
    var storyname=req.params.storyname;
     var textplain=req.params.textplain;
     var type=req.params.type;
     var idstory=req.params.idstory;
        var maxpoint=req.params.maxpoint;
    connection.query(
        'insert into listquiz(storyname,textplain,type,id_storyquiz,maxpoint) values(?,?,?,?,?)',
        [storyname,textplain,type,idstory,maxpoint],
        function(err,results,fields){
            console.log(results )
            res.send(results)
              console.log('insert success');
        }
    )
})

  app.get('/insertcardwritequiz/:storyname/:textplain/:type/:idstory/:maxpoint',(req,res) =>{
    var storyname=req.params.storyname;
     var textplain=req.params.textplain;
     var type=req.params.type;
     var idstory=req.params.idstory;
        var maxpoint=req.params.maxpoint;
    connection.query(
        'insert into listquizwrite(storyname_write,textplain_write,type_write,id_storywrite,maxpoint) values(?,?,?,?,?)',
        [storyname,textplain,type,idstory,maxpoint],
        function(err,results,fields){
            console.log(results )
            res.send(results)
              console.log('insert success');
        }
    )
})


 app.get('/insertsetpoint/:storyname/:iduser',(req,res) =>{
    var storyname=req.params.storyname;
     var iduser=req.params.iduser;

    connection.query(
        'insert into quizpoint(id_sto,id_user) values(?,?)',
        [storyname,iduser],
        function(err,results,fields){
            console.log(results )
            res.send(results)
              console.log('insert success');
        }
    )
})


 app.get('/insertsetpointwrite/:storyname/:iduser',(req,res) =>{
    var storyname=req.params.storyname;
     var iduser=req.params.iduser;

    connection.query(
        'insert into writepoint(id_sto,id_user) values(?,?)',
        [storyname,iduser],
        function(err,results,fields){
            console.log(results )
            res.send(results)
              console.log('insert success');
        }
    )
})



 app.get('/inserttype/:nametype',(req,res) =>{
    var type=req.params.nametype;
    connection.query(
        'insert into typesearch(type_video) values(?)',
        [type],
        function(err,results,fields){
            console.log(results )
            res.send(results)
              console.log('insert success');
        }
    )
})



  app.get('/insertquiznoimg/:number/:quiz/:default/:type/:answer/:choice1/:choice2/:choice3/:choice4/:storyname',(req,res) =>{
    var number=req.params.number;
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
        'insert into quiz(number,quiz,img,type,answer,choice1,choice2,choice3,choice4,storyname) values(?,?,?,?,?,?,?,?,?,?)',
        [number,quiz,noimg,type,answer,choice1,choice2,choice3,choice4,storyname],
        function(err,results,fields){
            console.log(results )
            res.send(results)
              console.log('insert success');
        }
    )
})

 app.get('/insertquizwritenoimg/:quiz/:default/:type/:answer/:storyname',(req,res) =>{
    var quiz=req.params.quiz;
     var noimg=req.params.default;
       var type=req.params.type;
       var answer=req.params.answer;
       var storyname=req.params.storyname;
    connection.query(
        'insert into quizwrite(quiz_write,img,type,answer,storyname) values(?,?,?,?,?)',
        [quiz,noimg,type,answer,storyname],
        function(err,results,fields){
            console.log(results )
            res.send(results)
              console.log('insert success');
        }
    )
})


 app.get('/insertquizwrite/:quiz/:default/:type/:answer/:storyname',(req,res) =>{
    var quiz=req.params.quiz;
     var noimg=req.params.default;
       var type=req.params.type;
       var answer=req.params.answer;
       var storyname=req.params.storyname;
    connection.query(
        'insert into quizwrite(quiz_write,img,type,answer,storyname) values(?,?,?,?,?)',
        [quiz,noimg,type,answer,storyname],
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



 app.get('/insertvideo/:name/:detail/:video/:img/:type',(req,res) =>{
    var name=req.params.name;
     var detail=req.params.detail;
     var video=req.params.video;
     var img=req.params.img;
     var type=req.params.type;

    connection.query(
        'insert into videostudy(namevideo,textexplain,video,imgvideo,report,typevideo) values(?,?,?,?,?,?)',
        [name,detail,video,img,0,type],
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

 app.get('/insertpostnoimg/:section/:question/:id',(req,res) =>{
    var section=req.params.section;
     var question=req.params.question;
     var id=req.params.id;

    connection.query(
        'insert into post(section,textpost,img,id_userpost) values(?,?,?,?)',
        [section,question,'default.jpg',id],
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


 app.get('/insertcomment/:maxpoint',(req,res) =>{
    var maxpoint=req.params.maxpoint;
    connection.query(
        'insert into quizpoint(maxpoint_id) values(?)',
        
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

         app.get('/updatepoint/:iduser/:idstory/:total/:index',(req,res) =>{
        var iduser=req.params.iduser;
        var idstory=req.params.idstory;
        let total=req.params.total;
             let index=req.params.index;
        
    connection.query(
        'update quizpoint  set point=?,maxpoint_id=?  where id_user=? and id_sto=?',[total,index,iduser,idstory],
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),


          app.get('/updatepointwrite/:iduser/:idstory/:total/:index',(req,res) =>{
        var iduser=req.params.iduser;
        var idstory=req.params.idstory;
        let total=req.params.total;
             let index=req.params.index;
        
    connection.query(
        'update writepoint set point=?,maxpoint_id=?  where id_user=? and id_sto=?',[total,index,iduser,idstory],
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

           app.get('/autostatus/:id',(req,res) =>{
        var id=req.params.id;
    connection.query(
        'update user  set pregis=?  where email=?',['1',id],
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),

        app.get('/private/:id',(req,res) =>{
        var id=req.params.id;
    connection.query(
        'update post  set privacy=?  where id_post=?',['1',id],
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),

           app.get('/public/:id',(req,res) =>{
        var id=req.params.id;
    connection.query(
        'update post  set privacy=?  where id_post=?',['0',id],
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

app.get('/deletequizpoint/:id',(req,res) =>{
        var id=req.params.id;
    connection.query(
        'delete from quizpoint where id_user=?',[id],
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),


        app.get('/deletewritepoint/:id',(req,res) =>{
        var id=req.params.id;
    connection.query(
        'delete from writepoint where id_user=?',[id],
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),


            app.get('/deletevideo/:id',(req,res) =>{
        var id=req.params.id;
    connection.query(
        'delete from videostudy where id_video=?',[id],
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


              app.get('/editnameuser/:name/:id',(req,res) =>{
             var nameuser=req.params.name;
             var id=req.params.id;
    connection.query(
        'update user set name=? where id_user=?',[nameuser,id],
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
      'select id_user from user where email=? and password=? and pregis=1 and status=0',[email,pass],
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



         app.get('/checkemailsum/:email',(req,res) =>{
          var email=req.params.email;
             
    connection.query(
      'select * from user where email=?',[email],
        // res.send("foundaccount"),
        function(err,results,fields){
        
                if(email=="Admin69@gmail.com" && pass=="090165"){
                   res.send('admin')
               }
               else if(results.length==0){
                res.send('notsum')
        
            }
    else if(results.length>=1){
        // res.send(results)
        res.send('sum')
          // res.send(results);
    }
        }
    )
}),

         app.get('/forgotpassword/:email/:password',(req,res) =>{
          var email=req.params.email;
             var password=req.params.password;
             
    connection.query(
      'update user set password=? where email=?',[password,email],
        // res.send("foundaccount"),
        function(err,results,fields){
        
                if(email=="Admin69@gmail.com" && pass=="090165"){
                   res.send('admin')
               }
               else if(results.length==0){
                res.send('setfail')
        
            }
    else if(results.length>=1){
        // res.send(results)
        res.send('setok')
          // res.send(results);
    }
        }
    )
}),
app.listen(process.env.POR || 3000)

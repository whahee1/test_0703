var COMMON = require('./common');
var user = require('./user');
var board = require('./board');

module.exports = {

    setRestUrl : function(app) {
      
        app.get('/board/item/:id1', checkSession , function(req, res , next) {
         
            console.log("/board/item/:id1");
        
            if(req.params.id1) 
              res.locals.idx_board = req.params.id1;
            else 
              res.locals.idx_board = 0;    

              res.render('board_item_view');
              return;
        });

        app.get('/board/write', checkSession , function(req, res , next) {
         
            console.log("/board/write");        

            res.locals.idx_board = 0;  
            
            res.render('board_write_view');
            return;
        });

        app.get('/board/write/:id1', checkSession , function(req, res , next) {
         
            console.log("/board/write/:id1");
        
            if(req.params.id1) 
              res.locals.idx_board = req.params.id1;
            else 
              res.locals.idx_board = 0;    

              res.render('board_write_view');
              return;
        });

//------------------------------------

        //Must be last order!
        app.get('/index', checkSession , function(req, res , next) {
            res.render('index'); 
            return;
        });

        app.get('/index2', checkSession , function(req, res , next) {
          res.render('index2'); 
          return;
        });
        app.get('/index3', checkSession , function(req, res , next) {
          res.render('index3'); 
          return;
        });
        app.get('/index3_1', checkSession , function(req, res , next) {
          res.render('index3_1'); 
          return;
        });
        app.get('/index4', checkSession , function(req, res , next) {
          res.render('index4'); 
          return;
        });        
//------------------------------------
// 회원가입
//------------------------------------

        app.get('/join', checkSession , function(req, res , next) {
          res.render('join'); 
          return;
        });  
        app.all('/API/setJoin', board.setJoin);

//------------------------------------
//------------------------------------
// 로그인
//------------------------------------

        app.get('/login', checkSession , function(req, res , next) {
          res.render('login'); 
          return;
        });  
        app.all('/API/setJoin', board.login);

//------------------------------------
// profile
//------------------------------------

        app.get('/profile', checkSession , function(req, res , next) {
          res.render('profile'); 
          return;
        });  
        // app.all('/API/setJoin', board.setJoin);

//------------------------------------
// board
//------------------------------------

app.get('/board', checkSession , function(req, res , next) {
  res.render('board'); 
  return;
});  
// app.all('/API/setJoin', board.setJoin);

//------------------------------------
// board_detail
//------------------------------------

app.get('/board_detail', checkSession , function(req, res , next) {
  res.render('board_detail'); 
  return;
});  
// app.all('/API/setJoin', board.setJoin);

//------------------------------------
// board_write
//------------------------------------

app.get('/board_write', checkSession , function(req, res , next) {
  res.render('board_write'); 
  return;
});  
// app.all('/API/setJoin', board.setJoin);
app.all('/API/insertBoardItem', board.insertBoardItem);    
//------------------------------------
// member_profile
//------------------------------------

app.get('/member_profile', checkSession , function(req, res , next) {
  res.render('member_profile'); 
  return;
});  
// app.all('/API/setJoin', board.setJoin);

//------------------------------------
// friends
//------------------------------------

app.get('/friends', checkSession , function(req, res , next) {
  res.render('friends'); 
  return;
});  
// app.all('/API/setJoin', board.setJoin);

//------------------------------------



        app.get('/item_board_list', checkSession , function(req, res , next) {
          res.render('item_board_list'); 
          return;
        });        
        app.get('/item_board_detail/:board_day', checkSession , function(req, res , next) {

          res.locals.board_day = req.params.board_day;

          console.log("req.params.board_day "+req.params.board_day);
          console.log("res.locals.board_day "+res.locals.board_day);          
          res.render('item_board_detail'); 
          return;
        });        
//------------------------------------
        //Must be last order!
        app.get('/board_list/:id1/:id2', checkSession , function(req, res , next) {
         
          console.log("/board/:id1/:id2");

          if(req.params.id1) 
            res.locals.m_category = req.params.id1;
          else 
            res.locals.m_category = 0;    
            
            res.locals.aaa = 'aaa';    


          if(req.params.id2) 
            res.locals.m_page = req.params.id2;
          else 
            res.locals.m_page = 0;       

            res.render('board_view'); 
            return;
        });

        app.get('/common_control.js', checkSession , function(req, res) {
          res.set('Content-Type', 'application/javascript');
          res.render('common_control');
        });
        app.get('/board_control.js',checkSession , function(req, res) {
          res.set('Content-Type', 'application/javascript');
          res.render('board_control');
        });
        app.get('/board_item_control.js',checkSession , function(req, res) {
          res.set('Content-Type', 'application/javascript');
          res.render('board_item_control');
        });
        app.get('/board_write_control.js',checkSession , function(req, res) {
          res.set('Content-Type', 'application/javascript');
          res.render('board_write_control');
        });
        app.get('/redirect.html',checkSession, function(req, res){
          if(req.query.destination) res.locals.destination = req.query.destination;
          else res.locals.destination = '/';
          res.render('redirect');
        });

        app.all('/API/loginUser', user.loginUser);        
        app.all('/API/logoutUser', user.logoutUser);     
        app.all('/API/getBoardList', board.getBoardList);        
        app.all('/API/getBoardItem', board.getBoardItem);
        
      

/*
        app.all('/API/insertBoardItem', function(req, res){
          console.log('GOT REQUEST !');
      });
  */    


        app.all('/API/updateBoardItem', board.updateBoardItem);    
        app.all('/API/hitBoardItem', board.hitBoardItem);            
        app.all('/API/getNextBoardItem', board.getNextBoardItem);    
        app.all('/API/rateBoardItem', board.rateBoardItem);          
        app.all('/API/insertReplyItem', board.insertReplyItem);       
        app.all('/API/voteReplyItem', board.voteReplyItem);          

        app.use(function(req,res){              
          res.redirect('/redirect.html?destination=board/1/1');
        });
    }
}

function checkSession(req, res, next) {

  // var i18n = require('i18n');
  // i18n.setLocale(res.locals, 'en');

  if (!req.session.idx_user) {        
    res.locals.idx_user = 0;
    res.locals.m_name='';
    next();
  } else {    
    res.locals.idx_user = req.session.idx_user;
    res.locals.m_name= req.session.m_name;
    next();
  }
}


var COMMON = require('./common');
var moment = require("moment");

var multer  = require('multer');
var M_FILE='';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/board');
  },
  filename: function (req, file, cb) {
    M_FILE = new Date().getTime() + file.originalname;
    cb(null, M_FILE);
  }
});

var limits = {fileSize: COMMON.MAX_UPLOAD_FILE_SIZE};

module.exports = {

//------------------------------
// 회원 조인
//------------------------------
setJoin : function(req, res) {    

  var action = "setJoin";
  COMMON.log(action);
  
  var requestData = {};
  var responseData ={};

  var IsGet = Object.keys(req.query).length;    

  if(IsGet>0)
    requestData = req.query;
  else
    requestData = req.body;

    console.log("02 responseData.result "+responseData.result);      

  COMMON.makeHeader(action,requestData,responseData);

  console.log("01 responseData.result "+responseData.result);      
/*
  if( !requestData || !requestData.idx_board)
  {
    COMMON.makeNoParamError(res,responseData ,1);
    return;
  }  
*/
  var queryArray = [];
  queryArray[0] = requestData.idx_board;

  var connection = COMMON.getConnection();

    //var q = 'select * from (select * from t_reply where idx_board = ? ) as A left join (select idx_user,m_name from t_user) as B on A.idx_user = B.idx_user';
    var q = `
    INSERT INTO user_mst(
      login_id, 
      password, 
      email, 
      hphone, 
      level, 
      insert_time, 	
      insert_id 
    )VALUES(
      '`+requestData.login_id+`', -- login_id, 
      '`+requestData.password+`', -- password, 
      '`+requestData.email+`', -- email, 
      '`+requestData.hphone+`', -- hphone, 
      0, -- level, 
      insert_time, 	
      insert_id
      )
    `
    console.log("q; -->"+q);

    connection.query(q , queryArray ,function(err, result, fields) {                

      if (err) 
      {
        COMMON.makeDBError(res,responseData,connection , 2);
        return;
      }

      responseData.result.isSuccess = true;

      responseData.result.replyList = result;

      res.json(responseData);
      connection.end();
      return;     
    }); 
//  });
},

//------------------------------
// 로그인
//------------------------------
login : function(req, res) {    

  var action = "login";
  COMMON.log(action);
  
  var requestData = {};
  var responseData ={};

  var IsGet = Object.keys(req.query).length;    

  if(IsGet>0)
    requestData = req.query;
  else
    requestData = req.body;

    console.log("02 responseData.result "+responseData.result);      

  COMMON.makeHeader(action,requestData,responseData);

  console.log("01 responseData.result "+responseData.result);      
/*
  if( !requestData || !requestData.idx_board)
  {
    COMMON.makeNoParamError(res,responseData ,1);
    return;
  }  
*/
  var queryArray = [];
  queryArray[0] = requestData.idx_board;

  var connection = COMMON.getConnection();

    //var q = 'select * from (select * from t_reply where idx_board = ? ) as A left join (select idx_user,m_name from t_user) as B on A.idx_user = B.idx_user';
    var q = `
    SELECT * FROM user_mst
     WHERE login_id = '`+requestData.login_id+`'
       AND PASSWORD = '`+requestData.password+`' 
    `
    console.log("q; -->"+q);

    connection.query(q , queryArray ,function(err, result, fields) {                

      if (err) 
      {
        COMMON.makeDBError(res,responseData,connection , 2);
        return;
      }

      responseData.result.isSuccess = true;

      responseData.result.replyList = result;

      res.json(responseData);
      connection.end();
      return;     
    }); 
//  });
},




//------------------------------
  getBoardList : function(req, res) {    

    console.log("1------");
    var action = "getBoardList";
    COMMON.log(action);
    var requestData = {};
    var responseData ={};

    var IsGet = Object.keys(req.query).length;    
    console.log("2------");
    if(IsGet>0)
      requestData = req.query;
    else
      requestData = req.body;
      console.log("3------");
    COMMON.makeHeader(action,requestData,responseData);
    console.log("4------");

    /*
    if( !requestData || !requestData.m_page || !requestData.m_category)
    {
      COMMON.makeNoParamError(res,responseData ,1);
      return;
    }  
*/
    var queryArray = [];
    queryArray[0] = requestData.m_category;
    queryArray[1] = requestData.m_page;

    var connection = COMMON.getConnection();

    //var q = 'select count(*) as total from t_board where m_delete = 0 and m_category= ?';
    var q = `
             SELECT DATE_FORMAT(board_day,'%c/%d') board_day
                   ,DATE_FORMAT(board_day, '%Y%m%d') board_day1
                   ,GROUP_CONCAT(item_id) item_id
                   ,GROUP_CONCAT(item_state) item_state
                   ,AVG(item_state) tot_item_state                                      
              FROM item_board
              GROUP BY DATE_FORMAT(board_day,'%c/%d') ,DATE_FORMAT(board_day, '%Y%m%d')
            `    
console.log("1 q "+q);
    connection.query(q, queryArray , function(err, result, fields) {
      console.log("이샇다다  ");
      console.log(" 000 "+err);
      if (err) 
      {
        COMMON.makeDBError(res,responseData,connection , 1);
        return;
      }
      /*
      if (result.length==0) 
      {
        COMMON.makeNotFoundError(res,responseData,connection , 1);
        return;
      }
      */
      /*
      if (result[0].total==0) 
      {
        COMMON.makeUnexpectedError(res,responseData,connection , 1);
        return;
      }
*/
      
      responseData.result.boardList = result;
      console.log("1111");
      responseData.result.isSuccess = true;
      console.log("222");
      res.json(responseData);
      connection.end();
      return;         

    });
  },
  getBoardItem : function(req, res) {    

    var action = "getBoardItem";
    COMMON.log(action);
    var requestData = {};
    var responseData ={};

    var IsGet = Object.keys(req.query).length;    

    if(IsGet>0)
      requestData = req.query;
    else
      requestData = req.body;

      console.log("02 responseData.result "+responseData.result);      

    COMMON.makeHeader(action,requestData,responseData);

    console.log("01 responseData.result "+responseData.result);      
/*
    if( !requestData || !requestData.idx_board)
    {
      COMMON.makeNoParamError(res,responseData ,1);
      return;
    }  
*/
    var queryArray = [];
    queryArray[0] = requestData.idx_board;

    var connection = COMMON.getConnection();

      //var q = 'select * from (select * from t_reply where idx_board = ? ) as A left join (select idx_user,m_name from t_user) as B on A.idx_user = B.idx_user';
      var q = `
      SELECT i.item_title ,ib.item_board_comments,ib.item_state, ib.item_board_id
      FROM item_board ib, item i
      WHERE i.item_id = ib.item_id
        AND DATE(ib.board_day) = DATE('`+requestData.board_day+`')
      `
      console.log("q; -->"+q);

      connection.query(q , queryArray ,function(err, result, fields) {                

        if (err) 
        {
          COMMON.makeDBError(res,responseData,connection , 2);
          return;
        }

        responseData.result.isSuccess = true;

        responseData.result.replyList = result;

        res.json(responseData);
        connection.end();
        return;     
      }); 
  //  });
  },
  insertBoardItem : function(req, res) {    

console.log("글쓰기");

    var action = "insertBoardItem";
    COMMON.log(action);
    var requestData = {};
    var responseData ={};
    COMMON.log("111111111");
    var upload = multer({ storage: storage , limits: limits }).single('thumbnail');
    COMMON.log("222222222222");
    upload(req, res, function (err) {
      COMMON.log("3333333333333");
      COMMON.log("req.query "+req.query);
      var IsGet = Object.keys(req.query).length;    
      COMMON.log("44444444444");
      if(IsGet>0)
        requestData = req.query;
      else
        requestData = req.body;

      COMMON.makeHeader(action,requestData,responseData);

      var connection = COMMON.getConnection();

      if (err) {
        COMMON.makeUploadError(res, responseData , connection , err.code);
        return;
      }
/*
      console.log(requestData);

      if(requestData.idx_user==0)
      {    
        if(!requestData || !requestData.m_temp_user || !requestData.m_temp_pw || !requestData.m_title|| !requestData.m_content)  
        {
          COMMON.makeNoParamError(res,responseData ,1);
          return;
        } 
      }
      else
      {
        if(!requestData || !requestData.idx_user || !requestData.m_title|| !requestData.m_content)  
        {
          COMMON.makeNoParamError(res,responseData ,1);
          return;  
        } 
      } 

      var queryJson = {};

      if(requestData.idx_user==0)
      {    
        queryJson.m_temp_user = requestData.m_temp_user;
        queryJson.m_temp_pw = requestData.m_temp_pw;
      }
      else
      {  
        queryJson.idx_user = requestData.idx_user;
      }

      queryJson.m_category = requestData.m_category;
      queryJson.m_title = requestData.m_title;
      queryJson.m_content = requestData.m_content;

      if(requestData.m_file == '')
        queryJson.m_file = M_FILE;

      M_FILE ='';

      delete queryJson.thumbnail;


      if(requestData.idx_board!=0)
      {
        if(requestData.idx_user==0)
          var q = 'update t_board set ? where idx_board='+requestData.idx_board +' and m_temp_pw='+requestData.m_temp_pw;
        else
          var q = 'update t_board set ? where idx_board='+requestData.idx_board +' and idx_user='+requestData.idx_user;
      }
      else
        var q = 'insert into t_board set ?';
*/
var queryJson = {};

console.log("requestData.title "+requestData.title);
console.log("requestData.content "+requestData.content);


var q = `
INSERT INTO board
(
 BOARD_TYPE,
 TITLE,
 CONTENT
)VALUES(
'101','`+requestData.title+`','`+requestData.content+`'

);
`
/*
      for(var i=0; i<requestData.item_board_id.length; i++){        

        var q = `
        UPDATE item_board
           SET item_state = '`+requestData.item_state[i]+`'
              ,item_board_comments = '`+requestData.item_board_comments[i]+`'
         WHERE item_board_id = '`+requestData.item_board_id[i]+`'
         `

         INSERT INTO board
(
 BOARD_TYPE,
 TITLE,
 CONTENT
)VALUES(
'101','타이틀','컨텐츠'

);
*/

        connection.query(q, queryJson, function(err, result, fields) {    

          if (err) 
          {
            console.log("글쓰기 err "+err);
            COMMON.makePasswordError(res,responseData,connection , 2);
            return;
          }

          responseData.result.isSuccess = true;
        //  responseData.result.isFile = true;
         
        }); 
    //  }
      res.json(responseData);
      connection.end();
      return;     
    });
  },
  updateBoardItem : function(req, res) {    

    var action = "updateBoardItem";
    COMMON.log(action);
    var requestData = {};
    var responseData ={};

    var IsGet = Object.keys(req.query).length;    

    if(IsGet>0)
      requestData = req.query;
    else
      requestData = req.body;

    COMMON.makeHeader(action,requestData,responseData);


    if(requestData.idx_user==0)
    {    
      if( !requestData || !requestData.idx_board || !requestData.m_temp_pw)
      {
        COMMON.makeNoParamError(res,responseData ,1);
        return;
      }  
    }
    else
    {
      if( !requestData || !requestData.idx_board || !requestData.idx_user)
      {
        COMMON.makeNoParamError(res,responseData ,1);
        return;
      }      
    }

    var queryArray = [];
    queryArray[0] = requestData.idx_board;

    if(requestData.idx_user==0)
    {
      queryArray[1] = requestData.m_temp_pw;
      var q = 'select * from t_board where idx_board= ? and m_temp_pw= ?';  
    }
    else
    {
      queryArray[1] = requestData.idx_user;
      var q = 'select * from t_board where idx_board= ? and idx_user= ?';  
    }

    var connection = COMMON.getConnection();

    connection.query(q, queryArray , function(err, result, fields) {

      if (err) 
      {
        COMMON.makeDBError(res,responseData,connection , 1);
        return;
      }
      if (result.length==0) 
      {
        COMMON.makePasswordError(res,responseData,connection , 1);
        return;
      }

      var queryJson = {};
      queryJson = requestData;

      var q = 'update t_board set ? where idx_board=';

      connection.query(q + requestData.idx_board , queryJson ,function(err, result, fields) {                

        if (err) 
        {
          COMMON.makeDBError(res,responseData,connection , 2);
          return;
        }

        responseData.result.isSuccess = true;
        res.json(responseData);
        connection.end();
        return;     
      }); 
    });
  },
  hitBoardItem : function(req, res) {    

    var action = "hitBoardItem";
    COMMON.log(action);
    var requestData = {};
    var responseData ={};

    var IsGet = Object.keys(req.query).length;    

    if(IsGet>0)
      requestData = req.query;
    else
      requestData = req.body;

    COMMON.makeHeader(action,requestData,responseData);

    if( !requestData || !requestData.idx_board )
    {
      COMMON.makeNoParamError(res,responseData ,1);
      return;
    }  

    var queryArray = [];
    queryArray[0] = requestData.idx_board;

    var connection = COMMON.getConnection();


    var q = 'select * from t_board where idx_board= ?';

    connection.query(q, queryArray , function(err, result, fields) {

      if (err) 
      {
        COMMON.makeDBError(res,responseData,connection , 1);
        return;
      }
      if (result.length==0) 
      {
        COMMON.makeNotFoundError(res,responseData,connection , 1);
        return;
      }

      var queryArray = [];
      queryArray[0] = requestData.idx_board;

      var q = 'update t_board set m_hit = m_hit + 1 where idx_board= ? ';

      connection.query(q , queryArray ,function(err, result, fields) {                

        if (err) 
        {
          COMMON.makeDBError(res,responseData,connection , 2);
          return;
        }

        responseData.result.isSuccess = true;
        res.json(responseData);
        connection.end();
        return;     
      }); 
    });
  },
  getNextBoardItem : function(req, res) {    

    var action = "getNextBoardItem";
    COMMON.log(action);
    var requestData = {};
    var responseData ={};

    var IsGet = Object.keys(req.query).length;    

    if(IsGet>0)
      requestData = req.query;
    else
      requestData = req.body;

    COMMON.makeHeader(action,requestData,responseData);

    if( !requestData || !requestData.idx_board)
    {
      COMMON.makeNoParamError(res,responseData ,1);
      return;
    }  

    var queryArray = [];
    queryArray[0] = requestData.idx_board;

    var connection = COMMON.getConnection();

    var q = 'select m_category , m_update_time from t_board  where idx_board = ? ';

    connection.query(q, queryArray , function(err, result, fields) {

      if (err) 
      {
        COMMON.makeDBError(res,responseData,connection , 1);
        return;
      }
      if (result.length==0) 
      {
        COMMON.makeNotFoundError(res,responseData,connection , 1);
        return;
      }

      requestData.m_category = result[0].m_category;
      requestData.m_update_time = result[0].m_update_time;

      var queryArray = [];
      queryArray[0] = requestData.m_update_time;
      queryArray[1] = requestData.m_category;

      if(requestData.order)
        var q = 'select idx_board from t_board  where m_update_time < ? and m_category = ? and m_delete = 0  order by m_update_time desc limit 1';
      else
        var q = 'select idx_board from t_board  where m_update_time > ? and m_category = ? and m_delete = 0 order by m_update_time asc limit 1';


      connection.query(q , queryArray ,function(err, result, fields) {                

        if (err) 
        {
          COMMON.makeDBError(res,responseData,connection , 2);
          return;
        }
        if (result.length==0 || result[0].idx_board== null ) 
        {
          COMMON.makeNotFoundError(res,responseData,connection , 2);
          return;
        }

        responseData.result.isSuccess = true;
        responseData.result.idx_board = result[0].idx_board;

        res.json(responseData);
        connection.end();
        return;     
      }); 
    });
  },
  rateBoardItem : function(req, res) {    

    var action = "rateBoardItem";
    COMMON.log(action);
    var requestData = {};
    var responseData ={};

    var IsGet = Object.keys(req.query).length;    

    if(IsGet>0)
      requestData = req.query;
    else
      requestData = req.body;

    COMMON.makeHeader(action,requestData,responseData);

    if( !requestData || !requestData.idx_board || !requestData.idx_user || !requestData.m_rate )
    {
      COMMON.makeNoParamError(res,responseData ,1);
      return;
    }  

    var connection = COMMON.getConnection();

    var queryJson = {};

    queryJson.idx_board = requestData.idx_board;
    queryJson.idx_user = requestData.idx_user;
    queryJson.m_rate = requestData.m_rate;

    var q = 'insert into t_board_check set ?';

    connection.query( q , queryJson ,function(err, result, fields) {                

      if (err) 
      {
        COMMON.makeDBError(res,responseData,connection , 1);
        return;
      }

      var queryArray = [];
      queryArray[0] = requestData.idx_board;

      var q = 'select round(avg(m_rate),1) as m_rate from t_board_check where idx_board =?';

      connection.query(q, queryArray , function(err, result, fields) {

        if (err) 
        {
          COMMON.makeDBError(res,responseData, connection , 2);
          return;
        }
        if (result.length==0) 
        {
          COMMON.makeNotFoundError(res,responseData,connection , 2);
          return;
        }

        var queryJson = {};
        queryJson.m_rate = result[0].m_rate;

        var q = 'update t_board set ? where idx_board=' + requestData.idx_board;

        connection.query( q , queryJson ,function(err, result, fields) {                

          if (err) 
          {
            COMMON.makeDBError(res,responseData,connection , 3);
            return;
          }
          responseData.result.isSuccess = true;
          res.json(responseData);
          connection.end();
          return;     
        }); 
      });
    });
  },
  insertReplyItem : function(req, res) {    

    var action = "insertReplyItem";
    COMMON.log(action);
    var requestData = {};
    var responseData ={};

    var IsGet = Object.keys(req.query).length;    

    if(IsGet>0)
      requestData = req.query;
    else
      requestData = req.body;

    COMMON.makeHeader(action,requestData,responseData);

    if(requestData.idx_user==0)
    {
      if( !requestData || !requestData.m_temp_user || !requestData.m_temp_pw || !requestData.idx_board|| !requestData.m_content)
      {
        COMMON.makeNoParamError(res,responseData ,1);
        return;
      }  
    }
    else
    {
      if( !requestData || !requestData.idx_user || !requestData.idx_board|| !requestData.m_content)
      {
        COMMON.makeNoParamError(res,responseData ,1);
        return;
      }  
    }

    var connection = COMMON.getConnection();

    var queryJson = {};

    if(requestData.idx_user==0)
    {
      queryJson.m_temp_user = requestData.m_temp_user;
      queryJson.m_temp_pw = requestData.m_temp_pw;
    }
    else
    {
      queryJson.idx_user = requestData.idx_user;
    }
    queryJson.idx_board = requestData.idx_board;
    queryJson.m_content = requestData.m_content;

    var q = 'insert into t_reply set ?';

    connection.query( q , queryJson ,function(err, result, fields) {                

      if (err) 
      {
        COMMON.makeDBError(res,responseData,connection , 1);
        return;
      }

      var queryArray = [];
      queryArray[0] = requestData.idx_board;

      var q = 'select count(*) as total from t_reply where idx_board =?';

      connection.query(q, queryArray , function(err, result, fields) {

        if (err) 
        {
          COMMON.makeDBError(res,responseData, connection , 2);
          return;
        }
        if (result.length==0) 
        {
          COMMON.makeNotFoundError(res,responseData,connection , 2);
          return;
        }

        var queryJson = {};
        queryJson.m_reply = result[0].total;

        var q = 'update t_board set ? where idx_board=' + requestData.idx_board;

        connection.query( q , queryJson ,function(err, result, fields) {                

          if (err) 
          {
            COMMON.makeDBError(res,responseData,connection , 3);
            return;
          }
          responseData.result.isSuccess = true;
          res.json(responseData);
          connection.end();
          return;     
        }); 
      });
    });
  },
  voteReplyItem : function(req, res) {    

    var action = "voteReplyItem";
    COMMON.log(action);
    var requestData = {};
    var responseData ={};

    var IsGet = Object.keys(req.query).length;    

    if(IsGet>0)
      requestData = req.query;
    else
      requestData = req.body;

    COMMON.makeHeader(action,requestData,responseData);

    if( !requestData || !requestData.idx_user || !requestData.idx_reply || !requestData.m_yes|| !requestData.m_no)
    {
      COMMON.makeNoParamError(res,responseData ,1);
      return;
    }  

    var connection = COMMON.getConnection();

    var queryJson = {};

    queryJson.idx_user = requestData.idx_user;
    queryJson.idx_reply = requestData.idx_reply;
    queryJson.m_yes = requestData.m_yes;
    queryJson.m_no = requestData.m_no;

    var q = 'insert into t_reply_check set ?';

    connection.query( q , queryJson ,function(err, result, fields) {                

      if (err) 
      {
        COMMON.makeDBError(res,responseData,connection , 1);
        return;
      }

      var queryArray = [];
      queryArray[0] = requestData.idx_reply;

      var q = 'select sum(m_yes) as m_yes, sum(m_no) as m_no from t_reply_check where idx_reply = ?';

      connection.query(q, queryArray , function(err, result, fields) {

        if (err) 
        {
          COMMON.makeDBError(res,responseData, connection , 2);
          return;
        }
        if (result.length==0) 
        {
          COMMON.makeNotFoundError(res,responseData,connection , 2);
          return;
        }

        var queryJson = {};
        queryJson.m_yes = result[0].m_yes;
        queryJson.m_no = result[0].m_no;

        var q = 'update t_reply set ? where idx_reply=' + requestData.idx_reply;

        connection.query( q , queryJson ,function(err, result, fields) {                

          if (err) 
          {
            COMMON.makeDBError(res,responseData,connection , 3);
            return;
          }
          responseData.result.isSuccess = true;
          res.json(responseData);
          connection.end();
          return;     
        }); 
      });
    });
  }

}
//////////////////////////////// node-cron /////////////////////////////////
var cron = require('node-cron');
var COMMON = require('./modules/common');
// second minute hour day-of-month month day-of-week

console.log("11111111111111");

cron.schedule('* * * * *', function(){
  console.log('node-cron 실행 테스트');
  setData();
});


function setData(){
    var queryArray = [];
    var connection = COMMON.getConnection();

    //var q = 'select count(*) as total from t_board where m_delete = 0 and m_category= ?';


    var sq = 'select * from item'
    connection.query(q, queryArray , function(err, result, fields) {
        console.log("이샇다다  ");
        console.log(" 000 "+err);
  
        
      for(var i=0; i<result.item_id.length; i++){        


console.log("result.item_id[i] "+result.item_id[i]);

        var q = `
        INSERT INTO item_board
        (
          
           user_id, 
           item_id ,
           board_day
           )VALUE(
          
           '1', 
           '`+result.item_id[i]+`', 
           sysdate()
           )
                `   

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
      }



    });

}



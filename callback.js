
var mysql = require('mysql');
var pool = mysql.createPool({
  user: 'root',
  password:'asd861486',//修改mysql密碼
  database: 'password',//修改database名稱
  port:3306
});

let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } 
      else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = { query }
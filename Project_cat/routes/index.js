var express = require('express'); // require Express
var router = express.Router(); // setup usage of the Express router engine

/* PostgreSQL and PostGIS module and connection setup */
const { Client, Query } = require('pg')

// Setup connection
var username = "postgres" // sandbox username
var password = "root" // read only privileges on our table
var host = "localhost:5432"
var database = "newmap" // database name
var conString = "postgres://"+username+":"+password+"@"+host+"/"+database; // Your Database Connection




// Set up your database query to display GeoJSON
var Subcat = `SELECT id, name from public.subcategory_table;`;

/* GET Postgres JSON data */
router.get('/subcat', function (req, res) {
  var client = new Client(conString);
  client.connect();
  var query = client.query(new Query(Subcat));
  var add=[];
  query.on('row', function(row) {
      add.push(row);
  });
  query.on('end', function() {
      //console.log(add);
    return res.json(add);
  }); 
})


// Set up your database query to display GeoJSON
var feature = `SELECT id, name,subcategory_id from public.feature_table;`;

/* GET Postgres JSON data */
router.get('/subfeature', function (req, res) {
   var client = new Client(conString);
  client.connect();
  var query = client.query(new Query(feature));
  var add=[];
  query.on('row', function(row) {
      add.push(row);
  });
  query.on('end', function() {
      //console.log(add);
    return res.json(add);
  }); 
})




router.get('/feat/:id',function(req, res){
  var add=req.params.id; 
     //Geting id from request parameter
     // console.log("categories name",add);
      var demo = `Select id,name  FROM feature_table  WHERE subcategory_id ='${add}'`  
console.log(demo);
 var a=[];
   var client = new Client(conString);
    client.connect();
    var query = client.query(new Query(demo));

          query.on('row', function(row) {
            a.push(row);
        });
        query.on('end', function() {
            //console.log("fgdfgdfg",a);
         // return res.json();
          return  res.json(a);
        });
       });






/* POST home page. */
router.post('/insertdata', function(req, res) {

  // res.write('You sent the name "' + req.body.name+'".\n');
  // res.write('You sent the Email "' + req.body.email+'".\n');
  // res.write('You sent the City "' + req.body.city+'".\n');
  // res.write('You sent the Pincode "' + req.body.pincode+'".\n');

   // `'insert into pups(name, breed, age, sex)' +
  // 'values(${name}, ${breed}, ${age}, ${sex})'` 
/// 
//new adding the data stringyfy 
//   var client = new Client(conString);
//   client.connect();
// var query = client.query(new Query(Insert));

// query.on('row',(row) => {
// results.push(row);
// })
// query.on('end', () => {
// return res.json(results);
// })

  
 var Insert =  `Insert into form  SELECT form  FROM  public.feature_table(mandatory,attributes,datatype,fieldlength,description) VALUES ('"+req.body.mandatory+"','"+req.body.attributes+"','"+req.body.datatype+"','"+req.body.fieldlength+"','"+req.body.description+"')`   
        // console.log("inserting data", Insert)
          //  
               
         res.end(JSON.stringify(req.body))
         // console.log('req.body');
          console.log(req.body);


          
  });




module.exports = router;
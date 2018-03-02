var mongoose = require('mongoose');
var url = 'mongodb://localhost/artbot';


var db_obj = module.exports = {};
mongoose.Promise = global.Promise;
mongoose.connect(url);



// 接続イベントを利用してログ出力
mongoose.connection.on('connected', function () {
  console.log('mongoose URI locates ' + url);
});



//connected と openの違いがよくわからん。
mongoose.connection.once('open', function() {
  // we're connected!

});

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

var ArtworkSchema = require("./Artwork.js");
var OrderSchema   = require("./Order.js");


mongoose.model("Artwork" ,ArtworkSchema);
mongoose.model("Order"   ,OrderSchema);


db_obj.db_loaded_promise = Promise.resolve("loaded DB");

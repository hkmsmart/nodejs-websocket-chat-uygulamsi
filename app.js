var app =require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(3000);

//... handler argümanı index.html ile fs kütüphanesi ile yapılandırılır.
//... sunucuya istek geldiğinde index okur sayfa içeriği döner, hata alırsa http 500 kodu döner.
function handler(req,res){
	fs.readFile(__dirname+'/index.html',
	function (err,data){
		if(err){
			res.writeHead(500);
			return res.end('Error loading index.html');
		}
		res.writeHead(200);
		res.end(data);
	});
}

//... İlk socket bağlantısında socket nesnesi oluşturulur. 
//... kullanıcıya news türünde hello verisi gönderiyoruz. 
//... kullanıcıdan gelen veri my other event ise konsole taşınan veriyi yazdırıoruz.
io.on('connection', function(socket){
	socket.emit('news', {hello:'world'});
	socket.on('my other event', function(data){
		console.log(data);
	});
});


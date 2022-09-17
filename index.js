const express = require('express');
const { resolve } = require('path');
const soap = require('strong-soap').soap;
const Promise = require('promise');
const http = require('http');
const { start } = require('repl');
const WebSocketServer = require('ws');
const convert = require('xml-js');
const process = require('process');
const centralSystemMethods = require('./centralSystemMethods');
const { runInNewContext } = require('vm');
const { emitWarning } = require('process');
const bodyParser = require('body-parser');
const xmlparser = require('express-xml-bodyparser');



const app = express();

app.use(xmlparser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(centralSystemMethods.router);



let server = http.createServer(app).listen(8001, (req, res, next) => {
    console.log("Client is listening on 8001");
    let soapServer = soap.listen(server, '/wsdl', centralSystemMethods.ChargePointService, centralSystemMethods.xml);
    /*
    !!!!WEBSOCKET HALLEDİLDİKTEN SONRA BURAYA BAKILACAK!!!!
    soapServer.authenticate = function(security) {

      var created, nonce, password, user, token;
      token = security.UsernameToken, user = token.Username,
              password = token.Password, nonce = token.Nonce, created = token.Created;
      return user === 'user' && password === soap.passwordDigest(nonce, created, 'password');

       return false;
    };
    */
   
    /*
    soapServer.authorizeConnection = function(req, res) {
      // UNUTMA! WEBSOCKET'İ ÇÖZDÜKTEN SONRA MUTLAKA BAK!!!!
      //burada denetleme yapıldıktan sonra yetkilendirme şartları sağlanıyorsa true dönder işi dönsün, şart sağlanmıyorsa false gönder.
      console.log("req = ", req);
      console.log("res = ", res);
      return true; // or false
    };

    soapServer.on('request', (request, methodName) => {
      console.log("(IN SOAP CLIENT) REQUEST = ");
      console.log(request);
      console.log("(IN SOAP CLIENT) METHODNAME");
      console.log(methodName);
      return;
    })
    soapServer.log = function(type, data){
      console.log("##### IN SOAP CLIENT LOG #####");
      console.log(type, data);
      console.log("##### IN SOAP CLIENT LOG #####");
    }
    */
  });

  let WSServer = WebSocketServer.Server;

  let wss = new WSServer({
    server: server,
    perMessageDeflate: false
  });

 /* wss.on('connection', ws => {
    ws.on('message', message => {
      console.log(`Received message => ${message}`)
    })
    ws.send('Hello! Message From Server!!')
  })
*/
  centralSystemMethods.wsFunc(wss);
/*
let WSServer = WebSocketServer.Server;


let wss = new WSServer({
  server: server,
  /*
  verifyClient: function(info, done){
    //Burası, OCPP uygulandıktan sonra halledilecek.
  },
  
  perMessageDeflate: false
});

centralSystemMethods.wsFunc(wss);
*/
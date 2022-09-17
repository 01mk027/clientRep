const express = require('express');
const soap  = require('strong-soap').soap;
const Promise = require('promise');
const bodyParser = require('body-parser');
const http = require('http');
const moment = require('moment');
const router = express.Router();

router.use(bodyParser.json());


var ChargePointService = {
    ChargePointService: {
        ChargePointServiceSoap12: {
            UnlockConnector:
            function(data)
            {
                return new Promise(function(resolve, reject){
                    let olderResponse = {
                        UnlockConnector: {
                            status: 'Accepted'
                        }
                    };

                    let unlockConnectorRespArr = [{
                    unlockConnectorResponse:{
                        status:'Accepted'
                    }},
                    {
                    unlockConnectorResponse:{
                        status:'Rejected'
                    }
                    }];
                    if(!Object.keys(data).includes('connectorId') || isNaN(data.connectorId) === true || (data.connectorId && data.connectorId <= 0)){
                        reject(unlockConnectorRespArr[1]);
                    }
                    resolve(unlockConnectorRespArr[0]);
            })
            },
            Reset: function(data)
            {
                //let randomNumber = Math.floor(Math.random() * 2);
                console.log(data.type);
                let olderResponse = {
                    resetResponse:{
                        status: 'Accepted'
                    }
                };

                let resetRespArr = [
                    {
                        resetResponse:{
                            status: 'Accepted'
                        }
                    },
                    {
                        resetResponse:{
                            status: 'Rejected'
                        }
                    }
                ];
                let acceptableTypes = ['Soft', 'Hard'];
            return new Promise(function(resolve, reject){
                if(!Object.keys(data).includes('type') || !acceptableTypes.includes(data.type))
                {
                  reject(resetRespArr[1]);
                }
                resolve(resetRespArr[0]);
            })
            },
            ChangeAvailability: function(data){
                // TODO: save new availability status for station [Issue #chargeStation.id]
                //let randomNumber = Math.floor(Math.random() * 3);
                let changeAvailabilityRespArray = [
                    {
                    changeAvailabilityResponse:{
                        status:"Accepted"
                    }
                },
                {
                    changeAvailabilityResponse:{
                        status:"Rejected"
                    }
                },
                {
                    changeAvailabilityResponse:{
                        status:"Scheduled"
                    }
                }
            ];
                let acceptableTypes = ['Operative', 'Inoperative'];
                return new Promise(function(resolve, reject) {
                    if((!Object.keys(data).includes('connectorId') || !Object.keys(data).includes('type')) ||  (data.connectorId && data.connectorId < 0) ||!acceptableTypes.includes(data.type))
                      reject(changeAvailabilityRespArray[1]);

                    resolve(changeAvailabilityRespArray[0]);
                });
            },
            GetDiagnostics: function(data){
                /**/
                //Bunu olduğu gibi bırak.
                //Tarih kontrolü server üzerinden yapılacak.
                //Cevap içerisinde olması gereken alan "filename". Şüpheli durum, İlker beğle dardışılacak.
                let getDiagnosticsResponseArray = [
                    {
                        GetDiagnosticsResponse:{
                            status: "Accepted"
                        }
                    },
                    {
                        GetDiagnosticsResponse:{
                            status: "Rejected"
                        }
                    }
                ];
                return new Promise((resolve, reject) => {
                    if(!Object.keys(data).includes('location'))
                    {
                        reject(getDiagnosticsResponseArray[1]);
                    }
                    resolve(getDiagnosticsResponseArray[0]);
                })
            },
            ClearCache: function(data)
            {
                //Hangi şarta göre red veya kabul cevabı göndereceğimi öğrenmem lazım. İlker bege danışarık.
                //let randomNumber = Math.floor(Math.random() * 3);
                let olderResponse = {
                    clearCacheResponse:{
                        status: 'Accepted'
                    }
                    };
                let clearCacheRespArr = [
                    {
                    clearCacheResponse:{
                        status: 'Accepted'
                    }
                    },
                    {
                    clearCacheResponse:{
                        status: 'Rejected'
                    }
                    }
                ];
                return new Promise((resolve, reject) => {
                    resolve(clearCacheRespArr[0]);
                })
            },
            UpdateFirmware: function(data){
                /*   retrieveDate: Date.now(),
                     location: 'http://localhost:8001/wsdl',
                     retries: 300,
                     retryInterval: 2500 */
                //let randomNumber = Math.floor(Math.random() * 2);
                let olderResponse = {
                    UpdateFirmware:{
                    status: 'Accepted'
                    }
                };
                let updateFirmwareRespArr = [
                    {
                        UpdateFirmware:{
                        status: 'Accepted'
                        }
                    },
                    {
                        UpdateFirmware:{
                        status: 'Rejected'
                        }
                    }
                ];
                return new Promise((resolve, reject) => {
                    if(!Object.keys(data).includes('retrieveDate') || !Object.keys(data).includes('location')){
                      reject(updateFirmwareRespArr[1]);
                    }
                    resolve(updateFirmwareRespArr[0])
                })
            },
            ChangeConfiguration: function(data){
                //Hangi durumda NotSupported mesajı gönderileceğini bilmiyorum, :) İlker bey
                //Key-value çiftleri olması gereken diziye alınacak, uzmanla görüştükten sonra.
                let olderResponse = {
                    status: 'Accepted'
                };

                let changeConfigurationRespArr = [
                    {
                        changeConfigurationResponse:{
                            status:"Accepted"
                        }
                    },
                    {
                        changeConfigurationResponse:{
                            status:"Rejected"
                        }
                    },
                    {
                        changeConfigurationResponse:{
                            status:"NotSupported"
                        }
                    }
                ];
                return new Promise((resolve, reject) => {
                    if(!Object.keys(data).includes('key') || !Object.keys(data).includes('value') || (data.key && data.key.length > 50) || (data.value && data.value.length > 500))
                    {
                      reject(changeConfigurationRespArr[1]);
                    }
                    resolve(changeConfigurationRespArr[0]);
                })
            },
            RemoteStartTransaction: function(data){
                if(data == null)
                {
                    throw{
                    Fault: {
                        faultcode: "nullData",
                        faultstring: "Data can't be null or undefined",
                        detail:
                            { remoteStartTransactionFault:
                            {errorMessage: "Data can't be null or undefined"}
                            }
                        }

                    }
                }
                //console.log("DataTransfer", Date.now());
                let olderResponse = {
                    RemoteStartTransactionResponse:{
                        status: "Accepted"
                    }
                };
                let remoteStartTransactionResponseArray = [
                    {
                        RemoteStartTransactionResponse:{
                            status: "Accepted"
                        }
                    },
                    {
                        RemoteStartTransactionResponse:{
                            status: "Rejected"
                        }
                    }
                ];
                //let randomNumber = Math.floor(Math.random() * 2);
                return new Promise((resolve, reject) => {
                    if(!Object.keys(data).includes('idTag') || (data.idTag && data.idTag.length > 20)){
                        reject(remoteStartTransactionResponseArray[1]);
                    }
                    resolve(remoteStartTransactionResponseArray[0]);
                })
            },
            RemoteStopTransaction: function(data){
                if(data == null)
                {
                    throw{
                    Fault: {
                        faultcode: "nullData",
                        faultstring: "Data can't be null or undefined",
                        detail:
                            { remoteStopTransactionFault:
                            {errorMessage: "Data can't be null or undefined"}
                            }
                        }

                    }
                }
                //let randomNumber = Math.floor(Math.random() * 2);
                console.log(Object.keys(data));
                let olderResponse = {
                    RemoteStopTransactionResponse:{
                    status: "Accepted"
                    }
                };

                let remoteStopRespArr = [
                    {
                        RemoteStopTransactionResponse:{
                        status: "Accepted"
                        }
                    },
                    {
                        RemoteStopTransactionResponse:{
                        status: "Rejected"
                        }
                    }
                ];
                return new Promise((resolve, reject) => {
                    if(!Object.keys(data).includes('transactionId') || isNaN(data.transactionId) === true)
                    {
                        reject(remoteStopRespArr[1]);
                    }
                    else
                    {
                        resolve(remoteStopRespArr[0]);
                    }
                })
            },
            CancelReservation: function(data){
            console.log(data);
            let randomNumber = Math.floor(Math.random() * 2);
            let olderResponse = {
                CancelReservationResponse:{
                    status: "Accepted"
                }
            };

            let cancelReservationResponseArray = [
                {
                    cancelReservationResponse:{
                        status: "Accepted"
                    }
                },
                {
                    cancelReservationResponse:{
                        status: "Rejected"
                    }
                }
            ];

            return new Promise((resolve, reject) => {
                if(!Object.keys(data).includes('reservationId') || isNaN(data.reservationId) === true)
                {
                    reject(cancelReservationResponseArray[1]);
                }
                resolve(cancelReservationResponseArray[0]);
            })
            },
            DataTransfer: function(data){
                //Hangi şartlarda UnknownMessageId ve UnknownVendorId mesajları verilmeli, gene İlker beye danışılmalı.
                //let randomNumber = Math.floor(Math.random() * 4);
                let olderResponse = {
                    dataTransferResponse:{
                        status: "Accepted",
                        data: "AnyData"
                    }
                };

                let dataTransferRespArray = [
                    {
                        dataTransferResponse:{
                            status: "Accepted",
                            data: "AnyData"
                        }
                    },
                    {
                        dataTransferResponse:{
                            status: "Rejected",
                            data: "AnyData"
                        }
                    },
                    {
                        dataTransferResponse:{
                            status: "UnknownMessageId",
                            data: "AnyData"
                        }
                    },
                    {
                        dataTransferResponse:{
                            status: "UnknownVendorId",
                            data: "AnyData"
                        }
                    }
                ];

                return new Promise((resolve, reject) => {
                    if(!Object.keys(data).includes('vendorId') || (data.vendorId && data.vendorId.length > 255))
                    {
                        //console.log("LESS");
                        reject(dataTransferRespArray[1]);
                    }
                    resolve(dataTransferRespArray[0]);
                })
            },
            GetConfiguration: function(data){
                let randomNumber = Math.floor(Math.random() * 2);

                let olderResponse = {
                    getConfigurationResponse:{
                        configurationKey: "Key",
                        unknownKey: "false"
                    }
                };

                let getConfigurationResponseArray = [
                    {
                        getConfigurationResponse:
                        {
                            configurationKey:{
                                key: "WillBeCorrected",
                                readonly: true,
                                value: "WillBeModified"
                            },
                            unknownKey:"WillBeAskedForThis"
                        }
                    },
                    {
                        getConfigurationResponse:
                        {
                            configurationKey:{
                                key: "WillBeCorrected",
                                readonly: false,
                                value: "WillBeModified"
                            },
                            unknownKey:"WillBeAskedForThis"
                        }
                    }
                ];

                return new Promise((resolve, reject) => {
                    if(!Object.keys(data).includes('key') || (data.key && data.key.length > 50))
                    {
                      reject(getConfigurationResponseArray[1]);
                    }
                    resolve(getConfigurationResponseArray[0]);
                })
            },
            GetLocalListVersion: function(data){
                //Olduğu gibi kalsın şimdilik.
                return new Promise((resolve, reject) => {
                    resolve({
                        getLocalListVersionResponse:{
                            listVersion: 8
                        }
                    })
                })
            },
            ReserveNow: function(data){
                //Faulted, Occupied, Unavailable cevapları İlker beye danışılacak.
                let olderResponse = {
                    reserveNowResponse:{
                        status: "Accepted"
                    }
                };

                let randomNumber = Math.floor(Math.random() * 5);

                let reserveNowResponseArray = [
                    {
                        reserveNowResponse:{
                            status:"Accepted"
                        }
                    },
                    {
                        reserveNowResponse:{
                            status:"Faulted"
                        }
                    },
                    {
                        reserveNowResponse:{
                            status:"Occupied"
                        }
                    },
                    {
                        reserveNowResponse:{
                            status:"Rejected"
                        }
                    },
                    {
                        reserveNowResponse:{
                            status:"Unavailable"
                        }
                    }
                ];
                return new Promise((resolve, reject) => {
                    if(!Object.keys(data).includes('connectorId') || (data.connectorId && data.connectorId < 0) || !Object.keys(data).includes('expiryDate') || !Object.keys(data).includes('idTag') || (data.idTag && data.idTag.length > 20) || !Object.keys(data).includes('reservationId') || (data.connectorId && isNaN(data.connectorId) === true) || (data.reservationId && isNaN(data.reservationId) === true))
                    {
                        reject(reserveNowResponseArray[3]);
                    }
                    resolve(reserveNowResponseArray[0]);
                })
            },
            SendLocalList: function(data){
                let olderResponse = {
                    sendLocalListResponse: {
                        status: "Accepted",
                        hash: "XXCCXX"
                    }
                };
                //HashError, NotSupported, VersionMismatch cevaplarının gönderimi spesifik. -> İlker CANKAR
                //let randomNumber = Math.floor(Math.random() * 5);
                let sendLocalListResponseArray = [
                    {
                        sendLocalListResponse:{
                            status:"Accepted",
                            hash: "WillBeRecorrected"
                        }
                    },
                    {
                        sendLocalListResponse:{
                            status:"Failed",
                            hash: "WillBeRecorrected"
                    }},
                    {
                        sendLocalListResponse:{
                            status:"HashError",
                            hash: "WillBeRecorrected"
                        }
                    },
                    {
                        sendLocalListResponse:{
                            status:"NotSupported",
                            hash: "WillBeRecorrected"
                    }},
                    {
                        sendLocalListResponse:{
                            status:"VersionMismatch",
                            hash: "WillBeRecorrected"
                        }
                    }
                ];
                let acceptableUpdateTypes = ["Differential", "Full"];
                let acceptableStatusTypes = ["Accepted", "Blocked", "Expired", "Invalid", "ConcurrentTx"];
                return new Promise((resolve, reject) => {
                    if(!Object.keys(data).includes('updateType') || !Object.keys(data).includes('listVersion') ||  !acceptableUpdateTypes.includes(data.updateType) || !acceptableStatusTypes.includes(data.localAuthorisationList.idTagInfo.status) || (data.listVersion && isNaN(data.listVersion)))
                    {
                        reject(sendLocalListResponseArray[1]);
                    }
                    resolve(sendLocalListResponseArray[0])
                })
            }
        }
    }
};

var xml = require('fs').readFileSync('chargepoint.wsdl', 'utf8');
process.on('uncaughtException', function (err) {
console.log('Caught exception: ', err);
process.exit(0);
});

/*
let cmsIpNPort = 'http://184.72.207.45:8000/';
let ownIp = 'http://3.89.102.141:8001/';
*/

let cmsIpNPost = 'http://44.201.178.41:8000/';
let ownIp = 'http://18.212.194.189:8001/';


function clientPromise(stationId, targetEndpoint, actionName){
return new Promise((resolve, reject) => {

soap.createClient(`${targetEndpoint}?wsdl`, {forceSoap12Headers: true}, function(error, client){
if(error)
  {
     reject(error);
     //res.sendStatus(404);

     //console.log(error);
  }
else if(client){
        client.addSoapHeader('<h:chargeBoxIdentity xmlns:h="urn://Ocpp/Cp/2012/06/" >'+ stationId + '</h:chargeBoxIdentity>');
        client.addSoapHeader('<a:MessageID>urn:uuid:' + "uuid4" + '</a:MessageID>');
        client.addSoapHeader(`<a:From><a:Address>${ownIp}wsdl</a:Address></a:From>`);
        client.addSoapHeader('<a:ReplyTo><a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address></a:ReplyTo>');
        client.addSoapHeader('<a:To>'+ targetEndpoint + '</a:To>');
        client.addSoapHeader('<a:Action soap:mustUnderstand="1">'+ `/${actionName}` +'</a:Action>');
        resolve(client);

}
})
})};


////////////////////////////////////////////////////////// AUTHORIZATION /////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////// AUTHORIZATION /////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////// BOOTNOTIFICATION /////////////////////////////////////////////////////////////////////////////////////


let bootNotificationRequest = {
bootNotificationRequest: {
chargeBoxIdentity: 134,
chargePointVendor: 'Maksopus',//Zaruri
chargePointModel: 'SuperMakso',//Zaruri
chargePointSerialNumber: 'gir.vat.mx.000e48',
chargeBoxSerialNumber: 'gir.vat.mx.000e48',
firmwareVersion: '1.0.49',
iccid: '1',
imsi: '',
meterType: 'DBT NQC-ACDC',
meterSerialNumber: 'gir.vat.mx.000e48'
}
};

////////////////////////////////////////////////////////// BOOTNOTIFICATION /////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////// STARTTRANSACTION /////////////////////////////////////////////////////////////////////////////////////

let startTransactionRequest = {
startTransactionRequest: {
connectorId: 1,//Zaruri
idTag: 'idTag',//Zaruri
timestamp: Date.now(),//Zaruri
meterStart: 402,//Zaruri
reservationId: 355
}
};

////////////////////////////////////////////////////////// STARTTRANSACTION /////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////// STOPTRANSACTION /////////////////////////////////////////////////////////////////////////////////////

let stopTransactionRequest = {
stopTransactionRequest:
{
transactionId: 400, //Zaruri
idTag: 'idTag',
timestamp: Date.now(),//Zaruri
meterStop: 544,//Zaruri
transactionData:{
timestamp: Date.now()
}
}
};

////////////////////////////////////////////////////////// STOPTRANSACTION /////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////// HEARTBEAT /////////////////////////////////////////////////////////////////////////////////////

let heartbeatRequest = {
heartbeatRequest:{}
};


////////////////////////////////////////////////////////// HEARTBEAT /////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////// METERVALUES /////////////////////////////////////////////////////////////////////////////////////


let meterValuesRequest = {
meterValuesRequest:{
connectorId: 377,
transactionId: 902,
meterValue:{
timestamp: Date.now()
}
}
};


////////////////////////////////////////////////////////// METERVALUES /////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////// STATUSNOTIFICATION /////////////////////////////////////////////////////////////////////////////////////

let statusNotificationRequest = {
statusNotificationRequest: {
connectorId: 45,//Zaruri
status: 'Available',//Zaruri
errorCode: 'NoError',//Zaruri
timestamp: Date.now(),
vendorId:'sampleVendorId',
vendorErrorCode: 'NoError'
}
};



////////////////////////////////////////////////////////// STATUSNOTIFICATION /////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////// FIRMWARESTATUSNOTIFICATION /////////////////////////////////////////////////////////////////////////////////////

let firmwareStatusNotificationRequest = {
firmwareStatusNotificationRequest:{
status: "DownloadFailed"
}
};


////////////////////////////////////////////////////////// FIRMWARESTATUSNOTIFICATION /////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////// DIAGNOSTICSSTATUSNOTIFICATION /////////////////////////////////////////////////////////////////////////////////////

let diagnosticsStatusNotificationRequest = {
diagnosticsStatusNotificationRequest:{
status: "Uploaded"//Zaruri
}
};


////////////////////////////////////////////////////////// DIAGNOSTICSSTATUSNOTIFICATION /////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////// DATATRANSFER /////////////////////////////////////////////////////////////////////////////////////

let dataTransferRequest = {
dataTransferRequest:{
vendorId: 'MY-3XX-A65',//Zaruri
messageId: '45WCaqsdkjh788@14',
data: 'Vessel'
}
};

////////////////////////////////////////////////////////// DATATRANSFER /////////////////////////////////////////////////////////////////////////////////////



router.post('/authorize', (req, res, next) => {
//Bu adrese (route'a) XML formatında veri gönderildiğinde, içeriğe req.body üzerinden erişilebilir.
//console.log(req.body['soap:envelope']['soap:body'][0]);



let authorizeRequestInJSON = {
authorizeRequest: {
idTag: 225
}
};

let authorizeRequestInXML = `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope"
        xmlns:cs="urn://Ocpp/Cs/2012/06/"
        xmlns:wsa="http://www.w3.org/2005/08/addressing">
    <soap:Header>
        <cs:chargeBoxIdentity soap:mustUnderstand="true">XXX01</cs:chargeBoxIdentity>
        <wsa:Action soap:mustUnderstand="true">/Authorize</wsa:Action>
        <wsa:MessageID>123</wsa:MessageID>
        <wsa:From><wsa:Address>http://from-endpoint</wsa:Address></wsa:From>
        <wsa:ReplyTo soap:mustUnderstand="true"><wsa:Address>http://www.w3.org/2005/08/addressing/anonymous</wsa:Address></wsa:ReplyTo>
        <wsa:To soap:mustUnderstand="true"><wsa:Address>http://to-endpoint</wsa:Address></wsa:To>
    </soap:Header>
    <soap:Body>
        <cs:authorizeRequest>
            <cs:idTag>1234567</cs:idTag>
        </cs:authorizeRequest>
    </soap:Body>
</soap:Envelope>`;




clientPromise(134, `${cmsIpNPort}wsdl`, "Authorize").then(result => result.Authorize(authorizeRequestInJSON).then(
function(result)
{
res.send(result);
}
)).catch(err => {
   if(err)
    res.send(err);
});
})

router.get('/main', (req, res, next) => {
    res.send('Salam');
})

///////////////////////////////////////////// 1.5 ROUTES //////////////////////////////////////////////////////////////////////////////////

router.post('/bootnotification15',(req, res, next) => {
clientPromise(134, `${cmsIpNPort}wsdl`, "BootNotification").then(result => result.BootNotification(bootNotificationRequest).then(
function(result)
{
res.send(result);
}
)).catch(err => {
    if(err)
     res.send(err);
 });
});


router.post('/starttransaction15', (req, res, next) => {
clientPromise(134, `${cmsIpNPort}wsdl`, "StartTransaction").then(result => result.StartTransaction(startTransactionRequest).then(result => res.send(result))).catch(err => {
    if(err)
     res.send(err);
 });
});


router.post('/stoptransaction15', (req, res, next) => {
clientPromise(134, `${cmsIpNPort}wsdl`, "StopTransaction").then(result => result.StopTransaction(stopTransactionRequest)).then(result => res.send(result)).catch(err => {
    if(err)
     res.send(err);
 });
});

router.post('/heartbeat15', (req, res, next) => {
clientPromise(134, `${cmsIpNPort}wsdl`, "Heartbeat").then(result => result.Heartbeat(heartbeatRequest)).then(result => res.send(result)).catch(err => {
    if(err)
     res.send(err);
 });
});

router.post('/metervalues15', (req, res, next) => {
clientPromise(134, `${cmsIpNPort}wsdl`, "MeterValues").then(result => result.MeterValues(meterValuesRequest)).then(result => res.send(result)).catch(err => {
    if(err)
     res.send(err);
 });
});

router.post('/statusnotification15', (req, res, next) => {
clientPromise(134, `${cmsIpNPort}wsdl`, "StatusNotification").then(result => result.StatusNotification(statusNotificationRequest)).then(result => res.send(result)).catch(err => {
    if(err)
     res.send(err);
 });
});

router.post('/firmwarestatusnotification15', (req, res, next) => {
clientPromise(134, `${cmsIpNPort}wsdl`, "FirmwareStatusNotification").then(result => result.FirmwareStatusNotification(firmwareStatusNotificationRequest)).then(result => res.send(result)).catch(err => {
    if(err)
     res.send(err);
 });
});

router.post('/diagnosticsstatusnotification15', (req, res, next) => {
clientPromise(134, `${cmsIpNPort}wsdl`, "DiagnosticsStatusNotification").then(result => result.DiagnosticsStatusNotification(diagnosticsStatusNotificationRequest)).then(result => res.send(result)).catch(err => {
    if(err)
     res.send(err);
 });
});

router.post('/datatransfer15', (req, res, next) => {
clientPromise(134, `${cmsIpNPort}wsdl`, "DataTransfer").then(result => result.DataTransfer(dataTransferRequest)).then(result => res.send(result)).catch(err => {
    if(err)
     res.send(err);
 });
});

///////////////////////////////////////////// 1.5 ROUTES //////////////////////////////////////////////////////////////////////////////////
const wsFunc = (wss) => {

  wss.on('connection', ws =>
    {
        console.log('There is a new client! -->'+moment().format());

        ws.on('message', (message) => {
            //console.log(message.data);

            let incomingMessage = JSON.parse(message);
            let uuid = incomingMessage[1];

            let methodName = incomingMessage[2];
            let methodPayload = incomingMessage[3];
            let outgoingMessage = null;
            //RemoteStartTransaction Response
            if(methodName === 'RemoteStartTransaction' && Object.keys(methodPayload).includes('idTag'))
            {
                outgoingMessage = [3, uuid, { "status": "Accepted" }];
            }
            else if(methodName === 'RemoteStartTransaction' && !Object.keys(methodPayload).includes('idTag'))
            {
                outgoingMessage = [4, uuid, { "status": "Rejected" }];
            }
            else if(methodName === 'RemoteStopTransaction' && Object.keys(methodPayload).includes('transactionId'))
            {
                outgoingMessage = [3, uuid, {"status": "Accepted"}];
            }
            else if(methodName === 'RemoteStopTransaction' && !Object.keys(methodPayload).includes('transactionId'))
            {
                outgoingMessage = [4, uuid, {"status": "Rejected"}];
            }


            ws.send(JSON.stringify(outgoingMessage));
        })
        ws.on('close', () => {
            console.log('One of clients is disconnected!');
          })


    }

  )


}

module.exports = { router, ChargePointService, xml, wsFunc };

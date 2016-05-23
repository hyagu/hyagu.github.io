/* 
*
* This File contains all those related to Controlling TV via JAPIT WIXP .
* This can be reused in as is or even modified freely.
*
*/

function Exercise01ModelInit()
{
	RegisterCallbacks();
}

/* assigning the callback function from the TV to another function*/
function RegisterCallbacks(){
	//alert("Enter RegisterCallbacks \n");
	JAPITWIXPPlugin.WebIXPOnReceive = WIXPResponseHandler;
	//alert("Exit RegisterCallbacks \n");
}

/* this function will call the required function depending on the response received from the TV */
function WIXPResponseHandler(WIXPResponseJSON){
	alert("Enter WIXPResponseHandler \n");
	try {
		parsedWIXPJSON = JSON.parse(WIXPResponseJSON);
		PrintLogsWIXPFromTV(parsedWIXPJSON);
		
		if (parsedWIXPJSON.Fun == "ClockControl") {
			DisplayCurrentDateAndTime(parsedWIXPJSON);
		} 
		else if (parsedWIXPJSON.Fun == "UpgradeControl") {
			DisplayUpgradeControl(parsedWIXPJSON);
		}
		else if (parsedWIXPJSON.Fun == "ProfessionalSettingsControl") {
			DisplayProfessionalSettingsControl(parsedWIXPJSON);
		} 
		//else if (parsedWIXPJSON.Fun == "ChannelSelection") {
		//	HandleChannelSelectionResponse(parsedWIXPJSON);	
		
		else {
			alert("Do nothing !! \n");
		}
	} catch(e){
		alert(e);
		return e;
	}
	alert("Exit WIXPResponseHandler \n");
}

/* function to send commands to TV */
function sendWIxPCommand(command) {
	alert("Enter sendWIxPCommand \n");
	try {
		var WIXPJSONStringForm = JSON.stringify(command);
		PrintLogsWIXPToTV(command);
		JAPITWIXPPlugin.WebIxpSend(WIXPJSONStringForm);
		alert("Exit sendWIxPCommand \n");
	}
	catch (e) {
		alert("Exit sendWIxPCommand: " + e + " \n");
	}
}

/* create some attributes of the WIXP object */
function CreateJAPITObjectForWIXPSvc(){
	this.Svc    = "WIXP";
	this.SvcVer = "1.0";
	this.Cookie = 222;
}

/* a function to send a "Request" command to the TV to get the system date and time */
function getSystemDate(){
	alert("Enter getSystemDate \n");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie         = 1050;
	JAPITObjForWIXPSvc.CmdType        = "Request";
	JAPITObjForWIXPSvc.Fun            = "ClockControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ClockControlParameters" :[
				"ClockTime",
				"CurrentDate"
		]
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

/* a function to send a "Request" command to the TV to get the ProfessionalSettings */
function getProfessionalSettings(){
	alert("Enter getSystemDate \n");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie         = 1051;
	JAPITObjForWIXPSvc.CmdType        = "Request";
	JAPITObjForWIXPSvc.Fun            = "ProfessionalSettingsControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ProfessionalSettingsParameters" :[
				"RawWIXP",
				"AutoUpgradeDetails",
				"NetworkStatus",
				"TVModel",
				"SerialNumber",
				"RoomID",
				//"VolumeLimits",
				"RebootMode",
				"CustomDashboardServerURL",
				"IdentificationSettings",
				"SwitchOnChannel",
				"PowerSettings",
				"Resources"
		]
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

/* a function to send a "Change" command to the TV to set the system date and time */
function setSystemDate(newDate, newTime){
	alert("Enter setSystemDate \n");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie         = 1060;
	JAPITObjForWIXPSvc.CmdType        = "Change";
	JAPITObjForWIXPSvc.Fun            = "ClockControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ClockTime":newTime,
		"CurrentDate":newDate
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
} 

function getCloneInformation(){

	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie  = 1082;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun     = "UpgradeControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"UpgradeControlRequestParameters": ["CurrentMainSoftwareVersion", "CurrentCloneVersions"]
	}
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

function getKeys(){
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie  = 1189;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun     = "ContentSecurityControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		 "VSecureStatus": [ "VSecureKeyStatus", "VSecureTVData" ]
	}
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

function TuneViaChannelNumber(channelNum) {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 1091;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "ChannelSelection";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ChannelTuningDetails": {
 			"ChannelNumber": channelNum,
 		}
 	};

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function IPTuning(url) {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 1091;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "ChannelSelection";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ChannelTuningDetails": {
 			"URL": url,
 		}
 	};

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function RFTuning(freq,sid,type){
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 1092;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "ChannelSelection";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ChannelTuningDetails": {
			"TuningType": type,
			"Freq": freq,			
			"ServiceID": sid,
			"ONID": 65535,	//1,
			"NID": 65535,	//0,
			"TSID": 65535,	//11,
			"Modulation": "Auto",
			"SymbolRate": 48750//6874000
		}
 	};

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function getSubtitleLang(){
	alert("Enter getSubtitleLang \n");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 2060;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun     = "Subtitles";

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function getAudioLang(){
	alert("Enter getAudioLang \n");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 2061;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun     = "AudioLanguage";

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function TuneTo(source){
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 1092;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "Source";
	JAPITObjForWIXPSvc.CommandDetails = {
		"TuneToSource": source
 	};

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function RequestApplicationControl(){
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 295;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun     = "ApplicationControl";

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function RequestApplicationControl2(){
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 296;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun     = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = 
	{
		 "RequestListOfAvailableApplications": {
			"Filter": [ "NonNative" ]
			},
		 "RequestListForApplicationAttributesValue" : ["WeatherForecast"]
		}
	sendWIxPCommand(JAPITObjForWIXPSvc);
}


function ActivateTeletext(state){
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 301;	
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = 
	{
		"ApplicationDetails" :
		{ "ApplicationName" : "Teletext" ,
		  "ApplicationAttributes" : 
			{
				"TeletextPage": 100,
				"TeletextSubcode": 34 
			}
		},
		"ApplicationState": state
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function ActivateApp(){
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 302;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = 	{
		"ApplicationDetails" :
		{ "ApplicationName" : "Weather",
		  "ApplicationType" : "Native"	},
		//  "ApplicationSubState" : "Settings"},
		"ApplicationState": "Activate"
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function ActivateSmartTV(){
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 304;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = 	{
		"ApplicationDetails" :	{ 
			"ApplicationName" : "SmartTV"},
		"ApplicationState": "Activate"
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function WeatherRequest(){
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 303;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun     = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = 	{
		"RequestApplicationAttributesValueDetails": [
		{ "ApplicationName" : "Weather",
		  "ApplicationType" : "Native", 
		   "ApplicationAttributes": {
				"GeonameLocationID": 1233434534,
				"GuestLanguage": "ger"
			},
		"RequestListForApplicationAttributesValue" : ["WeatherForecast"]
		},	
	]
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function changeCDBstate(state) {
	alert("ActivateCustomDashBoard to " + state + " \n");

	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie         = 1090;
	JAPITObjForWIXPSvc.CmdType        = "Change";
	JAPITObjForWIXPSvc.Fun            = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = 
	{
		"ApplicationDetails" :
		{ "ApplicationName" : "CustomDashboard" },
		"ApplicationState": state
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function PowerOff(){
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 18;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "PowerState";
	JAPITObjForWIXPSvc.CommandDetails = 	{
		"ToPowerState" : "Standby"
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}



function RequestSubtitles(){
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 295;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun     = "Subtitles";

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

/*  a function to get the number of channels that exist on the TV by sending a WIXP command with the required details  */
function GetNumberOfChannelsInTV() {

	alert("Enter GetNumberOfChannelsInTV \n");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 1050;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun     = "ChannelList";
	JAPITObjForWIXPSvc.CommandDetails = {	
			"ContentLevel" : "CompleteChannelDetails",
			"SearchDirection":"NEXT",
			"SearchFromChannelNumber":1,
			"Loop":"No",
			"NumberOfChannels":2,
	            		/* ContentLevel can have one of the following values: "BasicChannelDetails", "CompleteChannelDetails", or "NumberOfChannels" */
			"Filter": ["ALL"]
	};

	sendWIxPCommand(JAPITObjForWIXPSvc);
	alert("Exit GetNumberOfChannelsInTV \n");
}

/*  a function to get the channels details from the TV by sending a WIXP command with the required details  */
function requestChannelsFromTV(start) {

	alert("Enter requestChannelsFromTV \n");
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 1055;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun     = "ChannelList";
	JAPITObjForWIXPSvc.CommandDetails = {	
			"ContentLevel" : "BasicChannelDetails",            		/* "BasicChannelDetails" "CompleteChannelDetails" "NumberOfChannels" */
			"SearchDirection":"CURRENT",							/* <string>, <<OPTIONAL>> <<OPTIONAL Meaning not required if the "ContentLevel" = "NumberOfChannels">> */
			"SearchFromChannelNumber": start,							/* 1 to _WIXP_MAX_CHANNELS_SUPPORTED, <integer>, <<OPTIONAL> <<OPTIONAL Meaning not required if the "ContentLevel" = "NumberOfChannels">> */
   			"Loop":"Yes",											/* <<OPTIONAL>> <<OPTIONAL Meaning not required if the "ContentLevel" = "NumberOfChannels">> */
			"NumberOfChannels": 40, 					/* <<OPTIONAL>> <<OPTIONAL Meaning not required if the "ContentLevel" = "NumberOfChannels">> */
			"Filter": ["ALL"]
	};

	sendWIxPCommand(JAPITObjForWIXPSvc);

	alert("Exit requestChannelsFromTV \n");
}

// USERINPUT
function AllKeyForward(){
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 475;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "UserInputControl";
	JAPITObjForWIXPSvc.CommandDetails = {	
		"VirtualKeyForwardMode" : "AllVirtualKeyForward"
	}
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function NoKeyForward(){
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 476;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "UserInputControl";
	JAPITObjForWIXPSvc.CommandDetails = {	
		"VirtualKeyForwardMode" : "DontForwardAnyVirtualKey"
	}
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function UserInputRequest(){
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 478;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun     = "UserInputControl";
	
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function keyDownHandler(e) {
	alert("Enter keyDownHandler keydown handler - key received " + e.keyCode + "  \n");

	keyHandler(e.keyCode);
	alert("Exit keyDownHandler \n");
}

function OnKeyReceivedHandler(event) {
	// alert("Enter onKeyReceived - key received " + event + " ******************************** \n");
	var eventDetail = event.detail; //It contains key code and window ID                       
	var eventval = eventDetail.split(',');
	var keyStatus = parseInt(eventval[1]);
	var keyCode = -1;

	alert("Enter OnKeyReceivedHandler keystatus : " + keyStatus + "  keycode : " + keyCode + "\n");
	
	if(keyStatus == 2){
		keyCode = parseInt(eventval[0]);
		keyHandler(keyCode);
	}
	// keyHandler(event);
	alert("Exit OnKeyReceivedHandler \n");
}


function keyHandler(keyCode) {
	alert("Enter keyHandler - key received " + keyCode + " !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! \n");
	try {
		switch (keyCode) {
			case VK_LEFT:
				alert("arrow left pressed");
				window.location.reload(true);
				break;
	
			case VK_4:
				alert("digit 4 pressed - CB OFF");
				// document.getElementById('DivIO').append("Press digit 5 to activate the dashboard again.");
				state = "Deactivate";
				changeCDBstate(state);
				break;

			case VK_6:
				alert("digit 5 pressed - CB ON");
				state = "Activate";
				changeCDBstate(state);
				break;

			case VK_7:
				alert("digit 7 pressed - TXT OFF");
				state = "Deactivate";
				ActivateTeletext(state);
				break;
				
			case VK_9:
				alert("digit 9 pressed - TXT ON");
				state = "Activate";
				ActivateTeletext(state);
				break;

			default:
				alert("Nothing to handle \n");
				break;
		}
	}
	catch (e) {
		alert(e);
	}

	alert("Exit keyHandler \n");
}

/* 
*
* This can be reused in as is or even modified freely.
*
*/

var IdDateText;
var IdTimeText;
var IdLinuxDateTime;

var IdDateInputText;
var IdTimeInputText;

var IdFWVersion;
var IdSSBSettingsVersion;
var IdChannelTableVersion;

const SysTime = "Current System Date: ";
const SysDate = "Current System Time: ";
const LinuxDateTime = "Linux Date Time: ";
const InputSysTime = "System Time: ";
const InputSysDate = "System Date: ";
const FWVesrion = "MainFirmware Vesrion: ";
const TVSettingsVersion = "TVSettings Version/Identifier: ";
const TVChannelListVersion = "TVChannelList Version/Identifier: ";
const IPAddress = "IPAddress: "; 
const RoomID = "Room ID: "; 
const SerialNumber = "S/N: "; 
const TVModel = "TV Model: "; 
const ChannelNumber = "Channel Number: ";
const ChannelSelectionStatus = "Channel Selection Status: ";
const ChannelSelectionFailureReason = "Channel Selection Failure Reason: ";
const ChannelPlayingStatus = "Channel Playing Status: ";
const ChannelPlayingStatusErrorDetails = "Channel Playing Status Error Details : ";

function Exercise01ViewInit()
{
	CreateHTMLElements();
}

function CreateHTMLElements()
{
	IdDateText = document.getElementById("IdDateText");
	IdTimeText = document.getElementById("IdTimeText");
	IdLinuxDateTime = document.getElementById("IdLinuxDateTime");
	IdDateInputText = document.getElementById("IdDateInputText");
	IdTimeInputText = document.getElementById("IdTimeInputText");
	
	IdMainFirmwareVersion = document.getElementById("IdMainFirmwareVersion");
	IdTVSettingsVersion = document.getElementById("IdTVSettingsVersion");
	IdTVChannelListVersion = document.getElementById("IdTVChannelListVersion");
}

function DisplayUpgradeControl(WIXPJsonResponse)
{
	IdMainFirmwareVersion.innerHTML = FWVesrion + WIXPJsonResponse.CommandDetails.UpgradeControlParameters[0]["CloneItemVersionNo"];
	IdTVSettingsVersion.innerHTML = TVSettingsVersion + WIXPJsonResponse.CommandDetails.UpgradeControlParameters[1]["CloneItemVersionNo"];
	IdTVChannelListVersion.innerHTML = TVChannelListVersion + WIXPJsonResponse.CommandDetails.UpgradeControlParameters[4]["CloneItemVersionNo"];		
}

function DisplayProfessionalSettingsControl(WIXPJsonResponse)
{
	IdIPAddress.innerHTML = IPAddress + WIXPJsonResponse.CommandDetails.NetworkStatus.IPAddress;
	IdRoomID.innerHTML = RoomID + WIXPJsonResponse.CommandDetails.RoomID;
	IdSerial.innerHTML = SerialNumber + WIXPJsonResponse.CommandDetails.SerialNumber;
	IdModel.innerHTML = TVModel + WIXPJsonResponse.CommandDetails.TVModel;
}

function HandleChannelSelectionResponse(WIXPJsonResponse)
{
	//ShowDivIO("DivIO1");
	IdChannelNumber.innerHTML = ChannelNumber + WIXPJsonResponse.CommandDetails.ChannelTuningDetails.ChannelNumber;
	IdChannelSelectionStatus.innerHTML = ChannelSelectionStatus + WIXPJsonResponse.CommandDetails.ChannelSelectionStatus;
	if(WIXPJsonResponse.CommandDetails.ChannelSelectionStatus == "Failure")
	{
		IdChannelSelectionFailureReason.innerHTML = ChannelSelectionFailureReason + WIXPJsonResponse.CommandDetails.ChannelSelectionStatusErrorDetails;
	}
	else
	{
		IdChannelPlayingStatus.innerHTML = ChannelPlayingStatus + WIXPJsonResponse.CommandDetails.ChannelPlayingStatus;
		if(WIXPJsonResponse.CommandDetails.ChannelPlayingStatus == "Error")
		{
			IdChannelPlayingStatusErrorDetails.innerHTML = ChannelPlayingStatusErrorDetails + WIXPJsonResponse.CommandDetails.ChannelPlayingStatusErrorDetails;
		}
		else
		{
			IdChannelPlayingStatusErrorDetails.innerHTML = ChannelPlayingStatusErrorDetails + "None";
		}
		IdChannelSelectionFailureReason.innerHTML = ChannelSelectionFailureReason + "None";
	}
}
				
function DisplayCurrentDateAndTime(WIXPJsonResponse)
{
	var currentdate = new Date(); 
	var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
				
	if(WIXPJsonResponse)
	{
		var clockTime = WIXPJsonResponse.CommandDetails.ClockTime;
		var currentDate = WIXPJsonResponse.CommandDetails.CurrentDate;
	}
	else
	{
		var clockTime = "Unkown";
		var currentDate = "Unkown";
	}

	IdDateText.innerHTML = SysDate + currentDate;
	IdTimeText.innerHTML = SysTime + clockTime;
	IdLinuxDateTime.innerHTML = LinuxDateTime + datetime;
}

function ChangeNewSystemDateAndTime()
{
	setSystemDate(IdDateInputText.value, IdTimeInputText.value);
}

function GetSystemAndLinuxDateAndTime()
{
	getSystemDate();
}

function TVInfoRequest()
{
	getSystemDate();
	getCloneInformation();
	getProfessionalSettings();
	//getKeys();
	getAudioLang();
	getSubtitleLang();
}

function KeyChange()
{
	AllKeyForward();
}

function NoKeyChange()
{
	NoKeyForward();
}

function TuneFunction(){
	//ActivateApp();
	//ActivateTeletext("Activate");
	//ActivateSmartTV();
	changeCDBstate("Deactivate");
}

function TuneToCh2(){
	TuneViaChannelNumber(2);
}

function GetChannelList()
{
	//TuneTo("MainTuner");
	//TuneTo("HDMI1");
	//GetNumberOfChannelsInTV();
	//RequestApplicationControl2();
	//UserInputRequest();
	//RFTuning(298000,1105,"DVBC");
	//RFTuning(330000,701,"DVBC");
	//ActivateApp();
	//WeatherRequest();
	//setTimeout(function() {PowerOff();}, 1000);
	//ActivateTeletext();
	//RequestSubtitles();
	//getKeys();
	url1 = "multicast://239.192.3.7:1234/0/0/0/";
	IPTuning(url1);
	//TuneViaChannelNumber(68);
	
	
	/*
	if(channelListAlreadyQueried == "false")
	{
		GetNumberOfChannelsInTV();
		channelListAlreadyQueried = "true";
	}
	else
	{
		//Dont do anything
	}
	//ShowDivIO("DivIO2");*/
}
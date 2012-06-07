/* 
Text Twist
Michael Benin 2012
*/

/* 	Begin App */
var TextTwist = (function(w, d)
{
/* 	Initialize Variables */
	var wordmap = gMap(), timer = 120;
	
	w.addEventListener('load', function(e)
	{
		var body = d.getElementsByTagName('body')[0],
		start = gId('start'),
		menu = gId('menu'),
		words = gId('words'),
		answer = gId('answer'),
		twist = gId('twist'),
		enter = gId('enter'),
		lastw = gId('lastw'),
		letters = gId('letters'),
		time = gId('time'),
		score = gId('score');
		
		start.addEventListener('click', function(e)
		{
			body.id = "startgame";
		});
	});

/* Private Methods */	
	function gId(id)
	{
		return d.getElementById(id);	
	}
	
	function gMap()
	{
		var w = {};
		/*
		if("WebSocket" in w)
		{
			var wsUri = "ws://66.108.74.131/";
			var protocol = "echo-protocol";

   			websocket = new WebSocket(wsUri, protocol);
    		websocket.addEventListener('open', function(evt)
    		{
        		var obj = {"msg":"A new user has joined"};
				websocket.send(JSON.stringify(obj));
    		});

   			websocket.addEventListener('close', function (evt)
    		{
        		writeToScreen("Disconnected");
    		});
   
			websocket.addEventListener('message', function(evt)
    		{  
				var msg = JSON.parse(evt.data);
        		writeToScreen('<span style="color:blue;">Response: '+ msg.msg + '</span>');
    		});
    	
			websocket.addEventListener('error', function(evt)
    		{
        		writeToScreen('<span style="color:red;">Error: </span> '+ evt.data);
    		});
		}
		else
		{
			var xmlhttp = new XMLHttpRequest();	
			xmlhttp.open("GET","wordmap.json",true);
			xmlhttp.send(null);
			xmlhttp.onreadystatechange=function()
			{
				if (xmlhttp.readyState==4 && xmlhttp.status==200)
				{
					wordmap = parseJSON(xmlhttp.responseText);
				}
					
			}
		}
		*/
		
		return w = 
					{
						response:
						[{
							letters:["m", "o", "p", "e", "d", "r"], 
							words:["", ""]
						},
						{
							letters:["m", "o", "p", "e", "d", "r"], 
							words:["", ""]	
						}]
					};
	}
	
	
	
})(window, document);

/* 	End App */

/* Google Analytics */
(function(d, w) 
{
	w._gaq = w._gaq || [];
	_gaq.push(['_setAccount', 'GA ID HERE']);
	_gaq.push(['_trackPageview']);
	var ga, s = d.getElementsByTagName('script')[0];
	ga = d.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == d.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';  
	ga.async = true;
	s.parentNode.insertBefore(ga, s);
})(document, window);
/* End Google Analytics */

/* Facebook API */
(function(d)
{
	var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement('script'); 
	js.id = id; 
	js.async = true;
	js.src = "//connect.facebook.net/en_US/all.js";
	ref.parentNode.insertBefore(js, ref);
})(document);

window.fbAsyncInit = function() 
{
    FB.init({
      appId      : '323907284355490', //'YOUR_APP_ID', 
      //channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', 
      status     : true, 
      cookie     : true, 
      xfbml      : true,  
	  frictionlessRequests : true
    });
	 
	FB.getLoginStatus(function(response){
        //runFbInitCriticalCode(); 
    });
};
/* End Facebook API */

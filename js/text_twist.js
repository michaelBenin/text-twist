/* 
Text Twist
Michael Benin 2012
*/

/* 	Begin App */
var TextTwist = (function(w, d)
{
/* 	Initialize Variables */
	var wordmap = gMap(), set = 0, currentAnswer = [], timer = 120;
	
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
			var startGame = new Game(set);
		});
		
		function Game(word)
		{
			d.addEventListener('keydown', function(e)
			{
				var k = e.keyCode;
				var letters = wordmap.response[set].letters;
				if (wordmap.response[set].letters.indexOf(keys[k]) !== -1)
				{
					var index = wordmap.response[set].letters.indexOf(keys[k]);
					currentAnswer.push(keys[k]);
					letters.splice(index, 1);
					alert("Letters left: "+letters.join(''));
					alert("Current Answer: " +currentAnswer.join(''));
					
				}
				/*
					for(l in wordmap.response[set].letters)
					{
						if(keys[k] === wordmap.response[set].letters[l])
						{
							var inanswer = false;
							for(i in currentAnswer)
							{
								if (keys[k] === currentAnswer[i])
								{
									var inanswer = true;	
								}
							}
							
							if(inanswer === false)
							{
								currentAnswer.push(keys[k]);
								var finalAnswer = currentAnswer.join('');
								alert(finalAnswer);
							}
						}
					}
					
				}
				*/
			});
		}
		
		var keys = {
			65:'A',
			66:'B',
			67:'C',
			68:'D',
			69:'E',
			70:'F',
			71:'G',
			72:'H',
			73:'I',
			74:'J',
			75:'K',
			76:'L',
			77:'M',
			78:'N',
			79:'O',
			80:'P',
			81:'Q',
			82:'R',
			83:'S',
			84:'T',
			85:'U',
			86:'V',
			87:'W',
			88:'X',
			89:'Y',
			90:'Z'
		};
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
							letters:['M', 'O', 'P', 'E', 'D', 'R'], 
							words:["", ""]
						},
						{
							letters:['M', 'O', 'P', 'E', 'D', 'R'], 
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

/* 
Text Twist
Michael Benin 2012
*/

/* 	Begin App */
var TextTwist = (function(w, d)
{
	var gameNum = 0;
	
/* 	Constructor */
	function Game(s)
		{
			/* 	Initialize Variables */
			var game = this;
			var _time;
			this.interval;
			this.body = d.getElementsByTagName('body')[0];
			this.ansleft = gId('ansleft');
			this.avail = gId('avletters');
			this.menu = gId('menu');
			this.wordscontainer = gId('words');
			this.answer = gId('answer');
			this.twist = gId('twist');
			this.enter = gId('enter');
			this.lastw = gId('lastw');
			this.lettersContainer = gId('letters');
			this.time = gId('time');
			this.scorec = gId('score');
			this.wordmap = gMap();
			this.set = s;
			if(this.set > this.wordmap.response.length-1)
			{
				gameNum = 0;
				this.set = 0;	
			}
			this.letters = getOriginal(this.wordmap.response[this.set].letters);
			this.words = this.wordmap.response[this.set].words;
			this.currentAnswer = []; 
			this.answers = [];
			this.score = 0;
			this.timer = 120;
			
			this.scorec.innerHTML = this.score;
			this.ansleft.innerHTML = this.words.length;
			this.time.innerHTML = this.timer;
			this.avail.innerHTML = this.letters.join('');
			
			startTimer.call(game, this.timer, this.time, this.body, game);
			
			this.lastw.addEventListener('click', function(e)
			{
				if(game.answers.length !== 0)
				{
					game.currentAnswer = [];
					game.letters = getOriginal(game.wordmap.response[game.set].letters);
					game.avail.innerHTML = game.letters.join('');
					
					var l = game.answers[game.answers.length - 1].split('');
					
					for (var i in l)
					{
						var c = game.letters.indexOf(l[i]);
						addToAnswer.call(game, l[i], c);
					}
				}
	
			});
			
			this.enter.addEventListener('click', function(e)
			{
				submitAnswer.call(game, game.currentAnswer.join(''));
			});
			
			this.twist.addEventListener('click', function(e)
			{
				// http://jsfromhell.com/array/shuffle - Fisher-Yates, Jonas Raoni Soares Silva
				for(var j, x, v=game.letters, i = game.letters.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
   				 game.letters = v;
				 game.avail.innerHTML = game.letters.join('');
			});
			
			this.keydown = d.addEventListener('keydown', function(e)
			{
				var k = e.keyCode;
				
				if(k === 13)
				{
					submitAnswer.call(game, game.currentAnswer.join(''));	
				}
				else if (game.letters.indexOf(keys[k]) !== -1)
				{
					var index = game.letters.indexOf(keys[k]);
					addToAnswer.call(game, keys[k], index);
				}
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

/* Methods */
//todo: map these functions	in an object
	function submitAnswer()
	{
		if (this.currentAnswer.length !== 0)
		{
			this.answer.innerHTML = '';
			var index = this.words.indexOf(this.currentAnswer.join(''));
			if (index !== -1)
			{
				this.score = this.score + (this.currentAnswer.length*Number(this.time.innerHTML));
				this.scorec.innerHTML = this.score;
				this.answers.push(this.words[index]);
				this.wordscontainer.innerHTML = this.answers.join(' ');
				this.words.splice(index, 1);
				if(this.words.length === 0)
				{
					clearInterval(_time);
					this.body.id = "end";
					gameNum++;
					this.answers = [];
					this.letters = [];
					this.score = [];
					this.wordscontainer.innerHTML = '';
					alert('You won!');	
				}
			}
			this.currentAnswer = [];
			this.letters = getOriginal(this.wordmap.response[this.set].letters);
			this.ansleft.innerHTML = this.words.length;
			this.avail.innerHTML = this.letters.join('');
		}
	}
	
	function addToAnswer(l, i)
	{
		this.currentAnswer.push(l);
		this.answer.innerHTML = this.currentAnswer.join('');
		this.letters.splice(i, 1);	
		this.avail.innerHTML = this.letters.join('');
	}
	
	function endGame(g)
	{
		g = {};	
	}
	
	function getOriginal(a)
	{
		var arr = [];
		for (var i in a)
		{	
			arr.push(a[i]);
		}
		return arr;
	}
	
	function startTimer(time, el, b, game)
	{
		_time = setInterval(function()
		{
			if(time !== 0)
			{
				time--;
				el.innerHTML = time;
			}
			else
			{
					clearInterval(_time);
					b.id = "end";
					game.answers = [];
					game.letters = [];
					game.score = [];
					game.currentAnswer = [];
					game.letters = getOriginal(game.wordmap.response[game.set].letters);
					game.ansleft.innerHTML = '';
					game.avail.innerHTML = '';
					game.answer.innerHTML = '';
					game.wordscontainer.innerHTML = '';
					alert('You lost!');	
			}
		}, 1000);
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
			http://words.bighugelabs.com/api/2/8d3479c49640d29f2222950de32e83ff/word/json
		*/
		
		return w = 
					{
						response:
						[{
							letters:['M', 'O', 'P', 'E', 'D', 'R'], 
							words:['MOP', 'PRE'] //'REP', 'MOPE', 'DOPE', 'ROPE', 'DROP', 'PROD', 'DEMO', 'MORE', 'MOPED', 'PEDRO', 'ROMPED']
						},
						{
							letters:['R', 'L', 'O', 'K', 'E', 'A'], 
							words:['EAR', 'ARE']//, 'EARL', 'ROLE', 'LOKE']	
						}]
					};
	}
	
	function gId(id)
	{
		return d.getElementById(id);	
	}

/* Initialize App */
	w.addEventListener('load', function(e)
	{
		var body = d.getElementsByTagName('body')[0],
		start = gId('start');
		start.addEventListener('click', function(e)
		{
			body.id = "startgame";
			var startGame = new Game(gameNum);
		});		
	});
	
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

/*
//2.63KB (1.03KB gzipped)

(function(k,c){function l(a){var b=this;this.p;this.body=c.getElementsByTagName("body")[0];this.h=c.getElementById("ansleft");this.e=c.getElementById("avletters");this.j=c.getElementById("words");this.i=c.getElementById("answer");this.o=c.getElementById("twist");this.m=c.getElementById("enter");this.n=c.getElementById("lastw");this.time=c.getElementById("time");this.k=c.getElementById("score");this.g={response:[{a:"MOPEDR".split(""),b:["MOP","PRE"]},{a:"RLOKEA".split(""),b:["EAR","ARE"]}]};this.set=
a;this.set>this.g.response.length-1&&(this.set=f=0);this.a=e(this.g.response[this.set].a);this.b=this.g.response[this.set].b;this.c=[];this.d=[];this.f=0;this.l=5;this.k.innerHTML=this.f;this.h.innerHTML=this.b.length;this.time.innerHTML=this.l;this.e.innerHTML=this.a.join("");m.call(b,this.l,this.time,this.body,b);this.n.addEventListener("click",function(){if(b.d.length!==0){b.c=[];b.a=e(b.g.response[b.set].a);b.e.innerHTML=b.a.join("");var a=b.d[b.d.length-1].split("");for(i in a)h.call(b,a[i],
b.a.indexOf(a[i]))}});this.m.addEventListener("click",function(){j.call(b)});this.o.addEventListener("click",function(){for(var a,d,c=b.a,e=b.a.length;e;a=parseInt(Math.random()*e),d=c[--e],c[e]=c[a],c[a]=d);b.a=c;b.e.innerHTML=b.a.join("")});c.addEventListener("keydown",function(a){a=a.keyCode;a===13?j.call(b):b.a.indexOf(g[a])!==-1&&h.call(b,g[a],b.a.indexOf(g[a]))})}function j(){if(0!==this.c.length){this.i.innerHTML="";var a=this.b.indexOf(this.c.join(""));-1!==a&&(this.f+=this.c.length*Number(this.time.innerHTML),
this.k.innerHTML=this.f,this.d.push(this.b[a]),this.j.innerHTML=this.d.join(" "),this.b.splice(a,1),0===this.b.length&&(clearInterval(_time),this.body.id="end",f++,this.d=[],this.a=[],this.f=[],this.j.innerHTML="",alert("You won!")));this.c=[];this.a=e(this.g.response[this.set].a);this.h.innerHTML=this.b.length;this.e.innerHTML=this.a.join("")}}function h(a,b){this.c.push(a);this.i.innerHTML=this.c.join("");this.a.splice(b,1);this.e.innerHTML=this.a.join("")}function e(a){var b=[];for(i in a)b.push(a[i]);
return b}function m(a,b,c,d){_time=setInterval(function(){0!==a?(a--,b.innerHTML=a):(clearInterval(_time),c.id="end",d.d=[],d.a=[],d.f=[],d.c=[],d.a=e(d.g.response[d.set].a),d.h.innerHTML="",d.e.innerHTML="",d.i.innerHTML="",d.j.innerHTML="",alert("You lost!"))},1E3)}var f=0,g={65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z"};k.addEventListener("load",function(){var a=
c.getElementsByTagName("body")[0];c.getElementById("start").addEventListener("click",function(){a.id="startgame";new l(f)})})})(window,document);
*/
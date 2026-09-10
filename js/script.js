
$(function(){
			$('a[href^=#]').click(function(){
				var speed = 1000;
				var href= $(this).attr("href");
				var target = $(href == "#" || href == "" ? 'html' : href);
				var position = target.offset().top;
				$("html, body").animate({scrollTop:position}, speed, "swing");
			return false;
			});
});

$(function() {
    var topBtn = $('.toTopFixed');
    topBtn.hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            topBtn.fadeIn();
        } else {
            topBtn.fadeOut();
        }
    });
    topBtn.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });
});

$(function(){
	$("a img").hover(function(){
		$(this).stop().animate({"opacity":"0.6"});
	},function(){
		$(this).stop().animate({"opacity":"1"});
	});
});

$(function() {
	$('nav li')
.each(function(i){
            $(this).css('background', 'url(/images/btn-nav-on-'+(i+1)+'.png) no-repeat');
        })

		.find('img').hover(
			function(){
				$(this).stop().animate({'opacity' : '0'}, 300);
			},
			function(){
				$(this).stop().animate({'opacity' : '1'}, 500);
			}
		);
	}
);

function roopObject(s,speed) {
  this.selector = s;
  this.speed = speed;
}

roopObject.prototype.start = function(){
	var h = $(this.selector).height();
	$(this.selector).css("overflow","hidden");
	$(this.selector).css("position","relative");
	this.height = h;
	$(".roop_object_image").css("position","absolute");
	$(".roop_object_image").css("top","0px");
	$(".roop_object_image").css("left","0px");
	$(".roop_object_image").css("width","100%");
	$(".roop_object_image").css("height",h + "px");
	for(var i=0;i<3;i++){
		var c = $(".roop_object_image:eq(0)").clone();
		$(this.selector).append(c);
	}

	this.roop();
};

roopObject.prototype.roop = function(){
	var speed = this.speed;
	var h = this.height;
	var obj= this;
	var s= this.selector;
	var n=0;
	var t = h * (-1);
	$(".roop_object_image").each(function(){
		$(this).attr("rel",n);
		n++;
		$(this).css("top", t + "px");
		t = t + h;
	});
	$(".roop_object_image").each(function(){
		var t = $(this).css("top");
		t = t.replace("px","");
		t = parseInt(t);
		t = t - h;
		$(this).animate({top:t + "px"},speed,"linear",function(){
			var t = $(this).css("top");
			t = t.replace("px","");
			t = parseInt(t);
			t = t  + h;
			if($(this).attr("rel") == "3"){
				var el = $(".roop_object_image:eq(0)").clone();
				$(".roop_object_image:eq(0)").remove();
				$(s).append(el);
				obj.roop();
			}

		});
	});

};

function twitterLoad(){
	$.getJSON('/twitteroauth/twitter.php?callback=?', function (json) {
		twitterCallback2(json);
	});
}

function twitterCallback2(twitters) {
  var statusHTML = [];
  for (var i=0; i<twitters.length; i++){
    var username = twitters[i].user.screen_name;
    var icon_url = twitters[i].user.profile_image_url;
    var status = twitters[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
      return '<a href="'+url+'">'+url+'</a>';
    }).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
      return  reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
    });
    statusHTML.push('<li><span class="text">'+status+' <a class="time" href="http://twitter.com/'+username+'/statuses/'+twitters[i].id_str+'" target="_blank">'+relative_time(twitters[i].created_at)+'</a></span></li>');
  }
  document.getElementById('twitter_list').innerHTML = statusHTML.join('');

  twitterLoaded();
}

function twitterLoaded(){
	$(".timeline").carouFredSel({
		width: 600,
		align: "center",
		height: 60,
		items: {
			visible: "variable",
			width: 600,
			height: 60
		},
		scroll: {
			items: 1,
			duration: 300,
			pauseOnHover: true
		},
		auto: 5000
	});
	$(".right_arrow").click(function() {
		$(".timeline").trigger("next", 1);
	});
	$(".left_arrow").click(function() {
		$(".timeline").trigger("prev", 1);
	});
}

function relative_time(time_value) {
  var values = time_value.split(" ");
  time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
  var parsed_date = Date.parse(time_value);
  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
  var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
  delta = delta + (relative_to.getTimezoneOffset() * 60);

  if (delta < 60) {
    return 'less than a minute ago';
  } else if(delta < 120) {
    return 'about a minute ago';
  } else if(delta < (60*60)) {
    return (parseInt(delta / 60)).toString() + ' minutes ago';
  } else if(delta < (120*60)) {
    return 'about an hour ago';
  } else if(delta < (24*60*60)) {
    return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
  } else if(delta < (48*60*60)) {
    return '1 day ago';
  } else {
    return (parseInt(delta / 86400)).toString() + ' days ago';
  }
}

$(function(){
	$(".main_visual .left a img").hover(function(){
		$(this).stop().animate({"opacity":"0.8"});
	},function(){
		$(this).stop().animate({"opacity":"1"});
	});
});

$(function(){
	$("#overlay .btn2 img").hover(function(){
		$(this).stop().animate({"opacity":"0.6"});
	},function(){
		$(this).stop().animate({"opacity":"1"});
	});
});

$(function(){
	$("#overlay .visual img").hover(function(){
		$(this).stop().animate({"opacity":"0.9"});
	},function(){
		$(this).stop().animate({"opacity":"1"});
	});
});

$(function() {
     $(".btn2").click(function() {
           $("#overlay").fadeOut();
 });
      $(".new_year .visual").click(function() {
           $("#overlay").fadeOut();
 });
});

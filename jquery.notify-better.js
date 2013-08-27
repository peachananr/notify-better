/* ===========================================================
 * jquery-notify-better.js v1
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * An all in one jQuery plugin that let you 
 * change your favicon and browser title to reflect new notifications
 * Note: Works on Firefox and Chrome only.
 *
 * Credit: Remy Sharp for the Dynamic Favicon, Jeff B from StackOverflow for AbbrNum function
 * https://github.com/peachananr/notify-better
 *
 * ========================================================== */

!function($){
  
  var defaults = {
		url: false,
		interval: 5000,
		overrideAjax: false,
		updateTitle: false,
		updateFavicon: {
		  id: "favicon",
		  textColor: "#fff",
		  backgroundColor: "#e74c3c",
		  location: "full",
		  shape: "square"
		},
		done: function(){}
	};
	
	function abbrNum(number, decPlaces) {
      decPlaces = Math.pow(10,decPlaces);

      var abbrev = [ "k", "m", "b", "t" ];

      for (var i=abbrev.length-1; i>=0; i--) {
          var size = Math.pow(10,(i+1)*3);

          if(size <= number) {
               number = Math.round(number*decPlaces/size)/decPlaces;
               if((number == 1000) && (i < abbrev.length - 1)) {
                   number = 1;
                   i++;
               }
               number += abbrev[i];
               break;
          }
      }

      return number;
  }
	
  $.fn.notify_better = function(options){
    var settings = $.extend({}, defaults, options),
        el = $(this);
        
        titleclear = function() {
          var matches, regex;
          regex = /\(([0-9]+)\)/;
          matches = document.title;

          if (matches !== null) {
            document.title = document.title.replace(regex, '');
          }
        }
        
        $.fn.clear = function(){
          titleclear();
          if ($("#" + settings.updateFavicon.id).data("initial")){
            init =  $("#" + settings.updateFavicon.id).attr("data-initial")
          }else {
            init = $("#" + settings.updateFavicon.id).attr("href")
          }
          $("#" + settings.updateFavicon.id).attr("href", init)
          $("#new-favicon").remove()
          $("<link id='new-favicon' type='image/x-icon' href='" + init + "' rel='shortcut icon'>").appendTo("head")

          $(this).hide().html("")
        }
        
        changeFavicon = function(fx) {
          if (fx > 0) {
            var canvas = document.createElement('canvas'),
                ctx,
                img = document.createElement('img'),
                link = document.getElementById(settings.updateFavicon.id).cloneNode(true);
            if (fx > 99) fx = 99
            if (canvas.getContext) {
              canvas.height = canvas.width = 16;
              ctx = canvas.getContext('2d');
              img.onload = function () { 
                ctx.drawImage(this, 0, 0);

                switch (settings.updateFavicon.location) {
                  case "full":

                    if(settings.updateFavicon.shape == "square") {
                      ctx.fillStyle = settings.updateFavicon.backgroundColor;
                      ctx.fillRect(0, 0, 16, 16);
                    }else {
                      var centerX = canvas.width / 2;
                      var centerY = canvas.height / 2;
                      var radius = 8;
                      ctx.beginPath();
                      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                      ctx.fillStyle = settings.updateFavicon.backgroundColor;
                      ctx.fill();
                    }
                    ctx.textAlign = "center";
                    ctx.font = 'bold 10px "helvetica", sans-serif';
                    ctx.fillStyle = settings.updateFavicon.textColor;
                    ctx.fillText(fx, 8, 12);
                  break;
                  case "se":
                    if(settings.updateFavicon.shape == "square") {
                      ctx.fillStyle = settings.updateFavicon.backgroundColor;
                      ctx.fillRect(5, 5, 16, 16);
                    }else {
                      var radius = 6;
                      ctx.beginPath();
                      ctx.arc(12, 12, radius, 0, 2 * Math.PI, false);
                      ctx.fillStyle = settings.updateFavicon.backgroundColor;
                      ctx.fill();
                    }

                    ctx.font = 'bold 8px "helvetica", sans-serif';
                    ctx.textAlign = "right";
                    ctx.fillStyle = settings.updateFavicon.textColor;
                    ctx.fillText(fx, 15, 15);
                  break;
                  case "ne":

                    if(settings.updateFavicon.shape == "square") {
                      ctx.fillStyle = settings.updateFavicon.backgroundColor;
                      ctx.fillRect(5, 0, 11, 10);
                    }else {
                      var radius = 6;
                      ctx.beginPath();
                      ctx.arc(12, 3, radius, 0, 2 * Math.PI, false);
                      ctx.fillStyle = settings.updateFavicon.backgroundColor;
                      ctx.fill();
                    }

                    ctx.font = 'bold 8px "helvetica", sans-serif';
                    ctx.textAlign = "right";
                    ctx.fillStyle = settings.updateFavicon.textColor;
                    ctx.fillText(fx, 15, 7);
                  break;
                  case "nw":

                    if(settings.updateFavicon.shape == "square") {
                      ctx.fillStyle = settings.updateFavicon.backgroundColor;
                      ctx.fillRect(0, 0, 11, 10);
                    }else {
                      var radius = 6;
                      ctx.beginPath();
                      ctx.arc(5, 3, radius, 0, 2 * Math.PI, false);
                      ctx.fillStyle = settings.updateFavicon.backgroundColor;
                      ctx.fill();
                    }

                    ctx.font = 'bold 8px "helvetica", sans-serif';
                    ctx.textAlign = "left";
                    ctx.fillStyle = settings.updateFavicon.textColor;
                    ctx.fillText(fx, 1, 7);
                  break;
                  case "sw":
                    if(settings.updateFavicon.shape == "square") {
                      ctx.fillStyle = settings.updateFavicon.backgroundColor;
                      ctx.fillRect(0, 5, 11, 11);
                    }else {
                      var radius = 6;
                      ctx.beginPath();
                      ctx.arc(5, 12, radius, 0, 2 * Math.PI, false);
                      ctx.fillStyle = settings.updateFavicon.backgroundColor;
                      ctx.fill();
                    }

                    ctx.font = 'bold 8px "helvetica", sans-serif';
                    ctx.textAlign = "left";
                    ctx.fillStyle = settings.updateFavicon.textColor;
                    ctx.fillText(fx, 1, 14);
                  break;
                }
                var init =  $("#" + settings.updateFavicon.id).attr("href")
                
                if ($("#" + settings.updateFavicon.id).data("initial")){
                  $("#" + settings.updateFavicon.id).attr("href", canvas.toDataURL('image/png'));
                }else {
                  $("#" + settings.updateFavicon.id).attr("data-initial", init).attr("href", canvas.toDataURL('image/png'));
                }
                
                $("#new-favicon").remove()
                $("<link id='new-favicon' type='image/x-icon' href='" + canvas.toDataURL('image/png') + "' rel='shortcut icon'>").appendTo("head")
                
              };
              img.src = 'favicon.png';
            }
          }
        };
    
    
    getNotification = function() {
      if (settings.overrideAjax != false) {
        settings.overrideAjax()
      }else {
        $.ajax({
          url: settings.url,
        }).done(function(data, textStatus, jqXHR) {
          titleclear();
          notif = eval(data)
          el.hide().html(notif).fadeIn("slow");
          if (settings.updateTitle == true) {
            document.title = "(" + notif + ") " + document.title 
          }
          if(settings.updateFavicon != false ) changeFavicon(notif)
          settings.done()
        });
      }
    }
    if(settings.interval == 0 || settings.interval == false) {
       getNotification();
    }else{
      setInterval(function() {
        getNotification()
      }, settings.interval);
    }
  }
  
}(window.jQuery);



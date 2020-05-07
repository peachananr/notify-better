#Notify Better by Pete R.
The ultimate all in one plugin for notification - Change your favicon, browser's title and more to reflect new notifications
Created by [Pete R.](http://www.thepetedesign.com), Founder of [BucketListly](http://www.bucketlistly.com)

## Demo
[View demo](http://peachananr.github.io/notify-better/demo/index.html)

## Compatibility
Dynamic favicon feature from this plugin only works with Chrome and Firefox. Unfortunately, Safari and IE do not allow you to change the favicon after page load.

If you are getting this error: "Failed to load resource: Origin null is not allowed by Access-Control-Allow-Origin." from our demo, try hosting this in your local server or if you are using OSX, move the demo folder into Library/WebServer/Documents and try visiting http://localhost/demo/index.html in your browser. The notification polling should work.

## Usage
To add Notify Better plugin to your website, make sure you've included the latest jQuery library together with `jquery.notify-better.js` into your document's `<head>`. If you want the plugin to handle your favicon notification for you, make sure you add an id attribute to your favicon's link tag as follows:
  
````html
<link rel="shortcut icon" id="favicon" href="favicon.png"> 
````
And then all you have to do is call the function on the container you wish the count to be displayed.:

````javascript
$("#notification").notify_better({
  interval: 2000, // Interval between each polling in milliseconds. If you want notification to update faster, lower the number or vice versa. Set to 0/false to execute only once on page load. Default is 5000 (5 seconds)
  url: "random_count.html", // The URL to retrieve the notification count.
  overrideAjax: false, // Allows you to override the whole ajax call to your notification in case you want to customise it. See more under Further Customization.
	updateTitle: false, // Dynamically Add notification count to your website's title
  updateFavicon: { // Enable you to show notification on top of your favicon dynamically
    id: "favicon",  // the ID of your favicon link tag (as shown above)
    backgroundColor: "#f1c40f", // Background color of your notification count
    textColor: "#6D461D", // Text color of your notification count
    location: "full", // Position of your notification count. Can be "full", "ne", "se", "sw", "nw". The default is full.
	  shape: "square" // Shape of the notification counter. Can be circle or square.
  },
  done: function() { // A Callback when the function is completed.
    alert("done!")
  }
});
````

There maybe times when you want to remove all these notifications. Simply call the clear function and everything will be reverted back to its original version.

````javascript
$("#clear-notification").click(function() {
  $("#notification").clear();
});
````

## Further Customization
With Notify Better, you can override our predefined ajax call in case you want to do more customisation. Here's an example of overriding the predefined ajax call with your own function:

````javascript
$("#notification").notify_better({
  overrideAjax: function() {
    $.ajax({
      url: "count.html",
    }).done(function(data, textStatus, jqXHR) {
      titleclear(); // Notify Better default function to clear title 
      changeFavicon(data)  //  Notify Better default function to change favicon dynamically 
      ...
    });
  }
});
````

With `overrideAjax`, you can customise the way the notification count is returned from your server and displayed on your website. Please note that some features may not work unless you call our default function as shown above.

Now, no matter which tab your users are at, they will see the notification from your website right away without opening the tab. Pretty cool huh?

## Other Resources
- Tutorial (Coming Soon)

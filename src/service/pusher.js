import Pusher from "pusher-js";

// Pusher.logToConsole = true;

var pusher = new Pusher("9c5c7369ceb7af056f92", {
  cluster: "ap1",
});

 var pusherChannel = pusher.subscribe("pemesanan");
//  channel.bind("App\\Events\\PemesananEvent", function (data) {
//    alert(JSON.stringify(data));
//  });

export default pusherChannel;

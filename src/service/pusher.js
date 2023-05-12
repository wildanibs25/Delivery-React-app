import Pusher from "pusher-js";

var pusher = new Pusher("9c5c7369ceb7af056f92", {
  cluster: "ap1",
});

 var pusherChannel = pusher.subscribe("pemesanan");

export default pusherChannel;

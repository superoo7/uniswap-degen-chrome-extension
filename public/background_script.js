chrome.runtime.onMessage.addListener(function (request, sender, callback) {
  if (request.type == "sound") {
    chrome.notifications.create({
      type: "basic",
      title: request.title,
      message: request.message,
      iconUrl: "smile_face.png",
    });
    var audio =
      request.sound === "heyheyhey"
        ? new Audio("heyheyhey.mp3")
        : new Audio("dominating.mp3");
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 2000);
  }
});

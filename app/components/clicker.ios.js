var fs = require("file-system");

var Clicker = function(resourceFolderPath, fileName) {
    var soundPath = fs.path.join(fs.knownFolders.currentApp().path, resourceFolderPath, fileName);
    var soundUrl = NSURL.fileURLWithPath(soundPath);
    var player = AVAudioPlayer.alloc().initWithContentsOfURLError(soundUrl, null);
    player.prepareToPlay();

    this.click = function() {
        player.currentTime = 0.0;
        player.play();
    };
};
module.exports.Clicker = Clicker;

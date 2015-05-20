var vmModule = require("./main-view-model");
var frameModule = require("ui/frame");


function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;
   
    frameModule.topmost().ios.navBarVisibility = "always";
    var controller = frameModule.topmost().ios.controller;

    controller.navigationBarHidden = false;
    controller.navigationBar.barTintColor = UIColor.blackColor();
    controller.navigationBar.barStyle = 1;
    controller.navigationBar.translucent = false;
}

exports.pageLoaded = pageLoaded;

function actionsGridLoaded(args) {
    var theView = args.object._view;
    
    if (args.object.ios) {
        theView.layer.contents = UIImage.imageNamed("app/res/calc-back-orange.png").CGImage;
    }
}
exports.actionsGridLoaded = actionsGridLoaded;
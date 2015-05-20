var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var label = require( "ui/label/label" );
var button = require( "ui/button/button" );

var FontButton = (function (_super) {
    __extends(FontButton, _super);
    function FontButton() {
        _super.call(this);
        this.mybutton = UIButton.alloc().init();
        this.ios.font = UIFont.fontWithNameSize("HelveticaNeue-Thin", 80);
	    this.ios.addSubview( this.mybutton );
    }
    return FontButton;
})(button.Button);

var ScalingLabel = (function (_super) {
    __extends(ScalingLabel, _super);
    function ScalingLabel () {
        _super.call(this);
        this.mylabel = UILabel.alloc().init();
        this._ios.adjustsFontSizeToFitWidth = true;
        this.ios.font = UIFont.fontWithNameSize("HelveticaNeue-UltraLight", 80);
        this.ios.addSubview( this.mylabel );
    }
    return ScalingLabel;
})(label.Label);

exports.FontButton = FontButton;
exports.ScalingLabel = ScalingLabel;

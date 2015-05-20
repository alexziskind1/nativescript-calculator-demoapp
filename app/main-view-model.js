var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var observable = require("data/observable");
var clicker = require("./components/clicker");

var resourceFolderPath = 'res';

var Calc = (function (_super) {
    __extends(Calc, _super);
    function Calc() {
        _super.call(this);

        var self = this;
        
        this.clicker = new clicker.Clicker(resourceFolderPath, "click_short.mp3");
        
        //Where all the calculations are shown
        this.set("mainLabelText", "0");
        //Stores the last known value before an operand is pressed
        this.set("lastKnownValue", 0);
        this.set("operand", "");
        this.set("isMainLabelTextTemporary", false);
        
        this.opBorderDefault = 0.4;
        this.opBorderActive = 3.0;
        this.set("opBorderDiv", this.opBorderDefault);
        this.set("opBorderMult", this.opBorderDefault);
        this.set("opBorderSub", this.opBorderDefault);
        this.set("opBorderAdd", this.opBorderDefault);
        
        this.clearTextDefault = "AC";
        this.clearTextActive= "C";
        this.set("clearText", this.clearTextDefault);
        this.set("divSymbolText", "\u00F7");
        this.set("multSymbolText", "\u00D7");
        this.set("minusSymbolText", "\u2212");
        this.set("plusSymbolText", "\u002B");
        this.set("eqSymbolText", "\u003D");
        
        this.set("pmSymbolText", "+/-");
        

        this.resetOpBorder = function() {
            self.set("opBorderDiv", self.opBorderDefault);
            self.set("opBorderMult", self.opBorderDefault);
            self.set("opBorderSub", self.opBorderDefault);
            self.set("opBorderAdd", self.opBorderDefault);
        };
        
        this.activateOpBorder = function(opBorderName) {
            self.resetOpBorder();
            self.set(opBorderName, this.opBorderActive);
        };
        
        this.doesStringContainDecimal = function(s) {
            return s.indexOf(".") > -1;
        };
        
        this.clearPressed = function() {
            self.set("mainLabelText", "0");
            self.set("lastKnownValue", 0);
            self.set("operand", "");
            self.set("isMainLabelTextTemporary", false);  
            self.set("clearText", self.clearTextDefault);
        };
        
        this.pmPressed = function() {
            var currentValue = parseFloat(self.get("mainLabelText"));
            self.set("mainLabelText", (currentValue * -1).toString());
        };
        
        this.percentPressed = function() {
            var currentValue = parseFloat(self.get("mainLabelText"));
            self.set("mainLabelText", (currentValue * 0.01).toString());
        };
        
        this.numberButtonPressed = function(num) {
            self.playSound();
            
            //Resets label after calculations are shown from previous operations
            if (self.get("isMainLabelTextTemporary"))
            {
                self.set("mainLabelText", "0");
                self.set("isMainLabelTextTemporary", false);
            }
            
            //Get the string from the button label and main label
            var numString = num.toString();
            var mainLabelString = self.get("mainLabelText");
        
            //If mainLabel = 0 and does not contain a decimal then remove the 0
            if ((parseFloat(mainLabelString) == 0) && !self.doesStringContainDecimal(mainLabelString)) {
                mainLabelString = "";
            }
            
            self.set("mainLabelText", mainLabelString + numString);
            self.set("clearText", this.clearTextActive);
        };
 
        this.decimalPressed = function() {
            if (!self.doesStringContainDecimal(self.get("mainLabelText"))) {
                self.set("mainLabelText", self.get("mainLabelText") + ".");
            }
            
        };
        
        this.calculate = function() {
                //Get the current value on screen
            var currentValue = parseFloat(self.get("mainLabelText"));
            var operand = self.get("operand");
            
            // If we already have a value stored and the current # is not 0 , add/subt/mult/divide the values
            if (self.get("lastKnownValue") != 0 && currentValue != 0) {
                if (operand == "+")
                    this.set("lastKnownValue", this.get("lastKnownValue") + currentValue);
                else if (operand == "-")
                    this.set("lastKnownValue", this.get("lastKnownValue") - currentValue);
                else if (operand == "x")
                    this.set("lastKnownValue", this.get("lastKnownValue") * currentValue);
                else if (operand == "/") {
                    //You can't divide by 0! 
                    if (currentValue == 0)
                        self.clearPressed();
                    else
                        this.set("lastKnownValue", this.get("lastKnownValue") / currentValue);
                }
            }
            else
                this.set("lastKnownValue", currentValue);
            
            //Set the new value to the main label 
            self.set("mainLabelText", this.get("lastKnownValue"));
                
            //Make the main label text temp, so we can erase when the next value is entered
            self.set("isMainLabelTextTemporary", true);
        };
        
        this.operandPressed = function(oper) {
            //Calculate from previous operand
            self.calculate();
            
            //Get the NEW operand from the button pressed
            this.set("operand", oper);
        };
        
        this.equalsPressed = function() {
            self.calculate();
            
            //reset operand;
            this.set("operand", "");
        };
        
        this.on(observable.Observable.propertyChangeEvent, function(changeArgs){
            if (changeArgs.propertyName == "operand" && changeArgs.value == "") {
                self.resetOpBorder();
            }
        });
    }
    
    //Meta buttons
    Calc.prototype.btnTapAC = function () {
        this.playSound();
        this.clearPressed();
    };
    Calc.prototype.btnTapPM = function () {
        this.playSound();
        this.pmPressed();
    };
    Calc.prototype.btnTapPercent = function () {
        this.playSound();
        this.percentPressed();
    };
    
    //Number buttons
    Calc.prototype.btnTap1 = function () {
        this.numberButtonPressed(1);
    };
    Calc.prototype.btnTap2 = function () {
        this.numberButtonPressed(2);
    };
    Calc.prototype.btnTap3 = function () {
        this.numberButtonPressed(3);
    };
    Calc.prototype.btnTap4 = function () {
        this.numberButtonPressed(4);
    };
    Calc.prototype.btnTap5 = function () {
        this.numberButtonPressed(5);
    };
    Calc.prototype.btnTap6 = function () {
        this.numberButtonPressed(6);
    };
    Calc.prototype.btnTap7 = function () {
        this.numberButtonPressed(7);
    };
    Calc.prototype.btnTap8 = function () {
        this.numberButtonPressed(8);
    };
    Calc.prototype.btnTap9 = function () {
        this.numberButtonPressed(9);
    };
    Calc.prototype.btnTap0 = function () {
        this.numberButtonPressed(0);
    };
    Calc.prototype.btnTapDot = function () {
        this.playSound();
        this.decimalPressed();
    };
    
    //Action buttons
    Calc.prototype.btnTapDiv = function () {
        this.playSound();
        this.activateOpBorder("opBorderDiv");
        this.operandPressed("/");
    };
    Calc.prototype.btnTapMult = function () {
        this.playSound();
        this.activateOpBorder("opBorderMult");
        this.operandPressed("x");
    };
    Calc.prototype.btnTapSub = function () {
        this.playSound();
        this.activateOpBorder("opBorderSub");
        this.operandPressed("-");
    };
    Calc.prototype.btnTapAdd = function () {
        this.playSound();
        this.activateOpBorder("opBorderAdd");
        this.operandPressed("+");
    };
    Calc.prototype.btnTapEq = function () {
        this.playSound();
        this.equalsPressed();
        
    };
    
    Calc.prototype.playSound = function() {
        this.clicker.click();
    };
    
    
    return Calc;
})(observable.Observable);
exports.Calc = Calc;
exports.mainViewModel = new Calc();

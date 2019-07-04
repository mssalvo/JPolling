/**
 * @author salvo mariniello - salvo.mariniello@gmail.com 
 * @example start
 *  var polling= new JPolling();
 *  polling.start(5000,function(){ alert("Hello JS.......") })
 *  
 *  @example stop
 *  polling.stop()
 *  
 *  @example restart
 *  polling.restart()
 *  
 *  https://github.com/mssalvo/JPolling
 * */

function JPolling(){
    this.time=6000;
    this.callIn=function(ts,fn){ts.callOut(ts,fn)};
    this.callOut=function(ts,fn){setTimeout(function(){ts.isTimeout?fn():function(){}; ts.start(ts.time,fn)},ts.time)};
    this.isTimeout=true;
}

JPolling.prototype={
    setTime:function(t){
        this.time=t;
    },
    stop:function(){
    this.isTimeout=false;
    },
    restart:function(){
    this.isTimeout=true;
    },
    start:function(time,fn){
     var this_=this;
        this_.setTime(time)
        setTimeout(this_.callIn(this_,fn),this_.time);
    }
};


 

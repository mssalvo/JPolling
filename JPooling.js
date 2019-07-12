/**
 * @author salvo mariniello - salvo.mariniello@gmail.com 
 *
 * @example start
 *  var polling= new JPolling();
 *
 *  //method: start set param( time, primaFunction, timeEnd, secondaFunction)
 *  polling.start(1000,function(){ alert("Before function> Hello JS.......") },120000,function(){ alert("Second function> Hello JS.......") })  
 *  
 *  @example stop
 *  polling.stop()
 *  
 *  @example play
 *  polling.play()
 *
 *  @example restart
 *  polling.restart()
 *  
 *  @example setTime
 *  polling.setTime(1000) // 1 secondo
 *
 *  @example setTimeEnd
 *  polling.setTimeEnd(120000) // 2 minuti
 * */

function JPolling() {
    this.time = 1000;//Default 1 secondo
    this.secondCount = 0;
    this.timeEnd = 600000;//Default 10 minuti
	this.progress=0;
    this.callIn = function (ts, fn, fnEnd) {
        ts.secondCount++;
		ts.progress=((ts.timeEnd-(ts.timeEnd-(ts.time*ts.secondCount)))/ts.timeEnd*100).toFixed(3);   
		ts.callOut(ts, fn, fnEnd)
    };
    this.callOut = function (ts, fn, fnEnd) {
        setTimeout(function () {
            ts.isTimeout ? (function (ts, fn, fnEnd) {        
			    fn(ts);
				ts.callEnd(ts, fnEnd);
            })(ts, fn, fnEnd) : function () {};
            ts.start(ts.time, fn, ts.timeEnd, fnEnd);
        }, ts.time)
    };
    this.callEnd = function (ts, fn) {
		ts.progress=100;
        if (ts.time * ts.secondCount >= ts.timeEnd) {
            if (fn)
                fn(ts);
            ts.secondCount = 0;
        }
    };

    this.isTimeout = true;
}

JPolling.prototype = {
    setTime: function (t) {
        this.time = t;
    },
    setTimeEnd: function (t) {
        this.timeEnd = t;
    },
    stop: function () {
        this.isTimeout = false;
    },
    play: function () {
        this.isTimeout = true;
    },
    restart: function () {
        this.isTimeout = true;
        this.secondCount = 0;
		this.progress=0;
    },
    start: function (time, fn,timeEnd, fnEnd) {
        var this_ = this;
     
        if (time) 
            this_.setTime(time)
        if(timeEnd)
        this_.setTimeEnd(timeEnd)   
        if (fn)
            setTimeout(this_.callIn(this_, fn, fnEnd), this_.time);
        
    }
};

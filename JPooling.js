/**
 * @author salvo mariniello - salvo.mariniello@gmail.com 
 * https://github.com/mssalvo/JPolling
 *
 *  Copyright and license :
 *  GNU General Public License v3.0
 *  https://github.com/mssalvo/JPolling/blob/master/LICENSE
 * 
 * @example start
 * @function JPolling.get('nameProcessUnique').start(500,myBeforefunction,60000,mySecondfunction)  
 *   
 *  @see method: start set param( time, myBeforeFunction, timeEnd, SecondFunction)
 *  Process name assigned automatically
 *  get method without parameters assigns process name automatically
 *  JPolling.get().start(500,myBeforefunction,60000,mySecondfunction)
 *  
 *  method: start set param( time, myBeforeFunction, timeEnd, SecondFunction)
 *  
 *  Name of the process assigned by the user
 *  get method with process name parameter assigned by user
 *  JPolling.get('nameProcessUnique').start(500,myBeforefunction,60000,mySecondfunction)  
 *  Good thing and always assign a unique process name.
 *  
 *  @see Controll Singol Process
 *  @example stop
 *  @function Polling.get('process1').stop()
 *  
 *  @example play
 *  @function Polling.get('process1').play()
 *
 *  @example restart
 *  @function Polling.get('process1').restart()
 *  
 *  @example setTime
 *  @function Polling.get('process1').setTime(1000) // 1 secondo
 *
 *  @example setTimeEnd
 *  @function Polling.get('process1').setTimeEnd(120000) // 2 minuti
 *  
 *  @see Controll All Process
 *  
 *  @example stopAll
 *  @function JPolling.stopAll()
 *  
 *  @example playAll
 *  @function JPolling.playAll()
 *  
 *  @example restartAll
 *  @function JPolling.restartAll()
 *  
 * */

function JPolProcess() {
    this.time = 1000;//Default 1 secondo
    this.secondCount = 0;
    this.timeEnd = 600000;//Default 10 minuti
    this.progress = 0;
    this.id = arguments[0] ? arguments[0] : String(new Date().getTime());
    this.callIn = (ts, fn, fnEnd) => {
        ts.isTimeout ? ((ts) => {
            ts.secondCount++;
            ts.progress = ((ts.timeEnd - (ts.timeEnd - (ts.time * ts.secondCount))) / ts.timeEnd * 100).toFixed(3);
        })(ts) : () => {
        };
        ts.callOut(ts, fn, fnEnd)
    };
    this.callOut = (ts, fn, fnEnd) => {
        setTimeout(() => {
            ts.isTimeout ? ((ts, fn, fnEnd) => {
                ts.progress = Number(ts.progress) > 100 ? (100.000) : ts.progress;
                fn(ts);
                ts.callEnd(ts, fnEnd);
            })(ts, fn, fnEnd) : () => {
            };
            ts.start(ts.time, fn, ts.timeEnd, fnEnd);
        }, ts.time)
    };
    this.callEnd = (ts, fn) => {
        ts.progress = 100;
        if (ts.time * ts.secondCount >= ts.timeEnd) {
            if (fn)
                fn(ts);
            ts.secondCount = 0;
        }
    };

    this.isTimeout = true;
}

JPolProcess.prototype = {
    getId: function () {
        return this.id;
    },
    setTime: function (t) {
        this.time = t && t>4 ? t : 5;
        return this;
    },
    setTimeEnd: function (t) {
        this.timeEnd = t && t>4 ? t : 5;
        return this;
    },
    stop: function () {
        this.isTimeout = false;
        return this;
    },
    play: function () {
        this.isTimeout = true;
        return this;
    },
    restart: function () {
        this.isTimeout = true;
        this.secondCount = 0;
        this.progress = 0;
        return this;
    },
    start: function (time, fn, timeEnd, fnEnd) {
        var this_ = this;

        if (time)
            this_.setTime(time)
        if (timeEnd)
            this_.setTimeEnd(timeEnd)
        if (fn)
            setTimeout(this_.callIn(this_, fn, fnEnd), this_.time);
        return this_;
    },
    get: (a) => {
        a = a ? a : new Date().getTime();
        return {id: String(a), p: new JPolProcess(String(a))}
    }

};
var JPolling = {
    get: (a) => {
        if (a)
            for (let i in JPolling.process) {
                if (JPolling.process[i].id === a)
                    return JPolling.process[i].p
            }

        JPolling.process.push(JPolProcess.prototype.get(a));
        return JPolling.process[JPolling.process.length - 1].p

    },
    process: [],
    stopAll: () => {
        for (let a in JPolling.process)
            JPolling.process[a].p.stop()

        return true;
    },
    restartAll: () => {
        for (let a in JPolling.process)
            JPolling.process[a].p.restart()

        return true;
    },
    playAll: () => {
        for (let a in JPolling.process)
            JPolling.process[a].p.play()


        return true;
    },
    clearAll: () => {
        for (let a in JPolling.process)
            undefined !== JPolling.process[a] ? ((a) => {
                JPolling.stopAll()
            })(a) : () => {
            };

        JPolling.process = [];
        return true;
    }
};

 

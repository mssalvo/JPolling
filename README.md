# JPolling
Whenever it is necessary to perform a timed function JPooling and a great help in every need

Execute timed functions 

### Controll single process

__Example start__
```
JPolling.get("process1").start(300, myBeforefunction, 120000, mySecondfunction);

```            
__Example stop__   
```
JPolling.get('process1').stop()
```
__Example play__   
```
JPolling.get('process1').play()
```
__Example restart__  
```
JPolling.get('process1').restart()
```

### Controll all process

 __Example stopAll__  
```
JPolling.stopAll()
```

__Example playAll__  
```
JPolling.playAll()
```

__Example restartAll__  
```
JPolling.restartAll()
```

__Example__
```
JPolling.get("process1").start(300, myBeforefunction, 120000, mySecondfunction);
     
      
 function myBeforefunction(ctx){
   console.log("progress "+ctx.progress)
           }
        
function mySecondfunction(ctx){
        ctx.stop();     
    console.log("STOPPPPPP!!!! Test JPolling..")       
            }
	    
```            

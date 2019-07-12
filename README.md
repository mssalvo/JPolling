# JPolling
JS polling

it recursively repeats and executes a programmed function

__Example start__
```
var polling= new JPolling();
polling.start(6000,myfunctionTest)
```            
__Example stop__   
```
polling.stop() 
```
__Example restart__  
```
polling.restart() 
```

__Second Example__

__Example 2__
```
var polling= new JPolling();
polling.start(100,myBeforefunction,30000,mySecondfunction)      
      
 function myBeforefunction(ctx){
   console.log("progress "+ctx.progress)
           }
        
function mySecondafunction(ctx){
        ctx.stop();     
    console.log("STOPPPPPP!!!! Test JPolling..")       
            }
	    
```            

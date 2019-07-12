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

# JPolling
JS polling


__Example 2° __
```
			var polling= new JPolling();
       
            polling.start(100,myPrimafunction,30000,mySecondafunction)
            
            function myPrimafunction(ctx){

		    console.log("progress "+ctx.progress)
        
            }
        
		function mySecondafunction(ctx){
        ctx.stop();     
        console.log("STOPPPPPP!!!! Test JPolling..")  
              
            }
```            

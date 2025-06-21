

const f=(number,cb)=>{
    setTimeout(() => {
     if(typeof number !== 'number') {
        cb('Input must be a number');

        return; // Exit the function if the input is not a number
    }
    cb(null,number*number)   
    }, 0);
    
}
    const handler = (error, result) => {
        if(error){
            console.error('Error:', error);
            return;
        }
        console.log('Result:', result);
    }
f('bad', handler);
f(5, handler);

// on setTimeout, the error is thrown after the try catch block is executed
// so the error is not caught by the try catch block
// the error is thrown in the callback function of setTimeout

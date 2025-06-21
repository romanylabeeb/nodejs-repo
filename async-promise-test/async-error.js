

const f=(number,cb)=>{
    setTimeout(() => {
     if(typeof number !== 'number') {
        throw new Error('Input must be a number');
    }
    cb(number*number)   
    }, 0);
    
}

try{
f('bad', (result) => {
    console.log('Result:', result);
});
}catch(e){
    console.error('Error caught:', e.message);
}

// on setTimeout, the error is thrown after the try catch block is executed
// so the error is not caught by the try catch block
// the error is thrown in the callback function of setTimeout

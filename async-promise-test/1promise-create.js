const executerFn=(resolve, reject) => { // Simulate an asynchronous operation using setTimeout
//    resolve("Promise resolved successfully!");
    setTimeout(() => {
        const success = true; // Change this to false to simulate a failure
        if (success) {
            resolve("Promise resolved successfully!");
        } else {
            reject("Promise rejected!");
        }
    }, 1); 
};
const myPromise=new Promise(executerFn);
myPromise.then((result) => {
    console.log(result);
}).catch((error) => {
    console.error(error);

});


const calculateSquare=(number) => {
    const calcPromise= new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof number !== 'number') {
                reject(new Error('Argument of type number is expected'));
            }
            const result = number * number;
            resolve(result);
        }, 1);
    });
    return calcPromise;
};

calculateSquare(1).then((result) => {
    console.log(`Square of 1 is: ${result}`);
    return calculateSquare(2);
}).then((result) => {
    console.log(`Square of 2 is: ${result}`);   
    return calculateSquare(3);
}).then((result) => {
    console.log(`Square of 3 is: ${result}`);  
    return calculateSquare(4);     
}).then((result) => {
    console.log(`Square of 4 is: ${result}`);
}).catch((error) => {
    console.error(error);
});
// This will be logged before the promise resolves or rejects

console.log("this will be logged before promise resolve or reject calls!");

const capatilizeString=(str)=>{
    const myPromise=new Promise((resolve, reject)=>{
        const words=str.split(" ");
        let res="";
        for(let i=0;i<words.length;i++){
            // words[i]=words[i].charAt(0).toUpperCase()+words[i].slice(1);
            words[i]=words[i].charAt(0).toUpperCase()+words[i].substr(1);
        }
        res=words.join(" ");
        resolve(res);

    })
    return myPromise;
}
capatilizeString("hello world").then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
})  
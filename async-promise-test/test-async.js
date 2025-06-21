function f1(){
    console.log('a');
}

function f2(){
    function inner(){
        return 'b';
    }
    const r=inner();
    console.log(r);
}   

function f3(cb){
const fs= require('fs');
fs.readFile('./data/cart.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('c');
    cb();
});

}
function f4(){
    console.log('d');
}

f1();
f2();
f3(
cb=> f4()); 

     
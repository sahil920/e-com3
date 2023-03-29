function func(n){
    if(n==0) return 1;
     return  2*func(n-1);
    
}
function f(){
console.log(func(10));
}
f();
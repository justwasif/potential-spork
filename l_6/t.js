
var  n=10




// console.log("initial",n)
// function createCounter(){
//     console.log("conter is called with n = ", n)
//     return function(){
//         console.log("counter is called with n = ",n)
//         return n,
//         console.log("n is returned with value",n)
//         n=n+1
//         console.log("counter function ended with n",n)
//     }
// }

// console.log("nothing called yet");
// const counter1= createCounter()
// console.log(counter1());
// const counter2=createCounter()
// console.log(counter2());
// const counter3=createCounter()
// console.log(counter3());


function createCounter(n){
    console.log(n)

    return function(){
        return n;
        
    }
}

const counter=createCounter(n)

console.log(counter(10))





/** 
 * const counter = createCounter(10)
 * counter() // 10
 * counter() // 11
 * counter() // 12
 */
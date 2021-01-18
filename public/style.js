// if($(window).width() < 567){
//     document.getElementById("btn").textContent = "";
//     console.log('hi')
// }

document.addEventListener("DOMContentLoaded", ()=>{
    if($(window).width() < 567){
        x = document.getElementsByClassName("btn").innerHTML("display1");
        console.log(x);
        console.log('hi')
    }
})

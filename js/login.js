const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");

let direct = localStorage.getItem("direct");

if(direct === "1"){
    window.location.href = "login.html";
}

btn1.addEventListener("click", () => {
    direct = "1";
    localStorage.setItem("direct", direct);
});

btn2.addEventListener("click", () => {
    direct = "1";
    localStorage.setItem("direct", direct);
});

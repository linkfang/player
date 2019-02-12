let app = {
    init: function(){
        document.querySelector(".playCtn").addEventListener("click", app.showPlay);
    },
    showPlay: function(){
        console.log("working!!!!!!!!!");
        document.querySelector(".homePage").classList.add("hide");
        document.querySelector(".appTitle").classList.add("disapear");
        document.querySelector(".footer").classList.add("footerHide");
        document.querySelector(".playPage").classList.add("playPageUp");
        document.querySelector(".playCover").classList.add("PCShow");
        document.querySelector(".playCoverBkg").classList.add("playCoverBkgBlur");
        document.querySelector(".playCtn").classList.add("PPPlayCtn");
        document.querySelector(".arrowUp").classList.add("arrowUpHide");
        document.querySelector(".playInfo").classList.add("playInfoShow");
        document.querySelector(".controlBar").classList.add("controlBarShow");
        document.querySelector(".lastSong").classList.remove("disapear");
        document.querySelector(".nextSong").classList.remove("disapear");
        setTimeout( ()=>{document.querySelector(".arrowDown").classList.add("arrowDownShow")}, 750);
    }





}

if (document.deviceready) {
    document.addEventListener("deviceready", app.init);
} else {
    document.addEventListener("DOMContentLoaded", app.init);
}
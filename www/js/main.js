let app = {

    appData: [{
            id: 1,
            title: "Something Just Like This",
            artist: "Alex Goot",
            file: "file:///android_asset/www/media/Something_Just_Like_This-Alex_Goot.mp3",
            img: "img/Something Just Like This.png"
        },
        {
            id: 2,
            title: "And Then You",
            artist: "Greg Laswell",
            file: "file:///android_asset/www/media/And_Then_You-Greg_Laswell.mp3",
            img: "img/And Then You.png"
        },
        {
            id: 3,
            title: "Thunder",
            artist: "Imagine Dragons",
            file: "file:///android_asset/www/media/Thunder-Imagine_Dragons.mp3",
            img: "img/Thunder.png"
        },
        {
            id: 4,
            title: "Smile Like You Used To",
            artist: "Tim Walker",
            file: "file:///android_asset/www/media/Smile_Like_You_Used_To-Tim_Walker.mp3",
            img: "img/Smile like you used to.png"
        },
        {
            id: 5,
            title: "Attention",
            artist: "Charlie Puth",
            file: "file:///android_asset/www/media/Attention-Charlie_Puth.mp3",
            img: "img/Attention.png"
        },
        {
            id: 6,
            title: "Magic Leaf",
            artist: "Monkey Majik",
            file: "file:///android_asset/www/media/Magic_Leaf(魔法の言葉)-MONKEY_MAJIK.mp3",
            img: "img/Magic Leaf.png"
        },
        {
            id: 7,
            title: "There For You",
            artist: "Martin Garrix",
            file: "file:///android_asset/www/media/There_For_You-Martin_Garrix.mp3",
            img: "img/There For You.png"
        },
        {
            id: 8,
            title: "Stay Together",
            artist: "Noah Cyrus",
            file: "file:///android_asset/www/media/Stay_Together-Noah_Cyrus.mp3",
            img: "img/Stay Together.png"
        }
    ],

    volume: 0.8,

    media: null,

    status:{
        '0': 'MEDIA_NONE',
        '1': 'MEDIA_STARTING',
        '2': 'MEDIA_RUNNING',
        '3': 'MEDIA_PAUSED',
        '4': 'MEDIA_STOPPED'
    },

    err:{
        '1': 'MEDIA_ERR_ABORTED',
        '2': 'MEDIA_ERR_NETWORK',
        '3': 'MEDIA_ERR_DECODE',
        '4': 'MEDIA_ERR_NONE_SUPPORTED'
    },

    playTime: 0,

    init: function () {
        app.createHomePage();
        app.randomAddDetails();
        app.ready();
        setInterval(() => {
            app.media.getCurrentPosition((pos)=>{
            let duration = app.media.getDuration();
            let percentage = pos/duration;
            document.querySelector(".playedBar").style.width = (percentage*100) + "%";
            if (pos < 0 && app.playTime > 0){
                app.nextSong();
            }
            });
        }, 100);
        document.querySelector(".playCtn").addEventListener("click", app.playOrPause);
        document.querySelector(".arrowUp").addEventListener("click", app.showPlay);
        document.querySelector(".arrowDown").addEventListener("click", app.hidePlay);
        document.querySelector(".nextSong").addEventListener("click", app.nextSong);
        document.querySelector(".lastSong").addEventListener("click", app.lastSong);
        document.querySelector(".fa-volume-up").addEventListener("click", app.volumeUp);
        document.querySelector(".fa-volume-down").addEventListener("click", app.volumeDown);
        document.querySelector(".bar").addEventListener("click", app.controlBar);
        document.addEventListener("pause", () => {
            // app.media.release();
            // console.log('Hi');
        });
        document.addEventListener("resume", () => {
            // app.ready();
            // console.log('after set a new media' + src);
        })
    },

    ready: function(){
        let songId = document.querySelector(".playInfo").getAttribute("data-id");
        let i = app.appData.findIndex( item => item.id == songId);
        let src = app.appData[i].file;
        // console.log(src);
        app.media = new Media(src, app.scf, app.ecf);
    },

    scf: function(){
        console.log("Played successfully!");
    },

    ecf: function(err){
        console.error(err);
    },

    statusChange: function (status){
        console.log("Status is now " + app.status[status] );
    },

    playOrPause: function(){
        if(document.querySelector(".fa-play")){
            vol = parseFloat(app.volume);
            app.media.setVolume(vol);
            app.playTime++;
            app.media.play();
            document.querySelector(".playCover").classList.add("PCBreathing");
            app.showPlay();
        } else{
            app.media.pause();
            document.querySelector(".playCover").classList.remove("PCBreathing");
        } 
        app.togglePlayAndPause();
    },

    showPlay: function () {
        document.querySelector(".homePage").classList.add("hide");
        document.querySelector(".appTitle").classList.add("hide");
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
        setTimeout(() => {
            document.querySelector(".arrowDown").classList.add("arrowDownShow");
            document.querySelector(".fa-volume-up").classList.add("volumeUpShow");
            document.querySelector(".fa-volume-down").classList.add("volumeDownShow");
        }, 750);
    },

    hidePlay: function () {
        document.querySelector(".playPage").classList.remove("playPageUp");
        document.querySelector(".playCover").classList.remove("PCShow");
        document.querySelector(".playCoverBkg").classList.remove("playCoverBkgBlur");
        document.querySelector(".playCtn").classList.remove("PPPlayCtn");
        document.querySelector(".playInfo").classList.remove("playInfoShow");
        document.querySelector(".footer").classList.remove("footerHide");
        document.querySelector(".lastSong").classList.add("disapear");
        document.querySelector(".nextSong").classList.add("disapear");
        document.querySelector(".arrowUp").classList.remove("arrowUpHide");
        document.querySelector(".controlBar").classList.remove("controlBarShow");
        document.querySelector(".arrowDown").classList.remove("arrowDownShow");
        document.querySelector(".fa-volume-up").classList.remove("volumeUpShow");
        document.querySelector(".fa-volume-down").classList.remove("volumeDownShow");
        setTimeout( ()=> {
            document.querySelector(".homePage").classList.remove("hide");
            document.querySelector(".appTitle").classList.remove("hide");
        }, 250);
    },

    createHomePage: function () {
        app.appData.forEach(function (item) {
            let documentFragment = new DocumentFragment();
            let fileList = document.createElement("div");
            let albumCover = document.createElement("img");
            let songTitle = document.createElement("i");
            let songArtist = document.createElement("i");

            fileList.setAttribute("data-id", item.id);
            albumCover.src = item.img;
            albumCover.setAttribute("alt", "Album Cover");
            songTitle.textContent = item.title;
            songArtist.textContent = item.artist;

            fileList.className = "fileList";
            albumCover.className = "albumCover";
            songTitle.className = "songTitle songInfo";
            songArtist.className = "songArtist songInfo";
            fileList.appendChild(albumCover);
            fileList.appendChild(songTitle);
            fileList.appendChild(songArtist);
            documentFragment.appendChild(fileList);
            document.querySelector(".homePage").appendChild(documentFragment);
            fileList.addEventListener("click", app.addDetails);
        })
    },

    randomAddDetails: function () {
        let i = ((min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max + 1);
            return Math.floor(Math.random() * (max - min)) + min;
        })(0, app.appData.length - 1);
        let songId = app.appData[i].id;
        document.querySelector(".playInfo").setAttribute("data-id", songId);
        document.querySelector(".playCoverBkg").src = app.appData[i].img;
        document.querySelector(".playCover").src = app.appData[i].img;
        document.querySelector(".playSongTitle").textContent = app.appData[i].title;
        document.querySelector(".footTitle").textContent = app.appData[i].title;
        document.querySelector(".playSongArtist").textContent = app.appData[i].artist;
    },

    addDetails: function (ev) {
        let songId = ev .currentTarget.getAttribute("data-id");
        let i = app.appData.findIndex(item => item.id == songId);

        document.querySelector(".playInfo").setAttribute("data-id", songId);
        document.querySelector(".playCoverBkg").src = app.appData[i].img;
        document.querySelector(".playCover").src = app.appData[i].img;
        document.querySelector(".playSongTitle").textContent = app.appData[i].title;
        document.querySelector(".playSongArtist").textContent = app.appData[i].artist;
        document.querySelector(".footTitle").textContent = app.appData[i].title;
        if(app.playTime){
            app.media.stop();
            app.media.release();
        }
        document.querySelector(".playBtn").classList.add("fa-play");
        document.querySelector(".playBtn").classList.remove("fa-pause");
        app.ready();
        app.playOrPause();
        app.showPlay();
    },

    togglePlayAndPause: function(){
        document.querySelector(".playBtn").classList.toggle("fa-play");
        document.querySelector(".playBtn").classList.toggle("fa-pause");
    },

    switchSongInfo: function () {
        document.querySelector(".playCover").classList.remove("PCBreathing");
        document.querySelector(".playCover").classList.remove("PCShow");
        document.querySelector(".playCoverBkg").classList.remove("playCoverBkgBlur");
        document.querySelector(".playCtn").classList.remove("PPPlayCtn");
        document.querySelector(".playInfo").classList.remove("playInfoShow");
    },

    switchSongInfoShow: function () {
        document.querySelector(".playCover").classList.add("PCShow");
        document.querySelector(".playCoverBkg").classList.add("playCoverBkgBlur");
        document.querySelector(".playCtn").classList.add("PPPlayCtn");
        document.querySelector(".playInfo").classList.add("playInfoShow");
        setTimeout(()=>{
            document.querySelector(".playCover").classList.add("PCBreathing");
        }, 850);
    },

    controlBar: function(ev){
        let duration = app.media.getDuration();
        let playedLength = ev.offsetX; // offsetX related here: https://blog.csdn.net/weinideai/article/details/3885444 
        let fullLength = ev.currentTarget.offsetWidth;
        let percentage = playedLength/fullLength;
        document.querySelector(".playedBar").style.width = (percentage*100) + "%";
        let seekPercentage = duration * percentage;
        app.media.seekTo(seekPercentage * 1000);
    },

    nextSong: function () {
        app.switchSongInfo();
        document.querySelector(".playBtn").classList.remove("fa-play");
        document.querySelector(".playBtn").classList.add("fa-pause");
        app.media.stop();
        app.media.release();

        let songId = document.querySelector(".playInfo").getAttribute("data-id");
        let i = app.appData.findIndex(item => item.id == songId) + 1;
        if (i == app.appData.length) {
            i = 0;
        }
        songId = app.appData[i].id;
        document.querySelector(".playInfo").setAttribute("data-id", songId);

        setTimeout(() => {
            document.querySelector(".playCoverBkg").src = app.appData[i].img;
            document.querySelector(".playCover").src = app.appData[i].img;
            document.querySelector(".playSongTitle").textContent = app.appData[i].title;
            document.querySelector(".playSongArtist").textContent = app.appData[i].artist;
            document.querySelector(".footTitle").textContent = app.appData[i].title;
        }, 250);

        app.ready();
        app.playTime++;
        app.media.play();
        setTimeout(app.switchSongInfoShow, 250);
    },

    lastSong: function () {
        app.switchSongInfo();
        document.querySelector(".playBtn").classList.remove("fa-play");
        document.querySelector(".playBtn").classList.add("fa-pause");
        app.media.stop();
        app.media.release();

        let songId = document.querySelector(".playInfo").getAttribute("data-id");
        let i = app.appData.findIndex(item => item.id == songId) - 1;
        if (i == -1) {
            i = app.appData.length - 1;
        }
        songId = app.appData[i].id;
        document.querySelector(".playInfo").setAttribute("data-id", songId);

        setTimeout(() => {
            document.querySelector(".playCoverBkg").src = app.appData[i].img;
            document.querySelector(".playCover").src = app.appData[i].img;
            document.querySelector(".playSongTitle").textContent = app.appData[i].title;
            document.querySelector(".playSongArtist").textContent = app.appData[i].artist;
            document.querySelector(".footTitle").textContent = app.appData[i].title;
        }, 250);

        app.ready();
        app.playTime++;
        app.media.play();
        setTimeout(app.switchSongInfoShow, 250);
    },  
    volumeUp: function(){
        vol = app.volume;
        vol += 0.1;
        if(vol > 1){
            vol = 1.0;
        }
        app.media.setVolume(vol);
        app.volume = vol;
    },

    volumeDown: function(){
        vol = app.volume;
        vol -= 0.1;
        if(vol < 0){
            vol = 0;
        }
        app.media.setVolume(vol);
        app.volume = vol;
    }
}

if ('cordova' in window) {
    document.addEventListener("deviceready", app.init);
} 
else {
    document.addEventListener("DOMContentLoaded", app.init);
}



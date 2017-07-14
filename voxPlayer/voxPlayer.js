
/**
 *
 * @param {* string} el
 * @param {* is a element has render voxvideo player inside it} el
 * @param {* voxP is element Player} voxP
 * @param {* voxVc is a element for video container } voxVc
 */

/**
 * @constant {video , buttons }
 *
 */

/**
 * define constant controls
 */
const voxVc = document.createElement('div');
const voxV = document.createElement('video');
const voxSeek = document.createElement('div');
const voxSeekCtrl = document.createElement('div');
const voxCtrl = document.createElement('div');
const voxPlay = document.createElement('img');
const voxSnd = document.createElement('div');
const voxSndCtrl = document.createElement('div');
const voxVolume = document.createElement('img');
const voxTimer = document.createElement('div');
const voxFullScreen = document.createElement('img');
const voxSetting = document.createElement('img');
const voxup_layer = document.createElement('div');
const voxImagelayer = document.createElement('img');
const voxVbufferd = document.createElement('div');
const voxPreviewBox = document.createElement('div');
const VoxPreviewVid = document.createElement('video');


const logo = "VOXPlayer";
function voxPlayer(el, src) {


    // render a  element inside div
    this.voxP = document.getElementById(el);
    this.voxP.setAttribute('class', 'voxPlayerContainer ');



    if (this.voxP !== null)
        if (src && typeof src === "string")
            this.buildVideo(src);

    voxV.load();
    VoxPreviewVid.load();



}

voxPlayer.prototype = {



    // create video
    buildVideo: function (src) {

        /* create 3 elements video container, video elements, video source
            set class, attribute for elements 
            push elements to player container 
        */
        voxVc.setAttribute('class', 'voxPlayerVideoContainer');

        voxV.setAttribute('class', 'voxPlayerVideo');

        this.voxSrc = document.createElement('source');
        this.voxSrc.setAttribute('type', 'video/mp4');
        this.voxSrc.setAttribute('src', src);

        voxV.appendChild(this.voxSrc);
        voxVc.appendChild(voxV);


        this.voxP.appendChild(voxVc);
        //Loaded  screen
        voxImagelayer.src = "./voxControl/fullPlay.png";
        voxup_layer.appendChild(voxImagelayer);
        voxup_layer.setAttribute('class', 'voxUp_layer');
        this.voxP.appendChild(voxup_layer);
        //build preview control

        VoxPreviewVid.src = this.voxSrc.src;
        VoxPreviewVid.setAttribute('class', 'VoxPreviewVid');
        VoxPreviewVid.setAttribute('hidden', 'hidden');
        voxPreviewBox.appendChild(VoxPreviewVid);



        voxVc.appendChild(voxup_layer);



        this.buildSeek();
        this.buildControls();
        this.setEvent();
        this.voxP.appendChild(voxPreviewBox);

    },
    buildSeek: function () {

        //seek bar control

        voxSeek.setAttribute('class', 'voxSeek');

        //seek bufferd
        voxVbufferd.setAttribute('class', 'voxVBufferdSeek');
        voxSeek.appendChild(voxVbufferd);
        //seek  controls
        voxSeekCtrl.setAttribute('class', 'voxSeekCtrl');
        voxSeek.appendChild(voxSeekCtrl);
        this.voxP.appendChild(voxSeek);
    },
    buildControls: function () {

        voxCtrl.setAttribute('class', 'voxCtrl');

        voxPlay.setAttribute('src', './voxControl/Play.png');

        voxCtrl.appendChild(voxPlay);

        // create Time Control

        voxTimer.setAttribute('class', 'voxTimer');
        voxTimer.innerHTML = "00:00 / 00:00";
        voxCtrl.appendChild(voxTimer);

        // create sound Control

        voxVolume.setAttribute('src', './voxControl/Speaker.png');
        voxCtrl.appendChild(voxVolume);

        //create sound bar control

        voxSnd.setAttribute('class', 'voxSnd');
        voxCtrl.appendChild(voxSnd);

        // create sound bar

        voxSndCtrl.setAttribute('class', 'voxSndCtrl');
        voxSnd.appendChild(voxSndCtrl);

        //add logo

        var plog = document.createElement('div');
        plog.setAttribute('style', 'color:white;font-family:sans-serif');
        plog.innerHTML = logo;
        voxCtrl.appendChild(plog);

        //create full screen

        voxFullScreen.setAttribute('src', './voxControl/Full Screen.png');
        voxFullScreen.setAttribute('class', 'voxFullScreen');
        voxCtrl.appendChild(voxFullScreen);

        //settingControl
        voxSetting.src = "./voxControl/setting.png";
        voxSetting.setAttribute('class', 'voxSetting');
        voxCtrl.appendChild(voxSetting);


        this.voxP.appendChild(voxCtrl);

    },

    SetFullScreen: function () {

        if (voxV.requestFullscreen)
            voxV.requestFullscreen();
        else if (voxV.mozRequestFullscreen)
            voxV.mozRequestFullscreen();
        else if (voxV.msRequestFullscreen)
            voxV.msRequestFullscreen();
        else if (voxV.webkitRequestFullscreen) {
            voxV.webkitRequestFullscreen();
            //document.getElementsByClassName('voxPlayerContainer')[0].setAttribute('class','voxPlayerContainer voxPlayerContainerFullScreen');
            //document.getElementsByClassName('voxPlayerContainer')[0].setAttribute('style','height:'+window.innerHeight+'px');
        }
    },
    playOrpause: function () {

        if (voxV.paused) {
            voxV.play();
            voxPlay.src = "./voxControl/Pause.png";
            update = window.setInterval(voxPlayer.prototype.updateVideo, 30);
        } else {
            voxV.pause();
            voxPlay.src = "./voxControl/Play.png";
            window.clearInterval(voxPlayer.prototype.updateVideo);
        }
    },

    updateVideo: function () {
        voxTimer.innerHTML = voxPlayer.prototype.setTimeFormat();
        voxSeekCtrl.style.width = (voxV.currentTime / voxV.duration) * 100 + "%";
        voxPlayer.prototype.videoBufferd();
        voxPlayer.prototype.videoLoad();

        if (voxV.ended) {
            voxPlay.src = "./voxControl/Restart.png";
            window.clearInterval(update);
        }
    },
    skipVideo: function (ev) {
        var seekCurrentWidth = ev.pageX - voxSeek.offsetLeft;
        var seekWidth = window.getComputedStyle(voxSeek).getPropertyValue('width');
        seekWidth = parseFloat(seekWidth.substr(0, seekWidth.length - 2));
        voxV.currentTime = seekCurrentWidth / seekWidth * voxV.duration;
        voxPlayer.prototype.updateVideo();


    },
    setTimeFormat: function () {

        var seconds = Math.round(voxV.duration);
        var mins = Math.floor(seconds / 60);

        if (mins > 0) seconds -= mins * 60;

        if (seconds.toString().length === 1) seconds = '0' + seconds;
        if (mins.toString().length === 1) mins = '0' + mins;

        var curSeconds = Math.round(voxV.currentTime);
        var curMins = Math.floor(curSeconds / 60);

        if (curMins > 0) curSeconds -= curMins * 60;

        if (curSeconds.toString().length === 1) curSeconds = '0' + curSeconds;
        if (curMins.toString().length === 1) curMins = '0' + curMins;

        return curMins + ' : ' + curSeconds + '  /  ' + mins + ' : ' + seconds;


    },

    MuteOrNoMute: function () {
        if (voxV.muted) {
            voxV.muted = false;
            voxVolume.src = "./voxControl/Speaker.png";
            voxSnd.removeAttribute('style');
        } else {
            voxV.muted = true;
            voxVolume.src = "./voxControl/Mute.png";
            voxSnd.setAttribute("style", "display:none");
        }
    },

    volumeChange: function (ev) {
        var currentVolume = ev.pageX - voxSndCtrl.offsetLeft;
        var volume = window.getComputedStyle(voxSnd).getPropertyValue('width');
        volume = parseFloat(volume.substr(0, volume.length - 2));
        voxV.volume = currentVolume / volume;
        voxSndCtrl.style.width = voxV.volume * 100 + "%";
    },

    setEvent: function () {
        voxPlay.addEventListener('click', this.playOrpause, false);

        voxSeek.addEventListener('click', this.skipVideo, false);
        voxVolume.addEventListener('click', this.MuteOrNoMute, false);
        voxSnd.addEventListener('click', this.volumeChange, false);
        voxVc.addEventListener('click', this.playOrpause, false);
        voxV.addEventListener('progress', this.videoBufferd, false);

        // set preview event
        if (VoxPreviewVid.load && voxV.played) {
            voxSeek.addEventListener('mouseover', this.setVideoPreview, false);
            voxSeek.addEventListener('mousemove', this.setVideoPreview, false);
        }
        //hide preview 
        voxSeek.addEventListener('mouseout', function () {
            VoxPreviewVid.setAttribute('hidden', 'hidden');
            voxPreviewBox.removeAttribute('class');
        }, false);

        // full screen mode
        voxFullScreen.addEventListener('click', this.SetFullScreen, false);

    },
    videoLoad: function () {
        switch (voxV.readyState) {
            case 0:
                voxImagelayer.setAttribute('style', 'display:none');
                voxup_layer.innerHTML = "Playback error";
                break;
            case 1:
                voxup_layer.setAttribute('class', 'displayOn voxUp_layer');
                voxImagelayer.removeAttribute('style');
                voxImagelayer.src = "./voxControl/loading.gif";
                break;
            case 2:
                voxup_layer.setAttribute('class', 'displayOn voxUp_layer');
                voxImagelayer.removeAttribute('style');
                voxImagelayer.src = "./voxControl/loading.gif";
                break;
            case 3:
                voxup_layer.setAttribute('class', 'displayOn voxUp_layer');
                voxImagelayer.removeAttribute('style');
                voxImagelayer.src = "./voxControl/loading.gif";
                break;
            case 4:
                voxup_layer.setAttribute('class', 'displayOff');

                break;

        }
    },
    videoBufferd: function () {
        voxVbufferd.style.width = voxV.buffered.end(0) / voxV.duration * 100 + '%';

    },
    setVideoPreview: function (ev) {
        // set Preview Width 
        var voxPreviewWidth = ev.pageX - voxSeek.offsetLeft;
        // set Preview Height
        var voxPreviewHeigh = voxSeek.offsetTop - 104;





        //set preview current time 
        var Prevwidth = window.getComputedStyle(voxSeek).getPropertyValue('width');
        Prevwidth = Prevwidth.substr(0, Prevwidth.length - 2);
        PrevcurrentWidth = ev.pageX - voxSeek.offsetLeft;

        PrevcurrentPreview = (PrevcurrentWidth / Prevwidth) * VoxPreviewVid.duration;

        VoxPreviewVid.currentTime = PrevcurrentPreview;
        //

        ///// to not pass a last video border 
        // position from start and end 

        //if( ev.pageX<= )
        //



        // alert(currentPreview);

        // view Video preview 
        VoxPreviewVid.removeAttribute('hidden');
        // view Preview Box 
        voxPreviewBox.setAttribute('class', 'VoxPreview');
        voxPreviewBox.setAttribute('style', 'top:' + voxPreviewHeigh + 'px;left:' + voxPreviewWidth + 'px');

    },
    setStaylevoxPlayerFullScreen: function () {

    },
    blurStaylevoxPlayerFullScreen: function () {

    }


};


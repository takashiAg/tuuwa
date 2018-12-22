class Video {
    constructor(video, other_video) {
        this.video = video
        this.other_video = other_video

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        this.id = uuid()
        this.peer = new Peer(this.id, {host: 'localhost', port: 9000, path: '/peerjs',});
        this.peer.on('open', console.log);

        this.mystream = null;

        let _this = this
        this.peer.on('call', function (call) {
            call.answer(_this.myStream);

            call.on('stream', function (othersStream) {
                document.getElementById(other_video).srcObject = othersStream;
            });
        });

    }

    callTo(peerId) {
        let _this = this
        this.call = this.peer.call(peerId, this.myStream);

        this.call.on('stream', function (othersStream) {
            document.getElementById(_this.other_video).srcObject = othersStream;
        });
    }

    start() {
        let _this = this
        // console.log("this", this, _this)
        navigator.getUserMedia({audio: true, video: true}, function (stream) {
            _this.myStream = stream;
            document.getElementById(_this.video).srcObject = stream;
        }, function () {
        });
    }
}



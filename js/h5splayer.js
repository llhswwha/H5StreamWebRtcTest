function H5sPlayerWS(conf) {
    var s;
    this.sourceBuffer, this.buffer = [], this._mediaSource, this.video, this.wsSocket, this.checkSourceBufferTimerId, this.keepAliveTimerId, this.h = 0, this.l = 0,
        this.u = 0, this.S = false, this.v = false, this.p = false, this.strCodec, this._conf = conf, console.log("Websocket Conf:",
            conf), this._videoId = conf.videoid, this._pbconf = conf.pbconf, this._token = conf.token, void 0 === this._videoId ? (this._videoElemet = conf.videodom,
                console.log(conf.token, "use dom directly")) : (this._videoElemet = document.getElementById(this._videoId), console.log(conf.token,
                    "use videoid")), this.video = this._videoElemet, null != this._pbconf && "false" == this._pbconf.showposter || (s = this._conf.protocol + "//" + this._conf.host + this._conf.rootpath + "api/v1/GetImage?token=" + this._token + "&session=" + this._conf.session,
                        console.log(conf.token, "connect src"), this._videoElemet.setAttribute("poster", s))
}
function H5sPlayerRTC(conf) {
    var s;
    this.wsSocket, this.checkSourceBufferTimerId, this.keepAliveTimerId, this.h = 0, this.l = 0, this.u = 0, this.S = false, this.v = false, this._conf = conf,
        this._videoId = conf.videoid, this._pbconf = conf.pbconf, this._token = conf.token, void 0 === this._videoId ? (this._videoElemet = conf.videodom,
            console.log(conf.token, "use dom directly")) : (this._videoElemet = document.getElementById(this._videoId), console.log(conf.token,
                "use videoid")), this.video = this._videoElemet, this.peerConnection = null, this.option = {
                    optional: [{
                        DtlsSrtpKeyAgreement: true
                    }]
                },
        this.offerOptions = {
            mandatory: {
                offerToReceiveAudio: true, offerToReceiveVideo: true
            }
        },
        this.config = {
            M: []
        },
        this.O = [], null != this._pbconf && "false" == this._pbconf.showposter || (s = this._conf.protocol + "//" + this._conf.host + this._conf.rootpath + "api/v1/GetImage?token=" + this._token + "&session=" + this._conf.session,
            console.log("connect src", conf.token), this._videoElemet.setAttribute("poster", s))
}
function createRTCSessionDescription(offer) {
    return console.log("createRTCSessionDescription ",offer), new RTCSessionDescription(offer)
}
function H5sPlayerHls(t) {
    this.wsSocket, this.keepAliveTimerId, this._conf = t, this._videoId = t.videoid, this._token = t.token, this.J, this.N = t.hlsver, void 0 === this._videoId ? (this._videoElemet = t.videodom,
        console.log(t.token, "use dom directly")) : (this._videoElemet = document.getElementById(this._videoId), console.log(t.token,
            "use videoid")), this.g = this._videoElemet, this.g.type = "application/x-mpegURL", this.B = 0, this.U = 0;
    var s = this._conf.protocol + "//" + window.location.host + "/api/v1/GetImage?token=" + this._token + "&session=" + this._conf.session;
    this._videoElemet.setAttribute("poster", s)
}
function H5sPlayerAudio(t) {
    this.buffer = [], this.wsSocket, this.S = false, this.v = false, this._conf = t, console.log("Aduio Player Conf:",
        t), this._token = t.token, this._ = new AudioContext
}
function H5sPlayerAudBack(t) {
    this.buffer = [], this.wsSocket, this.S = false, this.v = false, this._conf = t, this.L = 0, this.D = 48e3, this.G = false,
        console.log("Aduio Back Conf:", t), this._token = t.token, this._ = new AudioContext, console.log("sampleRate",
            this._.sampleRate), this.K()
}
function float32ToInt16(t) {
    for (var s = t.length, e = new Int16Array(s); s--;) {
        e[s] = 32767 * Math.min(1, t[s]);
    }
    return e
}
H5sPlayerWS.prototype.reconnectFunction = function () {
    console.error('reconnectFunction'+new Date());
    true === this.S && (console.log("Reconnect..."), this.setupWebSocket(this._token), this.S = false)
},
    H5sPlayerWS.prototype.getWebSocket = function (url) {
        console.log('>> H5sPlayerWS.prototype.getWebSocket');
        var ws;
        try {
            "http:" == this._conf.protocol && (ws = "undefined" != typeof MozWebSocket ? new MozWebSocket("ws://" + this._conf.host + url) : new WebSocket("ws://" + this._conf.host + url)),
                "https:" == this._conf.protocol && (console.log(this._conf.host), ws = "undefined" != typeof MozWebSocket ? new MozWebSocket("wss://" + this._conf.host + url) : new WebSocket("wss://" + this._conf.host + url)),
                console.log(this._conf.host)
        }
        catch (err) {
            return void alert("error")
        }
        return ws;
    },
    H5sPlayerWS.prototype.readFromBuffer = function () {
        //console.error('F');
        //console.log(this.sourceBuffer);
        if (null !== this.sourceBuffer && void 0 !== this.sourceBuffer) {
            if (0 !== this.buffer.length && !this.sourceBuffer.updating) {
                try {
                    var first = this.buffer.shift(), buff = new Uint8Array(first);
                    this.sourceBuffer.appendBuffer(buff)
                }
                catch (err) {
                    console.log(err)
                }
            }
        }
        else {
            console.log(this.sourceBuffer, "is null or undefined");
        }
        //console.log(this.sourceBuffer);
    },
    H5sPlayerWS.prototype.keepAlive = function () {
        //console.error('X keepaliveTimer');
        //console.log(this);
        //console.log(this.wsSocket);
        try {
            var t = {
                cmd: "H5_KEEPALIVE"
            };
            this.wsSocket.send(JSON.stringify(t))
        }
        catch (err) {
            console.log(err)
        }
    },

    //获取websocket数据
    H5sPlayerWS.prototype.onReceived = function (msg) {
        //console.log('>> H5sPlayerWS.prototype.onReceived');
        //console.log(msg.data);
        //var ttt=String.fromCharCode.apply(null, new Uint8Array(msg.data));
        //console.log(ttt);
        return msg.data, ArrayBuffer, "string" == typeof msg.data ? (console.log("string"), void (null != this._pbconf && null != this._pbconf.callback && this._pbconf.callback(msg.data,
            this._pbconf.userdata))) : true !== this.v ? false === this.p ? (this.strCodec = String.fromCharCode.apply(null, new Uint8Array(msg.data)),
                this.initMediaSource(this), void (this.p = true)) : (this.buffer.push(msg.data), void this.readFromBuffer()) : void 0;
    },
    
    H5sPlayerWS.prototype.initMediaSource = function (player) {
        console.log('initMediaSource');
        try {
            window.MediaSource = window.MediaSource || window.WebKitMediaSource, window.MediaSource || console.log("MediaSource API is not available");
            var codec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
            "MediaSource" in window && MediaSource.isTypeSupported(codec) ? console.log("MIME type or codec: ",
                codec) : console.log("Unsupported MIME type or codec: ", codec), player._mediaSource = new window.MediaSource, player.video.autoplay = true,
                console.log(player._videoId);
            player.video.src = window.URL.createObjectURL(player._mediaSource), player.video.play(), player._mediaSource.addEventListener("sourceopen",
                player.onMediaSourceOpen.bind(player), false)
        }
        catch (err) {
            console.log(err)
        }
    },
    H5sPlayerWS.prototype.onMediaSourceOpen = function () {
        console.log("Add SourceBuffer"), this.sourceBuffer = this._mediaSource.addSourceBuffer(this.strCodec), this._mediaSource.duration = 1 / 0,
            this._mediaSource.removeEventListener("sourceopen", this.onMediaSourceOpen, false), this.sourceBuffer.addEventListener("updateend",
                this.readFromBuffer.bind(this), false);
    },
    H5sPlayerWS.prototype.setupWebSocket = function (token) {
        console.log('>> H5sPlayerWS.prototype.setupWebSocket');
        this.video.autoplay = true;
        var url = "api/v1/h5swsapi", prof = "main";
        if (void 0 === this._conf.streamprofile || (prof = this._conf.streamprofile), void 0 === this._pbconf) {
            url = this._conf.rootpath + url + "?token=" + token + "&profile=" + prof + "&session=" + this._conf.session;
        }
        else {
            var i = "false", o = "fake";
            void 0 === this._pbconf.serverpb || (i = this._pbconf.serverpb), void 0 === this._pbconf.filename || (o = this._pbconf.filename),
                url = this._conf.rootpath + url + "?token=" + token + "&playback=true&profile=" + prof + "&serverpb=" + i + "&begintime=" + encodeURIComponent(this._pbconf.begintime) + "&endtime=" + encodeURIComponent(this._pbconf.endtime) + "&filename=" + o + "&session=" + this._conf.session
        }
        this._conf.session, console.log(url), this.wsSocket = this.getWebSocket(url), console.log("setupWebSocket", this.wsSocket), this.wsSocket.binaryType = "arraybuffer",
            (this.wsSocket._player = this).wsSocket.onmessage = this.onReceived.bind(this), this.wsSocket.onopen = function () {
                console.log("wsSocket.onopen", this._player), this._player.checkSourceBufferTimerId = setInterval(this._player.checkSourceBuffer.bind(this._player), 1e4),
                    this._player.keepAliveTimerId = setInterval(this._player.keepAlive.bind(this._player), 1e3), null != this._player._pbconf && "true" === this._player._pbconf.autoplay && this._player.start();
            },
            this.wsSocket.onclose = function () {
                console.log("wsSocket.onclose", this._player), true === this._player.v ? console.log("wsSocket.onclose disconnect") : this._player.S = true,
                    this._player.cleanupSourceBuffer(this._player), this._player.cleanupWebSocket(this._player), this._player.strCodec = "", this._player.p = false;
            }
    },
    H5sPlayerWS.prototype.cleanupSourceBuffer = function (player) {
        console.log("Cleanup Source Buffer", player);
        try {
            player.sourceBuffer.removeEventListener("updateend", player.readFromBuffer, false), player.sourceBuffer.abort(), document.documentMode || /Edge/.test(navigator.userAgent) ? console.log("IE or EDGE!") : player._mediaSource.removeSourceBuffer(player.sourceBuffer),
                player.sourceBuffer = null, player._mediaSource = null, player.buffer = []
        }
        catch (err) {
            console.log(err)
        }
    },
    H5sPlayerWS.prototype.cleanupWebSocket = function (player) {
        
        console.log("CleanupWebSocket", player);
        //console.error(player);
        clearInterval(player.keepAliveTimerId), clearInterval(player.checkSourceBufferTimerId), player.h = 0, player.l = 0, player.u = 0;
    },
    H5sPlayerWS.prototype.checkSourceBuffer = function () {
        if (void 0 === this._pbconf) {
            true === this.v && (console.log("CheckSourceBuffer has been disconnect", this), clearInterval(this.keepAliveTimerId),
                clearInterval(this.checkSourceBufferTimerId), clearInterval(this.reconnectTimerId));
            try {
                if (console.log("CheckSourceBuffer", this), this.sourceBuffer.buffered.length <= 0) {
                    if (this.h++ , 8 < this.h) {
                        return console.log("CheckSourceBuffer Close 1"), void this.wsSocket.close();
                    }
                }
                else {
                    this.h = 0;
                    this.sourceBuffer.buffered.start(0);
                    var t = this.sourceBuffer.buffered.end(0), s = t - this.video.currentTime;
                    if (5 < s || s < 0) {
                        return console.log("CheckSourceBuffer Close 2", s), void this.wsSocket.close();
                    }
                    if (t == this.l) {
                        if (this.u++ , 3 < this.u) {
                            return console.log("CheckSourceBuffer Close 3"), void this.wsSocket.close();
                        }
                    }
                    else {
                        this.u = 0;
                    }
                    this.l = t;
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    },
    H5sPlayerWS.prototype.connect = function () {
        this.setupWebSocket(this._token);
        this.reconnectTimerId = setInterval(this.reconnectFunction.bind(this), 3e3);//没3s重连一次。
    },
    H5sPlayerWS.prototype.disconnect = function () {
        console.log("disconnect", this), this.v = true, clearInterval(this.reconnectTimerId), null != this.wsSocket && (this.wsSocket.close(),
            this.wsSocket = null), console.log("disconnect", this);
    },
    H5sPlayerWS.prototype.start = function () {
        try {
            var t = {
                cmd: "H5_START"
            };
            this.wsSocket.send(JSON.stringify(t))
        }
        catch (err) {
            console.log(err)
        }
    },
    H5sPlayerWS.prototype.pause = function () {
        try {
            var t = {
                cmd: "H5_PAUSE"
            };
            this.wsSocket.send(JSON.stringify(t))
        }
        catch (err) {
            console.log(err)
        }
    },
    H5sPlayerWS.prototype.resume = function () {
        try {
            var t = {
                cmd: "H5_RESUME"
            };
            this.wsSocket.send(JSON.stringify(t))
        }
        catch (err) {
            console.log(err)
        }
    },
    H5sPlayerWS.prototype.seek = function (t) {
        try {
            var s = {
                cmd: "H5_SEEK"
            };
            s.nSeekTime = t, this.wsSocket.send(JSON.stringify(s))
        }
        catch (err) {
            console.log(err)
        }
    },
    H5sPlayerWS.prototype.speed = function (t) {
        try {
            var s = {
                cmd: "H5_SPEED"
            };
            s.nSpeed = t, this.wsSocket.send(JSON.stringify(s))
        }
        catch (err) {
            console.log(err)
        }
    },
    H5sPlayerRTC.prototype.reconnectFunction = function () {
        true === this.S && (console.log("Reconnect..."), this.setupWebSocket(this._token), this.S = false)
    },
    H5sPlayerRTC.prototype.q = function (t) {
        var s;
        console.log("H5SWebSocketClient");
        try {
            "http:" == this._conf.protocol && (s = "undefined" != typeof MozWebSocket ? new MozWebSocket("ws://" + this._conf.host + t) : new WebSocket("ws://" + this._conf.host + t)),
                "https:" == this._conf.protocol && (console.log(this._conf.host), s = "undefined" != typeof MozWebSocket ? new MozWebSocket("wss://" + this._conf.host + t) : new WebSocket("wss://" + this._conf.host + t)),
                console.log(this._conf.host)
        }
        catch (err) {
            return void alert("error")
        }
        return s;
    },
    H5sPlayerRTC.prototype.keepAlive = function () {
        try {
            var t = {
                type: "keepalive"
            };
            this.wsSocket.send(JSON.stringify(t))
        }
        catch (err) {
            console.log(err)
        }
    },
    H5sPlayerRTC.prototype.onIceCandidate = function (event) {
        if (event.candidate) {
            var candidate;
            console.log("onIceCandidate currentice", event.candidate), candidate = event.candidate, console.log("onIceCandidate currentice",
                candidate, JSON.stringify(candidate));
            var candidateObj = JSON.parse(JSON.stringify(candidate));
            candidateObj.type = "remoteice";
            console.log("onIceCandidate currentice new", candidateObj, JSON.stringify(candidateObj));
            this.wsSocket.send(JSON.stringify(candidateObj));
        }
        else {
            console.log("End of candidates.");
        }
    },
    H5sPlayerRTC.prototype.onAddStream = function (mediaStreamEvent) {
        var stream;
        console.log("Remote track added:" + JSON.stringify(mediaStreamEvent));
        stream = mediaStreamEvent.ct ? mediaStreamEvent.ct[0] : mediaStreamEvent.stream;
        console.log(stream);
        var video = this._videoElemet;
        var src=URL.createObjectURL(stream); 
        console.log("src:",src);
        video.src = src; 
        video.play();
    },

    H5sPlayerRTC.prototype.createPeerConnection = function () {
        console.log("createPeerConnection  config: " + JSON.stringify(this.config) + " option:" + JSON.stringify(this.option));
        var connection = new RTCPeerConnection(this.config, this.option), player = this;
        return connection.onicecandidate = function (event) {
            player.onIceCandidate.call(player, event)
        },
            void 0 !== connection.lt ? connection.lt = function (t) {
                player.onAddStream.call(player, t)
            }
                : connection.onaddstream = function (mediaStreamEvent) {
                    player.onAddStream.call(player, mediaStreamEvent)
                },
            connection.oniceconnectionstatechange = function (t) {
                console.log("oniceconnectionstatechange  state: " + connection.iceConnectionState)
            },
            console.log("Created RTCPeerConnnection with config: " + JSON.stringify(this.config) + "option:" + JSON.stringify(this.option)),
            connection
    },
    H5sPlayerRTC.prototype.processRTCOffer = function (offer) {
        console.log("ProcessRTCOffer", offer);
        try {
            this.peerConnection = this.createPeerConnection(), this.O.length = 0;
            var player = this;
            this.peerConnection.setRemoteDescription(createRTCSessionDescription(offer));
            this.peerConnection.createAnswer(this.offerOptions).then(function (answer) {
                console.log("Create answer:" + JSON.stringify(answer));
                player.peerConnection.setLocalDescription(answer, function () {
                    console.log("ProcessRTCOffer createAnswer", answer);
                    player.wsSocket.send(JSON.stringify(answer));
                },
                    function () { })
            },
                function (error) {
                    alert("Create awnser error:" + JSON.stringify(error))
                })
        }
        catch (err) {
            this.disconnect(), alert("connect error: " + err)
        }
    },
    H5sPlayerRTC.prototype.processRemoteIce = function (dataObj) {
        console.log("ProcessRemoteIce", dataObj);
        try {
            var iceCandidate = new RTCIceCandidate({
                sdpMLineIndex: dataObj.sdpMLineIndex, candidate: dataObj.candidate
            });
            console.log("ProcessRemoteIce", iceCandidate);
            console.log("Adding ICE candidate :" + JSON.stringify(iceCandidate));
                this.peerConnection.addIceCandidate(iceCandidate, function () {
                    console.log("addIceCandidate OK")
                },
                    function (error) {
                        console.log("addIceCandidate error:" + JSON.stringify(error))
                    })
        }
        catch (err) {
            alert("connect ProcessRemoteIce error: " + err)
        }
    },
    H5sPlayerRTC.prototype.onReceived = function (msg) {
        msg.data, ArrayBuffer, msg.data, console.log("RTC received ", msg.data);
        var dataObj = JSON.parse(msg.data);
        return console.log("Get Message type ", dataObj.type), "offer" === dataObj.type ? (console.log("Process Message type ",
            dataObj.type), void this.processRTCOffer(dataObj)) : "remoteice" === dataObj.type ? (console.log("Process Message type ", dataObj.type),
                void this.processRemoteIce(dataObj)) : void (null != this._pbconf && null != this._pbconf.callback && this._pbconf.callback(msg.data, this._pbconf.userdata))
    },
    H5sPlayerRTC.prototype.setupWebSocket = function (token) {
        this.video.autoplay = true;
        var url = "api/v1/h5srtcapi", prof = "main";
        if (void 0 === this._conf.streamprofile || (prof = this._conf.streamprofile), void 0 === this._pbconf) {
            url = this._conf.rootpath + url + "?token=" + token + "&profile=" + prof + "&session=" + this._conf.session;
        }
        else {
            var i = "false", o = "fake";
            void 0 === this._pbconf.serverpb || (i = this._pbconf.serverpb), void 0 === this._pbconf.filename || (o = this._pbconf.filename),
                url = this._conf.rootpath + url + "?token=" + token + "&playback=true&profile=" + prof + "&serverpb=" + i + "&begintime=" + encodeURIComponent(this._pbconf.begintime) + "&endtime=" + encodeURIComponent(this._pbconf.endtime) + "&filename=" + o + "&session=" + this._conf.session
        }

        console.log(url), this.wsSocket = this.q(url), console.log("setupWebSocket", this.wsSocket), this.wsSocket.binaryType = "arraybuffer",
            (this.wsSocket._player = this).wsSocket.onmessage = this.onReceived.bind(this), this.wsSocket.onopen = function () {
                console.log("wsSocket.onopen", this._player);
                var t = {
                    type: "open"
                };
                this._player.wsSocket.send(JSON.stringify(t)), this._player.keepAliveTimerId = setInterval(this._player.keepAlive.bind(this._player), 1e3), null != this._player._pbconf && "true" === this._player._pbconf.autoplay && this._player.start();
            },
            this.wsSocket.onclose = function () {
                console.log("wsSocket.onclose", this._player), true === this._player.v ? console.log("wsSocket.onclose disconnect") : this._player.S = true,
                    this._player.cleanupWebSocket(this._player)
            }
        //console.log(this.wsSocket);
    },
    H5sPlayerRTC.prototype.cleanupWebSocket = function (t) {
        console.log("CleanupWebSocket", t), clearInterval(t.keepAliveTimerId), t.h = 0, t.l = 0, t.u = 0;
    },
    H5sPlayerRTC.prototype.connect = function () {
        this.setupWebSocket(this._token), this.reconnectTimerId = setInterval(this.reconnectFunction.bind(this), 3e3);
    },
    H5sPlayerRTC.prototype.disconnect = function () {
        console.log("disconnect", this), this.v = true, clearInterval(this.reconnectTimerId), null != this.wsSocket && (this.wsSocket.close(),
            this.wsSocket = null), console.log("disconnect", this);
    },
    H5sPlayerRTC.prototype.start = function () {
        try {
            var t = {
                cmd: "H5_START"
            };
            this.wsSocket.send(JSON.stringify(t))
        }
        catch (err) {
            console.log(err)
        }
    },
    H5sPlayerRTC.prototype.pause = function () {
        try {
            var t = {
                cmd: "H5_PAUSE"
            };
            this.wsSocket.send(JSON.stringify(t))
        }
        catch (err) {
            console.log(err)
        }
    },
    H5sPlayerRTC.prototype.resume = function () {
        try {
            var t = {
                cmd: "H5_RESUME"
            };
            this.wsSocket.send(JSON.stringify(t))
        }
        catch (err) {
            console.log(err)
        }
    },
    H5sPlayerRTC.prototype.seek = function (t) {
        try {
            var s = {
                cmd: "H5_SEEK"
            };
            s.nSeekTime = t, this.wsSocket.send(JSON.stringify(s))
        }
        catch (err) {
            console.log(err)
        }
    },
    H5sPlayerRTC.prototype.speed = function (t) {
        try {
            var s = {
                cmd: "H5_SPEED"
            };
            s.nSpeed = t, this.wsSocket.send(JSON.stringify(s))
        }
        catch (err) {
            console.log(err)
        }
    },
    H5sPlayerHls.prototype.q = function (t) {
        var s;
        console.log("H5SWebSocketClient");
        try {
            "http:" == this._conf.protocol && (s = "undefined" != typeof MozWebSocket ? new MozWebSocket("ws://" + this._conf.host + t) : new WebSocket("ws://" + this._conf.host + t)),
                "https:" == this._conf.protocol && (console.log(this._conf.host), s = "undefined" != typeof MozWebSocket ? new MozWebSocket("wss://" + this._conf.host + t) : new WebSocket("wss://" + this._conf.host + t)),
                console.log(this._conf.host)
        }
        catch (err) {
            return void alert("error")
        }
        return s;
    },
    H5sPlayerHls.prototype.keepAlive = function () {
        try {
            var t = {
                type: "keepalive"
            };
            this.wsSocket.send(JSON.stringify(t))
        }
        catch (err) {
            console.log(err)
        }
    },
    H5sPlayerHls.prototype.onReceived = function (msg) {
        console.log("HLS received ", msg.data)
    },
    H5sPlayerHls.prototype.setupWebSocket = function (t) {
        var s = "api/v1/h5swscmnapi";
        s = this._conf.rootpath + s + "?token=" + t + "&session=" + this._conf.session, console.log(s), this.wsSocket = this.q(s),
            console.log("setupWebSocket", this.wsSocket), this.wsSocket.binaryType = "arraybuffer", (this.wsSocket._player = this).wsSocket.onmessage = this.onReceived.bind(this),
            this.wsSocket.onopen = function () {
                console.log("wsSocket.onopen", this._player), this._player.keepAliveTimerId = setInterval(this._player.keepAlive.bind(this._player), 1e3);
            },
            this.wsSocket.onclose = function () {
                console.log("wsSocket.onclose", this._player), this._player.cleanupWebSocket(this._player)
            }
    },
    H5sPlayerHls.prototype.cleanupWebSocket = function (t) {
        console.log("H5sPlayerHls CleanupWebSocket", t), clearInterval(t.keepAliveTimerId)
    },
    H5sPlayerHls.prototype.dt = function () {
        console.log("HLS video.ended", this.g.ended), console.log("HLS video.currentTime", this.g.currentTime);
        var t = this.g.currentTime, s = t - this.B;
        console.log("HLS diff", s), 0 === s && this.U++ , this.B = t, 3 < this.U && (null != this.wsSocket && (this.wsSocket.close(),
            this.wsSocket = null), this.setupWebSocket(this._token), console.log("HLS reconnect"), this.g.src = "", this.B = 0, this.U = 0,
            this.g.src = this._conf.protocol + "//" + this._conf.host + this._conf.rootpath + "hls/" + this.N + "/" + this._token + "/hls.m3u8",
            this.g.play());
    },
    H5sPlayerHls.prototype.connect = function () {
        this.setupWebSocket(this._token), this.B = 0, this.U = 0, this.g.onended = function (t) {
            console.log("The End")
        },
            this.g.onpause = function (t) {
                console.log("Pause")
            },
            this.g.onplaying = function (t) {
                console.log("Playing")
            },
            this.g.onseeking = function (t) {
                console.log("seeking")
            },
            this.g.onvolumechange = function (t) {
                console.log("volumechange")
            },
            this.g.src = this._conf.protocol + "//" + this._conf.host + this._conf.rootpath + "hls/" + this.N + "/" + this._token + "/hls.m3u8",
            this.g.play(), this.J = setInterval(this.dt.bind(this), 3e3);
    },
    H5sPlayerHls.prototype.disconnect = function () {
        clearInterval(this.J), this.B = 0, this.U = 0, null != this.wsSocket && (this.wsSocket.close(), this.wsSocket = null),
            console.log("disconnect", this);
    },
    H5sPlayerAudio.prototype.q = function (t) {
        var s;
        console.log("H5SWebSocketClient");
        try {
            "http:" == this._conf.protocol && (s = "undefined" != typeof MozWebSocket ? new MozWebSocket("ws://" + this._conf.host + t) : new WebSocket("ws://" + this._conf.host + t)),
                "https:" == this._conf.protocol && (console.log(this._conf.host), s = "undefined" != typeof MozWebSocket ? new MozWebSocket("wss://" + this._conf.host + t) : new WebSocket("wss://" + this._conf.host + t)),
                console.log(this._conf.host)
        }
        catch (err) {
            return void alert("error")
        }
        return s;
    },
    H5sPlayerAudio.prototype.keepAlive = function () {
        try {
            this.wsSocket.send("keepalive")
        }
        catch (err) {
            console.log(err)
        }
    },
    H5sPlayerAudio.prototype.onReceived = function (msg) {
        for (var s = new Int16Array(msg.data), e = s.length, i = this._.createBuffer(1, e, 8e3), o = 0; o < 1; o++) {
            for (var n = i.getChannelData(o), h = 0; h < e; h++) {
                n[h] = s[h] / 16383.5;
            }
        }
        var c = this._.createBufferSource();
        c.buffer = i, c.connect(this._.destination), c.start();
    },
    H5sPlayerAudio.prototype.cleanupWebSocket = function (t) {
        console.log("CleanupWebSocket", t), clearInterval(t.keepAliveTimerId)
    },
    H5sPlayerAudio.prototype.setupWebSocket = function (t) {
        var s = "api/v1/h5saudapi";
        s = this._conf.rootpath + s + "?token=" + t + "&session=" + this._conf.session, console.log(s), this.wsSocket = this.q(s),
            console.log("setupWebSocket for audio", this.wsSocket), this.wsSocket.binaryType = "arraybuffer", (this.wsSocket._player = this).wsSocket.onmessage = this.onReceived.bind(this),
            this.wsSocket.onopen = function () {
                console.log("wsSocket.onopen", this._player), this._player.keepAliveTimerId = setInterval(this._player.keepAlive.bind(this._player), 1e3);
            },
            this.wsSocket.onclose = function () {
                console.log("wsSocket.onclose", this._player), this._player.cleanupWebSocket(this._player)
            }
    },
    H5sPlayerAudio.prototype.connect = function () {
        this.setupWebSocket(this._token)
    },
    H5sPlayerAudio.prototype.disconnect = function () {
        console.log("disconnect", this), null != this.wsSocket && (this.wsSocket.close(), this.wsSocket = null), console.log("disconnect",
            this);
    },
    H5sPlayerAudBack.prototype.q = function (t) {
        var s;
        console.log("H5SWebSocketClient");
        try {
            "http:" == this._conf.protocol && (s = "undefined" != typeof MozWebSocket ? new MozWebSocket("ws://" + this._conf.host + t) : new WebSocket("ws://" + this._conf.host + t)),
                "https:" == this._conf.protocol && (console.log(this._conf.host), s = "undefined" != typeof MozWebSocket ? new MozWebSocket("wss://" + this._conf.host + t) : new WebSocket("wss://" + this._conf.host + t)),
                console.log(this._conf.host)
        }
        catch (err) {
            return void alert("error")
        }
        return s;
    },
    H5sPlayerAudBack.prototype.keepAlive = function () {
        try {
            this.wsSocket.send("keepalive")
        }
        catch (err) {
            console.log(err)
        }
    },
    H5sPlayerAudBack.prototype.onReceived = function (msg) { }, 
    H5sPlayerAudBack.prototype.cleanupWebSocket = function (t) {
        console.log("CleanupWebSocket", t), clearInterval(t.keepAliveTimerId)
    },
    H5sPlayerAudBack.prototype.K = function () {
        console.log("sampleRate", this._.sampleRate), navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.ft;
        try {
            navigator.getUserMedia({
                video: false, audio: true
            },
                this.St.bind(this))
        }
        catch (err) {
            return void alert("Audio back false getUserMedia", err);
        }
    },
    H5sPlayerAudBack.prototype.yt = function () {
        this.G = true
    },
    H5sPlayerAudBack.prototype.setupWebSocket = function (t) {
        var s = "api/v1/h5saudbackapi";
        s = this._conf.rootpath + s + "?token=" + t + "&samplerate=" + this.D + "&session=" + this._conf.session,
            console.log(s), this.wsSocket = this.q(s), console.log("setupWebSocket for audio back", this.wsSocket), this.wsSocket.binaryType = "arraybuffer",
            (this.wsSocket._player = this).wsSocket.onmessage = this.onReceived.bind(this), this.wsSocket.onopen = this.yt.bind(this), this.wsSocket.onclose = function () {
                console.log("wsSocket.onclose", this._player), this._player.cleanupWebSocket(this._player)
            }
    },
    H5sPlayerAudBack.prototype.vt = function (t) {
        var s = float32ToInt16(t.inputBuffer.getChannelData(0));
        true === this.G && this.wsSocket && this.wsSocket.send(s)
    },
    H5sPlayerAudBack.prototype.St = function (t) {
        try {
            var s = this._.createMediaStreamSource(t), e = this._.createScriptProcessor(1024, 1, 1);
            s.connect(e), e.connect(this._.destination), e.onaudioprocess = this.vt.bind(this)
        }
        catch (err) {
            return void alert("Audio intecomm error", err);
        }
    },
    H5sPlayerAudBack.prototype.connect = function () {
        this.setupWebSocket(this._token)
    },
    H5sPlayerAudBack.prototype.disconnect = function () {
        console.log("disconnect", this), null != this.wsSocket && (this.wsSocket.close(), this.wsSocket = null), console.log("disconnect",
            this);
    };

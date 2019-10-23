!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.awrtc = t() : e.awrtc = t()
} (window,
    function() {
        return function(e) {
            var t = {};
            function n(r) {
                if (t[r]) return t[r].exports;
                var i = t[r] = {
                    i: r,
                    l: false,
                    exports: {}
                };
                return e[r].call(i.exports, i, i.exports, n),
                    i.l = true,
                    i.exports
            }
            return n.m = e,
                n.c = t,
                n.d = function(e, t, r) {
                    n.o(e, t) || Object.defineProperty(e, t, {
                        enumerable: true,
                        get: r
                    })
                },
                n.r = function(e) {
                    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                        value: "Module"
                    }),
                        Object.defineProperty(e, "__esModule", {
                            value: true
                        })
                },
                n.t = function(e, t) {
                    if (1 & t && (e = n(e)), 8 & t) return e;
                    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
                    var r = Object.create(null);
                    if (n.r(r), Object.defineProperty(r, "default", {
                        enumerable: true,
                        value: e
                    }), 2 & t && "string" != typeof e) for (var i in e) n.d(r, i,
                        function(t) {
                            return e[t]
                        }.bind(null, i));
                    return r
                },
                n.n = function(e) {
                    var t = e && e.__esModule ?
                        function() {
                            return e.
                                default
                        }:
                        function() {
                            return e
                        };
                    return n.d(t, "a", t),
                        t
                },
                n.o = function(obj, prop) {
                    return Object.prototype.hasOwnProperty.call(obj, prop) //obj.hasOwnProperty(prop)
                },
                n.p = "",
                n(n.s = 15)
        } ([function(e, t, n) {
            "use strict";
            var r = true,
                i = true;
            function o(e, t, n) {
                var r = e.match(t);
                return r && r.length >= n && parseInt(r[n], 10)
            }
            e.exports = {
                extractVersion: o,
                wrapPeerConnectionEvent: function(e, t, n) {
                    if (e.RTCPeerConnection) {
                        var r = e.RTCPeerConnection.prototype,
                            i = r.addEventListener;
                        r.addEventListener = function(e, r) {
                            if (e !== t) return i.apply(this, arguments);
                            var o = function(e) {
                                var t = n(e);
                                t && r(t)
                            };
                            return this._eventMap = this._eventMap || {},
                                this._eventMap[r] = o,
                                i.apply(this, [e, o])
                        };
                        var o = r.removeEventListener;
                        r.removeEventListener = function(e, n) {
                            if (e !== t || !this._eventMap || !this._eventMap[n]) return o.apply(this, arguments);
                            var r = this._eventMap[n];
                            return delete this._eventMap[n],
                                o.apply(this, [e, r])
                        },
                            Object.defineProperty(r, "on" + t, {
                                get: function() {
                                    return this["_on" + t]
                                },
                                set: function(e) {
                                    this["_on" + t] && (this.removeEventListener(t, this["_on" + t]), delete this["_on" + t]),
                                    e && this.addEventListener(t, this["_on" + t] = e)
                                },
                                enumerable: true,
                                configurable: true
                            })
                    }
                },
                disableLog: function(e) {
                    return "boolean" != typeof e ? new Error("Argument type: " + typeof e + ". Please use a boolean.") : (r = e, e ? "adapter.js logging disabled": "adapter.js logging enabled")
                },
                disableWarnings: function(e) {
                    return "boolean" != typeof e ? new Error("Argument type: " + typeof e + ". Please use a boolean.") : (i = !e, "adapter.js deprecation warnings " + (e ? "disabled": "enabled"))
                },
                log: function() {
                    if ("object" == typeof window) {
                        if (r) return;
                        "undefined" != typeof console && "function" == typeof console.log && console.log.apply(console, arguments)
                    }
                },
                deprecated: function(e, t) {
                    i && console.warn(e + " is deprecated, please use " + t + " instead.")
                },
                detectBrowser: function(e) {
                    var t = e && e.navigator,
                        n = {
                            browser: null,
                            version: null
                        };
                    if (void 0 === e || !e.navigator) return n.browser = "Not a browser.",
                        n;
                    if (t.mozGetUserMedia) n.browser = "firefox",
                        n.version = o(t.userAgent, /Firefox\/(\d+)\./, 1);
                    else if (t.webkitGetUserMedia) n.browser = "chrome",
                        n.version = o(t.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
                    else if (t.mediaDevices && t.userAgent.match(/Edge\/(\d+).(\d+)$/)) n.browser = "edge",
                        n.version = o(t.userAgent, /Edge\/(\d+).(\d+)$/, 2);
                    else {
                        if (!e.RTCPeerConnection || !t.userAgent.match(/AppleWebKit\/(\d+)\./)) return n.browser = "Not a supported browser.",
                            n;
                        n.browser = "safari",
                            n.version = o(t.userAgent, /AppleWebKit\/(\d+)\./, 1)
                    }
                    return n
                }
            }
        },
            function(e, t, n) {
                "use strict";
                var r = {
                    generateIdentifier: function() {
                        return Math.random().toString(36).substr(2, 10)
                    }
                };
                r.localCName = r.generateIdentifier(),
                    r.splitLines = function(e) {
                        return e.trim().split("\n").map(function(e) {
                            return e.trim()
                        })
                    },
                    r.splitSections = function(e) {
                        return e.split("\nm=").map(function(e, t) {
                            return (t > 0 ? "m=" + e: e).trim() + "\r\n"
                        })
                    },
                    r.getDescription = function(e) {
                        var t = r.splitSections(e);
                        return t && t[0]
                    },
                    r.getMediaSections = function(e) {
                        var t = r.splitSections(e);
                        return t.shift(),
                            t
                    },
                    r.matchPrefix = function(e, t) {
                        return r.splitLines(e).filter(function(e) {
                            return 0 === e.indexOf(t)
                        })
                    },
                    r.parseCandidate = function(e) {
                        for (var t, n = {
                                foundation: (t = 0 === e.indexOf("a=candidate:") ? e.substring(12).split(" ") : e.substring(10).split(" "))[0],
                                component: parseInt(t[1], 10),
                                protocol: t[2].toLowerCase(),
                                priority: parseInt(t[3], 10),
                                ip: t[4],
                                address: t[4],
                                port: parseInt(t[5], 10),
                                type: t[7]
                            },
                                 r = 8; r < t.length; r += 2) switch (t[r]) {
                            case "raddr":
                                n.relatedAddress = t[r + 1];
                                break;
                            case "rport":
                                n.relatedPort = parseInt(t[r + 1], 10);
                                break;
                            case "tcptype":
                                n.tcpType = t[r + 1];
                                break;
                            case "ufrag":
                                n.ufrag = t[r + 1],
                                    n.usernameFragment = t[r + 1];
                                break;
                            default:
                                n[t[r]] = t[r + 1]
                        }
                        return n
                    },
                    r.writeCandidate = function(e) {
                        var t = [];
                        t.push(e.foundation),
                            t.push(e.component),
                            t.push(e.protocol.toUpperCase()),
                            t.push(e.priority),
                            t.push(e.address || e.ip),
                            t.push(e.port);
                        var n = e.type;
                        return t.push("typ"),
                            t.push(n),
                        "host" !== n && e.relatedAddress && e.relatedPort && (t.push("raddr"), t.push(e.relatedAddress), t.push("rport"), t.push(e.relatedPort)),
                        e.tcpType && "tcp" === e.protocol.toLowerCase() && (t.push("tcptype"), t.push(e.tcpType)),
                        (e.usernameFragment || e.ufrag) && (t.push("ufrag"), t.push(e.usernameFragment || e.ufrag)),
                        "candidate:" + t.join(" ")
                    },
                    r.parseIceOptions = function(e) {
                        return e.substr(14).split(" ")
                    },
                    r.parseRtpMap = function(e) {
                        var t = e.substr(9).split(" "),
                            n = {
                                payloadType: parseInt(t.shift(), 10)
                            };
                        return t = t[0].split("/"),
                            n.name = t[0],
                            n.clockRate = parseInt(t[1], 10),
                            n.channels = 3 === t.length ? parseInt(t[2], 10) : 1,
                            n.numChannels = n.channels,
                            n
                    },
                    r.writeRtpMap = function(e) {
                        var t = e.payloadType;
                        void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType);
                        var n = e.channels || e.numChannels || 1;
                        return "a=rtpmap:" + t + " " + e.name + "/" + e.clockRate + (1 !== n ? "/" + n: "") + "\r\n"
                    },
                    r.parseExtmap = function(e) {
                        var t = e.substr(9).split(" ");
                        return {
                            id: parseInt(t[0], 10),
                            direction: t[0].indexOf("/") > 0 ? t[0].split("/")[1] : "sendrecv",
                            uri: t[1]
                        }
                    },
                    r.writeExtmap = function(e) {
                        return "a=extmap:" + (e.id || e.preferredId) + (e.direction && "sendrecv" !== e.direction ? "/" + e.direction: "") + " " + e.uri + "\r\n"
                    },
                    r.parseFmtp = function(e) {
                        for (var t, n = {},
                                 r = e.substr(e.indexOf(" ") + 1).split(";"), i = 0; i < r.length; i++) n[(t = r[i].trim().split("="))[0].trim()] = t[1];
                        return n
                    },
                    r.writeFmtp = function(e) {
                        var t = "",
                            n = e.payloadType;
                        if (void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.parameters && Object.keys(e.parameters).length) {
                            var r = [];
                            Object.keys(e.parameters).forEach(function(t) {
                                e.parameters[t] ? r.push(t + "=" + e.parameters[t]) : r.push(t)
                            }),
                                t += "a=fmtp:" + n + " " + r.join(";") + "\r\n"
                        }
                        return t
                    },
                    r.parseRtcpFb = function(e) {
                        var t = e.substr(e.indexOf(" ") + 1).split(" ");
                        return {
                            type: t.shift(),
                            parameter: t.join(" ")
                        }
                    },
                    r.writeRtcpFb = function(e) {
                        var t = "",
                            n = e.payloadType;
                        return void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType),
                        e.rtcpFeedback && e.rtcpFeedback.length && e.rtcpFeedback.forEach(function(e) {
                            t += "a=rtcp-fb:" + n + " " + e.type + (e.parameter && e.parameter.length ? " " + e.parameter: "") + "\r\n"
                        }),
                            t
                    },
                    r.parseSsrcMedia = function(e) {
                        var t = e.indexOf(" "),
                            n = {
                                ssrc: parseInt(e.substr(7, t - 7), 10)
                            },
                            r = e.indexOf(":", t);
                        return r > -1 ? (n.attribute = e.substr(t + 1, r - t - 1), n.value = e.substr(r + 1)) : n.attribute = e.substr(t + 1),
                            n
                    },
                    r.parseSsrcGroup = function(e) {
                        var t = e.substr(13).split(" ");
                        return {
                            semantics: t.shift(),
                            ssrcs: t.map(function(e) {
                                return parseInt(e, 10)
                            })
                        }
                    },
                    r.getMid = function(e) {
                        var t = r.matchPrefix(e, "a=mid:")[0];
                        if (t) return t.substr(6)
                    },
                    r.parseFingerprint = function(e) {
                        var t = e.substr(14).split(" ");
                        return {
                            algorithm: t[0].toLowerCase(),
                            value: t[1]
                        }
                    },
                    r.getDtlsParameters = function(e, t) {
                        return {
                            role: "auto",
                            fingerprints: r.matchPrefix(e + t, "a=fingerprint:").map(r.parseFingerprint)
                        }
                    },
                    r.writeDtlsParameters = function(e, t) {
                        var n = "a=setup:" + t + "\r\n";
                        return e.fingerprints.forEach(function(e) {
                            n += "a=fingerprint:" + e.algorithm + " " + e.value + "\r\n"
                        }),
                            n
                    },
                    r.getIceParameters = function(e, t) {
                        var n = r.splitLines(e);
                        return {
                            usernameFragment: (n = n.concat(r.splitLines(t))).filter(function(e) {
                                return 0 === e.indexOf("a=ice-ufrag:")
                            })[0].substr(12),
                            password: n.filter(function(e) {
                                return 0 === e.indexOf("a=ice-pwd:")
                            })[0].substr(10)
                        }
                    },
                    r.writeIceParameters = function(e) {
                        return "a=ice-ufrag:" + e.usernameFragment + "\r\na=ice-pwd:" + e.password + "\r\n"
                    },
                    r.parseRtpParameters = function(e) {
                        for (var t = {
                                codecs: [],
                                headerExtensions: [],
                                fecMechanisms: [],
                                rtcp: []
                            },
                                 n = r.splitLines(e)[0].split(" "), i = 3; i < n.length; i++) {
                            var o = n[i],
                                a = r.matchPrefix(e, "a=rtpmap:" + o + " ")[0];
                            if (a) {
                                var s = r.parseRtpMap(a),
                                    c = r.matchPrefix(e, "a=fmtp:" + o + " ");
                                switch (s.parameters = c.length ? r.parseFmtp(c[0]) : {},
                                    s.rtcpFeedback = r.matchPrefix(e, "a=rtcp-fb:" + o + " ").map(r.parseRtcpFb), t.codecs.push(s), s.name.toUpperCase()) {
                                    case "RED":
                                    case "ULPFEC":
                                        t.fecMechanisms.push(s.name.toUpperCase())
                                }
                            }
                        }
                        return r.matchPrefix(e, "a=extmap:").forEach(function(e) {
                            t.headerExtensions.push(r.parseExtmap(e))
                        }),
                            t
                    },
                    r.writeRtpDescription = function(e, t) {
                        var n = "";
                        n += "m=" + e + " ",
                            n += t.codecs.length > 0 ? "9": "0",
                            n += " UDP/TLS/RTP/SAVPF ",
                            n += t.codecs.map(function(e) {
                                return void 0 !== e.preferredPayloadType ? e.preferredPayloadType: e.payloadType
                            }).join(" ") + "\r\n",
                            n += "c=IN IP4 0.0.0.0\r\n",
                            n += "a=rtcp:9 IN IP4 0.0.0.0\r\n",
                            t.codecs.forEach(function(e) {
                                n += r.writeRtpMap(e),
                                    n += r.writeFmtp(e),
                                    n += r.writeRtcpFb(e)
                            });
                        var i = 0;
                        return t.codecs.forEach(function(e) {
                            e.maxptime > i && (i = e.maxptime)
                        }),
                        i > 0 && (n += "a=maxptime:" + i + "\r\n"),
                            n += "a=rtcp-mux\r\n",
                        t.headerExtensions && t.headerExtensions.forEach(function(e) {
                            n += r.writeExtmap(e)
                        }),
                            n
                    },
                    r.parseRtpEncodingParameters = function(e) {
                        var t, n = [],
                            i = r.parseRtpParameters(e),
                            o = -1 !== i.fecMechanisms.indexOf("RED"),
                            a = -1 !== i.fecMechanisms.indexOf("ULPFEC"),
                            s = r.matchPrefix(e, "a=ssrc:").map(function(e) {
                                return r.parseSsrcMedia(e)
                            }).filter(function(e) {
                                return "cname" === e.attribute
                            }),
                            c = s.length > 0 && s[0].ssrc,
                            d = r.matchPrefix(e, "a=ssrc-group:FID").map(function(e) {
                                return e.substr(17).split(" ").map(function(e) {
                                    return parseInt(e, 10)
                                })
                            });
                        d.length > 0 && d[0].length > 1 && d[0][0] === c && (t = d[0][1]),
                            i.codecs.forEach(function(e) {
                                if ("RTX" === e.name.toUpperCase() && e.parameters.apt) {
                                    var r = {
                                        ssrc: c,
                                        codecPayloadType: parseInt(e.parameters.apt, 10)
                                    };
                                    c && t && (r.rtx = {
                                        ssrc: t
                                    }),
                                        n.push(r),
                                    o && ((r = JSON.parse(JSON.stringify(r))).fec = {
                                        ssrc: c,
                                        mechanism: a ? "red+ulpfec": "red"
                                    },
                                        n.push(r))
                                }
                            }),
                        0 === n.length && c && n.push({
                            ssrc: c
                        });
                        var u = r.matchPrefix(e, "b=");
                        return u.length && (u = 0 === u[0].indexOf("b=TIAS:") ? parseInt(u[0].substr(7), 10) : 0 === u[0].indexOf("b=AS:") ? 1e3 * parseInt(u[0].substr(5), 10) * .95 - 16e3: void 0, n.forEach(function(e) {
                            e.maxBitrate = u
                        })),
                            n
                    },
                    r.parseRtcpParameters = function(e) {
                        var t = {},
                            n = r.matchPrefix(e, "a=ssrc:").map(function(e) {
                                return r.parseSsrcMedia(e)
                            }).filter(function(e) {
                                return "cname" === e.attribute
                            })[0];
                        n && (t.cname = n.value, t.ssrc = n.ssrc);
                        var i = r.matchPrefix(e, "a=rtcp-rsize");
                        t.reducedSize = i.length > 0,
                            t.compound = 0 === i.length;
                        var o = r.matchPrefix(e, "a=rtcp-mux");
                        return t.mux = o.length > 0,
                            t
                    },
                    r.parseMsid = function(e) {
                        var t, n = r.matchPrefix(e, "a=msid:");
                        if (1 === n.length) return {
                            stream: (t = n[0].substr(7).split(" "))[0],
                            track: t[1]
                        };
                        var i = r.matchPrefix(e, "a=ssrc:").map(function(e) {
                            return r.parseSsrcMedia(e)
                        }).filter(function(e) {
                            return "msid" === e.attribute
                        });
                        return i.length > 0 ? {
                            stream: (t = i[0].value.split(" "))[0],
                            track: t[1]
                        }: void 0
                    },
                    r.generateSessionId = function() {
                        return Math.random().toString().substr(2, 21)
                    },
                    r.writeSessionBoilerplate = function(e, t, n) {
                        var i = void 0 !== t ? t: 2;
                        return "v=0\r\no=" + (n || "thisisadapterortc") + " " + (e || r.generateSessionId()) + " " + i + " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
                    },
                    r.writeMediaSection = function(e, t, n, i) {
                        var o = r.writeRtpDescription(e.kind, t);
                        if (o += r.writeIceParameters(e.iceGatherer.getLocalParameters()), o += r.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === n ? "actpass": "active"), o += "a=mid:" + e.mid + "\r\n", e.direction ? o += "a=" + e.direction + "\r\n": e.rtpSender && e.rtpReceiver ? o += "a=sendrecv\r\n": e.rtpSender ? o += "a=sendonly\r\n": e.rtpReceiver ? o += "a=recvonly\r\n": o += "a=inactive\r\n", e.rtpSender) {
                            var a = "msid:" + i.id + " " + e.rtpSender.track.id + "\r\n";
                            o += "a=" + a,
                                o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + a,
                            e.sendEncodingParameters[0].rtx && (o += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + a, o += "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n")
                        }
                        return o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + r.localCName + "\r\n",
                        e.rtpSender && e.sendEncodingParameters[0].rtx && (o += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + r.localCName + "\r\n"),
                            o
                    },
                    r.getDirection = function(e, t) {
                        for (var n = r.splitLines(e), i = 0; i < n.length; i++) switch (n[i]) {
                            case "a=sendrecv":
                            case "a=sendonly":
                            case "a=recvonly":
                            case "a=inactive":
                                return n[i].substr(2)
                        }
                        return t ? r.getDirection(t) : "sendrecv"
                    },
                    r.getKind = function(e) {
                        return r.splitLines(e)[0].split(" ")[0].substr(2)
                    },
                    r.isRejected = function(e) {
                        return "0" === e.split(" ", 2)[1]
                    },
                    r.parseMLine = function(e) {
                        var t = r.splitLines(e)[0].substr(2).split(" ");
                        return {
                            kind: t[0],
                            port: parseInt(t[1], 10),
                            protocol: t[2],
                            fmt: t.slice(3).join(" ")
                        }
                    },
                    r.parseOLine = function(e) {
                        var t = r.matchPrefix(e, "o=")[0].substr(2).split(" ");
                        return {
                            username: t[0],
                            sessionId: t[1],
                            sessionVersion: parseInt(t[2], 10),
                            netType: t[3],
                            addressType: t[4],
                            address: t[5]
                        }
                    },
                    r.isValidSDP = function(e) {
                        if ("string" != typeof e || 0 === e.length) return false;
                        for (var t = r.splitLines(e), n = 0; n < t.length; n++) if (t[n].length < 2 || "=" !== t[n].charAt(1)) return false;
                        return true
                    },
                    e.exports = r
            },
            function(e, t, n) {
                "use strict"; (function(t) {
                    var r = n(4);
                    e.exports = r({
                        window: t.window
                    })
                }).call(this, n(3))
            },
            function(e, t) {
                var n;
                n = function() {
                    return this
                } ();
                try {
                    n = n || new Function("return this")()
                } catch(e) {
                    "object" == typeof window && (n = window)
                }
                e.exports = n
            },
            function(e, t, n) {
                "use strict";
                var r = n(0);
                e.exports = function(e, t) {
                    var i = e && e.window,
                        o = {
                            shimChrome: true,
                            shimFirefox: true,
                            shimEdge: true,
                            shimSafari: true
                        };
                    for (var a in t) hasOwnProperty.call(t, a) && (o[a] = t[a]);
                    var s = r.log,
                        c = r.detectBrowser(i),
                        d = n(5) || null,
                        u = n(7) || null,
                        l = n(11) || null,
                        p = n(13) || null,
                        f = n(14) || null,
                        m = {
                            browserDetails: c,
                            commonShim: f,
                            extractVersion: r.extractVersion,
                            disableLog: r.disableLog,
                            disableWarnings: r.disableWarnings
                        };
                    switch (c.browser) {
                        case "chrome":
                            if (!d || !d.shimPeerConnection || !o.shimChrome) return s("Chrome shim is not included in this adapter release."),
                                m;
                            s("adapter.js shimming chrome."),
                                m.browserShim = d,
                                f.shimCreateObjectURL(i),
                                d.shimGetUserMedia(i),
                                d.shimMediaStream(i),
                                d.shimSourceObject(i),
                                d.shimPeerConnection(i),
                                d.shimOnTrack(i),
                                d.shimAddTrackRemoveTrack(i),
                                d.shimGetSendersWithDtmf(i),
                                d.shimSenderReceiverGetStats(i),
                                d.fixNegotiationNeeded(i),
                                f.shimRTCIceCandidate(i),
                                f.shimMaxMessageSize(i),
                                f.shimSendThrowTypeError(i);
                            break;
                        case "firefox":
                            if (!l || !l.shimPeerConnection || !o.shimFirefox) return s("Firefox shim is not included in this adapter release."),
                                m;
                            s("adapter.js shimming firefox."),
                                m.browserShim = l,
                                f.shimCreateObjectURL(i),
                                l.shimGetUserMedia(i),
                                l.shimSourceObject(i),
                                l.shimPeerConnection(i),
                                l.shimOnTrack(i),
                                l.shimRemoveStream(i),
                                l.shimSenderGetStats(i),
                                l.shimReceiverGetStats(i),
                                l.shimRTCDataChannel(i),
                                f.shimRTCIceCandidate(i),
                                f.shimMaxMessageSize(i),
                                f.shimSendThrowTypeError(i);
                            break;
                        case "edge":
                            if (!u || !u.shimPeerConnection || !o.shimEdge) return s("MS edge shim is not included in this adapter release."),
                                m;
                            s("adapter.js shimming edge."),
                                m.browserShim = u,
                                f.shimCreateObjectURL(i),
                                u.shimGetUserMedia(i),
                                u.shimPeerConnection(i),
                                u.shimReplaceTrack(i),
                                u.shimGetDisplayMedia(i),
                                f.shimMaxMessageSize(i),
                                f.shimSendThrowTypeError(i);
                            break;
                        case "safari":
                            if (!p || !o.shimSafari) return s("Safari shim is not included in this adapter release."),
                                m;
                            s("adapter.js shimming safari."),
                                m.browserShim = p,
                                f.shimCreateObjectURL(i),
                                p.shimRTCIceServerUrls(i),
                                p.shimCreateOfferLegacy(i),
                                p.shimCallbacksAPI(i),
                                p.shimLocalStreamsAPI(i),
                                p.shimRemoteStreamsAPI(i),
                                p.shimTrackEventTransceiver(i),
                                p.shimGetUserMedia(i),
                                f.shimRTCIceCandidate(i),
                                f.shimMaxMessageSize(i),
                                f.shimSendThrowTypeError(i);
                            break;
                        default:
                            s("Unsupported browser!")
                    }
                    return m
                }
            },
            function(e, t, n) {
                "use strict";
                var r = n(0),
                    i = r.log;
                function o(e, t, n) {
                    var r = n ? "outbound-rtp": "inbound-rtp",
                        i = new Map;
                    if (null === t) return i;
                    var o = [];
                    return e.forEach(function(e) {
                        "track" === e.type && e.trackIdentifier === t.id && o.push(e)
                    }),
                        o.forEach(function(t) {
                            e.forEach(function(n) {
                                n.type === r && n.trackId === t.id &&
                                function e(t, n, r) {
                                    n && !r.has(n.id) && (r.set(n.id, n), Object.keys(n).forEach(function(i) {
                                        i.endsWith("Id") ? e(t, t.get(n[i]), r) : i.endsWith("Ids") && n[i].forEach(function(n) {
                                            e(t, t.get(n), r)
                                        })
                                    }))
                                } (e, n, i)
                            })
                        }),
                        i
                }
                e.exports = {
                    shimGetUserMedia: n(6),
                    shimMediaStream: function(e) {
                        e.MediaStream = e.MediaStream || e.webkitMediaStream
                    },
                    shimOnTrack: function(e) {
                        if ("object" != typeof e || !e.RTCPeerConnection || "ontrack" in e.RTCPeerConnection.prototype) r.wrapPeerConnectionEvent(e, "track",
                            function(e) {
                                return e.transceiver || Object.defineProperty(e, "transceiver", {
                                    value: {
                                        receiver: e.receiver
                                    }
                                }),
                                    e
                            });
                        else {
                            Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", {
                                get: function() {
                                    return this._ontrack
                                },
                                set: function(e) {
                                    this._ontrack && this.removeEventListener("track", this._ontrack),
                                        this.addEventListener("track", this._ontrack = e)
                                },
                                enumerable: true,
                                configurable: true
                            });
                            var t = e.RTCPeerConnection.prototype.setRemoteDescription;
                            e.RTCPeerConnection.prototype.setRemoteDescription = function() {
                                var n = this;
                                return n._ontrackpoly || (n._ontrackpoly = function(t) {
                                    t.stream.addEventListener("addtrack",
                                        function(r) {
                                            var i;
                                            i = e.RTCPeerConnection.prototype.getReceivers ? n.getReceivers().find(function(e) {
                                                return e.track && e.track.id === r.track.id
                                            }) : {
                                                track: r.track
                                            };
                                            var o = new Event("track");
                                            o.track = r.track,
                                                o.receiver = i,
                                                o.transceiver = {
                                                    receiver: i
                                                },
                                                o.streams = [t.stream],
                                                n.dispatchEvent(o)
                                        }),
                                        t.stream.getTracks().forEach(function(r) {
                                            var i;
                                            i = e.RTCPeerConnection.prototype.getReceivers ? n.getReceivers().find(function(e) {
                                                return e.track && e.track.id === r.id
                                            }) : {
                                                track: r
                                            };
                                            var o = new Event("track");
                                            o.track = r,
                                                o.receiver = i,
                                                o.transceiver = {
                                                    receiver: i
                                                },
                                                o.streams = [t.stream],
                                                n.dispatchEvent(o)
                                        })
                                },
                                    n.addEventListener("addstream", n._ontrackpoly)),
                                    t.apply(n, arguments)
                            }
                        }
                    },
                    shimGetSendersWithDtmf: function(e) {
                        if ("object" == typeof e && e.RTCPeerConnection && !("getSenders" in e.RTCPeerConnection.prototype) && "createDTMFSender" in e.RTCPeerConnection.prototype) {
                            var t = function(e, t) {
                                return {
                                    track: t,
                                    get dtmf() {
                                        return void 0 === this._dtmf && ("audio" === t.kind ? this._dtmf = e.createDTMFSender(t) : this._dtmf = null),
                                            this._dtmf
                                    },
                                    _pc: e
                                }
                            };
                            if (!e.RTCPeerConnection.prototype.getSenders) {
                                e.RTCPeerConnection.prototype.getSenders = function() {
                                    return this._senders = this._senders || [],
                                        this._senders.slice()
                                };
                                var n = e.RTCPeerConnection.prototype.addTrack;
                                e.RTCPeerConnection.prototype.addTrack = function(e, r) {
                                    var i = n.apply(this, arguments);
                                    return i || (i = t(this, e), this._senders.push(i)),
                                        i
                                };
                                var r = e.RTCPeerConnection.prototype.removeTrack;
                                e.RTCPeerConnection.prototype.removeTrack = function(e) {
                                    r.apply(this, arguments);
                                    var t = this._senders.indexOf(e); - 1 !== t && this._senders.splice(t, 1)
                                }
                            }
                            var i = e.RTCPeerConnection.prototype.addStream;
                            e.RTCPeerConnection.prototype.addStream = function(e) {
                                var n = this;
                                n._senders = n._senders || [],
                                    i.apply(n, [e]),
                                    e.getTracks().forEach(function(e) {
                                        n._senders.push(t(n, e))
                                    })
                            };
                            var o = e.RTCPeerConnection.prototype.removeStream;
                            e.RTCPeerConnection.prototype.removeStream = function(e) {
                                var t = this;
                                t._senders = t._senders || [],
                                    o.apply(t, [e]),
                                    e.getTracks().forEach(function(e) {
                                        var n = t._senders.find(function(t) {
                                            return t.track === e
                                        });
                                        n && t._senders.splice(t._senders.indexOf(n), 1)
                                    })
                            }
                        } else if ("object" == typeof e && e.RTCPeerConnection && "getSenders" in e.RTCPeerConnection.prototype && "createDTMFSender" in e.RTCPeerConnection.prototype && e.RTCRtpSender && !("dtmf" in e.RTCRtpSender.prototype)) {
                            var a = e.RTCPeerConnection.prototype.getSenders;
                            e.RTCPeerConnection.prototype.getSenders = function() {
                                var e = this,
                                    t = a.apply(e, []);
                                return t.forEach(function(t) {
                                    t._pc = e
                                }),
                                    t
                            },
                                Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
                                    get: function() {
                                        return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = this._pc.createDTMFSender(this.track) : this._dtmf = null),
                                            this._dtmf
                                    }
                                })
                        }
                    },
                    shimSenderReceiverGetStats: function(e) {
                        if ("object" == typeof e && e.RTCPeerConnection && e.RTCRtpSender && e.RTCRtpReceiver) {
                            if (! ("getStats" in e.RTCRtpSender.prototype)) {
                                var t = e.RTCPeerConnection.prototype.getSenders;
                                t && (e.RTCPeerConnection.prototype.getSenders = function() {
                                    var e = this,
                                        n = t.apply(e, []);
                                    return n.forEach(function(t) {
                                        t._pc = e
                                    }),
                                        n
                                });
                                var n = e.RTCPeerConnection.prototype.addTrack;
                                n && (e.RTCPeerConnection.prototype.addTrack = function() {
                                    var e = n.apply(this, arguments);
                                    return e._pc = this,
                                        e
                                }),
                                    e.RTCRtpSender.prototype.getStats = function() {
                                        var e = this;
                                        return this._pc.getStats().then(function(t) {
                                            return o(t, e.track, true)
                                        })
                                    }
                            }
                            if (! ("getStats" in e.RTCRtpReceiver.prototype)) {
                                var i = e.RTCPeerConnection.prototype.getReceivers;
                                i && (e.RTCPeerConnection.prototype.getReceivers = function() {
                                    var e = this,
                                        t = i.apply(e, []);
                                    return t.forEach(function(t) {
                                        t._pc = e
                                    }),
                                        t
                                }),
                                    r.wrapPeerConnectionEvent(e, "track",
                                        function(e) {
                                            return e.receiver._pc = e.srcElement,
                                                e
                                        }),
                                    e.RTCRtpReceiver.prototype.getStats = function() {
                                        var e = this;
                                        return this._pc.getStats().then(function(t) {
                                            return o(t, e.track, false)
                                        })
                                    }
                            }
                            if ("getStats" in e.RTCRtpSender.prototype && "getStats" in e.RTCRtpReceiver.prototype) {
                                var a = e.RTCPeerConnection.prototype.getStats;
                                e.RTCPeerConnection.prototype.getStats = function() {
                                    if (arguments.length > 0 && arguments[0] instanceof e.MediaStreamTrack) {
                                        var t, n, r, i = arguments[0];
                                        return this.getSenders().forEach(function(e) {
                                            e.track === i && (t ? r = true : t = e)
                                        }),
                                            this.getReceivers().forEach(function(e) {
                                                return e.track === i && (n ? r = true : n = e),
                                                e.track === i
                                            }),
                                            r || t && n ? Promise.reject(new DOMException("There are more than one sender or receiver for the track.", "InvalidAccessError")) : t ? t.getStats() : n ? n.getStats() : Promise.reject(new DOMException("There is no sender or receiver for the track.", "InvalidAccessError"))
                                    }
                                    return a.apply(this, arguments)
                                }
                            }
                        }
                    },
                    shimSourceObject: function(e) {
                        var t = e && e.URL;
                        "object" == typeof e && (!e.HTMLMediaElement || "srcObject" in e.HTMLMediaElement.prototype || Object.defineProperty(e.HTMLMediaElement.prototype, "srcObject", {
                            get: function() {
                                return this._srcObject
                            },
                            set: function(e) {
                                var n = this;
                                this._srcObject = e,
                                this.src && t.revokeObjectURL(this.src),
                                    e ? (this.src = t.createObjectURL(e), e.addEventListener("addtrack",
                                        function() {
                                            n.src && t.revokeObjectURL(n.src),
                                                n.src = t.createObjectURL(e)
                                        }), e.addEventListener("removetrack",
                                        function() {
                                            n.src && t.revokeObjectURL(n.src),
                                                n.src = t.createObjectURL(e)
                                        })) : this.src = ""
                            }
                        }))
                    },
                    shimAddTrackRemoveTrackWithNative: function(e) {
                        e.RTCPeerConnection.prototype.getLocalStreams = function() {
                            var e = this;
                            return this._shimmedLocalStreams = this._shimmedLocalStreams || {},
                                Object.keys(this._shimmedLocalStreams).map(function(t) {
                                    return e._shimmedLocalStreams[t][0]
                                })
                        };
                        var t = e.RTCPeerConnection.prototype.addTrack;
                        e.RTCPeerConnection.prototype.addTrack = function(e, n) {
                            if (!n) return t.apply(this, arguments);
                            this._shimmedLocalStreams = this._shimmedLocalStreams || {};
                            var r = t.apply(this, arguments);
                            return this._shimmedLocalStreams[n.id] ? -1 === this._shimmedLocalStreams[n.id].indexOf(r) && this._shimmedLocalStreams[n.id].push(r) : this._shimmedLocalStreams[n.id] = [n, r],
                                r
                        };
                        var n = e.RTCPeerConnection.prototype.addStream;
                        e.RTCPeerConnection.prototype.addStream = function(e) {
                            var t = this;
                            this._shimmedLocalStreams = this._shimmedLocalStreams || {},
                                e.getTracks().forEach(function(e) {
                                    if (t.getSenders().find(function(t) {
                                        return t.track === e
                                    })) throw new DOMException("Track already exists.", "InvalidAccessError")
                                });
                            var r = t.getSenders();
                            n.apply(this, arguments);
                            var i = t.getSenders().filter(function(e) {
                                return - 1 === r.indexOf(e)
                            });
                            this._shimmedLocalStreams[e.id] = [e].concat(i)
                        };
                        var r = e.RTCPeerConnection.prototype.removeStream;
                        e.RTCPeerConnection.prototype.removeStream = function(e) {
                            return this._shimmedLocalStreams = this._shimmedLocalStreams || {},
                                delete this._shimmedLocalStreams[e.id],
                                r.apply(this, arguments)
                        };
                        var i = e.RTCPeerConnection.prototype.removeTrack;
                        e.RTCPeerConnection.prototype.removeTrack = function(e) {
                            var t = this;
                            return this._shimmedLocalStreams = this._shimmedLocalStreams || {},
                            e && Object.keys(this._shimmedLocalStreams).forEach(function(n) {
                                var r = t._shimmedLocalStreams[n].indexOf(e); - 1 !== r && t._shimmedLocalStreams[n].splice(r, 1),
                                1 === t._shimmedLocalStreams[n].length && delete t._shimmedLocalStreams[n]
                            }),
                                i.apply(this, arguments)
                        }
                    },
                    shimAddTrackRemoveTrack: function(e) {
                        if (e.RTCPeerConnection) {
                            var t = r.detectBrowser(e);
                            if (e.RTCPeerConnection.prototype.addTrack && t.version >= 65) return this.shimAddTrackRemoveTrackWithNative(e);
                            var n = e.RTCPeerConnection.prototype.getLocalStreams;
                            e.RTCPeerConnection.prototype.getLocalStreams = function() {
                                var e = this,
                                    t = n.apply(this);
                                return e._reverseStreams = e._reverseStreams || {},
                                    t.map(function(t) {
                                        return e._reverseStreams[t.id]
                                    })
                            };
                            var i = e.RTCPeerConnection.prototype.addStream;
                            e.RTCPeerConnection.prototype.addStream = function(t) {
                                var n = this;
                                if (n._streams = n._streams || {},
                                    n._reverseStreams = n._reverseStreams || {},
                                    t.getTracks().forEach(function(e) {
                                        if (n.getSenders().find(function(t) {
                                            return t.track === e
                                        })) throw new DOMException("Track already exists.", "InvalidAccessError")
                                    }), !n._reverseStreams[t.id]) {
                                    var r = new e.MediaStream(t.getTracks());
                                    n._streams[t.id] = r,
                                        n._reverseStreams[r.id] = t,
                                        t = r
                                }
                                i.apply(n, [t])
                            };
                            var o = e.RTCPeerConnection.prototype.removeStream;
                            e.RTCPeerConnection.prototype.removeStream = function(e) {
                                var t = this;
                                t._streams = t._streams || {},
                                    t._reverseStreams = t._reverseStreams || {},
                                    o.apply(t, [t._streams[e.id] || e]),
                                    delete t._reverseStreams[t._streams[e.id] ? t._streams[e.id].id: e.id],
                                    delete t._streams[e.id]
                            },
                                e.RTCPeerConnection.prototype.addTrack = function(t, n) {
                                    var r = this;
                                    if ("closed" === r.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
                                    var i = [].slice.call(arguments, 1);
                                    if (1 !== i.length || !i[0].getTracks().find(function(e) {
                                        return e === t
                                    })) throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", "NotSupportedError");
                                    if (r.getSenders().find(function(e) {
                                        return e.track === t
                                    })) throw new DOMException("Track already exists.", "InvalidAccessError");
                                    r._streams = r._streams || {},
                                        r._reverseStreams = r._reverseStreams || {};
                                    var o = r._streams[n.id];
                                    if (o) o.addTrack(t),
                                        Promise.resolve().then(function() {
                                            r.dispatchEvent(new Event("negotiationneeded"))
                                        });
                                    else {
                                        var a = new e.MediaStream([t]);
                                        r._streams[n.id] = a,
                                            r._reverseStreams[a.id] = n,
                                            r.addStream(a)
                                    }
                                    return r.getSenders().find(function(e) {
                                        return e.track === t
                                    })
                                },
                                ["createOffer", "createAnswer"].forEach(function(t) {
                                    var n = e.RTCPeerConnection.prototype[t];
                                    e.RTCPeerConnection.prototype[t] = function() {
                                        var e = this,
                                            t = arguments;
                                        return arguments.length && "function" == typeof arguments[0] ? n.apply(e, [function(n) {
                                            var r = c(e, n);
                                            t[0].apply(null, [r])
                                        },
                                            function(e) {
                                                t[1] && t[1].apply(null, e)
                                            },
                                            arguments[2]]) : n.apply(e, arguments).then(function(t) {
                                            return c(e, t)
                                        })
                                    }
                                });
                            var a = e.RTCPeerConnection.prototype.setLocalDescription;
                            e.RTCPeerConnection.prototype.setLocalDescription = function() {
                                return arguments.length && arguments[0].type ? (arguments[0] = function(e, t) {
                                    var n = t.sdp;
                                    return Object.keys(e._reverseStreams || []).forEach(function(t) {
                                        var r = e._reverseStreams[t],
                                            i = e._streams[r.id];
                                        n = n.replace(new RegExp(r.id, "g"), i.id)
                                    }),
                                        new RTCSessionDescription({
                                            type: t.type,
                                            sdp: n
                                        })
                                } (this, arguments[0]), a.apply(this, arguments)) : a.apply(this, arguments)
                            };
                            var s = Object.getOwnPropertyDescriptor(e.RTCPeerConnection.prototype, "localDescription");
                            Object.defineProperty(e.RTCPeerConnection.prototype, "localDescription", {
                                get: function() {
                                    var e = s.get.apply(this);
                                    return "" === e.type ? e: c(this, e)
                                }
                            }),
                                e.RTCPeerConnection.prototype.removeTrack = function(e) {
                                    var t, n = this;
                                    if ("closed" === n.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
                                    if (!e._pc) throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError");
                                    if (! (e._pc === n)) throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
                                    n._streams = n._streams || {},
                                        Object.keys(n._streams).forEach(function(r) {
                                            n._streams[r].getTracks().find(function(t) {
                                                return e.track === t
                                            }) && (t = n._streams[r])
                                        }),
                                    t && (1 === t.getTracks().length ? n.removeStream(n._reverseStreams[t.id]) : t.removeTrack(e.track), n.dispatchEvent(new Event("negotiationneeded")))
                                }
                        }
                        function c(e, t) {
                            var n = t.sdp;
                            return Object.keys(e._reverseStreams || []).forEach(function(t) {
                                var r = e._reverseStreams[t],
                                    i = e._streams[r.id];
                                n = n.replace(new RegExp(i.id, "g"), r.id)
                            }),
                                new RTCSessionDescription({
                                    type: t.type,
                                    sdp: n
                                })
                        }
                    },
                    shimPeerConnection: function(e) {
                        var t = r.detectBrowser(e);
                        if (!e.RTCPeerConnection && e.webkitRTCPeerConnection && (e.RTCPeerConnection = function(t, n) {
                            return i("PeerConnection"),
                            t && t.iceTransportPolicy && (t.iceTransports = t.iceTransportPolicy),
                                new e.webkitRTCPeerConnection(t, n)
                        },
                            e.RTCPeerConnection.prototype = e.webkitRTCPeerConnection.prototype, e.webkitRTCPeerConnection.generateCertificate && Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
                            get: function() {
                                return e.webkitRTCPeerConnection.generateCertificate
                            }
                        })), e.RTCPeerConnection) {
                            var n = e.RTCPeerConnection.prototype.getStats;
                            e.RTCPeerConnection.prototype.getStats = function(e, t, r) {
                                var i = this,
                                    o = arguments;
                                if (arguments.length > 0 && "function" == typeof e) return n.apply(this, arguments);
                                if (0 === n.length && (0 === arguments.length || "function" != typeof arguments[0])) return n.apply(this, []);
                                var a = function(e) {
                                        var t = {};
                                        return e.result().forEach(function(e) {
                                            var n = {
                                                id: e.id,
                                                timestamp: e.timestamp,
                                                type: {
                                                    localcandidate: "local-candidate",
                                                    remotecandidate: "remote-candidate"
                                                } [e.type] || e.type
                                            };
                                            e.names().forEach(function(t) {
                                                n[t] = e.stat(t)
                                            }),
                                                t[n.id] = n
                                        }),
                                            t
                                    },
                                    s = function(e) {
                                        return new Map(Object.keys(e).map(function(t) {
                                            return [t, e[t]]
                                        }))
                                    };
                                if (arguments.length >= 2) {
                                    return n.apply(this, [function(e) {
                                        o[1](s(a(e)))
                                    },
                                        arguments[0]])
                                }
                                return new Promise(function(e, t) {
                                    n.apply(i, [function(t) {
                                        e(s(a(t)))
                                    },
                                        t])
                                }).then(t, r)
                            },
                            t.version < 51 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
                                var n = e.RTCPeerConnection.prototype[t];
                                e.RTCPeerConnection.prototype[t] = function() {
                                    var e = arguments,
                                        t = this,
                                        r = new Promise(function(r, i) {
                                            n.apply(t, [e[0], r, i])
                                        });
                                    return e.length < 2 ? r: r.then(function() {
                                            e[1].apply(null, [])
                                        },
                                        function(t) {
                                            e.length >= 3 && e[2].apply(null, [t])
                                        })
                                }
                            }),
                            t.version < 52 && ["createOffer", "createAnswer"].forEach(function(t) {
                                var n = e.RTCPeerConnection.prototype[t];
                                e.RTCPeerConnection.prototype[t] = function() {
                                    var e = this;
                                    if (arguments.length < 1 || 1 === arguments.length && "object" == typeof arguments[0]) {
                                        var t = 1 === arguments.length ? arguments[0] : void 0;
                                        return new Promise(function(r, i) {
                                            n.apply(e, [r, i, t])
                                        })
                                    }
                                    return n.apply(this, arguments)
                                }
                            }),
                                ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
                                    var n = e.RTCPeerConnection.prototype[t];
                                    e.RTCPeerConnection.prototype[t] = function() {
                                        return arguments[0] = new("addIceCandidate" === t ? e.RTCIceCandidate: e.RTCSessionDescription)(arguments[0]),
                                            n.apply(this, arguments)
                                    }
                                });
                            var o = e.RTCPeerConnection.prototype.addIceCandidate;
                            e.RTCPeerConnection.prototype.addIceCandidate = function() {
                                return arguments[0] ? o.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve())
                            }
                        }
                    },
                    fixNegotiationNeeded: function(e) {
                        r.wrapPeerConnectionEvent(e, "negotiationneeded",
                            function(e) {
                                if ("stable" === e.target.signalingState) return e
                            })
                    },
                    shimGetDisplayMedia: function(e, t) { ! e.navigator || !e.navigator.mediaDevices || "getDisplayMedia" in e.navigator.mediaDevices || ("function" == typeof t ? (e.navigator.mediaDevices.getDisplayMedia = function(n) {
                        return t(n).then(function(t) {
                            var r = n.video && n.video.width,
                                i = n.video && n.video.height,
                                o = n.video && n.video.frameRate;
                            return n.video = {
                                mandatory: {
                                    chromeMediaSource: "desktop",
                                    chromeMediaSourceId: t,
                                    maxFrameRate: o || 3
                                }
                            },
                            r && (n.video.mandatory.maxWidth = r),
                            i && (n.video.mandatory.maxHeight = i),
                                e.navigator.mediaDevices.getUserMedia(n)
                        })
                    },
                        e.navigator.getDisplayMedia = function(t) {
                            return r.deprecated("navigator.getDisplayMedia", "navigator.mediaDevices.getDisplayMedia"),
                                e.navigator.mediaDevices.getDisplayMedia(t)
                        }) : console.error("shimGetDisplayMedia: getSourceId argument is not a function"))
                    }
                }
            },
            function(e, t, n) {
                "use strict";
                var r = n(0),
                    i = r.log;
                e.exports = function(e) {
                    var t = r.detectBrowser(e),
                        n = e && e.navigator,
                        o = function(e) {
                            if ("object" != typeof e || e.mandatory || e.optional) return e;
                            var t = {};
                            return Object.keys(e).forEach(function(n) {
                                if ("require" !== n && "advanced" !== n && "mediaSource" !== n) {
                                    var r = "object" == typeof e[n] ? e[n] : {
                                        ideal: e[n]
                                    };
                                    void 0 !== r.exact && "number" == typeof r.exact && (r.min = r.max = r.exact);
                                    var i = function(e, t) {
                                        return e ? e + t.charAt(0).toUpperCase() + t.slice(1) : "deviceId" === t ? "sourceId": t
                                    };
                                    if (void 0 !== r.ideal) {
                                        t.optional = t.optional || [];
                                        var o = {};
                                        "number" == typeof r.ideal ? (o[i("min", n)] = r.ideal, t.optional.push(o), (o = {})[i("max", n)] = r.ideal, t.optional.push(o)) : (o[i("", n)] = r.ideal, t.optional.push(o))
                                    }
                                    void 0 !== r.exact && "number" != typeof r.exact ? (t.mandatory = t.mandatory || {},
                                        t.mandatory[i("", n)] = r.exact) : ["min", "max"].forEach(function(e) {
                                        void 0 !== r[e] && (t.mandatory = t.mandatory || {},
                                            t.mandatory[i(e, n)] = r[e])
                                    })
                                }
                            }),
                            e.advanced && (t.optional = (t.optional || []).concat(e.advanced)),
                                t
                        },
                        a = function(e, r) {
                            if (t.version >= 61) return r(e);
                            if ((e = JSON.parse(JSON.stringify(e))) && "object" == typeof e.audio) {
                                var a = function(e, t, n) {
                                    t in e && !(n in e) && (e[n] = e[t], delete e[t])
                                };
                                a((e = JSON.parse(JSON.stringify(e))).audio, "autoGainControl", "googAutoGainControl"),
                                    a(e.audio, "noiseSuppression", "googNoiseSuppression"),
                                    e.audio = o(e.audio)
                            }
                            if (e && "object" == typeof e.video) {
                                var s = e.video.facingMode;
                                s = s && ("object" == typeof s ? s: {
                                    ideal: s
                                });
                                var c, d = t.version < 66;
                                if (s && ("user" === s.exact || "environment" === s.exact || "user" === s.ideal || "environment" === s.ideal) && (!n.mediaDevices.getSupportedConstraints || !n.mediaDevices.getSupportedConstraints().facingMode || d)) if (delete e.video.facingMode, "environment" === s.exact || "environment" === s.ideal ? c = ["back", "rear"] : "user" !== s.exact && "user" !== s.ideal || (c = ["front"]), c) return n.mediaDevices.enumerateDevices().then(function(t) {
                                    var n = (t = t.filter(function(e) {
                                        return "videoinput" === e.kind
                                    })).find(function(e) {
                                        return c.some(function(t) {
                                            return - 1 !== e.label.toLowerCase().indexOf(t)
                                        })
                                    });
                                    return ! n && t.length && -1 !== c.indexOf("back") && (n = t[t.length - 1]),
                                    n && (e.video.deviceId = s.exact ? {
                                        exact: n.deviceId
                                    }: {
                                        ideal: n.deviceId
                                    }),
                                        e.video = o(e.video),
                                        i("chrome: " + JSON.stringify(e)),
                                        r(e)
                                });
                                e.video = o(e.video)
                            }
                            return i("chrome: " + JSON.stringify(e)),
                                r(e)
                        },
                        s = function(e) {
                            return t.version >= 64 ? e: {
                                name: {
                                    PermissionDeniedError: "NotAllowedError",
                                    PermissionDismissedError: "NotAllowedError",
                                    InvalidStateError: "NotAllowedError",
                                    DevicesNotFoundError: "NotFoundError",
                                    ConstraintNotSatisfiedError: "OverconstrainedError",
                                    TrackStartError: "NotReadableError",
                                    MediaDeviceFailedDueToShutdown: "NotAllowedError",
                                    MediaDeviceKillSwitchOn: "NotAllowedError",
                                    TabCaptureError: "AbortError",
                                    ScreenCaptureError: "AbortError",
                                    DeviceCaptureError: "AbortError"
                                } [e.name] || e.name,
                                message: e.message,
                                constraint: e.constraint || e.constraintName,
                                toString: function() {
                                    return this.name + (this.message && ": ") + this.message
                                }
                            }
                        };
                    n.getUserMedia = function(e, t, r) {
                        a(e,
                            function(e) {
                                n.webkitGetUserMedia(e, t,
                                    function(e) {
                                        r && r(s(e))
                                    })
                            })
                    };
                    var c = function(e) {
                        return new Promise(function(t, r) {
                            n.getUserMedia(e, t, r)
                        })
                    };
                    if (n.mediaDevices || (n.mediaDevices = {
                        getUserMedia: c,
                        enumerateDevices: function() {
                            return new Promise(function(t) {
                                var n = {
                                    audio: "audioinput",
                                    video: "videoinput"
                                };
                                return e.MediaStreamTrack.getSources(function(e) {
                                    t(e.map(function(e) {
                                        return {
                                            label: e.label,
                                            kind: n[e.kind],
                                            deviceId: e.id,
                                            groupId: ""
                                        }
                                    }))
                                })
                            })
                        },
                        getSupportedConstraints: function() {
                            return {
                                deviceId: true,
                                echoCancellation: true,
                                facingMode: true,
                                frameRate: true,
                                height: true,
                                width: true
                            }
                        }
                    }), n.mediaDevices.getUserMedia) {
                        var d = n.mediaDevices.getUserMedia.bind(n.mediaDevices);
                        n.mediaDevices.getUserMedia = function(e) {
                            return a(e,
                                function(e) {
                                    return d(e).then(function(t) {
                                            if (e.audio && !t.getAudioTracks().length || e.video && !t.getVideoTracks().length) throw t.getTracks().forEach(function(e) {
                                                e.stop()
                                            }),
                                                new DOMException("", "NotFoundError");
                                            return t
                                        },
                                        function(e) {
                                            return Promise.reject(s(e))
                                        })
                                })
                        }
                    } else n.mediaDevices.getUserMedia = function(e) {
                        return c(e)
                    };
                    void 0 === n.mediaDevices.addEventListener && (n.mediaDevices.addEventListener = function() {
                        i("Dummy mediaDevices.addEventListener called.")
                    }),
                    void 0 === n.mediaDevices.removeEventListener && (n.mediaDevices.removeEventListener = function() {
                        i("Dummy mediaDevices.removeEventListener called.")
                    })
                }
            },
            function(e, t, n) {
                "use strict";
                var r = n(0),
                    i = n(8),
                    o = n(9);
                e.exports = {
                    shimGetUserMedia: n(10),
                    shimPeerConnection: function(e) {
                        var t = r.detectBrowser(e);
                        if (e.RTCIceGatherer && (e.RTCIceCandidate || (e.RTCIceCandidate = function(e) {
                            return e
                        }), e.RTCSessionDescription || (e.RTCSessionDescription = function(e) {
                            return e
                        }), t.version < 15025)) {
                            var n = Object.getOwnPropertyDescriptor(e.MediaStreamTrack.prototype, "enabled");
                            Object.defineProperty(e.MediaStreamTrack.prototype, "enabled", {
                                set: function(e) {
                                    n.set.call(this, e);
                                    var t = new Event("enabled");
                                    t.enabled = e,
                                        this.dispatchEvent(t)
                                }
                            })
                        } ! e.RTCRtpSender || "dtmf" in e.RTCRtpSender.prototype || Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
                            get: function() {
                                return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = new e.RTCDtmfSender(this) : "video" === this.track.kind && (this._dtmf = null)),
                                    this._dtmf
                            }
                        }),
                        e.RTCDtmfSender && !e.RTCDTMFSender && (e.RTCDTMFSender = e.RTCDtmfSender);
                        var a = o(e, t.version);
                        e.RTCPeerConnection = function(e) {
                            return e && e.iceServers && (e.iceServers = i(e.iceServers)),
                                new a(e)
                        },
                            e.RTCPeerConnection.prototype = a.prototype
                    },
                    shimReplaceTrack: function(e) { ! e.RTCRtpSender || "replaceTrack" in e.RTCRtpSender.prototype || (e.RTCRtpSender.prototype.replaceTrack = e.RTCRtpSender.prototype.setTrack)
                    },
                    shimGetDisplayMedia: function(e, t) {
                        if ("getDisplayMedia" in e.navigator && e.navigator.mediaDevices && !("getDisplayMedia" in e.navigator.mediaDevices)) {
                            var n = e.navigator.getDisplayMedia;
                            e.navigator.mediaDevices.getDisplayMedia = function(t) {
                                return n.call(e.navigator, t)
                            },
                                e.navigator.getDisplayMedia = function(t) {
                                    return r.deprecated("navigator.getDisplayMedia", "navigator.mediaDevices.getDisplayMedia"),
                                        n.call(e.navigator, t)
                                }
                        }
                    }
                }
            },
            function(e, t, n) {
                "use strict";
                var r = n(0);
                e.exports = function(e, t) {
                    var n = false;
                    return (e = JSON.parse(JSON.stringify(e))).filter(function(e) {
                        if (e && (e.urls || e.url)) {
                            var i = e.urls || e.url;
                            e.url && !e.urls && r.deprecated("RTCIceServer.url", "RTCIceServer.urls");
                            var o = "string" == typeof i;
                            return o && (i = [i]),
                                i = i.filter(function(e) {
                                    return 0 === e.indexOf("turn:") && -1 !== e.indexOf("transport=udp") && -1 === e.indexOf("turn:[") && !n ? (n = true, true) : 0 === e.indexOf("stun:") && t >= 14393 && -1 === e.indexOf("?transport=udp")
                                }),
                                delete e.url,
                                e.urls = o ? i[0] : i,
                                !!i.length
                        }
                    })
                }
            },
            function(e, t, n) {
                "use strict";
                var r = n(1);
                function i(e, t, n, i, o) {
                    var a = r.writeRtpDescription(e.kind, t);
                    if (a += r.writeIceParameters(e.iceGatherer.getLocalParameters()), a += r.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === n ? "actpass": o || "active"), a += "a=mid:" + e.mid + "\r\n", e.rtpSender && e.rtpReceiver ? a += "a=sendrecv\r\n": e.rtpSender ? a += "a=sendonly\r\n": e.rtpReceiver ? a += "a=recvonly\r\n": a += "a=inactive\r\n", e.rtpSender) {
                        var s = e.rtpSender._initialTrackId || e.rtpSender.track.id;
                        e.rtpSender._initialTrackId = s;
                        var c = "msid:" + (i ? i.id: "-") + " " + s + "\r\n";
                        a += "a=" + c,
                            a += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + c,
                        e.sendEncodingParameters[0].rtx && (a += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + c, a += "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n")
                    }
                    return a += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + r.localCName + "\r\n",
                    e.rtpSender && e.sendEncodingParameters[0].rtx && (a += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + r.localCName + "\r\n"),
                        a
                }
                function o(e, t) {
                    var n = {
                            codecs: [],
                            headerExtensions: [],
                            fecMechanisms: []
                        },
                        r = function(e, t) {
                            e = parseInt(e, 10);
                            for (var n = 0; n < t.length; n++) if (t[n].payloadType === e || t[n].preferredPayloadType === e) return t[n]
                        },
                        i = function(e, t, n, i) {
                            var o = r(e.parameters.apt, n),
                                a = r(t.parameters.apt, i);
                            return o && a && o.name.toLowerCase() === a.name.toLowerCase()
                        };
                    return e.codecs.forEach(function(r) {
                        for (var o = 0; o < t.codecs.length; o++) {
                            var a = t.codecs[o];
                            if (r.name.toLowerCase() === a.name.toLowerCase() && r.clockRate === a.clockRate) {
                                if ("rtx" === r.name.toLowerCase() && r.parameters && a.parameters.apt && !i(r, a, e.codecs, t.codecs)) continue; (a = JSON.parse(JSON.stringify(a))).numChannels = Math.min(r.numChannels, a.numChannels),
                                    n.codecs.push(a),
                                    a.rtcpFeedback = a.rtcpFeedback.filter(function(e) {
                                        for (var t = 0; t < r.rtcpFeedback.length; t++) if (r.rtcpFeedback[t].type === e.type && r.rtcpFeedback[t].parameter === e.parameter) return true;
                                        return false
                                    });
                                break
                            }
                        }
                    }),
                        e.headerExtensions.forEach(function(e) {
                            for (var r = 0; r < t.headerExtensions.length; r++) {
                                var i = t.headerExtensions[r];
                                if (e.uri === i.uri) {
                                    n.headerExtensions.push(i);
                                    break
                                }
                            }
                        }),
                        n
                }
                function a(e, t, n) {
                    return - 1 !== {
                        offer: {
                            setLocalDescription: ["stable", "have-local-offer"],
                            setRemoteDescription: ["stable", "have-remote-offer"]
                        },
                        answer: {
                            setLocalDescription: ["have-remote-offer", "have-local-pranswer"],
                            setRemoteDescription: ["have-local-offer", "have-remote-pranswer"]
                        }
                    } [t][e].indexOf(n)
                }
                function s(e, t) {
                    var n = e.getRemoteCandidates().find(function(e) {
                        return t.foundation === e.foundation && t.ip === e.ip && t.port === e.port && t.priority === e.priority && t.protocol === e.protocol && t.type === e.type
                    });
                    return n || e.addRemoteCandidate(t),
                        !n
                }
                function c(e, t) {
                    var n = new Error(t);
                    return n.name = e,
                        n.code = {
                            NotSupportedError: 9,
                            InvalidStateError: 11,
                            InvalidAccessError: 15,
                            TypeError: void 0,
                            OperationError: void 0
                        } [e],
                        n
                }
                e.exports = function(e, t) {
                    function n(t, n) {
                        n.addTrack(t),
                            n.dispatchEvent(new e.MediaStreamTrackEvent("addtrack", {
                                track: t
                            }))
                    }
                    function d(t, n, r, i) {
                        var o = new Event("track");
                        o.track = n,
                            o.receiver = r,
                            o.transceiver = {
                                receiver: r
                            },
                            o.streams = i,
                            e.setTimeout(function() {
                                t._dispatchEvent("track", o)
                            })
                    }
                    var u = function(n) {
                        var i = this,
                            o = document.createDocumentFragment();
                        if (["addEventListener", "removeEventListener", "dispatchEvent"].forEach(function(e) {
                            i[e] = o[e].bind(o)
                        }), this.canTrickleIceCandidates = null, this.needNegotiation = false, this.localStreams = [], this.remoteStreams = [], this._localDescription = null, this._remoteDescription = null, this.signalingState = "stable", this.iceConnectionState = "new", this.connectionState = "new", this.iceGatheringState = "new", n = JSON.parse(JSON.stringify(n || {})), this.usingBundle = "max-bundle" === n.bundlePolicy, "negotiate" === n.rtcpMuxPolicy) throw c("NotSupportedError", "rtcpMuxPolicy 'negotiate' is not supported");
                        switch (n.rtcpMuxPolicy || (n.rtcpMuxPolicy = "require"), n.iceTransportPolicy) {
                            case "all":
                            case "relay":
                                break;
                            default:
                                n.iceTransportPolicy = "all"
                        }
                        switch (n.bundlePolicy) {
                            case "balanced":
                            case "max-compat":
                            case "max-bundle":
                                break;
                            default:
                                n.bundlePolicy = "balanced"
                        }
                        if (n.iceServers = function(e, t) {
                            var n = false;
                            return (e = JSON.parse(JSON.stringify(e))).filter(function(e) {
                                if (e && (e.urls || e.url)) {
                                    var r = e.urls || e.url;
                                    e.url && !e.urls && console.warn("RTCIceServer.url is deprecated! Use urls instead.");
                                    var i = "string" == typeof r;
                                    return i && (r = [r]),
                                        r = r.filter(function(e) {
                                            return 0 !== e.indexOf("turn:") || -1 === e.indexOf("transport=udp") || -1 !== e.indexOf("turn:[") || n ? 0 === e.indexOf("stun:") && t >= 14393 && -1 === e.indexOf("?transport=udp") : (n = true, true)
                                        }),
                                        delete e.url,
                                        e.urls = i ? r[0] : r,
                                        !!r.length
                                }
                            })
                        } (n.iceServers || [], t), this._iceGatherers = [], n.iceCandidatePoolSize) for (var a = n.iceCandidatePoolSize; a > 0; a--) this._iceGatherers.push(new e.RTCIceGatherer({
                            iceServers: n.iceServers,
                            gatherPolicy: n.iceTransportPolicy
                        }));
                        else n.iceCandidatePoolSize = 0;
                        this._config = n,
                            this.transceivers = [],
                            this._sdpSessionId = r.generateSessionId(),
                            this._sdpSessionVersion = 0,
                            this._dtlsRole = void 0,
                            this._isClosed = false
                    };
                    Object.defineProperty(u.prototype, "localDescription", {
                        configurable: true,
                        get: function() {
                            return this._localDescription
                        }
                    }),
                        Object.defineProperty(u.prototype, "remoteDescription", {
                            configurable: true,
                            get: function() {
                                return this._remoteDescription
                            }
                        }),
                        u.prototype.onicecandidate = null,
                        u.prototype.onaddstream = null,
                        u.prototype.ontrack = null,
                        u.prototype.onremovestream = null,
                        u.prototype.onsignalingstatechange = null,
                        u.prototype.oniceconnectionstatechange = null,
                        u.prototype.onconnectionstatechange = null,
                        u.prototype.onicegatheringstatechange = null,
                        u.prototype.onnegotiationneeded = null,
                        u.prototype.ondatachannel = null,
                        u.prototype._dispatchEvent = function(e, t) {
                            this._isClosed || (this.dispatchEvent(t), "function" == typeof this["on" + e] && this["on" + e](t))
                        },
                        u.prototype._emitGatheringStateChange = function() {
                            var e = new Event("icegatheringstatechange");
                            this._dispatchEvent("icegatheringstatechange", e)
                        },
                        u.prototype.getConfiguration = function() {
                            return this._config
                        },
                        u.prototype.getLocalStreams = function() {
                            return this.localStreams
                        },
                        u.prototype.getRemoteStreams = function() {
                            return this.remoteStreams
                        },
                        u.prototype._createTransceiver = function(e, t) {
                            var n = this.transceivers.length > 0,
                                r = {
                                    track: null,
                                    iceGatherer: null,
                                    iceTransport: null,
                                    dtlsTransport: null,
                                    localCapabilities: null,
                                    remoteCapabilities: null,
                                    rtpSender: null,
                                    rtpReceiver: null,
                                    kind: e,
                                    mid: null,
                                    sendEncodingParameters: null,
                                    recvEncodingParameters: null,
                                    stream: null,
                                    associatedRemoteMediaStreams: [],
                                    wantReceive: true
                                };
                            if (this.usingBundle && n) r.iceTransport = this.transceivers[0].iceTransport,
                                r.dtlsTransport = this.transceivers[0].dtlsTransport;
                            else {
                                var i = this._createIceAndDtlsTransports();
                                r.iceTransport = i.iceTransport,
                                    r.dtlsTransport = i.dtlsTransport
                            }
                            return t || this.transceivers.push(r),
                                r
                        },
                        u.prototype.addTrack = function(t, n) {
                            if (this._isClosed) throw c("InvalidStateError", "Attempted to call addTrack on a closed peerconnection.");
                            var r;
                            if (this.transceivers.find(function(e) {
                                return e.track === t
                            })) throw c("InvalidAccessError", "Track already exists.");
                            for (var i = 0; i < this.transceivers.length; i++) this.transceivers[i].track || this.transceivers[i].kind !== t.kind || (r = this.transceivers[i]);
                            return r || (r = this._createTransceiver(t.kind)),
                                this._maybeFireNegotiationNeeded(),
                            -1 === this.localStreams.indexOf(n) && this.localStreams.push(n),
                                r.track = t,
                                r.stream = n,
                                r.rtpSender = new e.RTCRtpSender(t, r.dtlsTransport),
                                r.rtpSender
                        },
                        u.prototype.addStream = function(e) {
                            var n = this;
                            if (t >= 15025) e.getTracks().forEach(function(t) {
                                n.addTrack(t, e)
                            });
                            else {
                                var r = e.clone();
                                e.getTracks().forEach(function(e, t) {
                                    var n = r.getTracks()[t];
                                    e.addEventListener("enabled",
                                        function(e) {
                                            n.enabled = e.enabled
                                        })
                                }),
                                    r.getTracks().forEach(function(e) {
                                        n.addTrack(e, r)
                                    })
                            }
                        },
                        u.prototype.removeTrack = function(t) {
                            if (this._isClosed) throw c("InvalidStateError", "Attempted to call removeTrack on a closed peerconnection.");
                            if (! (t instanceof e.RTCRtpSender)) throw new TypeError("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.");
                            var n = this.transceivers.find(function(e) {
                                return e.rtpSender === t
                            });
                            if (!n) throw c("InvalidAccessError", "Sender was not created by this connection.");
                            var r = n.stream;
                            n.rtpSender.stop(),
                                n.rtpSender = null,
                                n.track = null,
                                n.stream = null,
                            -1 === this.transceivers.map(function(e) {
                                return e.stream
                            }).indexOf(r) && this.localStreams.indexOf(r) > -1 && this.localStreams.splice(this.localStreams.indexOf(r), 1),
                                this._maybeFireNegotiationNeeded()
                        },
                        u.prototype.removeStream = function(e) {
                            var t = this;
                            e.getTracks().forEach(function(e) {
                                var n = t.getSenders().find(function(t) {
                                    return t.track === e
                                });
                                n && t.removeTrack(n)
                            })
                        },
                        u.prototype.getSenders = function() {
                            return this.transceivers.filter(function(e) {
                                return !! e.rtpSender
                            }).map(function(e) {
                                return e.rtpSender
                            })
                        },
                        u.prototype.getReceivers = function() {
                            return this.transceivers.filter(function(e) {
                                return !! e.rtpReceiver
                            }).map(function(e) {
                                return e.rtpReceiver
                            })
                        },
                        u.prototype._createIceGatherer = function(t, n) {
                            var r = this;
                            if (n && t > 0) return this.transceivers[0].iceGatherer;
                            if (this._iceGatherers.length) return this._iceGatherers.shift();
                            var i = new e.RTCIceGatherer({
                                iceServers: this._config.iceServers,
                                gatherPolicy: this._config.iceTransportPolicy
                            });
                            return Object.defineProperty(i, "state", {
                                value: "new",
                                writable: true
                            }),
                                this.transceivers[t].bufferedCandidateEvents = [],
                                this.transceivers[t].bufferCandidates = function(e) {
                                    var n = !e.candidate || 0 === Object.keys(e.candidate).length;
                                    i.state = n ? "completed": "gathering",
                                    null !== r.transceivers[t].bufferedCandidateEvents && r.transceivers[t].bufferedCandidateEvents.push(e)
                                },
                                i.addEventListener("localcandidate", this.transceivers[t].bufferCandidates),
                                i
                        },
                        u.prototype._gather = function(t, n) {
                            var i = this,
                                o = this.transceivers[n].iceGatherer;
                            if (!o.onlocalcandidate) {
                                var a = this.transceivers[n].bufferedCandidateEvents;
                                this.transceivers[n].bufferedCandidateEvents = null,
                                    o.removeEventListener("localcandidate", this.transceivers[n].bufferCandidates),
                                    o.onlocalcandidate = function(e) {
                                        if (! (i.usingBundle && n > 0)) {
                                            var a = new Event("icecandidate");
                                            a.candidate = {
                                                sdpMid: t,
                                                sdpMLineIndex: n
                                            };
                                            var s = e.candidate,
                                                c = !s || 0 === Object.keys(s).length;
                                            if (c)"new" !== o.state && "gathering" !== o.state || (o.state = "completed");
                                            else {
                                                "new" === o.state && (o.state = "gathering"),
                                                    s.component = 1,
                                                    s.ufrag = o.getLocalParameters().usernameFragment;
                                                var d = r.writeCandidate(s);
                                                a.candidate = Object.assign(a.candidate, r.parseCandidate(d)),
                                                    a.candidate.candidate = d,
                                                    a.candidate.toJSON = function() {
                                                        return {
                                                            candidate: a.candidate.candidate,
                                                            sdpMid: a.candidate.sdpMid,
                                                            sdpMLineIndex: a.candidate.sdpMLineIndex,
                                                            usernameFragment: a.candidate.usernameFragment
                                                        }
                                                    }
                                            }
                                            var u = r.getMediaSections(i._localDescription.sdp);
                                            u[a.candidate.sdpMLineIndex] += c ? "a=end-of-candidates\r\n": "a=" + a.candidate.candidate + "\r\n",
                                                i._localDescription.sdp = r.getDescription(i._localDescription.sdp) + u.join("");
                                            var l = i.transceivers.every(function(e) {
                                                return e.iceGatherer && "completed" === e.iceGatherer.state
                                            });
                                            "gathering" !== i.iceGatheringState && (i.iceGatheringState = "gathering", i._emitGatheringStateChange()),
                                            c || i._dispatchEvent("icecandidate", a),
                                            l && (i._dispatchEvent("icecandidate", new Event("icecandidate")), i.iceGatheringState = "complete", i._emitGatheringStateChange())
                                        }
                                    },
                                    e.setTimeout(function() {
                                            a.forEach(function(e) {
                                                o.onlocalcandidate(e)
                                            })
                                        },
                                        0)
                            }
                        },
                        u.prototype._createIceAndDtlsTransports = function() {
                            var t = this,
                                n = new e.RTCIceTransport(null);
                            n.onicestatechange = function() {
                                t._updateIceConnectionState(),
                                    t._updateConnectionState()
                            };
                            var r = new e.RTCDtlsTransport(n);
                            return r.ondtlsstatechange = function() {
                                t._updateConnectionState()
                            },
                                r.onerror = function() {
                                    Object.defineProperty(r, "state", {
                                        value: "failed",
                                        writable: true
                                    }),
                                        t._updateConnectionState()
                                },
                                {
                                    iceTransport: n,
                                    dtlsTransport: r
                                }
                        },
                        u.prototype._disposeIceAndDtlsTransports = function(e) {
                            var t = this.transceivers[e].iceGatherer;
                            t && (delete t.onlocalcandidate, delete this.transceivers[e].iceGatherer);
                            var n = this.transceivers[e].iceTransport;
                            n && (delete n.onicestatechange, delete this.transceivers[e].iceTransport);
                            var r = this.transceivers[e].dtlsTransport;
                            r && (delete r.ondtlsstatechange, delete r.onerror, delete this.transceivers[e].dtlsTransport)
                        },
                        u.prototype._transceive = function(e, n, i) {
                            var a = o(e.localCapabilities, e.remoteCapabilities);
                            n && e.rtpSender && (a.encodings = e.sendEncodingParameters, a.rtcp = {
                                cname: r.localCName,
                                compound: e.rtcpParameters.compound
                            },
                            e.recvEncodingParameters.length && (a.rtcp.ssrc = e.recvEncodingParameters[0].ssrc), e.rtpSender.send(a)),
                            i && e.rtpReceiver && a.codecs.length > 0 && ("video" === e.kind && e.recvEncodingParameters && t < 15019 && e.recvEncodingParameters.forEach(function(e) {
                                delete e.rtx
                            }), e.recvEncodingParameters.length ? a.encodings = e.recvEncodingParameters: a.encodings = [{}], a.rtcp = {
                                compound: e.rtcpParameters.compound
                            },
                            e.rtcpParameters.cname && (a.rtcp.cname = e.rtcpParameters.cname), e.sendEncodingParameters.length && (a.rtcp.ssrc = e.sendEncodingParameters[0].ssrc), e.rtpReceiver.receive(a))
                        },
                        u.prototype.setLocalDescription = function(e) {
                            var t, n, i = this;
                            if ( - 1 === ["offer", "answer"].indexOf(e.type)) return Promise.reject(c("TypeError", 'Unsupported type "' + e.type + '"'));
                            if (!a("setLocalDescription", e.type, i.signalingState) || i._isClosed) return Promise.reject(c("InvalidStateError", "Can not set local " + e.type + " in state " + i.signalingState));
                            if ("offer" === e.type) t = r.splitSections(e.sdp),
                                n = t.shift(),
                                t.forEach(function(e, t) {
                                    var n = r.parseRtpParameters(e);
                                    i.transceivers[t].localCapabilities = n
                                }),
                                i.transceivers.forEach(function(e, t) {
                                    i._gather(e.mid, t)
                                });
                            else if ("answer" === e.type) {
                                t = r.splitSections(i._remoteDescription.sdp),
                                    n = t.shift();
                                var s = r.matchPrefix(n, "a=ice-lite").length > 0;
                                t.forEach(function(e, t) {
                                    var a = i.transceivers[t],
                                        c = a.iceGatherer,
                                        d = a.iceTransport,
                                        u = a.dtlsTransport,
                                        l = a.localCapabilities,
                                        p = a.remoteCapabilities;
                                    if (! (r.isRejected(e) && 0 === r.matchPrefix(e, "a=bundle-only").length) && !a.rejected) {
                                        var f = r.getIceParameters(e, n),
                                            m = r.getDtlsParameters(e, n);
                                        s && (m.role = "server"),
                                        i.usingBundle && 0 !== t || (i._gather(a.mid, t), "new" === d.state && d.start(c, f, s ? "controlling": "controlled"), "new" === u.state && u.start(m));
                                        var h = o(l, p);
                                        i._transceive(a, h.codecs.length > 0, false)
                                    }
                                })
                            }
                            return i._localDescription = {
                                type: e.type,
                                sdp: e.sdp
                            },
                                "offer" === e.type ? i._updateSignalingState("have-local-offer") : i._updateSignalingState("stable"),
                                Promise.resolve()
                        },
                        u.prototype.setRemoteDescription = function(i) {
                            var u = this;
                            if ( - 1 === ["offer", "answer"].indexOf(i.type)) return Promise.reject(c("TypeError", 'Unsupported type "' + i.type + '"'));
                            if (!a("setRemoteDescription", i.type, u.signalingState) || u._isClosed) return Promise.reject(c("InvalidStateError", "Can not set remote " + i.type + " in state " + u.signalingState));
                            var l = {};
                            u.remoteStreams.forEach(function(e) {
                                l[e.id] = e
                            });
                            var p = [],
                                f = r.splitSections(i.sdp),
                                m = f.shift(),
                                h = r.matchPrefix(m, "a=ice-lite").length > 0,
                                g = r.matchPrefix(m, "a=group:BUNDLE ").length > 0;
                            u.usingBundle = g;
                            var v = r.matchPrefix(m, "a=ice-options:")[0];
                            return u.canTrickleIceCandidates = !!v && v.substr(14).split(" ").indexOf("trickle") >= 0,
                                f.forEach(function(a, c) {
                                    var d = r.splitLines(a),
                                        f = r.getKind(a),
                                        v = r.isRejected(a) && 0 === r.matchPrefix(a, "a=bundle-only").length,
                                        C = d[0].substr(2).split(" ")[2],
                                        y = r.getDirection(a, m),
                                        S = r.parseMsid(a),
                                        b = r.getMid(a) || r.generateIdentifier();
                                    if (v || "application" === f && ("DTLS/SCTP" === C || "UDP/DTLS/SCTP" === C)) u.transceivers[c] = {
                                        mid: b,
                                        kind: f,
                                        protocol: C,
                                        rejected: true
                                    };
                                    else {
                                        var I, T, R, E, w, P, D, k, O; ! v && u.transceivers[c] && u.transceivers[c].rejected && (u.transceivers[c] = u._createTransceiver(f, true));
                                        var _, L, M = r.parseRtpParameters(a);
                                        v || (_ = r.getIceParameters(a, m), (L = r.getDtlsParameters(a, m)).role = "client"),
                                            D = r.parseRtpEncodingParameters(a);
                                        var A = r.parseRtcpParameters(a),
                                            N = r.matchPrefix(a, "a=end-of-candidates", m).length > 0,
                                            x = r.matchPrefix(a, "a=candidate:").map(function(e) {
                                                return r.parseCandidate(e)
                                            }).filter(function(e) {
                                                return 1 === e.component
                                            });
                                        if (("offer" === i.type || "answer" === i.type) && !v && g && c > 0 && u.transceivers[c] && (u._disposeIceAndDtlsTransports(c), u.transceivers[c].iceGatherer = u.transceivers[0].iceGatherer, u.transceivers[c].iceTransport = u.transceivers[0].iceTransport, u.transceivers[c].dtlsTransport = u.transceivers[0].dtlsTransport, u.transceivers[c].rtpSender && u.transceivers[c].rtpSender.setTransport(u.transceivers[0].dtlsTransport), u.transceivers[c].rtpReceiver && u.transceivers[c].rtpReceiver.setTransport(u.transceivers[0].dtlsTransport)), "offer" !== i.type || v) {
                                            if ("answer" === i.type && !v) {
                                                T = (I = u.transceivers[c]).iceGatherer,
                                                    R = I.iceTransport,
                                                    E = I.dtlsTransport,
                                                    w = I.rtpReceiver,
                                                    P = I.sendEncodingParameters,
                                                    k = I.localCapabilities,
                                                    u.transceivers[c].recvEncodingParameters = D,
                                                    u.transceivers[c].remoteCapabilities = M,
                                                    u.transceivers[c].rtcpParameters = A,
                                                x.length && "new" === R.state && (!h && !N || g && 0 !== c ? x.forEach(function(e) {
                                                    s(I.iceTransport, e)
                                                }) : R.setRemoteCandidates(x)),
                                                g && 0 !== c || ("new" === R.state && R.start(T, _, "controlling"), "new" === E.state && E.start(L)),
                                                !o(I.localCapabilities, I.remoteCapabilities).codecs.filter(function(e) {
                                                    return "rtx" === e.name.toLowerCase()
                                                }).length && I.sendEncodingParameters[0].rtx && delete I.sendEncodingParameters[0].rtx,
                                                    u._transceive(I, "sendrecv" === y || "recvonly" === y, "sendrecv" === y || "sendonly" === y),
                                                    !w || "sendrecv" !== y && "sendonly" !== y ? delete I.rtpReceiver: (O = w.track, S ? (l[S.stream] || (l[S.stream] = new e.MediaStream), n(O, l[S.stream]), p.push([O, w, l[S.stream]])) : (l.
                                                        default || (l.
                                                        default = new e.MediaStream), n(O, l.
                                                        default), p.push([O, w, l.
                                                        default])))
                                            }
                                        } else { (I = u.transceivers[c] || u._createTransceiver(f)).mid = b,
                                        I.iceGatherer || (I.iceGatherer = u._createIceGatherer(c, g)),
                                        x.length && "new" === I.iceTransport.state && (!N || g && 0 !== c ? x.forEach(function(e) {
                                            s(I.iceTransport, e)
                                        }) : I.iceTransport.setRemoteCandidates(x)),
                                            k = e.RTCRtpReceiver.getCapabilities(f),
                                        t < 15019 && (k.codecs = k.codecs.filter(function(e) {
                                            return "rtx" !== e.name
                                        })),
                                            P = I.sendEncodingParameters || [{
                                                ssrc: 1001 * (2 * c + 2)
                                            }];
                                            var F, U = false;
                                            if ("sendrecv" === y || "sendonly" === y) {
                                                if (U = !I.rtpReceiver, w = I.rtpReceiver || new e.RTCRtpReceiver(I.dtlsTransport, f), U) O = w.track,
                                                S && "-" === S.stream || (S ? (l[S.stream] || (l[S.stream] = new e.MediaStream, Object.defineProperty(l[S.stream], "id", {
                                                    get: function() {
                                                        return S.stream
                                                    }
                                                })), Object.defineProperty(O, "id", {
                                                    get: function() {
                                                        return S.track
                                                    }
                                                }), F = l[S.stream]) : (l.
                                                    default || (l.
                                                    default = new e.MediaStream), F = l.
                                                    default)),
                                                F && (n(O, F), I.associatedRemoteMediaStreams.push(F)),
                                                    p.push([O, w, F])
                                            } else I.rtpReceiver && I.rtpReceiver.track && (I.associatedRemoteMediaStreams.forEach(function(t) {
                                                var n = t.getTracks().find(function(e) {
                                                    return e.id === I.rtpReceiver.track.id
                                                });
                                                n &&
                                                function(t, n) {
                                                    n.removeTrack(t),
                                                        n.dispatchEvent(new e.MediaStreamTrackEvent("removetrack", {
                                                            track: t
                                                        }))
                                                } (n, t)
                                            }), I.associatedRemoteMediaStreams = []);
                                            I.localCapabilities = k,
                                                I.remoteCapabilities = M,
                                                I.rtpReceiver = w,
                                                I.rtcpParameters = A,
                                                I.sendEncodingParameters = P,
                                                I.recvEncodingParameters = D,
                                                u._transceive(u.transceivers[c], false, U)
                                        }
                                    }
                                }),
                            void 0 === u._dtlsRole && (u._dtlsRole = "offer" === i.type ? "active": "passive"),
                                u._remoteDescription = {
                                    type: i.type,
                                    sdp: i.sdp
                                },
                                "offer" === i.type ? u._updateSignalingState("have-remote-offer") : u._updateSignalingState("stable"),
                                Object.keys(l).forEach(function(t) {
                                    var n = l[t];
                                    if (n.getTracks().length) {
                                        if ( - 1 === u.remoteStreams.indexOf(n)) {
                                            u.remoteStreams.push(n);
                                            var r = new Event("addstream");
                                            r.stream = n,
                                                e.setTimeout(function() {
                                                    u._dispatchEvent("addstream", r)
                                                })
                                        }
                                        p.forEach(function(e) {
                                            var t = e[0],
                                                r = e[1];
                                            n.id === e[2].id && d(u, t, r, [n])
                                        })
                                    }
                                }),
                                p.forEach(function(e) {
                                    e[2] || d(u, e[0], e[1], [])
                                }),
                                e.setTimeout(function() {
                                        u && u.transceivers && u.transceivers.forEach(function(e) {
                                            e.iceTransport && "new" === e.iceTransport.state && e.iceTransport.getRemoteCandidates().length > 0 && (console.warn("Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"), e.iceTransport.addRemoteCandidate({}))
                                        })
                                    },
                                    4e3),
                                Promise.resolve()
                        },
                        u.prototype.close = function() {
                            this.transceivers.forEach(function(e) {
                                e.iceTransport && e.iceTransport.stop(),
                                e.dtlsTransport && e.dtlsTransport.stop(),
                                e.rtpSender && e.rtpSender.stop(),
                                e.rtpReceiver && e.rtpReceiver.stop()
                            }),
                                this._isClosed = true,
                                this._updateSignalingState("closed")
                        },
                        u.prototype._updateSignalingState = function(e) {
                            this.signalingState = e;
                            var t = new Event("signalingstatechange");
                            this._dispatchEvent("signalingstatechange", t)
                        },
                        u.prototype._maybeFireNegotiationNeeded = function() {
                            var t = this;
                            "stable" === this.signalingState && true !== this.needNegotiation && (this.needNegotiation = true, e.setTimeout(function() {
                                    if (t.needNegotiation) {
                                        t.needNegotiation = false;
                                        var e = new Event("negotiationneeded");
                                        t._dispatchEvent("negotiationneeded", e)
                                    }
                                },
                                0))
                        },
                        u.prototype._updateIceConnectionState = function() {
                            var e, t = {
                                new: 0,
                                closed: 0,
                                checking: 0,
                                connected: 0,
                                completed: 0,
                                disconnected: 0,
                                failed: 0
                            };
                            if (this.transceivers.forEach(function(e) {
                                e.iceTransport && !e.rejected && t[e.iceTransport.state]++
                            }), e = "new", t.failed > 0 ? e = "failed": t.checking > 0 ? e = "checking": t.disconnected > 0 ? e = "disconnected": t.new > 0 ? e = "new": t.connected > 0 ? e = "connected": t.completed > 0 && (e = "completed"), e !== this.iceConnectionState) {
                                this.iceConnectionState = e;
                                var n = new Event("iceconnectionstatechange");
                                this._dispatchEvent("iceconnectionstatechange", n)
                            }
                        },
                        u.prototype._updateConnectionState = function() {
                            var e, t = {
                                new: 0,
                                closed: 0,
                                connecting: 0,
                                connected: 0,
                                completed: 0,
                                disconnected: 0,
                                failed: 0
                            };
                            if (this.transceivers.forEach(function(e) {
                                e.iceTransport && e.dtlsTransport && !e.rejected && (t[e.iceTransport.state]++, t[e.dtlsTransport.state]++)
                            }), t.connected += t.completed, e = "new", t.failed > 0 ? e = "failed": t.connecting > 0 ? e = "connecting": t.disconnected > 0 ? e = "disconnected": t.new > 0 ? e = "new": t.connected > 0 && (e = "connected"), e !== this.connectionState) {
                                this.connectionState = e;
                                var n = new Event("connectionstatechange");
                                this._dispatchEvent("connectionstatechange", n)
                            }
                        },
                        u.prototype.createOffer = function() {
                            var n = this;
                            if (n._isClosed) return Promise.reject(c("InvalidStateError", "Can not call createOffer after close"));
                            var o = n.transceivers.filter(function(e) {
                                    return "audio" === e.kind
                                }).length,
                                a = n.transceivers.filter(function(e) {
                                    return "video" === e.kind
                                }).length,
                                s = arguments[0];
                            if (s) {
                                if (s.mandatory || s.optional) throw new TypeError("Legacy mandatory/optional constraints not supported.");
                                void 0 !== s.offerToReceiveAudio && (o = true === s.offerToReceiveAudio ? 1 : false === s.offerToReceiveAudio ? 0 : s.offerToReceiveAudio),
                                void 0 !== s.offerToReceiveVideo && (a = true === s.offerToReceiveVideo ? 1 : false === s.offerToReceiveVideo ? 0 : s.offerToReceiveVideo)
                            }
                            for (n.transceivers.forEach(function(e) {
                                "audio" === e.kind ? --o < 0 && (e.wantReceive = false) : "video" === e.kind && --a < 0 && (e.wantReceive = false)
                            }); o > 0 || a > 0;) o > 0 && (n._createTransceiver("audio"), o--),
                            a > 0 && (n._createTransceiver("video"), a--);
                            var d = r.writeSessionBoilerplate(n._sdpSessionId, n._sdpSessionVersion++);
                            n.transceivers.forEach(function(i, o) {
                                var a = i.track,
                                    s = i.kind,
                                    c = i.mid || r.generateIdentifier();
                                i.mid = c,
                                i.iceGatherer || (i.iceGatherer = n._createIceGatherer(o, n.usingBundle));
                                var d = e.RTCRtpSender.getCapabilities(s);
                                t < 15019 && (d.codecs = d.codecs.filter(function(e) {
                                    return "rtx" !== e.name
                                })),
                                    d.codecs.forEach(function(e) {
                                        "H264" === e.name && void 0 === e.parameters["level-asymmetry-allowed"] && (e.parameters["level-asymmetry-allowed"] = "1"),
                                        i.remoteCapabilities && i.remoteCapabilities.codecs && i.remoteCapabilities.codecs.forEach(function(t) {
                                            e.name.toLowerCase() === t.name.toLowerCase() && e.clockRate === t.clockRate && (e.preferredPayloadType = t.payloadType)
                                        })
                                    }),
                                    d.headerExtensions.forEach(function(e) { (i.remoteCapabilities && i.remoteCapabilities.headerExtensions || []).forEach(function(t) {
                                        e.uri === t.uri && (e.id = t.id)
                                    })
                                    });
                                var u = i.sendEncodingParameters || [{
                                    ssrc: 1001 * (2 * o + 1)
                                }];
                                a && t >= 15019 && "video" === s && !u[0].rtx && (u[0].rtx = {
                                    ssrc: u[0].ssrc + 1
                                }),
                                i.wantReceive && (i.rtpReceiver = new e.RTCRtpReceiver(i.dtlsTransport, s)),
                                    i.localCapabilities = d,
                                    i.sendEncodingParameters = u
                            }),
                            "max-compat" !== n._config.bundlePolicy && (d += "a=group:BUNDLE " + n.transceivers.map(function(e) {
                                return e.mid
                            }).join(" ") + "\r\n"),
                                d += "a=ice-options:trickle\r\n",
                                n.transceivers.forEach(function(e, t) {
                                    d += i(e, e.localCapabilities, "offer", e.stream, n._dtlsRole),
                                        d += "a=rtcp-rsize\r\n",
                                    !e.iceGatherer || "new" === n.iceGatheringState || 0 !== t && n.usingBundle || (e.iceGatherer.getLocalCandidates().forEach(function(e) {
                                        e.component = 1,
                                            d += "a=" + r.writeCandidate(e) + "\r\n"
                                    }), "completed" === e.iceGatherer.state && (d += "a=end-of-candidates\r\n"))
                                });
                            var u = new e.RTCSessionDescription({
                                type: "offer",
                                sdp: d
                            });
                            return Promise.resolve(u)
                        },
                        u.prototype.createAnswer = function() {
                            var n = this;
                            if (n._isClosed) return Promise.reject(c("InvalidStateError", "Can not call createAnswer after close"));
                            if ("have-remote-offer" !== n.signalingState && "have-local-pranswer" !== n.signalingState) return Promise.reject(c("InvalidStateError", "Can not call createAnswer in signalingState " + n.signalingState));
                            var a = r.writeSessionBoilerplate(n._sdpSessionId, n._sdpSessionVersion++);
                            n.usingBundle && (a += "a=group:BUNDLE " + n.transceivers.map(function(e) {
                                return e.mid
                            }).join(" ") + "\r\n"),
                                a += "a=ice-options:trickle\r\n";
                            var s = r.getMediaSections(n._remoteDescription.sdp).length;
                            n.transceivers.forEach(function(e, r) {
                                if (! (r + 1 > s)) {
                                    if (e.rejected) return "application" === e.kind ? "DTLS/SCTP" === e.protocol ? a += "m=application 0 DTLS/SCTP 5000\r\n": a += "m=application 0 " + e.protocol + " webrtc-datachannel\r\n": "audio" === e.kind ? a += "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n": "video" === e.kind && (a += "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n"),
                                        void(a += "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" + e.mid + "\r\n");
                                    var c;
                                    if (e.stream)"audio" === e.kind ? c = e.stream.getAudioTracks()[0] : "video" === e.kind && (c = e.stream.getVideoTracks()[0]),
                                    c && t >= 15019 && "video" === e.kind && !e.sendEncodingParameters[0].rtx && (e.sendEncodingParameters[0].rtx = {
                                        ssrc: e.sendEncodingParameters[0].ssrc + 1
                                    });
                                    var d = o(e.localCapabilities, e.remoteCapabilities); ! d.codecs.filter(function(e) {
                                        return "rtx" === e.name.toLowerCase()
                                    }).length && e.sendEncodingParameters[0].rtx && delete e.sendEncodingParameters[0].rtx,
                                        a += i(e, d, "answer", e.stream, n._dtlsRole),
                                    e.rtcpParameters && e.rtcpParameters.reducedSize && (a += "a=rtcp-rsize\r\n")
                                }
                            });
                            var d = new e.RTCSessionDescription({
                                type: "answer",
                                sdp: a
                            });
                            return Promise.resolve(d)
                        },
                        u.prototype.addIceCandidate = function(e) {
                            var t, n = this;
                            return e && void 0 === e.sdpMLineIndex && !e.sdpMid ? Promise.reject(new TypeError("sdpMLineIndex or sdpMid required")) : new Promise(function(i, o) {
                                if (!n._remoteDescription) return o(c("InvalidStateError", "Can not add ICE candidate without a remote description"));
                                if (e && "" !== e.candidate) {
                                    var a = e.sdpMLineIndex;
                                    if (e.sdpMid) for (var d = 0; d < n.transceivers.length; d++) if (n.transceivers[d].mid === e.sdpMid) {
                                        a = d;
                                        break
                                    }
                                    var u = n.transceivers[a];
                                    if (!u) return o(c("OperationError", "Can not add ICE candidate"));
                                    if (u.rejected) return i();
                                    var l = Object.keys(e.candidate).length > 0 ? r.parseCandidate(e.candidate) : {};
                                    if ("tcp" === l.protocol && (0 === l.port || 9 === l.port)) return i();
                                    if (l.component && 1 !== l.component) return i();
                                    if ((0 === a || a > 0 && u.iceTransport !== n.transceivers[0].iceTransport) && !s(u.iceTransport, l)) return o(c("OperationError", "Can not add ICE candidate"));
                                    var p = e.candidate.trim();
                                    0 === p.indexOf("a=") && (p = p.substr(2)),
                                        (t = r.getMediaSections(n._remoteDescription.sdp))[a] += "a=" + (l.type ? p: "end-of-candidates") + "\r\n",
                                        n._remoteDescription.sdp = r.getDescription(n._remoteDescription.sdp) + t.join("")
                                } else for (var f = 0; f < n.transceivers.length && (n.transceivers[f].rejected || (n.transceivers[f].iceTransport.addRemoteCandidate({}), (t = r.getMediaSections(n._remoteDescription.sdp))[f] += "a=end-of-candidates\r\n", n._remoteDescription.sdp = r.getDescription(n._remoteDescription.sdp) + t.join(""), !n.usingBundle)); f++);
                                i()
                            })
                        },
                        u.prototype.getStats = function(t) {
                            if (t && t instanceof e.MediaStreamTrack) {
                                var n = null;
                                if (this.transceivers.forEach(function(e) {
                                    e.rtpSender && e.rtpSender.track === t ? n = e.rtpSender: e.rtpReceiver && e.rtpReceiver.track === t && (n = e.rtpReceiver)
                                }), !n) throw c("InvalidAccessError", "Invalid selector.");
                                return n.getStats()
                            }
                            var r = [];
                            return this.transceivers.forEach(function(e) { ["rtpSender", "rtpReceiver", "iceGatherer", "iceTransport", "dtlsTransport"].forEach(function(t) {
                                e[t] && r.push(e[t].getStats())
                            })
                            }),
                                Promise.all(r).then(function(e) {
                                    var t = new Map;
                                    return e.forEach(function(e) {
                                        e.forEach(function(e) {
                                            t.set(e.id, e)
                                        })
                                    }),
                                        t
                                })
                        }; ["RTCRtpSender", "RTCRtpReceiver", "RTCIceGatherer", "RTCIceTransport", "RTCDtlsTransport"].forEach(function(t) {
                        var n = e[t];
                        if (n && n.prototype && n.prototype.getStats) {
                            var r = n.prototype.getStats;
                            n.prototype.getStats = function() {
                                return r.apply(this).then(function(e) {
                                    var t = new Map;
                                    return Object.keys(e).forEach(function(n) {
                                        var r;
                                        e[n].type = {
                                            inboundrtp: "inbound-rtp",
                                            outboundrtp: "outbound-rtp",
                                            candidatepair: "candidate-pair",
                                            localcandidate: "local-candidate",
                                            remotecandidate: "remote-candidate"
                                        } [(r = e[n]).type] || r.type,
                                            t.set(n, e[n])
                                    }),
                                        t
                                })
                            }
                        }
                    });
                    var l = ["createOffer", "createAnswer"];
                    return l.forEach(function(e) {
                        var t = u.prototype[e];
                        u.prototype[e] = function() {
                            var e = arguments;
                            return "function" == typeof e[0] || "function" == typeof e[1] ? t.apply(this, [arguments[2]]).then(function(t) {
                                    "function" == typeof e[0] && e[0].apply(null, [t])
                                },
                                function(t) {
                                    "function" == typeof e[1] && e[1].apply(null, [t])
                                }) : t.apply(this, arguments)
                        }
                    }),
                        (l = ["setLocalDescription", "setRemoteDescription", "addIceCandidate"]).forEach(function(e) {
                            var t = u.prototype[e];
                            u.prototype[e] = function() {
                                var e = arguments;
                                return "function" == typeof e[1] || "function" == typeof e[2] ? t.apply(this, arguments).then(function() {
                                        "function" == typeof e[1] && e[1].apply(null)
                                    },
                                    function(t) {
                                        "function" == typeof e[2] && e[2].apply(null, [t])
                                    }) : t.apply(this, arguments)
                            }
                        }),
                        ["getStats"].forEach(function(e) {
                            var t = u.prototype[e];
                            u.prototype[e] = function() {
                                var e = arguments;
                                return "function" == typeof e[1] ? t.apply(this, arguments).then(function() {
                                    "function" == typeof e[1] && e[1].apply(null)
                                }) : t.apply(this, arguments)
                            }
                        }),
                        u
                }
            },
            function(e, t, n) {
                "use strict";
                e.exports = function(e) {
                    var t = e && e.navigator,
                        n = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
                    t.mediaDevices.getUserMedia = function(e) {
                        return n(e).
                        catch(function(e) {
                            return Promise.reject(function(e) {
                                return {
                                    name: {
                                        PermissionDeniedError: "NotAllowedError"
                                    } [e.name] || e.name,
                                    message: e.message,
                                    constraint: e.constraint,
                                    toString: function() {
                                        return this.name
                                    }
                                }
                            } (e))
                        })
                    }
                }
            },
            function(e, t, n) {
                "use strict";
                var r = n(0);
                e.exports = {
                    shimGetUserMedia: n(12),
                    shimOnTrack: function(e) {
                        "object" != typeof e || !e.RTCPeerConnection || "ontrack" in e.RTCPeerConnection.prototype || Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", {
                            get: function() {
                                return this._ontrack
                            },
                            set: function(e) {
                                this._ontrack && (this.removeEventListener("track", this._ontrack), this.removeEventListener("addstream", this._ontrackpoly)),
                                    this.addEventListener("track", this._ontrack = e),
                                    this.addEventListener("addstream", this._ontrackpoly = function(e) {
                                        e.stream.getTracks().forEach(function(t) {
                                            var n = new Event("track");
                                            n.track = t,
                                                n.receiver = {
                                                    track: t
                                                },
                                                n.transceiver = {
                                                    receiver: n.receiver
                                                },
                                                n.streams = [e.stream],
                                                this.dispatchEvent(n)
                                        }.bind(this))
                                    }.bind(this))
                            },
                            enumerable: true,
                            configurable: true
                        }),
                        "object" == typeof e && e.RTCTrackEvent && "receiver" in e.RTCTrackEvent.prototype && !("transceiver" in e.RTCTrackEvent.prototype) && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
                            get: function() {
                                return {
                                    receiver: this.receiver
                                }
                            }
                        })
                    },
                    shimSourceObject: function(e) {
                        "object" == typeof e && (!e.HTMLMediaElement || "srcObject" in e.HTMLMediaElement.prototype || Object.defineProperty(e.HTMLMediaElement.prototype, "srcObject", {
                            get: function() {
                                return this.mozSrcObject
                            },
                            set: function(e) {
                                this.mozSrcObject = e
                            }
                        }))
                    },
                    shimPeerConnection: function(e) {
                        var t = r.detectBrowser(e);
                        if ("object" == typeof e && (e.RTCPeerConnection || e.mozRTCPeerConnection)) {
                            e.RTCPeerConnection || (e.RTCPeerConnection = function(n, r) {
                                if (t.version < 38 && n && n.iceServers) {
                                    for (var i = [], o = 0; o < n.iceServers.length; o++) {
                                        var a = n.iceServers[o];
                                        if (a.hasOwnProperty("urls")) for (var s = 0; s < a.urls.length; s++) {
                                            var c = {
                                                url: a.urls[s]
                                            };
                                            0 === a.urls[s].indexOf("turn") && (c.username = a.username, c.credential = a.credential),
                                                i.push(c)
                                        } else i.push(n.iceServers[o])
                                    }
                                    n.iceServers = i
                                }
                                return new e.mozRTCPeerConnection(n, r)
                            },
                                e.RTCPeerConnection.prototype = e.mozRTCPeerConnection.prototype, e.mozRTCPeerConnection.generateCertificate && Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
                                get: function() {
                                    return e.mozRTCPeerConnection.generateCertificate
                                }
                            }), e.RTCSessionDescription = e.mozRTCSessionDescription, e.RTCIceCandidate = e.mozRTCIceCandidate),
                                ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
                                    var n = e.RTCPeerConnection.prototype[t];
                                    e.RTCPeerConnection.prototype[t] = function() {
                                        return arguments[0] = new("addIceCandidate" === t ? e.RTCIceCandidate: e.RTCSessionDescription)(arguments[0]),
                                            n.apply(this, arguments)
                                    }
                                });
                            var n = e.RTCPeerConnection.prototype.addIceCandidate;
                            e.RTCPeerConnection.prototype.addIceCandidate = function() {
                                return arguments[0] ? n.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve())
                            };
                            var i = {
                                    inboundrtp: "inbound-rtp",
                                    outboundrtp: "outbound-rtp",
                                    candidatepair: "candidate-pair",
                                    localcandidate: "local-candidate",
                                    remotecandidate: "remote-candidate"
                                },
                                o = e.RTCPeerConnection.prototype.getStats;
                            e.RTCPeerConnection.prototype.getStats = function(e, n, r) {
                                return o.apply(this, [e || null]).then(function(e) {
                                    if (t.version < 48 && (e = function(e) {
                                        var t = new Map;
                                        return Object.keys(e).forEach(function(n) {
                                            t.set(n, e[n]),
                                                t[n] = e[n]
                                        }),
                                            t
                                    } (e)), t.version < 53 && !n) try {
                                        e.forEach(function(e) {
                                            e.type = i[e.type] || e.type
                                        })
                                    } catch(t) {
                                        if ("TypeError" !== t.name) throw t;
                                        e.forEach(function(t, n) {
                                            e.set(n, Object.assign({},
                                                t, {
                                                    type: i[t.type] || t.type
                                                }))
                                        })
                                    }
                                    return e
                                }).then(n, r)
                            }
                        }
                    },
                    shimSenderGetStats: function(e) {
                        if ("object" == typeof e && e.RTCPeerConnection && e.RTCRtpSender && !(e.RTCRtpSender && "getStats" in e.RTCRtpSender.prototype)) {
                            var t = e.RTCPeerConnection.prototype.getSenders;
                            t && (e.RTCPeerConnection.prototype.getSenders = function() {
                                var e = this,
                                    n = t.apply(e, []);
                                return n.forEach(function(t) {
                                    t._pc = e
                                }),
                                    n
                            });
                            var n = e.RTCPeerConnection.prototype.addTrack;
                            n && (e.RTCPeerConnection.prototype.addTrack = function() {
                                var e = n.apply(this, arguments);
                                return e._pc = this,
                                    e
                            }),
                                e.RTCRtpSender.prototype.getStats = function() {
                                    return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map)
                                }
                        }
                    },
                    shimReceiverGetStats: function(e) {
                        if ("object" == typeof e && e.RTCPeerConnection && e.RTCRtpSender && !(e.RTCRtpSender && "getStats" in e.RTCRtpReceiver.prototype)) {
                            var t = e.RTCPeerConnection.prototype.getReceivers;
                            t && (e.RTCPeerConnection.prototype.getReceivers = function() {
                                var e = this,
                                    n = t.apply(e, []);
                                return n.forEach(function(t) {
                                    t._pc = e
                                }),
                                    n
                            }),
                                r.wrapPeerConnectionEvent(e, "track",
                                    function(e) {
                                        return e.receiver._pc = e.srcElement,
                                            e
                                    }),
                                e.RTCRtpReceiver.prototype.getStats = function() {
                                    return this._pc.getStats(this.track)
                                }
                        }
                    },
                    shimRemoveStream: function(e) { ! e.RTCPeerConnection || "removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream = function(e) {
                        var t = this;
                        r.deprecated("removeStream", "removeTrack"),
                            this.getSenders().forEach(function(n) {
                                n.track && -1 !== e.getTracks().indexOf(n.track) && t.removeTrack(n)
                            })
                    })
                    },
                    shimRTCDataChannel: function(e) {
                        e.DataChannel && !e.RTCDataChannel && (e.RTCDataChannel = e.DataChannel)
                    },
                    shimGetDisplayMedia: function(e, t) { ! e.navigator || !e.navigator.mediaDevices || "getDisplayMedia" in e.navigator.mediaDevices || (e.navigator.mediaDevices.getDisplayMedia = function(n) {
                        if (!n || !n.video) {
                            var r = new DOMException("getDisplayMedia without video constraints is undefined");
                            return r.name = "NotFoundError",
                                r.code = 8,
                                Promise.reject(r)
                        }
                        return true === n.video ? n.video = {
                            mediaSource: t
                        }: n.video.mediaSource = t,
                            e.navigator.mediaDevices.getUserMedia(n)
                    },
                        e.navigator.getDisplayMedia = function(t) {
                            return r.deprecated("navigator.getDisplayMedia", "navigator.mediaDevices.getDisplayMedia"),
                                e.navigator.mediaDevices.getDisplayMedia(t)
                        })
                    }
                }
            },
            function(e, t, n) {
                "use strict";
                var r = n(0),
                    i = r.log;
                e.exports = function(e) {
                    var t = r.detectBrowser(e),
                        n = e && e.navigator,
                        o = e && e.MediaStreamTrack,
                        a = function(e) {
                            return {
                                name: {
                                    InternalError: "NotReadableError",
                                    NotSupportedError: "TypeError",
                                    PermissionDeniedError: "NotAllowedError",
                                    SecurityError: "NotAllowedError"
                                } [e.name] || e.name,
                                message: {
                                    "The operation is insecure.": "The request is not allowed by the user agent or the platform in the current context."
                                } [e.message] || e.message,
                                constraint: e.constraint,
                                toString: function() {
                                    return this.name + (this.message && ": ") + this.message
                                }
                            }
                        },
                        s = function(e, r, o) {
                            var s = function(e) {
                                if ("object" != typeof e || e.require) return e;
                                var t = [];
                                return Object.keys(e).forEach(function(n) {
                                    if ("require" !== n && "advanced" !== n && "mediaSource" !== n) {
                                        var r = e[n] = "object" == typeof e[n] ? e[n] : {
                                            ideal: e[n]
                                        };
                                        if (void 0 === r.min && void 0 === r.max && void 0 === r.exact || t.push(n), void 0 !== r.exact && ("number" == typeof r.exact ? r.min = r.max = r.exact: e[n] = r.exact, delete r.exact), void 0 !== r.ideal) {
                                            e.advanced = e.advanced || [];
                                            var i = {};
                                            "number" == typeof r.ideal ? i[n] = {
                                                min: r.ideal,
                                                max: r.ideal
                                            }: i[n] = r.ideal,
                                                e.advanced.push(i),
                                                delete r.ideal,
                                            Object.keys(r).length || delete e[n]
                                        }
                                    }
                                }),
                                t.length && (e.require = t),
                                    e
                            };
                            return e = JSON.parse(JSON.stringify(e)),
                            t.version < 38 && (i("spec: " + JSON.stringify(e)), e.audio && (e.audio = s(e.audio)), e.video && (e.video = s(e.video)), i("ff37: " + JSON.stringify(e))),
                                n.mozGetUserMedia(e, r,
                                    function(e) {
                                        o(a(e))
                                    })
                        };
                    if (n.mediaDevices || (n.mediaDevices = {
                        getUserMedia: function(e) {
                            return new Promise(function(t, n) {
                                s(e, t, n)
                            })
                        },
                        addEventListener: function() {},
                        removeEventListener: function() {}
                    }), n.mediaDevices.enumerateDevices = n.mediaDevices.enumerateDevices ||
                        function() {
                            return new Promise(function(e) {
                                e([{
                                    kind: "audioinput",
                                    deviceId: "default",
                                    label: "",
                                    groupId: ""
                                },
                                    {
                                        kind: "videoinput",
                                        deviceId: "default",
                                        label: "",
                                        groupId: ""
                                    }])
                            })
                        },
                    t.version < 41) {
                        var c = n.mediaDevices.enumerateDevices.bind(n.mediaDevices);
                        n.mediaDevices.enumerateDevices = function() {
                            return c().then(void 0,
                                function(e) {
                                    if ("NotFoundError" === e.name) return [];
                                    throw e
                                })
                        }
                    }
                    if (t.version < 49) {
                        var d = n.mediaDevices.getUserMedia.bind(n.mediaDevices);
                        n.mediaDevices.getUserMedia = function(e) {
                            return d(e).then(function(t) {
                                    if (e.audio && !t.getAudioTracks().length || e.video && !t.getVideoTracks().length) throw t.getTracks().forEach(function(e) {
                                        e.stop()
                                    }),
                                        new DOMException("The object can not be found here.", "NotFoundError");
                                    return t
                                },
                                function(e) {
                                    return Promise.reject(a(e))
                                })
                        }
                    }
                    if (! (t.version > 55 && "autoGainControl" in n.mediaDevices.getSupportedConstraints())) {
                        var u = function(e, t, n) {
                                t in e && !(n in e) && (e[n] = e[t], delete e[t])
                            },
                            l = n.mediaDevices.getUserMedia.bind(n.mediaDevices);
                        if (n.mediaDevices.getUserMedia = function(e) {
                            return "object" == typeof e && "object" == typeof e.audio && (e = JSON.parse(JSON.stringify(e)), u(e.audio, "autoGainControl", "mozAutoGainControl"), u(e.audio, "noiseSuppression", "mozNoiseSuppression")),
                                l(e)
                        },
                        o && o.prototype.getSettings) {
                            var p = o.prototype.getSettings;
                            o.prototype.getSettings = function() {
                                var e = p.apply(this, arguments);
                                return u(e, "mozAutoGainControl", "autoGainControl"),
                                    u(e, "mozNoiseSuppression", "noiseSuppression"),
                                    e
                            }
                        }
                        if (o && o.prototype.applyConstraints) {
                            var f = o.prototype.applyConstraints;
                            o.prototype.applyConstraints = function(e) {
                                return "audio" === this.kind && "object" == typeof e && (e = JSON.parse(JSON.stringify(e)), u(e, "autoGainControl", "mozAutoGainControl"), u(e, "noiseSuppression", "mozNoiseSuppression")),
                                    f.apply(this, [e])
                            }
                        }
                    }
                    n.getUserMedia = function(e, i, o) {
                        if (t.version < 44) return s(e, i, o);
                        r.deprecated("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"),
                            n.mediaDevices.getUserMedia(e).then(i, o)
                    }
                }
            },
            function(e, t, n) {
                "use strict";
                var r = n(0);
                e.exports = {
                    shimLocalStreamsAPI: function(e) {
                        if ("object" == typeof e && e.RTCPeerConnection) {
                            if ("getLocalStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getLocalStreams = function() {
                                return this._localStreams || (this._localStreams = []),
                                    this._localStreams
                            }), "getStreamById" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getStreamById = function(e) {
                                var t = null;
                                return this._localStreams && this._localStreams.forEach(function(n) {
                                    n.id === e && (t = n)
                                }),
                                this._remoteStreams && this._remoteStreams.forEach(function(n) {
                                    n.id === e && (t = n)
                                }),
                                    t
                            }), !("addStream" in e.RTCPeerConnection.prototype)) {
                                var t = e.RTCPeerConnection.prototype.addTrack;
                                e.RTCPeerConnection.prototype.addStream = function(e) {
                                    this._localStreams || (this._localStreams = []),
                                    -1 === this._localStreams.indexOf(e) && this._localStreams.push(e);
                                    var n = this;
                                    e.getTracks().forEach(function(r) {
                                        t.call(n, r, e)
                                    })
                                },
                                    e.RTCPeerConnection.prototype.addTrack = function(e, n) {
                                        return n && (this._localStreams ? -1 === this._localStreams.indexOf(n) && this._localStreams.push(n) : this._localStreams = [n]),
                                            t.call(this, e, n)
                                    }
                            }
                            "removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream = function(e) {
                                this._localStreams || (this._localStreams = []);
                                var t = this._localStreams.indexOf(e);
                                if ( - 1 !== t) {
                                    this._localStreams.splice(t, 1);
                                    var n = this,
                                        r = e.getTracks();
                                    this.getSenders().forEach(function(e) { - 1 !== r.indexOf(e.track) && n.removeTrack(e)
                                    })
                                }
                            })
                        }
                    },
                    shimRemoteStreamsAPI: function(e) {
                        if ("object" == typeof e && e.RTCPeerConnection && ("getRemoteStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getRemoteStreams = function() {
                            return this._remoteStreams ? this._remoteStreams: []
                        }), !("onaddstream" in e.RTCPeerConnection.prototype))) {
                            Object.defineProperty(e.RTCPeerConnection.prototype, "onaddstream", {
                                get: function() {
                                    return this._onaddstream
                                },
                                set: function(e) {
                                    this._onaddstream && this.removeEventListener("addstream", this._onaddstream),
                                        this.addEventListener("addstream", this._onaddstream = e)
                                }
                            });
                            var t = e.RTCPeerConnection.prototype.setRemoteDescription;
                            e.RTCPeerConnection.prototype.setRemoteDescription = function() {
                                var e = this;
                                return this._onaddstreampoly || this.addEventListener("track", this._onaddstreampoly = function(t) {
                                    t.streams.forEach(function(t) {
                                        if (e._remoteStreams || (e._remoteStreams = []), !(e._remoteStreams.indexOf(t) >= 0)) {
                                            e._remoteStreams.push(t);
                                            var n = new Event("addstream");
                                            n.stream = t,
                                                e.dispatchEvent(n)
                                        }
                                    })
                                }),
                                    t.apply(e, arguments)
                            }
                        }
                    },
                    shimCallbacksAPI: function(e) {
                        if ("object" == typeof e && e.RTCPeerConnection) {
                            var t = e.RTCPeerConnection.prototype,
                                n = t.createOffer,
                                r = t.createAnswer,
                                i = t.setLocalDescription,
                                o = t.setRemoteDescription,
                                a = t.addIceCandidate;
                            t.createOffer = function(e, t) {
                                var r = arguments.length >= 2 ? arguments[2] : arguments[0],
                                    i = n.apply(this, [r]);
                                return t ? (i.then(e, t), Promise.resolve()) : i
                            },
                                t.createAnswer = function(e, t) {
                                    var n = arguments.length >= 2 ? arguments[2] : arguments[0],
                                        i = r.apply(this, [n]);
                                    return t ? (i.then(e, t), Promise.resolve()) : i
                                };
                            var s = function(e, t, n) {
                                var r = i.apply(this, [e]);
                                return n ? (r.then(t, n), Promise.resolve()) : r
                            };
                            t.setLocalDescription = s,
                                s = function(e, t, n) {
                                    var r = o.apply(this, [e]);
                                    return n ? (r.then(t, n), Promise.resolve()) : r
                                },
                                t.setRemoteDescription = s,
                                s = function(e, t, n) {
                                    var r = a.apply(this, [e]);
                                    return n ? (r.then(t, n), Promise.resolve()) : r
                                },
                                t.addIceCandidate = s
                        }
                    },
                    shimGetUserMedia: function(e) {
                        var t = e && e.navigator;
                        t.getUserMedia || (t.webkitGetUserMedia ? t.getUserMedia = t.webkitGetUserMedia.bind(t) : t.mediaDevices && t.mediaDevices.getUserMedia && (t.getUserMedia = function(e, n, r) {
                            t.mediaDevices.getUserMedia(e).then(n, r)
                        }.bind(t)))
                    },
                    shimRTCIceServerUrls: function(e) {
                        var t = e.RTCPeerConnection;
                        e.RTCPeerConnection = function(e, n) {
                            if (e && e.iceServers) {
                                for (var i = [], o = 0; o < e.iceServers.length; o++) {
                                    var a = e.iceServers[o]; ! a.hasOwnProperty("urls") && a.hasOwnProperty("url") ? (r.deprecated("RTCIceServer.url", "RTCIceServer.urls"), (a = JSON.parse(JSON.stringify(a))).urls = a.url, delete a.url, i.push(a)) : i.push(e.iceServers[o])
                                }
                                e.iceServers = i
                            }
                            return new t(e, n)
                        },
                            e.RTCPeerConnection.prototype = t.prototype,
                        "generateCertificate" in e.RTCPeerConnection && Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
                            get: function() {
                                return t.generateCertificate
                            }
                        })
                    },
                    shimTrackEventTransceiver: function(e) {
                        "object" == typeof e && e.RTCPeerConnection && "receiver" in e.RTCTrackEvent.prototype && !e.RTCTransceiver && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
                            get: function() {
                                return {
                                    receiver: this.receiver
                                }
                            }
                        })
                    },
                    shimCreateOfferLegacy: function(e) {
                        var t = e.RTCPeerConnection.prototype.createOffer;
                        e.RTCPeerConnection.prototype.createOffer = function(e) {
                            var n = this;
                            if (e) {
                                void 0 !== e.offerToReceiveAudio && (e.offerToReceiveAudio = !!e.offerToReceiveAudio);
                                var r = n.getTransceivers().find(function(e) {
                                    return e.sender.track && "audio" === e.sender.track.kind
                                }); false === e.offerToReceiveAudio && r ? "sendrecv" === r.direction ? r.setDirection ? r.setDirection("sendonly") : r.direction = "sendonly": "recvonly" === r.direction && (r.setDirection ? r.setDirection("inactive") : r.direction = "inactive") : true !== e.offerToReceiveAudio || r || n.addTransceiver("audio"),
                                void 0 !== e.offerToReceiveVideo && (e.offerToReceiveVideo = !!e.offerToReceiveVideo);
                                var i = n.getTransceivers().find(function(e) {
                                    return e.sender.track && "video" === e.sender.track.kind
                                }); false === e.offerToReceiveVideo && i ? "sendrecv" === i.direction ? i.setDirection("sendonly") : "recvonly" === i.direction && i.setDirection("inactive") : true !== e.offerToReceiveVideo || i || n.addTransceiver("video")
                            }
                            return t.apply(n, arguments)
                        }
                    }
                }
            },
            function(e, t, n) {
                "use strict";
                var r = n(1),
                    i = n(0);
                e.exports = {
                    shimRTCIceCandidate: function(e) {
                        if (e.RTCIceCandidate && !(e.RTCIceCandidate && "foundation" in e.RTCIceCandidate.prototype)) {
                            var t = e.RTCIceCandidate;
                            e.RTCIceCandidate = function(e) {
                                if ("object" == typeof e && e.candidate && 0 === e.candidate.indexOf("a=") && ((e = JSON.parse(JSON.stringify(e))).candidate = e.candidate.substr(2)), e.candidate && e.candidate.length) {
                                    var n = new t(e),
                                        i = r.parseCandidate(e.candidate),
                                        o = Object.assign(n, i);
                                    return o.toJSON = function() {
                                        return {
                                            candidate: o.candidate,
                                            sdpMid: o.sdpMid,
                                            sdpMLineIndex: o.sdpMLineIndex,
                                            usernameFragment: o.usernameFragment
                                        }
                                    },
                                        o
                                }
                                return new t(e)
                            },
                                e.RTCIceCandidate.prototype = t.prototype,
                                i.wrapPeerConnectionEvent(e, "icecandidate",
                                    function(t) {
                                        return t.candidate && Object.defineProperty(t, "candidate", {
                                            value: new e.RTCIceCandidate(t.candidate),
                                            writable: "false"
                                        }),
                                            t
                                    })
                        }
                    },
                    shimCreateObjectURL: function(e) {
                        var t = e && e.URL;
                        if ("object" == typeof e && e.HTMLMediaElement && "srcObject" in e.HTMLMediaElement.prototype && t.createObjectURL && t.revokeObjectURL) {
                            var n = t.createObjectURL.bind(t),
                                r = t.revokeObjectURL.bind(t),
                                o = new Map,
                                a = 0;
                            t.createObjectURL = function(e) {
                                if ("getTracks" in e) {
                                    var t = "polyblob:" + ++a;
                                    return o.set(t, e),
                                        i.deprecated("URL.createObjectURL(stream)", "elem.srcObject = stream"),
                                        t
                                }
                                return n(e)
                            },
                                t.revokeObjectURL = function(e) {
                                    r(e),
                                        o.delete(e)
                                };
                            var s = Object.getOwnPropertyDescriptor(e.HTMLMediaElement.prototype, "src");
                            Object.defineProperty(e.HTMLMediaElement.prototype, "src", {
                                get: function() {
                                    return s.get.apply(this)
                                },
                                set: function(e) {
                                    return this.srcObject = o.get(e) || null,
                                        s.set.apply(this, [e])
                                }
                            });
                            var c = e.HTMLMediaElement.prototype.setAttribute;
                            e.HTMLMediaElement.prototype.setAttribute = function() {
                                return 2 === arguments.length && "src" === ("" + arguments[0]).toLowerCase() && (this.srcObject = o.get(arguments[1]) || null),
                                    c.apply(this, arguments)
                            }
                        }
                    },
                    shimMaxMessageSize: function(e) {
                        if (!e.RTCSctpTransport && e.RTCPeerConnection) {
                            var t = i.detectBrowser(e);
                            "sctp" in e.RTCPeerConnection.prototype || Object.defineProperty(e.RTCPeerConnection.prototype, "sctp", {
                                get: function() {
                                    return void 0 === this._sctp ? null: this._sctp
                                }
                            });
                            var n = e.RTCPeerConnection.prototype.setRemoteDescription;
                            e.RTCPeerConnection.prototype.setRemoteDescription = function() {
                                var e, i, o, a;
                                if (this._sctp = null, o = arguments[0], (a = r.splitSections(o.sdp)).shift(), a.some(function(e) {
                                    var t = r.parseMLine(e);
                                    return t && "application" === t.kind && -1 !== t.protocol.indexOf("SCTP")
                                })) {
                                    var s, c = function(e) {
                                            var t = e.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
                                            if (null === t || t.length < 2) return - 1;
                                            var n = parseInt(t[1], 10);
                                            return n != n ? -1 : n
                                        } (arguments[0]),
                                        d = (e = c, i = 65536, "firefox" === t.browser && (i = t.version < 57 ? -1 === e ? 16384 : 2147483637 : t.version < 60 ? 57 === t.version ? 65535 : 65536 : 2147483637), i),
                                        u = function(e, n) {
                                            var i = 65536;
                                            "firefox" === t.browser && 57 === t.version && (i = 65535);
                                            var o = r.matchPrefix(e.sdp, "a=max-message-size:");
                                            return o.length > 0 ? i = parseInt(o[0].substr(19), 10) : "firefox" === t.browser && -1 !== n && (i = 2147483637),
                                                i
                                        } (arguments[0], c);
                                    s = 0 === d && 0 === u ? Number.POSITIVE_INFINITY: 0 === d || 0 === u ? Math.max(d, u) : Math.min(d, u);
                                    var l = {};
                                    Object.defineProperty(l, "maxMessageSize", {
                                        get: function() {
                                            return s
                                        }
                                    }),
                                        this._sctp = l
                                }
                                return n.apply(this, arguments)
                            }
                        }
                    },
                    shimSendThrowTypeError: function(e) {
                        if (e.RTCPeerConnection && "createDataChannel" in e.RTCPeerConnection.prototype) {
                            var t = e.RTCPeerConnection.prototype.createDataChannel;
                            e.RTCPeerConnection.prototype.createDataChannel = function() {
                                var e = t.apply(this, arguments);
                                return n(e, this),
                                    e
                            },
                                i.wrapPeerConnectionEvent(e, "datachannel",
                                    function(e) {
                                        return n(e.channel, e.target),
                                            e
                                    })
                        }
                        function n(e, t) {
                            var n = e.send;
                            e.send = function() {
                                var r = arguments[0],
                                    i = r.length || r.size || r.byteLength;
                                if ("open" === e.readyState && t.sctp && i > t.sctp.maxMessageSize) throw new TypeError("Message too large (can send a maximum of " + t.sctp.maxMessageSize + " bytes)");
                                return n.apply(e, arguments)
                            }
                        }
                    }
                }
            },
            function(e, t, n) {
                "use strict";
                n.r(t);
                var r, SLogLevel, o = (r = function(e, t) {
                        return (r = Object.setPrototypeOf || {
                                __proto__: []
                            }
                            instanceof Array &&
                            function(e, t) {
                                e.__proto__ = t
                            } ||
                            function(e, t) {
                                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                            })(e, t)
                    },
                        function(e, t) {
                            function n() {
                                this.constructor = e
                            }
                            r(e, t),
                                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                        }),
                    Queue = function() {
                        function e() {
                            this.mArr = new Array
                        }
                        return e.prototype.Enqueue = function(e) {
                            this.mArr.push(e)
                        },
                            e.prototype.TryDequeue = function(e) {
                                var t = false;
                                return this.mArr.length > 0 && (e.val = this.mArr.shift(), t = true),
                                    t
                            },
                            e.prototype.Dequeue = function() {
                                return this.mArr.length > 0 ? this.mArr.shift() : null
                            },
                            e.prototype.Peek = function() {
                                return this.mArr.length > 0 ? this.mArr[0] : null
                            },
                            e.prototype.Count = function() {
                                return this.mArr.length
                            },
                            e.prototype.Clear = function() {
                                this.mArr = new Array
                            },
                            e
                    } (),
                    List = function() {
                        function e() {
                            this.mArr = new Array
                        }
                        return Object.defineProperty(e.prototype, "Internal", {
                            get: function() {
                                return this.mArr
                            },
                            enumerable: true,
                            configurable: true
                        }),
                            e.prototype.Add = function(e) {
                                this.mArr.push(e)
                            },
                            Object.defineProperty(e.prototype, "Count", {
                                get: function() {
                                    return this.mArr.length
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            e
                    } (),
                    Output = function() {
                        return function() {}
                    } (),
                    Debug = function() {
                        function e() {}
                        return e.Log = function(e) {
                            SLog.Log(e)
                        },
                            e.LogError = function(e) {
                                SLog.LogError(e)
                            },
                            e.LogWarning = function(e) {
                                SLog.LogWarning(e)
                            },
                            e
                    } (),
                    Encoder = function() {
                        return function() {}
                    } (),
                    UTF16Encoding = function(e) {
                        function t() {
                            return e.call(this) || this
                        }
                        return o(t, e),
                            t.prototype.GetBytes = function(e) {
                                return this.stringToBuffer(e)
                            },
                            t.prototype.GetString = function(e) {
                                return this.bufferToString(e)
                            },
                            t.prototype.bufferToString = function(e) {
                                var t = new Uint16Array(e.buffer, e.byteOffset, e.byteLength / 2);
                                return String.fromCharCode.apply(null, t)
                            },
                            t.prototype.stringToBuffer = function(e) {
                                for (var t = new ArrayBuffer(2 * e.length), n = new Uint16Array(t), r = 0, i = e.length; r < i; r++) n[r] = e.charCodeAt(r);
                                return new Uint8Array(t)
                            },
                            t
                    } (Encoder),
                    Encoding = function() {
                        function e() {}
                        return Object.defineProperty(e, "UTF16", {
                            get: function() {
                                return new UTF16Encoding
                            },
                            enumerable: true,
                            configurable: true
                        }),
                            e
                    } (),
                    Random = function() {
                        function e() {}
                        return e.getRandomInt = function(e, t) {
                            return e = Math.ceil(e),
                                t = Math.floor(t),
                            Math.floor(Math.random() * (t - e)) + e
                        },
                            e
                    } (),
                    Helper = function() {
                        function e() {}
                        return e.tryParseInt = function(e) {
                            try {
                                if (/^(\-|\+)?([0-9]+)$/.test(e)) {
                                    var t = Number(e);
                                    if (0 == isNaN(t)) return t
                                }
                            } catch(e) {}
                            return null
                        },
                            e
                    } (); !
                    function(e) {
                        e[e.None = 0] = "None",
                            e[e.Errors = 1] = "Errors",
                            e[e.Warnings = 2] = "Warnings",
                            e[e.Info = 3] = "Info"
                    } (SLogLevel || (SLogLevel = {}));
                var NetEventType, NetEventDataType, SLog = function() {
                    function e() {}
                    return e.SetLogLevel = function(t) {
                        e.sLogLevel = t
                    },
                        e.RequestLogLevel = function(t) {
                            t > e.sLogLevel && (e.sLogLevel = t)
                        },
                        e.L = function(t, n) {
                            e.Log(t, n)
                        },
                        e.LW = function(t, n) {
                            e.LogWarning(t, n)
                        },
                        e.LE = function(t, n) {
                            e.LogError(t, n)
                        },
                        e.Log = function(t, n) {
                            //console.log("e.sLogLevel",SLogLevel[e.sLogLevel]);
                            //console.log("e.sLogLevel",e.sLogLevel >= SLogLevel.Info);
                            n || (n = ""),
                            e.sLogLevel >= SLogLevel.Info && console.log(t, n)
                        },
                        e.LogWarning = function(t, n) {
                            n || (n = ""),
                            e.sLogLevel >= SLogLevel.Warnings && console.warn(t, n)
                        },
                        e.LogError = function(t, n) {
                            n || (n = ""),
                            e.sLogLevel >= SLogLevel.Errors && console.error(t, n)
                        },
                        //e.sLogLevel = SLogLevel.Warnings,
                        e.sLogLevel = SLogLevel.Info,//[NEW]
                        e
                } (); !
                    function(e) {
                        e[e.Invalid = 0] = "Invalid",
                            e[e.UnreliableMessageReceived = 1] = "UnreliableMessageReceived",
                            e[e.ReliableMessageReceived = 2] = "ReliableMessageReceived",
                            e[e.ServerInitialized = 3] = "ServerInitialized",
                            e[e.ServerInitFailed = 4] = "ServerInitFailed",
                            e[e.ServerClosed = 5] = "ServerClosed",
                            e[e.NewConnection = 6] = "NewConnection",
                            e[e.ConnectionFailed = 7] = "ConnectionFailed",
                            e[e.Disconnected = 8] = "Disconnected",
                            e[e.FatalError = 100] = "FatalError",
                            e[e.Warning = 101] = "Warning",
                            e[e.Log = 102] = "Log",
                            e[e.ReservedStart = 200] = "ReservedStart",
                            e[e.MetaVersion = 201] = "MetaVersion",
                            e[e.MetaHeartbeat = 202] = "MetaHeartbeat"
                    } (NetEventType || (NetEventType = {})),
                    function(e) {
                        e[e.Null = 0] = "Null",
                            e[e.ByteArray = 1] = "ByteArray",
                            e[e.UTF16String = 2] = "UTF16String"
                    } (NetEventDataType || (NetEventDataType = {}));
                var WebRtcPeerState, WebRtcInternalState, NetworkEvent = function() {
                        function InnerNetworkEvent(type, id, data) {
                            //console.error(">>>>>>>>> InnerNetworkEvent.ctor",data)
                            this.type = type,
                                this.connectionId = id,
                                this.data = data
                        }
                        return Object.defineProperty(InnerNetworkEvent.prototype, "RawData", {
                            get: function() {
                                return this.data
                            },
                            enumerable: true,
                            configurable: true
                        }),
                            Object.defineProperty(InnerNetworkEvent.prototype, "MessageData", {
                                get: function() {
                                    return "string" != typeof this.data ? this.data: null
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerNetworkEvent.prototype, "MessageString", { //[NEW]
                                get: function() {
                                    if("string" == typeof this.data){
                                        return this.data;//[NEW]
                                    }else{
                                        //相当于原来的this.BufferToString(e.MessageData)
                                        var e=this.data;
                                        var t = new Uint16Array(e.buffer, e.byteOffset, e.byteLength / 2);
                                        return String.fromCharCode.apply(null, t)
                                    }
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerNetworkEvent.prototype, "Info", {
                                get: function() {
                                    return "string" == typeof this.data ? this.data: null
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerNetworkEvent.prototype, "Type", {
                                get: function() {
                                    return this.type
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerNetworkEvent.prototype, "ConnectionId", {
                                get: function() {
                                    return this.connectionId
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            InnerNetworkEvent.prototype.toString = function() {
                                var e = "NetworkEvent[";
                                return e += "NetEventType: (",
                                    e += NetEventType[this.type],
                                    e += "), id: (",
                                    e += this.connectionId.id,
                                    e += "), Data: (",
                                "string" == typeof this.data && (e += this.data),
                                    e += ")]"
                            },
                            InnerNetworkEvent.parseFromString = function(t) {
                                console.log(">>>>>>>>>>>>>>> parseFromString",t);
                                var n, r = JSON.parse(t);
                                if (null == r.data) n = null;
                                else if ("string" == typeof r.data) n = r.data;
                                else if ("object" == typeof r.data) {
                                    var i = r.data;
                                    for (var o in i) 0;
                                    for (var a = new Uint8Array(Object.keys(i).length), s = 0; s < a.length; s++) a[s] = i[s];
                                    n = a
                                } else SLog.LogError("network event can't be parsed: " + t);
                                var newE= new InnerNetworkEvent(r.type, r.connectionId, n);
                                console.log(">>>>>>>>>>>>>>> newE",newE);
                                return newE;
                            },
                            InnerNetworkEvent.toString = function(e) {
                                return JSON.stringify(e)
                            },
                            InnerNetworkEvent.fromByteArray = function(t) {
                                console.log(">>>>>>>>>>>>>>> fromByteArray",t);
                                var n = new Uint8Array(t),
                                    r = n[0],
                                    i = n[1],
                                    o = new Int16Array(n.buffer, n.byteOffset + 2, 1)[0],
                                    a = null;
                                if (i == NetEventDataType.ByteArray) {
                                    var s = new Uint32Array(n.buffer, n.byteOffset + 4, 1)[0];
                                    a = new Uint8Array(n.buffer, n.byteOffset + 8, s)
                                } else if (i == NetEventDataType.UTF16String) {
                                    for (var c = new Uint32Array(n.buffer, n.byteOffset + 4, 1)[0], d = new Uint16Array(n.buffer, n.byteOffset + 8, c), u = "", l = 0; l < d.length; l++) u += String.fromCharCode(d[l]);
                                    a = u
                                } else if (i != NetEventDataType.Null) throw new Error("Message has an invalid data type flag: " + i);
                                var newE= new InnerNetworkEvent(r, new ConnectionId(o), a);
                                console.log(">>>>>>>>>>>>>>> newE",newE);
                                return newE;
                            },
                            InnerNetworkEvent.toByteArray = function(evnt) {
                                var t, n = 4;
                                if (null == evnt.data) t = NetEventDataType.Null;
                                else if ("string" == typeof evnt.data) {
                                    t = NetEventDataType.UTF16String,
                                        n += 2 * (a = evnt.data).length + 4
                                } else {
                                    t = NetEventDataType.ByteArray,
                                        n += 4 + (i = evnt.data).length
                                }
                                var array = new Uint8Array(n);
                                if (array[0] = evnt.type, array[1] = t, new Int16Array(array.buffer, array.byteOffset + 2, 1)[0] = evnt.connectionId.id, t == NetEventDataType.ByteArray) {
                                    var i = evnt.data;
                                    new Uint32Array(array.buffer, array.byteOffset + 4, 1)[0] = i.length;
                                    for (var o = 0; o < i.length; o++) array[8 + o] = i[o]
                                } else if (t == NetEventDataType.UTF16String) {
                                    var a = evnt.data;
                                    new Uint32Array(array.buffer, array.byteOffset + 4, 1)[0] = a.length;
                                    var s = new Uint16Array(array.buffer, array.byteOffset + 8, a.length);
                                    for (o = 0; o < s.length; o++) s[o] = a.charCodeAt(o)
                                }
                                return array
                            },
                            InnerNetworkEvent
                    } (),
                    ConnectionId = function() {
                        function InnerConnectionId(id) {
                            this.id = id
                        }
                        return InnerConnectionId.INVALID = new InnerConnectionId( - 1),
                            InnerConnectionId
                    } (),
                    I = function() {
                        var e = function(t, n) {
                            return (e = Object.setPrototypeOf || {
                                    __proto__: []
                                }
                                instanceof Array &&
                                function(e, t) {
                                    e.__proto__ = t
                                } ||
                                function(e, t) {
                                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                                })(t, n)
                        };
                        return function(t, n) {
                            function r() {
                                this.constructor = t
                            }
                            e(t, n),
                                t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                        }
                    } (),
                    SignalingConfig = function() {
                        function InnerSignalingConfig(network) {
                            this.mNetwork = network
                        }
                        return InnerSignalingConfig.prototype.GetNetwork = function() {
                            return this.mNetwork
                        },
                            InnerSignalingConfig
                    } (),
                    SignalingInfo = function() {
                        function InnerSignalingInfo(cId, isIncoming, time) {
                            this.mConnectionId = cId,
                                this.mIsIncoming = isIncoming,
                                this.mCreationTime = time,
                                this.mSignalingConnected = true
                        }
                        return InnerSignalingInfo.prototype.IsSignalingConnected = function() {
                            return this.mSignalingConnected
                        },
                            Object.defineProperty(InnerSignalingInfo.prototype, "ConnectionId", {
                                get: function() {
                                    return this.mConnectionId
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            InnerSignalingInfo.prototype.IsIncoming = function() {
                                return this.mIsIncoming
                            },
                            InnerSignalingInfo.prototype.GetCreationTimeMs = function() {
                                return Date.now() - this.mCreationTime
                            },
                            InnerSignalingInfo.prototype.SignalingDisconnected = function() {
                                this.mSignalingConnected = false
                            },
                            InnerSignalingInfo
                    } (); !
                    function(e) {
                        e[e.Invalid = 0] = "Invalid",
                            e[e.Created = 1] = "Created",
                            e[e.Signaling = 2] = "Signaling",
                            e[e.SignalingFailed = 3] = "SignalingFailed",
                            e[e.Connected = 4] = "Connected",
                            e[e.Closing = 5] = "Closing",
                            e[e.Closed = 6] = "Closed"
                    } (WebRtcPeerState || (WebRtcPeerState = {})),
                    function(e) {
                        e[e.None = 0] = "None",
                            e[e.Signaling = 1] = "Signaling",
                            e[e.SignalingFailed = 2] = "SignalingFailed",
                            e[e.Connected = 3] = "Connected",
                            e[e.Closed = 4] = "Closed"
                    } (WebRtcInternalState || (WebRtcInternalState = {}));
                var WebRtcNetworkServerState, AWebRtcPeer = function() {
                        function InnerAWebRtcPeer(rtcConfig) {
                            console.log(">>>>>>> InnerAWebRtcPeer.ctor",rtcConfig);
                            this.mState = WebRtcPeerState.Invalid,
                                this.mRtcInternalState = WebRtcInternalState.None,
                                this.mIncomingSignalingQueue = new Queue,
                                this.mOutgoingSignalingQueue = new Queue,
                                this.mDidSendRandomNumber = false,
                                this.mRandomNumerSent = 0,
                                this.mOfferOptions = {
                                    offerToReceiveAudio: false,
                                    offerToReceiveVideo: false
                                },
                                this.SetupPeer(rtcConfig),
                                this.OnSetup(),
                                this.mState = WebRtcPeerState.Created
                        }
                        return InnerAWebRtcPeer.prototype.GetState = function() {
                            return this.mState
                        },
                            InnerAWebRtcPeer.prototype.SetupPeer = function(rtcConfig) {
                                console.log(">>>>>>> AWebRtcPeer.SetupPeer",rtcConfig);
                                var t = this;
                                this.mPeer = new RTCPeerConnection(rtcConfig),
                                    this.mPeer.onicecandidate = function(evnt) {
                                        console.log(">>>>>>> onicecandidate",evnt);
                                        t.OnIceCandidate(evnt)
                                    },
                                    this.mPeer.oniceconnectionstatechange = function(evnt) {
                                        console.log(">>>>>>> oniceconnectionstatechange",evnt);
                                        t.OnIceConnectionChange()
                                    },
                                    this.mPeer.onnegotiationneeded = function(evnt) {
                                        console.log(">>>>>>> onnegotiationneeded",evnt);
                                        t.OnRenegotiationNeeded()
                                    },
                                    this.mPeer.onsignalingstatechange = function(evnt) {
                                        console.log(">>>>>>> onsignalingstatechange",evnt);
                                        t.OnSignalingChange()
                                    }
                            },
                            InnerAWebRtcPeer.prototype.DisposeInternal = function() {
                                this.Cleanup()
                            },
                            InnerAWebRtcPeer.prototype.Dispose = function() {
                                null != this.mPeer && this.DisposeInternal()
                            },
                            InnerAWebRtcPeer.prototype.Cleanup = function() {
                                this.mState != WebRtcPeerState.Closed && this.mState != WebRtcPeerState.Closing && (this.mState = WebRtcPeerState.Closing, this.OnCleanup(), null != this.mPeer && this.mPeer.close(), this.mState = WebRtcPeerState.Closed)
                            },
                            InnerAWebRtcPeer.prototype.Update = function() {
                                var stateName=WebRtcPeerState[this.mState];
                                this.mState != WebRtcPeerState.Closed && this.mState != WebRtcPeerState.Closing && this.mState != WebRtcPeerState.SignalingFailed && this.UpdateState(),
                                this.mState != WebRtcPeerState.Signaling && this.mState != WebRtcPeerState.Created || this.HandleIncomingSignaling()
                            },
                            InnerAWebRtcPeer.prototype.UpdateState = function() {
                                var stateName=WebRtcInternalState[this.mRtcInternalState];
                                this.mRtcInternalState == WebRtcInternalState.Closed ? this.Cleanup() : this.mRtcInternalState == WebRtcInternalState.SignalingFailed
                                    ? this.mState = WebRtcPeerState.SignalingFailed: this.mRtcInternalState == WebRtcInternalState.Connected && (this.mState = WebRtcPeerState.Connected)
                            },
                            InnerAWebRtcPeer.prototype.HandleIncomingSignaling = function() {
                                /*
                                InnerAWebRtcPeer.HandleIncomingSignaling	@	awrtc.js:3464
                                InnerAWebRtcPeer.Update	@	awrtc.js:3457
                                InnerMediaPeer.Update	@	awrtc.js:5694
                                InnerWebRtcNetwork.CheckSignalingState	@	awrtc.js:3878
                                InnerWebRtcNetwork.Update	@	awrtc.js:3823
                                InnerBrowserMediaNetwork.Update	@	awrtc.js:5942
                                InnerAWebRtcCall.Update
                                    */
                                for (; this.mIncomingSignalingQueue.Count() > 0;) {
                                    var data = this.mIncomingSignalingQueue.Dequeue();
                                    t = Helper.tryParseInt(data);
                                    if (null != t) {
                                        this.mDidSendRandomNumber && (t < this.mRandomNumerSent ? (SLog.L("Signaling negotiation complete. Starting signaling."), this.StartSignaling()) : t == this.mRandomNumerSent ? this.NegotiateSignaling() : SLog.L("Signaling negotiation complete. Waiting for signaling."));
                                    }
                                    else {
                                        // if(AWebRtcPeer.SourceType == "H5Stream"){//[NEW]
                                        //     var state1=WebRtcInternalState[this.mRtcInternalState];
                                        //     this.RtcSetSignalingStarted();
                                        //     this.RtcSetConnected();
                                        //     var state2=WebRtcInternalState[this.mRtcInternalState];
                                        //     // 这个加上，虽然能让mRtcInternalState变成connected，但是会导致视频出不来
                                        // }
                                        var answer = JSON.parse(data);
                                        console.log(">>>>>>>>>  InnerAWebRtcPeer.prototype.HandleIncomingSignaling",answer);
                                        if (answer.sdp) {
                                            var description = new RTCSessionDescription(answer);
                                            console.log(">>>>>>>>>  Answer",description);
                                            "offer" == description.type ? this.CreateAnswer(description) : this.RecAnswer(description)
                                        } else {
                                            var candidate = new RTCIceCandidate(answer);
                                            console.log(">>>>>>>>>  addIceCandidate",candidate);
                                            if (null != candidate) {
                                                var pro = this.mPeer.addIceCandidate(candidate);
                                                pro.then(function() {}),
                                                    pro.
                                                    catch(function(error) {
                                                        Debug.LogError(error)
                                                    })
                                            }
                                        }
                                    }
                                }
                            },
                            InnerAWebRtcPeer.prototype.AddSignalingMessage = function(e) {
                                //Debug.Log("incoming Signaling message:" + e);
                                this.mIncomingSignalingQueue.Enqueue(e);
                                Debug.Log("incoming Signaling message count:"+this.mIncomingSignalingQueue.Count());
                            },
                            InnerAWebRtcPeer.prototype.DequeueSignalingMessage = function(msg) {
                                return this.mOutgoingSignalingQueue.Count() > 0 ? (msg.val = this.mOutgoingSignalingQueue.Dequeue(), true) : (msg.val = null, false)
                            },
                            InnerAWebRtcPeer.prototype.EnqueueOutgoing = function(e) {
                                Debug.Log("Outgoing Signaling message " + e),
                                    this.mOutgoingSignalingQueue.Enqueue(e)
                            },
                            InnerAWebRtcPeer.prototype.StartSignaling = function() {
                                this.OnStartSignaling(),
                                    this.CreateOffer()
                            },
                            InnerAWebRtcPeer.prototype.NegotiateSignaling = function() {
                                var e = Random.getRandomInt(0, 2147483647);
                                this.mRandomNumerSent = e,
                                    this.mDidSendRandomNumber = true,
                                    this.EnqueueOutgoing("" + e)
                            },
                            InnerAWebRtcPeer.prototype.CreateOffer = function() {
                                var rtcPeer = this;
                                Debug.Log("CreateOffer");
                                var offerPro = this.mPeer.createOffer(this.mOfferOptions);
                                offerPro.then(function(answer) {
                                    var json = JSON.stringify(answer),
                                        promise = rtcPeer.mPeer.setLocalDescription(answer);
                                    promise.then(function() {
                                        rtcPeer.RtcSetSignalingStarted(),
                                            rtcPeer.EnqueueOutgoing(json)
                                    }),
                                        promise.
                                        catch(function(error) {
                                            Debug.LogError(error),
                                                rtcPeer.RtcSetSignalingFailed()
                                        })
                                }),
                                    offerPro.
                                    catch(function(t) {
                                        Debug.LogError(t),
                                            rtcPeer.RtcSetSignalingFailed()
                                    })
                            },
                            InnerAWebRtcPeer.prototype.CreateAnswer = function(sessionDes) {
                                var rtcPeer = this;
                                console.error("InnerAWebRtcPeer.prototype.CreateAnswer",this.mPeer);
                                var reDesPro = this.mPeer.setRemoteDescription(sessionDes);
                                reDesPro.then(function() {
                                    var answerPro = rtcPeer.mPeer.createAnswer();
                                    answerPro.then(function(e) {
                                        var json = JSON.stringify(e),
                                            locDesPro = rtcPeer.mPeer.setLocalDescription(e);
                                        locDesPro.then(function() {
                                            rtcPeer.RtcSetSignalingStarted(),
                                                rtcPeer.EnqueueOutgoing(json)//这里后续的Update到CheckSignalingState，然后再到WebSocket的send
                                        }),
                                            locDesPro.
                                            catch(function(err) {
                                                Debug.LogError(err),
                                                    rtcPeer.RtcSetSignalingFailed()
                                            })
                                    }),
                                        answerPro.
                                        catch(function(err) {
                                            Debug.LogError(err),
                                                rtcPeer.RtcSetSignalingFailed()
                                        })
                                }),
                                    reDesPro.
                                    catch(function(err) {
                                        Debug.LogError(err),
                                            rtcPeer.RtcSetSignalingFailed()
                                    })
                            },
                            InnerAWebRtcPeer.prototype.RecAnswer = function(e) {
                                var t = this;
                                Debug.Log("RecAnswer");
                                var n = this.mPeer.setRemoteDescription(e);
                                n.then(function() {}),
                                    n.
                                    catch(function(err) {
                                        Debug.LogError(err),
                                            t.RtcSetSignalingFailed()
                                    })
                            },
                            InnerAWebRtcPeer.prototype.RtcSetSignalingStarted = function() {
                                this.mRtcInternalState == WebRtcInternalState.None && (this.mRtcInternalState = WebRtcInternalState.Signaling)
                            },
                            InnerAWebRtcPeer.prototype.RtcSetSignalingFailed = function() {
                                this.mRtcInternalState = WebRtcInternalState.SignalingFailed
                            },
                            InnerAWebRtcPeer.prototype.RtcSetConnected = function() {
                                this.mRtcInternalState == WebRtcInternalState.Signaling && (this.mRtcInternalState = WebRtcInternalState.Connected)
                            },
                            InnerAWebRtcPeer.prototype.RtcSetClosed = function() {
                                this.mRtcInternalState == WebRtcInternalState.Connected && (this.mRtcInternalState = WebRtcInternalState.Closed)
                            },
                            InnerAWebRtcPeer.prototype.OnIceCandidate = function(e) {
                                if (e && e.candidate) {
                                    var t = e.candidate,
                                        n = JSON.stringify(t);
                                    this.EnqueueOutgoing(n)
                                }
                            },
                            InnerAWebRtcPeer.prototype.OnIceConnectionChange = function() {
                                var iceConnState=this.mPeer.iceConnectionState;
                                console.error(">>>>>>>> InnerAWebRtcPeer.prototype.OnIceConnectionChange state:",iceConnState);

                                //"failed" == this.mPeer.iceConnectionState && (this.mState == WebRtcPeerState.Signaling ? this.RtcSetSignalingFailed() : this.mState == WebRtcPeerState.Connected && this.RtcSetClosed());
                                //原来代码

                                //[NEW]
                                var stateName=WebRtcPeerState[this.mState];
                                if("failed" == iceConnState ){ //原来的分支
                                    if(this.mState == WebRtcPeerState.Signaling){
                                        this.RtcSetSignalingFailed();
                                    }
                                    else{
                                        if(this.mState == WebRtcPeerState.Connected){
                                            this.RtcSetClosed();
                                        }
                                    }
                                }else if("checking" == iceConnState){

                                }else if("connected" == iceConnState){//[NEW]
                                    if(this.mState==WebRtcPeerState.Created){//[NEW]设置WebRtcPeerState.Connected
                                        //原本的过程是Created->Signaling->SignalingFailed->Connected
                                        //直接设置Signaling，中间跳过Signaling和SignalingFailed
                                        this.mState=WebRtcPeerState.Connected;
                                    }
                                }else{

                                }
                            },
                            InnerAWebRtcPeer.prototype.OnIceGatheringChange = function() {
                                Debug.Log("InnerAWebRtcPeer.prototype.OnIceGatheringChange",this.mPeer.iceGatheringState)
                            },
                            InnerAWebRtcPeer.prototype.OnRenegotiationNeeded = function() {},
                            InnerAWebRtcPeer.prototype.OnSignalingChange = function() {
                                Debug.Log("InnerAWebRtcPeer.prototype.OnSignalingChange",this.mPeer.signalingState),
                                "closed" == this.mPeer.signalingState && this.RtcSetClosed()
                            },
                            InnerAWebRtcPeer.SourceType="because-why-not",//[NEW]
                            InnerAWebRtcPeer
                    } (),
                    WebRtcDataPeer = function(e) {
                        function InnerWebRtcDataPeer(id, rtcConfig) {
                            console.log(">>>>>>>>>>>> InnerWebRtcDataPeer.ctor",rtcConfig);
                            var r = e.call(this, rtcConfig) || this;
                            return r.mInfo = null,
                                r.mEvents = new Queue,
                                r.mReliableDataChannelReady = false,
                                r.mUnreliableDataChannelReady = false,
                                r.mConnectionId = id,
                                r
                        }
                        return I(InnerWebRtcDataPeer, e),
                            Object.defineProperty(InnerWebRtcDataPeer.prototype, "ConnectionId", {
                                get: function() {
                                    return this.mConnectionId
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerWebRtcDataPeer.prototype, "SignalingInfo", {
                                get: function() {
                                    return this.mInfo
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            InnerWebRtcDataPeer.prototype.SetSignalingInfo = function(e) {
                                this.mInfo = e
                            },
                            InnerWebRtcDataPeer.prototype.OnSetup = function() {
                                var e = this;
                                this.mPeer.ondatachannel = function(t) {
                                    e.OnDataChannel(t.channel)
                                }
                            },
                            InnerWebRtcDataPeer.prototype.OnStartSignaling = function() {
                                this.mReliableDataChannel = this.mPeer.createDataChannel(InnerWebRtcDataPeer.sLabelReliable, {}),
                                    this.RegisterObserverReliable();
                                var e = {
                                    maxRetransmits: 0,
                                    ordered: false
                                };
                                this.mUnreliableDataChannel = this.mPeer.createDataChannel(InnerWebRtcDataPeer.sLabelUnreliable, e),
                                    this.RegisterObserverUnreliable()
                            },
                            InnerWebRtcDataPeer.prototype.OnCleanup = function() {
                                null != this.mReliableDataChannel && this.mReliableDataChannel.close(),
                                null != this.mUnreliableDataChannel && this.mUnreliableDataChannel.close()
                            },
                            InnerWebRtcDataPeer.prototype.RegisterObserverReliable = function() {
                                var e = this;
                                this.mReliableDataChannel.onmessage = function(t) {
                                    e.ReliableDataChannel_OnMessage(t)
                                },
                                    this.mReliableDataChannel.onopen = function(t) {
                                        e.ReliableDataChannel_OnOpen()
                                    },
                                    this.mReliableDataChannel.onclose = function(t) {
                                        e.ReliableDataChannel_OnClose()
                                    },
                                    this.mReliableDataChannel.onerror = function(t) {
                                        e.ReliableDataChannel_OnError("")
                                    }
                            },
                            InnerWebRtcDataPeer.prototype.RegisterObserverUnreliable = function() {
                                var e = this;
                                this.mUnreliableDataChannel.onmessage = function(t) {
                                    e.UnreliableDataChannel_OnMessage(t)
                                },
                                    this.mUnreliableDataChannel.onopen = function(t) {
                                        e.UnreliableDataChannel_OnOpen()
                                    },
                                    this.mUnreliableDataChannel.onclose = function(t) {
                                        e.UnreliableDataChannel_OnClose()
                                    },
                                    this.mUnreliableDataChannel.onerror = function(t) {
                                        e.UnreliableDataChannel_OnError("")
                                    }
                            },
                            InnerWebRtcDataPeer.prototype.SendData = function(e, t) {
                                console.log(">>>>>>>>>>>>> e.prototype.SendData 5",this);
                                console.log("e",e);
                                console.log("t",t);

                                var n = e,
                                    r = false;
                                try {
                                    t ? "open" === this.mReliableDataChannel.readyState && this.mReliableDataChannel.bufferedAmount + n.byteLength < 1048576 && (this.mReliableDataChannel.send(n), r = true) : "open" === this.mUnreliableDataChannel.readyState && this.mUnreliableDataChannel.bufferedAmount + n.byteLength < 1048576 && (this.mUnreliableDataChannel.send(n), r = true)
                                } catch(e) {
                                    SLog.LogError("Exception while trying to send: " + e)
                                }
                                return r
                            },
                            InnerWebRtcDataPeer.prototype.GetBufferedAmount = function(e) {
                                var t = -1;
                                try {
                                    e ? "open" === this.mReliableDataChannel.readyState && (t = this.mReliableDataChannel.bufferedAmount) : "open" === this.mUnreliableDataChannel.readyState && (t = this.mUnreliableDataChannel.bufferedAmount)
                                } catch(e) {
                                    SLog.LogError("Exception while trying to access GetBufferedAmount: " + e)
                                }
                                return t
                            },
                            InnerWebRtcDataPeer.prototype.DequeueEvent = function(e) {
                                return this.mEvents.Count() > 0 && (e.val = this.mEvents.Dequeue(), true)
                            },
                            InnerWebRtcDataPeer.prototype.Enqueue = function(e) {
                                this.mEvents.Enqueue(e)
                            },
                            InnerWebRtcDataPeer.prototype.OnDataChannel = function(e) {
                                var n = e;
                                n.label == InnerWebRtcDataPeer.sLabelReliable ? (this.mReliableDataChannel = n, this.RegisterObserverReliable()) : n.label == InnerWebRtcDataPeer.sLabelUnreliable ? (this.mUnreliableDataChannel = n, this.RegisterObserverUnreliable()) : Debug.LogError("Datachannel with unexpected label " + n.label)
                            },
                            InnerWebRtcDataPeer.prototype.RtcOnMessageReceived = function(e, t) {
                                var type = NetEventType.UnreliableMessageReceived;
                                if (t && (type = NetEventType.ReliableMessageReceived), e.data instanceof ArrayBuffer) {
                                    var array = new Uint8Array(e.data);
                                    this.Enqueue(new NetworkEvent(type, this.mConnectionId, array))
                                } else if (e.data instanceof Blob) {
                                    this.mConnectionId;
                                    var i = new FileReader,
                                        o = this;
                                    i.onload = function() {
                                        var e = this.result,
                                            t = new Uint8Array(e);
                                        o.Enqueue(new NetworkEvent(type, o.mConnectionId, t))
                                    },
                                        i.readAsArrayBuffer(e.data)
                                } else Debug.LogError("Invalid message type. Only blob and arraybuffer supported: " + e.data)
                            },
                            InnerWebRtcDataPeer.prototype.ReliableDataChannel_OnMessage = function(e) {
                                Debug.Log("ReliableDataChannel_OnMessage "),
                                    this.RtcOnMessageReceived(e, true)
                            },
                            InnerWebRtcDataPeer.prototype.ReliableDataChannel_OnOpen = function() {
                                Debug.Log("mReliableDataChannelReady"),
                                    this.mReliableDataChannelReady = true,
                                this.IsRtcConnected() && (this.RtcSetConnected(), Debug.Log("Fully connected"))
                            },
                            InnerWebRtcDataPeer.prototype.ReliableDataChannel_OnClose = function() {
                                this.RtcSetClosed()
                            },
                            InnerWebRtcDataPeer.prototype.ReliableDataChannel_OnError = function(e) {
                                Debug.LogError(e),
                                    this.RtcSetClosed()
                            },
                            InnerWebRtcDataPeer.prototype.UnreliableDataChannel_OnMessage = function(e) {
                                Debug.Log("UnreliableDataChannel_OnMessage "),
                                    this.RtcOnMessageReceived(e, false)
                            },
                            InnerWebRtcDataPeer.prototype.UnreliableDataChannel_OnOpen = function() {
                                Debug.Log("mUnreliableDataChannelReady"),
                                    this.mUnreliableDataChannelReady = true,
                                this.IsRtcConnected() && (this.RtcSetConnected(), Debug.Log("Fully connected"))
                            },
                            InnerWebRtcDataPeer.prototype.UnreliableDataChannel_OnClose = function() {
                                this.RtcSetClosed()
                            },
                            InnerWebRtcDataPeer.prototype.UnreliableDataChannel_OnError = function(e) {
                                Debug.LogError(e),
                                    this.RtcSetClosed()
                            },
                            InnerWebRtcDataPeer.prototype.IsRtcConnected = function() {
                                return this.mReliableDataChannelReady && this.mUnreliableDataChannelReady
                            },
                            InnerWebRtcDataPeer.sLabelReliable = "reliable",
                            InnerWebRtcDataPeer.sLabelUnreliable = "unreliable",
                            InnerWebRtcDataPeer
                    } (AWebRtcPeer); !
                    function(e) {
                        e[e.Invalid = 0] = "Invalid",
                            e[e.Offline = 1] = "Offline",
                            e[e.Starting = 2] = "Starting",
                            e[e.Online = 3] = "Online"
                    } (WebRtcNetworkServerState || (WebRtcNetworkServerState = {}));
                var WebsocketConnectionStatus, WebsocketServerStatus, WebRtcNetwork = function() {
                    function InnerWebRtcNetwork(signaling, config) {
                        this.mTimeout = 6e4,
                            this.mInSignaling = {},
                            this.mNextId = new ConnectionId(1),
                            this.mSignaling = null,
                            this.mEvents = new Queue,
                            this.mIdToConnection = {},
                            this.mConnectionIds = new Array,
                            this.mServerState = WebRtcNetworkServerState.Offline,
                            this.mIsDisposed = false,
                            this.mSignaling = signaling,
                            this.mSignalingNetwork = this.mSignaling.GetNetwork(),
                            this.mRtcConfig = config
                    }
                    return Object.defineProperty(InnerWebRtcNetwork.prototype, "IdToConnection", {
                        get: function() {
                            return this.mIdToConnection
                        },
                        enumerable: true,
                        configurable: true
                    }),
                        InnerWebRtcNetwork.prototype.GetConnections = function() {
                            return this.mConnectionIds
                        },
                        InnerWebRtcNetwork.prototype.SetLog = function(e) {
                            this.mLogDelegate = e
                        },
                        InnerWebRtcNetwork.prototype.StartServer = function(e) {
                            this.StartServerInternal(e)
                        },
                        InnerWebRtcNetwork.prototype.StartServerInternal = function(e) {
                            this.mServerState = WebRtcNetworkServerState.Starting,
                                this.mSignalingNetwork.StartServer(e)
                        },
                        InnerWebRtcNetwork.prototype.StopServer = function() {
                            this.mServerState == WebRtcNetworkServerState.Starting ? this.mSignalingNetwork.StopServer() : this.mServerState == WebRtcNetworkServerState.Online && this.mSignalingNetwork.StopServer()
                        },
                        InnerWebRtcNetwork.prototype.Connect = function(room) {
                            return this.AddOutgoingConnection(room)
                        },
                        InnerWebRtcNetwork.prototype.Update = function() {
                            this.CheckSignalingState(),
                                this.UpdateSignalingNetwork(),
                                this.UpdatePeers()
                        },
                        InnerWebRtcNetwork.prototype.Dequeue = function() {
                            return this.mEvents.Count() > 0 ? this.mEvents.Dequeue() : null
                        },
                        InnerWebRtcNetwork.prototype.Peek = function() {
                            return this.mEvents.Count() > 0 ? this.mEvents.Peek() : null
                        },
                        InnerWebRtcNetwork.prototype.Flush = function() {
                            this.mSignalingNetwork.Flush()
                        },
                        InnerWebRtcNetwork.prototype.SendData = function(e, data, n) {
                            console.log(">>>>>>>>>>>>> e.prototype.SendData 1",this);
                            console.log("e",e);
                            console.log("t",data);
                            console.log("n",n);
                            if (null != e && null != data && 0 != data.length) {
                                var r = this.mIdToConnection[e.id];
                                console.log("r",r);
                                return r ? r.SendData(data, n) : (SLog.LogWarning("unknown connection id"), false)
                            }
                        },
                        InnerWebRtcNetwork.prototype.GetBufferedAmount = function(e, t) {
                            var n = this.mIdToConnection[e.id];
                            return n ? n.GetBufferedAmount(t) : (SLog.LogWarning("unknown connection id"), -1)
                        },
                        InnerWebRtcNetwork.prototype.Disconnect = function(e) {
                            this.mIdToConnection[e.id] && this.HandleDisconnect(e)
                        },
                        InnerWebRtcNetwork.prototype.Shutdown = function() {
                            for (var e = 0,
                                     t = this.mConnectionIds; e < t.length; e++) {
                                var n = t[e];
                                this.Disconnect(n)
                            }
                            this.StopServer(),
                                this.mSignalingNetwork.Shutdown()
                        },
                        InnerWebRtcNetwork.prototype.DisposeInternal = function() {
                            0 == this.mIsDisposed && (this.Shutdown(), this.mIsDisposed = true)
                        },
                        InnerWebRtcNetwork.prototype.Dispose = function() {
                            this.DisposeInternal()
                        },
                        InnerWebRtcNetwork.prototype.CreatePeer = function(id, rtcConfig) {
                            console.log(">>>>>>>>>>>> InnerWebRtcNetwork.prototype.CreatePeer",rtcConfig);
                            return new WebRtcDataPeer(id, rtcConfig)
                        },
                        InnerWebRtcNetwork.prototype.CheckSignalingState = function() {
                            var connectionList = new Array,
                                signalFailedList = new Array;
                            //console.error(">>>>>>> InnerWebRtcNetwork.prototype.CheckSignalingState",this.mInSignaling);
                            for (var n in this.mInSignaling) {
                                var peer = this.mInSignaling[n];
                                //console.error(">>>>>>> peer",peer);
                                peer.Update();
                                for (var i = peer.SignalingInfo.GetCreationTimeMs(), msg = new Output; peer.DequeueSignalingMessage(msg);) {
                                    //console.error(">>>>>>> msg.val 1",msg.val);
                                    var obj=JSON.parse(msg.val);//[NEW]
                                    //console.error(">>>>>>> msg.val 2",obj);
                                    var cId=new ConnectionId( + n);
                                    if(obj.sdp || obj.candidate){//{[NEW]
                                        //console.error(">>>>>>> msg.val 2",obj);
                                        this.mSignalingNetwork.SendData(cId, obj, true);//这里是对象
                                        //=>InnerWebsocketNetwork.prototype.SendData
                                        //=>EnqueueOutgoing
                                        //=>HandleOutgoingEvents
                                        //=>SendNetworkEvent,新的分支2
                                    }
                                    else{ //原来的代码
                                        var buffer = this.StringToBuffer(msg.val);
                                        //console.error(">>>>>>> msg.val 3",buffer);
                                        this.mSignalingNetwork.SendData(cId, buffer, true);//这里是Buffer
                                    }
                                }
                                var state=peer.GetState();
                                var stateName=WebRtcPeerState[state];
                                state == WebRtcPeerState.Connected ? connectionList.push(peer.SignalingInfo.ConnectionId) : (state == WebRtcPeerState.SignalingFailed || i > this.mTimeout) && signalFailedList.push(peer.SignalingInfo.ConnectionId)
                            }
                            for (var s = 0,
                                     d = connectionList; s < d.length; s++) {
                                var u = d[s];
                                this.ConnectionEstablished(u);//添加mIdToConnection的内容
                            }
                            for (var l = 0,
                                     p = signalFailedList; l < p.length; l++) {
                                u = p[l];
                                this.SignalingFailed(u)
                            }
                        },
                        InnerWebRtcNetwork.prototype.UpdateSignalingNetwork = function() {
                            var netEvent;
                            for (this.mSignalingNetwork.Update(); null != (netEvent = this.mSignalingNetwork.Dequeue());)
                            {
                                var typeName=NetEventType[netEvent.Type];
                                if (netEvent.Type == NetEventType.ServerInitialized)
                                    this.mServerState = WebRtcNetworkServerState.Online,
                                    this.mEvents.Enqueue(new NetworkEvent(NetEventType.ServerInitialized, ConnectionId.INVALID, netEvent.RawData));
                                else if (netEvent.Type == NetEventType.ServerInitFailed)
                                    this.mServerState = WebRtcNetworkServerState.Offline,
                                    this.mEvents.Enqueue(new NetworkEvent(NetEventType.ServerInitFailed, ConnectionId.INVALID, netEvent.RawData));
                                else if (netEvent.Type == NetEventType.ServerClosed)
                                    this.mServerState = WebRtcNetworkServerState.Offline,
                                    this.mEvents.Enqueue(new NetworkEvent(NetEventType.ServerClosed, ConnectionId.INVALID, netEvent.RawData));
                                else if (netEvent.Type == NetEventType.NewConnection) {
                                    (t = this.mInSignaling[netEvent.ConnectionId.id]) ? t.StartSignaling() : this.AddIncomingConnection(netEvent.ConnectionId)
                                } else if (netEvent.Type == NetEventType.ConnectionFailed)
                                    this.SignalingFailed(netEvent.ConnectionId);
                                else if (netEvent.Type == NetEventType.Disconnected) {
                                    (t = this.mInSignaling[netEvent.ConnectionId.id]) && t.SignalingInfo.SignalingDisconnected()
                                } else if (netEvent.Type == NetEventType.ReliableMessageReceived) {
                                    console.log("InnerWebRtcNetwork.prototype.UpdateSignalingNetwork1",this.mInSignaling);
                                    var t;
                                    if (t = this.mInSignaling[netEvent.ConnectionId.id]) {
                                        console.log("InnerWebRtcNetwork.prototype.UpdateSignalingNetwork2",t);
                                        //var n = this.BufferToString(e.MessageData);//原来的
                                        var n=netEvent.MessageString;//[NEW]
                                        //console.log("InnerWebRtcNetwork.prototype.UpdateSignalingNetwork",n);
                                        t.AddSignalingMessage(n);
                                    } else SLog.LogWarning("Signaling message from unknown connection received",netEvent)
                                }
                            }
                        },
                        InnerWebRtcNetwork.prototype.UpdatePeers = function() {
                            var e = new Array;
                            for (var t in this.mIdToConnection) {
                                var n = this.mIdToConnection[t];
                                n.Update();
                                for (var r = new Output; n.DequeueEvent(r);) this.mEvents.Enqueue(r.val);
                                n.GetState() == WebRtcPeerState.Closed && e.push(n.ConnectionId)
                            }
                            for (var i = 0,
                                     o = e; i < o.length; i++) {
                                var a = o[i];
                                this.HandleDisconnect(a)
                            }
                        },
                        InnerWebRtcNetwork.prototype.AddOutgoingConnection = function(room) {
                            console.log(">>>>>>>>>>>>>>>>>>>>>>>> InnerWebRtcNetwork.prototype.AddOutgoingConnection",this.mSignalingNetwork);
                            var cid = this.mSignalingNetwork.Connect(room);//WebsocketNetwork.prototype.WebsocketConnect
                            console.log(">>>>>>>>>>>>>>>>>>>>>>>> cid",cid);
                            SLog.L("new outgoing connection");
                            var n = new SignalingInfo(cid, false, Date.now()),
                                peer = this.CreatePeer(this.NextConnectionId(), this.mRtcConfig);
                            console.log(">>>>>>>>>>>>>>>>>>>>>>>> peer",peer);
                            return peer.SetSignalingInfo(n),
                                this.mInSignaling[cid.id] = peer,
                                peer.ConnectionId
                        },
                        InnerWebRtcNetwork.prototype.AddIncomingConnection = function(e) {
                            SLog.L("new incoming connection");
                            var t = new SignalingInfo(e, true, Date.now()),
                                n = this.CreatePeer(this.NextConnectionId(), this.mRtcConfig);
                            return n.SetSignalingInfo(t),
                                this.mInSignaling[e.id] = n,
                                n.NegotiateSignaling(),
                                n.ConnectionId
                        },
                        InnerWebRtcNetwork.prototype.ConnectionEstablished = function(e) {
                            var t = this.mInSignaling[e.id];
                            delete this.mInSignaling[e.id],
                                this.mSignalingNetwork.Disconnect(e),
                                this.mConnectionIds.push(t.ConnectionId),
                                this.mIdToConnection[t.ConnectionId.id] = t,
                                this.mEvents.Enqueue(new NetworkEvent(NetEventType.NewConnection, t.ConnectionId, null))
                        },
                        InnerWebRtcNetwork.prototype.SignalingFailed = function(e) {
                            var t = this.mInSignaling[e.id];
                            t && (delete this.mInSignaling[e.id], this.mEvents.Enqueue(new NetworkEvent(NetEventType.ConnectionFailed, t.ConnectionId, null)), t.SignalingInfo.IsSignalingConnected() && this.mSignalingNetwork.Disconnect(e), t.Dispose())
                        },
                        InnerWebRtcNetwork.prototype.HandleDisconnect = function(e) {
                            var t = this.mIdToConnection[e.id];
                            t && t.Dispose();
                            var n = this.mConnectionIds.indexOf(e); - 1 != n && this.mConnectionIds.splice(n, 1),
                                delete this.mIdToConnection[e.id];
                            var r = new NetworkEvent(NetEventType.Disconnected, e, null);
                            this.mEvents.Enqueue(r)
                        },
                        InnerWebRtcNetwork.prototype.NextConnectionId = function() {
                            var e = new ConnectionId(this.mNextId.id);
                            return this.mNextId.id++,
                                e
                        },
                        InnerWebRtcNetwork.prototype.StringToBuffer = function(e) {
                            for (var t = new ArrayBuffer(2 * e.length), n = new Uint16Array(t), r = 0, i = e.length; r < i; r++) n[r] = e.charCodeAt(r);
                            return new Uint8Array(t)
                        },
                        InnerWebRtcNetwork.prototype.BufferToString = function(e) {
                            var t = new Uint16Array(e.buffer, e.byteOffset, e.byteLength / 2);
                            return String.fromCharCode.apply(null, t)
                        },
                        InnerWebRtcNetwork
                } (); !
                    function(e) {
                        e[e.Uninitialized = 0] = "Uninitialized",
                            e[e.NotConnected = 1] = "NotConnected",
                            e[e.Connecting = 2] = "Connecting",
                            e[e.Connected = 3] = "Connected",
                            e[e.Disconnecting = 4] = "Disconnecting"
                    } (WebsocketConnectionStatus || (WebsocketConnectionStatus = {})),
                    function(e) {
                        e[e.Offline = 0] = "Offline",
                            e[e.Starting = 1] = "Starting",
                            e[e.Online = 2] = "Online",
                            e[e.ShuttingDown = 3] = "ShuttingDown"
                    } (WebsocketServerStatus || (WebsocketServerStatus = {}));
                var _, L, WebsocketNetwork = function() {
                    function InnerWebsocketNetwork(url, conf) {
                        console.log("WebsocketNetwork.ctor",url,conf);
                        this.mStatus = WebsocketConnectionStatus.Uninitialized,
                            this.mOutgoingQueue = new Array,
                            this.mIncomingQueue = new Array,
                            this.mServerStatus = WebsocketServerStatus.Offline,
                            this.mLastConnectionId = ConnectionId.INVALID;//[NEW]
                        this.mConnecting = new Array,
                            this.mConnections = new Array,
                            this.mNextOutgoingConnectionId = new ConnectionId(1),
                            this.mRemoteProtocolVersion = 1,
                            this.mUrl = null,
                            this.mHeartbeatReceived = true,
                            this.mIsDisposed = false,
                            this.mUrl = url,
                            this.mStatus = WebsocketConnectionStatus.NotConnected,
                            this.mConfig = conf,
                        this.mConfig || (this.mConfig = new InnerWebsocketNetwork.Configuration),
                            this.mConfig.Lock()
                    }
                    return InnerWebsocketNetwork.prototype.getStatus = function() {
                        return this.mStatus
                    },
                        InnerWebsocketNetwork.prototype.WebsocketConnect = function() {
                            /*
                        WebsocketNetwork.WebsocketConnect	@	awrtc.js:4001
                        WebsocketNetwork.EnsureServerConnection	@	awrtc.js:4032
                        WebsocketNetwork.Connect	@	awrtc.js:4310
                        InnerWebRtcNetwork.AddOutgoingConnection	@	awrtc.js:3911
                        InnerWebRtcNetwork.Connect	@	awrtc.js:3801
                        InnerAWebRtcCall.ProcessCall	@	awrtc.js:5206
                        InnerAWebRtcCall.Call
                        */
                            console.log(">>>>>>> WebsocketNetwork.prototype.WebsocketConnect",this.mUrl);
                            var e = this;
                            this.mStatus = WebsocketConnectionStatus.Connecting,
                                this.mSocket = new WebSocket(this.mUrl),
                                this.mSocket.binaryType = "arraybuffer",
                                this.mSocket.onopen = function() {
                                    console.log(">>>>>>> this.mSocket.onopen")
                                    e.OnWebsocketOnOpen()
                                },
                                this.mSocket.onerror = function(t) {
                                    e.OnWebsocketOnError(t)
                                },
                                this.mSocket.onmessage = function(t) {
                                    //console.log(">>>>>>> this.mSocket.onmessage",t)
                                    e.OnWebsocketOnMessage(t)
                                },
                                this.mSocket.onclose = function(t) {
                                    e.OnWebsocketOnClose(t)
                                }
                        },
                        InnerWebsocketNetwork.prototype.WebsocketCleanup = function() {
                            this.mSocket.onopen = null,
                                this.mSocket.onerror = null,
                                this.mSocket.onmessage = null,
                                this.mSocket.onclose = null,
                            this.mSocket.readyState != this.mSocket.OPEN && this.mSocket.readyState != this.mSocket.CONNECTING || this.mSocket.close(),
                                this.mSocket = null
                        },
                        InnerWebsocketNetwork.prototype.EnsureServerConnection = function() {
                            this.mStatus == WebsocketConnectionStatus.NotConnected && this.WebsocketConnect()
                        },
                        InnerWebsocketNetwork.prototype.UpdateHeartbeat = function() {
                            if (this.mStatus == WebsocketConnectionStatus.Connected && this.mConfig.Heartbeat > 0 && Date.now() - this.mLastHeartbeat > 1e3 * this.mConfig.Heartbeat) {
                                if (this.mRemoteProtocolVersion > 1 && 0 == this.mHeartbeatReceived) return void this.TriggerHeartbeatTimeout();
                                this.mLastHeartbeat = Date.now(),
                                    this.mHeartbeatReceived = false,
                                    this.SendHeartbeat()
                            }
                        },
                        InnerWebsocketNetwork.prototype.TriggerHeartbeatTimeout = function() {
                            SLog.L("Closing due to heartbeat timeout. Server didn't respond in time.", InnerWebsocketNetwork.LOGTAG),
                                this.Cleanup()
                        },
                        InnerWebsocketNetwork.prototype.CheckSleep = function() {
                            this.mStatus == WebsocketConnectionStatus.Connected && this.mServerStatus == WebsocketServerStatus.Offline && 0 == this.mConnecting.length && 0 == this.mConnections.length && this.Cleanup()
                        },
                        InnerWebsocketNetwork.prototype.OnWebsocketOnOpen = function() {
                            console.log(">>>>>>> OnWebsocketOnOpen")
                            SLog.L("onWebsocketOnOpen", InnerWebsocketNetwork.LOGTAG),
                                this.mStatus = WebsocketConnectionStatus.Connected,
                                this.mLastHeartbeat = Date.now(),
                                this.SendVersion()
                        },
                        InnerWebsocketNetwork.prototype.OnWebsocketOnClose = function(t) {
                            SLog.L("Closed: " + JSON.stringify(t), InnerWebsocketNetwork.LOGTAG),
                            1e3 != t.code && SLog.LE("Websocket closed with code: " + t.code + " " + t.reason),
                            this.mStatus != WebsocketConnectionStatus.Disconnecting && this.mStatus != WebsocketConnectionStatus.NotConnected && (this.Cleanup(), this.mStatus = WebsocketConnectionStatus.NotConnected)
                        },
                        InnerWebsocketNetwork.prototype.processRTCOffer = function(offer){
                            console.log("[NEW]>>>>>>> processRTCOffer",offer);
                            var network=this;
                            console.log("network", network);
                            console.log("this.mSocket", this.mSocket);
                            var ws=this.mSocket;
                            var description=new RTCSessionDescription(offer);
                            var config={M:[]};
                            var option={optional:[{DtlsSrtpKeyAgreement: true}]};
                            var connection=new RTCPeerConnection(config,option);

                            connection.onicecandidate=function(event){//只要本地代理ICE 需要通过信令服务器传递信息给其他对等端时就会触发
                                console.log("-------------  RTCPeerConnection.onicecandidate",event);
                            };
                            connection.onaddstream=function(mediaStreamEvent){//
                                console.log("-------------  RTCPeerConnection.onaddstream",mediaStreamEvent);
                                var stream=mediaStreamEvent.stream;
                                console.log("stream",stream);
                                var mRemoteStream = new BrowserMediaStream(stream);//这里能够获取视频
                                console.log("mRemoteStream",mRemoteStream);
                                mRemoteStream.TryGetFrame();//这里能够获取视频的一针，但是如何和unity关联起来

                                network.mRemoteStream=mRemoteStream;//NEW
                            };
                            connection.oniceconnectionstatechange=function(event){
                                console.log("-------------  RTCPeerConnection.oniceconnectionstatechange  state: " + connection.iceConnectionState)
                            };
                            connection.setRemoteDescription(description); //=>onaddstream
                            var offerOptions={mandatory:{offerToReceiveAudio: true, offerToReceiveVideo: true}};
                            connection.createAnswer(offerOptions).then(function(answer){
                                console.log("Create answer:",answer);//answer is RTCSessionDescription
                                connection.setLocalDescription(answer,function(){ //=>onicecandidate
                                    console.log("ProcessRTCOffer createAnswer1 answer:", answer);
                                    //console.log("ProcessRTCOffer createAnswer2 ws:", ws);
                                    var msg=JSON.stringify(answer);
                                    console.log("ProcessRTCOffer createAnswer3 msg:", msg);
                                    ws.send(msg);//=>onicecandidate
                                });
                            });
                            this.mSocket.connection=connection;
                        },
                        InnerWebsocketNetwork.prototype.processRemoteIce = function(remoteIce){
                            console.log("[NEW]>>>>>>> processRemoteIce",remoteIce);
                            var connection=this.mSocket.connection;
                            try {
                                var iceCandidate = new RTCIceCandidate({
                                    sdpMLineIndex: remoteIce.sdpMLineIndex, candidate: remoteIce.candidate
                                });
                                console.log("ProcessRemoteIce", iceCandidate);
                                //console.log("Adding ICE candidate :" + JSON.stringify(iceCandidate));
                                //当本机当前页面的 RTCPeerConnection 接收到一个从远端页面通过信号通道发来的新的 ICE 候选地址信息，本机可以通过调用RTCPeerConnection.addIceCandidate() 来添加一个 ICE 代理
                                connection.addIceCandidate(iceCandidate, function () {
                                        console.log("  addIceCandidate OK")
                                    },
                                    function (error) {
                                        console.log("addIceCandidate error:" + JSON.stringify(error))
                                    })
                            }
                            catch (err) {
                                alert("connect ProcessRemoteIce error: " + err)
                            }
                        },
                        InnerWebsocketNetwork.prototype.OnWebsocketOnMessage = function(e) {
                            //console.log(">>>>>>> OnWebsocketOnMessage",e);
                            if (this.mStatus != WebsocketConnectionStatus.Disconnecting && this.mStatus != WebsocketConnectionStatus.NotConnected) {
                                if(e.data instanceof ArrayBuffer){ //原来的路线
                                    var t = new Uint8Array(e.data);
                                    this.ParseMessage(t)
                                }
                                else{ //新增的路线,显示h5ss的webrtc视频
                                    var dataObj = JSON.parse(e.data);
                                    console.log(">>>>>>> OnWebsocketOnMessage [NEW]",dataObj);

                                    // // 下面的代码可以播放视频，但是不知道如何获取视频给unity
                                    // if(dataObj.type =='offer'){
                                    //     this.processRTCOffer(dataObj);//第一次
                                    // }else if (dataObj.type=='remoteice'){
                                    //     this.processRemoteIce(dataObj);//后面3次
                                    // }

                                    //将offer和remoteice作为NetEventType.ReliableMessageReceived信息处理.
                                    var evnt=new NetworkEvent(NetEventType.ReliableMessageReceived,this.mLastConnectionId,e.data);
                                    //在InnerWebsocketNetwork.prototype.Connect时记录下this.mLastConnectionId.
                                    this.HandleIncomingEvent(evnt);
                                }

                            }
                        },
                        InnerWebsocketNetwork.prototype.OnWebsocketOnError = function(e) {
                            SLog.LE("WebSocket Error " + e)
                        },
                        InnerWebsocketNetwork.prototype.Cleanup = function() {
                            if (this.mStatus != WebsocketConnectionStatus.Disconnecting && this.mStatus != WebsocketConnectionStatus.NotConnected) {
                                this.mStatus = WebsocketConnectionStatus.Disconnecting;
                                for (var e = 0,
                                         t = this.mConnecting; e < t.length; e++) {
                                    var n = t[e];
                                    this.EnqueueIncoming(new NetworkEvent(NetEventType.ConnectionFailed, new ConnectionId(n), null))
                                }
                                this.mConnecting = new Array;
                                for (var r = 0,
                                         i = this.mConnections; r < i.length; r++) {
                                    n = i[r];
                                    this.EnqueueIncoming(new NetworkEvent(NetEventType.Disconnected, new ConnectionId(n), null))
                                }
                                this.mConnections = new Array,
                                    this.mServerStatus == WebsocketServerStatus.Starting ? this.EnqueueIncoming(new NetworkEvent(NetEventType.ServerInitFailed, ConnectionId.INVALID, null)) : this.mServerStatus == WebsocketServerStatus.Online ? this.EnqueueIncoming(new NetworkEvent(NetEventType.ServerClosed, ConnectionId.INVALID, null)) : this.mServerStatus == WebsocketServerStatus.ShuttingDown && this.EnqueueIncoming(new NetworkEvent(NetEventType.ServerClosed, ConnectionId.INVALID, null)),
                                    this.mServerStatus = WebsocketServerStatus.Offline,
                                    this.mOutgoingQueue = new Array,
                                    this.WebsocketCleanup(),
                                    this.mStatus = WebsocketConnectionStatus.NotConnected
                            }
                        },
                        InnerWebsocketNetwork.prototype.EnqueueOutgoing = function(e) {
                            this.mOutgoingQueue.push(e)
                        },
                        InnerWebsocketNetwork.prototype.EnqueueIncoming = function(e) {
                            //console.log(">>>>>>> EnqueueIncoming",e);
                            this.mIncomingQueue.push(e)
                            //console.log(">>>>>>> mIncomingQueue",this.mIncomingQueue);
                        },
                        InnerWebsocketNetwork.prototype.TryRemoveConnecting = function(e) {
                            var t = this.mConnecting.indexOf(e.id); - 1 != t && this.mConnecting.splice(t, 1)
                        },
                        InnerWebsocketNetwork.prototype.TryRemoveConnection = function(e) {
                            var t = this.mConnections.indexOf(e.id); - 1 != t && this.mConnections.splice(t, 1)
                        },
                        InnerWebsocketNetwork.prototype.ParseMessage = function(eventByteArray) {
                            console.log(">>>>>>> ParseMessage",eventByteArray);
                            //console.log(NetworkEvent);
                            if (0 == eventByteArray.length);
                            else if (eventByteArray[0] == NetEventType.MetaVersion) eventByteArray.length > 1 ? this.mRemoteProtocolVersion = eventByteArray[1] : SLog.LW("Received an invalid MetaVersion header without content.");
                            else if (eventByteArray[0] == NetEventType.MetaHeartbeat) this.mHeartbeatReceived = true;
                            else {
                                var t = NetworkEvent.fromByteArray(eventByteArray);
                                this.HandleIncomingEvent(t)
                            }
                        },
                        InnerWebsocketNetwork.prototype.HandleIncomingEvent = function(evnt) {
                            //console.log(">>>>>>> InnerWebsocketNetwork.HandleIncomingEvent",evnt);
                            evnt.Type == NetEventType.NewConnection ? (this.TryRemoveConnecting(evnt.ConnectionId), this.mConnections.push(evnt.ConnectionId.id)) : evnt.Type == NetEventType.ConnectionFailed ? this.TryRemoveConnecting(evnt.ConnectionId) : evnt.Type == NetEventType.Disconnected ? this.TryRemoveConnection(evnt.ConnectionId) : evnt.Type == NetEventType.ServerInitialized ? this.mServerStatus = WebsocketServerStatus.Online: evnt.Type == NetEventType.ServerInitFailed ? this.mServerStatus = WebsocketServerStatus.Offline: evnt.Type == NetEventType.ServerClosed && (this.mServerStatus = WebsocketServerStatus.ShuttingDown, this.mServerStatus = WebsocketServerStatus.Offline),
                                this.EnqueueIncoming(evnt)
                        },
                        InnerWebsocketNetwork.prototype.HandleOutgoingEvents = function() {
                            //console.log(">>>>>>> HandleOutgoingEvents",this.mOutgoingQueue);
                            for (; this.mOutgoingQueue.length > 0;) {
                                var e = this.mOutgoingQueue.shift();
                                this.SendNetworkEvent(e)
                            }
                        },
                        InnerWebsocketNetwork.prototype.SendHeartbeat = function() {
                            console.log(">>>>>>> InnerWebsocketNetwork.SendHeartbeat");
                            var e = new Uint8Array(1);
                            e[0] = NetEventType.MetaHeartbeat,
                                this.InternalSend(e)
                        },
                        InnerWebsocketNetwork.prototype.SendVersion = function() {
                            console.log(">>>>>>> SendVersion",this.mSocket);
                            var t = new Uint8Array(2);
                            t[0] = NetEventType.MetaVersion,
                                t[1] = InnerWebsocketNetwork.PROTOCOL_VERSION,
                                this.InternalSend(t)

                            //this.mSocket.send(JSON.stringify({type: "open"}));//[NEW]给h5stream发送开始指令
                        },
                        InnerWebsocketNetwork.prototype.SendNetworkEvent = function(networkEvent) {
                            /*
                            InnerWebsocketNetwork.SendNetworkEvent	@	awrtc.js:4300
                            InnerWebsocketNetwork.HandleOutgoingEvents	@	awrtc.js:4280
                            InnerWebsocketNetwork.Flush	@	awrtc.js:4343
                            InnerWebRtcNetwork.Flush	@	awrtc.js:3846
                            InnerBrowserMediaNetwork.Flush	@	awrtc.js:5982
                            InnerAWebRtcCall.Update
                             */
                            console.log(">>>>>>> SendNetworkEvent",networkEvent);
                            //原来的代码
                            // var t = NetworkEvent.toByteArray(networkEvent);
                            // this.InternalSend(t);

                            //新的代码[NEW]
                            if(networkEvent.data instanceof Array){
                                var t = NetworkEvent.toByteArray(networkEvent);
                                this.InternalSend(t);//原来的分支1：发送NetworkEvent
                            }
                            else if(typeof networkEvent.data == 'string'){
                                try {
                                    var obj=JSON.parse(networkEvent.data);//不是json格式的会抛出异常
                                    if(obj==null){
                                        var t = NetworkEvent.toByteArray(networkEvent);
                                        this.InternalSend(t);//原来的分支2：发送NetworkEvent
                                    }else{
                                        var json=JSON.stringify(obj);
                                        console.log("send json",json);
                                        this.mSocket.send(json);//新的分支1：发送data里面的内容的json字符串。对应于"{"type":"open"}"的发送。h5stream必须先发送open指令才能收到onmessage消息
                                    }
                                }
                                catch (ex) {
                                    console.error(ex);
                                    var t = NetworkEvent.toByteArray(networkEvent);
                                    this.InternalSend(t);//原来的分支2：发送NetworkEvent
                                }
                            }
                            else//[NEW]
                            {
                                var json=JSON.stringify(networkEvent.data);
                                console.log("send json",json);
                                this.mSocket.send(json);//新的分支2：发送data里面的内容的json字符串。对应于answer的发送
                            }
                        },
                        InnerWebsocketNetwork.prototype.InternalSend = function(e) {
                            var msg=String.fromCharCode.apply(null, e);
                            console.log(">>>>>>> InternalSend :"+msg,e);
                            this.mSocket.send(e)
                        },
                        InnerWebsocketNetwork.prototype.NextConnectionId = function() {
                            var e = this.mNextOutgoingConnectionId;
                            return this.mNextOutgoingConnectionId = new ConnectionId(this.mNextOutgoingConnectionId.id + 1),
                                e
                        },
                        InnerWebsocketNetwork.prototype.GetRandomKey = function() {
                            for (var e = "",
                                     t = 0; t < 7; t++) e += String.fromCharCode(65 + Math.round(25 * Math.random()));
                            return e
                        },
                        InnerWebsocketNetwork.prototype.Dequeue = function() {
                            /*
        InnerWebsocketNetwork.Dequeue	@	awrtc.js:4281
        InnerWebRtcNetwork.UpdateSignalingNetwork	@	awrtc.js:3880
        InnerWebRtcNetwork.Update	@	awrtc.js:3806
        InnerBrowserMediaNetwork.Update	@	awrtc.js:5913
        InnerAWebRtcCall.Update
            */
                            var data = this.mIncomingQueue.length > 0 ? this.mIncomingQueue.shift() : null;
                            if(data !== null){
                                console.log(">>>>>>>>>> InnerWebsocketNetwork.prototype.Dequeue",data);
                                //console.trace();
                            }
                            return data;
                        },
                        InnerWebsocketNetwork.prototype.Peek = function() {
                            return this.mIncomingQueue.length > 0 ? this.mIncomingQueue[0] : null
                        },
                        InnerWebsocketNetwork.prototype.Update = function() {
                            this.UpdateHeartbeat(),
                                this.CheckSleep()
                        },
                        InnerWebsocketNetwork.prototype.Flush = function() {
                            //console.log(">>>>>>>>> Flush");
                            this.mStatus == WebsocketConnectionStatus.Connected && this.HandleOutgoingEvents()
                        },
                        InnerWebsocketNetwork.prototype.SendData = function(cid, buffer, isReliableMsg) {
                            /*
                    InnerWebsocketNetwork.SendData	@	awrtc.js:4342
                    InnerWebRtcNetwork.CheckSignalingState	@	awrtc.js:3893
                    InnerWebRtcNetwork.Update	@	awrtc.js:3835
                    InnerBrowserMediaNetwork.Update	@	awrtc.js:5956
                    InnerAWebRtcCall.Update
                     */
                            console.log(">>>>>>>>>>>>> InnerWebsocketNetwork.prototype.SendData",this);
                            var r;
                            if (null != cid && null != buffer && 0 != buffer.length) return r = new NetworkEvent(isReliableMsg ? NetEventType.ReliableMessageReceived: NetEventType.UnreliableMessageReceived, cid, buffer),
                                this.EnqueueOutgoing(r),
                                true
                        },
                        InnerWebsocketNetwork.prototype.Disconnect = function(e) {
                            var t = new NetworkEvent(NetEventType.Disconnected, e, null);
                            this.EnqueueOutgoing(t)
                        },
                        InnerWebsocketNetwork.prototype.Shutdown = function() {
                            this.Cleanup(),
                                this.mStatus = WebsocketConnectionStatus.NotConnected
                        },
                        InnerWebsocketNetwork.prototype.Dispose = function() {
                            0 == this.mIsDisposed && (this.Shutdown(), this.mIsDisposed = true)
                        },
                        InnerWebsocketNetwork.prototype.StartServer = function(e) {
                            null == e && (e = "" + this.GetRandomKey()),
                                this.mServerStatus == WebsocketServerStatus.Offline ? (this.EnsureServerConnection(), this.mServerStatus = WebsocketServerStatus.Starting, this.EnqueueOutgoing(new NetworkEvent(NetEventType.ServerInitialized, ConnectionId.INVALID, e))) : this.EnqueueIncoming(new NetworkEvent(NetEventType.ServerInitFailed, ConnectionId.INVALID, e))
                        },
                        InnerWebsocketNetwork.prototype.StopServer = function() {
                            this.EnqueueOutgoing(new NetworkEvent(NetEventType.ServerClosed, ConnectionId.INVALID, null))
                        },
                        InnerWebsocketNetwork.prototype.Connect = function(room) {
                            this.EnsureServerConnection();
                            var id = this.NextConnectionId();
                            this.mLastConnectionId=id;//[NEW],用于InnerWebsocketNetwork.prototype.OnWebsocketOnMessage里面发送消息,带上id
                            this.mConnecting.push(id.id);
                            var event = new NetworkEvent(NetEventType.NewConnection, id, room);
                            return this.EnqueueOutgoing(event),
                                id
                        },
                        InnerWebsocketNetwork.LOGTAG = "WebsocketNetwork",
                        InnerWebsocketNetwork.PROTOCOL_VERSION = 2,
                        InnerWebsocketNetwork.PROTOCOL_VERSION_MIN = 1,
                        InnerWebsocketNetwork
                } ();
                _ = WebsocketNetwork || (WebsocketNetwork = {}),
                    L = function() {
                        function e() {
                            this.mHeartbeat = 30,
                                this.mLocked = false
                        }
                        return Object.defineProperty(e.prototype, "Heartbeat", {
                            get: function() {
                                return this.mHeartbeat
                            },
                            set: function(e) {
                                if (this.mLocked) throw new Error("Can't change configuration once used.");
                                this.mHeartbeat = e
                            },
                            enumerable: true,
                            configurable: true
                        }),
                            e.prototype.Lock = function() {
                                this.mLocked = true
                            },
                            e
                    } (),
                    _.Configuration = L;
                var MediaConfigurationState, MediaEventType, LocalNetwork = function() {
                    function InnerLocalNetwork() {
                        this.mNextNetworkId = new ConnectionId(1),
                            this.mServerAddress = null,
                            this.mEvents = new Queue,
                            this.mConnectionNetwork = {},
                            this.mIsDisposed = false,
                            this.mId = InnerLocalNetwork.sNextId,
                            InnerLocalNetwork.sNextId++
                    }
                    return Object.defineProperty(InnerLocalNetwork.prototype, "IsServer", {
                        get: function() {
                            return null != this.mServerAddress
                        },
                        enumerable: true,
                        configurable: true
                    }),
                        InnerLocalNetwork.prototype.StartServer = function(t) {
                            void 0 === t && (t = null),
                            null == t && (t = "" + this.mId),
                                t in InnerLocalNetwork.mServers ? this.Enqueue(NetEventType.ServerInitFailed, ConnectionId.INVALID, t) : (InnerLocalNetwork.mServers[t] = this, this.mServerAddress = t, this.Enqueue(NetEventType.ServerInitialized, ConnectionId.INVALID, t))
                        },
                        InnerLocalNetwork.prototype.StopServer = function() {
                            this.IsServer && (this.Enqueue(NetEventType.ServerClosed, ConnectionId.INVALID, this.mServerAddress), delete InnerLocalNetwork.mServers[this.mServerAddress], this.mServerAddress = null)
                        },
                        InnerLocalNetwork.prototype.Connect = function(t) {
                            var n = this.NextConnectionId(),
                                r = false;
                            if (t in InnerLocalNetwork.mServers) {
                                var i = InnerLocalNetwork.mServers[t];
                                null != i && (i.ConnectClient(this), this.mConnectionNetwork[n.id] = InnerLocalNetwork.mServers[t], this.Enqueue(NetEventType.NewConnection, n, null), r = true)
                            }
                            return 0 == r && this.Enqueue(NetEventType.ConnectionFailed, n, "Couldn't connect to the given server with id " + t),
                                n
                        },
                        InnerLocalNetwork.prototype.Shutdown = function() {
                            for (var e in this.mConnectionNetwork) this.Disconnect(new ConnectionId( + e));
                            this.StopServer()
                        },
                        InnerLocalNetwork.prototype.Dispose = function() {
                            0 == this.mIsDisposed && this.Shutdown()
                        },
                        InnerLocalNetwork.prototype.SendData = function(e, t, n) {
                            console.log(">>>>>>>>>>>>> e.prototype.SendData 3",this);
                            console.log("e",e);
                            console.log("t",t);
                            console.log("n",n);
                            return e.id in this.mConnectionNetwork && (this.mConnectionNetwork[e.id].ReceiveData(this, t, n), true)
                        },
                        InnerLocalNetwork.prototype.Update = function() {
                            this.CleanupWreakReferences()
                        },
                        InnerLocalNetwork.prototype.Dequeue = function() {
                            return this.mEvents.Dequeue()
                        },
                        InnerLocalNetwork.prototype.Peek = function() {
                            return this.mEvents.Peek()
                        },
                        InnerLocalNetwork.prototype.Flush = function() {},
                        InnerLocalNetwork.prototype.Disconnect = function(e) {
                            if (e.id in this.mConnectionNetwork) {
                                var t = this.mConnectionNetwork[e.id];
                                null != t ? (t.InternalDisconnectNetwork(this), this.InternalDisconnect(e)) : this.CleanupWreakReferences()
                            }
                        },
                        InnerLocalNetwork.prototype.FindConnectionId = function(e) {
                            for (var t in this.mConnectionNetwork) {
                                if (null != this.mConnectionNetwork[t]) return new ConnectionId( + t)
                            }
                            return ConnectionId.INVALID
                        },
                        InnerLocalNetwork.prototype.NextConnectionId = function() {
                            var e = this.mNextNetworkId;
                            return this.mNextNetworkId = new ConnectionId(e.id + 1),
                                e
                        },
                        InnerLocalNetwork.prototype.ConnectClient = function(e) {
                            var t = this.NextConnectionId();
                            this.mConnectionNetwork[t.id] = e,
                                this.Enqueue(NetEventType.NewConnection, t, null)
                        },
                        InnerLocalNetwork.prototype.Enqueue = function(type, id, data) {
                            var evnt = new NetworkEvent(type, id, data);
                            this.mEvents.Enqueue(evnt)
                        },
                        InnerLocalNetwork.prototype.ReceiveData = function(e, t, n) {
                            for (var r = this.FindConnectionId(e), i = new Uint8Array(t.length), o = 0; o < i.length; o++) i[o] = t[o];
                            var a = NetEventType.UnreliableMessageReceived;
                            n && (a = NetEventType.ReliableMessageReceived),
                                this.Enqueue(a, r, i)
                        },
                        InnerLocalNetwork.prototype.InternalDisconnect = function(e) {
                            e.id in this.mConnectionNetwork && (this.Enqueue(NetEventType.Disconnected, e, null), delete this.mConnectionNetwork[e.id])
                        },
                        InnerLocalNetwork.prototype.InternalDisconnectNetwork = function(e) {
                            this.InternalDisconnect(this.FindConnectionId(e))
                        },
                        InnerLocalNetwork.prototype.CleanupWreakReferences = function() {},
                        InnerLocalNetwork.sNextId = 1,
                        InnerLocalNetwork.mServers = {},
                        InnerLocalNetwork
                } (); !
                    function(e) {
                        e[e.Invalid = 0] = "Invalid",
                            e[e.NoConfiguration = 1] = "NoConfiguration",
                            e[e.InProgress = 2] = "InProgress",
                            e[e.Successful = 3] = "Successful",
                            e[e.Failed = 4] = "Failed"
                    } (MediaConfigurationState || (MediaConfigurationState = {})),
                    function(e) {
                        e[e.Invalid = 0] = "Invalid",
                            e[e.StreamAdded = 20] = "StreamAdded"
                    } (MediaEventType || (MediaEventType = {}));
                var CallEventType, MediaEvent = function() {
                        function e(e, t, n) {
                            this.mEventType = MediaEventType.Invalid,
                                this.mConnectionId = ConnectionId.INVALID,
                                this.mEventType = e,
                                this.mConnectionId = t,
                                this.mArgs = n
                        }
                        return Object.defineProperty(e.prototype, "EventType", {
                            get: function() {
                                return this.mEventType
                            },
                            enumerable: true,
                            configurable: true
                        }),
                            Object.defineProperty(e.prototype, "ConnectionId", {
                                get: function() {
                                    return this.mConnectionId
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(e.prototype, "Args", {
                                get: function() {
                                    return this.mArgs
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            e
                    } (),
                    BaseEventArgs = function() {
                        var e = function(t, n) {
                            return (e = Object.setPrototypeOf || {
                                    __proto__: []
                                }
                                instanceof Array &&
                                function(e, t) {
                                    e.__proto__ = t
                                } ||
                                function(e, t) {
                                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                                })(t, n)
                        };
                        return function(t, n) {
                            function r() {
                                this.constructor = t
                            }
                            e(t, n),
                                t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                        }
                    } (); !
                    function(e) {
                        e[e.Invalid = 0] = "Invalid",
                            e[e.WaitForIncomingCall = 1] = "WaitForIncomingCall",
                            e[e.CallAccepted = 2] = "CallAccepted",
                            e[e.CallEnded = 3] = "CallEnded",
                            e[e.FrameUpdate = 4] = "FrameUpdate",
                            e[e.Message = 5] = "Message",
                            e[e.ConnectionFailed = 6] = "ConnectionFailed",
                            e[e.ListeningFailed = 7] = "ListeningFailed",
                            e[e.ConfigurationComplete = 8] = "ConfigurationComplete",
                            e[e.ConfigurationFailed = 9] = "ConfigurationFailed",
                            e[e.DataMessage = 10] = "DataMessage",
                            e[e.MediaUpdate = 20] = "MediaUpdate"
                    } (CallEventType || (CallEventType = {}));
                var CallErrorType, CallEventArgs = function() {
                        function e(e) {
                            this.mType = CallEventType.Invalid,
                                this.mType = e
                        }
                        return Object.defineProperty(e.prototype, "Type", {
                            get: function() {
                                return this.mType
                            },
                            enumerable: true,
                            configurable: true
                        }),
                            e
                    } (),
                    CallAcceptedEventArgs = function(e) {
                        function t(t) {
                            var n = e.call(this, CallEventType.CallAccepted) || this;
                            return n.mConnectionId = ConnectionId.INVALID,
                                n.mConnectionId = t,
                                n
                        }
                        return BaseEventArgs(t, e),
                            Object.defineProperty(t.prototype, "ConnectionId", {
                                get: function() {
                                    return this.mConnectionId
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            t
                    } (CallEventArgs),
                    CallEndedEventArgs = function(e) {
                        function t(t) {
                            var n = e.call(this, CallEventType.CallEnded) || this;
                            return n.mConnectionId = ConnectionId.INVALID,
                                n.mConnectionId = t,
                                n
                        }
                        return BaseEventArgs(t, e),
                            Object.defineProperty(t.prototype, "ConnectionId", {
                                get: function() {
                                    return this.mConnectionId
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            t
                    } (CallEventArgs); !
                    function(e) {
                        e[e.Unknown = 0] = "Unknown"
                    } (CallErrorType || (CallErrorType = {}));
                var CallState, ErrorEventArgs = function(e) {
                        function t(t, n, r) {
                            var i = e.call(this, t) || this;
                            if (i.mErrorType = CallErrorType.Unknown, i.mErrorType = n, i.mErrorMessage = r, null == i.mErrorMessage) switch (t) {
                                case CallEventType.ConnectionFailed:
                                    i.mErrorMessage = "Connection failed.";
                                    break;
                                case CallEventType.ListeningFailed:
                                    i.mErrorMessage = "Failed to allow incoming connections. Address already in use or server connection failed.";
                                    break;
                                default:
                                    i.mErrorMessage = "Unknown error."
                            }
                            return i
                        }
                        return BaseEventArgs(t, e),
                            Object.defineProperty(t.prototype, "ErrorMessage", {
                                get: function() {
                                    return this.mErrorMessage
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(t.prototype, "ErrorType", {
                                get: function() {
                                    return this.mErrorType
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            t
                    } (CallEventArgs),
                    WaitForIncomingCallEventArgs = function(e) {
                        function t(t) {
                            var n = e.call(this, CallEventType.WaitForIncomingCall) || this;
                            return n.mAddress = t,
                                n
                        }
                        return BaseEventArgs(t, e),
                            Object.defineProperty(t.prototype, "Address", {
                                get: function() {
                                    return this.mAddress
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            t
                    } (CallEventArgs),
                    MessageEventArgs = function(e) {
                        function t(t, n, r) {
                            var i = e.call(this, CallEventType.Message) || this;
                            return i.mConnectionId = ConnectionId.INVALID,
                                i.mConnectionId = t,
                                i.mContent = n,
                                i.mReliable = r,
                                i
                        }
                        return BaseEventArgs(t, e),
                            Object.defineProperty(t.prototype, "ConnectionId", {
                                get: function() {
                                    return this.mConnectionId
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(t.prototype, "Content", {
                                get: function() {
                                    return this.mContent
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(t.prototype, "Reliable", {
                                get: function() {
                                    return this.mReliable
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            t
                    } (CallEventArgs),
                    DataMessageEventArgs = function(e) {
                        function t(t, n, r) {
                            var i = e.call(this, CallEventType.DataMessage) || this;
                            return i.mConnectionId = ConnectionId.INVALID,
                                i.mConnectionId = t,
                                i.mContent = n,
                                i.mReliable = r,
                                i
                        }
                        return BaseEventArgs(t, e),
                            Object.defineProperty(t.prototype, "ConnectionId", {
                                get: function() {
                                    return this.mConnectionId
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(t.prototype, "Content", {
                                get: function() {
                                    return this.mContent
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(t.prototype, "Reliable", {
                                get: function() {
                                    return this.mReliable
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            t
                    } (CallEventArgs),
                    MediaUpdatedEventArgs = function(e) {
                        function InnerMediaUpdatedEventArgs(id, videoElement) {
                            var r = e.call(this, CallEventType.MediaUpdate) || this;
                            return r.mConnectionId = ConnectionId.INVALID,
                                r.mConnectionId = id,
                                r.mVideoElement = videoElement,
                                r
                        }
                        return BaseEventArgs(InnerMediaUpdatedEventArgs, e),
                            Object.defineProperty(InnerMediaUpdatedEventArgs.prototype, "ConnectionId", {
                                get: function() {
                                    return this.mConnectionId
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerMediaUpdatedEventArgs.prototype, "IsRemote", {
                                get: function() {
                                    return this.mConnectionId.id != ConnectionId.INVALID.id
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerMediaUpdatedEventArgs.prototype, "VideoElement", {
                                get: function() {
                                    return this.mVideoElement
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            InnerMediaUpdatedEventArgs
                    } (CallEventArgs),
                    FrameUpdateEventArgs = function(e) {
                        function InnerFrameUpdateEventArgs(id, frame) {
                            var r = e.call(this, CallEventType.FrameUpdate) || this;
                            return r.mConnectionId = ConnectionId.INVALID,
                                r.mConnectionId = id,
                                r.mFrame = frame,
                                r
                        }
                        return BaseEventArgs(InnerFrameUpdateEventArgs, e),
                            Object.defineProperty(InnerFrameUpdateEventArgs.prototype, "Frame", {
                                get: function() {
                                    return this.mFrame
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerFrameUpdateEventArgs.prototype, "ConnectionId", {
                                get: function() {
                                    return this.mConnectionId
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerFrameUpdateEventArgs.prototype, "IsRemote", {
                                get: function() {
                                    return this.mConnectionId.id != ConnectionId.INVALID.id
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            InnerFrameUpdateEventArgs
                    } (CallEventArgs),
                    NetworkConfig = function() {
                        function InnerNetworkConfig() {
                            this.mIceServers = new Array,
                                this.mSignalingUrl = "ws://because-why-not.com:12776",
                                this.mIsConference = false
                        }
                        return Object.defineProperty(InnerNetworkConfig.prototype, "IceServers", {
                            get: function() {
                                return this.mIceServers
                            },
                            set: function(e) {
                                this.mIceServers = e
                            },
                            enumerable: true,
                            configurable: true
                        }),
                            Object.defineProperty(InnerNetworkConfig.prototype, "SignalingUrl", {
                                get: function() {
                                    return this.mSignalingUrl
                                },
                                set: function(e) {
                                    this.mSignalingUrl = e
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerNetworkConfig.prototype, "IsConference", {
                                get: function() {
                                    return this.mIsConference
                                },
                                set: function(e) {
                                    this.mIsConference = e
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            InnerNetworkConfig
                    } (),
                    MediaConfig = function() {
                        function InnerMediaConfig() {
                            this.mAudio = true,
                                this.mVideo = true,
                                this.mVideoDeviceName = "",
                                this.mMinWidth = -1,
                                this.mMinHeight = -1,
                                this.mMaxWidth = -1,
                                this.mMaxHeight = -1,
                                this.mIdealWidth = -1,
                                this.mIdealHeight = -1,
                                this.mMinFps = -1,
                                this.mMaxFps = -1,
                                this.mIdealFps = -1,
                                this.mFrameUpdates = false
                        }
                        return Object.defineProperty(InnerMediaConfig.prototype, "Audio", {
                            get: function() {
                                return this.mAudio
                            },
                            set: function(e) {
                                this.mAudio = e
                            },
                            enumerable: true,
                            configurable: true
                        }),
                            Object.defineProperty(InnerMediaConfig.prototype, "Video", {
                                get: function() {
                                    return this.mVideo
                                },
                                set: function(e) {
                                    this.mVideo = e
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerMediaConfig.prototype, "VideoDeviceName", {
                                get: function() {
                                    return this.mVideoDeviceName
                                },
                                set: function(e) {
                                    this.mVideoDeviceName = e
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerMediaConfig.prototype, "MinWidth", {
                                get: function() {
                                    return this.mMinWidth
                                },
                                set: function(e) {
                                    this.mMinWidth = e
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerMediaConfig.prototype, "MinHeight", {
                                get: function() {
                                    return this.mMinHeight
                                },
                                set: function(e) {
                                    this.mMinHeight = e
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerMediaConfig.prototype, "MaxWidth", {
                                get: function() {
                                    return this.mMaxWidth
                                },
                                set: function(e) {
                                    this.mMaxWidth = e
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerMediaConfig.prototype, "MaxHeight", {
                                get: function() {
                                    return this.mMaxHeight
                                },
                                set: function(e) {
                                    this.mMaxHeight = e
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerMediaConfig.prototype, "IdealWidth", {
                                get: function() {
                                    return this.mIdealWidth
                                },
                                set: function(e) {
                                    this.mIdealWidth = e
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerMediaConfig.prototype, "IdealHeight", {
                                get: function() {
                                    return this.mIdealHeight
                                },
                                set: function(e) {
                                    this.mIdealHeight = e
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerMediaConfig.prototype, "MinFps", {
                                get: function() {
                                    return this.mMinFps
                                },
                                set: function(e) {
                                    this.mMinFps = e
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerMediaConfig.prototype, "MaxFps", {
                                get: function() {
                                    return this.mMaxFps
                                },
                                set: function(e) {
                                    this.mMaxFps = e
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerMediaConfig.prototype, "IdealFps", {
                                get: function() {
                                    return this.mIdealFps
                                },
                                set: function(e) {
                                    this.mIdealFps = e
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerMediaConfig.prototype, "FrameUpdates", {
                                get: function() {
                                    return this.mFrameUpdates
                                },
                                set: function(e) {
                                    this.mFrameUpdates = e
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            InnerMediaConfig
                    } (),
                    Z = function() {
                        var e = function(t, n) {
                            return (e = Object.setPrototypeOf || {
                                    __proto__: []
                                }
                                instanceof Array &&
                                function(e, t) {
                                    e.__proto__ = t
                                } ||
                                function(e, t) {
                                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                                })(t, n)
                        };
                        return function(t, n) {
                            function r() {
                                this.constructor = t
                            }
                            e(t, n),
                                t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                        }
                    } (),
                    ee = function(e) {
                        function t() {
                            return null !== e && e.apply(this, arguments) || this
                        }
                        return Z(t, e),
                            t
                    } (function() {
                        function e(e) {
                            this.mErrorMsg = e
                        }
                        return e.prototype.ErrorMsg = function() {},
                            e
                    } ()); !
                    function(e) {
                        e[e.Invalid = 0] = "Invalid",
                            e[e.Initialized = 1] = "Initialized",
                            e[e.Configuring = 2] = "Configuring",
                            e[e.Configured = 3] = "Configured",
                            e[e.RequestingAddress = 4] = "RequestingAddress",
                            e[e.WaitingForIncomingCall = 5] = "WaitingForIncomingCall",
                            e[e.WaitingForOutgoingCall = 6] = "WaitingForOutgoingCall",
                            e[e.InCall = 7] = "InCall",
                            e[e.Closed = 8] = "Closed"
                    } (CallState || (CallState = {}));
                var FramePixelFormat, ConnectionInfo = function() {
                        function e() {
                            this.mConnectionIds = new Array
                        }
                        return e.prototype.AddConnection = function(e, t) {
                            this.mConnectionIds.push(e.id)
                        },
                            e.prototype.RemConnection = function(e) {
                                var t = this.mConnectionIds.indexOf(e.id);
                                t >= 0 ? this.mConnectionIds.splice(t, 1) : SLog.LE("tried to remove an unknown connection with id " + e.id)
                            },
                            e.prototype.HasConnection = function(e) {
                                return - 1 != this.mConnectionIds.indexOf(e.id)
                            },
                            e.prototype.GetIds = function() {
                                return this.mConnectionIds
                            },
                            e
                    } (),
                    AWebRtcCall = function() { //AWebRtcCall
                        function InnerAWebRtcCall(conf) { //构造函数
                            void 0 === conf && (conf = null),
                                this.MESSAGE_TYPE_INVALID = 0,
                                this.MESSAGE_TYPE_DATA = 1,
                                this.MESSAGE_TYPE_STRING = 2,
                                this.MESSAGE_TYPE_CONTROL = 3,
                                this.mNetworkConfig = new NetworkConfig,
                                this.mMediaConfig = null,
                                this.mCallEventHandlers = [],
                                this.mNetwork = null,
                                this.mConnectionInfo = new ConnectionInfo,
                                this.mConferenceMode = false,
                                this.mState = CallState.Invalid,
                                this.mIsDisposed = false,
                                this.mServerInactive = true,
                                this.mPendingListenCall = false,
                                this.mPendingCallCall = false,
                                this.mPendingAddress = null,
                            null != conf && (this.mNetworkConfig = conf, this.mConferenceMode = conf.IsConference)
                        }
                        return InnerAWebRtcCall.prototype.addEventListener = function(listener) {
                            this.mCallEventHandlers.push(listener)
                        },
                            InnerAWebRtcCall.prototype.removeEventListener = function(e) {
                                this.mCallEventHandlers = this.mCallEventHandlers.filter(function(t) {
                                    return t !== e
                                })
                            },
                            Object.defineProperty(InnerAWebRtcCall.prototype, "State", {
                                get: function() {
                                    return this.mState
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            InnerAWebRtcCall.prototype.Initialize = function(network) {
                                console.log(">>>>>>>>>>>>>>>>>> AWebRtcCall.Initialize",network);
                                this.mNetwork = network,
                                    this.mState = CallState.Initialized
                            },
                            InnerAWebRtcCall.prototype.Configure = function(mediaConf) {
                                console.log(">>>>>>>>>>>>>>>>>> AWebRtcCall.Configure Start",mediaConf);
                                if (this.CheckDisposed(), this.mState != CallState.Initialized) throw new ee("Method can't be used in state " + this.mState);
                                this.mState = CallState.Configuring,
                                    SLog.Log("Enter state CallState.Configuring"),
                                    this.mMediaConfig = mediaConf,
                                    this.mNetwork.Configure(this.mMediaConfig)
                                console.log(">>>>>>>>>>>>>>>>>> AWebRtcCall.Configure End",this.mNetwork);
                            },
                            InnerAWebRtcCall.prototype.Call = function(address) {
                                if (this.CheckDisposed(), this.mState != CallState.Initialized && this.mState != CallState.Configuring && this.mState != CallState.Configured) throw new ee("Method can't be used in state " + this.mState);
                                if (this.mConferenceMode) throw new ee("Method can't be used in conference calls.");
                                SLog.Log("Call to " + address),
                                    this.EnsureConfiguration(),
                                    this.mState == CallState.Configured ? this.ProcessCall(address) : this.PendingCall(address)
                            },
                            InnerAWebRtcCall.prototype.Listen = function(address) {
                                console.log(">>>>>>>>>>>>>>>>>> AWebRtcCall.Listen",address);
                                if (this.CheckDisposed(), this.mState != CallState.Initialized && this.mState != CallState.Configuring && this.mState != CallState.Configured) throw new ee("Method can't be used in state " + this.mState);
                                this.EnsureConfiguration();
                                console.log(">>>>>>>>>>>>>>>>>> mState",this.mState);
                                this.mState == CallState.Configured ? this.ProcessListen(address) : this.PendingListen(address)
                            },
                            InnerAWebRtcCall.prototype.Send = function(e, t, n) {
                                this.CheckDisposed(),
                                null == t && (t = true),
                                    n ? this.InternalSendTo(e, t, n) : this.InternalSendToAll(e, t)
                            },
                            InnerAWebRtcCall.prototype.InternalSendToAll = function(e, t) {
                                for (var n = this.PackStringMsg(e), r = 0, i = this.mConnectionInfo.GetIds(); r < i.length; r++) {
                                    var o = i[r];
                                    SLog.L("Send message to " + o + "! " + e),
                                        this.InternalSendRawTo(n, new ConnectionId(o), t)
                                }
                            },
                            InnerAWebRtcCall.prototype.InternalSendTo = function(e, t, n) {
                                var r = this.PackStringMsg(e);
                                this.InternalSendRawTo(r, n, t)
                            },
                            InnerAWebRtcCall.prototype.SendData = function(e, t, n) {
                                console.log(">>>>>>>>>>>>> e.prototype.SendData 4",this);
                                console.log("e",e);
                                console.log("t",t);
                                console.log("n",n);
                                this.CheckDisposed();
                                var r = this.PackDataMsg(e);
                                this.InternalSendRawTo(r, n, t)
                            },
                            InnerAWebRtcCall.prototype.PackStringMsg = function(e) {
                                var t = Encoding.UTF16.GetBytes(e),
                                    n = new Uint8Array(t.length + 1);
                                n[0] = this.MESSAGE_TYPE_STRING;
                                for (var r = 0; r < t.length; r++) n[r + 1] = t[r];
                                return n
                            },
                            InnerAWebRtcCall.prototype.UnpackStringMsg = function(e) {
                                for (var t = new Uint8Array(e.length - 1), n = 0; n < t.length; n++) t[n] = e[n + 1];
                                return Encoding.UTF16.GetString(t)
                            },
                            InnerAWebRtcCall.prototype.PackDataMsg = function(e) {
                                var t = new Uint8Array(e.length + 1);
                                t[0] = this.MESSAGE_TYPE_DATA;
                                for (var n = 0; n < e.length; n++) t[n + 1] = e[n];
                                return t
                            },
                            InnerAWebRtcCall.prototype.UnpackDataMsg = function(e) {
                                for (var t = new Uint8Array(e.length - 1), n = 0; n < t.length; n++) t[n] = e[n + 1];
                                return t
                            },
                            InnerAWebRtcCall.prototype.InternalSendRawTo = function(e, t, n) {
                                this.mNetwork.SendData(t, e, n)
                            },
                            InnerAWebRtcCall.prototype.Update = function() {
                                if (!this.mIsDisposed && null != this.mNetwork) {
                                    console.log(">>>>>>>>>>>>>> InnerAWebRtcCall.prototype.Update",this);
                                    if (this.mNetwork.Update(), this.mState == CallState.Configuring) {
                                        var state = this.mNetwork.GetConfigurationState();
                                        //console.log(">>>>>>>>>>>>>> state",state);
                                        if (state == MediaConfigurationState.Failed) {
                                            if (this.OnConfigurationFailed(this.mNetwork.GetConfigurationError()), this.mIsDisposed) return;
                                            null != this.mNetwork && this.mNetwork.ResetConfiguration()
                                        } else if (state == MediaConfigurationState.Successful && (this.OnConfigurationComplete(), this.mIsDisposed)) return
                                    }

                                    for (var evt; null != (evt = this.mNetwork.Dequeue());) {
                                        console.error(">>>>>>>>>>>>>> InnerAWebRtcCall.prototype.Update.Dequeue", evt);
                                        switch (evt.Type) {
                                            case NetEventType.NewConnection:
                                                if (this.mState == CallState.WaitingForIncomingCall || this.mConferenceMode && this.mState == CallState.InCall) {
                                                    if (0 == this.mConferenceMode && this.mNetwork.StopServer(), this.mState = CallState.InCall, this.mConnectionInfo.AddConnection(evt.ConnectionId, true), this.TriggerCallEvent(new CallAcceptedEventArgs(evt.ConnectionId)), this.mIsDisposed) return
                                                } else if (this.mState == CallState.WaitingForOutgoingCall) {
                                                    if (this.mConnectionInfo.AddConnection(evt.ConnectionId, false), this.mState = CallState.InCall, this.TriggerCallEvent(new CallAcceptedEventArgs(evt.ConnectionId)), this.mIsDisposed) return
                                                } else SLog.LogWarning("Received incoming connection during invalid state " + this.mState);
                                                break;
                                            case NetEventType.ConnectionFailed:
                                                if (this.mState == CallState.WaitingForOutgoingCall) {
                                                    if (this.TriggerCallEvent(new ErrorEventArgs(CallEventType.ConnectionFailed)), this.mIsDisposed) return;
                                                    this.mState = CallState.Configured
                                                } else SLog.LogError("Received ConnectionFailed during " + this.mState);
                                                break;
                                            case NetEventType.Disconnected:
                                                if (this.mConnectionInfo.HasConnection(evt.ConnectionId) && (this.mConnectionInfo.RemConnection(evt.ConnectionId), 0 == this.mConferenceMode && 0 == this.mConnectionInfo.GetIds().length && (this.mState = CallState.Closed), this.TriggerCallEvent(new CallEndedEventArgs(evt.ConnectionId)), this.mIsDisposed)) return;
                                                break;
                                            case NetEventType.ServerInitialized:
                                                if (this.mServerInactive = false, this.mState = CallState.WaitingForIncomingCall, this.TriggerCallEvent(new WaitForIncomingCallEventArgs(evt.Info)), this.mIsDisposed) return;
                                                break;
                                            case NetEventType.ServerInitFailed:
                                                if (this.mServerInactive = true, this.mState = CallState.Configured, this.TriggerCallEvent(new ErrorEventArgs(CallEventType.ListeningFailed)), this.mIsDisposed) return;
                                                break;
                                            case NetEventType.ServerClosed:
                                                if (this.mServerInactive = true, (this.mState == CallState.WaitingForIncomingCall || this.mState == CallState.RequestingAddress) && (this.mState = CallState.Configured, this.TriggerCallEvent(new ErrorEventArgs(CallEventType.ListeningFailed, CallErrorType.Unknown, "Server closed the connection while waiting for incoming calls.")), this.mIsDisposed)) return;
                                                break;
                                            case NetEventType.ReliableMessageReceived:
                                            case NetEventType.UnreliableMessageReceived:
                                                var n = evt.Type === NetEventType.ReliableMessageReceived;
                                                if (evt.MessageData.length >= 2) if (evt.MessageData[0] == this.MESSAGE_TYPE_STRING) {
                                                    var r = this.UnpackStringMsg(evt.MessageData);
                                                    this.TriggerCallEvent(new MessageEventArgs(evt.ConnectionId, r, n))
                                                } else if (evt.MessageData[0] == this.MESSAGE_TYPE_DATA) {
                                                    r = this.UnpackDataMsg(evt.MessageData);
                                                    this.TriggerCallEvent(new DataMessageEventArgs(evt.ConnectionId, r, n))
                                                }
                                                if (this.mIsDisposed) return
                                        }
                                    }
                                    // console.log(">>>>>>>>>>>>>> InnerAWebRtcCall.prototype.Update.mMediaConfig",this.mMediaConfig);
                                    // console.log(">>>>>>>>>>>>>> InnerAWebRtcCall.prototype.Update.mNetwork",this.mNetwork);//BrowserMediaNetwork
                                    // console.log(">>>>>>>>>>>>>> InnerAWebRtcCall.prototype.Update.mConnectionInfo",this.mConnectionInfo);
                                    if (this.mMediaConfig.FrameUpdates) {
                                        var frame = this.mNetwork.TryGetFrame(ConnectionId.INVALID);
                                        if (null != frame && (this.FrameToCallEvent(ConnectionId.INVALID, frame), this.mIsDisposed)) return
                                    }
                                    if (this.mMediaConfig.FrameUpdates)
                                        for (var i = 0,ids = this.mConnectionInfo.GetIds(); i < ids.length; i++) {
                                            var id = ids[i],
                                                connectionId = new ConnectionId(id),
                                                frame = this.mNetwork.TryGetFrame(connectionId);
                                            if (null != frame && (this.FrameToCallEvent(connectionId, frame), this.mIsDisposed)) return
                                        }
                                    for (var u = null; null != (u = this.mNetwork.DequeueMediaEvent());)
                                        this.MediaEventToCallEvent(u);
                                    this.mNetwork.Flush()
                                }
                            },
                            InnerAWebRtcCall.prototype.FrameToCallEvent = function(id, frame) {
                                console.log(">>>>>>>> InnerAWebRtcCall.prototype.FrameToCallEvent",frame);
                                var eventArg = new FrameUpdateEventArgs(id, frame);
                                this.TriggerCallEvent(eventArg)
                            },
                            InnerAWebRtcCall.prototype.MediaEventToCallEvent = function(e) {
                                if (e.EventType == e.EventType) {
                                    var t = new MediaUpdatedEventArgs(e.ConnectionId, e.Args);
                                    this.TriggerCallEvent(t)
                                }
                            },
                            InnerAWebRtcCall.prototype.PendingCall = function(e) {
                                this.mPendingAddress = e,
                                    this.mPendingCallCall = true,
                                    this.mPendingListenCall = false
                            },
                            InnerAWebRtcCall.prototype.ProcessCall = function(e) {
                                console.log(">>>>>>>>>>>>>>>>>>>> InnerAWebRtcCall.prototype.ProcessCall",e);;
                                this.mState = CallState.WaitingForOutgoingCall,
                                    this.mNetwork.Connect(e),
                                    this.ClearPending()
                            },
                            InnerAWebRtcCall.prototype.PendingListen = function(address) {
                                console.log(">>>>>>>>>>>>>>>>>> AWebRtcCall.PendingListen",address);
                                this.mPendingAddress = address,
                                    this.mPendingCallCall = false,
                                    this.mPendingListenCall = true
                            },
                            InnerAWebRtcCall.prototype.ProcessListen = function(address) {
                                console.log(">>>>>>>>>>>>>>>>>> AWebRtcCall.ProcessListen",address);
                                SLog.Log("Listen at " + address),
                                    this.mServerInactive = false,
                                    this.mState = CallState.RequestingAddress,
                                    this.mNetwork.StartServer(address),
                                    this.ClearPending()
                            },
                            InnerAWebRtcCall.prototype.DoPending = function() {
                                this.mPendingCallCall ? this.ProcessCall(this.mPendingAddress) : this.mPendingListenCall && this.ProcessListen(this.mPendingAddress),
                                    this.ClearPending()
                            },
                            InnerAWebRtcCall.prototype.ClearPending = function() {
                                this.mPendingAddress = null,
                                    this.mPendingCallCall = null,
                                    this.mPendingListenCall = null
                            },
                            InnerAWebRtcCall.prototype.CheckDisposed = function() {
                                if (this.mIsDisposed) throw new ee("Object is disposed. No method calls possible.")
                            },
                            InnerAWebRtcCall.prototype.EnsureConfiguration = function() {
                                console.log(">>>>>>>>>>>>>>>>>> AWebRtcCall.EnsureConfiguration",CallState[this.mState]);
                                this.mState == CallState.Initialized && (SLog.Log("Use default configuration"), this.Configure(new MediaConfig))
                            },
                            InnerAWebRtcCall.prototype.TriggerCallEvent = function(evnt) {
                                console.log(">>>>>>>>>>>>>>>>>> AWebRtcCall.TriggerCallEvent",this.mCallEventHandlers);
                                for (var i = 0,
                                         handlers = this.mCallEventHandlers.slice(); i < handlers.length; i++) { (0, handlers[i])(this, evnt)
                                }
                            },
                            InnerAWebRtcCall.prototype.OnConfigurationComplete = function() {
                                this.mIsDisposed || (this.mState = CallState.Configured, SLog.Log("Enter state CallState.Configured"), this.TriggerCallEvent(new CallEventArgs(CallEventType.ConfigurationComplete)), 0 == this.mIsDisposed && this.DoPending())
                            },
                            InnerAWebRtcCall.prototype.OnConfigurationFailed = function(e) {
                                SLog.LogWarning("Configuration failed: " + e),
                                this.mIsDisposed || (this.mState = CallState.Initialized, this.TriggerCallEvent(new ErrorEventArgs(CallEventType.ConfigurationFailed, CallErrorType.Unknown, e)), 0 == this.mIsDisposed && this.ClearPending())
                            },
                            InnerAWebRtcCall.prototype.DisposeInternal = function(e) {
                                this.mIsDisposed || (this.mIsDisposed = true)
                            },
                            InnerAWebRtcCall.prototype.Dispose = function() {
                                this.DisposeInternal(true)
                            },
                            InnerAWebRtcCall
                    } (),
                    ie = function() {
                        var e = function(t, n) {
                            return (e = Object.setPrototypeOf || {
                                    __proto__: []
                                }
                                instanceof Array &&
                                function(e, t) {
                                    e.__proto__ = t
                                } ||
                                function(e, t) {
                                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                                })(t, n)
                        };
                        return function(t, n) {
                            function r() {
                                this.constructor = t
                            }
                            e(t, n),
                                t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                        }
                    } (); !
                    function(e) {
                        e[e.Invalid = 0] = "Invalid",
                            e[e.Format32bppargb = 1] = "Format32bppargb"
                    } (FramePixelFormat || (FramePixelFormat = {}));
                var IFrameData = function() {
                        function e() {}
                        return Object.defineProperty(e.prototype, "Format", {
                            get: function() {
                                return FramePixelFormat.Format32bppargb
                            },
                            enumerable: true,
                            configurable: true
                        }),
                            Object.defineProperty(e.prototype, "Buffer", {
                                get: function() {
                                    return null
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(e.prototype, "Width", {
                                get: function() {
                                    return - 1
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(e.prototype, "Height", {
                                get: function() {
                                    return - 1
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            e
                    } (),
                    RawFrame = function(e) {
                        function InnerRawFrame(buffer, width, height) {
                            var i = e.call(this) || this;
                            return i.mBuffer = null,
                                i.mBuffer = buffer,
                                i.mWidth = width,
                                i.mHeight = height,
                                i
                        }
                        return ie(InnerRawFrame, e),
                            Object.defineProperty(InnerRawFrame.prototype, "Buffer", {
                                get: function() {
                                    return this.mBuffer
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerRawFrame.prototype, "Width", {
                                get: function() {
                                    return this.mWidth
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerRawFrame.prototype, "Height", {
                                get: function() {
                                    return this.mHeight
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            InnerRawFrame
                    } (IFrameData),
                    LazyFrame = function(e) {

                        console.log("LazyFrame",e);
                        console.log("this",this);
                        function InnerLazyFrame(t) {
                            //console.log("LazyFrame.t",t);
                            var n = e.call(this) || this;
                            return n.mFrameGenerator = t,
                                n
                        }
                        return ie(InnerLazyFrame, e),
                            Object.defineProperty(InnerLazyFrame.prototype, "FrameGenerator", {
                                get: function() {
                                    return this.mFrameGenerator
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerLazyFrame.prototype, "Buffer", {
                                get: function() {
                                    return this.GenerateFrame(),
                                        null == this.mRawFrame ? null: this.mRawFrame.Buffer
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerLazyFrame.prototype, "Width", {
                                get: function() {
                                    return this.GenerateFrame(),
                                        null == this.mRawFrame ? -1 : this.mRawFrame.Width
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(InnerLazyFrame.prototype, "Height", {
                                get: function() {
                                    return this.GenerateFrame(),
                                        null == this.mRawFrame ? -1 : this.mRawFrame.Height
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            InnerLazyFrame.prototype.GenerateFrame = function() {
                                if (null == this.mRawFrame) try {
                                    this.mRawFrame = this.mFrameGenerator.CreateFrame()
                                } catch(e) {
                                    this.mRawFrame = null,
                                        SLog.LogWarning("frame skipped in GenerateFrame due to exception: " + JSON.stringify(e))
                                }
                            },
                            InnerLazyFrame
                    } (IFrameData),
                    BrowserMediaStream = function() {
                        function InnerBrowserMediaStream(stream) {
                            if (this.mBufferedFrame = null, this.mInstanceId = 0, this.mCanvasElement = null, this.mIsActive = false, this.mMsPerFrame = 1 / InnerBrowserMediaStream.DEFAULT_FRAMERATE * 1e3, this.mFrameRateKnown = false, this.mLastFrameTime = 0, this.mLastFrameNumber = 0, this.mHasVideo = false, this.InternalStreamAdded = null, this.mStream = stream, this.mInstanceId = InnerBrowserMediaStream.sNextInstanceId, InnerBrowserMediaStream.sNextInstanceId++, this.mStream.getVideoTracks().length > 0) {
                                this.mHasVideo = true;
                                var n = this.mStream.getVideoTracks()[0].getSettings().frameRate;
                                n && (this.mMsPerFrame = 1 / n * 1e3, this.mFrameRateKnown = true)
                            }
                            this.SetupElements()
                        }
                        return Object.defineProperty(InnerBrowserMediaStream.prototype, "Stream", {
                            get: function() {
                                return this.mStream
                            },
                            enumerable: true,
                            configurable: true
                        }),
                            Object.defineProperty(InnerBrowserMediaStream.prototype, "VideoElement", {
                                get: function() {
                                    return this.mVideoElement
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            InnerBrowserMediaStream.prototype.CheckFrameRate = function() {
                                this.mVideoElement && void 0 !== this.mVideoElement.webkitDecodedFrameCount && (this.mFrameRateKnown = true),
                                false === this.mFrameRateKnown && SLog.LW("Framerate unknown. Using default framerate of " + InnerBrowserMediaStream.DEFAULT_FRAMERATE)
                            },
                            InnerBrowserMediaStream.prototype.SetupElements = function() {
                                console.log(">>>>>>>>>>>>>>> BrowserMediaStream.SetupElements");
                                var e = this;
                                this.mVideoElement = this.SetupVideoElement(),
                                    console.log("video element created. video tracks: " + this.mStream.getVideoTracks().length),
                                    this.mVideoElement.onloadedmetadata = function(t) {
                                        console.log("onloadedmetadata", this);
                                        if (null != e.mVideoElement) {
                                            var n = e.mVideoElement.play();
                                            void 0 !== n && n.then(function() {}).
                                            catch(function(e) {
                                                SLog.LE("Replay of video failed. This error is likely caused due to autoplay restrictions of the browser. Try allowing autoplay."),
                                                    console.error(e)
                                            }),
                                            null != e.InternalStreamAdded && e.InternalStreamAdded(e),
                                                e.CheckFrameRate(),
                                                console.log("Resolution: " + e.mVideoElement.videoWidth + "x" + e.mVideoElement.videoHeight),
                                                e.mHasVideo ? (e.mCanvasElement = e.SetupCanvas(), null == e.mCanvasElement && (e.mHasVideo = false)) : e.mCanvasElement = null,
                                                e.mIsActive = true
                                        }
                                        else{
                                            console.log("e.mVideoElement==null",e);
                                        }
                                    };

                                console.log("mStream", this.mStream);

                                try {
                                    this.mVideoElement.srcObject = this.mStream
                                    console.log("srcObject", this.mVideoElement.srcObject);
                                } catch(e) {
                                    this.mVideoElement.src = window.URL.createObjectURL(this.mStream)
                                    console.log("src", this.mVideoElement.src);
                                }
                            },
                            InnerBrowserMediaStream.prototype.GetFrameNumber = function() {
                                return this.mVideoElement && this.mVideoElement.webkitDecodedFrameCount || -1
                            },
                            InnerBrowserMediaStream.prototype.TryGetFrame = function() {
                                console.log(">>>>>>>>>>>>>>> BrowserMediaStream.TryGetFrame");
                                this.EnsureLatestFrame();
                                var f = this.mBufferedFrame;
                                console.log("frame f:",f);
                                return this.mBufferedFrame = null,f
                            },
                            InnerBrowserMediaStream.prototype.SetMute = function(e) {
                                this.mVideoElement.muted = e
                            },
                            InnerBrowserMediaStream.prototype.PeekFrame = function() {
                                return this.EnsureLatestFrame(),
                                    this.mBufferedFrame
                            },
                            InnerBrowserMediaStream.prototype.EnsureLatestFrame = function() {
                                //console.log(">>>>>>>>>>>>>>> BrowserMediaStream.EnsureLatestFrame");
                                return !! this.HasNewerFrame() && (this.FrameToBuffer(), true)
                            },
                            InnerBrowserMediaStream.prototype.HasNewerFrame = function() {
                                var hasNewer=false;
                                if (this.mIsActive && this.mHasVideo && null != this.mCanvasElement)
                                    if (this.mLastFrameNumber > 0) {
                                        if (this.GetFrameNumber() > this.mLastFrameNumber)
                                            hasNewer = true
                                    } else if ((new Date).getTime() - this.mLastFrameTime >= this.mMsPerFrame)
                                        hasNewer= true;
                                //console.log(">>>>>>>>>>>>>>> BrowserMediaStream.HasNewerFrame",hasNewer);
                                return hasNewer;
                            },
                            InnerBrowserMediaStream.prototype.Update = function() {},
                            InnerBrowserMediaStream.prototype.DestroyCanvas = function() {
                                null != this.mCanvasElement && null != this.mCanvasElement.parentElement && this.mCanvasElement.parentElement.removeChild(this.mCanvasElement)
                            },
                            InnerBrowserMediaStream.prototype.Dispose = function() {
                                this.mIsActive = false,
                                    this.DestroyCanvas(),
                                null != this.mVideoElement && null != this.mVideoElement.parentElement && this.mVideoElement.parentElement.removeChild(this.mVideoElement);
                                for (var e = this.mStream.getTracks(), t = 0; t < e.length; t++) e[t].stop();
                                this.mStream = null,
                                    this.mVideoElement = null,
                                    this.mCanvasElement = null
                            },
                            InnerBrowserMediaStream.prototype.CreateFrame = function() {
                                this.mCanvasElement.width = this.mVideoElement.videoWidth,
                                    this.mCanvasElement.height = this.mVideoElement.videoHeight;
                                var context = this.mCanvasElement.getContext("2d");
                                context.clearRect(0, 0, this.mCanvasElement.width, this.mCanvasElement.height),
                                    context.drawImage(this.mVideoElement, 0, 0);
                                try {
                                    var data = context.getImageData(0, 0, this.mCanvasElement.width, this.mCanvasElement.height).data,
                                        array = new Uint8Array(data.buffer);
                                    return new RawFrame(array, this.mCanvasElement.width, this.mCanvasElement.height)
                                } catch(e) { (array = new Uint8Array(this.mCanvasElement.width * this.mCanvasElement.height * 4)).fill(255, 0, array.length - 1);
                                    var frame = new RawFrame(array, this.mCanvasElement.width, this.mCanvasElement.height);
                                    return SLog.LogWarning("Firefox workaround: Refused access to the remote video buffer. Retrying next frame..."),
                                        this.DestroyCanvas(),
                                        this.mCanvasElement = this.SetupCanvas(),
                                        frame
                                }
                            },
                            InnerBrowserMediaStream.prototype.FrameToBuffer = function() {
                                //console.log(">>>>>>>>>>>>>>> BrowserMediaStream.FrameToBuffer");
                                this.mLastFrameTime = (new Date).getTime(),
                                    this.mLastFrameNumber = this.GetFrameNumber(),
                                    this.mBufferedFrame = new LazyFrame(this)
                            },
                            InnerBrowserMediaStream.prototype.SetupVideoElement = function() {
                                console.log(">>>>>>>>>>>>>>> BrowserMediaStream.SetupVideoElement");
                                var t = document.createElement("video");
                                console.log("video",t);
                                return t.width = 320,
                                    t.height = 240,
                                    t.controls = true,
                                    t.id = "awrtc_mediastream_video_" + this.mInstanceId,
                                InnerBrowserMediaStream.DEBUG_SHOW_ELEMENTS && document.body.appendChild(t),
                                    t
                            },
                            InnerBrowserMediaStream.prototype.SetupCanvas = function() {
                                if (null == this.mVideoElement || this.mVideoElement.videoWidth <= 0 || this.mVideoElement.videoHeight <= 0) return null;
                                var t = document.createElement("canvas");
                                return t.width = this.mVideoElement.videoWidth,
                                    t.height = this.mVideoElement.videoHeight,
                                    t.id = "awrtc_mediastream_canvas_" + this.mInstanceId,
                                InnerBrowserMediaStream.DEBUG_SHOW_ELEMENTS && document.body.appendChild(t),
                                    t
                            },
                            InnerBrowserMediaStream.prototype.SetVolume = function(e) {
                                null != this.mVideoElement && (e < 0 && (e = 0), e > 1 && (e = 1), this.mVideoElement.volume = e)
                            },
                            InnerBrowserMediaStream.prototype.HasAudioTrack = function() {
                                return null != this.mStream && null != this.mStream.getAudioTracks() && this.mStream.getAudioTracks().length > 0
                            },
                            InnerBrowserMediaStream.prototype.HasVideoTrack = function() {
                                return null != this.mStream && null != this.mStream.getVideoTracks() && this.mStream.getVideoTracks().length > 0
                            },
                            InnerBrowserMediaStream.DEBUG_SHOW_ELEMENTS = false,
                            InnerBrowserMediaStream.sUseLazyFrames = true,
                            InnerBrowserMediaStream.sNextInstanceId = 1,
                            InnerBrowserMediaStream.DEFAULT_FRAMERATE = 25,
                            InnerBrowserMediaStream
                    } (),
                    BasePeer = function() {
                        var e = function(t, n) {
                            return (e = Object.setPrototypeOf || {
                                    __proto__: []
                                }
                                instanceof Array &&
                                function(e, t) {
                                    e.__proto__ = t
                                } ||
                                function(e, t) {
                                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                                })(t, n)
                        };
                        return function(t, n) {
                            function r() {
                                this.constructor = t
                            }
                            e(t, n),
                                t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                        }
                    } (),
                    MediaPeer = function(e) {
                        function InnerMediaPeer() {
                            console.log(">>>>>>>>>>>>>>>>>>>>>> InnerMediaPeer.ctor",arguments);
                            var t = null !== e && e.apply(this, arguments) || this;
                            return t.mRemoteStream = null,
                                t.InternalStreamAdded = null,
                                t
                        }
                        return BasePeer(InnerMediaPeer, e),
                            InnerMediaPeer.prototype.OnSetup = function() {
                                console.log(">>>>>>>>>>>>>> OnSetup");
                                var n = this;
                                e.prototype.OnSetup.call(this),
                                    this.mOfferOptions = {
                                        offerToReceiveAudio: true,
                                        offerToReceiveVideo: true
                                    },
                                    InnerMediaPeer.sUseObsolete ? (SLog.LW("Using obsolete onaddstream as not all browsers support ontrack"), this.mPeer.onaddstream = function(e) {
                                        n.OnAddStream(e)
                                    }) : this.mPeer.ontrack = function(e) {
                                        n.OnTrack(e)
                                    }
                            },
                            InnerMediaPeer.prototype.OnCleanup = function() {
                                e.prototype.OnCleanup.call(this),
                                null != this.mRemoteStream && (this.mRemoteStream.Dispose(), this.mRemoteStream = null)
                            },
                            InnerMediaPeer.prototype.OnAddStream = function(e) {
                                console.log(">>>>>>>>>>>>>> OnAddStream",e);
                                this.SetupStream(e.stream)
                            },
                            InnerMediaPeer.prototype.OnTrack = function(e) {
                                console.log(">>>>>>>>>>>>>> OnTrack");
                                e && e.streams && e.streams.length > 0 ? null == this.mRemoteStream && this.SetupStream(e.streams[0]) : SLog.LE("Unexpected RTCTrackEvent: " + JSON.stringify(e))
                            },
                            InnerMediaPeer.prototype.SetupStream = function(e) {
                                console.log(">>>>>>>>>>>>>> SetupStream",e);
                                var t = this;
                                this.mRemoteStream = new BrowserMediaStream(e),
                                    this.mRemoteStream.InternalStreamAdded = function(e) {
                                        null != t.InternalStreamAdded && t.InternalStreamAdded(t, e)
                                    }
                            },
                            InnerMediaPeer.prototype.TryGetRemoteFrame = function() {
                                console.log(">>>>>>>>>>>>>> TryGetRemoteFrame",this.mRemoteStream);
                                return null == this.mRemoteStream ? null: this.mRemoteStream.TryGetFrame()
                            },
                            InnerMediaPeer.prototype.PeekFrame = function() {
                                //console.log(">>>>>>>>>>>>>> PeekFrame");
                                return null == this.mRemoteStream ? null: this.mRemoteStream.PeekFrame()
                            },
                            InnerMediaPeer.prototype.AddLocalStream = function(e) {
                                //console.log(">>>>>>>>>>>>>> AddLocalStream",e);
                                if (InnerMediaPeer.sUseObsolete) this.mPeer.addStream(e);
                                else for (var n = 0,
                                              r = e.getTracks(); n < r.length; n++) {
                                    var i = r[n];
                                    this.mPeer.addTrack(i, e)
                                }
                            },
                            InnerMediaPeer.prototype.Update = function() {
                                e.prototype.Update.call(this),
                                null != this.mRemoteStream && this.mRemoteStream.Update()
                            },
                            InnerMediaPeer.prototype.SetVolume = function(e) {
                                null != this.mRemoteStream && this.mRemoteStream.SetVolume(e)
                            },
                            InnerMediaPeer.prototype.HasAudioTrack = function() {
                                console.log(">>>>>>>>>>>>>> HasAudioTrack",this.mRemoteStream);
                                return null != this.mRemoteStream && this.mRemoteStream.HasAudioTrack()
                            },
                            InnerMediaPeer.prototype.HasVideoTrack = function() {
                                console.log(">>>>>>>>>>>>>> HasVideoTrack",this.mRemoteStream);
                                return null != this.mRemoteStream && this.mRemoteStream.HasVideoTrack()
                            },
                            InnerMediaPeer.sUseObsolete = false,
                            InnerMediaPeer
                    } (WebRtcDataPeer),
                    DeviceInfo = function() {
                        return function() {
                            this.deviceId = null,
                                this.defaultLabel = null,
                                this.label = null,
                                this.isLabelGuessed = true
                        }
                    } (),
                    DeviceApi = function() {
                        function e() {}
                        return Object.defineProperty(e, "LastUpdate", {
                            get: function() {
                                return e.sLastUpdate
                            },
                            enumerable: true,
                            configurable: true
                        }),
                            Object.defineProperty(e, "HasInfo", {
                                get: function() {
                                    return e.sLastUpdate > 0
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(e, "IsPending", {
                                get: function() {
                                    return e.sIsPending
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            Object.defineProperty(e, "LastError", {
                                get: function() {
                                    return this.sLastError
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            e.AddOnChangedHandler = function(t) {
                                e.sUpdateEvents.push(t)
                            },
                            e.RemOnChangedHandler = function(t) {
                                var n = e.sUpdateEvents.indexOf(t);
                                n >= 0 && e.sUpdateEvents.splice(n, 1)
                            },
                            e.TriggerChangedEvent = function() {
                                for (var t = 0,
                                         n = e.sUpdateEvents; t < n.length; t++) {
                                    var r = n[t];
                                    try {
                                        r()
                                    } catch(e) {
                                        SLog.LE("Error in DeviceApi user event handler: " + e),
                                            console.exception(e)
                                    }
                                }
                            },
                            Object.defineProperty(e, "Devices", {
                                get: function() {
                                    return e.sDeviceInfo
                                },
                                enumerable: true,
                                configurable: true
                            }),
                            e.Reset = function() {
                                e.sUpdateEvents = [],
                                    e.sLastUpdate = 0,
                                    e.sDeviceInfo = {},
                                    e.sVideoDeviceCounter = 1,
                                    e.sAccessStream = null,
                                    e.sLastError = null,
                                    e.sIsPending = false
                            },
                            e.Update = function() {
                                e.sLastError = null,
                                    e.IsApiAvailable() ? (e.sIsPending = true, navigator.mediaDevices.enumerateDevices().then(e.InternalOnEnum).
                                    catch(e.InternalOnErrorCatch)) : e.InternalOnErrorString("Can't access mediaDevices or enumerateDevices")
                            },
                            e.IsApiAvailable = function() {
                                return !! (navigator && navigator.mediaDevices && navigator.mediaDevices.enumerateDevices)
                            },
                            e.RequestUpdate = function() {
                                if (e.sLastError = null, e.IsApiAvailable()) {
                                    e.sIsPending = true;
                                    navigator.mediaDevices.getUserMedia({
                                        video: true
                                    }).then(e.InternalOnStream).
                                    catch(e.InternalOnErrorCatch)
                                } else e.InternalOnErrorString("Can't access mediaDevices or enumerateDevices")
                            },
                            e.GetDeviceId = function(t) {
                                var n = e.Devices;
                                for (var r in n) {
                                    var i = n[r];
                                    if (i.label == t || i.defaultLabel == t || i.deviceId == t) return i.deviceId
                                }
                                return null
                            },
                            e.sLastUpdate = 0,
                            e.sIsPending = false,
                            e.sLastError = null,
                            e.sDeviceInfo = {},
                            e.sVideoDeviceCounter = 1,
                            e.sAccessStream = null,
                            e.sUpdateEvents = [],
                            e.InternalOnEnum = function(t) {
                                e.sIsPending = false,
                                    e.sLastUpdate = (new Date).getTime();
                                for (var n = {},
                                         r = 0,
                                         i = t; r < i.length; r++) {
                                    var o = i[r];
                                    if ("videoinput" == o.kind) {
                                        var a = new DeviceInfo;
                                        a.deviceId = o.deviceId;
                                        var s = null;
                                        a.deviceId in e.Devices && (s = e.Devices[a.deviceId]),
                                            null != s ? a.defaultLabel = s.defaultLabel: (a.defaultLabel = o.kind + " " + e.sVideoDeviceCounter, e.sVideoDeviceCounter++),
                                            null != s && 0 == s.isLabelGuessed ? (a.label = s.label, a.isLabelGuessed = false) : o.label ? (a.label = o.label, a.isLabelGuessed = false) : (a.label = a.defaultLabel, a.isLabelGuessed = true),
                                            n[a.deviceId] = a
                                    }
                                }
                                if (e.sDeviceInfo = n, e.sAccessStream) {
                                    for (var c = e.sAccessStream.getTracks(), d = 0; d < c.length; d++) c[d].stop();
                                    e.sAccessStream = null
                                }
                                e.TriggerChangedEvent()
                            },
                            e.InternalOnErrorCatch = function(t) {
                                var n = t.toString();
                                e.InternalOnErrorString(n)
                            },
                            e.InternalOnErrorString = function(t) {
                                e.sIsPending = false,
                                    e.sLastError = t,
                                    SLog.LE(t),
                                    e.TriggerChangedEvent()
                            },
                            e.InternalOnStream = function(t) {
                                e.sAccessStream = t,
                                    e.Update()
                            },
                            e
                    } (),
                    fe = function() {
                        var e = function(t, n) {
                            return (e = Object.setPrototypeOf || {
                                    __proto__: []
                                }
                                instanceof Array &&
                                function(e, t) {
                                    e.__proto__ = t
                                } ||
                                function(e, t) {
                                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                                })(t, n)
                        };
                        return function(t, n) {
                            function r() {
                                this.constructor = t
                            }
                            e(t, n),
                                t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                        }
                    } (),
                    BrowserMediaNetwork = function(e) {
                        function InnerBrowserMediaNetwork(conf) {
                            console.log(">>>>>>>>>>>BrowserMediaNetwork.ctor",conf);
                            var signalingConfig=InnerBrowserMediaNetwork.BuildSignalingConfig(conf.SignalingUrl);
                            var rtcConfig=InnerBrowserMediaNetwork.BuildRtcConfig(conf.IceServers);
                            var r = e.call(this, signalingConfig, rtcConfig) || this;
                            return r.mMediaConfig = null,
                                r.mLocalStream = null,
                                r.mConfigurationState = MediaConfigurationState.Invalid,
                                r.mConfigurationError = null,
                                r.mMediaEvents = new Queue,
                                r.MediaPeer_InternalMediaStreamAdded = function(e, t) {
                                    r.EnqueueMediaEvent(MediaEventType.StreamAdded, e.ConnectionId, t.VideoElement)
                                },
                                r.mConfigurationState = MediaConfigurationState.NoConfiguration,
                                r
                        }
                        return fe(InnerBrowserMediaNetwork, e),
                            InnerBrowserMediaNetwork.prototype.Configure = function(mediaConf) {

                                console.log(">>>>>>>>>>>>>>>>> BrowserMediaNetwork.Configure",mediaConf);
                                var t = this;
                                if (this.mMediaConfig = mediaConf, this.mConfigurationError = null, this.mConfigurationState = MediaConfigurationState.InProgress, mediaConf.Audio || mediaConf.Video) {
                                    console.log("Configure 1");
                                    var n = {
                                            audio: mediaConf.Audio
                                        },
                                        r = {},
                                        i = {},
                                        o = {},
                                        a = {}; - 1 != mediaConf.MinWidth && (r.min = mediaConf.MinWidth),
                                    -1 != mediaConf.MaxWidth && (r.max = mediaConf.MaxWidth),
                                    -1 != mediaConf.IdealWidth && (r.ideal = mediaConf.IdealWidth),
                                    -1 != mediaConf.MinHeight && (i.min = mediaConf.MinHeight),
                                    -1 != mediaConf.MaxHeight && (i.max = mediaConf.MaxHeight),
                                    -1 != mediaConf.IdealHeight && (i.ideal = mediaConf.IdealHeight),
                                    -1 != mediaConf.MinFps && (a.min = mediaConf.MinFps),
                                    -1 != mediaConf.MaxFps && (a.max = mediaConf.MaxFps),
                                    -1 != mediaConf.IdealFps && (a.ideal = mediaConf.IdealFps);
                                    var s = null;
                                    if (mediaConf.Video && mediaConf.VideoDeviceName && "" !== mediaConf.VideoDeviceName && (s = DeviceApi.GetDeviceId(mediaConf.VideoDeviceName), SLog.L("using device " + mediaConf.VideoDeviceName), null !== s || SLog.LE("Failed to find deviceId for label " + mediaConf.VideoDeviceName)), 0 == mediaConf.Video ? o = false : (Object.keys(r).length > 0 && (o.width = r), Object.keys(i).length > 0 && (o.height = i), Object.keys(a).length > 0 && (o.frameRate = a), null !== s && (o.deviceId = {
                                        exact: s
                                    }), 0 == Object.keys(o).length && (o = true)), n.video = o, SLog.L("calling GetUserMedia. Media constraints: " + JSON.stringify(n)), navigator && navigator.mediaDevices) {
                                        var c = navigator.mediaDevices.getUserMedia(n);
                                        c.then(function(e) {
                                            DeviceApi.Update(),
                                                t.mLocalStream = new BrowserMediaStream(e),
                                                t.mLocalStream.InternalStreamAdded = function(e) {
                                                    t.EnqueueMediaEvent(MediaEventType.StreamAdded, ConnectionId.INVALID, t.mLocalStream.VideoElement)
                                                },
                                                t.mLocalStream.SetMute(true),
                                                t.OnConfigurationSuccess()
                                        }),
                                            c.
                                            catch(function(e) {
                                                SLog.LE("BrowserMediaNetwork.Configure.getUserMedia",e.name + ": " + e.message),
                                                    t.OnConfigurationFailed(e.message)
                                            })
                                    } else {
                                        var d = "Configuration failed. navigator.mediaDevices is unedfined. The browser might not allow media access.Is the page loaded via http or file URL? Some browsers only support https!";
                                        SLog.LE(d),
                                            this.OnConfigurationFailed(d)
                                    }
                                } else this.OnConfigurationSuccess()
                            },
                            InnerBrowserMediaNetwork.prototype.Update = function() {
                                e.prototype.Update.call(this),
                                null != this.mLocalStream && this.mLocalStream.Update()
                            },
                            InnerBrowserMediaNetwork.prototype.EnqueueMediaEvent = function(e, t, n) {
                                var r = new MediaEvent(e, t, n);
                                this.mMediaEvents.Enqueue(r)
                            },
                            InnerBrowserMediaNetwork.prototype.DequeueMediaEvent = function() {
                                return this.mMediaEvents.Dequeue()
                            },
                            InnerBrowserMediaNetwork.prototype.Flush = function() {
                                e.prototype.Flush.call(this),
                                    this.mMediaEvents.Clear()
                            },
                            InnerBrowserMediaNetwork.prototype.GetConfigurationState = function() {
                                return this.mConfigurationState
                            },
                            InnerBrowserMediaNetwork.prototype.GetConfigurationError = function() {
                                return this.mConfigurationError
                            },
                            InnerBrowserMediaNetwork.prototype.ResetConfiguration = function() {
                                this.mConfigurationState = MediaConfigurationState.NoConfiguration,
                                    this.mMediaConfig = new MediaConfig,
                                    this.mConfigurationError = null
                            },
                            InnerBrowserMediaNetwork.prototype.OnConfigurationSuccess = function() {
                                console.log(">>>>>>>>>>>>>>>>> BrowserMediaNetwork.OnConfigurationSuccess");
                                this.mConfigurationState = MediaConfigurationState.Successful
                            },
                            InnerBrowserMediaNetwork.prototype.OnConfigurationFailed = function(e) {
                                this.mConfigurationError = e,
                                    this.mConfigurationState = MediaConfigurationState.Failed
                            },
                            InnerBrowserMediaNetwork.prototype.PeekFrame = function(e) {
                                if (null != e) {
                                    if (e.id == ConnectionId.INVALID.id) {
                                        if (null != this.mLocalStream) return this.mLocalStream.PeekFrame()
                                    } else {
                                        var t = this.IdToConnection[e.id];
                                        if (null != t) return t.PeekFrame()
                                    }
                                    return null
                                }
                            },
                            InnerBrowserMediaNetwork.prototype.TryGetFrame = function(cId) {
                                //InnerAWebRtcCall.Update -> BrowserMediaNetwork.TryGetFrame
                                //console.log(">>>>>>>>>>>>>>>>> BrowserMediaNetwork.TryGetFrame",cId);
                                if (null != cId) {
                                    if (cId.id == ConnectionId.INVALID.id) {
                                        //console.log(">>>>>>>>>>>>>>>>> mLocalStream",this.mLocalStream);
                                        if (null != this.mLocalStream) return this.mLocalStream.TryGetFrame()
                                    } else {
                                        var t = this.IdToConnection[cId.id];
                                        if (null != t) return t.TryGetRemoteFrame()
                                    }
                                    return null
                                }
                            },
                            InnerBrowserMediaNetwork.prototype.SetVolume = function(e, t) {
                                SLog.L("SetVolume called. Volume: " + e + " id: " + t.id);
                                var n = this.IdToConnection[t.id];
                                if (null != n) return n.SetVolume(e)
                            },
                            InnerBrowserMediaNetwork.prototype.HasAudioTrack = function(e) {
                                var t = this.IdToConnection[e.id];
                                return null != t && t.HasAudioTrack()
                            },
                            InnerBrowserMediaNetwork.prototype.HasVideoTrack = function(e) {
                                var t = this.IdToConnection[e.id];
                                return null != t && t.HasVideoTrack()
                            },
                            InnerBrowserMediaNetwork.prototype.IsMute = function() {
                                if (null != this.mLocalStream && null != this.mLocalStream.Stream) {
                                    var e = this.mLocalStream.Stream.getAudioTracks();
                                    if (e.length > 0 && e[0].enabled) return false
                                }
                                return true
                            },
                            InnerBrowserMediaNetwork.prototype.SetMute = function(e) {
                                if (null != this.mLocalStream && null != this.mLocalStream.Stream) {
                                    var t = this.mLocalStream.Stream.getAudioTracks();
                                    t.length > 0 && (t[0].enabled = !e)
                                }
                            },
                            InnerBrowserMediaNetwork.prototype.CreatePeer = function(id, offer) {
                                console.log(">>>>>>>>>>>> InnerBrowserMediaNetwork.prototype.CreatePeer",offer);
                                var peer = new MediaPeer(id, offer);
                                return peer.InternalStreamAdded = this.MediaPeer_InternalMediaStreamAdded,
                                null != this.mLocalStream && peer.AddLocalStream(this.mLocalStream.Stream),
                                    peer
                            },
                            InnerBrowserMediaNetwork.prototype.DisposeInternal = function() {
                                e.prototype.DisposeInternal.call(this),
                                    this.DisposeLocalStream()
                            },
                            InnerBrowserMediaNetwork.prototype.DisposeLocalStream = function() {
                                null != this.mLocalStream && (this.mLocalStream.Dispose(), this.mLocalStream = null, SLog.L("local buffer disposed"))
                            },
                            InnerBrowserMediaNetwork.BuildSignalingConfig = function(url) {
                                var network;
                                return network = null == url || "" == url ? new LocalNetwork: new WebsocketNetwork(url),
                                    new SignalingConfig(network)
                            },
                            InnerBrowserMediaNetwork.BuildRtcConfig = function(e) {
                                return {
                                    iceServers: e
                                }
                            },
                            InnerBrowserMediaNetwork
                    } (WebRtcNetwork),
                    he = function() {
                        var e = function(t, n) {
                            return (e = Object.setPrototypeOf || {
                                    __proto__: []
                                }
                                instanceof Array &&
                                function(e, t) {
                                    e.__proto__ = t
                                } ||
                                function(e, t) {
                                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                                })(t, n)
                        };
                        return function(t, n) {
                            function r() {
                                this.constructor = t
                            }
                            e(t, n),
                                t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                        }
                    } (),
                    BrowserWebRtcCall = function(e) {
                        function InnerBrowserWebRtcCall(t) {
                            console.log(">>>>>>>>>>>>>>>>>> BrowserWebRtcCall.ctor",t);
                            var n = e.call(this, t) || this;
                            var network=n.CreateNetwork();
                            return n.Initialize(network),//AWebRtcCall.Initialize
                                n
                        }
                        return he(InnerBrowserWebRtcCall, e),
                            InnerBrowserWebRtcCall.prototype.CreateNetwork = function() {
                                console.log(">>>>>>>>>>>>>>>>>> BrowserWebRtcCall.CreateNetwork",t);
                                return new BrowserMediaNetwork(this.mNetworkConfig)
                            },
                            InnerBrowserWebRtcCall.prototype.DisposeInternal = function(t) {
                                e.prototype.DisposeInternal.call(this, t),
                                t && (null != this.mNetwork && this.mNetwork.Dispose(), this.mNetwork = null)
                            },
                            InnerBrowserWebRtcCall
                    } (AWebRtcCall),
                    ve = {
                        Default: 0,
                        WaitForDevices: 1,
                        RequestAccess: 2
                    },
                    Ce = {
                        Uninitialized: 0,
                        Initializing: 1,
                        Initialized: 2,
                        Failed: 3
                    },
                    ye = Ce.Uninitialized;
                function func_CAPI_InitAsync(e) {
                    console.debug("CAPI_InitAsync mode: " + e),
                        ye = Ce.Initializing;
                    var t = DeviceApi.IsApiAvailable();
                    t && e == ve.WaitForDevices ? DeviceApi.Update() : t && e == ve.RequestAccess ? DeviceApi.RequestUpdate() : (ye = Ce.Initialized, 0 == t && console.debug("Initialized without accessible DeviceAPI"))
                }
                function func_CAPI_PollInitState() {
                    return 0 == DeviceApi.IsPending && ye == Ce.Initializing && (ye = Ce.Initialized, console.debug("Init completed.")),
                        ye
                }
                function func_CAPI_SLog_SetLogLevel(e) {
                    e < 0 || e > 3 ? SLog.LogError("Invalid log level " + e) : SLog.SetLogLevel(e)
                }
                var Te = {},
                    Re = 1;
                function func_CAPI_WebRtcNetwork_IsAvailable() {
                    return ! (!WebRtcNetwork || !WebsocketNetwork)
                }
                function func_CAPI_WebRtcNetwork_IsBrowserSupported() {
                    return ! (!RTCPeerConnection || !RTCDataChannel)
                }
                function func_CAPI_WebRtcNetwork_Create(e) {
                    var t = Re;
                    Re++;
                    var n, r = "LocalNetwork",
                        i = null;
                    if (null == e || "string" != typeof e || 0 === e.length) return SLog.LogError("invalid configuration. Returning -1! Config: " + e),
                        -1;
                    var o = JSON.parse(e);
                    if (!o) return SLog.LogWarning("Parsing configuration failed. Configuration: " + e),
                        -1;
                    o.signaling && (r = o.signaling.class, i = o.signaling.param),
                    o.iceServers && (n = o.iceServers),
                        SLog.L(r);
                    var a = new SignalingConfig(new("LocalNetwork" === r ? LocalNetwork: WebsocketNetwork)(i)),
                        s = {
                            iceServers: n
                        };
                    return Te[t] = new WebRtcNetwork(a, s),
                        t
                }
                function CAPI_WebRtcNetwork_Release(e) {
                    e in Te && (Te[e].Dispose(), delete Te[e])
                }
                function func_CAPI_WebRtcNetwork_Connect(id, room) {
                    return Te[id].Connect(room)
                }
                function func_CAPI_WebRtcNetwork_StartServer(e, t) {
                    Te[e].StartServer(t)
                }
                function func_CAPI_WebRtcNetwork_StopServer(e) {
                    Te[e].StopServer()
                }
                function func_CAPI_WebRtcNetwork_Disconnect(e, t) {
                    Te[e].Disconnect(new ConnectionId(t))
                }
                function func_CAPI_WebRtcNetwork_Shutdown(e) {
                    Te[e].Shutdown()
                }
                function func_CAPI_WebRtcNetwork_UpdateEx(e) {
                    console.log("func_CAPI_WebRtcNetwork_UpdateEx");
                    Te[e].Update()
                }

                function func_CAPI_WebRtcNetwork_Update(e) {
                    Te[e].Update()
                }
                function func_CAPI_WebRtcNetwork_Flush(e) {
                    Te[e].Flush()
                }
                function func_CAPI_WebRtcNetwork_SendData(e, t, n, r) {
                    Te[e].SendData(new ConnectionId(t), n, r)
                }
                function func_CAPI_WebRtcNetwork_SendDataEm(e, id, unitArray, offset, length, o) {
                    console.log(">>>>>>>>>>>>> func_CAPI_WebRtcNetwork_SendDataEm",this);
                    console.log("e",e);
                    console.log("id:id",id);
                    console.log("unitArray:",unitArray);
                    console.log("offset:",offset);
                    console.log("length:",length);
                    console.log("o",o);
                    console.log("Te",Te);
                    var b1=new ConnectionId(id);
                    console.log("b",b1);
                    var data = new Uint8Array(unitArray.buffer, offset, length);
                    console.log("data:",data);
                    return Te[e].SendData(b1, data, o)
                }
                function func_CAPI_WebRtcNetwork_GetBufferedAmount(e, t, n) {
                    return Te[e].GetBufferedAmount(new ConnectionId(t), n)
                }
                function func_CAPI_WebRtcNetwork_Dequeue(e) {
                    return Te[e].Dequeue()
                }
                function func_CAPI_WebRtcNetwork_Peek(e) {
                    return Te[e].Peek()
                }
                function func_CAPI_WebRtcNetwork_PeekEventDataLength(e) {
                    return func_CAPI_WebRtcNetwork_CheckEventLength(Te[e].Peek())
                }
                function func_CAPI_WebRtcNetwork_CheckEventLength(e) {
                    return null == e ? -1 : null == e.RawData ? 0 : (e.RawData, e.RawData.length)
                }
                function func_CAPI_WebRtcNetwork_EventDataToUint8Array(e, t, n, r) {
                    if (null == e) return 0;
                    if ("string" == typeof e) {
                        var i = 0;
                        for (i = 0; i < e.length && i < r; i++) t[n + i] = e.charCodeAt(i);
                        return i
                    }
                    i = 0;
                    for (i = 0; i < e.length && i < r; i++) t[n + i] = e[i];
                    return i
                }
                function func_CAPI_WebRtcNetwork_DequeueEm(e, t, n, r, i, o, a, s, c, d) {
                    var u = func_CAPI_WebRtcNetwork_Dequeue(e);
                    if (null == u) return false;
                    t[n] = u.Type,
                        r[i] = u.ConnectionId.id;
                    var l = func_CAPI_WebRtcNetwork_EventDataToUint8Array(u.RawData, o, a, s);
                    return c[d] = l,
                        true
                }
                function func_CAPI_WebRtcNetwork_PeekEm(e, t, n, r, i, o, a, s, c, d) {
                    var u = func_CAPI_WebRtcNetwork_Peek(e);
                    if (null == u) return false;
                    t[n] = u.Type,
                        r[i] = u.ConnectionId.id;
                    var l = func_CAPI_WebRtcNetwork_EventDataToUint8Array(u.RawData, o, a, s);
                    return c[d] = l,
                        true
                }
                function func_CAPI_MediaNetwork_IsAvailable() {
                    return ! (!BrowserMediaNetwork || !BrowserWebRtcCall)
                }
                function func_CAPI_MediaNetwork_HasUserMedia() {
                    return ! (!navigator || !navigator.mediaDevices)
                }
                function func_CAPI_MediaNetwork_Create(confJson) {
                    var confObj = new NetworkConfig;
                    confObj = JSON.parse(confJson);
                    var n = new BrowserMediaNetwork(confObj),
                        r = Re;
                    return Re++,
                        Te[r] = n,
                        r
                }
                function func_CAPI_MediaNetwork_Configure(e, audio, video, r, i, o, a, s, c, d, u, l, p) {
                    void 0 === p && (p = "");
                    var conf = new MediaConfig;
                    conf.Audio = audio,
                        conf.Video = video,
                        conf.MinWidth = r,
                        conf.MinHeight = i,
                        conf.MaxWidth = o,
                        conf.MaxHeight = a,
                        conf.IdealWidth = s,
                        conf.IdealHeight = c,
                        conf.MinFps = d,
                        conf.MaxFps = u,
                        conf.IdealFps = l,
                        conf.VideoDeviceName = p,
                        conf.FrameUpdates = true,
                        Te[e].Configure(conf)
                }
                function func_CAPI_MediaNetwork_GetConfigurationState(e) {
                    return Te[e].GetConfigurationState()
                }
                function func_CAPI_MediaNetwork_GetConfigurationError(e) {
                    return Te[e].GetConfigurationError()
                }
                function func_CAPI_MediaNetwork_ResetConfiguration(e) {
                    return Te[e].ResetConfiguration()
                }
                function func_CAPI_MediaNetwork_TryGetFrame(e, t, n, r, i, o, a, s, c) {
                    var d = Te[e].TryGetFrame(new ConnectionId(t));
                    if (null == d || null == d.Buffer) return false;
                    n[r] = d.Width,
                        i[o] = d.Height;
                    for (var u = 0; u < c && u < d.Buffer.length; u++) a[s + u] = d.Buffer[u];
                    return true
                }
                function func_CAPI_MediaNetwork_TryGetFrameDataLength(e, t) {
                    var n = Te[e].PeekFrame(new ConnectionId(t)),
                        r = -1;
                    return null != n && null != n.Buffer && (r = n.Buffer.length),
                        r
                }
                function func_CAPI_MediaNetwork_TryGetFrameDataLengthEx(e, t) {
                    console.log("func_CAPI_MediaNetwork_TryGetFrameDataLengthEx");
                    console.log("e",e);
                    console.log("t",t);
                    console.log("Te",Te);
                    console.log("Te[e]",Te[e]);
                    var n = Te[e].PeekFrame(new ConnectionId(t)),
                        r = -1;
                    return null != n && null != n.Buffer && (r = n.Buffer.length),
                        r
                }
                function func_CAPI_MediaNetwork_SetVolume(e, t, n) {
                    Te[e].SetVolume(t, new ConnectionId(n))
                }
                function func_CAPI_MediaNetwork_HasAudioTrack(e, t) {
                    return Te[e].HasAudioTrack(new ConnectionId(t))
                }
                function func_CAPI_MediaNetwork_HasVideoTrack(e, t) {
                    return Te[e].HasVideoTrack(new ConnectionId(t))
                }
                function func_CAPI_MediaNetwork_SetMute(e, t) {
                    Te[e].SetMute(t)
                }
                function func_CAPI_MediaNetwork_IsMute(e) {
                    return Te[e].IsMute()
                }
                function func_CAPI_DeviceApi_Update() {
                    DeviceApi.Update()
                }
                function func_CAPI_DeviceApi_RequestUpdate() {
                    DeviceApi.RequestUpdate()
                }
                function func_CAPI_DeviceApi_LastUpdate() {
                    return DeviceApi.LastUpdate
                }
                function func_CAPI_DeviceApi_Devices_Length() {
                    return Object.keys(DeviceApi.Devices).length
                }
                function func_CAPI_DeviceApi_Devices_Get(e) {
                    var t = Object.keys(DeviceApi.Devices);
                    if (t.length > e) {
                        var n = t[e];
                        return DeviceApi.Devices[n].label
                    }
                    return SLog.LE("Requested device with index " + e + " does not exist."),
                        ""
                }
                function func_CAPI_SetRtcSourceType(type){//[NEW]
                    AWebRtcPeer.SourceType=type;
                }
                function func_CAPI_SetDebugShowElements(isShow){//[NEW]
                    BrowserMediaStream.DEBUG_SHOW_ELEMENTS=isShow;
                }
                function func_CAPI_H5Stream_GetVideo(url){//[NEW]
                    console.log("func_H5Stream_GetVideo");
                    BrowserMediaStream.DEBUG_SHOW_ELEMENTS=true;//在网页中显示视频
                    var netConf=new NetworkConfig();
                    // netConf.SignalingUrl="wss://signaling.because-why-not.com/callapp";
                    // var address="NewAddress";
                    netConf.SignalingUrl=url;
                    //AWebRtcPeer.SourceType="H5Stream";//原本用这个区分代码的
                    var browserCall=new BrowserWebRtcCall(netConf);
                    console.log("browserCall",browserCall);
                    var mediaConf=new MediaConfig();
                    console.log("mediaConf",mediaConf);
                    mediaConf.mVideo=false;
                    mediaConf.mAudio=false;
                    mediaConf.FrameUpdates=true;
                    browserCall.Configure(mediaConf);
                    browserCall.Update();//必须先update一下在Listen，不如说，Listen应该是用户点击出发的

                    //var address={type: "open"};//对象
                    var address="{\"type\": \"open\"}";//json字符串，unity传递过来的是字符串。不能用单引号。
                    //必须是这个格式，不如h5stream不会发送后续消息，onmessage也就进不去。
                    browserCall.Call(address);//=>Connect
                    //browserCall.Listen(address);

                    // setInterval(function(){
                    //     browserCall.Update();
                    // },50);//这里时间太快，可能会出问题。测试时，手动Update

                    browserCall.addEventListener(function(call,event){
                        console.log("browserCall Event",call,event);
                        if(event.Type==CallEventType.FrameUpdate){
                            var buffer=event.Frame.Buffer;//这个会在网页中显示一帧图片，不断刷新，Unity就是通过这种方式的。
                            console.log("buffer",buffer);
                        }
                        else{
                            console.log("Type",CallEventType[event.Type]);
                        }
                    });
                    return browserCall;
                }
                n.d(t,"CAPI_H5Stream_GetVideo",function(){//[NEW]
                    return func_CAPI_H5Stream_GetVideo
                }),
                    n.d(t,"CAPI_SetRtcSourceType",function(){//[NEW]
                        return func_CAPI_SetRtcSourceType
                    }),
                    n.d(t,"CAPI_SetDebugShowElements",function(){//[NEW]
                        return func_CAPI_SetDebugShowElements
                    }),

                    n.d(t, "NetEventType",
                        function() {
                            return NetEventType
                        }),
                    n.d(t, "NetEventDataType",
                        function() {
                            return NetEventDataType
                        }),
                    n.d(t, "NetworkEvent",
                        function() {
                            return NetworkEvent
                        }),
                    n.d(t, "ConnectionId",
                        function() {
                            return ConnectionId
                        }),
                    n.d(t, "Queue",
                        function() {
                            return Queue
                        }),
                    n.d(t, "List",
                        function() {
                            return List
                        }),
                    n.d(t, "Output",
                        function() {
                            return Output
                        }),
                    n.d(t, "Debug",
                        function() {
                            return Debug
                        }),
                    n.d(t, "Encoder",
                        function() {
                            return Encoder
                        }),
                    n.d(t, "UTF16Encoding",
                        function() {
                            return UTF16Encoding
                        }),
                    n.d(t, "Encoding",
                        function() {
                            return Encoding
                        }),
                    n.d(t, "Random",
                        function() {
                            return Random
                        }),
                    n.d(t, "Helper",
                        function() {
                            return Helper
                        }),
                    n.d(t, "SLogLevel",
                        function() {
                            return SLogLevel
                        }),
                    n.d(t, "SLog",
                        function() {
                            return SLog
                        }),
                    n.d(t, "SignalingConfig",
                        function() {
                            return SignalingConfig
                        }),
                    n.d(t, "SignalingInfo",
                        function() {
                            return SignalingInfo
                        }),
                    n.d(t, "WebRtcPeerState",
                        function() {
                            return WebRtcPeerState
                        }),
                    n.d(t, "WebRtcInternalState",
                        function() {
                            return WebRtcInternalState
                        }),
                    n.d(t, "AWebRtcPeer",
                        function() {
                            return AWebRtcPeer
                        }),
                    n.d(t, "WebRtcDataPeer",
                        function() {
                            return WebRtcDataPeer
                        }),
                    n.d(t, "WebRtcNetworkServerState",
                        function() {
                            return WebRtcNetworkServerState
                        }),
                    n.d(t, "WebRtcNetwork",
                        function() {
                            return WebRtcNetwork
                        }),
                    n.d(t, "WebsocketConnectionStatus",
                        function() {
                            return WebsocketConnectionStatus
                        }),
                    n.d(t, "WebsocketServerStatus",
                        function() {
                            return WebsocketServerStatus
                        }),
                    n.d(t, "WebsocketNetwork",
                        function() {
                            return WebsocketNetwork
                        }),
                    n.d(t, "LocalNetwork",
                        function() {
                            return LocalNetwork
                        }),
                    n.d(t, "AWebRtcCall",
                        function() {
                            return AWebRtcCall
                        }),
                    n.d(t, "CallEventType",
                        function() {
                            return CallEventType
                        }),
                    n.d(t, "CallEventArgs",
                        function() {
                            return CallEventArgs
                        }),
                    n.d(t, "CallAcceptedEventArgs",
                        function() {
                            return CallAcceptedEventArgs
                        }),
                    n.d(t, "CallEndedEventArgs",
                        function() {
                            return CallEndedEventArgs
                        }),
                    n.d(t, "CallErrorType",
                        function() {
                            return CallErrorType
                        }),
                    n.d(t, "ErrorEventArgs",
                        function() {
                            return ErrorEventArgs
                        }),
                    n.d(t, "WaitForIncomingCallEventArgs",
                        function() {
                            return WaitForIncomingCallEventArgs
                        }),
                    n.d(t, "MessageEventArgs",
                        function() {
                            return MessageEventArgs
                        }),
                    n.d(t, "DataMessageEventArgs",
                        function() {
                            return DataMessageEventArgs
                        }),
                    n.d(t, "MediaUpdatedEventArgs",
                        function() {
                            return MediaUpdatedEventArgs
                        }),
                    n.d(t, "FrameUpdateEventArgs",
                        function() {
                            return FrameUpdateEventArgs
                        }),
                    n.d(t, "MediaConfigurationState",
                        function() {
                            return MediaConfigurationState
                        }),
                    n.d(t, "MediaEventType",
                        function() {
                            return MediaEventType
                        }),
                    n.d(t, "MediaEvent",
                        function() {
                            return MediaEvent
                        }),
                    n.d(t, "MediaConfig",
                        function() {
                            return MediaConfig
                        }),
                    n.d(t, "NetworkConfig",
                        function() {
                            return NetworkConfig
                        }),
                    n.d(t, "FramePixelFormat",
                        function() {
                            return FramePixelFormat
                        }),
                    n.d(t, "IFrameData",
                        function() {
                            return IFrameData
                        }),
                    n.d(t, "RawFrame",
                        function() {
                            return RawFrame
                        }),
                    n.d(t, "LazyFrame",
                        function() {
                            return LazyFrame
                        }),
                    n.d(t, "BrowserMediaNetwork",
                        function() {
                            return BrowserMediaNetwork
                        }),
                    n.d(t, "BrowserWebRtcCall",
                        function() {
                            return BrowserWebRtcCall
                        }),
                    n.d(t, "BrowserMediaStream",
                        function() {
                            return BrowserMediaStream
                        }),
                    n.d(t, "MediaPeer",
                        function() {
                            return MediaPeer
                        }),
                    n.d(t, "DeviceInfo",
                        function() {
                            return DeviceInfo
                        }),
                    n.d(t, "DeviceApi",
                        function() {
                            return DeviceApi
                        }),
                    n.d(t, "CAPI_InitAsync",
                        function() {
                            return func_CAPI_InitAsync
                        }),
                    n.d(t, "CAPI_PollInitState",
                        function() {
                            return func_CAPI_PollInitState
                        }),
                    n.d(t, "CAPI_SLog_SetLogLevel",
                        function() {
                            return func_CAPI_SLog_SetLogLevel
                        }),
                    n.d(t, "CAPI_WebRtcNetwork_IsAvailable",
                        function() {
                            return func_CAPI_WebRtcNetwork_IsAvailable
                        }),
                    n.d(t, "CAPI_WebRtcNetwork_IsBrowserSupported",
                        function() {
                            return func_CAPI_WebRtcNetwork_IsBrowserSupported
                        }),
                    n.d(t, "CAPI_WebRtcNetwork_Create",
                        function() {
                            return func_CAPI_WebRtcNetwork_Create
                        }),
                    n.d(t, "CAPI_WebRtcNetwork_Release",
                        function() {
                            return CAPI_WebRtcNetwork_Release
                        }),
                    n.d(t, "CAPI_WebRtcNetwork_Connect",
                        function() {
                            return func_CAPI_WebRtcNetwork_Connect
                        }),
                    n.d(t, "CAPI_WebRtcNetwork_StartServer",
                        function() {
                            return func_CAPI_WebRtcNetwork_StartServer
                        }),
                    n.d(t, "CAPI_WebRtcNetwork_StopServer",
                        function() {
                            return func_CAPI_WebRtcNetwork_StopServer
                        }),
                    n.d(t, "CAPI_WebRtcNetwork_Disconnect",
                        function() {
                            return func_CAPI_WebRtcNetwork_Disconnect
                        }),
                    n.d(t, "CAPI_WebRtcNetwork_Shutdown",
                        function() {
                            return func_CAPI_WebRtcNetwork_Shutdown
                        }),
                    n.d(t, "CAPI_WebRtcNetwork_UpdateEx",
                        function() {
                            return func_CAPI_WebRtcNetwork_UpdateEx
                        }),
                    n.d(t, "CAPI_WebRtcNetwork_Update",
                        function() {
                            return func_CAPI_WebRtcNetwork_Update
                        }),
                    n.d(t, "CAPI_WebRtcNetwork_Flush",
                        function() {
                            return func_CAPI_WebRtcNetwork_Flush
                        }),
                    n.d(t, "CAPI_WebRtcNetwork_SendData",
                        function() {
                            return func_CAPI_WebRtcNetwork_SendData
                        }),
                    n.d(t, "CAPI_WebRtcNetwork_SendDataEm",
                        function() {
                            return func_CAPI_WebRtcNetwork_SendDataEm
                        }),
                    n.d(t, "CAPI_WebRtcNetwork_GetBufferedAmount",
                        function() {
                            return func_CAPI_WebRtcNetwork_GetBufferedAmount
                        }),
                    n.d(t, "CAPI_WebRtcNetwork_Dequeue",
                        function() {
                            return func_CAPI_WebRtcNetwork_Dequeue
                        }),
                    n.d(t, "CAPI_WebRtcNetwork_Peek",
                        function() {
                            return func_CAPI_WebRtcNetwork_Peek
                        }),
                    n.d(t, "CAPI_WebRtcNetwork_PeekEventDataLength",
                        function() {
                            return func_CAPI_WebRtcNetwork_PeekEventDataLength
                        }),
                    n.d(t, "CAPI_WebRtcNetwork_CheckEventLength",
                        function() {
                            return func_CAPI_WebRtcNetwork_CheckEventLength
                        }),
                    n.d(t, "CAPI_WebRtcNetwork_EventDataToUint8Array",
                        function() {
                            return func_CAPI_WebRtcNetwork_EventDataToUint8Array
                        }),
                    n.d(t, "CAPI_WebRtcNetwork_DequeueEm",
                        function() {
                            return func_CAPI_WebRtcNetwork_DequeueEm
                        }),
                    n.d(t, "CAPI_WebRtcNetwork_PeekEm",
                        function() {
                            return func_CAPI_WebRtcNetwork_PeekEm
                        }),
                    n.d(t, "CAPI_MediaNetwork_IsAvailable",
                        function() {
                            return func_CAPI_MediaNetwork_IsAvailable
                        }),
                    n.d(t, "CAPI_MediaNetwork_HasUserMedia",
                        function() {
                            return func_CAPI_MediaNetwork_HasUserMedia
                        }),
                    n.d(t, "CAPI_MediaNetwork_Create",
                        function() {
                            return func_CAPI_MediaNetwork_Create
                        }),
                    n.d(t, "CAPI_MediaNetwork_Configure",
                        function() {
                            return func_CAPI_MediaNetwork_Configure
                        }),
                    n.d(t, "CAPI_MediaNetwork_GetConfigurationState",
                        function() {
                            return func_CAPI_MediaNetwork_GetConfigurationState
                        }),
                    n.d(t, "CAPI_MediaNetwork_GetConfigurationError",
                        function() {
                            return func_CAPI_MediaNetwork_GetConfigurationError
                        }),
                    n.d(t, "CAPI_MediaNetwork_ResetConfiguration",
                        function() {
                            return func_CAPI_MediaNetwork_ResetConfiguration
                        }),
                    n.d(t, "CAPI_MediaNetwork_TryGetFrame",
                        function() {
                            return func_CAPI_MediaNetwork_TryGetFrame
                        }),
                    n.d(t, "CAPI_MediaNetwork_TryGetFrameDataLength",
                        function() {
                            return func_CAPI_MediaNetwork_TryGetFrameDataLength
                        }),
                    n.d(t, "CAPI_MediaNetwork_TryGetFrameDataLengthEx",
                        function() {
                            return func_CAPI_MediaNetwork_TryGetFrameDataLengthEx
                        }),
                    n.d(t, "CAPI_MediaNetwork_SetVolume",
                        function() {
                            return func_CAPI_MediaNetwork_SetVolume
                        }),
                    n.d(t, "CAPI_MediaNetwork_HasAudioTrack",
                        function() {
                            return func_CAPI_MediaNetwork_HasAudioTrack
                        }),
                    n.d(t, "CAPI_MediaNetwork_HasVideoTrack",
                        function() {
                            return func_CAPI_MediaNetwork_HasVideoTrack
                        }),
                    n.d(t, "CAPI_MediaNetwork_SetMute",
                        function() {
                            return func_CAPI_MediaNetwork_SetMute
                        }),
                    n.d(t, "CAPI_MediaNetwork_IsMute",
                        function() {
                            return func_CAPI_MediaNetwork_IsMute
                        }),
                    n.d(t, "CAPI_DeviceApi_Update",
                        function() {
                            return func_CAPI_DeviceApi_Update
                        }),
                    n.d(t, "CAPI_DeviceApi_RequestUpdate",
                        function() {
                            return func_CAPI_DeviceApi_RequestUpdate
                        }),
                    n.d(t, "CAPI_DeviceApi_LastUpdate",
                        function() {
                            return func_CAPI_DeviceApi_LastUpdate
                        }),
                    n.d(t, "CAPI_DeviceApi_Devices_Length",
                        function() {
                            return func_CAPI_DeviceApi_Devices_Length
                        }),
                n.d(t, "CAPI_DeviceApi_Devices_Get",
                    function() {
                        return func_CAPI_DeviceApi_Devices_Get
                    }),
                console.debug("loading awrtc modules ...");
                n(2);
                console.debug("loading awrtc modules completed")
            }])
    });
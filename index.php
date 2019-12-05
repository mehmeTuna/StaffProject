<?php
//TODO:
//url kısımları helpers.php içine alınacak 
//app altına modeller eklencek ve db ye bağlanacak
//app/http/Controller altına controller lar tanımlanıp url istekleri karşılanacak
?>
<!doctype html>
<html lang="tr">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Web site created using create-react-app" />
    <link rel="apple-touch-icon" href="/logo192.png" />
    <link rel="manifest" href="frontend/build/manifest.json" />
    <title>React App</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link href="frontend/build/static/css/main.5ecd60fb.chunk.css" rel="stylesheet">
</head>

<body><noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script>
        ! function (i) {
            function e(e) {
                for (var r, t, n = e[0], o = e[1], u = e[2], f = 0, l = []; f < n.length; f++) t = n[f], Object
                    .prototype.hasOwnProperty.call(p, t) && p[t] && l.push(p[t][0]), p[t] = 0;
                for (r in o) Object.prototype.hasOwnProperty.call(o, r) && (i[r] = o[r]);
                for (s && s(e); l.length;) l.shift()();
                return c.push.apply(c, u || []), a()
            }

            function a() {
                for (var e, r = 0; r < c.length; r++) {
                    for (var t = c[r], n = !0, o = 1; o < t.length; o++) {
                        var u = t[o];
                        0 !== p[u] && (n = !1)
                    }
                    n && (c.splice(r--, 1), e = f(f.s = t[0]))
                }
                return e
            }
            var t = {},
                p = {
                    1: 0
                },
                c = [];

            function f(e) {
                if (t[e]) return t[e].exports;
                var r = t[e] = {
                    i: e,
                    l: !1,
                    exports: {}
                };
                return i[e].call(r.exports, r, r.exports, f), r.l = !0, r.exports
            }
            f.m = i, f.c = t, f.d = function (e, r, t) {
                f.o(e, r) || Object.defineProperty(e, r, {
                    enumerable: !0,
                    get: t
                })
            }, f.r = function (e) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module"
                }), Object.defineProperty(e, "__esModule", {
                    value: !0
                })
            }, f.t = function (r, e) {
                if (1 & e && (r = f(r)), 8 & e) return r;
                if (4 & e && "object" == typeof r && r && r.__esModule) return r;
                var t = Object.create(null);
                if (f.r(t), Object.defineProperty(t, "default", {
                        enumerable: !0,
                        value: r
                    }), 2 & e && "string" != typeof r)
                    for (var n in r) f.d(t, n, function (e) {
                        return r[e]
                    }.bind(null, n));
                return t
            }, f.n = function (e) {
                var r = e && e.__esModule ? function () {
                    return e.default
                } : function () {
                    return e
                };
                return f.d(r, "a", r), r
            }, f.o = function (e, r) {
                return Object.prototype.hasOwnProperty.call(e, r)
            }, f.p = "/";
            var r = this.webpackJsonpfrontend = this.webpackJsonpfrontend || [],
                n = r.push.bind(r);
            r.push = e, r = r.slice();
            for (var o = 0; o < r.length; o++) e(r[o]);
            var s = n;
            a()
        }([])
    </script>
    <script src="frontend/build/static/js/2.41f800d9.chunk.js"></script>
    <script src="frontend/build/static/js/main.6b6516ef.chunk.js"></script>
</body>

</html>
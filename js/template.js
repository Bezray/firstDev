/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/ 
! function() {
    function X(b) {
        return b.replace(E, "").replace(D, ",").replace(C, "").replace(B, "").replace(A, "").split(/^$|,+/)
    }

    function W(b) {
        return "'" + b.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
    }

    function V(ap, ao) {
        function an(c) {
            return af += c.split(/\n/).length - 1, ah && (c = c.replace(/[\n\r\t\s]+/g, " ").replace(/<!--.*?-->/g, "")), c && (c = aa[1] + W(c) + aa[2] + "\n"), c
        }

        function am(d) {
            var i = af;
            if (ai ? d = ai(d, ao) : al && (d = d.replace(/\n/g, function() {
                    return af++, "$line=" + af + ";"
                })), 0 === d.indexOf("=")) {
                var h = ag && !/^=[=#]/.test(d);
                if (d = d.replace(/^=[=#]?|[\s;]*$/g, ""), h) {
                    var g = d.replace(/\s*\([^\)]+\)/, "");
                    K[g] || /^(include|print)$/.test(g) || (d = "$escape(" + d + ")")
                } else {
                    d = "$string(" + d + ")"
                }
                d = aa[1] + d + aa[2]
            }
            return al && (d = "$line=" + i + ";" + d), G(X(d), function(e) {
                if (e && !ae[e]) {
                    var c;
                    c = "print" === e ? Y : "include" === e ? r : K[e] ? "$utils." + e : J[e] ? "$helpers." + e : "$data." + e, o += e + "=" + c + ",", ae[e] = !0
                }
            }), d + "\n"
        }
        var al = ao.debug,
            ak = ao.openTag,
            aj = ao.closeTag,
            ai = ao.parser,
            ah = ao.compress,
            ag = ao.escape,
            af = 1,
            ae = {
                $data: 1,
                $filename: 1,
                $utils: 1,
                $helpers: 1,
                $out: 1,
                $line: 1
            },
            ac = "".trim,
            aa = ac ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
            Z = ac ? "$out+=text;return $out;" : "$out.push(text);",
            Y = "function(){var text=''.concat.apply('',arguments);" + Z + "}",
            r = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + Z + "}",
            o = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (al ? "$line=0," : ""),
            n = aa[0],
            b = "return new String(" + aa[3] + ");";
        G(ap.split(ak), function(e) {
            e = e.split(aj);
            var d = e[0],
                f = e[1];
            1 === e.length ? n += an(d) : (n += am(d), f && (n += an(f)))
        });
        var a = o + n + b;
        al && (a = "try{" + a + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + W(ap) + ".split(/\\n/)[$line-1].replace(/^[\\s\\t]+/,'')};}");
        try {
            var ad = new Function("$data", "$filename", a);
            return ad.prototype = K, ad
        } catch (ab) {
            throw ab.temp = "function anonymous($data,$filename) {" + a + "}", ab
        }
    }
    var U = function(d, c) {
        return "string" == typeof c ? H(c, {
            filename: d
        }) : R(d, c)
    };
    U.version = "3.0.0", U.config = function(d, c) {
        T[d] = c
    };
    var T = U.defaults = {
            openTag: "<%",
            closeTag: "%>",
            escape: !0,
            cache: !0,
            compress: !1,
            parser: null
        },
        S = U.cache = {};
    U.render = function(d, c) {
        return H(d, c)
    };
    var R = U.renderFile = function(e, d) {
        var f = U.get(e) || I({
            filename: e,
            name: "Render Error",
            message: "Template not found"
        });
        return d ? f(d) : f
    };
    U.get = function(f) {
        var e;
        if (S[f]) {
            e = S[f]
        } else {
            if ("object" == typeof document) {
                var h = document.getElementById(f);
                if (h) {
                    var g = (h.value || h.innerHTML).replace(/^\s*|\s*$/g, "");
                    e = H(g, {
                        filename: f
                    })
                }
            }
        }
        return e
    };
    var Q = function(d, c) {
            return "string" != typeof d && (c = typeof d, "number" === c ? d += "" : d = "function" === c ? Q(d.call(d)) : ""), d
        },
        P = {
            "<": "&#60;",
            ">": "&#62;",
            '"': "&#34;",
            "'": "&#39;",
            "&": "&#38;"
        },
        O = function(b) {
            return P[b]
        },
        N = function(b) {
            return Q(b).replace(/&(?![\w#]+;)|[<>"']/g, O)
        },
        M = Array.isArray || function(b) {
            return "[object Array]" === {}.toString.call(b)
        },
        L = function(f, e) {
            var h, g;
            if (M(f)) {
                for (h = 0, g = f.length; g > h; h++) {
                    e.call(f, f[h], h, f)
                }
            } else {
                for (h in f) {
                    e.call(f, f[h], h)
                }
            }
        },
        K = U.utils = {
            $helpers: {},
            $include: R,
            $string: Q,
            $escape: N,
            $each: L
        };
    U.helper = function(d, c) {
        J[d] = c
    };
    var J = U.helpers = K.$helpers;
    U.onerror = function(e) {
        var d = "Template Error\n\n";
        for (var f in e) {
            d += "<" + f + ">\n" + e[f] + "\n\n"
        }
        "object" == typeof console && console.error(d)
    };
    var I = function(b) {
            return U.onerror(b),
                function() {
                    return "{Template Error}"
                }
        },
        H = U.compile = function(e, c) {
            function n(b) {
                try {
                    return new k(b, l) + ""
                } catch (a) {
                    return c.debug ? I(a)() : (c.debug = !0, H(e, c)(b))
                }
            }
            c = c || {};
            for (var m in T) {
                void 0 === c[m] && (c[m] = T[m])
            }
            var l = c.filename;
            try {
                var k = V(e, c)
            } catch (f) {
                return f.filename = l || "anonymous", f.name = "Syntax Error", I(f)
            }
            return n.prototype = k.prototype, n.toString = function() {
                return k.toString()
            }, l && c.cache && (S[l] = n), n
        },
        G = K.$each,
        F = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
        E = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g,
        D = /[^\w$]+/g,
        C = new RegExp(["\\b" + F.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
        B = /^\d[^,]*|,\d[^,]*/g,
        A = /^,+|,+$/g;
    T.openTag = "{{", T.closeTag = "}}";
    var z = function(g, f) {
        var j = f.split(":"),
            i = j.shift(),
            h = j.join(":") || "";
        return h && (h = ", " + h), "$helpers." + i + "(" + g + h + ")"
    };
    T.parser = function(ae, ad) {
        ae = ae.replace(/^\s/, "");
        var ac = ae.split(" "),
            ab = ac.shift(),
            aa = ac.join(" ");
        switch (ab) {
            case "if":
                ae = "if(" + aa + "){";
                break;
            case "else":
                ac = "if" === ac.shift() ? " if(" + ac.join(" ") + ")" : "", ae = "}else" + ac + "{";
                break;
            case "/if":
                ae = "}";
                break;
            case "each":
                var Z = ac[0] || "$data",
                    Y = ac[1] || "as",
                    y = ac[2] || "$value",
                    x = ac[3] || "$index",
                    w = y + "," + x;
                "as" !== Y && (Z = "[]"), ae = "$each(" + Z + ",function(" + w + "){";
                break;
            case "/each":
                ae = "});";
                break;
            case "echo":
                ae = "print(" + aa + ");";
                break;
            case "print":
            case "include":
                ae = ab + "(" + ac.join(",") + ");";
                break;
            default:
                if (-1 !== aa.indexOf("|")) {
                    var v = ad.escape;
                    0 === ae.indexOf("#") && (ae = ae.substr(1), v = !1);
                    for (var u = 0, t = ae.split("|"), s = t.length, r = v ? "$escape" : "$string", d = r + "(" + t[u++] + ")"; s > u; u++) {
                        d = z(d, t[u])
                    }
                    ae = "=#" + d
                } else {
                    ae = U.helpers[ab] ? "=#" + ab + "(" + ac.join(",") + ");" : "=" + ae
                }
        }
        return ae
    }, "function" == typeof define ? define(function() {
        return U
    }) : "undefined" != typeof exports ? module.exports = U : this.template = U
}();
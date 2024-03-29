/*! JointJS v0.9.2 - JavaScript diagramming library  2014-09-17 


This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
if (function(a, b) {
  function c(a) {
    var b = a.length,
      c = fb.type(a);
    return fb.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || "function" !== c && (0 === b || "number" == typeof b && b > 0 && b - 1 in a)
  }

  function d(a) {
    var b = ob[a] = {};
    return fb.each(a.match(hb) || [], function(a, c) {
      b[c] = !0
    }), b
  }

  function e() {
    Object.defineProperty(this.cache = {}, 0, {
      get: function() {
        return {}
      }
    }), this.expando = fb.expando + Math.random()
  }

  function f(a, c, d) {
    var e;
    if (d === b && 1 === a.nodeType)
      if (e = "data-" + c.replace(sb, "-$1").toLowerCase(), d = a.getAttribute(e), "string" == typeof d) {
        try {
          d = "true" === d ? !0 : "false" === d ? !1 : "null" === d ? null : +d + "" === d ? +d : rb.test(d) ? JSON.parse(d) : d
        } catch (f) {}
        pb.set(a, c, d)
      } else d = b;
    return d
  }

  function g() {
    return !0
  }

  function h() {
    return !1
  }

  function i() {
    try {
      return T.activeElement
    } catch (a) {}
  }

  function j(a, b) {
    for (;
      (a = a[b]) && 1 !== a.nodeType;);
    return a
  }

  function k(a, b, c) {
    if (fb.isFunction(b)) return fb.grep(a, function(a, d) {
      return !!b.call(a, d, a) !== c
    });
    if (b.nodeType) return fb.grep(a, function(a) {
      return a === b !== c
    });
    if ("string" == typeof b) {
      if (Cb.test(b)) return fb.filter(b, a, c);
      b = fb.filter(b, a)
    }
    return fb.grep(a, function(a) {
      return bb.call(b, a) >= 0 !== c
    })
  }

  function l(a, b) {
    return fb.nodeName(a, "table") && fb.nodeName(1 === b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
  }

  function m(a) {
    return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
  }

  function n(a) {
    var b = Nb.exec(a.type);
    return b ? a.type = b[1] : a.removeAttribute("type"), a
  }

  function o(a, b) {
    for (var c = a.length, d = 0; c > d; d++) qb.set(a[d], "globalEval", !b || qb.get(b[d], "globalEval"))
  }

  function p(a, b) {
    var c, d, e, f, g, h, i, j;
    if (1 === b.nodeType) {
      if (qb.hasData(a) && (f = qb.access(a), g = qb.set(b, f), j = f.events)) {
        delete g.handle, g.events = {};
        for (e in j)
          for (c = 0, d = j[e].length; d > c; c++) fb.event.add(b, e, j[e][c])
      }
      pb.hasData(a) && (h = pb.access(a), i = fb.extend({}, h), pb.set(b, i))
    }
  }

  function q(a, c) {
    var d = a.getElementsByTagName ? a.getElementsByTagName(c || "*") : a.querySelectorAll ? a.querySelectorAll(c || "*") : [];
    return c === b || c && fb.nodeName(a, c) ? fb.merge([a], d) : d
  }

  function r(a, b) {
    var c = b.nodeName.toLowerCase();
    "input" === c && Kb.test(a.type) ? b.checked = a.checked : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
  }

  function s(a, b) {
    if (b in a) return b;
    for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = _b.length; e--;)
      if (b = _b[e] + c, b in a) return b;
    return d
  }

  function t(a, b) {
    return a = b || a, "none" === fb.css(a, "display") || !fb.contains(a.ownerDocument, a)
  }

  function u(b) {
    return a.getComputedStyle(b, null)
  }

  function v(a, b) {
    for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = qb.get(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && t(d) && (f[g] = qb.access(d, "olddisplay", z(d.nodeName)))) : f[g] || (e = t(d), (c && "none" !== c || !e) && qb.set(d, "olddisplay", e ? c : fb.css(d, "display"))));
    for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
    return a
  }

  function w(a, b, c) {
    var d = Ub.exec(b);
    return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
  }

  function x(a, b, c, d, e) {
    for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += fb.css(a, c + $b[f], !0, e)), d ? ("content" === c && (g -= fb.css(a, "padding" + $b[f], !0, e)), "margin" !== c && (g -= fb.css(a, "border" + $b[f] + "Width", !0, e))) : (g += fb.css(a, "padding" + $b[f], !0, e), "padding" !== c && (g += fb.css(a, "border" + $b[f] + "Width", !0, e)));
    return g
  }

  function y(a, b, c) {
    var d = !0,
      e = "width" === b ? a.offsetWidth : a.offsetHeight,
      f = u(a),
      g = fb.support.boxSizing && "border-box" === fb.css(a, "boxSizing", !1, f);
    if (0 >= e || null == e) {
      if (e = Qb(a, b, f), (0 > e || null == e) && (e = a.style[b]), Vb.test(e)) return e;
      d = g && (fb.support.boxSizingReliable || e === a.style[b]), e = parseFloat(e) || 0
    }
    return e + x(a, b, c || (g ? "border" : "content"), d, f) + "px"
  }

  function z(a) {
    var b = T,
      c = Xb[a];
    return c || (c = A(a, b), "none" !== c && c || (Rb = (Rb || fb("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(b.documentElement), b = (Rb[0].contentWindow || Rb[0].contentDocument).document, b.write("<!doctype html><html><body>"), b.close(), c = A(a, b), Rb.detach()), Xb[a] = c), c
  }

  function A(a, b) {
    var c = fb(b.createElement(a)).appendTo(b.body),
      d = fb.css(c[0], "display");
    return c.remove(), d
  }

  function B(a, b, c, d) {
    var e;
    if (fb.isArray(b)) fb.each(b, function(b, e) {
      c || bc.test(a) ? d(a, e) : B(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
    });
    else if (c || "object" !== fb.type(b)) d(a, b);
    else
      for (e in b) B(a + "[" + e + "]", b[e], c, d)
  }

  function C(a) {
    return function(b, c) {
      "string" != typeof b && (c = b, b = "*");
      var d, e = 0,
        f = b.toLowerCase().match(hb) || [];
      if (fb.isFunction(c))
        for (; d = f[e++];) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
    }
  }

  function D(a, b, c, d) {
    function e(h) {
      var i;
      return f[h] = !0, fb.each(a[h] || [], function(a, h) {
        var j = h(b, c, d);
        return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
      }), i
    }
    var f = {},
      g = a === sc;
    return e(b.dataTypes[0]) || !f["*"] && e("*")
  }

  function E(a, c) {
    var d, e, f = fb.ajaxSettings.flatOptions || {};
    for (d in c) c[d] !== b && ((f[d] ? a : e || (e = {}))[d] = c[d]);
    return e && fb.extend(!0, a, e), a
  }

  function F(a, c, d) {
    for (var e, f, g, h, i = a.contents, j = a.dataTypes;
      "*" === j[0];) j.shift(), e === b && (e = a.mimeType || c.getResponseHeader("Content-Type"));
    if (e)
      for (f in i)
        if (i[f] && i[f].test(e)) {
          j.unshift(f);
          break
        }
    if (j[0] in d) g = j[0];
    else {
      for (f in d) {
        if (!j[0] || a.converters[f + " " + j[0]]) {
          g = f;
          break
        }
        h || (h = f)
      }
      g = g || h
    }
    return g ? (g !== j[0] && j.unshift(g), d[g]) : void 0
  }

  function G(a, b, c, d) {
    var e, f, g, h, i, j = {},
      k = a.dataTypes.slice();
    if (k[1])
      for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
    for (f = k.shift(); f;)
      if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
        if ("*" === f) f = i;
        else if ("*" !== i && i !== f) {
      if (g = j[i + " " + f] || j["* " + f], !g)
        for (e in j)
          if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
            g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
            break
          }
      if (g !== !0)
        if (g && a["throws"]) b = g(b);
        else try {
          b = g(b)
        } catch (l) {
          return {
            state: "parsererror",
            error: g ? l : "No conversion from " + i + " to " + f
          }
        }
    }
    return {
      state: "success",
      data: b
    }
  }

  function H() {
    return setTimeout(function() {
      Bc = b
    }), Bc = fb.now()
  }

  function I(a, b, c) {
    for (var d, e = (Hc[b] || []).concat(Hc["*"]), f = 0, g = e.length; g > f; f++)
      if (d = e[f].call(c, b, a)) return d
  }

  function J(a, b, c) {
    var d, e, f = 0,
      g = Gc.length,
      h = fb.Deferred().always(function() {
        delete i.elem
      }),
      i = function() {
        if (e) return !1;
        for (var b = Bc || H(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
        return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
      },
      j = h.promise({
        elem: a,
        props: fb.extend({}, b),
        opts: fb.extend(!0, {
          specialEasing: {}
        }, c),
        originalProperties: b,
        originalOptions: c,
        startTime: Bc || H(),
        duration: c.duration,
        tweens: [],
        createTween: function(b, c) {
          var d = fb.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
          return j.tweens.push(d), d
        },
        stop: function(b) {
          var c = 0,
            d = b ? j.tweens.length : 0;
          if (e) return this;
          for (e = !0; d > c; c++) j.tweens[c].run(1);
          return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
        }
      }),
      k = j.props;
    for (K(k, j.opts.specialEasing); g > f; f++)
      if (d = Gc[f].call(j, a, k, j.opts)) return d;
    return fb.map(k, I, j), fb.isFunction(j.opts.start) && j.opts.start.call(a, j), fb.fx.timer(fb.extend(i, {
      elem: a,
      anim: j,
      queue: j.opts.queue
    })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
  }

  function K(a, b) {
    var c, d, e, f, g;
    for (c in a)
      if (d = fb.camelCase(c), e = b[d], f = a[c], fb.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = fb.cssHooks[d], g && "expand" in g) {
        f = g.expand(f), delete a[d];
        for (c in f) c in a || (a[c] = f[c], b[c] = e)
      } else b[d] = e
  }

  function L(a, c, d) {
    var e, f, g, h, i, j, k = this,
      l = {},
      m = a.style,
      n = a.nodeType && t(a),
      o = qb.get(a, "fxshow");
    d.queue || (i = fb._queueHooks(a, "fx"), null == i.unqueued && (i.unqueued = 0, j = i.empty.fire, i.empty.fire = function() {
      i.unqueued || j()
    }), i.unqueued++, k.always(function() {
      k.always(function() {
        i.unqueued--, fb.queue(a, "fx").length || i.empty.fire()
      })
    })), 1 === a.nodeType && ("height" in c || "width" in c) && (d.overflow = [m.overflow, m.overflowX, m.overflowY], "inline" === fb.css(a, "display") && "none" === fb.css(a, "float") && (m.display = "inline-block")), d.overflow && (m.overflow = "hidden", k.always(function() {
      m.overflow = d.overflow[0], m.overflowX = d.overflow[1], m.overflowY = d.overflow[2]
    }));
    for (e in c)
      if (f = c[e], Dc.exec(f)) {
        if (delete c[e], g = g || "toggle" === f, f === (n ? "hide" : "show")) {
          if ("show" !== f || !o || o[e] === b) continue;
          n = !0
        }
        l[e] = o && o[e] || fb.style(a, e)
      }
    if (!fb.isEmptyObject(l)) {
      o ? "hidden" in o && (n = o.hidden) : o = qb.access(a, "fxshow", {}), g && (o.hidden = !n), n ? fb(a).show() : k.done(function() {
        fb(a).hide()
      }), k.done(function() {
        var b;
        qb.remove(a, "fxshow");
        for (b in l) fb.style(a, b, l[b])
      });
      for (e in l) h = I(n ? o[e] : 0, e, k), e in o || (o[e] = h.start, n && (h.end = h.start, h.start = "width" === e || "height" === e ? 1 : 0))
    }
  }

  function M(a, b, c, d, e) {
    return new M.prototype.init(a, b, c, d, e)
  }

  function N(a, b) {
    var c, d = {
        height: a
      },
      e = 0;
    for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = $b[e], d["margin" + c] = d["padding" + c] = a;
    return b && (d.opacity = d.width = a), d
  }

  function O(a) {
    return fb.isWindow(a) ? a : 9 === a.nodeType && a.defaultView
  }
  var P, Q, R = typeof b,
    S = a.location,
    T = a.document,
    U = T.documentElement,
    V = a.jQuery,
    W = a.$,
    X = {},
    Y = [],
    Z = "2.0.3",
    $ = Y.concat,
    _ = Y.push,
    ab = Y.slice,
    bb = Y.indexOf,
    cb = X.toString,
    db = X.hasOwnProperty,
    eb = Z.trim,
    fb = function(a, b) {
      return new fb.fn.init(a, b, P)
    },
    gb = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    hb = /\S+/g,
    ib = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    jb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    kb = /^-ms-/,
    lb = /-([\da-z])/gi,
    mb = function(a, b) {
      return b.toUpperCase()
    },
    nb = function() {
      T.removeEventListener("DOMContentLoaded", nb, !1), a.removeEventListener("load", nb, !1), fb.ready()
    };
  fb.fn = fb.prototype = {
    jquery: Z,
    constructor: fb,
    init: function(a, c, d) {
      var e, f;
      if (!a) return this;
      if ("string" == typeof a) {
        if (e = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : ib.exec(a), !e || !e[1] && c) return !c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a);
        if (e[1]) {
          if (c = c instanceof fb ? c[0] : c, fb.merge(this, fb.parseHTML(e[1], c && c.nodeType ? c.ownerDocument || c : T, !0)), jb.test(e[1]) && fb.isPlainObject(c))
            for (e in c) fb.isFunction(this[e]) ? this[e](c[e]) : this.attr(e, c[e]);
          return this
        }
        return f = T.getElementById(e[2]), f && f.parentNode && (this.length = 1, this[0] = f), this.context = T, this.selector = a, this
      }
      return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : fb.isFunction(a) ? d.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), fb.makeArray(a, this))
    },
    selector: "",
    length: 0,
    toArray: function() {
      return ab.call(this)
    },
    get: function(a) {
      return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
    },
    pushStack: function(a) {
      var b = fb.merge(this.constructor(), a);
      return b.prevObject = this, b.context = this.context, b
    },
    each: function(a, b) {
      return fb.each(this, a, b)
    },
    ready: function(a) {
      return fb.ready.promise().done(a), this
    },
    slice: function() {
      return this.pushStack(ab.apply(this, arguments))
    },
    first: function() {
      return this.eq(0)
    },
    last: function() {
      return this.eq(-1)
    },
    eq: function(a) {
      var b = this.length,
        c = +a + (0 > a ? b : 0);
      return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
    },
    map: function(a) {
      return this.pushStack(fb.map(this, function(b, c) {
        return a.call(b, c, b)
      }))
    },
    end: function() {
      return this.prevObject || this.constructor(null)
    },
    push: _,
    sort: [].sort,
    splice: [].splice
  }, fb.fn.init.prototype = fb.fn, fb.extend = fb.fn.extend = function() {
    var a, c, d, e, f, g, h = arguments[0] || {},
      i = 1,
      j = arguments.length,
      k = !1;
    for ("boolean" == typeof h && (k = h, h = arguments[1] || {}, i = 2), "object" == typeof h || fb.isFunction(h) || (h = {}), j === i && (h = this, --i); j > i; i++)
      if (null != (a = arguments[i]))
        for (c in a) d = h[c], e = a[c], h !== e && (k && e && (fb.isPlainObject(e) || (f = fb.isArray(e))) ? (f ? (f = !1, g = d && fb.isArray(d) ? d : []) : g = d && fb.isPlainObject(d) ? d : {}, h[c] = fb.extend(k, g, e)) : e !== b && (h[c] = e));
    return h
  }, fb.extend({
    expando: "jQuery" + (Z + Math.random()).replace(/\D/g, ""),
    noConflict: function(b) {
      return a.$ === fb && (a.$ = W), b && a.jQuery === fb && (a.jQuery = V), fb
    },
    isReady: !1,
    readyWait: 1,
    holdReady: function(a) {
      a ? fb.readyWait++ : fb.ready(!0)
    },
    ready: function(a) {
      (a === !0 ? --fb.readyWait : fb.isReady) || (fb.isReady = !0, a !== !0 && --fb.readyWait > 0 || (Q.resolveWith(T, [fb]), fb.fn.trigger && fb(T).trigger("ready").off("ready")))
    },
    isFunction: function(a) {
      return "function" === fb.type(a)
    },
    isArray: Array.isArray,
    isWindow: function(a) {
      return null != a && a === a.window
    },
    isNumeric: function(a) {
      return !isNaN(parseFloat(a)) && isFinite(a)
    },
    type: function(a) {
      return null == a ? String(a) : "object" == typeof a || "function" == typeof a ? X[cb.call(a)] || "object" : typeof a
    },
    isPlainObject: function(a) {
      if ("object" !== fb.type(a) || a.nodeType || fb.isWindow(a)) return !1;
      try {
        if (a.constructor && !db.call(a.constructor.prototype, "isPrototypeOf")) return !1
      } catch (b) {
        return !1
      }
      return !0
    },
    isEmptyObject: function(a) {
      var b;
      for (b in a) return !1;
      return !0
    },
    error: function(a) {
      throw new Error(a)
    },
    parseHTML: function(a, b, c) {
      if (!a || "string" != typeof a) return null;
      "boolean" == typeof b && (c = b, b = !1), b = b || T;
      var d = jb.exec(a),
        e = !c && [];
      return d ? [b.createElement(d[1])] : (d = fb.buildFragment([a], b, e), e && fb(e).remove(), fb.merge([], d.childNodes))
    },
    parseJSON: JSON.parse,
    parseXML: function(a) {
      var c, d;
      if (!a || "string" != typeof a) return null;
      try {
        d = new DOMParser, c = d.parseFromString(a, "text/xml")
      } catch (e) {
        c = b
      }
      return (!c || c.getElementsByTagName("parsererror").length) && fb.error("Invalid XML: " + a), c
    },
    noop: function() {},
    globalEval: function(a) {
      var b, c = eval;
      a = fb.trim(a), a && (1 === a.indexOf("use strict") ? (b = T.createElement("script"), b.text = a, T.head.appendChild(b).parentNode.removeChild(b)) : c(a))
    },
    camelCase: function(a) {
      return a.replace(kb, "ms-").replace(lb, mb)
    },
    nodeName: function(a, b) {
      return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
    },
    each: function(a, b, d) {
      var e, f = 0,
        g = a.length,
        h = c(a);
      if (d) {
        if (h)
          for (; g > f && (e = b.apply(a[f], d), e !== !1); f++);
        else
          for (f in a)
            if (e = b.apply(a[f], d), e === !1) break
      } else if (h)
        for (; g > f && (e = b.call(a[f], f, a[f]), e !== !1); f++);
      else
        for (f in a)
          if (e = b.call(a[f], f, a[f]), e === !1) break; return a
    },
    trim: function(a) {
      return null == a ? "" : eb.call(a)
    },
    makeArray: function(a, b) {
      var d = b || [];
      return null != a && (c(Object(a)) ? fb.merge(d, "string" == typeof a ? [a] : a) : _.call(d, a)), d
    },
    inArray: function(a, b, c) {
      return null == b ? -1 : bb.call(b, a, c)
    },
    merge: function(a, c) {
      var d = c.length,
        e = a.length,
        f = 0;
      if ("number" == typeof d)
        for (; d > f; f++) a[e++] = c[f];
      else
        for (; c[f] !== b;) a[e++] = c[f++];
      return a.length = e, a
    },
    grep: function(a, b, c) {
      var d, e = [],
        f = 0,
        g = a.length;
      for (c = !!c; g > f; f++) d = !!b(a[f], f), c !== d && e.push(a[f]);
      return e
    },
    map: function(a, b, d) {
      var e, f = 0,
        g = a.length,
        h = c(a),
        i = [];
      if (h)
        for (; g > f; f++) e = b(a[f], f, d), null != e && (i[i.length] = e);
      else
        for (f in a) e = b(a[f], f, d), null != e && (i[i.length] = e);
      return $.apply([], i)
    },
    guid: 1,
    proxy: function(a, c) {
      var d, e, f;
      return "string" == typeof c && (d = a[c], c = a, a = d), fb.isFunction(a) ? (e = ab.call(arguments, 2), f = function() {
        return a.apply(c || this, e.concat(ab.call(arguments)))
      }, f.guid = a.guid = a.guid || fb.guid++, f) : b
    },
    access: function(a, c, d, e, f, g, h) {
      var i = 0,
        j = a.length,
        k = null == d;
      if ("object" === fb.type(d)) {
        f = !0;
        for (i in d) fb.access(a, c, i, d[i], !0, g, h)
      } else if (e !== b && (f = !0, fb.isFunction(e) || (h = !0), k && (h ? (c.call(a, e), c = null) : (k = c, c = function(a, b, c) {
        return k.call(fb(a), c)
      })), c))
        for (; j > i; i++) c(a[i], d, h ? e : e.call(a[i], i, c(a[i], d)));
      return f ? a : k ? c.call(a) : j ? c(a[0], d) : g
    },
    now: Date.now,
    swap: function(a, b, c, d) {
      var e, f, g = {};
      for (f in b) g[f] = a.style[f], a.style[f] = b[f];
      e = c.apply(a, d || []);
      for (f in b) a.style[f] = g[f];
      return e
    }
  }), fb.ready.promise = function(b) {
    return Q || (Q = fb.Deferred(), "complete" === T.readyState ? setTimeout(fb.ready) : (T.addEventListener("DOMContentLoaded", nb, !1), a.addEventListener("load", nb, !1))), Q.promise(b)
  }, fb.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
    X["[object " + b + "]"] = b.toLowerCase()
  }), P = fb(T),
  function(a, b) {
    function c(a, b, c, d) {
      var e, f, g, h, i, j, k, l, o, p;
      if ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, c = c || [], !a || "string" != typeof a) return c;
      if (1 !== (h = b.nodeType) && 9 !== h) return [];
      if (I && !d) {
        if (e = tb.exec(a))
          if (g = e[1]) {
            if (9 === h) {
              if (f = b.getElementById(g), !f || !f.parentNode) return c;
              if (f.id === g) return c.push(f), c
            } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g) return c.push(f), c
          } else {
            if (e[2]) return ab.apply(c, b.getElementsByTagName(a)), c;
            if ((g = e[3]) && x.getElementsByClassName && b.getElementsByClassName) return ab.apply(c, b.getElementsByClassName(g)), c
          }
        if (x.qsa && (!J || !J.test(a))) {
          if (l = k = N, o = b, p = 9 === h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
            for (j = m(a), (k = b.getAttribute("id")) ? l = k.replace(wb, "\\$&") : b.setAttribute("id", l), l = "[id='" + l + "'] ", i = j.length; i--;) j[i] = l + n(j[i]);
            o = nb.test(a) && b.parentNode || b, p = j.join(",")
          }
          if (p) try {
            return ab.apply(c, o.querySelectorAll(p)), c
          } catch (q) {} finally {
            k || b.removeAttribute("id")
          }
        }
      }
      return v(a.replace(kb, "$1"), b, c, d)
    }

    function d() {
      function a(c, d) {
        return b.push(c += " ") > z.cacheLength && delete a[b.shift()], a[c] = d
      }
      var b = [];
      return a
    }

    function e(a) {
      return a[N] = !0, a
    }

    function f(a) {
      var b = G.createElement("div");
      try {
        return !!a(b)
      } catch (c) {
        return !1
      } finally {
        b.parentNode && b.parentNode.removeChild(b), b = null
      }
    }

    function g(a, b) {
      for (var c = a.split("|"), d = a.length; d--;) z.attrHandle[c[d]] = b
    }

    function h(a, b) {
      var c = b && a,
        d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || X) - (~a.sourceIndex || X);
      if (d) return d;
      if (c)
        for (; c = c.nextSibling;)
          if (c === b) return -1;
      return a ? 1 : -1
    }

    function i(a) {
      return function(b) {
        var c = b.nodeName.toLowerCase();
        return "input" === c && b.type === a
      }
    }

    function j(a) {
      return function(b) {
        var c = b.nodeName.toLowerCase();
        return ("input" === c || "button" === c) && b.type === a
      }
    }

    function k(a) {
      return e(function(b) {
        return b = +b, e(function(c, d) {
          for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
        })
      })
    }

    function l() {}

    function m(a, b) {
      var d, e, f, g, h, i, j, k = S[a + " "];
      if (k) return b ? 0 : k.slice(0);
      for (h = a, i = [], j = z.preFilter; h;) {
        (!d || (e = lb.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = mb.exec(h)) && (d = e.shift(), f.push({
          value: d,
          type: e[0].replace(kb, " ")
        }), h = h.slice(d.length));
        for (g in z.filter)!(e = rb[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
          value: d,
          type: g,
          matches: e
        }), h = h.slice(d.length));
        if (!d) break
      }
      return b ? h.length : h ? c.error(a) : S(a, i).slice(0)
    }

    function n(a) {
      for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
      return d
    }

    function o(a, b, c) {
      var d = b.dir,
        e = c && "parentNode" === d,
        f = Q++;
      return b.first ? function(b, c, f) {
        for (; b = b[d];)
          if (1 === b.nodeType || e) return a(b, c, f)
      } : function(b, c, g) {
        var h, i, j, k = P + " " + f;
        if (g) {
          for (; b = b[d];)
            if ((1 === b.nodeType || e) && a(b, c, g)) return !0
        } else
          for (; b = b[d];)
            if (1 === b.nodeType || e)
              if (j = b[N] || (b[N] = {}), (i = j[d]) && i[0] === k) {
                if ((h = i[1]) === !0 || h === y) return h === !0
              } else if (i = j[d] = [k], i[1] = a(b, c, g) || y, i[1] === !0) return !0
      }
    }

    function p(a) {
      return a.length > 1 ? function(b, c, d) {
        for (var e = a.length; e--;)
          if (!a[e](b, c, d)) return !1;
        return !0
      } : a[0]
    }

    function q(a, b, c, d, e) {
      for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
      return g
    }

    function r(a, b, c, d, f, g) {
      return d && !d[N] && (d = r(d)), f && !f[N] && (f = r(f, g)), e(function(e, g, h, i) {
        var j, k, l, m = [],
          n = [],
          o = g.length,
          p = e || u(b || "*", h.nodeType ? [h] : h, []),
          r = !a || !e && b ? p : q(p, m, a, h, i),
          s = c ? f || (e ? a : o || d) ? [] : g : r;
        if (c && c(r, s, h, i), d)
          for (j = q(s, n), d(j, [], h, i), k = j.length; k--;)(l = j[k]) && (s[n[k]] = !(r[n[k]] = l));
        if (e) {
          if (f || a) {
            if (f) {
              for (j = [], k = s.length; k--;)(l = s[k]) && j.push(r[k] = l);
              f(null, s = [], j, i)
            }
            for (k = s.length; k--;)(l = s[k]) && (j = f ? cb.call(e, l) : m[k]) > -1 && (e[j] = !(g[j] = l))
          }
        } else s = q(s === g ? s.splice(o, s.length) : s), f ? f(null, g, s, i) : ab.apply(g, s)
      })
    }

    function s(a) {
      for (var b, c, d, e = a.length, f = z.relative[a[0].type], g = f || z.relative[" "], h = f ? 1 : 0, i = o(function(a) {
        return a === b
      }, g, !0), j = o(function(a) {
        return cb.call(b, a) > -1
      }, g, !0), k = [
        function(a, c, d) {
          return !f && (d || c !== D) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d))
        }
      ]; e > h; h++)
        if (c = z.relative[a[h].type]) k = [o(p(k), c)];
        else {
          if (c = z.filter[a[h].type].apply(null, a[h].matches), c[N]) {
            for (d = ++h; e > d && !z.relative[a[d].type]; d++);
            return r(h > 1 && p(k), h > 1 && n(a.slice(0, h - 1).concat({
              value: " " === a[h - 2].type ? "*" : ""
            })).replace(kb, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && n(a))
          }
          k.push(c)
        }
      return p(k)
    }

    function t(a, b) {
      var d = 0,
        f = b.length > 0,
        g = a.length > 0,
        h = function(e, h, i, j, k) {
          var l, m, n, o = [],
            p = 0,
            r = "0",
            s = e && [],
            t = null != k,
            u = D,
            v = e || g && z.find.TAG("*", k && h.parentNode || h),
            w = P += null == u ? 1 : Math.random() || .1;
          for (t && (D = h !== G && h, y = d); null != (l = v[r]); r++) {
            if (g && l) {
              for (m = 0; n = a[m++];)
                if (n(l, h, i)) {
                  j.push(l);
                  break
                }
              t && (P = w, y = ++d)
            }
            f && ((l = !n && l) && p--, e && s.push(l))
          }
          if (p += r, f && r !== p) {
            for (m = 0; n = b[m++];) n(s, o, h, i);
            if (e) {
              if (p > 0)
                for (; r--;) s[r] || o[r] || (o[r] = $.call(j));
              o = q(o)
            }
            ab.apply(j, o), t && !e && o.length > 0 && p + b.length > 1 && c.uniqueSort(j)
          }
          return t && (P = w, D = u), s
        };
      return f ? e(h) : h
    }

    function u(a, b, d) {
      for (var e = 0, f = b.length; f > e; e++) c(a, b[e], d);
      return d
    }

    function v(a, b, c, d) {
      var e, f, g, h, i, j = m(a);
      if (!d && 1 === j.length) {
        if (f = j[0] = j[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && x.getById && 9 === b.nodeType && I && z.relative[f[1].type]) {
          if (b = (z.find.ID(g.matches[0].replace(xb, yb), b) || [])[0], !b) return c;
          a = a.slice(f.shift().value.length)
        }
        for (e = rb.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !z.relative[h = g.type]);)
          if ((i = z.find[h]) && (d = i(g.matches[0].replace(xb, yb), nb.test(f[0].type) && b.parentNode || b))) {
            if (f.splice(e, 1), a = d.length && n(f), !a) return ab.apply(c, d), c;
            break
          }
      }
      return C(a, j)(d, b, !I, c, nb.test(a)), c
    }
    var w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + -new Date,
      O = a.document,
      P = 0,
      Q = 0,
      R = d(),
      S = d(),
      T = d(),
      U = !1,
      V = function(a, b) {
        return a === b ? (U = !0, 0) : 0
      },
      W = typeof b,
      X = 1 << 31,
      Y = {}.hasOwnProperty,
      Z = [],
      $ = Z.pop,
      _ = Z.push,
      ab = Z.push,
      bb = Z.slice,
      cb = Z.indexOf || function(a) {
        for (var b = 0, c = this.length; c > b; b++)
          if (this[b] === a) return b;
        return -1
      },
      db = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      eb = "[\\x20\\t\\r\\n\\f]",
      gb = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
      hb = gb.replace("w", "w#"),
      ib = "\\[" + eb + "*(" + gb + ")" + eb + "*(?:([*^$|!~]?=)" + eb + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + hb + ")|)|)" + eb + "*\\]",
      jb = ":(" + gb + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + ib.replace(3, 8) + ")*)|.*)\\)|)",
      kb = new RegExp("^" + eb + "+|((?:^|[^\\\\])(?:\\\\.)*)" + eb + "+$", "g"),
      lb = new RegExp("^" + eb + "*," + eb + "*"),
      mb = new RegExp("^" + eb + "*([>+~]|" + eb + ")" + eb + "*"),
      nb = new RegExp(eb + "*[+~]"),
      ob = new RegExp("=" + eb + "*([^\\]'\"]*)" + eb + "*\\]", "g"),
      pb = new RegExp(jb),
      qb = new RegExp("^" + hb + "$"),
      rb = {
        ID: new RegExp("^#(" + gb + ")"),
        CLASS: new RegExp("^\\.(" + gb + ")"),
        TAG: new RegExp("^(" + gb.replace("w", "w*") + ")"),
        ATTR: new RegExp("^" + ib),
        PSEUDO: new RegExp("^" + jb),
        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + eb + "*(even|odd|(([+-]|)(\\d*)n|)" + eb + "*(?:([+-]|)" + eb + "*(\\d+)|))" + eb + "*\\)|)", "i"),
        bool: new RegExp("^(?:" + db + ")$", "i"),
        needsContext: new RegExp("^" + eb + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + eb + "*((?:-\\d)?\\d*)" + eb + "*\\)|)(?=[^-]|$)", "i")
      },
      sb = /^[^{]+\{\s*\[native \w/,
      tb = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      ub = /^(?:input|select|textarea|button)$/i,
      vb = /^h\d$/i,
      wb = /'|\\/g,
      xb = new RegExp("\\\\([\\da-f]{1,6}" + eb + "?|(" + eb + ")|.)", "ig"),
      yb = function(a, b, c) {
        var d = "0x" + b - 65536;
        return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
      };
    try {
      ab.apply(Z = bb.call(O.childNodes), O.childNodes), Z[O.childNodes.length].nodeType
    } catch (zb) {
      ab = {
        apply: Z.length ? function(a, b) {
          _.apply(a, bb.call(b))
        } : function(a, b) {
          for (var c = a.length, d = 0; a[c++] = b[d++];);
          a.length = c - 1
        }
      }
    }
    B = c.isXML = function(a) {
      var b = a && (a.ownerDocument || a).documentElement;
      return b ? "HTML" !== b.nodeName : !1
    }, x = c.support = {}, F = c.setDocument = function(a) {
      var b = a ? a.ownerDocument || a : O,
        c = b.defaultView;
      return b !== G && 9 === b.nodeType && b.documentElement ? (G = b, H = b.documentElement, I = !B(b), c && c.attachEvent && c !== c.top && c.attachEvent("onbeforeunload", function() {
        F()
      }), x.attributes = f(function(a) {
        return a.className = "i", !a.getAttribute("className")
      }), x.getElementsByTagName = f(function(a) {
        return a.appendChild(b.createComment("")), !a.getElementsByTagName("*").length
      }), x.getElementsByClassName = f(function(a) {
        return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length
      }), x.getById = f(function(a) {
        return H.appendChild(a).id = N, !b.getElementsByName || !b.getElementsByName(N).length
      }), x.getById ? (z.find.ID = function(a, b) {
        if (typeof b.getElementById !== W && I) {
          var c = b.getElementById(a);
          return c && c.parentNode ? [c] : []
        }
      }, z.filter.ID = function(a) {
        var b = a.replace(xb, yb);
        return function(a) {
          return a.getAttribute("id") === b
        }
      }) : (delete z.find.ID, z.filter.ID = function(a) {
        var b = a.replace(xb, yb);
        return function(a) {
          var c = typeof a.getAttributeNode !== W && a.getAttributeNode("id");
          return c && c.value === b
        }
      }), z.find.TAG = x.getElementsByTagName ? function(a, b) {
        return typeof b.getElementsByTagName !== W ? b.getElementsByTagName(a) : void 0
      } : function(a, b) {
        var c, d = [],
          e = 0,
          f = b.getElementsByTagName(a);
        if ("*" === a) {
          for (; c = f[e++];) 1 === c.nodeType && d.push(c);
          return d
        }
        return f
      }, z.find.CLASS = x.getElementsByClassName && function(a, b) {
        return typeof b.getElementsByClassName !== W && I ? b.getElementsByClassName(a) : void 0
      }, K = [], J = [], (x.qsa = sb.test(b.querySelectorAll)) && (f(function(a) {
        a.innerHTML = "<select><option selected=''></option></select>", a.querySelectorAll("[selected]").length || J.push("\\[" + eb + "*(?:value|" + db + ")"), a.querySelectorAll(":checked").length || J.push(":checked")
      }), f(function(a) {
        var c = b.createElement("input");
        c.setAttribute("type", "hidden"), a.appendChild(c).setAttribute("t", ""), a.querySelectorAll("[t^='']").length && J.push("[*^$]=" + eb + "*(?:''|\"\")"), a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), J.push(",.*:")
      })), (x.matchesSelector = sb.test(L = H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && f(function(a) {
        x.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", jb)
      }), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), M = sb.test(H.contains) || H.compareDocumentPosition ? function(a, b) {
        var c = 9 === a.nodeType ? a.documentElement : a,
          d = b && b.parentNode;
        return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
      } : function(a, b) {
        if (b)
          for (; b = b.parentNode;)
            if (b === a) return !0;
        return !1
      }, V = H.compareDocumentPosition ? function(a, c) {
        if (a === c) return U = !0, 0;
        var d = c.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(c);
        return d ? 1 & d || !x.sortDetached && c.compareDocumentPosition(a) === d ? a === b || M(O, a) ? -1 : c === b || M(O, c) ? 1 : E ? cb.call(E, a) - cb.call(E, c) : 0 : 4 & d ? -1 : 1 : a.compareDocumentPosition ? -1 : 1
      } : function(a, c) {
        var d, e = 0,
          f = a.parentNode,
          g = c.parentNode,
          i = [a],
          j = [c];
        if (a === c) return U = !0, 0;
        if (!f || !g) return a === b ? -1 : c === b ? 1 : f ? -1 : g ? 1 : E ? cb.call(E, a) - cb.call(E, c) : 0;
        if (f === g) return h(a, c);
        for (d = a; d = d.parentNode;) i.unshift(d);
        for (d = c; d = d.parentNode;) j.unshift(d);
        for (; i[e] === j[e];) e++;
        return e ? h(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0
      }, b) : G
    }, c.matches = function(a, b) {
      return c(a, null, null, b)
    }, c.matchesSelector = function(a, b) {
      if ((a.ownerDocument || a) !== G && F(a), b = b.replace(ob, "='$1']"), !(!x.matchesSelector || !I || K && K.test(b) || J && J.test(b))) try {
        var d = L.call(a, b);
        if (d || x.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
      } catch (e) {}
      return c(b, G, null, [a]).length > 0
    }, c.contains = function(a, b) {
      return (a.ownerDocument || a) !== G && F(a), M(a, b)
    }, c.attr = function(a, c) {
      (a.ownerDocument || a) !== G && F(a);
      var d = z.attrHandle[c.toLowerCase()],
        e = d && Y.call(z.attrHandle, c.toLowerCase()) ? d(a, c, !I) : b;
      return e === b ? x.attributes || !I ? a.getAttribute(c) : (e = a.getAttributeNode(c)) && e.specified ? e.value : null : e
    }, c.error = function(a) {
      throw new Error("Syntax error, unrecognized expression: " + a)
    }, c.uniqueSort = function(a) {
      var b, c = [],
        d = 0,
        e = 0;
      if (U = !x.detectDuplicates, E = !x.sortStable && a.slice(0), a.sort(V), U) {
        for (; b = a[e++];) b === a[e] && (d = c.push(e));
        for (; d--;) a.splice(c[d], 1)
      }
      return a
    }, A = c.getText = function(a) {
      var b, c = "",
        d = 0,
        e = a.nodeType;
      if (e) {
        if (1 === e || 9 === e || 11 === e) {
          if ("string" == typeof a.textContent) return a.textContent;
          for (a = a.firstChild; a; a = a.nextSibling) c += A(a)
        } else if (3 === e || 4 === e) return a.nodeValue
      } else
        for (; b = a[d]; d++) c += A(b);
      return c
    }, z = c.selectors = {
      cacheLength: 50,
      createPseudo: e,
      match: rb,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: !0
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: !0
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        ATTR: function(a) {
          return a[1] = a[1].replace(xb, yb), a[3] = (a[4] || a[5] || "").replace(xb, yb), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
        },
        CHILD: function(a) {
          return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || c.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && c.error(a[0]), a
        },
        PSEUDO: function(a) {
          var c, d = !a[5] && a[2];
          return rb.CHILD.test(a[0]) ? null : (a[3] && a[4] !== b ? a[2] = a[4] : d && pb.test(d) && (c = m(d, !0)) && (c = d.indexOf(")", d.length - c) - d.length) && (a[0] = a[0].slice(0, c), a[2] = d.slice(0, c)), a.slice(0, 3))
        }
      },
      filter: {
        TAG: function(a) {
          var b = a.replace(xb, yb).toLowerCase();
          return "*" === a ? function() {
            return !0
          } : function(a) {
            return a.nodeName && a.nodeName.toLowerCase() === b
          }
        },
        CLASS: function(a) {
          var b = R[a + " "];
          return b || (b = new RegExp("(^|" + eb + ")" + a + "(" + eb + "|$)")) && R(a, function(a) {
            return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== W && a.getAttribute("class") || "")
          })
        },
        ATTR: function(a, b, d) {
          return function(e) {
            var f = c.attr(e, a);
            return null == f ? "!=" === b : b ? (f += "", "=" === b ? f === d : "!=" === b ? f !== d : "^=" === b ? d && 0 === f.indexOf(d) : "*=" === b ? d && f.indexOf(d) > -1 : "$=" === b ? d && f.slice(-d.length) === d : "~=" === b ? (" " + f + " ").indexOf(d) > -1 : "|=" === b ? f === d || f.slice(0, d.length + 1) === d + "-" : !1) : !0
          }
        },
        CHILD: function(a, b, c, d, e) {
          var f = "nth" !== a.slice(0, 3),
            g = "last" !== a.slice(-4),
            h = "of-type" === b;
          return 1 === d && 0 === e ? function(a) {
            return !!a.parentNode
          } : function(b, c, i) {
            var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
              q = b.parentNode,
              r = h && b.nodeName.toLowerCase(),
              s = !i && !h;
            if (q) {
              if (f) {
                for (; p;) {
                  for (l = b; l = l[p];)
                    if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                  o = p = "only" === a && !o && "nextSibling"
                }
                return !0
              }
              if (o = [g ? q.firstChild : q.lastChild], g && s) {
                for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === P && j[1], m = j[0] === P && j[2], l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();)
                  if (1 === l.nodeType && ++m && l === b) {
                    k[a] = [P, n, m];
                    break
                  }
              } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P) m = j[1];
              else
                for (;
                  (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [P, m]), l !== b)););
              return m -= e, m === d || m % d === 0 && m / d >= 0
            }
          }
        },
        PSEUDO: function(a, b) {
          var d, f = z.pseudos[a] || z.setFilters[a.toLowerCase()] || c.error("unsupported pseudo: " + a);
          return f[N] ? f(b) : f.length > 1 ? (d = [a, a, "", b], z.setFilters.hasOwnProperty(a.toLowerCase()) ? e(function(a, c) {
            for (var d, e = f(a, b), g = e.length; g--;) d = cb.call(a, e[g]), a[d] = !(c[d] = e[g])
          }) : function(a) {
            return f(a, 0, d)
          }) : f
        }
      },
      pseudos: {
        not: e(function(a) {
          var b = [],
            c = [],
            d = C(a.replace(kb, "$1"));
          return d[N] ? e(function(a, b, c, e) {
            for (var f, g = d(a, null, e, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
          }) : function(a, e, f) {
            return b[0] = a, d(b, null, f, c), !c.pop()
          }
        }),
        has: e(function(a) {
          return function(b) {
            return c(a, b).length > 0
          }
        }),
        contains: e(function(a) {
          return function(b) {
            return (b.textContent || b.innerText || A(b)).indexOf(a) > -1
          }
        }),
        lang: e(function(a) {
          return qb.test(a || "") || c.error("unsupported lang: " + a), a = a.replace(xb, yb).toLowerCase(),
            function(b) {
              var c;
              do
                if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
              while ((b = b.parentNode) && 1 === b.nodeType);
              return !1
            }
        }),
        target: function(b) {
          var c = a.location && a.location.hash;
          return c && c.slice(1) === b.id
        },
        root: function(a) {
          return a === H
        },
        focus: function(a) {
          return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
        },
        enabled: function(a) {
          return a.disabled === !1
        },
        disabled: function(a) {
          return a.disabled === !0
        },
        checked: function(a) {
          var b = a.nodeName.toLowerCase();
          return "input" === b && !!a.checked || "option" === b && !!a.selected
        },
        selected: function(a) {
          return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
        },
        empty: function(a) {
          for (a = a.firstChild; a; a = a.nextSibling)
            if (a.nodeName > "@" || 3 === a.nodeType || 4 === a.nodeType) return !1;
          return !0
        },
        parent: function(a) {
          return !z.pseudos.empty(a)
        },
        header: function(a) {
          return vb.test(a.nodeName)
        },
        input: function(a) {
          return ub.test(a.nodeName)
        },
        button: function(a) {
          var b = a.nodeName.toLowerCase();
          return "input" === b && "button" === a.type || "button" === b
        },
        text: function(a) {
          var b;
          return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || b.toLowerCase() === a.type)
        },
        first: k(function() {
          return [0]
        }),
        last: k(function(a, b) {
          return [b - 1]
        }),
        eq: k(function(a, b, c) {
          return [0 > c ? c + b : c]
        }),
        even: k(function(a, b) {
          for (var c = 0; b > c; c += 2) a.push(c);
          return a
        }),
        odd: k(function(a, b) {
          for (var c = 1; b > c; c += 2) a.push(c);
          return a
        }),
        lt: k(function(a, b, c) {
          for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
          return a
        }),
        gt: k(function(a, b, c) {
          for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
          return a
        })
      }
    }, z.pseudos.nth = z.pseudos.eq;
    for (w in {
      radio: !0,
      checkbox: !0,
      file: !0,
      password: !0,
      image: !0
    }) z.pseudos[w] = i(w);
    for (w in {
      submit: !0,
      reset: !0
    }) z.pseudos[w] = j(w);
    l.prototype = z.filters = z.pseudos, z.setFilters = new l, C = c.compile = function(a, b) {
      var c, d = [],
        e = [],
        f = T[a + " "];
      if (!f) {
        for (b || (b = m(a)), c = b.length; c--;) f = s(b[c]), f[N] ? d.push(f) : e.push(f);
        f = T(a, t(e, d))
      }
      return f
    }, x.sortStable = N.split("").sort(V).join("") === N, x.detectDuplicates = U, F(), x.sortDetached = f(function(a) {
      return 1 & a.compareDocumentPosition(G.createElement("div"))
    }), f(function(a) {
      return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
    }) || g("type|href|height|width", function(a, b, c) {
      return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
    }), x.attributes && f(function(a) {
      return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
    }) || g("value", function(a, b, c) {
      return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
    }), f(function(a) {
      return null == a.getAttribute("disabled")
    }) || g(db, function(a, b, c) {
      var d;
      return c ? void 0 : (d = a.getAttributeNode(b)) && d.specified ? d.value : a[b] === !0 ? b.toLowerCase() : null
    }), fb.find = c, fb.expr = c.selectors, fb.expr[":"] = fb.expr.pseudos, fb.unique = c.uniqueSort, fb.text = c.getText, fb.isXMLDoc = c.isXML, fb.contains = c.contains
  }(a);
  var ob = {};
  fb.Callbacks = function(a) {
    a = "string" == typeof a ? ob[a] || d(a) : fb.extend({}, a);
    var c, e, f, g, h, i, j = [],
      k = !a.once && [],
      l = function(b) {
        for (c = a.memory && b, e = !0, i = g || 0, g = 0, h = j.length, f = !0; j && h > i; i++)
          if (j[i].apply(b[0], b[1]) === !1 && a.stopOnFalse) {
            c = !1;
            break
          }
        f = !1, j && (k ? k.length && l(k.shift()) : c ? j = [] : m.disable())
      },
      m = {
        add: function() {
          if (j) {
            var b = j.length;
            ! function d(b) {
              fb.each(b, function(b, c) {
                var e = fb.type(c);
                "function" === e ? a.unique && m.has(c) || j.push(c) : c && c.length && "string" !== e && d(c)
              })
            }(arguments), f ? h = j.length : c && (g = b, l(c))
          }
          return this
        },
        remove: function() {
          return j && fb.each(arguments, function(a, b) {
            for (var c;
              (c = fb.inArray(b, j, c)) > -1;) j.splice(c, 1), f && (h >= c && h--, i >= c && i--)
          }), this
        },
        has: function(a) {
          return a ? fb.inArray(a, j) > -1 : !(!j || !j.length)
        },
        empty: function() {
          return j = [], h = 0, this
        },
        disable: function() {
          return j = k = c = b, this
        },
        disabled: function() {
          return !j
        },
        lock: function() {
          return k = b, c || m.disable(), this
        },
        locked: function() {
          return !k
        },
        fireWith: function(a, b) {
          return !j || e && !k || (b = b || [], b = [a, b.slice ? b.slice() : b], f ? k.push(b) : l(b)), this
        },
        fire: function() {
          return m.fireWith(this, arguments), this
        },
        fired: function() {
          return !!e
        }
      };
    return m
  }, fb.extend({
    Deferred: function(a) {
      var b = [
          ["resolve", "done", fb.Callbacks("once memory"), "resolved"],
          ["reject", "fail", fb.Callbacks("once memory"), "rejected"],
          ["notify", "progress", fb.Callbacks("memory")]
        ],
        c = "pending",
        d = {
          state: function() {
            return c
          },
          always: function() {
            return e.done(arguments).fail(arguments), this
          },
          then: function() {
            var a = arguments;
            return fb.Deferred(function(c) {
              fb.each(b, function(b, f) {
                var g = f[0],
                  h = fb.isFunction(a[b]) && a[b];
                e[f[1]](function() {
                  var a = h && h.apply(this, arguments);
                  a && fb.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[g + "With"](this === d ? c.promise() : this, h ? [a] : arguments)
                })
              }), a = null
            }).promise()
          },
          promise: function(a) {
            return null != a ? fb.extend(a, d) : d
          }
        },
        e = {};
      return d.pipe = d.then, fb.each(b, function(a, f) {
        var g = f[2],
          h = f[3];
        d[f[1]] = g.add, h && g.add(function() {
          c = h
        }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
          return e[f[0] + "With"](this === e ? d : this, arguments), this
        }, e[f[0] + "With"] = g.fireWith
      }), d.promise(e), a && a.call(e, e), e
    },
    when: function(a) {
      var b, c, d, e = 0,
        f = ab.call(arguments),
        g = f.length,
        h = 1 !== g || a && fb.isFunction(a.promise) ? g : 0,
        i = 1 === h ? a : fb.Deferred(),
        j = function(a, c, d) {
          return function(e) {
            c[a] = this, d[a] = arguments.length > 1 ? ab.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
          }
        };
      if (g > 1)
        for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++) f[e] && fb.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
      return h || i.resolveWith(d, f), i.promise()
    }
  }), fb.support = function(b) {
    var c = T.createElement("input"),
      d = T.createDocumentFragment(),
      e = T.createElement("div"),
      f = T.createElement("select"),
      g = f.appendChild(T.createElement("option"));
    return c.type ? (c.type = "checkbox", b.checkOn = "" !== c.value, b.optSelected = g.selected, b.reliableMarginRight = !0, b.boxSizingReliable = !0, b.pixelPosition = !1, c.checked = !0, b.noCloneChecked = c.cloneNode(!0).checked, f.disabled = !0, b.optDisabled = !g.disabled, c = T.createElement("input"), c.value = "t", c.type = "radio", b.radioValue = "t" === c.value, c.setAttribute("checked", "t"), c.setAttribute("name", "t"), d.appendChild(c), b.checkClone = d.cloneNode(!0).cloneNode(!0).lastChild.checked, b.focusinBubbles = "onfocusin" in a, e.style.backgroundClip = "content-box", e.cloneNode(!0).style.backgroundClip = "", b.clearCloneStyle = "content-box" === e.style.backgroundClip, fb(function() {
      var c, d, f = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
        g = T.getElementsByTagName("body")[0];
      g && (c = T.createElement("div"), c.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", g.appendChild(c).appendChild(e), e.innerHTML = "", e.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", fb.swap(g, null != g.style.zoom ? {
        zoom: 1
      } : {}, function() {
        b.boxSizing = 4 === e.offsetWidth
      }), a.getComputedStyle && (b.pixelPosition = "1%" !== (a.getComputedStyle(e, null) || {}).top, b.boxSizingReliable = "4px" === (a.getComputedStyle(e, null) || {
        width: "4px"
      }).width, d = e.appendChild(T.createElement("div")), d.style.cssText = e.style.cssText = f, d.style.marginRight = d.style.width = "0", e.style.width = "1px", b.reliableMarginRight = !parseFloat((a.getComputedStyle(d, null) || {}).marginRight)), g.removeChild(c))
    }), b) : b
  }({});
  var pb, qb, rb = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
    sb = /([A-Z])/g;
  e.uid = 1, e.accepts = function(a) {
    return a.nodeType ? 1 === a.nodeType || 9 === a.nodeType : !0
  }, e.prototype = {
    key: function(a) {
      if (!e.accepts(a)) return 0;
      var b = {},
        c = a[this.expando];
      if (!c) {
        c = e.uid++;
        try {
          b[this.expando] = {
            value: c
          }, Object.defineProperties(a, b)
        } catch (d) {
          b[this.expando] = c, fb.extend(a, b)
        }
      }
      return this.cache[c] || (this.cache[c] = {}), c
    },
    set: function(a, b, c) {
      var d, e = this.key(a),
        f = this.cache[e];
      if ("string" == typeof b) f[b] = c;
      else if (fb.isEmptyObject(f)) fb.extend(this.cache[e], b);
      else
        for (d in b) f[d] = b[d];
      return f
    },
    get: function(a, c) {
      var d = this.cache[this.key(a)];
      return c === b ? d : d[c]
    },
    access: function(a, c, d) {
      var e;
      return c === b || c && "string" == typeof c && d === b ? (e = this.get(a, c), e !== b ? e : this.get(a, fb.camelCase(c))) : (this.set(a, c, d), d !== b ? d : c)
    },
    remove: function(a, c) {
      var d, e, f, g = this.key(a),
        h = this.cache[g];
      if (c === b) this.cache[g] = {};
      else {
        fb.isArray(c) ? e = c.concat(c.map(fb.camelCase)) : (f = fb.camelCase(c), c in h ? e = [c, f] : (e = f, e = e in h ? [e] : e.match(hb) || [])), d = e.length;
        for (; d--;) delete h[e[d]]
      }
    },
    hasData: function(a) {
      return !fb.isEmptyObject(this.cache[a[this.expando]] || {})
    },
    discard: function(a) {
      a[this.expando] && delete this.cache[a[this.expando]]
    }
  }, pb = new e, qb = new e, fb.extend({
    acceptData: e.accepts,
    hasData: function(a) {
      return pb.hasData(a) || qb.hasData(a)
    },
    data: function(a, b, c) {
      return pb.access(a, b, c)
    },
    removeData: function(a, b) {
      pb.remove(a, b)
    },
    _data: function(a, b, c) {
      return qb.access(a, b, c)
    },
    _removeData: function(a, b) {
      qb.remove(a, b)
    }
  }), fb.fn.extend({
    data: function(a, c) {
      var d, e, g = this[0],
        h = 0,
        i = null;
      if (a === b) {
        if (this.length && (i = pb.get(g), 1 === g.nodeType && !qb.get(g, "hasDataAttrs"))) {
          for (d = g.attributes; h < d.length; h++) e = d[h].name, 0 === e.indexOf("data-") && (e = fb.camelCase(e.slice(5)), f(g, e, i[e]));
          qb.set(g, "hasDataAttrs", !0)
        }
        return i
      }
      return "object" == typeof a ? this.each(function() {
        pb.set(this, a)
      }) : fb.access(this, function(c) {
        var d, e = fb.camelCase(a);
        if (g && c === b) {
          if (d = pb.get(g, a), d !== b) return d;
          if (d = pb.get(g, e), d !== b) return d;
          if (d = f(g, e, b), d !== b) return d
        } else this.each(function() {
          var d = pb.get(this, e);
          pb.set(this, e, c), -1 !== a.indexOf("-") && d !== b && pb.set(this, a, c)
        })
      }, null, c, arguments.length > 1, null, !0)
    },
    removeData: function(a) {
      return this.each(function() {
        pb.remove(this, a)
      })
    }
  }), fb.extend({
    queue: function(a, b, c) {
      var d;
      return a ? (b = (b || "fx") + "queue", d = qb.get(a, b), c && (!d || fb.isArray(c) ? d = qb.access(a, b, fb.makeArray(c)) : d.push(c)), d || []) : void 0
    },
    dequeue: function(a, b) {
      b = b || "fx";
      var c = fb.queue(a, b),
        d = c.length,
        e = c.shift(),
        f = fb._queueHooks(a, b),
        g = function() {
          fb.dequeue(a, b)
        };
      "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
    },
    _queueHooks: function(a, b) {
      var c = b + "queueHooks";
      return qb.get(a, c) || qb.access(a, c, {
        empty: fb.Callbacks("once memory").add(function() {
          qb.remove(a, [b + "queue", c])
        })
      })
    }
  }), fb.fn.extend({
    queue: function(a, c) {
      var d = 2;
      return "string" != typeof a && (c = a, a = "fx", d--), arguments.length < d ? fb.queue(this[0], a) : c === b ? this : this.each(function() {
        var b = fb.queue(this, a, c);
        fb._queueHooks(this, a), "fx" === a && "inprogress" !== b[0] && fb.dequeue(this, a)
      })
    },
    dequeue: function(a) {
      return this.each(function() {
        fb.dequeue(this, a)
      })
    },
    delay: function(a, b) {
      return a = fb.fx ? fb.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
        var d = setTimeout(b, a);
        c.stop = function() {
          clearTimeout(d)
        }
      })
    },
    clearQueue: function(a) {
      return this.queue(a || "fx", [])
    },
    promise: function(a, c) {
      var d, e = 1,
        f = fb.Deferred(),
        g = this,
        h = this.length,
        i = function() {
          --e || f.resolveWith(g, [g])
        };
      for ("string" != typeof a && (c = a, a = b), a = a || "fx"; h--;) d = qb.get(g[h], a + "queueHooks"), d && d.empty && (e++, d.empty.add(i));
      return i(), f.promise(c)
    }
  });
  var tb, ub, vb = /[\t\r\n\f]/g,
    wb = /\r/g,
    xb = /^(?:input|select|textarea|button)$/i;
  fb.fn.extend({
    attr: function(a, b) {
      return fb.access(this, fb.attr, a, b, arguments.length > 1)
    },
    removeAttr: function(a) {
      return this.each(function() {
        fb.removeAttr(this, a)
      })
    },
    prop: function(a, b) {
      return fb.access(this, fb.prop, a, b, arguments.length > 1)
    },
    removeProp: function(a) {
      return this.each(function() {
        delete this[fb.propFix[a] || a]
      })
    },
    addClass: function(a) {
      var b, c, d, e, f, g = 0,
        h = this.length,
        i = "string" == typeof a && a;
      if (fb.isFunction(a)) return this.each(function(b) {
        fb(this).addClass(a.call(this, b, this.className))
      });
      if (i)
        for (b = (a || "").match(hb) || []; h > g; g++)
          if (c = this[g], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(vb, " ") : " ")) {
            for (f = 0; e = b[f++];) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
            c.className = fb.trim(d)
          }
      return this
    },
    removeClass: function(a) {
      var b, c, d, e, f, g = 0,
        h = this.length,
        i = 0 === arguments.length || "string" == typeof a && a;
      if (fb.isFunction(a)) return this.each(function(b) {
        fb(this).removeClass(a.call(this, b, this.className))
      });
      if (i)
        for (b = (a || "").match(hb) || []; h > g; g++)
          if (c = this[g], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(vb, " ") : "")) {
            for (f = 0; e = b[f++];)
              for (; d.indexOf(" " + e + " ") >= 0;) d = d.replace(" " + e + " ", " ");
            c.className = a ? fb.trim(d) : ""
          }
      return this
    },
    toggleClass: function(a, b) {
      var c = typeof a;
      return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : fb.isFunction(a) ? this.each(function(c) {
        fb(this).toggleClass(a.call(this, c, this.className, b), b)
      }) : this.each(function() {
        if ("string" === c)
          for (var b, d = 0, e = fb(this), f = a.match(hb) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
        else(c === R || "boolean" === c) && (this.className && qb.set(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : qb.get(this, "__className__") || "")
      })
    },
    hasClass: function(a) {
      for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
        if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(vb, " ").indexOf(b) >= 0) return !0;
      return !1
    },
    val: function(a) {
      var c, d, e, f = this[0]; {
        if (arguments.length) return e = fb.isFunction(a), this.each(function(d) {
          var f;
          1 === this.nodeType && (f = e ? a.call(this, d, fb(this).val()) : a, null == f ? f = "" : "number" == typeof f ? f += "" : fb.isArray(f) && (f = fb.map(f, function(a) {
            return null == a ? "" : a + ""
          })), c = fb.valHooks[this.type] || fb.valHooks[this.nodeName.toLowerCase()], c && "set" in c && c.set(this, f, "value") !== b || (this.value = f))
        });
        if (f) return c = fb.valHooks[f.type] || fb.valHooks[f.nodeName.toLowerCase()], c && "get" in c && (d = c.get(f, "value")) !== b ? d : (d = f.value, "string" == typeof d ? d.replace(wb, "") : null == d ? "" : d)
      }
    }
  }), fb.extend({
    valHooks: {
      option: {
        get: function(a) {
          var b = a.attributes.value;
          return !b || b.specified ? a.value : a.text
        }
      },
      select: {
        get: function(a) {
          for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
            if (c = d[i], !(!c.selected && i !== e || (fb.support.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && fb.nodeName(c.parentNode, "optgroup"))) {
              if (b = fb(c).val(), f) return b;
              g.push(b)
            }
          return g
        },
        set: function(a, b) {
          for (var c, d, e = a.options, f = fb.makeArray(b), g = e.length; g--;) d = e[g], (d.selected = fb.inArray(fb(d).val(), f) >= 0) && (c = !0);
          return c || (a.selectedIndex = -1), f
        }
      }
    },
    attr: function(a, c, d) {
      var e, f, g = a.nodeType;
      if (a && 3 !== g && 8 !== g && 2 !== g) return typeof a.getAttribute === R ? fb.prop(a, c, d) : (1 === g && fb.isXMLDoc(a) || (c = c.toLowerCase(), e = fb.attrHooks[c] || (fb.expr.match.bool.test(c) ? ub : tb)), d === b ? e && "get" in e && null !== (f = e.get(a, c)) ? f : (f = fb.find.attr(a, c), null == f ? b : f) : null !== d ? e && "set" in e && (f = e.set(a, d, c)) !== b ? f : (a.setAttribute(c, d + ""), d) : (fb.removeAttr(a, c), void 0))
    },
    removeAttr: function(a, b) {
      var c, d, e = 0,
        f = b && b.match(hb);
      if (f && 1 === a.nodeType)
        for (; c = f[e++];) d = fb.propFix[c] || c, fb.expr.match.bool.test(c) && (a[d] = !1), a.removeAttribute(c)
    },
    attrHooks: {
      type: {
        set: function(a, b) {
          if (!fb.support.radioValue && "radio" === b && fb.nodeName(a, "input")) {
            var c = a.value;
            return a.setAttribute("type", b), c && (a.value = c), b
          }
        }
      }
    },
    propFix: {
      "for": "htmlFor",
      "class": "className"
    },
    prop: function(a, c, d) {
      var e, f, g, h = a.nodeType;
      if (a && 3 !== h && 8 !== h && 2 !== h) return g = 1 !== h || !fb.isXMLDoc(a), g && (c = fb.propFix[c] || c, f = fb.propHooks[c]), d !== b ? f && "set" in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get" in f && null !== (e = f.get(a, c)) ? e : a[c]
    },
    propHooks: {
      tabIndex: {
        get: function(a) {
          return a.hasAttribute("tabindex") || xb.test(a.nodeName) || a.href ? a.tabIndex : -1
        }
      }
    }
  }), ub = {
    set: function(a, b, c) {
      return b === !1 ? fb.removeAttr(a, c) : a.setAttribute(c, c), c
    }
  }, fb.each(fb.expr.match.bool.source.match(/\w+/g), function(a, c) {
    var d = fb.expr.attrHandle[c] || fb.find.attr;
    fb.expr.attrHandle[c] = function(a, c, e) {
      var f = fb.expr.attrHandle[c],
        g = e ? b : (fb.expr.attrHandle[c] = b) != d(a, c, e) ? c.toLowerCase() : null;
      return fb.expr.attrHandle[c] = f, g
    }
  }), fb.support.optSelected || (fb.propHooks.selected = {
    get: function(a) {
      var b = a.parentNode;
      return b && b.parentNode && b.parentNode.selectedIndex, null
    }
  }), fb.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    fb.propFix[this.toLowerCase()] = this
  }), fb.each(["radio", "checkbox"], function() {
    fb.valHooks[this] = {
      set: function(a, b) {
        return fb.isArray(b) ? a.checked = fb.inArray(fb(a).val(), b) >= 0 : void 0
      }
    }, fb.support.checkOn || (fb.valHooks[this].get = function(a) {
      return null === a.getAttribute("value") ? "on" : a.value
    })
  });
  var yb = /^key/,
    zb = /^(?:mouse|contextmenu)|click/,
    Ab = /^(?:focusinfocus|focusoutblur)$/,
    Bb = /^([^.]*)(?:\.(.+)|)$/;
  fb.event = {
    global: {},
    add: function(a, c, d, e, f) {
      var g, h, i, j, k, l, m, n, o, p, q, r = qb.get(a);
      if (r) {
        for (d.handler && (g = d, d = g.handler, f = g.selector), d.guid || (d.guid = fb.guid++), (j = r.events) || (j = r.events = {}), (h = r.handle) || (h = r.handle = function(a) {
          return typeof fb === R || a && fb.event.triggered === a.type ? b : fb.event.dispatch.apply(h.elem, arguments)
        }, h.elem = a), c = (c || "").match(hb) || [""], k = c.length; k--;) i = Bb.exec(c[k]) || [], o = q = i[1], p = (i[2] || "").split(".").sort(), o && (m = fb.event.special[o] || {}, o = (f ? m.delegateType : m.bindType) || o, m = fb.event.special[o] || {}, l = fb.extend({
          type: o,
          origType: q,
          data: e,
          handler: d,
          guid: d.guid,
          selector: f,
          needsContext: f && fb.expr.match.needsContext.test(f),
          namespace: p.join(".")
        }, g), (n = j[o]) || (n = j[o] = [], n.delegateCount = 0, m.setup && m.setup.call(a, e, p, h) !== !1 || a.addEventListener && a.addEventListener(o, h, !1)), m.add && (m.add.call(a, l), l.handler.guid || (l.handler.guid = d.guid)), f ? n.splice(n.delegateCount++, 0, l) : n.push(l), fb.event.global[o] = !0);
        a = null
      }
    },
    remove: function(a, b, c, d, e) {
      var f, g, h, i, j, k, l, m, n, o, p, q = qb.hasData(a) && qb.get(a);
      if (q && (i = q.events)) {
        for (b = (b || "").match(hb) || [""], j = b.length; j--;)
          if (h = Bb.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
            for (l = fb.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length; f--;) k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
            g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || fb.removeEvent(a, n, q.handle), delete i[n])
          } else
            for (n in i) fb.event.remove(a, n + b[j], c, d, !0);
        fb.isEmptyObject(i) && (delete q.handle, qb.remove(a, "events"))
      }
    },
    trigger: function(c, d, e, f) {
      var g, h, i, j, k, l, m, n = [e || T],
        o = db.call(c, "type") ? c.type : c,
        p = db.call(c, "namespace") ? c.namespace.split(".") : [];
      if (h = i = e = e || T, 3 !== e.nodeType && 8 !== e.nodeType && !Ab.test(o + fb.event.triggered) && (o.indexOf(".") >= 0 && (p = o.split("."), o = p.shift(), p.sort()), k = o.indexOf(":") < 0 && "on" + o, c = c[fb.expando] ? c : new fb.Event(o, "object" == typeof c && c), c.isTrigger = f ? 2 : 3, c.namespace = p.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, c.result = b, c.target || (c.target = e), d = null == d ? [c] : fb.makeArray(d, [c]), m = fb.event.special[o] || {}, f || !m.trigger || m.trigger.apply(e, d) !== !1)) {
        if (!f && !m.noBubble && !fb.isWindow(e)) {
          for (j = m.delegateType || o, Ab.test(j + o) || (h = h.parentNode); h; h = h.parentNode) n.push(h), i = h;
          i === (e.ownerDocument || T) && n.push(i.defaultView || i.parentWindow || a)
        }
        for (g = 0;
          (h = n[g++]) && !c.isPropagationStopped();) c.type = g > 1 ? j : m.bindType || o, l = (qb.get(h, "events") || {})[c.type] && qb.get(h, "handle"), l && l.apply(h, d), l = k && h[k], l && fb.acceptData(h) && l.apply && l.apply(h, d) === !1 && c.preventDefault();
        return c.type = o, f || c.isDefaultPrevented() || m._default && m._default.apply(n.pop(), d) !== !1 || !fb.acceptData(e) || k && fb.isFunction(e[o]) && !fb.isWindow(e) && (i = e[k], i && (e[k] = null), fb.event.triggered = o, e[o](), fb.event.triggered = b, i && (e[k] = i)), c.result
      }
    },
    dispatch: function(a) {
      a = fb.event.fix(a);
      var c, d, e, f, g, h = [],
        i = ab.call(arguments),
        j = (qb.get(this, "events") || {})[a.type] || [],
        k = fb.event.special[a.type] || {};
      if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
        for (h = fb.event.handlers.call(this, a, j), c = 0;
          (f = h[c++]) && !a.isPropagationStopped();)
          for (a.currentTarget = f.elem, d = 0;
            (g = f.handlers[d++]) && !a.isImmediatePropagationStopped();)(!a.namespace_re || a.namespace_re.test(g.namespace)) && (a.handleObj = g, a.data = g.data, e = ((fb.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), e !== b && (a.result = e) === !1 && (a.preventDefault(), a.stopPropagation()));
        return k.postDispatch && k.postDispatch.call(this, a), a.result
      }
    },
    handlers: function(a, c) {
      var d, e, f, g, h = [],
        i = c.delegateCount,
        j = a.target;
      if (i && j.nodeType && (!a.button || "click" !== a.type))
        for (; j !== this; j = j.parentNode || this)
          if (j.disabled !== !0 || "click" !== a.type) {
            for (e = [], d = 0; i > d; d++) g = c[d], f = g.selector + " ", e[f] === b && (e[f] = g.needsContext ? fb(f, this).index(j) >= 0 : fb.find(f, this, null, [j]).length), e[f] && e.push(g);
            e.length && h.push({
              elem: j,
              handlers: e
            })
          }
      return i < c.length && h.push({
        elem: this,
        handlers: c.slice(i)
      }), h
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(a, b) {
        return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function(a, c) {
        var d, e, f, g = c.button;
        return null == a.pageX && null != c.clientX && (d = a.target.ownerDocument || T, e = d.documentElement, f = d.body, a.pageX = c.clientX + (e && e.scrollLeft || f && f.scrollLeft || 0) - (e && e.clientLeft || f && f.clientLeft || 0), a.pageY = c.clientY + (e && e.scrollTop || f && f.scrollTop || 0) - (e && e.clientTop || f && f.clientTop || 0)), a.which || g === b || (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0), a
      }
    },
    fix: function(a) {
      if (a[fb.expando]) return a;
      var b, c, d, e = a.type,
        f = a,
        g = this.fixHooks[e];
      for (g || (this.fixHooks[e] = g = zb.test(e) ? this.mouseHooks : yb.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new fb.Event(f), b = d.length; b--;) c = d[b], a[c] = f[c];
      return a.target || (a.target = T), 3 === a.target.nodeType && (a.target = a.target.parentNode), g.filter ? g.filter(a, f) : a
    },
    special: {
      load: {
        noBubble: !0
      },
      focus: {
        trigger: function() {
          return this !== i() && this.focus ? (this.focus(), !1) : void 0
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function() {
          return this === i() && this.blur ? (this.blur(), !1) : void 0
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function() {
          return "checkbox" === this.type && this.click && fb.nodeName(this, "input") ? (this.click(), !1) : void 0
        },
        _default: function(a) {
          return fb.nodeName(a.target, "a")
        }
      },
      beforeunload: {
        postDispatch: function(a) {
          a.result !== b && (a.originalEvent.returnValue = a.result)
        }
      }
    },
    simulate: function(a, b, c, d) {
      var e = fb.extend(new fb.Event, c, {
        type: a,
        isSimulated: !0,
        originalEvent: {}
      });
      d ? fb.event.trigger(e, null, b) : fb.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
    }
  }, fb.removeEvent = function(a, b, c) {
    a.removeEventListener && a.removeEventListener(b, c, !1)
  }, fb.Event = function(a, b) {
    return this instanceof fb.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.getPreventDefault && a.getPreventDefault() ? g : h) : this.type = a, b && fb.extend(this, b), this.timeStamp = a && a.timeStamp || fb.now(), this[fb.expando] = !0, void 0) : new fb.Event(a, b)
  }, fb.Event.prototype = {
    isDefaultPrevented: h,
    isPropagationStopped: h,
    isImmediatePropagationStopped: h,
    preventDefault: function() {
      var a = this.originalEvent;
      this.isDefaultPrevented = g, a && a.preventDefault && a.preventDefault()
    },
    stopPropagation: function() {
      var a = this.originalEvent;
      this.isPropagationStopped = g, a && a.stopPropagation && a.stopPropagation()
    },
    stopImmediatePropagation: function() {
      this.isImmediatePropagationStopped = g, this.stopPropagation()
    }
  }, fb.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  }, function(a, b) {
    fb.event.special[a] = {
      delegateType: b,
      bindType: b,
      handle: function(a) {
        var c, d = this,
          e = a.relatedTarget,
          f = a.handleObj;
        return (!e || e !== d && !fb.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
      }
    }
  }), fb.support.focusinBubbles || fb.each({
    focus: "focusin",
    blur: "focusout"
  }, function(a, b) {
    var c = 0,
      d = function(a) {
        fb.event.simulate(b, a.target, fb.event.fix(a), !0)
      };
    fb.event.special[b] = {
      setup: function() {
        0 === c++ && T.addEventListener(a, d, !0)
      },
      teardown: function() {
        0 === --c && T.removeEventListener(a, d, !0)
      }
    }
  }), fb.fn.extend({
    on: function(a, c, d, e, f) {
      var g, i;
      if ("object" == typeof a) {
        "string" != typeof c && (d = d || c, c = b);
        for (i in a) this.on(i, c, d, a[i], f);
        return this
      }
      if (null == d && null == e ? (e = c, d = c = b) : null == e && ("string" == typeof c ? (e = d, d = b) : (e = d, d = c, c = b)), e === !1) e = h;
      else if (!e) return this;
      return 1 === f && (g = e, e = function(a) {
        return fb().off(a), g.apply(this, arguments)
      }, e.guid = g.guid || (g.guid = fb.guid++)), this.each(function() {
        fb.event.add(this, a, e, d, c)
      })
    },
    one: function(a, b, c, d) {
      return this.on(a, b, c, d, 1)
    },
    off: function(a, c, d) {
      var e, f;
      if (a && a.preventDefault && a.handleObj) return e = a.handleObj, fb(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this;
      if ("object" == typeof a) {
        for (f in a) this.off(f, c, a[f]);
        return this
      }
      return (c === !1 || "function" == typeof c) && (d = c, c = b), d === !1 && (d = h), this.each(function() {
        fb.event.remove(this, a, d, c)
      })
    },
    trigger: function(a, b) {
      return this.each(function() {
        fb.event.trigger(a, b, this)
      })
    },
    triggerHandler: function(a, b) {
      var c = this[0];
      return c ? fb.event.trigger(a, b, c, !0) : void 0
    }
  });
  var Cb = /^.[^:#\[\.,]*$/,
    Db = /^(?:parents|prev(?:Until|All))/,
    Eb = fb.expr.match.needsContext,
    Fb = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
    };
  fb.fn.extend({
    find: function(a) {
      var b, c = [],
        d = this,
        e = d.length;
      if ("string" != typeof a) return this.pushStack(fb(a).filter(function() {
        for (b = 0; e > b; b++)
          if (fb.contains(d[b], this)) return !0
      }));
      for (b = 0; e > b; b++) fb.find(a, d[b], c);
      return c = this.pushStack(e > 1 ? fb.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c
    },
    has: function(a) {
      var b = fb(a, this),
        c = b.length;
      return this.filter(function() {
        for (var a = 0; c > a; a++)
          if (fb.contains(this, b[a])) return !0
      })
    },
    not: function(a) {
      return this.pushStack(k(this, a || [], !0))
    },
    filter: function(a) {
      return this.pushStack(k(this, a || [], !1))
    },
    is: function(a) {
      return !!k(this, "string" == typeof a && Eb.test(a) ? fb(a) : a || [], !1).length
    },
    closest: function(a, b) {
      for (var c, d = 0, e = this.length, f = [], g = Eb.test(a) || "string" != typeof a ? fb(a, b || this.context) : 0; e > d; d++)
        for (c = this[d]; c && c !== b; c = c.parentNode)
          if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && fb.find.matchesSelector(c, a))) {
            c = f.push(c);
            break
          }
      return this.pushStack(f.length > 1 ? fb.unique(f) : f)
    },
    index: function(a) {
      return a ? "string" == typeof a ? bb.call(fb(a), this[0]) : bb.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    },
    add: function(a, b) {
      var c = "string" == typeof a ? fb(a, b) : fb.makeArray(a && a.nodeType ? [a] : a),
        d = fb.merge(this.get(), c);
      return this.pushStack(fb.unique(d))
    },
    addBack: function(a) {
      return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
    }
  }), fb.each({
    parent: function(a) {
      var b = a.parentNode;
      return b && 11 !== b.nodeType ? b : null
    },
    parents: function(a) {
      return fb.dir(a, "parentNode")
    },
    parentsUntil: function(a, b, c) {
      return fb.dir(a, "parentNode", c)
    },
    next: function(a) {
      return j(a, "nextSibling")
    },
    prev: function(a) {
      return j(a, "previousSibling")
    },
    nextAll: function(a) {
      return fb.dir(a, "nextSibling")
    },
    prevAll: function(a) {
      return fb.dir(a, "previousSibling")
    },
    nextUntil: function(a, b, c) {
      return fb.dir(a, "nextSibling", c)
    },
    prevUntil: function(a, b, c) {
      return fb.dir(a, "previousSibling", c)
    },
    siblings: function(a) {
      return fb.sibling((a.parentNode || {}).firstChild, a)
    },
    children: function(a) {
      return fb.sibling(a.firstChild)
    },
    contents: function(a) {
      return a.contentDocument || fb.merge([], a.childNodes)
    }
  }, function(a, b) {
    fb.fn[a] = function(c, d) {
      var e = fb.map(this, b, c);
      return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = fb.filter(d, e)), this.length > 1 && (Fb[a] || fb.unique(e), Db.test(a) && e.reverse()), this.pushStack(e)
    }
  }), fb.extend({
    filter: function(a, b, c) {
      var d = b[0];
      return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? fb.find.matchesSelector(d, a) ? [d] : [] : fb.find.matches(a, fb.grep(b, function(a) {
        return 1 === a.nodeType
      }))
    },
    dir: function(a, c, d) {
      for (var e = [], f = d !== b;
        (a = a[c]) && 9 !== a.nodeType;)
        if (1 === a.nodeType) {
          if (f && fb(a).is(d)) break;
          e.push(a)
        }
      return e
    },
    sibling: function(a, b) {
      for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
      return c
    }
  });
  var Gb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    Hb = /<([\w:]+)/,
    Ib = /<|&#?\w+;/,
    Jb = /<(?:script|style|link)/i,
    Kb = /^(?:checkbox|radio)$/i,
    Lb = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Mb = /^$|\/(?:java|ecma)script/i,
    Nb = /^true\/(.*)/,
    Ob = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    Pb = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      thead: [1, "<table>", "</table>"],
      col: [2, "<table><colgroup>", "</colgroup></table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: [0, "", ""]
    };
  Pb.optgroup = Pb.option, Pb.tbody = Pb.tfoot = Pb.colgroup = Pb.caption = Pb.thead, Pb.th = Pb.td, fb.fn.extend({
    text: function(a) {
      return fb.access(this, function(a) {
        return a === b ? fb.text(this) : this.empty().append((this[0] && this[0].ownerDocument || T).createTextNode(a))
      }, null, a, arguments.length)
    },
    append: function() {
      return this.domManip(arguments, function(a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = l(this, a);
          b.appendChild(a)
        }
      })
    },
    prepend: function() {
      return this.domManip(arguments, function(a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = l(this, a);
          b.insertBefore(a, b.firstChild)
        }
      })
    },
    before: function() {
      return this.domManip(arguments, function(a) {
        this.parentNode && this.parentNode.insertBefore(a, this)
      })
    },
    after: function() {
      return this.domManip(arguments, function(a) {
        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
      })
    },
    remove: function(a, b) {
      for (var c, d = a ? fb.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || fb.cleanData(q(c)), c.parentNode && (b && fb.contains(c.ownerDocument, c) && o(q(c, "script")), c.parentNode.removeChild(c));
      return this
    },
    empty: function() {
      for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (fb.cleanData(q(a, !1)), a.textContent = "");
      return this
    },
    clone: function(a, b) {
      return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
        return fb.clone(this, a, b)
      })
    },
    html: function(a) {
      return fb.access(this, function(a) {
        var c = this[0] || {},
          d = 0,
          e = this.length;
        if (a === b && 1 === c.nodeType) return c.innerHTML;
        if ("string" == typeof a && !Jb.test(a) && !Pb[(Hb.exec(a) || ["", ""])[1].toLowerCase()]) {
          a = a.replace(Gb, "<$1></$2>");
          try {
            for (; e > d; d++) c = this[d] || {}, 1 === c.nodeType && (fb.cleanData(q(c, !1)), c.innerHTML = a);
            c = 0
          } catch (f) {}
        }
        c && this.empty().append(a)
      }, null, a, arguments.length)
    },
    replaceWith: function() {
      var a = fb.map(this, function(a) {
          return [a.nextSibling, a.parentNode]
        }),
        b = 0;
      return this.domManip(arguments, function(c) {
        var d = a[b++],
          e = a[b++];
        e && (d && d.parentNode !== e && (d = this.nextSibling), fb(this).remove(), e.insertBefore(c, d))
      }, !0), b ? this : this.remove()
    },
    detach: function(a) {
      return this.remove(a, !0)
    },
    domManip: function(a, b, c) {
      a = $.apply([], a);
      var d, e, f, g, h, i, j = 0,
        k = this.length,
        l = this,
        o = k - 1,
        p = a[0],
        r = fb.isFunction(p);
      if (r || !(1 >= k || "string" != typeof p || fb.support.checkClone) && Lb.test(p)) return this.each(function(d) {
        var e = l.eq(d);
        r && (a[0] = p.call(this, d, e.html())), e.domManip(a, b, c)
      });
      if (k && (d = fb.buildFragment(a, this[0].ownerDocument, !1, !c && this), e = d.firstChild, 1 === d.childNodes.length && (d = e), e)) {
        for (f = fb.map(q(d, "script"), m), g = f.length; k > j; j++) h = d, j !== o && (h = fb.clone(h, !0, !0), g && fb.merge(f, q(h, "script"))), b.call(this[j], h, j);
        if (g)
          for (i = f[f.length - 1].ownerDocument, fb.map(f, n), j = 0; g > j; j++) h = f[j], Mb.test(h.type || "") && !qb.access(h, "globalEval") && fb.contains(i, h) && (h.src ? fb._evalUrl(h.src) : fb.globalEval(h.textContent.replace(Ob, "")))
      }
      return this
    }
  }), fb.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(a, b) {
    fb.fn[a] = function(a) {
      for (var c, d = [], e = fb(a), f = e.length - 1, g = 0; f >= g; g++) c = g === f ? this : this.clone(!0), fb(e[g])[b](c), _.apply(d, c.get());
      return this.pushStack(d)
    }
  }), fb.extend({
    clone: function(a, b, c) {
      var d, e, f, g, h = a.cloneNode(!0),
        i = fb.contains(a.ownerDocument, a);
      if (!(fb.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || fb.isXMLDoc(a)))
        for (g = q(h), f = q(a), d = 0, e = f.length; e > d; d++) r(f[d], g[d]);
      if (b)
        if (c)
          for (f = f || q(a), g = g || q(h), d = 0, e = f.length; e > d; d++) p(f[d], g[d]);
        else p(a, h);
      return g = q(h, "script"), g.length > 0 && o(g, !i && q(a, "script")), h
    },
    buildFragment: function(a, b, c, d) {
      for (var e, f, g, h, i, j, k = 0, l = a.length, m = b.createDocumentFragment(), n = []; l > k; k++)
        if (e = a[k], e || 0 === e)
          if ("object" === fb.type(e)) fb.merge(n, e.nodeType ? [e] : e);
          else if (Ib.test(e)) {
        for (f = f || m.appendChild(b.createElement("div")), g = (Hb.exec(e) || ["", ""])[1].toLowerCase(), h = Pb[g] || Pb._default, f.innerHTML = h[1] + e.replace(Gb, "<$1></$2>") + h[2], j = h[0]; j--;) f = f.lastChild;
        fb.merge(n, f.childNodes), f = m.firstChild, f.textContent = ""
      } else n.push(b.createTextNode(e));
      for (m.textContent = "", k = 0; e = n[k++];)
        if ((!d || -1 === fb.inArray(e, d)) && (i = fb.contains(e.ownerDocument, e), f = q(m.appendChild(e), "script"), i && o(f), c))
          for (j = 0; e = f[j++];) Mb.test(e.type || "") && c.push(e);
      return m
    },
    cleanData: function(a) {
      for (var c, d, f, g, h, i, j = fb.event.special, k = 0;
        (d = a[k]) !== b; k++) {
        if (e.accepts(d) && (h = d[qb.expando], h && (c = qb.cache[h]))) {
          if (f = Object.keys(c.events || {}), f.length)
            for (i = 0;
              (g = f[i]) !== b; i++) j[g] ? fb.event.remove(d, g) : fb.removeEvent(d, g, c.handle);
          qb.cache[h] && delete qb.cache[h]
        }
        delete pb.cache[d[pb.expando]]
      }
    },
    _evalUrl: function(a) {
      return fb.ajax({
        url: a,
        type: "GET",
        dataType: "script",
        async: !1,
        global: !1,
        "throws": !0
      })
    }
  }), fb.fn.extend({
    wrapAll: function(a) {
      var b;
      return fb.isFunction(a) ? this.each(function(b) {
        fb(this).wrapAll(a.call(this, b))
      }) : (this[0] && (b = fb(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
        for (var a = this; a.firstElementChild;) a = a.firstElementChild;
        return a
      }).append(this)), this)
    },
    wrapInner: function(a) {
      return fb.isFunction(a) ? this.each(function(b) {
        fb(this).wrapInner(a.call(this, b))
      }) : this.each(function() {
        var b = fb(this),
          c = b.contents();
        c.length ? c.wrapAll(a) : b.append(a)
      })
    },
    wrap: function(a) {
      var b = fb.isFunction(a);
      return this.each(function(c) {
        fb(this).wrapAll(b ? a.call(this, c) : a)
      })
    },
    unwrap: function() {
      return this.parent().each(function() {
        fb.nodeName(this, "body") || fb(this).replaceWith(this.childNodes)
      }).end()
    }
  });
  var Qb, Rb, Sb = /^(none|table(?!-c[ea]).+)/,
    Tb = /^margin/,
    Ub = new RegExp("^(" + gb + ")(.*)$", "i"),
    Vb = new RegExp("^(" + gb + ")(?!px)[a-z%]+$", "i"),
    Wb = new RegExp("^([+-])=(" + gb + ")", "i"),
    Xb = {
      BODY: "block"
    },
    Yb = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    },
    Zb = {
      letterSpacing: 0,
      fontWeight: 400
    },
    $b = ["Top", "Right", "Bottom", "Left"],
    _b = ["Webkit", "O", "Moz", "ms"];
  fb.fn.extend({
    css: function(a, c) {
      return fb.access(this, function(a, c, d) {
        var e, f, g = {},
          h = 0;
        if (fb.isArray(c)) {
          for (e = u(a), f = c.length; f > h; h++) g[c[h]] = fb.css(a, c[h], !1, e);
          return g
        }
        return d !== b ? fb.style(a, c, d) : fb.css(a, c)
      }, a, c, arguments.length > 1)
    },
    show: function() {
      return v(this, !0)
    },
    hide: function() {
      return v(this)
    },
    toggle: function(a) {
      return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
        t(this) ? fb(this).show() : fb(this).hide()
      })
    }
  }), fb.extend({
    cssHooks: {
      opacity: {
        get: function(a, b) {
          if (b) {
            var c = Qb(a, "opacity");
            return "" === c ? "1" : c
          }
        }
      }
    },
    cssNumber: {
      columnCount: !0,
      fillOpacity: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {
      "float": "cssFloat"
    },
    style: function(a, c, d, e) {
      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
        var f, g, h, i = fb.camelCase(c),
          j = a.style;
        return c = fb.cssProps[i] || (fb.cssProps[i] = s(j, i)), h = fb.cssHooks[c] || fb.cssHooks[i], d === b ? h && "get" in h && (f = h.get(a, !1, e)) !== b ? f : j[c] : (g = typeof d, "string" === g && (f = Wb.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat(fb.css(a, c)), g = "number"), null == d || "number" === g && isNaN(d) || ("number" !== g || fb.cssNumber[i] || (d += "px"), fb.support.clearCloneStyle || "" !== d || 0 !== c.indexOf("background") || (j[c] = "inherit"), h && "set" in h && (d = h.set(a, d, e)) === b || (j[c] = d)), void 0)
      }
    },
    css: function(a, c, d, e) {
      var f, g, h, i = fb.camelCase(c);
      return c = fb.cssProps[i] || (fb.cssProps[i] = s(a.style, i)), h = fb.cssHooks[c] || fb.cssHooks[i], h && "get" in h && (f = h.get(a, !0, d)), f === b && (f = Qb(a, c, e)), "normal" === f && c in Zb && (f = Zb[c]), "" === d || d ? (g = parseFloat(f), d === !0 || fb.isNumeric(g) ? g || 0 : f) : f
    }
  }), Qb = function(a, c, d) {
    var e, f, g, h = d || u(a),
      i = h ? h.getPropertyValue(c) || h[c] : b,
      j = a.style;
    return h && ("" !== i || fb.contains(a.ownerDocument, a) || (i = fb.style(a, c)), Vb.test(i) && Tb.test(c) && (e = j.width, f = j.minWidth, g = j.maxWidth, j.minWidth = j.maxWidth = j.width = i, i = h.width, j.width = e, j.minWidth = f, j.maxWidth = g)), i
  }, fb.each(["height", "width"], function(a, b) {
    fb.cssHooks[b] = {
      get: function(a, c, d) {
        return c ? 0 === a.offsetWidth && Sb.test(fb.css(a, "display")) ? fb.swap(a, Yb, function() {
          return y(a, b, d)
        }) : y(a, b, d) : void 0
      },
      set: function(a, c, d) {
        var e = d && u(a);
        return w(a, c, d ? x(a, b, d, fb.support.boxSizing && "border-box" === fb.css(a, "boxSizing", !1, e), e) : 0)
      }
    }
  }), fb(function() {
    fb.support.reliableMarginRight || (fb.cssHooks.marginRight = {
      get: function(a, b) {
        return b ? fb.swap(a, {
          display: "inline-block"
        }, Qb, [a, "marginRight"]) : void 0
      }
    }), !fb.support.pixelPosition && fb.fn.position && fb.each(["top", "left"], function(a, b) {
      fb.cssHooks[b] = {
        get: function(a, c) {
          return c ? (c = Qb(a, b), Vb.test(c) ? fb(a).position()[b] + "px" : c) : void 0
        }
      }
    })
  }), fb.expr && fb.expr.filters && (fb.expr.filters.hidden = function(a) {
    return a.offsetWidth <= 0 && a.offsetHeight <= 0
  }, fb.expr.filters.visible = function(a) {
    return !fb.expr.filters.hidden(a)
  }), fb.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(a, b) {
    fb.cssHooks[a + b] = {
      expand: function(c) {
        for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + $b[d] + b] = f[d] || f[d - 2] || f[0];
        return e
      }
    }, Tb.test(a) || (fb.cssHooks[a + b].set = w)
  });
  var ac = /%20/g,
    bc = /\[\]$/,
    cc = /\r?\n/g,
    dc = /^(?:submit|button|image|reset|file)$/i,
    ec = /^(?:input|select|textarea|keygen)/i;
  fb.fn.extend({
    serialize: function() {
      return fb.param(this.serializeArray())
    },
    serializeArray: function() {
      return this.map(function() {
        var a = fb.prop(this, "elements");
        return a ? fb.makeArray(a) : this
      }).filter(function() {
        var a = this.type;
        return this.name && !fb(this).is(":disabled") && ec.test(this.nodeName) && !dc.test(a) && (this.checked || !Kb.test(a))
      }).map(function(a, b) {
        var c = fb(this).val();
        return null == c ? null : fb.isArray(c) ? fb.map(c, function(a) {
          return {
            name: b.name,
            value: a.replace(cc, "\r\n")
          }
        }) : {
          name: b.name,
          value: c.replace(cc, "\r\n")
        }
      }).get()
    }
  }), fb.param = function(a, c) {
    var d, e = [],
      f = function(a, b) {
        b = fb.isFunction(b) ? b() : null == b ? "" : b, e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
      };
    if (c === b && (c = fb.ajaxSettings && fb.ajaxSettings.traditional), fb.isArray(a) || a.jquery && !fb.isPlainObject(a)) fb.each(a, function() {
      f(this.name, this.value)
    });
    else
      for (d in a) B(d, a[d], c, f);
    return e.join("&").replace(ac, "+")
  }, fb.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
    fb.fn[b] = function(a, c) {
      return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
    }
  }), fb.fn.extend({
    hover: function(a, b) {
      return this.mouseenter(a).mouseleave(b || a)
    },
    bind: function(a, b, c) {
      return this.on(a, null, b, c)
    },
    unbind: function(a, b) {
      return this.off(a, null, b)
    },
    delegate: function(a, b, c, d) {
      return this.on(b, a, c, d)
    },
    undelegate: function(a, b, c) {
      return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
    }
  });
  var fc, gc, hc = fb.now(),
    ic = /\?/,
    jc = /#.*$/,
    kc = /([?&])_=[^&]*/,
    lc = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    mc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    nc = /^(?:GET|HEAD)$/,
    oc = /^\/\//,
    pc = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
    qc = fb.fn.load,
    rc = {},
    sc = {},
    tc = "*/".concat("*");
  try {
    gc = S.href
  } catch (uc) {
    gc = T.createElement("a"), gc.href = "", gc = gc.href
  }
  fc = pc.exec(gc.toLowerCase()) || [], fb.fn.load = function(a, c, d) {
    if ("string" != typeof a && qc) return qc.apply(this, arguments);
    var e, f, g, h = this,
      i = a.indexOf(" ");
    return i >= 0 && (e = a.slice(i), a = a.slice(0, i)), fb.isFunction(c) ? (d = c, c = b) : c && "object" == typeof c && (f = "POST"), h.length > 0 && fb.ajax({
      url: a,
      type: f,
      dataType: "html",
      data: c
    }).done(function(a) {
      g = arguments, h.html(e ? fb("<div>").append(fb.parseHTML(a)).find(e) : a)
    }).complete(d && function(a, b) {
      h.each(d, g || [a.responseText, b, a])
    }), this
  }, fb.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
    fb.fn[b] = function(a) {
      return this.on(b, a)
    }
  }), fb.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: gc,
      type: "GET",
      isLocal: mc.test(fc[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": tc,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": fb.parseJSON,
        "text xml": fb.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function(a, b) {
      return b ? E(E(a, fb.ajaxSettings), b) : E(fb.ajaxSettings, a)
    },
    ajaxPrefilter: C(rc),
    ajaxTransport: C(sc),
    ajax: function(a, c) {
      function d(a, c, d, h) {
        var j, l, s, t, v, x = c;
        2 !== u && (u = 2, i && clearTimeout(i), e = b, g = h || "", w.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, d && (t = F(m, w, d)), t = G(m, t, w, j), j ? (m.ifModified && (v = w.getResponseHeader("Last-Modified"), v && (fb.lastModified[f] = v), v = w.getResponseHeader("etag"), v && (fb.etag[f] = v)), 204 === a || "HEAD" === m.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = t.state, l = t.data, s = t.error, j = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), w.status = a, w.statusText = (c || x) + "", j ? p.resolveWith(n, [l, x, w]) : p.rejectWith(n, [w, x, s]), w.statusCode(r), r = b, k && o.trigger(j ? "ajaxSuccess" : "ajaxError", [w, m, j ? l : s]), q.fireWith(n, [w, x]), k && (o.trigger("ajaxComplete", [w, m]), --fb.active || fb.event.trigger("ajaxStop")))
      }
      "object" == typeof a && (c = a, a = b), c = c || {};
      var e, f, g, h, i, j, k, l, m = fb.ajaxSetup({}, c),
        n = m.context || m,
        o = m.context && (n.nodeType || n.jquery) ? fb(n) : fb.event,
        p = fb.Deferred(),
        q = fb.Callbacks("once memory"),
        r = m.statusCode || {},
        s = {},
        t = {},
        u = 0,
        v = "canceled",
        w = {
          readyState: 0,
          getResponseHeader: function(a) {
            var b;
            if (2 === u) {
              if (!h)
                for (h = {}; b = lc.exec(g);) h[b[1].toLowerCase()] = b[2];
              b = h[a.toLowerCase()]
            }
            return null == b ? null : b
          },
          getAllResponseHeaders: function() {
            return 2 === u ? g : null
          },
          setRequestHeader: function(a, b) {
            var c = a.toLowerCase();
            return u || (a = t[c] = t[c] || a, s[a] = b), this
          },
          overrideMimeType: function(a) {
            return u || (m.mimeType = a), this
          },
          statusCode: function(a) {
            var b;
            if (a)
              if (2 > u)
                for (b in a) r[b] = [r[b], a[b]];
              else w.always(a[w.status]);
            return this
          },
          abort: function(a) {
            var b = a || v;
            return e && e.abort(b), d(0, b), this
          }
        };
      if (p.promise(w).complete = q.add, w.success = w.done, w.error = w.fail, m.url = ((a || m.url || gc) + "").replace(jc, "").replace(oc, fc[1] + "//"), m.type = c.method || c.type || m.method || m.type, m.dataTypes = fb.trim(m.dataType || "*").toLowerCase().match(hb) || [""], null == m.crossDomain && (j = pc.exec(m.url.toLowerCase()), m.crossDomain = !(!j || j[1] === fc[1] && j[2] === fc[2] && (j[3] || ("http:" === j[1] ? "80" : "443")) === (fc[3] || ("http:" === fc[1] ? "80" : "443")))), m.data && m.processData && "string" != typeof m.data && (m.data = fb.param(m.data, m.traditional)), D(rc, m, c, w), 2 === u) return w;
      k = m.global, k && 0 === fb.active++ && fb.event.trigger("ajaxStart"), m.type = m.type.toUpperCase(), m.hasContent = !nc.test(m.type), f = m.url, m.hasContent || (m.data && (f = m.url += (ic.test(f) ? "&" : "?") + m.data, delete m.data), m.cache === !1 && (m.url = kc.test(f) ? f.replace(kc, "$1_=" + hc++) : f + (ic.test(f) ? "&" : "?") + "_=" + hc++)), m.ifModified && (fb.lastModified[f] && w.setRequestHeader("If-Modified-Since", fb.lastModified[f]), fb.etag[f] && w.setRequestHeader("If-None-Match", fb.etag[f])), (m.data && m.hasContent && m.contentType !== !1 || c.contentType) && w.setRequestHeader("Content-Type", m.contentType), w.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + tc + "; q=0.01" : "") : m.accepts["*"]);
      for (l in m.headers) w.setRequestHeader(l, m.headers[l]);
      if (m.beforeSend && (m.beforeSend.call(n, w, m) === !1 || 2 === u)) return w.abort();
      v = "abort";
      for (l in {
        success: 1,
        error: 1,
        complete: 1
      }) w[l](m[l]);
      if (e = D(sc, m, c, w)) {
        w.readyState = 1, k && o.trigger("ajaxSend", [w, m]), m.async && m.timeout > 0 && (i = setTimeout(function() {
          w.abort("timeout")
        }, m.timeout));
        try {
          u = 1, e.send(s, d)
        } catch (x) {
          if (!(2 > u)) throw x;
          d(-1, x)
        }
      } else d(-1, "No Transport");
      return w
    },
    getJSON: function(a, b, c) {
      return fb.get(a, b, c, "json")
    },
    getScript: function(a, c) {
      return fb.get(a, b, c, "script")
    }
  }), fb.each(["get", "post"], function(a, c) {
    fb[c] = function(a, d, e, f) {
      return fb.isFunction(d) && (f = f || e, e = d, d = b), fb.ajax({
        url: a,
        type: c,
        dataType: f,
        data: d,
        success: e
      })
    }
  }), fb.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /(?:java|ecma)script/
    },
    converters: {
      "text script": function(a) {
        return fb.globalEval(a), a
      }
    }
  }), fb.ajaxPrefilter("script", function(a) {
    a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET")
  }), fb.ajaxTransport("script", function(a) {
    if (a.crossDomain) {
      var b, c;
      return {
        send: function(d, e) {
          b = fb("<script>").prop({
            async: !0,
            charset: a.scriptCharset,
            src: a.url
          }).on("load error", c = function(a) {
            b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type)
          }), T.head.appendChild(b[0])
        },
        abort: function() {
          c && c()
        }
      }
    }
  });
  var vc = [],
    wc = /(=)\?(?=&|$)|\?\?/;
  fb.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var a = vc.pop() || fb.expando + "_" + hc++;
      return this[a] = !0, a
    }
  }), fb.ajaxPrefilter("json jsonp", function(c, d, e) {
    var f, g, h, i = c.jsonp !== !1 && (wc.test(c.url) ? "url" : "string" == typeof c.data && !(c.contentType || "").indexOf("application/x-www-form-urlencoded") && wc.test(c.data) && "data");
    return i || "jsonp" === c.dataTypes[0] ? (f = c.jsonpCallback = fb.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback, i ? c[i] = c[i].replace(wc, "$1" + f) : c.jsonp !== !1 && (c.url += (ic.test(c.url) ? "&" : "?") + c.jsonp + "=" + f), c.converters["script json"] = function() {
      return h || fb.error(f + " was not called"), h[0]
    }, c.dataTypes[0] = "json", g = a[f], a[f] = function() {
      h = arguments
    }, e.always(function() {
      a[f] = g, c[f] && (c.jsonpCallback = d.jsonpCallback, vc.push(f)), h && fb.isFunction(g) && g(h[0]), h = g = b
    }), "script") : void 0
  }), fb.ajaxSettings.xhr = function() {
    try {
      return new XMLHttpRequest
    } catch (a) {}
  };
  var xc = fb.ajaxSettings.xhr(),
    yc = {
      0: 200,
      1223: 204
    },
    zc = 0,
    Ac = {};
  a.ActiveXObject && fb(a).on("unload", function() {
    for (var a in Ac) Ac[a]();
    Ac = b
  }), fb.support.cors = !!xc && "withCredentials" in xc, fb.support.ajax = xc = !!xc, fb.ajaxTransport(function(a) {
    var c;
    return fb.support.cors || xc && !a.crossDomain ? {
      send: function(d, e) {
        var f, g, h = a.xhr();
        if (h.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
          for (f in a.xhrFields) h[f] = a.xhrFields[f];
        a.mimeType && h.overrideMimeType && h.overrideMimeType(a.mimeType), a.crossDomain || d["X-Requested-With"] || (d["X-Requested-With"] = "XMLHttpRequest");
        for (f in d) h.setRequestHeader(f, d[f]);
        c = function(a) {
          return function() {
            c && (delete Ac[g], c = h.onload = h.onerror = null, "abort" === a ? h.abort() : "error" === a ? e(h.status || 404, h.statusText) : e(yc[h.status] || h.status, h.statusText, "string" == typeof h.responseText ? {
              text: h.responseText
            } : b, h.getAllResponseHeaders()))
          }
        }, h.onload = c(), h.onerror = c("error"), c = Ac[g = zc++] = c("abort"), h.send(a.hasContent && a.data || null)
      },
      abort: function() {
        c && c()
      }
    } : void 0
  });
  var Bc, Cc, Dc = /^(?:toggle|show|hide)$/,
    Ec = new RegExp("^(?:([+-])=|)(" + gb + ")([a-z%]*)$", "i"),
    Fc = /queueHooks$/,
    Gc = [L],
    Hc = {
      "*": [
        function(a, b) {
          var c = this.createTween(a, b),
            d = c.cur(),
            e = Ec.exec(b),
            f = e && e[3] || (fb.cssNumber[a] ? "" : "px"),
            g = (fb.cssNumber[a] || "px" !== f && +d) && Ec.exec(fb.css(c.elem, a)),
            h = 1,
            i = 20;
          if (g && g[3] !== f) {
            f = f || g[3], e = e || [], g = +d || 1;
            do h = h || ".5", g /= h, fb.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i)
          }
          return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
        }
      ]
    };
  fb.Animation = fb.extend(J, {
    tweener: function(a, b) {
      fb.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
      for (var c, d = 0, e = a.length; e > d; d++) c = a[d], Hc[c] = Hc[c] || [], Hc[c].unshift(b)
    },
    prefilter: function(a, b) {
      b ? Gc.unshift(a) : Gc.push(a)
    }
  }), fb.Tween = M, M.prototype = {
    constructor: M,
    init: function(a, b, c, d, e, f) {
      this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (fb.cssNumber[c] ? "" : "px")
    },
    cur: function() {
      var a = M.propHooks[this.prop];
      return a && a.get ? a.get(this) : M.propHooks._default.get(this)
    },
    run: function(a) {
      var b, c = M.propHooks[this.prop];
      return this.pos = b = this.options.duration ? fb.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : M.propHooks._default.set(this), this
    }
  }, M.prototype.init.prototype = M.prototype, M.propHooks = {
    _default: {
      get: function(a) {
        var b;
        return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = fb.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
      },
      set: function(a) {
        fb.fx.step[a.prop] ? fb.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[fb.cssProps[a.prop]] || fb.cssHooks[a.prop]) ? fb.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
      }
    }
  }, M.propHooks.scrollTop = M.propHooks.scrollLeft = {
    set: function(a) {
      a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
    }
  }, fb.each(["toggle", "show", "hide"], function(a, b) {
    var c = fb.fn[b];
    fb.fn[b] = function(a, d, e) {
      return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(N(b, !0), a, d, e)
    }
  }), fb.fn.extend({
    fadeTo: function(a, b, c, d) {
      return this.filter(t).css("opacity", 0).show().end().animate({
        opacity: b
      }, a, c, d)
    },
    animate: function(a, b, c, d) {
      var e = fb.isEmptyObject(a),
        f = fb.speed(b, c, d),
        g = function() {
          var b = J(this, fb.extend({}, a), f);
          (e || qb.get(this, "finish")) && b.stop(!0)
        };
      return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
    },
    stop: function(a, c, d) {
      var e = function(a) {
        var b = a.stop;
        delete a.stop, b(d)
      };
      return "string" != typeof a && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), this.each(function() {
        var b = !0,
          c = null != a && a + "queueHooks",
          f = fb.timers,
          g = qb.get(this);
        if (c) g[c] && g[c].stop && e(g[c]);
        else
          for (c in g) g[c] && g[c].stop && Fc.test(c) && e(g[c]);
        for (c = f.length; c--;) f[c].elem !== this || null != a && f[c].queue !== a || (f[c].anim.stop(d), b = !1, f.splice(c, 1));
        (b || !d) && fb.dequeue(this, a)
      })
    },
    finish: function(a) {
      return a !== !1 && (a = a || "fx"), this.each(function() {
        var b, c = qb.get(this),
          d = c[a + "queue"],
          e = c[a + "queueHooks"],
          f = fb.timers,
          g = d ? d.length : 0;
        for (c.finish = !0, fb.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
        for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
        delete c.finish
      })
    }
  }), fb.each({
    slideDown: N("show"),
    slideUp: N("hide"),
    slideToggle: N("toggle"),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function(a, b) {
    fb.fn[a] = function(a, c, d) {
      return this.animate(b, a, c, d)
    }
  }), fb.speed = function(a, b, c) {
    var d = a && "object" == typeof a ? fb.extend({}, a) : {
      complete: c || !c && b || fb.isFunction(a) && a,
      duration: a,
      easing: c && b || b && !fb.isFunction(b) && b
    };
    return d.duration = fb.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in fb.fx.speeds ? fb.fx.speeds[d.duration] : fb.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
      fb.isFunction(d.old) && d.old.call(this), d.queue && fb.dequeue(this, d.queue)
    }, d
  }, fb.easing = {
    linear: function(a) {
      return a
    },
    swing: function(a) {
      return .5 - Math.cos(a * Math.PI) / 2
    }
  }, fb.timers = [], fb.fx = M.prototype.init, fb.fx.tick = function() {
    var a, c = fb.timers,
      d = 0;
    for (Bc = fb.now(); d < c.length; d++) a = c[d], a() || c[d] !== a || c.splice(d--, 1);
    c.length || fb.fx.stop(), Bc = b
  }, fb.fx.timer = function(a) {
    a() && fb.timers.push(a) && fb.fx.start()
  }, fb.fx.interval = 13, fb.fx.start = function() {
    Cc || (Cc = setInterval(fb.fx.tick, fb.fx.interval))
  }, fb.fx.stop = function() {
    clearInterval(Cc), Cc = null
  }, fb.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  }, fb.fx.step = {}, fb.expr && fb.expr.filters && (fb.expr.filters.animated = function(a) {
    return fb.grep(fb.timers, function(b) {
      return a === b.elem
    }).length
  }), fb.fn.offset = function(a) {
    if (arguments.length) return a === b ? this : this.each(function(b) {
      fb.offset.setOffset(this, a, b)
    });
    var c, d, e = this[0],
      f = {
        top: 0,
        left: 0
      },
      g = e && e.ownerDocument;
    if (g) return c = g.documentElement, fb.contains(c, e) ? (typeof e.getBoundingClientRect !== R && (f = e.getBoundingClientRect()), d = O(g), {
      top: f.top + d.pageYOffset - c.clientTop,
      left: f.left + d.pageXOffset - c.clientLeft
    }) : f
  }, fb.offset = {
    setOffset: function(a, b, c) {
      var d, e, f, g, h, i, j, k = fb.css(a, "position"),
        l = fb(a),
        m = {};
      "static" === k && (a.style.position = "relative"), h = l.offset(), f = fb.css(a, "top"), i = fb.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), fb.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
    }
  }, fb.fn.extend({
    position: function() {
      if (this[0]) {
        var a, b, c = this[0],
          d = {
            top: 0,
            left: 0
          };
        return "fixed" === fb.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), fb.nodeName(a[0], "html") || (d = a.offset()), d.top += fb.css(a[0], "borderTopWidth", !0), d.left += fb.css(a[0], "borderLeftWidth", !0)), {
          top: b.top - d.top - fb.css(c, "marginTop", !0),
          left: b.left - d.left - fb.css(c, "marginLeft", !0)
        }
      }
    },
    offsetParent: function() {
      return this.map(function() {
        for (var a = this.offsetParent || U; a && !fb.nodeName(a, "html") && "static" === fb.css(a, "position");) a = a.offsetParent;
        return a || U
      })
    }
  }), fb.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function(c, d) {
    var e = "pageYOffset" === d;
    fb.fn[c] = function(f) {
      return fb.access(this, function(c, f, g) {
        var h = O(c);
        return g === b ? h ? h[d] : c[f] : (h ? h.scrollTo(e ? a.pageXOffset : g, e ? g : a.pageYOffset) : c[f] = g, void 0)
      }, c, f, arguments.length, null)
    }
  }), fb.each({
    Height: "height",
    Width: "width"
  }, function(a, c) {
    fb.each({
      padding: "inner" + a,
      content: c,
      "": "outer" + a
    }, function(d, e) {
      fb.fn[e] = function(e, f) {
        var g = arguments.length && (d || "boolean" != typeof e),
          h = d || (e === !0 || f === !0 ? "margin" : "border");
        return fb.access(this, function(c, d, e) {
          var f;
          return fb.isWindow(c) ? c.document.documentElement["client" + a] : 9 === c.nodeType ? (f = c.documentElement, Math.max(c.body["scroll" + a], f["scroll" + a], c.body["offset" + a], f["offset" + a], f["client" + a])) : e === b ? fb.css(c, d, h) : fb.style(c, d, e, h)
        }, c, g ? e : b, g, null)
      }
    })
  }), fb.fn.size = function() {
    return this.length
  }, fb.fn.andSelf = fb.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = fb : "function" == typeof define && define.amd && define("jquery", [], function() {
    return fb
  }), "object" == typeof a && "object" == typeof a.document && (a.jQuery = a.$ = fb)
}(window), function() {
  function a(a, b, c) {
    for (var d = (c || 0) - 1, e = a ? a.length : 0; ++d < e;)
      if (a[d] === b) return d;
    return -1
  }

  function b(b, c) {
    var d = typeof c;
    if (b = b.cache, "boolean" == d || null == c) return b[c] ? 0 : -1;
    "number" != d && "string" != d && (d = "object");
    var e = "number" == d ? c : s + c;
    return b = (b = b[d]) && b[e], "object" == d ? b && a(b, c) > -1 ? 0 : -1 : b ? 0 : -1
  }

  function c(a) {
    var b = this.cache,
      c = typeof a;
    if ("boolean" == c || null == a) b[a] = !0;
    else {
      "number" != c && "string" != c && (c = "object");
      var d = "number" == c ? a : s + a,
        e = b[c] || (b[c] = {});
      "object" == c ? (e[d] || (e[d] = [])).push(a) : e[d] = !0
    }
  }

  function d(a) {
    return a.charCodeAt(0)
  }

  function e(a, b) {
    var c = a.criteria,
      d = b.criteria;
    if (c !== d) {
      if (c > d || "undefined" == typeof c) return 1;
      if (d > c || "undefined" == typeof d) return -1
    }
    return a.index - b.index
  }

  function f(a) {
    var b = -1,
      d = a.length,
      e = a[0],
      f = a[d / 2 | 0],
      g = a[d - 1];
    if (e && "object" == typeof e && f && "object" == typeof f && g && "object" == typeof g) return !1;
    var h = i();
    h["false"] = h["null"] = h["true"] = h.undefined = !1;
    var j = i();
    for (j.array = a, j.cache = h, j.push = c; ++b < d;) j.push(a[b]);
    return j
  }

  function g(a) {
    return "\\" + W[a]
  }

  function h() {
    return p.pop() || []
  }

  function i() {
    return q.pop() || {
      array: null,
      cache: null,
      criteria: null,
      "false": !1,
      index: 0,
      "null": !1,
      number: null,
      object: null,
      push: null,
      string: null,
      "true": !1,
      undefined: !1,
      value: null
    }
  }

  function j() {}

  function k(a) {
    a.length = 0, p.length < u && p.push(a)
  }

  function l(a) {
    var b = a.cache;
    b && l(b), a.array = a.cache = a.criteria = a.object = a.number = a.string = a.value = null, q.length < u && q.push(a)
  }

  function m(a, b, c) {
    b || (b = 0), "undefined" == typeof c && (c = a ? a.length : 0);
    for (var d = -1, e = c - b || 0, f = Array(0 > e ? 0 : e); ++d < e;) f[d] = a[b + d];
    return f
  }

  function n(c) {
    function p(a) {
      return a && "object" == typeof a && !Xd(a) && yd.call(a, "__wrapped__") ? a : new q(a)
    }

    function q(a, b) {
      this.__chain__ = !!b, this.__wrapped__ = a
    }

    function u(a, b, c, d, e) {
      if (c) {
        var f = c(a);
        if ("undefined" != typeof f) return f
      }
      var g = Ab(a);
      if (!g) return a;
      var i = Ed.call(a);
      if (!S[i]) return a;
      var j = Ud[i];
      switch (i) {
        case L:
        case M:
          return new j(+a);
        case O:
        case R:
          return new j(a);
        case Q:
          return f = j(a.source, A.exec(a)), f.lastIndex = a.lastIndex, f
      }
      var l = Xd(a);
      if (b) {
        var n = !d;
        d || (d = h()), e || (e = h());
        for (var o = d.length; o--;)
          if (d[o] == a) return e[o];
        f = l ? j(a.length) : {}
      } else f = l ? m(a) : ce({}, a);
      return l && (yd.call(a, "index") && (f.index = a.index), yd.call(a, "input") && (f.input = a.input)), b ? (d.push(a), e.push(f), (l ? Tb : fe)(a, function(a, g) {
        f[g] = u(a, b, c, d, e)
      }), n && (k(d), k(e)), f) : f
    }

    function W(a, b, c) {
      if ("function" != typeof a) return Tc;
      if ("undefined" == typeof b) return a;
      var d = a.__bindData__ || Vd.funcNames && !a.name;
      if ("undefined" == typeof d) {
        var e = F && wd.call(a);
        Vd.funcNames || !e || B.test(e) || (d = !0), (Vd.funcNames || !d) && (d = !Vd.funcDecomp || F.test(e), Wd(a, d))
      }
      if (d !== !0 && d && 1 & d[1]) return a;
      switch (c) {
        case 1:
          return function(c) {
            return a.call(b, c)
          };
        case 2:
          return function(c, d) {
            return a.call(b, c, d)
          };
        case 3:
          return function(c, d, e) {
            return a.call(b, c, d, e)
          };
        case 4:
          return function(c, d, e, f) {
            return a.call(b, c, d, e, f)
          }
      }
      return Dc(a, b)
    }

    function Y(a, b, c, d) {
      for (var e = (d || 0) - 1, f = a ? a.length : 0, g = []; ++e < f;) {
        var h = a[e];
        if (h && "object" == typeof h && "number" == typeof h.length && (Xd(h) || jb(h))) {
          b || (h = Y(h, b, c));
          var i = -1,
            j = h.length,
            k = g.length;
          for (g.length += j; ++i < j;) g[k++] = h[i]
        } else c || g.push(h)
      }
      return g
    }

    function Z(a, b, c, d, e, f) {
      if (c) {
        var g = c(a, b);
        if ("undefined" != typeof g) return !!g
      }
      if (a === b) return 0 !== a || 1 / a == 1 / b;
      var i = typeof a,
        j = typeof b;
      if (!(a !== a || a && V[i] || b && V[j])) return !1;
      if (null == a || null == b) return a === b;
      var l = Ed.call(a),
        m = Ed.call(b);
      if (l == J && (l = P), m == J && (m = P), l != m) return !1;
      switch (l) {
        case L:
        case M:
          return +a == +b;
        case O:
          return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;
        case Q:
        case R:
          return a == nd(b)
      }
      var n = l == K;
      if (!n) {
        if (yd.call(a, "__wrapped__ ") || yd.call(b, "__wrapped__")) return Z(a.__wrapped__ || a, b.__wrapped__ || b, c, d, e, f);
        if (l != P) return !1;
        var o = a.constructor,
          p = b.constructor;
        if (o != p && !(zb(o) && o instanceof o && zb(p) && p instanceof p)) return !1
      }
      var q = !e;
      e || (e = h()), f || (f = h());
      for (var r = e.length; r--;)
        if (e[r] == a) return f[r] == b;
      var s = 0;
      if (g = !0, e.push(a), f.push(b), n) {
        if (r = a.length, s = b.length, g = s == a.length, !g && !d) return g;
        for (; s--;) {
          var t = r,
            u = b[s];
          if (d)
            for (; t-- && !(g = Z(a[t], u, c, d, e, f)););
          else if (!(g = Z(a[s], u, c, d, e, f))) break
        }
        return g
      }
      return ee(b, function(b, h, i) {
        return yd.call(i, h) ? (s++, g = yd.call(a, h) && Z(a[h], b, c, d, e, f)) : void 0
      }), g && !d && ee(a, function(a, b, c) {
        return yd.call(c, b) ? g = --s > -1 : void 0
      }), q && (k(e), k(f)), g
    }

    function _(a, b, c, d, e) {
      (Xd(b) ? Tb : fe)(b, function(b, f) {
        var g, h, i = b,
          j = a[f];
        if (b && ((h = Xd(b)) || ge(b))) {
          for (var k = d.length; k--;)
            if (g = d[k] == b) {
              j = e[k];
              break
            }
          if (!g) {
            var l;
            c && (i = c(j, b), (l = "undefined" != typeof i) && (j = i)), l || (j = h ? Xd(j) ? j : [] : ge(j) ? j : {}), d.push(b), e.push(j), l || _(j, b, c, d, e)
          }
        } else c && (i = c(j, b), "undefined" == typeof i && (i = b)), "undefined" != typeof i && (j = i);
        a[f] = j
      })
    }

    function bb(c, d, e) {
      var g = -1,
        i = gb(),
        j = c ? c.length : 0,
        m = [],
        n = !d && j >= t && i === a,
        o = e || n ? h() : m;
      if (n) {
        var p = f(o);
        p ? (i = b, o = p) : (n = !1, o = e ? o : (k(o), m))
      }
      for (; ++g < j;) {
        var q = c[g],
          r = e ? e(q, g, c) : q;
        (d ? !g || o[o.length - 1] !== r : i(o, r) < 0) && ((e || n) && o.push(r), m.push(q))
      }
      return n ? (k(o.array), l(o)) : e && k(o), m
    }

    function cb(a) {
      return function(b, c, d) {
        var e = {};
        c = p.createCallback(c, d, 3);
        var f = -1,
          g = b ? b.length : 0;
        if ("number" == typeof g)
          for (; ++f < g;) {
            var h = b[f];
            a(e, h, c(h, f, b), b)
          } else fe(b, function(b, d, f) {
            a(e, b, c(b, d, f), f)
          });
        return e
      }
    }

    function db(a, b, c, d, e, f) {
      var g = 1 & b,
        h = 2 & b,
        i = 4 & b,
        j = 8 & b,
        k = 16 & b,
        l = 32 & b,
        m = a;
      if (!h && !zb(a)) throw new od;
      k && !c.length && (b &= -17, k = c = !1), l && !d.length && (b &= -33, l = d = !1);
      var n = a && a.__bindData__;
      if (n) return !g || 1 & n[1] || (n[4] = e), !g && 1 & n[1] && (b |= 8), !i || 4 & n[1] || (n[5] = f), k && Ad.apply(n[2] || (n[2] = []), c), l && Ad.apply(n[3] || (n[3] = []), d), n[1] |= b, db.apply(null, n);
      if (g && !(h || i || l) && (Vd.fastBind || Hd && k)) {
        if (k) {
          var o = [e];
          Ad.apply(o, c)
        }
        var p = k ? Hd.apply(a, o) : Hd.call(a, e)
      } else p = function() {
        var n = arguments,
          o = g ? e : this;
        if ((i || k || l) && (n = Rd.call(n), k && Fd.apply(n, c), l && Ad.apply(n, d), i && n.length < f)) return b |= 16, db(a, j ? b : -4 & b, n, null, e, f);
        if (h && (a = o[m]), this instanceof p) {
          o = eb(a.prototype);
          var q = a.apply(o, n);
          return Ab(q) ? q : o
        }
        return a.apply(o, n)
      };
      return Wd(p, Rd.call(arguments)), p
    }

    function eb(a) {
      return Ab(a) ? Id(a) : {}
    }

    function fb(a) {
      return $d[a]
    }

    function gb() {
      var b = (b = p.indexOf) === nc ? a : b;
      return b
    }

    function hb(a) {
      var b, c;
      return a && Ed.call(a) == P && (b = a.constructor, !zb(b) || b instanceof b) ? (ee(a, function(a, b) {
        c = b
      }), "undefined" == typeof c || yd.call(a, c)) : !1
    }

    function ib(a) {
      return _d[a]
    }

    function jb(a) {
      return a && "object" == typeof a && "number" == typeof a.length && Ed.call(a) == J || !1
    }

    function kb(a, b, c, d) {
      return "boolean" != typeof b && null != b && (d = c, c = b, b = !1), u(a, b, "function" == typeof c && W(c, d, 1))
    }

    function lb(a, b, c) {
      return u(a, !0, "function" == typeof b && W(b, c, 1))
    }

    function mb(a, b, c) {
      var d;
      return b = p.createCallback(b, c, 3), fe(a, function(a, c, e) {
        return b(a, c, e) ? (d = c, !1) : void 0
      }), d
    }

    function nb(a, b, c) {
      var d;
      return b = p.createCallback(b, c, 3), pb(a, function(a, c, e) {
        return b(a, c, e) ? (d = c, !1) : void 0
      }), d
    }

    function ob(a, b, c) {
      var d = [];
      ee(a, function(a, b) {
        d.push(b, a)
      });
      var e = d.length;
      for (b = W(b, c, 3); e-- && b(d[e--], d[e], a) !== !1;);
      return a
    }

    function pb(a, b, c) {
      var d = Zd(a),
        e = d.length;
      for (b = W(b, c, 3); e--;) {
        var f = d[e];
        if (b(a[f], f, a) === !1) break
      }
      return a
    }

    function qb(a) {
      var b = [];
      return ee(a, function(a, c) {
        zb(a) && b.push(c)
      }), b.sort()
    }

    function rb(a, b) {
      return a ? yd.call(a, b) : !1
    }

    function sb(a) {
      for (var b = -1, c = Zd(a), d = c.length, e = {}; ++b < d;) {
        var f = c[b];
        e[a[f]] = f
      }
      return e
    }

    function tb(a) {
      return a === !0 || a === !1 || Ed.call(a) == L
    }

    function ub(a) {
      return a ? "object" == typeof a && Ed.call(a) == M : !1
    }

    function vb(a) {
      return a ? 1 === a.nodeType : !1
    }

    function wb(a) {
      var b = !0;
      if (!a) return b;
      var c = Ed.call(a),
        d = a.length;
      return c == K || c == R || c == J || c == P && "number" == typeof d && zb(a.splice) ? !d : (fe(a, function() {
        return b = !1
      }), b)
    }

    function xb(a, b, c, d) {
      return Z(a, b, "function" == typeof c && W(c, d, 2))
    }

    function yb(a) {
      return Kd(a) && !Ld(parseFloat(a))
    }

    function zb(a) {
      return "function" == typeof a
    }

    function Ab(a) {
      return !(!a || !V[typeof a])
    }

    function Bb(a) {
      return Db(a) && a != +a
    }

    function Cb(a) {
      return null === a
    }

    function Db(a) {
      return "number" == typeof a || Ed.call(a) == O
    }

    function Eb(a) {
      return a ? "object" == typeof a && Ed.call(a) == Q : !1
    }

    function Fb(a) {
      return "string" == typeof a || Ed.call(a) == R
    }

    function Gb(a) {
      return "undefined" == typeof a
    }

    function Hb(a) {
      var b = arguments,
        c = 2;
      if (!Ab(a)) return a;
      if ("number" != typeof b[2] && (c = b.length), c > 3 && "function" == typeof b[c - 2]) var d = W(b[--c - 1], b[c--], 2);
      else c > 2 && "function" == typeof b[c - 1] && (d = b[--c]);
      for (var e = Rd.call(arguments, 1, c), f = -1, g = h(), i = h(); ++f < c;) _(a, e[f], d, g, i);
      return k(g), k(i), a
    }

    function Ib(a, b, c) {
      var d = gb(),
        e = "function" == typeof b,
        f = {};
      if (e) b = p.createCallback(b, c, 3);
      else var g = Y(arguments, !0, !1, 1);
      return ee(a, function(a, c, h) {
        (e ? !b(a, c, h) : d(g, c) < 0) && (f[c] = a)
      }), f
    }

    function Jb(a) {
      for (var b = -1, c = Zd(a), d = c.length, e = fd(d); ++b < d;) {
        var f = c[b];
        e[b] = [f, a[f]]
      }
      return e
    }

    function Kb(a, b, c) {
      var d = {};
      if ("function" != typeof b)
        for (var e = -1, f = Y(arguments, !0, !1, 1), g = Ab(a) ? f.length : 0; ++e < g;) {
          var h = f[e];
          h in a && (d[h] = a[h])
        } else b = p.createCallback(b, c, 3), ee(a, function(a, c, e) {
          b(a, c, e) && (d[c] = a)
        });
      return d
    }

    function Lb(a, b, c, d) {
      var e = Xd(a);
      if (b = W(b, d, 4), null == c)
        if (e) c = [];
        else {
          var f = a && a.constructor,
            g = f && f.prototype;
          c = eb(g)
        }
      return (e ? Tb : fe)(a, function(a, d, e) {
        return b(c, a, d, e)
      }), c
    }

    function Mb(a) {
      for (var b = -1, c = Zd(a), d = c.length, e = fd(d); ++b < d;) e[b] = a[c[b]];
      return e
    }

    function Nb(a) {
      for (var b = arguments, c = -1, d = Y(b, !0, !1, 1), e = b[2] && b[2][b[1]] === a ? 1 : d.length, f = fd(e); ++c < e;) f[c] = a[d[c]];
      return f
    }

    function Ob(a, b, c) {
      var d = -1,
        e = gb(),
        f = a ? a.length : 0,
        g = !1;
      return c = (0 > c ? Nd(0, f + c) : c) || 0, Xd(a) ? g = e(a, b, c) > -1 : "number" == typeof f ? g = (Fb(a) ? a.indexOf(b, c) : e(a, b, c)) > -1 : fe(a, function(a) {
        return ++d >= c ? !(g = a === b) : void 0
      }), g
    }

    function Pb(a, b, c) {
      var d = !0;
      b = p.createCallback(b, c, 3);
      var e = -1,
        f = a ? a.length : 0;
      if ("number" == typeof f)
        for (; ++e < f && (d = !!b(a[e], e, a)););
      else fe(a, function(a, c, e) {
        return d = !!b(a, c, e)
      });
      return d
    }

    function Qb(a, b, c) {
      var d = [];
      b = p.createCallback(b, c, 3);
      var e = -1,
        f = a ? a.length : 0;
      if ("number" == typeof f)
        for (; ++e < f;) {
          var g = a[e];
          b(g, e, a) && d.push(g)
        } else fe(a, function(a, c, e) {
          b(a, c, e) && d.push(a)
        });
      return d
    }

    function Rb(a, b, c) {
      b = p.createCallback(b, c, 3);
      var d = -1,
        e = a ? a.length : 0;
      if ("number" != typeof e) {
        var f;
        return fe(a, function(a, c, d) {
          return b(a, c, d) ? (f = a, !1) : void 0
        }), f
      }
      for (; ++d < e;) {
        var g = a[d];
        if (b(g, d, a)) return g
      }
    }

    function Sb(a, b, c) {
      var d;
      return b = p.createCallback(b, c, 3), Ub(a, function(a, c, e) {
        return b(a, c, e) ? (d = a, !1) : void 0
      }), d
    }

    function Tb(a, b, c) {
      var d = -1,
        e = a ? a.length : 0;
      if (b = b && "undefined" == typeof c ? b : W(b, c, 3), "number" == typeof e)
        for (; ++d < e && b(a[d], d, a) !== !1;);
      else fe(a, b);
      return a
    }

    function Ub(a, b, c) {
      var d = a ? a.length : 0;
      if (b = b && "undefined" == typeof c ? b : W(b, c, 3), "number" == typeof d)
        for (; d-- && b(a[d], d, a) !== !1;);
      else {
        var e = Zd(a);
        d = e.length, fe(a, function(a, c, f) {
          return c = e ? e[--d] : --d, b(f[c], c, f)
        })
      }
      return a
    }

    function Vb(a, b) {
      var c = Rd.call(arguments, 2),
        d = -1,
        e = "function" == typeof b,
        f = a ? a.length : 0,
        g = fd("number" == typeof f ? f : 0);
      return Tb(a, function(a) {
        g[++d] = (e ? b : a[b]).apply(a, c)
      }), g
    }

    function Wb(a, b, c) {
      var d = -1,
        e = a ? a.length : 0;
      if (b = p.createCallback(b, c, 3), "number" == typeof e)
        for (var f = fd(e); ++d < e;) f[d] = b(a[d], d, a);
      else f = [], fe(a, function(a, c, e) {
        f[++d] = b(a, c, e)
      });
      return f
    }

    function Xb(a, b, c) {
      var e = -1 / 0,
        f = e;
      if (!b && Xd(a))
        for (var g = -1, h = a.length; ++g < h;) {
          var i = a[g];
          i > f && (f = i)
        } else b = !b && Fb(a) ? d : p.createCallback(b, c, 3), Tb(a, function(a, c, d) {
          var g = b(a, c, d);
          g > e && (e = g, f = a)
        });
      return f
    }

    function Yb(a, b, c) {
      var e = 1 / 0,
        f = e;
      if (!b && Xd(a))
        for (var g = -1, h = a.length; ++g < h;) {
          var i = a[g];
          f > i && (f = i)
        } else b = !b && Fb(a) ? d : p.createCallback(b, c, 3), Tb(a, function(a, c, d) {
          var g = b(a, c, d);
          e > g && (e = g, f = a)
        });
      return f
    }

    function Zb(a, b) {
      var c = -1,
        d = a ? a.length : 0;
      if ("number" == typeof d)
        for (var e = fd(d); ++c < d;) e[c] = a[c][b];
      return e || Wb(a, b)
    }

    function $b(a, b, c, d) {
      if (!a) return c;
      var e = arguments.length < 3;
      b = W(b, d, 4);
      var f = -1,
        g = a.length;
      if ("number" == typeof g)
        for (e && (c = a[++f]); ++f < g;) c = b(c, a[f], f, a);
      else fe(a, function(a, d, f) {
        c = e ? (e = !1, a) : b(c, a, d, f)
      });
      return c
    }

    function _b(a, b, c, d) {
      var e = arguments.length < 3;
      return b = W(b, d, 4), Ub(a, function(a, d, f) {
        c = e ? (e = !1, a) : b(c, a, d, f)
      }), c
    }

    function ac(a, b, c) {
      return b = p.createCallback(b, c, 3), Qb(a, function(a, c, d) {
        return !b(a, c, d)
      })
    }

    function bc(a, b, c) {
      var d = a ? a.length : 0;
      if ("number" != typeof d && (a = Mb(a)), null == b || c) return a ? a[Wc(d - 1)] : o;
      var e = cc(a);
      return e.length = Od(Nd(0, b), e.length), e
    }

    function cc(a) {
      var b = -1,
        c = a ? a.length : 0,
        d = fd("number" == typeof c ? c : 0);
      return Tb(a, function(a) {
        var c = Wc(++b);
        d[b] = d[c], d[c] = a
      }), d
    }

    function dc(a) {
      var b = a ? a.length : 0;
      return "number" == typeof b ? b : Zd(a).length
    }

    function ec(a, b, c) {
      var d;
      b = p.createCallback(b, c, 3);
      var e = -1,
        f = a ? a.length : 0;
      if ("number" == typeof f)
        for (; ++e < f && !(d = b(a[e], e, a)););
      else fe(a, function(a, c, e) {
        return !(d = b(a, c, e))
      });
      return !!d
    }

    function fc(a, b, c) {
      var d = -1,
        f = a ? a.length : 0,
        g = fd("number" == typeof f ? f : 0);
      for (b = p.createCallback(b, c, 3), Tb(a, function(a, c, e) {
        var f = g[++d] = i();
        f.criteria = b(a, c, e), f.index = d, f.value = a
      }), f = g.length, g.sort(e); f--;) {
        var h = g[f];
        g[f] = h.value, l(h)
      }
      return g
    }

    function gc(a) {
      return a && "number" == typeof a.length ? m(a) : Mb(a)
    }

    function hc(a) {
      for (var b = -1, c = a ? a.length : 0, d = []; ++b < c;) {
        var e = a[b];
        e && d.push(e)
      }
      return d
    }

    function ic(c) {
      var d = -1,
        e = gb(),
        g = c ? c.length : 0,
        h = Y(arguments, !0, !0, 1),
        i = [],
        j = g >= t && e === a;
      if (j) {
        var k = f(h);
        k ? (e = b, h = k) : j = !1
      }
      for (; ++d < g;) {
        var m = c[d];
        e(h, m) < 0 && i.push(m)
      }
      return j && l(h), i
    }

    function jc(a, b, c) {
      var d = -1,
        e = a ? a.length : 0;
      for (b = p.createCallback(b, c, 3); ++d < e;)
        if (b(a[d], d, a)) return d;
      return -1
    }

    function kc(a, b, c) {
      var d = a ? a.length : 0;
      for (b = p.createCallback(b, c, 3); d--;)
        if (b(a[d], d, a)) return d;
      return -1
    }

    function lc(a, b, c) {
      var d = 0,
        e = a ? a.length : 0;
      if ("number" != typeof b && null != b) {
        var f = -1;
        for (b = p.createCallback(b, c, 3); ++f < e && b(a[f], f, a);) d++
      } else if (d = b, null == d || c) return a ? a[0] : o;
      return m(a, 0, Od(Nd(0, d), e))
    }

    function mc(a, b, c, d) {
      return "boolean" != typeof b && null != b && (d = c, c = d && d[b] === a ? null : b, b = !1), null != c && (a = Wb(a, c, d)), Y(a, b)
    }

    function nc(b, c, d) {
      if ("number" == typeof d) {
        var e = b ? b.length : 0;
        d = 0 > d ? Nd(0, e + d) : d || 0
      } else if (d) {
        var f = wc(b, c);
        return b[f] === c ? f : -1
      }
      return a(b, c, d)
    }

    function oc(a, b, c) {
      var d = 0,
        e = a ? a.length : 0;
      if ("number" != typeof b && null != b) {
        var f = e;
        for (b = p.createCallback(b, c, 3); f-- && b(a[f], f, a);) d++
      } else d = null == b || c ? 1 : b || d;
      return m(a, 0, Od(Nd(0, e - d), e))
    }

    function pc(c) {
      for (var d = arguments, e = d.length, g = -1, i = h(), j = -1, m = gb(), n = c ? c.length : 0, o = [], p = h(); ++g < e;) {
        var q = d[g];
        i[g] = m === a && (q ? q.length : 0) >= t && f(g ? d[g] : p)
      }
      a: for (; ++j < n;) {
        var r = i[0];
        if (q = c[j], (r ? b(r, q) : m(p, q)) < 0) {
          for (g = e, (r || p).push(q); --g;)
            if (r = i[g], (r ? b(r, q) : m(d[g], q)) < 0) continue a;
          o.push(q)
        }
      }
      for (; e--;) r = i[e], r && l(r);
      return k(i), k(p), o
    }

    function qc(a, b, c) {
      var d = 0,
        e = a ? a.length : 0;
      if ("number" != typeof b && null != b) {
        var f = e;
        for (b = p.createCallback(b, c, 3); f-- && b(a[f], f, a);) d++
      } else if (d = b, null == d || c) return a ? a[e - 1] : o;
      return m(a, Nd(0, e - d))
    }

    function rc(a, b, c) {
      var d = a ? a.length : 0;
      for ("number" == typeof c && (d = (0 > c ? Nd(0, d + c) : Od(c, d - 1)) + 1); d--;)
        if (a[d] === b) return d;
      return -1
    }

    function sc(a) {
      for (var b = arguments, c = 0, d = b.length, e = a ? a.length : 0; ++c < d;)
        for (var f = -1, g = b[c]; ++f < e;) a[f] === g && (Dd.call(a, f--, 1), e--);
      return a
    }

    function tc(a, b, c) {
      a = +a || 0, c = "number" == typeof c ? c : +c || 1, null == b && (b = a, a = 0);
      for (var d = -1, e = Nd(0, td((b - a) / (c || 1))), f = fd(e); ++d < e;) f[d] = a, a += c;
      return f
    }

    function uc(a, b, c) {
      var d = -1,
        e = a ? a.length : 0,
        f = [];
      for (b = p.createCallback(b, c, 3); ++d < e;) {
        var g = a[d];
        b(g, d, a) && (f.push(g), Dd.call(a, d--, 1), e--)
      }
      return f
    }

    function vc(a, b, c) {
      if ("number" != typeof b && null != b) {
        var d = 0,
          e = -1,
          f = a ? a.length : 0;
        for (b = p.createCallback(b, c, 3); ++e < f && b(a[e], e, a);) d++
      } else d = null == b || c ? 1 : Nd(0, b);
      return m(a, d)
    }

    function wc(a, b, c, d) {
      var e = 0,
        f = a ? a.length : e;
      for (c = c ? p.createCallback(c, d, 1) : Tc, b = c(b); f > e;) {
        var g = e + f >>> 1;
        c(a[g]) < b ? e = g + 1 : f = g
      }
      return e
    }

    function xc() {
      return bb(Y(arguments, !0, !0))
    }

    function yc(a, b, c, d) {
      return "boolean" != typeof b && null != b && (d = c, c = d && d[b] === a ? null : b, b = !1), null != c && (c = p.createCallback(c, d, 3)), bb(a, b, c)
    }

    function zc(a) {
      return ic(a, Rd.call(arguments, 1))
    }

    function Ac() {
      for (var a = arguments.length > 1 ? arguments : arguments[0], b = -1, c = a ? Xb(Zb(a, "length")) : 0, d = fd(0 > c ? 0 : c); ++b < c;) d[b] = Zb(a, b);
      return d
    }

    function Bc(a, b) {
      for (var c = -1, d = a ? a.length : 0, e = {}; ++c < d;) {
        var f = a[c];
        b ? e[f] = b[c] : f && (e[f[0]] = f[1])
      }
      return e
    }

    function Cc(a, b) {
      if (!zb(b)) throw new od;
      return function() {
        return --a < 1 ? b.apply(this, arguments) : void 0
      }
    }

    function Dc(a, b) {
      return arguments.length > 2 ? db(a, 17, Rd.call(arguments, 2), null, b) : db(a, 1, null, null, b)
    }

    function Ec(a) {
      for (var b = arguments.length > 1 ? Y(arguments, !0, !1, 1) : qb(a), c = -1, d = b.length; ++c < d;) {
        var e = b[c];
        a[e] = db(a[e], 1, null, null, a)
      }
      return a
    }

    function Fc(a, b) {
      return arguments.length > 2 ? db(b, 19, Rd.call(arguments, 2), null, a) : db(b, 3, null, null, a)
    }

    function Gc() {
      for (var a = arguments, b = a.length; b--;)
        if (!zb(a[b])) throw new od;
      return function() {
        for (var b = arguments, c = a.length; c--;) b = [a[c].apply(this, b)];
        return b[0]
      }
    }

    function Hc(a, b, c) {
      var d = typeof a;
      if (null == a || "function" == d) return W(a, b, c);
      if ("object" != d) return function(b) {
        return b[a]
      };
      var e = Zd(a),
        f = e[0],
        g = a[f];
      return 1 != e.length || g !== g || Ab(g) ? function(b) {
        for (var c = e.length, d = !1; c-- && (d = Z(b[e[c]], a[e[c]], null, !0)););
        return d
      } : function(a) {
        var b = a[f];
        return g === b && (0 !== g || 1 / g == 1 / b)
      }
    }

    function Ic(a, b) {
      return b = "number" == typeof b ? b : +b || a.length, db(a, 4, null, null, null, b)
    }

    function Jc(a, b, c) {
      var d, e, f, g, h, i, j, k = 0,
        l = !1,
        m = !0;
      if (!zb(a)) throw new od;
      if (b = Nd(0, b) || 0, c === !0) {
        var n = !0;
        m = !1
      } else Ab(c) && (n = c.leading, l = "maxWait" in c && (Nd(b, c.maxWait) || 0), m = "trailing" in c ? c.trailing : m);
      var p = function() {
          var c = b - (zd() - g);
          if (0 >= c) {
            e && ud(e);
            var l = j;
            e = i = j = o, l && (k = zd(), f = a.apply(h, d))
          } else i = Cd(p, c)
        },
        q = function() {
          i && ud(i), e = i = j = o, (m || l !== b) && (k = zd(), f = a.apply(h, d))
        };
      return function() {
        if (d = arguments, g = zd(), h = this, j = m && (i || !n), l === !1) var c = n && !i;
        else {
          e || n || (k = g);
          var o = l - (g - k);
          0 >= o ? (e && (e = ud(e)), k = g, f = a.apply(h, d)) : e || (e = Cd(q, o))
        }
        return i || b === l || (i = Cd(p, b)), c && (f = a.apply(h, d)), f
      }
    }

    function Kc(a) {
      if (!zb(a)) throw new od;
      var b = Rd.call(arguments, 1);
      return Cd(function() {
        a.apply(o, b)
      }, 1)
    }

    function Lc(a, b) {
      if (!zb(a)) throw new od;
      var c = Rd.call(arguments, 2);
      return Cd(function() {
        a.apply(o, c)
      }, b)
    }

    function Mc(a, b) {
      if (!zb(a)) throw new od;
      var c = function() {
        var d = c.cache,
          e = b ? b.apply(this, arguments) : s + arguments[0];
        return yd.call(d, e) ? d[e] : d[e] = a.apply(this, arguments)
      };
      return c.cache = {}, c
    }

    function Nc(a) {
      var b, c;
      if (!zb(a)) throw new od;
      return function() {
        return b ? c : (b = !0, c = a.apply(this, arguments), a = null, c)
      }
    }

    function Oc(a) {
      return db(a, 16, Rd.call(arguments, 1))
    }

    function Pc(a) {
      return db(a, 32, null, Rd.call(arguments, 1))
    }

    function Qc(a, b, c) {
      var d = !0,
        e = !0;
      if (!zb(a)) throw new od;
      c === !1 ? d = !1 : Ab(c) && (d = "leading" in c ? c.leading : d, e = "trailing" in c ? c.trailing : e), T.leading = d, T.maxWait = b, T.trailing = e;
      var f = Jc(a, b, T);
      return f
    }

    function Rc(a, b) {
      if (!zb(b)) throw new od;
      return function() {
        var c = [a];
        return Ad.apply(c, arguments), b.apply(this, c)
      }
    }

    function Sc(a) {
      return null == a ? "" : nd(a).replace(be, fb)
    }

    function Tc(a) {
      return a
    }

    function Uc(a, b) {
      var c = a,
        d = !b || zb(c);
      b || (c = q, b = a, a = p), Tb(qb(b), function(e) {
        var f = a[e] = b[e];
        d && (c.prototype[e] = function() {
          var b = this.__wrapped__,
            d = [b];
          Ad.apply(d, arguments);
          var e = f.apply(a, d);
          return b && "object" == typeof b && b === e ? this : (e = new c(e), e.__chain__ = this.__chain__, e)
        })
      })
    }

    function Vc() {
      return c._ = rd, this
    }

    function Wc(a, b, c) {
      var d = null == a,
        e = null == b;
      null == c && ("boolean" == typeof a && e ? (c = a, a = 1) : e || "boolean" != typeof b || (c = b, e = !0)), d && e && (b = 1), a = +a || 0, e ? (b = a, a = 0) : b = +b || 0;
      var f = Qd();
      return c || a % 1 || b % 1 ? Od(a + f * (b - a + parseFloat("1e-" + ((f + "").length - 1))), b) : a + vd(f * (b - a + 1))
    }

    function Xc(a, b) {
      if (a) {
        var c = a[b];
        return zb(c) ? a[b]() : c
      }
    }

    function Yc(a, b, c) {
      var d = p.templateSettings;
      a || (a = ""), c = de({}, c, d);
      var e, f = de({}, c.imports, d.imports),
        h = Zd(f),
        i = Mb(f),
        j = 0,
        k = c.interpolate || E,
        l = "__p += '",
        m = md((c.escape || E).source + "|" + k.source + "|" + (k === C ? z : E).source + "|" + (c.evaluate || E).source + "|$", "g");
      a.replace(m, function(b, c, d, f, h, i) {
        return d || (d = f), l += a.slice(j, i).replace(G, g), c && (l += "' +\n__e(" + c + ") +\n'"), h && (e = !0, l += "';\n" + h + ";\n__p += '"), d && (l += "' +\n((__t = (" + d + ")) == null ? '' : __t) +\n'"), j = i + b.length, b
      }), l += "';\n";
      var n = c.variable,
        q = n;
      q || (n = "obj", l = "with (" + n + ") {\n" + l + "\n}\n"), l = (e ? l.replace(w, "") : l).replace(x, "$1").replace(y, "$1;"), l = "function(" + n + ") {\n" + (q ? "" : n + " || (" + n + " = {});\n") + "var __t, __p = '', __e = _.escape" + (e ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + l + "return __p\n}";
      var r = "\n/*\n//# sourceURL=" + (c.sourceURL || "/lodash/template/source[" + I+++"]") + "\n*/";
      try {
        var s = id(h, "return " + l + r).apply(o, i)
      } catch (t) {
        throw t.source = l, t
      }
      return b ? s(b) : (s.source = l, s)
    }

    function Zc(a, b, c) {
      a = (a = +a) > -1 ? a : 0;
      var d = -1,
        e = fd(a);
      for (b = W(b, c, 1); ++d < a;) e[d] = b(d);
      return e
    }

    function $c(a) {
      return null == a ? "" : nd(a).replace(ae, ib)
    }

    function _c(a) {
      var b = ++r;
      return nd(null == a ? "" : a) + b
    }

    function ad(a) {
      return a = new q(a), a.__chain__ = !0, a
    }

    function bd(a, b) {
      return b(a), a
    }

    function cd() {
      return this.__chain__ = !0, this
    }

    function dd() {
      return nd(this.__wrapped__)
    }

    function ed() {
      return this.__wrapped__
    }
    c = c ? ab.defaults(X.Object(), c, ab.pick(X, H)) : X;
    var fd = c.Array,
      gd = c.Boolean,
      hd = c.Date,
      id = c.Function,
      jd = c.Math,
      kd = c.Number,
      ld = c.Object,
      md = c.RegExp,
      nd = c.String,
      od = c.TypeError,
      pd = [],
      qd = ld.prototype,
      rd = c._,
      sd = md("^" + nd(qd.valueOf).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/valueOf|for [^\]]+/g, ".+?") + "$"),
      td = jd.ceil,
      ud = c.clearTimeout,
      vd = jd.floor,
      wd = id.prototype.toString,
      xd = sd.test(xd = ld.getPrototypeOf) && xd,
      yd = qd.hasOwnProperty,
      zd = sd.test(zd = hd.now) && zd || function() {
        return +new hd
      },
      Ad = pd.push,
      Bd = c.setImmediate,
      Cd = c.setTimeout,
      Dd = pd.splice,
      Ed = qd.toString,
      Fd = pd.unshift,
      Gd = function() {
        try {
          var a = {},
            b = sd.test(b = ld.defineProperty) && b,
            c = b(a, a, a) && b
        } catch (d) {}
        return c
      }(),
      Hd = sd.test(Hd = Ed.bind) && Hd,
      Id = sd.test(Id = ld.create) && Id,
      Jd = sd.test(Jd = fd.isArray) && Jd,
      Kd = c.isFinite,
      Ld = c.isNaN,
      Md = sd.test(Md = ld.keys) && Md,
      Nd = jd.max,
      Od = jd.min,
      Pd = c.parseInt,
      Qd = jd.random,
      Rd = pd.slice,
      Sd = sd.test(c.attachEvent),
      Td = Hd && !/\n|true/.test(Hd + Sd),
      Ud = {};
    Ud[K] = fd, Ud[L] = gd, Ud[M] = hd, Ud[N] = id, Ud[P] = ld, Ud[O] = kd, Ud[Q] = md, Ud[R] = nd, q.prototype = p.prototype;
    var Vd = p.support = {};
    Vd.fastBind = Hd && !Td, Vd.funcDecomp = !sd.test(c.WinRTError) && F.test(n), Vd.funcNames = "string" == typeof id.name, p.templateSettings = {
      escape: /<%-([\s\S]+?)%>/g,
      evaluate: /<%([\s\S]+?)%>/g,
      interpolate: C,
      variable: "",
      imports: {
        _: p
      }
    }, Id || (eb = function(a) {
      if (Ab(a)) {
        j.prototype = a;
        var b = new j;
        j.prototype = null
      }
      return b || {}
    });
    var Wd = Gd ? function(a, b) {
        U.value = b, Gd(a, "__bindData__", U)
      } : j,
      Xd = Jd || function(a) {
        return a && "object" == typeof a && "number" == typeof a.length && Ed.call(a) == K || !1
      },
      Yd = function(a) {
        var b, c = a,
          d = [];
        if (!c) return d;
        if (!V[typeof a]) return d;
        for (b in c) yd.call(c, b) && d.push(b);
        return d
      },
      Zd = Md ? function(a) {
        return Ab(a) ? Md(a) : []
      } : Yd,
      $d = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      },
      _d = sb($d),
      ae = md("(" + Zd(_d).join("|") + ")", "g"),
      be = md("[" + Zd($d).join("") + "]", "g"),
      ce = function(a, b, c) {
        var d, e = a,
          f = e;
        if (!e) return f;
        var g = arguments,
          h = 0,
          i = "number" == typeof c ? 2 : g.length;
        if (i > 3 && "function" == typeof g[i - 2]) var j = W(g[--i - 1], g[i--], 2);
        else i > 2 && "function" == typeof g[i - 1] && (j = g[--i]);
        for (; ++h < i;)
          if (e = g[h], e && V[typeof e])
            for (var k = -1, l = V[typeof e] && Zd(e), m = l ? l.length : 0; ++k < m;) d = l[k], f[d] = j ? j(f[d], e[d]) : e[d];
        return f
      },
      de = function(a, b, c) {
        var d, e = a,
          f = e;
        if (!e) return f;
        for (var g = arguments, h = 0, i = "number" == typeof c ? 2 : g.length; ++h < i;)
          if (e = g[h], e && V[typeof e])
            for (var j = -1, k = V[typeof e] && Zd(e), l = k ? k.length : 0; ++j < l;) d = k[j], "undefined" == typeof f[d] && (f[d] = e[d]);
        return f
      },
      ee = function(a, b, c) {
        var d, e = a,
          f = e;
        if (!e) return f;
        if (!V[typeof e]) return f;
        b = b && "undefined" == typeof c ? b : W(b, c, 3);
        for (d in e)
          if (b(e[d], d, a) === !1) return f;
        return f
      },
      fe = function(a, b, c) {
        var d, e = a,
          f = e;
        if (!e) return f;
        if (!V[typeof e]) return f;
        b = b && "undefined" == typeof c ? b : W(b, c, 3);
        for (var g = -1, h = V[typeof e] && Zd(e), i = h ? h.length : 0; ++g < i;)
          if (d = h[g], b(e[d], d, a) === !1) return f;
        return f
      },
      ge = function(a) {
        if (!a || Ed.call(a) != P) return !1;
        var b = a.valueOf,
          c = "function" == typeof b && (c = xd(b)) && xd(c);
        return c ? a == c || xd(a) == c : hb(a)
      },
      he = cb(function(a, b, c) {
        yd.call(a, c) ? a[c]++ : a[c] = 1
      }),
      ie = cb(function(a, b, c) {
        (yd.call(a, c) ? a[c] : a[c] = []).push(b)
      }),
      je = cb(function(a, b, c) {
        a[c] = b
      }),
      ke = Qb;
    Td && $ && "function" == typeof Bd && (Kc = function(a) {
      if (!zb(a)) throw new od;
      return Bd.apply(c, arguments)
    });
    var le = 8 == Pd(v + "08") ? Pd : function(a, b) {
      return Pd(Fb(a) ? a.replace(D, "") : a, b || 0)
    };
    return p.after = Cc, p.assign = ce, p.at = Nb, p.bind = Dc, p.bindAll = Ec, p.bindKey = Fc, p.chain = ad, p.compact = hc, p.compose = Gc, p.countBy = he, p.createCallback = Hc, p.curry = Ic, p.debounce = Jc, p.defaults = de, p.defer = Kc, p.delay = Lc, p.difference = ic, p.filter = Qb, p.flatten = mc, p.forEach = Tb, p.forEachRight = Ub, p.forIn = ee, p.forInRight = ob, p.forOwn = fe, p.forOwnRight = pb, p.functions = qb, p.groupBy = ie, p.indexBy = je, p.initial = oc, p.intersection = pc, p.invert = sb, p.invoke = Vb, p.keys = Zd, p.map = Wb, p.max = Xb, p.memoize = Mc, p.merge = Hb, p.min = Yb, p.omit = Ib, p.once = Nc, p.pairs = Jb, p.partial = Oc, p.partialRight = Pc, p.pick = Kb, p.pluck = Zb, p.pull = sc, p.range = tc, p.reject = ac, p.remove = uc, p.rest = vc, p.shuffle = cc, p.sortBy = fc, p.tap = bd, p.throttle = Qc, p.times = Zc, p.toArray = gc, p.transform = Lb, p.union = xc, p.uniq = yc, p.values = Mb, p.where = ke, p.without = zc, p.wrap = Rc, p.zip = Ac, p.zipObject = Bc, p.collect = Wb, p.drop = vc, p.each = Tb, p.eachRight = Ub, p.extend = ce, p.methods = qb, p.object = Bc, p.select = Qb, p.tail = vc, p.unique = yc, p.unzip = Ac, Uc(p), p.clone = kb, p.cloneDeep = lb, p.contains = Ob, p.escape = Sc, p.every = Pb, p.find = Rb, p.findIndex = jc, p.findKey = mb, p.findLast = Sb, p.findLastIndex = kc, p.findLastKey = nb, p.has = rb, p.identity = Tc, p.indexOf = nc, p.isArguments = jb, p.isArray = Xd, p.isBoolean = tb, p.isDate = ub, p.isElement = vb, p.isEmpty = wb, p.isEqual = xb, p.isFinite = yb, p.isFunction = zb, p.isNaN = Bb, p.isNull = Cb, p.isNumber = Db, p.isObject = Ab, p.isPlainObject = ge, p.isRegExp = Eb, p.isString = Fb, p.isUndefined = Gb, p.lastIndexOf = rc, p.mixin = Uc, p.noConflict = Vc, p.parseInt = le, p.random = Wc, p.reduce = $b, p.reduceRight = _b, p.result = Xc, p.runInContext = n, p.size = dc, p.some = ec, p.sortedIndex = wc, p.template = Yc, p.unescape = $c, p.uniqueId = _c, p.all = Pb, p.any = ec, p.detect = Rb, p.findWhere = Rb, p.foldl = $b, p.foldr = _b, p.include = Ob, p.inject = $b, fe(p, function(a, b) {
      p.prototype[b] || (p.prototype[b] = function() {
        var b = [this.__wrapped__],
          c = this.__chain__;
        Ad.apply(b, arguments);
        var d = a.apply(p, b);
        return c ? new q(d, c) : d
      })
    }), p.first = lc, p.last = qc, p.sample = bc, p.take = lc, p.head = lc, fe(p, function(a, b) {
      var c = "sample" !== b;
      p.prototype[b] || (p.prototype[b] = function(b, d) {
        var e = this.__chain__,
          f = a(this.__wrapped__, b, d);
        return e || null != b && (!d || c && "function" == typeof b) ? new q(f, e) : f
      })
    }), p.VERSION = "2.2.1", p.prototype.chain = cd, p.prototype.toString = dd, p.prototype.value = ed, p.prototype.valueOf = ed, Tb(["join", "pop", "shift"], function(a) {
      var b = pd[a];
      p.prototype[a] = function() {
        var a = this.__chain__,
          c = b.apply(this.__wrapped__, arguments);
        return a ? new q(c, a) : c
      }
    }), Tb(["push", "reverse", "sort", "unshift"], function(a) {
      var b = pd[a];
      p.prototype[a] = function() {
        return b.apply(this.__wrapped__, arguments), this
      }
    }), Tb(["concat", "slice", "splice"], function(a) {
      var b = pd[a];
      p.prototype[a] = function() {
        return new q(b.apply(this.__wrapped__, arguments), this.__chain__)
      }
    }), p
  }
  var o, p = [],
    q = [],
    r = 0,
    s = +new Date + "",
    t = 75,
    u = 40,
    v = " 	\f ﻿\n\r\u2028\u2029 ᠎             　",
    w = /\b__p \+= '';/g,
    x = /\b(__p \+=) '' \+/g,
    y = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
    z = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
    A = /\w*$/,
    B = /^function[ \n\r\t]+\w/,
    C = /<%=([\s\S]+?)%>/g,
    D = RegExp("^[" + v + "]*0+(?=.$)"),
    E = /($^)/,
    F = /\bthis\b/,
    G = /['\n\r\t\u2028\u2029\\]/g,
    H = ["Array", "Boolean", "Date", "Function", "Math", "Number", "Object", "RegExp", "String", "_", "attachEvent", "clearTimeout", "isFinite", "isNaN", "parseInt", "setImmediate", "setTimeout"],
    I = 0,
    J = "[object Arguments]",
    K = "[object Array]",
    L = "[object Boolean]",
    M = "[object Date]",
    N = "[object Function]",
    O = "[object Number]",
    P = "[object Object]",
    Q = "[object RegExp]",
    R = "[object String]",
    S = {};
  S[N] = !1, S[J] = S[K] = S[L] = S[M] = S[O] = S[P] = S[Q] = S[R] = !0;
  var T = {
      leading: !1,
      maxWait: 0,
      trailing: !1
    },
    U = {
      configurable: !1,
      enumerable: !1,
      value: null,
      writable: !1
    },
    V = {
      "boolean": !1,
      "function": !0,
      object: !0,
      number: !1,
      string: !1,
      undefined: !1
    },
    W = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "	": "t",
      "\u2028": "u2028",
      "\u2029": "u2029"
    },
    X = V[typeof window] && window || this,
    Y = V[typeof exports] && exports && !exports.nodeType && exports,
    Z = V[typeof module] && module && !module.nodeType && module,
    $ = Z && Z.exports === Y && Y,
    _ = V[typeof global] && global;
  !_ || _.global !== _ && _.window !== _ || (X = _);
  var ab = n();
  "function" == typeof define && "object" == typeof define.amd && define.amd ? (X._ = ab, define(function() {
    return ab
  })) : Y && Z ? $ ? (Z.exports = ab)._ = ab : Y._ = ab : X._ = ab
}.call(this), function(a, b) {
  if ("function" == typeof define && define.amd) define(["underscore", "jquery", "exports"], function(c, d, e) {
    a.Backbone = b(a, e, c, d)
  });
  else if ("undefined" != typeof exports) {
    var c = require("underscore");
    b(a, exports, c)
  } else a.Backbone = b(a, {}, a._, a.jQuery || a.Zepto || a.ender || a.$)
}(this, function(a, b, c, d) {
  {
    var e = a.Backbone,
      f = [],
      g = (f.push, f.slice);
    f.splice
  }
  b.VERSION = "1.1.2", b.$ = d, b.noConflict = function() {
    return a.Backbone = e, this
  }, b.emulateHTTP = !1, b.emulateJSON = !1;
  var h = b.Events = {
      on: function(a, b, c) {
        if (!j(this, "on", a, [b, c]) || !b) return this;
        this._events || (this._events = {});
        var d = this._events[a] || (this._events[a] = []);
        return d.push({
          callback: b,
          context: c,
          ctx: c || this
        }), this
      },
      once: function(a, b, d) {
        if (!j(this, "once", a, [b, d]) || !b) return this;
        var e = this,
          f = c.once(function() {
            e.off(a, f), b.apply(this, arguments)
          });
        return f._callback = b, this.on(a, f, d)
      },
      off: function(a, b, d) {
        var e, f, g, h, i, k, l, m;
        if (!this._events || !j(this, "off", a, [b, d])) return this;
        if (!a && !b && !d) return this._events = void 0, this;
        for (h = a ? [a] : c.keys(this._events), i = 0, k = h.length; k > i; i++)
          if (a = h[i], g = this._events[a]) {
            if (this._events[a] = e = [], b || d)
              for (l = 0, m = g.length; m > l; l++) f = g[l], (b && b !== f.callback && b !== f.callback._callback || d && d !== f.context) && e.push(f);
            e.length || delete this._events[a]
          }
        return this
      },
      trigger: function(a) {
        if (!this._events) return this;
        var b = g.call(arguments, 1);
        if (!j(this, "trigger", a, b)) return this;
        var c = this._events[a],
          d = this._events.all;
        return c && k(c, b), d && k(d, arguments), this
      },
      stopListening: function(a, b, d) {
        var e = this._listeningTo;
        if (!e) return this;
        var f = !b && !d;
        d || "object" != typeof b || (d = this), a && ((e = {})[a._listenId] = a);
        for (var g in e) a = e[g], a.off(b, d, this), (f || c.isEmpty(a._events)) && delete this._listeningTo[g];
        return this
      }
    },
    i = /\s+/,
    j = function(a, b, c, d) {
      if (!c) return !0;
      if ("object" == typeof c) {
        for (var e in c) a[b].apply(a, [e, c[e]].concat(d));
        return !1
      }
      if (i.test(c)) {
        for (var f = c.split(i), g = 0, h = f.length; h > g; g++) a[b].apply(a, [f[g]].concat(d));
        return !1
      }
      return !0
    },
    k = function(a, b) {
      var c, d = -1,
        e = a.length,
        f = b[0],
        g = b[1],
        h = b[2];
      switch (b.length) {
        case 0:
          for (; ++d < e;)(c = a[d]).callback.call(c.ctx);
          return;
        case 1:
          for (; ++d < e;)(c = a[d]).callback.call(c.ctx, f);
          return;
        case 2:
          for (; ++d < e;)(c = a[d]).callback.call(c.ctx, f, g);
          return;
        case 3:
          for (; ++d < e;)(c = a[d]).callback.call(c.ctx, f, g, h);
          return;
        default:
          for (; ++d < e;)(c = a[d]).callback.apply(c.ctx, b);
          return
      }
    },
    l = {
      listenTo: "on",
      listenToOnce: "once"
    };
  c.each(l, function(a, b) {
    h[b] = function(b, d, e) {
      var f = this._listeningTo || (this._listeningTo = {}),
        g = b._listenId || (b._listenId = c.uniqueId("l"));
      return f[g] = b, e || "object" != typeof d || (e = this), b[a](d, e, this), this
    }
  }), h.bind = h.on, h.unbind = h.off, c.extend(b, h);
  var m = b.Model = function(a, b) {
    var d = a || {};
    b || (b = {}), this.cid = c.uniqueId("c"), this.attributes = {}, b.collection && (this.collection = b.collection), b.parse && (d = this.parse(d, b) || {}), d = c.defaults({}, d, c.result(this, "defaults")), this.set(d, b), this.changed = {}, this.initialize.apply(this, arguments)
  };
  c.extend(m.prototype, h, {
    changed: null,
    validationError: null,
    idAttribute: "id",
    initialize: function() {},
    toJSON: function() {
      return c.clone(this.attributes)
    },
    sync: function() {
      return b.sync.apply(this, arguments)
    },
    get: function(a) {
      return this.attributes[a]
    },
    escape: function(a) {
      return c.escape(this.get(a))
    },
    has: function(a) {
      return null != this.get(a)
    },
    set: function(a, b, d) {
      var e, f, g, h, i, j, k, l;
      if (null == a) return this;
      if ("object" == typeof a ? (f = a, d = b) : (f = {})[a] = b, d || (d = {}), !this._validate(f, d)) return !1;
      g = d.unset, i = d.silent, h = [], j = this._changing, this._changing = !0, j || (this._previousAttributes = c.clone(this.attributes), this.changed = {}), l = this.attributes, k = this._previousAttributes, this.idAttribute in f && (this.id = f[this.idAttribute]);
      for (e in f) b = f[e], c.isEqual(l[e], b) || h.push(e), c.isEqual(k[e], b) ? delete this.changed[e] : this.changed[e] = b, g ? delete l[e] : l[e] = b;
      if (!i) {
        h.length && (this._pending = d);
        for (var m = 0, n = h.length; n > m; m++) this.trigger("change:" + h[m], this, l[h[m]], d)
      }
      if (j) return this;
      if (!i)
        for (; this._pending;) d = this._pending, this._pending = !1, this.trigger("change", this, d);
      return this._pending = !1, this._changing = !1, this
    },
    unset: function(a, b) {
      return this.set(a, void 0, c.extend({}, b, {
        unset: !0
      }))
    },
    clear: function(a) {
      var b = {};
      for (var d in this.attributes) b[d] = void 0;
      return this.set(b, c.extend({}, a, {
        unset: !0
      }))
    },
    hasChanged: function(a) {
      return null == a ? !c.isEmpty(this.changed) : c.has(this.changed, a)
    },
    changedAttributes: function(a) {
      if (!a) return this.hasChanged() ? c.clone(this.changed) : !1;
      var b, d = !1,
        e = this._changing ? this._previousAttributes : this.attributes;
      for (var f in a) c.isEqual(e[f], b = a[f]) || ((d || (d = {}))[f] = b);
      return d
    },
    previous: function(a) {
      return null != a && this._previousAttributes ? this._previousAttributes[a] : null
    },
    previousAttributes: function() {
      return c.clone(this._previousAttributes)
    },
    fetch: function(a) {
      a = a ? c.clone(a) : {}, void 0 === a.parse && (a.parse = !0);
      var b = this,
        d = a.success;
      return a.success = function(c) {
        return b.set(b.parse(c, a), a) ? (d && d(b, c, a), b.trigger("sync", b, c, a), void 0) : !1
      }, L(this, a), this.sync("read", this, a)
    },
    save: function(a, b, d) {
      var e, f, g, h = this.attributes;
      if (null == a || "object" == typeof a ? (e = a, d = b) : (e = {})[a] = b, d = c.extend({
        validate: !0
      }, d), e && !d.wait) {
        if (!this.set(e, d)) return !1
      } else if (!this._validate(e, d)) return !1;
      e && d.wait && (this.attributes = c.extend({}, h, e)), void 0 === d.parse && (d.parse = !0);
      var i = this,
        j = d.success;
      return d.success = function(a) {
        i.attributes = h;
        var b = i.parse(a, d);
        return d.wait && (b = c.extend(e || {}, b)), c.isObject(b) && !i.set(b, d) ? !1 : (j && j(i, a, d), i.trigger("sync", i, a, d), void 0)
      }, L(this, d), f = this.isNew() ? "create" : d.patch ? "patch" : "update", "patch" === f && (d.attrs = e), g = this.sync(f, this, d), e && d.wait && (this.attributes = h), g
    },
    destroy: function(a) {
      a = a ? c.clone(a) : {};
      var b = this,
        d = a.success,
        e = function() {
          b.trigger("destroy", b, b.collection, a)
        };
      if (a.success = function(c) {
        (a.wait || b.isNew()) && e(), d && d(b, c, a), b.isNew() || b.trigger("sync", b, c, a)
      }, this.isNew()) return a.success(), !1;
      L(this, a);
      var f = this.sync("delete", this, a);
      return a.wait || e(), f
    },
    url: function() {
      var a = c.result(this, "urlRoot") || c.result(this.collection, "url") || K();
      return this.isNew() ? a : a.replace(/([^\/])$/, "$1/") + encodeURIComponent(this.id)
    },
    parse: function(a) {
      return a
    },
    clone: function() {
      return new this.constructor(this.attributes)
    },
    isNew: function() {
      return !this.has(this.idAttribute)
    },
    isValid: function(a) {
      return this._validate({}, c.extend(a || {}, {
        validate: !0
      }))
    },
    _validate: function(a, b) {
      if (!b.validate || !this.validate) return !0;
      a = c.extend({}, this.attributes, a);
      var d = this.validationError = this.validate(a, b) || null;
      return d ? (this.trigger("invalid", this, d, c.extend(b, {
        validationError: d
      })), !1) : !0
    }
  });
  var n = ["keys", "values", "pairs", "invert", "pick", "omit"];
  c.each(n, function(a) {
    m.prototype[a] = function() {
      var b = g.call(arguments);
      return b.unshift(this.attributes), c[a].apply(c, b)
    }
  });
  var o = b.Collection = function(a, b) {
      b || (b = {}), b.model && (this.model = b.model), void 0 !== b.comparator && (this.comparator = b.comparator), this._reset(), this.initialize.apply(this, arguments), a && this.reset(a, c.extend({
        silent: !0
      }, b))
    },
    p = {
      add: !0,
      remove: !0,
      merge: !0
    },
    q = {
      add: !0,
      remove: !1
    };
  c.extend(o.prototype, h, {
    model: m,
    initialize: function() {},
    toJSON: function(a) {
      return this.map(function(b) {
        return b.toJSON(a)
      })
    },
    sync: function() {
      return b.sync.apply(this, arguments)
    },
    add: function(a, b) {
      return this.set(a, c.extend({
        merge: !1
      }, b, q))
    },
    remove: function(a, b) {
      var d = !c.isArray(a);
      a = d ? [a] : c.clone(a), b || (b = {});
      var e, f, g, h;
      for (e = 0, f = a.length; f > e; e++) h = a[e] = this.get(a[e]), h && (delete this._byId[h.id], delete this._byId[h.cid], g = this.indexOf(h), this.models.splice(g, 1), this.length--, b.silent || (b.index = g, h.trigger("remove", h, this, b)), this._removeReference(h, b));
      return d ? a[0] : a
    },
    set: function(a, b) {
      b = c.defaults({}, b, p), b.parse && (a = this.parse(a, b));
      var d = !c.isArray(a);
      a = d ? a ? [a] : [] : c.clone(a);
      var e, f, g, h, i, j, k, l = b.at,
        n = this.model,
        o = this.comparator && null == l && b.sort !== !1,
        q = c.isString(this.comparator) ? this.comparator : null,
        r = [],
        s = [],
        t = {},
        u = b.add,
        v = b.merge,
        w = b.remove,
        x = !o && u && w ? [] : !1;
      for (e = 0, f = a.length; f > e; e++) {
        if (i = a[e] || {}, g = i instanceof m ? h = i : i[n.prototype.idAttribute || "id"], j = this.get(g)) w && (t[j.cid] = !0), v && (i = i === h ? h.attributes : i, b.parse && (i = j.parse(i, b)), j.set(i, b), o && !k && j.hasChanged(q) && (k = !0)), a[e] = j;
        else if (u) {
          if (h = a[e] = this._prepareModel(i, b), !h) continue;
          r.push(h), this._addReference(h, b)
        }
        h = j || h, !x || !h.isNew() && t[h.id] || x.push(h), t[h.id] = !0
      }
      if (w) {
        for (e = 0, f = this.length; f > e; ++e) t[(h = this.models[e]).cid] || s.push(h);
        s.length && this.remove(s, b)
      }
      if (r.length || x && x.length)
        if (o && (k = !0), this.length += r.length, null != l)
          for (e = 0, f = r.length; f > e; e++) this.models.splice(l + e, 0, r[e]);
        else {
          x && (this.models.length = 0);
          var y = x || r;
          for (e = 0, f = y.length; f > e; e++) this.models.push(y[e])
        }
      if (k && this.sort({
        silent: !0
      }), !b.silent) {
        for (e = 0, f = r.length; f > e; e++)(h = r[e]).trigger("add", h, this, b);
        (k || x && x.length) && this.trigger("sort", this, b)
      }
      return d ? a[0] : a
    },
    reset: function(a, b) {
      b || (b = {});
      for (var d = 0, e = this.models.length; e > d; d++) this._removeReference(this.models[d], b);
      return b.previousModels = this.models, this._reset(), a = this.add(a, c.extend({
        silent: !0
      }, b)), b.silent || this.trigger("reset", this, b), a
    },
    push: function(a, b) {
      return this.add(a, c.extend({
        at: this.length
      }, b))
    },
    pop: function(a) {
      var b = this.at(this.length - 1);
      return this.remove(b, a), b
    },
    unshift: function(a, b) {
      return this.add(a, c.extend({
        at: 0
      }, b))
    },
    shift: function(a) {
      var b = this.at(0);
      return this.remove(b, a), b
    },
    slice: function() {
      return g.apply(this.models, arguments)
    },
    get: function(a) {
      return null == a ? void 0 : this._byId[a] || this._byId[a.id] || this._byId[a.cid]
    },
    at: function(a) {
      return this.models[a]
    },
    where: function(a, b) {
      return c.isEmpty(a) ? b ? void 0 : [] : this[b ? "find" : "filter"](function(b) {
        for (var c in a)
          if (a[c] !== b.get(c)) return !1;
        return !0
      })
    },
    findWhere: function(a) {
      return this.where(a, !0)
    },
    sort: function(a) {
      if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
      return a || (a = {}), c.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(c.bind(this.comparator, this)), a.silent || this.trigger("sort", this, a), this
    },
    pluck: function(a) {
      return c.invoke(this.models, "get", a)
    },
    fetch: function(a) {
      a = a ? c.clone(a) : {}, void 0 === a.parse && (a.parse = !0);
      var b = a.success,
        d = this;
      return a.success = function(c) {
        var e = a.reset ? "reset" : "set";
        d[e](c, a), b && b(d, c, a), d.trigger("sync", d, c, a)
      }, L(this, a), this.sync("read", this, a)
    },
    create: function(a, b) {
      if (b = b ? c.clone(b) : {}, !(a = this._prepareModel(a, b))) return !1;
      b.wait || this.add(a, b);
      var d = this,
        e = b.success;
      return b.success = function(a, c) {
        b.wait && d.add(a, b), e && e(a, c, b)
      }, a.save(null, b), a
    },
    parse: function(a) {
      return a
    },
    clone: function() {
      return new this.constructor(this.models)
    },
    _reset: function() {
      this.length = 0, this.models = [], this._byId = {}
    },
    _prepareModel: function(a, b) {
      if (a instanceof m) return a;
      b = b ? c.clone(b) : {}, b.collection = this;
      var d = new this.model(a, b);
      return d.validationError ? (this.trigger("invalid", this, d.validationError, b), !1) : d
    },
    _addReference: function(a) {
      this._byId[a.cid] = a, null != a.id && (this._byId[a.id] = a), a.collection || (a.collection = this), a.on("all", this._onModelEvent, this)
    },
    _removeReference: function(a) {
      this === a.collection && delete a.collection, a.off("all", this._onModelEvent, this)
    },
    _onModelEvent: function(a, b, c, d) {
      ("add" !== a && "remove" !== a || c === this) && ("destroy" === a && this.remove(b, d), b && a === "change:" + b.idAttribute && (delete this._byId[b.previous(b.idAttribute)], null != b.id && (this._byId[b.id] = b)), this.trigger.apply(this, arguments))
    }
  });
  var r = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain", "sample"];
  c.each(r, function(a) {
    o.prototype[a] = function() {
      var b = g.call(arguments);
      return b.unshift(this.models), c[a].apply(c, b)
    }
  });
  var s = ["groupBy", "countBy", "sortBy", "indexBy"];
  c.each(s, function(a) {
    o.prototype[a] = function(b, d) {
      var e = c.isFunction(b) ? b : function(a) {
        return a.get(b)
      };
      return c[a](this.models, e, d)
    }
  });
  var t = b.View = function(a) {
      this.cid = c.uniqueId("view"), a || (a = {}), c.extend(this, c.pick(a, v)), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
    },
    u = /^(\S+)\s*(.*)$/,
    v = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
  c.extend(t.prototype, h, {
    tagName: "div",
    $: function(a) {
      return this.$el.find(a)
    },
    initialize: function() {},
    render: function() {
      return this
    },
    remove: function() {
      return this.$el.remove(), this.stopListening(), this
    },
    setElement: function(a, c) {
      return this.$el && this.undelegateEvents(), this.$el = a instanceof b.$ ? a : b.$(a), this.el = this.$el[0], c !== !1 && this.delegateEvents(), this
    },
    delegateEvents: function(a) {
      if (!a && !(a = c.result(this, "events"))) return this;
      this.undelegateEvents();
      for (var b in a) {
        var d = a[b];
        if (c.isFunction(d) || (d = this[a[b]]), d) {
          var e = b.match(u),
            f = e[1],
            g = e[2];
          d = c.bind(d, this), f += ".delegateEvents" + this.cid, "" === g ? this.$el.on(f, d) : this.$el.on(f, g, d)
        }
      }
      return this
    },
    undelegateEvents: function() {
      return this.$el.off(".delegateEvents" + this.cid), this
    },
    _ensureElement: function() {
      if (this.el) this.setElement(c.result(this, "el"), !1);
      else {
        var a = c.extend({}, c.result(this, "attributes"));
        this.id && (a.id = c.result(this, "id")), this.className && (a["class"] = c.result(this, "className"));
        var d = b.$("<" + c.result(this, "tagName") + ">").attr(a);
        this.setElement(d, !1)
      }
    }
  }), b.sync = function(a, d, e) {
    var f = x[a];
    c.defaults(e || (e = {}), {
      emulateHTTP: b.emulateHTTP,
      emulateJSON: b.emulateJSON
    });
    var g = {
      type: f,
      dataType: "json"
    };
    if (e.url || (g.url = c.result(d, "url") || K()), null != e.data || !d || "create" !== a && "update" !== a && "patch" !== a || (g.contentType = "application/json", g.data = JSON.stringify(e.attrs || d.toJSON(e))), e.emulateJSON && (g.contentType = "application/x-www-form-urlencoded", g.data = g.data ? {
      model: g.data
    } : {}), e.emulateHTTP && ("PUT" === f || "DELETE" === f || "PATCH" === f)) {
      g.type = "POST", e.emulateJSON && (g.data._method = f);
      var h = e.beforeSend;
      e.beforeSend = function(a) {
        return a.setRequestHeader("X-HTTP-Method-Override", f), h ? h.apply(this, arguments) : void 0
      }
    }
    "GET" === g.type || e.emulateJSON || (g.processData = !1), "PATCH" === g.type && w && (g.xhr = function() {
      return new ActiveXObject("Microsoft.XMLHTTP")
    });
    var i = e.xhr = b.ajax(c.extend(g, e));
    return d.trigger("request", d, i, e), i
  };
  var w = !("undefined" == typeof window || !window.ActiveXObject || window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent),
    x = {
      create: "POST",
      update: "PUT",
      patch: "PATCH",
      "delete": "DELETE",
      read: "GET"
    };
  b.ajax = function() {
    return b.$.ajax.apply(b.$, arguments)
  };
  var y = b.Router = function(a) {
      a || (a = {}), a.routes && (this.routes = a.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
    },
    z = /\((.*?)\)/g,
    A = /(\(\?)?:\w+/g,
    B = /\*\w+/g,
    C = /[\-{}\[\]+?.,\\\^$|#\s]/g;
  c.extend(y.prototype, h, {
    initialize: function() {},
    route: function(a, d, e) {
      c.isRegExp(a) || (a = this._routeToRegExp(a)), c.isFunction(d) && (e = d, d = ""), e || (e = this[d]);
      var f = this;
      return b.history.route(a, function(c) {
        var g = f._extractParameters(a, c);
        f.execute(e, g), f.trigger.apply(f, ["route:" + d].concat(g)), f.trigger("route", d, g), b.history.trigger("route", f, d, g)
      }), this
    },
    execute: function(a, b) {
      a && a.apply(this, b)
    },
    navigate: function(a, c) {
      return b.history.navigate(a, c), this
    },
    _bindRoutes: function() {
      if (this.routes) {
        this.routes = c.result(this, "routes");
        for (var a, b = c.keys(this.routes); null != (a = b.pop());) this.route(a, this.routes[a])
      }
    },
    _routeToRegExp: function(a) {
      return a = a.replace(C, "\\$&").replace(z, "(?:$1)?").replace(A, function(a, b) {
        return b ? a : "([^/?]+)"
      }).replace(B, "([^?]*?)"), new RegExp("^" + a + "(?:\\?([\\s\\S]*))?$")
    },
    _extractParameters: function(a, b) {
      var d = a.exec(b).slice(1);
      return c.map(d, function(a, b) {
        return b === d.length - 1 ? a || null : a ? decodeURIComponent(a) : null
      })
    }
  });
  var D = b.History = function() {
      this.handlers = [], c.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
    },
    E = /^[#\/]|\s+$/g,
    F = /^\/+|\/+$/g,
    G = /msie [\w.]+/,
    H = /\/$/,
    I = /#.*$/;
  D.started = !1, c.extend(D.prototype, h, {
    interval: 50,
    atRoot: function() {
      return this.location.pathname.replace(/[^\/]$/, "$&/") === this.root
    },
    getHash: function(a) {
      var b = (a || this).location.href.match(/#(.*)$/);
      return b ? b[1] : ""
    },
    getFragment: function(a, b) {
      if (null == a)
        if (this._hasPushState || !this._wantsHashChange || b) {
          a = decodeURI(this.location.pathname + this.location.search);
          var c = this.root.replace(H, "");
          a.indexOf(c) || (a = a.slice(c.length))
        } else a = this.getHash();
      return a.replace(E, "")
    },
    start: function(a) {
      if (D.started) throw new Error("Backbone.history has already been started");
      D.started = !0, this.options = c.extend({
        root: "/"
      }, this.options, a), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
      var d = this.getFragment(),
        e = document.documentMode,
        f = G.exec(navigator.userAgent.toLowerCase()) && (!e || 7 >= e);
      if (this.root = ("/" + this.root + "/").replace(F, "/"), f && this._wantsHashChange) {
        var g = b.$('<iframe src="javascript:0" tabindex="-1">');
        this.iframe = g.hide().appendTo("body")[0].contentWindow, this.navigate(d)
      }
      this._hasPushState ? b.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !f ? b.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = d;
      var h = this.location;
      if (this._wantsHashChange && this._wantsPushState) {
        if (!this._hasPushState && !this.atRoot()) return this.fragment = this.getFragment(null, !0), this.location.replace(this.root + "#" + this.fragment), !0;
        this._hasPushState && this.atRoot() && h.hash && (this.fragment = this.getHash().replace(E, ""), this.history.replaceState({}, document.title, this.root + this.fragment))
      }
      return this.options.silent ? void 0 : this.loadUrl()
    },
    stop: function() {
      b.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), this._checkUrlInterval && clearInterval(this._checkUrlInterval), D.started = !1
    },
    route: function(a, b) {
      this.handlers.unshift({
        route: a,
        callback: b
      })
    },
    checkUrl: function() {
      var a = this.getFragment();
      return a === this.fragment && this.iframe && (a = this.getFragment(this.getHash(this.iframe))), a === this.fragment ? !1 : (this.iframe && this.navigate(a), this.loadUrl(), void 0)
    },
    loadUrl: function(a) {
      return a = this.fragment = this.getFragment(a), c.any(this.handlers, function(b) {
        return b.route.test(a) ? (b.callback(a), !0) : void 0
      })
    },
    navigate: function(a, b) {
      if (!D.started) return !1;
      b && b !== !0 || (b = {
        trigger: !!b
      });
      var c = this.root + (a = this.getFragment(a || ""));
      if (a = a.replace(I, ""), this.fragment !== a) {
        if (this.fragment = a, "" === a && "/" !== c && (c = c.slice(0, -1)), this._hasPushState) this.history[b.replace ? "replaceState" : "pushState"]({}, document.title, c);
        else {
          if (!this._wantsHashChange) return this.location.assign(c);
          this._updateHash(this.location, a, b.replace), this.iframe && a !== this.getFragment(this.getHash(this.iframe)) && (b.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, a, b.replace))
        }
        return b.trigger ? this.loadUrl(a) : void 0
      }
    },
    _updateHash: function(a, b, c) {
      if (c) {
        var d = a.href.replace(/(javascript:|#).*$/, "");
        a.replace(d + "#" + b)
      } else a.hash = "#" + b
    }
  }), b.history = new D;
  var J = function(a, b) {
    var d, e = this;
    d = a && c.has(a, "constructor") ? a.constructor : function() {
      return e.apply(this, arguments)
    }, c.extend(d, e, b);
    var f = function() {
      this.constructor = d
    };
    return f.prototype = e.prototype, d.prototype = new f, a && c.extend(d.prototype, a), d.__super__ = e.prototype, d
  };
  m.extend = o.extend = y.extend = t.extend = D.extend = J;
  var K = function() {
      throw new Error('A "url" property or function must be specified')
    },
    L = function(a, b) {
      var c = b.error;
      b.error = function(d) {
        c && c(a, d, b), a.trigger("error", a, d, b)
      }
    };
  return b
}), function(a, b) {
  "function" == typeof define && define.amd ? define([], b) : a.Vectorizer = a.V = b()
}(this, function() {
  function a() {
    var a = ++m + "";
    return "v-" + a
  }

  function b(a) {
    var b = '<svg xmlns="' + k.xmlns + '" xmlns:xlink="' + k.xlink + '" version="' + l + '">' + (a || "") + "</svg>",
      c = new DOMParser;
    return c.async = !1, c.parseFromString(b, "text/xml").documentElement
  }

  function c(a, c, e) {
    if (!a) return void 0;
    if ("object" == typeof a) return new i(a);
    if (c = c || {}, "svg" === a.toLowerCase()) return new i(b());
    if ("<" === a[0]) {
      var f = b(a);
      if (f.childNodes.length > 1) {
        for (var g = [], h = 0, j = f.childNodes.length; j > h; h++) {
          var l = f.childNodes[h];
          g.push(new i(document.importNode(l, !0)))
        }
        return g
      }
      return new i(document.importNode(f.firstChild, !0))
    }
    a = document.createElementNS(k.xmlns, a);
    for (var m in c) d(a, m, c[m]);
    "[object Array]" != Object.prototype.toString.call(e) && (e = [e]);
    for (var n, h = 0, j = e[0] && e.length || 0; j > h; h++) n = e[h], a.appendChild(n instanceof i ? n.node : n);
    return new i(a)
  }

  function d(a, b, c) {
    if (b.indexOf(":") > -1) {
      var d = b.split(":");
      a.setAttributeNS(k[d[0]], d[1], c)
    } else "id" === b ? a.id = c : a.setAttribute(b, c)
  }

  function e(a) {
    var b, c, d;
    if (a) {
      var e = /[ ,]+/,
        f = a.match(/translate\((.*)\)/);
      f && (b = f[1].split(e));
      var g = a.match(/rotate\((.*)\)/);
      g && (c = g[1].split(e));
      var h = a.match(/scale\((.*)\)/);
      h && (d = h[1].split(e))
    }
    var i = d && d[0] ? parseFloat(d[0]) : 1;
    return {
      translate: {
        tx: b && b[0] ? parseInt(b[0], 10) : 0,
        ty: b && b[1] ? parseInt(b[1], 10) : 0
      },
      rotate: {
        angle: c && c[0] ? parseInt(c[0], 10) : 0,
        cx: c && c[1] ? parseInt(c[1], 10) : void 0,
        cy: c && c[2] ? parseInt(c[2], 10) : void 0
      },
      scale: {
        sx: i,
        sy: d && d[1] ? parseFloat(d[1]) : i
      }
    }
  }

  function f(a, b) {
    var c = b.x * a.a + b.y * a.c + 0,
      d = b.x * a.b + b.y * a.d + 0;
    return {
      x: c,
      y: d
    }
  }

  function h(a) {
    var b = f(a, {
        x: 0,
        y: 1
      }),
      c = f(a, {
        x: 1,
        y: 0
      }),
      d = 180 / Math.PI * Math.atan2(b.y, b.x) - 90,
      e = 180 / Math.PI * Math.atan2(c.y, c.x);
    return {
      translateX: a.e,
      translateY: a.f,
      scaleX: Math.sqrt(a.a * a.a + a.b * a.b),
      scaleY: Math.sqrt(a.c * a.c + a.d * a.d),
      skewX: d,
      skewY: e,
      rotation: d
    }
  }

  function i(b) {
    this.node = b, this.node.id || (this.node.id = a())
  }

  function j(a) {
    var b = a.rx || a["top-rx"] || 0,
      c = a.rx || a["bottom-rx"] || 0,
      d = a.ry || a["top-ry"] || 0,
      e = a.ry || a["bottom-ry"] || 0;
    return ["M", a.x, a.y + d, "v", a.height - d - e, "a", c, e, 0, 0, 0, c, e, "h", a.width - 2 * c, "a", c, e, 0, 0, 0, c, -e, "v", -(a.height - e - d), "a", b, d, 0, 0, 0, -b, -d, "h", -(a.width - 2 * b), "a", b, d, 0, 0, 0, -b, d].join(" ")
  }
  var k = (!(!window.SVGAngle && !document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")), {
      xmlns: "http://www.w3.org/2000/svg",
      xlink: "http://www.w3.org/1999/xlink"
    }),
    l = "1.1",
    m = 0;
  i.prototype = {
    translate: function(a, b, c) {
      c = c || {}, b = b || 0;
      var d = this.attr("transform") || "",
        f = e(d);
      if ("undefined" == typeof a) return f.translate;
      d = d.replace(/translate\([^\)]*\)/g, "").trim();
      var g = c.absolute ? a : f.translate.tx + a,
        h = c.absolute ? b : f.translate.ty + b,
        i = "translate(" + g + "," + h + ")";
      return this.attr("transform", (i + " " + d).trim()), this
    },
    rotate: function(a, b, c, d) {
      d = d || {};
      var f = this.attr("transform") || "",
        g = e(f);
      if ("undefined" == typeof a) return g.rotate;
      f = f.replace(/rotate\([^\)]*\)/g, "").trim(), a %= 360;
      var h = d.absolute ? a : g.rotate.angle + a,
        i = void 0 !== b && void 0 !== c ? "," + b + "," + c : "",
        j = "rotate(" + h + i + ")";
      return this.attr("transform", (f + " " + j).trim()), this
    },
    scale: function(a, b) {
      b = "undefined" == typeof b ? a : b;
      var c = this.attr("transform") || "",
        d = e(c);
      if ("undefined" == typeof a) return d.scale;
      c = c.replace(/scale\([^\)]*\)/g, "").trim();
      var f = "scale(" + a + "," + b + ")";
      return this.attr("transform", (c + " " + f).trim()), this
    },
    bbox: function(a, b) {
      if (!this.node.ownerSVGElement) return {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
      var c;
      try {
        c = this.node.getBBox(), c = {
          x: 0 | c.x,
          y: 0 | c.y,
          width: 0 | c.width,
          height: 0 | c.height
        }
      } catch (d) {
        c = {
          x: this.node.clientLeft,
          y: this.node.clientTop,
          width: this.node.clientWidth,
          height: this.node.clientHeight
        }
      }
      if (a) return c;
      var e = this.node.getTransformToElement(b || this.node.ownerSVGElement),
        f = [],
        g = this.node.ownerSVGElement.createSVGPoint();
      g.x = c.x, g.y = c.y, f.push(g.matrixTransform(e)), g.x = c.x + c.width, g.y = c.y, f.push(g.matrixTransform(e)), g.x = c.x + c.width, g.y = c.y + c.height, f.push(g.matrixTransform(e)), g.x = c.x, g.y = c.y + c.height, f.push(g.matrixTransform(e));
      for (var h = f[0].x, i = h, j = f[0].y, k = j, l = 1, m = f.length; m > l; l++) {
        var n = f[l].x,
          o = f[l].y;
        h > n ? h = n : n > i && (i = n), j > o ? j = o : o > k && (k = o)
      }
      return {
        x: h,
        y: j,
        width: i - h,
        height: k - j
      }
    },
    text: function(a, b) {
      b = b || {};
      var c, d = a.split("\n"),
        e = 0;
      if (this.attr("y", "0.8em"), this.attr("display", a ? null : "none"), this.node.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), 1 === d.length) return this.node.textContent = a, this;
      for (this.node.textContent = ""; e < d.length; e++) c = n("tspan", {
        dy: 0 == e ? "0em" : b.lineHeight || "1em",
        x: this.attr("x") || 0
      }), c.node.textContent = d[e] || " ", this.append(c);
      return this
    },
    attr: function(a, b) {
      if ("string" == typeof a && "undefined" == typeof b) return this.node.getAttribute(a);
      if ("object" == typeof a)
        for (var c in a) a.hasOwnProperty(c) && d(this.node, c, a[c]);
      else d(this.node, a, b);
      return this
    },
    remove: function() {
      this.node.parentNode && this.node.parentNode.removeChild(this.node)
    },
    append: function(a) {
      var b = a;
      "[object Array]" !== Object.prototype.toString.call(a) && (b = [a]);
      for (var c = 0, d = b.length; d > c; c++) a = b[c], this.node.appendChild(a instanceof i ? a.node : a);
      return this
    },
    prepend: function(a) {
      this.node.insertBefore(a instanceof i ? a.node : a, this.node.firstChild)
    },
    svg: function() {
      return this.node instanceof window.SVGSVGElement ? this : n(this.node.ownerSVGElement)
    },
    defs: function() {
      var a = this.svg().node.getElementsByTagName("defs");
      return a && a.length ? n(a[0]) : void 0
    },
    clone: function() {
      var b = n(this.node.cloneNode(!0));
      return b.node.id = a(), b
    },
    findOne: function(a) {
      var b = this.node.querySelector(a);
      return b ? n(b) : void 0
    },
    find: function(a) {
      for (var b = this.node.querySelectorAll(a), c = 0, d = b.length; d > c; c++) b[c] = n(b[c]);
      return b
    },
    toLocalPoint: function(a, b) {
      var c = this.svg().node,
        d = c.createSVGPoint();
      d.x = a, d.y = b;
      try {
        var e = d.matrixTransform(c.getScreenCTM().inverse()),
          f = this.node.getTransformToElement(c).inverse()
      } catch (g) {
        return d
      }
      return e.matrixTransform(f)
    },
    translateCenterToPoint: function(a) {
      var b = this.bbox(),
        c = g.rect(b).center();
      this.translate(a.x - c.x, a.y - c.y)
    },
    translateAndAutoOrient: function(a, b, c) {
      var d = this.scale();
      this.attr("transform", ""), this.scale(d.sx, d.sy);
      var e = this.svg().node,
        f = this.bbox(!1, c),
        i = e.createSVGTransform();
      i.setTranslate(-f.x - f.width / 2, -f.y - f.height / 2);
      var j = e.createSVGTransform(),
        k = g.point(a).changeInAngle(a.x - b.x, a.y - b.y, b);
      j.setRotate(k, 0, 0);
      var l = e.createSVGTransform(),
        m = g.point(a).move(b, f.width / 2);
      l.setTranslate(a.x + (a.x - m.x), a.y + (a.y - m.y));
      var n = this.node.getTransformToElement(c),
        o = e.createSVGTransform();
      o.setMatrix(l.matrix.multiply(j.matrix.multiply(i.matrix.multiply(n))));
      var p = h(o.matrix);
      return this.translate(p.translateX, p.translateY), this.rotate(p.rotation), this
    },
    animateAlongPath: function(a, b) {
      var c = n("animateMotion", a),
        d = n("mpath", {
          "xlink:href": "#" + n(b).node.id
        });
      c.append(d), this.append(c);
      try {
        c.node.beginElement()
      } catch (e) {
        if ("fake" === document.documentElement.getAttribute("smiling")) {
          var f = c.node;
          f.animators = [];
          var g = f.getAttribute("id");
          g && (id2anim[g] = f);
          for (var h = getTargets(f), i = 0, j = h.length; j > i; i++) {
            var k = h[i],
              l = new Animator(f, k, i);
            animators.push(l), f.animators[i] = l, l.register()
          }
        }
      }
    },
    hasClass: function(a) {
      return new RegExp("(\\s|^)" + a + "(\\s|$)").test(this.node.getAttribute("class"))
    },
    addClass: function(a) {
      if (!this.hasClass(a)) {
        var b = this.node.getAttribute("class") || "";
        this.node.setAttribute("class", (b + " " + a).trim())
      }
      return this
    },
    removeClass: function(a) {
      if (this.hasClass(a)) {
        var b = this.node.getAttribute("class").replace(new RegExp("(\\s|^)" + a + "(\\s|$)", "g"), "$2");
        this.node.setAttribute("class", b)
      }
      return this
    },
    toggleClass: function(a, b) {
      var c = "undefined" == typeof b ? this.hasClass(a) : !b;
      return c ? this.removeClass(a) : this.addClass(a), this
    }
  };
  var n = c;
  n.decomposeMatrix = h, n.rectToPath = j;
  var o = n("svg").node;
  return n.createSVGMatrix = function(a) {
    var b = o.createSVGMatrix();
    for (var c in a) b[c] = a[c];
    return b
  }, n.createSVGTransform = function() {
    return o.createSVGTransform()
  }, n.createSVGPoint = function(a, b) {
    var c = o.createSVGPoint();
    return c.x = a, c.y = b, c
  }, n
}), function(a, b) {
  "function" == typeof define && define.amd ? define([], b) : "object" == typeof exports ? module.exports = b() : a.g = b()
}(this, function() {
  function a(b, c) {
    if (!(this instanceof a)) return new a(b, c);
    var d;
    void 0 === c && Object(b) !== b ? (d = b.split(-1 === b.indexOf("@") ? " " : "@"), this.x = parseInt(d[0], 10), this.y = parseInt(d[1], 10)) : Object(b) === b ? (this.x = b.x, this.y = b.y) : (this.x = b, this.y = c)
  }

  function b(c, d) {
    return this instanceof b ? (this.start = a(c), this.end = a(d), void 0) : new b(c, d)
  }

  function c(a, b, d, e) {
    return this instanceof c ? (void 0 === b && (b = a.y, d = a.width, e = a.height, a = a.x), this.x = a, this.y = b, this.width = d, this.height = e, void 0) : new c(a, b, d, e)
  }

  function d(b, c, e) {
    return this instanceof d ? (b = a(b), this.x = b.x, this.y = b.y, this.a = c, this.b = e, void 0) : new d(b, c, e)
  }
  var e = Math,
    f = e.abs,
    g = e.cos,
    h = e.sin,
    i = e.sqrt,
    j = e.min,
    k = e.max,
    l = (e.atan, e.atan2),
    m = (e.acos, e.round),
    n = e.floor,
    o = e.PI,
    p = e.random,
    q = function(a) {
      return 180 * a / o % 360
    },
    r = function(a, b) {
      return b = b || !1, a = b ? a : a % 360, a * o / 180
    },
    s = function(a, b) {
      return b * Math.round(a / b)
    },
    t = function(a) {
      return a % 360 + (0 > a ? 360 : 0)
    };
  a.prototype = {
    toString: function() {
      return this.x + "@" + this.y
    },
    adhereToRect: function(a) {
      return a.containsPoint(this) ? this : (this.x = j(k(this.x, a.x), a.x + a.width), this.y = j(k(this.y, a.y), a.y + a.height), this)
    },
    theta: function(b) {
      b = a(b);
      var c = -(b.y - this.y),
        d = b.x - this.x,
        e = 10,
        f = 0 == c.toFixed(e) && 0 == d.toFixed(e) ? 0 : l(c, d);
      return 0 > f && (f = 2 * o + f), 180 * f / o
    },
    distance: function(a) {
      return b(this, a).length()
    },
    manhattanDistance: function(a) {
      return f(a.x - this.x) + f(a.y - this.y)
    },
    offset: function(a, b) {
      return this.x += a || 0, this.y += b || 0, this
    },
    magnitude: function() {
      return i(this.x * this.x + this.y * this.y) || .01
    },
    update: function(a, b) {
      return this.x = a || 0, this.y = b || 0, this
    },
    round: function(a) {
      return this.x = a ? this.x.toFixed(a) : m(this.x), this.y = a ? this.y.toFixed(a) : m(this.y), this
    },
    normalize: function(a) {
      var b = (a || 1) / this.magnitude();
      return this.x = b * this.x, this.y = b * this.y, this
    },
    difference: function(b) {
      return a(this.x - b.x, this.y - b.y)
    },
    bearing: function(a) {
      return b(this, a).bearing()
    },
    toPolar: function(b) {
      b = b && a(b) || a(0, 0);
      var c = this.x,
        d = this.y;
      return this.x = i((c - b.x) * (c - b.x) + (d - b.y) * (d - b.y)), this.y = r(b.theta(a(c, d))), this
    },
    rotate: function(b, c) {
      c = (c + 360) % 360, this.toPolar(b), this.y += r(c);
      var d = a.fromPolar(this.x, this.y, b);
      return this.x = d.x, this.y = d.y, this
    },
    move: function(b, c) {
      var d = r(a(b).theta(this));
      return this.offset(g(d) * c, -h(d) * c)
    },
    changeInAngle: function(b, c, d) {
      return a(this).offset(-b, -c).theta(d) - this.theta(d)
    },
    equals: function(a) {
      return this.x === a.x && this.y === a.y
    },
    snapToGrid: function(a, b) {
      return this.x = s(this.x, a), this.y = s(this.y, b || a), this
    },
    reflection: function(b) {
      return a(b).move(this, this.distance(b))
    }
  }, a.fromPolar = function(b, c, d) {
    d = d && a(d) || a(0, 0);
    var e = f(b * g(c)),
      i = f(b * h(c)),
      j = t(q(c));
    return 90 > j ? i = -i : 180 > j ? (e = -e, i = -i) : 270 > j && (e = -e), a(d.x + e, d.y + i)
  }, a.random = function(b, c, d, e) {
    return a(n(p() * (c - b + 1) + b), n(p() * (e - d + 1) + d))
  }, b.prototype = {
    toString: function() {
      return this.start.toString() + " " + this.end.toString()
    },
    length: function() {
      return i(this.squaredLength())
    },
    squaredLength: function() {
      var a = this.start.x,
        b = this.start.y,
        c = this.end.x,
        d = this.end.y;
      return (a -= c) * a + (b -= d) * b
    },
    midpoint: function() {
      return a((this.start.x + this.end.x) / 2, (this.start.y + this.end.y) / 2)
    },
    intersection: function(b) {
      var c = a(this.end.x - this.start.x, this.end.y - this.start.y),
        d = a(b.end.x - b.start.x, b.end.y - b.start.y),
        e = c.x * d.y - c.y * d.x,
        f = a(b.start.x - this.start.x, b.start.y - this.start.y),
        g = f.x * d.y - f.y * d.x,
        h = f.x * c.y - f.y * c.x;
      if (0 === e || 0 > g * e || 0 > h * e) return null;
      if (e > 0) {
        if (g > e || h > e) return null
      } else if (e > g || e > h) return null;
      return a(this.start.x + g * c.x / e, this.start.y + g * c.y / e)
    },
    bearing: function() {
      var a = r(this.start.y),
        b = r(this.end.y),
        c = this.start.x,
        d = this.end.x,
        e = r(d - c),
        f = h(e) * g(b),
        i = g(a) * h(b) - h(a) * g(b) * g(e),
        j = q(l(f, i)),
        k = ["NE", "E", "SE", "S", "SW", "W", "NW", "N"],
        m = j - 22.5;
      return 0 > m && (m += 360), m = parseInt(m / 45), k[m]
    },
    pointAt: function(b) {
      var c = (1 - b) * this.start.x + b * this.end.x,
        d = (1 - b) * this.start.y + b * this.end.y;
      return a(c, d)
    }
  }, c.prototype = {
    toString: function() {
      return this.origin().toString() + " " + this.corner().toString()
    },
    origin: function() {
      return a(this.x, this.y)
    },
    corner: function() {
      return a(this.x + this.width, this.y + this.height)
    },
    topRight: function() {
      return a(this.x + this.width, this.y)
    },
    bottomLeft: function() {
      return a(this.x, this.y + this.height)
    },
    center: function() {
      return a(this.x + this.width / 2, this.y + this.height / 2)
    },
    intersect: function(a) {
      var b = this.origin(),
        c = this.corner(),
        d = a.origin(),
        e = a.corner();
      return e.x <= b.x || e.y <= b.y || d.x >= c.x || d.y >= c.y ? !1 : !0
    },
    sideNearestToPoint: function(b) {
      b = a(b);
      var c = b.x - this.x,
        d = this.x + this.width - b.x,
        e = b.y - this.y,
        f = this.y + this.height - b.y,
        g = c,
        h = "left";
      return g > d && (g = d, h = "right"), g > e && (g = e, h = "top"), g > f && (g = f, h = "bottom"), h
    },
    containsPoint: function(b) {
      return b = a(b), b.x >= this.x && b.x <= this.x + this.width && b.y >= this.y && b.y <= this.y + this.height ? !0 : !1
    },
    containsRect: function(a) {
      var b = c(a).normalize(),
        d = b.width,
        e = b.height,
        f = b.x,
        g = b.y,
        h = this.width,
        i = this.height;
      if (0 > (h | i | d | e)) return !1;
      var j = this.x,
        k = this.y;
      if (j > f || k > g) return !1;
      if (h += j, d += f, f >= d) {
        if (h >= j || d > h) return !1
      } else if (h >= j && d > h) return !1;
      if (i += k, e += g, g >= e) {
        if (i >= k || e > i) return !1
      } else if (i >= k && e > i) return !1;
      return !0
    },
    pointNearestToPoint: function(b) {
      if (b = a(b), this.containsPoint(b)) {
        var c = this.sideNearestToPoint(b);
        switch (c) {
          case "right":
            return a(this.x + this.width, b.y);
          case "left":
            return a(this.x, b.y);
          case "bottom":
            return a(b.x, this.y + this.height);
          case "top":
            return a(b.x, this.y)
        }
      }
      return b.adhereToRect(this)
    },
    intersectionWithLineFromCenterToPoint: function(c, d) {
      c = a(c);
      var e, f = a(this.x + this.width / 2, this.y + this.height / 2);
      d && c.rotate(f, d);
      for (var g = [b(this.origin(), this.topRight()), b(this.topRight(), this.corner()), b(this.corner(), this.bottomLeft()), b(this.bottomLeft(), this.origin())], h = b(f, c), i = g.length - 1; i >= 0; --i) {
        var j = g[i].intersection(h);
        if (null !== j) {
          e = j;
          break
        }
      }
      return e && d && e.rotate(f, -d), e
    },
    moveAndExpand: function(a) {
      return this.x += a.x, this.y += a.y, this.width += a.width, this.height += a.height, this
    },
    round: function(a) {
      return this.x = a ? this.x.toFixed(a) : m(this.x), this.y = a ? this.y.toFixed(a) : m(this.y), this.width = a ? this.width.toFixed(a) : m(this.width), this.height = a ? this.height.toFixed(a) : m(this.height), this
    },
    normalize: function() {
      var a = this.x,
        b = this.y,
        c = this.width,
        d = this.height;
      return this.width < 0 && (a = this.x + this.width, c = -this.width), this.height < 0 && (b = this.y + this.height, d = -this.height), this.x = a, this.y = b, this.width = c, this.height = d, this
    },
    bbox: function(a) {
      var b = r(a || 0),
        d = f(h(b)),
        e = f(g(b)),
        i = this.width * e + this.height * d,
        j = this.width * d + this.height * e;
      return c(this.x + (this.width - i) / 2, this.y + (this.height - j) / 2, i, j)
    }
  }, d.prototype = {
    toString: function() {
      return a(this.x, this.y).toString() + " " + this.a + " " + this.b
    },
    bbox: function() {
      return c(this.x - this.a, this.y - this.b, 2 * this.a, 2 * this.b)
    },
    intersectionWithLineFromCenterToPoint: function(b, c) {
      b = a(b), c && b.rotate(a(this.x, this.y), c);
      var d, e = b.x - this.x,
        f = b.y - this.y;
      if (0 === e) return d = this.bbox().pointNearestToPoint(b), c ? d.rotate(a(this.x, this.y), -c) : d;
      var g = f / e,
        h = g * g,
        j = this.a * this.a,
        k = this.b * this.b,
        l = i(1 / (1 / j + h / k));
      l = 0 > e ? -l : l;
      var m = g * l;
      return d = a(this.x + l, this.y + m), c ? d.rotate(a(this.x, this.y), -c) : d
    }
  };
  var u = {
      curveThroughPoints: function(a) {
        for (var b = this.getCurveControlPoints(a), c = ["M", a[0].x, a[0].y], d = 0; d < b[0].length; d++) c.push("C", b[0][d].x, b[0][d].y, b[1][d].x, b[1][d].y, a[d + 1].x, a[d + 1].y);
        return c
      },
      getCurveControlPoints: function(b) {
        var c, d = [],
          e = [],
          f = b.length - 1;
        if (1 == f) return d[0] = a((2 * b[0].x + b[1].x) / 3, (2 * b[0].y + b[1].y) / 3), e[0] = a(2 * d[0].x - b[0].x, 2 * d[0].y - b[0].y), [d, e];
        var g = [];
        for (c = 1; f - 1 > c; c++) g[c] = 4 * b[c].x + 2 * b[c + 1].x;
        g[0] = b[0].x + 2 * b[1].x, g[f - 1] = (8 * b[f - 1].x + b[f].x) / 2;
        var h = this.getFirstControlPoints(g);
        for (c = 1; f - 1 > c; ++c) g[c] = 4 * b[c].y + 2 * b[c + 1].y;
        g[0] = b[0].y + 2 * b[1].y, g[f - 1] = (8 * b[f - 1].y + b[f].y) / 2;
        var i = this.getFirstControlPoints(g);
        for (c = 0; f > c; c++) d.push(a(h[c], i[c])), f - 1 > c ? e.push(a(2 * b[c + 1].x - h[c + 1], 2 * b[c + 1].y - i[c + 1])) : e.push(a((b[f].x + h[f - 1]) / 2, (b[f].y + i[f - 1]) / 2));
        return [d, e]
      },
      getFirstControlPoints: function(a) {
        var b = a.length,
          c = [],
          d = [],
          e = 2;
        c[0] = a[0] / e;
        for (var f = 1; b > f; f++) d[f] = 1 / e, e = (b - 1 > f ? 4 : 3.5) - d[f], c[f] = (a[f] - c[f - 1]) / e;
        for (f = 1; b > f; f++) c[b - f - 1] -= d[b - f] * c[b - f];
        return c
      },
      getInversionSolver: function(a, b) {
        function c(a, b) {
          var c = d[a],
            e = d[b];
          return function(d) {
            var f = (a % 3 ? 3 : 1) * (b % 3 ? 3 : 1),
              g = d.x * (c.y - e.y) + d.y * (e.x - c.x) + c.x * e.y - c.y * e.x;
            return f * g
          }
        }
        var d = arguments;
        return function(d) {
          var e = 3 * c(2, 3)(b),
            f = c(1, 3)(a) / e,
            g = -c(2, 3)(a) / e,
            h = f * c(3, 1)(d) + g * (c(3, 0)(d) + c(2, 1)(d)) + c(2, 0)(d),
            i = f * c(3, 0)(d) + g * c(2, 0)(d) + c(1, 0)(d);
          return i / (i - h)
        }
      },
      getCurveDivider: function(a, c, d, e) {
        return function(f) {
          var g = b(a, c).pointAt(f),
            h = b(c, d).pointAt(f),
            i = b(d, e).pointAt(f),
            j = b(g, h).pointAt(f),
            k = b(h, i).pointAt(f),
            l = b(j, k).pointAt(f);
          return [{
            p0: a,
            p1: g,
            p2: j,
            p3: l
          }, {
            p0: l,
            p1: k,
            p2: i,
            p3: e
          }]
        }
      }
    },
    v = {
      linear: function(a, b, c) {
        var d = a[1] - a[0],
          e = b[1] - b[0];
        return (c - a[0]) / d * e + b[0] || 0
      }
    };
  return {
    toDeg: q,
    toRad: r,
    snapToGrid: s,
    normalizeAngle: t,
    point: a,
    line: b,
    rect: c,
    ellipse: d,
    bezier: u,
    scale: v
  }
}), "object" == typeof exports) var _ = require("lodash");
var joint = {
  version: "0.9.2",
  dia: {},
  ui: {},
  layout: {},
  shapes: {},
  format: {},
  connectors: {},
  routers: {},
  util: {
    hashCode: function(a) {
      var b = 0;
      if (0 == a.length) return b;
      for (var c = 0; c < a.length; c++) {
        var d = a.charCodeAt(c);
        b = (b << 5) - b + d, b &= b
      }
      return b
    },
    getByPath: function(a, b, c) {
      c = c || ".";
      for (var d, e = b.split(c); e.length;) {
        if (d = e.shift(), !(d in a)) return void 0;
        a = a[d]
      }
      return a
    },
    setByPath: function(a, b, c, d) {
      d = d || ".";
      var e = b.split(d),
        f = a,
        g = 0;
      if (b.indexOf(d) > -1) {
        for (var h = e.length; h - 1 > g; g++) f = f[e[g]] || (f[e[g]] = {});
        f[e[h - 1]] = c
      } else a[b] = c;
      return a
    },
    unsetByPath: function(a, b, c) {
      c = c || ".";
      var d = b.lastIndexOf(c);
      if (d > -1) {
        var e = joint.util.getByPath(a, b.substr(0, d), c);
        e && delete e[b.slice(d + 1)]
      } else delete a[b];
      return a
    },
    flattenObject: function(a, b, c) {
      b = b || ".";
      var d = {};
      for (var e in a)
        if (a.hasOwnProperty(e)) {
          var f = "object" == typeof a[e];
          if (f && c && c(a[e]) && (f = !1), f) {
            var g = this.flattenObject(a[e], b, c);
            for (var h in g) g.hasOwnProperty(h) && (d[e + b + h] = g[h])
          } else d[e] = a[e]
        }
      return d
    },
    uuid: function() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
        var b = 16 * Math.random() | 0,
          c = "x" == a ? b : 3 & b | 8;
        return c.toString(16)
      })
    },
    guid: function(a) {
      return this.guid.id = this.guid.id || 1, a.id = void 0 === a.id ? "j_" + this.guid.id++ : a.id, a.id
    },
    mixin: function() {
      for (var a = arguments[0], b = 1, c = arguments.length; c > b; b++) {
        var d = arguments[b];
        (Object(d) === d || _.isFunction(d) || null !== d && void 0 !== d) && _.each(d, function(b, c) {
          return this.mixin.deep && Object(b) === b ? (a[c] || (a[c] = _.isArray(b) ? [] : {}), this.mixin(a[c], b), void 0) : (a[c] !== b && (this.mixin.supplement && a.hasOwnProperty(c) || (a[c] = b)), void 0)
        }, this)
      }
      return a
    },
    supplement: function() {
      this.mixin.supplement = !0;
      var a = this.mixin.apply(this, arguments);
      return this.mixin.supplement = !1, a
    },
    deepMixin: function() {
      this.mixin.deep = !0;
      var a = this.mixin.apply(this, arguments);
      return this.mixin.deep = !1, a
    },
    deepSupplement: function() {
      this.mixin.deep = this.mixin.supplement = !0;
      var a = this.mixin.apply(this, arguments);
      return this.mixin.deep = this.mixin.supplement = !1, a
    },
    normalizeEvent: function(a) {
      return a.originalEvent && a.originalEvent.changedTouches && a.originalEvent.changedTouches.length ? a.originalEvent.changedTouches[0] : a
    },
    nextFrame: function() {
      var a, b = "undefined" != typeof window;
      if (b && (a = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame), !a) {
        var c = 0;
        a = function(a) {
          var b = (new Date).getTime(),
            d = Math.max(0, 16 - (b - c)),
            e = setTimeout(function() {
              a(b + d)
            }, d);
          return c = b + d, e
        }
      }
      return b ? _.bind(a, window) : a
    }(),
    cancelFrame: function() {
      var a, b = "undefined" != typeof window;
      return b && (a = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame || window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame), a = a || clearTimeout, b ? _.bind(a, window) : a
    }(),
    breakText: function(a, b, c, d) {
      d = d || {};
      var e = b.width,
        f = b.height,
        g = d.svgDocument || V("svg").node,
        h = V("<text><tspan></tspan></text>").attr(c || {}).node,
        i = h.firstChild,
        j = document.createTextNode("");
      i.appendChild(j), g.appendChild(h), d.svgDocument || document.body.appendChild(g);
      for (var k, l = a.split(" "), m = [], n = [], o = 0, p = 0, q = l.length; q > o; o++) {
        var r = l[o];
        if (j.data = n[p] ? n[p] + " " + r : r, i.getComputedTextLength() <= e) n[p] = j.data, k && (m[p++] = !0, k = 0);
        else {
          if (!n[p] || k) {
            var s = !!k;
            if (k = r.length - 1, s || !k) {
              if (!k) {
                if (!n[p]) {
                  n = [];
                  break
                }
                l.splice(o, 2, r + l[o + 1]), q--, m[p++] = !0, o--;
                continue
              }
              l[o] = r.substring(0, k), l[o + 1] = r.substring(k) + l[o + 1]
            } else l.splice(o, 1, r.substring(0, k), r.substring(k)), q++, p && !m[p - 1] && p--;
            o--;
            continue
          }
          p++, o--
        } if ("undefined" != typeof f) {
          var t = t || 1.25 * h.getBBox().height;
          if (t * n.length > f) {
            n.splice(Math.floor(f / t));
            break
          }
        }
      }
      return d.svgDocument ? g.removeChild(h) : document.body.removeChild(g), n.join("\n")
    },
    imageToDataUri: function(a, b) {
      if ("data:" === a.substr(0, "data:".length)) return setTimeout(function() {
        b(null, a)
      }, 0);
      var c = document.createElement("canvas"),
        d = document.createElement("img");
      d.onload = function() {
        var e = c.getContext("2d");
        c.width = d.width, c.height = d.height, e.drawImage(d, 0, 0);
        try {
          var f = (a.split(".").pop() || "png", "jpeg"),
            g = c.toDataURL(f)
        } catch (h) {
          if (/\.svg$/.test(a)) {
            var i = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
            i.open("GET", a, !1), i.send(null);
            var j = i.responseText;
            return b(null, "data:image/svg+xml," + encodeURIComponent(j))
          }
          console.error(d.src, "fails to convert", h)
        }
        b(null, g)
      }, d.ononerror = function() {
        b(new Error("Failed to load image."))
      }, d.src = a
    },
    timing: {
      linear: function(a) {
        return a
      },
      quad: function(a) {
        return a * a
      },
      cubic: function(a) {
        return a * a * a
      },
      inout: function(a) {
        if (0 >= a) return 0;
        if (a >= 1) return 1;
        var b = a * a,
          c = b * a;
        return 4 * (.5 > a ? c : 3 * (a - b) + c - .75)
      },
      exponential: function(a) {
        return Math.pow(2, 10 * (a - 1))
      },
      bounce: function(a) {
        for (var b = 0, c = 1; 1; b += c, c /= 2)
          if (a >= (7 - 4 * b) / 11) {
            var d = (11 - 6 * b - 11 * a) / 4;
            return -d * d + c * c
          }
      },
      reverse: function(a) {
        return function(b) {
          return 1 - a(1 - b)
        }
      },
      reflect: function(a) {
        return function(b) {
          return .5 * (.5 > b ? a(2 * b) : 2 - a(2 - 2 * b))
        }
      },
      clamp: function(a, b, c) {
        return b = b || 0, c = c || 1,
          function(d) {
            var e = a(d);
            return b > e ? b : e > c ? c : e
          }
      },
      back: function(a) {
        return a || (a = 1.70158),
          function(b) {
            return b * b * ((a + 1) * b - a)
          }
      },
      elastic: function(a) {
        return a || (a = 1.5),
          function(b) {
            return Math.pow(2, 10 * (b - 1)) * Math.cos(20 * Math.PI * a / 3 * b)
          }
      }
    },
    interpolate: {
      number: function(a, b) {
        var c = b - a;
        return function(b) {
          return a + c * b
        }
      },
      object: function(a, b) {
        var c = _.keys(a);
        return function(d) {
          var e, f, g = {};
          for (e = c.length - 1; - 1 != e; e--) f = c[e], g[f] = a[f] + (b[f] - a[f]) * d;
          return g
        }
      },
      hexColor: function(a, b) {
        var c = parseInt(a.slice(1), 16),
          d = parseInt(b.slice(1), 16),
          e = 255 & c,
          f = (255 & d) - e,
          g = 65280 & c,
          h = (65280 & d) - g,
          i = 16711680 & c,
          j = (16711680 & d) - i;
        return function(a) {
          var b = e + f * a & 255,
            c = g + h * a & 65280,
            d = i + j * a & 16711680;
          return "#" + (1 << 24 | b | c | d).toString(16).slice(1)
        }
      },
      unit: function(a, b) {
        var c = /(-?[0-9]*.[0-9]*)(px|em|cm|mm|in|pt|pc|%)/,
          d = c.exec(a),
          e = c.exec(b),
          f = e[1].indexOf("."),
          g = f > 0 ? e[1].length - f - 1 : 0,
          a = +d[1],
          h = +e[1] - a,
          i = d[2];
        return function(b) {
          return (a + h * b).toFixed(g) + i
        }
      }
    },
    filter: {
      blur: function(a) {
        var b = _.isFinite(a.x) ? a.x : 2;
        return _.template('<filter><feGaussianBlur stdDeviation="${stdDeviation}"/></filter>', {
          stdDeviation: _.isFinite(a.y) ? [b, a.y] : b
        })
      },
      dropShadow: function(a) {
        var b = "SVGFEDropShadowElement" in window ? '<filter><feDropShadow stdDeviation="${blur}" dx="${dx}" dy="${dy}" flood-color="${color}" flood-opacity="${opacity}"/></filter>' : '<filter><feGaussianBlur in="SourceAlpha" stdDeviation="${blur}"/><feOffset dx="${dx}" dy="${dy}" result="offsetblur"/><feFlood flood-color="${color}"/><feComposite in2="offsetblur" operator="in"/><feComponentTransfer><feFuncA type="linear" slope="${opacity}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
        return _.template(b, {
          dx: a.dx || 0,
          dy: a.dy || 0,
          opacity: _.isFinite(a.opacity) ? a.opacity : 1,
          color: a.color || "black",
          blur: _.isFinite(a.blur) ? a.blur : 4
        })
      },
      grayscale: function(a) {
        var b = _.isFinite(a.amount) ? a.amount : 1;
        return _.template('<filter><feColorMatrix type="matrix" values="${a} ${b} ${c} 0 0 ${d} ${e} ${f} 0 0 ${g} ${b} ${h} 0 0 0 0 0 1 0"/></filter>', {
          a: .2126 + .7874 * (1 - b),
          b: .7152 - .7152 * (1 - b),
          c: .0722 - .0722 * (1 - b),
          d: .2126 - .2126 * (1 - b),
          e: .7152 + .2848 * (1 - b),
          f: .0722 - .0722 * (1 - b),
          g: .2126 - .2126 * (1 - b),
          h: .0722 + .9278 * (1 - b)
        })
      },
      sepia: function(a) {
        var b = _.isFinite(a.amount) ? a.amount : 1;
        return _.template('<filter><feColorMatrix type="matrix" values="${a} ${b} ${c} 0 0 ${d} ${e} ${f} 0 0 ${g} ${h} ${i} 0 0 0 0 0 1 0"/></filter>', {
          a: .393 + .607 * (1 - b),
          b: .769 - .769 * (1 - b),
          c: .189 - .189 * (1 - b),
          d: .349 - .349 * (1 - b),
          e: .686 + .314 * (1 - b),
          f: .168 - .168 * (1 - b),
          g: .272 - .272 * (1 - b),
          h: .534 - .534 * (1 - b),
          i: .131 + .869 * (1 - b)
        })
      },
      saturate: function(a) {
        var b = _.isFinite(a.amount) ? a.amount : 1;
        return _.template('<filter><feColorMatrix type="saturate" values="${amount}"/></filter>', {
          amount: 1 - b
        })
      },
      hueRotate: function(a) {
        return _.template('<filter><feColorMatrix type="hueRotate" values="${angle}"/></filter>', {
          angle: a.angle || 0
        })
      },
      invert: function(a) {
        var b = _.isFinite(a.amount) ? a.amount : 1;
        return _.template('<filter><feComponentTransfer><feFuncR type="table" tableValues="${amount} ${amount2}"/><feFuncG type="table" tableValues="${amount} ${amount2}"/><feFuncB type="table" tableValues="${amount} ${amount2}"/></feComponentTransfer></filter>', {
          amount: b,
          amount2: 1 - b
        })
      },
      brightness: function(a) {
        return _.template('<filter><feComponentTransfer><feFuncR type="linear" slope="${amount}"/><feFuncG type="linear" slope="${amount}"/><feFuncB type="linear" slope="${amount}"/></feComponentTransfer></filter>', {
          amount: _.isFinite(a.amount) ? a.amount : 1
        })
      },
      contrast: function(a) {
        var b = _.isFinite(a.amount) ? a.amount : 1;
        return _.template('<filter><feComponentTransfer><feFuncR type="linear" slope="${amount}" intercept="${amount2}"/><feFuncG type="linear" slope="${amount}" intercept="${amount2}"/><feFuncB type="linear" slope="${amount}" intercept="${amount2}"/></feComponentTransfer></filter>', {
          amount: b,
          amount2: .5 - b / 2
        })
      }
    },
    format: {
      number: function(a, b, c) {
        function d(a) {
          for (var b = a.length, d = [], e = 0, f = c.grouping[0]; b > 0 && f > 0;) d.push(a.substring(b -= f, b + f)), f = c.grouping[e = (e + 1) % c.grouping.length];
          return d.reverse().join(c.thousands)
        }
        c = c || {
          currency: ["$", ""],
          decimal: ".",
          thousands: ",",
          grouping: [3]
        };
        var e = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,
          f = e.exec(a),
          g = f[1] || " ",
          h = f[2] || ">",
          i = f[3] || "",
          j = f[4] || "",
          k = f[5],
          l = +f[6],
          m = f[7],
          n = f[8],
          o = f[9],
          p = 1,
          q = "",
          r = "",
          s = !1;
        switch (n && (n = +n.substring(1)), (k || "0" === g && "=" === h) && (k = g = "0", h = "=", m && (l -= Math.floor((l - 1) / 4))), o) {
          case "n":
            m = !0, o = "g";
            break;
          case "%":
            p = 100, r = "%", o = "f";
            break;
          case "p":
            p = 100, r = "%", o = "r";
            break;
          case "b":
          case "o":
          case "x":
          case "X":
            "#" === j && (q = "0" + o.toLowerCase());
          case "c":
          case "d":
            s = !0, n = 0;
            break;
          case "s":
            p = -1, o = "r"
        }
        "$" === j && (q = c.currency[0], r = c.currency[1]), "r" != o || n || (o = "g"), null != n && ("g" == o ? n = Math.max(1, Math.min(21, n)) : ("e" == o || "f" == o) && (n = Math.max(0, Math.min(20, n))));
        var t = k && m;
        if (s && b % 1) return "";
        var u = 0 > b || 0 === b && 0 > 1 / b ? (b = -b, "-") : i,
          v = r;
        if (0 > p) {
          var w = this.prefix(b, n);
          b = w.scale(b), v = w.symbol + r
        } else b *= p;
        b = this.convert(o, b, n);
        var x = b.lastIndexOf("."),
          y = 0 > x ? b : b.substring(0, x),
          z = 0 > x ? "" : c.decimal + b.substring(x + 1);
        !k && m && c.grouping && (y = d(y));
        var A = q.length + y.length + z.length + (t ? 0 : u.length),
          B = l > A ? new Array(A = l - A + 1).join(g) : "";
        return t && (y = d(B + y)), u += q, b = y + z, ("<" === h ? u + b + B : ">" === h ? B + u + b : "^" === h ? B.substring(0, A >>= 1) + u + b + B.substring(A) : u + (t ? b : B + b)) + v
      },
      string: function(a, b) {
        for (var c, d = "{", e = !1, f = []; - 1 !== (c = a.indexOf(d));) {
          var g, h, i;
          if (g = a.slice(0, c), e) {
            h = g.split(":"), i = h.shift().split("."), g = b;
            for (var j = 0; j < i.length; j++) g = g[i[j]];
            h.length && (g = this.number(h, g))
          }
          f.push(g), a = a.slice(c + 1), d = (e = !e) ? "}" : "{"
        }
        return f.push(a), f.join("")
      },
      convert: function(a, b, c) {
        switch (a) {
          case "b":
            return b.toString(2);
          case "c":
            return String.fromCharCode(b);
          case "o":
            return b.toString(8);
          case "x":
            return b.toString(16);
          case "X":
            return b.toString(16).toUpperCase();
          case "g":
            return b.toPrecision(c);
          case "e":
            return b.toExponential(c);
          case "f":
            return b.toFixed(c);
          case "r":
            return (b = this.round(b, this.precision(b, c))).toFixed(Math.max(0, Math.min(20, this.precision(b * (1 + 1e-15), c))));
          default:
            return b + ""
        }
      },
      round: function(a, b) {
        return b ? Math.round(a * (b = Math.pow(10, b))) / b : Math.round(a)
      },
      precision: function(a, b) {
        return b - (a ? Math.ceil(Math.log(a) / Math.LN10) : 1)
      },
      prefix: function(a, b) {
        var c = _.map(["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"], function(a, b) {
            var c = Math.pow(10, 3 * abs(8 - b));
            return {
              scale: b > 8 ? function(a) {
                return a / c
              } : function(a) {
                return a * c
              },
              symbol: a
            }
          }),
          d = 0;
        return a && (0 > a && (a *= -1), b && (a = d3.round(a, this.precision(a, b))), d = 1 + Math.floor(1e-12 + Math.log(a) / Math.LN10), d = Math.max(-24, Math.min(24, 3 * Math.floor((0 >= d ? d + 1 : d - 1) / 3)))), c[8 + d / 3]
      }
    }
  }
};
if ("object" == typeof exports && (module.exports = joint), "object" == typeof exports) var joint = {
    dia: {
      Link: require("./joint.dia.link").Link,
      Element: require("./joint.dia.element").Element
    },
    shapes: require("../plugins/shapes")
  },
  Backbone = require("backbone"),
  _ = require("lodash"),
  g = require("./geometry");
if (joint.dia.GraphCells = Backbone.Collection.extend({
  initialize: function() {
    this.on("change:z", this.sort, this)
  },
  model: function(a, b) {
    if ("link" === a.type) return new joint.dia.Link(a, b);
    var c = a.type.split(".")[0],
      d = a.type.split(".")[1];
    return joint.shapes[c] && joint.shapes[c][d] ? new joint.shapes[c][d](a, b) : new joint.dia.Element(a, b)
  },
  comparator: function(a) {
    return a.get("z") || 0
  },
  getConnectedLinks: function(a, b) {
    b = b || {}, _.isUndefined(b.inbound) && _.isUndefined(b.outbound) && (b.inbound = b.outbound = !0);
    var c = [];
    return this.each(function(d) {
      var e = d.get("source"),
        f = d.get("target");
      e && e.id === a.id && b.outbound && c.push(d), f && f.id === a.id && b.inbound && c.push(d)
    }), c
  }
}), joint.dia.Graph = Backbone.Model.extend({
  initialize: function() {
    this.set("cells", new joint.dia.GraphCells), this.get("cells").on("all", this.trigger, this), this.get("cells").on("remove", this.removeCell, this)
  },
  toJSON: function() {
    var a = Backbone.Model.prototype.toJSON.apply(this, arguments);
    return a.cells = this.get("cells").toJSON(), a
  },
  fromJSON: function(a, b) {
    if (!a.cells) throw new Error("Graph JSON must contain cells array.");
    this.set(_.omit(a, "cells"), b), this.resetCells(a.cells, b)
  },
  clear: function(a) {
    this.trigger("batch:start"), this.get("cells").remove(this.get("cells").models, a), this.trigger("batch:stop")
  },
  _prepareCell: function(a) {
    return a instanceof Backbone.Model && _.isUndefined(a.get("z")) ? a.set("z", this.maxZIndex() + 1, {
      silent: !0
    }) : _.isUndefined(a.z) && (a.z = this.maxZIndex() + 1), a
  },
  maxZIndex: function() {
    var a = this.get("cells").last();
    return a ? a.get("z") || 0 : 0
  },
  addCell: function(a, b) {
    return _.isArray(a) ? this.addCells(a, b) : (this.get("cells").add(this._prepareCell(a), b || {}), this)
  },
  addCells: function(a, b) {
    return b = b || {}, b.position = a.length, _.each(a, function(a) {
      b.position--, this.addCell(a, b)
    }, this), this
  },
  resetCells: function(a, b) {
    return this.get("cells").reset(_.map(a, this._prepareCell, this), b), this
  },
  removeCell: function(a, b, c) {
    c && c.disconnectLinks ? this.disconnectLinks(a) : this.removeLinks(a), this.get("cells").remove(a, {
      silent: !0
    })
  },
  getCell: function(a) {
    return this.get("cells").get(a)
  },
  getElements: function() {
    return this.get("cells").filter(function(a) {
      return a instanceof joint.dia.Element
    })
  },
  getLinks: function() {
    return this.get("cells").filter(function(a) {
      return a instanceof joint.dia.Link
    })
  },
  getConnectedLinks: function(a, b) {
    return this.get("cells").getConnectedLinks(a, b)
  },
  getNeighbors: function(a) {
    var b = this.getConnectedLinks(a),
      c = [],
      d = this.get("cells");
    return _.each(b, function(b) {
      var e = b.get("source"),
        f = b.get("target");
      if (!e.x) {
        var g = d.get(e.id);
        g !== a && c.push(g)
      }
      if (!f.x) {
        var h = d.get(f.id);
        h !== a && c.push(h)
      }
    }), c
  },
  disconnectLinks: function(a) {
    _.each(this.getConnectedLinks(a), function(b) {
      b.set(b.get("source").id === a.id ? "source" : "target", g.point(0, 0))
    })
  },
  removeLinks: function(a) {
    _.invoke(this.getConnectedLinks(a), "remove")
  },
  findModelsFromPoint: function(a) {
    return _.filter(this.getElements(), function(b) {
      return b.getBBox().containsPoint(a)
    })
  },
  findModelsInArea: function(a) {
    return _.filter(this.getElements(), function(b) {
      return b.getBBox().intersect(a)
    })
  },
  getBBox: function(a) {
    var b = {
        x: 1 / 0,
        y: 1 / 0
      },
      c = {
        x: 0,
        y: 0
      };
    return _.each(a, function(a) {
      var d = a.getBBox();
      b.x = Math.min(b.x, d.x), b.y = Math.min(b.y, d.y), c.x = Math.max(c.x, d.x + d.width), c.y = Math.max(c.y, d.y + d.height)
    }), g.rect(b.x, b.y, c.x - b.x, c.y - b.y)
  }
}), "object" == typeof exports && (module.exports.Graph = joint.dia.Graph), "object" == typeof exports) var joint = {
    util: require("./core").util,
    dia: {
      Link: require("./joint.dia.link").Link
    }
  },
  Backbone = require("backbone"),
  _ = require("lodash");
if (joint.dia.Cell = Backbone.Model.extend({
  constructor: function(a, b) {
    var c, d = a || {};
    this.cid = _.uniqueId("c"), this.attributes = {}, b && b.collection && (this.collection = b.collection), b && b.parse && (d = this.parse(d, b) || {}), (c = _.result(this, "defaults")) && (d = _.merge({}, c, d)), this.set(d, b), this.changed = {}, this.initialize.apply(this, arguments)
  },
  toJSON: function() {
    var a = this.constructor.prototype.defaults.attrs || {},
      b = this.attributes.attrs,
      c = {};
    _.each(b, function(b, d) {
      var e = a[d];
      _.each(b, function(a, b) {
        _.isObject(a) && !_.isArray(a) ? _.each(a, function(a, f) {
          e && e[b] && _.isEqual(e[b][f], a) || (c[d] = c[d] || {}, (c[d][b] || (c[d][b] = {}))[f] = a)
        }) : e && _.isEqual(e[b], a) || (c[d] = c[d] || {}, c[d][b] = a)
      })
    });
    var d = _.cloneDeep(_.omit(this.attributes, "attrs"));
    return d.attrs = c, d
  },
  initialize: function(a) {
    a && a.id || this.set("id", joint.util.uuid(), {
      silent: !0
    }), this._transitionIds = {}, this.processPorts(), this.on("change:attrs", this.processPorts, this)
  },
  processPorts: function() {
    var a = this.ports,
      b = {};
    _.each(this.get("attrs"), function(a) {
      a && a.port && (_.isUndefined(a.port.id) ? b[a.port] = {
        id: a.port
      } : b[a.port.id] = a.port)
    });
    var c = {};
    if (_.each(a, function(a, d) {
      b[d] || (c[d] = !0)
    }), this.collection && !_.isEmpty(c)) {
      var d = this.collection.getConnectedLinks(this, {
        inbound: !0
      });
      _.each(d, function(a) {
        c[a.get("target").port] && a.remove()
      });
      var e = this.collection.getConnectedLinks(this, {
        outbound: !0
      });
      _.each(e, function(a) {
        c[a.get("source").port] && a.remove()
      })
    }
    this.ports = b
  },
  remove: function(a) {
    var b = this.collection;
    b && b.trigger("batch:start");
    var c = this.get("parent");
    if (c) {
      var d = this.collection && this.collection.get(c);
      d.unembed(this)
    }
    return _.invoke(this.getEmbeddedCells(), "remove", a), this.trigger("remove", this, this.collection, a), b && b.trigger("batch:stop"), this
  },
  toFront: function() {
    return this.collection && this.set("z", (this.collection.last().get("z") || 0) + 1), this
  },
  toBack: function() {
    return this.collection && this.set("z", (this.collection.first().get("z") || 0) - 1), this
  },
  embed: function(a) {
    if (this.get("parent") == a.id) throw new Error("Recursive embedding not allowed.");
    return this.trigger("batch:start"), a.set("parent", this.id), this.set("embeds", _.uniq((this.get("embeds") || []).concat([a.id]))), this.trigger("batch:stop"), this
  },
  unembed: function(a) {
    this.trigger("batch:start");
    var b = a.id;
    return a.unset("parent"), this.set("embeds", _.without(this.get("embeds"), b)), this.trigger("batch:stop"), this
  },
  getEmbeddedCells: function() {
    return this.collection ? _.map(this.get("embeds") || [], function(a) {
      return this.collection.get(a)
    }, this) : []
  },
  clone: function(a) {
    a = a || {};
    var b = Backbone.Model.prototype.clone.apply(this, arguments);
    if (b.set("id", joint.util.uuid(), {
      silent: !0
    }), b.set("embeds", ""), !a.deep) return b;
    var c = _.sortBy(this.getEmbeddedCells(), function(a) {
        return a instanceof joint.dia.Element
      }),
      d = [b],
      e = {};
    return _.each(c, function(a) {
      var c = a.clone({
        deep: !0
      });
      b.embed(c[0]), _.each(c, function(c) {
        if (c instanceof joint.dia.Link) return c.get("source").id == this.id && c.prop("source", {
          id: b.id
        }), c.get("target").id == this.id && c.prop("target", {
          id: b.id
        }), e[a.id] = c, void 0;
        d.push(c);
        var f = this.collection.getConnectedLinks(a, {
          inbound: !0
        });
        _.each(f, function(a) {
          var b = e[a.id] || a.clone();
          e[a.id] = b, b.prop("target", {
            id: c.id
          })
        });
        var g = this.collection.getConnectedLinks(a, {
          outbound: !0
        });
        _.each(g, function(a) {
          var b = e[a.id] || a.clone();
          e[a.id] = b, b.prop("source", {
            id: c.id
          })
        })
      }, this)
    }, this), d = d.concat(_.values(e))
  },
  prop: function(a, b, c) {
    var d = "/";
    if (_.isString(a)) {
      if ("undefined" != typeof b) {
        var e = a,
          f = e.split("/"),
          g = f[0];
        if (1 == f.length) return this.set(g, b, c);
        var h = {},
          i = h,
          j = g;
        _.each(_.rest(f), function(a) {
          i = i[j] = _.isFinite(Number(a)) ? [] : {}, j = a
        }), h = joint.util.setByPath(h, e, b, "/");
        var k = _.merge({}, this.attributes, h);
        return this.set(g, k[g], c)
      }
      return joint.util.getByPath(this.attributes, a, d)
    }
    return this.set(_.merge({}, this.attributes, a), b)
  },
  attr: function(a, b, c) {
    var d = this.get("attrs"),
      e = "/";
    if (_.isString(a)) {
      if ("undefined" != typeof b) {
        var f = {};
        return joint.util.setByPath(f, a, b, e), this.set("attrs", _.merge({}, d, f), c)
      }
      return joint.util.getByPath(d, a, e)
    }
    return this.set("attrs", _.merge({}, d, a), b, c)
  },
  removeAttr: function(a, b) {
    if (_.isArray(a)) return _.each(a, function(a) {
      this.removeAttr(a, b)
    }, this), this;
    var c = joint.util.unsetByPath(_.merge({}, this.get("attrs")), a, "/");
    return this.set("attrs", c, _.extend({
      dirty: !0
    }, b))
  },
  transition: function(a, b, c, d) {
    d = d || "/";
    var e = {
      duration: 100,
      delay: 10,
      timingFunction: joint.util.timing.linear,
      valueFunction: joint.util.interpolate.number
    };
    c = _.extend(e, c);
    var f, g = 0,
      h = _.bind(function(b) {
        var d, e, i;
        g = g || b, b -= g, e = b / c.duration, 1 > e ? this._transitionIds[a] = d = joint.util.nextFrame(h) : (e = 1, delete this._transitionIds[a]), i = f(c.timingFunction(e)), c.transitionId = d, this.prop(a, i, c), d || this.trigger("transition:end", this, a)
      }, this),
      i = _.bind(function(e) {
        this.stopTransitions(a), f = c.valueFunction(joint.util.getByPath(this.attributes, a, d), b), this._transitionIds[a] = joint.util.nextFrame(e), this.trigger("transition:start", this, a)
      }, this);
    return _.delay(i, c.delay, h)
  },
  getTransitions: function() {
    return _.keys(this._transitionIds)
  },
  stopTransitions: function(a, b) {
    b = b || "/";
    var c = a && a.split(b);
    return _(this._transitionIds).keys().filter(c && function(a) {
      return _.isEqual(c, a.split(b).slice(0, c.length))
    }).each(function(a) {
      joint.util.cancelFrame(this._transitionIds[a]), delete this._transitionIds[a], this.trigger("transition:end", this, a)
    }, this), this
  },
  addTo: function(a) {
    return a.addCell(this), this
  },
  findView: function(a) {
    return a.findViewByModel(this)
  }
}), joint.dia.CellView = Backbone.View.extend({
  tagName: "g",
  attributes: function() {
    return {
      "model-id": this.model.id
    }
  },
  constructor: function(a) {
    this._configure(a), Backbone.View.apply(this, arguments)
  },
  _configure: function(a) {
    this.options && (a = _.extend({}, _.result(this, "options"), a)), this.options = a, this.options.id = this.options.id || joint.util.guid(this)
  },
  initialize: function() {
    _.bindAll(this, "remove", "update"), this.$el.data("view", this), this.listenTo(this.model, "remove", this.remove), this.listenTo(this.model, "change:attrs", this.onChangeAttrs)
  },
  onChangeAttrs: function(a, b, c) {
    return c.dirty ? this.render() : this.update()
  },
  _ensureElement: function() {
    var a;
    if (this.el) a = _.result(this, "el");
    else {
      var b = _.extend({
        id: this.id
      }, _.result(this, "attributes"));
      this.className && (b["class"] = _.result(this, "className")), a = V(_.result(this, "tagName"), b).node
    }
    this.setElement(a, !1)
  },
  findBySelector: function(a) {
    var b = "." === a ? this.$el : this.$el.find(a);
    return b
  },
  notify: function(a) {
    if (this.paper) {
      var b = Array.prototype.slice.call(arguments, 1);
      this.trigger.apply(this, [a].concat(b)), this.paper.trigger.apply(this.paper, [a, this].concat(b))
    }
  },
  getStrokeBBox: function(a) {
    var b = !!a;
    a = a || this.el;
    var c, d = V(a).bbox(!1, this.paper.viewport);
    return c = b ? V(a).attr("stroke-width") : this.model.attr("rect/stroke-width") || this.model.attr("circle/stroke-width") || this.model.attr("ellipse/stroke-width") || this.model.attr("path/stroke-width"), c = parseFloat(c) || 0, g.rect(d).moveAndExpand({
      x: -c / 2,
      y: -c / 2,
      width: c,
      height: c
    })
  },
  getBBox: function() {
    return V(this.el).bbox()
  },
  highlight: function(a) {
    a = a ? this.$(a)[0] || this.el : this.el, V(a).addClass("highlighted")
  },
  unhighlight: function(a) {
    a = a ? this.$(a)[0] || this.el : this.el, V(a).removeClass("highlighted")
  },
  findMagnet: function(a) {
    var b = this.$(a);
    if (0 === b.length || b[0] === this.el) {
      var c = this.model.get("attrs") || {};
      return c["."] && c["."].magnet === !1 ? void 0 : this.el
    }
    return b.attr("magnet") ? b[0] : this.findMagnet(b.parent())
  },
  applyFilter: function(a, b) {
    var c = this.findBySelector(a),
      d = b.name + this.paper.svg.id + joint.util.hashCode(JSON.stringify(b));
    if (!this.paper.svg.getElementById(d)) {
      var e = joint.util.filter[b.name] && joint.util.filter[b.name](b.args || {});
      if (!e) throw new Error("Non-existing filter " + b.name);
      var f = V(e);
      f.attr({
        filterUnits: "objectBoundingBox",
        x: -1,
        y: -1,
        width: 3,
        height: 3
      }), b.attrs && f.attr(b.attrs), f.node.id = d, V(this.paper.svg).defs().append(f)
    }
    c.each(function() {
      V(this).attr("filter", "url(#" + d + ")")
    })
  },
  applyGradient: function(a, b, c) {
    var d = this.findBySelector(a),
      e = c.type + this.paper.svg.id + joint.util.hashCode(JSON.stringify(c));
    if (!this.paper.svg.getElementById(e)) {
      var f = ["<" + c.type + ">", _.map(c.stops, function(a) {
          return '<stop offset="' + a.offset + '" stop-color="' + a.color + '" stop-opacity="' + (_.isFinite(a.opacity) ? a.opacity : 1) + '" />'
        }).join(""), "</" + c.type + ">"].join(""),
        g = V(f);
      c.attrs && g.attr(c.attrs), g.node.id = e, V(this.paper.svg).defs().append(g)
    }
    d.each(function() {
      V(this).attr(b, "url(#" + e + ")")
    })
  },
  getSelector: function(a, b) {
    if (a === this.el) return b;
    var c = $(a).index();
    return b = a.tagName + ":nth-child(" + (c + 1) + ") " + (b || ""), this.getSelector($(a).parent()[0], b + " ")
  },
  pointerdblclick: function(a, b, c) {
    this.notify("cell:pointerdblclick", a, b, c)
  },
  pointerclick: function(a, b, c) {
    this.notify("cell:pointerclick", a, b, c)
  },
  pointerdown: function(a, b, c) {
    this.model.collection && (this.model.trigger("batch:start"), this._collection = this.model.collection), this.notify("cell:pointerdown", a, b, c)
  },
  pointermove: function(a, b, c) {
    this.notify("cell:pointermove", a, b, c)
  },
  pointerup: function(a, b, c) {
    this.notify("cell:pointerup", a, b, c), this._collection && (this._collection.trigger("batch:stop"), delete this._collection)
  }
}), "object" == typeof exports && (module.exports.Cell = joint.dia.Cell, module.exports.CellView = joint.dia.CellView), "object" == typeof exports) var joint = {
    util: require("./core").util,
    dia: {
      Cell: require("./joint.dia.cell").Cell,
      CellView: require("./joint.dia.cell").CellView
    }
  },
  Backbone = require("backbone"),
  _ = require("lodash");
if (joint.dia.Element = joint.dia.Cell.extend({
  defaults: {
    position: {
      x: 0,
      y: 0
    },
    size: {
      width: 1,
      height: 1
    },
    angle: 0
  },
  position: function(a, b) {
    this.set("position", {
      x: a,
      y: b
    })
  },
  translate: function(a, b, c) {
    if (b = b || 0, 0 === a && 0 === b) return this;
    var d = this.get("position") || {
        x: 0,
        y: 0
      },
      e = {
        x: d.x + a || 0,
        y: d.y + b || 0
      };
    return c && c.transition ? (_.isObject(c.transition) || (c.transition = {}), this.transition("position", e, _.extend({}, c.transition, {
      valueFunction: joint.util.interpolate.object
    }))) : (this.set("position", e, c), _.invoke(this.getEmbeddedCells(), "translate", a, b, c)), this
  },
  resize: function(a, b) {
    return this.trigger("batch:start"), this.set("size", {
      width: a,
      height: b
    }), this.trigger("batch:stop"), this
  },
  rotate: function(a, b, c) {
    if (c) {
      var d = this.getBBox().center(),
        e = this.get("size"),
        f = this.get("position");
      d.rotate(c, (this.get("angle") || 0) - a);
      var g = d.x - e.width / 2 - f.x,
        h = d.y - e.height / 2 - f.y;
      this.trigger("batch:start"), this.translate(g, h), this.rotate(a, b), this.trigger("batch:stop")
    } else this.set("angle", b ? a : ((this.get("angle") || 0) + a) % 360);
    return this
  },
  getBBox: function() {
    var a = this.get("position"),
      b = this.get("size");
    return g.rect(a.x, a.y, b.width, b.height)
  }
}), joint.dia.ElementView = joint.dia.CellView.extend({
  className: function() {
    return "element " + this.model.get("type").split(".").join(" ")
  },
  initialize: function() {
    _.bindAll(this, "translate", "resize", "rotate"), joint.dia.CellView.prototype.initialize.apply(this, arguments), this.listenTo(this.model, "change:position", this.translate), this.listenTo(this.model, "change:size", this.resize), this.listenTo(this.model, "change:angle", this.rotate)
  },
  update: function(a, b) {
    var c = this.model.get("attrs"),
      d = V(this.$(".rotatable")[0]);
    if (d) {
      var e = d.attr("transform");
      d.attr("transform", "")
    }
    var f = [];
    _.each(b || c, function(a, b) {
      var c = this.findBySelector(b);
      if (0 !== c.length) {
        var d = ["style", "text", "html", "ref-x", "ref-y", "ref-dx", "ref-dy", "ref-width", "ref-height", "ref", "x-alignment", "y-alignment", "port"];
        _.isObject(a.filter) && (d.push("filter"), this.applyFilter(b, a.filter)), _.isObject(a.fill) && (d.push("fill"), this.applyGradient(b, "fill", a.fill)), _.isObject(a.stroke) && (d.push("stroke"), this.applyGradient(b, "stroke", a.stroke)), _.isUndefined(a.text) || c.each(function() {
          V(this).text(a.text + "", {
            lineHeight: a.lineHeight
          })
        });
        var e = _.omit(a, d);
        c.each(function() {
          V(this).attr(e)
        }), a.port && c.attr("port", _.isUndefined(a.port.id) ? a.port : a.port.id), a.style && c.css(a.style), _.isUndefined(a.html) || c.each(function() {
          $(this).html(a.html + "")
        }), _.isUndefined(a["ref-x"]) && _.isUndefined(a["ref-y"]) && _.isUndefined(a["ref-dx"]) && _.isUndefined(a["ref-dy"]) && _.isUndefined(a["x-alignment"]) && _.isUndefined(a["y-alignment"]) && _.isUndefined(a["ref-width"]) && _.isUndefined(a["ref-height"]) || _.each(c, function(a, b, c) {
          var d = $(a);
          d.selector = c.selector, f.push(d)
        })
      }
    }, this);
    var g = this.el.getBBox();
    b = b || {}, _.each(f, function(a) {
      var d = b[a.selector],
        e = d ? _.merge({}, c[a.selector], d) : c[a.selector];
      this.positionRelative(a, g, e)
    }, this), d && d.attr("transform", e || "")
  },
  positionRelative: function(a, b, c) {
    function d(a) {
      return _.isNumber(a) && !_.isNaN(a)
    }
    var e = c.ref,
      f = parseFloat(c["ref-x"]),
      g = parseFloat(c["ref-y"]),
      h = parseFloat(c["ref-dx"]),
      i = parseFloat(c["ref-dy"]),
      j = c["y-alignment"],
      k = c["x-alignment"],
      l = parseFloat(c["ref-width"]),
      m = parseFloat(c["ref-height"]),
      n = _.contains(_.pluck(_.pluck(a.parents("g"), "className"), "baseVal"), "scalable");
    e && (b = V(this.findBySelector(e)[0]).bbox(!1, this.el));
    var o = V(a[0]);
    o.attr("transform") && o.attr("transform", o.attr("transform").replace(/translate\([^)]*\)/g, "").trim() || "");
    var p = 0,
      q = 0;
    if (d(l) && (l >= 0 && 1 >= l ? o.attr("width", l * b.width) : o.attr("width", Math.max(l + b.width, 0))), d(m) && (m >= 0 && 1 >= m ? o.attr("height", m * b.height) : o.attr("height", Math.max(m + b.height, 0))), d(h))
      if (n) {
        var r = V(this.$(".scalable")[0]).scale();
        p = b.x + b.width + h / r.sx
      } else p = b.x + b.width + h;
    if (d(i))
      if (n) {
        var r = V(this.$(".scalable")[0]).scale();
        q = b.y + b.height + i / r.sy
      } else q = b.y + b.height + i;
    if (d(f))
      if (f > 0 && 1 > f) p = b.x + b.width * f;
      else if (n) {
      var r = V(this.$(".scalable")[0]).scale();
      p = b.x + f / r.sx
    } else p = b.x + f; if (d(g))
      if (g > 0 && 1 > g) q = b.y + b.height * g;
      else if (n) {
      var r = V(this.$(".scalable")[0]).scale();
      q = b.y + g / r.sy
    } else q = b.y + g;
    var s = o.bbox(!1, this.paper.viewport);
    "middle" === j ? q -= s.height / 2 : d(j) && (q += j > -1 && 1 > j ? s.height * j : j), "middle" === k ? p -= s.width / 2 : d(k) && (p += k > -1 && 1 > k ? s.width * k : k), o.translate(p, q)
  },
  renderMarkup: function() {
    var a = this.model.markup || this.model.get("markup");
    if (!a) throw new Error("properties.markup is missing while the default render() implementation is used.");
    var b = V(a);
    V(this.el).append(b)
  },
  render: function() {
    return this.$el.empty(), this.renderMarkup(), this.update(), this.resize(), this.rotate(), this.translate(), this
  },
  scale: function(a, b) {
    V(this.el).scale(a, b)
  },
  resize: function() {
    var a = this.model.get("size") || {
        width: 1,
        height: 1
      },
      b = this.model.get("angle") || 0,
      c = V(this.$(".scalable")[0]);
    if (c) {
      var d = c.bbox(!0);
      c.attr("transform", "scale(" + a.width / (d.width || 1) + "," + a.height / (d.height || 1) + ")");
      var e = V(this.$(".rotatable")[0]),
        f = e && e.attr("transform");
      if (f && "null" !== f) {
        e.attr("transform", f + " rotate(" + -b + "," + a.width / 2 + "," + a.height / 2 + ")");
        var g = c.bbox(!1, this.paper.viewport);
        this.model.set("position", {
          x: g.x,
          y: g.y
        }), this.rotate()
      }
      this.update()
    }
  },
  translate: function() {
    var a = this.model.get("position") || {
      x: 0,
      y: 0
    };
    V(this.el).attr("transform", "translate(" + a.x + "," + a.y + ")")
  },
  rotate: function() {
    var a = V(this.$(".rotatable")[0]);
    if (a) {
      var b = this.model.get("angle") || 0,
        c = this.model.get("size") || {
          width: 1,
          height: 1
        },
        d = c.width / 2,
        e = c.height / 2;
      a.attr("transform", "rotate(" + b + "," + d + "," + e + ")")
    }
  },
  pointerdown: function(a, b, c) {
    if (a.target.getAttribute("magnet") && this.paper.options.validateMagnet.call(this.paper, this, a.target)) {
      this.model.trigger("batch:start");
      var d = this.paper.getDefaultLink(this, a.target);
      d.set({
        source: {
          id: this.model.id,
          selector: this.getSelector(a.target),
          port: $(a.target).attr("port")
        },
        target: {
          x: b,
          y: c
        }
      }), this.paper.model.addCell(d), this._linkView = this.paper.findViewByModel(d), this._linkView.startArrowheadMove("target")
    } else this._dx = b, this._dy = c, joint.dia.CellView.prototype.pointerdown.apply(this, arguments)
  },
  pointermove: function(a, b, c) {
    if (this._linkView) this._linkView.pointermove(a, b, c);
    else {
      var d = this.paper.options.gridSize,
        e = _.isFunction(this.options.interactive) ? this.options.interactive(this, "pointermove") : this.options.interactive;
      if (e !== !1) {
        var f = this.model.get("position");
        this.model.translate(g.snapToGrid(f.x, d) - f.x + g.snapToGrid(b - this._dx, d), g.snapToGrid(f.y, d) - f.y + g.snapToGrid(c - this._dy, d))
      }
      this._dx = g.snapToGrid(b, d), this._dy = g.snapToGrid(c, d), joint.dia.CellView.prototype.pointermove.apply(this, arguments)
    }
  },
  pointerup: function(a, b, c) {
    this._linkView ? (this._linkView.pointerup(a, b, c), delete this._linkView, this.model.trigger("batch:stop")) : joint.dia.CellView.prototype.pointerup.apply(this, arguments)
  }
}), "object" == typeof exports && (module.exports.Element = joint.dia.Element, module.exports.ElementView = joint.dia.ElementView), "object" == typeof exports) var joint = {
    dia: {
      Cell: require("./joint.dia.cell").Cell,
      CellView: require("./joint.dia.cell").CellView
    }
  },
  Backbone = require("backbone"),
  _ = require("lodash"),
  g = require("./geometry");
if (joint.dia.Link = joint.dia.Cell.extend({
  markup: ['<path class="connection" stroke="black"/>', '<path class="marker-source" fill="black" stroke="black" />', '<path class="marker-target" fill="black" stroke="black" />', '<path class="connection-wrap"/>', '<g class="labels"/>', '<g class="marker-vertices"/>', '<g class="marker-arrowheads"/>', '<g class="link-tools"/>'].join(""),
  labelMarkup: ['<g class="label">', "<rect />", "<text />", "</g>"].join(""),
  toolMarkup: ['<g class="link-tool">', '<g class="tool-remove" event="remove">', '<circle r="11" />', '<path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/>', "<title>Remove link.</title>", "</g>", '<g class="tool-options" event="link:options">', '<circle r="11" transform="translate(25)"/>', '<path fill="white" transform="scale(.55) translate(29, -16)" d="M31.229,17.736c0.064-0.571,0.104-1.148,0.104-1.736s-0.04-1.166-0.104-1.737l-4.377-1.557c-0.218-0.716-0.504-1.401-0.851-2.05l1.993-4.192c-0.725-0.91-1.549-1.734-2.458-2.459l-4.193,1.994c-0.647-0.347-1.334-0.632-2.049-0.849l-1.558-4.378C17.165,0.708,16.588,0.667,16,0.667s-1.166,0.041-1.737,0.105L12.707,5.15c-0.716,0.217-1.401,0.502-2.05,0.849L6.464,4.005C5.554,4.73,4.73,5.554,4.005,6.464l1.994,4.192c-0.347,0.648-0.632,1.334-0.849,2.05l-4.378,1.557C0.708,14.834,0.667,15.412,0.667,16s0.041,1.165,0.105,1.736l4.378,1.558c0.217,0.715,0.502,1.401,0.849,2.049l-1.994,4.193c0.725,0.909,1.549,1.733,2.459,2.458l4.192-1.993c0.648,0.347,1.334,0.633,2.05,0.851l1.557,4.377c0.571,0.064,1.148,0.104,1.737,0.104c0.588,0,1.165-0.04,1.736-0.104l1.558-4.377c0.715-0.218,1.399-0.504,2.049-0.851l4.193,1.993c0.909-0.725,1.733-1.549,2.458-2.458l-1.993-4.193c0.347-0.647,0.633-1.334,0.851-2.049L31.229,17.736zM16,20.871c-2.69,0-4.872-2.182-4.872-4.871c0-2.69,2.182-4.872,4.872-4.872c2.689,0,4.871,2.182,4.871,4.872C20.871,18.689,18.689,20.871,16,20.871z"/>', "<title>Link options.</title>", "</g>", "</g>"].join(""),
  vertexMarkup: ['<g class="marker-vertex-group" transform="translate(<%= x %>, <%= y %>)">', '<circle class="marker-vertex" idx="<%= idx %>" r="10" />', '<path class="marker-vertex-remove-area" idx="<%= idx %>" d="M16,5.333c-7.732,0-14,4.701-14,10.5c0,1.982,0.741,3.833,2.016,5.414L2,25.667l5.613-1.441c2.339,1.317,5.237,2.107,8.387,2.107c7.732,0,14-4.701,14-10.5C30,10.034,23.732,5.333,16,5.333z" transform="translate(5, -33)"/>', '<path class="marker-vertex-remove" idx="<%= idx %>" transform="scale(.8) translate(9.5, -37)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z">', "<title>Remove vertex.</title>", "</path>", "</g>"].join(""),
  arrowheadMarkup: ['<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">', '<path class="marker-arrowhead" end="<%= end %>" d="M 26 0 L 0 13 L 26 26 z" />', "</g>"].join(""),
  defaults: {
    type: "link"
  },
  disconnect: function() {
    return this.set({
      source: g.point(0, 0),
      target: g.point(0, 0)
    })
  },
  label: function(a, b) {
    a = a || 0;
    var c = this.get("labels") || [];
    if (0 === arguments.length || 1 === arguments.length) return c[a];
    var d = _.merge({}, c[a], b),
      e = c.slice();
    return e[a] = d, this.set({
      labels: e
    })
  },
  translate: function(a, b, c) {
    var d = {},
      e = this.get("source"),
      f = this.get("target"),
      g = this.get("vertices");
    return e.id || (d.source = {
      x: e.x + a,
      y: e.y + b
    }), f.id || (d.target = {
      x: f.x + a,
      y: f.y + b
    }), g && g.length && (d.vertices = _.map(g, function(c) {
      return {
        x: c.x + a,
        y: c.y + b
      }
    })), this.set(d, c)
  }
}), joint.dia.LinkView = joint.dia.CellView.extend({
  className: function() {
    return _.unique(this.model.get("type").split(".").concat("link")).join(" ")
  },
  options: {
    shortLinkLength: 100
  },
  initialize: function() {
    joint.dia.CellView.prototype.initialize.apply(this, arguments), "function" != typeof this.constructor.prototype.watchSource && (this.constructor.prototype.watchSource = this._createWatcher("source"), this.constructor.prototype.watchTarget = this._createWatcher("target")), this._labelCache = {}, this._markerCache = {}, this.startListening()
  },
  startListening: function() {
    this.listenTo(this.model, "change:markup", this.render), this.listenTo(this.model, "change:smooth change:manhattan change:router change:connector", this.update), this.listenTo(this.model, "change:toolMarkup", function() {
      this.renderTools().updateToolsPosition()
    }), this.listenTo(this.model, "change:labels change:labelMarkup", function() {
      this.renderLabels().updateLabelPositions()
    }), this.listenTo(this.model, "change:vertices change:vertexMarkup", function() {
      this.renderVertexMarkers().update()
    }), this.listenTo(this.model, "change:source", function(a, b) {
      this.watchSource(a, b).update()
    }), this.listenTo(this.model, "change:target", function(a, b) {
      this.watchTarget(a, b).update()
    })
  },
  render: function() {
    this.$el.empty();
    var a = V(this.model.get("markup") || this.model.markup);
    if (_.isArray(a) || (a = [a]), this._V = {}, _.each(a, function(a) {
      var b = a.attr("class");
      b && (this._V[$.camelCase(b)] = a)
    }, this), !this._V.connection) throw new Error("link: no connection path in the markup");
    return this.renderTools(), this.renderVertexMarkers(), this.renderArrowheadMarkers(), V(this.el).append(a), this.renderLabels(), this.watchSource(this.model, this.model.get("source")).watchTarget(this.model, this.model.get("target")).update(), this
  },
  renderLabels: function() {
    if (!this._V.labels) return this;
    this._labelCache = {};
    var a = $(this._V.labels.node).empty(),
      b = this.model.get("labels") || [];
    if (!b.length) return this;
    var c = _.template(this.model.get("labelMarkup") || this.model.labelMarkup),
      d = V(c());
    return _.each(b, function(b, c) {
      var e = d.clone().node;
      this._labelCache[c] = V(e);
      var f = $(e).find("text"),
        g = $(e).find("rect"),
        h = _.extend({
          "text-anchor": "middle",
          "font-size": 14
        }, joint.util.getByPath(b, "attrs/text", "/"));
      f.attr(_.omit(h, "text")), _.isUndefined(h.text) || V(f[0]).text(h.text + ""), a.append(e);
      var i = V(f[0]).bbox(!0, a[0]);
      V(f[0]).translate(0, -i.height / 2);
      var j = _.extend({
        fill: "white",
        rx: 3,
        ry: 3
      }, joint.util.getByPath(b, "attrs/rect", "/"));
      g.attr(_.extend(j, {
        x: i.x,
        y: i.y - i.height / 2,
        width: i.width,
        height: i.height
      }))
    }, this), this
  },
  renderTools: function() {
    if (!this._V.linkTools) return this;
    var a = $(this._V.linkTools.node).empty(),
      b = _.template(this.model.get("toolMarkup") || this.model.toolMarkup),
      c = V(b());
    return a.append(c.node), this._toolCache = c, this
  },
  renderVertexMarkers: function() {
    if (!this._V.markerVertices) return this;
    var a = $(this._V.markerVertices.node).empty(),
      b = _.template(this.model.get("vertexMarkup") || this.model.vertexMarkup);
    return _.each(this.model.get("vertices"), function(c, d) {
      a.append(V(b(_.extend({
        idx: d
      }, c))).node)
    }), this
  },
  renderArrowheadMarkers: function() {
    if (!this._V.markerArrowheads) return this;
    var a = $(this._V.markerArrowheads.node);
    a.empty();
    var b = _.template(this.model.get("arrowheadMarkup") || this.model.arrowheadMarkup);
    return this._V.sourceArrowhead = V(b({
      end: "source"
    })), this._V.targetArrowhead = V(b({
      end: "target"
    })), a.append(this._V.sourceArrowhead.node, this._V.targetArrowhead.node), this
  },
  update: function() {
    _.each(this.model.get("attrs"), function(a, b) {
      _.isObject(a.filter) ? (this.findBySelector(b).attr(_.omit(a, "filter")), this.applyFilter(b, a.filter)) : this.findBySelector(b).attr(a)
    }, this);
    var a = this.route = this.findRoute(this.model.get("vertices") || []);
    this._findConnectionPoints(a);
    var b = this.getPathData(a);
    return this._V.connection.attr("d", b), this._V.connectionWrap && this._V.connectionWrap.attr("d", b), this._translateAndAutoOrientArrows(this._V.markerSource, this._V.markerTarget), this.updateLabelPositions(), this.updateToolsPosition(), this.updateArrowheadMarkers(), delete this.options.perpendicular, this
  },
  _findConnectionPoints: function(a) {
    var b, c, d, e, f = _.first(a);
    b = this.getConnectionPoint("source", this.model.get("source"), f || this.model.get("target")).round();
    var h = _.last(a);
    c = this.getConnectionPoint("target", this.model.get("target"), h || b).round();
    var i = this._markerCache;
    this._V.markerSource && (i.sourceBBox = i.sourceBBox || this._V.markerSource.bbox(!0), d = g.point(b).move(f || c, i.sourceBBox.width * this._V.markerSource.scale().sx * -1).round()), this._V.markerTarget && (i.targetBBox = i.targetBBox || this._V.markerTarget.bbox(!0), e = g.point(c).move(h || b, i.targetBBox.width * this._V.markerTarget.scale().sx * -1).round()), i.sourcePoint = d || b, i.targetPoint = e || c, this.sourcePoint = b, this.targetPoint = c
  },
  updateLabelPositions: function() {
    if (!this._V.labels) return this;
    var a = this.model.get("labels") || [];
    if (!a.length) return this;
    var b = this._V.connection.node,
      c = b.getTotalLength();
    return _.isNaN(c) || _.each(a, function(a, d) {
      var e = a.position;
      e = e > c ? c : e, e = 0 > e ? c + e : e, e = e > 1 ? e : c * e;
      var f = b.getPointAtLength(e);
      this._labelCache[d].attr("transform", "translate(" + f.x + ", " + f.y + ")")
    }, this), this
  },
  updateToolsPosition: function() {
    if (!this._V.linkTools) return this;
    var a = "",
      b = 40;
    this.getConnectionLength() < this.options.shortLinkLength && (a = "scale(.5)", b /= 2);
    var c = this.getPointAtLength(b);
    return this._toolCache.attr("transform", "translate(" + c.x + ", " + c.y + ") " + a), this
  },
  updateArrowheadMarkers: function() {
    if (!this._V.markerArrowheads) return this;
    if ("none" === $.css(this._V.markerArrowheads.node, "display")) return this;
    var a = this.getConnectionLength() < this.options.shortLinkLength ? .5 : 1;
    return this._V.sourceArrowhead.scale(a), this._V.targetArrowhead.scale(a), this._translateAndAutoOrientArrows(this._V.sourceArrowhead, this._V.targetArrowhead), this
  },
  _createWatcher: function(a) {
    function b(b, c) {
      c = c || {};
      var d = b.previous(a) || {},
        e = this["_" + a + "BBoxUpdate"];
      return this._isModel(d) && this.stopListening(this.paper.getModelById(d.id), "change", e), this._isModel(c) && this.listenTo(this.paper.getModelById(c.id), "change", e), _.bind(e, this)({
        cacheOnly: !0
      }), this
    }
    return b
  },
  _sourceBBoxUpdate: function(a) {
    this.lastEndChange = "source", a = a || {};
    var b = this.model.get("source");
    if (this._isModel(b)) {
      var c = this._makeSelector(b),
        d = this.paper.findViewByModel(b.id),
        e = this.paper.viewport.querySelector(c);
      this.sourceBBox = d.getStrokeBBox(e), this.sourceView = d, this.sourceMagnet = e
    } else b && (this.sourceBBox = g.rect(b.x, b.y, 1, 1));
    a.cacheOnly || this.update()
  },
  _targetBBoxUpdate: function(a) {
    this.lastEndChange = "target", a = a || {};
    var b = this.model.get("target");
    if (this._isModel(b)) {
      var c = this._makeSelector(b),
        d = this.paper.findViewByModel(b.id),
        e = this.paper.viewport.querySelector(c);
      this.targetBBox = d.getStrokeBBox(e), this.targetView = d, this.targetMagnet = e
    } else b && (this.targetBBox = g.rect(b.x, b.y, 1, 1));
    a.cacheOnly || this.update()
  },
  _translateAndAutoOrientArrows: function(a, b) {
    a && a.translateAndAutoOrient(this.sourcePoint, _.first(this.route) || this.targetPoint, this.paper.viewport), b && b.translateAndAutoOrient(this.targetPoint, _.last(this.route) || this.sourcePoint, this.paper.viewport)
  },
  removeVertex: function(a) {
    var b = _.clone(this.model.get("vertices"));
    return b && b.length && (b.splice(a, 1), this.model.set("vertices", b)), this
  },
  addVertex: function(a) {
    this.model.set("attrs", this.model.get("attrs") || {});
    for (var b, c = (this.model.get("attrs"), (this.model.get("vertices") || []).slice()), d = c.slice(), e = this._V.connection.node.cloneNode(!1), f = e.getTotalLength(), g = 20, h = c.length + 1; h-- && (c.splice(h, 0, a), V(e).attr("d", this.getPathData(this.findRoute(c))), b = e.getTotalLength(), b - f > g);) c = d.slice();
    return -1 === h && (h = 0, c.splice(h, 0, a)), this.model.set("vertices", c), h
  },
  sendToken: function(a, b, c) {
    b = b || 1e3, V(this.paper.viewport).append(a), V(a).animateAlongPath({
      dur: b + "ms",
      repeatCount: 1
    }, this._V.connection.node), _.delay(function() {
      V(a).remove(), c && c()
    }, b)
  },
  findRoute: function(a) {
    var b = this.model.get("router");
    if (!b) {
      if (!this.model.get("manhattan")) return a;
      b = {
        name: "orthogonal"
      }
    }
    var c = joint.routers[b.name];
    if (!_.isFunction(c)) throw "unknown router: " + b.name;
    var d = c.call(this, a || [], b.args || {}, this);
    return d
  },
  getPathData: function(a) {
    var b = this.model.get("connector");
    if (b || (b = this.model.get("smooth") ? {
      name: "smooth"
    } : {
      name: "normal"
    }), !_.isFunction(joint.connectors[b.name])) throw "unknown connector: " + b.name;
    var c = joint.connectors[b.name].call(this, this._markerCache.sourcePoint, this._markerCache.targetPoint, a || this.model.get("vertices") || {}, b.args || {}, this);
    return c
  },
  getConnectionPoint: function(a, b, c) {
    var d;
    if (b = b || {
      x: 0,
      y: 0
    }, c = c || {
      x: 0,
      y: 0
    }, this._isPoint(b)) d = g.point(b);
    else {
      var e, f = "source" === a ? this.sourceBBox : this.targetBBox;
      if (this._isPoint(c)) e = g.point(c);
      else {
        var h = "source" === a ? this.targetBBox : this.sourceBBox;
        e = g.rect(h).intersectionWithLineFromCenterToPoint(g.rect(f).center()), e = e || g.rect(h).center()
      } if (this.paper.options.perpendicularLinks || this.options.perpendicular) {
        var i, j = g.rect(0, e.y, this.paper.options.width, 1),
          k = g.rect(e.x, 0, 1, this.paper.options.height);
        if (j.intersect(g.rect(f))) switch (i = g.rect(f).sideNearestToPoint(e)) {
          case "left":
            d = g.point(f.x, e.y);
            break;
          case "right":
            d = g.point(f.x + f.width, e.y);
            break;
          default:
            d = g.rect(f).center()
        } else if (k.intersect(g.rect(f))) switch (i = g.rect(f).sideNearestToPoint(e)) {
          case "top":
            d = g.point(e.x, f.y);
            break;
          case "bottom":
            d = g.point(e.x, f.y + f.height);
            break;
          default:
            d = g.rect(f).center()
        } else d = g.rect(f).intersectionWithLineFromCenterToPoint(e), d = d || g.rect(f).center()
      } else if (this.paper.options.linkConnectionPoint) {
        var l = "target" === a ? this.targetView : this.sourceView,
          m = "target" === a ? this.targetMagnet : this.sourceMagnet;
        d = this.paper.options.linkConnectionPoint(this, l, m, e)
      } else d = g.rect(f).intersectionWithLineFromCenterToPoint(e), d = d || g.rect(f).center()
    }
    return d
  },
  _isModel: function(a) {
    return a && a.id
  },
  _isPoint: function(a) {
    return !this._isModel(a)
  },
  _makeSelector: function(a) {
    var b = '[model-id="' + a.id + '"]';
    return a.port ? b += ' [port="' + a.port + '"]' : a.selector && (b += " " + a.selector), b
  },
  getConnectionLength: function() {
    return this._V.connection.node.getTotalLength()
  },
  getPointAtLength: function(a) {
    return this._V.connection.node.getPointAtLength(a)
  },
  _beforeArrowheadMove: function() {
    this.model.trigger("batch:start"), this._z = this.model.get("z"), this.model.set("z", Number.MAX_VALUE), this.el.style.pointerEvents = "none", this.paper.options.markAvailable && this._markAvailableMagnets()
  },
  _afterArrowheadMove: function() {
    this._z && (this.model.set("z", this._z), delete this._z), this.el.style.pointerEvents = "visiblePainted", this.paper.options.markAvailable && this._unmarkAvailableMagnets(), this.model.trigger("batch:stop")
  },
  _createValidateConnectionArgs: function(a) {
    function b(a, b) {
      return c[f] = a, c[f + 1] = a.el === b ? void 0 : b, c
    }
    var c = [];
    c[4] = a, c[5] = this;
    var d, e = 0,
      f = 0;
    "source" === a ? (e = 2, d = "target") : (f = 2, d = "source");
    var g = this.model.get(d);
    return g.id && (c[e] = this.paper.findViewByModel(g.id), c[e + 1] = g.selector && c[e].el.querySelector(g.selector)), b
  },
  _markAvailableMagnets: function() {
    var a = this.paper.model.getElements(),
      b = this.paper.options.validateConnection;
    _.chain(a).map(this.paper.findViewByModel, this.paper).each(function(a) {
      var c = "false" !== a.el.getAttribute("magnet") && b.apply(this.paper, this._validateConnectionArgs(a, null)),
        d = _.filter(a.el.querySelectorAll("[magnet]"), function(c) {
          return b.apply(this.paper, this._validateConnectionArgs(a, c))
        }, this);
      c && V(a.el).addClass("available-magnet"), _.each(d, function(a) {
        V(a).addClass("available-magnet")
      }), (c || d.length) && V(a.el).addClass("available-cell")
    }, this)
  },
  _unmarkAvailableMagnets: function() {
    _.each(this.paper.el.querySelectorAll(".available-cell, .available-magnet"), function(a) {
      V(a).removeClass("available-magnet").removeClass("available-cell")
    })
  },
  startArrowheadMove: function(a) {
    this._action = "arrowhead-move", this._arrowhead = a, this._validateConnectionArgs = this._createValidateConnectionArgs(this._arrowhead), this._beforeArrowheadMove()
  },
  pointerdown: function(a, b, c) {
    function d(a) {
      return _.isObject(e) && e[a] === !1 ? !1 : !0
    }
    joint.dia.CellView.prototype.pointerdown.apply(this, arguments), this._dx = b, this._dy = c;
    var e = _.isFunction(this.options.interactive) ? this.options.interactive(this, "pointerdown") : this.options.interactive;
    if (e !== !1) {
      var f = a.target.getAttribute("class");
      switch (f) {
        case "marker-vertex":
          d("vertexMove") && (this._action = "vertex-move", this._vertexIdx = a.target.getAttribute("idx"));
          break;
        case "marker-vertex-remove":
        case "marker-vertex-remove-area":
          d("vertexRemove") && this.removeVertex(a.target.getAttribute("idx"));
          break;
        case "marker-arrowhead":
          d("arrowheadMove") && this.startArrowheadMove(a.target.getAttribute("end"));
          break;
        default:
          var g = a.target.parentNode.getAttribute("event");
          g ? "remove" === g ? this.model.remove() : this.paper.trigger(g, a, this, b, c) : d("vertexAdd") && (this._vertexIdx = this.addVertex({
            x: b,
            y: c
          }), this._action = "vertex-move")
      }
      this.paper.trigger("link:pointerdown", a, this, b, c)
    }
  },
  pointermove: function(a, b, c) {
    switch (joint.dia.CellView.prototype.pointermove.apply(this, arguments), this._action) {
      case "vertex-move":
        var d = _.clone(this.model.get("vertices"));
        d[this._vertexIdx] = {
          x: b,
          y: c
        }, this.model.set("vertices", d);
        break;
      case "arrowhead-move":
        if (this.paper.options.snapLinks) {
          var e = this.paper.options.snapLinks.radius || 50,
            f = this.paper.findViewsInArea({
              x: b - e,
              y: c - e,
              width: 2 * e,
              height: 2 * e
            });
          this._closestView && this._closestView.unhighlight(this._closestEnd.selector), this._closestView = this._closestEnd = null;
          var h, i = g.point(b, c),
            j = Number.MAX_VALUE;
          _.each(f, function(a) {
            "false" !== a.el.getAttribute("magnet") && (h = a.model.getBBox().center().distance(i), e > h && j > h && this.paper.options.validateConnection.apply(this.paper, this._validateConnectionArgs(a, null)) && (j = h, this._closestView = a, this._closestEnd = {
              id: a.model.id
            })), a.$("[magnet]").each(_.bind(function(b, c) {
              var d = V(c).bbox(!1, this.paper.viewport);
              h = i.distance({
                x: d.x + d.width / 2,
                y: d.y + d.height / 2
              }), e > h && j > h && this.paper.options.validateConnection.apply(this.paper, this._validateConnectionArgs(a, c)) && (j = h, this._closestView = a, this._closestEnd = {
                id: a.model.id,
                selector: a.getSelector(c),
                port: c.getAttribute("port")
              })
            }, this))
          }, this), this._closestView && this._closestView.highlight(this._closestEnd.selector), this.model.set(this._arrowhead, this._closestEnd || {
            x: b,
            y: c
          })
        } else {
          var k = "mousemove" === a.type ? a.target : document.elementFromPoint(a.clientX, a.clientY);
          this._targetEvent !== k && (this._magnetUnderPointer && this._viewUnderPointer.unhighlight(this._magnetUnderPointer), this._viewUnderPointer = this.paper.findView(k), this._viewUnderPointer ? (this._magnetUnderPointer = this._viewUnderPointer.findMagnet(k), this._magnetUnderPointer && this.paper.options.validateConnection.apply(this.paper, this._validateConnectionArgs(this._viewUnderPointer, this._magnetUnderPointer)) ? this._magnetUnderPointer && this._viewUnderPointer.highlight(this._magnetUnderPointer) : this._magnetUnderPointer = null) : this._magnetUnderPointer = null), this._targetEvent = k, this.model.set(this._arrowhead, {
            x: b,
            y: c
          })
        }
    }
    this._dx = b, this._dy = c
  },
  pointerup: function() {
    joint.dia.CellView.prototype.pointerup.apply(this, arguments), "arrowhead-move" === this._action && (this.paper.options.snapLinks ? (this._closestView && this._closestView.unhighlight(this._closestEnd.selector), this._closestView = this._closestEnd = null) : (this._magnetUnderPointer && (this._viewUnderPointer.unhighlight(this._magnetUnderPointer), this.model.set(this._arrowhead, {
      id: this._viewUnderPointer.model.id,
      selector: this._viewUnderPointer.getSelector(this._magnetUnderPointer),
      port: $(this._magnetUnderPointer).attr("port")
    })), delete this._viewUnderPointer, delete this._magnetUnderPointer, delete this._staticView, delete this._staticMagnet), this._afterArrowheadMove()), delete this._action
  }
}), "object" == typeof exports && (module.exports.Link = joint.dia.Link, module.exports.LinkView = joint.dia.LinkView), joint.dia.Paper = Backbone.View.extend({
  className: "paper",
  options: {
    width: 800,
    height: 600,
    origin: {
      x: 0,
      y: 0
    },
    gridSize: 50,
    perpendicularLinks: !1,
    elementView: joint.dia.ElementView,
    linkView: joint.dia.LinkView,
    snapLinks: !1,
    markAvailable: !1,
    defaultLink: new joint.dia.Link,
    validateMagnet: function(a, b) {
      return "passive" !== b.getAttribute("magnet")
    },
    validateConnection: function(a, b, c, d, e) {
      return ("target" === e ? c : a) instanceof joint.dia.ElementView
    }
  },
  events: {
    mousedown: "pointerdown",
    dblclick: "mousedblclick",
    click: "mouseclick",
    touchstart: "pointerdown",
    mousemove: "pointermove",
    touchmove: "pointermove"
  },
  constructor: function(a) {
    this._configure(a), Backbone.View.apply(this, arguments)
  },
  _configure: function(a) {
    this.options && (a = _.extend({}, _.result(this, "options"), a)), this.options = a
  },
  initialize: function() {
    _.bindAll(this, "addCell", "sortCells", "resetCells", "pointerup", "asyncRenderCells"), this.svg = V("svg").node, this.viewport = V("g").node, V(this.svg).append(V("defs").node), V(this.viewport).attr({
      "class": "viewport"
    }), V(this.svg).append(this.viewport), this.$el.append(this.svg), this.setOrigin(), this.setDimensions(), this.listenTo(this.model, "add", this.onAddCell), this.listenTo(this.model, "reset", this.resetCells), this.listenTo(this.model, "sort", this.sortCells), $(document).on("mouseup touchend", this.pointerup), this._mousemoved = !1
  },
  remove: function() {
    $(document).off("mouseup touchend", this.pointerup), Backbone.View.prototype.remove.call(this)
  },
  setDimensions: function(a, b) {
    a = this.options.width = a || this.options.width, b = this.options.height = b || this.options.height, V(this.svg).attr({
      width: a,
      height: b
    }), this.trigger("resize", a, b)
  },
  setOrigin: function(a, b) {
    this.options.origin.x = a || 0, this.options.origin.y = b || 0, V(this.viewport).translate(a, b, {
      absolute: !0
    }), this.trigger("translate", a, b)
  },
  fitToContent: function(a, b, c, d) {
    _.isObject(a) ? (d = a, a = d.gridWidth || 1, b = d.gridHeight || 1, c = d.padding || 0) : (d = d || {}, a = a || 1, b = b || 1, c = c || 0);
    var e = V(this.viewport).bbox(!0, this.svg),
      f = V(this.viewport).scale();
    e.x *= f.sx, e.y *= f.sy, e.width *= f.sx, e.height *= f.sy;
    var g = Math.max(Math.ceil((e.width + e.x) / a), 1) * a,
      h = Math.max(Math.ceil((e.height + e.y) / b), 1) * b,
      i = 0,
      j = 0;
    ("negative" == d.allowNewOrigin && e.x < 0 || "positive" == d.allowNewOrigin && e.x >= 0 || "any" == d.allowNewOrigin) && (i = Math.ceil(-e.x / a) * a, i += c, g += i), ("negative" == d.allowNewOrigin && e.y < 0 || "positive" == d.allowNewOrigin && e.y >= 0 || "any" == d.allowNewOrigin) && (j = Math.ceil(-e.y / b) * b, j += c, h += j), g += c, h += c;
    var k = g != this.options.width || h != this.options.height,
      l = i != this.options.origin.x || j != this.options.origin.y;
    l && this.setOrigin(i, j), k && this.setDimensions(g, h)
  },
  scaleContentToFit: function(a) {
    var b = this.getContentBBox();
    if (b.width && b.height) {
      a = a || {}, _.defaults(a, {
        padding: 0,
        preserveAspectRatio: !0,
        scaleGrid: null,
        minScale: 0,
        maxScale: Number.MAX_VALUE
      });
      var c = a.padding,
        d = a.minScaleX || a.minScale,
        e = a.maxScaleX || a.maxScale,
        f = a.minScaleY || a.minScale,
        h = a.maxScaleY || a.maxScale,
        i = a.fittingBBox || {
          x: this.options.origin.x,
          y: this.options.origin.y,
          width: this.options.width,
          height: this.options.height
        };
      i = g.rect(i).moveAndExpand({
        x: c,
        y: c,
        width: -2 * c,
        height: -2 * c
      });
      var j = V(this.viewport).scale(),
        k = i.width / b.width * j.sx,
        l = i.height / b.height * j.sy;
      if (a.preserveAspectRatio && (k = l = Math.min(k, l)), a.scaleGrid) {
        var m = a.scaleGrid;
        k = m * Math.floor(k / m), l = m * Math.floor(l / m)
      }
      k = Math.min(e, Math.max(d, k)), l = Math.min(h, Math.max(f, l)), this.scale(k, l);
      var n = this.getContentBBox(),
        o = i.x - n.x,
        p = i.y - n.y;
      this.setOrigin(o, p)
    }
  },
  getContentBBox: function() {
    var a = this.viewport.getBoundingClientRect(),
      b = this.viewport.getScreenCTM(),
      c = this.viewport.getCTM(),
      d = g.rect({
        x: a.left - b.e + c.e,
        y: a.top - b.f + c.f,
        width: a.width,
        height: a.height
      });
    return d
  },
  createViewForModel: function(a) {
    var b, c = a.get("type"),
      d = c.split(".")[0],
      e = c.split(".")[1];
    return b = joint.shapes[d] && joint.shapes[d][e + "View"] ? new joint.shapes[d][e + "View"]({
      model: a,
      interactive: this.options.interactive
    }) : a instanceof joint.dia.Element ? new this.options.elementView({
      model: a,
      interactive: this.options.interactive
    }) : new this.options.linkView({
      model: a,
      interactive: this.options.interactive
    })
  },
  onAddCell: function(a, b, c) {
    if (this.options.async && c.async !== !1 && _.isNumber(c.position)) {
      if (this._asyncCells = this._asyncCells || [], this._asyncCells.push(a), 0 == c.position) {
        if (this._frameId) throw "another asynchronous rendering in progress";
        this.asyncRenderCells(this._asyncCells), delete this._asyncCells
      }
    } else this.addCell(a)
  },
  addCell: function(a) {
    var b = this.createViewForModel(a);
    V(this.viewport).append(b.el), b.paper = this, b.render(), $(b.el).find("image").on("dragstart", function() {
      return !1
    })
  },
  resetCells: function(a) {
    $(this.viewport).empty();
    var b = a.models.slice();
    b.sort(function(a) {
      return a instanceof joint.dia.Link ? 1 : -1
    }), this._frameId && (joint.util.cancelFrame(this._frameId), delete this._frameId), this.options.async ? this.asyncRenderCells(b) : (_.each(b, this.addCell, this), this.sortCells())
  },
  asyncRenderCells: function(a) {
    var b = !1;
    this._frameId && _.each(_.range(this.options.async && this.options.async.batchSize || 50), function() {
      var c = a.shift();
      b = !c, b || this.addCell(c)
    }, this), b ? (delete this._frameId, this.sortCells(), this.trigger("render:done")) : this._frameId = joint.util.nextFrame(_.bind(function() {
      this.asyncRenderCells(a)
    }, this))
  },
  sortCells: function() {
    var a = $(this.viewport).children("[model-id]"),
      b = this.model.get("cells");
    this.sortElements(a, function(a, c) {
      var d = b.get($(a).attr("model-id")),
        e = b.get($(c).attr("model-id"));
      return (d.get("z") || 0) > (e.get("z") || 0) ? 1 : -1
    })
  },
  sortElements: function(a, b) {
    var c = $(a),
      d = c.map(function() {
        var a = this,
          b = a.parentNode,
          c = b.insertBefore(document.createTextNode(""), a.nextSibling);
        return function() {
          if (b === this) throw new Error("You can't sort elements if any one is a descendant of another.");
          b.insertBefore(this, c), b.removeChild(c)
        }
      });
    return Array.prototype.sort.call(c, b).each(function(a) {
      d[a].call(this)
    })
  },
  scale: function(a, b, c, d) {
    b = b || a, _.isUndefined(c) && (c = 0, d = 0), V(this.viewport).attr("transform", "");
    var e = this.options.origin.x,
      f = this.options.origin.y;
    if (c || d || e || f) {
      var g = e - c * (a - 1),
        h = f - d * (b - 1);
      this.setOrigin(g, h)
    }
    return V(this.viewport).scale(a, b), this.trigger("scale", a, b, c, d), this
  },
  rotate: function(a, b, c) {
    if (_.isUndefined(b)) {
      var d = this.viewport.getBBox();
      b = d.width / 2, c = d.height / 2
    }
    V(this.viewport).rotate(a, b, c)
  },
  findView: function(a) {
    var b = this.$(a);
    return 0 === b.length || b[0] === this.el ? void 0 : b.data("view") ? b.data("view") : this.findView(b.parent())
  },
  findViewByModel: function(a) {
    var b = _.isString(a) ? a : a.id,
      c = this.$('[model-id="' + b + '"]');
    return c.length ? c.data("view") : void 0
  },
  findViewsFromPoint: function(a) {
    a = g.point(a);
    var b = _.map(this.model.getElements(), this.findViewByModel);
    return _.filter(b, function(b) {
      return g.rect(V(b.el).bbox(!1, this.viewport)).containsPoint(a)
    }, this)
  },
  findViewsInArea: function(a) {
    a = g.rect(a);
    var b = _.map(this.model.getElements(), this.findViewByModel);
    return _.filter(b, function(b) {
      return a.intersect(g.rect(V(b.el).bbox(!1, this.viewport)))
    }, this)
  },
  getModelById: function(a) {
    return this.model.getCell(a)
  },
  snapToGrid: function(a) {
    var b = V(this.viewport).toLocalPoint(a.x, a.y);
    return {
      x: g.snapToGrid(b.x, this.options.gridSize),
      y: g.snapToGrid(b.y, this.options.gridSize)
    }
  },
  getDefaultLink: function(a, b) {
    return _.isFunction(this.options.defaultLink) ? this.options.defaultLink.call(this, a, b) : this.options.defaultLink.clone()
  },
  mousedblclick: function(a) {
    a.preventDefault(), a = joint.util.normalizeEvent(a);
    var b = this.findView(a.target),
      c = this.snapToGrid({
        x: a.clientX,
        y: a.clientY
      });
    b ? b.pointerdblclick(a, c.x, c.y) : this.trigger("blank:pointerdblclick", a, c.x, c.y)
  },
  mouseclick: function(a) {
    if (!this._mousemoved) {
      a = joint.util.normalizeEvent(a);
      var b = this.findView(a.target),
        c = this.snapToGrid({
          x: a.clientX,
          y: a.clientY
        });
      b ? b.pointerclick(a, c.x, c.y) : this.trigger("blank:pointerclick", a, c.x, c.y)
    }
    this._mousemoved = !1
  },
  pointerdown: function(a) {
    a = joint.util.normalizeEvent(a);
    var b = this.findView(a.target),
      c = this.snapToGrid({
        x: a.clientX,
        y: a.clientY
      });
    b ? (this.sourceView = b, b.pointerdown(a, c.x, c.y)) : this.trigger("blank:pointerdown", a, c.x, c.y)
  },
  pointermove: function(a) {
    if (a.preventDefault(), a = joint.util.normalizeEvent(a), this.sourceView) {
      this._mousemoved = !0;
      var b = this.snapToGrid({
        x: a.clientX,
        y: a.clientY
      });
      this.sourceView.pointermove(a, b.x, b.y)
    }
  },
  pointerup: function(a) {
    a = joint.util.normalizeEvent(a);
    var b = this.snapToGrid({
      x: a.clientX,
      y: a.clientY
    });
    this.sourceView ? (this.sourceView.pointerup(a, b.x, b.y), this.sourceView = null) : this.trigger("blank:pointerup", a, b.x, b.y)
  }
}), "object" == typeof exports) var joint = {
    util: require("../src/core").util,
    shapes: {},
    dia: {
      Element: require("../src/joint.dia.element").Element,
      ElementView: require("../src/joint.dia.element").ElementView
    }
  },
  _ = require("lodash");
joint.shapes.basic = {}, joint.shapes.basic.Generic = joint.dia.Element.extend({
  defaults: joint.util.deepSupplement({
    type: "basic.Generic",
    attrs: {
      ".": {
        fill: "#FFFFFF",
        stroke: "none"
      }
    }
  }, joint.dia.Element.prototype.defaults)
}), joint.shapes.basic.Rect = joint.shapes.basic.Generic.extend({
  markup: '<g class="rotatable"><g class="scalable"><rect/></g><text/></g>',
  defaults: joint.util.deepSupplement({
    type: "basic.Rect",
    attrs: {
      rect: {
        fill: "#FFFFFF",
        stroke: "black",
        width: 100,
        height: 60
      },
      text: {
        "font-size": 14,
        text: "",
        "ref-x": .5,
        "ref-y": .5,
        ref: "rect",
        "y-alignment": "middle",
        "x-alignment": "middle",
        fill: "black",
        "font-family": "Arial, helvetica, sans-serif"
      }
    }
  }, joint.shapes.basic.Generic.prototype.defaults)
}), joint.shapes.basic.Text = joint.shapes.basic.Generic.extend({
  markup: '<g class="rotatable"><g class="scalable"><text/></g></g>',
  defaults: joint.util.deepSupplement({
    type: "basic.Text",
    attrs: {
      text: {
        "font-size": 18,
        fill: "black"
      }
    }
  }, joint.shapes.basic.Generic.prototype.defaults)
}), joint.shapes.basic.Circle = joint.shapes.basic.Generic.extend({
  markup: '<g class="rotatable"><g class="scalable"><circle/></g><text/></g>',
  defaults: joint.util.deepSupplement({
    type: "basic.Circle",
    size: {
      width: 60,
      height: 60
    },
    attrs: {
      circle: {
        fill: "#FFFFFF",
        stroke: "black",
        r: 30,
        transform: "translate(30, 30)"
      },
      text: {
        "font-size": 14,
        text: "",
        "text-anchor": "middle",
        "ref-x": .5,
        "ref-y": .5,
        ref: "circle",
        "y-alignment": "middle",
        fill: "black",
        "font-family": "Arial, helvetica, sans-serif"
      }
    }
  }, joint.shapes.basic.Generic.prototype.defaults)
}), joint.shapes.basic.Image = joint.shapes.basic.Generic.extend({
  markup: '<g class="rotatable"><g class="scalable"><image/></g><text/></g>',
  defaults: joint.util.deepSupplement({
    type: "basic.Image",
    attrs: {
      text: {
        "font-size": 14,
        text: "",
        "text-anchor": "middle",
        "ref-x": .5,
        "ref-dy": 20,
        ref: "image",
        "y-alignment": "middle",
        fill: "black",
        "font-family": "Arial, helvetica, sans-serif"
      }
    }
  }, joint.shapes.basic.Generic.prototype.defaults)
}), joint.shapes.basic.Path = joint.shapes.basic.Generic.extend({
  markup: '<g class="rotatable"><g class="scalable"><path/></g><text/></g>',
  defaults: joint.util.deepSupplement({
    type: "basic.Path",
    size: {
      width: 60,
      height: 60
    },
    attrs: {
      path: {
        fill: "#FFFFFF",
        stroke: "black"
      },
      text: {
        "font-size": 14,
        text: "",
        "text-anchor": "middle",
        "ref-x": .5,
        "ref-dy": 20,
        ref: "path",
        "y-alignment": "middle",
        fill: "black",
        "font-family": "Arial, helvetica, sans-serif"
      }
    }
  }, joint.shapes.basic.Generic.prototype.defaults)
}), joint.shapes.basic.Rhombus = joint.shapes.basic.Path.extend({
  defaults: joint.util.deepSupplement({
    type: "basic.Rhombus",
    attrs: {
      path: {
        d: "M 30 0 L 60 30 30 60 0 30 z"
      },
      text: {
        "ref-y": .5
      }
    }
  }, joint.shapes.basic.Path.prototype.defaults)
}), joint.shapes.basic.PortsModelInterface = {
  initialize: function() {
    this.updatePortsAttrs(), this.on("change:inPorts change:outPorts", this.updatePortsAttrs, this), this.constructor.__super__.constructor.__super__.initialize.apply(this, arguments)
  },
  updatePortsAttrs: function() {
    var a = this.get("attrs");
    _.each(this._portSelectors, function(b) {
      a[b] && delete a[b]
    }), this._portSelectors = [];
    var b = {};
    _.each(this.get("inPorts"), function(a, c, d) {
      var e = this.getPortAttrs(a, c, d.length, ".inPorts", "in");
      this._portSelectors = this._portSelectors.concat(_.keys(e)), _.extend(b, e)
    }, this), _.each(this.get("outPorts"), function(a, c, d) {
      var e = this.getPortAttrs(a, c, d.length, ".outPorts", "out");
      this._portSelectors = this._portSelectors.concat(_.keys(e)), _.extend(b, e)
    }, this), this.attr(b, {
      silent: !0
    }), this.processPorts(), this.trigger("process:ports")
  },
  getPortSelector: function(a) {
    var b = ".inPorts",
      c = this.get("inPorts").indexOf(a);
    if (0 > c && (b = ".outPorts", c = this.get("outPorts").indexOf(a), 0 > c)) throw new Error("getPortSelector(): Port doesn't exist.");
    return b + ">g:nth-child(" + (c + 1) + ")>circle"
  }
}, joint.shapes.basic.PortsViewInterface = {
  initialize: function() {
    this.listenTo(this.model, "process:ports", this.update), joint.dia.ElementView.prototype.initialize.apply(this, arguments)
  },
  update: function() {
    this.renderPorts(), joint.dia.ElementView.prototype.update.apply(this, arguments)
  },
  renderPorts: function() {
    var a = this.$(".inPorts").empty(),
      b = this.$(".outPorts").empty(),
      c = _.template(this.model.portMarkup);
    _.each(_.filter(this.model.ports, function(a) {
      return "in" === a.type
    }), function(b, d) {
      a.append(V(c({
        id: d,
        port: b
      })).node)
    }), _.each(_.filter(this.model.ports, function(a) {
      return "out" === a.type
    }), function(a, d) {
      b.append(V(c({
        id: d,
        port: a
      })).node)
    })
  }
}, joint.shapes.basic.TextBlock = joint.shapes.basic.Generic.extend({
  markup: ['<g class="rotatable"><g class="scalable"><rect/></g><switch>', '<foreignObject requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" class="fobj">', '<body xmlns="http://www.w3.org/1999/xhtml"><div/></body>', "</foreignObject>", '<text class="content"/>', "</switch></g>"].join(""),
  defaults: joint.util.deepSupplement({
    type: "basic.TextBlock",
    attrs: {
      rect: {
        fill: "#ffffff",
        stroke: "#000000",
        width: 80,
        height: 100
      },
      text: {
        fill: "#000000",
        "font-size": 14,
        "font-family": "Arial, helvetica, sans-serif"
      },
      ".content": {
        text: "",
        ref: "rect",
        "ref-x": .5,
        "ref-y": .5,
        "y-alignment": "middle",
        "x-alignment": "middle"
      }
    },
    content: ""
  }, joint.shapes.basic.Generic.prototype.defaults),
  initialize: function() {
    "undefined" != typeof SVGForeignObjectElement && (this.setForeignObjectSize(this, this.get("size")), this.setDivContent(this, this.get("content")), this.listenTo(this, "change:size", this.setForeignObjectSize), this.listenTo(this, "change:content", this.setDivContent)), joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments)
  },
  setForeignObjectSize: function(a, b) {
    a.attr({
      ".fobj": _.clone(b),
      div: {
        style: _.clone(b)
      }
    })
  },
  setDivContent: function(a, b) {
    a.attr({
      div: {
        html: b
      }
    })
  }
}), joint.shapes.basic.TextBlockView = joint.dia.ElementView.extend({
  initialize: function() {
    joint.dia.ElementView.prototype.initialize.apply(this, arguments), "undefined" == typeof SVGForeignObjectElement && (this.noSVGForeignObjectElement = !0, this.listenTo(this.model, "change:content", function(a) {
      this.updateContent(a)
    }))
  },
  update: function(a, b) {
    if (this.noSVGForeignObjectElement) {
      var c = this.model,
        d = _.omit(b || c.get("attrs"), ".content");
      joint.dia.ElementView.prototype.update.call(this, c, d), (!b || _.has(b, ".content")) && this.updateContent(c, b)
    } else joint.dia.ElementView.prototype.update.call(this, c, b)
  },
  updateContent: function(a, b) {
    var c = _.merge({}, (b || a.get("attrs"))[".content"]);
    delete c.text;
    var d = joint.util.breakText(a.get("content"), a.get("size"), c, {
        svgDocument: this.paper.svg
      }),
      e = joint.util.setByPath({}, ".content", c, "/");
    e[".content"].text = d, joint.dia.ElementView.prototype.update.call(this, a, e)
  }
}), "object" == typeof exports && (module.exports = joint.shapes.basic), joint.routers.orthogonal = function() {
  function a(a, b) {
    return a.y < b.y && a.x === b.x ? "down" : a.y > b.y && a.x === b.x ? "up" : a.x < b.x && a.y === b.y ? "right" : "left"
  }

  function b(a, b, c) {
    var d;
    if (d = a.x < b.x ? a.y > b.y ? ["up", "right"] : a.y < b.y ? ["down", "right"] : ["right"] : a.x > b.x ? a.y > b.y ? ["up", "left"] : a.y < b.y ? ["down", "left"] : ["left"] : a.y > b.y ? ["up"] : ["down"], _.contains(d, c)) return c;
    var e = _.first(d);
    switch (c) {
      case "down":
        if ("up" === e) return _.last(d);
        break;
      case "up":
        if ("down" === e) return _.last(d);
        break;
      case "left":
        if ("right" === e) return _.last(d);
        break;
      case "right":
        if ("left" === e) return _.last(d)
    }
    return e
  }

  function c(a, c, d) {
    var e = b(a, c, d);
    return "down" === e || "up" === e ? {
      x: a.x,
      y: c.y,
      d: e
    } : {
      x: c.x,
      y: a.y,
      d: e
    }
  }

  function d(b) {
    b = (b || []).slice();
    var d = [],
      h = e.center(),
      i = f.center();
    b.length || (Math.abs(h.x - i.x) < e.width / 2 || Math.abs(h.y - i.y) < e.height / 2) && (b = [{
      x: Math.min(h.x, i.x) + Math.abs(h.x - i.x) / 2,
      y: Math.min(h.y, i.y) + Math.abs(h.y - i.y) / 2
    }]), b.unshift(h), b.push(i);
    for (var j, k, l, m, n = 0; n < b.length - 1; n++) {
      l = b[n], m = b[n + 1], k = _.last(d), n > 0 && (j = l, j.d = k ? a(k, l) : "top", d.push(j), k = j);
      var o = k && k.d;
      j = c(l, m, o), g.point(j).equals(g.point(l)) || g.point(j).equals(g.point(m)) || d.push(j)
    }
    return d
  }
  var e, f;
  return function(a) {
    return e = this.sourceBBox, f = this.targetBBox, d(a)
  }
}(), joint.routers.manhattan = function() {
  "use strict";

  function a(a, b) {
    for (var c, d = [], e = {
      x: 0,
      y: 0
    }, f = b; c = a[f];) {
      var g = c.difference(f);
      g.equals(e) || (d.unshift(f), e = g), f = c
    }
    return d.unshift(f), d
  }

  function b(a, b, c) {
    var d = c.step,
      e = a.center(),
      f = _.chain(c.directionMap).pick(b).map(function(b) {
        var c = b.x * a.width / 2,
          f = b.y * a.height / 2,
          h = g.point(e).offset(c, f).snapToGrid(d);
        return a.containsPoint(h) && h.offset(b.x * d, b.y * d), h
      }).value();
    return f
  }

  function c(a, b, c) {
    var d = 360 / c,
      e = Math.floor(a.theta(b) / d);
    return c - e
  }

  function d(d, e, f, h) {
    var i = h.reversed ? h.endDirections : h.startDirections,
      j = h.reversed ? h.startDirections : h.endDirections,
      k = d instanceof g.rect ? b(d, i, h) : [d],
      l = e instanceof g.rect ? b(e, j, h) : [e],
      m = k.length > 1 ? d.center() : k[0],
      n = l.length > 1 ? e.center() : l[0],
      o = _.filter(l, function(a) {
        var b = g.point(a).snapToGrid(h.mapGridSize).toString(),
          c = _.every(f[b], function(b) {
            return !b.containsPoint(a)
          });
        return c
      });
    if (o.length)
      for (var p = h.step, q = h.penalties, r = _.chain(o).invoke("snapToGrid", p).min(function(a) {
        return h.estimateCost(m, a)
      }).value(), s = {}, t = {}, u = {}, v = h.directions, w = v.length, x = w / 2, y = h.previousDirIndexes || {}, z = {}, A = {}, B = _.chain(k).invoke("snapToGrid", p).each(function(a) {
        var b = a.toString();
        t[b] = 0, u[b] = h.estimateCost(a, r), y[b] = y[b] || c(m, a, w), A[b] = !0
      }).map(function(a) {
        return a.toString()
      }).sortBy(function(a) {
        return u[a]
      }).value(), C = h.maximumLoops, D = h.maxAllowedDirectionChange; B.length && C--;) {
        var E = B[0],
          F = g.point(E);
        if (r.equals(F)) return h.previousDirIndexes = _.pick(y, E), a(s, F);
        B.splice(0, 1), A[M] = null, z[M] = !0;
        for (var G = y[E], H = t[E], I = 0; w > I; I++) {
          var J = Math.abs(I - G);
          if (J > x && (J = w - J), !(J > D)) {
            var K = v[I],
              L = g.point(F).offset(K.offsetX, K.offsetY),
              M = L.toString();
            if (!z[M]) {
              var N = g.point(L).snapToGrid(h.mapGridSize).toString(),
                O = _.every(f[N], function(a) {
                  return !a.containsPoint(L)
                });
              if (O) {
                var P = _.has(A, M),
                  Q = H + K.cost;
                if ((!P || Q < t[M]) && (s[M] = F, y[M] = I, t[M] = Q, u[M] = Q + h.estimateCost(L, r) + q[J], !P)) {
                  var R = _.sortedIndex(B, M, function(a) {
                    return u[a]
                  });
                  B.splice(R, 0, M), A[M] = !0
                }
              }
            }
          }
        }
      }
    return h.fallbackRoute(m, n, h)
  }

  function e(a, b) {
    b.directions = _.result(b, "directions"), b.penalties = _.result(b, "penalties"), b.paddingBox = _.result(b, "paddingBox"), this.options.perpendicular = !!b.perpendicular;
    var c = b.reversed = "source" === this.lastEndChange,
      e = c ? g.rect(this.targetBBox) : g.rect(this.sourceBBox),
      f = c ? g.rect(this.sourceBBox) : g.rect(this.targetBBox);
    e.moveAndExpand(b.paddingBox), f.moveAndExpand(b.paddingBox);
    for (var h = this.model, i = this.paper.model, j = _.chain(b.excludeEnds).map(h.get, h).pluck("id").map(i.getCell, i).value(), k = b.mapGridSize, l = _.chain(i.getElements()).difference(j).reject(function(a) {
      return _.contains(b.excludeTypes, a.get("type"))
    }).invoke("getBBox").invoke("moveAndExpand", b.paddingBox).foldl(function(a, b) {
      for (var c = b.origin().snapToGrid(k), d = b.corner().snapToGrid(k), e = c.x; e <= d.x; e += k)
        for (var f = c.y; f <= d.y; f += k) {
          var g = e + "@" + f;
          a[g] = a[g] || [], a[g].push(b)
        }
      return a
    }, {}).value(), m = [], n = _.map(a, g.point), o = e.center(), p = 0, q = n.length; q >= p; p++) {
      var r = null,
        s = t || e,
        t = n[p];
      if (!t) {
        t = f;
        var u = !this.model.get("source").id || !this.model.get("target").id;
        if (u && _.isFunction(b.draggingRoute)) {
          var v = s instanceof g.rect ? s.center() : s;
          r = b.draggingRoute(v, t.origin(), b)
        }
      }
      r = r || d(s, t, l, b);
      var w = _.first(r);
      w && w.equals(o) && r.shift(), o = _.last(r) || o, m = m.concat(r)
    }
    return c ? m.reverse() : m
  }
  var f = {
    step: 10,
    perpendicular: !0,
    mapGridSize: 100,
    excludeEnds: [],
    excludeTypes: ["basic.Text"],
    maximumLoops: 500,
    startDirections: ["left", "right", "top", "bottom"],
    endDirections: ["left", "right", "top", "bottom"],
    directionMap: {
      right: {
        x: 1,
        y: 0
      },
      bottom: {
        x: 0,
        y: 1
      },
      left: {
        x: -1,
        y: 0
      },
      top: {
        x: 0,
        y: -1
      }
    },
    maxAllowedDirectionChange: 1,
    paddingBox: function() {
      var a = this.step;
      return {
        x: -a,
        y: -a,
        width: 2 * a,
        height: 2 * a
      }
    },
    directions: function() {
      var a = this.step;
      return [{
        offsetX: a,
        offsetY: 0,
        cost: a
      }, {
        offsetX: 0,
        offsetY: a,
        cost: a
      }, {
        offsetX: -a,
        offsetY: 0,
        cost: a
      }, {
        offsetX: 0,
        offsetY: -a,
        cost: a
      }]
    },
    penalties: function() {
      return [0, this.step / 2, this.step]
    },
    estimateCost: function(a, b) {
      return a.manhattanDistance(b)
    },
    fallbackRoute: function(a, b, c) {
      var d = c.prevDirIndexes || {},
        e = (d[a] || 0) % 2 ? g.point(a.x, b.y) : g.point(b.x, a.y);
      return [e, b]
    },
    draggingRoute: null
  };
  return function(a, b, c) {
    return e.call(c, a, _.extend({}, f, b))
  }
}(), joint.routers.metro = function() {
  if (!_.isFunction(joint.routers.manhattan)) throw "Metro requires the manhattan router.";
  var a = {
    diagonalCost: null,
    directions: function() {
      var a = this.step,
        b = this.diagonalCost || Math.ceil(Math.sqrt(a * a << 1));
      return [{
        offsetX: a,
        offsetY: 0,
        cost: a
      }, {
        offsetX: a,
        offsetY: a,
        cost: b
      }, {
        offsetX: 0,
        offsetY: a,
        cost: a
      }, {
        offsetX: -a,
        offsetY: a,
        cost: b
      }, {
        offsetX: -a,
        offsetY: 0,
        cost: a
      }, {
        offsetX: -a,
        offsetY: -a,
        cost: b
      }, {
        offsetX: 0,
        offsetY: -a,
        cost: a
      }, {
        offsetX: a,
        offsetY: -a,
        cost: b
      }]
    },
    fallbackRoute: function(a, b) {
      var c = a.theta(b),
        d = {
          x: b.x,
          y: a.y
        },
        e = {
          x: a.x,
          y: b.y
        };
      if (c % 180 > 90) {
        var f = d;
        d = e, e = f
      }
      var h = 45 > c % 90 ? d : e,
        i = g.line(a, h),
        j = 90 * Math.ceil(c / 90),
        k = g.point.fromPolar(i.squaredLength(), g.toRad(j + 135), h),
        l = g.line(b, k),
        m = i.intersection(l);
      return m ? [m.round(), b] : [b]
    }
  };
  return function(b, c, d) {
    return joint.routers.manhattan(b, _.extend({}, a, c), d)
  }
}(), joint.connectors.normal = function(a, b, c) {
  var d = ["M", a.x, a.y];
  return _.each(c, function(a) {
    d.push(a.x, a.y)
  }), d.push(b.x, b.y), d.join(" ")
}, joint.connectors.rounded = function(a, b, c, d) {
  var e, f, h, i, j, k, l = d.radius || 10,
    m = ["M", a.x, a.y];
  return _.each(c, function(d, n) {
    j = c[n - 1] || a, k = c[n + 1] || b, h = i || g.point(d).distance(j) / 2, i = g.point(d).distance(k) / 2, e = g.point(d).move(j, -Math.min(l, h)).round(), f = g.point(d).move(k, -Math.min(l, i)).round(), m.push(e.x, e.y, "S", d.x, d.y, f.x, f.y, "L")
  }), m.push(b.x, b.y), m.join(" ")
}, joint.connectors.smooth = function(a, b, c) {
  var d;
  if (c.length) d = g.bezier.curveThroughPoints([a].concat(c).concat([b]));
  else {
    var e = a.x < b.x ? b.x - (b.x - a.x) / 2 : a.x - (a.x - b.x) / 2;
    d = ["M", a.x, a.y, "C", e, a.y, e, b.y, b.x, b.y]
  }
  return d.join(" ")
};
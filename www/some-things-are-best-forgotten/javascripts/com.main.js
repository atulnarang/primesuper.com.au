/*!
* imagesLoaded PACKAGED v3.1.8
* JavaScript is all like "You images are done yet or what?"
* MIT License
*/

(function(){function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype,r=this,o=r.EventEmitter;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=o,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){function t(t){var n=e.event;return n.target=n.target||n.srcElement||t,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(e,t,n){e.addEventListener(t,n,!1)}:n.attachEvent&&(i=function(e,n,i){e[n+i]=i.handleEvent?function(){var n=t(e);i.handleEvent.call(i,n)}:function(){var n=t(e);i.call(e,n)},e.attachEvent("on"+n,e[n+i])});var r=function(){};n.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:n.detachEvent&&(r=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var o={bind:i,unbind:r};"function"==typeof define&&define.amd?define("eventie/eventie",o):e.eventie=o}(this),function(e,t){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){return t(e,n,i)}):"object"==typeof exports?module.exports=t(e,require("wolfy87-eventemitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)}(window,function(e,t,n){function i(e,t){for(var n in t)e[n]=t[n];return e}function r(e){return"[object Array]"===d.call(e)}function o(e){var t=[];if(r(e))t=e;else if("number"==typeof e.length)for(var n=0,i=e.length;i>n;n++)t.push(e[n]);else t.push(e);return t}function s(e,t,n){if(!(this instanceof s))return new s(e,t);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=o(e),this.options=i({},this.options),"function"==typeof t?n=t:i(this.options,t),n&&this.on("always",n),this.getImages(),a&&(this.jqDeferred=new a.Deferred);var r=this;setTimeout(function(){r.check()})}function f(e){this.img=e}function c(e){this.src=e,v[e]=this}var a=e.jQuery,u=e.console,h=u!==void 0,d=Object.prototype.toString;s.prototype=new t,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);var i=n.nodeType;if(i&&(1===i||9===i||11===i))for(var r=n.querySelectorAll("img"),o=0,s=r.length;s>o;o++){var f=r[o];this.addImage(f)}}},s.prototype.addImage=function(e){var t=new f(e);this.images.push(t)},s.prototype.check=function(){function e(e,r){return t.options.debug&&h&&u.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},s.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)})},s.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},a&&(a.fn.imagesLoaded=function(e,t){var n=new s(this,e,t);return n.jqDeferred.promise(a(this))}),f.prototype=new t,f.prototype.check=function(){var e=v[this.img.src]||new c(this.img.src);if(e.isConfirmed)return this.confirm(e.isLoaded,"cached was confirmed"),void 0;if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this;e.on("confirm",function(e,n){return t.confirm(e.isLoaded,n),!0}),e.check()},f.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("confirm",this,t)};var v={};return c.prototype=new t,c.prototype.check=function(){if(!this.isChecked){var e=new Image;n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src,this.isChecked=!0}},c.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},c.prototype.onload=function(e){this.confirm(!0,"onload"),this.unbindProxyEvents(e)},c.prototype.onerror=function(e){this.confirm(!1,"onerror"),this.unbindProxyEvents(e)},c.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},c.prototype.unbindProxyEvents=function(e){n.unbind(e.target,"load",this),n.unbind(e.target,"error",this)},s});



// CONSOLE LOG
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function() {
        log.history = log.history || [], log.history.push(arguments);
        if (this.console) {
            var t = arguments,
                n;
            t.callee = t.callee.caller, n = [].slice.call(t), typeof console.log == "object" ? log.apply.call(console.log, console, n) : console.log.apply(console, n)
        }
    },
    function(e) {
        function t() {}
        for (var n = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","), r; !!(r = n.pop());) e[r] = e[r] || t
    }(function() {
        try {
            return console.log(), window.console
        } catch (e) {
            return window.console = {}
        }
    }()), $.rmPlaceHolders = function() {
        if ("placeholder" in document.createElement("input")) return;
        $("input[placeholder]").each(function() {
            var e = $(this),
                t = e.attr("placeholder");
            e.val(t).addClass("rmPrompt"), e.on("focus", function() {
                $(this).val() == t && $(this).val("").removeClass("rmPrompt")
            }), e.on("blur", function() {
                $(this).val() == "" && $(this).val(t).addClass("rmPrompt")
            })
        })
    },
    function(e) {
        e.fn.rmAccordion = function(t) {
            var n = {
                    zebra: !1,
                    speed: 250
                },
                t = e.extend(n, t),
                r = this;
            r.addClass("rmAccordion"), t.zebra && e("li:nth-child(even)", r).addClass("zebra"), e("dd", r).css({
                display: "none"
            }), e("dt", r).delegate("a", "click", function(n) {
                n.preventDefault(), console.log("CLICK"), t.easing ? r.find("dd").slideUp({
                    duration: t.speed,
                    easing: t.easing
                }) : r.find("dd").slideUp({
                    duration: t.speed
                }), r.find("dd").attr("aria-expanded", "false");
                if (e(this).parent().data("open")) {
                    console.log("SLIDEUP"), e(this).parent().next().attr("aria-expanded", "false");
                    var i = e(this);
                    t.easing ? e(this).parent().data("open", !1).next().slideUp({
                        duration: t.speed,
                        easing: t.easing,
                        complete: function() {
                            i.parent().removeClass("itemOpen")
                        }
                    }) : e(this).parent().data("open", !1).next().slideUp({
                        duration: t.speed,
                        complete: function() {
                            i.parent().removeClass("itemOpen")
                        }
                    })
                } else console.log("SLIDEDOWN"), e(this).parent().next().attr("aria-expanded", "true"), e(".itemOpen", r).removeClass("itemOpen"), e("dt", r).data("open", !1), t.easing ? e(this).parent().data("open", !0).addClass("itemOpen").next().stop(!0, !0).slideDown({
                    duration: t.speed,
                    easing: t.easing
                }) : e(this).parent().data("open", !0).addClass("itemOpen").next().stop(!0, !0).slideDown({
                    duration: t.speed
                })
            })
        }
    }(jQuery),
    function(e, t, n) {
        e.fn.jScrollPane = function(r) {
            function i(r, i) {
                function K(t) {
                    var i, o, a, w, E, x, T = !1,
                        C = !1;
                    s = t;
                    if (u === n) E = r.scrollTop(), x = r.scrollLeft(), r.css({
                        overflow: "hidden",
                        padding: 0
                    }), f = r.innerWidth() + R, l = r.innerHeight(), r.width(f), u = e('<div class="jspPane" />').css("padding", q).append(r.children()), h = e('<div class="jspContainer" />').css({
                        width: f + "px",
                        height: l + "px"
                    }).append(u).appendTo(r);
                    else {
                        r.css("width", ""), T = s.stickToBottom && yt(), C = s.stickToRight && bt(), w = r.innerWidth() + R != f || r.outerHeight() != l, w && (f = r.innerWidth() + R, l = r.innerHeight(), h.css({
                            width: f + "px",
                            height: l + "px"
                        }));
                        if (!w && U == p && u.outerHeight() == d) {
                            r.width(f);
                            return
                        }
                        U = p, u.css("width", ""), r.width(f), h.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()
                    }
                    u.css("overflow", "auto"), t.contentWidth ? p = t.contentWidth : p = u[0].scrollWidth, d = u[0].scrollHeight, u.css("overflow", ""), v = p / f, m = d / l, g = m > 1, y = v > 1, !y && !g ? (r.removeClass("jspScrollable"), u.css({
                        top: 0,
                        width: h.width() - R
                    }), Et(), Tt(), Ct(), st()) : (r.addClass("jspScrollable"), i = s.maintainPosition && (S || N), i && (o = mt(), a = gt()), Q(), Y(), et(), i && (dt(C ? p - f : o, !1), pt(T ? d - l : a, !1)), xt(), wt(), At(), s.enableKeyboardNavigation && Nt(), s.clickOnTrack && it(), kt(), s.hijackInternalLinks && Lt()), s.autoReinitialise && !I ? I = setInterval(function() {
                        K(s)
                    }, s.autoReinitialiseDelay) : !s.autoReinitialise && I && clearInterval(I), E && r.scrollTop(0) && pt(E, !1), x && r.scrollLeft(0) && dt(x, !1), r.trigger("jsp-initialised", [y || g])
                }

                function Q() {
                    g && (h.append(e('<div class="jspVerticalBar" />').append(e('<div class="jspCap jspCapTop" />'), e('<div class="jspTrack" />').append(e('<div class="jspDrag" />').append(e('<div class="jspDragTop" />'), e('<div class="jspDragBottom" />'))), e('<div class="jspCap jspCapBottom" />'))), C = h.find(">.jspVerticalBar"), k = C.find(">.jspTrack"), w = k.find(">.jspDrag"), s.showArrows && (M = e('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp", nt(0, -1)).bind("click.jsp", St), _ = e('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp", nt(0, 1)).bind("click.jsp", St), s.arrowScrollOnHover && (M.bind("mouseover.jsp", nt(0, -1, M)), _.bind("mouseover.jsp", nt(0, 1, _))), tt(k, s.verticalArrowPositions, M, _)), A = l, h.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function() {
                        A -= e(this).outerHeight()
                    }), w.hover(function() {
                        w.addClass("jspHover")
                    }, function() {
                        w.removeClass("jspHover")
                    }).bind("mousedown.jsp", function(t) {
                        e("html").bind("dragstart.jsp selectstart.jsp", St), w.addClass("jspActive");
                        var n = t.pageY - w.position().top;
                        return e("html").bind("mousemove.jsp", function(e) {
                            ut(e.pageY - n, !1)
                        }).bind("mouseup.jsp mouseleave.jsp", ot), !1
                    }), G())
                }

                function G() {
                    k.height(A + "px"), S = 0, L = s.verticalGutter + k.outerWidth(), u.width(f - L - R);
                    try {
                        C.position().left === 0 && u.css("margin-left", L + "px")
                    } catch (e) {}
                }

                function Y() {
                    y && (h.append(e('<div class="jspHorizontalBar" />').append(e('<div class="jspCap jspCapLeft" />'), e('<div class="jspTrack" />').append(e('<div class="jspDrag" />').append(e('<div class="jspDragLeft" />'), e('<div class="jspDragRight" />'))), e('<div class="jspCap jspCapRight" />'))), D = h.find(">.jspHorizontalBar"), P = D.find(">.jspTrack"), x = P.find(">.jspDrag"), s.showArrows && (j = e('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp", nt(-1, 0)).bind("click.jsp", St), F = e('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp", nt(1, 0)).bind("click.jsp", St), s.arrowScrollOnHover && (j.bind("mouseover.jsp", nt(-1, 0, j)), F.bind("mouseover.jsp", nt(1, 0, F))), tt(P, s.horizontalArrowPositions, j, F)), x.hover(function() {
                        x.addClass("jspHover")
                    }, function() {
                        x.removeClass("jspHover")
                    }).bind("mousedown.jsp", function(t) {
                        e("html").bind("dragstart.jsp selectstart.jsp", St), x.addClass("jspActive");
                        var n = t.pageX - x.position().left;
                        return e("html").bind("mousemove.jsp", function(e) {
                            ft(e.pageX - n, !1)
                        }).bind("mouseup.jsp mouseleave.jsp", ot), !1
                    }), H = h.innerWidth(), Z())
                }

                function Z() {
                    h.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function() {
                        H -= e(this).outerWidth()
                    }), P.width(H + "px"), N = 0
                }

                function et() {
                    if (y && g) {
                        var t = P.outerHeight(),
                            n = k.outerWidth();
                        A -= t, e(D).find(">.jspCap:visible,>.jspArrow").each(function() {
                            H += e(this).outerWidth()
                        }), H -= n, l -= n, f -= t, P.parent().append(e('<div class="jspCorner" />').css("width", t + "px")), G(), Z()
                    }
                    y && u.width(h.outerWidth() - R + "px"), d = u.outerHeight(), m = d / l, y && (B = Math.ceil(1 / v * H), B > s.horizontalDragMaxWidth ? B = s.horizontalDragMaxWidth : B < s.horizontalDragMinWidth && (B = s.horizontalDragMinWidth), x.width(B + "px"), T = H - B, lt(N)), g && (O = Math.ceil(1 / m * A), O > s.verticalDragMaxHeight ? O = s.verticalDragMaxHeight : O < s.verticalDragMinHeight && (O = s.verticalDragMinHeight), w.height(O + "px"), E = A - O, at(S))
                }

                function tt(e, t, n, r) {
                    var i = "before",
                        s = "after",
                        o;
                    t == "os" && (t = /Mac/.test(navigator.platform) ? "after" : "split"), t == i ? s = t : t == s && (i = t, o = n, n = r, r = o), e[i](n)[s](r)
                }

                function nt(e, t, n) {
                    return function() {
                        return rt(e, t, this, n), this.blur(), !1
                    }
                }

                function rt(t, n, r, i) {
                    r = e(r).addClass("jspActive");
                    var u, a, f = !0,
                        l = function() {
                            t !== 0 && o.scrollByX(t * s.arrowButtonSpeed), n !== 0 && o.scrollByY(n * s.arrowButtonSpeed), a = setTimeout(l, f ? s.initialDelay : s.arrowRepeatFreq), f = !1
                        };
                    l(), u = i ? "mouseout.jsp" : "mouseup.jsp", i = i || e("html"), i.bind(u, function() {
                        r.removeClass("jspActive"), a && clearTimeout(a), a = null, i.unbind(u)
                    })
                }

                function it() {
                    st(), g && k.bind("mousedown.jsp", function(t) {
                        if (t.originalTarget === n || t.originalTarget == t.currentTarget) {
                            var r = e(this),
                                i = r.offset(),
                                u = t.pageY - i.top - S,
                                a, f = !0,
                                h = function() {
                                    var e = r.offset(),
                                        n = t.pageY - e.top - O / 2,
                                        i = l * s.scrollPagePercent,
                                        c = E * i / (d - l);
                                    if (u < 0) S - c > n ? o.scrollByY(-i) : ut(n);
                                    else {
                                        if (!(u > 0)) {
                                            p();
                                            return
                                        }
                                        S + c < n ? o.scrollByY(i) : ut(n)
                                    }
                                    a = setTimeout(h, f ? s.initialDelay : s.trackClickRepeatFreq), f = !1
                                },
                                p = function() {
                                    a && clearTimeout(a), a = null, e(document).unbind("mouseup.jsp", p)
                                };
                            return h(), e(document).bind("mouseup.jsp", p), !1
                        }
                    }), y && P.bind("mousedown.jsp", function(t) {
                        if (t.originalTarget === n || t.originalTarget == t.currentTarget) {
                            var r = e(this),
                                i = r.offset(),
                                u = t.pageX - i.left - N,
                                a, l = !0,
                                h = function() {
                                    var e = r.offset(),
                                        n = t.pageX - e.left - B / 2,
                                        i = f * s.scrollPagePercent,
                                        c = T * i / (p - f);
                                    if (u < 0) N - c > n ? o.scrollByX(-i) : ft(n);
                                    else {
                                        if (!(u > 0)) {
                                            d();
                                            return
                                        }
                                        N + c < n ? o.scrollByX(i) : ft(n)
                                    }
                                    a = setTimeout(h, l ? s.initialDelay : s.trackClickRepeatFreq), l = !1
                                },
                                d = function() {
                                    a && clearTimeout(a), a = null, e(document).unbind("mouseup.jsp", d)
                                };
                            return h(), e(document).bind("mouseup.jsp", d), !1
                        }
                    })
                }

                function st() {
                    P && P.unbind("mousedown.jsp"), k && k.unbind("mousedown.jsp")
                }

                function ot() {
                    e("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp"), w && w.removeClass("jspActive"), x && x.removeClass("jspActive")
                }

                function ut(e, t) {
                    if (!g) return;
                    e < 0 ? e = 0 : e > E && (e = E), t === n && (t = s.animateScroll), t ? o.animate(w, "top", e, at) : (w.css("top", e), at(e))
                }

                function at(e) {
                    e === n && (e = w.position().top), h.scrollTop(0), S = e;
                    var t = S === 0,
                        i = S == E,
                        s = e / E,
                        o = -s * (d - l);
                    if (z != t || X != i) z = t, X = i, r.trigger("jsp-arrow-change", [z, X, W, V]);
                    ct(t, i), u.css("top", o), r.trigger("jsp-scroll-y", [-o, t, i]).trigger("scroll")
                }

                function ft(e, t) {
                    if (!y) return;
                    e < 0 ? e = 0 : e > T && (e = T), t === n && (t = s.animateScroll), t ? o.animate(x, "left", e, lt) : (x.css("left", e), lt(e))
                }

                function lt(e) {
                    e === n && (e = x.position().left), h.scrollTop(0), N = e;
                    var t = N === 0,
                        i = N == T,
                        s = e / T,
                        o = -s * (p - f);
                    if (W != t || V != i) W = t, V = i, r.trigger("jsp-arrow-change", [z, X, W, V]);
                    ht(t, i), u.css("left", o), r.trigger("jsp-scroll-x", [-o, t, i]).trigger("scroll")
                }

                function ct(e, t) {
                    s.showArrows && (M[e ? "addClass" : "removeClass"]("jspDisabled"), _[t ? "addClass" : "removeClass"]("jspDisabled"))
                }

                function ht(e, t) {
                    s.showArrows && (j[e ? "addClass" : "removeClass"]("jspDisabled"), F[t ? "addClass" : "removeClass"]("jspDisabled"))
                }

                function pt(e, t) {
                    var n = e / (d - l);
                    ut(n * E, t)
                }

                function dt(e, t) {
                    var n = e / (p - f);
                    ft(n * T, t)
                }

                function vt(t, n, r) {
                    var i, o, u, a = 0,
                        c = 0,
                        p, d, v, m, g, y;
                    try {
                        i = e(t)
                    } catch (w) {
                        return
                    }
                    o = i.outerHeight(), u = i.outerWidth(), h.scrollTop(0), h.scrollLeft(0);
                    while (!i.is(".jspPane")) {
                        a += i.position().top, c += i.position().left, i = i.offsetParent();
                        if (/^body|html$/i.test(i[0].nodeName)) return
                    }
                    p = gt(), v = p + l, a < p || n ? g = a - s.verticalGutter : a + o > v && (g = a - l + o + s.verticalGutter), g && pt(g, r), d = mt(), m = d + f, c < d || n ? y = c - s.horizontalGutter : c + u > m && (y = c - f + u + s.horizontalGutter), y && dt(y, r)
                }

                function mt() {
                    return -u.position().left
                }

                function gt() {
                    return -u.position().top
                }

                function yt() {
                    var e = d - l;
                    return e > 20 && e - gt() < 10
                }

                function bt() {
                    var e = p - f;
                    return e > 20 && e - mt() < 10
                }

                function wt() {
                    h.unbind(J).bind(J, function(e, t, n, r) {
                        var i = N,
                            u = S;
                        return o.scrollBy(n * s.mouseWheelSpeed, -r * s.mouseWheelSpeed, !1), i == N && u == S
                    })
                }

                function Et() {
                    h.unbind(J)
                }

                function St() {
                    return !1
                }

                function xt() {
                    u.find(":input,a").unbind("focus.jsp").bind("focus.jsp", function(e) {
                        vt(e.target, !1)
                    })
                }

                function Tt() {
                    u.find(":input,a").unbind("focus.jsp")
                }

                function Nt() {
                    function a() {
                        var e = N,
                            r = S;
                        switch (t) {
                            case 40:
                                o.scrollByY(s.keyboardSpeed, !1);
                                break;
                            case 38:
                                o.scrollByY(-s.keyboardSpeed, !1);
                                break;
                            case 34:
                            case 32:
                                o.scrollByY(l * s.scrollPagePercent, !1);
                                break;
                            case 33:
                                o.scrollByY(-l * s.scrollPagePercent, !1);
                                break;
                            case 39:
                                o.scrollByX(s.keyboardSpeed, !1);
                                break;
                            case 37:
                                o.scrollByX(-s.keyboardSpeed, !1)
                        }
                        return n = e != N || r != S, n
                    }
                    var t, n, i = [];
                    y && i.push(D[0]), g && i.push(C[0]), u.focus(function() {
                        r.focus()
                    }), r.attr("tabindex", 0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp", function(r) {
                        if (r.target !== this && (!i.length || !e(r.target).closest(i).length)) return;
                        var s = N,
                            o = S;
                        switch (r.keyCode) {
                            case 40:
                            case 38:
                            case 34:
                            case 32:
                            case 33:
                            case 39:
                            case 37:
                                t = r.keyCode, a();
                                break;
                            case 35:
                                pt(d - l), t = null;
                                break;
                            case 36:
                                pt(0), t = null
                        }
                        return n = r.keyCode == t && s != N || o != S, !n
                    }).bind("keypress.jsp", function(e) {
                        return e.keyCode == t && a(), !n
                    }), s.hideFocus ? (r.css("outline", "none"), "hideFocus" in h[0] && r.attr("hideFocus", !0)) : (r.css("outline", ""), "hideFocus" in h[0] && r.attr("hideFocus", !1))
                }

                function Ct() {
                    r.attr("tabindex", "-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")
                }

                function kt() {
                    if (location.hash && location.hash.length > 1) {
                        var t, n, r = escape(location.hash.substr(1));
                        try {
                            t = e("#" + r + ', a[name="' + r + '"]')
                        } catch (i) {
                            return
                        }
                        t.length && u.find(r) && (h.scrollTop() === 0 ? n = setInterval(function() {
                            h.scrollTop() > 0 && (vt(t, !0), e(document).scrollTop(h.position().top), clearInterval(n))
                        }, 50) : (vt(t, !0), e(document).scrollTop(h.position().top)))
                    }
                }

                function Lt() {
                    if (e(document.body).data("jspHijack")) return;
                    e(document.body).data("jspHijack", !0), e(document.body).delegate("a[href*=#]", "click", function(n) {
                        var r = this.href.substr(0, this.href.indexOf("#")),
                            i = location.href,
                            s, o, u, f, l, c;
                        location.href.indexOf("#") !== -1 && (i = location.href.substr(0, location.href.indexOf("#")));
                        if (r !== i) return;
                        s = escape(this.href.substr(this.href.indexOf("#") + 1)), o;
                        try {
                            o = e("#" + s + ', a[name="' + s + '"]')
                        } catch (h) {
                            return
                        }
                        if (!o.length) return;
                        u = o.closest(".jspScrollable"), f = u.data("jsp"), f.scrollToElement(o, !0), u[0].scrollIntoView && (l = e(t).scrollTop(), c = o.offset().top, (c < l || c > l + e(t).height()) && u[0].scrollIntoView()), n.preventDefault()
                    })
                }

                function At() {
                    var e, t, n, r, i, s = !1;
                    h.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp", function(o) {
                        var u = o.originalEvent.touches[0];
                        e = mt(), t = gt(), n = u.pageX, r = u.pageY, i = !1, s = !0
                    }).bind("touchmove.jsp", function(u) {
                        if (!s) return;
                        var a = u.originalEvent.touches[0],
                            f = N,
                            l = S;
                        return o.scrollTo(e + n - a.pageX, t + r - a.pageY), i = i || Math.abs(n - a.pageX) > 5 || Math.abs(r - a.pageY) > 5, f == N && l == S
                    }).bind("touchend.jsp", function(e) {
                        s = !1
                    }).bind("click.jsp-touchclick", function(e) {
                        if (i) return i = !1, !1
                    })
                }

                function Ot() {
                    var e = gt(),
                        t = mt();
                    r.removeClass("jspScrollable").unbind(".jsp"), r.replaceWith($.append(u.children())), $.scrollTop(e), $.scrollLeft(t), I && clearInterval(I)
                }
                var s, o = this,
                    u, f, l, h, p, d, v, m, g, y, w, E, S, x, T, N, C, k, L, A, O, M, _, D, P, H, B, j, F, I, q, R, U, z = !0,
                    W = !0,
                    X = !1,
                    V = !1,
                    $ = r.clone(!1, !1).empty(),
                    J = e.fn.mwheelIntent ? "mwheelIntent.jsp" : "mousewheel.jsp";
                q = r.css("paddingTop") + " " + r.css("paddingRight") + " " + r.css("paddingBottom") + " " + r.css("paddingLeft"), R = (parseInt(r.css("paddingLeft"), 10) || 0) + (parseInt(r.css("paddingRight"), 10) || 0), e.extend(o, {
                    reinitialise: function(t) {
                        t = e.extend({}, s, t), K(t)
                    },
                    scrollToElement: function(e, t, n) {
                        vt(e, t, n)
                    },
                    scrollTo: function(e, t, n) {
                        dt(e, n), pt(t, n)
                    },
                    scrollToX: function(e, t) {
                        dt(e, t)
                    },
                    scrollToY: function(e, t) {
                        pt(e, t)
                    },
                    scrollToPercentX: function(e, t) {
                        dt(e * (p - f), t)
                    },
                    scrollToPercentY: function(e, t) {
                        pt(e * (d - l), t)
                    },
                    scrollBy: function(e, t, n) {
                        o.scrollByX(e, n), o.scrollByY(t, n)
                    },
                    scrollByX: function(e, t) {
                        var n = mt() + Math[e < 0 ? "floor" : "ceil"](e),
                            r = n / (p - f);
                        ft(r * T, t)
                    },
                    scrollByY: function(e, t) {
                        var n = gt() + Math[e < 0 ? "floor" : "ceil"](e),
                            r = n / (d - l);
                        ut(r * E, t)
                    },
                    positionDragX: function(e, t) {
                        ft(e, t)
                    },
                    positionDragY: function(e, t) {
                        ut(e, t)
                    },
                    animate: function(e, t, n, r) {
                        var i = {};
                        i[t] = n, e.animate(i, {
                            duration: s.animateDuration,
                            easing: s.animateEase,
                            queue: !1,
                            step: r
                        })
                    },
                    getContentPositionX: function() {
                        return mt()
                    },
                    getContentPositionY: function() {
                        return gt()
                    },
                    getContentWidth: function() {
                        return p
                    },
                    getContentHeight: function() {
                        return d
                    },
                    getPercentScrolledX: function() {
                        return mt() / (p - f)
                    },
                    getPercentScrolledY: function() {
                        return gt() / (d - l)
                    },
                    getIsScrollableH: function() {
                        return y
                    },
                    getIsScrollableV: function() {
                        return g
                    },
                    getContentPane: function() {
                        return u
                    },
                    scrollToBottom: function(e) {
                        ut(E, e)
                    },
                    hijackInternalLinks: e.noop,
                    destroy: function() {
                        Ot()
                    }
                }), K(i)
            }
            return r = e.extend({}, e.fn.jScrollPane.defaults, r), e.each(["mouseWheelSpeed", "arrowButtonSpeed", "trackClickSpeed", "keyboardSpeed"], function() {
                r[this] = r[this] || r.speed
            }), this.each(function() {
                var t = e(this),
                    n = t.data("jsp");
                n ? n.reinitialise(r) : (e("script", t).filter("[type=text/javascript],not([type])").remove(), n = new i(t, r), t.data("jsp", n))
            })
        }, e.fn.jScrollPane.defaults = {
            showArrows: !1,
            maintainPosition: !0,
            stickToBottom: !1,
            stickToRight: !1,
            clickOnTrack: !0,
            autoReinitialise: !1,
            autoReinitialiseDelay: 500,
            verticalDragMinHeight: 0,
            verticalDragMaxHeight: 99999,
            horizontalDragMinWidth: 0,
            horizontalDragMaxWidth: 99999,
            contentWidth: n,
            animateScroll: !1,
            animateDuration: 300,
            animateEase: "linear",
            hijackInternalLinks: !1,
            verticalGutter: 4,
            horizontalGutter: 4,
            mouseWheelSpeed: 0,
            arrowButtonSpeed: 0,
            arrowRepeatFreq: 50,
            arrowScrollOnHover: !1,
            trackClickSpeed: 0,
            trackClickRepeatFreq: 70,
            verticalArrowPositions: "split",
            horizontalArrowPositions: "split",
            enableKeyboardNavigation: !0,
            hideFocus: !1,
            keyboardSpeed: 0,
            initialDelay: 300,
            speed: 30,
            scrollPagePercent: .8
        }
    }(jQuery, this),
    function(e) {
        var t, n, r, i, s, o, u, a, f, l, c = 0,
            h = {},
            p = [],
            d = 0,
            v = {},
            m = [],
            g = null,
            y = new Image,
            b = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,
            w = /[^\.]\.(swf)\s*$/i,
            E, S = 1,
            x = 0,
            T = "",
            N, C, k = !1,
            L = e.extend(e("<div/>")[0], {
                prop: 0
            }),
            A = e.browser.msie && e.browser.version < 7 && !window.XMLHttpRequest,
            O = function() {
                n.hide(), y.onerror = y.onload = null, g && g.abort(), t.empty()
            },
            M = function() {
                !1 === h.onError(p, c, h) ? (n.hide(), k = !1) : (h.titleShow = !1, h.width = "auto", h.height = "auto", t.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>'), D())
            },
            _ = function() {
                var r = p[c],
                    i, s, u, a, f, l;
                O(), h = e.extend({}, e.fn.fancybox.defaults, typeof e(r).data("fancybox") == "undefined" ? h : e(r).data("fancybox")), l = h.onStart(p, c, h);
                if (l === !1) k = !1;
                else {
                    typeof l == "object" && (h = e.extend(h, l)), u = h.title || (r.nodeName ? e(r).attr("title") : r.title) || "", r.nodeName && !h.orig && (h.orig = e(r).children("img:first").length ? e(r).children("img:first") : e(r)), u === "" && h.orig && h.titleFromAlt && (u = h.orig.attr("alt")), i = h.href || (r.nodeName ? e(r).attr("href") : r.href) || null;
                    if (/^(?:javascript)/i.test(i) || i == "#") i = null;
                    h.type ? (s = h.type, i || (i = h.content)) : h.content ? s = "html" : i && (s = i.match(b) ? "image" : i.match(w) ? "swf" : e(r).hasClass("iframe") ? "iframe" : i.indexOf("#") === 0 ? "inline" : "ajax");
                    if (s) {
                        s == "inline" && (r = i.substr(i.indexOf("#")), s = e(r).length > 0 ? "inline" : "ajax"), h.type = s, h.href = i, h.title = u, h.autoDimensions && (h.type == "html" || h.type == "inline" || h.type == "ajax" ? (h.width = "auto", h.height = "auto") : h.autoDimensions = !1), h.modal && (h.overlayShow = !0, h.hideOnOverlayClick = !1, h.hideOnContentClick = !1, h.enableEscapeButton = !1, h.showCloseButton = !1), h.padding = parseInt(h.padding, 10), h.margin = parseInt(h.margin, 10), t.css("padding", h.padding + h.margin), e(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change", function() {
                            e(this).replaceWith(o.children())
                        });
                        switch (s) {
                            case "html":
                                t.html(h.content), D();
                                break;
                            case "inline":
                                if (e(r).parent().is("#fancybox-content") === !0) {
                                    k = !1;
                                    break
                                }
                                e('<div class="fancybox-inline-tmp" />').hide().insertBefore(e(r)).bind("fancybox-cleanup", function() {
                                    e(this).replaceWith(o.children())
                                }).bind("fancybox-cancel", function() {
                                    e(this).replaceWith(t.children())
                                }), e(r).appendTo(t), D();
                                break;
                            case "image":
                                k = !1, e.fancybox.showActivity(), y = new Image, y.onerror = function() {
                                    M()
                                }, y.onload = function() {
                                    k = !0, y.onerror = y.onload = null, h.width = y.width, h.height = y.height, e("<img />").attr({
                                        id: "fancybox-img",
                                        src: y.src,
                                        alt: h.title
                                    }).appendTo(t), P()
                                }, y.src = i;
                                break;
                            case "swf":
                                h.scrolling = "no", a = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + h.width + '" height="' + h.height + '"><param name="movie" value="' + i + '"></param>', f = "", e.each(h.swf, function(e, t) {
                                    a += '<param name="' + e + '" value="' + t + '"></param>', f += " " + e + '="' + t + '"'
                                }), a += '<embed src="' + i + '" type="application/x-shockwave-flash" width="' + h.width + '" height="' + h.height + '"' + f + "></embed></object>", t.html(a), D();
                                break;
                            case "ajax":
                                k = !1, e.fancybox.showActivity(), h.ajax.win = h.ajax.success, g = e.ajax(e.extend({}, h.ajax, {
                                    url: i,
                                    data: h.ajax.data || {},
                                    error: function(e) {
                                        e.status > 0 && M()
                                    },
                                    success: function(e, r, s) {
                                        if ((typeof s == "object" ? s : g).status == 200) {
                                            if (typeof h.ajax.win == "function") {
                                                l = h.ajax.win(i, e, r, s);
                                                if (l === !1) {
                                                    n.hide();
                                                    return
                                                }
                                                if (typeof l == "string" || typeof l == "object") e = l
                                            }
                                            t.html(e), D()
                                        }
                                    }
                                }));
                                break;
                            case "iframe":
                                P()
                        }
                    } else M()
                }
            },
            D = function() {
                var n = h.width,
                    r = h.height;
                n = n.toString().indexOf("%") > -1 ? parseInt((e(window).width() - h.margin * 2) * parseFloat(n) / 100, 10) + "px" : n == "auto" ? "auto" : n + "px", r = r.toString().indexOf("%") > -1 ? parseInt((e(window).height() - h.margin * 2) * parseFloat(r) / 100, 10) + "px" : r == "auto" ? "auto" : r + "px", t.wrapInner('<div style="width:' + n + ";height:" + r + ";overflow: " + (h.scrolling == "auto" ? "auto" : h.scrolling == "yes" ? "scroll" : "hidden") + ';position:relative;"></div>'), h.width = t.width(), h.height = t.height(), P()
            },
            P = function() {
                var g, y;
                n.hide();
                if (i.is(":visible") && !1 === v.onCleanup(m, d, v)) e.event.trigger("fancybox-cancel"), k = !1;
                else {
                    k = !0, e(o.add(r)).unbind(), e(window).unbind("resize.fb scroll.fb"), e(document).unbind("keydown.fb"), i.is(":visible") && v.titlePosition !== "outside" && i.css("height", i.height()), m = p, d = c, v = h, v.overlayShow ? (r.css({
                        "background-color": v.overlayColor,
                        opacity: v.overlayOpacity,
                        cursor: v.hideOnOverlayClick ? "pointer" : "auto",
                        height: e(document).height()
                    }), r.is(":visible") || (A && e("select:not(#fancybox-tmp select)").filter(function() {
                        return this.style.visibility !== "hidden"
                    }).css({
                        visibility: "hidden"
                    }).one("fancybox-cleanup", function() {
                        this.style.visibility = "inherit"
                    }), r.show())) : r.hide(), C = I(), T = v.title || "", x = 0, a.empty().removeAttr("style").removeClass();
                    if (v.titleShow !== !1) {
                        e.isFunction(v.titleFormat) ? g = v.titleFormat(T, m, d, v) : g = T && T.length ? v.titlePosition == "float" ? '<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">' + T + '</td><td id="fancybox-title-float-right"></td></tr></table>' : '<div id="fancybox-title-' + v.titlePosition + '">' + T + "</div>" : !1, T = g;
                        if (!!T && T !== "") {
                            a.addClass("fancybox-title-" + v.titlePosition).html(T).appendTo("body").show();
                            switch (v.titlePosition) {
                                case "inside":
                                    a.css({
                                        width: C.width - v.padding * 2,
                                        marginLeft: v.padding,
                                        marginRight: v.padding
                                    }), x = a.outerHeight(!0), a.appendTo(s), C.height += x;
                                    break;
                                case "over":
                                    a.css({
                                        marginLeft: v.padding,
                                        width: C.width - v.padding * 2,
                                        bottom: v.padding
                                    }).appendTo(s);
                                    break;
                                case "float":
                                    a.css("left", parseInt((a.width() - C.width - 40) / 2, 10) * -1).appendTo(i);
                                    break;
                                default:
                                    a.css({
                                        width: C.width - v.padding * 2,
                                        paddingLeft: v.padding,
                                        paddingRight: v.padding
                                    }).appendTo(i)
                            }
                        }
                    }
                    a.hide(), i.is(":visible") ? (e(u.add(f).add(l)).hide(), g = i.position(), N = {
                        top: g.top,
                        left: g.left,
                        width: i.width(),
                        height: i.height()
                    }, y = N.width == C.width && N.height == C.height, o.fadeTo(v.changeFade, .3, function() {
                        var n = function() {
                            o.html(t.contents()).fadeTo(v.changeFade, 1, B)
                        };
                        e.event.trigger("fancybox-change"), o.empty().removeAttr("filter").css({
                            "border-width": v.padding,
                            width: C.width - v.padding * 2,
                            height: h.autoDimensions ? "auto" : C.height - x - v.padding * 2
                        }), y ? n() : (L.prop = 0, e(L).animate({
                            prop: 1
                        }, {
                            duration: v.changeSpeed,
                            easing: v.easingChange,
                            step: j,
                            complete: n
                        }))
                    })) : (i.removeAttr("style"), o.css("border-width", v.padding), v.transitionIn == "elastic" ? (N = q(), o.html(t.contents()), i.show(), v.opacity && (C.opacity = 0), L.prop = 0, e(L).animate({
                        prop: 1
                    }, {
                        duration: v.speedIn,
                        easing: v.easingIn,
                        step: j,
                        complete: B
                    })) : (v.titlePosition == "inside" && x > 0 && a.show(), o.css({
                        width: C.width - v.padding * 2,
                        height: h.autoDimensions ? "auto" : C.height - x - v.padding * 2
                    }).html(t.contents()), i.css(C).fadeIn(v.transitionIn == "none" ? 0 : v.speedIn, B)))
                }
            },
            H = function() {
                (v.enableEscapeButton || v.enableKeyboardNav) && e(document).bind("keydown.fb", function(t) {
                    t.keyCode == 27 && v.enableEscapeButton ? (t.preventDefault(), e.fancybox.close()) : (t.keyCode == 37 || t.keyCode == 39) && v.enableKeyboardNav && t.target.tagName !== "INPUT" && t.target.tagName !== "TEXTAREA" && t.target.tagName !== "SELECT" && (t.preventDefault(), e.fancybox[t.keyCode == 37 ? "prev" : "next"]())
                }), v.showNavArrows ? ((v.cyclic && m.length > 1 || d !== 0) && f.show(), (v.cyclic && m.length > 1 || d != m.length - 1) && l.show()) : (f.hide(), l.hide())
            },
            B = function() {
                e.support.opacity || (o.get(0).style.removeAttribute("filter"), i.get(0).style.removeAttribute("filter")), h.autoDimensions && o.css("height", "auto"), i.css("height", "auto"), T && T.length && a.show(), v.showCloseButton && u.show(), H(), v.hideOnContentClick && o.bind("click", e.fancybox.close), v.hideOnOverlayClick && r.bind("click", e.fancybox.close), e(window).bind("resize.fb", e.fancybox.resize), v.centerOnScroll && e(window).bind("scroll.fb", e.fancybox.center), v.type == "iframe" && e('<iframe id="fancybox-frame" name="fancybox-frame' + (new Date).getTime() + '" frameborder="0" hspace="0" ' + (e.browser.msie ? 'allowtransparency="true""' : "") + ' scrolling="' + h.scrolling + '" src="' + v.href + '"></iframe>').appendTo(o), i.show(), k = !1, e.fancybox.center(), v.onComplete(m, d, v);
                var t, n;
                m.length - 1 > d && (t = m[d + 1].href, typeof t != "undefined" && t.match(b) && (n = new Image, n.src = t)), d > 0 && (t = m[d - 1].href, typeof t != "undefined" && t.match(b) && (n = new Image, n.src = t))
            },
            j = function(e) {
                var t = {
                    width: parseInt(N.width + (C.width - N.width) * e, 10),
                    height: parseInt(N.height + (C.height - N.height) * e, 10),
                    top: parseInt(N.top + (C.top - N.top) * e, 10),
                    left: parseInt(N.left + (C.left - N.left) * e, 10)
                };
                typeof C.opacity != "undefined" && (t.opacity = e < .5 ? .5 : e), i.css(t), o.css({
                    width: t.width - v.padding * 2,
                    height: t.height - x * e - v.padding * 2
                })
            },
            F = function() {
                return [e(window).width() - v.margin * 2, e(window).height() - v.margin * 2, e(document).scrollLeft() + v.margin, e(document).scrollTop() + v.margin]
            },
            I = function() {
                var e = F(),
                    t = {},
                    n = v.autoScale,
                    r = v.padding * 2;
                return t.width = v.width.toString().indexOf("%") > -1 ? parseInt(e[0] * parseFloat(v.width) / 100, 10) : v.width + r, t.height = v.height.toString().indexOf("%") > -1 ? parseInt(e[1] * parseFloat(v.height) / 100, 10) : v.height + r, n && (t.width > e[0] || t.height > e[1]) && (h.type == "image" || h.type == "swf" ? (n = v.width / v.height, t.width > e[0] && (t.width = e[0], t.height = parseInt((t.width - r) / n + r, 10)), t.height > e[1] && (t.height = e[1], t.width = parseInt((t.height - r) * n + r, 10))) : (t.width = Math.min(t.width, e[0]), t.height = Math.min(t.height, e[1]))), t.top = parseInt(Math.max(e[3] - 20, e[3] + (e[1] - t.height - 40) * .5), 10), t.left = parseInt(Math.max(e[2] - 20, e[2] + (e[0] - t.width - 40) * .5), 10), t
            },
            q = function() {
                var t = h.orig ? e(h.orig) : !1,
                    n = {};
                return t && t.length ? (n = t.offset(), n.top += parseInt(t.css("paddingTop"), 10) || 0, n.left += parseInt(t.css("paddingLeft"), 10) || 0, n.top += parseInt(t.css("border-top-width"), 10) || 0, n.left += parseInt(t.css("border-left-width"), 10) || 0, n.width = t.width(), n.height = t.height(), n = {
                    width: n.width + v.padding * 2,
                    height: n.height + v.padding * 2,
                    top: n.top - v.padding - 20,
                    left: n.left - v.padding - 20
                }) : (t = F(), n = {
                    width: v.padding * 2,
                    height: v.padding * 2,
                    top: parseInt(t[3] + t[1] * .5, 10),
                    left: parseInt(t[2] + t[0] * .5, 10)
                }), n
            },
            R = function() {
                n.is(":visible") ? (e("div", n).css("top", S * -40 + "px"), S = (S + 1) % 12) : clearInterval(E)
            };
        e.fn.fancybox = function(t) {
            return e(this).length ? (e(this).data("fancybox", e.extend({}, t, e.metadata ? e(this).metadata() : {})).unbind("click.fb").bind("click.fb", function(t) {
                t.preventDefault(), k || (k = !0, e(this).blur(), p = [], c = 0, t = e(this).attr("rel") || "", !t || t == "" || t === "nofollow" ? p.push(this) : (p = e("a[rel=" + t + "], area[rel=" + t + "]"), c = p.index(this)), _())
            }), this) : this
        }, e.fancybox = function(t, n) {
            var r;
            if (!k) {
                k = !0, r = typeof n != "undefined" ? n : {}, p = [], c = parseInt(r.index, 10) || 0;
                if (e.isArray(t)) {
                    for (var i = 0, s = t.length; i < s; i++) typeof t[i] == "object" ? e(t[i]).data("fancybox", e.extend({}, r, t[i])) : t[i] = e({}).data("fancybox", e.extend({
                        content: t[i]
                    }, r));
                    p = jQuery.merge(p, t)
                } else typeof t == "object" ? e(t).data("fancybox", e.extend({}, r, t)) : t = e({}).data("fancybox", e.extend({
                    content: t
                }, r)), p.push(t); if (c > p.length || c < 0) c = 0;
                _()
            }
        }, e.fancybox.showActivity = function() {
            clearInterval(E), n.show(), E = setInterval(R, 66)
        }, e.fancybox.hideActivity = function() {
            n.hide()
        }, e.fancybox.next = function() {
            return e.fancybox.pos(d + 1)
        }, e.fancybox.prev = function() {
            return e.fancybox.pos(d - 1)
        }, e.fancybox.pos = function(e) {
            k || (e = parseInt(e), p = m, e > -1 && e < m.length ? (c = e, _()) : v.cyclic && m.length > 1 && (c = e >= m.length ? 0 : m.length - 1, _()))
        }, e.fancybox.cancel = function() {
            k || (k = !0, e.event.trigger("fancybox-cancel"), O(), h.onCancel(p, c, h), k = !1)
        }, e.fancybox.close = function() {
            function t() {
                r.fadeOut("fast"), a.empty().hide(), i.hide(), e.event.trigger("fancybox-cleanup"), o.empty(), v.onClosed(m, d, v), m = h = [], d = c = 0, v = h = {}, k = !1
            }
            if (!k && !i.is(":hidden")) {
                k = !0;
                if (v && !1 === v.onCleanup(m, d, v)) k = !1;
                else {
                    O(), e(u.add(f).add(l)).hide(), e(o.add(r)).unbind(), e(window).unbind("resize.fb scroll.fb"), e(document).unbind("keydown.fb"), o.find("iframe").attr("src", A && /^https/i.test(window.location.href || "") ? "javascript:void(false)" : "about:blank"), v.titlePosition !== "inside" && a.empty(), i.stop();
                    if (v.transitionOut == "elastic") {
                        N = q();
                        var n = i.position();
                        C = {
                            top: n.top,
                            left: n.left,
                            width: i.width(),
                            height: i.height()
                        }, v.opacity && (C.opacity = 1), a.empty().hide(), L.prop = 1, e(L).animate({
                            prop: 0
                        }, {
                            duration: v.speedOut,
                            easing: v.easingOut,
                            step: j,
                            complete: t
                        })
                    } else i.fadeOut(v.transitionOut == "none" ? 0 : v.speedOut, t)
                }
            }
        }, e.fancybox.resize = function() {
            r.is(":visible") && r.css("height", e(document).height()), e.fancybox.center(!0)
        }, e.fancybox.center = function(e) {
            var t, n;
            k || (n = e === !0 ? 1 : 0, t = F(), !n && (i.width() > t[0] || i.height() > t[1]) || i.stop().animate({
                top: parseInt(Math.max(t[3] - 20, t[3] + (t[1] - o.height() - 40) * .5 - v.padding)),
                left: parseInt(Math.max(t[2] - 20, t[2] + (t[0] - o.width() - 40) * .5 - v.padding))
            }, typeof e == "number" ? e : 200))
        }, e.fancybox.init = function() {
            e("#fancybox-wrap").length || (e("body").append(t = e('<div id="fancybox-tmp"></div>'), n = e('<div id="fancybox-loading"><div></div></div>'), r = e('<div id="fancybox-overlay"></div>'), i = e('<div id="fancybox-wrap"></div>')), s = e('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(i), s.append(o = e('<div id="fancybox-content"></div>'), u = e('<a id="fancybox-close"></a>'), a = e('<div id="fancybox-title"></div>'), f = e('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'), l = e('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>')), u.click(e.fancybox.close), n.click(e.fancybox.cancel), f.click(function(t) {
                t.preventDefault(), e.fancybox.prev()
            }), l.click(function(t) {
                t.preventDefault(), e.fancybox.next()
            }), e.fn.mousewheel && i.bind("mousewheel.fb", function(t, n) {
                if (k) t.preventDefault();
                else if (e(t.target).get(0).clientHeight == 0 || e(t.target).get(0).scrollHeight === e(t.target).get(0).clientHeight) t.preventDefault(), e.fancybox[n > 0 ? "prev" : "next"]()
            }), e.support.opacity || i.addClass("fancybox-ie"), A && (n.addClass("fancybox-ie6"), i.addClass("fancybox-ie6"), e('<iframe id="fancybox-hide-sel-frame" src="' + (/^https/i.test(window.location.href || "") ? "javascript:void(false)" : "about:blank") + '" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(s)))
        }, e.fn.fancybox.defaults = {
            padding: 10,
            margin: 40,
            opacity: !1,
            modal: !1,
            cyclic: !1,
            scrolling: "auto",
            width: 560,
            height: 340,
            autoScale: !0,
            autoDimensions: !0,
            centerOnScroll: !1,
            ajax: {},
            swf: {
                wmode: "transparent"
            },
            hideOnOverlayClick: !0,
            hideOnContentClick: !1,
            overlayShow: !0,
            overlayOpacity: .7,
            overlayColor: "#777",
            titleShow: !0,
            titlePosition: "float",
            titleFormat: null,
            titleFromAlt: !1,
            transitionIn: "fade",
            transitionOut: "fade",
            speedIn: 300,
            speedOut: 300,
            changeSpeed: 300,
            changeFade: "fast",
            easingIn: "swing",
            easingOut: "swing",
            showCloseButton: !0,
            showNavArrows: !0,
            enableEscapeButton: !0,
            enableKeyboardNav: !0,
            onStart: function() {},
            onCancel: function() {},
            onComplete: function() {},
            onCleanup: function() {},
            onClosed: function() {},
            onError: function() {}
        }, e(document).ready(function() {
            e.fancybox.init()
        })
    }(jQuery);
var iPhone = !1,
    iPad = !1;
rm = {
    init: function() {
        navigator.userAgent.toLowerCase().indexOf("ipad") != -1 && $("body").addClass("ipad"), $(document).ready(function() {
            rm.cufon.init(), rm.cufon.ready(), rm.lensFlareBaby(), rm.horrendousCarousel(), rm.accordion.init(), rm.fancybox.init()
        })
    },
    fancybox: {
        init: function() {
            $("a.modal").fancybox({
                speedIn: 600,
                speedOut: 200,
                overlayShow: !0
            })
        }
    },
    cufon: {
        init: function() {
            Cufon.replace("h1:not(.nocufon), h2:not(.nocufon), .option, .h2, .footer-links h3, .global-header p, .global-header a", {
                fontFamily: "HelvNueBold",
                hoverables: {
                    i: !0
                },
                hover: !0
            })
        },
        ready: function() {
            Cufon.now()
        }
    },
    accordion: {
        init: function() {
            $(".accordion").rmAccordion();


            $('a[href*=#]:not([href=#])').on('click', function(e) {
            	e.preventDefault();

            	$('dt').removeClass('itemOpen').data('open', false).next('dd').hide().attr('aria-expanded', false);

            	// verify that the link is an internal link (by comparing it with the current url)

            	if (location.href.replace(/\#.*/,'') === this.href.replace(/\#.*/,'')) {

            		var $target = $(this.hash);
            	
            		$target = $target.length ? $target : $('[name=' + this.hash.slice(1) +']');

            		if ($target.length) {

            			$('html,body').animate({
            				scrollTop: $target.offset().top
            			}, 750,  function() {

            				
            				$target.closest('dt').data('open', true).addClass('itemOpen').next('dd').slideDown().attr('aria-expanded', true);


            			});

            		}

            	}
            });
        }
    },
    horrendousCarousel: function() {

    	imagesLoaded( $('.carousel-wrapper').find('img') , function() {
    		
			var frameOne = true,
				$slideOne = $('.slide-one'),
				$slideTwo = $('.slide-two');

	    	var rotator = function() {
	    		if (frameOne) {
					$slideOne.removeClass('active');
					$slideTwo.addClass('active');
					frameOne = false;
	    			
	    		} else {
	    			$slideTwo.removeClass('active');
	    			$slideOne.addClass('active');
	    			frameOne = true;

	    		}
	    	}

			setInterval(function() {

				rotator();
				
			}, 5000);

    	});


    },
    lensFlareBaby: function() {


    	var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";

    	$(document).keydown(function(e) {

    	  kkeys.push( e.keyCode );

    	  if ( kkeys.toString().indexOf( konami ) >= 0 ) {

    	    $(document).unbind('keydown',arguments.callee);

	      	$('<link/>', {
	      	   rel: 'stylesheet',
	      	   type: 'text/css',
	      	   href: 'stylesheets/lens-flare.css'
	      	}).appendTo('head');
    	    
    	    $.getScript( "javascripts/plax.js" )
    	      .done(function( script, textStatus ) {

    	        $('.lens-flare').show();
    	        
    	        $('.lens-flare').find('div').plaxify();
    	        $.plax.enable();


    	      });

    	  
    	  }

    	});






    }


}, $(function() {
    rm.init()
});
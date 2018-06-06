/**
 * angular-growl-v2 - v0.7.5 - 2015-06-17
 * http://janstevens.github.io/angular-growl-2
 * Copyright (c) 2015 Marco Rinck,Jan Stevens; Licensed MIT
 */

/********************************************
 *
 *
 *  be sure to include directive
 *  <body>
 *      <div growl></div>
 *  </body>
 *
 *
 ********************************************/

var angular = require('angular');

ngModule = angular.module('angular-growl', [])
module.exports = ngModule.name;


ngModule.directive("growl", [function () {
  "use strict";
  return {
    restrict: "A",
    templateUrl: "templates/growl/growl.html",
    replace: !1,
    scope: {reference: "@", inline: "=", limitMessages: "="},
    controller: ["$scope", "$timeout", "growl", "growlMessages", function (a, b, c, d) {
      a.referenceId = a.reference || 0, d.initDirective(a.referenceId, a.limitMessages), a.growlMessages = d, a.inlineMessage = angular.isDefined(a.inline) ? a.inline : c.inlineMessages(), a.$watch("limitMessages", function (b) {
        var c = d.directives[a.referenceId];
        angular.isUndefined(b) || angular.isUndefined(c) || (c.limitMessages = b)
      }), a.stopTimeoutClose = function (a) {
        a.clickToClose || (angular.forEach(a.promises, function (a) {
          b.cancel(a)
        }), a.close ? d.deleteMessage(a) : a.close = !0)
      }, a.alertClasses = function (a) {
        return {
          "alert-success": "success" === a.severity,
          "alert-error": "error" === a.severity,
          "alert-danger": "error" === a.severity,
          "alert-info": "info" === a.severity,
          "alert-warning": "warning" === a.severity,
          icon: a.disableIcons === !1,
          "alert-dismissable": !a.disableCloseButton
        }
      }, a.showCountDown = function (a) {
        return !a.disableCountDown && a.ttl > 0
      }, a.wrapperClasses = function () {
        var b = {};
        return b["growl-fixed"] = !a.inlineMessage, b[c.position()] = !0, b
      }, a.computeTitle = function (a) {
        var b = {success: "Success", error: "Error", info: "Information", warn: "Warning"};
        return b[a.severity]
      }
    }]
  }
}]), angular.module("angular-growl").run(["$templateCache", function (a) {
  "use strict";
  void 0 === a.get("templates/growl/growl.html") && a.put("templates/growl/growl.html", '<div class="growl-container" ng-class="wrapperClasses()"><div class="growl-item alert" ng-repeat="message in growlMessages.directives[referenceId].messages" ng-class="alertClasses(message)" ng-click="stopTimeoutClose(message)"><button type="button" class="close" data-dismiss="alert" aria-hidden="true" ng-click="growlMessages.deleteMessage(message)" ng-show="!message.disableCloseButton">&times;</button><button type="button" class="close" aria-hidden="true" ng-show="showCountDown(message)">{{message.countdown}}</button><h4 class="growl-title" ng-show="message.title" ng-bind="message.title"></h4><div class="growl-message" ng-bind-html="message.text"></div></div></div>')
}]), angular.module("angular-growl").provider("growl", function () {
  "use strict";
  var a = {
    success: null,
    error: null,
    warning: null,
    info: null
  }, b = "messages", c = "text", d = "title", e = "severity", f = !0, g = "variables", h = 0, i = !1, j = "top-right", k = !1, l = !1, m = !1, n = !1, o = !0;
  this.globalTimeToLive = function (b) {
    if ("object" == typeof b)for (var c in b)b.hasOwnProperty(c) && (a[c] = b[c]); else for (var d in a)a.hasOwnProperty(d) && (a[d] = b);
    return this
  }, this.globalTranslateMessages = function (a) {
    return o = a, this
  }, this.globalDisableCloseButton = function (a) {
    return k = a, this
  }, this.globalDisableIcons = function (a) {
    return l = a, this
  }, this.globalReversedOrder = function (a) {
    return m = a, this
  }, this.globalDisableCountDown = function (a) {
    return n = a, this
  }, this.messageVariableKey = function (a) {
    return g = a, this
  }, this.globalInlineMessages = function (a) {
    return i = a, this
  }, this.globalPosition = function (a) {
    return j = a, this
  }, this.messagesKey = function (a) {
    return b = a, this
  }, this.messageTextKey = function (a) {
    return c = a, this
  }, this.messageTitleKey = function (a) {
    return d = a, this
  }, this.messageSeverityKey = function (a) {
    return e = a, this
  }, this.onlyUniqueMessages = function (a) {
    return f = a, this
  }, this.serverMessagesInterceptor = ["$q", "growl", function (a, c) {
    function d(a) {
      void 0 !== a && a.data && a.data[b] && a.data[b].length > 0 && c.addServerMessages(a.data[b])
    }



    return {
      response: function (a) {
        return d(a), a
      }, responseError: function (b) {
        return d(b), a.reject(b)
      }
    }
  }], this.$get = ["$rootScope", "$interpolate", "$sce", "$filter", "$timeout", "growlMessages", function (b, p, q, r, s, t) {
    function u(a) {
      if (G && a.translateMessage)a.text = G(a.text, a.variables) || a.text, a.title = G(a.title) || a.title; else {
        var c = p(a.text);
        a.text = c(a.variables)
      }
      var d = t.addMessage(a);
      return b.$broadcast("growlMessage", a), s(function () {
      }, 0), d
    }

    function v(b, c, d) {
      var e, f = c || {};
      return e = {
        text: b,
        title: f.title,
        severity: d,
        ttl: f.ttl || a[d],
        variables: f.variables || {},
        disableCloseButton: void 0 === f.disableCloseButton ? k : f.disableCloseButton,
        disableIcons: void 0 === f.disableIcons ? l : f.disableIcons,
        disableCountDown: void 0 === f.disableCountDown ? n : f.disableCountDown,
        position: f.position || j,
        referenceId: f.referenceId || h,
        translateMessage: void 0 === f.translateMessage ? o : f.translateMessage,
        destroy: function () {
          t.deleteMessage(e)
        },
        setText: function (a) {
          e.text = q.trustAsHtml(String(a))
        },
        onclose: f.onclose,
        onopen: f.onopen
      }, u(e)
    }

    function w(a, b) {
      return v(a, b, "warning")
    }

    function x(a, b) {
      return v(a, b, "error")
    }

    function y(a, b) {
      return v(a, b, "info")
    }

    function z(a, b) {
      return v(a, b, "success")
    }

    function A(a, b, c) {
      return c = (c || "error").toLowerCase(), v(a, b, c)
    }

    function B(a) {
      if (a && a.length) {
        var b, f, h, i;
        for (i = a.length, b = 0; i > b; b++)if (f = a[b], f[c]) {
          h = (f[e] || "error").toLowerCase();
          var j = {};
          j.variables = f[g] || {}, j.title = f[d], v(f[c], j, h)
        }
      }
    }

    function C() {
      return f
    }

    function D() {
      return m
    }

    function E() {
      return i
    }

    function F() {
      return j
    }

    var G;
    t.onlyUnique = f, t.reverseOrder = m;
    try {
      G = r("translate")
    } catch (H) {
    }
    return {
      warning: w,
      error: x,
      info: y,
      success: z,
      general: A,
      addServerMessages: B,
      onlyUnique: C,
      reverseOrder: D,
      inlineMessages: E,
      position: F
    }
  }]
}).service("growlMessages", ["$sce", "$timeout", function (a, b) {
  "use strict";
  function c(a) {
    var b;
    return b = f[a] ? f[a] : f[a] = {messages: []}
  }

  function d(a) {
    var b = a || 0;
    return e.directives[b] || f[b]
  }

  var e = this;
  this.directives = {};
  var f = {};
  this.initDirective = function (a, b) {
    return f[a] ? (this.directives[a] = f[a], this.directives[a].limitMessages = b) : this.directives[a] = {
      messages: [],
      limitMessages: b
    }, this.directives[a]
  }, this.getAllMessages = function (a) {
    a = a || 0;
    var b;
    return b = d(a) ? d(a).messages : []
  }, this.destroyAllMessages = function (a) {
    for (var b = this.getAllMessages(a), c = b.length - 1; c >= 0; c--)b[c].destroy();
    var e = d(a);
    e && (e.messages = [])
  }, this.addMessage = function (d) {
    var e, f, g, h;
    if (e = this.directives[d.referenceId] ? this.directives[d.referenceId] : c(d.referenceId), f = e.messages, !this.onlyUnique || (angular.forEach(f, function (b) {
        h = a.getTrustedHtml(b.text), d.text === h && d.severity === b.severity && d.title === b.title && (g = !0)
      }), !g)) {
      if (d.text = a.trustAsHtml(String(d.text)), d.ttl && -1 !== d.ttl && (d.countdown = d.ttl / 1e3, d.promises = [], d.close = !1, d.countdownFunction = function () {
          d.countdown > 1 ? (d.countdown--, d.promises.push(b(d.countdownFunction, 1e3))) : d.countdown--
        }), angular.isDefined(e.limitMessages)) {
        var i = f.length - (e.limitMessages - 1);
        i > 0 && f.splice(e.limitMessages - 1, i)
      }
      if (this.reverseOrder ? f.unshift(d) : f.push(d), "function" == typeof d.onopen && d.onopen(), d.ttl && -1 !== d.ttl) {
        var j = this;
        d.promises.push(b(angular.bind(this, function () {
          j.deleteMessage(d)
        }), d.ttl)), d.promises.push(b(d.countdownFunction, 1e3))
      }
      return d
    }
  }, this.deleteMessage = function (a) {
    var b = this.getAllMessages(a.referenceId), c = b.indexOf(a);
    c > -1 && (b[c].close = !0, b.splice(c, 1)), "function" == typeof a.onclose && a.onclose()
  }
}]);










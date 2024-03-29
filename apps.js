require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = "function" == typeof require && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        throw new Error("Cannot find module '" + o + "'")
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n ? n : e)
      }, f, f.exports, e, t, n, r)
    }
    return n[o].exports
  }
  for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) s(r[o]);
  return s
}({
  1: [
    function(require) {
      window._ = require("underscore/underscore"), window.Backbone = require("backbone"), window.Backbone.$ = $;
      var graphElement = require("jointjs/element"),
        graph = require("jointjs/graph");
      require("angular-bootstrap/src/transition/transition"), require("angular-bootstrap/src/modal/modal"), require("jointjs/paper"), require("directives/droppable"), require("services/selectedComponents"), angular.module("gaudiBuilder").controller("boardCtrl", ["$scope", "$modal", "$templateCache", "$window", "selectedComponents", "componentFetcher",
        function($scope, $modal, $templateCache, $window, selectedComponents, componentFetcher) {
          "use strict";

          function createLink(targetId) {
            var sourceName = this.get("name"),
              targetName = graph.getCell(targetId).get("name"),
              source = $scope.components[sourceName],
              target = $scope.components[targetName];
            source.createLink(target), $scope.$apply()
          }

          function removeLink(sourceId, targetId) {
            var sourceName = graph.getCell(sourceId).get("name"),
              targetName = graph.getCell(targetId).get("name"),
              source = $scope.components[sourceName],
              target = $scope.components[targetName];
            source.removeLink(target), $scope.$apply()
          }

          function onRemove() {
            var position, name = this.get("name");
            delete $scope.components[name], angular.forEach($scope.components, function(component) {
              (position = $.inArray(name, component.links)) >= 0 && component.links.splice(position, 1)
            }), $scope.$apply()
          }

          function onOpenDetail() {
            var editModal, componentName = this.get("name");
            editModal = $modal.open({
              templateUrl: "/builder/views/edit-component.html",
              controller: "editComponentCtrl",
              resolve: {
                values: function() {
                  var values = $scope.components[componentName];
                  return values.name = componentName, values
                }
              }
            }), editModal.result.then(function(formData) {
              if (formData.name !== componentName) {
                delete $scope.components[componentName], angular.forEach($scope.components, function(otherComponent) {
                  otherComponent.changeLinkedComponentName(formData.name, componentName)
                });
                var rects = graph.getElements();
                angular.forEach(rects, function(rect) {
                  rect.get("name") === componentName && rect.set("name", formData.name)
                })
              }
              $scope.components[formData.name] = formData.values
            })
          }
          $templateCache.put("template/modal/backdrop.html", require("angular-bootstrap/template/modal/backdrop.html")), $templateCache.put("template/modal/window.html", require("angular-bootstrap/template/modal/window.html")), $scope.components = selectedComponents.components;
          var allComponents = {};
          componentFetcher.getAllComponents().then(function(components) {
            allComponents = components
          }), $scope.handleDrop = function(component, board, event) {
            var rect, droppableDocumentOffset = $(board).offset(),
              left = (event.x || event.clientX) - droppableDocumentOffset.left - component.clientWidth / 2 + $window.pageXOffset,
              top = (event.y || event.clientY) - droppableDocumentOffset.top - component.clientHeight / 2 + $window.pageYOffset,
              type = component.attributes["data-type"].value,
              name = selectedComponents.getElementName(type),
              componentInstance = allComponents[type],
              isBinary = "true" === component.attributes["data-binary"].value;
            rect = new graphElement({
              position: {
                x: left,
                y: top
              },
              size: {
                width: 216,
                height: 90
              },
              name: name,
              logo: component.attributes["data-logo"].value,
              binary: isBinary,
              options: {
                interactive: !0
              }
            }), graph.addCell(rect), rect.on("createLink", createLink), rect.on("removeLink", removeLink), rect.on("onOpenDetail", onOpenDetail), rect.on("onRemove", onRemove), $scope.components[name] = angular.copy(componentInstance), $scope.components[name].name = name, $scope.$apply()
          }
        }
      ])
    }, {
      "angular-bootstrap/src/modal/modal": 6,
      "angular-bootstrap/src/transition/transition": 7,
      "angular-bootstrap/template/modal/backdrop.html": 8,
      "angular-bootstrap/template/modal/window.html": 9,
      backbone: "pHOy1N",
      "directives/droppable": 38,
      "jointjs/element": 39,
      "jointjs/graph": 40,
      "jointjs/paper": 42,
      "services/selectedComponents": 49,
      "underscore/underscore": "9eM++n"
    }
  ],
  2: [
    function(require) {
      require("directives/draggable"), require("services/componentFetcher"), angular.module("gaudiBuilder").controller("componentsCtrl", ["$scope", "componentFetcher",
        function($scope, componentFetcher) {
          "use strict";
          $scope.components = [], $scope.search = {
            label: ""
          }, componentFetcher.getAllComponents().then(function(components) {
            for (var i in components) components.hasOwnProperty(i) && $scope.components.push(components[i])
          })
        }
      ])
    }, {
      "directives/draggable": 37,
      "services/componentFetcher": 48
    }
  ],
  3: [
    function(require) {
      require("services/yamlParser"), angular.module("gaudiBuilder").controller("editComponentCtrl", ["$scope", "$modalInstance", "$compile", "selectedComponents", "componentFetcher", "yamlParser", "values",
        function($scope, $modalInstance, $compile, selectedComponents, componentFetcher, yamlParser, values) {
          "use strict";
          var allComponents = {};
          componentFetcher.getAllComponents().then(function(components) {
            allComponents = components, $scope.fields = {
              common: allComponents[values.type].fields,
              custom: allComponents[values.type].customFields || null
            }, $scope.componentNames = Object.keys(selectedComponents.components), $scope.values = values, $scope.values.custom = values.custom || {}
          }), $scope.ok = function() {
            $modalInstance.close({
              name: $scope.values.name,
              values: $scope.values
            })
          }, $scope.cancel = function() {
            $modalInstance.dismiss("cancel")
          }
        }
      ])
    }, {
      "services/yamlParser": 50
    }
  ],
  4: [
    function(require) {
      require("services/yamlParser"), angular.module("gaudiBuilder").controller("yamlCtrl", ["$scope", "selectedComponents", "yamlParser",
        function($scope, selectedComponents, yamlParser) {
          "use strict";
          $scope.components = selectedComponents.components, $scope.getFileResult = function() {
            var results = {
              applications: {},
              binaries: {}
            };
            return angular.forEach($scope.components, function(component, name) {
              var componentResult = component.getOutputFields();
              results[component.binary ? "binaries" : "applications"][name] = componentResult
            }), results = yamlParser.cleanResult(JSON.parse(JSON.stringify(results))), results = yamlParser.cleanEmptyObjects(results), _.isEmpty(results) && (results = ""), yamlParser.dump(results, 5)
          }, $scope.generateFile = function() {
            var fakeLink = document.createElement("a");
            fakeLink.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(this.getFileResult())), fakeLink.setAttribute("download", ".gaudi.yml"), fakeLink.click()
          }
        }
      ])
    }, {
      "services/yamlParser": 50
    }
  ],
  5: [
    function(require) {
      require("angular/angular"), require("angular-route/angular-route"), require("ng-clip/dest/ng-clip"), window.jQuery = require("jquery");
      var app = angular.module("gaudiBuilder", ["ui.bootstrap.modal", "ngClipboard"]);
      app.config(["ngClipProvider",
        function(ngClipProvider) {
          "use strict";
          ngClipProvider.setPath("bower_components/zeroclipboard/ZeroClipboard.swf")
        }
      ]), require("./controllers/board"), require("./controllers/components"), require("./controllers/editComponent"), require("./controllers/yaml")
    }, {
      "./controllers/board": 1,
      "./controllers/components": 2,
      "./controllers/editComponent": 3,
      "./controllers/yaml": 4,
      "angular-route/angular-route": 10,
      "angular/angular": 11,
      jquery: "lwLqBl",
      "ng-clip/dest/ng-clip": 34
    }
  ],
  6: [
    function() {
      angular.module("ui.bootstrap.modal", ["ui.bootstrap.transition"]).factory("$$stackedMap", function() {
        return {
          createNew: function() {
            var stack = [];
            return {
              add: function(key, value) {
                stack.push({
                  key: key,
                  value: value
                })
              },
              get: function(key) {
                for (var i = 0; i < stack.length; i++)
                  if (key == stack[i].key) return stack[i]
              },
              keys: function() {
                for (var keys = [], i = 0; i < stack.length; i++) keys.push(stack[i].key);
                return keys
              },
              top: function() {
                return stack[stack.length - 1]
              },
              remove: function(key) {
                for (var idx = -1, i = 0; i < stack.length; i++)
                  if (key == stack[i].key) {
                    idx = i;
                    break
                  }
                return stack.splice(idx, 1)[0]
              },
              removeTop: function() {
                return stack.splice(stack.length - 1, 1)[0]
              },
              length: function() {
                return stack.length
              }
            }
          }
        }
      }).directive("modalBackdrop", ["$timeout",
        function($timeout) {
          return {
            restrict: "EA",
            replace: !0,
            templateUrl: "template/modal/backdrop.html",
            link: function(scope, element, attrs) {
              scope.backdropClass = attrs.backdropClass || "", scope.animate = !1, $timeout(function() {
                scope.animate = !0
              })
            }
          }
        }
      ]).directive("modalWindow", ["$modalStack", "$timeout",
        function($modalStack, $timeout) {
          return {
            restrict: "EA",
            scope: {
              index: "@",
              animate: "="
            },
            replace: !0,
            transclude: !0,
            templateUrl: function(tElement, tAttrs) {
              return tAttrs.templateUrl || "template/modal/window.html"
            },
            link: function(scope, element, attrs) {
              element.addClass(attrs.windowClass || ""), scope.size = attrs.size, $timeout(function() {
                scope.animate = !0, element[0].focus()
              }), scope.close = function(evt) {
                var modal = $modalStack.getTop();
                modal && modal.value.backdrop && "static" != modal.value.backdrop && evt.target === evt.currentTarget && (evt.preventDefault(), evt.stopPropagation(), $modalStack.dismiss(modal.key, "backdrop click"))
              }
            }
          }
        }
      ]).directive("modalTransclude", function() {
        return {
          link: function($scope, $element, $attrs, controller, $transclude) {
            $transclude($scope.$parent, function(clone) {
              $element.empty(), $element.append(clone)
            })
          }
        }
      }).factory("$modalStack", ["$transition", "$timeout", "$document", "$compile", "$rootScope", "$$stackedMap",
        function($transition, $timeout, $document, $compile, $rootScope, $$stackedMap) {
          function backdropIndex() {
            for (var topBackdropIndex = -1, opened = openedWindows.keys(), i = 0; i < opened.length; i++) openedWindows.get(opened[i]).value.backdrop && (topBackdropIndex = i);
            return topBackdropIndex
          }

          function removeModalWindow(modalInstance) {
            var body = $document.find("body").eq(0),
              modalWindow = openedWindows.get(modalInstance).value;
            openedWindows.remove(modalInstance), removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, 300, function() {
              modalWindow.modalScope.$destroy(), body.toggleClass(OPENED_MODAL_CLASS, openedWindows.length() > 0), checkRemoveBackdrop()
            })
          }

          function checkRemoveBackdrop() {
            if (backdropDomEl && -1 == backdropIndex()) {
              var backdropScopeRef = backdropScope;
              removeAfterAnimate(backdropDomEl, backdropScope, 150, function() {
                backdropScopeRef.$destroy(), backdropScopeRef = null
              }), backdropDomEl = void 0, backdropScope = void 0
            }
          }

          function removeAfterAnimate(domEl, scope, emulateTime, done) {
            function afterAnimating() {
              afterAnimating.done || (afterAnimating.done = !0, domEl.remove(), done && done())
            }
            scope.animate = !1;
            var transitionEndEventName = $transition.transitionEndEventName;
            if (transitionEndEventName) {
              var timeout = $timeout(afterAnimating, emulateTime);
              domEl.bind(transitionEndEventName, function() {
                $timeout.cancel(timeout), afterAnimating(), scope.$apply()
              })
            } else $timeout(afterAnimating)
          }
          var backdropDomEl, backdropScope, OPENED_MODAL_CLASS = "modal-open",
            openedWindows = $$stackedMap.createNew(),
            $modalStack = {};
          return $rootScope.$watch(backdropIndex, function(newBackdropIndex) {
            backdropScope && (backdropScope.index = newBackdropIndex)
          }), $document.bind("keydown", function(evt) {
            var modal;
            27 === evt.which && (modal = openedWindows.top(), modal && modal.value.keyboard && (evt.preventDefault(), $rootScope.$apply(function() {
              $modalStack.dismiss(modal.key, "escape key press")
            })))
          }), $modalStack.open = function(modalInstance, modal) {
            openedWindows.add(modalInstance, {
              deferred: modal.deferred,
              modalScope: modal.scope,
              backdrop: modal.backdrop,
              keyboard: modal.keyboard
            });
            var body = $document.find("body").eq(0),
              currBackdropIndex = backdropIndex();
            if (currBackdropIndex >= 0 && !backdropDomEl) {
              backdropScope = $rootScope.$new(!0), backdropScope.index = currBackdropIndex;
              var angularBackgroundDomEl = angular.element("<div modal-backdrop></div>");
              angularBackgroundDomEl.attr("backdrop-class", modal.backdropClass), backdropDomEl = $compile(angularBackgroundDomEl)(backdropScope), body.append(backdropDomEl)
            }
            var angularDomEl = angular.element("<div modal-window></div>");
            angularDomEl.attr({
              "template-url": modal.windowTemplateUrl,
              "window-class": modal.windowClass,
              size: modal.size,
              index: openedWindows.length() - 1,
              animate: "animate"
            }).html(modal.content);
            var modalDomEl = $compile(angularDomEl)(modal.scope);
            openedWindows.top().value.modalDomEl = modalDomEl, body.append(modalDomEl), body.addClass(OPENED_MODAL_CLASS)
          }, $modalStack.close = function(modalInstance, result) {
            var modalWindow = openedWindows.get(modalInstance);
            modalWindow && (modalWindow.value.deferred.resolve(result), removeModalWindow(modalInstance))
          }, $modalStack.dismiss = function(modalInstance, reason) {
            var modalWindow = openedWindows.get(modalInstance);
            modalWindow && (modalWindow.value.deferred.reject(reason), removeModalWindow(modalInstance))
          }, $modalStack.dismissAll = function(reason) {
            for (var topModal = this.getTop(); topModal;) this.dismiss(topModal.key, reason), topModal = this.getTop()
          }, $modalStack.getTop = function() {
            return openedWindows.top()
          }, $modalStack
        }
      ]).provider("$modal", function() {
        var $modalProvider = {
          options: {
            backdrop: !0,
            keyboard: !0
          },
          $get: ["$injector", "$rootScope", "$q", "$http", "$templateCache", "$controller", "$modalStack",
            function($injector, $rootScope, $q, $http, $templateCache, $controller, $modalStack) {
              function getTemplatePromise(options) {
                return options.template ? $q.when(options.template) : $http.get(options.templateUrl, {
                  cache: $templateCache
                }).then(function(result) {
                  return result.data
                })
              }

              function getResolvePromises(resolves) {
                var promisesArr = [];
                return angular.forEach(resolves, function(value) {
                  (angular.isFunction(value) || angular.isArray(value)) && promisesArr.push($q.when($injector.invoke(value)))
                }), promisesArr
              }
              var $modal = {};
              return $modal.open = function(modalOptions) {
                var modalResultDeferred = $q.defer(),
                  modalOpenedDeferred = $q.defer(),
                  modalInstance = {
                    result: modalResultDeferred.promise,
                    opened: modalOpenedDeferred.promise,
                    close: function(result) {
                      $modalStack.close(modalInstance, result)
                    },
                    dismiss: function(reason) {
                      $modalStack.dismiss(modalInstance, reason)
                    }
                  };
                if (modalOptions = angular.extend({}, $modalProvider.options, modalOptions), modalOptions.resolve = modalOptions.resolve || {}, !modalOptions.template && !modalOptions.templateUrl) throw new Error("One of template or templateUrl options is required.");
                var templateAndResolvePromise = $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));
                return templateAndResolvePromise.then(function(tplAndVars) {
                  var modalScope = (modalOptions.scope || $rootScope).$new();
                  modalScope.$close = modalInstance.close, modalScope.$dismiss = modalInstance.dismiss;
                  var ctrlInstance, ctrlLocals = {},
                    resolveIter = 1;
                  modalOptions.controller && (ctrlLocals.$scope = modalScope, ctrlLocals.$modalInstance = modalInstance, angular.forEach(modalOptions.resolve, function(value, key) {
                    ctrlLocals[key] = tplAndVars[resolveIter++]
                  }), ctrlInstance = $controller(modalOptions.controller, ctrlLocals), modalOptions.controller && (modalScope[modalOptions.controllerAs] = ctrlInstance)), $modalStack.open(modalInstance, {
                    scope: modalScope,
                    deferred: modalResultDeferred,
                    content: tplAndVars[0],
                    backdrop: modalOptions.backdrop,
                    keyboard: modalOptions.keyboard,
                    backdropClass: modalOptions.backdropClass,
                    windowClass: modalOptions.windowClass,
                    windowTemplateUrl: modalOptions.windowTemplateUrl,
                    size: modalOptions.size
                  })
                }, function(reason) {
                  modalResultDeferred.reject(reason)
                }), templateAndResolvePromise.then(function() {
                  modalOpenedDeferred.resolve(!0)
                }, function() {
                  modalOpenedDeferred.reject(!1)
                }), modalInstance
              }, $modal
            }
          ]
        };
        return $modalProvider
      })
    }, {}
  ],
  7: [
    function() {
      angular.module("ui.bootstrap.transition", []).factory("$transition", ["$q", "$timeout", "$rootScope",
        function($q, $timeout, $rootScope) {
          function findEndEventName(endEventNames) {
            for (var name in endEventNames)
              if (void 0 !== transElement.style[name]) return endEventNames[name]
          }
          var $transition = function(element, trigger, options) {
              options = options || {};
              var deferred = $q.defer(),
                endEventName = $transition[options.animation ? "animationEndEventName" : "transitionEndEventName"],
                transitionEndHandler = function() {
                  $rootScope.$apply(function() {
                    element.unbind(endEventName, transitionEndHandler), deferred.resolve(element)
                  })
                };
              return endEventName && element.bind(endEventName, transitionEndHandler), $timeout(function() {
                angular.isString(trigger) ? element.addClass(trigger) : angular.isFunction(trigger) ? trigger(element) : angular.isObject(trigger) && element.css(trigger), endEventName || deferred.resolve(element)
              }), deferred.promise.cancel = function() {
                endEventName && element.unbind(endEventName, transitionEndHandler), deferred.reject("Transition cancelled")
              }, deferred.promise
            },
            transElement = document.createElement("trans"),
            transitionEndEventNames = {
              WebkitTransition: "webkitTransitionEnd",
              MozTransition: "transitionend",
              OTransition: "oTransitionEnd",
              transition: "transitionend"
            },
            animationEndEventNames = {
              WebkitTransition: "webkitAnimationEnd",
              MozTransition: "animationend",
              OTransition: "oAnimationEnd",
              transition: "animationend"
            };
          return $transition.transitionEndEventName = findEndEventName(transitionEndEventNames), $transition.animationEndEventName = findEndEventName(animationEndEventNames), $transition
        }
      ])
    }, {}
  ],
  8: [
    function(require, module) {
      module.exports = '<div class="modal-backdrop fade {{ backdropClass }}"     ng-class="{in: animate}"     ng-style="{\'z-index\': 1040 + (index && 1 || 0) + index*10}"></div>'
    }, {}
  ],
  9: [
    function(require, module) {
      module.exports = '<div tabindex="-1" role="dialog" class="modal fade" ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)">    <div class="modal-dialog" ng-class="{\'modal-sm\': size == \'sm\', \'modal-lg\': size == \'lg\'}"><div class="modal-content" modal-transclude></div></div></div>'
    }, {}
  ],
  10: [
    function() {
      ! function(window, angular) {
        "use strict";

        function $RouteProvider() {
          function inherit(parent, extra) {
            return angular.extend(new(angular.extend(function() {}, {
              prototype: parent
            })), extra)
          }

          function pathRegExp(path, opts) {
            var insensitive = opts.caseInsensitiveMatch,
              ret = {
                originalPath: path,
                regexp: path
              },
              keys = ret.keys = [];
            return path = path.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)([\?\*])?/g, function(_, slash, key, option) {
              var optional = "?" === option ? option : null,
                star = "*" === option ? option : null;
              return keys.push({
                name: key,
                optional: !!optional
              }), slash = slash || "", "" + (optional ? "" : slash) + "(?:" + (optional ? slash : "") + (star && "(.+?)" || "([^/]+)") + (optional || "") + ")" + (optional || "")
            }).replace(/([\/$\*])/g, "\\$1"), ret.regexp = new RegExp("^" + path + "$", insensitive ? "i" : ""), ret
          }
          var routes = {};
          this.when = function(path, route) {
            if (routes[path] = angular.extend({
              reloadOnSearch: !0
            }, route, path && pathRegExp(path, route)), path) {
              var redirectPath = "/" == path[path.length - 1] ? path.substr(0, path.length - 1) : path + "/";
              routes[redirectPath] = angular.extend({
                redirectTo: path
              }, pathRegExp(redirectPath, route))
            }
            return this
          }, this.otherwise = function(params) {
            return this.when(null, params), this
          }, this.$get = ["$rootScope", "$location", "$routeParams", "$q", "$injector", "$http", "$templateCache", "$sce",
            function($rootScope, $location, $routeParams, $q, $injector, $http, $templateCache, $sce) {
              function switchRouteMatcher(on, route) {
                var keys = route.keys,
                  params = {};
                if (!route.regexp) return null;
                var m = route.regexp.exec(on);
                if (!m) return null;
                for (var i = 1, len = m.length; len > i; ++i) {
                  var key = keys[i - 1],
                    val = "string" == typeof m[i] ? decodeURIComponent(m[i]) : m[i];
                  key && val && (params[key.name] = val)
                }
                return params
              }

              function updateRoute() {
                var next = parseRoute(),
                  last = $route.current;
                next && last && next.$$route === last.$$route && angular.equals(next.pathParams, last.pathParams) && !next.reloadOnSearch && !forceReload ? (last.params = next.params, angular.copy(last.params, $routeParams), $rootScope.$broadcast("$routeUpdate", last)) : (next || last) && (forceReload = !1, $rootScope.$broadcast("$routeChangeStart", next, last), $route.current = next, next && next.redirectTo && (angular.isString(next.redirectTo) ? $location.path(interpolate(next.redirectTo, next.params)).search(next.params).replace() : $location.url(next.redirectTo(next.pathParams, $location.path(), $location.search())).replace()), $q.when(next).then(function() {
                  if (next) {
                    var template, templateUrl, locals = angular.extend({}, next.resolve);
                    return angular.forEach(locals, function(value, key) {
                      locals[key] = angular.isString(value) ? $injector.get(value) : $injector.invoke(value)
                    }), angular.isDefined(template = next.template) ? angular.isFunction(template) && (template = template(next.params)) : angular.isDefined(templateUrl = next.templateUrl) && (angular.isFunction(templateUrl) && (templateUrl = templateUrl(next.params)), templateUrl = $sce.getTrustedResourceUrl(templateUrl), angular.isDefined(templateUrl) && (next.loadedTemplateUrl = templateUrl, template = $http.get(templateUrl, {
                      cache: $templateCache
                    }).then(function(response) {
                      return response.data
                    }))), angular.isDefined(template) && (locals.$template = template), $q.all(locals)
                  }
                }).then(function(locals) {
                  next == $route.current && (next && (next.locals = locals, angular.copy(next.params, $routeParams)), $rootScope.$broadcast("$routeChangeSuccess", next, last))
                }, function(error) {
                  next == $route.current && $rootScope.$broadcast("$routeChangeError", next, last, error)
                }))
              }

              function parseRoute() {
                var params, match;
                return angular.forEach(routes, function(route) {
                  !match && (params = switchRouteMatcher($location.path(), route)) && (match = inherit(route, {
                    params: angular.extend({}, $location.search(), params),
                    pathParams: params
                  }), match.$$route = route)
                }), match || routes[null] && inherit(routes[null], {
                  params: {},
                  pathParams: {}
                })
              }

              function interpolate(string, params) {
                var result = [];
                return angular.forEach((string || "").split(":"), function(segment, i) {
                  if (0 === i) result.push(segment);
                  else {
                    var segmentMatch = segment.match(/(\w+)(.*)/),
                      key = segmentMatch[1];
                    result.push(params[key]), result.push(segmentMatch[2] || ""), delete params[key]
                  }
                }), result.join("")
              }
              var forceReload = !1,
                $route = {
                  routes: routes,
                  reload: function() {
                    forceReload = !0, $rootScope.$evalAsync(updateRoute)
                  }
                };
              return $rootScope.$on("$locationChangeSuccess", updateRoute), $route
            }
          ]
        }

        function $RouteParamsProvider() {
          this.$get = function() {
            return {}
          }
        }

        function ngViewFactory($route, $anchorScroll, $animate) {
          return {
            restrict: "ECA",
            terminal: !0,
            priority: 400,
            transclude: "element",
            link: function(scope, $element, attr, ctrl, $transclude) {
              function cleanupLastView() {
                previousElement && (previousElement.remove(), previousElement = null), currentScope && (currentScope.$destroy(), currentScope = null), currentElement && ($animate.leave(currentElement, function() {
                  previousElement = null
                }), previousElement = currentElement, currentElement = null)
              }

              function update() {
                var locals = $route.current && $route.current.locals,
                  template = locals && locals.$template;
                if (angular.isDefined(template)) {
                  var newScope = scope.$new(),
                    current = $route.current,
                    clone = $transclude(newScope, function(clone) {
                      $animate.enter(clone, null, currentElement || $element, function() {
                        !angular.isDefined(autoScrollExp) || autoScrollExp && !scope.$eval(autoScrollExp) || $anchorScroll()
                      }), cleanupLastView()
                    });
                  currentElement = clone, currentScope = current.scope = newScope, currentScope.$emit("$viewContentLoaded"), currentScope.$eval(onloadExp)
                } else cleanupLastView()
              }
              var currentScope, currentElement, previousElement, autoScrollExp = attr.autoscroll,
                onloadExp = attr.onload || "";
              scope.$on("$routeChangeSuccess", update), update()
            }
          }
        }

        function ngViewFillContentFactory($compile, $controller, $route) {
          return {
            restrict: "ECA",
            priority: -400,
            link: function(scope, $element) {
              var current = $route.current,
                locals = current.locals;
              $element.html(locals.$template);
              var link = $compile($element.contents());
              if (current.controller) {
                locals.$scope = scope;
                var controller = $controller(current.controller, locals);
                current.controllerAs && (scope[current.controllerAs] = controller), $element.data("$ngControllerController", controller), $element.children().data("$ngControllerController", controller)
              }
              link(scope)
            }
          }
        }
        var ngRouteModule = angular.module("ngRoute", ["ng"]).provider("$route", $RouteProvider);
        ngRouteModule.provider("$routeParams", $RouteParamsProvider), ngRouteModule.directive("ngView", ngViewFactory), ngRouteModule.directive("ngView", ngViewFillContentFactory), ngViewFactory.$inject = ["$route", "$anchorScroll", "$animate"], ngViewFillContentFactory.$inject = ["$compile", "$controller", "$route"]
      }(window, window.angular)
    }, {}
  ],
  11: [
    function() {
      ! function(window, document, undefined) {
        "use strict";

        function minErr(module) {
          return function() {
            var message, i, code = arguments[0],
              prefix = "[" + (module ? module + ":" : "") + code + "] ",
              template = arguments[1],
              templateArgs = arguments,
              stringify = function(obj) {
                return "function" == typeof obj ? obj.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof obj ? "undefined" : "string" != typeof obj ? JSON.stringify(obj) : obj
              };
            for (message = prefix + template.replace(/\{\d+\}/g, function(match) {
              var arg, index = +match.slice(1, -1);
              return index + 2 < templateArgs.length ? (arg = templateArgs[index + 2], "function" == typeof arg ? arg.toString().replace(/ ?\{[\s\S]*$/, "") : "undefined" == typeof arg ? "undefined" : "string" != typeof arg ? toJson(arg) : arg) : match
            }), message = message + "\nhttp://errors.angularjs.org/1.2.17-build.223+sha.d18d5f5/" + (module ? module + "/" : "") + code, i = 2; i < arguments.length; i++) message = message + (2 == i ? "?" : "&") + "p" + (i - 2) + "=" + encodeURIComponent(stringify(arguments[i]));
            return new Error(message)
          }
        }

        function isArrayLike(obj) {
          if (null == obj || isWindow(obj)) return !1;
          var length = obj.length;
          return 1 === obj.nodeType && length ? !0 : isString(obj) || isArray(obj) || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj
        }

        function forEach(obj, iterator, context) {
          var key;
          if (obj)
            if (isFunction(obj))
              for (key in obj) "prototype" == key || "length" == key || "name" == key || obj.hasOwnProperty && !obj.hasOwnProperty(key) || iterator.call(context, obj[key], key);
            else if (obj.forEach && obj.forEach !== forEach) obj.forEach(iterator, context);
          else if (isArrayLike(obj))
            for (key = 0; key < obj.length; key++) iterator.call(context, obj[key], key);
          else
            for (key in obj) obj.hasOwnProperty(key) && iterator.call(context, obj[key], key);
          return obj
        }

        function sortedKeys(obj) {
          var keys = [];
          for (var key in obj) obj.hasOwnProperty(key) && keys.push(key);
          return keys.sort()
        }

        function forEachSorted(obj, iterator, context) {
          for (var keys = sortedKeys(obj), i = 0; i < keys.length; i++) iterator.call(context, obj[keys[i]], keys[i]);
          return keys
        }

        function reverseParams(iteratorFn) {
          return function(value, key) {
            iteratorFn(key, value)
          }
        }

        function nextUid() {
          for (var digit, index = uid.length; index;) {
            if (index--, digit = uid[index].charCodeAt(0), 57 == digit) return uid[index] = "A", uid.join("");
            if (90 != digit) return uid[index] = String.fromCharCode(digit + 1), uid.join("");
            uid[index] = "0"
          }
          return uid.unshift("0"), uid.join("")
        }

        function setHashKey(obj, h) {
          h ? obj.$$hashKey = h : delete obj.$$hashKey
        }

        function extend(dst) {
          var h = dst.$$hashKey;
          return forEach(arguments, function(obj) {
            obj !== dst && forEach(obj, function(value, key) {
              dst[key] = value
            })
          }), setHashKey(dst, h), dst
        }

        function int(str) {
          return parseInt(str, 10)
        }

        function inherit(parent, extra) {
          return extend(new(extend(function() {}, {
            prototype: parent
          })), extra)
        }

        function noop() {}

        function identity($) {
          return $
        }

        function valueFn(value) {
          return function() {
            return value
          }
        }

        function isUndefined(value) {
          return "undefined" == typeof value
        }

        function isDefined(value) {
          return "undefined" != typeof value
        }

        function isObject(value) {
          return null != value && "object" == typeof value
        }

        function isString(value) {
          return "string" == typeof value
        }

        function isNumber(value) {
          return "number" == typeof value
        }

        function isDate(value) {
          return "[object Date]" === toString.call(value)
        }

        function isArray(value) {
          return "[object Array]" === toString.call(value)
        }

        function isFunction(value) {
          return "function" == typeof value
        }

        function isRegExp(value) {
          return "[object RegExp]" === toString.call(value)
        }

        function isWindow(obj) {
          return obj && obj.document && obj.location && obj.alert && obj.setInterval
        }

        function isScope(obj) {
          return obj && obj.$evalAsync && obj.$watch
        }

        function isFile(obj) {
          return "[object File]" === toString.call(obj)
        }

        function isBlob(obj) {
          return "[object Blob]" === toString.call(obj)
        }

        function isElement(node) {
          return !(!node || !(node.nodeName || node.prop && node.attr && node.find))
        }

        function map(obj, iterator, context) {
          var results = [];
          return forEach(obj, function(value, index, list) {
            results.push(iterator.call(context, value, index, list))
          }), results
        }

        function includes(array, obj) {
          return -1 != indexOf(array, obj)
        }

        function indexOf(array, obj) {
          if (array.indexOf) return array.indexOf(obj);
          for (var i = 0; i < array.length; i++)
            if (obj === array[i]) return i;
          return -1
        }

        function arrayRemove(array, value) {
          var index = indexOf(array, value);
          return index >= 0 && array.splice(index, 1), value
        }

        function copy(source, destination, stackSource, stackDest) {
          if (isWindow(source) || isScope(source)) throw ngMinErr("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
          if (destination) {
            if (source === destination) throw ngMinErr("cpi", "Can't copy! Source and destination are identical.");
            if (stackSource = stackSource || [], stackDest = stackDest || [], isObject(source)) {
              var index = indexOf(stackSource, source);
              if (-1 !== index) return stackDest[index];
              stackSource.push(source), stackDest.push(destination)
            }
            var result;
            if (isArray(source)) {
              destination.length = 0;
              for (var i = 0; i < source.length; i++) result = copy(source[i], null, stackSource, stackDest), isObject(source[i]) && (stackSource.push(source[i]), stackDest.push(result)), destination.push(result)
            } else {
              var h = destination.$$hashKey;
              forEach(destination, function(value, key) {
                delete destination[key]
              });
              for (var key in source) result = copy(source[key], null, stackSource, stackDest), isObject(source[key]) && (stackSource.push(source[key]), stackDest.push(result)), destination[key] = result;
              setHashKey(destination, h)
            }
          } else destination = source, source && (isArray(source) ? destination = copy(source, [], stackSource, stackDest) : isDate(source) ? destination = new Date(source.getTime()) : isRegExp(source) ? destination = new RegExp(source.source) : isObject(source) && (destination = copy(source, {}, stackSource, stackDest)));
          return destination
        }

        function shallowCopy(src, dst) {
          if (isArray(src)) {
            dst = dst || [];
            for (var i = 0; i < src.length; i++) dst[i] = src[i]
          } else if (isObject(src)) {
            dst = dst || {};
            for (var key in src)!hasOwnProperty.call(src, key) || "$" === key.charAt(0) && "$" === key.charAt(1) || (dst[key] = src[key])
          }
          return dst || src
        }

        function equals(o1, o2) {
          if (o1 === o2) return !0;
          if (null === o1 || null === o2) return !1;
          if (o1 !== o1 && o2 !== o2) return !0;
          var length, key, keySet, t1 = typeof o1,
            t2 = typeof o2;
          if (t1 == t2 && "object" == t1) {
            if (!isArray(o1)) {
              if (isDate(o1)) return isDate(o2) && o1.getTime() == o2.getTime();
              if (isRegExp(o1) && isRegExp(o2)) return o1.toString() == o2.toString();
              if (isScope(o1) || isScope(o2) || isWindow(o1) || isWindow(o2) || isArray(o2)) return !1;
              keySet = {};
              for (key in o1)
                if ("$" !== key.charAt(0) && !isFunction(o1[key])) {
                  if (!equals(o1[key], o2[key])) return !1;
                  keySet[key] = !0
                }
              for (key in o2)
                if (!keySet.hasOwnProperty(key) && "$" !== key.charAt(0) && o2[key] !== undefined && !isFunction(o2[key])) return !1;
              return !0
            }
            if (!isArray(o2)) return !1;
            if ((length = o1.length) == o2.length) {
              for (key = 0; length > key; key++)
                if (!equals(o1[key], o2[key])) return !1;
              return !0
            }
          }
          return !1
        }

        function csp() {
          return document.securityPolicy && document.securityPolicy.isActive || document.querySelector && !(!document.querySelector("[ng-csp]") && !document.querySelector("[data-ng-csp]"))
        }

        function concat(array1, array2, index) {
          return array1.concat(slice.call(array2, index))
        }

        function sliceArgs(args, startIndex) {
          return slice.call(args, startIndex || 0)
        }

        function bind(self, fn) {
          var curryArgs = arguments.length > 2 ? sliceArgs(arguments, 2) : [];
          return !isFunction(fn) || fn instanceof RegExp ? fn : curryArgs.length ? function() {
            return arguments.length ? fn.apply(self, curryArgs.concat(slice.call(arguments, 0))) : fn.apply(self, curryArgs)
          } : function() {
            return arguments.length ? fn.apply(self, arguments) : fn.call(self)
          }
        }

        function toJsonReplacer(key, value) {
          var val = value;
          return "string" == typeof key && "$" === key.charAt(0) ? val = undefined : isWindow(value) ? val = "$WINDOW" : value && document === value ? val = "$DOCUMENT" : isScope(value) && (val = "$SCOPE"), val
        }

        function toJson(obj, pretty) {
          return "undefined" == typeof obj ? undefined : JSON.stringify(obj, toJsonReplacer, pretty ? "  " : null)
        }

        function fromJson(json) {
          return isString(json) ? JSON.parse(json) : json
        }

        function toBoolean(value) {
          if ("function" == typeof value) value = !0;
          else if (value && 0 !== value.length) {
            var v = lowercase("" + value);
            value = !("f" == v || "0" == v || "false" == v || "no" == v || "n" == v || "[]" == v)
          } else value = !1;
          return value
        }

        function startingTag(element) {
          element = jqLite(element).clone();
          try {
            element.empty()
          } catch (e) {}
          var TEXT_NODE = 3,
            elemHtml = jqLite("<div>").append(element).html();
          try {
            return element[0].nodeType === TEXT_NODE ? lowercase(elemHtml) : elemHtml.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(match, nodeName) {
              return "<" + lowercase(nodeName)
            })
          } catch (e) {
            return lowercase(elemHtml)
          }
        }

        function tryDecodeURIComponent(value) {
          try {
            return decodeURIComponent(value)
          } catch (e) {}
        }

        function parseKeyValue(keyValue) {
          var key_value, key, obj = {};
          return forEach((keyValue || "").split("&"), function(keyValue) {
            if (keyValue && (key_value = keyValue.split("="), key = tryDecodeURIComponent(key_value[0]), isDefined(key))) {
              var val = isDefined(key_value[1]) ? tryDecodeURIComponent(key_value[1]) : !0;
              obj[key] ? isArray(obj[key]) ? obj[key].push(val) : obj[key] = [obj[key], val] : obj[key] = val
            }
          }), obj
        }

        function toKeyValue(obj) {
          var parts = [];
          return forEach(obj, function(value, key) {
            isArray(value) ? forEach(value, function(arrayValue) {
              parts.push(encodeUriQuery(key, !0) + (arrayValue === !0 ? "" : "=" + encodeUriQuery(arrayValue, !0)))
            }) : parts.push(encodeUriQuery(key, !0) + (value === !0 ? "" : "=" + encodeUriQuery(value, !0)))
          }), parts.length ? parts.join("&") : ""
        }

        function encodeUriSegment(val) {
          return encodeUriQuery(val, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
        }

        function encodeUriQuery(val, pctEncodeSpaces) {
          return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, pctEncodeSpaces ? "%20" : "+")
        }

        function angularInit(element, bootstrap) {
          function append(element) {
            element && elements.push(element)
          }
          var appElement, module, elements = [element],
            names = ["ng:app", "ng-app", "x-ng-app", "data-ng-app"],
            NG_APP_CLASS_REGEXP = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
          forEach(names, function(name) {
            names[name] = !0, append(document.getElementById(name)), name = name.replace(":", "\\:"), element.querySelectorAll && (forEach(element.querySelectorAll("." + name), append), forEach(element.querySelectorAll("." + name + "\\:"), append), forEach(element.querySelectorAll("[" + name + "]"), append))
          }), forEach(elements, function(element) {
            if (!appElement) {
              var className = " " + element.className + " ",
                match = NG_APP_CLASS_REGEXP.exec(className);
              match ? (appElement = element, module = (match[2] || "").replace(/\s+/g, ",")) : forEach(element.attributes, function(attr) {
                !appElement && names[attr.name] && (appElement = element, module = attr.value)
              })
            }
          }), appElement && bootstrap(appElement, module ? [module] : [])
        }

        function bootstrap(element, modules) {
          var doBootstrap = function() {
              if (element = jqLite(element), element.injector()) {
                var tag = element[0] === document ? "document" : startingTag(element);
                throw ngMinErr("btstrpd", "App Already Bootstrapped with this Element '{0}'", tag)
              }
              modules = modules || [], modules.unshift(["$provide",
                function($provide) {
                  $provide.value("$rootElement", element)
                }
              ]), modules.unshift("ng");
              var injector = createInjector(modules);
              return injector.invoke(["$rootScope", "$rootElement", "$compile", "$injector", "$animate",
                function(scope, element, compile, injector) {
                  scope.$apply(function() {
                    element.data("$injector", injector), compile(element)(scope)
                  })
                }
              ]), injector
            },
            NG_DEFER_BOOTSTRAP = /^NG_DEFER_BOOTSTRAP!/;
          return window && !NG_DEFER_BOOTSTRAP.test(window.name) ? doBootstrap() : (window.name = window.name.replace(NG_DEFER_BOOTSTRAP, ""), void(angular.resumeBootstrap = function(extraModules) {
            forEach(extraModules, function(module) {
              modules.push(module)
            }), doBootstrap()
          }))
        }

        function snake_case(name, separator) {
          return separator = separator || "_", name.replace(SNAKE_CASE_REGEXP, function(letter, pos) {
            return (pos ? separator : "") + letter.toLowerCase()
          })
        }

        function bindJQuery() {
          jQuery = window.jQuery, jQuery && jQuery.fn.on ? (jqLite = jQuery, extend(jQuery.fn, {
            scope: JQLitePrototype.scope,
            isolateScope: JQLitePrototype.isolateScope,
            controller: JQLitePrototype.controller,
            injector: JQLitePrototype.injector,
            inheritedData: JQLitePrototype.inheritedData
          }), jqLitePatchJQueryRemove("remove", !0, !0, !1), jqLitePatchJQueryRemove("empty", !1, !1, !1), jqLitePatchJQueryRemove("html", !1, !1, !0)) : jqLite = JQLite, angular.element = jqLite
        }

        function assertArg(arg, name, reason) {
          if (!arg) throw ngMinErr("areq", "Argument '{0}' is {1}", name || "?", reason || "required");
          return arg
        }

        function assertArgFn(arg, name, acceptArrayAnnotation) {
          return acceptArrayAnnotation && isArray(arg) && (arg = arg[arg.length - 1]), assertArg(isFunction(arg), name, "not a function, got " + (arg && "object" == typeof arg ? arg.constructor.name || "Object" : typeof arg)), arg
        }

        function assertNotHasOwnProperty(name, context) {
          if ("hasOwnProperty" === name) throw ngMinErr("badname", "hasOwnProperty is not a valid {0} name", context)
        }

        function getter(obj, path, bindFnToScope) {
          if (!path) return obj;
          for (var key, keys = path.split("."), lastInstance = obj, len = keys.length, i = 0; len > i; i++) key = keys[i], obj && (obj = (lastInstance = obj)[key]);
          return !bindFnToScope && isFunction(obj) ? bind(lastInstance, obj) : obj
        }

        function getBlockElements(nodes) {
          var startNode = nodes[0],
            endNode = nodes[nodes.length - 1];
          if (startNode === endNode) return jqLite(startNode);
          var element = startNode,
            elements = [element];
          do {
            if (element = element.nextSibling, !element) break;
            elements.push(element)
          } while (element !== endNode);
          return jqLite(elements)
        }

        function setupModuleLoader(window) {
          function ensure(obj, name, factory) {
            return obj[name] || (obj[name] = factory())
          }
          var $injectorMinErr = minErr("$injector"),
            ngMinErr = minErr("ng"),
            angular = ensure(window, "angular", Object);
          return angular.$$minErr = angular.$$minErr || minErr, ensure(angular, "module", function() {
            var modules = {};
            return function(name, requires, configFn) {
              var assertNotHasOwnProperty = function(name, context) {
                if ("hasOwnProperty" === name) throw ngMinErr("badname", "hasOwnProperty is not a valid {0} name", context)
              };
              return assertNotHasOwnProperty(name, "module"), requires && modules.hasOwnProperty(name) && (modules[name] = null), ensure(modules, name, function() {
                function invokeLater(provider, method, insertMethod) {
                  return function() {
                    return invokeQueue[insertMethod || "push"]([provider, method, arguments]), moduleInstance
                  }
                }
                if (!requires) throw $injectorMinErr("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", name);
                var invokeQueue = [],
                  runBlocks = [],
                  config = invokeLater("$injector", "invoke"),
                  moduleInstance = {
                    _invokeQueue: invokeQueue,
                    _runBlocks: runBlocks,
                    requires: requires,
                    name: name,
                    provider: invokeLater("$provide", "provider"),
                    factory: invokeLater("$provide", "factory"),
                    service: invokeLater("$provide", "service"),
                    value: invokeLater("$provide", "value"),
                    constant: invokeLater("$provide", "constant", "unshift"),
                    animation: invokeLater("$animateProvider", "register"),
                    filter: invokeLater("$filterProvider", "register"),
                    controller: invokeLater("$controllerProvider", "register"),
                    directive: invokeLater("$compileProvider", "directive"),
                    config: config,
                    run: function(block) {
                      return runBlocks.push(block), this
                    }
                  };
                return configFn && config(configFn), moduleInstance
              })
            }
          })
        }

        function publishExternalAPI(angular) {
          extend(angular, {
            bootstrap: bootstrap,
            copy: copy,
            extend: extend,
            equals: equals,
            element: jqLite,
            forEach: forEach,
            injector: createInjector,
            noop: noop,
            bind: bind,
            toJson: toJson,
            fromJson: fromJson,
            identity: identity,
            isUndefined: isUndefined,
            isDefined: isDefined,
            isString: isString,
            isFunction: isFunction,
            isObject: isObject,
            isNumber: isNumber,
            isElement: isElement,
            isArray: isArray,
            version: version,
            isDate: isDate,
            lowercase: lowercase,
            uppercase: uppercase,
            callbacks: {
              counter: 0
            },
            $$minErr: minErr,
            $$csp: csp
          }), angularModule = setupModuleLoader(window);
          try {
            angularModule("ngLocale")
          } catch (e) {
            angularModule("ngLocale", []).provider("$locale", $LocaleProvider)
          }
          angularModule("ng", ["ngLocale"], ["$provide",
            function($provide) {
              $provide.provider({
                $$sanitizeUri: $$SanitizeUriProvider
              }), $provide.provider("$compile", $CompileProvider).directive({
                a: htmlAnchorDirective,
                input: inputDirective,
                textarea: inputDirective,
                form: formDirective,
                script: scriptDirective,
                select: selectDirective,
                style: styleDirective,
                option: optionDirective,
                ngBind: ngBindDirective,
                ngBindHtml: ngBindHtmlDirective,
                ngBindTemplate: ngBindTemplateDirective,
                ngClass: ngClassDirective,
                ngClassEven: ngClassEvenDirective,
                ngClassOdd: ngClassOddDirective,
                ngCloak: ngCloakDirective,
                ngController: ngControllerDirective,
                ngForm: ngFormDirective,
                ngHide: ngHideDirective,
                ngIf: ngIfDirective,
                ngInclude: ngIncludeDirective,
                ngInit: ngInitDirective,
                ngNonBindable: ngNonBindableDirective,
                ngPluralize: ngPluralizeDirective,
                ngRepeat: ngRepeatDirective,
                ngShow: ngShowDirective,
                ngStyle: ngStyleDirective,
                ngSwitch: ngSwitchDirective,
                ngSwitchWhen: ngSwitchWhenDirective,
                ngSwitchDefault: ngSwitchDefaultDirective,
                ngOptions: ngOptionsDirective,
                ngTransclude: ngTranscludeDirective,
                ngModel: ngModelDirective,
                ngList: ngListDirective,
                ngChange: ngChangeDirective,
                required: requiredDirective,
                ngRequired: requiredDirective,
                ngValue: ngValueDirective
              }).directive({
                ngInclude: ngIncludeFillContentDirective
              }).directive(ngAttributeAliasDirectives).directive(ngEventDirectives), $provide.provider({
                $anchorScroll: $AnchorScrollProvider,
                $animate: $AnimateProvider,
                $browser: $BrowserProvider,
                $cacheFactory: $CacheFactoryProvider,
                $controller: $ControllerProvider,
                $document: $DocumentProvider,
                $exceptionHandler: $ExceptionHandlerProvider,
                $filter: $FilterProvider,
                $interpolate: $InterpolateProvider,
                $interval: $IntervalProvider,
                $http: $HttpProvider,
                $httpBackend: $HttpBackendProvider,
                $location: $LocationProvider,
                $log: $LogProvider,
                $parse: $ParseProvider,
                $rootScope: $RootScopeProvider,
                $q: $QProvider,
                $sce: $SceProvider,
                $sceDelegate: $SceDelegateProvider,
                $sniffer: $SnifferProvider,
                $templateCache: $TemplateCacheProvider,
                $timeout: $TimeoutProvider,
                $window: $WindowProvider,
                $$rAF: $$RAFProvider,
                $$asyncCallback: $$AsyncCallbackProvider
              })
            }
          ])
        }

        function jqNextId() {
          return ++jqId
        }

        function camelCase(name) {
          return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
            return offset ? letter.toUpperCase() : letter
          }).replace(MOZ_HACK_REGEXP, "Moz$1")
        }

        function jqLitePatchJQueryRemove(name, dispatchThis, filterElems, getterIfNoArguments) {
          function removePatch(param) {
            var set, setIndex, setLength, element, childIndex, childLength, children, list = filterElems && param ? [this.filter(param)] : [this], fireEvent = dispatchThis;
            if (!getterIfNoArguments || null != param)
              for (; list.length;)
                for (set = list.shift(), setIndex = 0, setLength = set.length; setLength > setIndex; setIndex++)
                  for (element = jqLite(set [setIndex]), fireEvent ? element.triggerHandler("$destroy") : fireEvent = !fireEvent, childIndex = 0, childLength = (children = element.children()).length; childLength > childIndex; childIndex++) list.push(jQuery(children[childIndex]));
            return originalJqFn.apply(this, arguments)
          }
          var originalJqFn = jQuery.fn[name];
          originalJqFn = originalJqFn.$original || originalJqFn, removePatch.$original = originalJqFn, jQuery.fn[name] = removePatch
        }

        function jqLiteIsTextNode(html) {
          return !HTML_REGEXP.test(html)
        }

        function jqLiteBuildFragment(html, context) {
          var tmp, tag, wrap, i, j, jj, fragment = context.createDocumentFragment(),
            nodes = [];
          if (jqLiteIsTextNode(html)) nodes.push(context.createTextNode(html));
          else {
            for (tmp = fragment.appendChild(context.createElement("div")), tag = (TAG_NAME_REGEXP.exec(html) || ["", ""])[1].toLowerCase(), wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = "<div>&#160;</div>" + wrap[1] + html.replace(XHTML_TAG_REGEXP, "<$1></$2>") + wrap[2], tmp.removeChild(tmp.firstChild), i = wrap[0]; i--;) tmp = tmp.lastChild;
            for (j = 0, jj = tmp.childNodes.length; jj > j; ++j) nodes.push(tmp.childNodes[j]);
            tmp = fragment.firstChild, tmp.textContent = ""
          }
          return fragment.textContent = "", fragment.innerHTML = "", nodes
        }

        function jqLiteParseHTML(html, context) {
          context = context || document;
          var parsed;
          return (parsed = SINGLE_TAG_REGEXP.exec(html)) ? [context.createElement(parsed[1])] : jqLiteBuildFragment(html, context)
        }

        function JQLite(element) {
          if (element instanceof JQLite) return element;
          if (isString(element) && (element = trim(element)), !(this instanceof JQLite)) {
            if (isString(element) && "<" != element.charAt(0)) throw jqLiteMinErr("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
            return new JQLite(element)
          }
          if (isString(element)) {
            jqLiteAddNodes(this, jqLiteParseHTML(element));
            var fragment = jqLite(document.createDocumentFragment());
            fragment.append(this)
          } else jqLiteAddNodes(this, element)
        }

        function jqLiteClone(element) {
          return element.cloneNode(!0)
        }

        function jqLiteDealoc(element) {
          jqLiteRemoveData(element);
          for (var i = 0, children = element.childNodes || []; i < children.length; i++) jqLiteDealoc(children[i])
        }

        function jqLiteOff(element, type, fn, unsupported) {
          if (isDefined(unsupported)) throw jqLiteMinErr("offargs", "jqLite#off() does not support the `selector` argument");
          var events = jqLiteExpandoStore(element, "events"),
            handle = jqLiteExpandoStore(element, "handle");
          handle && (isUndefined(type) ? forEach(events, function(eventHandler, type) {
            removeEventListenerFn(element, type, eventHandler), delete events[type]
          }) : forEach(type.split(" "), function(type) {
            isUndefined(fn) ? (removeEventListenerFn(element, type, events[type]), delete events[type]) : arrayRemove(events[type] || [], fn)
          }))
        }

        function jqLiteRemoveData(element, name) {
          var expandoId = element[jqName],
            expandoStore = jqCache[expandoId];
          if (expandoStore) {
            if (name) return void delete jqCache[expandoId].data[name];
            expandoStore.handle && (expandoStore.events.$destroy && expandoStore.handle({}, "$destroy"), jqLiteOff(element)), delete jqCache[expandoId], element[jqName] = undefined
          }
        }

        function jqLiteExpandoStore(element, key, value) {
          var expandoId = element[jqName],
            expandoStore = jqCache[expandoId || -1];
          return isDefined(value) ? (expandoStore || (element[jqName] = expandoId = jqNextId(), expandoStore = jqCache[expandoId] = {}), void(expandoStore[key] = value)) : expandoStore && expandoStore[key]
        }

        function jqLiteData(element, key, value) {
          var data = jqLiteExpandoStore(element, "data"),
            isSetter = isDefined(value),
            keyDefined = !isSetter && isDefined(key),
            isSimpleGetter = keyDefined && !isObject(key);
          if (data || isSimpleGetter || jqLiteExpandoStore(element, "data", data = {}), isSetter) data[key] = value;
          else {
            if (!keyDefined) return data;
            if (isSimpleGetter) return data && data[key];
            extend(data, key)
          }
        }

        function jqLiteHasClass(element, selector) {
          return element.getAttribute ? (" " + (element.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + selector + " ") > -1 : !1
        }

        function jqLiteRemoveClass(element, cssClasses) {
          cssClasses && element.setAttribute && forEach(cssClasses.split(" "), function(cssClass) {
            element.setAttribute("class", trim((" " + (element.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + trim(cssClass) + " ", " ")))
          })
        }

        function jqLiteAddClass(element, cssClasses) {
          if (cssClasses && element.setAttribute) {
            var existingClasses = (" " + (element.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            forEach(cssClasses.split(" "), function(cssClass) {
              cssClass = trim(cssClass), -1 === existingClasses.indexOf(" " + cssClass + " ") && (existingClasses += cssClass + " ")
            }), element.setAttribute("class", trim(existingClasses))
          }
        }

        function jqLiteAddNodes(root, elements) {
          if (elements) {
            elements = elements.nodeName || !isDefined(elements.length) || isWindow(elements) ? [elements] : elements;
            for (var i = 0; i < elements.length; i++) root.push(elements[i])
          }
        }

        function jqLiteController(element, name) {
          return jqLiteInheritedData(element, "$" + (name || "ngController") + "Controller")
        }

        function jqLiteInheritedData(element, name, value) {
          element = jqLite(element), 9 == element[0].nodeType && (element = element.find("html"));
          for (var names = isArray(name) ? name : [name]; element.length;) {
            for (var node = element[0], i = 0, ii = names.length; ii > i; i++)
              if ((value = element.data(names[i])) !== undefined) return value;
            element = jqLite(node.parentNode || 11 === node.nodeType && node.host)
          }
        }

        function jqLiteEmpty(element) {
          for (var i = 0, childNodes = element.childNodes; i < childNodes.length; i++) jqLiteDealoc(childNodes[i]);
          for (; element.firstChild;) element.removeChild(element.firstChild)
        }

        function getBooleanAttrName(element, name) {
          var booleanAttr = BOOLEAN_ATTR[name.toLowerCase()];
          return booleanAttr && BOOLEAN_ELEMENTS[element.nodeName] && booleanAttr
        }

        function createEventHandler(element, events) {
          var eventHandler = function(event, type) {
            if (event.preventDefault || (event.preventDefault = function() {
              event.returnValue = !1
            }), event.stopPropagation || (event.stopPropagation = function() {
              event.cancelBubble = !0
            }), event.target || (event.target = event.srcElement || document), isUndefined(event.defaultPrevented)) {
              var prevent = event.preventDefault;
              event.preventDefault = function() {
                event.defaultPrevented = !0, prevent.call(event)
              }, event.defaultPrevented = !1
            }
            event.isDefaultPrevented = function() {
              return event.defaultPrevented || event.returnValue === !1
            };
            var eventHandlersCopy = shallowCopy(events[type || event.type] || []);
            forEach(eventHandlersCopy, function(fn) {
              fn.call(element, event)
            }), 8 >= msie ? (event.preventDefault = null, event.stopPropagation = null, event.isDefaultPrevented = null) : (delete event.preventDefault, delete event.stopPropagation, delete event.isDefaultPrevented)
          };
          return eventHandler.elem = element, eventHandler
        }

        function hashKey(obj) {
          var key, objType = typeof obj;
          return "object" == objType && null !== obj ? "function" == typeof(key = obj.$$hashKey) ? key = obj.$$hashKey() : key === undefined && (key = obj.$$hashKey = nextUid()) : key = obj, objType + ":" + key
        }

        function HashMap(array) {
          forEach(array, this.put, this)
        }

        function annotate(fn) {
          var $inject, fnText, argDecl, last;
          return "function" == typeof fn ? ($inject = fn.$inject) || ($inject = [], fn.length && (fnText = fn.toString().replace(STRIP_COMMENTS, ""), argDecl = fnText.match(FN_ARGS), forEach(argDecl[1].split(FN_ARG_SPLIT), function(arg) {
            arg.replace(FN_ARG, function(all, underscore, name) {
              $inject.push(name)
            })
          })), fn.$inject = $inject) : isArray(fn) ? (last = fn.length - 1, assertArgFn(fn[last], "fn"), $inject = fn.slice(0, last)) : assertArgFn(fn, "fn", !0), $inject
        }

        function createInjector(modulesToLoad) {
          function supportObject(delegate) {
            return function(key, value) {
              return isObject(key) ? void forEach(key, reverseParams(delegate)) : delegate(key, value)
            }
          }

          function provider(name, provider_) {
            if (assertNotHasOwnProperty(name, "service"), (isFunction(provider_) || isArray(provider_)) && (provider_ = providerInjector.instantiate(provider_)), !provider_.$get) throw $injectorMinErr("pget", "Provider '{0}' must define $get factory method.", name);
            return providerCache[name + providerSuffix] = provider_
          }

          function factory(name, factoryFn) {
            return provider(name, {
              $get: factoryFn
            })
          }

          function service(name, constructor) {
            return factory(name, ["$injector",
              function($injector) {
                return $injector.instantiate(constructor)
              }
            ])
          }

          function value(name, val) {
            return factory(name, valueFn(val))
          }

          function constant(name, value) {
            assertNotHasOwnProperty(name, "constant"), providerCache[name] = value, instanceCache[name] = value
          }

          function decorator(serviceName, decorFn) {
            var origProvider = providerInjector.get(serviceName + providerSuffix),
              orig$get = origProvider.$get;
            origProvider.$get = function() {
              var origInstance = instanceInjector.invoke(orig$get, origProvider);
              return instanceInjector.invoke(decorFn, null, {
                $delegate: origInstance
              })
            }
          }

          function loadModules(modulesToLoad) {
            var moduleFn, invokeQueue, i, ii, runBlocks = [];
            return forEach(modulesToLoad, function(module) {
              if (!loadedModules.get(module)) {
                loadedModules.put(module, !0);
                try {
                  if (isString(module))
                    for (moduleFn = angularModule(module), runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks), invokeQueue = moduleFn._invokeQueue, i = 0, ii = invokeQueue.length; ii > i; i++) {
                      var invokeArgs = invokeQueue[i],
                        provider = providerInjector.get(invokeArgs[0]);
                      provider[invokeArgs[1]].apply(provider, invokeArgs[2])
                    } else isFunction(module) ? runBlocks.push(providerInjector.invoke(module)) : isArray(module) ? runBlocks.push(providerInjector.invoke(module)) : assertArgFn(module, "module")
                } catch (e) {
                  throw isArray(module) && (module = module[module.length - 1]), e.message && e.stack && -1 == e.stack.indexOf(e.message) && (e = e.message + "\n" + e.stack), $injectorMinErr("modulerr", "Failed to instantiate module {0} due to:\n{1}", module, e.stack || e.message || e)
                }
              }
            }), runBlocks
          }

          function createInternalInjector(cache, factory) {
            function getService(serviceName) {
              if (cache.hasOwnProperty(serviceName)) {
                if (cache[serviceName] === INSTANTIATING) throw $injectorMinErr("cdep", "Circular dependency found: {0}", path.join(" <- "));
                return cache[serviceName]
              }
              try {
                return path.unshift(serviceName), cache[serviceName] = INSTANTIATING, cache[serviceName] = factory(serviceName)
              } catch (err) {
                throw cache[serviceName] === INSTANTIATING && delete cache[serviceName], err
              } finally {
                path.shift()
              }
            }

            function invoke(fn, self, locals) {
              var length, i, key, args = [],
                $inject = annotate(fn);
              for (i = 0, length = $inject.length; length > i; i++) {
                if (key = $inject[i], "string" != typeof key) throw $injectorMinErr("itkn", "Incorrect injection token! Expected service name as string, got {0}", key);
                args.push(locals && locals.hasOwnProperty(key) ? locals[key] : getService(key))
              }
              return fn.$inject || (fn = fn[length]), fn.apply(self, args)
            }

            function instantiate(Type, locals) {
              var instance, returnedValue, Constructor = function() {};
              return Constructor.prototype = (isArray(Type) ? Type[Type.length - 1] : Type).prototype, instance = new Constructor, returnedValue = invoke(Type, instance, locals), isObject(returnedValue) || isFunction(returnedValue) ? returnedValue : instance
            }
            return {
              invoke: invoke,
              instantiate: instantiate,
              get: getService,
              annotate: annotate,
              has: function(name) {
                return providerCache.hasOwnProperty(name + providerSuffix) || cache.hasOwnProperty(name)
              }
            }
          }
          var INSTANTIATING = {},
            providerSuffix = "Provider",
            path = [],
            loadedModules = new HashMap,
            providerCache = {
              $provide: {
                provider: supportObject(provider),
                factory: supportObject(factory),
                service: supportObject(service),
                value: supportObject(value),
                constant: supportObject(constant),
                decorator: decorator
              }
            },
            providerInjector = providerCache.$injector = createInternalInjector(providerCache, function() {
              throw $injectorMinErr("unpr", "Unknown provider: {0}", path.join(" <- "))
            }),
            instanceCache = {},
            instanceInjector = instanceCache.$injector = createInternalInjector(instanceCache, function(servicename) {
              var provider = providerInjector.get(servicename + providerSuffix);
              return instanceInjector.invoke(provider.$get, provider)
            });
          return forEach(loadModules(modulesToLoad), function(fn) {
            instanceInjector.invoke(fn || noop)
          }), instanceInjector
        }

        function $AnchorScrollProvider() {
          var autoScrollingEnabled = !0;
          this.disableAutoScrolling = function() {
            autoScrollingEnabled = !1
          }, this.$get = ["$window", "$location", "$rootScope",
            function($window, $location, $rootScope) {
              function getFirstAnchor(list) {
                var result = null;
                return forEach(list, function(element) {
                  result || "a" !== lowercase(element.nodeName) || (result = element)
                }), result
              }

              function scroll() {
                var elm, hash = $location.hash();
                hash ? (elm = document.getElementById(hash)) ? elm.scrollIntoView() : (elm = getFirstAnchor(document.getElementsByName(hash))) ? elm.scrollIntoView() : "top" === hash && $window.scrollTo(0, 0) : $window.scrollTo(0, 0)
              }
              var document = $window.document;
              return autoScrollingEnabled && $rootScope.$watch(function() {
                return $location.hash()
              }, function() {
                $rootScope.$evalAsync(scroll)
              }), scroll
            }
          ]
        }

        function $$AsyncCallbackProvider() {
          this.$get = ["$$rAF", "$timeout",
            function($$rAF, $timeout) {
              return $$rAF.supported ? function(fn) {
                return $$rAF(fn)
              } : function(fn) {
                return $timeout(fn, 0, !1)
              }
            }
          ]
        }

        function Browser(window, document, $log, $sniffer) {
          function completeOutstandingRequest(fn) {
            try {
              fn.apply(null, sliceArgs(arguments, 1))
            } finally {
              if (outstandingRequestCount--, 0 === outstandingRequestCount)
                for (; outstandingRequestCallbacks.length;) try {
                  outstandingRequestCallbacks.pop()()
                } catch (e) {
                  $log.error(e)
                }
            }
          }

          function startPoller(interval, setTimeout) {
            ! function check() {
              forEach(pollFns, function(pollFn) {
                pollFn()
              }), pollTimeout = setTimeout(check, interval)
            }()
          }

          function fireUrlChange() {
            newLocation = null, lastBrowserUrl != self.url() && (lastBrowserUrl = self.url(), forEach(urlChangeListeners, function(listener) {
              listener(self.url())
            }))
          }
          var self = this,
            rawDocument = document[0],
            location = window.location,
            history = window.history,
            setTimeout = window.setTimeout,
            clearTimeout = window.clearTimeout,
            pendingDeferIds = {};
          self.isMock = !1;
          var outstandingRequestCount = 0,
            outstandingRequestCallbacks = [];
          self.$$completeOutstandingRequest = completeOutstandingRequest, self.$$incOutstandingRequestCount = function() {
            outstandingRequestCount++
          }, self.notifyWhenNoOutstandingRequests = function(callback) {
            forEach(pollFns, function(pollFn) {
              pollFn()
            }), 0 === outstandingRequestCount ? callback() : outstandingRequestCallbacks.push(callback)
          };
          var pollTimeout, pollFns = [];
          self.addPollFn = function(fn) {
            return isUndefined(pollTimeout) && startPoller(100, setTimeout), pollFns.push(fn), fn
          };
          var lastBrowserUrl = location.href,
            baseElement = document.find("base"),
            newLocation = null;
          self.url = function(url, replace) {
            if (location !== window.location && (location = window.location), history !== window.history && (history = window.history), url) {
              if (lastBrowserUrl == url) return;
              return lastBrowserUrl = url, $sniffer.history ? replace ? history.replaceState(null, "", url) : (history.pushState(null, "", url), baseElement.attr("href", baseElement.attr("href"))) : (newLocation = url, replace ? location.replace(url) : location.href = url), self
            }
            return newLocation || location.href.replace(/%27/g, "'")
          };
          var urlChangeListeners = [],
            urlChangeInit = !1;
          self.onUrlChange = function(callback) {
            return urlChangeInit || ($sniffer.history && jqLite(window).on("popstate", fireUrlChange), $sniffer.hashchange ? jqLite(window).on("hashchange", fireUrlChange) : self.addPollFn(fireUrlChange), urlChangeInit = !0), urlChangeListeners.push(callback), callback
          }, self.baseHref = function() {
            var href = baseElement.attr("href");
            return href ? href.replace(/^(https?\:)?\/\/[^\/]*/, "") : ""
          };
          var lastCookies = {},
            lastCookieString = "",
            cookiePath = self.baseHref();
          self.cookies = function(name, value) {
            var cookieLength, cookieArray, cookie, i, index;
            if (!name) {
              if (rawDocument.cookie !== lastCookieString)
                for (lastCookieString = rawDocument.cookie, cookieArray = lastCookieString.split("; "), lastCookies = {}, i = 0; i < cookieArray.length; i++) cookie = cookieArray[i], index = cookie.indexOf("="), index > 0 && (name = unescape(cookie.substring(0, index)), lastCookies[name] === undefined && (lastCookies[name] = unescape(cookie.substring(index + 1))));
              return lastCookies
            }
            value === undefined ? rawDocument.cookie = escape(name) + "=;path=" + cookiePath + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : isString(value) && (cookieLength = (rawDocument.cookie = escape(name) + "=" + escape(value) + ";path=" + cookiePath).length + 1, cookieLength > 4096 && $log.warn("Cookie '" + name + "' possibly not set or overflowed because it was too large (" + cookieLength + " > 4096 bytes)!"))
          }, self.defer = function(fn, delay) {
            var timeoutId;
            return outstandingRequestCount++, timeoutId = setTimeout(function() {
              delete pendingDeferIds[timeoutId], completeOutstandingRequest(fn)
            }, delay || 0), pendingDeferIds[timeoutId] = !0, timeoutId
          }, self.defer.cancel = function(deferId) {
            return pendingDeferIds[deferId] ? (delete pendingDeferIds[deferId], clearTimeout(deferId), completeOutstandingRequest(noop), !0) : !1
          }
        }

        function $BrowserProvider() {
          this.$get = ["$window", "$log", "$sniffer", "$document",
            function($window, $log, $sniffer, $document) {
              return new Browser($window, $document, $log, $sniffer)
            }
          ]
        }

        function $CacheFactoryProvider() {
          this.$get = function() {
            function cacheFactory(cacheId, options) {
              function refresh(entry) {
                entry != freshEnd && (staleEnd ? staleEnd == entry && (staleEnd = entry.n) : staleEnd = entry, link(entry.n, entry.p), link(entry, freshEnd), freshEnd = entry, freshEnd.n = null)
              }

              function link(nextEntry, prevEntry) {
                nextEntry != prevEntry && (nextEntry && (nextEntry.p = prevEntry), prevEntry && (prevEntry.n = nextEntry))
              }
              if (cacheId in caches) throw minErr("$cacheFactory")("iid", "CacheId '{0}' is already taken!", cacheId);
              var size = 0,
                stats = extend({}, options, {
                  id: cacheId
                }),
                data = {},
                capacity = options && options.capacity || Number.MAX_VALUE,
                lruHash = {},
                freshEnd = null,
                staleEnd = null;
              return caches[cacheId] = {
                put: function(key, value) {
                  if (capacity < Number.MAX_VALUE) {
                    var lruEntry = lruHash[key] || (lruHash[key] = {
                      key: key
                    });
                    refresh(lruEntry)
                  }
                  if (!isUndefined(value)) return key in data || size++, data[key] = value, size > capacity && this.remove(staleEnd.key), value
                },
                get: function(key) {
                  if (capacity < Number.MAX_VALUE) {
                    var lruEntry = lruHash[key];
                    if (!lruEntry) return;
                    refresh(lruEntry)
                  }
                  return data[key]
                },
                remove: function(key) {
                  if (capacity < Number.MAX_VALUE) {
                    var lruEntry = lruHash[key];
                    if (!lruEntry) return;
                    lruEntry == freshEnd && (freshEnd = lruEntry.p), lruEntry == staleEnd && (staleEnd = lruEntry.n), link(lruEntry.n, lruEntry.p), delete lruHash[key]
                  }
                  delete data[key], size--
                },
                removeAll: function() {
                  data = {}, size = 0, lruHash = {}, freshEnd = staleEnd = null
                },
                destroy: function() {
                  data = null, stats = null, lruHash = null, delete caches[cacheId]
                },
                info: function() {
                  return extend({}, stats, {
                    size: size
                  })
                }
              }
            }
            var caches = {};
            return cacheFactory.info = function() {
              var info = {};
              return forEach(caches, function(cache, cacheId) {
                info[cacheId] = cache.info()
              }), info
            }, cacheFactory.get = function(cacheId) {
              return caches[cacheId]
            }, cacheFactory
          }
        }

        function $TemplateCacheProvider() {
          this.$get = ["$cacheFactory",
            function($cacheFactory) {
              return $cacheFactory("templates")
            }
          ]
        }

        function $CompileProvider($provide, $$sanitizeUriProvider) {
          var hasDirectives = {},
            Suffix = "Directive",
            COMMENT_DIRECTIVE_REGEXP = /^\s*directive\:\s*([\d\w_\-]+)\s+(.*)$/,
            CLASS_DIRECTIVE_REGEXP = /(([\d\w_\-]+)(?:\:([^;]+))?;?)/,
            EVENT_HANDLER_ATTR_REGEXP = /^(on[a-z]+|formaction)$/;
          this.directive = function registerDirective(name, directiveFactory) {
            return assertNotHasOwnProperty(name, "directive"), isString(name) ? (assertArg(directiveFactory, "directiveFactory"), hasDirectives.hasOwnProperty(name) || (hasDirectives[name] = [], $provide.factory(name + Suffix, ["$injector", "$exceptionHandler",
              function($injector, $exceptionHandler) {
                var directives = [];
                return forEach(hasDirectives[name], function(directiveFactory, index) {
                  try {
                    var directive = $injector.invoke(directiveFactory);
                    isFunction(directive) ? directive = {
                      compile: valueFn(directive)
                    } : !directive.compile && directive.link && (directive.compile = valueFn(directive.link)), directive.priority = directive.priority || 0, directive.index = index, directive.name = directive.name || name, directive.require = directive.require || directive.controller && directive.name, directive.restrict = directive.restrict || "A", directives.push(directive)
                  } catch (e) {
                    $exceptionHandler(e)
                  }
                }), directives
              }
            ])), hasDirectives[name].push(directiveFactory)) : forEach(name, reverseParams(registerDirective)), this
          }, this.aHrefSanitizationWhitelist = function(regexp) {
            return isDefined(regexp) ? ($$sanitizeUriProvider.aHrefSanitizationWhitelist(regexp), this) : $$sanitizeUriProvider.aHrefSanitizationWhitelist()
          }, this.imgSrcSanitizationWhitelist = function(regexp) {
            return isDefined(regexp) ? ($$sanitizeUriProvider.imgSrcSanitizationWhitelist(regexp), this) : $$sanitizeUriProvider.imgSrcSanitizationWhitelist()
          }, this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$http", "$templateCache", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri",
            function($injector, $interpolate, $exceptionHandler, $http, $templateCache, $parse, $controller, $rootScope, $document, $sce, $animate, $$sanitizeUri) {
              function compile($compileNodes, transcludeFn, maxPriority, ignoreDirective, previousCompileContext) {
                $compileNodes instanceof jqLite || ($compileNodes = jqLite($compileNodes)), forEach($compileNodes, function(node, index) {
                  3 == node.nodeType && node.nodeValue.match(/\S+/) && ($compileNodes[index] = node = jqLite(node).wrap("<span></span>").parent()[0])
                });
                var compositeLinkFn = compileNodes($compileNodes, transcludeFn, $compileNodes, maxPriority, ignoreDirective, previousCompileContext);
                return safeAddClass($compileNodes, "ng-scope"),
                  function(scope, cloneConnectFn, transcludeControllers) {
                    assertArg(scope, "scope");
                    var $linkNode = cloneConnectFn ? JQLitePrototype.clone.call($compileNodes) : $compileNodes;
                    forEach(transcludeControllers, function(instance, name) {
                      $linkNode.data("$" + name + "Controller", instance)
                    });
                    for (var i = 0, ii = $linkNode.length; ii > i; i++) {
                      var node = $linkNode[i],
                        nodeType = node.nodeType;
                      (1 === nodeType || 9 === nodeType) && $linkNode.eq(i).data("$scope", scope)
                    }
                    return cloneConnectFn && cloneConnectFn($linkNode, scope), compositeLinkFn && compositeLinkFn(scope, $linkNode, $linkNode), $linkNode
                  }
              }

              function safeAddClass($element, className) {
                try {
                  $element.addClass(className)
                } catch (e) {}
              }

              function compileNodes(nodeList, transcludeFn, $rootElement, maxPriority, ignoreDirective, previousCompileContext) {
                function compositeLinkFn(scope, nodeList, $rootElement, boundTranscludeFn) {
                  var nodeLinkFn, childLinkFn, node, $node, childScope, childTranscludeFn, i, ii, n, nodeListLength = nodeList.length,
                    stableNodeList = new Array(nodeListLength);
                  for (i = 0; nodeListLength > i; i++) stableNodeList[i] = nodeList[i];
                  for (i = 0, n = 0, ii = linkFns.length; ii > i; n++) node = stableNodeList[n], nodeLinkFn = linkFns[i++], childLinkFn = linkFns[i++], $node = jqLite(node), nodeLinkFn ? (nodeLinkFn.scope ? (childScope = scope.$new(), $node.data("$scope", childScope)) : childScope = scope, childTranscludeFn = nodeLinkFn.transclude, childTranscludeFn || !boundTranscludeFn && transcludeFn ? nodeLinkFn(childLinkFn, childScope, node, $rootElement, createBoundTranscludeFn(scope, childTranscludeFn || transcludeFn)) : nodeLinkFn(childLinkFn, childScope, node, $rootElement, boundTranscludeFn)) : childLinkFn && childLinkFn(scope, node.childNodes, undefined, boundTranscludeFn)
                }
                for (var attrs, directives, nodeLinkFn, childNodes, childLinkFn, linkFnFound, linkFns = [], i = 0; i < nodeList.length; i++) attrs = new Attributes, directives = collectDirectives(nodeList[i], [], attrs, 0 === i ? maxPriority : undefined, ignoreDirective), nodeLinkFn = directives.length ? applyDirectivesToNode(directives, nodeList[i], attrs, transcludeFn, $rootElement, null, [], [], previousCompileContext) : null, nodeLinkFn && nodeLinkFn.scope && safeAddClass(jqLite(nodeList[i]), "ng-scope"), childLinkFn = nodeLinkFn && nodeLinkFn.terminal || !(childNodes = nodeList[i].childNodes) || !childNodes.length ? null : compileNodes(childNodes, nodeLinkFn ? nodeLinkFn.transclude : transcludeFn), linkFns.push(nodeLinkFn, childLinkFn), linkFnFound = linkFnFound || nodeLinkFn || childLinkFn, previousCompileContext = null;
                return linkFnFound ? compositeLinkFn : null
              }

              function createBoundTranscludeFn(scope, transcludeFn) {
                return function(transcludedScope, cloneFn, controllers) {
                  var scopeCreated = !1;
                  transcludedScope || (transcludedScope = scope.$new(), transcludedScope.$$transcluded = !0, scopeCreated = !0);
                  var clone = transcludeFn(transcludedScope, cloneFn, controllers);
                  return scopeCreated && clone.on("$destroy", bind(transcludedScope, transcludedScope.$destroy)), clone
                }
              }

              function collectDirectives(node, directives, attrs, maxPriority, ignoreDirective) {
                var match, className, nodeType = node.nodeType,
                  attrsMap = attrs.$attr;
                switch (nodeType) {
                  case 1:
                    addDirective(directives, directiveNormalize(nodeName_(node).toLowerCase()), "E", maxPriority, ignoreDirective);
                    for (var attr, name, nName, ngAttrName, value, nAttrs = node.attributes, j = 0, jj = nAttrs && nAttrs.length; jj > j; j++) {
                      var attrStartName = !1,
                        attrEndName = !1;
                      if (attr = nAttrs[j], !msie || msie >= 8 || attr.specified) {
                        name = attr.name, ngAttrName = directiveNormalize(name), NG_ATTR_BINDING.test(ngAttrName) && (name = snake_case(ngAttrName.substr(6), "-"));
                        var directiveNName = ngAttrName.replace(/(Start|End)$/, "");
                        ngAttrName === directiveNName + "Start" && (attrStartName = name, attrEndName = name.substr(0, name.length - 5) + "end", name = name.substr(0, name.length - 6)), nName = directiveNormalize(name.toLowerCase()), attrsMap[nName] = name, attrs[nName] = value = trim(attr.value), getBooleanAttrName(node, nName) && (attrs[nName] = !0), addAttrInterpolateDirective(node, directives, value, nName), addDirective(directives, nName, "A", maxPriority, ignoreDirective, attrStartName, attrEndName)
                      }
                    }
                    if (className = node.className, isString(className) && "" !== className)
                      for (; match = CLASS_DIRECTIVE_REGEXP.exec(className);) nName = directiveNormalize(match[2]), addDirective(directives, nName, "C", maxPriority, ignoreDirective) && (attrs[nName] = trim(match[3])), className = className.substr(match.index + match[0].length);
                    break;
                  case 3:
                    addTextInterpolateDirective(directives, node.nodeValue);
                    break;
                  case 8:
                    try {
                      match = COMMENT_DIRECTIVE_REGEXP.exec(node.nodeValue), match && (nName = directiveNormalize(match[1]), addDirective(directives, nName, "M", maxPriority, ignoreDirective) && (attrs[nName] = trim(match[2])))
                    } catch (e) {}
                }
                return directives.sort(byPriority), directives
              }

              function groupScan(node, attrStart, attrEnd) {
                var nodes = [],
                  depth = 0;
                if (attrStart && node.hasAttribute && node.hasAttribute(attrStart)) {
                  do {
                    if (!node) throw $compileMinErr("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", attrStart, attrEnd);
                    1 == node.nodeType && (node.hasAttribute(attrStart) && depth++, node.hasAttribute(attrEnd) && depth--), nodes.push(node), node = node.nextSibling
                  } while (depth > 0)
                } else nodes.push(node);
                return jqLite(nodes)
              }

              function groupElementsLinkFnWrapper(linkFn, attrStart, attrEnd) {
                return function(scope, element, attrs, controllers, transcludeFn) {
                  return element = groupScan(element[0], attrStart, attrEnd), linkFn(scope, element, attrs, controllers, transcludeFn)
                }
              }

              function applyDirectivesToNode(directives, compileNode, templateAttrs, transcludeFn, jqCollection, originalReplaceDirective, preLinkFns, postLinkFns, previousCompileContext) {
                function addLinkFns(pre, post, attrStart, attrEnd) {
                  pre && (attrStart && (pre = groupElementsLinkFnWrapper(pre, attrStart, attrEnd)), pre.require = directive.require, pre.directiveName = directiveName, (newIsolateScopeDirective === directive || directive.$$isolateScope) && (pre = cloneAndAnnotateFn(pre, {
                    isolateScope: !0
                  })), preLinkFns.push(pre)), post && (attrStart && (post = groupElementsLinkFnWrapper(post, attrStart, attrEnd)), post.require = directive.require, post.directiveName = directiveName, (newIsolateScopeDirective === directive || directive.$$isolateScope) && (post = cloneAndAnnotateFn(post, {
                    isolateScope: !0
                  })), postLinkFns.push(post))
                }

                function getControllers(directiveName, require, $element, elementControllers) {
                  var value, retrievalMethod = "data",
                    optional = !1;
                  if (isString(require)) {
                    for (;
                      "^" == (value = require.charAt(0)) || "?" == value;) require = require.substr(1), "^" == value && (retrievalMethod = "inheritedData"), optional = optional || "?" == value;
                    if (value = null, elementControllers && "data" === retrievalMethod && (value = elementControllers[require]), value = value || $element[retrievalMethod]("$" + require + "Controller"), !value && !optional) throw $compileMinErr("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", require, directiveName);
                    return value
                  }
                  return isArray(require) && (value = [], forEach(require, function(require) {
                    value.push(getControllers(directiveName, require, $element, elementControllers))
                  })), value
                }

                function nodeLinkFn(childLinkFn, scope, linkNode, $rootElement, boundTranscludeFn) {
                  function controllersBoundTransclude(scope, cloneAttachFn) {
                    var transcludeControllers;
                    return arguments.length < 2 && (cloneAttachFn = scope, scope = undefined), hasElementTranscludeDirective && (transcludeControllers = elementControllers), boundTranscludeFn(scope, cloneAttachFn, transcludeControllers)
                  }
                  var attrs, $element, i, ii, linkFn, controller, isolateScope, transcludeFn, elementControllers = {};
                  if (attrs = compileNode === linkNode ? templateAttrs : shallowCopy(templateAttrs, new Attributes(jqLite(linkNode), templateAttrs.$attr)), $element = attrs.$$element, newIsolateScopeDirective) {
                    var LOCAL_REGEXP = /^\s*([@=&])(\??)\s*(\w*)\s*$/,
                      $linkNode = jqLite(linkNode);
                    isolateScope = scope.$new(!0), !templateDirective || templateDirective !== newIsolateScopeDirective && templateDirective !== newIsolateScopeDirective.$$originalDirective ? $linkNode.data("$isolateScopeNoTemplate", isolateScope) : $linkNode.data("$isolateScope", isolateScope), safeAddClass($linkNode, "ng-isolate-scope"), forEach(newIsolateScopeDirective.scope, function(definition, scopeName) {
                      var lastValue, parentGet, parentSet, compare, match = definition.match(LOCAL_REGEXP) || [],
                        attrName = match[3] || scopeName,
                        optional = "?" == match[2],
                        mode = match[1];
                      switch (isolateScope.$$isolateBindings[scopeName] = mode + attrName, mode) {
                        case "@":
                          attrs.$observe(attrName, function(value) {
                            isolateScope[scopeName] = value
                          }), attrs.$$observers[attrName].$$scope = scope, attrs[attrName] && (isolateScope[scopeName] = $interpolate(attrs[attrName])(scope));
                          break;
                        case "=":
                          if (optional && !attrs[attrName]) return;
                          parentGet = $parse(attrs[attrName]), compare = parentGet.literal ? equals : function(a, b) {
                            return a === b
                          }, parentSet = parentGet.assign || function() {
                            throw lastValue = isolateScope[scopeName] = parentGet(scope), $compileMinErr("nonassign", "Expression '{0}' used with directive '{1}' is non-assignable!", attrs[attrName], newIsolateScopeDirective.name)
                          }, lastValue = isolateScope[scopeName] = parentGet(scope), isolateScope.$watch(function() {
                            var parentValue = parentGet(scope);
                            return compare(parentValue, isolateScope[scopeName]) || (compare(parentValue, lastValue) ? parentSet(scope, parentValue = isolateScope[scopeName]) : isolateScope[scopeName] = parentValue), lastValue = parentValue
                          }, null, parentGet.literal);
                          break;
                        case "&":
                          parentGet = $parse(attrs[attrName]), isolateScope[scopeName] = function(locals) {
                            return parentGet(scope, locals)
                          };
                          break;
                        default:
                          throw $compileMinErr("iscp", "Invalid isolate scope definition for directive '{0}'. Definition: {... {1}: '{2}' ...}", newIsolateScopeDirective.name, scopeName, definition)
                      }
                    })
                  }
                  for (transcludeFn = boundTranscludeFn && controllersBoundTransclude, controllerDirectives && forEach(controllerDirectives, function(directive) {
                    var controllerInstance, locals = {
                      $scope: directive === newIsolateScopeDirective || directive.$$isolateScope ? isolateScope : scope,
                      $element: $element,
                      $attrs: attrs,
                      $transclude: transcludeFn
                    };
                    controller = directive.controller, "@" == controller && (controller = attrs[directive.name]), controllerInstance = $controller(controller, locals), elementControllers[directive.name] = controllerInstance, hasElementTranscludeDirective || $element.data("$" + directive.name + "Controller", controllerInstance), directive.controllerAs && (locals.$scope[directive.controllerAs] = controllerInstance)
                  }), i = 0, ii = preLinkFns.length; ii > i; i++) try {
                    linkFn = preLinkFns[i], linkFn(linkFn.isolateScope ? isolateScope : scope, $element, attrs, linkFn.require && getControllers(linkFn.directiveName, linkFn.require, $element, elementControllers), transcludeFn)
                  } catch (e) {
                    $exceptionHandler(e, startingTag($element))
                  }
                  var scopeToChild = scope;
                  for (newIsolateScopeDirective && (newIsolateScopeDirective.template || null === newIsolateScopeDirective.templateUrl) && (scopeToChild = isolateScope), childLinkFn && childLinkFn(scopeToChild, linkNode.childNodes, undefined, boundTranscludeFn), i = postLinkFns.length - 1; i >= 0; i--) try {
                    linkFn = postLinkFns[i], linkFn(linkFn.isolateScope ? isolateScope : scope, $element, attrs, linkFn.require && getControllers(linkFn.directiveName, linkFn.require, $element, elementControllers), transcludeFn)
                  } catch (e) {
                    $exceptionHandler(e, startingTag($element))
                  }
                }
                previousCompileContext = previousCompileContext || {};
                for (var newScopeDirective, directive, directiveName, $template, linkFn, directiveValue, terminalPriority = -Number.MAX_VALUE, controllerDirectives = previousCompileContext.controllerDirectives, newIsolateScopeDirective = previousCompileContext.newIsolateScopeDirective, templateDirective = previousCompileContext.templateDirective, nonTlbTranscludeDirective = previousCompileContext.nonTlbTranscludeDirective, hasTranscludeDirective = !1, hasElementTranscludeDirective = previousCompileContext.hasElementTranscludeDirective, $compileNode = templateAttrs.$$element = jqLite(compileNode), replaceDirective = originalReplaceDirective, childTranscludeFn = transcludeFn, i = 0, ii = directives.length; ii > i; i++) {
                  directive = directives[i];
                  var attrStart = directive.$$start,
                    attrEnd = directive.$$end;
                  if (attrStart && ($compileNode = groupScan(compileNode, attrStart, attrEnd)), $template = undefined, terminalPriority > directive.priority) break;
                  if ((directiveValue = directive.scope) && (newScopeDirective = newScopeDirective || directive, directive.templateUrl || (assertNoDuplicate("new/isolated scope", newIsolateScopeDirective, directive, $compileNode), isObject(directiveValue) && (newIsolateScopeDirective = directive))), directiveName = directive.name, !directive.templateUrl && directive.controller && (directiveValue = directive.controller, controllerDirectives = controllerDirectives || {}, assertNoDuplicate("'" + directiveName + "' controller", controllerDirectives[directiveName], directive, $compileNode), controllerDirectives[directiveName] = directive), (directiveValue = directive.transclude) && (hasTranscludeDirective = !0, directive.$$tlb || (assertNoDuplicate("transclusion", nonTlbTranscludeDirective, directive, $compileNode), nonTlbTranscludeDirective = directive), "element" == directiveValue ? (hasElementTranscludeDirective = !0, terminalPriority = directive.priority, $template = groupScan(compileNode, attrStart, attrEnd), $compileNode = templateAttrs.$$element = jqLite(document.createComment(" " + directiveName + ": " + templateAttrs[directiveName] + " ")), compileNode = $compileNode[0], replaceWith(jqCollection, jqLite(sliceArgs($template)), compileNode), childTranscludeFn = compile($template, transcludeFn, terminalPriority, replaceDirective && replaceDirective.name, {
                    nonTlbTranscludeDirective: nonTlbTranscludeDirective
                  })) : ($template = jqLite(jqLiteClone(compileNode)).contents(), $compileNode.empty(), childTranscludeFn = compile($template, transcludeFn))), directive.template)
                    if (assertNoDuplicate("template", templateDirective, directive, $compileNode), templateDirective = directive, directiveValue = isFunction(directive.template) ? directive.template($compileNode, templateAttrs) : directive.template, directiveValue = denormalizeTemplate(directiveValue), directive.replace) {
                      if (replaceDirective = directive, $template = jqLiteIsTextNode(directiveValue) ? [] : jqLite(trim(directiveValue)), compileNode = $template[0], 1 != $template.length || 1 !== compileNode.nodeType) throw $compileMinErr("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", directiveName, "");
                      replaceWith(jqCollection, $compileNode, compileNode);
                      var newTemplateAttrs = {
                          $attr: {}
                        },
                        templateDirectives = collectDirectives(compileNode, [], newTemplateAttrs),
                        unprocessedDirectives = directives.splice(i + 1, directives.length - (i + 1));
                      newIsolateScopeDirective && markDirectivesAsIsolate(templateDirectives), directives = directives.concat(templateDirectives).concat(unprocessedDirectives), mergeTemplateAttributes(templateAttrs, newTemplateAttrs), ii = directives.length
                    } else $compileNode.html(directiveValue);
                  if (directive.templateUrl) assertNoDuplicate("template", templateDirective, directive, $compileNode), templateDirective = directive, directive.replace && (replaceDirective = directive), nodeLinkFn = compileTemplateUrl(directives.splice(i, directives.length - i), $compileNode, templateAttrs, jqCollection, childTranscludeFn, preLinkFns, postLinkFns, {
                    controllerDirectives: controllerDirectives,
                    newIsolateScopeDirective: newIsolateScopeDirective,
                    templateDirective: templateDirective,
                    nonTlbTranscludeDirective: nonTlbTranscludeDirective
                  }), ii = directives.length;
                  else if (directive.compile) try {
                    linkFn = directive.compile($compileNode, templateAttrs, childTranscludeFn), isFunction(linkFn) ? addLinkFns(null, linkFn, attrStart, attrEnd) : linkFn && addLinkFns(linkFn.pre, linkFn.post, attrStart, attrEnd)
                  } catch (e) {
                    $exceptionHandler(e, startingTag($compileNode))
                  }
                  directive.terminal && (nodeLinkFn.terminal = !0, terminalPriority = Math.max(terminalPriority, directive.priority))
                }
                return nodeLinkFn.scope = newScopeDirective && newScopeDirective.scope === !0, nodeLinkFn.transclude = hasTranscludeDirective && childTranscludeFn, previousCompileContext.hasElementTranscludeDirective = hasElementTranscludeDirective, nodeLinkFn
              }

              function markDirectivesAsIsolate(directives) {
                for (var j = 0, jj = directives.length; jj > j; j++) directives[j] = inherit(directives[j], {
                  $$isolateScope: !0
                })
              }

              function addDirective(tDirectives, name, location, maxPriority, ignoreDirective, startAttrName, endAttrName) {
                if (name === ignoreDirective) return null;
                var match = null;
                if (hasDirectives.hasOwnProperty(name))
                  for (var directive, directives = $injector.get(name + Suffix), i = 0, ii = directives.length; ii > i; i++) try {
                    directive = directives[i], (maxPriority === undefined || maxPriority > directive.priority) && -1 != directive.restrict.indexOf(location) && (startAttrName && (directive = inherit(directive, {
                      $$start: startAttrName,
                      $$end: endAttrName
                    })), tDirectives.push(directive), match = directive)
                  } catch (e) {
                    $exceptionHandler(e)
                  }
                return match
              }

              function mergeTemplateAttributes(dst, src) {
                var srcAttr = src.$attr,
                  dstAttr = dst.$attr,
                  $element = dst.$$element;
                forEach(dst, function(value, key) {
                  "$" != key.charAt(0) && (src[key] && src[key] !== value && (value += ("style" === key ? ";" : " ") + src[key]), dst.$set(key, value, !0, srcAttr[key]))
                }), forEach(src, function(value, key) {
                  "class" == key ? (safeAddClass($element, value), dst["class"] = (dst["class"] ? dst["class"] + " " : "") + value) : "style" == key ? ($element.attr("style", $element.attr("style") + ";" + value), dst.style = (dst.style ? dst.style + ";" : "") + value) : "$" == key.charAt(0) || dst.hasOwnProperty(key) || (dst[key] = value, dstAttr[key] = srcAttr[key])
                })
              }

              function compileTemplateUrl(directives, $compileNode, tAttrs, $rootElement, childTranscludeFn, preLinkFns, postLinkFns, previousCompileContext) {
                var afterTemplateNodeLinkFn, afterTemplateChildLinkFn, linkQueue = [],
                  beforeTemplateCompileNode = $compileNode[0],
                  origAsyncDirective = directives.shift(),
                  derivedSyncDirective = extend({}, origAsyncDirective, {
                    templateUrl: null,
                    transclude: null,
                    replace: null,
                    $$originalDirective: origAsyncDirective
                  }),
                  templateUrl = isFunction(origAsyncDirective.templateUrl) ? origAsyncDirective.templateUrl($compileNode, tAttrs) : origAsyncDirective.templateUrl;
                return $compileNode.empty(), $http.get($sce.getTrustedResourceUrl(templateUrl), {
                    cache: $templateCache
                  }).success(function(content) {
                    var compileNode, tempTemplateAttrs, $template, childBoundTranscludeFn;
                    if (content = denormalizeTemplate(content), origAsyncDirective.replace) {
                      if ($template = jqLiteIsTextNode(content) ? [] : jqLite(trim(content)), compileNode = $template[0], 1 != $template.length || 1 !== compileNode.nodeType) throw $compileMinErr("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", origAsyncDirective.name, templateUrl);
                      tempTemplateAttrs = {
                        $attr: {}
                      }, replaceWith($rootElement, $compileNode, compileNode);
                      var templateDirectives = collectDirectives(compileNode, [], tempTemplateAttrs);
                      isObject(origAsyncDirective.scope) && markDirectivesAsIsolate(templateDirectives), directives = templateDirectives.concat(directives), mergeTemplateAttributes(tAttrs, tempTemplateAttrs)
                    } else compileNode = beforeTemplateCompileNode, $compileNode.html(content);
                    for (directives.unshift(derivedSyncDirective), afterTemplateNodeLinkFn = applyDirectivesToNode(directives, compileNode, tAttrs, childTranscludeFn, $compileNode, origAsyncDirective, preLinkFns, postLinkFns, previousCompileContext), forEach($rootElement, function(node, i) {
                      node == compileNode && ($rootElement[i] = $compileNode[0])
                    }), afterTemplateChildLinkFn = compileNodes($compileNode[0].childNodes, childTranscludeFn); linkQueue.length;) {
                      var scope = linkQueue.shift(),
                        beforeTemplateLinkNode = linkQueue.shift(),
                        linkRootElement = linkQueue.shift(),
                        boundTranscludeFn = linkQueue.shift(),
                        linkNode = $compileNode[0];
                      if (beforeTemplateLinkNode !== beforeTemplateCompileNode) {
                        var oldClasses = beforeTemplateLinkNode.className;
                        previousCompileContext.hasElementTranscludeDirective && origAsyncDirective.replace || (linkNode = jqLiteClone(compileNode)), replaceWith(linkRootElement, jqLite(beforeTemplateLinkNode), linkNode), safeAddClass(jqLite(linkNode), oldClasses)
                      }
                      childBoundTranscludeFn = afterTemplateNodeLinkFn.transclude ? createBoundTranscludeFn(scope, afterTemplateNodeLinkFn.transclude) : boundTranscludeFn, afterTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, linkNode, $rootElement, childBoundTranscludeFn)
                    }
                    linkQueue = null
                  }).error(function(response, code, headers, config) {
                    throw $compileMinErr("tpload", "Failed to load template: {0}", config.url)
                  }),
                  function(ignoreChildLinkFn, scope, node, rootElement, boundTranscludeFn) {
                    linkQueue ? (linkQueue.push(scope), linkQueue.push(node), linkQueue.push(rootElement), linkQueue.push(boundTranscludeFn)) : afterTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, node, rootElement, boundTranscludeFn)
                  }
              }

              function byPriority(a, b) {
                var diff = b.priority - a.priority;
                return 0 !== diff ? diff : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index
              }

              function assertNoDuplicate(what, previousDirective, directive, element) {
                if (previousDirective) throw $compileMinErr("multidir", "Multiple directives [{0}, {1}] asking for {2} on: {3}", previousDirective.name, directive.name, what, startingTag(element))
              }

              function addTextInterpolateDirective(directives, text) {
                var interpolateFn = $interpolate(text, !0);
                interpolateFn && directives.push({
                  priority: 0,
                  compile: valueFn(function(scope, node) {
                    var parent = node.parent(),
                      bindings = parent.data("$binding") || [];
                    bindings.push(interpolateFn), safeAddClass(parent.data("$binding", bindings), "ng-binding"), scope.$watch(interpolateFn, function(value) {
                      node[0].nodeValue = value
                    })
                  })
                })
              }

              function getTrustedContext(node, attrNormalizedName) {
                if ("srcdoc" == attrNormalizedName) return $sce.HTML;
                var tag = nodeName_(node);
                return "xlinkHref" == attrNormalizedName || "FORM" == tag && "action" == attrNormalizedName || "IMG" != tag && ("src" == attrNormalizedName || "ngSrc" == attrNormalizedName) ? $sce.RESOURCE_URL : void 0
              }

              function addAttrInterpolateDirective(node, directives, value, name) {
                var interpolateFn = $interpolate(value, !0);
                if (interpolateFn) {
                  if ("multiple" === name && "SELECT" === nodeName_(node)) throw $compileMinErr("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", startingTag(node));
                  directives.push({
                    priority: 100,
                    compile: function() {
                      return {
                        pre: function(scope, element, attr) {
                          var $$observers = attr.$$observers || (attr.$$observers = {});
                          if (EVENT_HANDLER_ATTR_REGEXP.test(name)) throw $compileMinErr("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
                          interpolateFn = $interpolate(attr[name], !0, getTrustedContext(node, name)), interpolateFn && (attr[name] = interpolateFn(scope), ($$observers[name] || ($$observers[name] = [])).$$inter = !0, (attr.$$observers && attr.$$observers[name].$$scope || scope).$watch(interpolateFn, function(newValue, oldValue) {
                            "class" === name && newValue != oldValue ? attr.$updateClass(newValue, oldValue) : attr.$set(name, newValue)
                          }))
                        }
                      }
                    }
                  })
                }
              }

              function replaceWith($rootElement, elementsToRemove, newNode) {
                var i, ii, firstElementToRemove = elementsToRemove[0],
                  removeCount = elementsToRemove.length,
                  parent = firstElementToRemove.parentNode;
                if ($rootElement)
                  for (i = 0, ii = $rootElement.length; ii > i; i++)
                    if ($rootElement[i] == firstElementToRemove) {
                      $rootElement[i++] = newNode;
                      for (var j = i, j2 = j + removeCount - 1, jj = $rootElement.length; jj > j; j++, j2++) jj > j2 ? $rootElement[j] = $rootElement[j2] : delete $rootElement[j];
                      $rootElement.length -= removeCount - 1;
                      break
                    }
                parent && parent.replaceChild(newNode, firstElementToRemove);
                var fragment = document.createDocumentFragment();
                fragment.appendChild(firstElementToRemove), newNode[jqLite.expando] = firstElementToRemove[jqLite.expando];
                for (var k = 1, kk = elementsToRemove.length; kk > k; k++) {
                  var element = elementsToRemove[k];
                  jqLite(element).remove(), fragment.appendChild(element), delete elementsToRemove[k]
                }
                elementsToRemove[0] = newNode, elementsToRemove.length = 1
              }

              function cloneAndAnnotateFn(fn, annotation) {
                return extend(function() {
                  return fn.apply(null, arguments)
                }, fn, annotation)
              }
              var Attributes = function(element, attr) {
                this.$$element = element, this.$attr = attr || {}
              };
              Attributes.prototype = {
                $normalize: directiveNormalize,
                $addClass: function(classVal) {
                  classVal && classVal.length > 0 && $animate.addClass(this.$$element, classVal)
                },
                $removeClass: function(classVal) {
                  classVal && classVal.length > 0 && $animate.removeClass(this.$$element, classVal)
                },
                $updateClass: function(newClasses, oldClasses) {
                  var toAdd = tokenDifference(newClasses, oldClasses),
                    toRemove = tokenDifference(oldClasses, newClasses);
                  0 === toAdd.length ? $animate.removeClass(this.$$element, toRemove) : 0 === toRemove.length ? $animate.addClass(this.$$element, toAdd) : $animate.setClass(this.$$element, toAdd, toRemove)
                },
                $set: function(key, value, writeAttr, attrName) {
                  var nodeName, booleanKey = getBooleanAttrName(this.$$element[0], key);
                  booleanKey && (this.$$element.prop(key, value), attrName = booleanKey), this[key] = value, attrName ? this.$attr[key] = attrName : (attrName = this.$attr[key], attrName || (this.$attr[key] = attrName = snake_case(key, "-"))), nodeName = nodeName_(this.$$element), ("A" === nodeName && "href" === key || "IMG" === nodeName && "src" === key) && (this[key] = value = $$sanitizeUri(value, "src" === key)), writeAttr !== !1 && (null === value || value === undefined ? this.$$element.removeAttr(attrName) : this.$$element.attr(attrName, value));
                  var $$observers = this.$$observers;
                  $$observers && forEach($$observers[key], function(fn) {
                    try {
                      fn(value)
                    } catch (e) {
                      $exceptionHandler(e)
                    }
                  })
                },
                $observe: function(key, fn) {
                  var attrs = this,
                    $$observers = attrs.$$observers || (attrs.$$observers = {}),
                    listeners = $$observers[key] || ($$observers[key] = []);
                  return listeners.push(fn), $rootScope.$evalAsync(function() {
                    listeners.$$inter || fn(attrs[key])
                  }), fn
                }
              };
              var startSymbol = $interpolate.startSymbol(),
                endSymbol = $interpolate.endSymbol(),
                denormalizeTemplate = "{{" == startSymbol || "}}" == endSymbol ? identity : function(template) {
                  return template.replace(/\{\{/g, startSymbol).replace(/}}/g, endSymbol)
                },
                NG_ATTR_BINDING = /^ngAttr[A-Z]/;
              return compile
            }
          ]
        }

        function directiveNormalize(name) {
          return camelCase(name.replace(PREFIX_REGEXP, ""))
        }

        function tokenDifference(str1, str2) {
          var values = "",
            tokens1 = str1.split(/\s+/),
            tokens2 = str2.split(/\s+/);
          outer: for (var i = 0; i < tokens1.length; i++) {
            for (var token = tokens1[i], j = 0; j < tokens2.length; j++)
              if (token == tokens2[j]) continue outer;
            values += (values.length > 0 ? " " : "") + token
          }
          return values
        }

        function $ControllerProvider() {
          var controllers = {},
            CNTRL_REG = /^(\S+)(\s+as\s+(\w+))?$/;
          this.register = function(name, constructor) {
            assertNotHasOwnProperty(name, "controller"), isObject(name) ? extend(controllers, name) : controllers[name] = constructor
          }, this.$get = ["$injector", "$window",
            function($injector, $window) {
              return function(expression, locals) {
                var instance, match, constructor, identifier;
                if (isString(expression) && (match = expression.match(CNTRL_REG), constructor = match[1], identifier = match[3], expression = controllers.hasOwnProperty(constructor) ? controllers[constructor] : getter(locals.$scope, constructor, !0) || getter($window, constructor, !0), assertArgFn(expression, constructor, !0)), instance = $injector.instantiate(expression, locals), identifier) {
                  if (!locals || "object" != typeof locals.$scope) throw minErr("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", constructor || expression.name, identifier);
                  locals.$scope[identifier] = instance
                }
                return instance
              }
            }
          ]
        }

        function $DocumentProvider() {
          this.$get = ["$window",
            function(window) {
              return jqLite(window.document)
            }
          ]
        }

        function $ExceptionHandlerProvider() {
          this.$get = ["$log",
            function($log) {
              return function() {
                $log.error.apply($log, arguments)
              }
            }
          ]
        }

        function parseHeaders(headers) {
          var key, val, i, parsed = {};
          return headers ? (forEach(headers.split("\n"), function(line) {
            i = line.indexOf(":"), key = lowercase(trim(line.substr(0, i))), val = trim(line.substr(i + 1)), key && (parsed[key] ? parsed[key] += ", " + val : parsed[key] = val)
          }), parsed) : parsed
        }

        function headersGetter(headers) {
          var headersObj = isObject(headers) ? headers : undefined;
          return function(name) {
            return headersObj || (headersObj = parseHeaders(headers)), name ? headersObj[lowercase(name)] || null : headersObj
          }
        }

        function transformData(data, headers, fns) {
          return isFunction(fns) ? fns(data, headers) : (forEach(fns, function(fn) {
            data = fn(data, headers)
          }), data)
        }

        function isSuccess(status) {
          return status >= 200 && 300 > status
        }

        function $HttpProvider() {
          var JSON_START = /^\s*(\[|\{[^\{])/,
            JSON_END = /[\}\]]\s*$/,
            PROTECTION_PREFIX = /^\)\]\}',?\n/,
            CONTENT_TYPE_APPLICATION_JSON = {
              "Content-Type": "application/json;charset=utf-8"
            },
            defaults = this.defaults = {
              transformResponse: [
                function(data) {
                  return isString(data) && (data = data.replace(PROTECTION_PREFIX, ""), JSON_START.test(data) && JSON_END.test(data) && (data = fromJson(data))), data
                }
              ],
              transformRequest: [
                function(d) {
                  return !isObject(d) || isFile(d) || isBlob(d) ? d : toJson(d)
                }
              ],
              headers: {
                common: {
                  Accept: "application/json, text/plain, */*"
                },
                post: shallowCopy(CONTENT_TYPE_APPLICATION_JSON),
                put: shallowCopy(CONTENT_TYPE_APPLICATION_JSON),
                patch: shallowCopy(CONTENT_TYPE_APPLICATION_JSON)
              },
              xsrfCookieName: "XSRF-TOKEN",
              xsrfHeaderName: "X-XSRF-TOKEN"
            },
            interceptorFactories = this.interceptors = [],
            responseInterceptorFactories = this.responseInterceptors = [];
          this.$get = ["$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector",
            function($httpBackend, $browser, $cacheFactory, $rootScope, $q, $injector) {
              function $http(requestConfig) {
                function transformResponse(response) {
                  var resp = extend({}, response, {
                    data: transformData(response.data, response.headers, config.transformResponse)
                  });
                  return isSuccess(response.status) ? resp : $q.reject(resp)
                }

                function mergeHeaders(config) {
                  function execHeaders(headers) {
                    var headerContent;
                    forEach(headers, function(headerFn, header) {
                      isFunction(headerFn) && (headerContent = headerFn(), null != headerContent ? headers[header] = headerContent : delete headers[header])
                    })
                  }
                  var defHeaderName, lowercaseDefHeaderName, reqHeaderName, defHeaders = defaults.headers,
                    reqHeaders = extend({}, config.headers);
                  defHeaders = extend({}, defHeaders.common, defHeaders[lowercase(config.method)]), execHeaders(defHeaders), execHeaders(reqHeaders);
                  defaultHeadersIteration: for (defHeaderName in defHeaders) {
                    lowercaseDefHeaderName = lowercase(defHeaderName);
                    for (reqHeaderName in reqHeaders)
                      if (lowercase(reqHeaderName) === lowercaseDefHeaderName) continue defaultHeadersIteration;
                    reqHeaders[defHeaderName] = defHeaders[defHeaderName]
                  }
                  return reqHeaders
                }
                var config = {
                    method: "get",
                    transformRequest: defaults.transformRequest,
                    transformResponse: defaults.transformResponse
                  },
                  headers = mergeHeaders(requestConfig);
                extend(config, requestConfig), config.headers = headers, config.method = uppercase(config.method);
                var xsrfValue = urlIsSameOrigin(config.url) ? $browser.cookies()[config.xsrfCookieName || defaults.xsrfCookieName] : undefined;
                xsrfValue && (headers[config.xsrfHeaderName || defaults.xsrfHeaderName] = xsrfValue);
                var serverRequest = function(config) {
                    headers = config.headers;
                    var reqData = transformData(config.data, headersGetter(headers), config.transformRequest);
                    return isUndefined(config.data) && forEach(headers, function(value, header) {
                      "content-type" === lowercase(header) && delete headers[header]
                    }), isUndefined(config.withCredentials) && !isUndefined(defaults.withCredentials) && (config.withCredentials = defaults.withCredentials), sendReq(config, reqData, headers).then(transformResponse, transformResponse)
                  },
                  chain = [serverRequest, undefined],
                  promise = $q.when(config);
                for (forEach(reversedInterceptors, function(interceptor) {
                  (interceptor.request || interceptor.requestError) && chain.unshift(interceptor.request, interceptor.requestError), (interceptor.response || interceptor.responseError) && chain.push(interceptor.response, interceptor.responseError)
                }); chain.length;) {
                  var thenFn = chain.shift(),
                    rejectFn = chain.shift();
                  promise = promise.then(thenFn, rejectFn)
                }
                return promise.success = function(fn) {
                  return promise.then(function(response) {
                    fn(response.data, response.status, response.headers, config)
                  }), promise
                }, promise.error = function(fn) {
                  return promise.then(null, function(response) {
                    fn(response.data, response.status, response.headers, config)
                  }), promise
                }, promise
              }

              function createShortMethods() {
                forEach(arguments, function(name) {
                  $http[name] = function(url, config) {
                    return $http(extend(config || {}, {
                      method: name,
                      url: url
                    }))
                  }
                })
              }

              function createShortMethodsWithData() {
                forEach(arguments, function(name) {
                  $http[name] = function(url, data, config) {
                    return $http(extend(config || {}, {
                      method: name,
                      url: url,
                      data: data
                    }))
                  }
                })
              }

              function sendReq(config, reqData, reqHeaders) {
                function done(status, response, headersString, statusText) {
                  cache && (isSuccess(status) ? cache.put(url, [status, response, parseHeaders(headersString), statusText]) : cache.remove(url)), resolvePromise(response, status, headersString, statusText), $rootScope.$$phase || $rootScope.$apply()
                }

                function resolvePromise(response, status, headers, statusText) {
                  status = Math.max(status, 0), (isSuccess(status) ? deferred.resolve : deferred.reject)({
                    data: response,
                    status: status,
                    headers: headersGetter(headers),
                    config: config,
                    statusText: statusText
                  })
                }

                function removePendingReq() {
                  var idx = indexOf($http.pendingRequests, config); - 1 !== idx && $http.pendingRequests.splice(idx, 1)
                }
                var cache, cachedResp, deferred = $q.defer(),
                  promise = deferred.promise,
                  url = buildUrl(config.url, config.params);
                if ($http.pendingRequests.push(config), promise.then(removePendingReq, removePendingReq), (config.cache || defaults.cache) && config.cache !== !1 && "GET" == config.method && (cache = isObject(config.cache) ? config.cache : isObject(defaults.cache) ? defaults.cache : defaultCache), cache)
                  if (cachedResp = cache.get(url), isDefined(cachedResp)) {
                    if (cachedResp.then) return cachedResp.then(removePendingReq, removePendingReq), cachedResp;
                    isArray(cachedResp) ? resolvePromise(cachedResp[1], cachedResp[0], shallowCopy(cachedResp[2]), cachedResp[3]) : resolvePromise(cachedResp, 200, {}, "OK")
                  } else cache.put(url, promise);
                return isUndefined(cachedResp) && $httpBackend(config.method, url, reqData, done, reqHeaders, config.timeout, config.withCredentials, config.responseType), promise
              }

              function buildUrl(url, params) {
                if (!params) return url;
                var parts = [];
                return forEachSorted(params, function(value, key) {
                  null === value || isUndefined(value) || (isArray(value) || (value = [value]), forEach(value, function(v) {
                    isObject(v) && (v = toJson(v)), parts.push(encodeUriQuery(key) + "=" + encodeUriQuery(v))
                  }))
                }), parts.length > 0 && (url += (-1 == url.indexOf("?") ? "?" : "&") + parts.join("&")), url
              }
              var defaultCache = $cacheFactory("$http"),
                reversedInterceptors = [];
              return forEach(interceptorFactories, function(interceptorFactory) {
                reversedInterceptors.unshift(isString(interceptorFactory) ? $injector.get(interceptorFactory) : $injector.invoke(interceptorFactory))
              }), forEach(responseInterceptorFactories, function(interceptorFactory, index) {
                var responseFn = isString(interceptorFactory) ? $injector.get(interceptorFactory) : $injector.invoke(interceptorFactory);
                reversedInterceptors.splice(index, 0, {
                  response: function(response) {
                    return responseFn($q.when(response))
                  },
                  responseError: function(response) {
                    return responseFn($q.reject(response))
                  }
                })
              }), $http.pendingRequests = [], createShortMethods("get", "delete", "head", "jsonp"), createShortMethodsWithData("post", "put"), $http.defaults = defaults, $http
            }
          ]
        }

        function createXhr(method) {
          if (8 >= msie && (!method.match(/^(get|post|head|put|delete|options)$/i) || !window.XMLHttpRequest)) return new window.ActiveXObject("Microsoft.XMLHTTP");
          if (window.XMLHttpRequest) return new window.XMLHttpRequest;
          throw minErr("$httpBackend")("noxhr", "This browser does not support XMLHttpRequest.")
        }

        function $HttpBackendProvider() {
          this.$get = ["$browser", "$window", "$document",
            function($browser, $window, $document) {
              return createHttpBackend($browser, createXhr, $browser.defer, $window.angular.callbacks, $document[0])
            }
          ]
        }

        function createHttpBackend($browser, createXhr, $browserDefer, callbacks, rawDocument) {
          function jsonpReq(url, callbackId, done) {
            var script = rawDocument.createElement("script"),
              callback = null;
            return script.type = "text/javascript", script.src = url, script.async = !0, callback = function(event) {
              removeEventListenerFn(script, "load", callback), removeEventListenerFn(script, "error", callback), rawDocument.body.removeChild(script), script = null;
              var status = -1,
                text = "unknown";
              event && ("load" !== event.type || callbacks[callbackId].called || (event = {
                type: "error"
              }), text = event.type, status = "error" === event.type ? 404 : 200), done && done(status, text)
            }, addEventListenerFn(script, "load", callback), addEventListenerFn(script, "error", callback), 8 >= msie && (script.onreadystatechange = function() {
              isString(script.readyState) && /loaded|complete/.test(script.readyState) && (script.onreadystatechange = null, callback({
                type: "load"
              }))
            }), rawDocument.body.appendChild(script), callback
          }
          var ABORTED = -1;
          return function(method, url, post, callback, headers, timeout, withCredentials, responseType) {
            function timeoutRequest() {
              status = ABORTED, jsonpDone && jsonpDone(), xhr && xhr.abort()
            }

            function completeRequest(callback, status, response, headersString, statusText) {
              timeoutId && $browserDefer.cancel(timeoutId), jsonpDone = xhr = null, 0 === status && (status = response ? 200 : "file" == urlResolve(url).protocol ? 404 : 0), status = 1223 === status ? 204 : status, statusText = statusText || "", callback(status, response, headersString, statusText), $browser.$$completeOutstandingRequest(noop)
            }
            var status;
            if ($browser.$$incOutstandingRequestCount(), url = url || $browser.url(), "jsonp" == lowercase(method)) {
              var callbackId = "_" + (callbacks.counter++).toString(36);
              callbacks[callbackId] = function(data) {
                callbacks[callbackId].data = data, callbacks[callbackId].called = !0
              };
              var jsonpDone = jsonpReq(url.replace("JSON_CALLBACK", "angular.callbacks." + callbackId), callbackId, function(status, text) {
                completeRequest(callback, status, callbacks[callbackId].data, "", text), callbacks[callbackId] = noop
              })
            } else {
              var xhr = createXhr(method);
              if (xhr.open(method, url, !0), forEach(headers, function(value, key) {
                isDefined(value) && xhr.setRequestHeader(key, value)
              }), xhr.onreadystatechange = function() {
                if (xhr && 4 == xhr.readyState) {
                  var responseHeaders = null,
                    response = null;
                  status !== ABORTED && (responseHeaders = xhr.getAllResponseHeaders(), response = "response" in xhr ? xhr.response : xhr.responseText), completeRequest(callback, status || xhr.status, response, responseHeaders, xhr.statusText || "")
                }
              }, withCredentials && (xhr.withCredentials = !0), responseType) try {
                xhr.responseType = responseType
              } catch (e) {
                if ("json" !== responseType) throw e
              }
              xhr.send(post || null)
            } if (timeout > 0) var timeoutId = $browserDefer(timeoutRequest, timeout);
            else timeout && timeout.then && timeout.then(timeoutRequest)
          }
        }

        function $InterpolateProvider() {
          var startSymbol = "{{",
            endSymbol = "}}";
          this.startSymbol = function(value) {
            return value ? (startSymbol = value, this) : startSymbol
          }, this.endSymbol = function(value) {
            return value ? (endSymbol = value, this) : endSymbol
          }, this.$get = ["$parse", "$exceptionHandler", "$sce",
            function($parse, $exceptionHandler, $sce) {
              function $interpolate(text, mustHaveExpression, trustedContext) {
                for (var startIndex, endIndex, fn, exp, index = 0, parts = [], length = text.length, hasInterpolation = !1, concat = []; length > index;) - 1 != (startIndex = text.indexOf(startSymbol, index)) && -1 != (endIndex = text.indexOf(endSymbol, startIndex + startSymbolLength)) ? (index != startIndex && parts.push(text.substring(index, startIndex)), parts.push(fn = $parse(exp = text.substring(startIndex + startSymbolLength, endIndex))), fn.exp = exp, index = endIndex + endSymbolLength, hasInterpolation = !0) : (index != length && parts.push(text.substring(index)), index = length);
                if ((length = parts.length) || (parts.push(""), length = 1), trustedContext && parts.length > 1) throw $interpolateMinErr("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", text);
                return !mustHaveExpression || hasInterpolation ? (concat.length = length, fn = function(context) {
                  try {
                    for (var part, i = 0, ii = length; ii > i; i++) {
                      if ("function" == typeof(part = parts[i]))
                        if (part = part(context), part = trustedContext ? $sce.getTrusted(trustedContext, part) : $sce.valueOf(part), null == part) part = "";
                        else switch (typeof part) {
                          case "string":
                            break;
                          case "number":
                            part = "" + part;
                            break;
                          default:
                            part = toJson(part)
                        }
                        concat[i] = part
                    }
                    return concat.join("")
                  } catch (err) {
                    var newErr = $interpolateMinErr("interr", "Can't interpolate: {0}\n{1}", text, err.toString());
                    $exceptionHandler(newErr)
                  }
                }, fn.exp = text, fn.parts = parts, fn) : void 0
              }
              var startSymbolLength = startSymbol.length,
                endSymbolLength = endSymbol.length;
              return $interpolate.startSymbol = function() {
                return startSymbol
              }, $interpolate.endSymbol = function() {
                return endSymbol
              }, $interpolate
            }
          ]
        }

        function $IntervalProvider() {
          this.$get = ["$rootScope", "$window", "$q",
            function($rootScope, $window, $q) {
              function interval(fn, delay, count, invokeApply) {
                var setInterval = $window.setInterval,
                  clearInterval = $window.clearInterval,
                  deferred = $q.defer(),
                  promise = deferred.promise,
                  iteration = 0,
                  skipApply = isDefined(invokeApply) && !invokeApply;
                return count = isDefined(count) ? count : 0, promise.then(null, null, fn), promise.$$intervalId = setInterval(function() {
                  deferred.notify(iteration++), count > 0 && iteration >= count && (deferred.resolve(iteration), clearInterval(promise.$$intervalId), delete intervals[promise.$$intervalId]), skipApply || $rootScope.$apply()
                }, delay), intervals[promise.$$intervalId] = deferred, promise
              }
              var intervals = {};
              return interval.cancel = function(promise) {
                return promise && promise.$$intervalId in intervals ? (intervals[promise.$$intervalId].reject("canceled"), clearInterval(promise.$$intervalId), delete intervals[promise.$$intervalId], !0) : !1
              }, interval
            }
          ]
        }

        function $LocaleProvider() {
          this.$get = function() {
            return {
              id: "en-us",
              NUMBER_FORMATS: {
                DECIMAL_SEP: ".",
                GROUP_SEP: ",",
                PATTERNS: [{
                  minInt: 1,
                  minFrac: 0,
                  maxFrac: 3,
                  posPre: "",
                  posSuf: "",
                  negPre: "-",
                  negSuf: "",
                  gSize: 3,
                  lgSize: 3
                }, {
                  minInt: 1,
                  minFrac: 2,
                  maxFrac: 2,
                  posPre: "¤",
                  posSuf: "",
                  negPre: "(¤",
                  negSuf: ")",
                  gSize: 3,
                  lgSize: 3
                }],
                CURRENCY_SYM: "$"
              },
              DATETIME_FORMATS: {
                MONTH: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
                SHORTMONTH: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
                DAY: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
                SHORTDAY: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
                AMPMS: ["AM", "PM"],
                medium: "MMM d, y h:mm:ss a",
                "short": "M/d/yy h:mm a",
                fullDate: "EEEE, MMMM d, y",
                longDate: "MMMM d, y",
                mediumDate: "MMM d, y",
                shortDate: "M/d/yy",
                mediumTime: "h:mm:ss a",
                shortTime: "h:mm a"
              },
              pluralCat: function(num) {
                return 1 === num ? "one" : "other"
              }
            }
          }
        }

        function encodePath(path) {
          for (var segments = path.split("/"), i = segments.length; i--;) segments[i] = encodeUriSegment(segments[i]);
          return segments.join("/")
        }

        function parseAbsoluteUrl(absoluteUrl, locationObj, appBase) {
          var parsedUrl = urlResolve(absoluteUrl, appBase);
          locationObj.$$protocol = parsedUrl.protocol, locationObj.$$host = parsedUrl.hostname, locationObj.$$port = int(parsedUrl.port) || DEFAULT_PORTS[parsedUrl.protocol] || null
        }

        function parseAppUrl(relativeUrl, locationObj, appBase) {
          var prefixed = "/" !== relativeUrl.charAt(0);
          prefixed && (relativeUrl = "/" + relativeUrl);
          var match = urlResolve(relativeUrl, appBase);
          locationObj.$$path = decodeURIComponent(prefixed && "/" === match.pathname.charAt(0) ? match.pathname.substring(1) : match.pathname), locationObj.$$search = parseKeyValue(match.search), locationObj.$$hash = decodeURIComponent(match.hash), locationObj.$$path && "/" != locationObj.$$path.charAt(0) && (locationObj.$$path = "/" + locationObj.$$path)
        }

        function beginsWith(begin, whole) {
          return 0 === whole.indexOf(begin) ? whole.substr(begin.length) : void 0
        }

        function stripHash(url) {
          var index = url.indexOf("#");
          return -1 == index ? url : url.substr(0, index)
        }

        function stripFile(url) {
          return url.substr(0, stripHash(url).lastIndexOf("/") + 1)
        }

        function serverBase(url) {
          return url.substring(0, url.indexOf("/", url.indexOf("//") + 2))
        }

        function LocationHtml5Url(appBase, basePrefix) {
          this.$$html5 = !0, basePrefix = basePrefix || "";
          var appBaseNoFile = stripFile(appBase);
          parseAbsoluteUrl(appBase, this, appBase), this.$$parse = function(url) {
            var pathUrl = beginsWith(appBaseNoFile, url);
            if (!isString(pathUrl)) throw $locationMinErr("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', url, appBaseNoFile);
            parseAppUrl(pathUrl, this, appBase), this.$$path || (this.$$path = "/"), this.$$compose()
          }, this.$$compose = function() {
            var search = toKeyValue(this.$$search),
              hash = this.$$hash ? "#" + encodeUriSegment(this.$$hash) : "";
            this.$$url = encodePath(this.$$path) + (search ? "?" + search : "") + hash, this.$$absUrl = appBaseNoFile + this.$$url.substr(1)
          }, this.$$rewrite = function(url) {
            var appUrl, prevAppUrl;
            return (appUrl = beginsWith(appBase, url)) !== undefined ? (prevAppUrl = appUrl, (appUrl = beginsWith(basePrefix, appUrl)) !== undefined ? appBaseNoFile + (beginsWith("/", appUrl) || appUrl) : appBase + prevAppUrl) : (appUrl = beginsWith(appBaseNoFile, url)) !== undefined ? appBaseNoFile + appUrl : appBaseNoFile == url + "/" ? appBaseNoFile : void 0
          }
        }

        function LocationHashbangUrl(appBase, hashPrefix) {
          var appBaseNoFile = stripFile(appBase);
          parseAbsoluteUrl(appBase, this, appBase), this.$$parse = function(url) {
            function removeWindowsDriveName(path, url, base) {
              var firstPathSegmentMatch, windowsFilePathExp = /^\/[A-Z]:(\/.*)/;
              return 0 === url.indexOf(base) && (url = url.replace(base, "")), windowsFilePathExp.exec(url) ? path : (firstPathSegmentMatch = windowsFilePathExp.exec(path), firstPathSegmentMatch ? firstPathSegmentMatch[1] : path)
            }
            var withoutBaseUrl = beginsWith(appBase, url) || beginsWith(appBaseNoFile, url),
              withoutHashUrl = "#" == withoutBaseUrl.charAt(0) ? beginsWith(hashPrefix, withoutBaseUrl) : this.$$html5 ? withoutBaseUrl : "";
            if (!isString(withoutHashUrl)) throw $locationMinErr("ihshprfx", 'Invalid url "{0}", missing hash prefix "{1}".', url, hashPrefix);
            parseAppUrl(withoutHashUrl, this, appBase), this.$$path = removeWindowsDriveName(this.$$path, withoutHashUrl, appBase), this.$$compose()
          }, this.$$compose = function() {
            var search = toKeyValue(this.$$search),
              hash = this.$$hash ? "#" + encodeUriSegment(this.$$hash) : "";
            this.$$url = encodePath(this.$$path) + (search ? "?" + search : "") + hash, this.$$absUrl = appBase + (this.$$url ? hashPrefix + this.$$url : "")
          }, this.$$rewrite = function(url) {
            return stripHash(appBase) == stripHash(url) ? url : void 0
          }
        }

        function LocationHashbangInHtml5Url(appBase, hashPrefix) {
          this.$$html5 = !0, LocationHashbangUrl.apply(this, arguments);
          var appBaseNoFile = stripFile(appBase);
          this.$$rewrite = function(url) {
            var appUrl;
            return appBase == stripHash(url) ? url : (appUrl = beginsWith(appBaseNoFile, url)) ? appBase + hashPrefix + appUrl : appBaseNoFile === url + "/" ? appBaseNoFile : void 0
          }, this.$$compose = function() {
            var search = toKeyValue(this.$$search),
              hash = this.$$hash ? "#" + encodeUriSegment(this.$$hash) : "";
            this.$$url = encodePath(this.$$path) + (search ? "?" + search : "") + hash, this.$$absUrl = appBase + hashPrefix + this.$$url
          }
        }

        function locationGetter(property) {
          return function() {
            return this[property]
          }
        }

        function locationGetterSetter(property, preprocess) {
          return function(value) {
            return isUndefined(value) ? this[property] : (this[property] = preprocess(value), this.$$compose(), this)
          }
        }

        function $LocationProvider() {
          var hashPrefix = "",
            html5Mode = !1;
          this.hashPrefix = function(prefix) {
            return isDefined(prefix) ? (hashPrefix = prefix, this) : hashPrefix
          }, this.html5Mode = function(mode) {
            return isDefined(mode) ? (html5Mode = mode, this) : html5Mode
          }, this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement",
            function($rootScope, $browser, $sniffer, $rootElement) {
              function afterLocationChange(oldUrl) {
                $rootScope.$broadcast("$locationChangeSuccess", $location.absUrl(), oldUrl)
              }
              var $location, LocationMode, appBase, baseHref = $browser.baseHref(),
                initialUrl = $browser.url();
              html5Mode ? (appBase = serverBase(initialUrl) + (baseHref || "/"), LocationMode = $sniffer.history ? LocationHtml5Url : LocationHashbangInHtml5Url) : (appBase = stripHash(initialUrl), LocationMode = LocationHashbangUrl), $location = new LocationMode(appBase, "#" + hashPrefix), $location.$$parse($location.$$rewrite(initialUrl)), $rootElement.on("click", function(event) {
                if (!event.ctrlKey && !event.metaKey && 2 != event.which) {
                  for (var elm = jqLite(event.target);
                    "a" !== lowercase(elm[0].nodeName);)
                    if (elm[0] === $rootElement[0] || !(elm = elm.parent())[0]) return;
                  var absHref = elm.prop("href");
                  if (isObject(absHref) && "[object SVGAnimatedString]" === absHref.toString() && (absHref = urlResolve(absHref.animVal).href), LocationMode === LocationHashbangInHtml5Url) {
                    var href = elm.attr("href") || elm.attr("xlink:href");
                    if (href.indexOf("://") < 0) {
                      var prefix = "#" + hashPrefix;
                      if ("/" == href[0]) absHref = appBase + prefix + href;
                      else if ("#" == href[0]) absHref = appBase + prefix + ($location.path() || "/") + href;
                      else {
                        for (var stack = $location.path().split("/"), parts = href.split("/"), i = 0; i < parts.length; i++) "." != parts[i] && (".." == parts[i] ? stack.pop() : parts[i].length && stack.push(parts[i]));
                        absHref = appBase + prefix + stack.join("/")
                      }
                    }
                  }
                  var rewrittenUrl = $location.$$rewrite(absHref);
                  absHref && !elm.attr("target") && rewrittenUrl && !event.isDefaultPrevented() && (event.preventDefault(), rewrittenUrl != $browser.url() && ($location.$$parse(rewrittenUrl), $rootScope.$apply(), window.angular["ff-684208-preventDefault"] = !0))
                }
              }), $location.absUrl() != initialUrl && $browser.url($location.absUrl(), !0), $browser.onUrlChange(function(newUrl) {
                $location.absUrl() != newUrl && ($rootScope.$evalAsync(function() {
                  var oldUrl = $location.absUrl();
                  $location.$$parse(newUrl), $rootScope.$broadcast("$locationChangeStart", newUrl, oldUrl).defaultPrevented ? ($location.$$parse(oldUrl), $browser.url(oldUrl)) : afterLocationChange(oldUrl)
                }), $rootScope.$$phase || $rootScope.$digest())
              });
              var changeCounter = 0;
              return $rootScope.$watch(function() {
                var oldUrl = $browser.url(),
                  currentReplace = $location.$$replace;
                return changeCounter && oldUrl == $location.absUrl() || (changeCounter++, $rootScope.$evalAsync(function() {
                  $rootScope.$broadcast("$locationChangeStart", $location.absUrl(), oldUrl).defaultPrevented ? $location.$$parse(oldUrl) : ($browser.url($location.absUrl(), currentReplace), afterLocationChange(oldUrl))
                })), $location.$$replace = !1, changeCounter
              }), $location
            }
          ]
        }

        function $LogProvider() {
          var debug = !0,
            self = this;
          this.debugEnabled = function(flag) {
            return isDefined(flag) ? (debug = flag, this) : debug
          }, this.$get = ["$window",
            function($window) {
              function formatError(arg) {
                return arg instanceof Error && (arg.stack ? arg = arg.message && -1 === arg.stack.indexOf(arg.message) ? "Error: " + arg.message + "\n" + arg.stack : arg.stack : arg.sourceURL && (arg = arg.message + "\n" + arg.sourceURL + ":" + arg.line)), arg
              }

              function consoleLog(type) {
                var console = $window.console || {},
                  logFn = console[type] || console.log || noop,
                  hasApply = !1;
                try {
                  hasApply = !!logFn.apply
                } catch (e) {}
                return hasApply ? function() {
                  var args = [];
                  return forEach(arguments, function(arg) {
                    args.push(formatError(arg))
                  }), logFn.apply(console, args)
                } : function(arg1, arg2) {
                  logFn(arg1, null == arg2 ? "" : arg2)
                }
              }
              return {
                log: consoleLog("log"),
                info: consoleLog("info"),
                warn: consoleLog("warn"),
                error: consoleLog("error"),
                debug: function() {
                  var fn = consoleLog("debug");
                  return function() {
                    debug && fn.apply(self, arguments)
                  }
                }()
              }
            }
          ]
        }

        function ensureSafeMemberName(name, fullExpression) {
          if ("constructor" === name) throw $parseMinErr("isecfld", 'Referencing "constructor" field in Angular expressions is disallowed! Expression: {0}', fullExpression);
          return name
        }

        function ensureSafeObject(obj, fullExpression) {
          if (obj) {
            if (obj.constructor === obj) throw $parseMinErr("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", fullExpression);
            if (obj.document && obj.location && obj.alert && obj.setInterval) throw $parseMinErr("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", fullExpression);
            if (obj.children && (obj.nodeName || obj.prop && obj.attr && obj.find)) throw $parseMinErr("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", fullExpression)
          }
          return obj
        }

        function setter(obj, path, setValue, fullExp, options) {
          options = options || {};
          for (var key, element = path.split("."), i = 0; element.length > 1; i++) {
            key = ensureSafeMemberName(element.shift(), fullExp);
            var propertyObj = obj[key];
            propertyObj || (propertyObj = {}, obj[key] = propertyObj), obj = propertyObj, obj.then && options.unwrapPromises && (promiseWarning(fullExp), "$$v" in obj || ! function(promise) {
              promise.then(function(val) {
                promise.$$v = val
              })
            }(obj), obj.$$v === undefined && (obj.$$v = {}), obj = obj.$$v)
          }
          return key = ensureSafeMemberName(element.shift(), fullExp), obj[key] = setValue, setValue
        }

        function cspSafeGetterFn(key0, key1, key2, key3, key4, fullExp, options) {
          return ensureSafeMemberName(key0, fullExp), ensureSafeMemberName(key1, fullExp), ensureSafeMemberName(key2, fullExp), ensureSafeMemberName(key3, fullExp), ensureSafeMemberName(key4, fullExp), options.unwrapPromises ? function(scope, locals) {
            var promise, pathVal = locals && locals.hasOwnProperty(key0) ? locals : scope;
            return null == pathVal ? pathVal : (pathVal = pathVal[key0], pathVal && pathVal.then && (promiseWarning(fullExp), "$$v" in pathVal || (promise = pathVal, promise.$$v = undefined, promise.then(function(val) {
              promise.$$v = val
            })), pathVal = pathVal.$$v), key1 ? null == pathVal ? undefined : (pathVal = pathVal[key1], pathVal && pathVal.then && (promiseWarning(fullExp), "$$v" in pathVal || (promise = pathVal, promise.$$v = undefined, promise.then(function(val) {
              promise.$$v = val
            })), pathVal = pathVal.$$v), key2 ? null == pathVal ? undefined : (pathVal = pathVal[key2], pathVal && pathVal.then && (promiseWarning(fullExp), "$$v" in pathVal || (promise = pathVal, promise.$$v = undefined, promise.then(function(val) {
              promise.$$v = val
            })), pathVal = pathVal.$$v), key3 ? null == pathVal ? undefined : (pathVal = pathVal[key3], pathVal && pathVal.then && (promiseWarning(fullExp), "$$v" in pathVal || (promise = pathVal, promise.$$v = undefined, promise.then(function(val) {
              promise.$$v = val
            })), pathVal = pathVal.$$v), key4 ? null == pathVal ? undefined : (pathVal = pathVal[key4], pathVal && pathVal.then && (promiseWarning(fullExp), "$$v" in pathVal || (promise = pathVal, promise.$$v = undefined, promise.then(function(val) {
              promise.$$v = val
            })), pathVal = pathVal.$$v), pathVal) : pathVal) : pathVal) : pathVal) : pathVal)
          } : function(scope, locals) {
            var pathVal = locals && locals.hasOwnProperty(key0) ? locals : scope;
            return null == pathVal ? pathVal : (pathVal = pathVal[key0], key1 ? null == pathVal ? undefined : (pathVal = pathVal[key1], key2 ? null == pathVal ? undefined : (pathVal = pathVal[key2], key3 ? null == pathVal ? undefined : (pathVal = pathVal[key3], key4 ? null == pathVal ? undefined : pathVal = pathVal[key4] : pathVal) : pathVal) : pathVal) : pathVal)
          }
        }

        function simpleGetterFn1(key0, fullExp) {
          return ensureSafeMemberName(key0, fullExp),
            function(scope, locals) {
              return null == scope ? undefined : (locals && locals.hasOwnProperty(key0) ? locals : scope)[key0]
            }
        }

        function simpleGetterFn2(key0, key1, fullExp) {
          return ensureSafeMemberName(key0, fullExp), ensureSafeMemberName(key1, fullExp),
            function(scope, locals) {
              return null == scope ? undefined : (scope = (locals && locals.hasOwnProperty(key0) ? locals : scope)[key0], null == scope ? undefined : scope[key1])
            }
        }

        function getterFn(path, options, fullExp) {
          if (getterFnCache.hasOwnProperty(path)) return getterFnCache[path];
          var fn, pathKeys = path.split("."),
            pathKeysLength = pathKeys.length;
          if (options.unwrapPromises || 1 !== pathKeysLength)
            if (options.unwrapPromises || 2 !== pathKeysLength)
              if (options.csp) fn = 6 > pathKeysLength ? cspSafeGetterFn(pathKeys[0], pathKeys[1], pathKeys[2], pathKeys[3], pathKeys[4], fullExp, options) : function(scope, locals) {
                var val, i = 0;
                do val = cspSafeGetterFn(pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++], fullExp, options)(scope, locals), locals = undefined, scope = val; while (pathKeysLength > i);
                return val
              };
              else {
                var code = "var p;\n";
                forEach(pathKeys, function(key, index) {
                  ensureSafeMemberName(key, fullExp), code += "if(s == null) return undefined;\ns=" + (index ? "s" : '((k&&k.hasOwnProperty("' + key + '"))?k:s)') + '["' + key + '"];\n' + (options.unwrapPromises ? 'if (s && s.then) {\n pw("' + fullExp.replace(/(["\r\n])/g, "\\$1") + '");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n' : "")
                }), code += "return s;";
                var evaledFnGetter = new Function("s", "k", "pw", code);
                evaledFnGetter.toString = valueFn(code), fn = options.unwrapPromises ? function(scope, locals) {
                  return evaledFnGetter(scope, locals, promiseWarning)
                } : evaledFnGetter
              } else fn = simpleGetterFn2(pathKeys[0], pathKeys[1], fullExp);
          else fn = simpleGetterFn1(pathKeys[0], fullExp);
          return "hasOwnProperty" !== path && (getterFnCache[path] = fn), fn
        }

        function $ParseProvider() {
          var cache = {},
            $parseOptions = {
              csp: !1,
              unwrapPromises: !1,
              logPromiseWarnings: !0
            };
          this.unwrapPromises = function(value) {
            return isDefined(value) ? ($parseOptions.unwrapPromises = !!value, this) : $parseOptions.unwrapPromises
          }, this.logPromiseWarnings = function(value) {
            return isDefined(value) ? ($parseOptions.logPromiseWarnings = value, this) : $parseOptions.logPromiseWarnings
          }, this.$get = ["$filter", "$sniffer", "$log",
            function($filter, $sniffer, $log) {
              return $parseOptions.csp = $sniffer.csp, promiseWarning = function(fullExp) {
                  $parseOptions.logPromiseWarnings && !promiseWarningCache.hasOwnProperty(fullExp) && (promiseWarningCache[fullExp] = !0, $log.warn("[$parse] Promise found in the expression `" + fullExp + "`. Automatic unwrapping of promises in Angular expressions is deprecated."))
                },
                function(exp) {
                  var parsedExpression;
                  switch (typeof exp) {
                    case "string":
                      if (cache.hasOwnProperty(exp)) return cache[exp];
                      var lexer = new Lexer($parseOptions),
                        parser = new Parser(lexer, $filter, $parseOptions);
                      return parsedExpression = parser.parse(exp), "hasOwnProperty" !== exp && (cache[exp] = parsedExpression), parsedExpression;
                    case "function":
                      return exp;
                    default:
                      return noop
                  }
                }
            }
          ]
        }

        function $QProvider() {
          this.$get = ["$rootScope", "$exceptionHandler",
            function($rootScope, $exceptionHandler) {
              return qFactory(function(callback) {
                $rootScope.$evalAsync(callback)
              }, $exceptionHandler)
            }
          ]
        }

        function qFactory(nextTick, exceptionHandler) {
          function defaultCallback(value) {
            return value
          }

          function defaultErrback(reason) {
            return reject(reason)
          }

          function all(promises) {
            var deferred = defer(),
              counter = 0,
              results = isArray(promises) ? [] : {};
            return forEach(promises, function(promise, key) {
              counter++, ref(promise).then(function(value) {
                results.hasOwnProperty(key) || (results[key] = value, --counter || deferred.resolve(results))
              }, function(reason) {
                results.hasOwnProperty(key) || deferred.reject(reason)
              })
            }), 0 === counter && deferred.resolve(results), deferred.promise
          }
          var defer = function() {
              var value, deferred, pending = [];
              return deferred = {
                resolve: function(val) {
                  if (pending) {
                    var callbacks = pending;
                    pending = undefined, value = ref(val), callbacks.length && nextTick(function() {
                      for (var callback, i = 0, ii = callbacks.length; ii > i; i++) callback = callbacks[i], value.then(callback[0], callback[1], callback[2])
                    })
                  }
                },
                reject: function(reason) {
                  deferred.resolve(createInternalRejectedPromise(reason))
                },
                notify: function(progress) {
                  if (pending) {
                    var callbacks = pending;
                    pending.length && nextTick(function() {
                      for (var callback, i = 0, ii = callbacks.length; ii > i; i++) callback = callbacks[i], callback[2](progress)
                    })
                  }
                },
                promise: {
                  then: function(callback, errback, progressback) {
                    var result = defer(),
                      wrappedCallback = function(value) {
                        try {
                          result.resolve((isFunction(callback) ? callback : defaultCallback)(value))
                        } catch (e) {
                          result.reject(e), exceptionHandler(e)
                        }
                      },
                      wrappedErrback = function(reason) {
                        try {
                          result.resolve((isFunction(errback) ? errback : defaultErrback)(reason))
                        } catch (e) {
                          result.reject(e), exceptionHandler(e)
                        }
                      },
                      wrappedProgressback = function(progress) {
                        try {
                          result.notify((isFunction(progressback) ? progressback : defaultCallback)(progress))
                        } catch (e) {
                          exceptionHandler(e)
                        }
                      };
                    return pending ? pending.push([wrappedCallback, wrappedErrback, wrappedProgressback]) : value.then(wrappedCallback, wrappedErrback, wrappedProgressback), result.promise
                  },
                  "catch": function(callback) {
                    return this.then(null, callback)
                  },
                  "finally": function(callback) {
                    function makePromise(value, resolved) {
                      var result = defer();
                      return resolved ? result.resolve(value) : result.reject(value), result.promise
                    }

                    function handleCallback(value, isResolved) {
                      var callbackOutput = null;
                      try {
                        callbackOutput = (callback || defaultCallback)()
                      } catch (e) {
                        return makePromise(e, !1)
                      }
                      return callbackOutput && isFunction(callbackOutput.then) ? callbackOutput.then(function() {
                        return makePromise(value, isResolved)
                      }, function(error) {
                        return makePromise(error, !1)
                      }) : makePromise(value, isResolved)
                    }
                    return this.then(function(value) {
                      return handleCallback(value, !0)
                    }, function(error) {
                      return handleCallback(error, !1)
                    })
                  }
                }
              }
            },
            ref = function(value) {
              return value && isFunction(value.then) ? value : {
                then: function(callback) {
                  var result = defer();
                  return nextTick(function() {
                    result.resolve(callback(value))
                  }), result.promise
                }
              }
            },
            reject = function(reason) {
              var result = defer();
              return result.reject(reason), result.promise
            },
            createInternalRejectedPromise = function(reason) {
              return {
                then: function(callback, errback) {
                  var result = defer();
                  return nextTick(function() {
                    try {
                      result.resolve((isFunction(errback) ? errback : defaultErrback)(reason))
                    } catch (e) {
                      result.reject(e), exceptionHandler(e)
                    }
                  }), result.promise
                }
              }
            },
            when = function(value, callback, errback, progressback) {
              var done, result = defer(),
                wrappedCallback = function(value) {
                  try {
                    return (isFunction(callback) ? callback : defaultCallback)(value)
                  } catch (e) {
                    return exceptionHandler(e), reject(e)
                  }
                },
                wrappedErrback = function(reason) {
                  try {
                    return (isFunction(errback) ? errback : defaultErrback)(reason)
                  } catch (e) {
                    return exceptionHandler(e), reject(e)
                  }
                },
                wrappedProgressback = function(progress) {
                  try {
                    return (isFunction(progressback) ? progressback : defaultCallback)(progress)
                  } catch (e) {
                    exceptionHandler(e)
                  }
                };
              return nextTick(function() {
                ref(value).then(function(value) {
                  done || (done = !0, result.resolve(ref(value).then(wrappedCallback, wrappedErrback, wrappedProgressback)))
                }, function(reason) {
                  done || (done = !0, result.resolve(wrappedErrback(reason)))
                }, function(progress) {
                  done || result.notify(wrappedProgressback(progress))
                })
              }), result.promise
            };
          return {
            defer: defer,
            reject: reject,
            when: when,
            all: all
          }
        }

        function $$RAFProvider() {
          this.$get = ["$window", "$timeout",
            function($window, $timeout) {
              var requestAnimationFrame = $window.requestAnimationFrame || $window.webkitRequestAnimationFrame || $window.mozRequestAnimationFrame,
                cancelAnimationFrame = $window.cancelAnimationFrame || $window.webkitCancelAnimationFrame || $window.mozCancelAnimationFrame || $window.webkitCancelRequestAnimationFrame,
                rafSupported = !!requestAnimationFrame,
                raf = rafSupported ? function(fn) {
                  var id = requestAnimationFrame(fn);
                  return function() {
                    cancelAnimationFrame(id)
                  }
                } : function(fn) {
                  var timer = $timeout(fn, 16.66, !1);
                  return function() {
                    $timeout.cancel(timer)
                  }
                };
              return raf.supported = rafSupported, raf
            }
          ]
        }

        function $RootScopeProvider() {
          var TTL = 10,
            $rootScopeMinErr = minErr("$rootScope"),
            lastDirtyWatch = null;
          this.digestTtl = function(value) {
            return arguments.length && (TTL = value), TTL
          }, this.$get = ["$injector", "$exceptionHandler", "$parse", "$browser",
            function($injector, $exceptionHandler, $parse, $browser) {
              function Scope() {
                this.$id = nextUid(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this["this"] = this.$root = this, this.$$destroyed = !1, this.$$asyncQueue = [], this.$$postDigestQueue = [], this.$$listeners = {}, this.$$listenerCount = {}, this.$$isolateBindings = {}
              }

              function beginPhase(phase) {
                if ($rootScope.$$phase) throw $rootScopeMinErr("inprog", "{0} already in progress", $rootScope.$$phase);
                $rootScope.$$phase = phase
              }

              function clearPhase() {
                $rootScope.$$phase = null
              }

              function compileToFn(exp, name) {
                var fn = $parse(exp);
                return assertArgFn(fn, name), fn
              }

              function decrementListenerCount(current, count, name) {
                do current.$$listenerCount[name] -= count, 0 === current.$$listenerCount[name] && delete current.$$listenerCount[name]; while (current = current.$parent)
              }

              function initWatchVal() {}
              Scope.prototype = {
                constructor: Scope,
                $new: function(isolate) {
                  var child;
                  return isolate ? (child = new Scope, child.$root = this.$root, child.$$asyncQueue = this.$$asyncQueue, child.$$postDigestQueue = this.$$postDigestQueue) : (this.$$childScopeClass || (this.$$childScopeClass = function() {
                    this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null, this.$$listeners = {}, this.$$listenerCount = {}, this.$id = nextUid(), this.$$childScopeClass = null
                  }, this.$$childScopeClass.prototype = this), child = new this.$$childScopeClass), child["this"] = child, child.$parent = this, child.$$prevSibling = this.$$childTail, this.$$childHead ? (this.$$childTail.$$nextSibling = child, this.$$childTail = child) : this.$$childHead = this.$$childTail = child, child
                },
                $watch: function(watchExp, listener, objectEquality) {
                  var scope = this,
                    get = compileToFn(watchExp, "watch"),
                    array = scope.$$watchers,
                    watcher = {
                      fn: listener,
                      last: initWatchVal,
                      get: get,
                      exp: watchExp,
                      eq: !!objectEquality
                    };
                  if (lastDirtyWatch = null, !isFunction(listener)) {
                    var listenFn = compileToFn(listener || noop, "listener");
                    watcher.fn = function(newVal, oldVal, scope) {
                      listenFn(scope)
                    }
                  }
                  if ("string" == typeof watchExp && get.constant) {
                    var originalFn = watcher.fn;
                    watcher.fn = function(newVal, oldVal, scope) {
                      originalFn.call(this, newVal, oldVal, scope), arrayRemove(array, watcher)
                    }
                  }
                  return array || (array = scope.$$watchers = []), array.unshift(watcher),
                    function() {
                      arrayRemove(array, watcher), lastDirtyWatch = null
                    }
                },
                $watchCollection: function(obj, listener) {
                  function $watchCollectionWatch() {
                    newValue = objGetter(self);
                    var newLength, key;
                    if (isObject(newValue))
                      if (isArrayLike(newValue)) {
                        oldValue !== internalArray && (oldValue = internalArray, oldLength = oldValue.length = 0, changeDetected++), newLength = newValue.length, oldLength !== newLength && (changeDetected++, oldValue.length = oldLength = newLength);
                        for (var i = 0; newLength > i; i++) {
                          var bothNaN = oldValue[i] !== oldValue[i] && newValue[i] !== newValue[i];
                          bothNaN || oldValue[i] === newValue[i] || (changeDetected++, oldValue[i] = newValue[i])
                        }
                      } else {
                        oldValue !== internalObject && (oldValue = internalObject = {}, oldLength = 0, changeDetected++), newLength = 0;
                        for (key in newValue) newValue.hasOwnProperty(key) && (newLength++, oldValue.hasOwnProperty(key) ? oldValue[key] !== newValue[key] && (changeDetected++, oldValue[key] = newValue[key]) : (oldLength++, oldValue[key] = newValue[key], changeDetected++));
                        if (oldLength > newLength) {
                          changeDetected++;
                          for (key in oldValue) oldValue.hasOwnProperty(key) && !newValue.hasOwnProperty(key) && (oldLength--, delete oldValue[key])
                        }
                      } else oldValue !== newValue && (oldValue = newValue, changeDetected++);
                    return changeDetected
                  }

                  function $watchCollectionAction() {
                    if (initRun ? (initRun = !1, listener(newValue, newValue, self)) : listener(newValue, veryOldValue, self), trackVeryOldValue)
                      if (isObject(newValue))
                        if (isArrayLike(newValue)) {
                          veryOldValue = new Array(newValue.length);
                          for (var i = 0; i < newValue.length; i++) veryOldValue[i] = newValue[i]
                        } else {
                          veryOldValue = {};
                          for (var key in newValue) hasOwnProperty.call(newValue, key) && (veryOldValue[key] = newValue[key])
                        } else veryOldValue = newValue
                  }
                  var newValue, oldValue, veryOldValue, self = this,
                    trackVeryOldValue = listener.length > 1,
                    changeDetected = 0,
                    objGetter = $parse(obj),
                    internalArray = [],
                    internalObject = {},
                    initRun = !0,
                    oldLength = 0;
                  return this.$watch($watchCollectionWatch, $watchCollectionAction)
                },
                $digest: function() {
                  var watch, value, last, watchers, length, dirty, next, current, logIdx, logMsg, asyncTask, asyncQueue = this.$$asyncQueue,
                    postDigestQueue = this.$$postDigestQueue,
                    ttl = TTL,
                    target = this,
                    watchLog = [];
                  beginPhase("$digest"), lastDirtyWatch = null;
                  do {
                    for (dirty = !1, current = target; asyncQueue.length;) {
                      try {
                        asyncTask = asyncQueue.shift(), asyncTask.scope.$eval(asyncTask.expression)
                      } catch (e) {
                        clearPhase(), $exceptionHandler(e)
                      }
                      lastDirtyWatch = null
                    }
                    traverseScopesLoop: do {
                      if (watchers = current.$$watchers)
                        for (length = watchers.length; length--;) try {
                          if (watch = watchers[length])
                            if ((value = watch.get(current)) === (last = watch.last) || (watch.eq ? equals(value, last) : "number" == typeof value && "number" == typeof last && isNaN(value) && isNaN(last))) {
                              if (watch === lastDirtyWatch) {
                                dirty = !1;
                                break traverseScopesLoop
                              }
                            } else dirty = !0, lastDirtyWatch = watch, watch.last = watch.eq ? copy(value, null) : value, watch.fn(value, last === initWatchVal ? value : last, current), 5 > ttl && (logIdx = 4 - ttl, watchLog[logIdx] || (watchLog[logIdx] = []), logMsg = isFunction(watch.exp) ? "fn: " + (watch.exp.name || watch.exp.toString()) : watch.exp, logMsg += "; newVal: " + toJson(value) + "; oldVal: " + toJson(last), watchLog[logIdx].push(logMsg))
                        } catch (e) {
                          clearPhase(), $exceptionHandler(e)
                        }
                      if (!(next = current.$$childHead || current !== target && current.$$nextSibling))
                        for (; current !== target && !(next = current.$$nextSibling);) current = current.$parent
                    } while (current = next);
                    if ((dirty || asyncQueue.length) && !ttl--) throw clearPhase(), $rootScopeMinErr("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", TTL, toJson(watchLog))
                  } while (dirty || asyncQueue.length);
                  for (clearPhase(); postDigestQueue.length;) try {
                    postDigestQueue.shift()()
                  } catch (e) {
                    $exceptionHandler(e)
                  }
                },
                $destroy: function() {
                  if (!this.$$destroyed) {
                    var parent = this.$parent;
                    this.$broadcast("$destroy"), this.$$destroyed = !0, this !== $rootScope && (forEach(this.$$listenerCount, bind(null, decrementListenerCount, this)), parent.$$childHead == this && (parent.$$childHead = this.$$nextSibling), parent.$$childTail == this && (parent.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = null, this.$$listeners = {}, this.$$watchers = this.$$asyncQueue = this.$$postDigestQueue = [], this.$destroy = this.$digest = this.$apply = noop, this.$on = this.$watch = function() {
                      return noop
                    })
                  }
                },
                $eval: function(expr, locals) {
                  return $parse(expr)(this, locals)
                },
                $evalAsync: function(expr) {
                  $rootScope.$$phase || $rootScope.$$asyncQueue.length || $browser.defer(function() {
                    $rootScope.$$asyncQueue.length && $rootScope.$digest()
                  }), this.$$asyncQueue.push({
                    scope: this,
                    expression: expr
                  })
                },
                $$postDigest: function(fn) {
                  this.$$postDigestQueue.push(fn)
                },
                $apply: function(expr) {
                  try {
                    return beginPhase("$apply"), this.$eval(expr)
                  } catch (e) {
                    $exceptionHandler(e)
                  } finally {
                    clearPhase();
                    try {
                      $rootScope.$digest()
                    } catch (e) {
                      throw $exceptionHandler(e), e
                    }
                  }
                },
                $on: function(name, listener) {
                  var namedListeners = this.$$listeners[name];
                  namedListeners || (this.$$listeners[name] = namedListeners = []), namedListeners.push(listener);
                  var current = this;
                  do current.$$listenerCount[name] || (current.$$listenerCount[name] = 0), current.$$listenerCount[name]++; while (current = current.$parent);
                  var self = this;
                  return function() {
                    namedListeners[indexOf(namedListeners, listener)] = null, decrementListenerCount(self, 1, name)
                  }
                },
                $emit: function(name) {
                  var namedListeners, i, length, empty = [],
                    scope = this,
                    stopPropagation = !1,
                    event = {
                      name: name,
                      targetScope: scope,
                      stopPropagation: function() {
                        stopPropagation = !0
                      },
                      preventDefault: function() {
                        event.defaultPrevented = !0
                      },
                      defaultPrevented: !1
                    },
                    listenerArgs = concat([event], arguments, 1);
                  do {
                    for (namedListeners = scope.$$listeners[name] || empty, event.currentScope = scope, i = 0, length = namedListeners.length; length > i; i++)
                      if (namedListeners[i]) try {
                        namedListeners[i].apply(null, listenerArgs)
                      } catch (e) {
                        $exceptionHandler(e)
                      } else namedListeners.splice(i, 1), i--, length--;
                    if (stopPropagation) return event;
                    scope = scope.$parent
                  } while (scope);
                  return event
                },
                $broadcast: function(name) {
                  for (var listeners, i, length, target = this, current = target, next = target, event = {
                    name: name,
                    targetScope: target,
                    preventDefault: function() {
                      event.defaultPrevented = !0
                    },
                    defaultPrevented: !1
                  }, listenerArgs = concat([event], arguments, 1); current = next;) {
                    for (event.currentScope = current, listeners = current.$$listeners[name] || [], i = 0, length = listeners.length; length > i; i++)
                      if (listeners[i]) try {
                        listeners[i].apply(null, listenerArgs)
                      } catch (e) {
                        $exceptionHandler(e)
                      } else listeners.splice(i, 1), i--, length--;
                    if (!(next = current.$$listenerCount[name] && current.$$childHead || current !== target && current.$$nextSibling))
                      for (; current !== target && !(next = current.$$nextSibling);) current = current.$parent
                  }
                  return event
                }
              };
              var $rootScope = new Scope;
              return $rootScope
            }
          ]
        }

        function $$SanitizeUriProvider() {
          var aHrefSanitizationWhitelist = /^\s*(https?|ftp|mailto|tel|file):/,
            imgSrcSanitizationWhitelist = /^\s*(https?|ftp|file):|data:image\//;
          this.aHrefSanitizationWhitelist = function(regexp) {
            return isDefined(regexp) ? (aHrefSanitizationWhitelist = regexp, this) : aHrefSanitizationWhitelist
          }, this.imgSrcSanitizationWhitelist = function(regexp) {
            return isDefined(regexp) ? (imgSrcSanitizationWhitelist = regexp, this) : imgSrcSanitizationWhitelist
          }, this.$get = function() {
            return function(uri, isImage) {
              var normalizedVal, regex = isImage ? imgSrcSanitizationWhitelist : aHrefSanitizationWhitelist;
              return msie && !(msie >= 8) || (normalizedVal = urlResolve(uri).href, "" === normalizedVal || normalizedVal.match(regex)) ? uri : "unsafe:" + normalizedVal
            }
          }
        }

        function escapeForRegexp(s) {
          return s.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
        }

        function adjustMatcher(matcher) {
          if ("self" === matcher) return matcher;
          if (isString(matcher)) {
            if (matcher.indexOf("***") > -1) throw $sceMinErr("iwcard", "Illegal sequence *** in string matcher.  String: {0}", matcher);
            return matcher = escapeForRegexp(matcher).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), new RegExp("^" + matcher + "$")
          }
          if (isRegExp(matcher)) return new RegExp("^" + matcher.source + "$");
          throw $sceMinErr("imatcher", 'Matchers may only be "self", string patterns or RegExp objects')
        }

        function adjustMatchers(matchers) {
          var adjustedMatchers = [];
          return isDefined(matchers) && forEach(matchers, function(matcher) {
            adjustedMatchers.push(adjustMatcher(matcher))
          }), adjustedMatchers
        }

        function $SceDelegateProvider() {
          this.SCE_CONTEXTS = SCE_CONTEXTS;
          var resourceUrlWhitelist = ["self"],
            resourceUrlBlacklist = [];
          this.resourceUrlWhitelist = function(value) {
            return arguments.length && (resourceUrlWhitelist = adjustMatchers(value)), resourceUrlWhitelist
          }, this.resourceUrlBlacklist = function(value) {
            return arguments.length && (resourceUrlBlacklist = adjustMatchers(value)), resourceUrlBlacklist
          }, this.$get = ["$injector",
            function($injector) {
              function matchUrl(matcher, parsedUrl) {
                return "self" === matcher ? urlIsSameOrigin(parsedUrl) : !!matcher.exec(parsedUrl.href)
              }

              function isResourceUrlAllowedByPolicy(url) {
                var i, n, parsedUrl = urlResolve(url.toString()),
                  allowed = !1;
                for (i = 0, n = resourceUrlWhitelist.length; n > i; i++)
                  if (matchUrl(resourceUrlWhitelist[i], parsedUrl)) {
                    allowed = !0;
                    break
                  }
                if (allowed)
                  for (i = 0, n = resourceUrlBlacklist.length; n > i; i++)
                    if (matchUrl(resourceUrlBlacklist[i], parsedUrl)) {
                      allowed = !1;
                      break
                    }
                return allowed
              }

              function generateHolderType(Base) {
                var holderType = function(trustedValue) {
                  this.$$unwrapTrustedValue = function() {
                    return trustedValue
                  }
                };
                return Base && (holderType.prototype = new Base), holderType.prototype.valueOf = function() {
                  return this.$$unwrapTrustedValue()
                }, holderType.prototype.toString = function() {
                  return this.$$unwrapTrustedValue().toString()
                }, holderType
              }

              function trustAs(type, trustedValue) {
                var Constructor = byType.hasOwnProperty(type) ? byType[type] : null;
                if (!Constructor) throw $sceMinErr("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", type, trustedValue);
                if (null === trustedValue || trustedValue === undefined || "" === trustedValue) return trustedValue;
                if ("string" != typeof trustedValue) throw $sceMinErr("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", type);
                return new Constructor(trustedValue)
              }

              function valueOf(maybeTrusted) {
                return maybeTrusted instanceof trustedValueHolderBase ? maybeTrusted.$$unwrapTrustedValue() : maybeTrusted
              }

              function getTrusted(type, maybeTrusted) {
                if (null === maybeTrusted || maybeTrusted === undefined || "" === maybeTrusted) return maybeTrusted;
                var constructor = byType.hasOwnProperty(type) ? byType[type] : null;
                if (constructor && maybeTrusted instanceof constructor) return maybeTrusted.$$unwrapTrustedValue();
                if (type === SCE_CONTEXTS.RESOURCE_URL) {
                  if (isResourceUrlAllowedByPolicy(maybeTrusted)) return maybeTrusted;
                  throw $sceMinErr("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", maybeTrusted.toString())
                }
                if (type === SCE_CONTEXTS.HTML) return htmlSanitizer(maybeTrusted);
                throw $sceMinErr("unsafe", "Attempting to use an unsafe value in a safe context.")
              }
              var htmlSanitizer = function() {
                throw $sceMinErr("unsafe", "Attempting to use an unsafe value in a safe context.")
              };
              $injector.has("$sanitize") && (htmlSanitizer = $injector.get("$sanitize"));
              var trustedValueHolderBase = generateHolderType(),
                byType = {};
              return byType[SCE_CONTEXTS.HTML] = generateHolderType(trustedValueHolderBase), byType[SCE_CONTEXTS.CSS] = generateHolderType(trustedValueHolderBase), byType[SCE_CONTEXTS.URL] = generateHolderType(trustedValueHolderBase), byType[SCE_CONTEXTS.JS] = generateHolderType(trustedValueHolderBase), byType[SCE_CONTEXTS.RESOURCE_URL] = generateHolderType(byType[SCE_CONTEXTS.URL]), {
                trustAs: trustAs,
                getTrusted: getTrusted,
                valueOf: valueOf
              }
            }
          ]
        }

        function $SceProvider() {
          var enabled = !0;
          this.enabled = function(value) {
            return arguments.length && (enabled = !!value), enabled
          }, this.$get = ["$parse", "$sniffer", "$sceDelegate",
            function($parse, $sniffer, $sceDelegate) {
              if (enabled && $sniffer.msie && $sniffer.msieDocumentMode < 8) throw $sceMinErr("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 9 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
              var sce = shallowCopy(SCE_CONTEXTS);
              sce.isEnabled = function() {
                return enabled
              }, sce.trustAs = $sceDelegate.trustAs, sce.getTrusted = $sceDelegate.getTrusted, sce.valueOf = $sceDelegate.valueOf, enabled || (sce.trustAs = sce.getTrusted = function(type, value) {
                return value
              }, sce.valueOf = identity), sce.parseAs = function(type, expr) {
                var parsed = $parse(expr);
                return parsed.literal && parsed.constant ? parsed : function(self, locals) {
                  return sce.getTrusted(type, parsed(self, locals))
                }
              };
              var parse = sce.parseAs,
                getTrusted = sce.getTrusted,
                trustAs = sce.trustAs;
              return forEach(SCE_CONTEXTS, function(enumValue, name) {
                var lName = lowercase(name);
                sce[camelCase("parse_as_" + lName)] = function(expr) {
                  return parse(enumValue, expr)
                }, sce[camelCase("get_trusted_" + lName)] = function(value) {
                  return getTrusted(enumValue, value)
                }, sce[camelCase("trust_as_" + lName)] = function(value) {
                  return trustAs(enumValue, value)
                }
              }), sce
            }
          ]
        }

        function $SnifferProvider() {
          this.$get = ["$window", "$document",
            function($window, $document) {
              var vendorPrefix, match, eventSupport = {},
                android = int((/android (\d+)/.exec(lowercase(($window.navigator || {}).userAgent)) || [])[1]),
                boxee = /Boxee/i.test(($window.navigator || {}).userAgent),
                document = $document[0] || {},
                documentMode = document.documentMode,
                vendorRegex = /^(Moz|webkit|O|ms)(?=[A-Z])/,
                bodyStyle = document.body && document.body.style,
                transitions = !1,
                animations = !1;
              if (bodyStyle) {
                for (var prop in bodyStyle)
                  if (match = vendorRegex.exec(prop)) {
                    vendorPrefix = match[0], vendorPrefix = vendorPrefix.substr(0, 1).toUpperCase() + vendorPrefix.substr(1);
                    break
                  }
                vendorPrefix || (vendorPrefix = "WebkitOpacity" in bodyStyle && "webkit"), transitions = !!("transition" in bodyStyle || vendorPrefix + "Transition" in bodyStyle), animations = !!("animation" in bodyStyle || vendorPrefix + "Animation" in bodyStyle), !android || transitions && animations || (transitions = isString(document.body.style.webkitTransition), animations = isString(document.body.style.webkitAnimation))
              }
              return {
                history: !(!$window.history || !$window.history.pushState || 4 > android || boxee),
                hashchange: "onhashchange" in $window && (!documentMode || documentMode > 7),
                hasEvent: function(event) {
                  if ("input" == event && 9 == msie) return !1;
                  if (isUndefined(eventSupport[event])) {
                    var divElm = document.createElement("div");
                    eventSupport[event] = "on" + event in divElm
                  }
                  return eventSupport[event]
                },
                csp: csp(),
                vendorPrefix: vendorPrefix,
                transitions: transitions,
                animations: animations,
                android: android,
                msie: msie,
                msieDocumentMode: documentMode
              }
            }
          ]
        }

        function $TimeoutProvider() {
          this.$get = ["$rootScope", "$browser", "$q", "$exceptionHandler",
            function($rootScope, $browser, $q, $exceptionHandler) {
              function timeout(fn, delay, invokeApply) {
                var timeoutId, deferred = $q.defer(),
                  promise = deferred.promise,
                  skipApply = isDefined(invokeApply) && !invokeApply;
                return timeoutId = $browser.defer(function() {
                  try {
                    deferred.resolve(fn())
                  } catch (e) {
                    deferred.reject(e), $exceptionHandler(e)
                  } finally {
                    delete deferreds[promise.$$timeoutId]
                  }
                  skipApply || $rootScope.$apply()
                }, delay), promise.$$timeoutId = timeoutId, deferreds[timeoutId] = deferred, promise
              }
              var deferreds = {};
              return timeout.cancel = function(promise) {
                return promise && promise.$$timeoutId in deferreds ? (deferreds[promise.$$timeoutId].reject("canceled"), delete deferreds[promise.$$timeoutId], $browser.defer.cancel(promise.$$timeoutId)) : !1
              }, timeout
            }
          ]
        }

        function urlResolve(url) {
          var href = url;
          return msie && (urlParsingNode.setAttribute("href", href), href = urlParsingNode.href), urlParsingNode.setAttribute("href", href), {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: "/" === urlParsingNode.pathname.charAt(0) ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
          }
        }

        function urlIsSameOrigin(requestUrl) {
          var parsed = isString(requestUrl) ? urlResolve(requestUrl) : requestUrl;
          return parsed.protocol === originUrl.protocol && parsed.host === originUrl.host
        }

        function $WindowProvider() {
          this.$get = valueFn(window)
        }

        function $FilterProvider($provide) {
          function register(name, factory) {
            if (isObject(name)) {
              var filters = {};
              return forEach(name, function(filter, key) {
                filters[key] = register(key, filter)
              }), filters
            }
            return $provide.factory(name + suffix, factory)
          }
          var suffix = "Filter";
          this.register = register, this.$get = ["$injector",
            function($injector) {
              return function(name) {
                return $injector.get(name + suffix)
              }
            }
          ], register("currency", currencyFilter), register("date", dateFilter), register("filter", filterFilter), register("json", jsonFilter), register("limitTo", limitToFilter), register("lowercase", lowercaseFilter), register("number", numberFilter), register("orderBy", orderByFilter), register("uppercase", uppercaseFilter)
        }

        function filterFilter() {
          return function(array, expression, comparator) {
            if (!isArray(array)) return array;
            var comparatorType = typeof comparator,
              predicates = [];
            predicates.check = function(value) {
              for (var j = 0; j < predicates.length; j++)
                if (!predicates[j](value)) return !1;
              return !0
            }, "function" !== comparatorType && (comparator = "boolean" === comparatorType && comparator ? function(obj, text) {
              return angular.equals(obj, text)
            } : function(obj, text) {
              if (obj && text && "object" == typeof obj && "object" == typeof text) {
                for (var objKey in obj)
                  if ("$" !== objKey.charAt(0) && hasOwnProperty.call(obj, objKey) && comparator(obj[objKey], text[objKey])) return !0;
                return !1
              }
              return text = ("" + text).toLowerCase(), ("" + obj).toLowerCase().indexOf(text) > -1
            });
            var search = function(obj, text) {
              if ("string" == typeof text && "!" === text.charAt(0)) return !search(obj, text.substr(1));
              switch (typeof obj) {
                case "boolean":
                case "number":
                case "string":
                  return comparator(obj, text);
                case "object":
                  switch (typeof text) {
                    case "object":
                      return comparator(obj, text);
                    default:
                      for (var objKey in obj)
                        if ("$" !== objKey.charAt(0) && search(obj[objKey], text)) return !0
                  }
                  return !1;
                case "array":
                  for (var i = 0; i < obj.length; i++)
                    if (search(obj[i], text)) return !0;
                  return !1;
                default:
                  return !1
              }
            };
            switch (typeof expression) {
              case "boolean":
              case "number":
              case "string":
                expression = {
                  $: expression
                };
              case "object":
                for (var key in expression)! function(path) {
                  "undefined" != typeof expression[path] && predicates.push(function(value) {
                    return search("$" == path ? value : value && value[path], expression[path])
                  })
                }(key);
                break;
              case "function":
                predicates.push(expression);
                break;
              default:
                return array
            }
            for (var filtered = [], j = 0; j < array.length; j++) {
              var value = array[j];
              predicates.check(value) && filtered.push(value)
            }
            return filtered
          }
        }

        function currencyFilter($locale) {
          var formats = $locale.NUMBER_FORMATS;
          return function(amount, currencySymbol) {
            return isUndefined(currencySymbol) && (currencySymbol = formats.CURRENCY_SYM), formatNumber(amount, formats.PATTERNS[1], formats.GROUP_SEP, formats.DECIMAL_SEP, 2).replace(/\u00A4/g, currencySymbol)
          }
        }

        function numberFilter($locale) {
          var formats = $locale.NUMBER_FORMATS;
          return function(number, fractionSize) {
            return formatNumber(number, formats.PATTERNS[0], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize)
          }
        }

        function formatNumber(number, pattern, groupSep, decimalSep, fractionSize) {
          if (null == number || !isFinite(number) || isObject(number)) return "";
          var isNegative = 0 > number;
          number = Math.abs(number);
          var numStr = number + "",
            formatedText = "",
            parts = [],
            hasExponent = !1;
          if (-1 !== numStr.indexOf("e")) {
            var match = numStr.match(/([\d\.]+)e(-?)(\d+)/);
            match && "-" == match[2] && match[3] > fractionSize + 1 ? numStr = "0" : (formatedText = numStr, hasExponent = !0)
          }
          if (hasExponent) fractionSize > 0 && number > -1 && 1 > number && (formatedText = number.toFixed(fractionSize));
          else {
            var fractionLen = (numStr.split(DECIMAL_SEP)[1] || "").length;
            isUndefined(fractionSize) && (fractionSize = Math.min(Math.max(pattern.minFrac, fractionLen), pattern.maxFrac));
            var pow = Math.pow(10, fractionSize + 1);
            number = Math.floor(number * pow + 5) / pow;
            var fraction = ("" + number).split(DECIMAL_SEP),
              whole = fraction[0];
            fraction = fraction[1] || "";
            var i, pos = 0,
              lgroup = pattern.lgSize,
              group = pattern.gSize;
            if (whole.length >= lgroup + group)
              for (pos = whole.length - lgroup, i = 0; pos > i; i++)(pos - i) % group === 0 && 0 !== i && (formatedText += groupSep), formatedText += whole.charAt(i);
            for (i = pos; i < whole.length; i++)(whole.length - i) % lgroup === 0 && 0 !== i && (formatedText += groupSep), formatedText += whole.charAt(i);
            for (; fraction.length < fractionSize;) fraction += "0";
            fractionSize && "0" !== fractionSize && (formatedText += decimalSep + fraction.substr(0, fractionSize))
          }
          return parts.push(isNegative ? pattern.negPre : pattern.posPre), parts.push(formatedText), parts.push(isNegative ? pattern.negSuf : pattern.posSuf), parts.join("")
        }

        function padNumber(num, digits, trim) {
          var neg = "";
          for (0 > num && (neg = "-", num = -num), num = "" + num; num.length < digits;) num = "0" + num;
          return trim && (num = num.substr(num.length - digits)), neg + num
        }

        function dateGetter(name, size, offset, trim) {
          return offset = offset || 0,
            function(date) {
              var value = date["get" + name]();
              return (offset > 0 || value > -offset) && (value += offset), 0 === value && -12 == offset && (value = 12), padNumber(value, size, trim)
            }
        }

        function dateStrGetter(name, shortForm) {
          return function(date, formats) {
            var value = date["get" + name](),
              get = uppercase(shortForm ? "SHORT" + name : name);
            return formats[get][value]
          }
        }

        function timeZoneGetter(date) {
          var zone = -1 * date.getTimezoneOffset(),
            paddedZone = zone >= 0 ? "+" : "";
          return paddedZone += padNumber(Math[zone > 0 ? "floor" : "ceil"](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2)
        }

        function ampmGetter(date, formats) {
          return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1]
        }

        function dateFilter($locale) {
          function jsonStringToDate(string) {
            var match;
            if (match = string.match(R_ISO8601_STR)) {
              var date = new Date(0),
                tzHour = 0,
                tzMin = 0,
                dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear,
                timeSetter = match[8] ? date.setUTCHours : date.setHours;
              match[9] && (tzHour = int(match[9] + match[10]), tzMin = int(match[9] + match[11])), dateSetter.call(date, int(match[1]), int(match[2]) - 1, int(match[3]));
              var h = int(match[4] || 0) - tzHour,
                m = int(match[5] || 0) - tzMin,
                s = int(match[6] || 0),
                ms = Math.round(1e3 * parseFloat("0." + (match[7] || 0)));
              return timeSetter.call(date, h, m, s, ms), date
            }
            return string
          }
          var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
          return function(date, format) {
            var fn, match, text = "",
              parts = [];
            if (format = format || "mediumDate", format = $locale.DATETIME_FORMATS[format] || format, isString(date) && (date = NUMBER_STRING.test(date) ? int(date) : jsonStringToDate(date)), isNumber(date) && (date = new Date(date)), !isDate(date)) return date;
            for (; format;) match = DATE_FORMATS_SPLIT.exec(format), match ? (parts = concat(parts, match, 1), format = parts.pop()) : (parts.push(format), format = null);
            return forEach(parts, function(value) {
              fn = DATE_FORMATS[value], text += fn ? fn(date, $locale.DATETIME_FORMATS) : value.replace(/(^'|'$)/g, "").replace(/''/g, "'")
            }), text
          }
        }

        function jsonFilter() {
          return function(object) {
            return toJson(object, !0)
          }
        }

        function limitToFilter() {
          return function(input, limit) {
            if (!isArray(input) && !isString(input)) return input;
            if (limit = 1 / 0 === Math.abs(Number(limit)) ? Number(limit) : int(limit), isString(input)) return limit ? limit >= 0 ? input.slice(0, limit) : input.slice(limit, input.length) : "";
            var i, n, out = [];
            for (limit > input.length ? limit = input.length : limit < -input.length && (limit = -input.length), limit > 0 ? (i = 0, n = limit) : (i = input.length + limit, n = input.length); n > i; i++) out.push(input[i]);
            return out
          }
        }

        function orderByFilter($parse) {
          return function(array, sortPredicate, reverseOrder) {
            function comparator(o1, o2) {
              for (var i = 0; i < sortPredicate.length; i++) {
                var comp = sortPredicate[i](o1, o2);
                if (0 !== comp) return comp
              }
              return 0
            }

            function reverseComparator(comp, descending) {
              return toBoolean(descending) ? function(a, b) {
                return comp(b, a)
              } : comp
            }

            function compare(v1, v2) {
              var t1 = typeof v1,
                t2 = typeof v2;
              return t1 == t2 ? ("string" == t1 && (v1 = v1.toLowerCase(), v2 = v2.toLowerCase()), v1 === v2 ? 0 : v2 > v1 ? -1 : 1) : t2 > t1 ? -1 : 1
            }
            if (!isArray(array)) return array;
            if (!sortPredicate) return array;
            sortPredicate = isArray(sortPredicate) ? sortPredicate : [sortPredicate], sortPredicate = map(sortPredicate, function(predicate) {
              var descending = !1,
                get = predicate || identity;
              if (isString(predicate) && (("+" == predicate.charAt(0) || "-" == predicate.charAt(0)) && (descending = "-" == predicate.charAt(0), predicate = predicate.substring(1)), get = $parse(predicate), get.constant)) {
                var key = get();
                return reverseComparator(function(a, b) {
                  return compare(a[key], b[key])
                }, descending)
              }
              return reverseComparator(function(a, b) {
                return compare(get(a), get(b))
              }, descending)
            });
            for (var arrayCopy = [], i = 0; i < array.length; i++) arrayCopy.push(array[i]);
            return arrayCopy.sort(reverseComparator(comparator, reverseOrder))
          }
        }

        function ngDirective(directive) {
          return isFunction(directive) && (directive = {
            link: directive
          }), directive.restrict = directive.restrict || "AC", valueFn(directive)
        }

        function FormController(element, attrs, $scope, $animate) {
          function toggleValidCss(isValid, validationErrorKey) {
            validationErrorKey = validationErrorKey ? "-" + snake_case(validationErrorKey, "-") : "", $animate.removeClass(element, (isValid ? INVALID_CLASS : VALID_CLASS) + validationErrorKey), $animate.addClass(element, (isValid ? VALID_CLASS : INVALID_CLASS) + validationErrorKey)
          }
          var form = this,
            parentForm = element.parent().controller("form") || nullFormCtrl,
            invalidCount = 0,
            errors = form.$error = {},
            controls = [];
          form.$name = attrs.name || attrs.ngForm, form.$dirty = !1, form.$pristine = !0, form.$valid = !0, form.$invalid = !1, parentForm.$addControl(form), element.addClass(PRISTINE_CLASS), toggleValidCss(!0), form.$addControl = function(control) {
            assertNotHasOwnProperty(control.$name, "input"), controls.push(control), control.$name && (form[control.$name] = control)
          }, form.$removeControl = function(control) {
            control.$name && form[control.$name] === control && delete form[control.$name], forEach(errors, function(queue, validationToken) {
              form.$setValidity(validationToken, !0, control)
            }), arrayRemove(controls, control)
          }, form.$setValidity = function(validationToken, isValid, control) {
            var queue = errors[validationToken];
            if (isValid) queue && (arrayRemove(queue, control), queue.length || (invalidCount--, invalidCount || (toggleValidCss(isValid), form.$valid = !0, form.$invalid = !1), errors[validationToken] = !1, toggleValidCss(!0, validationToken), parentForm.$setValidity(validationToken, !0, form)));
            else {
              if (invalidCount || toggleValidCss(isValid), queue) {
                if (includes(queue, control)) return
              } else errors[validationToken] = queue = [], invalidCount++, toggleValidCss(!1, validationToken), parentForm.$setValidity(validationToken, !1, form);
              queue.push(control), form.$valid = !1, form.$invalid = !0
            }
          }, form.$setDirty = function() {
            $animate.removeClass(element, PRISTINE_CLASS), $animate.addClass(element, DIRTY_CLASS), form.$dirty = !0, form.$pristine = !1, parentForm.$setDirty()
          }, form.$setPristine = function() {
            $animate.removeClass(element, DIRTY_CLASS), $animate.addClass(element, PRISTINE_CLASS), form.$dirty = !1, form.$pristine = !0, forEach(controls, function(control) {
              control.$setPristine()
            })
          }
        }

        function validate(ctrl, validatorName, validity, value) {
          return ctrl.$setValidity(validatorName, validity), validity ? value : undefined
        }

        function addNativeHtml5Validators(ctrl, validatorName, element) {
          var validity = element.prop("validity");
          if (isObject(validity)) {
            var validator = function(value) {
              return ctrl.$error[validatorName] || !(validity.badInput || validity.customError || validity.typeMismatch) || validity.valueMissing ? value : void ctrl.$setValidity(validatorName, !1)
            };
            ctrl.$parsers.push(validator)
          }
        }

        function textInputType(scope, element, attr, ctrl, $sniffer, $browser) {
          var validity = element.prop("validity"),
            placeholder = element[0].placeholder,
            noevent = {};
          if (!$sniffer.android) {
            var composing = !1;
            element.on("compositionstart", function() {
              composing = !0
            }), element.on("compositionend", function() {
              composing = !1, listener()
            })
          }
          var listener = function(ev) {
            if (!composing) {
              var value = element.val();
              if (msie && "input" === (ev || noevent).type && element[0].placeholder !== placeholder) return void(placeholder = element[0].placeholder);
              toBoolean(attr.ngTrim || "T") && (value = trim(value)), (ctrl.$viewValue !== value || validity && "" === value && !validity.valueMissing) && (scope.$$phase ? ctrl.$setViewValue(value) : scope.$apply(function() {
                ctrl.$setViewValue(value)
              }))
            }
          };
          if ($sniffer.hasEvent("input")) element.on("input", listener);
          else {
            var timeout, deferListener = function() {
              timeout || (timeout = $browser.defer(function() {
                listener(), timeout = null
              }))
            };
            element.on("keydown", function(event) {
              var key = event.keyCode;
              91 === key || key > 15 && 19 > key || key >= 37 && 40 >= key || deferListener()
            }), $sniffer.hasEvent("paste") && element.on("paste cut", deferListener)
          }
          element.on("change", listener), ctrl.$render = function() {
            element.val(ctrl.$isEmpty(ctrl.$viewValue) ? "" : ctrl.$viewValue)
          };
          var patternValidator, match, pattern = attr.ngPattern;
          if (pattern) {
            var validateRegex = function(regexp, value) {
              return validate(ctrl, "pattern", ctrl.$isEmpty(value) || regexp.test(value), value)
            };
            match = pattern.match(/^\/(.*)\/([gim]*)$/), match ? (pattern = new RegExp(match[1], match[2]), patternValidator = function(value) {
              return validateRegex(pattern, value)
            }) : patternValidator = function(value) {
              var patternObj = scope.$eval(pattern);
              if (!patternObj || !patternObj.test) throw minErr("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", pattern, patternObj, startingTag(element));
              return validateRegex(patternObj, value)
            }, ctrl.$formatters.push(patternValidator), ctrl.$parsers.push(patternValidator)
          }
          if (attr.ngMinlength) {
            var minlength = int(attr.ngMinlength),
              minLengthValidator = function(value) {
                return validate(ctrl, "minlength", ctrl.$isEmpty(value) || value.length >= minlength, value)
              };
            ctrl.$parsers.push(minLengthValidator), ctrl.$formatters.push(minLengthValidator)
          }
          if (attr.ngMaxlength) {
            var maxlength = int(attr.ngMaxlength),
              maxLengthValidator = function(value) {
                return validate(ctrl, "maxlength", ctrl.$isEmpty(value) || value.length <= maxlength, value)
              };
            ctrl.$parsers.push(maxLengthValidator), ctrl.$formatters.push(maxLengthValidator)
          }
        }

        function numberInputType(scope, element, attr, ctrl, $sniffer, $browser) {
          if (textInputType(scope, element, attr, ctrl, $sniffer, $browser), ctrl.$parsers.push(function(value) {
            var empty = ctrl.$isEmpty(value);
            return empty || NUMBER_REGEXP.test(value) ? (ctrl.$setValidity("number", !0), "" === value ? null : empty ? value : parseFloat(value)) : (ctrl.$setValidity("number", !1), undefined)
          }), addNativeHtml5Validators(ctrl, "number", element), ctrl.$formatters.push(function(value) {
            return ctrl.$isEmpty(value) ? "" : "" + value
          }), attr.min) {
            var minValidator = function(value) {
              var min = parseFloat(attr.min);
              return validate(ctrl, "min", ctrl.$isEmpty(value) || value >= min, value)
            };
            ctrl.$parsers.push(minValidator), ctrl.$formatters.push(minValidator)
          }
          if (attr.max) {
            var maxValidator = function(value) {
              var max = parseFloat(attr.max);
              return validate(ctrl, "max", ctrl.$isEmpty(value) || max >= value, value)
            };
            ctrl.$parsers.push(maxValidator), ctrl.$formatters.push(maxValidator)
          }
          ctrl.$formatters.push(function(value) {
            return validate(ctrl, "number", ctrl.$isEmpty(value) || isNumber(value), value)
          })
        }

        function urlInputType(scope, element, attr, ctrl, $sniffer, $browser) {
          textInputType(scope, element, attr, ctrl, $sniffer, $browser);
          var urlValidator = function(value) {
            return validate(ctrl, "url", ctrl.$isEmpty(value) || URL_REGEXP.test(value), value)
          };
          ctrl.$formatters.push(urlValidator), ctrl.$parsers.push(urlValidator)
        }

        function emailInputType(scope, element, attr, ctrl, $sniffer, $browser) {
          textInputType(scope, element, attr, ctrl, $sniffer, $browser);
          var emailValidator = function(value) {
            return validate(ctrl, "email", ctrl.$isEmpty(value) || EMAIL_REGEXP.test(value), value)
          };
          ctrl.$formatters.push(emailValidator), ctrl.$parsers.push(emailValidator)
        }

        function radioInputType(scope, element, attr, ctrl) {
          isUndefined(attr.name) && element.attr("name", nextUid()), element.on("click", function() {
            element[0].checked && scope.$apply(function() {
              ctrl.$setViewValue(attr.value)
            })
          }), ctrl.$render = function() {
            var value = attr.value;
            element[0].checked = value == ctrl.$viewValue
          }, attr.$observe("value", ctrl.$render)
        }

        function checkboxInputType(scope, element, attr, ctrl) {
          var trueValue = attr.ngTrueValue,
            falseValue = attr.ngFalseValue;
          isString(trueValue) || (trueValue = !0), isString(falseValue) || (falseValue = !1), element.on("click", function() {
            scope.$apply(function() {
              ctrl.$setViewValue(element[0].checked)
            })
          }), ctrl.$render = function() {
            element[0].checked = ctrl.$viewValue
          }, ctrl.$isEmpty = function(value) {
            return value !== trueValue
          }, ctrl.$formatters.push(function(value) {
            return value === trueValue
          }), ctrl.$parsers.push(function(value) {
            return value ? trueValue : falseValue
          })
        }

        function classDirective(name, selector) {
          return name = "ngClass" + name, ["$animate",
            function($animate) {
              function arrayDifference(tokens1, tokens2) {
                var values = [];
                outer: for (var i = 0; i < tokens1.length; i++) {
                  for (var token = tokens1[i], j = 0; j < tokens2.length; j++)
                    if (token == tokens2[j]) continue outer;
                  values.push(token)
                }
                return values
              }

              function arrayClasses(classVal) {
                if (isArray(classVal)) return classVal;
                if (isString(classVal)) return classVal.split(" ");
                if (isObject(classVal)) {
                  var classes = [];
                  return forEach(classVal, function(v, k) {
                    v && (classes = classes.concat(k.split(" ")))
                  }), classes
                }
                return classVal
              }
              return {
                restrict: "AC",
                link: function(scope, element, attr) {
                  function addClasses(classes) {
                    var newClasses = digestClassCounts(classes, 1);
                    attr.$addClass(newClasses)
                  }

                  function removeClasses(classes) {
                    var newClasses = digestClassCounts(classes, -1);
                    attr.$removeClass(newClasses)
                  }

                  function digestClassCounts(classes, count) {
                    var classCounts = element.data("$classCounts") || {},
                      classesToUpdate = [];
                    return forEach(classes, function(className) {
                      (count > 0 || classCounts[className]) && (classCounts[className] = (classCounts[className] || 0) + count, classCounts[className] === +(count > 0) && classesToUpdate.push(className))
                    }), element.data("$classCounts", classCounts), classesToUpdate.join(" ")
                  }

                  function updateClasses(oldClasses, newClasses) {
                    var toAdd = arrayDifference(newClasses, oldClasses),
                      toRemove = arrayDifference(oldClasses, newClasses);
                    toRemove = digestClassCounts(toRemove, -1), toAdd = digestClassCounts(toAdd, 1), 0 === toAdd.length ? $animate.removeClass(element, toRemove) : 0 === toRemove.length ? $animate.addClass(element, toAdd) : $animate.setClass(element, toAdd, toRemove)
                  }

                  function ngClassWatchAction(newVal) {
                    if (selector === !0 || scope.$index % 2 === selector) {
                      var newClasses = arrayClasses(newVal || []);
                      if (oldVal) {
                        if (!equals(newVal, oldVal)) {
                          var oldClasses = arrayClasses(oldVal);
                          updateClasses(oldClasses, newClasses)
                        }
                      } else addClasses(newClasses)
                    }
                    oldVal = shallowCopy(newVal)
                  }
                  var oldVal;
                  scope.$watch(attr[name], ngClassWatchAction, !0), attr.$observe("class", function() {
                    ngClassWatchAction(scope.$eval(attr[name]))
                  }), "ngClass" !== name && scope.$watch("$index", function($index, old$index) {
                    var mod = 1 & $index;
                    if (mod !== (1 & old$index)) {
                      var classes = arrayClasses(scope.$eval(attr[name]));
                      mod === selector ? addClasses(classes) : removeClasses(classes)
                    }
                  })
                }
              }
            }
          ]
        }
        var lowercase = function(string) {
            return isString(string) ? string.toLowerCase() : string
          },
          hasOwnProperty = Object.prototype.hasOwnProperty,
          uppercase = function(string) {
            return isString(string) ? string.toUpperCase() : string
          },
          manualLowercase = function(s) {
            return isString(s) ? s.replace(/[A-Z]/g, function(ch) {
              return String.fromCharCode(32 | ch.charCodeAt(0))
            }) : s
          },
          manualUppercase = function(s) {
            return isString(s) ? s.replace(/[a-z]/g, function(ch) {
              return String.fromCharCode(-33 & ch.charCodeAt(0))
            }) : s
          };
        "i" !== "I".toLowerCase() && (lowercase = manualLowercase, uppercase = manualUppercase);
        var msie, jqLite, jQuery, angularModule, nodeName_, slice = [].slice,
          push = [].push,
          toString = Object.prototype.toString,
          ngMinErr = minErr("ng"),
          angular = window.angular || (window.angular = {}),
          uid = ["0", "0", "0"];
        msie = int((/msie (\d+)/.exec(lowercase(navigator.userAgent)) || [])[1]), isNaN(msie) && (msie = int((/trident\/.*; rv:(\d+)/.exec(lowercase(navigator.userAgent)) || [])[1])), noop.$inject = [], identity.$inject = [];
        var trim = function() {
          return String.prototype.trim ? function(value) {
            return isString(value) ? value.trim() : value
          } : function(value) {
            return isString(value) ? value.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : value
          }
        }();
        nodeName_ = 9 > msie ? function(element) {
          return element = element.nodeName ? element : element[0], element.scopeName && "HTML" != element.scopeName ? uppercase(element.scopeName + ":" + element.nodeName) : element.nodeName
        } : function(element) {
          return element.nodeName ? element.nodeName : element[0].nodeName
        };
        var SNAKE_CASE_REGEXP = /[A-Z]/g,
          version = {
            full: "1.2.17-build.223+sha.d18d5f5",
            major: 1,
            minor: 2,
            dot: 17,
            codeName: "snapshot"
          },
          jqCache = JQLite.cache = {},
          jqName = JQLite.expando = "ng-" + (new Date).getTime(),
          jqId = 1,
          addEventListenerFn = window.document.addEventListener ? function(element, type, fn) {
            element.addEventListener(type, fn, !1)
          } : function(element, type, fn) {
            element.attachEvent("on" + type, fn)
          },
          removeEventListenerFn = window.document.removeEventListener ? function(element, type, fn) {
            element.removeEventListener(type, fn, !1)
          } : function(element, type, fn) {
            element.detachEvent("on" + type, fn)
          },
          SPECIAL_CHARS_REGEXP = (JQLite._data = function(node) {
            return this.cache[node[this.expando]] || {}
          }, /([\:\-\_]+(.))/g),
          MOZ_HACK_REGEXP = /^moz([A-Z])/,
          jqLiteMinErr = minErr("jqLite"),
          SINGLE_TAG_REGEXP = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
          HTML_REGEXP = /<|&#?\w+;/,
          TAG_NAME_REGEXP = /<([\w:]+)/,
          XHTML_TAG_REGEXP = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
          wrapMap = {
            option: [1, '<select multiple="multiple">', "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
          };
        wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, wrapMap.th = wrapMap.td;
        var JQLitePrototype = JQLite.prototype = {
            ready: function(fn) {
              function trigger() {
                fired || (fired = !0, fn())
              }
              var fired = !1;
              "complete" === document.readyState ? setTimeout(trigger) : (this.on("DOMContentLoaded", trigger), JQLite(window).on("load", trigger))
            },
            toString: function() {
              var value = [];
              return forEach(this, function(e) {
                value.push("" + e)
              }), "[" + value.join(", ") + "]"
            },
            eq: function(index) {
              return jqLite(index >= 0 ? this[index] : this[this.length + index])
            },
            length: 0,
            push: push,
            sort: [].sort,
            splice: [].splice
          },
          BOOLEAN_ATTR = {};
        forEach("multiple,selected,checked,disabled,readOnly,required,open".split(","), function(value) {
          BOOLEAN_ATTR[lowercase(value)] = value
        });
        var BOOLEAN_ELEMENTS = {};
        forEach("input,select,option,textarea,button,form,details".split(","), function(value) {
          BOOLEAN_ELEMENTS[uppercase(value)] = !0
        }), forEach({
          data: jqLiteData,
          inheritedData: jqLiteInheritedData,
          scope: function(element) {
            return jqLite(element).data("$scope") || jqLiteInheritedData(element.parentNode || element, ["$isolateScope", "$scope"])
          },
          isolateScope: function(element) {
            return jqLite(element).data("$isolateScope") || jqLite(element).data("$isolateScopeNoTemplate")
          },
          controller: jqLiteController,
          injector: function(element) {
            return jqLiteInheritedData(element, "$injector")
          },
          removeAttr: function(element, name) {
            element.removeAttribute(name)
          },
          hasClass: jqLiteHasClass,
          css: function(element, name, value) {
            if (name = camelCase(name), !isDefined(value)) {
              var val;
              return 8 >= msie && (val = element.currentStyle && element.currentStyle[name], "" === val && (val = "auto")), val = val || element.style[name], 8 >= msie && (val = "" === val ? undefined : val), val
            }
            element.style[name] = value
          },
          attr: function(element, name, value) {
            var lowercasedName = lowercase(name);
            if (BOOLEAN_ATTR[lowercasedName]) {
              if (!isDefined(value)) return element[name] || (element.attributes.getNamedItem(name) || noop).specified ? lowercasedName : undefined;
              value ? (element[name] = !0, element.setAttribute(name, lowercasedName)) : (element[name] = !1, element.removeAttribute(lowercasedName))
            } else if (isDefined(value)) element.setAttribute(name, value);
            else if (element.getAttribute) {
              var ret = element.getAttribute(name, 2);
              return null === ret ? undefined : ret
            }
          },
          prop: function(element, name, value) {
            return isDefined(value) ? void(element[name] = value) : element[name]
          },
          text: function() {
            function getText(element, value) {
              var textProp = NODE_TYPE_TEXT_PROPERTY[element.nodeType];
              return isUndefined(value) ? textProp ? element[textProp] : "" : void(element[textProp] = value)
            }
            var NODE_TYPE_TEXT_PROPERTY = [];
            return 9 > msie ? (NODE_TYPE_TEXT_PROPERTY[1] = "innerText", NODE_TYPE_TEXT_PROPERTY[3] = "nodeValue") : NODE_TYPE_TEXT_PROPERTY[1] = NODE_TYPE_TEXT_PROPERTY[3] = "textContent", getText.$dv = "", getText
          }(),
          val: function(element, value) {
            if (isUndefined(value)) {
              if ("SELECT" === nodeName_(element) && element.multiple) {
                var result = [];
                return forEach(element.options, function(option) {
                  option.selected && result.push(option.value || option.text)
                }), 0 === result.length ? null : result
              }
              return element.value
            }
            element.value = value
          },
          html: function(element, value) {
            if (isUndefined(value)) return element.innerHTML;
            for (var i = 0, childNodes = element.childNodes; i < childNodes.length; i++) jqLiteDealoc(childNodes[i]);
            element.innerHTML = value
          },
          empty: jqLiteEmpty
        }, function(fn, name) {
          JQLite.prototype[name] = function(arg1, arg2) {
            var i, key;
            if (fn !== jqLiteEmpty && (2 == fn.length && fn !== jqLiteHasClass && fn !== jqLiteController ? arg1 : arg2) === undefined) {
              if (isObject(arg1)) {
                for (i = 0; i < this.length; i++)
                  if (fn === jqLiteData) fn(this[i], arg1);
                  else
                    for (key in arg1) fn(this[i], key, arg1[key]);
                return this
              }
              for (var value = fn.$dv, jj = value === undefined ? Math.min(this.length, 1) : this.length, j = 0; jj > j; j++) {
                var nodeValue = fn(this[j], arg1, arg2);
                value = value ? value + nodeValue : nodeValue
              }
              return value
            }
            for (i = 0; i < this.length; i++) fn(this[i], arg1, arg2);
            return this
          }
        }), forEach({
          removeData: jqLiteRemoveData,
          dealoc: jqLiteDealoc,
          on: function onFn(element, type, fn, unsupported) {
            if (isDefined(unsupported)) throw jqLiteMinErr("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
            var events = jqLiteExpandoStore(element, "events"),
              handle = jqLiteExpandoStore(element, "handle");
            events || jqLiteExpandoStore(element, "events", events = {}), handle || jqLiteExpandoStore(element, "handle", handle = createEventHandler(element, events)), forEach(type.split(" "), function(type) {
              var eventFns = events[type];
              if (!eventFns) {
                if ("mouseenter" == type || "mouseleave" == type) {
                  var contains = document.body.contains || document.body.compareDocumentPosition ? function(a, b) {
                    var adown = 9 === a.nodeType ? a.documentElement : a,
                      bup = b && b.parentNode;
                    return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)))
                  } : function(a, b) {
                    if (b)
                      for (; b = b.parentNode;)
                        if (b === a) return !0;
                    return !1
                  };
                  events[type] = [];
                  var eventmap = {
                    mouseleave: "mouseout",
                    mouseenter: "mouseover"
                  };
                  onFn(element, eventmap[type], function(event) {
                    var target = this,
                      related = event.relatedTarget;
                    (!related || related !== target && !contains(target, related)) && handle(event, type)
                  })
                } else addEventListenerFn(element, type, handle), events[type] = [];
                eventFns = events[type]
              }
              eventFns.push(fn)
            })
          },
          off: jqLiteOff,
          one: function(element, type, fn) {
            element = jqLite(element), element.on(type, function onFn() {
              element.off(type, fn), element.off(type, onFn)
            }), element.on(type, fn)
          },
          replaceWith: function(element, replaceNode) {
            var index, parent = element.parentNode;
            jqLiteDealoc(element), forEach(new JQLite(replaceNode), function(node) {
              index ? parent.insertBefore(node, index.nextSibling) : parent.replaceChild(node, element), index = node
            })
          },
          children: function(element) {
            var children = [];
            return forEach(element.childNodes, function(element) {
              1 === element.nodeType && children.push(element)
            }), children
          },
          contents: function(element) {
            return element.contentDocument || element.childNodes || []
          },
          append: function(element, node) {
            forEach(new JQLite(node), function(child) {
              (1 === element.nodeType || 11 === element.nodeType) && element.appendChild(child)
            })
          },
          prepend: function(element, node) {
            if (1 === element.nodeType) {
              var index = element.firstChild;
              forEach(new JQLite(node), function(child) {
                element.insertBefore(child, index)
              })
            }
          },
          wrap: function(element, wrapNode) {
            wrapNode = jqLite(wrapNode)[0];
            var parent = element.parentNode;
            parent && parent.replaceChild(wrapNode, element), wrapNode.appendChild(element)
          },
          remove: function(element) {
            jqLiteDealoc(element);
            var parent = element.parentNode;
            parent && parent.removeChild(element)
          },
          after: function(element, newElement) {
            var index = element,
              parent = element.parentNode;
            forEach(new JQLite(newElement), function(node) {
              parent.insertBefore(node, index.nextSibling), index = node
            })
          },
          addClass: jqLiteAddClass,
          removeClass: jqLiteRemoveClass,
          toggleClass: function(element, selector, condition) {
            selector && forEach(selector.split(" "), function(className) {
              var classCondition = condition;
              isUndefined(classCondition) && (classCondition = !jqLiteHasClass(element, className)), (classCondition ? jqLiteAddClass : jqLiteRemoveClass)(element, className)
            })
          },
          parent: function(element) {
            var parent = element.parentNode;
            return parent && 11 !== parent.nodeType ? parent : null
          },
          next: function(element) {
            if (element.nextElementSibling) return element.nextElementSibling;
            for (var elm = element.nextSibling; null != elm && 1 !== elm.nodeType;) elm = elm.nextSibling;
            return elm
          },
          find: function(element, selector) {
            return element.getElementsByTagName ? element.getElementsByTagName(selector) : []
          },
          clone: jqLiteClone,
          triggerHandler: function(element, eventName, eventData) {
            var eventFns = (jqLiteExpandoStore(element, "events") || {})[eventName];
            eventData = eventData || [];
            var event = [{
              preventDefault: noop,
              stopPropagation: noop
            }];
            forEach(eventFns, function(fn) {
              fn.apply(element, event.concat(eventData))
            })
          }
        }, function(fn, name) {
          JQLite.prototype[name] = function(arg1, arg2, arg3) {
            for (var value, i = 0; i < this.length; i++) isUndefined(value) ? (value = fn(this[i], arg1, arg2, arg3), isDefined(value) && (value = jqLite(value))) : jqLiteAddNodes(value, fn(this[i], arg1, arg2, arg3));
            return isDefined(value) ? value : this
          }, JQLite.prototype.bind = JQLite.prototype.on, JQLite.prototype.unbind = JQLite.prototype.off
        }), HashMap.prototype = {
          put: function(key, value) {
            this[hashKey(key)] = value
          },
          get: function(key) {
            return this[hashKey(key)]
          },
          remove: function(key) {
            var value = this[key = hashKey(key)];
            return delete this[key], value
          }
        };
        var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
          FN_ARG_SPLIT = /,/,
          FN_ARG = /^\s*(_?)(\S+?)\1\s*$/,
          STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,
          $injectorMinErr = minErr("$injector"),
          $animateMinErr = minErr("$animate"),
          $AnimateProvider = ["$provide",
            function($provide) {
              this.$$selectors = {}, this.register = function(name, factory) {
                var key = name + "-animation";
                if (name && "." != name.charAt(0)) throw $animateMinErr("notcsel", "Expecting class selector starting with '.' got '{0}'.", name);
                this.$$selectors[name.substr(1)] = key, $provide.factory(key, factory)
              }, this.classNameFilter = function(expression) {
                return 1 === arguments.length && (this.$$classNameFilter = expression instanceof RegExp ? expression : null), this.$$classNameFilter
              }, this.$get = ["$timeout", "$$asyncCallback",
                function($timeout, $$asyncCallback) {
                  function async(fn) {
                    fn && $$asyncCallback(fn)
                  }
                  return {
                    enter: function(element, parent, after, done) {
                      after ? after.after(element) : (parent && parent[0] || (parent = after.parent()), parent.append(element)), async(done)
                    },
                    leave: function(element, done) {
                      element.remove(), async(done)
                    },
                    move: function(element, parent, after, done) {
                      this.enter(element, parent, after, done)
                    },
                    addClass: function(element, className, done) {
                      className = isString(className) ? className : isArray(className) ? className.join(" ") : "", forEach(element, function(element) {
                        jqLiteAddClass(element, className)
                      }), async(done)
                    },
                    removeClass: function(element, className, done) {
                      className = isString(className) ? className : isArray(className) ? className.join(" ") : "", forEach(element, function(element) {
                        jqLiteRemoveClass(element, className)
                      }), async(done)
                    },
                    setClass: function(element, add, remove, done) {
                      forEach(element, function(element) {
                        jqLiteAddClass(element, add), jqLiteRemoveClass(element, remove)
                      }), async(done)
                    },
                    enabled: noop
                  }
                }
              ]
            }
          ],
          $compileMinErr = minErr("$compile");
        $CompileProvider.$inject = ["$provide", "$$sanitizeUriProvider"];
        var PREFIX_REGEXP = /^(x[\:\-_]|data[\:\-_])/i,
          $interpolateMinErr = minErr("$interpolate"),
          PATH_MATCH = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
          DEFAULT_PORTS = {
            http: 80,
            https: 443,
            ftp: 21
          },
          $locationMinErr = minErr("$location");
        LocationHashbangInHtml5Url.prototype = LocationHashbangUrl.prototype = LocationHtml5Url.prototype = {
          $$html5: !1,
          $$replace: !1,
          absUrl: locationGetter("$$absUrl"),
          url: function(url, replace) {
            if (isUndefined(url)) return this.$$url;
            var match = PATH_MATCH.exec(url);
            return match[1] && this.path(decodeURIComponent(match[1])), (match[2] || match[1]) && this.search(match[3] || ""), this.hash(match[5] || "", replace), this
          },
          protocol: locationGetter("$$protocol"),
          host: locationGetter("$$host"),
          port: locationGetter("$$port"),
          path: locationGetterSetter("$$path", function(path) {
            return "/" == path.charAt(0) ? path : "/" + path
          }),
          search: function(search, paramValue) {
            switch (arguments.length) {
              case 0:
                return this.$$search;
              case 1:
                if (isString(search)) this.$$search = parseKeyValue(search);
                else {
                  if (!isObject(search)) throw $locationMinErr("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
                  this.$$search = search
                }
                break;
              default:
                isUndefined(paramValue) || null === paramValue ? delete this.$$search[search] : this.$$search[search] = paramValue
            }
            return this.$$compose(), this
          },
          hash: locationGetterSetter("$$hash", identity),
          replace: function() {
            return this.$$replace = !0, this
          }
        };
        var promiseWarning, $parseMinErr = minErr("$parse"),
          promiseWarningCache = {},
          OPERATORS = {
            "null": function() {
              return null
            },
            "true": function() {
              return !0
            },
            "false": function() {
              return !1
            },
            undefined: noop,
            "+": function(self, locals, a, b) {
              return a = a(self, locals), b = b(self, locals), isDefined(a) ? isDefined(b) ? a + b : a : isDefined(b) ? b : undefined
            },
            "-": function(self, locals, a, b) {
              return a = a(self, locals), b = b(self, locals), (isDefined(a) ? a : 0) - (isDefined(b) ? b : 0)
            },
            "*": function(self, locals, a, b) {
              return a(self, locals) * b(self, locals)
            },
            "/": function(self, locals, a, b) {
              return a(self, locals) / b(self, locals)
            },
            "%": function(self, locals, a, b) {
              return a(self, locals) % b(self, locals)
            },
            "^": function(self, locals, a, b) {
              return a(self, locals) ^ b(self, locals)
            },
            "=": noop,
            "===": function(self, locals, a, b) {
              return a(self, locals) === b(self, locals)
            },
            "!==": function(self, locals, a, b) {
              return a(self, locals) !== b(self, locals)
            },
            "==": function(self, locals, a, b) {
              return a(self, locals) == b(self, locals)
            },
            "!=": function(self, locals, a, b) {
              return a(self, locals) != b(self, locals)
            },
            "<": function(self, locals, a, b) {
              return a(self, locals) < b(self, locals)
            },
            ">": function(self, locals, a, b) {
              return a(self, locals) > b(self, locals)
            },
            "<=": function(self, locals, a, b) {
              return a(self, locals) <= b(self, locals)
            },
            ">=": function(self, locals, a, b) {
              return a(self, locals) >= b(self, locals)
            },
            "&&": function(self, locals, a, b) {
              return a(self, locals) && b(self, locals)
            },
            "||": function(self, locals, a, b) {
              return a(self, locals) || b(self, locals)
            },
            "&": function(self, locals, a, b) {
              return a(self, locals) & b(self, locals)
            },
            "|": function(self, locals, a, b) {
              return b(self, locals)(self, locals, a(self, locals))
            },
            "!": function(self, locals, a) {
              return !a(self, locals)
            }
          },
          ESCAPE = {
            n: "\n",
            f: "\f",
            r: "\r",
            t: "	",
            v: "",
            "'": "'",
            '"': '"'
          },
          Lexer = function(options) {
            this.options = options
          };
        Lexer.prototype = {
          constructor: Lexer,
          lex: function(text) {
            for (this.text = text, this.index = 0, this.ch = undefined, this.lastCh = ":", this.tokens = []; this.index < this.text.length;) {
              if (this.ch = this.text.charAt(this.index), this.is("\"'")) this.readString(this.ch);
              else if (this.isNumber(this.ch) || this.is(".") && this.isNumber(this.peek())) this.readNumber();
              else if (this.isIdent(this.ch)) this.readIdent();
              else if (this.is("(){}[].,;:?")) this.tokens.push({
                index: this.index,
                text: this.ch
              }), this.index++;
              else {
                if (this.isWhitespace(this.ch)) {
                  this.index++;
                  continue
                }
                var ch2 = this.ch + this.peek(),
                  ch3 = ch2 + this.peek(2),
                  fn = OPERATORS[this.ch],
                  fn2 = OPERATORS[ch2],
                  fn3 = OPERATORS[ch3];
                fn3 ? (this.tokens.push({
                  index: this.index,
                  text: ch3,
                  fn: fn3
                }), this.index += 3) : fn2 ? (this.tokens.push({
                  index: this.index,
                  text: ch2,
                  fn: fn2
                }), this.index += 2) : fn ? (this.tokens.push({
                  index: this.index,
                  text: this.ch,
                  fn: fn
                }), this.index += 1) : this.throwError("Unexpected next character ", this.index, this.index + 1)
              }
              this.lastCh = this.ch
            }
            return this.tokens
          },
          is: function(chars) {
            return -1 !== chars.indexOf(this.ch)
          },
          was: function(chars) {
            return -1 !== chars.indexOf(this.lastCh)
          },
          peek: function(i) {
            var num = i || 1;
            return this.index + num < this.text.length ? this.text.charAt(this.index + num) : !1
          },
          isNumber: function(ch) {
            return ch >= "0" && "9" >= ch
          },
          isWhitespace: function(ch) {
            return " " === ch || "\r" === ch || "	" === ch || "\n" === ch || "" === ch || " " === ch
          },
          isIdent: function(ch) {
            return ch >= "a" && "z" >= ch || ch >= "A" && "Z" >= ch || "_" === ch || "$" === ch
          },
          isExpOperator: function(ch) {
            return "-" === ch || "+" === ch || this.isNumber(ch)
          },
          throwError: function(error, start, end) {
            end = end || this.index;
            var colStr = isDefined(start) ? "s " + start + "-" + this.index + " [" + this.text.substring(start, end) + "]" : " " + end;
            throw $parseMinErr("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", error, colStr, this.text)
          },
          readNumber: function() {
            for (var number = "", start = this.index; this.index < this.text.length;) {
              var ch = lowercase(this.text.charAt(this.index));
              if ("." == ch || this.isNumber(ch)) number += ch;
              else {
                var peekCh = this.peek();
                if ("e" == ch && this.isExpOperator(peekCh)) number += ch;
                else if (this.isExpOperator(ch) && peekCh && this.isNumber(peekCh) && "e" == number.charAt(number.length - 1)) number += ch;
                else {
                  if (!this.isExpOperator(ch) || peekCh && this.isNumber(peekCh) || "e" != number.charAt(number.length - 1)) break;
                  this.throwError("Invalid exponent")
                }
              }
              this.index++
            }
            number = 1 * number, this.tokens.push({
              index: start,
              text: number,
              literal: !0,
              constant: !0,
              fn: function() {
                return number
              }
            })
          },
          readIdent: function() {
            for (var lastDot, peekIndex, methodName, ch, parser = this, ident = "", start = this.index; this.index < this.text.length && (ch = this.text.charAt(this.index), "." === ch || this.isIdent(ch) || this.isNumber(ch));) "." === ch && (lastDot = this.index), ident += ch, this.index++;
            if (lastDot)
              for (peekIndex = this.index; peekIndex < this.text.length;) {
                if (ch = this.text.charAt(peekIndex), "(" === ch) {
                  methodName = ident.substr(lastDot - start + 1), ident = ident.substr(0, lastDot - start), this.index = peekIndex;
                  break
                }
                if (!this.isWhitespace(ch)) break;
                peekIndex++
              }
            var token = {
              index: start,
              text: ident
            };
            if (OPERATORS.hasOwnProperty(ident)) token.fn = OPERATORS[ident], token.literal = !0, token.constant = !0;
            else {
              var getter = getterFn(ident, this.options, this.text);
              token.fn = extend(function(self, locals) {
                return getter(self, locals)
              }, {
                assign: function(self, value) {
                  return setter(self, ident, value, parser.text, parser.options)
                }
              })
            }
            this.tokens.push(token), methodName && (this.tokens.push({
              index: lastDot,
              text: "."
            }), this.tokens.push({
              index: lastDot + 1,
              text: methodName
            }))
          },
          readString: function(quote) {
            var start = this.index;
            this.index++;
            for (var string = "", rawString = quote, escape = !1; this.index < this.text.length;) {
              var ch = this.text.charAt(this.index);
              if (rawString += ch, escape) {
                if ("u" === ch) {
                  var hex = this.text.substring(this.index + 1, this.index + 5);
                  hex.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + hex + "]"), this.index += 4, string += String.fromCharCode(parseInt(hex, 16))
                } else {
                  var rep = ESCAPE[ch];
                  string += rep ? rep : ch
                }
                escape = !1
              } else if ("\\" === ch) escape = !0;
              else {
                if (ch === quote) return this.index++, void this.tokens.push({
                  index: start,
                  text: rawString,
                  string: string,
                  literal: !0,
                  constant: !0,
                  fn: function() {
                    return string
                  }
                });
                string += ch
              }
              this.index++
            }
            this.throwError("Unterminated quote", start)
          }
        };
        var Parser = function(lexer, $filter, options) {
          this.lexer = lexer, this.$filter = $filter, this.options = options
        };
        Parser.ZERO = extend(function() {
          return 0
        }, {
          constant: !0
        }), Parser.prototype = {
          constructor: Parser,
          parse: function(text) {
            this.text = text, this.tokens = this.lexer.lex(text);
            var value = this.statements();
            return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), value.literal = !!value.literal, value.constant = !!value.constant, value
          },
          primary: function() {
            var primary;
            if (this.expect("(")) primary = this.filterChain(), this.consume(")");
            else if (this.expect("[")) primary = this.arrayDeclaration();
            else if (this.expect("{")) primary = this.object();
            else {
              var token = this.expect();
              primary = token.fn, primary || this.throwError("not a primary expression", token), primary.literal = !!token.literal, primary.constant = !!token.constant
            }
            for (var next, context; next = this.expect("(", "[", ".");) "(" === next.text ? (primary = this.functionCall(primary, context), context = null) : "[" === next.text ? (context = primary, primary = this.objectIndex(primary)) : "." === next.text ? (context = primary, primary = this.fieldAccess(primary)) : this.throwError("IMPOSSIBLE");
            return primary
          },
          throwError: function(msg, token) {
            throw $parseMinErr("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", token.text, msg, token.index + 1, this.text, this.text.substring(token.index))
          },
          peekToken: function() {
            if (0 === this.tokens.length) throw $parseMinErr("ueoe", "Unexpected end of expression: {0}", this.text);
            return this.tokens[0]
          },
          peek: function(e1, e2, e3, e4) {
            if (this.tokens.length > 0) {
              var token = this.tokens[0],
                t = token.text;
              if (t === e1 || t === e2 || t === e3 || t === e4 || !e1 && !e2 && !e3 && !e4) return token
            }
            return !1
          },
          expect: function(e1, e2, e3, e4) {
            var token = this.peek(e1, e2, e3, e4);
            return token ? (this.tokens.shift(), token) : !1
          },
          consume: function(e1) {
            this.expect(e1) || this.throwError("is unexpected, expecting [" + e1 + "]", this.peek())
          },
          unaryFn: function(fn, right) {
            return extend(function(self, locals) {
              return fn(self, locals, right)
            }, {
              constant: right.constant
            })
          },
          ternaryFn: function(left, middle, right) {
            return extend(function(self, locals) {
              return left(self, locals) ? middle(self, locals) : right(self, locals)
            }, {
              constant: left.constant && middle.constant && right.constant
            })
          },
          binaryFn: function(left, fn, right) {
            return extend(function(self, locals) {
              return fn(self, locals, left, right)
            }, {
              constant: left.constant && right.constant
            })
          },
          statements: function() {
            for (var statements = [];;)
              if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && statements.push(this.filterChain()), !this.expect(";")) return 1 === statements.length ? statements[0] : function(self, locals) {
                for (var value, i = 0; i < statements.length; i++) {
                  var statement = statements[i];
                  statement && (value = statement(self, locals))
                }
                return value
              }
          },
          filterChain: function() {
            for (var token, left = this.expression();;) {
              if (!(token = this.expect("|"))) return left;
              left = this.binaryFn(left, token.fn, this.filter())
            }
          },
          filter: function() {
            for (var token = this.expect(), fn = this.$filter(token.text), argsFn = [];;) {
              if (!(token = this.expect(":"))) {
                var fnInvoke = function(self, locals, input) {
                  for (var args = [input], i = 0; i < argsFn.length; i++) args.push(argsFn[i](self, locals));
                  return fn.apply(self, args)
                };
                return function() {
                  return fnInvoke
                }
              }
              argsFn.push(this.expression())
            }
          },
          expression: function() {
            return this.assignment()
          },
          assignment: function() {
            var right, token, left = this.ternary();
            return (token = this.expect("=")) ? (left.assign || this.throwError("implies assignment but [" + this.text.substring(0, token.index) + "] can not be assigned to", token), right = this.ternary(), function(scope, locals) {
              return left.assign(scope, right(scope, locals), locals)
            }) : left
          },
          ternary: function() {
            var middle, token, left = this.logicalOR();
            return (token = this.expect("?")) ? (middle = this.ternary(), (token = this.expect(":")) ? this.ternaryFn(left, middle, this.ternary()) : void this.throwError("expected :", token)) : left
          },
          logicalOR: function() {
            for (var token, left = this.logicalAND();;) {
              if (!(token = this.expect("||"))) return left;
              left = this.binaryFn(left, token.fn, this.logicalAND())
            }
          },
          logicalAND: function() {
            var token, left = this.equality();
            return (token = this.expect("&&")) && (left = this.binaryFn(left, token.fn, this.logicalAND())), left
          },
          equality: function() {
            var token, left = this.relational();
            return (token = this.expect("==", "!=", "===", "!==")) && (left = this.binaryFn(left, token.fn, this.equality())), left
          },
          relational: function() {
            var token, left = this.additive();
            return (token = this.expect("<", ">", "<=", ">=")) && (left = this.binaryFn(left, token.fn, this.relational())), left
          },
          additive: function() {
            for (var token, left = this.multiplicative(); token = this.expect("+", "-");) left = this.binaryFn(left, token.fn, this.multiplicative());
            return left
          },
          multiplicative: function() {
            for (var token, left = this.unary(); token = this.expect("*", "/", "%");) left = this.binaryFn(left, token.fn, this.unary());
            return left
          },
          unary: function() {
            var token;
            return this.expect("+") ? this.primary() : (token = this.expect("-")) ? this.binaryFn(Parser.ZERO, token.fn, this.unary()) : (token = this.expect("!")) ? this.unaryFn(token.fn, this.unary()) : this.primary()
          },
          fieldAccess: function(object) {
            var parser = this,
              field = this.expect().text,
              getter = getterFn(field, this.options, this.text);
            return extend(function(scope, locals, self) {
              return getter(self || object(scope, locals))
            }, {
              assign: function(scope, value, locals) {
                return setter(object(scope, locals), field, value, parser.text, parser.options)
              }
            })
          },
          objectIndex: function(obj) {
            var parser = this,
              indexFn = this.expression();
            return this.consume("]"), extend(function(self, locals) {
              var v, p, o = obj(self, locals),
                i = indexFn(self, locals);
              return o ? (v = ensureSafeObject(o[i], parser.text), v && v.then && parser.options.unwrapPromises && (p = v, "$$v" in v || (p.$$v = undefined, p.then(function(val) {
                p.$$v = val
              })), v = v.$$v), v) : undefined
            }, {
              assign: function(self, value, locals) {
                var key = indexFn(self, locals),
                  safe = ensureSafeObject(obj(self, locals), parser.text);
                return safe[key] = value
              }
            })
          },
          functionCall: function(fn, contextGetter) {
            var argsFn = [];
            if (")" !== this.peekToken().text)
              do argsFn.push(this.expression()); while (this.expect(","));
            this.consume(")");
            var parser = this;
            return function(scope, locals) {
              for (var args = [], context = contextGetter ? contextGetter(scope, locals) : scope, i = 0; i < argsFn.length; i++) args.push(argsFn[i](scope, locals));
              var fnPtr = fn(scope, locals, context) || noop;
              ensureSafeObject(context, parser.text), ensureSafeObject(fnPtr, parser.text);
              var v = fnPtr.apply ? fnPtr.apply(context, args) : fnPtr(args[0], args[1], args[2], args[3], args[4]);
              return ensureSafeObject(v, parser.text)
            }
          },
          arrayDeclaration: function() {
            var elementFns = [],
              allConstant = !0;
            if ("]" !== this.peekToken().text)
              do {
                if (this.peek("]")) break;
                var elementFn = this.expression();
                elementFns.push(elementFn), elementFn.constant || (allConstant = !1)
              } while (this.expect(","));
            return this.consume("]"), extend(function(self, locals) {
              for (var array = [], i = 0; i < elementFns.length; i++) array.push(elementFns[i](self, locals));
              return array
            }, {
              literal: !0,
              constant: allConstant
            })
          },
          object: function() {
            var keyValues = [],
              allConstant = !0;
            if ("}" !== this.peekToken().text)
              do {
                if (this.peek("}")) break;
                var token = this.expect(),
                  key = token.string || token.text;
                this.consume(":");
                var value = this.expression();
                keyValues.push({
                  key: key,
                  value: value
                }), value.constant || (allConstant = !1)
              } while (this.expect(","));
            return this.consume("}"), extend(function(self, locals) {
              for (var object = {}, i = 0; i < keyValues.length; i++) {
                var keyValue = keyValues[i];
                object[keyValue.key] = keyValue.value(self, locals)
              }
              return object
            }, {
              literal: !0,
              constant: allConstant
            })
          }
        };
        var getterFnCache = {},
          $sceMinErr = minErr("$sce"),
          SCE_CONTEXTS = {
            HTML: "html",
            CSS: "css",
            URL: "url",
            RESOURCE_URL: "resourceUrl",
            JS: "js"
          },
          urlParsingNode = document.createElement("a"),
          originUrl = urlResolve(window.location.href, !0);
        $FilterProvider.$inject = ["$provide"], currencyFilter.$inject = ["$locale"], numberFilter.$inject = ["$locale"];
        var DECIMAL_SEP = ".",
          DATE_FORMATS = {
            yyyy: dateGetter("FullYear", 4),
            yy: dateGetter("FullYear", 2, 0, !0),
            y: dateGetter("FullYear", 1),
            MMMM: dateStrGetter("Month"),
            MMM: dateStrGetter("Month", !0),
            MM: dateGetter("Month", 2, 1),
            M: dateGetter("Month", 1, 1),
            dd: dateGetter("Date", 2),
            d: dateGetter("Date", 1),
            HH: dateGetter("Hours", 2),
            H: dateGetter("Hours", 1),
            hh: dateGetter("Hours", 2, -12),
            h: dateGetter("Hours", 1, -12),
            mm: dateGetter("Minutes", 2),
            m: dateGetter("Minutes", 1),
            ss: dateGetter("Seconds", 2),
            s: dateGetter("Seconds", 1),
            sss: dateGetter("Milliseconds", 3),
            EEEE: dateStrGetter("Day"),
            EEE: dateStrGetter("Day", !0),
            a: ampmGetter,
            Z: timeZoneGetter
          },
          DATE_FORMATS_SPLIT = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,
          NUMBER_STRING = /^\-?\d+$/;
        dateFilter.$inject = ["$locale"];
        var lowercaseFilter = valueFn(lowercase),
          uppercaseFilter = valueFn(uppercase);
        orderByFilter.$inject = ["$parse"];
        var htmlAnchorDirective = valueFn({
            restrict: "E",
            compile: function(element, attr) {
              return 8 >= msie && (attr.href || attr.name || attr.$set("href", ""), element.append(document.createComment("IE fix"))), attr.href || attr.xlinkHref || attr.name ? void 0 : function(scope, element) {
                var href = "[object SVGAnimatedString]" === toString.call(element.prop("href")) ? "xlink:href" : "href";
                element.on("click", function(event) {
                  element.attr(href) || event.preventDefault()
                })
              }
            }
          }),
          ngAttributeAliasDirectives = {};
        forEach(BOOLEAN_ATTR, function(propName, attrName) {
          if ("multiple" != propName) {
            var normalized = directiveNormalize("ng-" + attrName);
            ngAttributeAliasDirectives[normalized] = function() {
              return {
                priority: 100,
                link: function(scope, element, attr) {
                  scope.$watch(attr[normalized], function(value) {
                    attr.$set(attrName, !!value)
                  })
                }
              }
            }
          }
        }), forEach(["src", "srcset", "href"], function(attrName) {
          var normalized = directiveNormalize("ng-" + attrName);
          ngAttributeAliasDirectives[normalized] = function() {
            return {
              priority: 99,
              link: function(scope, element, attr) {
                var propName = attrName,
                  name = attrName;
                "href" === attrName && "[object SVGAnimatedString]" === toString.call(element.prop("href")) && (name = "xlinkHref", attr.$attr[name] = "xlink:href", propName = null), attr.$observe(normalized, function(value) {
                  value && (attr.$set(name, value), msie && propName && element.prop(propName, attr[name]))
                })
              }
            }
          }
        });
        var nullFormCtrl = {
          $addControl: noop,
          $removeControl: noop,
          $setValidity: noop,
          $setDirty: noop,
          $setPristine: noop
        };
        FormController.$inject = ["$element", "$attrs", "$scope", "$animate"];
        var formDirectiveFactory = function(isNgForm) {
            return ["$timeout",
              function($timeout) {
                var formDirective = {
                  name: "form",
                  restrict: isNgForm ? "EAC" : "E",
                  controller: FormController,
                  compile: function() {
                    return {
                      pre: function(scope, formElement, attr, controller) {
                        if (!attr.action) {
                          var preventDefaultListener = function(event) {
                            event.preventDefault ? event.preventDefault() : event.returnValue = !1
                          };
                          addEventListenerFn(formElement[0], "submit", preventDefaultListener), formElement.on("$destroy", function() {
                            $timeout(function() {
                              removeEventListenerFn(formElement[0], "submit", preventDefaultListener)
                            }, 0, !1)
                          })
                        }
                        var parentFormCtrl = formElement.parent().controller("form"),
                          alias = attr.name || attr.ngForm;
                        alias && setter(scope, alias, controller, alias), parentFormCtrl && formElement.on("$destroy", function() {
                          parentFormCtrl.$removeControl(controller), alias && setter(scope, alias, undefined, alias), extend(controller, nullFormCtrl)
                        })
                      }
                    }
                  }
                };
                return formDirective
              }
            ]
          },
          formDirective = formDirectiveFactory(),
          ngFormDirective = formDirectiveFactory(!0),
          URL_REGEXP = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
          EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i,
          NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,
          inputType = {
            text: textInputType,
            number: numberInputType,
            url: urlInputType,
            email: emailInputType,
            radio: radioInputType,
            checkbox: checkboxInputType,
            hidden: noop,
            button: noop,
            submit: noop,
            reset: noop,
            file: noop
          },
          inputDirective = ["$browser", "$sniffer",
            function($browser, $sniffer) {
              return {
                restrict: "E",
                require: "?ngModel",
                link: function(scope, element, attr, ctrl) {
                  ctrl && (inputType[lowercase(attr.type)] || inputType.text)(scope, element, attr, ctrl, $sniffer, $browser)
                }
              }
            }
          ],
          VALID_CLASS = "ng-valid",
          INVALID_CLASS = "ng-invalid",
          PRISTINE_CLASS = "ng-pristine",
          DIRTY_CLASS = "ng-dirty",
          NgModelController = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate",
            function($scope, $exceptionHandler, $attr, $element, $parse, $animate) {
              function toggleValidCss(isValid, validationErrorKey) {
                validationErrorKey = validationErrorKey ? "-" + snake_case(validationErrorKey, "-") : "", $animate.removeClass($element, (isValid ? INVALID_CLASS : VALID_CLASS) + validationErrorKey), $animate.addClass($element, (isValid ? VALID_CLASS : INVALID_CLASS) + validationErrorKey)
              }
              this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$name = $attr.name;
              var ngModelGet = $parse($attr.ngModel),
                ngModelSet = ngModelGet.assign;
              if (!ngModelSet) throw minErr("ngModel")("nonassign", "Expression '{0}' is non-assignable. Element: {1}", $attr.ngModel, startingTag($element));
              this.$render = noop, this.$isEmpty = function(value) {
                return isUndefined(value) || "" === value || null === value || value !== value
              };
              var parentForm = $element.inheritedData("$formController") || nullFormCtrl,
                invalidCount = 0,
                $error = this.$error = {};
              $element.addClass(PRISTINE_CLASS), toggleValidCss(!0), this.$setValidity = function(validationErrorKey, isValid) {
                $error[validationErrorKey] !== !isValid && (isValid ? ($error[validationErrorKey] && invalidCount--, invalidCount || (toggleValidCss(!0), this.$valid = !0, this.$invalid = !1)) : (toggleValidCss(!1), this.$invalid = !0, this.$valid = !1, invalidCount++), $error[validationErrorKey] = !isValid, toggleValidCss(isValid, validationErrorKey), parentForm.$setValidity(validationErrorKey, isValid, this))
              }, this.$setPristine = function() {
                this.$dirty = !1, this.$pristine = !0, $animate.removeClass($element, DIRTY_CLASS), $animate.addClass($element, PRISTINE_CLASS)
              }, this.$setViewValue = function(value) {
                this.$viewValue = value, this.$pristine && (this.$dirty = !0, this.$pristine = !1, $animate.removeClass($element, PRISTINE_CLASS), $animate.addClass($element, DIRTY_CLASS), parentForm.$setDirty()), forEach(this.$parsers, function(fn) {
                  value = fn(value)
                }), this.$modelValue !== value && (this.$modelValue = value, ngModelSet($scope, value), forEach(this.$viewChangeListeners, function(listener) {
                  try {
                    listener()
                  } catch (e) {
                    $exceptionHandler(e)
                  }
                }))
              };
              var ctrl = this;
              $scope.$watch(function() {
                var value = ngModelGet($scope);
                if (ctrl.$modelValue !== value) {
                  var formatters = ctrl.$formatters,
                    idx = formatters.length;
                  for (ctrl.$modelValue = value; idx--;) value = formatters[idx](value);
                  ctrl.$viewValue !== value && (ctrl.$viewValue = value, ctrl.$render())
                }
                return value
              })
            }
          ],
          ngModelDirective = function() {
            return {
              require: ["ngModel", "^?form"],
              controller: NgModelController,
              link: function(scope, element, attr, ctrls) {
                var modelCtrl = ctrls[0],
                  formCtrl = ctrls[1] || nullFormCtrl;
                formCtrl.$addControl(modelCtrl), scope.$on("$destroy", function() {
                  formCtrl.$removeControl(modelCtrl)
                })
              }
            }
          },
          ngChangeDirective = valueFn({
            require: "ngModel",
            link: function(scope, element, attr, ctrl) {
              ctrl.$viewChangeListeners.push(function() {
                scope.$eval(attr.ngChange)
              })
            }
          }),
          requiredDirective = function() {
            return {
              require: "?ngModel",
              link: function(scope, elm, attr, ctrl) {
                if (ctrl) {
                  attr.required = !0;
                  var validator = function(value) {
                    return attr.required && ctrl.$isEmpty(value) ? void ctrl.$setValidity("required", !1) : (ctrl.$setValidity("required", !0), value)
                  };
                  ctrl.$formatters.push(validator), ctrl.$parsers.unshift(validator), attr.$observe("required", function() {
                    validator(ctrl.$viewValue)
                  })
                }
              }
            }
          },
          ngListDirective = function() {
            return {
              require: "ngModel",
              link: function(scope, element, attr, ctrl) {
                var match = /\/(.*)\//.exec(attr.ngList),
                  separator = match && new RegExp(match[1]) || attr.ngList || ",",
                  parse = function(viewValue) {
                    if (!isUndefined(viewValue)) {
                      var list = [];
                      return viewValue && forEach(viewValue.split(separator), function(value) {
                        value && list.push(trim(value))
                      }), list
                    }
                  };
                ctrl.$parsers.push(parse), ctrl.$formatters.push(function(value) {
                  return isArray(value) ? value.join(", ") : undefined
                }), ctrl.$isEmpty = function(value) {
                  return !value || !value.length
                }
              }
            }
          },
          CONSTANT_VALUE_REGEXP = /^(true|false|\d+)$/,
          ngValueDirective = function() {
            return {
              priority: 100,
              compile: function(tpl, tplAttr) {
                return CONSTANT_VALUE_REGEXP.test(tplAttr.ngValue) ? function(scope, elm, attr) {
                  attr.$set("value", scope.$eval(attr.ngValue))
                } : function(scope, elm, attr) {
                  scope.$watch(attr.ngValue, function(value) {
                    attr.$set("value", value)
                  })
                }
              }
            }
          },
          ngBindDirective = ngDirective(function(scope, element, attr) {
            element.addClass("ng-binding").data("$binding", attr.ngBind), scope.$watch(attr.ngBind, function(value) {
              element.text(value == undefined ? "" : value)
            })
          }),
          ngBindTemplateDirective = ["$interpolate",
            function($interpolate) {
              return function(scope, element, attr) {
                var interpolateFn = $interpolate(element.attr(attr.$attr.ngBindTemplate));
                element.addClass("ng-binding").data("$binding", interpolateFn), attr.$observe("ngBindTemplate", function(value) {
                  element.text(value)
                })
              }
            }
          ],
          ngBindHtmlDirective = ["$sce", "$parse",
            function($sce, $parse) {
              return function(scope, element, attr) {
                function getStringValue() {
                  return (parsed(scope) || "").toString()
                }
                element.addClass("ng-binding").data("$binding", attr.ngBindHtml);
                var parsed = $parse(attr.ngBindHtml);
                scope.$watch(getStringValue, function() {
                  element.html($sce.getTrustedHtml(parsed(scope)) || "")
                })
              }
            }
          ],
          ngClassDirective = classDirective("", !0),
          ngClassOddDirective = classDirective("Odd", 0),
          ngClassEvenDirective = classDirective("Even", 1),
          ngCloakDirective = ngDirective({
            compile: function(element, attr) {
              attr.$set("ngCloak", undefined), element.removeClass("ng-cloak")
            }
          }),
          ngControllerDirective = [
            function() {
              return {
                scope: !0,
                controller: "@",
                priority: 500
              }
            }
          ],
          ngEventDirectives = {};
        forEach("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(name) {
          var directiveName = directiveNormalize("ng-" + name);
          ngEventDirectives[directiveName] = ["$parse",
            function($parse) {
              return {
                compile: function($element, attr) {
                  var fn = $parse(attr[directiveName]);
                  return function(scope, element) {
                    element.on(lowercase(name), function(event) {
                      scope.$apply(function() {
                        fn(scope, {
                          $event: event
                        })
                      })
                    })
                  }
                }
              }
            }
          ]
        });
        var ngIfDirective = ["$animate",
            function($animate) {
              return {
                transclude: "element",
                priority: 600,
                terminal: !0,
                restrict: "A",
                $$tlb: !0,
                link: function($scope, $element, $attr, ctrl, $transclude) {
                  var block, childScope, previousElements;
                  $scope.$watch($attr.ngIf, function(value) {
                    toBoolean(value) ? childScope || (childScope = $scope.$new(), $transclude(childScope, function(clone) {
                      clone[clone.length++] = document.createComment(" end ngIf: " + $attr.ngIf + " "), block = {
                        clone: clone
                      }, $animate.enter(clone, $element.parent(), $element)
                    })) : (previousElements && (previousElements.remove(), previousElements = null), childScope && (childScope.$destroy(), childScope = null), block && (previousElements = getBlockElements(block.clone), $animate.leave(previousElements, function() {
                      previousElements = null
                    }), block = null))
                  })
                }
              }
            }
          ],
          ngIncludeDirective = ["$http", "$templateCache", "$anchorScroll", "$animate", "$sce",
            function($http, $templateCache, $anchorScroll, $animate, $sce) {
              return {
                restrict: "ECA",
                priority: 400,
                terminal: !0,
                transclude: "element",
                controller: angular.noop,
                compile: function(element, attr) {
                  var srcExp = attr.ngInclude || attr.src,
                    onloadExp = attr.onload || "",
                    autoScrollExp = attr.autoscroll;
                  return function(scope, $element, $attr, ctrl, $transclude) {
                    var currentScope, previousElement, currentElement, changeCounter = 0,
                      cleanupLastIncludeContent = function() {
                        previousElement && (previousElement.remove(), previousElement = null), currentScope && (currentScope.$destroy(), currentScope = null), currentElement && ($animate.leave(currentElement, function() {
                          previousElement = null
                        }), previousElement = currentElement, currentElement = null)
                      };
                    scope.$watch($sce.parseAsResourceUrl(srcExp), function(src) {
                      var afterAnimation = function() {
                          !isDefined(autoScrollExp) || autoScrollExp && !scope.$eval(autoScrollExp) || $anchorScroll()
                        },
                        thisChangeId = ++changeCounter;
                      src ? ($http.get(src, {
                        cache: $templateCache
                      }).success(function(response) {
                        if (thisChangeId === changeCounter) {
                          var newScope = scope.$new();
                          ctrl.template = response;
                          var clone = $transclude(newScope, function(clone) {
                            cleanupLastIncludeContent(), $animate.enter(clone, null, $element, afterAnimation)
                          });
                          currentScope = newScope, currentElement = clone, currentScope.$emit("$includeContentLoaded"), scope.$eval(onloadExp)
                        }
                      }).error(function() {
                        thisChangeId === changeCounter && cleanupLastIncludeContent()
                      }), scope.$emit("$includeContentRequested")) : (cleanupLastIncludeContent(), ctrl.template = null)
                    })
                  }
                }
              }
            }
          ],
          ngIncludeFillContentDirective = ["$compile",
            function($compile) {
              return {
                restrict: "ECA",
                priority: -400,
                require: "ngInclude",
                link: function(scope, $element, $attr, ctrl) {
                  $element.html(ctrl.template), $compile($element.contents())(scope)
                }
              }
            }
          ],
          ngInitDirective = ngDirective({
            priority: 450,
            compile: function() {
              return {
                pre: function(scope, element, attrs) {
                  scope.$eval(attrs.ngInit)
                }
              }
            }
          }),
          ngNonBindableDirective = ngDirective({
            terminal: !0,
            priority: 1e3
          }),
          ngPluralizeDirective = ["$locale", "$interpolate",
            function($locale, $interpolate) {
              var BRACE = /{}/g;
              return {
                restrict: "EA",
                link: function(scope, element, attr) {
                  var numberExp = attr.count,
                    whenExp = attr.$attr.when && element.attr(attr.$attr.when),
                    offset = attr.offset || 0,
                    whens = scope.$eval(whenExp) || {},
                    whensExpFns = {},
                    startSymbol = $interpolate.startSymbol(),
                    endSymbol = $interpolate.endSymbol(),
                    isWhen = /^when(Minus)?(.+)$/;
                  forEach(attr, function(expression, attributeName) {
                    isWhen.test(attributeName) && (whens[lowercase(attributeName.replace("when", "").replace("Minus", "-"))] = element.attr(attr.$attr[attributeName]))
                  }), forEach(whens, function(expression, key) {
                    whensExpFns[key] = $interpolate(expression.replace(BRACE, startSymbol + numberExp + "-" + offset + endSymbol))
                  }), scope.$watch(function() {
                    var value = parseFloat(scope.$eval(numberExp));
                    return isNaN(value) ? "" : (value in whens || (value = $locale.pluralCat(value - offset)), whensExpFns[value](scope, element, !0))
                  }, function(newVal) {
                    element.text(newVal)
                  })
                }
              }
            }
          ],
          ngRepeatDirective = ["$parse", "$animate",
            function($parse, $animate) {
              function getBlockStart(block) {
                return block.clone[0]
              }

              function getBlockEnd(block) {
                return block.clone[block.clone.length - 1]
              }
              var NG_REMOVED = "$$NG_REMOVED",
                ngRepeatMinErr = minErr("ngRepeat");
              return {
                transclude: "element",
                priority: 1e3,
                terminal: !0,
                $$tlb: !0,
                link: function($scope, $element, $attr, ctrl, $transclude) {
                  var trackByExp, trackByExpGetter, trackByIdExpFn, trackByIdArrayFn, trackByIdObjFn, lhs, rhs, valueIdentifier, keyIdentifier, expression = $attr.ngRepeat,
                    match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),
                    hashFnLocals = {
                      $id: hashKey
                    };
                  if (!match) throw ngRepeatMinErr("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", expression);
                  if (lhs = match[1], rhs = match[2], trackByExp = match[3], trackByExp ? (trackByExpGetter = $parse(trackByExp), trackByIdExpFn = function(key, value, index) {
                    return keyIdentifier && (hashFnLocals[keyIdentifier] = key), hashFnLocals[valueIdentifier] = value, hashFnLocals.$index = index, trackByExpGetter($scope, hashFnLocals)
                  }) : (trackByIdArrayFn = function(key, value) {
                    return hashKey(value)
                  }, trackByIdObjFn = function(key) {
                    return key
                  }), match = lhs.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/), !match) throw ngRepeatMinErr("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", lhs);
                  valueIdentifier = match[3] || match[1], keyIdentifier = match[2];
                  var lastBlockMap = {};
                  $scope.$watchCollection(rhs, function(collection) {
                    var index, length, nextNode, arrayLength, childScope, key, value, trackById, trackByIdFn, collectionKeys, block, elementsToRemove, previousNode = $element[0],
                      nextBlockMap = {},
                      nextBlockOrder = [];
                    if (isArrayLike(collection)) collectionKeys = collection, trackByIdFn = trackByIdExpFn || trackByIdArrayFn;
                    else {
                      trackByIdFn = trackByIdExpFn || trackByIdObjFn, collectionKeys = [];
                      for (key in collection) collection.hasOwnProperty(key) && "$" != key.charAt(0) && collectionKeys.push(key);
                      collectionKeys.sort()
                    }
                    for (arrayLength = collectionKeys.length, length = nextBlockOrder.length = collectionKeys.length, index = 0; length > index; index++)
                      if (key = collection === collectionKeys ? index : collectionKeys[index], value = collection[key], trackById = trackByIdFn(key, value, index), assertNotHasOwnProperty(trackById, "`track by` id"), lastBlockMap.hasOwnProperty(trackById)) block = lastBlockMap[trackById], delete lastBlockMap[trackById], nextBlockMap[trackById] = block, nextBlockOrder[index] = block;
                      else {
                        if (nextBlockMap.hasOwnProperty(trackById)) throw forEach(nextBlockOrder, function(block) {
                          block && block.scope && (lastBlockMap[block.id] = block)
                        }), ngRepeatMinErr("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}", expression, trackById);
                        nextBlockOrder[index] = {
                          id: trackById
                        }, nextBlockMap[trackById] = !1
                      }
                    for (key in lastBlockMap) lastBlockMap.hasOwnProperty(key) && (block = lastBlockMap[key], elementsToRemove = getBlockElements(block.clone), $animate.leave(elementsToRemove), forEach(elementsToRemove, function(element) {
                      element[NG_REMOVED] = !0
                    }), block.scope.$destroy());
                    for (index = 0, length = collectionKeys.length; length > index; index++) {
                      if (key = collection === collectionKeys ? index : collectionKeys[index], value = collection[key], block = nextBlockOrder[index], nextBlockOrder[index - 1] && (previousNode = getBlockEnd(nextBlockOrder[index - 1])), block.scope) {
                        childScope = block.scope, nextNode = previousNode;
                        do nextNode = nextNode.nextSibling; while (nextNode && nextNode[NG_REMOVED]);
                        getBlockStart(block) != nextNode && $animate.move(getBlockElements(block.clone), null, jqLite(previousNode)), previousNode = getBlockEnd(block)
                      } else childScope = $scope.$new();
                      childScope[valueIdentifier] = value, keyIdentifier && (childScope[keyIdentifier] = key), childScope.$index = index, childScope.$first = 0 === index, childScope.$last = index === arrayLength - 1, childScope.$middle = !(childScope.$first || childScope.$last), childScope.$odd = !(childScope.$even = 0 === (1 & index)), block.scope || $transclude(childScope, function(clone) {
                        clone[clone.length++] = document.createComment(" end ngRepeat: " + expression + " "), $animate.enter(clone, null, jqLite(previousNode)), previousNode = clone, block.scope = childScope, block.clone = clone, nextBlockMap[block.id] = block
                      })
                    }
                    lastBlockMap = nextBlockMap
                  })
                }
              }
            }
          ],
          ngShowDirective = ["$animate",
            function($animate) {
              return function(scope, element, attr) {
                scope.$watch(attr.ngShow, function(value) {
                  $animate[toBoolean(value) ? "removeClass" : "addClass"](element, "ng-hide")
                })
              }
            }
          ],
          ngHideDirective = ["$animate",
            function($animate) {
              return function(scope, element, attr) {
                scope.$watch(attr.ngHide, function(value) {
                  $animate[toBoolean(value) ? "addClass" : "removeClass"](element, "ng-hide")
                })
              }
            }
          ],
          ngStyleDirective = ngDirective(function(scope, element, attr) {
            scope.$watch(attr.ngStyle, function(newStyles, oldStyles) {
              oldStyles && newStyles !== oldStyles && forEach(oldStyles, function(val, style) {
                element.css(style, "")
              }), newStyles && element.css(newStyles)
            }, !0)
          }),
          ngSwitchDirective = ["$animate",
            function($animate) {
              return {
                restrict: "EA",
                require: "ngSwitch",
                controller: ["$scope",
                  function() {
                    this.cases = {}
                  }
                ],
                link: function(scope, element, attr, ngSwitchController) {
                  var watchExpr = attr.ngSwitch || attr.on,
                    selectedTranscludes = [],
                    selectedElements = [],
                    previousElements = [],
                    selectedScopes = [];
                  scope.$watch(watchExpr, function(value) {
                    var i, ii;
                    for (i = 0, ii = previousElements.length; ii > i; ++i) previousElements[i].remove();
                    for (previousElements.length = 0, i = 0, ii = selectedScopes.length; ii > i; ++i) {
                      var selected = selectedElements[i];
                      selectedScopes[i].$destroy(), previousElements[i] = selected, $animate.leave(selected, function() {
                        previousElements.splice(i, 1)
                      })
                    }
                    selectedElements.length = 0, selectedScopes.length = 0, (selectedTranscludes = ngSwitchController.cases["!" + value] || ngSwitchController.cases["?"]) && (scope.$eval(attr.change), forEach(selectedTranscludes, function(selectedTransclude) {
                      var selectedScope = scope.$new();
                      selectedScopes.push(selectedScope), selectedTransclude.transclude(selectedScope, function(caseElement) {
                        var anchor = selectedTransclude.element;
                        selectedElements.push(caseElement), $animate.enter(caseElement, anchor.parent(), anchor)
                      })
                    }))
                  })
                }
              }
            }
          ],
          ngSwitchWhenDirective = ngDirective({
            transclude: "element",
            priority: 800,
            require: "^ngSwitch",
            link: function(scope, element, attrs, ctrl, $transclude) {
              ctrl.cases["!" + attrs.ngSwitchWhen] = ctrl.cases["!" + attrs.ngSwitchWhen] || [], ctrl.cases["!" + attrs.ngSwitchWhen].push({
                transclude: $transclude,
                element: element
              })
            }
          }),
          ngSwitchDefaultDirective = ngDirective({
            transclude: "element",
            priority: 800,
            require: "^ngSwitch",
            link: function(scope, element, attr, ctrl, $transclude) {
              ctrl.cases["?"] = ctrl.cases["?"] || [], ctrl.cases["?"].push({
                transclude: $transclude,
                element: element
              })
            }
          }),
          ngTranscludeDirective = ngDirective({
            link: function($scope, $element, $attrs, controller, $transclude) {
              if (!$transclude) throw minErr("ngTransclude")("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", startingTag($element));
              $transclude(function(clone) {
                $element.empty(), $element.append(clone)
              })
            }
          }),
          scriptDirective = ["$templateCache",
            function($templateCache) {
              return {
                restrict: "E",
                terminal: !0,
                compile: function(element, attr) {
                  if ("text/ng-template" == attr.type) {
                    var templateUrl = attr.id,
                      text = element[0].text;
                    $templateCache.put(templateUrl, text)
                  }
                }
              }
            }
          ],
          ngOptionsMinErr = minErr("ngOptions"),
          ngOptionsDirective = valueFn({
            terminal: !0
          }),
          selectDirective = ["$compile", "$parse",
            function($compile, $parse) {
              var NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
                nullModelCtrl = {
                  $setViewValue: noop
                };
              return {
                restrict: "E",
                require: ["select", "?ngModel"],
                controller: ["$element", "$scope", "$attrs",
                  function($element, $scope, $attrs) {
                    var nullOption, unknownOption, self = this,
                      optionsMap = {},
                      ngModelCtrl = nullModelCtrl;
                    self.databound = $attrs.ngModel, self.init = function(ngModelCtrl_, nullOption_, unknownOption_) {
                      ngModelCtrl = ngModelCtrl_, nullOption = nullOption_, unknownOption = unknownOption_
                    }, self.addOption = function(value) {
                      assertNotHasOwnProperty(value, '"option value"'), optionsMap[value] = !0, ngModelCtrl.$viewValue == value && ($element.val(value), unknownOption.parent() && unknownOption.remove())
                    }, self.removeOption = function(value) {
                      this.hasOption(value) && (delete optionsMap[value], ngModelCtrl.$viewValue == value && this.renderUnknownOption(value))
                    }, self.renderUnknownOption = function(val) {
                      var unknownVal = "? " + hashKey(val) + " ?";
                      unknownOption.val(unknownVal), $element.prepend(unknownOption), $element.val(unknownVal), unknownOption.prop("selected", !0)
                    }, self.hasOption = function(value) {
                      return optionsMap.hasOwnProperty(value)
                    }, $scope.$on("$destroy", function() {
                      self.renderUnknownOption = noop
                    })
                  }
                ],
                link: function(scope, element, attr, ctrls) {
                  function setupAsSingle(scope, selectElement, ngModelCtrl, selectCtrl) {
                    ngModelCtrl.$render = function() {
                      var viewValue = ngModelCtrl.$viewValue;
                      selectCtrl.hasOption(viewValue) ? (unknownOption.parent() && unknownOption.remove(), selectElement.val(viewValue), "" === viewValue && emptyOption.prop("selected", !0)) : isUndefined(viewValue) && emptyOption ? selectElement.val("") : selectCtrl.renderUnknownOption(viewValue)
                    }, selectElement.on("change", function() {
                      scope.$apply(function() {
                        unknownOption.parent() && unknownOption.remove(), ngModelCtrl.$setViewValue(selectElement.val())
                      })
                    })
                  }

                  function setupAsMultiple(scope, selectElement, ctrl) {
                    var lastView;
                    ctrl.$render = function() {
                      var items = new HashMap(ctrl.$viewValue);
                      forEach(selectElement.find("option"), function(option) {
                        option.selected = isDefined(items.get(option.value))
                      })
                    }, scope.$watch(function() {
                      equals(lastView, ctrl.$viewValue) || (lastView = shallowCopy(ctrl.$viewValue), ctrl.$render())
                    }), selectElement.on("change", function() {
                      scope.$apply(function() {
                        var array = [];
                        forEach(selectElement.find("option"), function(option) {
                          option.selected && array.push(option.value)
                        }), ctrl.$setViewValue(array)
                      })
                    })
                  }

                  function setupAsOptions(scope, selectElement, ctrl) {
                    function render() {
                      var optionGroupName, optionGroup, option, existingParent, existingOptions, existingOption, key, groupLength, length, groupIndex, index, selected, lastElement, element, label, optionGroups = {
                          "": []
                        },
                        optionGroupNames = [""],
                        modelValue = ctrl.$modelValue,
                        values = valuesFn(scope) || [],
                        keys = keyName ? sortedKeys(values) : values,
                        locals = {},
                        selectedSet = !1;
                      if (multiple)
                        if (trackFn && isArray(modelValue)) {
                          selectedSet = new HashMap([]);
                          for (var trackIndex = 0; trackIndex < modelValue.length; trackIndex++) locals[valueName] = modelValue[trackIndex], selectedSet.put(trackFn(scope, locals), modelValue[trackIndex])
                        } else selectedSet = new HashMap(modelValue);
                      for (index = 0; length = keys.length, length > index; index++) {
                        if (key = index, keyName) {
                          if (key = keys[index], "$" === key.charAt(0)) continue;
                          locals[keyName] = key
                        }
                        if (locals[valueName] = values[key], optionGroupName = groupByFn(scope, locals) || "", (optionGroup = optionGroups[optionGroupName]) || (optionGroup = optionGroups[optionGroupName] = [], optionGroupNames.push(optionGroupName)), multiple) selected = isDefined(selectedSet.remove(trackFn ? trackFn(scope, locals) : valueFn(scope, locals)));
                        else {
                          if (trackFn) {
                            var modelCast = {};
                            modelCast[valueName] = modelValue, selected = trackFn(scope, modelCast) === trackFn(scope, locals)
                          } else selected = modelValue === valueFn(scope, locals);
                          selectedSet = selectedSet || selected
                        }
                        label = displayFn(scope, locals), label = isDefined(label) ? label : "", optionGroup.push({
                          id: trackFn ? trackFn(scope, locals) : keyName ? keys[index] : index,
                          label: label,
                          selected: selected
                        })
                      }
                      for (multiple || (nullOption || null === modelValue ? optionGroups[""].unshift({
                        id: "",
                        label: "",
                        selected: !selectedSet
                      }) : selectedSet || optionGroups[""].unshift({
                        id: "?",
                        label: "",
                        selected: !0
                      })), groupIndex = 0, groupLength = optionGroupNames.length; groupLength > groupIndex; groupIndex++) {
                        for (optionGroupName = optionGroupNames[groupIndex], optionGroup = optionGroups[optionGroupName], optionGroupsCache.length <= groupIndex ? (existingParent = {
                          element: optGroupTemplate.clone().attr("label", optionGroupName),
                          label: optionGroup.label
                        }, existingOptions = [existingParent], optionGroupsCache.push(existingOptions), selectElement.append(existingParent.element)) : (existingOptions = optionGroupsCache[groupIndex], existingParent = existingOptions[0], existingParent.label != optionGroupName && existingParent.element.attr("label", existingParent.label = optionGroupName)), lastElement = null, index = 0, length = optionGroup.length; length > index; index++) option = optionGroup[index], (existingOption = existingOptions[index + 1]) ? (lastElement = existingOption.element, existingOption.label !== option.label && lastElement.text(existingOption.label = option.label), existingOption.id !== option.id && lastElement.val(existingOption.id = option.id), existingOption.selected !== option.selected && lastElement.prop("selected", existingOption.selected = option.selected)) : ("" === option.id && nullOption ? element = nullOption : (element = optionTemplate.clone()).val(option.id).attr("selected", option.selected).text(option.label), existingOptions.push(existingOption = {
                          element: element,
                          label: option.label,
                          id: option.id,
                          selected: option.selected
                        }), lastElement ? lastElement.after(element) : existingParent.element.append(element), lastElement = element);
                        for (index++; existingOptions.length > index;) existingOptions.pop().element.remove()
                      }
                      for (; optionGroupsCache.length > groupIndex;) optionGroupsCache.pop()[0].element.remove()
                    }
                    var match;
                    if (!(match = optionsExp.match(NG_OPTIONS_REGEXP))) throw ngOptionsMinErr("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", optionsExp, startingTag(selectElement));
                    var displayFn = $parse(match[2] || match[1]),
                      valueName = match[4] || match[6],
                      keyName = match[5],
                      groupByFn = $parse(match[3] || ""),
                      valueFn = $parse(match[2] ? match[1] : valueName),
                      valuesFn = $parse(match[7]),
                      track = match[8],
                      trackFn = track ? $parse(match[8]) : null,
                      optionGroupsCache = [
                        [{
                          element: selectElement,
                          label: ""
                        }]
                      ];
                    nullOption && ($compile(nullOption)(scope), nullOption.removeClass("ng-scope"), nullOption.remove()), selectElement.empty(), selectElement.on("change", function() {
                      scope.$apply(function() {
                        var optionGroup, key, value, optionElement, index, groupIndex, length, groupLength, trackIndex, collection = valuesFn(scope) || [],
                          locals = {};
                        if (multiple) {
                          for (value = [], groupIndex = 0, groupLength = optionGroupsCache.length; groupLength > groupIndex; groupIndex++)
                            for (optionGroup = optionGroupsCache[groupIndex], index = 1, length = optionGroup.length; length > index; index++)
                              if ((optionElement = optionGroup[index].element)[0].selected) {
                                if (key = optionElement.val(), keyName && (locals[keyName] = key), trackFn)
                                  for (trackIndex = 0; trackIndex < collection.length && (locals[valueName] = collection[trackIndex], trackFn(scope, locals) != key); trackIndex++);
                                else locals[valueName] = collection[key];
                                value.push(valueFn(scope, locals))
                              }
                        } else {
                          if (key = selectElement.val(), "?" == key) value = undefined;
                          else if ("" === key) value = null;
                          else if (trackFn) {
                            for (trackIndex = 0; trackIndex < collection.length; trackIndex++)
                              if (locals[valueName] = collection[trackIndex], trackFn(scope, locals) == key) {
                                value = valueFn(scope, locals);
                                break
                              }
                          } else locals[valueName] = collection[key], keyName && (locals[keyName] = key), value = valueFn(scope, locals);
                          optionGroupsCache[0].length > 1 && optionGroupsCache[0][1].id !== key && (optionGroupsCache[0][1].selected = !1)
                        }
                        ctrl.$setViewValue(value)
                      })
                    }), ctrl.$render = render, scope.$watch(render)
                  }
                  if (ctrls[1]) {
                    for (var emptyOption, selectCtrl = ctrls[0], ngModelCtrl = ctrls[1], multiple = attr.multiple, optionsExp = attr.ngOptions, nullOption = !1, optionTemplate = jqLite(document.createElement("option")), optGroupTemplate = jqLite(document.createElement("optgroup")), unknownOption = optionTemplate.clone(), i = 0, children = element.children(), ii = children.length; ii > i; i++)
                      if ("" === children[i].value) {
                        emptyOption = nullOption = children.eq(i);
                        break
                      }
                    selectCtrl.init(ngModelCtrl, nullOption, unknownOption), multiple && (ngModelCtrl.$isEmpty = function(value) {
                      return !value || 0 === value.length
                    }), optionsExp ? setupAsOptions(scope, element, ngModelCtrl) : multiple ? setupAsMultiple(scope, element, ngModelCtrl) : setupAsSingle(scope, element, ngModelCtrl, selectCtrl)
                  }
                }
              }
            }
          ],
          optionDirective = ["$interpolate",
            function($interpolate) {
              var nullSelectCtrl = {
                addOption: noop,
                removeOption: noop
              };
              return {
                restrict: "E",
                priority: 100,
                compile: function(element, attr) {
                  if (isUndefined(attr.value)) {
                    var interpolateFn = $interpolate(element.text(), !0);
                    interpolateFn || attr.$set("value", element.text())
                  }
                  return function(scope, element, attr) {
                    var selectCtrlName = "$selectController",
                      parent = element.parent(),
                      selectCtrl = parent.data(selectCtrlName) || parent.parent().data(selectCtrlName);
                    selectCtrl && selectCtrl.databound ? element.prop("selected", !1) : selectCtrl = nullSelectCtrl, interpolateFn ? scope.$watch(interpolateFn, function(newVal, oldVal) {
                      attr.$set("value", newVal), newVal !== oldVal && selectCtrl.removeOption(oldVal), selectCtrl.addOption(newVal)
                    }) : selectCtrl.addOption(attr.value), element.on("$destroy", function() {
                      selectCtrl.removeOption(attr.value)
                    })
                  }
                }
              }
            }
          ],
          styleDirective = valueFn({
            restrict: "E",
            terminal: !0
          });
        return window.angular.bootstrap ? void console.log("WARNING: Tried to load angular more than once.") : (bindJQuery(), publishExternalAPI(angular), void jqLite(document).ready(function() {
          angularInit(document, bootstrap)
        }))
      }(window, document), !window.angular.$$csp() && window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}</style>')
    }, {}
  ],
  12: [
    function() {}, {}
  ],
  backbone: [
    function(require, module) {
      module.exports = require("pHOy1N")
    }, {}
  ],
  pHOy1N: [
    function(require, module) {
      (function(global) {
        (function(module, exports, define, browserify_shim__define__module__export__) {
          global.$ = require("jquery"),
          function() {
            var Backbone, root = this,
              previousBackbone = root.Backbone,
              array = [],
              push = array.push,
              slice = array.slice,
              splice = array.splice;
            Backbone = "undefined" != typeof exports ? exports : root.Backbone = {}, Backbone.VERSION = "1.0.0";
            var _ = root._;
            _ || "undefined" == typeof require || (_ = require("underscore")), Backbone.$ = root.jQuery || root.Zepto || root.ender || root.$, Backbone.noConflict = function() {
              return root.Backbone = previousBackbone, this
            }, Backbone.emulateHTTP = !1, Backbone.emulateJSON = !1;
            var Events = Backbone.Events = {
                on: function(name, callback, context) {
                  if (!eventsApi(this, "on", name, [callback, context]) || !callback) return this;
                  this._events || (this._events = {});
                  var events = this._events[name] || (this._events[name] = []);
                  return events.push({
                    callback: callback,
                    context: context,
                    ctx: context || this
                  }), this
                },
                once: function(name, callback, context) {
                  if (!eventsApi(this, "once", name, [callback, context]) || !callback) return this;
                  var self = this,
                    once = _.once(function() {
                      self.off(name, once), callback.apply(this, arguments)
                    });
                  return once._callback = callback, this.on(name, once, context)
                },
                off: function(name, callback, context) {
                  var retain, ev, events, names, i, l, j, k;
                  if (!this._events || !eventsApi(this, "off", name, [callback, context])) return this;
                  if (!name && !callback && !context) return this._events = {}, this;
                  for (names = name ? [name] : _.keys(this._events), i = 0, l = names.length; l > i; i++)
                    if (name = names[i], events = this._events[name]) {
                      if (this._events[name] = retain = [], callback || context)
                        for (j = 0, k = events.length; k > j; j++) ev = events[j], (callback && callback !== ev.callback && callback !== ev.callback._callback || context && context !== ev.context) && retain.push(ev);
                      retain.length || delete this._events[name]
                    }
                  return this
                },
                trigger: function(name) {
                  if (!this._events) return this;
                  var args = slice.call(arguments, 1);
                  if (!eventsApi(this, "trigger", name, args)) return this;
                  var events = this._events[name],
                    allEvents = this._events.all;
                  return events && triggerEvents(events, args), allEvents && triggerEvents(allEvents, arguments), this
                },
                stopListening: function(obj, name, callback) {
                  var listeners = this._listeners;
                  if (!listeners) return this;
                  var deleteListener = !name && !callback;
                  "object" == typeof name && (callback = this), obj && ((listeners = {})[obj._listenerId] = obj);
                  for (var id in listeners) listeners[id].off(name, callback, this), deleteListener && delete this._listeners[id];
                  return this
                }
              },
              eventSplitter = /\s+/,
              eventsApi = function(obj, action, name, rest) {
                if (!name) return !0;
                if ("object" == typeof name) {
                  for (var key in name) obj[action].apply(obj, [key, name[key]].concat(rest));
                  return !1
                }
                if (eventSplitter.test(name)) {
                  for (var names = name.split(eventSplitter), i = 0, l = names.length; l > i; i++) obj[action].apply(obj, [names[i]].concat(rest));
                  return !1
                }
                return !0
              },
              triggerEvents = function(events, args) {
                var ev, i = -1,
                  l = events.length,
                  a1 = args[0],
                  a2 = args[1],
                  a3 = args[2];
                switch (args.length) {
                  case 0:
                    for (; ++i < l;)(ev = events[i]).callback.call(ev.ctx);
                    return;
                  case 1:
                    for (; ++i < l;)(ev = events[i]).callback.call(ev.ctx, a1);
                    return;
                  case 2:
                    for (; ++i < l;)(ev = events[i]).callback.call(ev.ctx, a1, a2);
                    return;
                  case 3:
                    for (; ++i < l;)(ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
                    return;
                  default:
                    for (; ++i < l;)(ev = events[i]).callback.apply(ev.ctx, args)
                }
              },
              listenMethods = {
                listenTo: "on",
                listenToOnce: "once"
              };
            _.each(listenMethods, function(implementation, method) {
              Events[method] = function(obj, name, callback) {
                var listeners = this._listeners || (this._listeners = {}),
                  id = obj._listenerId || (obj._listenerId = _.uniqueId("l"));
                return listeners[id] = obj, "object" == typeof name && (callback = this), obj[implementation](name, callback, this), this
              }
            }), Events.bind = Events.on, Events.unbind = Events.off, _.extend(Backbone, Events);
            var Model = Backbone.Model = function(attributes, options) {
                var defaults, attrs = attributes || {};
                options || (options = {}), this.cid = _.uniqueId("c"), this.attributes = {}, _.extend(this, _.pick(options, modelOptions)), options.parse && (attrs = this.parse(attrs, options) || {}), (defaults = _.result(this, "defaults")) && (attrs = _.defaults({}, attrs, defaults)), this.set(attrs, options), this.changed = {}, this.initialize.apply(this, arguments)
              },
              modelOptions = ["url", "urlRoot", "collection"];
            _.extend(Model.prototype, Events, {
              changed: null,
              validationError: null,
              idAttribute: "id",
              initialize: function() {},
              toJSON: function() {
                return _.clone(this.attributes)
              },
              sync: function() {
                return Backbone.sync.apply(this, arguments)
              },
              get: function(attr) {
                return this.attributes[attr]
              },
              escape: function(attr) {
                return _.escape(this.get(attr))
              },
              has: function(attr) {
                return null != this.get(attr)
              },
              set: function(key, val, options) {
                var attr, attrs, unset, changes, silent, changing, prev, current;
                if (null == key) return this;
                if ("object" == typeof key ? (attrs = key, options = val) : (attrs = {})[key] = val, options || (options = {}), !this._validate(attrs, options)) return !1;
                unset = options.unset, silent = options.silent, changes = [], changing = this._changing, this._changing = !0, changing || (this._previousAttributes = _.clone(this.attributes), this.changed = {}), current = this.attributes, prev = this._previousAttributes, this.idAttribute in attrs && (this.id = attrs[this.idAttribute]);
                for (attr in attrs) val = attrs[attr], _.isEqual(current[attr], val) || changes.push(attr), _.isEqual(prev[attr], val) ? delete this.changed[attr] : this.changed[attr] = val, unset ? delete current[attr] : current[attr] = val;
                if (!silent) {
                  changes.length && (this._pending = !0);
                  for (var i = 0, l = changes.length; l > i; i++) this.trigger("change:" + changes[i], this, current[changes[i]], options)
                }
                if (changing) return this;
                if (!silent)
                  for (; this._pending;) this._pending = !1, this.trigger("change", this, options);
                return this._pending = !1, this._changing = !1, this
              },
              unset: function(attr, options) {
                return this.set(attr, void 0, _.extend({}, options, {
                  unset: !0
                }))
              },
              clear: function(options) {
                var attrs = {};
                for (var key in this.attributes) attrs[key] = void 0;
                return this.set(attrs, _.extend({}, options, {
                  unset: !0
                }))
              },
              hasChanged: function(attr) {
                return null == attr ? !_.isEmpty(this.changed) : _.has(this.changed, attr)
              },
              changedAttributes: function(diff) {
                if (!diff) return this.hasChanged() ? _.clone(this.changed) : !1;
                var val, changed = !1,
                  old = this._changing ? this._previousAttributes : this.attributes;
                for (var attr in diff) _.isEqual(old[attr], val = diff[attr]) || ((changed || (changed = {}))[attr] = val);
                return changed
              },
              previous: function(attr) {
                return null != attr && this._previousAttributes ? this._previousAttributes[attr] : null
              },
              previousAttributes: function() {
                return _.clone(this._previousAttributes)
              },
              fetch: function(options) {
                options = options ? _.clone(options) : {}, void 0 === options.parse && (options.parse = !0);
                var model = this,
                  success = options.success;
                return options.success = function(resp) {
                  return model.set(model.parse(resp, options), options) ? (success && success(model, resp, options), void model.trigger("sync", model, resp, options)) : !1
                }, wrapError(this, options), this.sync("read", this, options)
              },
              save: function(key, val, options) {
                var attrs, method, xhr, attributes = this.attributes;
                if (null == key || "object" == typeof key ? (attrs = key, options = val) : (attrs = {})[key] = val, !(!attrs || options && options.wait || this.set(attrs, options))) return !1;
                if (options = _.extend({
                  validate: !0
                }, options), !this._validate(attrs, options)) return !1;
                attrs && options.wait && (this.attributes = _.extend({}, attributes, attrs)), void 0 === options.parse && (options.parse = !0);
                var model = this,
                  success = options.success;
                return options.success = function(resp) {
                  model.attributes = attributes;
                  var serverAttrs = model.parse(resp, options);
                  return options.wait && (serverAttrs = _.extend(attrs || {}, serverAttrs)), _.isObject(serverAttrs) && !model.set(serverAttrs, options) ? !1 : (success && success(model, resp, options), void model.trigger("sync", model, resp, options))
                }, wrapError(this, options), method = this.isNew() ? "create" : options.patch ? "patch" : "update", "patch" === method && (options.attrs = attrs), xhr = this.sync(method, this, options), attrs && options.wait && (this.attributes = attributes), xhr
              },
              destroy: function(options) {
                options = options ? _.clone(options) : {};
                var model = this,
                  success = options.success,
                  destroy = function() {
                    model.trigger("destroy", model, model.collection, options)
                  };
                if (options.success = function(resp) {
                  (options.wait || model.isNew()) && destroy(), success && success(model, resp, options), model.isNew() || model.trigger("sync", model, resp, options)
                }, this.isNew()) return options.success(), !1;
                wrapError(this, options);
                var xhr = this.sync("delete", this, options);
                return options.wait || destroy(), xhr
              },
              url: function() {
                var base = _.result(this, "urlRoot") || _.result(this.collection, "url") || urlError();
                return this.isNew() ? base : base + ("/" === base.charAt(base.length - 1) ? "" : "/") + encodeURIComponent(this.id)
              },
              parse: function(resp) {
                return resp
              },
              clone: function() {
                return new this.constructor(this.attributes)
              },
              isNew: function() {
                return null == this.id
              },
              isValid: function(options) {
                return this._validate({}, _.extend(options || {}, {
                  validate: !0
                }))
              },
              _validate: function(attrs, options) {
                if (!options.validate || !this.validate) return !0;
                attrs = _.extend({}, this.attributes, attrs);
                var error = this.validationError = this.validate(attrs, options) || null;
                return error ? (this.trigger("invalid", this, error, _.extend(options || {}, {
                  validationError: error
                })), !1) : !0
              }
            });
            var modelMethods = ["keys", "values", "pairs", "invert", "pick", "omit"];
            _.each(modelMethods, function(method) {
              Model.prototype[method] = function() {
                var args = slice.call(arguments);
                return args.unshift(this.attributes), _[method].apply(_, args)
              }
            });
            var Collection = Backbone.Collection = function(models, options) {
                options || (options = {}), options.url && (this.url = options.url), options.model && (this.model = options.model), void 0 !== options.comparator && (this.comparator = options.comparator), this._reset(), this.initialize.apply(this, arguments), models && this.reset(models, _.extend({
                  silent: !0
                }, options))
              },
              setOptions = {
                add: !0,
                remove: !0,
                merge: !0
              },
              addOptions = {
                add: !0,
                merge: !1,
                remove: !1
              };
            _.extend(Collection.prototype, Events, {
              model: Model,
              initialize: function() {},
              toJSON: function(options) {
                return this.map(function(model) {
                  return model.toJSON(options)
                })
              },
              sync: function() {
                return Backbone.sync.apply(this, arguments)
              },
              add: function(models, options) {
                return this.set(models, _.defaults(options || {}, addOptions))
              },
              remove: function(models, options) {
                models = _.isArray(models) ? models.slice() : [models], options || (options = {});
                var i, l, index, model;
                for (i = 0, l = models.length; l > i; i++) model = this.get(models[i]), model && (delete this._byId[model.id], delete this._byId[model.cid], index = this.indexOf(model), this.models.splice(index, 1), this.length--, options.silent || (options.index = index, model.trigger("remove", model, this, options)), this._removeReference(model));
                return this
              },
              set: function(models, options) {
                options = _.defaults(options || {}, setOptions), options.parse && (models = this.parse(models, options)), _.isArray(models) || (models = models ? [models] : []);
                var i, l, model, existing, sort, at = options.at,
                  sortable = this.comparator && null == at && options.sort !== !1,
                  sortAttr = _.isString(this.comparator) ? this.comparator : null,
                  toAdd = [],
                  toRemove = [],
                  modelMap = {};
                for (i = 0, l = models.length; l > i; i++)(model = this._prepareModel(models[i], options)) && ((existing = this.get(model)) ? (options.remove && (modelMap[existing.cid] = !0), options.merge && (existing.set(model.attributes, options), sortable && !sort && existing.hasChanged(sortAttr) && (sort = !0))) : options.add && (toAdd.push(model), model.on("all", this._onModelEvent, this), this._byId[model.cid] = model, null != model.id && (this._byId[model.id] = model)));
                if (options.remove) {
                  for (i = 0, l = this.length; l > i; ++i) modelMap[(model = this.models[i]).cid] || toRemove.push(model);
                  toRemove.length && this.remove(toRemove, options)
                }
                if (toAdd.length && (sortable && (sort = !0), this.length += toAdd.length, null != at ? splice.apply(this.models, [at, 0].concat(toAdd)) : push.apply(this.models, toAdd)), sort && this.sort({
                  silent: !0
                }), options.silent) return this;
                for (i = 0, l = toAdd.length; l > i; i++)(model = toAdd[i]).trigger("add", model, this, options);
                return sort && this.trigger("sort", this, options), this
              },
              reset: function(models, options) {
                options || (options = {});
                for (var i = 0, l = this.models.length; l > i; i++) this._removeReference(this.models[i]);
                return options.previousModels = this.models, this._reset(), this.add(models, _.extend({
                  silent: !0
                }, options)), options.silent || this.trigger("reset", this, options), this
              },
              push: function(model, options) {
                return model = this._prepareModel(model, options), this.add(model, _.extend({
                  at: this.length
                }, options)), model
              },
              pop: function(options) {
                var model = this.at(this.length - 1);
                return this.remove(model, options), model
              },
              unshift: function(model, options) {
                return model = this._prepareModel(model, options), this.add(model, _.extend({
                  at: 0
                }, options)), model
              },
              shift: function(options) {
                var model = this.at(0);
                return this.remove(model, options), model
              },
              slice: function(begin, end) {
                return this.models.slice(begin, end)
              },
              get: function(obj) {
                return null == obj ? void 0 : this._byId[null != obj.id ? obj.id : obj.cid || obj]
              },
              at: function(index) {
                return this.models[index]
              },
              where: function(attrs, first) {
                return _.isEmpty(attrs) ? first ? void 0 : [] : this[first ? "find" : "filter"](function(model) {
                  for (var key in attrs)
                    if (attrs[key] !== model.get(key)) return !1;
                  return !0
                })
              },
              findWhere: function(attrs) {
                return this.where(attrs, !0)
              },
              sort: function(options) {
                if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
                return options || (options = {}), _.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(_.bind(this.comparator, this)), options.silent || this.trigger("sort", this, options), this
              },
              sortedIndex: function(model, value, context) {
                value || (value = this.comparator);
                var iterator = _.isFunction(value) ? value : function(model) {
                  return model.get(value)
                };
                return _.sortedIndex(this.models, model, iterator, context)
              },
              pluck: function(attr) {
                return _.invoke(this.models, "get", attr)
              },
              fetch: function(options) {
                options = options ? _.clone(options) : {}, void 0 === options.parse && (options.parse = !0);
                var success = options.success,
                  collection = this;
                return options.success = function(resp) {
                  var method = options.reset ? "reset" : "set";
                  collection[method](resp, options), success && success(collection, resp, options), collection.trigger("sync", collection, resp, options)
                }, wrapError(this, options), this.sync("read", this, options)
              },
              create: function(model, options) {
                if (options = options ? _.clone(options) : {}, !(model = this._prepareModel(model, options))) return !1;
                options.wait || this.add(model, options);
                var collection = this,
                  success = options.success;
                return options.success = function(resp) {
                  options.wait && collection.add(model, options), success && success(model, resp, options)
                }, model.save(null, options), model
              },
              parse: function(resp) {
                return resp
              },
              clone: function() {
                return new this.constructor(this.models)
              },
              _reset: function() {
                this.length = 0, this.models = [], this._byId = {}
              },
              _prepareModel: function(attrs, options) {
                if (attrs instanceof Model) return attrs.collection || (attrs.collection = this), attrs;
                options || (options = {}), options.collection = this;
                var model = new this.model(attrs, options);
                return model._validate(attrs, options) ? model : (this.trigger("invalid", this, attrs, options), !1)
              },
              _removeReference: function(model) {
                this === model.collection && delete model.collection, model.off("all", this._onModelEvent, this)
              },
              _onModelEvent: function(event, model, collection, options) {
                ("add" !== event && "remove" !== event || collection === this) && ("destroy" === event && this.remove(model, options), model && event === "change:" + model.idAttribute && (delete this._byId[model.previous(model.idAttribute)], null != model.id && (this._byId[model.id] = model)), this.trigger.apply(this, arguments))
              }
            });
            var methods = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain"];
            _.each(methods, function(method) {
              Collection.prototype[method] = function() {
                var args = slice.call(arguments);
                return args.unshift(this.models), _[method].apply(_, args)
              }
            });
            var attributeMethods = ["groupBy", "countBy", "sortBy"];
            _.each(attributeMethods, function(method) {
              Collection.prototype[method] = function(value, context) {
                var iterator = _.isFunction(value) ? value : function(model) {
                  return model.get(value)
                };
                return _[method](this.models, iterator, context)
              }
            });
            var View = Backbone.View = function(options) {
                this.cid = _.uniqueId("view"), this._configure(options || {}), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
              },
              delegateEventSplitter = /^(\S+)\s*(.*)$/,
              viewOptions = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
            _.extend(View.prototype, Events, {
              tagName: "div",
              $: function(selector) {
                return this.$el.find(selector)
              },
              initialize: function() {},
              render: function() {
                return this
              },
              remove: function() {
                return this.$el.remove(), this.stopListening(), this
              },
              setElement: function(element, delegate) {
                return this.$el && this.undelegateEvents(), this.$el = element instanceof Backbone.$ ? element : Backbone.$(element), this.el = this.$el[0], delegate !== !1 && this.delegateEvents(), this
              },
              delegateEvents: function(events) {
                if (!events && !(events = _.result(this, "events"))) return this;
                this.undelegateEvents();
                for (var key in events) {
                  var method = events[key];
                  if (_.isFunction(method) || (method = this[events[key]]), method) {
                    var match = key.match(delegateEventSplitter),
                      eventName = match[1],
                      selector = match[2];
                    method = _.bind(method, this), eventName += ".delegateEvents" + this.cid, "" === selector ? this.$el.on(eventName, method) : this.$el.on(eventName, selector, method)
                  }
                }
                return this
              },
              undelegateEvents: function() {
                return this.$el.off(".delegateEvents" + this.cid), this
              },
              _configure: function(options) {
                this.options && (options = _.extend({}, _.result(this, "options"), options)), _.extend(this, _.pick(options, viewOptions)), this.options = options
              },
              _ensureElement: function() {
                if (this.el) this.setElement(_.result(this, "el"), !1);
                else {
                  var attrs = _.extend({}, _.result(this, "attributes"));
                  this.id && (attrs.id = _.result(this, "id")), this.className && (attrs["class"] = _.result(this, "className"));
                  var $el = Backbone.$("<" + _.result(this, "tagName") + ">").attr(attrs);
                  this.setElement($el, !1)
                }
              }
            }), Backbone.sync = function(method, model, options) {
              var type = methodMap[method];
              _.defaults(options || (options = {}), {
                emulateHTTP: Backbone.emulateHTTP,
                emulateJSON: Backbone.emulateJSON
              });
              var params = {
                type: type,
                dataType: "json"
              };
              if (options.url || (params.url = _.result(model, "url") || urlError()), null != options.data || !model || "create" !== method && "update" !== method && "patch" !== method || (params.contentType = "application/json", params.data = JSON.stringify(options.attrs || model.toJSON(options))), options.emulateJSON && (params.contentType = "application/x-www-form-urlencoded", params.data = params.data ? {
                model: params.data
              } : {}), options.emulateHTTP && ("PUT" === type || "DELETE" === type || "PATCH" === type)) {
                params.type = "POST", options.emulateJSON && (params.data._method = type);
                var beforeSend = options.beforeSend;
                options.beforeSend = function(xhr) {
                  return xhr.setRequestHeader("X-HTTP-Method-Override", type), beforeSend ? beforeSend.apply(this, arguments) : void 0
                }
              }
              "GET" === params.type || options.emulateJSON || (params.processData = !1), "PATCH" !== params.type || !window.ActiveXObject || window.external && window.external.msActiveXFilteringEnabled || (params.xhr = function() {
                return new ActiveXObject("Microsoft.XMLHTTP")
              });
              var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
              return model.trigger("request", model, xhr, options), xhr
            };
            var methodMap = {
              create: "POST",
              update: "PUT",
              patch: "PATCH",
              "delete": "DELETE",
              read: "GET"
            };
            Backbone.ajax = function() {
              return Backbone.$.ajax.apply(Backbone.$, arguments)
            };
            var Router = Backbone.Router = function(options) {
                options || (options = {}), options.routes && (this.routes = options.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
              },
              optionalParam = /\((.*?)\)/g,
              namedParam = /(\(\?)?:\w+/g,
              splatParam = /\*\w+/g,
              escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
            _.extend(Router.prototype, Events, {
              initialize: function() {},
              route: function(route, name, callback) {
                _.isRegExp(route) || (route = this._routeToRegExp(route)), _.isFunction(name) && (callback = name, name = ""), callback || (callback = this[name]);
                var router = this;
                return Backbone.history.route(route, function(fragment) {
                  var args = router._extractParameters(route, fragment);
                  callback && callback.apply(router, args), router.trigger.apply(router, ["route:" + name].concat(args)), router.trigger("route", name, args), Backbone.history.trigger("route", router, name, args)
                }), this
              },
              navigate: function(fragment, options) {
                return Backbone.history.navigate(fragment, options), this
              },
              _bindRoutes: function() {
                if (this.routes) {
                  this.routes = _.result(this, "routes");
                  for (var route, routes = _.keys(this.routes); null != (route = routes.pop());) this.route(route, this.routes[route])
                }
              },
              _routeToRegExp: function(route) {
                return route = route.replace(escapeRegExp, "\\$&").replace(optionalParam, "(?:$1)?").replace(namedParam, function(match, optional) {
                  return optional ? match : "([^/]+)"
                }).replace(splatParam, "(.*?)"), new RegExp("^" + route + "$")
              },
              _extractParameters: function(route, fragment) {
                var params = route.exec(fragment).slice(1);
                return _.map(params, function(param) {
                  return param ? decodeURIComponent(param) : null
                })
              }
            });
            var History = Backbone.History = function() {
                this.handlers = [], _.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
              },
              routeStripper = /^[#\/]|\s+$/g,
              rootStripper = /^\/+|\/+$/g,
              isExplorer = /msie [\w.]+/,
              trailingSlash = /\/$/;
            History.started = !1, _.extend(History.prototype, Events, {
              interval: 50,
              getHash: function(window) {
                var match = (window || this).location.href.match(/#(.*)$/);
                return match ? match[1] : ""
              },
              getFragment: function(fragment, forcePushState) {
                if (null == fragment)
                  if (this._hasPushState || !this._wantsHashChange || forcePushState) {
                    fragment = this.location.pathname;
                    var root = this.root.replace(trailingSlash, "");
                    fragment.indexOf(root) || (fragment = fragment.substr(root.length))
                  } else fragment = this.getHash();
                return fragment.replace(routeStripper, "")
              },
              start: function(options) {
                if (History.started) throw new Error("Backbone.history has already been started");
                History.started = !0, this.options = _.extend({}, {
                  root: "/"
                }, this.options, options), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
                var fragment = this.getFragment(),
                  docMode = document.documentMode,
                  oldIE = isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || 7 >= docMode);
                this.root = ("/" + this.root + "/").replace(rootStripper, "/"), oldIE && this._wantsHashChange && (this.iframe = Backbone.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(fragment)), this._hasPushState ? Backbone.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !oldIE ? Backbone.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = fragment;
                var loc = this.location,
                  atRoot = loc.pathname.replace(/[^\/]$/, "$&/") === this.root;
                return this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot ? (this.fragment = this.getFragment(null, !0), this.location.replace(this.root + this.location.search + "#" + this.fragment), !0) : (this._wantsPushState && this._hasPushState && atRoot && loc.hash && (this.fragment = this.getHash().replace(routeStripper, ""), this.history.replaceState({}, document.title, this.root + this.fragment + loc.search)), this.options.silent ? void 0 : this.loadUrl())
              },
              stop: function() {
                Backbone.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), clearInterval(this._checkUrlInterval), History.started = !1
              },
              route: function(route, callback) {
                this.handlers.unshift({
                  route: route,
                  callback: callback
                })
              },
              checkUrl: function() {
                var current = this.getFragment();
                return current === this.fragment && this.iframe && (current = this.getFragment(this.getHash(this.iframe))), current === this.fragment ? !1 : (this.iframe && this.navigate(current), void(this.loadUrl() || this.loadUrl(this.getHash())))
              },
              loadUrl: function(fragmentOverride) {
                var fragment = this.fragment = this.getFragment(fragmentOverride),
                  matched = _.any(this.handlers, function(handler) {
                    return handler.route.test(fragment) ? (handler.callback(fragment), !0) : void 0
                  });
                return matched
              },
              navigate: function(fragment, options) {
                if (!History.started) return !1;
                if (options && options !== !0 || (options = {
                  trigger: options
                }), fragment = this.getFragment(fragment || ""), this.fragment !== fragment) {
                  this.fragment = fragment;
                  var url = this.root + fragment;
                  if (this._hasPushState) this.history[options.replace ? "replaceState" : "pushState"]({}, document.title, url);
                  else {
                    if (!this._wantsHashChange) return this.location.assign(url);
                    this._updateHash(this.location, fragment, options.replace), this.iframe && fragment !== this.getFragment(this.getHash(this.iframe)) && (options.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, fragment, options.replace))
                  }
                  options.trigger && this.loadUrl(fragment)
                }
              },
              _updateHash: function(location, fragment, replace) {
                if (replace) {
                  var href = location.href.replace(/(javascript:|#).*$/, "");
                  location.replace(href + "#" + fragment)
                } else location.hash = "#" + fragment
              }
            }), Backbone.history = new History;
            var extend = function(protoProps, staticProps) {
              var child, parent = this;
              child = protoProps && _.has(protoProps, "constructor") ? protoProps.constructor : function() {
                return parent.apply(this, arguments)
              }, _.extend(child, parent, staticProps);
              var Surrogate = function() {
                this.constructor = child
              };
              return Surrogate.prototype = parent.prototype, child.prototype = new Surrogate, protoProps && _.extend(child.prototype, protoProps), child.__super__ = parent.prototype, child
            };
            Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;
            var urlError = function() {
                throw new Error('A "url" property or function must be specified')
              },
              wrapError = function(model, options) {
                var error = options.error;
                options.error = function(resp) {
                  error && error(model, resp, options), model.trigger("error", model, resp, options)
                }
              }
          }.call(this), browserify_shim__define__module__export__("undefined" != typeof Backbone ? Backbone : window.Backbone)
        }).call(global, void 0, void 0, void 0, function(ex) {
          module.exports = ex
        })
      }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
      jquery: "lwLqBl",
      underscore: "9eM++n"
    }
  ],
  15: [
    function(require, module, exports) {
      if ("object" == typeof exports) var joint = {
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
      }), joint.shapes.basic.PortsModelInterface = {
        initialize: function() {
          this.updatePortsAttrs(), this.on("change:inPorts change:outPorts", this.updatePortsAttrs, this), this.constructor.__super__.constructor.__super__.initialize.apply(this, arguments)
        },
        updatePortsAttrs: function() {
          var currAttrs = this.get("attrs");
          _.each(this._portSelectors, function(selector) {
            currAttrs[selector] && delete currAttrs[selector]
          }), this._portSelectors = [];
          var attrs = {};
          _.each(this.get("inPorts"), function(portName, index, ports) {
            var portAttributes = this.getPortAttrs(portName, index, ports.length, ".inPorts", "in");
            this._portSelectors = this._portSelectors.concat(_.keys(portAttributes)), _.extend(attrs, portAttributes)
          }, this), _.each(this.get("outPorts"), function(portName, index, ports) {
            var portAttributes = this.getPortAttrs(portName, index, ports.length, ".outPorts", "out");
            this._portSelectors = this._portSelectors.concat(_.keys(portAttributes)), _.extend(attrs, portAttributes)
          }, this), this.attr(attrs, {
            silent: !0
          }), this.processPorts(), this.trigger("process:ports")
        },
        getPortSelector: function(name) {
          var selector = ".inPorts",
            index = this.get("inPorts").indexOf(name);
          if (0 > index && (selector = ".outPorts", index = this.get("outPorts").indexOf(name), 0 > index)) throw new Error("getPortSelector(): Port doesn't exist.");
          return selector + ">g:nth-child(" + (index + 1) + ")>circle"
        }
      }, joint.shapes.basic.PortsViewInterface = {
        initialize: function() {
          this.listenTo(this.model, "process:ports", this.update), joint.dia.ElementView.prototype.initialize.apply(this, arguments)
        },
        update: function() {
          this.renderPorts(), joint.dia.ElementView.prototype.update.apply(this, arguments)
        },
        renderPorts: function() {
          var $inPorts = this.$(".inPorts").empty(),
            $outPorts = this.$(".outPorts").empty(),
            portTemplate = _.template(this.model.portMarkup);
          _.each(_.filter(this.model.ports, function(p) {
            return "in" === p.type
          }), function(port, index) {
            $inPorts.append(V(portTemplate({
              id: index,
              port: port
            })).node)
          }), _.each(_.filter(this.model.ports, function(p) {
            return "out" === p.type
          }), function(port, index) {
            $outPorts.append(V(portTemplate({
              id: index,
              port: port
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
        setForeignObjectSize: function(cell, size) {
          cell.attr({
            ".fobj": _.clone(size),
            div: {
              style: _.clone(size)
            }
          })
        },
        setDivContent: function(cell, content) {
          cell.attr({
            div: {
              html: content
            }
          })
        }
      }), joint.shapes.basic.TextBlockView = joint.dia.ElementView.extend({
        initialize: function() {
          joint.dia.ElementView.prototype.initialize.apply(this, arguments), "undefined" == typeof SVGForeignObjectElement && (this.noSVGForeignObjectElement = !0, this.listenTo(this.model, "change:content", function(cell) {
            this.updateContent(cell)
          }))
        },
        update: function(cell, renderingOnlyAttrs) {
          if (this.noSVGForeignObjectElement) {
            var model = this.model,
              noTextAttrs = _.omit(renderingOnlyAttrs || model.get("attrs"), ".content");
            joint.dia.ElementView.prototype.update.call(this, model, noTextAttrs), (!renderingOnlyAttrs || _.has(renderingOnlyAttrs, ".content")) && this.updateContent(model, renderingOnlyAttrs)
          } else joint.dia.ElementView.prototype.update.call(this, model, renderingOnlyAttrs)
        },
        updateContent: function(cell, renderingOnlyAttrs) {
          var textAttrs = _.merge({}, (renderingOnlyAttrs || cell.get("attrs"))[".content"]);
          delete textAttrs.text;
          var text = joint.util.breakText(cell.get("content"), cell.get("size"), textAttrs, {
              svgDocument: this.paper.svg
            }),
            attrs = joint.util.setByPath({}, ".content", textAttrs, "/");
          attrs[".content"].text = text, joint.dia.ElementView.prototype.update.call(this, cell, attrs)
        }
      }), "object" == typeof exports && (module.exports = joint.shapes.basic)
    }, {
      "../src/core": 23,
      "../src/joint.dia.element": 25,
      lodash: 33
    }
  ],
  16: [
    function(require, module, exports) {
      if ("object" == typeof exports) var joint = {
        util: require("../src/core").util,
        shapes: {
          basic: require("./joint.shapes.basic")
        },
        dia: {}
      };
      joint.shapes.chess = {}, joint.shapes.chess.KingWhite = joint.shapes.basic.Generic.extend({
        markup: '<g class="rotatable"><g class="scalable"><g style="fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"><path      d="M 22.5,11.63 L 22.5,6"      style="fill:none; stroke:#000000; stroke-linejoin:miter;" />    <path      d="M 20,8 L 25,8"      style="fill:none; stroke:#000000; stroke-linejoin:miter;" />    <path      d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"      style="fill:#ffffff; stroke:#000000; stroke-linecap:butt; stroke-linejoin:miter;" />    <path      d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z "      style="fill:#ffffff; stroke:#000000;" />    <path      d="M 11.5,30 C 17,27 27,27 32.5,30"      style="fill:none; stroke:#000000;" />    <path      d="M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5"      style="fill:none; stroke:#000000;" />    <path      d="M 11.5,37 C 17,34 27,34 32.5,37"      style="fill:none; stroke:#000000;" />  </g></g></g>',
        defaults: joint.util.deepSupplement({
          type: "chess.KingWhite",
          size: {
            width: 42,
            height: 38
          }
        }, joint.shapes.basic.Generic.prototype.defaults)
      }), joint.shapes.chess.KingBlack = joint.shapes.basic.Generic.extend({
        markup: '<g class="rotatable"><g class="scalable"><g style="fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <path       d="M 22.5,11.63 L 22.5,6"       style="fill:none; stroke:#000000; stroke-linejoin:miter;"       id="path6570" />    <path       d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"       style="fill:#000000;fill-opacity:1; stroke-linecap:butt; stroke-linejoin:miter;" />    <path       d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z "       style="fill:#000000; stroke:#000000;" />    <path       d="M 20,8 L 25,8"       style="fill:none; stroke:#000000; stroke-linejoin:miter;" />    <path       d="M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.51,26.6 L 22.5,24.5 C 20,18 9.906,14 6.997,19.85 C 4.5,25.5 11.85,28.85 11.85,28.85"       style="fill:none; stroke:#ffffff;" />    <path       d="M 11.5,30 C 17,27 27,27 32.5,30 M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5 M 11.5,37 C 17,34 27,34 32.5,37"       style="fill:none; stroke:#ffffff;" />  </g></g></g>',
        defaults: joint.util.deepSupplement({
          type: "chess.KingBlack",
          size: {
            width: 42,
            height: 38
          }
        }, joint.shapes.basic.Generic.prototype.defaults)
      }), joint.shapes.chess.QueenWhite = joint.shapes.basic.Generic.extend({
        markup: '<g class="rotatable"><g class="scalable"><g style="opacity:1; fill:#ffffff; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <path      d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"      transform="translate(-1,-1)" />    <path      d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"      transform="translate(15.5,-5.5)" />    <path      d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"      transform="translate(32,-1)" />    <path      d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"      transform="translate(7,-4.5)" />    <path      d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"      transform="translate(24,-4)" />    <path      d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38,14 L 31,25 L 31,11 L 25.5,24.5 L 22.5,9.5 L 19.5,24.5 L 14,10.5 L 14,25 L 7,14 L 9,26 z "      style="stroke-linecap:butt;" />    <path      d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z "      style="stroke-linecap:butt;" />    <path      d="M 11.5,30 C 15,29 30,29 33.5,30"      style="fill:none;" />    <path      d="M 12,33.5 C 18,32.5 27,32.5 33,33.5"      style="fill:none;" />  </g></g></g>',
        defaults: joint.util.deepSupplement({
          type: "chess.QueenWhite",
          size: {
            width: 42,
            height: 38
          }
        }, joint.shapes.basic.Generic.prototype.defaults)
      }), joint.shapes.chess.QueenBlack = joint.shapes.basic.Generic.extend({
        markup: '<g class="rotatable"><g class="scalable"><g style="opacity:1; fill:#000000; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <g style="fill:#000000; stroke:none;">      <circle cx="6"    cy="12" r="2.75" />      <circle cx="14"   cy="9"  r="2.75" />      <circle cx="22.5" cy="8"  r="2.75" />      <circle cx="31"   cy="9"  r="2.75" />      <circle cx="39"   cy="12" r="2.75" />    </g>    <path       d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"       style="stroke-linecap:butt; stroke:#000000;" />    <path       d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"       style="stroke-linecap:butt;" />    <path       d="M 11,38.5 A 35,35 1 0 0 34,38.5"       style="fill:none; stroke:#000000; stroke-linecap:butt;" />    <path       d="M 11,29 A 35,35 1 0 1 34,29"       style="fill:none; stroke:#ffffff;" />    <path       d="M 12.5,31.5 L 32.5,31.5"       style="fill:none; stroke:#ffffff;" />    <path       d="M 11.5,34.5 A 35,35 1 0 0 33.5,34.5"       style="fill:none; stroke:#ffffff;" />    <path       d="M 10.5,37.5 A 35,35 1 0 0 34.5,37.5"       style="fill:none; stroke:#ffffff;" />  </g></g></g>',
        defaults: joint.util.deepSupplement({
          type: "chess.QueenBlack",
          size: {
            width: 42,
            height: 38
          }
        }, joint.shapes.basic.Generic.prototype.defaults)
      }), joint.shapes.chess.RookWhite = joint.shapes.basic.Generic.extend({
        markup: '<g class="rotatable"><g class="scalable"><g style="opacity:1; fill:#ffffff; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <path      d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "      style="stroke-linecap:butt;" />    <path      d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "      style="stroke-linecap:butt;" />    <path      d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14"      style="stroke-linecap:butt;" />    <path      d="M 34,14 L 31,17 L 14,17 L 11,14" />    <path      d="M 31,17 L 31,29.5 L 14,29.5 L 14,17"      style="stroke-linecap:butt; stroke-linejoin:miter;" />    <path      d="M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5" />    <path      d="M 11,14 L 34,14"      style="fill:none; stroke:#000000; stroke-linejoin:miter;" />  </g></g></g>',
        defaults: joint.util.deepSupplement({
          type: "chess.RookWhite",
          size: {
            width: 32,
            height: 34
          }
        }, joint.shapes.basic.Generic.prototype.defaults)
      }), joint.shapes.chess.RookBlack = joint.shapes.basic.Generic.extend({
        markup: '<g class="rotatable"><g class="scalable"><g style="opacity:1; fill:#000000; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <path      d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "      style="stroke-linecap:butt;" />    <path      d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z "      style="stroke-linecap:butt;" />    <path      d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "      style="stroke-linecap:butt;" />    <path      d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z "      style="stroke-linecap:butt;stroke-linejoin:miter;" />    <path      d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z "      style="stroke-linecap:butt;" />    <path      d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z "      style="stroke-linecap:butt;" />    <path      d="M 12,35.5 L 33,35.5 L 33,35.5"      style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />    <path      d="M 13,31.5 L 32,31.5"      style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />    <path      d="M 14,29.5 L 31,29.5"      style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />    <path      d="M 14,16.5 L 31,16.5"      style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />    <path      d="M 11,14 L 34,14"      style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />  </g></g></g>',
        defaults: joint.util.deepSupplement({
          type: "chess.RookBlack",
          size: {
            width: 32,
            height: 34
          }
        }, joint.shapes.basic.Generic.prototype.defaults)
      }), joint.shapes.chess.BishopWhite = joint.shapes.basic.Generic.extend({
        markup: '<g class="rotatable"><g class="scalable"><g style="opacity:1; fill:none; fill-rule:evenodd; fill-opacity:1; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <g style="fill:#ffffff; stroke:#000000; stroke-linecap:butt;">       <path        d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z" />      <path        d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" />      <path        d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" />    </g>    <path      d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"      style="fill:none; stroke:#000000; stroke-linejoin:miter;" />  </g></g></g>',
        defaults: joint.util.deepSupplement({
          type: "chess.BishopWhite",
          size: {
            width: 38,
            height: 38
          }
        }, joint.shapes.basic.Generic.prototype.defaults)
      }), joint.shapes.chess.BishopBlack = joint.shapes.basic.Generic.extend({
        markup: '<g class="rotatable"><g class="scalable"><g style="opacity:1; fill:none; fill-rule:evenodd; fill-opacity:1; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <g style="fill:#000000; stroke:#000000; stroke-linecap:butt;">       <path        d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z" />      <path        d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" />      <path        d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" />    </g>    <path       d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"       style="fill:none; stroke:#ffffff; stroke-linejoin:miter;" />  </g></g></g>',
        defaults: joint.util.deepSupplement({
          type: "chess.BishopBlack",
          size: {
            width: 38,
            height: 38
          }
        }, joint.shapes.basic.Generic.prototype.defaults)
      }), joint.shapes.chess.KnightWhite = joint.shapes.basic.Generic.extend({
        markup: '<g class="rotatable"><g class="scalable"><g style="opacity:1; fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <path      d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"      style="fill:#ffffff; stroke:#000000;" />    <path      d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"      style="fill:#ffffff; stroke:#000000;" />    <path      d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"      style="fill:#000000; stroke:#000000;" />    <path      d="M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z"      transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"      style="fill:#000000; stroke:#000000;" />  </g></g></g>',
        defaults: joint.util.deepSupplement({
          type: "chess.KnightWhite",
          size: {
            width: 38,
            height: 37
          }
        }, joint.shapes.basic.Generic.prototype.defaults)
      }), joint.shapes.chess.KnightBlack = joint.shapes.basic.Generic.extend({
        markup: '<g class="rotatable"><g class="scalable"><g style="opacity:1; fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <path      d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"      style="fill:#000000; stroke:#000000;" />    <path      d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"      style="fill:#000000; stroke:#000000;" />    <path      d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"      style="fill:#ffffff; stroke:#ffffff;" />    <path      d="M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z"      transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"      style="fill:#ffffff; stroke:#ffffff;" />    <path      d="M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 z "      style="fill:#ffffff; stroke:none;" />  </g></g></g>',
        defaults: joint.util.deepSupplement({
          type: "chess.KnightBlack",
          size: {
            width: 38,
            height: 37
          }
        }, joint.shapes.basic.Generic.prototype.defaults)
      }), joint.shapes.chess.PawnWhite = joint.shapes.basic.Generic.extend({
        markup: '<g class="rotatable"><g class="scalable"><path d="M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z "  style="opacity:1; fill:#ffffff; fill-opacity:1; fill-rule:nonzero; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:miter; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;" /></g></g>',
        defaults: joint.util.deepSupplement({
          type: "chess.PawnWhite",
          size: {
            width: 28,
            height: 33
          }
        }, joint.shapes.basic.Generic.prototype.defaults)
      }), joint.shapes.chess.PawnBlack = joint.shapes.basic.Generic.extend({
        markup: '<g class="rotatable"><g class="scalable"><path d="M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z "  style="opacity:1; fill:#000000; fill-opacity:1; fill-rule:nonzero; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:miter; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;" /></g></g>',
        defaults: joint.util.deepSupplement({
          type: "chess.PawnBlack",
          size: {
            width: 28,
            height: 33
          }
        }, joint.shapes.basic.Generic.prototype.defaults)
      }), "object" == typeof exports && (module.exports = joint.shapes.chess)
    }, {
      "../src/core": 23,
      "./joint.shapes.basic": 15
    }
  ],
  17: [
    function(require, module, exports) {
      if ("object" == typeof exports) var joint = {
          util: require("../src/core").util,
          shapes: {
            basic: require("./joint.shapes.basic")
          },
          dia: {
            ElementView: require("../src/joint.dia.element").ElementView,
            Link: require("../src/joint.dia.link").Link
          }
        },
        _ = require("lodash");
      joint.shapes.devs = {}, joint.shapes.devs.Model = joint.shapes.basic.Generic.extend(_.extend({}, joint.shapes.basic.PortsModelInterface, {
        markup: '<g class="rotatable"><g class="scalable"><rect/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g>',
        portMarkup: '<g class="port<%= id %>"><circle/><text/></g>',
        defaults: joint.util.deepSupplement({
          type: "devs.Model",
          size: {
            width: 1,
            height: 1
          },
          inPorts: [],
          outPorts: [],
          attrs: {
            ".": {
              magnet: !1
            },
            rect: {
              width: 150,
              height: 250,
              stroke: "black"
            },
            circle: {
              r: 10,
              magnet: !0,
              stroke: "black"
            },
            text: {
              fill: "black",
              "pointer-events": "none"
            },
            ".label": {
              text: "Model",
              "ref-x": .3,
              "ref-y": .2
            },
            ".inPorts text": {
              x: -15,
              dy: 4,
              "text-anchor": "end"
            },
            ".outPorts text": {
              x: 15,
              dy: 4
            }
          }
        }, joint.shapes.basic.Generic.prototype.defaults),
        getPortAttrs: function(portName, index, total, selector, type) {
          var attrs = {},
            portClass = "port" + index,
            portSelector = selector + ">." + portClass,
            portTextSelector = portSelector + ">text",
            portCircleSelector = portSelector + ">circle";
          return attrs[portTextSelector] = {
            text: portName
          }, attrs[portCircleSelector] = {
            port: {
              id: portName || _.uniqueId(type),
              type: type
            }
          }, attrs[portSelector] = {
            ref: "rect",
            "ref-y": (index + .5) * (1 / total)
          }, ".outPorts" === selector && (attrs[portSelector]["ref-dx"] = 0), attrs
        }
      })), joint.shapes.devs.Atomic = joint.shapes.devs.Model.extend({
        defaults: joint.util.deepSupplement({
          type: "devs.Atomic",
          size: {
            width: 80,
            height: 80
          },
          attrs: {
            rect: {
              fill: "salmon"
            },
            ".label": {
              text: "Atomic"
            },
            ".inPorts circle": {
              fill: "PaleGreen"
            },
            ".outPorts circle": {
              fill: "Tomato"
            }
          }
        }, joint.shapes.devs.Model.prototype.defaults)
      }), joint.shapes.devs.Coupled = joint.shapes.devs.Model.extend({
        defaults: joint.util.deepSupplement({
          type: "devs.Coupled",
          size: {
            width: 200,
            height: 300
          },
          attrs: {
            rect: {
              fill: "seaGreen"
            },
            ".label": {
              text: "Coupled"
            },
            ".inPorts circle": {
              fill: "PaleGreen"
            },
            ".outPorts circle": {
              fill: "Tomato"
            }
          }
        }, joint.shapes.devs.Model.prototype.defaults)
      }), joint.shapes.devs.Link = joint.dia.Link.extend({
        defaults: {
          type: "devs.Link",
          attrs: {
            ".connection": {
              "stroke-width": 2
            }
          }
        }
      }), joint.shapes.devs.ModelView = joint.dia.ElementView.extend(joint.shapes.basic.PortsViewInterface), joint.shapes.devs.AtomicView = joint.shapes.devs.ModelView, joint.shapes.devs.CoupledView = joint.shapes.devs.ModelView, "object" == typeof exports && (module.exports = joint.shapes.devs)
    }, {
      "../src/core": 23,
      "../src/joint.dia.element": 25,
      "../src/joint.dia.link": 26,
      "./joint.shapes.basic": 15,
      lodash: 33
    }
  ],
  18: [
    function(require, module, exports) {
      if ("object" == typeof exports) var joint = {
        util: require("../src/core").util,
        shapes: {},
        dia: {
          Element: require("../src/joint.dia.element").Element,
          Link: require("../src/joint.dia.link").Link
        }
      };
      joint.shapes.erd = {}, joint.shapes.erd.Entity = joint.dia.Element.extend({
        markup: '<g class="rotatable"><g class="scalable"><polygon class="outer"/><polygon class="inner"/></g><text/></g>',
        defaults: joint.util.deepSupplement({
          type: "erd.Entity",
          size: {
            width: 150,
            height: 60
          },
          attrs: {
            ".outer": {
              fill: "#2ECC71",
              stroke: "#27AE60",
              "stroke-width": 2,
              points: "100,0 100,60 0,60 0,0"
            },
            ".inner": {
              fill: "#2ECC71",
              stroke: "#27AE60",
              "stroke-width": 2,
              points: "95,5 95,55 5,55 5,5",
              display: "none"
            },
            text: {
              text: "Entity",
              "font-family": "Arial",
              "font-size": 14,
              ref: ".outer",
              "ref-x": .5,
              "ref-y": .5,
              "x-alignment": "middle",
              "y-alignment": "middle"
            }
          }
        }, joint.dia.Element.prototype.defaults)
      }), joint.shapes.erd.WeakEntity = joint.shapes.erd.Entity.extend({
        defaults: joint.util.deepSupplement({
          type: "erd.WeakEntity",
          attrs: {
            ".inner": {
              display: "auto"
            },
            text: {
              text: "Weak Entity"
            }
          }
        }, joint.shapes.erd.Entity.prototype.defaults)
      }), joint.shapes.erd.Relationship = joint.dia.Element.extend({
        markup: '<g class="rotatable"><g class="scalable"><polygon class="outer"/><polygon class="inner"/></g><text/></g>',
        defaults: joint.util.deepSupplement({
          type: "erd.Relationship",
          size: {
            width: 80,
            height: 80
          },
          attrs: {
            ".outer": {
              fill: "#3498DB",
              stroke: "#2980B9",
              "stroke-width": 2,
              points: "40,0 80,40 40,80 0,40"
            },
            ".inner": {
              fill: "#3498DB",
              stroke: "#2980B9",
              "stroke-width": 2,
              points: "40,5 75,40 40,75 5,40",
              display: "none"
            },
            text: {
              text: "Relationship",
              "font-family": "Arial",
              "font-size": 12,
              ref: ".",
              "ref-x": .5,
              "ref-y": .5,
              "x-alignment": "middle",
              "y-alignment": "middle"
            }
          }
        }, joint.dia.Element.prototype.defaults)
      }), joint.shapes.erd.IdentifyingRelationship = joint.shapes.erd.Relationship.extend({
        defaults: joint.util.deepSupplement({
          type: "erd.IdentifyingRelationship",
          attrs: {
            ".inner": {
              display: "auto"
            },
            text: {
              text: "Identifying"
            }
          }
        }, joint.shapes.erd.Relationship.prototype.defaults)
      }), joint.shapes.erd.Attribute = joint.dia.Element.extend({
        markup: '<g class="rotatable"><g class="scalable"><ellipse class="outer"/><ellipse class="inner"/></g><text/></g>',
        defaults: joint.util.deepSupplement({
          type: "erd.Attribute",
          size: {
            width: 100,
            height: 50
          },
          attrs: {
            ellipse: {
              transform: "translate(50, 25)"
            },
            ".outer": {
              stroke: "#D35400",
              "stroke-width": 2,
              cx: 0,
              cy: 0,
              rx: 50,
              ry: 25,
              fill: "#E67E22"
            },
            ".inner": {
              stroke: "#D35400",
              "stroke-width": 2,
              cx: 0,
              cy: 0,
              rx: 45,
              ry: 20,
              fill: "transparent",
              display: "none"
            },
            text: {
              "font-family": "Arial",
              "font-size": 14,
              ref: ".",
              "ref-x": .5,
              "ref-y": .5,
              "x-alignment": "middle",
              "y-alignment": "middle"
            }
          }
        }, joint.dia.Element.prototype.defaults)
      }), joint.shapes.erd.Multivalued = joint.shapes.erd.Attribute.extend({
        defaults: joint.util.deepSupplement({
          type: "erd.Multivalued",
          attrs: {
            ".inner": {
              display: "block"
            },
            text: {
              text: "multivalued"
            }
          }
        }, joint.shapes.erd.Attribute.prototype.defaults)
      }), joint.shapes.erd.Derived = joint.shapes.erd.Attribute.extend({
        defaults: joint.util.deepSupplement({
          type: "erd.Derived",
          attrs: {
            ".outer": {
              "stroke-dasharray": "3,5"
            },
            text: {
              text: "derived"
            }
          }
        }, joint.shapes.erd.Attribute.prototype.defaults)
      }), joint.shapes.erd.Key = joint.shapes.erd.Attribute.extend({
        defaults: joint.util.deepSupplement({
          type: "erd.Key",
          attrs: {
            ellipse: {
              "stroke-width": 4
            },
            text: {
              text: "key",
              "font-weight": "bold",
              "text-decoration": "underline"
            }
          }
        }, joint.shapes.erd.Attribute.prototype.defaults)
      }), joint.shapes.erd.Normal = joint.shapes.erd.Attribute.extend({
        defaults: joint.util.deepSupplement({
          type: "erd.Normal",
          attrs: {
            text: {
              text: "Normal"
            }
          }
        }, joint.shapes.erd.Attribute.prototype.defaults)
      }), joint.shapes.erd.ISA = joint.dia.Element.extend({
        markup: '<g class="rotatable"><g class="scalable"><polygon/></g><text/></g>',
        defaults: joint.util.deepSupplement({
          type: "erd.ISA",
          size: {
            width: 100,
            height: 50
          },
          attrs: {
            polygon: {
              points: "0,0 50,50 100,0",
              fill: "#F1C40F",
              stroke: "#F39C12",
              "stroke-width": 2
            },
            text: {
              text: "ISA",
              ref: ".",
              "ref-x": .5,
              "ref-y": .3,
              "x-alignment": "middle",
              "y-alignment": "middle"
            }
          }
        }, joint.dia.Element.prototype.defaults)
      }), joint.shapes.erd.Line = joint.dia.Link.extend({
        defaults: {
          type: "erd.Line"
        },
        cardinality: function(value) {
          this.set("labels", [{
            position: -20,
            attrs: {
              text: {
                dy: -8,
                text: value
              }
            }
          }])
        }
      }), "object" == typeof exports && (module.exports = joint.shapes.erd)
    }, {
      "../src/core": 23,
      "../src/joint.dia.element": 25,
      "../src/joint.dia.link": 26
    }
  ],
  19: [
    function(require, module, exports) {
      if ("object" == typeof exports) var joint = {
        util: require("../src/core").util,
        shapes: {
          basic: require("./joint.shapes.basic")
        },
        dia: {
          Element: require("../src/joint.dia.element").Element,
          Link: require("../src/joint.dia.link").Link
        }
      };
      joint.shapes.fsa = {}, joint.shapes.fsa.State = joint.shapes.basic.Circle.extend({
        defaults: joint.util.deepSupplement({
          type: "fsa.State",
          attrs: {
            circle: {
              "stroke-width": 3
            },
            text: {
              "font-weight": "bold"
            }
          }
        }, joint.shapes.basic.Circle.prototype.defaults)
      }), joint.shapes.fsa.StartState = joint.dia.Element.extend({
        markup: '<g class="rotatable"><g class="scalable"><circle/></g></g>',
        defaults: joint.util.deepSupplement({
          type: "fsa.StartState",
          size: {
            width: 20,
            height: 20
          },
          attrs: {
            circle: {
              transform: "translate(10, 10)",
              r: 10,
              fill: "black"
            }
          }
        }, joint.dia.Element.prototype.defaults)
      }), joint.shapes.fsa.EndState = joint.dia.Element.extend({
        markup: '<g class="rotatable"><g class="scalable"><circle class="outer"/><circle class="inner"/></g></g>',
        defaults: joint.util.deepSupplement({
          type: "fsa.EndState",
          size: {
            width: 20,
            height: 20
          },
          attrs: {
            ".outer": {
              transform: "translate(10, 10)",
              r: 10,
              fill: "#FFFFFF",
              stroke: "black"
            },
            ".inner": {
              transform: "translate(10, 10)",
              r: 6,
              fill: "#000000"
            }
          }
        }, joint.dia.Element.prototype.defaults)
      }), joint.shapes.fsa.Arrow = joint.dia.Link.extend({
        defaults: joint.util.deepSupplement({
          type: "fsa.Arrow",
          attrs: {
            ".marker-target": {
              d: "M 10 0 L 0 5 L 10 10 z"
            }
          },
          smooth: !0
        }, joint.dia.Link.prototype.defaults)
      }), "object" == typeof exports && (module.exports = joint.shapes.fsa)
    }, {
      "../src/core": 23,
      "../src/joint.dia.element": 25,
      "../src/joint.dia.link": 26,
      "./joint.shapes.basic": 15
    }
  ],
  20: [
    function(require, module, exports) {
      if ("object" == typeof exports) var joint = {
        util: require("../src/core").util,
        shapes: {},
        dia: {
          Element: require("../src/joint.dia.element").Element,
          Link: require("../src/joint.dia.link").Link
        }
      };
      joint.shapes.org = {}, joint.shapes.org.Member = joint.dia.Element.extend({
        markup: '<g class="rotatable"><g class="scalable"><rect class="card"/><image/></g><text class="rank"/><text class="name"/></g>',
        defaults: joint.util.deepSupplement({
          type: "org.Member",
          size: {
            width: 180,
            height: 70
          },
          attrs: {
            rect: {
              width: 170,
              height: 60
            },
            ".card": {
              fill: "#FFFFFF",
              stroke: "#000000",
              "stroke-width": 2,
              "pointer-events": "visiblePainted",
              rx: 10,
              ry: 10
            },
            image: {
              width: 48,
              height: 48,
              ref: ".card",
              "ref-x": 10,
              "ref-y": 5
            },
            ".rank": {
              "text-decoration": "underline",
              ref: ".card",
              "ref-x": .9,
              "ref-y": .2,
              "font-family": "Courier New",
              "font-size": 14,
              "text-anchor": "end"
            },
            ".name": {
              "font-weight": "bold",
              ref: ".card",
              "ref-x": .9,
              "ref-y": .6,
              "font-family": "Courier New",
              "font-size": 14,
              "text-anchor": "end"
            }
          }
        }, joint.dia.Element.prototype.defaults)
      }), joint.shapes.org.Arrow = joint.dia.Link.extend({
        defaults: {
          type: "org.Arrow",
          source: {
            selector: ".card"
          },
          target: {
            selector: ".card"
          },
          attrs: {
            ".connection": {
              stroke: "#585858",
              "stroke-width": 3
            }
          },
          z: -1
        }
      }), "object" == typeof exports && (module.exports = joint.shapes.org)
    }, {
      "../src/core": 23,
      "../src/joint.dia.element": 25,
      "../src/joint.dia.link": 26
    }
  ],
  21: [
    function(require, module, exports) {
      if ("object" == typeof exports) var joint = {
        util: require("../src/core").util,
        shapes: {
          basic: require("./joint.shapes.basic")
        },
        dia: {
          ElementView: require("../src/joint.dia.element").ElementView,
          Link: require("../src/joint.dia.link").Link
        }
      };
      joint.shapes.pn = {}, joint.shapes.pn.Place = joint.shapes.basic.Generic.extend({
        markup: '<g class="rotatable"><g class="scalable"><circle class="root"/><g class="tokens" /></g><text class="label"/></g>',
        defaults: joint.util.deepSupplement({
          type: "pn.Place",
          size: {
            width: 50,
            height: 50
          },
          attrs: {
            ".root": {
              r: 25,
              fill: "white",
              stroke: "black",
              transform: "translate(25, 25)"
            },
            ".label": {
              "text-anchor": "middle",
              "ref-x": .5,
              "ref-y": -20,
              ref: ".root",
              fill: "black",
              "font-size": 12
            },
            ".tokens > circle": {
              fill: "black",
              r: 5
            },
            ".tokens.one > circle": {
              transform: "translate(25, 25)"
            },
            ".tokens.two > circle:nth-child(1)": {
              transform: "translate(19, 25)"
            },
            ".tokens.two > circle:nth-child(2)": {
              transform: "translate(31, 25)"
            },
            ".tokens.three > circle:nth-child(1)": {
              transform: "translate(18, 29)"
            },
            ".tokens.three > circle:nth-child(2)": {
              transform: "translate(25, 19)"
            },
            ".tokens.three > circle:nth-child(3)": {
              transform: "translate(32, 29)"
            },
            ".tokens.alot > text": {
              transform: "translate(25, 18)",
              "text-anchor": "middle",
              fill: "black"
            }
          }
        }, joint.shapes.basic.Generic.prototype.defaults)
      }), joint.shapes.pn.PlaceView = joint.dia.ElementView.extend({
        initialize: function() {
          joint.dia.ElementView.prototype.initialize.apply(this, arguments), this.model.on("change:tokens", function() {
            this.renderTokens(), this.update()
          }, this)
        },
        render: function() {
          joint.dia.ElementView.prototype.render.apply(this, arguments), this.renderTokens(), this.update()
        },
        renderTokens: function() {
          var $tokens = this.$(".tokens").empty();
          $tokens[0].className.baseVal = "tokens";
          var tokens = this.model.get("tokens");
          if (tokens) switch (tokens) {
            case 1:
              $tokens[0].className.baseVal += " one", $tokens.append(V("<circle/>").node);
              break;
            case 2:
              $tokens[0].className.baseVal += " two", $tokens.append(V("<circle/>").node, V("<circle/>").node);
              break;
            case 3:
              $tokens[0].className.baseVal += " three", $tokens.append(V("<circle/>").node, V("<circle/>").node, V("<circle/>").node);
              break;
            default:
              $tokens[0].className.baseVal += " alot", $tokens.append(V("<text/>").text(tokens + "").node)
          }
        }
      }), joint.shapes.pn.Transition = joint.shapes.basic.Generic.extend({
        markup: '<g class="rotatable"><g class="scalable"><rect class="root"/></g></g><text class="label"/>',
        defaults: joint.util.deepSupplement({
          type: "pn.Transition",
          size: {
            width: 12,
            height: 50
          },
          attrs: {
            rect: {
              width: 12,
              height: 50,
              fill: "black",
              stroke: "black"
            },
            ".label": {
              "text-anchor": "middle",
              "ref-x": .5,
              "ref-y": -20,
              ref: "rect",
              fill: "black",
              "font-size": 12
            }
          }
        }, joint.shapes.basic.Generic.prototype.defaults)
      }), joint.shapes.pn.Link = joint.dia.Link.extend({
        defaults: joint.util.deepSupplement({
          attrs: {
            ".marker-target": {
              d: "M 10 0 L 0 5 L 10 10 z"
            }
          }
        }, joint.dia.Link.prototype.defaults)
      }), "object" == typeof exports && (module.exports = joint.shapes.pn)
    }, {
      "../src/core": 23,
      "../src/joint.dia.element": 25,
      "../src/joint.dia.link": 26,
      "./joint.shapes.basic": 15
    }
  ],
  22: [
    function(require, module, exports) {
      if ("object" == typeof exports) var joint = {
          util: require("../src/core").util,
          shapes: {
            basic: require("./joint.shapes.basic")
          },
          dia: {
            ElementView: require("../src/joint.dia.element").ElementView,
            Link: require("../src/joint.dia.link").Link
          }
        },
        _ = require("lodash");
      joint.shapes.uml = {}, joint.shapes.uml.Class = joint.shapes.basic.Generic.extend({
        markup: ['<g class="rotatable">', '<g class="scalable">', '<rect class="uml-class-name-rect"/><rect class="uml-class-attrs-rect"/><rect class="uml-class-methods-rect"/>', "</g>", '<text class="uml-class-name-text"/><text class="uml-class-attrs-text"/><text class="uml-class-methods-text"/>', "</g>"].join(""),
        defaults: joint.util.deepSupplement({
          type: "uml.Class",
          attrs: {
            rect: {
              width: 200
            },
            ".uml-class-name-rect": {
              stroke: "black",
              "stroke-width": 2,
              fill: "#3498db"
            },
            ".uml-class-attrs-rect": {
              stroke: "black",
              "stroke-width": 2,
              fill: "#2980b9"
            },
            ".uml-class-methods-rect": {
              stroke: "black",
              "stroke-width": 2,
              fill: "#2980b9"
            },
            ".uml-class-name-text": {
              ref: ".uml-class-name-rect",
              "ref-y": .5,
              "ref-x": .5,
              "text-anchor": "middle",
              "y-alignment": "middle",
              "font-weight": "bold",
              fill: "black",
              "font-size": 12,
              "font-family": "Times New Roman"
            },
            ".uml-class-attrs-text": {
              ref: ".uml-class-attrs-rect",
              "ref-y": 5,
              "ref-x": 5,
              fill: "black",
              "font-size": 12,
              "font-family": "Times New Roman"
            },
            ".uml-class-methods-text": {
              ref: ".uml-class-methods-rect",
              "ref-y": 5,
              "ref-x": 5,
              fill: "black",
              "font-size": 12,
              "font-family": "Times New Roman"
            }
          },
          name: [],
          attributes: [],
          methods: []
        }, joint.shapes.basic.Generic.prototype.defaults),
        initialize: function() {
          _.bindAll(this, "updateRectangles"), this.on("change:name change:attributes change:methods", function() {
            this.updateRectangles(), this.trigger("uml-update")
          }), this.updateRectangles(), joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments)
        },
        getClassName: function() {
          return this.get("name")
        },
        updateRectangles: function() {
          var attrs = this.get("attrs"),
            rects = [{
              type: "name",
              text: this.getClassName()
            }, {
              type: "attrs",
              text: this.get("attributes")
            }, {
              type: "methods",
              text: this.get("methods")
            }],
            offsetY = 0;
          _.each(rects, function(rect) {
            var lines = _.isArray(rect.text) ? rect.text : [rect.text],
              rectHeight = 20 * lines.length + 20;
            attrs[".uml-class-" + rect.type + "-text"].text = lines.join("\n"), attrs[".uml-class-" + rect.type + "-rect"].height = rectHeight, attrs[".uml-class-" + rect.type + "-rect"].transform = "translate(0," + offsetY + ")", offsetY += rectHeight
          })
        }
      }), joint.shapes.uml.ClassView = joint.dia.ElementView.extend({
        initialize: function() {
          joint.dia.ElementView.prototype.initialize.apply(this, arguments), this.model.on("uml-update", _.bind(function() {
            this.update(), this.resize()
          }, this))
        }
      }), joint.shapes.uml.Abstract = joint.shapes.uml.Class.extend({
        defaults: joint.util.deepSupplement({
          type: "uml.Abstract",
          attrs: {
            ".uml-class-name-rect": {
              fill: "#e74c3c"
            },
            ".uml-class-attrs-rect": {
              fill: "#c0392b"
            },
            ".uml-class-methods-rect": {
              fill: "#c0392b"
            }
          }
        }, joint.shapes.uml.Class.prototype.defaults),
        getClassName: function() {
          return ["<<Abstract>>", this.get("name")]
        }
      }), joint.shapes.uml.AbstractView = joint.shapes.uml.ClassView, joint.shapes.uml.Interface = joint.shapes.uml.Class.extend({
        defaults: joint.util.deepSupplement({
          type: "uml.Interface",
          attrs: {
            ".uml-class-name-rect": {
              fill: "#f1c40f"
            },
            ".uml-class-attrs-rect": {
              fill: "#f39c12"
            },
            ".uml-class-methods-rect": {
              fill: "#f39c12"
            }
          }
        }, joint.shapes.uml.Class.prototype.defaults),
        getClassName: function() {
          return ["<<Interface>>", this.get("name")]
        }
      }), joint.shapes.uml.InterfaceView = joint.shapes.uml.ClassView, joint.shapes.uml.Generalization = joint.dia.Link.extend({
        defaults: {
          type: "uml.Generalization",
          attrs: {
            ".marker-target": {
              d: "M 20 0 L 0 10 L 20 20 z",
              fill: "white"
            }
          }
        }
      }), joint.shapes.uml.Implementation = joint.dia.Link.extend({
        defaults: {
          type: "uml.Implementation",
          attrs: {
            ".marker-target": {
              d: "M 20 0 L 0 10 L 20 20 z",
              fill: "white"
            },
            ".connection": {
              "stroke-dasharray": "3,3"
            }
          }
        }
      }), joint.shapes.uml.Aggregation = joint.dia.Link.extend({
        defaults: {
          type: "uml.Aggregation",
          attrs: {
            ".marker-target": {
              d: "M 40 10 L 20 20 L 0 10 L 20 0 z",
              fill: "white"
            }
          }
        }
      }), joint.shapes.uml.Composition = joint.dia.Link.extend({
        defaults: {
          type: "uml.Composition",
          attrs: {
            ".marker-target": {
              d: "M 40 10 L 20 20 L 0 10 L 20 0 z",
              fill: "black"
            }
          }
        }
      }), joint.shapes.uml.Association = joint.dia.Link.extend({
        defaults: {
          type: "uml.Association"
        }
      }), joint.shapes.uml.State = joint.shapes.basic.Generic.extend({
        markup: ['<g class="rotatable">', '<g class="scalable">', "<rect/>", "</g>", '<path/><text class="uml-state-name"/><text class="uml-state-events"/>', "</g>"].join(""),
        defaults: joint.util.deepSupplement({
          type: "uml.State",
          attrs: {
            rect: {
              width: 200,
              height: 200,
              fill: "#ecf0f1",
              stroke: "#bdc3c7",
              "stroke-width": 3,
              rx: 10,
              ry: 10
            },
            path: {
              d: "M 0 20 L 200 20",
              stroke: "#bdc3c7",
              "stroke-width": 2
            },
            ".uml-state-name": {
              ref: "rect",
              "ref-x": .5,
              "ref-y": 5,
              "text-anchor": "middle",
              "font-family": "Courier New",
              "font-size": 14,
              fill: "#000000"
            },
            ".uml-state-events": {
              ref: "path",
              "ref-x": 5,
              "ref-y": 5,
              "font-family": "Courier New",
              "font-size": 14,
              fill: "#000000"
            }
          },
          name: "State",
          events: []
        }, joint.shapes.basic.Generic.prototype.defaults),
        initialize: function() {
          _.bindAll(this, "updateEvents", "updatePath"), this.on({
            "change:name": function() {
              this.updateName(), this.trigger("change:attrs")
            },
            "change:events": function() {
              this.updateEvents(), this.trigger("change:attrs")
            },
            "change:size": this.updatePath
          }), this.updateName(), this.updateEvents(), this.updatePath(), joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments)
        },
        updateName: function() {
          this.get("attrs")[".uml-state-name"].text = this.get("name")
        },
        updateEvents: function() {
          this.get("attrs")[".uml-state-events"].text = this.get("events").join("\n")
        },
        updatePath: function() {
          this.get("attrs").path.d = "M 0 20 L " + this.get("size").width + " 20"
        }
      }), joint.shapes.uml.StartState = joint.shapes.basic.Circle.extend({
        defaults: joint.util.deepSupplement({
          type: "uml.StartState",
          attrs: {
            circle: {
              fill: "#34495e",
              stroke: "#2c3e50",
              "stroke-width": 2,
              rx: 1
            }
          }
        }, joint.shapes.basic.Circle.prototype.defaults)
      }), joint.shapes.uml.EndState = joint.shapes.basic.Generic.extend({
        markup: '<g class="rotatable"><g class="scalable"><circle class="outer"/><circle class="inner"/></g></g>',
        defaults: joint.util.deepSupplement({
          type: "uml.EndState",
          size: {
            width: 20,
            height: 20
          },
          attrs: {
            "circle.outer": {
              transform: "translate(10, 10)",
              r: 10,
              fill: "white",
              stroke: "#2c3e50"
            },
            "circle.inner": {
              transform: "translate(10, 10)",
              r: 6,
              fill: "#34495e"
            }
          }
        }, joint.shapes.basic.Generic.prototype.defaults)
      }), joint.shapes.uml.Transition = joint.dia.Link.extend({
        defaults: {
          type: "uml.Transition",
          attrs: {
            ".marker-target": {
              d: "M 10 0 L 0 5 L 10 10 z",
              fill: "#34495e",
              stroke: "#2c3e50"
            },
            ".connection": {
              stroke: "#2c3e50"
            }
          }
        }
      }), "object" == typeof exports && (module.exports = joint.shapes.uml)
    }, {
      "../src/core": 23,
      "../src/joint.dia.element": 25,
      "../src/joint.dia.link": 26,
      "./joint.shapes.basic": 15,
      lodash: 33
    }
  ],
  23: [
    function(require, module, exports) {
      if ("object" == typeof exports) var _ = require("lodash");
      var joint = {
        dia: {},
        ui: {},
        layout: {},
        shapes: {},
        format: {},
        connectors: {},
        routers: {},
        util: {
          hashCode: function(str) {
            var hash = 0;
            if (0 == str.length) return hash;
            for (var i = 0; i < str.length; i++) {
              var c = str.charCodeAt(i);
              hash = (hash << 5) - hash + c, hash &= hash
            }
            return hash
          },
          getByPath: function(obj, path, delim) {
            delim = delim || ".";
            for (var key, keys = path.split(delim); keys.length;) {
              if (key = keys.shift(), !(key in obj)) return void 0;
              obj = obj[key]
            }
            return obj
          },
          setByPath: function(obj, path, value, delim) {
            delim = delim || ".";
            var keys = path.split(delim),
              diver = obj,
              i = 0;
            if (path.indexOf(delim) > -1) {
              for (var len = keys.length; len - 1 > i; i++) diver = diver[keys[i]] || (diver[keys[i]] = {});
              diver[keys[len - 1]] = value
            } else obj[path] = value;
            return obj
          },
          unsetByPath: function(obj, path, delim) {
            delim = delim || ".";
            var i = path.lastIndexOf(delim);
            if (i > -1) {
              var parent = joint.util.getByPath(obj, path.substr(0, i), delim);
              parent && delete parent[path.slice(i + 1)]
            } else delete obj[path];
            return obj
          },
          flattenObject: function(obj, delim, stop) {
            delim = delim || ".";
            var ret = {};
            for (var key in obj)
              if (obj.hasOwnProperty(key)) {
                var shouldGoDeeper = "object" == typeof obj[key];
                if (shouldGoDeeper && stop && stop(obj[key]) && (shouldGoDeeper = !1), shouldGoDeeper) {
                  var flatObject = this.flattenObject(obj[key], delim, stop);
                  for (var flatKey in flatObject) flatObject.hasOwnProperty(flatKey) && (ret[key + delim + flatKey] = flatObject[flatKey])
                } else ret[key] = obj[key]
              }
            return ret
          },
          uuid: function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
              var r = 16 * Math.random() | 0,
                v = "x" == c ? r : 3 & r | 8;
              return v.toString(16)
            })
          },
          guid: function(obj) {
            return this.guid.id = this.guid.id || 1, obj.id = void 0 === obj.id ? "j_" + this.guid.id++ : obj.id, obj.id
          },
          mixin: function() {
            for (var target = arguments[0], i = 1, l = arguments.length; l > i; i++) {
              var extension = arguments[i];
              (Object(extension) === extension || _.isFunction(extension) || null !== extension && void 0 !== extension) && _.each(extension, function(copy, key) {
                return this.mixin.deep && Object(copy) === copy ? (target[key] || (target[key] = _.isArray(copy) ? [] : {}), void this.mixin(target[key], copy)) : void(target[key] !== copy && (this.mixin.supplement && target.hasOwnProperty(key) || (target[key] = copy)))
              }, this)
            }
            return target
          },
          supplement: function() {
            this.mixin.supplement = !0;
            var ret = this.mixin.apply(this, arguments);
            return this.mixin.supplement = !1, ret
          },
          deepMixin: function() {
            this.mixin.deep = !0;
            var ret = this.mixin.apply(this, arguments);
            return this.mixin.deep = !1, ret
          },
          deepSupplement: function() {
            this.mixin.deep = this.mixin.supplement = !0;
            var ret = this.mixin.apply(this, arguments);
            return this.mixin.deep = this.mixin.supplement = !1, ret
          },
          normalizeEvent: function(evt) {
            return evt.originalEvent && evt.originalEvent.changedTouches && evt.originalEvent.changedTouches.length ? evt.originalEvent.changedTouches[0] : evt
          },
          nextFrame: function() {
            var raf, client = "undefined" != typeof window;
            if (client && (raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame), !raf) {
              var lastTime = 0;
              raf = function(callback) {
                var currTime = (new Date).getTime(),
                  timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                  id = setTimeout(function() {
                    callback(currTime + timeToCall)
                  }, timeToCall);
                return lastTime = currTime + timeToCall, id
              }
            }
            return client ? _.bind(raf, window) : raf
          }(),
          cancelFrame: function() {
            var caf, client = "undefined" != typeof window;
            return client && (caf = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame || window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame), caf = caf || clearTimeout, client ? _.bind(caf, window) : caf
          }(),
          breakText: function(text, size, styles, opt) {
            opt = opt || {};
            var width = size.width,
              height = size.height,
              svgDocument = opt.svgDocument || V("svg").node,
              textElement = V("<text><tspan></tspan></text>").attr(styles || {}).node,
              textSpan = textElement.firstChild,
              textNode = document.createTextNode("");
            textSpan.appendChild(textNode), svgDocument.appendChild(textElement), opt.svgDocument || document.body.appendChild(svgDocument);
            for (var p, words = text.split(" "), full = [], lines = [], i = 0, l = 0, len = words.length; len > i; i++) {
              var word = words[i];
              if (textNode.data = lines[l] ? lines[l] + " " + word : word, textSpan.getComputedTextLength() <= width) lines[l] = textNode.data, p && (full[l++] = !0, p = 0);
              else {
                if (!lines[l] || p) {
                  var partition = !!p;
                  if (p = word.length - 1, partition || !p) {
                    if (!p) {
                      if (!lines[l]) {
                        lines = [];
                        break
                      }
                      words.splice(i, 2, word + words[i + 1]), len--, full[l++] = !0, i--;
                      continue
                    }
                    words[i] = word.substring(0, p), words[i + 1] = word.substring(p) + words[i + 1]
                  } else words.splice(i, 1, word.substring(0, p), word.substring(p)), len++, l && !full[l - 1] && l--;
                  i--;
                  continue
                }
                l++, i--
              } if ("undefined" != typeof height) {
                var lh = lh || 1.25 * textElement.getBBox().height;
                if (lh * lines.length > height) {
                  lines.splice(Math.floor(height / lh));
                  break
                }
              }
            }
            return opt.svgDocument ? svgDocument.removeChild(textElement) : document.body.removeChild(svgDocument), lines.join("\n")
          },
          timing: {
            linear: function(t) {
              return t
            },
            quad: function(t) {
              return t * t
            },
            cubic: function(t) {
              return t * t * t
            },
            inout: function(t) {
              if (0 >= t) return 0;
              if (t >= 1) return 1;
              var t2 = t * t,
                t3 = t2 * t;
              return 4 * (.5 > t ? t3 : 3 * (t - t2) + t3 - .75)
            },
            exponential: function(t) {
              return Math.pow(2, 10 * (t - 1))
            },
            bounce: function(t) {
              for (var a = 0, b = 1; 1; a += b, b /= 2)
                if (t >= (7 - 4 * a) / 11) {
                  var q = (11 - 6 * a - 11 * t) / 4;
                  return -q * q + b * b
                }
            },
            reverse: function(f) {
              return function(t) {
                return 1 - f(1 - t)
              }
            },
            reflect: function(f) {
              return function(t) {
                return .5 * (.5 > t ? f(2 * t) : 2 - f(2 - 2 * t))
              }
            },
            clamp: function(f, n, x) {
              return n = n || 0, x = x || 1,
                function(t) {
                  var r = f(t);
                  return n > r ? n : r > x ? x : r
                }
            },
            back: function(s) {
              return s || (s = 1.70158),
                function(t) {
                  return t * t * ((s + 1) * t - s)
                }
            },
            elastic: function(x) {
              return x || (x = 1.5),
                function(t) {
                  return Math.pow(2, 10 * (t - 1)) * Math.cos(20 * Math.PI * x / 3 * t)
                }
            }
          },
          interpolate: {
            number: function(a, b) {
              var d = b - a;
              return function(t) {
                return a + d * t
              }
            },
            object: function(a, b) {
              var s = _.keys(a);
              return function(t) {
                var i, p, r = {};
                for (i = s.length - 1; - 1 != i; i--) p = s[i], r[p] = a[p] + (b[p] - a[p]) * t;
                return r
              }
            },
            hexColor: function(a, b) {
              var ca = parseInt(a.slice(1), 16),
                cb = parseInt(b.slice(1), 16),
                ra = 255 & ca,
                rd = (255 & cb) - ra,
                ga = 65280 & ca,
                gd = (65280 & cb) - ga,
                ba = 16711680 & ca,
                bd = (16711680 & cb) - ba;
              return function(t) {
                var r = ra + rd * t & 255,
                  g = ga + gd * t & 65280,
                  b = ba + bd * t & 16711680;
                return "#" + (1 << 24 | r | g | b).toString(16).slice(1)
              }
            },
            unit: function(a, b) {
              var r = /(-?[0-9]*.[0-9]*)(px|em|cm|mm|in|pt|pc|%)/,
                ma = r.exec(a),
                mb = r.exec(b),
                p = mb[1].indexOf("."),
                f = p > 0 ? mb[1].length - p - 1 : 0,
                a = +ma[1],
                d = +mb[1] - a,
                u = ma[2];
              return function(t) {
                return (a + d * t).toFixed(f) + u
              }
            }
          },
          filter: {
            blur: function(args) {
              var x = _.isFinite(args.x) ? args.x : 2;
              return _.template('<filter><feGaussianBlur stdDeviation="${stdDeviation}"/></filter>', {
                stdDeviation: _.isFinite(args.y) ? [x, args.y] : x
              })
            },
            dropShadow: function(args) {
              var tpl = "SVGFEDropShadowElement" in window ? '<filter><feDropShadow stdDeviation="${blur}" dx="${dx}" dy="${dy}" flood-color="${color}" flood-opacity="${opacity}"/></filter>' : '<filter><feGaussianBlur in="SourceAlpha" stdDeviation="${blur}"/><feOffset dx="${dx}" dy="${dy}" result="offsetblur"/><feFlood flood-color="${color}"/><feComposite in2="offsetblur" operator="in"/><feComponentTransfer><feFuncA type="linear" slope="${opacity}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
              return _.template(tpl, {
                dx: args.dx || 0,
                dy: args.dy || 0,
                opacity: _.isFinite(args.opacity) ? args.opacity : 1,
                color: args.color || "black",
                blur: _.isFinite(args.blur) ? args.blur : 4
              })
            },
            grayscale: function(args) {
              var amount = _.isFinite(args.amount) ? args.amount : 1;
              return _.template('<filter><feColorMatrix type="matrix" values="${a} ${b} ${c} 0 0 ${d} ${e} ${f} 0 0 ${g} ${b} ${h} 0 0 0 0 0 1 0"/></filter>', {
                a: .2126 + .7874 * (1 - amount),
                b: .7152 - .7152 * (1 - amount),
                c: .0722 - .0722 * (1 - amount),
                d: .2126 - .2126 * (1 - amount),
                e: .7152 + .2848 * (1 - amount),
                f: .0722 - .0722 * (1 - amount),
                g: .2126 - .2126 * (1 - amount),
                h: .0722 + .9278 * (1 - amount)
              })
            },
            sepia: function(args) {
              var amount = _.isFinite(args.amount) ? args.amount : 1;
              return _.template('<filter><feColorMatrix type="matrix" values="${a} ${b} ${c} 0 0 ${d} ${e} ${f} 0 0 ${g} ${h} ${i} 0 0 0 0 0 1 0"/></filter>', {
                a: .393 + .607 * (1 - amount),
                b: .769 - .769 * (1 - amount),
                c: .189 - .189 * (1 - amount),
                d: .349 - .349 * (1 - amount),
                e: .686 + .314 * (1 - amount),
                f: .168 - .168 * (1 - amount),
                g: .272 - .272 * (1 - amount),
                h: .534 - .534 * (1 - amount),
                i: .131 + .869 * (1 - amount)
              })
            },
            saturate: function(args) {
              var amount = _.isFinite(args.amount) ? args.amount : 1;
              return _.template('<filter><feColorMatrix type="saturate" values="${amount}"/></filter>', {
                amount: 1 - amount
              })
            },
            hueRotate: function(args) {
              return _.template('<filter><feColorMatrix type="hueRotate" values="${angle}"/></filter>', {
                angle: args.angle || 0
              })
            },
            invert: function(args) {
              var amount = _.isFinite(args.amount) ? args.amount : 1;
              return _.template('<filter><feComponentTransfer><feFuncR type="table" tableValues="${amount} ${amount2}"/><feFuncG type="table" tableValues="${amount} ${amount2}"/><feFuncB type="table" tableValues="${amount} ${amount2}"/></feComponentTransfer></filter>', {
                amount: amount,
                amount2: 1 - amount
              })
            },
            brightness: function(args) {
              return _.template('<filter><feComponentTransfer><feFuncR type="linear" slope="${amount}"/><feFuncG type="linear" slope="${amount}"/><feFuncB type="linear" slope="${amount}"/></feComponentTransfer></filter>', {
                amount: _.isFinite(args.amount) ? args.amount : 1
              })
            },
            contrast: function(args) {
              var amount = _.isFinite(args.amount) ? args.amount : 1;
              return _.template('<filter><feComponentTransfer><feFuncR type="linear" slope="${amount}" intercept="${amount2}"/><feFuncG type="linear" slope="${amount}" intercept="${amount2}"/><feFuncB type="linear" slope="${amount}" intercept="${amount2}"/></feComponentTransfer></filter>', {
                amount: amount,
                amount2: .5 - amount / 2
              })
            }
          },
          format: {
            number: function(specifier, value, locale) {
              function formatGroup(value) {
                for (var i = value.length, t = [], j = 0, g = locale.grouping[0]; i > 0 && g > 0;) t.push(value.substring(i -= g, i + g)), g = locale.grouping[j = (j + 1) % locale.grouping.length];
                return t.reverse().join(locale.thousands)
              }
              locale = locale || {
                currency: ["$", ""],
                decimal: ".",
                thousands: ",",
                grouping: [3]
              };
              var re = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,
                match = re.exec(specifier),
                fill = match[1] || " ",
                align = match[2] || ">",
                sign = match[3] || "",
                symbol = match[4] || "",
                zfill = match[5],
                width = +match[6],
                comma = match[7],
                precision = match[8],
                type = match[9],
                scale = 1,
                prefix = "",
                suffix = "",
                integer = !1;
              switch (precision && (precision = +precision.substring(1)), (zfill || "0" === fill && "=" === align) && (zfill = fill = "0", align = "=", comma && (width -= Math.floor((width - 1) / 4))), type) {
                case "n":
                  comma = !0, type = "g";
                  break;
                case "%":
                  scale = 100, suffix = "%", type = "f";
                  break;
                case "p":
                  scale = 100, suffix = "%", type = "r";
                  break;
                case "b":
                case "o":
                case "x":
                case "X":
                  "#" === symbol && (prefix = "0" + type.toLowerCase());
                case "c":
                case "d":
                  integer = !0, precision = 0;
                  break;
                case "s":
                  scale = -1, type = "r"
              }
              "$" === symbol && (prefix = locale.currency[0], suffix = locale.currency[1]), "r" != type || precision || (type = "g"), null != precision && ("g" == type ? precision = Math.max(1, Math.min(21, precision)) : ("e" == type || "f" == type) && (precision = Math.max(0, Math.min(20, precision))));
              var zcomma = zfill && comma;
              if (integer && value % 1) return "";
              var negative = 0 > value || 0 === value && 0 > 1 / value ? (value = -value, "-") : sign,
                fullSuffix = suffix;
              if (0 > scale) {
                var unit = this.prefix(value, precision);
                value = unit.scale(value), fullSuffix = unit.symbol + suffix
              } else value *= scale;
              value = this.convert(type, value, precision);
              var i = value.lastIndexOf("."),
                before = 0 > i ? value : value.substring(0, i),
                after = 0 > i ? "" : locale.decimal + value.substring(i + 1);
              !zfill && comma && locale.grouping && (before = formatGroup(before));
              var length = prefix.length + before.length + after.length + (zcomma ? 0 : negative.length),
                padding = width > length ? new Array(length = width - length + 1).join(fill) : "";
              return zcomma && (before = formatGroup(padding + before)), negative += prefix, value = before + after, ("<" === align ? negative + value + padding : ">" === align ? padding + negative + value : "^" === align ? padding.substring(0, length >>= 1) + negative + value + padding.substring(length) : negative + (zcomma ? value : padding + value)) + fullSuffix
            },
            convert: function(type, value, precision) {
              switch (type) {
                case "b":
                  return value.toString(2);
                case "c":
                  return String.fromCharCode(value);
                case "o":
                  return value.toString(8);
                case "x":
                  return value.toString(16);
                case "X":
                  return value.toString(16).toUpperCase();
                case "g":
                  return value.toPrecision(precision);
                case "e":
                  return value.toExponential(precision);
                case "f":
                  return value.toFixed(precision);
                case "r":
                  return (value = this.round(value, this.precision(value, precision))).toFixed(Math.max(0, Math.min(20, this.precision(value * (1 + 1e-15), precision))));
                default:
                  return value + ""
              }
            },
            round: function(value, precision) {
              return precision ? Math.round(value * (precision = Math.pow(10, precision))) / precision : Math.round(value)
            },
            precision: function(value, precision) {
              return precision - (value ? Math.ceil(Math.log(value) / Math.LN10) : 1)
            },
            prefix: function(value, precision) {
              var prefixes = _.map(["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"], function(d, i) {
                  var k = Math.pow(10, 3 * abs(8 - i));
                  return {
                    scale: i > 8 ? function(d) {
                      return d / k
                    } : function(d) {
                      return d * k
                    },
                    symbol: d
                  }
                }),
                i = 0;
              return value && (0 > value && (value *= -1), precision && (value = d3.round(value, this.precision(value, precision))), i = 1 + Math.floor(1e-12 + Math.log(value) / Math.LN10), i = Math.max(-24, Math.min(24, 3 * Math.floor((0 >= i ? i + 1 : i - 1) / 3)))), prefixes[8 + i / 3]
            }
          }
        }
      };
      "object" == typeof exports && (module.exports = joint)
    }, {
      lodash: 33
    }
  ],
  24: [
    function(require, module, exports) {
      ! function(root, factory) {
        "function" == typeof define && define.amd ? define([], factory) : "object" == typeof exports ? module.exports = factory() : root.g = factory()
      }(this, function() {
        function point(x, y) {
          if (!(this instanceof point)) return new point(x, y);
          var xy;
          void 0 === y && Object(x) !== x ? (xy = x.split(-1 === x.indexOf("@") ? " " : "@"), this.x = parseInt(xy[0], 10), this.y = parseInt(xy[1], 10)) : Object(x) === x ? (this.x = x.x, this.y = x.y) : (this.x = x, this.y = y)
        }

        function line(p1, p2) {
          return this instanceof line ? (this.start = point(p1), void(this.end = point(p2))) : new line(p1, p2)
        }

        function rect(x, y, w, h) {
          return this instanceof rect ? (void 0 === y && (y = x.y, w = x.width, h = x.height, x = x.x), this.x = x, this.y = y, this.width = w, void(this.height = h)) : new rect(x, y, w, h)
        }

        function ellipse(c, a, b) {
          return this instanceof ellipse ? (c = point(c), this.x = c.x, this.y = c.y, this.a = a, void(this.b = b)) : new ellipse(c, a, b)
        }
        var math = Math,
          abs = math.abs,
          cos = math.cos,
          sin = math.sin,
          sqrt = math.sqrt,
          mmin = math.min,
          mmax = math.max,
          atan2 = (math.atan, math.atan2),
          round = (math.acos, math.round),
          floor = math.floor,
          PI = math.PI,
          random = math.random,
          toDeg = function(rad) {
            return 180 * rad / PI % 360
          },
          toRad = function(deg) {
            return deg % 360 * PI / 180
          },
          snapToGrid = function(val, gridSize) {
            return gridSize * Math.round(val / gridSize)
          },
          normalizeAngle = function(angle) {
            return angle % 360 + (0 > angle ? 360 : 0)
          };
        point.prototype = {
          toString: function() {
            return this.x + "@" + this.y
          },
          adhereToRect: function(r) {
            return r.containsPoint(this) ? this : (this.x = mmin(mmax(this.x, r.x), r.x + r.width), this.y = mmin(mmax(this.y, r.y), r.y + r.height), this)
          },
          theta: function(p) {
            p = point(p);
            var y = -(p.y - this.y),
              x = p.x - this.x,
              PRECISION = 10,
              rad = 0 == y.toFixed(PRECISION) && 0 == x.toFixed(PRECISION) ? 0 : atan2(y, x);
            return 0 > rad && (rad = 2 * PI + rad), 180 * rad / PI
          },
          distance: function(p) {
            return line(this, p).length()
          },
          manhattanDistance: function(p) {
            return abs(p.x - this.x) + abs(p.y - this.y)
          },
          offset: function(dx, dy) {
            return this.x += dx || 0, this.y += dy || 0, this
          },
          magnitude: function() {
            return sqrt(this.x * this.x + this.y * this.y) || .01
          },
          update: function(x, y) {
            return this.x = x || 0, this.y = y || 0, this
          },
          round: function(decimals) {
            return this.x = decimals ? this.x.toFixed(decimals) : round(this.x), this.y = decimals ? this.y.toFixed(decimals) : round(this.y), this
          },
          normalize: function(len) {
            var s = (len || 1) / this.magnitude();
            return this.x = s * this.x, this.y = s * this.y, this
          },
          difference: function(p) {
            return point(this.x - p.x, this.y - p.y)
          },
          bearing: function(p) {
            return line(this, p).bearing()
          },
          toPolar: function(o) {
            o = o && point(o) || point(0, 0);
            var x = this.x,
              y = this.y;
            return this.x = sqrt((x - o.x) * (x - o.x) + (y - o.y) * (y - o.y)), this.y = toRad(o.theta(point(x, y))), this
          },
          rotate: function(o, angle) {
            angle = (angle + 360) % 360, this.toPolar(o), this.y += toRad(angle);
            var p = point.fromPolar(this.x, this.y, o);
            return this.x = p.x, this.y = p.y, this
          },
          move: function(ref, distance) {
            var theta = toRad(point(ref).theta(this));
            return this.offset(cos(theta) * distance, -sin(theta) * distance)
          },
          changeInAngle: function(dx, dy, ref) {
            return point(this).offset(-dx, -dy).theta(ref) - this.theta(ref)
          },
          equals: function(p) {
            return this.x === p.x && this.y === p.y
          },
          snapToGrid: function(gx, gy) {
            return this.x = snapToGrid(this.x, gx), this.y = snapToGrid(this.y, gy || gx), this
          }
        }, point.fromPolar = function(r, angle, o) {
          o = o && point(o) || point(0, 0);
          var x = abs(r * cos(angle)),
            y = abs(r * sin(angle)),
            deg = normalizeAngle(toDeg(angle));
          return 90 > deg ? y = -y : 180 > deg ? (x = -x, y = -y) : 270 > deg && (x = -x), point(o.x + x, o.y + y)
        }, point.random = function(x1, x2, y1, y2) {
          return point(floor(random() * (x2 - x1 + 1) + x1), floor(random() * (y2 - y1 + 1) + y1))
        }, line.prototype = {
          toString: function() {
            return this.start.toString() + " " + this.end.toString()
          },
          length: function() {
            return sqrt(this.squaredLength())
          },
          squaredLength: function() {
            var x0 = this.start.x,
              y0 = this.start.y,
              x1 = this.end.x,
              y1 = this.end.y;
            return (x0 -= x1) * x0 + (y0 -= y1) * y0
          },
          midpoint: function() {
            return point((this.start.x + this.end.x) / 2, (this.start.y + this.end.y) / 2)
          },
          intersection: function(l) {
            var pt1Dir = point(this.end.x - this.start.x, this.end.y - this.start.y),
              pt2Dir = point(l.end.x - l.start.x, l.end.y - l.start.y),
              det = pt1Dir.x * pt2Dir.y - pt1Dir.y * pt2Dir.x,
              deltaPt = point(l.start.x - this.start.x, l.start.y - this.start.y),
              alpha = deltaPt.x * pt2Dir.y - deltaPt.y * pt2Dir.x,
              beta = deltaPt.x * pt1Dir.y - deltaPt.y * pt1Dir.x;
            if (0 === det || 0 > alpha * det || 0 > beta * det) return null;
            if (det > 0) {
              if (alpha > det || beta > det) return null
            } else if (det > alpha || det > beta) return null;
            return point(this.start.x + alpha * pt1Dir.x / det, this.start.y + alpha * pt1Dir.y / det)
          },
          bearing: function() {
            var lat1 = toRad(this.start.y),
              lat2 = toRad(this.end.y),
              lon1 = this.start.x,
              lon2 = this.end.x,
              dLon = toRad(lon2 - lon1),
              y = sin(dLon) * cos(lat2),
              x = cos(lat1) * sin(lat2) - sin(lat1) * cos(lat2) * cos(dLon),
              brng = toDeg(atan2(y, x)),
              bearings = ["NE", "E", "SE", "S", "SW", "W", "NW", "N"],
              index = brng - 22.5;
            return 0 > index && (index += 360), index = parseInt(index / 45), bearings[index]
          }
        }, rect.prototype = {
          toString: function() {
            return this.origin().toString() + " " + this.corner().toString()
          },
          origin: function() {
            return point(this.x, this.y)
          },
          corner: function() {
            return point(this.x + this.width, this.y + this.height)
          },
          topRight: function() {
            return point(this.x + this.width, this.y)
          },
          bottomLeft: function() {
            return point(this.x, this.y + this.height)
          },
          center: function() {
            return point(this.x + this.width / 2, this.y + this.height / 2)
          },
          intersect: function(r) {
            var myOrigin = this.origin(),
              myCorner = this.corner(),
              rOrigin = r.origin(),
              rCorner = r.corner();
            return rCorner.x <= myOrigin.x || rCorner.y <= myOrigin.y || rOrigin.x >= myCorner.x || rOrigin.y >= myCorner.y ? !1 : !0
          },
          sideNearestToPoint: function(p) {
            p = point(p);
            var distToLeft = p.x - this.x,
              distToRight = this.x + this.width - p.x,
              distToTop = p.y - this.y,
              distToBottom = this.y + this.height - p.y,
              closest = distToLeft,
              side = "left";
            return closest > distToRight && (closest = distToRight, side = "right"), closest > distToTop && (closest = distToTop, side = "top"), closest > distToBottom && (closest = distToBottom, side = "bottom"), side
          },
          containsPoint: function(p) {
            return p = point(p), p.x >= this.x && p.x <= this.x + this.width && p.y >= this.y && p.y <= this.y + this.height ? !0 : !1
          },
          containsRect: function(r) {
            var nr = rect(r).normalize(),
              W = nr.width,
              H = nr.height,
              X = nr.x,
              Y = nr.y,
              w = this.width,
              h = this.height;
            if (0 > (w | h | W | H)) return !1;
            var x = this.x,
              y = this.y;
            if (x > X || y > Y) return !1;
            if (w += x, W += X, X >= W) {
              if (w >= x || W > w) return !1
            } else if (w >= x && W > w) return !1;
            if (h += y, H += Y, Y >= H) {
              if (h >= y || H > h) return !1
            } else if (h >= y && H > h) return !1;
            return !0
          },
          pointNearestToPoint: function(p) {
            if (p = point(p), this.containsPoint(p)) {
              var side = this.sideNearestToPoint(p);
              switch (side) {
                case "right":
                  return point(this.x + this.width, p.y);
                case "left":
                  return point(this.x, p.y);
                case "bottom":
                  return point(p.x, this.y + this.height);
                case "top":
                  return point(p.x, this.y)
              }
            }
            return p.adhereToRect(this)
          },
          intersectionWithLineFromCenterToPoint: function(p, angle) {
            p = point(p);
            var result, center = point(this.x + this.width / 2, this.y + this.height / 2);
            angle && p.rotate(center, angle);
            for (var sides = [line(this.origin(), this.topRight()), line(this.topRight(), this.corner()), line(this.corner(), this.bottomLeft()), line(this.bottomLeft(), this.origin())], connector = line(center, p), i = sides.length - 1; i >= 0; --i) {
              var intersection = sides[i].intersection(connector);
              if (null !== intersection) {
                result = intersection;
                break
              }
            }
            return result && angle && result.rotate(center, -angle), result
          },
          moveAndExpand: function(r) {
            return this.x += r.x, this.y += r.y, this.width += r.width, this.height += r.height, this
          },
          round: function(decimals) {
            return this.x = decimals ? this.x.toFixed(decimals) : round(this.x), this.y = decimals ? this.y.toFixed(decimals) : round(this.y), this.width = decimals ? this.width.toFixed(decimals) : round(this.width), this.height = decimals ? this.height.toFixed(decimals) : round(this.height), this
          },
          normalize: function() {
            var newx = this.x,
              newy = this.y,
              newwidth = this.width,
              newheight = this.height;
            return this.width < 0 && (newx = this.x + this.width, newwidth = -this.width), this.height < 0 && (newy = this.y + this.height, newheight = -this.height), this.x = newx, this.y = newy, this.width = newwidth, this.height = newheight, this
          }
        }, ellipse.prototype = {
          toString: function() {
            return point(this.x, this.y).toString() + " " + this.a + " " + this.b
          },
          bbox: function() {
            return rect(this.x - this.a, this.y - this.b, 2 * this.a, 2 * this.b)
          },
          intersectionWithLineFromCenterToPoint: function(p, angle) {
            p = point(p), angle && p.rotate(point(this.x, this.y), angle);
            var result, dx = p.x - this.x,
              dy = p.y - this.y;
            if (0 === dx) return result = this.bbox().pointNearestToPoint(p), angle ? result.rotate(point(this.x, this.y), -angle) : result;
            var m = dy / dx,
              mSquared = m * m,
              aSquared = this.a * this.a,
              bSquared = this.b * this.b,
              x = sqrt(1 / (1 / aSquared + mSquared / bSquared));
            x = 0 > dx ? -x : x;
            var y = m * x;
            return result = point(this.x + x, this.y + y), angle ? result.rotate(point(this.x, this.y), -angle) : result
          }
        };
        var bezier = {
            curveThroughPoints: function(points) {
              for (var controlPoints = this.getCurveControlPoints(points), path = ["M", points[0].x, points[0].y], i = 0; i < controlPoints[0].length; i++) path.push("C", controlPoints[0][i].x, controlPoints[0][i].y, controlPoints[1][i].x, controlPoints[1][i].y, points[i + 1].x, points[i + 1].y);
              return path
            },
            getCurveControlPoints: function(knots) {
              var i, firstControlPoints = [],
                secondControlPoints = [],
                n = knots.length - 1;
              if (1 == n) return firstControlPoints[0] = point((2 * knots[0].x + knots[1].x) / 3, (2 * knots[0].y + knots[1].y) / 3), secondControlPoints[0] = point(2 * firstControlPoints[0].x - knots[0].x, 2 * firstControlPoints[0].y - knots[0].y), [firstControlPoints, secondControlPoints];
              var rhs = [];
              for (i = 1; n - 1 > i; i++) rhs[i] = 4 * knots[i].x + 2 * knots[i + 1].x;
              rhs[0] = knots[0].x + 2 * knots[1].x, rhs[n - 1] = (8 * knots[n - 1].x + knots[n].x) / 2;
              var x = this.getFirstControlPoints(rhs);
              for (i = 1; n - 1 > i; ++i) rhs[i] = 4 * knots[i].y + 2 * knots[i + 1].y;
              rhs[0] = knots[0].y + 2 * knots[1].y, rhs[n - 1] = (8 * knots[n - 1].y + knots[n].y) / 2;
              var y = this.getFirstControlPoints(rhs);
              for (i = 0; n > i; i++) firstControlPoints.push(point(x[i], y[i])), secondControlPoints.push(n - 1 > i ? point(2 * knots[i + 1].x - x[i + 1], 2 * knots[i + 1].y - y[i + 1]) : point((knots[n].x + x[n - 1]) / 2, (knots[n].y + y[n - 1]) / 2));
              return [firstControlPoints, secondControlPoints]
            },
            getFirstControlPoints: function(rhs) {
              var n = rhs.length,
                x = [],
                tmp = [],
                b = 2;
              x[0] = rhs[0] / b;
              for (var i = 1; n > i; i++) tmp[i] = 1 / b, b = (n - 1 > i ? 4 : 3.5) - tmp[i], x[i] = (rhs[i] - x[i - 1]) / b;
              for (i = 1; n > i; i++) x[n - i - 1] -= tmp[n - i] * x[n - i];
              return x
            }
          },
          scale = {
            linear: function(domain, range, value) {
              var domainSpan = domain[1] - domain[0],
                rangeSpan = range[1] - range[0];
              return (value - domain[0]) / domainSpan * rangeSpan + range[0] || 0
            }
          };
        return {
          toDeg: toDeg,
          toRad: toRad,
          snapToGrid: snapToGrid,
          normalizeAngle: normalizeAngle,
          point: point,
          line: line,
          rect: rect,
          ellipse: ellipse,
          bezier: bezier,
          scale: scale
        }
      })
    }, {}
  ],
  25: [
    function(require, module, exports) {
      if ("object" == typeof exports) var _ = (require("backbone"), require("lodash"));
      joint.dia.Element = joint.dia.Cell.extend({
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
        position: function(x, y) {
          this.set("position", {
            x: x,
            y: y
          })
        },
        translate: function(tx, ty, opt) {
          if (ty = ty || 0, 0 === tx && 0 === ty) return this;
          var position = this.get("position") || {
              x: 0,
              y: 0
            },
            translatedPosition = {
              x: position.x + tx || 0,
              y: position.y + ty || 0
            };
          return opt && opt.transition ? (_.isObject(opt.transition) || (opt.transition = {}), this.transition("position", translatedPosition, _.extend({}, opt.transition, {
            valueFunction: joint.util.interpolate.object
          }))) : (this.set("position", translatedPosition, opt), _.invoke(this.getEmbeddedCells(), "translate", tx, ty, opt)), this
        },
        resize: function(width, height) {
          return this.trigger("batch:start"), this.set("size", {
            width: width,
            height: height
          }), this.trigger("batch:stop"), this
        },
        rotate: function(angle, absolute) {
          return this.set("angle", absolute ? angle : ((this.get("angle") || 0) + angle) % 360)
        },
        getBBox: function() {
          var position = this.get("position"),
            size = this.get("size");
          return g.rect(position.x, position.y, size.width, size.height)
        }
      }), joint.dia.ElementView = joint.dia.CellView.extend({
        className: function() {
          return "element " + this.model.get("type").split(".").join(" ")
        },
        initialize: function() {
          _.bindAll(this, "translate", "resize", "rotate"), joint.dia.CellView.prototype.initialize.apply(this, arguments), this.listenTo(this.model, "change:position", this.translate), this.listenTo(this.model, "change:size", this.resize), this.listenTo(this.model, "change:angle", this.rotate)
        },
        update: function(cell, renderingOnlyAttrs) {
          var allAttrs = this.model.get("attrs"),
            rotatable = V(this.$(".rotatable")[0]);
          if (rotatable) {
            var rotation = rotatable.attr("transform");
            rotatable.attr("transform", "")
          }
          var relativelyPositioned = [];
          _.each(renderingOnlyAttrs || allAttrs, function(attrs, selector) {
            var $selected = this.findBySelector(selector);
            if (0 !== $selected.length) {
              var specialAttributes = ["style", "text", "html", "ref-x", "ref-y", "ref-dx", "ref-dy", "ref-width", "ref-height", "ref", "x-alignment", "y-alignment", "port"];
              _.isObject(attrs.filter) && (specialAttributes.push("filter"), this.applyFilter(selector, attrs.filter)), _.isObject(attrs.fill) && (specialAttributes.push("fill"), this.applyGradient(selector, "fill", attrs.fill)), _.isObject(attrs.stroke) && (specialAttributes.push("stroke"), this.applyGradient(selector, "stroke", attrs.stroke)), _.isUndefined(attrs.text) || $selected.each(function() {
                V(this).text(attrs.text + "")
              });
              var finalAttributes = _.omit(attrs, specialAttributes);
              $selected.each(function() {
                V(this).attr(finalAttributes)
              }), attrs.port && $selected.attr("port", _.isUndefined(attrs.port.id) ? attrs.port : attrs.port.id), attrs.style && $selected.css(attrs.style), _.isUndefined(attrs.html) || $selected.each(function() {
                $(this).html(attrs.html + "")
              }), _.isUndefined(attrs["ref-x"]) && _.isUndefined(attrs["ref-y"]) && _.isUndefined(attrs["ref-dx"]) && _.isUndefined(attrs["ref-dy"]) && _.isUndefined(attrs["x-alignment"]) && _.isUndefined(attrs["y-alignment"]) && _.isUndefined(attrs["ref-width"]) && _.isUndefined(attrs["ref-height"]) || _.each($selected, function(el, index, list) {
                var $el = $(el);
                $el.selector = list.selector, relativelyPositioned.push($el)
              })
            }
          }, this);
          var bbox = this.el.getBBox();
          renderingOnlyAttrs = renderingOnlyAttrs || {}, _.each(relativelyPositioned, function($el) {
            var renderingOnlyElAttrs = renderingOnlyAttrs[$el.selector],
              elAttrs = renderingOnlyElAttrs ? _.merge({}, allAttrs[$el.selector], renderingOnlyElAttrs) : allAttrs[$el.selector];
            this.positionRelative($el, bbox, elAttrs)
          }, this), rotatable && rotatable.attr("transform", rotation || "")
        },
        positionRelative: function($el, bbox, elAttrs) {
          function isDefined(x) {
            return _.isNumber(x) && !_.isNaN(x)
          }
          var ref = elAttrs.ref,
            refX = parseFloat(elAttrs["ref-x"]),
            refY = parseFloat(elAttrs["ref-y"]),
            refDx = parseFloat(elAttrs["ref-dx"]),
            refDy = parseFloat(elAttrs["ref-dy"]),
            yAlignment = elAttrs["y-alignment"],
            xAlignment = elAttrs["x-alignment"],
            refWidth = parseFloat(elAttrs["ref-width"]),
            refHeight = parseFloat(elAttrs["ref-height"]),
            isScalable = _.contains(_.pluck(_.pluck($el.parents("g"), "className"), "baseVal"), "scalable");
          ref && (bbox = V(this.findBySelector(ref)[0]).bbox(!1, this.el));
          var vel = V($el[0]);
          vel.attr("transform") && vel.attr("transform", vel.attr("transform").replace(/translate\([^)]*\)/g, "") || "");
          var tx = 0,
            ty = 0;
          if (isDefined(refWidth) && (refWidth >= 0 && 1 >= refWidth ? vel.attr("width", refWidth * bbox.width) : vel.attr("width", Math.max(refWidth + bbox.width, 0))), isDefined(refHeight) && (refHeight >= 0 && 1 >= refHeight ? vel.attr("height", refHeight * bbox.height) : vel.attr("height", Math.max(refHeight + bbox.height, 0))), isDefined(refDx))
            if (isScalable) {
              var scale = V(this.$(".scalable")[0]).scale();
              tx = bbox.x + bbox.width + refDx / scale.sx
            } else tx = bbox.x + bbox.width + refDx;
          if (isDefined(refDy))
            if (isScalable) {
              var scale = V(this.$(".scalable")[0]).scale();
              ty = bbox.y + bbox.height + refDy / scale.sy
            } else ty = bbox.y + bbox.height + refDy;
          if (isDefined(refX))
            if (refX > 0 && 1 > refX) tx = bbox.x + bbox.width * refX;
            else if (isScalable) {
            var scale = V(this.$(".scalable")[0]).scale();
            tx = bbox.x + refX / scale.sx
          } else tx = bbox.x + refX; if (isDefined(refY))
            if (refY > 0 && 1 > refY) ty = bbox.y + bbox.height * refY;
            else if (isScalable) {
            var scale = V(this.$(".scalable")[0]).scale();
            ty = bbox.y + refY / scale.sy
          } else ty = bbox.y + refY;
          var velbbox = vel.bbox(!1, this.paper.viewport);
          "middle" === yAlignment ? ty -= velbbox.height / 2 : isDefined(yAlignment) && (ty += yAlignment > -1 && 1 > yAlignment ? velbbox.height * yAlignment : yAlignment), "middle" === xAlignment ? tx -= velbbox.width / 2 : isDefined(xAlignment) && (tx += xAlignment > -1 && 1 > xAlignment ? velbbox.width * xAlignment : xAlignment), vel.translate(tx, ty)
        },
        renderMarkup: function() {
          var markup = this.model.markup || this.model.get("markup");
          if (!markup) throw new Error("properties.markup is missing while the default render() implementation is used.");
          var nodes = V(markup);
          V(this.el).append(nodes)
        },
        render: function() {
          return this.$el.empty(), this.renderMarkup(), this.update(), this.resize(), this.rotate(), this.translate(), this
        },
        scale: function(sx, sy) {
          V(this.el).scale(sx, sy)
        },
        resize: function() {
          var size = this.model.get("size") || {
              width: 1,
              height: 1
            },
            angle = this.model.get("angle") || 0,
            scalable = V(this.$(".scalable")[0]);
          if (scalable) {
            var scalableBbox = scalable.bbox(!0);
            scalable.attr("transform", "scale(" + size.width / scalableBbox.width + "," + size.height / scalableBbox.height + ")");
            var rotatable = V(this.$(".rotatable")[0]),
              rotation = rotatable && rotatable.attr("transform");
            if (rotation && "null" !== rotation) {
              rotatable.attr("transform", rotation + " rotate(" + -angle + "," + size.width / 2 + "," + size.height / 2 + ")");
              var rotatableBbox = scalable.bbox(!1, this.paper.viewport);
              this.model.set("position", {
                x: rotatableBbox.x,
                y: rotatableBbox.y
              }), this.rotate()
            }
            this.update()
          }
        },
        translate: function() {
          var position = this.model.get("position") || {
            x: 0,
            y: 0
          };
          V(this.el).attr("transform", "translate(" + position.x + "," + position.y + ")")
        },
        rotate: function() {
          var rotatable = V(this.$(".rotatable")[0]);
          if (rotatable) {
            var angle = this.model.get("angle") || 0,
              size = this.model.get("size") || {
                width: 1,
                height: 1
              },
              ox = size.width / 2,
              oy = size.height / 2;
            rotatable.attr("transform", "rotate(" + angle + "," + ox + "," + oy + ")")
          }
        },
        pointerdown: function(evt, x, y) {
          if (evt.target.getAttribute("magnet") && this.paper.options.validateMagnet.call(this.paper, this, evt.target)) {
            this.model.trigger("batch:start");
            var link = this.paper.getDefaultLink(this, evt.target);
            link.set({
              source: {
                id: this.model.id,
                selector: this.getSelector(evt.target),
                port: $(evt.target).attr("port")
              },
              target: {
                x: x,
                y: y
              }
            }), this.paper.model.addCell(link), this._linkView = this.paper.findViewByModel(link), this._linkView.startArrowheadMove("target")
          } else this._dx = x, this._dy = y, joint.dia.CellView.prototype.pointerdown.apply(this, arguments)
        },
        pointermove: function(evt, x, y) {
          if (this._linkView) this._linkView.pointermove(evt, x, y);
          else {
            var grid = this.paper.options.gridSize;
            if (this.options.interactive !== !1) {
              var position = this.model.get("position");
              this.model.translate(g.snapToGrid(position.x, grid) - position.x + g.snapToGrid(x - this._dx, grid), g.snapToGrid(position.y, grid) - position.y + g.snapToGrid(y - this._dy, grid))
            }
            this._dx = g.snapToGrid(x, grid), this._dy = g.snapToGrid(y, grid), joint.dia.CellView.prototype.pointermove.apply(this, arguments)
          }
        },
        pointerup: function(evt, x, y) {
          this._linkView ? (this._linkView.pointerup(evt, x, y), delete this._linkView, this.model.trigger("batch:stop")) : joint.dia.CellView.prototype.pointerup.apply(this, arguments)
        }
      }), "object" == typeof exports && (module.exports.Element = joint.dia.Element, module.exports.ElementView = joint.dia.ElementView)
    }, {
      backbone: "pHOy1N",
      lodash: 33
    }
  ],
  26: [
    function(require, module, exports) {
      if ("object" == typeof exports) var _ = (require("backbone"), require("lodash")),
        g = require("./geometry");
      joint.dia.Link = joint.dia.Cell.extend({
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
        label: function(idx, value) {
          idx = idx || 0;
          var labels = this.get("labels") || [];
          if (0 === arguments.length || 1 === arguments.length) return labels[idx];
          var newValue = _.merge({}, labels[idx], value),
            newLabels = labels.slice();
          return newLabels[idx] = newValue, this.set({
            labels: newLabels
          })
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
          }), this.listenTo(this.model, "change:source", function(cell, source) {
            this.watchSource(cell, source).update()
          }), this.listenTo(this.model, "change:target", function(cell, target) {
            this.watchTarget(cell, target).update()
          })
        },
        render: function() {
          this.$el.empty();
          var children = V(this.model.get("markup") || this.model.markup);
          if (_.isArray(children) || (children = [children]), this._V = {}, _.each(children, function(child) {
            var c = child.attr("class");
            c && (this._V[$.camelCase(c)] = child)
          }, this), !this._V.connection) throw new Error("link: no connection path in the markup");
          return this.renderTools(), this.renderVertexMarkers(), this.renderArrowheadMarkers(), V(this.el).append(children), this.renderLabels(), this.watchSource(this.model, this.model.get("source")).watchTarget(this.model, this.model.get("target")).update(), this
        },
        renderLabels: function() {
          if (!this._V.labels) return this;
          this._labelCache = {};
          var $labels = $(this._V.labels.node).empty(),
            labels = this.model.get("labels") || [];
          if (!labels.length) return this;
          var labelTemplate = _.template(this.model.get("labelMarkup") || this.model.labelMarkup),
            labelNodeInstance = V(labelTemplate());
          return _.each(labels, function(label, idx) {
            var labelNode = labelNodeInstance.clone().node;
            this._labelCache[idx] = V(labelNode);
            var $text = $(labelNode).find("text"),
              $rect = $(labelNode).find("rect"),
              textAttributes = _.extend({
                "text-anchor": "middle",
                "font-size": 14
              }, joint.util.getByPath(label, "attrs/text", "/"));
            $text.attr(_.omit(textAttributes, "text")), _.isUndefined(textAttributes.text) || V($text[0]).text(textAttributes.text + ""), $labels.append(labelNode);
            var textBbox = V($text[0]).bbox(!0, $labels[0]);
            V($text[0]).translate(0, -textBbox.height / 2);
            var rectAttributes = _.extend({
              fill: "white",
              rx: 3,
              ry: 3
            }, joint.util.getByPath(label, "attrs/rect", "/"));
            $rect.attr(_.extend(rectAttributes, {
              x: textBbox.x,
              y: textBbox.y - textBbox.height / 2,
              width: textBbox.width,
              height: textBbox.height
            }))
          }, this), this
        },
        renderTools: function() {
          if (!this._V.linkTools) return this;
          var $tools = $(this._V.linkTools.node).empty(),
            toolTemplate = _.template(this.model.get("toolMarkup") || this.model.toolMarkup),
            tool = V(toolTemplate());
          return $tools.append(tool.node), this._toolCache = tool, this
        },
        renderVertexMarkers: function() {
          if (!this._V.markerVertices) return this;
          var $markerVertices = $(this._V.markerVertices.node).empty(),
            markupTemplate = _.template(this.model.get("vertexMarkup") || this.model.vertexMarkup);
          return _.each(this.model.get("vertices"), function(vertex, idx) {
            $markerVertices.append(V(markupTemplate(_.extend({
              idx: idx
            }, vertex))).node)
          }), this
        },
        renderArrowheadMarkers: function() {
          if (!this._V.markerArrowheads) return this;
          var $markerArrowheads = $(this._V.markerArrowheads.node);
          $markerArrowheads.empty();
          var markupTemplate = _.template(this.model.get("arrowheadMarkup") || this.model.arrowheadMarkup);
          return this._V.sourceArrowhead = V(markupTemplate({
            end: "source"
          })), this._V.targetArrowhead = V(markupTemplate({
            end: "target"
          })), $markerArrowheads.append(this._V.sourceArrowhead.node, this._V.targetArrowhead.node), this
        },
        update: function() {
          _.each(this.model.get("attrs"), function(attrs, selector) {
            _.isObject(attrs.filter) ? (this.findBySelector(selector).attr(_.omit(attrs, "filter")), this.applyFilter(selector, attrs.filter)) : this.findBySelector(selector).attr(attrs)
          }, this);
          var vertices = this.route = this.findRoute(this.model.get("vertices") || []);
          this._findConnectionPoints(vertices);
          var pathData = this.getPathData(vertices);
          return this._V.connection.attr("d", pathData), this._V.connectionWrap && this._V.connectionWrap.attr("d", pathData), this._translateAndAutoOrientArrows(this._V.markerSource, this._V.markerTarget), this.updateLabelPositions(), this.updateToolsPosition(), this.updateArrowheadMarkers(), delete this.options.perpendicular, this
        },
        _findConnectionPoints: function(vertices) {
          var sourcePoint, targetPoint, sourceMarkerPoint, targetMarkerPoint, firstVertex = _.first(vertices);
          sourcePoint = this.getConnectionPoint("source", this.model.get("source"), firstVertex || this.model.get("target")).round();
          var lastVertex = _.last(vertices);
          targetPoint = this.getConnectionPoint("target", this.model.get("target"), lastVertex || sourcePoint).round();
          var cache = this._markerCache;
          this._V.markerSource && (cache.sourceBBox = cache.sourceBBox || this._V.markerSource.bbox(!0), sourceMarkerPoint = g.point(sourcePoint).move(firstVertex || targetPoint, cache.sourceBBox.width * this._V.markerSource.scale().sx * -1).round()), this._V.markerTarget && (cache.targetBBox = cache.targetBBox || this._V.markerTarget.bbox(!0), targetMarkerPoint = g.point(targetPoint).move(lastVertex || sourcePoint, cache.targetBBox.width * this._V.markerTarget.scale().sx * -1).round()), cache.sourcePoint = sourceMarkerPoint || sourcePoint, cache.targetPoint = targetMarkerPoint || targetPoint, this.sourcePoint = sourcePoint, this.targetPoint = targetPoint
        },
        updateLabelPositions: function() {
          if (!this._V.labels) return this;
          var labels = this.model.get("labels") || [];
          if (!labels.length) return this;
          var connectionElement = this._V.connection.node,
            connectionLength = connectionElement.getTotalLength();
          return _.each(labels, function(label, idx) {
            var position = label.position;
            position = position > connectionLength ? connectionLength : position, position = 0 > position ? connectionLength + position : position, position = position > 1 ? position : connectionLength * position;
            var labelCoordinates = connectionElement.getPointAtLength(position);
            this._labelCache[idx].attr("transform", "translate(" + labelCoordinates.x + ", " + labelCoordinates.y + ")")
          }, this), this
        },
        updateToolsPosition: function() {
          if (!this._V.linkTools) return this;
          var scale = "",
            offset = 40;
          this.getConnectionLength() < this.options.shortLinkLength && (scale = "scale(.5)", offset /= 2);
          var toolPosition = this.getPointAtLength(offset);
          return this._toolCache.attr("transform", "translate(" + toolPosition.x + ", " + toolPosition.y + ") " + scale), this
        },
        updateArrowheadMarkers: function() {
          if (!this._V.markerArrowheads) return this;
          if ("none" === $.css(this._V.markerArrowheads.node, "display")) return this;
          var sx = this.getConnectionLength() < this.options.shortLinkLength ? .5 : 1;
          return this._V.sourceArrowhead.scale(sx), this._V.targetArrowhead.scale(sx), this._translateAndAutoOrientArrows(this._V.sourceArrowhead, this._V.targetArrowhead), this
        },
        _createWatcher: function(endType) {
          function watchEnd(link, end) {
            end = end || {};
            var previousEnd = link.previous(endType) || {},
              updateEndFunction = this["_" + endType + "BBoxUpdate"];
            return this._isModel(previousEnd) && this.stopListening(this.paper.getModelById(previousEnd.id), "change", updateEndFunction), this._isModel(end) && this.listenTo(this.paper.getModelById(end.id), "change", updateEndFunction), _.bind(updateEndFunction, this)({
              cacheOnly: !0
            }), this
          }
          return watchEnd
        },
        _sourceBBoxUpdate: function(update) {
          this.lastEndChange = "source", update = update || {};
          var end = this.model.get("source");
          if (this._isModel(end)) {
            var selector = this._makeSelector(end),
              view = this.paper.findViewByModel(end.id),
              magnetElement = this.paper.viewport.querySelector(selector);
            this.sourceBBox = view.getStrokeBBox(magnetElement)
          } else this.sourceBBox = g.rect(end.x, end.y, 1, 1);
          update.cacheOnly || this.update()
        },
        _targetBBoxUpdate: function(update) {
          this.lastEndChange = "target", update = update || {};
          var end = this.model.get("target");
          if (this._isModel(end)) {
            var selector = this._makeSelector(end),
              view = this.paper.findViewByModel(end.id),
              magnetElement = this.paper.viewport.querySelector(selector);
            this.targetBBox = view.getStrokeBBox(magnetElement)
          } else this.targetBBox = g.rect(end.x, end.y, 1, 1);
          update.cacheOnly || this.update()
        },
        _translateAndAutoOrientArrows: function(sourceArrow, targetArrow) {
          sourceArrow && sourceArrow.translateAndAutoOrient(this.sourcePoint, _.first(this.route) || this.targetPoint, this.paper.viewport), targetArrow && targetArrow.translateAndAutoOrient(this.targetPoint, _.last(this.route) || this.sourcePoint, this.paper.viewport)
        },
        removeVertex: function(idx) {
          var vertices = _.clone(this.model.get("vertices"));
          return vertices && vertices.length && (vertices.splice(idx, 1), this.model.set("vertices", vertices)), this
        },
        addVertex: function(vertex) {
          this.model.set("attrs", this.model.get("attrs") || {});
          for (var pathLength, vertices = (this.model.get("attrs"), (this.model.get("vertices") || []).slice()), originalVertices = vertices.slice(), path = this._V.connection.node.cloneNode(!1), originalPathLength = path.getTotalLength(), pathLengthTolerance = 20, idx = vertices.length + 1; idx-- && (vertices.splice(idx, 0, vertex), V(path).attr("d", this.getPathData(this.findRoute(vertices))), pathLength = path.getTotalLength(), pathLength - originalPathLength > pathLengthTolerance);) vertices = originalVertices.slice();
          return this.model.set("vertices", vertices), Math.max(idx, 0)
        },
        findRoute: function(oldVertices) {
          var router = this.model.get("router");
          if (!router) {
            if (!this.model.get("manhattan")) return oldVertices;
            router = {
              name: "orthogonal"
            }
          }
          var fn = joint.routers[router.name];
          if (!_.isFunction(fn)) throw "unknown router: " + router.name;
          var newVertices = fn.call(this, oldVertices || [], router.args || {}, this);
          return newVertices
        },
        getPathData: function(vertices) {
          var connector = this.model.get("connector");
          if (connector || (connector = this.model.get("smooth") ? {
            name: "smooth"
          } : {
            name: "normal"
          }), !_.isFunction(joint.connectors[connector.name])) throw "unknown connector: " + connector.name;
          var pathData = joint.connectors[connector.name].call(this, this._markerCache.sourcePoint, this._markerCache.targetPoint, vertices || this.model.get("vertices") || {}, connector.args || {}, this);
          return pathData
        },
        getConnectionPoint: function(end, selectorOrPoint, referenceSelectorOrPoint) {
          var spot;
          if (this._isPoint(selectorOrPoint)) spot = g.point(selectorOrPoint);
          else {
            var reference, spotBbox = "source" === end ? this.sourceBBox : this.targetBBox;
            if (this._isPoint(referenceSelectorOrPoint)) reference = g.point(referenceSelectorOrPoint);
            else {
              var referenceBbox = "source" === end ? this.targetBBox : this.sourceBBox;
              reference = g.rect(referenceBbox).intersectionWithLineFromCenterToPoint(g.rect(spotBbox).center()), reference = reference || g.rect(referenceBbox).center()
            } if (this.paper.options.perpendicularLinks || this.options.perpendicular) {
              var nearestSide, horizontalLineRect = g.rect(0, reference.y, this.paper.options.width, 1),
                verticalLineRect = g.rect(reference.x, 0, 1, this.paper.options.height);
              if (horizontalLineRect.intersect(g.rect(spotBbox))) switch (nearestSide = g.rect(spotBbox).sideNearestToPoint(reference)) {
                case "left":
                  spot = g.point(spotBbox.x, reference.y);
                  break;
                case "right":
                  spot = g.point(spotBbox.x + spotBbox.width, reference.y);
                  break;
                default:
                  spot = g.rect(spotBbox).center()
              } else if (verticalLineRect.intersect(g.rect(spotBbox))) switch (nearestSide = g.rect(spotBbox).sideNearestToPoint(reference)) {
                case "top":
                  spot = g.point(reference.x, spotBbox.y);
                  break;
                case "bottom":
                  spot = g.point(reference.x, spotBbox.y + spotBbox.height);
                  break;
                default:
                  spot = g.rect(spotBbox).center()
              } else spot = g.rect(spotBbox).intersectionWithLineFromCenterToPoint(reference), spot = spot || g.rect(spotBbox).center()
            } else spot = g.rect(spotBbox).intersectionWithLineFromCenterToPoint(reference), spot = spot || g.rect(spotBbox).center()
          }
          return spot
        },
        _isModel: function(end) {
          return end && end.id
        },
        _isPoint: function(end) {
          return !this._isModel(end)
        },
        _makeSelector: function(end) {
          var selector = '[model-id="' + end.id + '"]';
          return end.port ? selector += ' [port="' + end.port + '"]' : end.selector && (selector += " " + end.selector), selector
        },
        getConnectionLength: function() {
          return this._V.connection.node.getTotalLength()
        },
        getPointAtLength: function(length) {
          return this._V.connection.node.getPointAtLength(length)
        },
        _beforeArrowheadMove: function() {
          this.model.trigger("batch:start"), this._z = this.model.get("z"), this.model.set("z", Number.MAX_VALUE), this.el.style.pointerEvents = "none"
        },
        _afterArrowheadMove: function() {
          this._z && (this.model.set("z", this._z), delete this._z), this.el.style.pointerEvents = "visiblePainted", this.model.trigger("batch:stop")
        },
        _createValidateConnectionArgs: function(arrowhead) {
          function validateConnectionArgs(cellView, magnet) {
            return args[j] = cellView, args[j + 1] = cellView.el === magnet ? void 0 : magnet, args
          }
          var args = [];
          args[4] = arrowhead, args[5] = this;
          var oppositeArrowhead, i = 0,
            j = 0;
          "source" === arrowhead ? (i = 2, oppositeArrowhead = "target") : (j = 2, oppositeArrowhead = "source");
          var end = this.model.get(oppositeArrowhead);
          return end.id && (args[i] = this.paper.findViewByModel(end.id), args[i + 1] = end.selector && args[i].el.querySelector(end.selector)), validateConnectionArgs
        },
        startArrowheadMove: function(end) {
          this._action = "arrowhead-move", this._arrowhead = end, this._beforeArrowheadMove(), this._validateConnectionArgs = this._createValidateConnectionArgs(this._arrowhead)
        },
        pointerdown: function(evt, x, y) {
          if (joint.dia.CellView.prototype.pointerdown.apply(this, arguments), this._dx = x, this._dy = y, this.options.interactive !== !1) {
            var className = evt.target.getAttribute("class");
            switch (className) {
              case "marker-vertex":
                this._action = "vertex-move", this._vertexIdx = evt.target.getAttribute("idx");
                break;
              case "marker-vertex-remove":
              case "marker-vertex-remove-area":
                this.removeVertex(evt.target.getAttribute("idx"));
                break;
              case "marker-arrowhead":
                this.startArrowheadMove(evt.target.getAttribute("end"));
                break;
              default:
                var targetParentEvent = evt.target.parentNode.getAttribute("event");
                targetParentEvent ? "remove" === targetParentEvent ? this.model.remove() : this.paper.trigger(targetParentEvent, evt, this, x, y) : (this._vertexIdx = this.addVertex({
                  x: x,
                  y: y
                }), this._action = "vertex-move")
            }
          }
        },
        pointermove: function(evt, x, y) {
          switch (joint.dia.CellView.prototype.pointermove.apply(this, arguments), this._action) {
            case "vertex-move":
              var vertices = _.clone(this.model.get("vertices"));
              vertices[this._vertexIdx] = {
                x: x,
                y: y
              }, this.model.set("vertices", vertices);
              break;
            case "arrowhead-move":
              if (this.paper.options.snapLinks) {
                var r = this.paper.options.snapLinks.radius || 50,
                  viewsInArea = this.paper.findViewsInArea({
                    x: x - r,
                    y: y - r,
                    width: 2 * r,
                    height: 2 * r
                  });
                this._closestView && this._closestView.unhighlight(this._closestEnd.selector), this._closestView = this._closestEnd = null;
                var distance, pointer = g.point(x, y),
                  minDistance = Number.MAX_VALUE;
                _.each(viewsInArea, function(view) {
                  "false" !== view.el.getAttribute("magnet") && (distance = view.model.getBBox().center().distance(pointer), r > distance && minDistance > distance && this.paper.options.validateConnection.apply(this.paper, this._validateConnectionArgs(view, null)) && (minDistance = distance, this._closestView = view, this._closestEnd = {
                    id: view.model.id
                  })), view.$("[magnet]").each(_.bind(function(index, magnet) {
                    var bbox = V(magnet).bbox(!1, this.paper.viewport);
                    distance = pointer.distance({
                      x: bbox.x + bbox.width / 2,
                      y: bbox.y + bbox.height / 2
                    }), r > distance && minDistance > distance && this.paper.options.validateConnection.apply(this.paper, this._validateConnectionArgs(view, magnet)) && (minDistance = distance, this._closestView = view, this._closestEnd = {
                      id: view.model.id,
                      selector: view.getSelector(magnet),
                      port: magnet.getAttribute("port")
                    })
                  }, this))
                }, this), this._closestView && this._closestView.highlight(this._closestEnd.selector), this.model.set(this._arrowhead, this._closestEnd || {
                  x: x,
                  y: y
                })
              } else {
                var target = "mousemove" === evt.type ? evt.target : document.elementFromPoint(evt.clientX, evt.clientY);
                this._targetEvent !== target && (this._magnetUnderPointer && this._viewUnderPointer.unhighlight(this._magnetUnderPointer), this._viewUnderPointer = this.paper.findView(target), this._viewUnderPointer ? (this._magnetUnderPointer = this._viewUnderPointer.findMagnet(target), this._magnetUnderPointer && this.paper.options.validateConnection.apply(this.paper, this._validateConnectionArgs(this._viewUnderPointer, this._magnetUnderPointer)) ? this._magnetUnderPointer && this._viewUnderPointer.highlight(this._magnetUnderPointer) : this._magnetUnderPointer = null) : this._magnetUnderPointer = null), this._targetEvent = target, this.model.set(this._arrowhead, {
                  x: x,
                  y: y
                })
              }
          }
          this._dx = x, this._dy = y
        },
        pointerup: function() {
          joint.dia.CellView.prototype.pointerup.apply(this, arguments), "arrowhead-move" === this._action && (this.paper.options.snapLinks ? (this._closestView && this._closestView.unhighlight(this._closestEnd.selector), this._closestView = this._closestEnd = null) : (this._magnetUnderPointer && (this._viewUnderPointer.unhighlight(this._magnetUnderPointer), this.model.set(this._arrowhead, {
            id: this._viewUnderPointer.model.id,
            selector: this._viewUnderPointer.getSelector(this._magnetUnderPointer),
            port: $(this._magnetUnderPointer).attr("port")
          })), delete this._viewUnderPointer, delete this._magnetUnderPointer, delete this._staticView, delete this._staticMagnet), this._afterArrowheadMove()), delete this._action
        }
      }), "object" == typeof exports && (module.exports.Link = joint.dia.Link, module.exports.LinkView = joint.dia.LinkView)
    }, {
      "./geometry": 24,
      backbone: "pHOy1N",
      lodash: 33
    }
  ],
  k3mQBb: [
    function(require, module) {
      (function(global) {
        (function(module, exports, define, browserify_shim__define__module__export__) {
          global.underscore = require("underscore"),
          function(root, factory) {
            "function" == typeof define && define.amd ? define([], factory) : root.Vectorizer = root.V = factory()
          }(this, function() {
            function uniqueId() {
              var id = ++idCounter + "";
              return "v-" + id
            }

            function createElement(el, attrs, children) {
              if (!el) return void 0;
              if ("object" == typeof el) return new VElement(el);
              if (attrs = attrs || {}, "svg" === el.toLowerCase()) attrs.xmlns = ns.xmlns, attrs["xmlns:xlink"] = ns.xlink, attrs.version = SVGversion;
              else if ("<" === el[0]) {
                var svg = '<svg xmlns="' + ns.xmlns + '" xmlns:xlink="' + ns.xlink + '" version="' + SVGversion + '">' + el + "</svg>",
                  parser = new DOMParser;
                parser.async = !1;
                var svgDoc = parser.parseFromString(svg, "text/xml").documentElement;
                if (svgDoc.childNodes.length > 1) {
                  for (var ret = [], i = 0, len = svgDoc.childNodes.length; len > i; i++) {
                    var childNode = svgDoc.childNodes[i];
                    ret.push(new VElement(document.importNode(childNode, !0)))
                  }
                  return ret
                }
                return new VElement(document.importNode(svgDoc.firstChild, !0))
              }
              el = document.createElementNS(ns.xmlns, el);
              for (var key in attrs) setAttribute(el, key, attrs[key]);
              "[object Array]" != Object.prototype.toString.call(children) && (children = [children]);
              for (var child, i = 0, len = children[0] && children.length || 0; len > i; i++) child = children[i], el.appendChild(child instanceof VElement ? child.node : child);
              return new VElement(el)
            }

            function setAttribute(el, name, value) {
              if (name.indexOf(":") > -1) {
                var combinedKey = name.split(":");
                el.setAttributeNS(ns[combinedKey[0]], combinedKey[1], value)
              } else "id" === name ? el.id = value : el.setAttribute(name, value)
            }

            function parseTransformString(transform) {
              var translate, rotate, scale;
              if (transform) {
                var translateMatch = transform.match(/translate\((.*)\)/);
                translateMatch && (translate = translateMatch[1].split(","));
                var rotateMatch = transform.match(/rotate\((.*)\)/);
                rotateMatch && (rotate = rotateMatch[1].split(","));
                var scaleMatch = transform.match(/scale\((.*)\)/);
                scaleMatch && (scale = scaleMatch[1].split(","))
              }
              var sx = scale && scale[0] ? parseFloat(scale[0]) : 1;
              return {
                translate: {
                  tx: translate && translate[0] ? parseInt(translate[0], 10) : 0,
                  ty: translate && translate[1] ? parseInt(translate[1], 10) : 0
                },
                rotate: {
                  angle: rotate && rotate[0] ? parseInt(rotate[0], 10) : 0,
                  cx: rotate && rotate[1] ? parseInt(rotate[1], 10) : void 0,
                  cy: rotate && rotate[2] ? parseInt(rotate[2], 10) : void 0
                },
                scale: {
                  sx: sx,
                  sy: scale && scale[1] ? parseFloat(scale[1]) : sx
                }
              }
            }

            function deltaTransformPoint(matrix, point) {
              var dx = point.x * matrix.a + point.y * matrix.c + 0,
                dy = point.x * matrix.b + point.y * matrix.d + 0;
              return {
                x: dx,
                y: dy
              }
            }

            function decomposeMatrix(matrix) {
              var px = deltaTransformPoint(matrix, {
                  x: 0,
                  y: 1
                }),
                py = deltaTransformPoint(matrix, {
                  x: 1,
                  y: 0
                }),
                skewX = 180 / Math.PI * Math.atan2(px.y, px.x) - 90,
                skewY = 180 / Math.PI * Math.atan2(py.y, py.x);
              return {
                translateX: matrix.e,
                translateY: matrix.f,
                scaleX: Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b),
                scaleY: Math.sqrt(matrix.c * matrix.c + matrix.d * matrix.d),
                skewX: skewX,
                skewY: skewY,
                rotation: skewX
              }
            }

            function VElement(el) {
              this.node = el, this.node.id || (this.node.id = uniqueId())
            }

            function rectToPath(r) {
              var topRx = r.rx || r["top-rx"] || 0,
                bottomRx = r.rx || r["bottom-rx"] || 0,
                topRy = r.ry || r["top-ry"] || 0,
                bottomRy = r.ry || r["bottom-ry"] || 0;
              return ["M", r.x, r.y + topRy, "v", r.height - topRy - bottomRy, "a", bottomRx, bottomRy, 0, 0, 0, bottomRx, bottomRy, "h", r.width - 2 * bottomRx, "a", bottomRx, bottomRy, 0, 0, 0, bottomRx, -bottomRy, "v", -(r.height - bottomRy - topRy), "a", topRx, topRy, 0, 0, 0, -topRx, -topRy, "h", -(r.width - 2 * topRx), "a", topRx, topRy, 0, 0, 0, -topRx, topRy].join(" ")
            }
            var ns = (!(!window.SVGAngle && !document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")), {
                xmlns: "http://www.w3.org/2000/svg",
                xlink: "http://www.w3.org/1999/xlink"
              }),
              SVGversion = "1.1",
              idCounter = 0;
            VElement.prototype = {
              translate: function(tx, ty) {
                ty = ty || 0;
                var transformAttr = this.attr("transform") || "",
                  transform = parseTransformString(transformAttr);
                if ("undefined" == typeof tx) return transform.translate;
                transformAttr = transformAttr.replace(/translate\([^\)]*\)/g, "").trim();
                var newTx = transform.translate.tx + tx,
                  newTy = transform.translate.ty + ty;
                return this.attr("transform", "translate(" + newTx + "," + newTy + ") " + transformAttr), this
              },
              rotate: function(angle, cx, cy) {
                var transformAttr = this.attr("transform") || "",
                  transform = parseTransformString(transformAttr);
                if ("undefined" == typeof angle) return transform.rotate;
                transformAttr = transformAttr.replace(/rotate\([^\)]*\)/g, "").trim();
                var newAngle = transform.rotate.angle + angle % 360,
                  newOrigin = void 0 !== cx && void 0 !== cy ? "," + cx + "," + cy : "";
                return this.attr("transform", transformAttr + " rotate(" + newAngle + newOrigin + ")"), this
              },
              scale: function(sx, sy) {
                sy = "undefined" == typeof sy ? sx : sy;
                var transformAttr = this.attr("transform") || "",
                  transform = parseTransformString(transformAttr);
                return "undefined" == typeof sx ? transform.scale : (transformAttr = transformAttr.replace(/scale\([^\)]*\)/g, "").trim(), this.attr("transform", transformAttr + " scale(" + sx + "," + sy + ")"), this)
              },
              bbox: function(withoutTransformations, target) {
                if (!this.node.ownerSVGElement) return {
                  x: 0,
                  y: 0,
                  width: 0,
                  height: 0
                };
                var box;
                try {
                  box = this.node.getBBox(), box = {
                    x: 0 | box.x,
                    y: 0 | box.y,
                    width: 0 | box.width,
                    height: 0 | box.height
                  }
                } catch (e) {
                  box = {
                    x: this.node.clientLeft,
                    y: this.node.clientTop,
                    width: this.node.clientWidth,
                    height: this.node.clientHeight
                  }
                }
                if (withoutTransformations) return box;
                var matrix = this.node.getTransformToElement(target || this.node.ownerSVGElement),
                  corners = [],
                  point = this.node.ownerSVGElement.createSVGPoint();
                point.x = box.x, point.y = box.y, corners.push(point.matrixTransform(matrix)), point.x = box.x + box.width, point.y = box.y, corners.push(point.matrixTransform(matrix)), point.x = box.x + box.width, point.y = box.y + box.height, corners.push(point.matrixTransform(matrix)), point.x = box.x, point.y = box.y + box.height, corners.push(point.matrixTransform(matrix));
                for (var minX = corners[0].x, maxX = minX, minY = corners[0].y, maxY = minY, i = 1, len = corners.length; len > i; i++) {
                  var x = corners[i].x,
                    y = corners[i].y;
                  minX > x ? minX = x : x > maxX && (maxX = x), minY > y ? minY = y : y > maxY && (maxY = y)
                }
                return {
                  x: minX,
                  y: minY,
                  width: maxX - minX,
                  height: maxY - minY
                }
              },
              text: function(content) {
                var tspan, lines = content.split("\n"),
                  i = 0;
                if (this.attr("y", "0.8em"), this.attr("display", content ? null : "none"), 1 === lines.length) return this.node.textContent = content, this;
                for (this.node.textContent = ""; i < lines.length; i++) tspan = V("tspan", {
                  dy: 0 == i ? "0em" : "1em",
                  x: this.attr("x") || 0
                }), tspan.node.textContent = lines[i], this.append(tspan);
                return this
              },
              attr: function(name, value) {
                if ("string" == typeof name && "undefined" == typeof value) return this.node.getAttribute(name);
                if ("object" == typeof name)
                  for (var attrName in name) name.hasOwnProperty(attrName) && setAttribute(this.node, attrName, name[attrName]);
                else setAttribute(this.node, name, value);
                return this
              },
              remove: function() {
                this.node.parentNode && this.node.parentNode.removeChild(this.node)
              },
              append: function(el) {
                var els = el;
                "[object Array]" !== Object.prototype.toString.call(el) && (els = [el]);
                for (var i = 0, len = els.length; len > i; i++) el = els[i], this.node.appendChild(el instanceof VElement ? el.node : el);
                return this
              },
              prepend: function(el) {
                this.node.insertBefore(el instanceof VElement ? el.node : el, this.node.firstChild)
              },
              svg: function() {
                return this.node instanceof window.SVGSVGElement ? this : V(this.node.ownerSVGElement)
              },
              defs: function() {
                var defs = this.svg().node.getElementsByTagName("defs");
                return defs && defs.length ? V(defs[0]) : void 0
              },
              clone: function() {
                var clone = V(this.node.cloneNode(!0));
                return clone.node.id = uniqueId(), clone
              },
              findOne: function(selector) {
                var found = this.node.querySelector(selector);
                return found ? V(found) : void 0
              },
              find: function(selector) {
                for (var nodes = this.node.querySelectorAll(selector), i = 0, len = nodes.length; len > i; i++) nodes[i] = V(nodes[i]);
                return nodes
              },
              toLocalPoint: function(x, y) {
                var svg = this.svg().node,
                  p = svg.createSVGPoint();
                p.x = x, p.y = y;
                try {
                  var globalPoint = p.matrixTransform(svg.getScreenCTM().inverse()),
                    globalToLocalMatrix = this.node.getTransformToElement(svg).inverse()
                } catch (e) {
                  return p
                }
                return globalPoint.matrixTransform(globalToLocalMatrix)
              },
              translateCenterToPoint: function(p) {
                var bbox = this.bbox(),
                  center = g.rect(bbox).center();
                this.translate(p.x - center.x, p.y - center.y)
              },
              translateAndAutoOrient: function(position, reference, target) {
                var s = this.scale();
                this.attr("transform", ""), this.scale(s.sx, s.sy);
                var svg = this.svg().node,
                  bbox = this.bbox(!1, target),
                  translateToOrigin = svg.createSVGTransform();
                translateToOrigin.setTranslate(-bbox.x - bbox.width / 2, -bbox.y - bbox.height / 2);
                var rotateAroundOrigin = svg.createSVGTransform(),
                  angle = g.point(position).changeInAngle(position.x - reference.x, position.y - reference.y, reference);
                rotateAroundOrigin.setRotate(angle, 0, 0);
                var translateFinal = svg.createSVGTransform(),
                  finalPosition = g.point(position).move(reference, bbox.width / 2);
                translateFinal.setTranslate(position.x + (position.x - finalPosition.x), position.y + (position.y - finalPosition.y));
                var ctm = this.node.getTransformToElement(target),
                  transform = svg.createSVGTransform();
                transform.setMatrix(translateFinal.matrix.multiply(rotateAroundOrigin.matrix.multiply(translateToOrigin.matrix.multiply(ctm))));
                var decomposition = decomposeMatrix(transform.matrix);
                return this.translate(decomposition.translateX, decomposition.translateY), this.rotate(decomposition.rotation), this
              },
              animateAlongPath: function(attrs, path) {
                var animateMotion = V("animateMotion", attrs),
                  mpath = V("mpath", {
                    "xlink:href": "#" + V(path).node.id
                  });
                animateMotion.append(mpath), this.append(animateMotion);
                try {
                  animateMotion.node.beginElement()
                } catch (e) {
                  if ("fake" === document.documentElement.getAttribute("smiling")) {
                    var animation = animateMotion.node;
                    animation.animators = [];
                    var animationID = animation.getAttribute("id");
                    animationID && (id2anim[animationID] = animation);
                    for (var targets = getTargets(animation), i = 0, len = targets.length; len > i; i++) {
                      var target = targets[i],
                        animator = new Animator(animation, target, i);
                      animators.push(animator), animation.animators[i] = animator, animator.register()
                    }
                  }
                }
              },
              hasClass: function(className) {
                return new RegExp("(\\s|^)" + className + "(\\s|$)").test(this.node.getAttribute("class"))
              },
              addClass: function(className) {
                return this.hasClass(className) || this.node.setAttribute("class", this.node.getAttribute("class") + " " + className), this
              },
              removeClass: function(className) {
                var removedClass = this.node.getAttribute("class").replace(new RegExp("(\\s|^)" + className + "(\\s|$)", "g"), "$2");
                return this.hasClass(className) && this.node.setAttribute("class", removedClass), this
              },
              toggleClass: function(className, toAdd) {
                var toRemove = "undefined" == typeof toAdd ? this.hasClass(className) : !toAdd;
                return toRemove ? this.removeClass(className) : this.addClass(className), this
              }
            };
            var V = createElement;
            V.decomposeMatrix = decomposeMatrix, V.rectToPath = rectToPath;
            var svgDocument = V("svg").node;
            return V.createSVGMatrix = function(m) {
              var svgMatrix = svgDocument.createSVGMatrix();
              for (var component in m) svgMatrix[component] = m[component];
              return svgMatrix
            }, V.createSVGTransform = function() {
              return svgDocument.createSVGTransform()
            }, V.createSVGPoint = function(x, y) {
              var p = svgDocument.createSVGPoint();
              return p.x = x, p.y = y, p
            }, V
          }), browserify_shim__define__module__export__("undefined" != typeof vectorizer ? vectorizer : window.vectorizer)
        }).call(global, void 0, void 0, void 0, function(ex) {
          module.exports = ex
        })
      }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
      underscore: "9eM++n"
    }
  ],
  vectorizer: [
    function(require, module) {
      module.exports = require("k3mQBb")
    }, {}
  ],
  "jquery.sortElements": [
    function(require, module) {
      module.exports = require("fo8krK")
    }, {}
  ],
  fo8krK: [
    function(require, module) {
      (function(global) {
        (function() {
          global.$ = require("jquery"), jQuery.fn.sortElements = function() {
            var sort = [].sort;
            return function(comparator, getSortable) {
              getSortable = getSortable || function() {
                return this
              };
              var placements = this.map(function() {
                var sortElement = getSortable.call(this),
                  parentNode = sortElement.parentNode,
                  nextSibling = parentNode.insertBefore(document.createTextNode(""), sortElement.nextSibling);
                return function() {
                  if (parentNode === this) throw new Error("You can't sort elements if any one is a descendant of another.");
                  parentNode.insertBefore(this, nextSibling), parentNode.removeChild(nextSibling)
                }
              });
              return sort.call(this, comparator).each(function(i) {
                placements[i].call(getSortable.call(this))
              })
            }
          }()
        }).call(global, module, void 0)
      }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
      jquery: "lwLqBl"
    }
  ],
  jquery: [
    function(require, module) {
      module.exports = require("lwLqBl")
    }, {}
  ],
  lwLqBl: [
    function(require, module) {
      (function(global) {
        (function(module, exports, define, browserify_shim__define__module__export__) {
          ! function(global, factory) {
            "object" == typeof module && "object" == typeof module.exports ? module.exports = global.document ? factory(global, !0) : function(w) {
              if (!w.document) throw new Error("jQuery requires a window with a document");
              return factory(w)
            } : factory(global)
          }("undefined" != typeof window ? window : this, function(window, noGlobal) {
            function isArraylike(obj) {
              var length = obj.length,
                type = jQuery.type(obj);
              return "function" === type || jQuery.isWindow(obj) ? !1 : 1 === obj.nodeType && length ? !0 : "array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj
            }

            function winnow(elements, qualifier, not) {
              if (jQuery.isFunction(qualifier)) return jQuery.grep(elements, function(elem, i) {
                return !!qualifier.call(elem, i, elem) !== not
              });
              if (qualifier.nodeType) return jQuery.grep(elements, function(elem) {
                return elem === qualifier !== not
              });
              if ("string" == typeof qualifier) {
                if (risSimple.test(qualifier)) return jQuery.filter(qualifier, elements, not);
                qualifier = jQuery.filter(qualifier, elements)
              }
              return jQuery.grep(elements, function(elem) {
                return indexOf.call(qualifier, elem) >= 0 !== not
              })
            }

            function sibling(cur, dir) {
              for (;
                (cur = cur[dir]) && 1 !== cur.nodeType;);
              return cur
            }

            function createOptions(options) {
              var object = optionsCache[options] = {};
              return jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
                object[flag] = !0
              }), object
            }

            function completed() {
              document.removeEventListener("DOMContentLoaded", completed, !1), window.removeEventListener("load", completed, !1), jQuery.ready()
            }

            function Data() {
              Object.defineProperty(this.cache = {}, 0, {
                get: function() {
                  return {}
                }
              }), this.expando = jQuery.expando + Math.random()
            }

            function dataAttr(elem, key, data) {
              var name;
              if (void 0 === data && 1 === elem.nodeType)
                if (name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase(), data = elem.getAttribute(name), "string" == typeof data) {
                  try {
                    data = "true" === data ? !0 : "false" === data ? !1 : "null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data
                  } catch (e) {}
                  data_user.set(elem, key, data)
                } else data = void 0;
              return data
            }

            function returnTrue() {
              return !0
            }

            function returnFalse() {
              return !1
            }

            function safeActiveElement() {
              try {
                return document.activeElement
              } catch (err) {}
            }

            function manipulationTarget(elem, content) {
              return jQuery.nodeName(elem, "table") && jQuery.nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem
            }

            function disableScript(elem) {
              return elem.type = (null !== elem.getAttribute("type")) + "/" + elem.type, elem
            }

            function restoreScript(elem) {
              var match = rscriptTypeMasked.exec(elem.type);
              return match ? elem.type = match[1] : elem.removeAttribute("type"), elem
            }

            function setGlobalEval(elems, refElements) {
              for (var i = 0, l = elems.length; l > i; i++) data_priv.set(elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval"))
            }

            function cloneCopyEvent(src, dest) {
              var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
              if (1 === dest.nodeType) {
                if (data_priv.hasData(src) && (pdataOld = data_priv.access(src), pdataCur = data_priv.set(dest, pdataOld), events = pdataOld.events)) {
                  delete pdataCur.handle, pdataCur.events = {};
                  for (type in events)
                    for (i = 0, l = events[type].length; l > i; i++) jQuery.event.add(dest, type, events[type][i])
                }
                data_user.hasData(src) && (udataOld = data_user.access(src), udataCur = jQuery.extend({}, udataOld), data_user.set(dest, udataCur))
              }
            }

            function getAll(context, tag) {
              var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];
              return void 0 === tag || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret
            }

            function fixInput(src, dest) {
              var nodeName = dest.nodeName.toLowerCase();
              "input" === nodeName && rcheckableType.test(src.type) ? dest.checked = src.checked : ("input" === nodeName || "textarea" === nodeName) && (dest.defaultValue = src.defaultValue)
            }

            function actualDisplay(name, doc) {
              var style, elem = jQuery(doc.createElement(name)).appendTo(doc.body),
                display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? style.display : jQuery.css(elem[0], "display");
              return elem.detach(), display
            }

            function defaultDisplay(nodeName) {
              var doc = document,
                display = elemdisplay[nodeName];
              return display || (display = actualDisplay(nodeName, doc), "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement), doc = iframe[0].contentDocument, doc.write(), doc.close(), display = actualDisplay(nodeName, doc), iframe.detach()), elemdisplay[nodeName] = display), display
            }

            function curCSS(elem, name, computed) {
              var width, minWidth, maxWidth, ret, style = elem.style;
              return computed = computed || getStyles(elem), computed && (ret = computed.getPropertyValue(name) || computed[name]), computed && ("" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), void 0 !== ret ? ret + "" : ret
            }

            function addGetHookIf(conditionFn, hookFn) {
              return {
                get: function() {
                  return conditionFn() ? void delete this.get : (this.get = hookFn).apply(this, arguments)
                }
              }
            }

            function vendorPropName(style, name) {
              if (name in style) return name;
              for (var capName = name[0].toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length; i--;)
                if (name = cssPrefixes[i] + capName, name in style) return name;
              return origName
            }

            function setPositiveNumber(elem, value, subtract) {
              var matches = rnumsplit.exec(value);
              return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value
            }

            function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
              for (var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; 4 > i; i += 2) "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)), isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)), "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles), "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
              return val
            }

            function getWidthOrHeight(elem, name, extra) {
              var valueIsBorderBox = !0,
                val = "width" === name ? elem.offsetWidth : elem.offsetHeight,
                styles = getStyles(elem),
                isBorderBox = "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
              if (0 >= val || null == val) {
                if (val = curCSS(elem, name, styles), (0 > val || null == val) && (val = elem.style[name]), rnumnonpx.test(val)) return val;
                valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]), val = parseFloat(val) || 0
              }
              return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px"
            }

            function showHide(elements, show) {
              for (var display, elem, hidden, values = [], index = 0, length = elements.length; length > index; index++) elem = elements[index], elem.style && (values[index] = data_priv.get(elem, "olddisplay"), display = elem.style.display, show ? (values[index] || "none" !== display || (elem.style.display = ""), "" === elem.style.display && isHidden(elem) && (values[index] = data_priv.access(elem, "olddisplay", defaultDisplay(elem.nodeName)))) : (hidden = isHidden(elem), "none" === display && hidden || data_priv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))));
              for (index = 0; length > index; index++) elem = elements[index], elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
              return elements
            }

            function Tween(elem, options, prop, end, easing) {
              return new Tween.prototype.init(elem, options, prop, end, easing)
            }

            function createFxNow() {
              return setTimeout(function() {
                fxNow = void 0
              }), fxNow = jQuery.now()
            }

            function genFx(type, includeWidth) {
              var which, i = 0,
                attrs = {
                  height: type
                };
              for (includeWidth = includeWidth ? 1 : 0; 4 > i; i += 2 - includeWidth) which = cssExpand[i], attrs["margin" + which] = attrs["padding" + which] = type;
              return includeWidth && (attrs.opacity = attrs.width = type), attrs
            }

            function createTween(value, prop, animation) {
              for (var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length; length > index; index++)
                if (tween = collection[index].call(animation, prop, value)) return tween
            }

            function defaultPrefilter(elem, props, opts) {
              var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this,
                orig = {},
                style = elem.style,
                hidden = elem.nodeType && isHidden(elem),
                dataShow = data_priv.get(elem, "fxshow");
              opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, oldfire = hooks.empty.fire, hooks.empty.fire = function() {
                hooks.unqueued || oldfire()
              }), hooks.unqueued++, anim.always(function() {
                anim.always(function() {
                  hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire()
                })
              })), 1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [style.overflow, style.overflowX, style.overflowY], display = jQuery.css(elem, "display"), checkDisplay = "none" === display ? data_priv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display, "inline" === checkDisplay && "none" === jQuery.css(elem, "float") && (style.display = "inline-block")), opts.overflow && (style.overflow = "hidden", anim.always(function() {
                style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2]
              }));
              for (prop in props)
                if (value = props[prop], rfxtypes.exec(value)) {
                  if (delete props[prop], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show")) {
                    if ("show" !== value || !dataShow || void 0 === dataShow[prop]) continue;
                    hidden = !0
                  }
                  orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop)
                } else display = void 0;
              if (jQuery.isEmptyObject(orig)) "inline" === ("none" === display ? defaultDisplay(elem.nodeName) : display) && (style.display = display);
              else {
                dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = data_priv.access(elem, "fxshow", {}), toggle && (dataShow.hidden = !hidden), hidden ? jQuery(elem).show() : anim.done(function() {
                  jQuery(elem).hide()
                }), anim.done(function() {
                  var prop;
                  data_priv.remove(elem, "fxshow");
                  for (prop in orig) jQuery.style(elem, prop, orig[prop])
                });
                for (prop in orig) tween = createTween(hidden ? dataShow[prop] : 0, prop, anim), prop in dataShow || (dataShow[prop] = tween.start, hidden && (tween.end = tween.start, tween.start = "width" === prop || "height" === prop ? 1 : 0))
              }
            }

            function propFilter(props, specialEasing) {
              var index, name, easing, value, hooks;
              for (index in props)
                if (name = jQuery.camelCase(index), easing = specialEasing[name], value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], hooks && "expand" in hooks) {
                  value = hooks.expand(value), delete props[name];
                  for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing)
                } else specialEasing[name] = easing
            }

            function Animation(elem, properties, options) {
              var result, stopped, index = 0,
                length = animationPrefilters.length,
                deferred = jQuery.Deferred().always(function() {
                  delete tick.elem
                }),
                tick = function() {
                  if (stopped) return !1;
                  for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; length > index; index++) animation.tweens[index].run(percent);
                  return deferred.notifyWith(elem, [animation, percent, remaining]), 1 > percent && length ? remaining : (deferred.resolveWith(elem, [animation]), !1)
                },
                animation = deferred.promise({
                  elem: elem,
                  props: jQuery.extend({}, properties),
                  opts: jQuery.extend(!0, {
                    specialEasing: {}
                  }, options),
                  originalProperties: properties,
                  originalOptions: options,
                  startTime: fxNow || createFxNow(),
                  duration: options.duration,
                  tweens: [],
                  createTween: function(prop, end) {
                    var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                    return animation.tweens.push(tween), tween
                  },
                  stop: function(gotoEnd) {
                    var index = 0,
                      length = gotoEnd ? animation.tweens.length : 0;
                    if (stopped) return this;
                    for (stopped = !0; length > index; index++) animation.tweens[index].run(1);
                    return gotoEnd ? deferred.resolveWith(elem, [animation, gotoEnd]) : deferred.rejectWith(elem, [animation, gotoEnd]), this
                  }
                }),
                props = animation.props;
              for (propFilter(props, animation.opts.specialEasing); length > index; index++)
                if (result = animationPrefilters[index].call(animation, elem, props, animation.opts)) return result;
              return jQuery.map(props, createTween, animation), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), jQuery.fx.timer(jQuery.extend(tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue
              })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
            }

            function addToPrefiltersOrTransports(structure) {
              return function(dataTypeExpression, func) {
                "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
                var dataType, i = 0,
                  dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
                if (jQuery.isFunction(func))
                  for (; dataType = dataTypes[i++];) "+" === dataType[0] ? (dataType = dataType.slice(1) || "*", (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func)
              }
            }

            function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
              function inspect(dataType) {
                var selected;
                return inspected[dataType] = !0, jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                  var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                  return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), inspect(dataTypeOrTransport), !1)
                }), selected
              }
              var inspected = {},
                seekingTransport = structure === transports;
              return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*")
            }

            function ajaxExtend(target, src) {
              var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
              for (key in src) void 0 !== src[key] && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
              return deep && jQuery.extend(!0, target, deep), target
            }

            function ajaxHandleResponses(s, jqXHR, responses) {
              for (var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
                "*" === dataTypes[0];) dataTypes.shift(), void 0 === ct && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
              if (ct)
                for (type in contents)
                  if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break
                  }
              if (dataTypes[0] in responses) finalDataType = dataTypes[0];
              else {
                for (type in responses) {
                  if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break
                  }
                  firstDataType || (firstDataType = type)
                }
                finalDataType = finalDataType || firstDataType
              }
              return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), responses[finalDataType]) : void 0
            }

            function ajaxConvert(s, response, jqXHR, isSuccess) {
              var conv2, current, conv, tmp, prev, converters = {},
                dataTypes = s.dataTypes.slice();
              if (dataTypes[1])
                for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
              for (current = dataTypes.shift(); current;)
                if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), prev = current, current = dataTypes.shift())
                  if ("*" === current) current = prev;
                  else if ("*" !== prev && prev !== current) {
                if (conv = converters[prev + " " + current] || converters["* " + current], !conv)
                  for (conv2 in converters)
                    if (tmp = conv2.split(" "), tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                      conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], dataTypes.unshift(tmp[1]));
                      break
                    }
                if (conv !== !0)
                  if (conv && s["throws"]) response = conv(response);
                  else try {
                    response = conv(response)
                  } catch (e) {
                    return {
                      state: "parsererror",
                      error: conv ? e : "No conversion from " + prev + " to " + current
                    }
                  }
              }
              return {
                state: "success",
                data: response
              }
            }

            function buildParams(prefix, obj, traditional, add) {
              var name;
              if (jQuery.isArray(obj)) jQuery.each(obj, function(i, v) {
                traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v ? i : "") + "]", v, traditional, add)
              });
              else if (traditional || "object" !== jQuery.type(obj)) add(prefix, obj);
              else
                for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
            }

            function getWindow(elem) {
              return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType && elem.defaultView
            }
            var arr = [],
              slice = arr.slice,
              concat = arr.concat,
              push = arr.push,
              indexOf = arr.indexOf,
              class2type = {},
              toString = class2type.toString,
              hasOwn = class2type.hasOwnProperty,
              support = {},
              document = window.document,
              version = "2.1.1",
              jQuery = function(selector, context) {
                return new jQuery.fn.init(selector, context)
              },
              rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
              rmsPrefix = /^-ms-/,
              rdashAlpha = /-([\da-z])/gi,
              fcamelCase = function(all, letter) {
                return letter.toUpperCase()
              };
            jQuery.fn = jQuery.prototype = {
              jquery: version,
              constructor: jQuery,
              selector: "",
              length: 0,
              toArray: function() {
                return slice.call(this)
              },
              get: function(num) {
                return null != num ? 0 > num ? this[num + this.length] : this[num] : slice.call(this)
              },
              pushStack: function(elems) {
                var ret = jQuery.merge(this.constructor(), elems);
                return ret.prevObject = this, ret.context = this.context, ret
              },
              each: function(callback, args) {
                return jQuery.each(this, callback, args)
              },
              map: function(callback) {
                return this.pushStack(jQuery.map(this, function(elem, i) {
                  return callback.call(elem, i, elem)
                }))
              },
              slice: function() {
                return this.pushStack(slice.apply(this, arguments))
              },
              first: function() {
                return this.eq(0)
              },
              last: function() {
                return this.eq(-1)
              },
              eq: function(i) {
                var len = this.length,
                  j = +i + (0 > i ? len : 0);
                return this.pushStack(j >= 0 && len > j ? [this[j]] : [])
              },
              end: function() {
                return this.prevObject || this.constructor(null)
              },
              push: push,
              sort: arr.sort,
              splice: arr.splice
            }, jQuery.extend = jQuery.fn.extend = function() {
              var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = !1;
              for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, i++), "object" == typeof target || jQuery.isFunction(target) || (target = {}), i === length && (target = this, i--); length > i; i++)
                if (null != (options = arguments[i]))
                  for (name in options) src = target[name], copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, target[name] = jQuery.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
              return target
            }, jQuery.extend({
              expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
              isReady: !0,
              error: function(msg) {
                throw new Error(msg)
              },
              noop: function() {},
              isFunction: function(obj) {
                return "function" === jQuery.type(obj)
              },
              isArray: Array.isArray,
              isWindow: function(obj) {
                return null != obj && obj === obj.window
              },
              isNumeric: function(obj) {
                return !jQuery.isArray(obj) && obj - parseFloat(obj) >= 0
              },
              isPlainObject: function(obj) {
                return "object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj) ? !1 : obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ? !1 : !0
              },
              isEmptyObject: function(obj) {
                var name;
                for (name in obj) return !1;
                return !0
              },
              type: function(obj) {
                return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj
              },
              globalEval: function(code) {
                var script, indirect = eval;
                code = jQuery.trim(code), code && (1 === code.indexOf("use strict") ? (script = document.createElement("script"), script.text = code, document.head.appendChild(script).parentNode.removeChild(script)) : indirect(code))
              },
              camelCase: function(string) {
                return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
              },
              nodeName: function(elem, name) {
                return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
              },
              each: function(obj, callback, args) {
                var value, i = 0,
                  length = obj.length,
                  isArray = isArraylike(obj);
                if (args) {
                  if (isArray)
                    for (; length > i && (value = callback.apply(obj[i], args), value !== !1); i++);
                  else
                    for (i in obj)
                      if (value = callback.apply(obj[i], args), value === !1) break
                } else if (isArray)
                  for (; length > i && (value = callback.call(obj[i], i, obj[i]), value !== !1); i++);
                else
                  for (i in obj)
                    if (value = callback.call(obj[i], i, obj[i]), value === !1) break; return obj
              },
              trim: function(text) {
                return null == text ? "" : (text + "").replace(rtrim, "")
              },
              makeArray: function(arr, results) {
                var ret = results || [];
                return null != arr && (isArraylike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [arr] : arr) : push.call(ret, arr)), ret
              },
              inArray: function(elem, arr, i) {
                return null == arr ? -1 : indexOf.call(arr, elem, i)
              },
              merge: function(first, second) {
                for (var len = +second.length, j = 0, i = first.length; len > j; j++) first[i++] = second[j];
                return first.length = i, first
              },
              grep: function(elems, callback, invert) {
                for (var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert; length > i; i++) callbackInverse = !callback(elems[i], i), callbackInverse !== callbackExpect && matches.push(elems[i]);
                return matches
              },
              map: function(elems, callback, arg) {
                var value, i = 0,
                  length = elems.length,
                  isArray = isArraylike(elems),
                  ret = [];
                if (isArray)
                  for (; length > i; i++) value = callback(elems[i], i, arg), null != value && ret.push(value);
                else
                  for (i in elems) value = callback(elems[i], i, arg), null != value && ret.push(value);
                return concat.apply([], ret)
              },
              guid: 1,
              proxy: function(fn, context) {
                var tmp, args, proxy;
                return "string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), jQuery.isFunction(fn) ? (args = slice.call(arguments, 2), proxy = function() {
                  return fn.apply(context || this, args.concat(slice.call(arguments)))
                }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy) : void 0
              },
              now: Date.now,
              support: support
            }), jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
              class2type["[object " + name + "]"] = name.toLowerCase()
            });
            var Sizzle = function(window) {
              function Sizzle(selector, context, results, seed) {
                var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
                if ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), context = context || document, results = results || [], !selector || "string" != typeof selector) return results;
                if (1 !== (nodeType = context.nodeType) && 9 !== nodeType) return [];
                if (documentIsHTML && !seed) {
                  if (match = rquickExpr.exec(selector))
                    if (m = match[1]) {
                      if (9 === nodeType) {
                        if (elem = context.getElementById(m), !elem || !elem.parentNode) return results;
                        if (elem.id === m) return results.push(elem), results
                      } else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), results
                    } else {
                      if (match[2]) return push.apply(results, context.getElementsByTagName(selector)), results;
                      if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) return push.apply(results, context.getElementsByClassName(m)), results
                    }
                  if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    if (nid = old = expando, newContext = context, newSelector = 9 === nodeType && selector, 1 === nodeType && "object" !== context.nodeName.toLowerCase()) {
                      for (groups = tokenize(selector), (old = context.getAttribute("id")) ? nid = old.replace(rescape, "\\$&") : context.setAttribute("id", nid), nid = "[id='" + nid + "'] ", i = groups.length; i--;) groups[i] = nid + toSelector(groups[i]);
                      newContext = rsibling.test(selector) && testContext(context.parentNode) || context, newSelector = groups.join(",")
                    }
                    if (newSelector) try {
                      return push.apply(results, newContext.querySelectorAll(newSelector)), results
                    } catch (qsaError) {} finally {
                      old || context.removeAttribute("id")
                    }
                  }
                }
                return select(selector.replace(rtrim, "$1"), context, results, seed)
              }

              function createCache() {
                function cache(key, value) {
                  return keys.push(key + " ") > Expr.cacheLength && delete cache[keys.shift()], cache[key + " "] = value
                }
                var keys = [];
                return cache
              }

              function markFunction(fn) {
                return fn[expando] = !0, fn
              }

              function assert(fn) {
                var div = document.createElement("div");
                try {
                  return !!fn(div)
                } catch (e) {
                  return !1
                } finally {
                  div.parentNode && div.parentNode.removeChild(div), div = null
                }
              }

              function addHandle(attrs, handler) {
                for (var arr = attrs.split("|"), i = attrs.length; i--;) Expr.attrHandle[arr[i]] = handler
              }

              function siblingCheck(a, b) {
                var cur = b && a,
                  diff = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
                if (diff) return diff;
                if (cur)
                  for (; cur = cur.nextSibling;)
                    if (cur === b) return -1;
                return a ? 1 : -1
              }

              function createInputPseudo(type) {
                return function(elem) {
                  var name = elem.nodeName.toLowerCase();
                  return "input" === name && elem.type === type
                }
              }

              function createButtonPseudo(type) {
                return function(elem) {
                  var name = elem.nodeName.toLowerCase();
                  return ("input" === name || "button" === name) && elem.type === type
                }
              }

              function createPositionalPseudo(fn) {
                return markFunction(function(argument) {
                  return argument = +argument, markFunction(function(seed, matches) {
                    for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--;) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]))
                  })
                })
              }

              function testContext(context) {
                return context && typeof context.getElementsByTagName !== strundefined && context
              }

              function setFilters() {}

              function toSelector(tokens) {
                for (var i = 0, len = tokens.length, selector = ""; len > i; i++) selector += tokens[i].value;
                return selector
              }

              function addCombinator(matcher, combinator, base) {
                var dir = combinator.dir,
                  checkNonElements = base && "parentNode" === dir,
                  doneName = done++;
                return combinator.first ? function(elem, context, xml) {
                  for (; elem = elem[dir];)
                    if (1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml)
                } : function(elem, context, xml) {
                  var oldCache, outerCache, newCache = [dirruns, doneName];
                  if (xml) {
                    for (; elem = elem[dir];)
                      if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) return !0
                  } else
                    for (; elem = elem[dir];)
                      if (1 === elem.nodeType || checkNonElements) {
                        if (outerCache = elem[expando] || (elem[expando] = {}), (oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) return newCache[2] = oldCache[2];
                        if (outerCache[dir] = newCache, newCache[2] = matcher(elem, context, xml)) return !0
                      }
                }
              }

              function elementMatcher(matchers) {
                return matchers.length > 1 ? function(elem, context, xml) {
                  for (var i = matchers.length; i--;)
                    if (!matchers[i](elem, context, xml)) return !1;
                  return !0
                } : matchers[0]
              }

              function multipleContexts(selector, contexts, results) {
                for (var i = 0, len = contexts.length; len > i; i++) Sizzle(selector, contexts[i], results);
                return results
              }

              function condense(unmatched, map, filter, context, xml) {
                for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; len > i; i++)(elem = unmatched[i]) && (!filter || filter(elem, context, xml)) && (newUnmatched.push(elem), mapped && map.push(i));
                return newUnmatched
              }

              function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), markFunction(function(seed, results, context, xml) {
                  var temp, i, elem, preMap = [],
                    postMap = [],
                    preexisting = results.length,
                    elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
                    matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml),
                    matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                  if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter)
                    for (temp = condense(matcherOut, postMap), postFilter(temp, [], context, xml), i = temp.length; i--;)(elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                  if (seed) {
                    if (postFinder || preFilter) {
                      if (postFinder) {
                        for (temp = [], i = matcherOut.length; i--;)(elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                        postFinder(null, matcherOut = [], temp, xml)
                      }
                      for (i = matcherOut.length; i--;)(elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem))
                    }
                  } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut)
                })
              }

              function matcherFromTokens(tokens) {
                for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                  return elem === checkContext
                }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                  return indexOf.call(checkContext, elem) > -1
                }, implicitRelative, !0), matchers = [
                  function(elem, context, xml) {
                    return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml))
                  }
                ]; len > i; i++)
                  if (matcher = Expr.relative[tokens[i].type]) matchers = [addCombinator(elementMatcher(matchers), matcher)];
                  else {
                    if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                      for (j = ++i; len > j && !Expr.relative[tokens[j].type]; j++);
                      return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                        value: " " === tokens[i - 2].type ? "*" : ""
                      })).replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), len > j && matcherFromTokens(tokens = tokens.slice(j)), len > j && toSelector(tokens))
                    }
                    matchers.push(matcher)
                  }
                return elementMatcher(matchers)
              }

              function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                var bySet = setMatchers.length > 0,
                  byElement = elementMatchers.length > 0,
                  superMatcher = function(seed, context, xml, results, outermost) {
                    var elem, j, matcher, matchedCount = 0,
                      i = "0",
                      unmatched = seed && [],
                      setMatched = [],
                      contextBackup = outermostContext,
                      elems = seed || byElement && Expr.find.TAG("*", outermost),
                      dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1,
                      len = elems.length;
                    for (outermost && (outermostContext = context !== document && context); i !== len && null != (elem = elems[i]); i++) {
                      if (byElement && elem) {
                        for (j = 0; matcher = elementMatchers[j++];)
                          if (matcher(elem, context, xml)) {
                            results.push(elem);
                            break
                          }
                        outermost && (dirruns = dirrunsUnique)
                      }
                      bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem))
                    }
                    if (matchedCount += i, bySet && i !== matchedCount) {
                      for (j = 0; matcher = setMatchers[j++];) matcher(unmatched, setMatched, context, xml);
                      if (seed) {
                        if (matchedCount > 0)
                          for (; i--;) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                        setMatched = condense(setMatched)
                      }
                      push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results)
                    }
                    return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), unmatched
                  };
                return bySet ? markFunction(superMatcher) : superMatcher
              }
              var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + -new Date,
                preferredDoc = window.document,
                dirruns = 0,
                done = 0,
                classCache = createCache(),
                tokenCache = createCache(),
                compilerCache = createCache(),
                sortOrder = function(a, b) {
                  return a === b && (hasDuplicate = !0), 0
                },
                strundefined = "undefined",
                MAX_NEGATIVE = 1 << 31,
                hasOwn = {}.hasOwnProperty,
                arr = [],
                pop = arr.pop,
                push_native = arr.push,
                push = arr.push,
                slice = arr.slice,
                indexOf = arr.indexOf || function(elem) {
                  for (var i = 0, len = this.length; len > i; i++)
                    if (this[i] === elem) return i;
                  return -1
                },
                booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                whitespace = "[\\x20\\t\\r\\n\\f]",
                characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                identifier = characterEncoding.replace("w", "w#"),
                attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
                pseudos = ":(" + characterEncoding + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|.*)\\)|)",
                rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
                rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
                rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
                rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
                rpseudo = new RegExp(pseudos),
                ridentifier = new RegExp("^" + identifier + "$"),
                matchExpr = {
                  ID: new RegExp("^#(" + characterEncoding + ")"),
                  CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
                  TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
                  ATTR: new RegExp("^" + attributes),
                  PSEUDO: new RegExp("^" + pseudos),
                  CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                  bool: new RegExp("^(?:" + booleans + ")$", "i"),
                  needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
                },
                rinputs = /^(?:input|select|textarea|button)$/i,
                rheader = /^h\d$/i,
                rnative = /^[^{]+\{\s*\[native \w/,
                rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                rsibling = /[+~]/,
                rescape = /'|\\/g,
                runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
                funescape = function(_, escaped, escapedWhitespace) {
                  var high = "0x" + escaped - 65536;
                  return high !== high || escapedWhitespace ? escaped : 0 > high ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320)
                };
              try {
                push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes), arr[preferredDoc.childNodes.length].nodeType
              } catch (e) {
                push = {
                  apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els))
                  } : function(target, els) {
                    for (var j = target.length, i = 0; target[j++] = els[i++];);
                    target.length = j - 1
                  }
                }
              }
              support = Sizzle.support = {}, isXML = Sizzle.isXML = function(elem) {
                var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                return documentElement ? "HTML" !== documentElement.nodeName : !1
              }, setDocument = Sizzle.setDocument = function(node) {
                var hasCompare, doc = node ? node.ownerDocument || node : preferredDoc,
                  parent = doc.defaultView;
                return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, docElem = doc.documentElement, documentIsHTML = !isXML(doc), parent && parent !== parent.top && (parent.addEventListener ? parent.addEventListener("unload", function() {
                  setDocument()
                }, !1) : parent.attachEvent && parent.attachEvent("onunload", function() {
                  setDocument()
                })), support.attributes = assert(function(div) {
                  return div.className = "i", !div.getAttribute("className")
                }), support.getElementsByTagName = assert(function(div) {
                  return div.appendChild(doc.createComment("")), !div.getElementsByTagName("*").length
                }), support.getElementsByClassName = rnative.test(doc.getElementsByClassName) && assert(function(div) {
                  return div.innerHTML = "<div class='a'></div><div class='a i'></div>", div.firstChild.className = "i", 2 === div.getElementsByClassName("i").length
                }), support.getById = assert(function(div) {
                  return docElem.appendChild(div).id = expando, !doc.getElementsByName || !doc.getElementsByName(expando).length
                }), support.getById ? (Expr.find.ID = function(id, context) {
                  if (typeof context.getElementById !== strundefined && documentIsHTML) {
                    var m = context.getElementById(id);
                    return m && m.parentNode ? [m] : []
                  }
                }, Expr.filter.ID = function(id) {
                  var attrId = id.replace(runescape, funescape);
                  return function(elem) {
                    return elem.getAttribute("id") === attrId
                  }
                }) : (delete Expr.find.ID, Expr.filter.ID = function(id) {
                  var attrId = id.replace(runescape, funescape);
                  return function(elem) {
                    var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                    return node && node.value === attrId
                  }
                }), Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                  return typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag) : void 0
                } : function(tag, context) {
                  var elem, tmp = [],
                    i = 0,
                    results = context.getElementsByTagName(tag);
                  if ("*" === tag) {
                    for (; elem = results[i++];) 1 === elem.nodeType && tmp.push(elem);
                    return tmp
                  }
                  return results
                }, Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                  return typeof context.getElementsByClassName !== strundefined && documentIsHTML ? context.getElementsByClassName(className) : void 0
                }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(doc.querySelectorAll)) && (assert(function(div) {
                  div.innerHTML = "<select msallowclip=''><option selected=''></option></select>", div.querySelectorAll("[msallowclip^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"), div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"), div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked")
                }), assert(function(div) {
                  var input = doc.createElement("input");
                  input.setAttribute("type", "hidden"), div.appendChild(input).setAttribute("name", "D"), div.querySelectorAll("[name=d]").length && rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?="), div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled"), div.querySelectorAll("*,:x"), rbuggyQSA.push(",.*:")
                })), (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(div) {
                  support.disconnectedMatch = matches.call(div, "div"), matches.call(div, "[s!='']:x"), rbuggyMatches.push("!=", pseudos)
                }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), hasCompare = rnative.test(docElem.compareDocumentPosition), contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                  var adown = 9 === a.nodeType ? a.documentElement : a,
                    bup = b && b.parentNode;
                  return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)))
                } : function(a, b) {
                  if (b)
                    for (; b = b.parentNode;)
                      if (b === a) return !0;
                  return !1
                }, sortOrder = hasCompare ? function(a, b) {
                  if (a === b) return hasDuplicate = !0, 0;
                  var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                  return compare ? compare : (compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0 : 4 & compare ? -1 : 1)
                } : function(a, b) {
                  if (a === b) return hasDuplicate = !0, 0;
                  var cur, i = 0,
                    aup = a.parentNode,
                    bup = b.parentNode,
                    ap = [a],
                    bp = [b];
                  if (!aup || !bup) return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
                  if (aup === bup) return siblingCheck(a, b);
                  for (cur = a; cur = cur.parentNode;) ap.unshift(cur);
                  for (cur = b; cur = cur.parentNode;) bp.unshift(cur);
                  for (; ap[i] === bp[i];) i++;
                  return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0
                }, doc) : document
              }, Sizzle.matches = function(expr, elements) {
                return Sizzle(expr, null, null, elements)
              }, Sizzle.matchesSelector = function(elem, expr) {
                if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), !(!support.matchesSelector || !documentIsHTML || rbuggyMatches && rbuggyMatches.test(expr) || rbuggyQSA && rbuggyQSA.test(expr))) try {
                  var ret = matches.call(elem, expr);
                  if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret
                } catch (e) {}
                return Sizzle(expr, document, null, [elem]).length > 0
              }, Sizzle.contains = function(context, elem) {
                return (context.ownerDocument || context) !== document && setDocument(context), contains(context, elem)
              }, Sizzle.attr = function(elem, name) {
                (elem.ownerDocument || elem) !== document && setDocument(elem);
                var fn = Expr.attrHandle[name.toLowerCase()],
                  val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
                return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
              }, Sizzle.error = function(msg) {
                throw new Error("Syntax error, unrecognized expression: " + msg)
              }, Sizzle.uniqueSort = function(results) {
                var elem, duplicates = [],
                  j = 0,
                  i = 0;
                if (hasDuplicate = !support.detectDuplicates, sortInput = !support.sortStable && results.slice(0), results.sort(sortOrder), hasDuplicate) {
                  for (; elem = results[i++];) elem === results[i] && (j = duplicates.push(i));
                  for (; j--;) results.splice(duplicates[j], 1)
                }
                return sortInput = null, results
              }, getText = Sizzle.getText = function(elem) {
                var node, ret = "",
                  i = 0,
                  nodeType = elem.nodeType;
                if (nodeType) {
                  if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                    if ("string" == typeof elem.textContent) return elem.textContent;
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem)
                  } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue
                } else
                  for (; node = elem[i++];) ret += getText(node);
                return ret
              }, Expr = Sizzle.selectors = {
                cacheLength: 50,
                createPseudo: markFunction,
                match: matchExpr,
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
                  ATTR: function(match) {
                    return match[1] = match[1].replace(runescape, funescape), match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape), "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4)
                  },
                  CHILD: function(match) {
                    return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), match
                  },
                  PSEUDO: function(match) {
                    var excess, unquoted = !match[6] && match[2];
                    return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[4] || match[5] || "" : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), match[2] = unquoted.slice(0, excess)), match.slice(0, 3))
                  }
                },
                filter: {
                  TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return "*" === nodeNameSelector ? function() {
                      return !0
                    } : function(elem) {
                      return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
                    }
                  },
                  CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                      return pattern.test("string" == typeof elem.className && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "")
                    })
                  },
                  ATTR: function(name, operator, check) {
                    return function(elem) {
                      var result = Sizzle.attr(elem, name);
                      return null == result ? "!=" === operator : operator ? (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result + " ").indexOf(check) > -1 : "|=" === operator ? result === check || result.slice(0, check.length + 1) === check + "-" : !1) : !0
                    }
                  },
                  CHILD: function(type, what, argument, first, last) {
                    var simple = "nth" !== type.slice(0, 3),
                      forward = "last" !== type.slice(-4),
                      ofType = "of-type" === what;
                    return 1 === first && 0 === last ? function(elem) {
                      return !!elem.parentNode
                    } : function(elem, context, xml) {
                      var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling",
                        parent = elem.parentNode,
                        name = ofType && elem.nodeName.toLowerCase(),
                        useCache = !xml && !ofType;
                      if (parent) {
                        if (simple) {
                          for (; dir;) {
                            for (node = elem; node = node[dir];)
                              if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) return !1;
                            start = dir = "only" === type && !start && "nextSibling"
                          }
                          return !0
                        }
                        if (start = [forward ? parent.firstChild : parent.lastChild], forward && useCache) {
                          for (outerCache = parent[expando] || (parent[expando] = {}), cache = outerCache[type] || [], nodeIndex = cache[0] === dirruns && cache[1], diff = cache[0] === dirruns && cache[2], node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop();)
                            if (1 === node.nodeType && ++diff && node === elem) {
                              outerCache[type] = [dirruns, nodeIndex, diff];
                              break
                            }
                        } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) diff = cache[1];
                        else
                          for (;
                            (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && ((node[expando] || (node[expando] = {}))[type] = [dirruns, diff]), node !== elem)););
                        return diff -= last, diff === first || diff % first === 0 && diff / first >= 0
                      }
                    }
                  },
                  PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [pseudo, pseudo, "", argument], Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                      for (var idx, matched = fn(seed, argument), i = matched.length; i--;) idx = indexOf.call(seed, matched[i]), seed[idx] = !(matches[idx] = matched[i])
                    }) : function(elem) {
                      return fn(elem, 0, args)
                    }) : fn
                  }
                },
                pseudos: {
                  not: markFunction(function(selector) {
                    var input = [],
                      results = [],
                      matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                      for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--;)(elem = unmatched[i]) && (seed[i] = !(matches[i] = elem))
                    }) : function(elem, context, xml) {
                      return input[0] = elem, matcher(input, null, xml, results), !results.pop()
                    }
                  }),
                  has: markFunction(function(selector) {
                    return function(elem) {
                      return Sizzle(selector, elem).length > 0
                    }
                  }),
                  contains: markFunction(function(text) {
                    return function(elem) {
                      return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1
                    }
                  }),
                  lang: markFunction(function(lang) {
                    return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), lang = lang.replace(runescape, funescape).toLowerCase(),
                      function(elem) {
                        var elemLang;
                        do
                          if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) return elemLang = elemLang.toLowerCase(), elemLang === lang || 0 === elemLang.indexOf(lang + "-");
                        while ((elem = elem.parentNode) && 1 === elem.nodeType);
                        return !1
                      }
                  }),
                  target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id
                  },
                  root: function(elem) {
                    return elem === docElem
                  },
                  focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex)
                  },
                  enabled: function(elem) {
                    return elem.disabled === !1
                  },
                  disabled: function(elem) {
                    return elem.disabled === !0
                  },
                  checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected
                  },
                  selected: function(elem) {
                    return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0
                  },
                  empty: function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling)
                      if (elem.nodeType < 6) return !1;
                    return !0
                  },
                  parent: function(elem) {
                    return !Expr.pseudos.empty(elem)
                  },
                  header: function(elem) {
                    return rheader.test(elem.nodeName)
                  },
                  input: function(elem) {
                    return rinputs.test(elem.nodeName)
                  },
                  button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && "button" === elem.type || "button" === name
                  },
                  text: function(elem) {
                    var attr;
                    return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || "text" === attr.toLowerCase())
                  },
                  first: createPositionalPseudo(function() {
                    return [0]
                  }),
                  last: createPositionalPseudo(function(matchIndexes, length) {
                    return [length - 1]
                  }),
                  eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [0 > argument ? argument + length : argument]
                  }),
                  even: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 0; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes
                  }),
                  odd: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 1; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes
                  }),
                  lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; --i >= 0;) matchIndexes.push(i);
                    return matchIndexes
                  }),
                  gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; ++i < length;) matchIndexes.push(i);
                    return matchIndexes
                  })
                }
              }, Expr.pseudos.nth = Expr.pseudos.eq;
              for (i in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
              }) Expr.pseudos[i] = createInputPseudo(i);
              for (i in {
                submit: !0,
                reset: !0
              }) Expr.pseudos[i] = createButtonPseudo(i);
              return setFilters.prototype = Expr.filters = Expr.pseudos, Expr.setFilters = new setFilters, tokenize = Sizzle.tokenize = function(selector, parseOnly) {
                var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
                if (cached) return parseOnly ? 0 : cached.slice(0);
                for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar;) {
                  (!matched || (match = rcomma.exec(soFar))) && (match && (soFar = soFar.slice(match[0].length) || soFar), groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (matched = match.shift(), tokens.push({
                    value: matched,
                    type: match[0].replace(rtrim, " ")
                  }), soFar = soFar.slice(matched.length));
                  for (type in Expr.filter)!(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(), tokens.push({
                    value: matched,
                    type: type,
                    matches: match
                  }), soFar = soFar.slice(matched.length));
                  if (!matched) break
                }
                return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0)
              }, compile = Sizzle.compile = function(selector, match) {
                var i, setMatchers = [],
                  elementMatchers = [],
                  cached = compilerCache[selector + " "];
                if (!cached) {
                  for (match || (match = tokenize(selector)), i = match.length; i--;) cached = matcherFromTokens(match[i]), cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                  cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers)), cached.selector = selector
                }
                return cached
              }, select = Sizzle.select = function(selector, context, results, seed) {
                var i, tokens, token, type, find, compiled = "function" == typeof selector && selector,
                  match = !seed && tokenize(selector = compiled.selector || selector);
                if (results = results || [], 1 === match.length) {
                  if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                    if (context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0], !context) return results;
                    compiled && (context = context.parentNode), selector = selector.slice(tokens.shift().value.length)
                  }
                  for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i], !Expr.relative[type = token.type]);)
                    if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                      if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) return push.apply(results, seed), results;
                      break
                    }
                }
                return (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context), results
              }, support.sortStable = expando.split("").sort(sortOrder).join("") === expando, support.detectDuplicates = !!hasDuplicate, setDocument(), support.sortDetached = assert(function(div1) {
                return 1 & div1.compareDocumentPosition(document.createElement("div"))
              }), assert(function(div) {
                return div.innerHTML = "<a href='#'></a>", "#" === div.firstChild.getAttribute("href")
              }) || addHandle("type|href|height|width", function(elem, name, isXML) {
                return isXML ? void 0 : elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2)
              }), support.attributes && assert(function(div) {
                return div.innerHTML = "<input/>", div.firstChild.setAttribute("value", ""), "" === div.firstChild.getAttribute("value")
              }) || addHandle("value", function(elem, name, isXML) {
                return isXML || "input" !== elem.nodeName.toLowerCase() ? void 0 : elem.defaultValue
              }), assert(function(div) {
                return null == div.getAttribute("disabled")
              }) || addHandle(booleans, function(elem, name, isXML) {
                var val;
                return isXML ? void 0 : elem[name] === !0 ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
              }), Sizzle
            }(window);
            jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, jQuery.contains = Sizzle.contains;
            var rneedsContext = jQuery.expr.match.needsContext,
              rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
              risSimple = /^.[^:#\[\.,]*$/;
            jQuery.filter = function(expr, elems, not) {
              var elem = elems[0];
              return not && (expr = ":not(" + expr + ")"), 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
                return 1 === elem.nodeType
              }))
            }, jQuery.fn.extend({
              find: function(selector) {
                var i, len = this.length,
                  ret = [],
                  self = this;
                if ("string" != typeof selector) return this.pushStack(jQuery(selector).filter(function() {
                  for (i = 0; len > i; i++)
                    if (jQuery.contains(self[i], this)) return !0
                }));
                for (i = 0; len > i; i++) jQuery.find(selector, self[i], ret);
                return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret), ret.selector = this.selector ? this.selector + " " + selector : selector, ret
              },
              filter: function(selector) {
                return this.pushStack(winnow(this, selector || [], !1))
              },
              not: function(selector) {
                return this.pushStack(winnow(this, selector || [], !0))
              },
              is: function(selector) {
                return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length
              }
            });
            var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
              init = jQuery.fn.init = function(selector, context) {
                var match, elem;
                if (!selector) return this;
                if ("string" == typeof selector) {
                  if (match = "<" === selector[0] && ">" === selector[selector.length - 1] && selector.length >= 3 ? [null, selector, null] : rquickExpr.exec(selector), !match || !match[1] && context) return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
                  if (match[1]) {
                    if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)), rsingleTag.test(match[1]) && jQuery.isPlainObject(context))
                      for (match in context) jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                    return this
                  }
                  return elem = document.getElementById(match[2]), elem && elem.parentNode && (this.length = 1, this[0] = elem), this.context = document, this.selector = selector, this
                }
                return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, this) : jQuery.isFunction(selector) ? "undefined" != typeof rootjQuery.ready ? rootjQuery.ready(selector) : selector(jQuery) : (void 0 !== selector.selector && (this.selector = selector.selector, this.context = selector.context), jQuery.makeArray(selector, this))
              };
            init.prototype = jQuery.fn, rootjQuery = jQuery(document);
            var rparentsprev = /^(?:parents|prev(?:Until|All))/,
              guaranteedUnique = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
              };
            jQuery.extend({
              dir: function(elem, dir, until) {
                for (var matched = [], truncate = void 0 !== until;
                  (elem = elem[dir]) && 9 !== elem.nodeType;)
                  if (1 === elem.nodeType) {
                    if (truncate && jQuery(elem).is(until)) break;
                    matched.push(elem)
                  }
                return matched
              },
              sibling: function(n, elem) {
                for (var matched = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && matched.push(n);
                return matched
              }
            }), jQuery.fn.extend({
              has: function(target) {
                var targets = jQuery(target, this),
                  l = targets.length;
                return this.filter(function() {
                  for (var i = 0; l > i; i++)
                    if (jQuery.contains(this, targets[i])) return !0
                })
              },
              closest: function(selectors, context) {
                for (var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; l > i; i++)
                  for (cur = this[i]; cur && cur !== context; cur = cur.parentNode)
                    if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
                      matched.push(cur);
                      break
                    }
                return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched)
              },
              index: function(elem) {
                return elem ? "string" == typeof elem ? indexOf.call(jQuery(elem), this[0]) : indexOf.call(this, elem.jquery ? elem[0] : elem) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
              },
              add: function(selector, context) {
                return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))))
              },
              addBack: function(selector) {
                return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector))
              }
            }), jQuery.each({
              parent: function(elem) {
                var parent = elem.parentNode;
                return parent && 11 !== parent.nodeType ? parent : null
              },
              parents: function(elem) {
                return jQuery.dir(elem, "parentNode")
              },
              parentsUntil: function(elem, i, until) {
                return jQuery.dir(elem, "parentNode", until)
              },
              next: function(elem) {
                return sibling(elem, "nextSibling")
              },
              prev: function(elem) {
                return sibling(elem, "previousSibling")
              },
              nextAll: function(elem) {
                return jQuery.dir(elem, "nextSibling")
              },
              prevAll: function(elem) {
                return jQuery.dir(elem, "previousSibling")
              },
              nextUntil: function(elem, i, until) {
                return jQuery.dir(elem, "nextSibling", until)
              },
              prevUntil: function(elem, i, until) {
                return jQuery.dir(elem, "previousSibling", until)
              },
              siblings: function(elem) {
                return jQuery.sibling((elem.parentNode || {}).firstChild, elem)
              },
              children: function(elem) {
                return jQuery.sibling(elem.firstChild)
              },
              contents: function(elem) {
                return elem.contentDocument || jQuery.merge([], elem.childNodes)
              }
            }, function(name, fn) {
              jQuery.fn[name] = function(until, selector) {
                var matched = jQuery.map(this, fn, until);
                return "Until" !== name.slice(-5) && (selector = until), selector && "string" == typeof selector && (matched = jQuery.filter(selector, matched)), this.length > 1 && (guaranteedUnique[name] || jQuery.unique(matched), rparentsprev.test(name) && matched.reverse()), this.pushStack(matched)
              }
            });
            var rnotwhite = /\S+/g,
              optionsCache = {};
            jQuery.Callbacks = function(options) {
              options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
              var memory, fired, firing, firingStart, firingLength, firingIndex, list = [],
                stack = !options.once && [],
                fire = function(data) {
                  for (memory = options.memory && data, fired = !0, firingIndex = firingStart || 0, firingStart = 0, firingLength = list.length, firing = !0; list && firingLength > firingIndex; firingIndex++)
                    if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
                      memory = !1;
                      break
                    }
                  firing = !1, list && (stack ? stack.length && fire(stack.shift()) : memory ? list = [] : self.disable())
                },
                self = {
                  add: function() {
                    if (list) {
                      var start = list.length;
                      ! function add(args) {
                        jQuery.each(args, function(_, arg) {
                          var type = jQuery.type(arg);
                          "function" === type ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== type && add(arg)
                        })
                      }(arguments), firing ? firingLength = list.length : memory && (firingStart = start, fire(memory))
                    }
                    return this
                  },
                  remove: function() {
                    return list && jQuery.each(arguments, function(_, arg) {
                      for (var index;
                        (index = jQuery.inArray(arg, list, index)) > -1;) list.splice(index, 1), firing && (firingLength >= index && firingLength--, firingIndex >= index && firingIndex--)
                    }), this
                  },
                  has: function(fn) {
                    return fn ? jQuery.inArray(fn, list) > -1 : !(!list || !list.length)
                  },
                  empty: function() {
                    return list = [], firingLength = 0, this
                  },
                  disable: function() {
                    return list = stack = memory = void 0, this
                  },
                  disabled: function() {
                    return !list
                  },
                  lock: function() {
                    return stack = void 0, memory || self.disable(), this
                  },
                  locked: function() {
                    return !stack
                  },
                  fireWith: function(context, args) {
                    return !list || fired && !stack || (args = args || [], args = [context, args.slice ? args.slice() : args], firing ? stack.push(args) : fire(args)), this
                  },
                  fire: function() {
                    return self.fireWith(this, arguments), this
                  },
                  fired: function() {
                    return !!fired
                  }
                };
              return self
            }, jQuery.extend({
              Deferred: function(func) {
                var tuples = [
                    ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", jQuery.Callbacks("memory")]
                  ],
                  state = "pending",
                  promise = {
                    state: function() {
                      return state
                    },
                    always: function() {
                      return deferred.done(arguments).fail(arguments), this
                    },
                    then: function() {
                      var fns = arguments;
                      return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                          var fn = jQuery.isFunction(fns[i]) && fns[i];
                          deferred[tuple[1]](function() {
                            var returned = fn && fn.apply(this, arguments);
                            returned && jQuery.isFunction(returned.promise) ? returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify) : newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments)
                          })
                        }), fns = null
                      }).promise()
                    },
                    promise: function(obj) {
                      return null != obj ? jQuery.extend(obj, promise) : promise
                    }
                  },
                  deferred = {};
                return promise.pipe = promise.then, jQuery.each(tuples, function(i, tuple) {
                  var list = tuple[2],
                    stateString = tuple[3];
                  promise[tuple[1]] = list.add, stateString && list.add(function() {
                    state = stateString
                  }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = function() {
                    return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), this
                  }, deferred[tuple[0] + "With"] = list.fireWith
                }), promise.promise(deferred), func && func.call(deferred, deferred), deferred
              },
              when: function(subordinate) {
                var progressValues, progressContexts, resolveContexts, i = 0,
                  resolveValues = slice.call(arguments),
                  length = resolveValues.length,
                  remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0,
                  deferred = 1 === remaining ? subordinate : jQuery.Deferred(),
                  updateFunc = function(i, contexts, values) {
                    return function(value) {
                      contexts[i] = this, values[i] = arguments.length > 1 ? slice.call(arguments) : value, values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values)
                    }
                  };
                if (length > 1)
                  for (progressValues = new Array(length), progressContexts = new Array(length), resolveContexts = new Array(length); length > i; i++) resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues)) : --remaining;
                return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise()
              }
            });
            var readyList;
            jQuery.fn.ready = function(fn) {
              return jQuery.ready.promise().done(fn), this
            }, jQuery.extend({
              isReady: !1,
              readyWait: 1,
              holdReady: function(hold) {
                hold ? jQuery.readyWait++ : jQuery.ready(!0)
              },
              ready: function(wait) {
                (wait === !0 ? --jQuery.readyWait : jQuery.isReady) || (jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [jQuery]), jQuery.fn.triggerHandler && (jQuery(document).triggerHandler("ready"), jQuery(document).off("ready"))))
              }
            }), jQuery.ready.promise = function(obj) {
              return readyList || (readyList = jQuery.Deferred(), "complete" === document.readyState ? setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", completed, !1), window.addEventListener("load", completed, !1))), readyList.promise(obj)
            }, jQuery.ready.promise();
            var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
              var i = 0,
                len = elems.length,
                bulk = null == key;
              if ("object" === jQuery.type(key)) {
                chainable = !0;
                for (i in key) jQuery.access(elems, fn, i, key[i], !0, emptyGet, raw)
              } else if (void 0 !== value && (chainable = !0, jQuery.isFunction(value) || (raw = !0), bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, key, value) {
                return bulk.call(jQuery(elem), value)
              })), fn))
                for (; len > i; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
              return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet
            };
            jQuery.acceptData = function(owner) {
              return 1 === owner.nodeType || 9 === owner.nodeType || !+owner.nodeType
            }, Data.uid = 1, Data.accepts = jQuery.acceptData, Data.prototype = {
              key: function(owner) {
                if (!Data.accepts(owner)) return 0;
                var descriptor = {},
                  unlock = owner[this.expando];
                if (!unlock) {
                  unlock = Data.uid++;
                  try {
                    descriptor[this.expando] = {
                      value: unlock
                    }, Object.defineProperties(owner, descriptor)
                  } catch (e) {
                    descriptor[this.expando] = unlock, jQuery.extend(owner, descriptor)
                  }
                }
                return this.cache[unlock] || (this.cache[unlock] = {}), unlock
              },
              set: function(owner, data, value) {
                var prop, unlock = this.key(owner),
                  cache = this.cache[unlock];
                if ("string" == typeof data) cache[data] = value;
                else if (jQuery.isEmptyObject(cache)) jQuery.extend(this.cache[unlock], data);
                else
                  for (prop in data) cache[prop] = data[prop];
                return cache
              },
              get: function(owner, key) {
                var cache = this.cache[this.key(owner)];
                return void 0 === key ? cache : cache[key]
              },
              access: function(owner, key, value) {
                var stored;
                return void 0 === key || key && "string" == typeof key && void 0 === value ? (stored = this.get(owner, key), void 0 !== stored ? stored : this.get(owner, jQuery.camelCase(key))) : (this.set(owner, key, value), void 0 !== value ? value : key)
              },
              remove: function(owner, key) {
                var i, name, camel, unlock = this.key(owner),
                  cache = this.cache[unlock];
                if (void 0 === key) this.cache[unlock] = {};
                else {
                  jQuery.isArray(key) ? name = key.concat(key.map(jQuery.camelCase)) : (camel = jQuery.camelCase(key), key in cache ? name = [key, camel] : (name = camel, name = name in cache ? [name] : name.match(rnotwhite) || [])), i = name.length;
                  for (; i--;) delete cache[name[i]]
                }
              },
              hasData: function(owner) {
                return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {})
              },
              discard: function(owner) {
                owner[this.expando] && delete this.cache[owner[this.expando]]
              }
            };
            var data_priv = new Data,
              data_user = new Data,
              rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
              rmultiDash = /([A-Z])/g;
            jQuery.extend({
              hasData: function(elem) {
                return data_user.hasData(elem) || data_priv.hasData(elem)
              },
              data: function(elem, name, data) {
                return data_user.access(elem, name, data)
              },
              removeData: function(elem, name) {
                data_user.remove(elem, name)
              },
              _data: function(elem, name, data) {
                return data_priv.access(elem, name, data)
              },
              _removeData: function(elem, name) {
                data_priv.remove(elem, name)
              }
            }), jQuery.fn.extend({
              data: function(key, value) {
                var i, name, data, elem = this[0],
                  attrs = elem && elem.attributes;
                if (void 0 === key) {
                  if (this.length && (data = data_user.get(elem), 1 === elem.nodeType && !data_priv.get(elem, "hasDataAttrs"))) {
                    for (i = attrs.length; i--;) attrs[i] && (name = attrs[i].name, 0 === name.indexOf("data-") && (name = jQuery.camelCase(name.slice(5)), dataAttr(elem, name, data[name])));
                    data_priv.set(elem, "hasDataAttrs", !0)
                  }
                  return data
                }
                return "object" == typeof key ? this.each(function() {
                  data_user.set(this, key)
                }) : access(this, function(value) {
                  var data, camelKey = jQuery.camelCase(key);
                  if (elem && void 0 === value) {
                    if (data = data_user.get(elem, key), void 0 !== data) return data;
                    if (data = data_user.get(elem, camelKey), void 0 !== data) return data;
                    if (data = dataAttr(elem, camelKey, void 0), void 0 !== data) return data
                  } else this.each(function() {
                    var data = data_user.get(this, camelKey);
                    data_user.set(this, camelKey, value), -1 !== key.indexOf("-") && void 0 !== data && data_user.set(this, key, value)
                  })
                }, null, value, arguments.length > 1, null, !0)
              },
              removeData: function(key) {
                return this.each(function() {
                  data_user.remove(this, key)
                })
              }
            }), jQuery.extend({
              queue: function(elem, type, data) {
                var queue;
                return elem ? (type = (type || "fx") + "queue", queue = data_priv.get(elem, type), data && (!queue || jQuery.isArray(data) ? queue = data_priv.access(elem, type, jQuery.makeArray(data)) : queue.push(data)), queue || []) : void 0
              },
              dequeue: function(elem, type) {
                type = type || "fx";
                var queue = jQuery.queue(elem, type),
                  startLength = queue.length,
                  fn = queue.shift(),
                  hooks = jQuery._queueHooks(elem, type),
                  next = function() {
                    jQuery.dequeue(elem, type)
                  };
                "inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"), delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire()
              },
              _queueHooks: function(elem, type) {
                var key = type + "queueHooks";
                return data_priv.get(elem, key) || data_priv.access(elem, key, {
                  empty: jQuery.Callbacks("once memory").add(function() {
                    data_priv.remove(elem, [type + "queue", key])
                  })
                })
              }
            }), jQuery.fn.extend({
              queue: function(type, data) {
                var setter = 2;
                return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function() {
                  var queue = jQuery.queue(this, type, data);
                  jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type)
                })
              },
              dequeue: function(type) {
                return this.each(function() {
                  jQuery.dequeue(this, type)
                })
              },
              clearQueue: function(type) {
                return this.queue(type || "fx", [])
              },
              promise: function(type, obj) {
                var tmp, count = 1,
                  defer = jQuery.Deferred(),
                  elements = this,
                  i = this.length,
                  resolve = function() {
                    --count || defer.resolveWith(elements, [elements])
                  };
                for ("string" != typeof type && (obj = type, type = void 0), type = type || "fx"; i--;) tmp = data_priv.get(elements[i], type + "queueHooks"), tmp && tmp.empty && (count++, tmp.empty.add(resolve));
                return resolve(), defer.promise(obj)
              }
            });
            var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
              cssExpand = ["Top", "Right", "Bottom", "Left"],
              isHidden = function(elem, el) {
                return elem = el || elem, "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem)
              },
              rcheckableType = /^(?:checkbox|radio)$/i;
            ! function() {
              var fragment = document.createDocumentFragment(),
                div = fragment.appendChild(document.createElement("div")),
                input = document.createElement("input");
              input.setAttribute("type", "radio"), input.setAttribute("checked", "checked"), input.setAttribute("name", "t"), div.appendChild(input), support.checkClone = div.cloneNode(!0).cloneNode(!0).lastChild.checked, div.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !!div.cloneNode(!0).lastChild.defaultValue
            }();
            var strundefined = "undefined";
            support.focusinBubbles = "onfocusin" in window;
            var rkeyEvent = /^key/,
              rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
              rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
              rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
            jQuery.event = {
              global: {},
              add: function(elem, types, handler, data, selector) {
                var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.get(elem);
                if (elemData)
                  for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, selector = handleObjIn.selector), handler.guid || (handler.guid = jQuery.guid++), (events = elemData.events) || (events = elemData.events = {}), (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                    return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : void 0
                  }), types = (types || "").match(rnotwhite) || [""], t = types.length; t--;) tmp = rtypenamespace.exec(types[t]) || [], type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type && (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                  }, handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0, special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || elem.addEventListener && elem.addEventListener(type, eventHandle, !1)), special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), jQuery.event.global[type] = !0)
              },
              remove: function(elem, types, handler, selector, mappedTypes) {
                var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.hasData(elem) && data_priv.get(elem);
                if (elemData && (events = elemData.events)) {
                  for (types = (types || "").match(rnotwhite) || [""], t = types.length; t--;)
                    if (tmp = rtypenamespace.exec(types[t]) || [], type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
                      for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, handlers = events[type] || [], tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"), origCount = j = handlers.length; j--;) handleObj = handlers[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1), handleObj.selector && handlers.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                      origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), delete events[type])
                    } else
                      for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                  jQuery.isEmptyObject(events) && (delete elemData.handle, data_priv.remove(elem, "events"))
                }
              },
              trigger: function(event, data, elem, onlyHandlers) {
                var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [elem || document],
                  type = hasOwn.call(event, "type") ? event.type : event,
                  namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
                if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") >= 0 && (namespaces = type.split("."), type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), event.isTrigger = onlyHandlers ? 2 : 3, event.namespace = namespaces.join("."), event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, event.result = void 0, event.target || (event.target = elem), data = null == data ? [event] : jQuery.makeArray(data, [event]), special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
                  if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                    for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur), tmp = cur;
                    tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window)
                  }
                  for (i = 0;
                    (cur = eventPath[i++]) && !event.isPropagationStopped();) event.type = i > 1 ? bubbleType : special.bindType || type, handle = (data_priv.get(cur, "events") || {})[event.type] && data_priv.get(cur, "handle"), handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && handle.apply && jQuery.acceptData(cur) && (event.result = handle.apply(cur, data), event.result === !1 && event.preventDefault());
                  return event.type = type, onlyHandlers || event.isDefaultPrevented() || special._default && special._default.apply(eventPath.pop(), data) !== !1 || !jQuery.acceptData(elem) || ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem) && (tmp = elem[ontype], tmp && (elem[ontype] = null), jQuery.event.triggered = type, elem[type](), jQuery.event.triggered = void 0, tmp && (elem[ontype] = tmp)), event.result
                }
              },
              dispatch: function(event) {
                event = jQuery.event.fix(event);
                var i, j, ret, matched, handleObj, handlerQueue = [],
                  args = slice.call(arguments),
                  handlers = (data_priv.get(this, "events") || {})[event.type] || [],
                  special = jQuery.event.special[event.type] || {};
                if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                  for (handlerQueue = jQuery.event.handlers.call(this, event, handlers), i = 0;
                    (matched = handlerQueue[i++]) && !event.isPropagationStopped();)
                    for (event.currentTarget = matched.elem, j = 0;
                      (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped();)(!event.namespace_re || event.namespace_re.test(handleObj.namespace)) && (event.handleObj = handleObj, event.data = handleObj.data, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), void 0 !== ret && (event.result = ret) === !1 && (event.preventDefault(), event.stopPropagation()));
                  return special.postDispatch && special.postDispatch.call(this, event), event.result
                }
              },
              handlers: function(event, handlers) {
                var i, matches, sel, handleObj, handlerQueue = [],
                  delegateCount = handlers.delegateCount,
                  cur = event.target;
                if (delegateCount && cur.nodeType && (!event.button || "click" !== event.type))
                  for (; cur !== this; cur = cur.parentNode || this)
                    if (cur.disabled !== !0 || "click" !== event.type) {
                      for (matches = [], i = 0; delegateCount > i; i++) handleObj = handlers[i], sel = handleObj.selector + " ", void 0 === matches[sel] && (matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length), matches[sel] && matches.push(handleObj);
                      matches.length && handlerQueue.push({
                        elem: cur,
                        handlers: matches
                      })
                    }
                return delegateCount < handlers.length && handlerQueue.push({
                  elem: this,
                  handlers: handlers.slice(delegateCount)
                }), handlerQueue
              },
              props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
              fixHooks: {},
              keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(event, original) {
                  return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode), event
                }
              },
              mouseHooks: {
                props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(event, original) {
                  var eventDoc, doc, body, button = original.button;
                  return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), event.which || void 0 === button || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), event
                }
              },
              fix: function(event) {
                if (event[jQuery.expando]) return event;
                var i, prop, copy, type = event.type,
                  originalEvent = event,
                  fixHook = this.fixHooks[type];
                for (fixHook || (this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}), copy = fixHook.props ? this.props.concat(fixHook.props) : this.props, event = new jQuery.Event(originalEvent), i = copy.length; i--;) prop = copy[i], event[prop] = originalEvent[prop];
                return event.target || (event.target = document), 3 === event.target.nodeType && (event.target = event.target.parentNode), fixHook.filter ? fixHook.filter(event, originalEvent) : event
              },
              special: {
                load: {
                  noBubble: !0
                },
                focus: {
                  trigger: function() {
                    return this !== safeActiveElement() && this.focus ? (this.focus(), !1) : void 0
                  },
                  delegateType: "focusin"
                },
                blur: {
                  trigger: function() {
                    return this === safeActiveElement() && this.blur ? (this.blur(), !1) : void 0
                  },
                  delegateType: "focusout"
                },
                click: {
                  trigger: function() {
                    return "checkbox" === this.type && this.click && jQuery.nodeName(this, "input") ? (this.click(), !1) : void 0
                  },
                  _default: function(event) {
                    return jQuery.nodeName(event.target, "a")
                  }
                },
                beforeunload: {
                  postDispatch: function(event) {
                    void 0 !== event.result && event.originalEvent && (event.originalEvent.returnValue = event.result)
                  }
                }
              },
              simulate: function(type, elem, event, bubble) {
                var e = jQuery.extend(new jQuery.Event, event, {
                  type: type,
                  isSimulated: !0,
                  originalEvent: {}
                });
                bubble ? jQuery.event.trigger(e, null, elem) : jQuery.event.dispatch.call(elem, e), e.isDefaultPrevented() && event.preventDefault()
              }
            }, jQuery.removeEvent = function(elem, type, handle) {
              elem.removeEventListener && elem.removeEventListener(type, handle, !1)
            }, jQuery.Event = function(src, props) {
              return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && src.returnValue === !1 ? returnTrue : returnFalse) : this.type = src, props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), void(this[jQuery.expando] = !0)) : new jQuery.Event(src, props)
            }, jQuery.Event.prototype = {
              isDefaultPrevented: returnFalse,
              isPropagationStopped: returnFalse,
              isImmediatePropagationStopped: returnFalse,
              preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = returnTrue, e && e.preventDefault && e.preventDefault()
              },
              stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = returnTrue, e && e.stopPropagation && e.stopPropagation()
              },
              stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = returnTrue, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
              }
            }, jQuery.each({
              mouseenter: "mouseover",
              mouseleave: "mouseout",
              pointerenter: "pointerover",
              pointerleave: "pointerout"
            }, function(orig, fix) {
              jQuery.event.special[orig] = {
                delegateType: fix,
                bindType: fix,
                handle: function(event) {
                  var ret, target = this,
                    related = event.relatedTarget,
                    handleObj = event.handleObj;
                  return (!related || related !== target && !jQuery.contains(target, related)) && (event.type = handleObj.origType, ret = handleObj.handler.apply(this, arguments), event.type = fix), ret
                }
              }
            }), support.focusinBubbles || jQuery.each({
              focus: "focusin",
              blur: "focusout"
            }, function(orig, fix) {
              var handler = function(event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0)
              };
              jQuery.event.special[fix] = {
                setup: function() {
                  var doc = this.ownerDocument || this,
                    attaches = data_priv.access(doc, fix);
                  attaches || doc.addEventListener(orig, handler, !0), data_priv.access(doc, fix, (attaches || 0) + 1)
                },
                teardown: function() {
                  var doc = this.ownerDocument || this,
                    attaches = data_priv.access(doc, fix) - 1;
                  attaches ? data_priv.access(doc, fix, attaches) : (doc.removeEventListener(orig, handler, !0), data_priv.remove(doc, fix))
                }
              }
            }), jQuery.fn.extend({
              on: function(types, selector, data, fn, one) {
                var origFn, type;
                if ("object" == typeof types) {
                  "string" != typeof selector && (data = data || selector, selector = void 0);
                  for (type in types) this.on(type, selector, data, types[type], one);
                  return this
                }
                if (null == data && null == fn ? (fn = selector, data = selector = void 0) : null == fn && ("string" == typeof selector ? (fn = data, data = void 0) : (fn = data, data = selector, selector = void 0)), fn === !1) fn = returnFalse;
                else if (!fn) return this;
                return 1 === one && (origFn = fn, fn = function(event) {
                  return jQuery().off(event), origFn.apply(this, arguments)
                }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), this.each(function() {
                  jQuery.event.add(this, types, fn, data, selector)
                })
              },
              one: function(types, selector, data, fn) {
                return this.on(types, selector, data, fn, 1)
              },
              off: function(types, selector, fn) {
                var handleObj, type;
                if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), this;
                if ("object" == typeof types) {
                  for (type in types) this.off(type, selector, types[type]);
                  return this
                }
                return (selector === !1 || "function" == typeof selector) && (fn = selector, selector = void 0), fn === !1 && (fn = returnFalse), this.each(function() {
                  jQuery.event.remove(this, types, fn, selector)
                })
              },
              trigger: function(type, data) {
                return this.each(function() {
                  jQuery.event.trigger(type, data, this)
                })
              },
              triggerHandler: function(type, data) {
                var elem = this[0];
                return elem ? jQuery.event.trigger(type, data, elem, !0) : void 0
              }
            });
            var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
              rtagName = /<([\w:]+)/,
              rhtml = /<|&#?\w+;/,
              rnoInnerhtml = /<(?:script|style|link)/i,
              rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
              rscriptType = /^$|\/(?:java|ecma)script/i,
              rscriptTypeMasked = /^true\/(.*)/,
              rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
              wrapMap = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
              };
            wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, wrapMap.th = wrapMap.td, jQuery.extend({
              clone: function(elem, dataAndEvents, deepDataAndEvents) {
                var i, l, srcElements, destElements, clone = elem.cloneNode(!0),
                  inPage = jQuery.contains(elem.ownerDocument, elem);
                if (!(support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem)))
                  for (destElements = getAll(clone), srcElements = getAll(elem), i = 0, l = srcElements.length; l > i; i++) fixInput(srcElements[i], destElements[i]);
                if (dataAndEvents)
                  if (deepDataAndEvents)
                    for (srcElements = srcElements || getAll(elem), destElements = destElements || getAll(clone), i = 0, l = srcElements.length; l > i; i++) cloneCopyEvent(srcElements[i], destElements[i]);
                  else cloneCopyEvent(elem, clone);
                return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), clone
              },
              buildFragment: function(elems, context, scripts, selection) {
                for (var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length; l > i; i++)
                  if (elem = elems[i], elem || 0 === elem)
                    if ("object" === jQuery.type(elem)) jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
                    else if (rhtml.test(elem)) {
                  for (tmp = tmp || fragment.appendChild(context.createElement("div")), tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(), wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2], j = wrap[0]; j--;) tmp = tmp.lastChild;
                  jQuery.merge(nodes, tmp.childNodes), tmp = fragment.firstChild, tmp.textContent = ""
                } else nodes.push(context.createTextNode(elem));
                for (fragment.textContent = "", i = 0; elem = nodes[i++];)
                  if ((!selection || -1 === jQuery.inArray(elem, selection)) && (contains = jQuery.contains(elem.ownerDocument, elem), tmp = getAll(fragment.appendChild(elem), "script"), contains && setGlobalEval(tmp), scripts))
                    for (j = 0; elem = tmp[j++];) rscriptType.test(elem.type || "") && scripts.push(elem);
                return fragment
              },
              cleanData: function(elems) {
                for (var data, elem, type, key, special = jQuery.event.special, i = 0; void 0 !== (elem = elems[i]); i++) {
                  if (jQuery.acceptData(elem) && (key = elem[data_priv.expando], key && (data = data_priv.cache[key]))) {
                    if (data.events)
                      for (type in data.events) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                    data_priv.cache[key] && delete data_priv.cache[key]
                  }
                  delete data_user.cache[elem[data_user.expando]]
                }
              }
            }), jQuery.fn.extend({
              text: function(value) {
                return access(this, function(value) {
                  return void 0 === value ? jQuery.text(this) : this.empty().each(function() {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = value)
                  })
                }, null, value, arguments.length)
              },
              append: function() {
                return this.domManip(arguments, function(elem) {
                  if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem)
                  }
                })
              },
              prepend: function() {
                return this.domManip(arguments, function(elem) {
                  if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild)
                  }
                })
              },
              before: function() {
                return this.domManip(arguments, function(elem) {
                  this.parentNode && this.parentNode.insertBefore(elem, this)
                })
              },
              after: function() {
                return this.domManip(arguments, function(elem) {
                  this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling)
                })
              },
              remove: function(selector, keepData) {
                for (var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0; null != (elem = elems[i]); i++) keepData || 1 !== elem.nodeType || jQuery.cleanData(getAll(elem)), elem.parentNode && (keepData && jQuery.contains(elem.ownerDocument, elem) && setGlobalEval(getAll(elem, "script")), elem.parentNode.removeChild(elem));
                return this
              },
              empty: function() {
                for (var elem, i = 0; null != (elem = this[i]); i++) 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), elem.textContent = "");
                return this
              },
              clone: function(dataAndEvents, deepDataAndEvents) {
                return dataAndEvents = null == dataAndEvents ? !1 : dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, this.map(function() {
                  return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
                })
              },
              html: function(value) {
                return access(this, function(value) {
                  var elem = this[0] || {},
                    i = 0,
                    l = this.length;
                  if (void 0 === value && 1 === elem.nodeType) return elem.innerHTML;
                  if ("string" == typeof value && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                      for (; l > i; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), elem.innerHTML = value);
                      elem = 0
                    } catch (e) {}
                  }
                  elem && this.empty().append(value)
                }, null, value, arguments.length)
              },
              replaceWith: function() {
                var arg = arguments[0];
                return this.domManip(arguments, function(elem) {
                  arg = this.parentNode, jQuery.cleanData(getAll(this)), arg && arg.replaceChild(elem, this)
                }), arg && (arg.length || arg.nodeType) ? this : this.remove()
              },
              detach: function(selector) {
                return this.remove(selector, !0)
              },
              domManip: function(args, callback) {
                args = concat.apply([], args);
                var fragment, first, scripts, hasScripts, node, doc, i = 0,
                  l = this.length,
                  set = this,
                  iNoClone = l - 1,
                  value = args[0],
                  isFunction = jQuery.isFunction(value);
                if (isFunction || l > 1 && "string" == typeof value && !support.checkClone && rchecked.test(value)) return this.each(function(index) {
                  var self = set.eq(index);
                  isFunction && (args[0] = value.call(this, index, self.html())), self.domManip(args, callback)
                });
                if (l && (fragment = jQuery.buildFragment(args, this[0].ownerDocument, !1, this), first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), first)) {
                  for (scripts = jQuery.map(getAll(fragment, "script"), disableScript), hasScripts = scripts.length; l > i; i++) node = fragment, i !== iNoClone && (node = jQuery.clone(node, !0, !0), hasScripts && jQuery.merge(scripts, getAll(node, "script"))), callback.call(this[i], node, i);
                  if (hasScripts)
                    for (doc = scripts[scripts.length - 1].ownerDocument, jQuery.map(scripts, restoreScript), i = 0; hasScripts > i; i++) node = scripts[i], rscriptType.test(node.type || "") && !data_priv.access(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery._evalUrl && jQuery._evalUrl(node.src) : jQuery.globalEval(node.textContent.replace(rcleanScript, "")))
                }
                return this
              }
            }), jQuery.each({
              appendTo: "append",
              prependTo: "prepend",
              insertBefore: "before",
              insertAfter: "after",
              replaceAll: "replaceWith"
            }, function(name, original) {
              jQuery.fn[name] = function(selector) {
                for (var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0; last >= i; i++) elems = i === last ? this : this.clone(!0), jQuery(insert[i])[original](elems), push.apply(ret, elems.get());
                return this.pushStack(ret)
              }
            });
            var iframe, elemdisplay = {},
              rmargin = /^margin/,
              rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"),
              getStyles = function(elem) {
                return elem.ownerDocument.defaultView.getComputedStyle(elem, null)
              };
            ! function() {
              function computePixelPositionAndBoxSizingReliable() {
                div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", div.innerHTML = "", docElem.appendChild(container);
                var divStyle = window.getComputedStyle(div, null);
                pixelPositionVal = "1%" !== divStyle.top, boxSizingReliableVal = "4px" === divStyle.width, docElem.removeChild(container)
              }
              var pixelPositionVal, boxSizingReliableVal, docElem = document.documentElement,
                container = document.createElement("div"),
                div = document.createElement("div");
              div.style && (div.style.backgroundClip = "content-box", div.cloneNode(!0).style.backgroundClip = "", support.clearCloneStyle = "content-box" === div.style.backgroundClip, container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", container.appendChild(div), window.getComputedStyle && jQuery.extend(support, {
                pixelPosition: function() {
                  return computePixelPositionAndBoxSizingReliable(), pixelPositionVal
                },
                boxSizingReliable: function() {
                  return null == boxSizingReliableVal && computePixelPositionAndBoxSizingReliable(), boxSizingReliableVal
                },
                reliableMarginRight: function() {
                  var ret, marginDiv = div.appendChild(document.createElement("div"));
                  return marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", marginDiv.style.marginRight = marginDiv.style.width = "0", div.style.width = "1px", docElem.appendChild(container), ret = !parseFloat(window.getComputedStyle(marginDiv, null).marginRight), docElem.removeChild(container), ret
                }
              }))
            }(), jQuery.swap = function(elem, options, callback, args) {
              var ret, name, old = {};
              for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
              ret = callback.apply(elem, args || []);
              for (name in options) elem.style[name] = old[name];
              return ret
            };
            var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
              rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
              rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),
              cssShow = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
              },
              cssNormalTransform = {
                letterSpacing: "0",
                fontWeight: "400"
              },
              cssPrefixes = ["Webkit", "O", "Moz", "ms"];
            jQuery.extend({
              cssHooks: {
                opacity: {
                  get: function(elem, computed) {
                    if (computed) {
                      var ret = curCSS(elem, "opacity");
                      return "" === ret ? "1" : ret
                    }
                  }
                }
              },
              cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
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
              style: function(elem, name, value, extra) {
                if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                  var ret, type, hooks, origName = jQuery.camelCase(name),
                    style = elem.style;
                  return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], void 0 === value ? hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, !1, extra)) ? ret : style[name] : (type = typeof value, "string" === type && (ret = rrelNum.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name)), type = "number"), null != value && value === value && ("number" !== type || jQuery.cssNumber[origName] || (value += "px"), support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"), hooks && "set" in hooks && void 0 === (value = hooks.set(elem, value, extra)) || (style[name] = value)), void 0)
                }
              },
              css: function(elem, name, extra, styles) {
                var val, num, hooks, origName = jQuery.camelCase(name);
                return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), void 0 === val && (val = curCSS(elem, name, styles)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), "" === extra || extra ? (num = parseFloat(val), extra === !0 || jQuery.isNumeric(num) ? num || 0 : val) : val
              }
            }), jQuery.each(["height", "width"], function(i, name) {
              jQuery.cssHooks[name] = {
                get: function(elem, computed, extra) {
                  return computed ? rdisplayswap.test(jQuery.css(elem, "display")) && 0 === elem.offsetWidth ? jQuery.swap(elem, cssShow, function() {
                    return getWidthOrHeight(elem, name, extra)
                  }) : getWidthOrHeight(elem, name, extra) : void 0
                },
                set: function(elem, value, extra) {
                  var styles = extra && getStyles(elem);
                  return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles) : 0)
                }
              }
            }), jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
              return computed ? jQuery.swap(elem, {
                display: "inline-block"
              }, curCSS, [elem, "marginRight"]) : void 0
            }), jQuery.each({
              margin: "",
              padding: "",
              border: "Width"
            }, function(prefix, suffix) {
              jQuery.cssHooks[prefix + suffix] = {
                expand: function(value) {
                  for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [value]; 4 > i; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                  return expanded
                }
              }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber)
            }), jQuery.fn.extend({
              css: function(name, value) {
                return access(this, function(elem, name, value) {
                  var styles, len, map = {},
                    i = 0;
                  if (jQuery.isArray(name)) {
                    for (styles = getStyles(elem), len = name.length; len > i; i++) map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                    return map
                  }
                  return void 0 !== value ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
                }, name, value, arguments.length > 1)
              },
              show: function() {
                return showHide(this, !0)
              },
              hide: function() {
                return showHide(this)
              },
              toggle: function(state) {
                return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
                  isHidden(this) ? jQuery(this).show() : jQuery(this).hide()
                })
              }
            }), jQuery.Tween = Tween, Tween.prototype = {
              constructor: Tween,
              init: function(elem, options, prop, end, easing, unit) {
                this.elem = elem, this.prop = prop, this.easing = easing || "swing", this.options = options, this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px")
              },
              cur: function() {
                var hooks = Tween.propHooks[this.prop];
                return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this)
              },
              run: function(percent) {
                var eased, hooks = Tween.propHooks[this.prop];
                return this.pos = eased = this.options.duration ? jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : percent, this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this
              }
            }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
              _default: {
                get: function(tween) {
                  var result;
                  return null == tween.elem[tween.prop] || tween.elem.style && null != tween.elem.style[tween.prop] ? (result = jQuery.css(tween.elem, tween.prop, ""), result && "auto" !== result ? result : 0) : tween.elem[tween.prop]
                },
                set: function(tween) {
                  jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop]) ? jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) : tween.elem[tween.prop] = tween.now
                }
              }
            }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
              set: function(tween) {
                tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now)
              }
            }, jQuery.easing = {
              linear: function(p) {
                return p
              },
              swing: function(p) {
                return .5 - Math.cos(p * Math.PI) / 2
              }
            }, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
            var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
              rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
              rrun = /queueHooks$/,
              animationPrefilters = [defaultPrefilter],
              tweeners = {
                "*": [
                  function(prop, value) {
                    var tween = this.createTween(prop, value),
                      target = tween.cur(),
                      parts = rfxnum.exec(value),
                      unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
                      start = (jQuery.cssNumber[prop] || "px" !== unit && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)),
                      scale = 1,
                      maxIterations = 20;
                    if (start && start[3] !== unit) {
                      unit = unit || start[3], parts = parts || [], start = +target || 1;
                      do scale = scale || ".5", start /= scale, jQuery.style(tween.elem, prop, start + unit); while (scale !== (scale = tween.cur() / target) && 1 !== scale && --maxIterations)
                    }
                    return parts && (start = tween.start = +start || +target || 0, tween.unit = unit, tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]), tween
                  }
                ]
              };
            jQuery.Animation = jQuery.extend(Animation, {
              tweener: function(props, callback) {
                jQuery.isFunction(props) ? (callback = props, props = ["*"]) : props = props.split(" ");
                for (var prop, index = 0, length = props.length; length > index; index++) prop = props[index], tweeners[prop] = tweeners[prop] || [], tweeners[prop].unshift(callback)
              },
              prefilter: function(callback, prepend) {
                prepend ? animationPrefilters.unshift(callback) : animationPrefilters.push(callback)
              }
            }), jQuery.speed = function(speed, easing, fn) {
              var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
                complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
                duration: speed,
                easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
              };
              return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, (null == opt.queue || opt.queue === !0) && (opt.queue = "fx"), opt.old = opt.complete, opt.complete = function() {
                jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue)
              }, opt
            }, jQuery.fn.extend({
              fadeTo: function(speed, to, easing, callback) {
                return this.filter(isHidden).css("opacity", 0).show().end().animate({
                  opacity: to
                }, speed, easing, callback)
              },
              animate: function(prop, speed, easing, callback) {
                var empty = jQuery.isEmptyObject(prop),
                  optall = jQuery.speed(speed, easing, callback),
                  doAnimation = function() {
                    var anim = Animation(this, jQuery.extend({}, prop), optall);
                    (empty || data_priv.get(this, "finish")) && anim.stop(!0)
                  };
                return doAnimation.finish = doAnimation, empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
              },
              stop: function(type, clearQueue, gotoEnd) {
                var stopQueue = function(hooks) {
                  var stop = hooks.stop;
                  delete hooks.stop, stop(gotoEnd)
                };
                return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = void 0), clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function() {
                  var dequeue = !0,
                    index = null != type && type + "queueHooks",
                    timers = jQuery.timers,
                    data = data_priv.get(this);
                  if (index) data[index] && data[index].stop && stopQueue(data[index]);
                  else
                    for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                  for (index = timers.length; index--;) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), dequeue = !1, timers.splice(index, 1));
                  (dequeue || !gotoEnd) && jQuery.dequeue(this, type)
                })
              },
              finish: function(type) {
                return type !== !1 && (type = type || "fx"), this.each(function() {
                  var index, data = data_priv.get(this),
                    queue = data[type + "queue"],
                    hooks = data[type + "queueHooks"],
                    timers = jQuery.timers,
                    length = queue ? queue.length : 0;
                  for (data.finish = !0, jQuery.queue(this, type, []), hooks && hooks.stop && hooks.stop.call(this, !0), index = timers.length; index--;) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0), timers.splice(index, 1));
                  for (index = 0; length > index; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
                  delete data.finish
                })
              }
            }), jQuery.each(["toggle", "show", "hide"], function(i, name) {
              var cssFn = jQuery.fn[name];
              jQuery.fn[name] = function(speed, easing, callback) {
                return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback)
              }
            }), jQuery.each({
              slideDown: genFx("show"),
              slideUp: genFx("hide"),
              slideToggle: genFx("toggle"),
              fadeIn: {
                opacity: "show"
              },
              fadeOut: {
                opacity: "hide"
              },
              fadeToggle: {
                opacity: "toggle"
              }
            }, function(name, props) {
              jQuery.fn[name] = function(speed, easing, callback) {
                return this.animate(props, speed, easing, callback)
              }
            }), jQuery.timers = [], jQuery.fx.tick = function() {
              var timer, i = 0,
                timers = jQuery.timers;
              for (fxNow = jQuery.now(); i < timers.length; i++) timer = timers[i], timer() || timers[i] !== timer || timers.splice(i--, 1);
              timers.length || jQuery.fx.stop(), fxNow = void 0
            }, jQuery.fx.timer = function(timer) {
              jQuery.timers.push(timer), timer() ? jQuery.fx.start() : jQuery.timers.pop()
            }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
              timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval))
            }, jQuery.fx.stop = function() {
              clearInterval(timerId), timerId = null
            }, jQuery.fx.speeds = {
              slow: 600,
              fast: 200,
              _default: 400
            }, jQuery.fn.delay = function(time, type) {
              return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", this.queue(type, function(next, hooks) {
                var timeout = setTimeout(next, time);
                hooks.stop = function() {
                  clearTimeout(timeout)
                }
              })
            },
            function() {
              var input = document.createElement("input"),
                select = document.createElement("select"),
                opt = select.appendChild(document.createElement("option"));
              input.type = "checkbox", support.checkOn = "" !== input.value, support.optSelected = opt.selected, select.disabled = !0, support.optDisabled = !opt.disabled, input = document.createElement("input"), input.value = "t", input.type = "radio", support.radioValue = "t" === input.value
            }();
            var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle;
            jQuery.fn.extend({
              attr: function(name, value) {
                return access(this, jQuery.attr, name, value, arguments.length > 1)
              },
              removeAttr: function(name) {
                return this.each(function() {
                  jQuery.removeAttr(this, name)
                })
              }
            }), jQuery.extend({
              attr: function(elem, name, value) {
                var hooks, ret, nType = elem.nodeType;
                if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return typeof elem.getAttribute === strundefined ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(), hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)), void 0 === value ? hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : (ret = jQuery.find.attr(elem, name), null == ret ? void 0 : ret) : null !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : (elem.setAttribute(name, value + ""), value) : void jQuery.removeAttr(elem, name))
              },
              removeAttr: function(elem, value) {
                var name, propName, i = 0,
                  attrNames = value && value.match(rnotwhite);
                if (attrNames && 1 === elem.nodeType)
                  for (; name = attrNames[i++];) propName = jQuery.propFix[name] || name, jQuery.expr.match.bool.test(name) && (elem[propName] = !1), elem.removeAttribute(name)
              },
              attrHooks: {
                type: {
                  set: function(elem, value) {
                    if (!support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                      var val = elem.value;
                      return elem.setAttribute("type", value), val && (elem.value = val), value
                    }
                  }
                }
              }
            }), boolHook = {
              set: function(elem, value, name) {
                return value === !1 ? jQuery.removeAttr(elem, name) : elem.setAttribute(name, name), name
              }
            }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
              var getter = attrHandle[name] || jQuery.find.attr;
              attrHandle[name] = function(elem, name, isXML) {
                var ret, handle;
                return isXML || (handle = attrHandle[name], attrHandle[name] = ret, ret = null != getter(elem, name, isXML) ? name.toLowerCase() : null, attrHandle[name] = handle), ret
              }
            });
            var rfocusable = /^(?:input|select|textarea|button)$/i;
            jQuery.fn.extend({
              prop: function(name, value) {
                return access(this, jQuery.prop, name, value, arguments.length > 1)
              },
              removeProp: function(name) {
                return this.each(function() {
                  delete this[jQuery.propFix[name] || name]
                })
              }
            }), jQuery.extend({
              propFix: {
                "for": "htmlFor",
                "class": "className"
              },
              prop: function(elem, name, value) {
                var ret, hooks, notxml, nType = elem.nodeType;
                if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return notxml = 1 !== nType || !jQuery.isXMLDoc(elem), notxml && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name]
              },
              propHooks: {
                tabIndex: {
                  get: function(elem) {
                    return elem.hasAttribute("tabindex") || rfocusable.test(elem.nodeName) || elem.href ? elem.tabIndex : -1
                  }
                }
              }
            }), support.optSelected || (jQuery.propHooks.selected = {
              get: function(elem) {
                var parent = elem.parentNode;
                return parent && parent.parentNode && parent.parentNode.selectedIndex, null
              }
            }), jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
              jQuery.propFix[this.toLowerCase()] = this
            });
            var rclass = /[\t\r\n\f]/g;
            jQuery.fn.extend({
              addClass: function(value) {
                var classes, elem, cur, clazz, j, finalValue, proceed = "string" == typeof value && value,
                  i = 0,
                  len = this.length;
                if (jQuery.isFunction(value)) return this.each(function(j) {
                  jQuery(this).addClass(value.call(this, j, this.className))
                });
                if (proceed)
                  for (classes = (value || "").match(rnotwhite) || []; len > i; i++)
                    if (elem = this[i], cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ")) {
                      for (j = 0; clazz = classes[j++];) cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                      finalValue = jQuery.trim(cur), elem.className !== finalValue && (elem.className = finalValue)
                    }
                return this
              },
              removeClass: function(value) {
                var classes, elem, cur, clazz, j, finalValue, proceed = 0 === arguments.length || "string" == typeof value && value,
                  i = 0,
                  len = this.length;
                if (jQuery.isFunction(value)) return this.each(function(j) {
                  jQuery(this).removeClass(value.call(this, j, this.className))
                });
                if (proceed)
                  for (classes = (value || "").match(rnotwhite) || []; len > i; i++)
                    if (elem = this[i], cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "")) {
                      for (j = 0; clazz = classes[j++];)
                        for (; cur.indexOf(" " + clazz + " ") >= 0;) cur = cur.replace(" " + clazz + " ", " ");
                      finalValue = value ? jQuery.trim(cur) : "", elem.className !== finalValue && (elem.className = finalValue)
                    }
                return this
              },
              toggleClass: function(value, stateVal) {
                var type = typeof value;
                return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : this.each(jQuery.isFunction(value) ? function(i) {
                  jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal)
                } : function() {
                  if ("string" === type)
                    for (var className, i = 0, self = jQuery(this), classNames = value.match(rnotwhite) || []; className = classNames[i++];) self.hasClass(className) ? self.removeClass(className) : self.addClass(className);
                  else(type === strundefined || "boolean" === type) && (this.className && data_priv.set(this, "__className__", this.className), this.className = this.className || value === !1 ? "" : data_priv.get(this, "__className__") || "")
                })
              },
              hasClass: function(selector) {
                for (var className = " " + selector + " ", i = 0, l = this.length; l > i; i++)
                  if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) return !0;
                return !1
              }
            });
            var rreturn = /\r/g;
            jQuery.fn.extend({
              val: function(value) {
                var hooks, ret, isFunction, elem = this[0]; {
                  if (arguments.length) return isFunction = jQuery.isFunction(value), this.each(function(i) {
                    var val;
                    1 === this.nodeType && (val = isFunction ? value.call(this, i, jQuery(this).val()) : value, null == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
                      return null == value ? "" : value + ""
                    })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], hooks && "set" in hooks && void 0 !== hooks.set(this, val, "value") || (this.value = val))
                  });
                  if (elem) return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, "value")) ? ret : (ret = elem.value, "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret)
                }
              }
            }), jQuery.extend({
              valHooks: {
                option: {
                  get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return null != val ? val : jQuery.trim(jQuery.text(elem))
                  }
                },
                select: {
                  get: function(elem) {
                    for (var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || 0 > index, values = one ? null : [], max = one ? index + 1 : options.length, i = 0 > index ? max : one ? index : 0; max > i; i++)
                      if (option = options[i], !(!option.selected && i !== index || (support.optDisabled ? option.disabled : null !== option.getAttribute("disabled")) || option.parentNode.disabled && jQuery.nodeName(option.parentNode, "optgroup"))) {
                        if (value = jQuery(option).val(), one) return value;
                        values.push(value)
                      }
                    return values
                  },
                  set: function(elem, value) {
                    for (var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length; i--;) option = options[i], (option.selected = jQuery.inArray(option.value, values) >= 0) && (optionSet = !0);
                    return optionSet || (elem.selectedIndex = -1), values
                  }
                }
              }
            }), jQuery.each(["radio", "checkbox"], function() {
              jQuery.valHooks[this] = {
                set: function(elem, value) {
                  return jQuery.isArray(value) ? elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0 : void 0
                }
              }, support.checkOn || (jQuery.valHooks[this].get = function(elem) {
                return null === elem.getAttribute("value") ? "on" : elem.value
              })
            }), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) {
              jQuery.fn[name] = function(data, fn) {
                return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name)
              }
            }), jQuery.fn.extend({
              hover: function(fnOver, fnOut) {
                return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
              },
              bind: function(types, data, fn) {
                return this.on(types, null, data, fn)
              },
              unbind: function(types, fn) {
                return this.off(types, null, fn)
              },
              delegate: function(selector, types, data, fn) {
                return this.on(types, selector, data, fn)
              },
              undelegate: function(selector, types, fn) {
                return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn)
              }
            });
            var nonce = jQuery.now(),
              rquery = /\?/;
            jQuery.parseJSON = function(data) {
              return JSON.parse(data + "")
            }, jQuery.parseXML = function(data) {
              var xml, tmp;
              if (!data || "string" != typeof data) return null;
              try {
                tmp = new DOMParser, xml = tmp.parseFromString(data, "text/xml")
              } catch (e) {
                xml = void 0
              }
              return (!xml || xml.getElementsByTagName("parsererror").length) && jQuery.error("Invalid XML: " + data), xml
            };
            var ajaxLocParts, ajaxLocation, rhash = /#.*$/,
              rts = /([?&])_=[^&]*/,
              rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm,
              rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
              rnoContent = /^(?:GET|HEAD)$/,
              rprotocol = /^\/\//,
              rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
              prefilters = {},
              transports = {},
              allTypes = "*/".concat("*");
            try {
              ajaxLocation = location.href
            } catch (e) {
              ajaxLocation = document.createElement("a"), ajaxLocation.href = "", ajaxLocation = ajaxLocation.href
            }
            ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.extend({
              active: 0,
              lastModified: {},
              etag: {},
              ajaxSettings: {
                url: ajaxLocation,
                type: "GET",
                isLocal: rlocalProtocol.test(ajaxLocParts[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                  "*": allTypes,
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
                  "text json": jQuery.parseJSON,
                  "text xml": jQuery.parseXML
                },
                flatOptions: {
                  url: !0,
                  context: !0
                }
              },
              ajaxSetup: function(target, settings) {
                return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target)
              },
              ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
              ajaxTransport: addToPrefiltersOrTransports(transports),
              ajax: function(url, options) {
                function done(status, nativeStatusText, responses, headers) {
                  var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                  2 !== state && (state = 2, timeoutTimer && clearTimeout(timeoutTimer), transport = void 0, responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, isSuccess = status >= 200 && 300 > status || 304 === status, responses && (response = ajaxHandleResponses(s, jqXHR, responses)), response = ajaxConvert(s, response, jqXHR, isSuccess), isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), modified && (jQuery.lastModified[cacheURL] = modified), modified = jqXHR.getResponseHeader("etag"), modified && (jQuery.etag[cacheURL] = modified)), 204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state, success = response.data, error = response.error, isSuccess = !error)) : (error = statusText, (status || !statusText) && (statusText = "error", 0 > status && (status = 0))), jqXHR.status = status, jqXHR.statusText = (nativeStatusText || statusText) + "", isSuccess ? deferred.resolveWith(callbackContext, [success, statusText, jqXHR]) : deferred.rejectWith(callbackContext, [jqXHR, statusText, error]), jqXHR.statusCode(statusCode), statusCode = void 0, fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]), completeDeferred.fireWith(callbackContext, [jqXHR, statusText]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [jqXHR, s]), --jQuery.active || jQuery.event.trigger("ajaxStop")))
                }
                "object" == typeof url && (options = url, url = void 0), options = options || {};
                var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options),
                  callbackContext = s.context || s,
                  globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
                  deferred = jQuery.Deferred(),
                  completeDeferred = jQuery.Callbacks("once memory"),
                  statusCode = s.statusCode || {},
                  requestHeaders = {},
                  requestHeadersNames = {},
                  state = 0,
                  strAbort = "canceled",
                  jqXHR = {
                    readyState: 0,
                    getResponseHeader: function(key) {
                      var match;
                      if (2 === state) {
                        if (!responseHeaders)
                          for (responseHeaders = {}; match = rheaders.exec(responseHeadersString);) responseHeaders[match[1].toLowerCase()] = match[2];
                        match = responseHeaders[key.toLowerCase()]
                      }
                      return null == match ? null : match
                    },
                    getAllResponseHeaders: function() {
                      return 2 === state ? responseHeadersString : null
                    },
                    setRequestHeader: function(name, value) {
                      var lname = name.toLowerCase();
                      return state || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, requestHeaders[name] = value), this
                    },
                    overrideMimeType: function(type) {
                      return state || (s.mimeType = type), this
                    },
                    statusCode: function(map) {
                      var code;
                      if (map)
                        if (2 > state)
                          for (code in map) statusCode[code] = [statusCode[code], map[code]];
                        else jqXHR.always(map[jqXHR.status]);
                      return this
                    },
                    abort: function(statusText) {
                      var finalText = statusText || strAbort;
                      return transport && transport.abort(finalText), done(0, finalText), this
                    }
                  };
                if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, jqXHR.error = jqXHR.fail, s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), s.type = options.method || options.type || s.method || s.type, s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""], null == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()), s.crossDomain = !(!parts || parts[1] === ajaxLocParts[1] && parts[2] === ajaxLocParts[2] && (parts[3] || ("http:" === parts[1] ? "80" : "443")) === (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? "80" : "443")))), s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state) return jqXHR;
                fireGlobals = s.global, fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), cacheURL = s.url, s.hasContent || (s.data && (cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data, delete s.data), s.cache === !1 && (s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++)), s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])), (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
                for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
                if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state)) return jqXHR.abort();
                strAbort = "abort";
                for (i in {
                  success: 1,
                  error: 1,
                  complete: 1
                }) jqXHR[i](s[i]);
                if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                  jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [jqXHR, s]), s.async && s.timeout > 0 && (timeoutTimer = setTimeout(function() {
                    jqXHR.abort("timeout")
                  }, s.timeout));
                  try {
                    state = 1, transport.send(requestHeaders, done)
                  } catch (e) {
                    if (!(2 > state)) throw e;
                    done(-1, e)
                  }
                } else done(-1, "No Transport");
                return jqXHR
              },
              getJSON: function(url, data, callback) {
                return jQuery.get(url, data, callback, "json")
              },
              getScript: function(url, callback) {
                return jQuery.get(url, void 0, callback, "script")
              }
            }), jQuery.each(["get", "post"], function(i, method) {
              jQuery[method] = function(url, data, callback, type) {
                return jQuery.isFunction(data) && (type = type || callback, callback = data, data = void 0), jQuery.ajax({
                  url: url,
                  type: method,
                  dataType: type,
                  data: data,
                  success: callback
                })
              }
            }), jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
              jQuery.fn[type] = function(fn) {
                return this.on(type, fn)
              }
            }), jQuery._evalUrl = function(url) {
              return jQuery.ajax({
                url: url,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
              })
            }, jQuery.fn.extend({
              wrapAll: function(html) {
                var wrap;
                return jQuery.isFunction(html) ? this.each(function(i) {
                  jQuery(this).wrapAll(html.call(this, i))
                }) : (this[0] && (wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function() {
                  for (var elem = this; elem.firstElementChild;) elem = elem.firstElementChild;
                  return elem
                }).append(this)), this)
              },
              wrapInner: function(html) {
                return this.each(jQuery.isFunction(html) ? function(i) {
                  jQuery(this).wrapInner(html.call(this, i))
                } : function() {
                  var self = jQuery(this),
                    contents = self.contents();
                  contents.length ? contents.wrapAll(html) : self.append(html)
                })
              },
              wrap: function(html) {
                var isFunction = jQuery.isFunction(html);
                return this.each(function(i) {
                  jQuery(this).wrapAll(isFunction ? html.call(this, i) : html)
                })
              },
              unwrap: function() {
                return this.parent().each(function() {
                  jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes)
                }).end()
              }
            }), jQuery.expr.filters.hidden = function(elem) {
              return elem.offsetWidth <= 0 && elem.offsetHeight <= 0
            }, jQuery.expr.filters.visible = function(elem) {
              return !jQuery.expr.filters.hidden(elem)
            };
            var r20 = /%20/g,
              rbracket = /\[\]$/,
              rCRLF = /\r?\n/g,
              rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
              rsubmittable = /^(?:input|select|textarea|keygen)/i;
            jQuery.param = function(a, traditional) {
              var prefix, s = [],
                add = function(key, value) {
                  value = jQuery.isFunction(value) ? value() : null == value ? "" : value, s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
                };
              if (void 0 === traditional && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
                add(this.name, this.value)
              });
              else
                for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
              return s.join("&").replace(r20, "+")
            }, jQuery.fn.extend({
              serialize: function() {
                return jQuery.param(this.serializeArray())
              },
              serializeArray: function() {
                return this.map(function() {
                  var elements = jQuery.prop(this, "elements");
                  return elements ? jQuery.makeArray(elements) : this
                }).filter(function() {
                  var type = this.type;
                  return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type))
                }).map(function(i, elem) {
                  var val = jQuery(this).val();
                  return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                      name: elem.name,
                      value: val.replace(rCRLF, "\r\n")
                    }
                  }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                  }
                }).get()
              }
            }), jQuery.ajaxSettings.xhr = function() {
              try {
                return new XMLHttpRequest
              } catch (e) {}
            };
            var xhrId = 0,
              xhrCallbacks = {},
              xhrSuccessStatus = {
                0: 200,
                1223: 204
              },
              xhrSupported = jQuery.ajaxSettings.xhr();
            window.ActiveXObject && jQuery(window).on("unload", function() {
              for (var key in xhrCallbacks) xhrCallbacks[key]()
            }), support.cors = !!xhrSupported && "withCredentials" in xhrSupported, support.ajax = xhrSupported = !!xhrSupported, jQuery.ajaxTransport(function(options) {
              var callback;
              return support.cors || xhrSupported && !options.crossDomain ? {
                send: function(headers, complete) {
                  var i, xhr = options.xhr(),
                    id = ++xhrId;
                  if (xhr.open(options.type, options.url, options.async, options.username, options.password), options.xhrFields)
                    for (i in options.xhrFields) xhr[i] = options.xhrFields[i];
                  options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType), options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                  for (i in headers) xhr.setRequestHeader(i, headers[i]);
                  callback = function(type) {
                    return function() {
                      callback && (delete xhrCallbacks[id], callback = xhr.onload = xhr.onerror = null, "abort" === type ? xhr.abort() : "error" === type ? complete(xhr.status, xhr.statusText) : complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, "string" == typeof xhr.responseText ? {
                        text: xhr.responseText
                      } : void 0, xhr.getAllResponseHeaders()))
                    }
                  }, xhr.onload = callback(), xhr.onerror = callback("error"), callback = xhrCallbacks[id] = callback("abort");
                  try {
                    xhr.send(options.hasContent && options.data || null)
                  } catch (e) {
                    if (callback) throw e
                  }
                },
                abort: function() {
                  callback && callback()
                }
              } : void 0
            }), jQuery.ajaxSetup({
              accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
              },
              contents: {
                script: /(?:java|ecma)script/
              },
              converters: {
                "text script": function(text) {
                  return jQuery.globalEval(text), text
                }
              }
            }), jQuery.ajaxPrefilter("script", function(s) {
              void 0 === s.cache && (s.cache = !1), s.crossDomain && (s.type = "GET")
            }), jQuery.ajaxTransport("script", function(s) {
              if (s.crossDomain) {
                var script, callback;
                return {
                  send: function(_, complete) {
                    script = jQuery("<script>").prop({
                      async: !0,
                      charset: s.scriptCharset,
                      src: s.url
                    }).on("load error", callback = function(evt) {
                      script.remove(), callback = null, evt && complete("error" === evt.type ? 404 : 200, evt.type)
                    }), document.head.appendChild(script[0])
                  },
                  abort: function() {
                    callback && callback()
                  }
                }
              }
            });
            var oldCallbacks = [],
              rjsonp = /(=)\?(?=&|$)|\?\?/;
            jQuery.ajaxSetup({
              jsonp: "callback",
              jsonpCallback: function() {
                var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
                return this[callback] = !0, callback
              }
            }), jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
              var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
              return jsonProp || "jsonp" === s.dataTypes[0] ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), s.converters["script json"] = function() {
                return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0]
              }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
                responseContainer = arguments
              }, jqXHR.always(function() {
                window[callbackName] = overwritten, s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, oldCallbacks.push(callbackName)), responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), responseContainer = overwritten = void 0
              }), "script") : void 0
            }), jQuery.parseHTML = function(data, context, keepScripts) {
              if (!data || "string" != typeof data) return null;
              "boolean" == typeof context && (keepScripts = context, context = !1), context = context || document;
              var parsed = rsingleTag.exec(data),
                scripts = !keepScripts && [];
              return parsed ? [context.createElement(parsed[1])] : (parsed = jQuery.buildFragment([data], context, scripts), scripts && scripts.length && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes))
            };
            var _load = jQuery.fn.load;
            jQuery.fn.load = function(url, params, callback) {
              if ("string" != typeof url && _load) return _load.apply(this, arguments);
              var selector, type, response, self = this,
                off = url.indexOf(" ");
              return off >= 0 && (selector = jQuery.trim(url.slice(off)), url = url.slice(0, off)), jQuery.isFunction(params) ? (callback = params, params = void 0) : params && "object" == typeof params && (type = "POST"), self.length > 0 && jQuery.ajax({
                url: url,
                type: type,
                dataType: "html",
                data: params
              }).done(function(responseText) {
                response = arguments, self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText)
              }).complete(callback && function(jqXHR, status) {
                self.each(callback, response || [jqXHR.responseText, status, jqXHR])
              }), this
            }, jQuery.expr.filters.animated = function(elem) {
              return jQuery.grep(jQuery.timers, function(fn) {
                return elem === fn.elem
              }).length
            };
            var docElem = window.document.documentElement;
            jQuery.offset = {
              setOffset: function(elem, options, i) {
                var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"),
                  curElem = jQuery(elem),
                  props = {};
                "static" === position && (elem.style.position = "relative"), curOffset = curElem.offset(), curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && (curCSSTop + curCSSLeft).indexOf("auto") > -1, calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), jQuery.isFunction(options) && (options = options.call(elem, i, curOffset)), null != options.top && (props.top = options.top - curOffset.top + curTop), null != options.left && (props.left = options.left - curOffset.left + curLeft), "using" in options ? options.using.call(elem, props) : curElem.css(props)
              }
            }, jQuery.fn.extend({
              offset: function(options) {
                if (arguments.length) return void 0 === options ? this : this.each(function(i) {
                  jQuery.offset.setOffset(this, options, i)
                });
                var docElem, win, elem = this[0],
                  box = {
                    top: 0,
                    left: 0
                  },
                  doc = elem && elem.ownerDocument;
                if (doc) return docElem = doc.documentElement, jQuery.contains(docElem, elem) ? (typeof elem.getBoundingClientRect !== strundefined && (box = elem.getBoundingClientRect()), win = getWindow(doc), {
                  top: box.top + win.pageYOffset - docElem.clientTop,
                  left: box.left + win.pageXOffset - docElem.clientLeft
                }) : box
              },
              position: function() {
                if (this[0]) {
                  var offsetParent, offset, elem = this[0],
                    parentOffset = {
                      top: 0,
                      left: 0
                    };
                  return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(), offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0)), {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                  }
                }
              },
              offsetParent: function() {
                return this.map(function() {
                  for (var offsetParent = this.offsetParent || docElem; offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position");) offsetParent = offsetParent.offsetParent;
                  return offsetParent || docElem
                })
              }
            }), jQuery.each({
              scrollLeft: "pageXOffset",
              scrollTop: "pageYOffset"
            }, function(method, prop) {
              var top = "pageYOffset" === prop;
              jQuery.fn[method] = function(val) {
                return access(this, function(elem, method, val) {
                  var win = getWindow(elem);
                  return void 0 === val ? win ? win[prop] : elem[method] : void(win ? win.scrollTo(top ? window.pageXOffset : val, top ? val : window.pageYOffset) : elem[method] = val)
                }, method, val, arguments.length, null)
              }
            }), jQuery.each(["top", "left"], function(i, prop) {
              jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
                return computed ? (computed = curCSS(elem, prop), rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed) : void 0
              })
            }), jQuery.each({
              Height: "height",
              Width: "width"
            }, function(name, type) {
              jQuery.each({
                padding: "inner" + name,
                content: type,
                "": "outer" + name
              }, function(defaultExtra, funcName) {
                jQuery.fn[funcName] = function(margin, value) {
                  var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin),
                    extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                  return access(this, function(elem, type, value) {
                    var doc;
                    return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === value ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra)
                  }, type, chainable ? margin : void 0, chainable, null)
                }
              })
            }), jQuery.fn.size = function() {
              return this.length
            }, jQuery.fn.andSelf = jQuery.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
              return jQuery
            });
            var _jQuery = window.jQuery,
              _$ = window.$;
            return jQuery.noConflict = function(deep) {
              return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), jQuery
            }, typeof noGlobal === strundefined && (window.jQuery = window.$ = jQuery), jQuery
          }), browserify_shim__define__module__export__("undefined" != typeof $ ? $ : window.$)
        }).call(global, void 0, void 0, void 0, function(ex) {
          module.exports = ex
        })
      }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}
  ],
  33: [
    function(require, module, exports) {
      (function(global) {
        (function() {
          function baseIndexOf(array, value, fromIndex) {
            for (var index = (fromIndex || 0) - 1, length = array ? array.length : 0; ++index < length;)
              if (array[index] === value) return index;
            return -1
          }

          function cacheIndexOf(cache, value) {
            var type = typeof value;
            if (cache = cache.cache, "boolean" == type || null == value) return cache[value] ? 0 : -1;
            "number" != type && "string" != type && (type = "object");
            var key = "number" == type ? value : keyPrefix + value;
            return cache = (cache = cache[type]) && cache[key], "object" == type ? cache && baseIndexOf(cache, value) > -1 ? 0 : -1 : cache ? 0 : -1
          }

          function cachePush(value) {
            var cache = this.cache,
              type = typeof value;
            if ("boolean" == type || null == value) cache[value] = !0;
            else {
              "number" != type && "string" != type && (type = "object");
              var key = "number" == type ? value : keyPrefix + value,
                typeCache = cache[type] || (cache[type] = {});
              "object" == type ? (typeCache[key] || (typeCache[key] = [])).push(value) : typeCache[key] = !0
            }
          }

          function charAtCallback(value) {
            return value.charCodeAt(0)
          }

          function compareAscending(a, b) {
            var ac = a.criteria,
              bc = b.criteria;
            if (ac !== bc) {
              if (ac > bc || "undefined" == typeof ac) return 1;
              if (bc > ac || "undefined" == typeof bc) return -1
            }
            return a.index - b.index
          }

          function createCache(array) {
            var index = -1,
              length = array.length,
              first = array[0],
              mid = array[length / 2 | 0],
              last = array[length - 1];
            if (first && "object" == typeof first && mid && "object" == typeof mid && last && "object" == typeof last) return !1;
            var cache = getObject();
            cache["false"] = cache["null"] = cache["true"] = cache.undefined = !1;
            var result = getObject();
            for (result.array = array, result.cache = cache, result.push = cachePush; ++index < length;) result.push(array[index]);
            return result
          }

          function escapeStringChar(match) {
            return "\\" + stringEscapes[match]
          }

          function getArray() {
            return arrayPool.pop() || []
          }

          function getObject() {
            return objectPool.pop() || {
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

          function noop() {}

          function releaseArray(array) {
            array.length = 0, arrayPool.length < maxPoolSize && arrayPool.push(array)
          }

          function releaseObject(object) {
            var cache = object.cache;
            cache && releaseObject(cache), object.array = object.cache = object.criteria = object.object = object.number = object.string = object.value = null, objectPool.length < maxPoolSize && objectPool.push(object)
          }

          function slice(array, start, end) {
            start || (start = 0), "undefined" == typeof end && (end = array ? array.length : 0);
            for (var index = -1, length = end - start || 0, result = Array(0 > length ? 0 : length); ++index < length;) result[index] = array[start + index];
            return result
          }

          function runInContext(context) {
            function lodash(value) {
              return value && "object" == typeof value && !isArray(value) && hasOwnProperty.call(value, "__wrapped__") ? value : new lodashWrapper(value)
            }

            function lodashWrapper(value, chainAll) {
              this.__chain__ = !!chainAll, this.__wrapped__ = value
            }

            function baseClone(value, deep, callback, stackA, stackB) {
              if (callback) {
                var result = callback(value);
                if ("undefined" != typeof result) return result
              }
              var isObj = isObject(value);
              if (!isObj) return value;
              var className = toString.call(value);
              if (!cloneableClasses[className]) return value;
              var ctor = ctorByClass[className];
              switch (className) {
                case boolClass:
                case dateClass:
                  return new ctor(+value);
                case numberClass:
                case stringClass:
                  return new ctor(value);
                case regexpClass:
                  return result = ctor(value.source, reFlags.exec(value)), result.lastIndex = value.lastIndex, result
              }
              var isArr = isArray(value);
              if (deep) {
                var initedStack = !stackA;
                stackA || (stackA = getArray()), stackB || (stackB = getArray());
                for (var length = stackA.length; length--;)
                  if (stackA[length] == value) return stackB[length];
                result = isArr ? ctor(value.length) : {}
              } else result = isArr ? slice(value) : assign({}, value);
              return isArr && (hasOwnProperty.call(value, "index") && (result.index = value.index), hasOwnProperty.call(value, "input") && (result.input = value.input)), deep ? (stackA.push(value), stackB.push(result), (isArr ? forEach : forOwn)(value, function(objValue, key) {
                result[key] = baseClone(objValue, deep, callback, stackA, stackB)
              }), initedStack && (releaseArray(stackA), releaseArray(stackB)), result) : result
            }

            function baseCreateCallback(func, thisArg, argCount) {
              if ("function" != typeof func) return identity;
              if ("undefined" == typeof thisArg) return func;
              var bindData = func.__bindData__ || support.funcNames && !func.name;
              if ("undefined" == typeof bindData) {
                var source = reThis && fnToString.call(func);
                support.funcNames || !source || reFuncName.test(source) || (bindData = !0), (support.funcNames || !bindData) && (bindData = !support.funcDecomp || reThis.test(source), setBindData(func, bindData))
              }
              if (bindData !== !0 && bindData && 1 & bindData[1]) return func;
              switch (argCount) {
                case 1:
                  return function(value) {
                    return func.call(thisArg, value)
                  };
                case 2:
                  return function(a, b) {
                    return func.call(thisArg, a, b)
                  };
                case 3:
                  return function(value, index, collection) {
                    return func.call(thisArg, value, index, collection)
                  };
                case 4:
                  return function(accumulator, value, index, collection) {
                    return func.call(thisArg, accumulator, value, index, collection)
                  }
              }
              return bind(func, thisArg)
            }

            function baseFlatten(array, isShallow, isArgArrays, fromIndex) {
              for (var index = (fromIndex || 0) - 1, length = array ? array.length : 0, result = []; ++index < length;) {
                var value = array[index];
                if (value && "object" == typeof value && "number" == typeof value.length && (isArray(value) || isArguments(value))) {
                  isShallow || (value = baseFlatten(value, isShallow, isArgArrays));
                  var valIndex = -1,
                    valLength = value.length,
                    resIndex = result.length;
                  for (result.length += valLength; ++valIndex < valLength;) result[resIndex++] = value[valIndex]
                } else isArgArrays || result.push(value)
              }
              return result
            }

            function baseIsEqual(a, b, callback, isWhere, stackA, stackB) {
              if (callback) {
                var result = callback(a, b);
                if ("undefined" != typeof result) return !!result
              }
              if (a === b) return 0 !== a || 1 / a == 1 / b;
              var type = typeof a,
                otherType = typeof b;
              if (!(a !== a || a && objectTypes[type] || b && objectTypes[otherType])) return !1;
              if (null == a || null == b) return a === b;
              var className = toString.call(a),
                otherClass = toString.call(b);
              if (className == argsClass && (className = objectClass), otherClass == argsClass && (otherClass = objectClass), className != otherClass) return !1;
              switch (className) {
                case boolClass:
                case dateClass:
                  return +a == +b;
                case numberClass:
                  return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;
                case regexpClass:
                case stringClass:
                  return a == String(b)
              }
              var isArr = className == arrayClass;
              if (!isArr) {
                if (hasOwnProperty.call(a, "__wrapped__ ") || hasOwnProperty.call(b, "__wrapped__")) return baseIsEqual(a.__wrapped__ || a, b.__wrapped__ || b, callback, isWhere, stackA, stackB);
                if (className != objectClass) return !1;
                var ctorA = a.constructor,
                  ctorB = b.constructor;
                if (ctorA != ctorB && !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB)) return !1
              }
              var initedStack = !stackA;
              stackA || (stackA = getArray()), stackB || (stackB = getArray());
              for (var length = stackA.length; length--;)
                if (stackA[length] == a) return stackB[length] == b;
              var size = 0;
              if (result = !0, stackA.push(a), stackB.push(b), isArr) {
                if (length = a.length, size = b.length, result = size == a.length, !result && !isWhere) return result;
                for (; size--;) {
                  var index = length,
                    value = b[size];
                  if (isWhere)
                    for (; index-- && !(result = baseIsEqual(a[index], value, callback, isWhere, stackA, stackB)););
                  else if (!(result = baseIsEqual(a[size], value, callback, isWhere, stackA, stackB))) break
                }
                return result
              }
              return forIn(b, function(value, key, b) {
                return hasOwnProperty.call(b, key) ? (size++, result = hasOwnProperty.call(a, key) && baseIsEqual(a[key], value, callback, isWhere, stackA, stackB)) : void 0
              }), result && !isWhere && forIn(a, function(value, key, a) {
                return hasOwnProperty.call(a, key) ? result = --size > -1 : void 0
              }), initedStack && (releaseArray(stackA), releaseArray(stackB)), result
            }

            function baseMerge(object, source, callback, stackA, stackB) {
              (isArray(source) ? forEach : forOwn)(source, function(source, key) {
                var found, isArr, result = source,
                  value = object[key];
                if (source && ((isArr = isArray(source)) || isPlainObject(source))) {
                  for (var stackLength = stackA.length; stackLength--;)
                    if (found = stackA[stackLength] == source) {
                      value = stackB[stackLength];
                      break
                    }
                  if (!found) {
                    var isShallow;
                    callback && (result = callback(value, source), (isShallow = "undefined" != typeof result) && (value = result)), isShallow || (value = isArr ? isArray(value) ? value : [] : isPlainObject(value) ? value : {}), stackA.push(source), stackB.push(value), isShallow || baseMerge(value, source, callback, stackA, stackB)
                  }
                } else callback && (result = callback(value, source), "undefined" == typeof result && (result = source)), "undefined" != typeof result && (value = result);
                object[key] = value
              })
            }

            function baseUniq(array, isSorted, callback) {
              var index = -1,
                indexOf = getIndexOf(),
                length = array ? array.length : 0,
                result = [],
                isLarge = !isSorted && length >= largeArraySize && indexOf === baseIndexOf,
                seen = callback || isLarge ? getArray() : result;
              if (isLarge) {
                var cache = createCache(seen);
                cache ? (indexOf = cacheIndexOf, seen = cache) : (isLarge = !1, seen = callback ? seen : (releaseArray(seen), result))
              }
              for (; ++index < length;) {
                var value = array[index],
                  computed = callback ? callback(value, index, array) : value;
                (isSorted ? !index || seen[seen.length - 1] !== computed : indexOf(seen, computed) < 0) && ((callback || isLarge) && seen.push(computed), result.push(value))
              }
              return isLarge ? (releaseArray(seen.array), releaseObject(seen)) : callback && releaseArray(seen), result
            }

            function createAggregator(setter) {
              return function(collection, callback, thisArg) {
                var result = {};
                callback = lodash.createCallback(callback, thisArg, 3);
                var index = -1,
                  length = collection ? collection.length : 0;
                if ("number" == typeof length)
                  for (; ++index < length;) {
                    var value = collection[index];
                    setter(result, value, callback(value, index, collection), collection)
                  } else forOwn(collection, function(value, key, collection) {
                    setter(result, value, callback(value, key, collection), collection)
                  });
                return result
              }
            }

            function createBound(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
              var isBind = 1 & bitmask,
                isBindKey = 2 & bitmask,
                isCurry = 4 & bitmask,
                isCurryBound = 8 & bitmask,
                isPartial = 16 & bitmask,
                isPartialRight = 32 & bitmask,
                key = func;
              if (!isBindKey && !isFunction(func)) throw new TypeError;
              isPartial && !partialArgs.length && (bitmask &= -17, isPartial = partialArgs = !1), isPartialRight && !partialRightArgs.length && (bitmask &= -33, isPartialRight = partialRightArgs = !1);
              var bindData = func && func.__bindData__;
              if (bindData) return !isBind || 1 & bindData[1] || (bindData[4] = thisArg), !isBind && 1 & bindData[1] && (bitmask |= 8), !isCurry || 4 & bindData[1] || (bindData[5] = arity), isPartial && push.apply(bindData[2] || (bindData[2] = []), partialArgs), isPartialRight && push.apply(bindData[3] || (bindData[3] = []), partialRightArgs), bindData[1] |= bitmask, createBound.apply(null, bindData);
              if (isBind && !(isBindKey || isCurry || isPartialRight) && (support.fastBind || nativeBind && isPartial)) {
                if (isPartial) {
                  var args = [thisArg];
                  push.apply(args, partialArgs)
                }
                var bound = isPartial ? nativeBind.apply(func, args) : nativeBind.call(func, thisArg)
              } else bound = function() {
                var args = arguments,
                  thisBinding = isBind ? thisArg : this;
                if ((isCurry || isPartial || isPartialRight) && (args = nativeSlice.call(args), isPartial && unshift.apply(args, partialArgs), isPartialRight && push.apply(args, partialRightArgs), isCurry && args.length < arity)) return bitmask |= 16, createBound(func, isCurryBound ? bitmask : -4 & bitmask, args, null, thisArg, arity);
                if (isBindKey && (func = thisBinding[key]), this instanceof bound) {
                  thisBinding = createObject(func.prototype);
                  var result = func.apply(thisBinding, args);
                  return isObject(result) ? result : thisBinding
                }
                return func.apply(thisBinding, args)
              };
              return setBindData(bound, nativeSlice.call(arguments)), bound
            }

            function createObject(prototype) {
              return isObject(prototype) ? nativeCreate(prototype) : {}
            }

            function escapeHtmlChar(match) {
              return htmlEscapes[match]
            }

            function getIndexOf() {
              var result = (result = lodash.indexOf) === indexOf ? baseIndexOf : result;
              return result
            }

            function shimIsPlainObject(value) {
              var ctor, result;
              return value && toString.call(value) == objectClass && (ctor = value.constructor, !isFunction(ctor) || ctor instanceof ctor) ? (forIn(value, function(value, key) {
                result = key
              }), "undefined" == typeof result || hasOwnProperty.call(value, result)) : !1
            }

            function unescapeHtmlChar(match) {
              return htmlUnescapes[match]
            }

            function isArguments(value) {
              return value && "object" == typeof value && "number" == typeof value.length && toString.call(value) == argsClass || !1
            }

            function clone(value, deep, callback, thisArg) {
              return "boolean" != typeof deep && null != deep && (thisArg = callback, callback = deep, deep = !1), baseClone(value, deep, "function" == typeof callback && baseCreateCallback(callback, thisArg, 1))
            }

            function cloneDeep(value, callback, thisArg) {
              return baseClone(value, !0, "function" == typeof callback && baseCreateCallback(callback, thisArg, 1))
            }

            function findKey(object, callback, thisArg) {
              var result;
              return callback = lodash.createCallback(callback, thisArg, 3), forOwn(object, function(value, key, object) {
                return callback(value, key, object) ? (result = key, !1) : void 0
              }), result
            }

            function findLastKey(object, callback, thisArg) {
              var result;
              return callback = lodash.createCallback(callback, thisArg, 3), forOwnRight(object, function(value, key, object) {
                return callback(value, key, object) ? (result = key, !1) : void 0
              }), result
            }

            function forInRight(object, callback, thisArg) {
              var pairs = [];
              forIn(object, function(value, key) {
                pairs.push(key, value)
              });
              var length = pairs.length;
              for (callback = baseCreateCallback(callback, thisArg, 3); length-- && callback(pairs[length--], pairs[length], object) !== !1;);
              return object
            }

            function forOwnRight(object, callback, thisArg) {
              var props = keys(object),
                length = props.length;
              for (callback = baseCreateCallback(callback, thisArg, 3); length--;) {
                var key = props[length];
                if (callback(object[key], key, object) === !1) break
              }
              return object
            }

            function functions(object) {
              var result = [];
              return forIn(object, function(value, key) {
                isFunction(value) && result.push(key)
              }), result.sort()
            }

            function has(object, property) {
              return object ? hasOwnProperty.call(object, property) : !1
            }

            function invert(object) {
              for (var index = -1, props = keys(object), length = props.length, result = {}; ++index < length;) {
                var key = props[index];
                result[object[key]] = key
              }
              return result
            }

            function isBoolean(value) {
              return value === !0 || value === !1 || toString.call(value) == boolClass
            }

            function isDate(value) {
              return value ? "object" == typeof value && toString.call(value) == dateClass : !1
            }

            function isElement(value) {
              return value ? 1 === value.nodeType : !1
            }

            function isEmpty(value) {
              var result = !0;
              if (!value) return result;
              var className = toString.call(value),
                length = value.length;
              return className == arrayClass || className == stringClass || className == argsClass || className == objectClass && "number" == typeof length && isFunction(value.splice) ? !length : (forOwn(value, function() {
                return result = !1
              }), result)
            }

            function isEqual(a, b, callback, thisArg) {
              return baseIsEqual(a, b, "function" == typeof callback && baseCreateCallback(callback, thisArg, 2))
            }

            function isFinite(value) {
              return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value))
            }

            function isFunction(value) {
              return "function" == typeof value
            }

            function isObject(value) {
              return !(!value || !objectTypes[typeof value])
            }

            function isNaN(value) {
              return isNumber(value) && value != +value
            }

            function isNull(value) {
              return null === value
            }

            function isNumber(value) {
              return "number" == typeof value || toString.call(value) == numberClass
            }

            function isRegExp(value) {
              return value ? "object" == typeof value && toString.call(value) == regexpClass : !1
            }

            function isString(value) {
              return "string" == typeof value || toString.call(value) == stringClass
            }

            function isUndefined(value) {
              return "undefined" == typeof value
            }

            function merge(object) {
              var args = arguments,
                length = 2;
              if (!isObject(object)) return object;
              if ("number" != typeof args[2] && (length = args.length), length > 3 && "function" == typeof args[length - 2]) var callback = baseCreateCallback(args[--length - 1], args[length--], 2);
              else length > 2 && "function" == typeof args[length - 1] && (callback = args[--length]);
              for (var sources = nativeSlice.call(arguments, 1, length), index = -1, stackA = getArray(), stackB = getArray(); ++index < length;) baseMerge(object, sources[index], callback, stackA, stackB);
              return releaseArray(stackA), releaseArray(stackB), object
            }

            function omit(object, callback, thisArg) {
              var indexOf = getIndexOf(),
                isFunc = "function" == typeof callback,
                result = {};
              if (isFunc) callback = lodash.createCallback(callback, thisArg, 3);
              else var props = baseFlatten(arguments, !0, !1, 1);
              return forIn(object, function(value, key, object) {
                (isFunc ? !callback(value, key, object) : indexOf(props, key) < 0) && (result[key] = value)
              }), result
            }

            function pairs(object) {
              for (var index = -1, props = keys(object), length = props.length, result = Array(length); ++index < length;) {
                var key = props[index];
                result[index] = [key, object[key]]
              }
              return result
            }

            function pick(object, callback, thisArg) {
              var result = {};
              if ("function" != typeof callback)
                for (var index = -1, props = baseFlatten(arguments, !0, !1, 1), length = isObject(object) ? props.length : 0; ++index < length;) {
                  var key = props[index];
                  key in object && (result[key] = object[key])
                } else callback = lodash.createCallback(callback, thisArg, 3), forIn(object, function(value, key, object) {
                  callback(value, key, object) && (result[key] = value)
                });
              return result
            }

            function transform(object, callback, accumulator, thisArg) {
              var isArr = isArray(object);
              if (callback = baseCreateCallback(callback, thisArg, 4), null == accumulator)
                if (isArr) accumulator = [];
                else {
                  var ctor = object && object.constructor,
                    proto = ctor && ctor.prototype;
                  accumulator = createObject(proto)
                }
              return (isArr ? forEach : forOwn)(object, function(value, index, object) {
                return callback(accumulator, value, index, object)
              }), accumulator
            }

            function values(object) {
              for (var index = -1, props = keys(object), length = props.length, result = Array(length); ++index < length;) result[index] = object[props[index]];
              return result
            }

            function at(collection) {
              for (var args = arguments, index = -1, props = baseFlatten(args, !0, !1, 1), length = args[2] && args[2][args[1]] === collection ? 1 : props.length, result = Array(length); ++index < length;) result[index] = collection[props[index]];
              return result
            }

            function contains(collection, target, fromIndex) {
              var index = -1,
                indexOf = getIndexOf(),
                length = collection ? collection.length : 0,
                result = !1;
              return fromIndex = (0 > fromIndex ? nativeMax(0, length + fromIndex) : fromIndex) || 0, isArray(collection) ? result = indexOf(collection, target, fromIndex) > -1 : "number" == typeof length ? result = (isString(collection) ? collection.indexOf(target, fromIndex) : indexOf(collection, target, fromIndex)) > -1 : forOwn(collection, function(value) {
                return ++index >= fromIndex ? !(result = value === target) : void 0
              }), result
            }

            function every(collection, callback, thisArg) {
              var result = !0;
              callback = lodash.createCallback(callback, thisArg, 3);
              var index = -1,
                length = collection ? collection.length : 0;
              if ("number" == typeof length)
                for (; ++index < length && (result = !!callback(collection[index], index, collection)););
              else forOwn(collection, function(value, index, collection) {
                return result = !!callback(value, index, collection)
              });
              return result
            }

            function filter(collection, callback, thisArg) {
              var result = [];
              callback = lodash.createCallback(callback, thisArg, 3);
              var index = -1,
                length = collection ? collection.length : 0;
              if ("number" == typeof length)
                for (; ++index < length;) {
                  var value = collection[index];
                  callback(value, index, collection) && result.push(value)
                } else forOwn(collection, function(value, index, collection) {
                  callback(value, index, collection) && result.push(value)
                });
              return result
            }

            function find(collection, callback, thisArg) {
              callback = lodash.createCallback(callback, thisArg, 3);
              var index = -1,
                length = collection ? collection.length : 0;
              if ("number" != typeof length) {
                var result;
                return forOwn(collection, function(value, index, collection) {
                  return callback(value, index, collection) ? (result = value, !1) : void 0
                }), result
              }
              for (; ++index < length;) {
                var value = collection[index];
                if (callback(value, index, collection)) return value
              }
            }

            function findLast(collection, callback, thisArg) {
              var result;
              return callback = lodash.createCallback(callback, thisArg, 3), forEachRight(collection, function(value, index, collection) {
                return callback(value, index, collection) ? (result = value, !1) : void 0
              }), result
            }

            function forEach(collection, callback, thisArg) {
              var index = -1,
                length = collection ? collection.length : 0;
              if (callback = callback && "undefined" == typeof thisArg ? callback : baseCreateCallback(callback, thisArg, 3), "number" == typeof length)
                for (; ++index < length && callback(collection[index], index, collection) !== !1;);
              else forOwn(collection, callback);
              return collection
            }

            function forEachRight(collection, callback, thisArg) {
              var length = collection ? collection.length : 0;
              if (callback = callback && "undefined" == typeof thisArg ? callback : baseCreateCallback(callback, thisArg, 3), "number" == typeof length)
                for (; length-- && callback(collection[length], length, collection) !== !1;);
              else {
                var props = keys(collection);
                length = props.length, forOwn(collection, function(value, key, collection) {
                  return key = props ? props[--length] : --length, callback(collection[key], key, collection)
                })
              }
              return collection
            }

            function invoke(collection, methodName) {
              var args = nativeSlice.call(arguments, 2),
                index = -1,
                isFunc = "function" == typeof methodName,
                length = collection ? collection.length : 0,
                result = Array("number" == typeof length ? length : 0);
              return forEach(collection, function(value) {
                result[++index] = (isFunc ? methodName : value[methodName]).apply(value, args)
              }), result
            }

            function map(collection, callback, thisArg) {
              var index = -1,
                length = collection ? collection.length : 0;
              if (callback = lodash.createCallback(callback, thisArg, 3), "number" == typeof length)
                for (var result = Array(length); ++index < length;) result[index] = callback(collection[index], index, collection);
              else result = [], forOwn(collection, function(value, key, collection) {
                result[++index] = callback(value, key, collection)
              });
              return result
            }

            function max(collection, callback, thisArg) {
              var computed = -1 / 0,
                result = computed;
              if (!callback && isArray(collection))
                for (var index = -1, length = collection.length; ++index < length;) {
                  var value = collection[index];
                  value > result && (result = value)
                } else callback = !callback && isString(collection) ? charAtCallback : lodash.createCallback(callback, thisArg, 3), forEach(collection, function(value, index, collection) {
                  var current = callback(value, index, collection);
                  current > computed && (computed = current, result = value)
                });
              return result
            }

            function min(collection, callback, thisArg) {
              var computed = 1 / 0,
                result = computed;
              if (!callback && isArray(collection))
                for (var index = -1, length = collection.length; ++index < length;) {
                  var value = collection[index];
                  result > value && (result = value)
                } else callback = !callback && isString(collection) ? charAtCallback : lodash.createCallback(callback, thisArg, 3), forEach(collection, function(value, index, collection) {
                  var current = callback(value, index, collection);
                  computed > current && (computed = current, result = value)
                });
              return result
            }

            function pluck(collection, property) {
              var index = -1,
                length = collection ? collection.length : 0;
              if ("number" == typeof length)
                for (var result = Array(length); ++index < length;) result[index] = collection[index][property];
              return result || map(collection, property)
            }

            function reduce(collection, callback, accumulator, thisArg) {
              if (!collection) return accumulator;
              var noaccum = arguments.length < 3;
              callback = baseCreateCallback(callback, thisArg, 4);
              var index = -1,
                length = collection.length;
              if ("number" == typeof length)
                for (noaccum && (accumulator = collection[++index]); ++index < length;) accumulator = callback(accumulator, collection[index], index, collection);
              else forOwn(collection, function(value, index, collection) {
                accumulator = noaccum ? (noaccum = !1, value) : callback(accumulator, value, index, collection)
              });
              return accumulator
            }

            function reduceRight(collection, callback, accumulator, thisArg) {
              var noaccum = arguments.length < 3;
              return callback = baseCreateCallback(callback, thisArg, 4), forEachRight(collection, function(value, index, collection) {
                accumulator = noaccum ? (noaccum = !1, value) : callback(accumulator, value, index, collection)
              }), accumulator
            }

            function reject(collection, callback, thisArg) {
              return callback = lodash.createCallback(callback, thisArg, 3), filter(collection, function(value, index, collection) {
                return !callback(value, index, collection)
              })
            }

            function sample(collection, n, guard) {
              var length = collection ? collection.length : 0;
              if ("number" != typeof length && (collection = values(collection)), null == n || guard) return collection ? collection[random(length - 1)] : undefined;
              var result = shuffle(collection);
              return result.length = nativeMin(nativeMax(0, n), result.length), result
            }

            function shuffle(collection) {
              var index = -1,
                length = collection ? collection.length : 0,
                result = Array("number" == typeof length ? length : 0);
              return forEach(collection, function(value) {
                var rand = random(++index);
                result[index] = result[rand], result[rand] = value
              }), result
            }

            function size(collection) {
              var length = collection ? collection.length : 0;
              return "number" == typeof length ? length : keys(collection).length
            }

            function some(collection, callback, thisArg) {
              var result;
              callback = lodash.createCallback(callback, thisArg, 3);
              var index = -1,
                length = collection ? collection.length : 0;
              if ("number" == typeof length)
                for (; ++index < length && !(result = callback(collection[index], index, collection)););
              else forOwn(collection, function(value, index, collection) {
                return !(result = callback(value, index, collection))
              });
              return !!result
            }

            function sortBy(collection, callback, thisArg) {
              var index = -1,
                length = collection ? collection.length : 0,
                result = Array("number" == typeof length ? length : 0);
              for (callback = lodash.createCallback(callback, thisArg, 3), forEach(collection, function(value, key, collection) {
                var object = result[++index] = getObject();
                object.criteria = callback(value, key, collection), object.index = index, object.value = value
              }), length = result.length, result.sort(compareAscending); length--;) {
                var object = result[length];
                result[length] = object.value, releaseObject(object)
              }
              return result
            }

            function toArray(collection) {
              return collection && "number" == typeof collection.length ? slice(collection) : values(collection)
            }

            function compact(array) {
              for (var index = -1, length = array ? array.length : 0, result = []; ++index < length;) {
                var value = array[index];
                value && result.push(value)
              }
              return result
            }

            function difference(array) {
              var index = -1,
                indexOf = getIndexOf(),
                length = array ? array.length : 0,
                seen = baseFlatten(arguments, !0, !0, 1),
                result = [],
                isLarge = length >= largeArraySize && indexOf === baseIndexOf;
              if (isLarge) {
                var cache = createCache(seen);
                cache ? (indexOf = cacheIndexOf, seen = cache) : isLarge = !1
              }
              for (; ++index < length;) {
                var value = array[index];
                indexOf(seen, value) < 0 && result.push(value)
              }
              return isLarge && releaseObject(seen), result
            }

            function findIndex(array, callback, thisArg) {
              var index = -1,
                length = array ? array.length : 0;
              for (callback = lodash.createCallback(callback, thisArg, 3); ++index < length;)
                if (callback(array[index], index, array)) return index;
              return -1
            }

            function findLastIndex(array, callback, thisArg) {
              var length = array ? array.length : 0;
              for (callback = lodash.createCallback(callback, thisArg, 3); length--;)
                if (callback(array[length], length, array)) return length;
              return -1
            }

            function first(array, callback, thisArg) {
              var n = 0,
                length = array ? array.length : 0;
              if ("number" != typeof callback && null != callback) {
                var index = -1;
                for (callback = lodash.createCallback(callback, thisArg, 3); ++index < length && callback(array[index], index, array);) n++
              } else if (n = callback, null == n || thisArg) return array ? array[0] : undefined;
              return slice(array, 0, nativeMin(nativeMax(0, n), length))
            }

            function flatten(array, isShallow, callback, thisArg) {
              return "boolean" != typeof isShallow && null != isShallow && (thisArg = callback, callback = thisArg && thisArg[isShallow] === array ? null : isShallow, isShallow = !1), null != callback && (array = map(array, callback, thisArg)), baseFlatten(array, isShallow)
            }

            function indexOf(array, value, fromIndex) {
              if ("number" == typeof fromIndex) {
                var length = array ? array.length : 0;
                fromIndex = 0 > fromIndex ? nativeMax(0, length + fromIndex) : fromIndex || 0
              } else if (fromIndex) {
                var index = sortedIndex(array, value);
                return array[index] === value ? index : -1
              }
              return baseIndexOf(array, value, fromIndex)
            }

            function initial(array, callback, thisArg) {
              var n = 0,
                length = array ? array.length : 0;
              if ("number" != typeof callback && null != callback) {
                var index = length;
                for (callback = lodash.createCallback(callback, thisArg, 3); index-- && callback(array[index], index, array);) n++
              } else n = null == callback || thisArg ? 1 : callback || n;
              return slice(array, 0, nativeMin(nativeMax(0, length - n), length))
            }

            function intersection(array) {
              for (var args = arguments, argsLength = args.length, argsIndex = -1, caches = getArray(), index = -1, indexOf = getIndexOf(), length = array ? array.length : 0, result = [], seen = getArray(); ++argsIndex < argsLength;) {
                var value = args[argsIndex];
                caches[argsIndex] = indexOf === baseIndexOf && (value ? value.length : 0) >= largeArraySize && createCache(argsIndex ? args[argsIndex] : seen)
              }
              outer: for (; ++index < length;) {
                var cache = caches[0];
                if (value = array[index], (cache ? cacheIndexOf(cache, value) : indexOf(seen, value)) < 0) {
                  for (argsIndex = argsLength, (cache || seen).push(value); --argsIndex;)
                    if (cache = caches[argsIndex], (cache ? cacheIndexOf(cache, value) : indexOf(args[argsIndex], value)) < 0) continue outer;
                  result.push(value)
                }
              }
              for (; argsLength--;) cache = caches[argsLength], cache && releaseObject(cache);
              return releaseArray(caches), releaseArray(seen), result
            }

            function last(array, callback, thisArg) {
              var n = 0,
                length = array ? array.length : 0;
              if ("number" != typeof callback && null != callback) {
                var index = length;
                for (callback = lodash.createCallback(callback, thisArg, 3); index-- && callback(array[index], index, array);) n++
              } else if (n = callback, null == n || thisArg) return array ? array[length - 1] : undefined;
              return slice(array, nativeMax(0, length - n))
            }

            function lastIndexOf(array, value, fromIndex) {
              var index = array ? array.length : 0;
              for ("number" == typeof fromIndex && (index = (0 > fromIndex ? nativeMax(0, index + fromIndex) : nativeMin(fromIndex, index - 1)) + 1); index--;)
                if (array[index] === value) return index;
              return -1
            }

            function pull(array) {
              for (var args = arguments, argsIndex = 0, argsLength = args.length, length = array ? array.length : 0; ++argsIndex < argsLength;)
                for (var index = -1, value = args[argsIndex]; ++index < length;) array[index] === value && (splice.call(array, index--, 1), length--);
              return array
            }

            function range(start, end, step) {
              start = +start || 0, step = "number" == typeof step ? step : +step || 1, null == end && (end = start, start = 0);
              for (var index = -1, length = nativeMax(0, ceil((end - start) / (step || 1))), result = Array(length); ++index < length;) result[index] = start, start += step;
              return result
            }

            function remove(array, callback, thisArg) {
              var index = -1,
                length = array ? array.length : 0,
                result = [];
              for (callback = lodash.createCallback(callback, thisArg, 3); ++index < length;) {
                var value = array[index];
                callback(value, index, array) && (result.push(value), splice.call(array, index--, 1), length--)
              }
              return result
            }

            function rest(array, callback, thisArg) {
              if ("number" != typeof callback && null != callback) {
                var n = 0,
                  index = -1,
                  length = array ? array.length : 0;
                for (callback = lodash.createCallback(callback, thisArg, 3); ++index < length && callback(array[index], index, array);) n++
              } else n = null == callback || thisArg ? 1 : nativeMax(0, callback);
              return slice(array, n)
            }

            function sortedIndex(array, value, callback, thisArg) {
              var low = 0,
                high = array ? array.length : low;
              for (callback = callback ? lodash.createCallback(callback, thisArg, 1) : identity, value = callback(value); high > low;) {
                var mid = low + high >>> 1;
                callback(array[mid]) < value ? low = mid + 1 : high = mid
              }
              return low
            }

            function union() {
              return baseUniq(baseFlatten(arguments, !0, !0))
            }

            function uniq(array, isSorted, callback, thisArg) {
              return "boolean" != typeof isSorted && null != isSorted && (thisArg = callback, callback = thisArg && thisArg[isSorted] === array ? null : isSorted, isSorted = !1), null != callback && (callback = lodash.createCallback(callback, thisArg, 3)), baseUniq(array, isSorted, callback)
            }

            function without(array) {
              return difference(array, nativeSlice.call(arguments, 1))
            }

            function zip() {
              for (var array = arguments.length > 1 ? arguments : arguments[0], index = -1, length = array ? max(pluck(array, "length")) : 0, result = Array(0 > length ? 0 : length); ++index < length;) result[index] = pluck(array, index);
              return result
            }

            function zipObject(keys, values) {
              for (var index = -1, length = keys ? keys.length : 0, result = {}; ++index < length;) {
                var key = keys[index];
                values ? result[key] = values[index] : key && (result[key[0]] = key[1])
              }
              return result
            }

            function after(n, func) {
              if (!isFunction(func)) throw new TypeError;
              return function() {
                return --n < 1 ? func.apply(this, arguments) : void 0
              }
            }

            function bind(func, thisArg) {
              return arguments.length > 2 ? createBound(func, 17, nativeSlice.call(arguments, 2), null, thisArg) : createBound(func, 1, null, null, thisArg)
            }

            function bindAll(object) {
              for (var funcs = arguments.length > 1 ? baseFlatten(arguments, !0, !1, 1) : functions(object), index = -1, length = funcs.length; ++index < length;) {
                var key = funcs[index];
                object[key] = createBound(object[key], 1, null, null, object)
              }
              return object
            }

            function bindKey(object, key) {
              return arguments.length > 2 ? createBound(key, 19, nativeSlice.call(arguments, 2), null, object) : createBound(key, 3, null, null, object)
            }

            function compose() {
              for (var funcs = arguments, length = funcs.length; length--;)
                if (!isFunction(funcs[length])) throw new TypeError;
              return function() {
                for (var args = arguments, length = funcs.length; length--;) args = [funcs[length].apply(this, args)];
                return args[0]
              }
            }

            function createCallback(func, thisArg, argCount) {
              var type = typeof func;
              if (null == func || "function" == type) return baseCreateCallback(func, thisArg, argCount);
              if ("object" != type) return function(object) {
                return object[func]
              };
              var props = keys(func),
                key = props[0],
                a = func[key];
              return 1 != props.length || a !== a || isObject(a) ? function(object) {
                for (var length = props.length, result = !1; length-- && (result = baseIsEqual(object[props[length]], func[props[length]], null, !0)););
                return result
              } : function(object) {
                var b = object[key];
                return a === b && (0 !== a || 1 / a == 1 / b)
              }
            }

            function curry(func, arity) {
              return arity = "number" == typeof arity ? arity : +arity || func.length, createBound(func, 4, null, null, null, arity)
            }

            function debounce(func, wait, options) {
              var args, maxTimeoutId, result, stamp, thisArg, timeoutId, trailingCall, lastCalled = 0,
                maxWait = !1,
                trailing = !0;
              if (!isFunction(func)) throw new TypeError;
              if (wait = nativeMax(0, wait) || 0, options === !0) {
                var leading = !0;
                trailing = !1
              } else isObject(options) && (leading = options.leading, maxWait = "maxWait" in options && (nativeMax(wait, options.maxWait) || 0), trailing = "trailing" in options ? options.trailing : trailing);
              var delayed = function() {
                  var remaining = wait - (now() - stamp);
                  if (0 >= remaining) {
                    maxTimeoutId && clearTimeout(maxTimeoutId);
                    var isCalled = trailingCall;
                    maxTimeoutId = timeoutId = trailingCall = undefined, isCalled && (lastCalled = now(), result = func.apply(thisArg, args))
                  } else timeoutId = setTimeout(delayed, remaining)
                },
                maxDelayed = function() {
                  timeoutId && clearTimeout(timeoutId), maxTimeoutId = timeoutId = trailingCall = undefined, (trailing || maxWait !== wait) && (lastCalled = now(), result = func.apply(thisArg, args))
                };
              return function() {
                if (args = arguments, stamp = now(), thisArg = this, trailingCall = trailing && (timeoutId || !leading), maxWait === !1) var leadingCall = leading && !timeoutId;
                else {
                  maxTimeoutId || leading || (lastCalled = stamp);
                  var remaining = maxWait - (stamp - lastCalled);
                  0 >= remaining ? (maxTimeoutId && (maxTimeoutId = clearTimeout(maxTimeoutId)), lastCalled = stamp, result = func.apply(thisArg, args)) : maxTimeoutId || (maxTimeoutId = setTimeout(maxDelayed, remaining))
                }
                return timeoutId || wait === maxWait || (timeoutId = setTimeout(delayed, wait)), leadingCall && (result = func.apply(thisArg, args)), result
              }
            }

            function defer(func) {
              if (!isFunction(func)) throw new TypeError;
              var args = nativeSlice.call(arguments, 1);
              return setTimeout(function() {
                func.apply(undefined, args)
              }, 1)
            }

            function delay(func, wait) {
              if (!isFunction(func)) throw new TypeError;
              var args = nativeSlice.call(arguments, 2);
              return setTimeout(function() {
                func.apply(undefined, args)
              }, wait)
            }

            function memoize(func, resolver) {
              if (!isFunction(func)) throw new TypeError;
              var memoized = function() {
                var cache = memoized.cache,
                  key = resolver ? resolver.apply(this, arguments) : keyPrefix + arguments[0];
                return hasOwnProperty.call(cache, key) ? cache[key] : cache[key] = func.apply(this, arguments)
              };
              return memoized.cache = {}, memoized
            }

            function once(func) {
              var ran, result;
              if (!isFunction(func)) throw new TypeError;
              return function() {
                return ran ? result : (ran = !0, result = func.apply(this, arguments), func = null, result)
              }
            }

            function partial(func) {
              return createBound(func, 16, nativeSlice.call(arguments, 1))
            }

            function partialRight(func) {
              return createBound(func, 32, null, nativeSlice.call(arguments, 1))
            }

            function throttle(func, wait, options) {
              var leading = !0,
                trailing = !0;
              if (!isFunction(func)) throw new TypeError;
              options === !1 ? leading = !1 : isObject(options) && (leading = "leading" in options ? options.leading : leading, trailing = "trailing" in options ? options.trailing : trailing), debounceOptions.leading = leading, debounceOptions.maxWait = wait, debounceOptions.trailing = trailing;
              var result = debounce(func, wait, debounceOptions);
              return result
            }

            function wrap(value, wrapper) {
              if (!isFunction(wrapper)) throw new TypeError;
              return function() {
                var args = [value];
                return push.apply(args, arguments), wrapper.apply(this, args)
              }
            }

            function escape(string) {
              return null == string ? "" : String(string).replace(reUnescapedHtml, escapeHtmlChar)
            }

            function identity(value) {
              return value
            }

            function mixin(object, source) {
              var ctor = object,
                isFunc = !source || isFunction(ctor);
              source || (ctor = lodashWrapper, source = object, object = lodash), forEach(functions(source), function(methodName) {
                var func = object[methodName] = source[methodName];
                isFunc && (ctor.prototype[methodName] = function() {
                  var value = this.__wrapped__,
                    args = [value];
                  push.apply(args, arguments);
                  var result = func.apply(object, args);
                  return value && "object" == typeof value && value === result ? this : (result = new ctor(result), result.__chain__ = this.__chain__, result)
                })
              })
            }

            function noConflict() {
              return context._ = oldDash, this
            }

            function random(min, max, floating) {
              var noMin = null == min,
                noMax = null == max;
              null == floating && ("boolean" == typeof min && noMax ? (floating = min, min = 1) : noMax || "boolean" != typeof max || (floating = max, noMax = !0)), noMin && noMax && (max = 1), min = +min || 0, noMax ? (max = min, min = 0) : max = +max || 0;
              var rand = nativeRandom();
              return floating || min % 1 || max % 1 ? nativeMin(min + rand * (max - min + parseFloat("1e-" + ((rand + "").length - 1))), max) : min + floor(rand * (max - min + 1))
            }

            function result(object, property) {
              if (object) {
                var value = object[property];
                return isFunction(value) ? object[property]() : value
              }
            }

            function template(text, data, options) {
              var settings = lodash.templateSettings;
              text || (text = ""), options = defaults({}, options, settings);
              var isEvaluating, imports = defaults({}, options.imports, settings.imports),
                importsKeys = keys(imports),
                importsValues = values(imports),
                index = 0,
                interpolate = options.interpolate || reNoMatch,
                source = "__p += '",
                reDelimiters = RegExp((options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$", "g");
              text.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
                return interpolateValue || (interpolateValue = esTemplateValue), source += text.slice(index, offset).replace(reUnescapedString, escapeStringChar), escapeValue && (source += "' +\n__e(" + escapeValue + ") +\n'"), evaluateValue && (isEvaluating = !0, source += "';\n" + evaluateValue + ";\n__p += '"), interpolateValue && (source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'"), index = offset + match.length, match
              }), source += "';\n";
              var variable = options.variable,
                hasVariable = variable;
              hasVariable || (variable = "obj", source = "with (" + variable + ") {\n" + source + "\n}\n"), source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;"), source = "function(" + variable + ") {\n" + (hasVariable ? "" : variable + " || (" + variable + " = {});\n") + "var __t, __p = '', __e = _.escape" + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
              var sourceURL = "\n/*\n//# sourceURL=" + (options.sourceURL || "/lodash/template/source[" + templateCounter+++"]") + "\n*/";
              try {
                var result = Function(importsKeys, "return " + source + sourceURL).apply(undefined, importsValues)
              } catch (e) {
                throw e.source = source, e
              }
              return data ? result(data) : (result.source = source, result)
            }

            function times(n, callback, thisArg) {
              n = (n = +n) > -1 ? n : 0;
              var index = -1,
                result = Array(n);
              for (callback = baseCreateCallback(callback, thisArg, 1); ++index < n;) result[index] = callback(index);
              return result
            }

            function unescape(string) {
              return null == string ? "" : String(string).replace(reEscapedHtml, unescapeHtmlChar)
            }

            function uniqueId(prefix) {
              var id = ++idCounter;
              return String(null == prefix ? "" : prefix) + id
            }

            function chain(value) {
              return value = new lodashWrapper(value), value.__chain__ = !0, value
            }

            function tap(value, interceptor) {
              return interceptor(value), value
            }

            function wrapperChain() {
              return this.__chain__ = !0, this
            }

            function wrapperToString() {
              return String(this.__wrapped__)
            }

            function wrapperValueOf() {
              return this.__wrapped__
            }
            context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;
            var Array = context.Array,
              Boolean = context.Boolean,
              Date = context.Date,
              Function = context.Function,
              Math = context.Math,
              Number = context.Number,
              Object = context.Object,
              RegExp = context.RegExp,
              String = context.String,
              TypeError = context.TypeError,
              arrayRef = [],
              objectProto = Object.prototype,
              oldDash = context._,
              reNative = RegExp("^" + String(objectProto.valueOf).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/valueOf|for [^\]]+/g, ".+?") + "$"),
              ceil = Math.ceil,
              clearTimeout = context.clearTimeout,
              floor = Math.floor,
              fnToString = Function.prototype.toString,
              getPrototypeOf = reNative.test(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf,
              hasOwnProperty = objectProto.hasOwnProperty,
              now = reNative.test(now = Date.now) && now || function() {
                return +new Date
              },
              push = arrayRef.push,
              setImmediate = context.setImmediate,
              setTimeout = context.setTimeout,
              splice = arrayRef.splice,
              toString = objectProto.toString,
              unshift = arrayRef.unshift,
              defineProperty = function() {
                try {
                  var o = {},
                    func = reNative.test(func = Object.defineProperty) && func,
                    result = func(o, o, o) && func
                } catch (e) {}
                return result
              }(),
              nativeBind = reNative.test(nativeBind = toString.bind) && nativeBind,
              nativeCreate = reNative.test(nativeCreate = Object.create) && nativeCreate,
              nativeIsArray = reNative.test(nativeIsArray = Array.isArray) && nativeIsArray,
              nativeIsFinite = context.isFinite,
              nativeIsNaN = context.isNaN,
              nativeKeys = reNative.test(nativeKeys = Object.keys) && nativeKeys,
              nativeMax = Math.max,
              nativeMin = Math.min,
              nativeParseInt = context.parseInt,
              nativeRandom = Math.random,
              nativeSlice = arrayRef.slice,
              isIeOpera = reNative.test(context.attachEvent),
              isV8 = nativeBind && !/\n|true/.test(nativeBind + isIeOpera),
              ctorByClass = {};
            ctorByClass[arrayClass] = Array, ctorByClass[boolClass] = Boolean, ctorByClass[dateClass] = Date, ctorByClass[funcClass] = Function, ctorByClass[objectClass] = Object, ctorByClass[numberClass] = Number, ctorByClass[regexpClass] = RegExp, ctorByClass[stringClass] = String, lodashWrapper.prototype = lodash.prototype;
            var support = lodash.support = {};
            support.fastBind = nativeBind && !isV8, support.funcDecomp = !reNative.test(context.WinRTError) && reThis.test(runInContext), support.funcNames = "string" == typeof Function.name, lodash.templateSettings = {
              escape: /<%-([\s\S]+?)%>/g,
              evaluate: /<%([\s\S]+?)%>/g,
              interpolate: reInterpolate,
              variable: "",
              imports: {
                _: lodash
              }
            }, nativeCreate || (createObject = function(prototype) {
              if (isObject(prototype)) {
                noop.prototype = prototype;
                var result = new noop;
                noop.prototype = null
              }
              return result || {}
            });
            var setBindData = defineProperty ? function(func, value) {
                descriptor.value = value, defineProperty(func, "__bindData__", descriptor)
              } : noop,
              isArray = nativeIsArray || function(value) {
                return value && "object" == typeof value && "number" == typeof value.length && toString.call(value) == arrayClass || !1
              },
              shimKeys = function(object) {
                var index, iterable = object,
                  result = [];
                if (!iterable) return result;
                if (!objectTypes[typeof object]) return result;
                for (index in iterable) hasOwnProperty.call(iterable, index) && result.push(index);
                return result
              },
              keys = nativeKeys ? function(object) {
                return isObject(object) ? nativeKeys(object) : []
              } : shimKeys,
              htmlEscapes = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
              },
              htmlUnescapes = invert(htmlEscapes),
              reEscapedHtml = RegExp("(" + keys(htmlUnescapes).join("|") + ")", "g"),
              reUnescapedHtml = RegExp("[" + keys(htmlEscapes).join("") + "]", "g"),
              assign = function(object, source, guard) {
                var index, iterable = object,
                  result = iterable;
                if (!iterable) return result;
                var args = arguments,
                  argsIndex = 0,
                  argsLength = "number" == typeof guard ? 2 : args.length;
                if (argsLength > 3 && "function" == typeof args[argsLength - 2]) var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);
                else argsLength > 2 && "function" == typeof args[argsLength - 1] && (callback = args[--argsLength]);
                for (; ++argsIndex < argsLength;)
                  if (iterable = args[argsIndex], iterable && objectTypes[typeof iterable])
                    for (var ownIndex = -1, ownProps = objectTypes[typeof iterable] && keys(iterable), length = ownProps ? ownProps.length : 0; ++ownIndex < length;) index = ownProps[ownIndex], result[index] = callback ? callback(result[index], iterable[index]) : iterable[index];
                return result
              },
              defaults = function(object, source, guard) {
                var index, iterable = object,
                  result = iterable;
                if (!iterable) return result;
                for (var args = arguments, argsIndex = 0, argsLength = "number" == typeof guard ? 2 : args.length; ++argsIndex < argsLength;)
                  if (iterable = args[argsIndex], iterable && objectTypes[typeof iterable])
                    for (var ownIndex = -1, ownProps = objectTypes[typeof iterable] && keys(iterable), length = ownProps ? ownProps.length : 0; ++ownIndex < length;) index = ownProps[ownIndex], "undefined" == typeof result[index] && (result[index] = iterable[index]);
                return result
              },
              forIn = function(collection, callback, thisArg) {
                var index, iterable = collection,
                  result = iterable;
                if (!iterable) return result;
                if (!objectTypes[typeof iterable]) return result;
                callback = callback && "undefined" == typeof thisArg ? callback : baseCreateCallback(callback, thisArg, 3);
                for (index in iterable)
                  if (callback(iterable[index], index, collection) === !1) return result;
                return result
              },
              forOwn = function(collection, callback, thisArg) {
                var index, iterable = collection,
                  result = iterable;
                if (!iterable) return result;
                if (!objectTypes[typeof iterable]) return result;
                callback = callback && "undefined" == typeof thisArg ? callback : baseCreateCallback(callback, thisArg, 3);
                for (var ownIndex = -1, ownProps = objectTypes[typeof iterable] && keys(iterable), length = ownProps ? ownProps.length : 0; ++ownIndex < length;)
                  if (index = ownProps[ownIndex], callback(iterable[index], index, collection) === !1) return result;
                return result
              },
              isPlainObject = function(value) {
                if (!value || toString.call(value) != objectClass) return !1;
                var valueOf = value.valueOf,
                  objProto = "function" == typeof valueOf && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);
                return objProto ? value == objProto || getPrototypeOf(value) == objProto : shimIsPlainObject(value)
              },
              countBy = createAggregator(function(result, value, key) {
                hasOwnProperty.call(result, key) ? result[key]++ : result[key] = 1
              }),
              groupBy = createAggregator(function(result, value, key) {
                (hasOwnProperty.call(result, key) ? result[key] : result[key] = []).push(value)
              }),
              indexBy = createAggregator(function(result, value, key) {
                result[key] = value
              }),
              where = filter;
            isV8 && moduleExports && "function" == typeof setImmediate && (defer = function(func) {
              if (!isFunction(func)) throw new TypeError;
              return setImmediate.apply(context, arguments)
            });
            var parseInt = 8 == nativeParseInt(whitespace + "08") ? nativeParseInt : function(value, radix) {
              return nativeParseInt(isString(value) ? value.replace(reLeadingSpacesAndZeros, "") : value, radix || 0)
            };
            return lodash.after = after, lodash.assign = assign, lodash.at = at, lodash.bind = bind, lodash.bindAll = bindAll, lodash.bindKey = bindKey, lodash.chain = chain, lodash.compact = compact, lodash.compose = compose, lodash.countBy = countBy, lodash.createCallback = createCallback, lodash.curry = curry, lodash.debounce = debounce, lodash.defaults = defaults, lodash.defer = defer, lodash.delay = delay, lodash.difference = difference, lodash.filter = filter, lodash.flatten = flatten, lodash.forEach = forEach, lodash.forEachRight = forEachRight, lodash.forIn = forIn, lodash.forInRight = forInRight, lodash.forOwn = forOwn, lodash.forOwnRight = forOwnRight, lodash.functions = functions, lodash.groupBy = groupBy, lodash.indexBy = indexBy, lodash.initial = initial, lodash.intersection = intersection, lodash.invert = invert, lodash.invoke = invoke, lodash.keys = keys, lodash.map = map, lodash.max = max, lodash.memoize = memoize, lodash.merge = merge, lodash.min = min, lodash.omit = omit, lodash.once = once, lodash.pairs = pairs, lodash.partial = partial, lodash.partialRight = partialRight, lodash.pick = pick, lodash.pluck = pluck, lodash.pull = pull, lodash.range = range, lodash.reject = reject, lodash.remove = remove, lodash.rest = rest, lodash.shuffle = shuffle, lodash.sortBy = sortBy, lodash.tap = tap, lodash.throttle = throttle, lodash.times = times, lodash.toArray = toArray, lodash.transform = transform, lodash.union = union, lodash.uniq = uniq, lodash.values = values, lodash.where = where, lodash.without = without, lodash.wrap = wrap, lodash.zip = zip, lodash.zipObject = zipObject, lodash.collect = map, lodash.drop = rest, lodash.each = forEach, lodash.eachRight = forEachRight, lodash.extend = assign, lodash.methods = functions, lodash.object = zipObject, lodash.select = filter, lodash.tail = rest, lodash.unique = uniq, lodash.unzip = zip, mixin(lodash), lodash.clone = clone, lodash.cloneDeep = cloneDeep, lodash.contains = contains, lodash.escape = escape, lodash.every = every, lodash.find = find, lodash.findIndex = findIndex, lodash.findKey = findKey, lodash.findLast = findLast, lodash.findLastIndex = findLastIndex, lodash.findLastKey = findLastKey, lodash.has = has, lodash.identity = identity, lodash.indexOf = indexOf, lodash.isArguments = isArguments, lodash.isArray = isArray, lodash.isBoolean = isBoolean, lodash.isDate = isDate, lodash.isElement = isElement, lodash.isEmpty = isEmpty, lodash.isEqual = isEqual, lodash.isFinite = isFinite, lodash.isFunction = isFunction, lodash.isNaN = isNaN, lodash.isNull = isNull, lodash.isNumber = isNumber, lodash.isObject = isObject, lodash.isPlainObject = isPlainObject, lodash.isRegExp = isRegExp, lodash.isString = isString, lodash.isUndefined = isUndefined, lodash.lastIndexOf = lastIndexOf, lodash.mixin = mixin, lodash.noConflict = noConflict, lodash.parseInt = parseInt, lodash.random = random, lodash.reduce = reduce, lodash.reduceRight = reduceRight, lodash.result = result, lodash.runInContext = runInContext, lodash.size = size, lodash.some = some, lodash.sortedIndex = sortedIndex, lodash.template = template, lodash.unescape = unescape, lodash.uniqueId = uniqueId, lodash.all = every, lodash.any = some, lodash.detect = find, lodash.findWhere = find, lodash.foldl = reduce, lodash.foldr = reduceRight, lodash.include = contains, lodash.inject = reduce, forOwn(lodash, function(func, methodName) {
              lodash.prototype[methodName] || (lodash.prototype[methodName] = function() {
                var args = [this.__wrapped__],
                  chainAll = this.__chain__;
                push.apply(args, arguments);
                var result = func.apply(lodash, args);
                return chainAll ? new lodashWrapper(result, chainAll) : result
              })
            }), lodash.first = first, lodash.last = last, lodash.sample = sample, lodash.take = first, lodash.head = first, forOwn(lodash, function(func, methodName) {
              var callbackable = "sample" !== methodName;
              lodash.prototype[methodName] || (lodash.prototype[methodName] = function(n, guard) {
                var chainAll = this.__chain__,
                  result = func(this.__wrapped__, n, guard);
                return chainAll || null != n && (!guard || callbackable && "function" == typeof n) ? new lodashWrapper(result, chainAll) : result
              })
            }), lodash.VERSION = "2.2.1", lodash.prototype.chain = wrapperChain, lodash.prototype.toString = wrapperToString, lodash.prototype.value = wrapperValueOf, lodash.prototype.valueOf = wrapperValueOf, forEach(["join", "pop", "shift"], function(methodName) {
              var func = arrayRef[methodName];
              lodash.prototype[methodName] = function() {
                var chainAll = this.__chain__,
                  result = func.apply(this.__wrapped__, arguments);
                return chainAll ? new lodashWrapper(result, chainAll) : result
              }
            }), forEach(["push", "reverse", "sort", "unshift"], function(methodName) {
              var func = arrayRef[methodName];
              lodash.prototype[methodName] = function() {
                return func.apply(this.__wrapped__, arguments), this
              }
            }), forEach(["concat", "slice", "splice"], function(methodName) {
              var func = arrayRef[methodName];
              lodash.prototype[methodName] = function() {
                return new lodashWrapper(func.apply(this.__wrapped__, arguments), this.__chain__)
              }
            }), lodash
          }
          var undefined, arrayPool = [],
            objectPool = [],
            idCounter = 0,
            keyPrefix = +new Date + "",
            largeArraySize = 75,
            maxPoolSize = 40,
            whitespace = " 	\f ﻿\n\r\u2028\u2029 ᠎             　",
            reEmptyStringLeading = /\b__p \+= '';/g,
            reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
            reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
            reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
            reFlags = /\w*$/,
            reFuncName = /^function[ \n\r\t]+\w/,
            reInterpolate = /<%=([\s\S]+?)%>/g,
            reLeadingSpacesAndZeros = RegExp("^[" + whitespace + "]*0+(?=.$)"),
            reNoMatch = /($^)/,
            reThis = /\bthis\b/,
            reUnescapedString = /['\n\r\t\u2028\u2029\\]/g,
            contextProps = ["Array", "Boolean", "Date", "Function", "Math", "Number", "Object", "RegExp", "String", "_", "attachEvent", "clearTimeout", "isFinite", "isNaN", "parseInt", "setImmediate", "setTimeout"],
            templateCounter = 0,
            argsClass = "[object Arguments]",
            arrayClass = "[object Array]",
            boolClass = "[object Boolean]",
            dateClass = "[object Date]",
            funcClass = "[object Function]",
            numberClass = "[object Number]",
            objectClass = "[object Object]",
            regexpClass = "[object RegExp]",
            stringClass = "[object String]",
            cloneableClasses = {};
          cloneableClasses[funcClass] = !1, cloneableClasses[argsClass] = cloneableClasses[arrayClass] = cloneableClasses[boolClass] = cloneableClasses[dateClass] = cloneableClasses[numberClass] = cloneableClasses[objectClass] = cloneableClasses[regexpClass] = cloneableClasses[stringClass] = !0;
          var debounceOptions = {
              leading: !1,
              maxWait: 0,
              trailing: !1
            },
            descriptor = {
              configurable: !1,
              enumerable: !1,
              value: null,
              writable: !1
            },
            objectTypes = {
              "boolean": !1,
              "function": !0,
              object: !0,
              number: !1,
              string: !1,
              undefined: !1
            },
            stringEscapes = {
              "\\": "\\",
              "'": "'",
              "\n": "n",
              "\r": "r",
              "	": "t",
              "\u2028": "u2028",
              "\u2029": "u2029"
            },
            root = objectTypes[typeof window] && window || this,
            freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports,
            freeModule = objectTypes[typeof module] && module && !module.nodeType && module,
            moduleExports = freeModule && freeModule.exports === freeExports && freeExports,
            freeGlobal = objectTypes[typeof global] && global;
          !freeGlobal || freeGlobal.global !== freeGlobal && freeGlobal.window !== freeGlobal || (root = freeGlobal);
          var _ = runInContext();
          "function" == typeof define && "object" == typeof define.amd && define.amd ? (root._ = _, define(function() {
            return _
          })) : freeExports && freeModule ? moduleExports ? (freeModule.exports = _)._ = _ : freeExports._ = _ : root._ = _
        }).call(this)
      }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}
  ],
  34: [
    function() {
      "use strict";
      angular.module("ngClipboard", []).provider("ngClip", function() {
        var self = this;
        return this.path = "//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/1.3.5/ZeroClipboard.swf", {
          setPath: function(newPath) {
            self.path = newPath
          },
          $get: function() {
            return {
              path: self.path
            }
          }
        }
      }).run(["ngClip",
        function(ngClip) {
          ZeroClipboard.config({
            moviePath: ngClip.path,
            trustedDomains: ["*"],
            allowScriptAccess: "always",
            forceHandCursor: !0
          })
        }
      ]).directive("clipCopy", ["ngClip",
        function() {
          return {
            scope: {
              clipCopy: "&",
              clipClick: "&"
            },
            restrict: "A",
            link: function(scope, element, attrs) {
              var clip = new ZeroClipboard(element);
              "" == attrs.clipCopy && (scope.clipCopy = function() {
                return element[0].previousElementSibling.innerText
              }), clip.on("load", function(client) {
                var onDataRequested = function(client) {
                  client.setText(scope.$eval(scope.clipCopy)), angular.isDefined(attrs.clipClick) && scope.$apply(scope.clipClick)
                };
                client.on("dataRequested", onDataRequested), scope.$on("$destroy", function() {
                  client.off("dataRequested", onDataRequested), client.unclip(element)
                })
              })
            }
          }
        }
      ])
    }, {}
  ],
  underscore: [
    function(require, module) {
      module.exports = require("9eM++n")
    }, {}
  ],
  "9eM++n": [
    function(require, module) {
      (function(global) {
        (function(module, exports, define, browserify_shim__define__module__export__) {
          (function() {
            var root = this,
              previousUnderscore = root._,
              breaker = {},
              ArrayProto = Array.prototype,
              ObjProto = Object.prototype,
              FuncProto = Function.prototype,
              push = ArrayProto.push,
              slice = ArrayProto.slice,
              concat = ArrayProto.concat,
              toString = ObjProto.toString,
              hasOwnProperty = ObjProto.hasOwnProperty,
              nativeForEach = ArrayProto.forEach,
              nativeMap = ArrayProto.map,
              nativeReduce = ArrayProto.reduce,
              nativeReduceRight = ArrayProto.reduceRight,
              nativeFilter = ArrayProto.filter,
              nativeEvery = ArrayProto.every,
              nativeSome = ArrayProto.some,
              nativeIndexOf = ArrayProto.indexOf,
              nativeLastIndexOf = ArrayProto.lastIndexOf,
              nativeIsArray = Array.isArray,
              nativeKeys = Object.keys,
              nativeBind = FuncProto.bind,
              _ = function(obj) {
                return obj instanceof _ ? obj : this instanceof _ ? void(this._wrapped = obj) : new _(obj)
              };
            "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = _), exports._ = _) : root._ = _, _.VERSION = "1.6.0";
            var each = _.each = _.forEach = function(obj, iterator, context) {
              if (null == obj) return obj;
              if (nativeForEach && obj.forEach === nativeForEach) obj.forEach(iterator, context);
              else if (obj.length === +obj.length) {
                for (var i = 0, length = obj.length; length > i; i++)
                  if (iterator.call(context, obj[i], i, obj) === breaker) return
              } else
                for (var keys = _.keys(obj), i = 0, length = keys.length; length > i; i++)
                  if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return; return obj
            };
            _.map = _.collect = function(obj, iterator, context) {
              var results = [];
              return null == obj ? results : nativeMap && obj.map === nativeMap ? obj.map(iterator, context) : (each(obj, function(value, index, list) {
                results.push(iterator.call(context, value, index, list))
              }), results)
            };
            var reduceError = "Reduce of empty array with no initial value";
            _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
              var initial = arguments.length > 2;
              if (null == obj && (obj = []), nativeReduce && obj.reduce === nativeReduce) return context && (iterator = _.bind(iterator, context)), initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
              if (each(obj, function(value, index, list) {
                initial ? memo = iterator.call(context, memo, value, index, list) : (memo = value, initial = !0)
              }), !initial) throw new TypeError(reduceError);
              return memo
            }, _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
              var initial = arguments.length > 2;
              if (null == obj && (obj = []), nativeReduceRight && obj.reduceRight === nativeReduceRight) return context && (iterator = _.bind(iterator, context)), initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
              var length = obj.length;
              if (length !== +length) {
                var keys = _.keys(obj);
                length = keys.length
              }
              if (each(obj, function(value, index, list) {
                index = keys ? keys[--length] : --length, initial ? memo = iterator.call(context, memo, obj[index], index, list) : (memo = obj[index], initial = !0)
              }), !initial) throw new TypeError(reduceError);
              return memo
            }, _.find = _.detect = function(obj, predicate, context) {
              var result;
              return any(obj, function(value, index, list) {
                return predicate.call(context, value, index, list) ? (result = value, !0) : void 0
              }), result
            }, _.filter = _.select = function(obj, predicate, context) {
              var results = [];
              return null == obj ? results : nativeFilter && obj.filter === nativeFilter ? obj.filter(predicate, context) : (each(obj, function(value, index, list) {
                predicate.call(context, value, index, list) && results.push(value)
              }), results)
            }, _.reject = function(obj, predicate, context) {
              return _.filter(obj, function(value, index, list) {
                return !predicate.call(context, value, index, list)
              }, context)
            }, _.every = _.all = function(obj, predicate, context) {
              predicate || (predicate = _.identity);
              var result = !0;
              return null == obj ? result : nativeEvery && obj.every === nativeEvery ? obj.every(predicate, context) : (each(obj, function(value, index, list) {
                return (result = result && predicate.call(context, value, index, list)) ? void 0 : breaker
              }), !!result)
            };
            var any = _.some = _.any = function(obj, predicate, context) {
              predicate || (predicate = _.identity);
              var result = !1;
              return null == obj ? result : nativeSome && obj.some === nativeSome ? obj.some(predicate, context) : (each(obj, function(value, index, list) {
                return result || (result = predicate.call(context, value, index, list)) ? breaker : void 0
              }), !!result)
            };
            _.contains = _.include = function(obj, target) {
              return null == obj ? !1 : nativeIndexOf && obj.indexOf === nativeIndexOf ? -1 != obj.indexOf(target) : any(obj, function(value) {
                return value === target
              })
            }, _.invoke = function(obj, method) {
              var args = slice.call(arguments, 2),
                isFunc = _.isFunction(method);
              return _.map(obj, function(value) {
                return (isFunc ? method : value[method]).apply(value, args)
              })
            }, _.pluck = function(obj, key) {
              return _.map(obj, _.property(key))
            }, _.where = function(obj, attrs) {
              return _.filter(obj, _.matches(attrs))
            }, _.findWhere = function(obj, attrs) {
              return _.find(obj, _.matches(attrs))
            }, _.max = function(obj, iterator, context) {
              if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) return Math.max.apply(Math, obj);
              var result = -1 / 0,
                lastComputed = -1 / 0;
              return each(obj, function(value, index, list) {
                var computed = iterator ? iterator.call(context, value, index, list) : value;
                computed > lastComputed && (result = value, lastComputed = computed)
              }), result
            }, _.min = function(obj, iterator, context) {
              if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) return Math.min.apply(Math, obj);
              var result = 1 / 0,
                lastComputed = 1 / 0;
              return each(obj, function(value, index, list) {
                var computed = iterator ? iterator.call(context, value, index, list) : value;
                lastComputed > computed && (result = value, lastComputed = computed)
              }), result
            }, _.shuffle = function(obj) {
              var rand, index = 0,
                shuffled = [];
              return each(obj, function(value) {
                rand = _.random(index++), shuffled[index - 1] = shuffled[rand], shuffled[rand] = value
              }), shuffled
            }, _.sample = function(obj, n, guard) {
              return null == n || guard ? (obj.length !== +obj.length && (obj = _.values(obj)), obj[_.random(obj.length - 1)]) : _.shuffle(obj).slice(0, Math.max(0, n))
            };
            var lookupIterator = function(value) {
              return null == value ? _.identity : _.isFunction(value) ? value : _.property(value)
            };
            _.sortBy = function(obj, iterator, context) {
              return iterator = lookupIterator(iterator), _.pluck(_.map(obj, function(value, index, list) {
                return {
                  value: value,
                  index: index,
                  criteria: iterator.call(context, value, index, list)
                }
              }).sort(function(left, right) {
                var a = left.criteria,
                  b = right.criteria;
                if (a !== b) {
                  if (a > b || void 0 === a) return 1;
                  if (b > a || void 0 === b) return -1
                }
                return left.index - right.index
              }), "value")
            };
            var group = function(behavior) {
              return function(obj, iterator, context) {
                var result = {};
                return iterator = lookupIterator(iterator), each(obj, function(value, index) {
                  var key = iterator.call(context, value, index, obj);
                  behavior(result, key, value)
                }), result
              }
            };
            _.groupBy = group(function(result, key, value) {
              _.has(result, key) ? result[key].push(value) : result[key] = [value]
            }), _.indexBy = group(function(result, key, value) {
              result[key] = value
            }), _.countBy = group(function(result, key) {
              _.has(result, key) ? result[key]++ : result[key] = 1
            }), _.sortedIndex = function(array, obj, iterator, context) {
              iterator = lookupIterator(iterator);
              for (var value = iterator.call(context, obj), low = 0, high = array.length; high > low;) {
                var mid = low + high >>> 1;
                iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid
              }
              return low
            }, _.toArray = function(obj) {
              return obj ? _.isArray(obj) ? slice.call(obj) : obj.length === +obj.length ? _.map(obj, _.identity) : _.values(obj) : []
            }, _.size = function(obj) {
              return null == obj ? 0 : obj.length === +obj.length ? obj.length : _.keys(obj).length
            }, _.first = _.head = _.take = function(array, n, guard) {
              return null == array ? void 0 : null == n || guard ? array[0] : 0 > n ? [] : slice.call(array, 0, n)
            }, _.initial = function(array, n, guard) {
              return slice.call(array, 0, array.length - (null == n || guard ? 1 : n))
            }, _.last = function(array, n, guard) {
              return null == array ? void 0 : null == n || guard ? array[array.length - 1] : slice.call(array, Math.max(array.length - n, 0))
            }, _.rest = _.tail = _.drop = function(array, n, guard) {
              return slice.call(array, null == n || guard ? 1 : n)
            }, _.compact = function(array) {
              return _.filter(array, _.identity)
            };
            var flatten = function(input, shallow, output) {
              return shallow && _.every(input, _.isArray) ? concat.apply(output, input) : (each(input, function(value) {
                _.isArray(value) || _.isArguments(value) ? shallow ? push.apply(output, value) : flatten(value, shallow, output) : output.push(value)
              }), output)
            };
            _.flatten = function(array, shallow) {
              return flatten(array, shallow, [])
            }, _.without = function(array) {
              return _.difference(array, slice.call(arguments, 1))
            }, _.partition = function(array, predicate) {
              var pass = [],
                fail = [];
              return each(array, function(elem) {
                (predicate(elem) ? pass : fail).push(elem)
              }), [pass, fail]
            }, _.uniq = _.unique = function(array, isSorted, iterator, context) {
              _.isFunction(isSorted) && (context = iterator, iterator = isSorted, isSorted = !1);
              var initial = iterator ? _.map(array, iterator, context) : array,
                results = [],
                seen = [];
              return each(initial, function(value, index) {
                (isSorted ? index && seen[seen.length - 1] === value : _.contains(seen, value)) || (seen.push(value), results.push(array[index]))
              }), results
            }, _.union = function() {
              return _.uniq(_.flatten(arguments, !0))
            }, _.intersection = function(array) {
              var rest = slice.call(arguments, 1);
              return _.filter(_.uniq(array), function(item) {
                return _.every(rest, function(other) {
                  return _.contains(other, item)
                })
              })
            }, _.difference = function(array) {
              var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
              return _.filter(array, function(value) {
                return !_.contains(rest, value)
              })
            }, _.zip = function() {
              for (var length = _.max(_.pluck(arguments, "length").concat(0)), results = new Array(length), i = 0; length > i; i++) results[i] = _.pluck(arguments, "" + i);
              return results
            }, _.object = function(list, values) {
              if (null == list) return {};
              for (var result = {}, i = 0, length = list.length; length > i; i++) values ? result[list[i]] = values[i] : result[list[i][0]] = list[i][1];
              return result
            }, _.indexOf = function(array, item, isSorted) {
              if (null == array) return -1;
              var i = 0,
                length = array.length;
              if (isSorted) {
                if ("number" != typeof isSorted) return i = _.sortedIndex(array, item), array[i] === item ? i : -1;
                i = 0 > isSorted ? Math.max(0, length + isSorted) : isSorted
              }
              if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
              for (; length > i; i++)
                if (array[i] === item) return i;
              return -1
            }, _.lastIndexOf = function(array, item, from) {
              if (null == array) return -1;
              var hasIndex = null != from;
              if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
              for (var i = hasIndex ? from : array.length; i--;)
                if (array[i] === item) return i;
              return -1
            }, _.range = function(start, stop, step) {
              arguments.length <= 1 && (stop = start || 0, start = 0), step = arguments[2] || 1;
              for (var length = Math.max(Math.ceil((stop - start) / step), 0), idx = 0, range = new Array(length); length > idx;) range[idx++] = start, start += step;
              return range
            };
            var ctor = function() {};
            _.bind = function(func, context) {
              var args, bound;
              if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
              if (!_.isFunction(func)) throw new TypeError;
              return args = slice.call(arguments, 2), bound = function() {
                if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
                ctor.prototype = func.prototype;
                var self = new ctor;
                ctor.prototype = null;
                var result = func.apply(self, args.concat(slice.call(arguments)));
                return Object(result) === result ? result : self
              }
            }, _.partial = function(func) {
              var boundArgs = slice.call(arguments, 1);
              return function() {
                for (var position = 0, args = boundArgs.slice(), i = 0, length = args.length; length > i; i++) args[i] === _ && (args[i] = arguments[position++]);
                for (; position < arguments.length;) args.push(arguments[position++]);
                return func.apply(this, args)
              }
            }, _.bindAll = function(obj) {
              var funcs = slice.call(arguments, 1);
              if (0 === funcs.length) throw new Error("bindAll must be passed function names");
              return each(funcs, function(f) {
                obj[f] = _.bind(obj[f], obj)
              }), obj
            }, _.memoize = function(func, hasher) {
              var memo = {};
              return hasher || (hasher = _.identity),
                function() {
                  var key = hasher.apply(this, arguments);
                  return _.has(memo, key) ? memo[key] : memo[key] = func.apply(this, arguments)
                }
            }, _.delay = function(func, wait) {
              var args = slice.call(arguments, 2);
              return setTimeout(function() {
                return func.apply(null, args)
              }, wait)
            }, _.defer = function(func) {
              return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)))
            }, _.throttle = function(func, wait, options) {
              var context, args, result, timeout = null,
                previous = 0;
              options || (options = {});
              var later = function() {
                previous = options.leading === !1 ? 0 : _.now(), timeout = null, result = func.apply(context, args), context = args = null
              };
              return function() {
                var now = _.now();
                previous || options.leading !== !1 || (previous = now);
                var remaining = wait - (now - previous);
                return context = this, args = arguments, 0 >= remaining ? (clearTimeout(timeout), timeout = null, previous = now, result = func.apply(context, args), context = args = null) : timeout || options.trailing === !1 || (timeout = setTimeout(later, remaining)), result
              }
            }, _.debounce = function(func, wait, immediate) {
              var timeout, args, context, timestamp, result, later = function() {
                var last = _.now() - timestamp;
                wait > last ? timeout = setTimeout(later, wait - last) : (timeout = null, immediate || (result = func.apply(context, args), context = args = null))
              };
              return function() {
                context = this, args = arguments, timestamp = _.now();
                var callNow = immediate && !timeout;
                return timeout || (timeout = setTimeout(later, wait)), callNow && (result = func.apply(context, args), context = args = null), result
              }
            }, _.once = function(func) {
              var memo, ran = !1;
              return function() {
                return ran ? memo : (ran = !0, memo = func.apply(this, arguments), func = null, memo)
              }
            }, _.wrap = function(func, wrapper) {
              return _.partial(wrapper, func)
            }, _.compose = function() {
              var funcs = arguments;
              return function() {
                for (var args = arguments, i = funcs.length - 1; i >= 0; i--) args = [funcs[i].apply(this, args)];
                return args[0]
              }
            }, _.after = function(times, func) {
              return function() {
                return --times < 1 ? func.apply(this, arguments) : void 0
              }
            }, _.keys = function(obj) {
              if (!_.isObject(obj)) return [];
              if (nativeKeys) return nativeKeys(obj);
              var keys = [];
              for (var key in obj) _.has(obj, key) && keys.push(key);
              return keys
            }, _.values = function(obj) {
              for (var keys = _.keys(obj), length = keys.length, values = new Array(length), i = 0; length > i; i++) values[i] = obj[keys[i]];
              return values
            }, _.pairs = function(obj) {
              for (var keys = _.keys(obj), length = keys.length, pairs = new Array(length), i = 0; length > i; i++) pairs[i] = [keys[i], obj[keys[i]]];
              return pairs
            }, _.invert = function(obj) {
              for (var result = {}, keys = _.keys(obj), i = 0, length = keys.length; length > i; i++) result[obj[keys[i]]] = keys[i];
              return result
            }, _.functions = _.methods = function(obj) {
              var names = [];
              for (var key in obj) _.isFunction(obj[key]) && names.push(key);
              return names.sort()
            }, _.extend = function(obj) {
              return each(slice.call(arguments, 1), function(source) {
                if (source)
                  for (var prop in source) obj[prop] = source[prop]
              }), obj
            }, _.pick = function(obj) {
              var copy = {},
                keys = concat.apply(ArrayProto, slice.call(arguments, 1));
              return each(keys, function(key) {
                key in obj && (copy[key] = obj[key])
              }), copy
            }, _.omit = function(obj) {
              var copy = {},
                keys = concat.apply(ArrayProto, slice.call(arguments, 1));
              for (var key in obj) _.contains(keys, key) || (copy[key] = obj[key]);
              return copy
            }, _.defaults = function(obj) {
              return each(slice.call(arguments, 1), function(source) {
                if (source)
                  for (var prop in source) void 0 === obj[prop] && (obj[prop] = source[prop])
              }), obj
            }, _.clone = function(obj) {
              return _.isObject(obj) ? _.isArray(obj) ? obj.slice() : _.extend({}, obj) : obj
            }, _.tap = function(obj, interceptor) {
              return interceptor(obj), obj
            };
            var eq = function(a, b, aStack, bStack) {
              if (a === b) return 0 !== a || 1 / a == 1 / b;
              if (null == a || null == b) return a === b;
              a instanceof _ && (a = a._wrapped), b instanceof _ && (b = b._wrapped);
              var className = toString.call(a);
              if (className != toString.call(b)) return !1;
              switch (className) {
                case "[object String]":
                  return a == String(b);
                case "[object Number]":
                  return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;
                case "[object Date]":
                case "[object Boolean]":
                  return +a == +b;
                case "[object RegExp]":
                  return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase
              }
              if ("object" != typeof a || "object" != typeof b) return !1;
              for (var length = aStack.length; length--;)
                if (aStack[length] == a) return bStack[length] == b;
              var aCtor = a.constructor,
                bCtor = b.constructor;
              if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && "constructor" in a && "constructor" in b) return !1;
              aStack.push(a), bStack.push(b);
              var size = 0,
                result = !0;
              if ("[object Array]" == className) {
                if (size = a.length, result = size == b.length)
                  for (; size-- && (result = eq(a[size], b[size], aStack, bStack)););
              } else {
                for (var key in a)
                  if (_.has(a, key) && (size++, !(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack)))) break;
                if (result) {
                  for (key in b)
                    if (_.has(b, key) && !size--) break;
                  result = !size
                }
              }
              return aStack.pop(), bStack.pop(), result
            };
            _.isEqual = function(a, b) {
              return eq(a, b, [], [])
            }, _.isEmpty = function(obj) {
              if (null == obj) return !0;
              if (_.isArray(obj) || _.isString(obj)) return 0 === obj.length;
              for (var key in obj)
                if (_.has(obj, key)) return !1;
              return !0
            }, _.isElement = function(obj) {
              return !(!obj || 1 !== obj.nodeType)
            }, _.isArray = nativeIsArray || function(obj) {
              return "[object Array]" == toString.call(obj)
            }, _.isObject = function(obj) {
              return obj === Object(obj)
            }, each(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(name) {
              _["is" + name] = function(obj) {
                return toString.call(obj) == "[object " + name + "]"
              }
            }), _.isArguments(arguments) || (_.isArguments = function(obj) {
              return !(!obj || !_.has(obj, "callee"))
            }), "function" != typeof / . / && (_.isFunction = function(obj) {
              return "function" == typeof obj
            }), _.isFinite = function(obj) {
              return isFinite(obj) && !isNaN(parseFloat(obj))
            }, _.isNaN = function(obj) {
              return _.isNumber(obj) && obj != +obj
            }, _.isBoolean = function(obj) {
              return obj === !0 || obj === !1 || "[object Boolean]" == toString.call(obj)
            }, _.isNull = function(obj) {
              return null === obj
            }, _.isUndefined = function(obj) {
              return void 0 === obj
            }, _.has = function(obj, key) {
              return hasOwnProperty.call(obj, key)
            }, _.noConflict = function() {
              return root._ = previousUnderscore, this
            }, _.identity = function(value) {
              return value
            }, _.constant = function(value) {
              return function() {
                return value
              }
            }, _.property = function(key) {
              return function(obj) {
                return obj[key]
              }
            }, _.matches = function(attrs) {
              return function(obj) {
                if (obj === attrs) return !0;
                for (var key in attrs)
                  if (attrs[key] !== obj[key]) return !1;
                return !0
              }
            }, _.times = function(n, iterator, context) {
              for (var accum = Array(Math.max(0, n)), i = 0; n > i; i++) accum[i] = iterator.call(context, i);
              return accum
            }, _.random = function(min, max) {
              return null == max && (max = min, min = 0), min + Math.floor(Math.random() * (max - min + 1))
            }, _.now = Date.now || function() {
              return (new Date).getTime()
            };
            var entityMap = {
              escape: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;"
              }
            };
            entityMap.unescape = _.invert(entityMap.escape);
            var entityRegexes = {
              escape: new RegExp("[" + _.keys(entityMap.escape).join("") + "]", "g"),
              unescape: new RegExp("(" + _.keys(entityMap.unescape).join("|") + ")", "g")
            };
            _.each(["escape", "unescape"], function(method) {
              _[method] = function(string) {
                return null == string ? "" : ("" + string).replace(entityRegexes[method], function(match) {
                  return entityMap[method][match]
                })
              }
            }), _.result = function(object, property) {
              if (null == object) return void 0;
              var value = object[property];
              return _.isFunction(value) ? value.call(object) : value
            }, _.mixin = function(obj) {
              each(_.functions(obj), function(name) {
                var func = _[name] = obj[name];
                _.prototype[name] = function() {
                  var args = [this._wrapped];
                  return push.apply(args, arguments), result.call(this, func.apply(_, args))
                }
              })
            };
            var idCounter = 0;
            _.uniqueId = function(prefix) {
              var id = ++idCounter + "";
              return prefix ? prefix + id : id
            }, _.templateSettings = {
              evaluate: /<%([\s\S]+?)%>/g,
              interpolate: /<%=([\s\S]+?)%>/g,
              escape: /<%-([\s\S]+?)%>/g
            };
            var noMatch = /(.)^/,
              escapes = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                "	": "t",
                "\u2028": "u2028",
                "\u2029": "u2029"
              },
              escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
            _.template = function(text, data, settings) {
              var render;
              settings = _.defaults({}, settings, _.templateSettings);
              var matcher = new RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join("|") + "|$", "g"),
                index = 0,
                source = "__p+='";
              text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
                return source += text.slice(index, offset).replace(escaper, function(match) {
                  return "\\" + escapes[match]
                }), escape && (source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'"), interpolate && (source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'"), evaluate && (source += "';\n" + evaluate + "\n__p+='"), index = offset + match.length, match
              }), source += "';\n", settings.variable || (source = "with(obj||{}){\n" + source + "}\n"), source = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
              try {
                render = new Function(settings.variable || "obj", "_", source)
              } catch (e) {
                throw e.source = source, e
              }
              if (data) return render(data, _);
              var template = function(data) {
                return render.call(this, data, _)
              };
              return template.source = "function(" + (settings.variable || "obj") + "){\n" + source + "}", template
            }, _.chain = function(obj) {
              return _(obj).chain()
            };
            var result = function(obj) {
              return this._chain ? _(obj).chain() : obj
            };
            _.mixin(_), each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(name) {
              var method = ArrayProto[name];
              _.prototype[name] = function() {
                var obj = this._wrapped;
                return method.apply(obj, arguments), "shift" != name && "splice" != name || 0 !== obj.length || delete obj[0], result.call(this, obj)
              }
            }), each(["concat", "join", "slice"], function(name) {
              var method = ArrayProto[name];
              _.prototype[name] = function() {
                return result.call(this, method.apply(this._wrapped, arguments))
              }
            }), _.extend(_.prototype, {
              chain: function() {
                return this._chain = !0, this
              },
              value: function() {
                return this._wrapped
              }
            }), "function" == typeof define && define.amd && define("underscore", [], function() {
              return _
            })
          }).call(this), browserify_shim__define__module__export__("undefined" != typeof _ ? _ : window._)
        }).call(global, void 0, void 0, void 0, function(ex) {
          module.exports = ex
        })
      }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}
  ],
  37: [
    function() {
      angular.module("gaudiBuilder").directive("draggable", function() {
        "use strict";
        return function(scope, element) {
          var el = element[0];
          el.draggable = !0, el.addEventListener("dragstart", function(e) {
            return e.dataTransfer.effectAllowed = "move", e.dataTransfer.setData("id", this.id), this.classList.add("drag"), !1
          }, !1), el.addEventListener("dragend", function() {
            return this.classList.remove("drag"), !1
          }, !1)
        }
      })
    }, {}
  ],
  38: [
    function() {
      angular.module("gaudiBuilder").directive("droppable", function() {
        "use strict";
        return {
          scope: {
            droppable: "="
          },
          link: function(scope, element) {
            var el = element[0];
            el.addEventListener("dragover", function(e) {
              return e.dataTransfer.dropEffect = "move", e.preventDefault && e.preventDefault(), !1
            }, !1), el.addEventListener("drop", function(e) {
              e.stopPropagation && e.stopPropagation();
              var elementDropped = document.getElementById(e.dataTransfer.getData("id")),
                dropMethod = scope.droppable;
              return "function" == typeof dropMethod && scope.droppable(elementDropped, element[0], e), !1
            }, !1)
          }
        }
      })
    }, {}
  ],
  39: [
    function(require, module) {
      var joint = require("jointjs");
      joint.shapes.html = {}, joint.shapes.html.GaudiGraphComponent = joint.shapes.basic.Rect.extend({
        defaults: joint.util.deepSupplement({
          type: "html.Element",
          attrs: {
            rect: {
              stroke: "none",
              "fill-opacity": 0
            }
          }
        }, joint.shapes.basic.Rect.prototype.defaults)
      }), joint.shapes.html.ElementView = joint.dia.ElementView.extend({
        link: null,
        canUpdateLink: !1,
        template: ['<div class="component">', '<div class="element">', '<span class="image"></span>', '<span class="name"></span>', "</div>", '<div class="tools">', '<button class="edit glyphicon glyphicon-wrench" data-container="body"></button>', '<div class="create-link glyphicon glyphicon-record"></div>', '<button class="close">&times;</button>', "</div>", "</div>"].join(""),
        initialize: function() {
          _.bindAll(this, "updateBox"), joint.dia.ElementView.prototype.initialize.apply(this, arguments), this.$box = $(_.template(this.template)()), this.model.on("change", this.updateBox, this), this.model.on("remove", this.removeBox, this), this.updateBox()
        },
        render: function() {
          return joint.dia.ElementView.prototype.render.apply(this, arguments), this.paper.$el.prepend(this.$box), this.updateBox(), this.$box.find(".create-link").on("mousedown", this.createLink.bind(this)), this.$box.find(".edit").on("click", this.triggerOpenDetail.bind(this)), this.$box.find(".close").on("click", _.bind(this.model.remove, this.model)), this.$box.attr("data-type", this.model.get("componentType")), this.$box.find(".image").html('<img alt="MySQL" src="' + this.model.get("logo") + '">'), this.$box.find(".name").html(this.model.get("name")), this.$box.addClass(this.model.get("binary") ? "binary" : ""), this.paper.$el.mousemove(this.onMouseMove.bind(this)), this.paper.$el.mouseup(this.onMouseUp.bind(this)), this.updateName(), this
        },
        updateName: function() {
          this.$box.find(".name").html(this.model.get("name"))
        },
        updateBox: function() {
          var bbox = this.model.getBBox();
          this.updateName(), this.$box.css({
            width: bbox.width,
            height: bbox.height,
            left: bbox.x,
            top: bbox.y,
            transform: "rotate(" + (this.model.get("angle") || 0) + "deg)"
          })
        },
        removeBox: function() {
          this.model.trigger("onRemove"), this.$box.remove()
        },
        triggerOpenDetail: function(e) {
          e.preventDefault(), this.model.trigger("onOpenDetail")
        },
        createLink: function(evt) {
          var self = this,
            paperOffset = this.paper.$el.offset(),
            targetOffset = $(evt.target).offset(),
            x = targetOffset.left - paperOffset.left,
            y = targetOffset.top - paperOffset.top;
          this.link = new joint.dia.Link({
            source: {
              id: this.model.get("id")
            },
            target: g.point(x, y),
            z: -1,
            attrs: {
              ".connection": {
                stroke: "#49ae80",
                "stroke-width": 6,
                opacity: .5
              },
              ".marker-target": {
                stroke: "#49ae80",
                fill: "#49ae80",
                "stroke-width": 2,
                d: "M 10 0 L 0 5 L 10 10 z"
              },
              ".marker-source": {
                display: "none"
              },
              ".marker-vertices": {
                display: "none"
              }
            }
          }), this.paper.model.addCell(this.link), this.link.on("remove", function(lnk) {
            self.model.trigger("removeLink", lnk.get("source").id, lnk.get("target").id)
          }), this.link.on("change:target", function(lnk) {
            var target = lnk.get("target");
            if ("undefined" == typeof target.id) {
              var rect = self.paper.findViewsFromPoint(g.point(target.x, target.y))[0];
              if (!rect || lnk.get("source").id === rect.model.get("id")) return;
              return target = rect, target.$el.addClass("arrowOver"), void lnk.set("target", {
                id: target.model.get("id")
              })
            }
            self.model.trigger("createLink", target.id)
          }), this.canUpdateLink = !0
        },
        onMouseUp: function() {
          this.canUpdateLink = !1, this.paper.$el.find(".component").css("z-index", 1)
        },
        onMouseMove: function(evt) {
          if (this.link && this.canUpdateLink && !(evt.clientX <= 10)) {
            var droppableDocumentOffset = $(board).offset();
            console.log(evt.offsetX + "," + evt.clientX), this.link.set("target", g.point(evt.clientX - droppableDocumentOffset.left, evt.clientY - droppableDocumentOffset.top))
          }
        }
      }), module.exports = joint.shapes.html.GaudiGraphComponent
    }, {
      jointjs: 41
    }
  ],
  40: [
    function(require, module) {
      var joint = require("jointjs"),
        graph = new joint.dia.Graph;
      module.exports = graph
    }, {
      jointjs: 41
    }
  ],
  41: [
    function(require, module) {
      window.joint = {
        dia: {},
        connectors: {}
      }; {
        var cell = require("joint/src/joint.dia.cell"),
          link = require("joint/src/joint.dia.link"),
          element = require("joint/src/joint.dia.element");
        require("vectorizer")
      }
      window.g = require("joint/src/geometry"), require("jquery.sortElements"), window.joint.dia.Cell = cell.Cell, window.joint.dia.Graph = require("joint/src/joint.dia.graph").Graph, window.joint.dia.LinkView = link.LinkView, window.joint.dia.Element = element.Element, window.joint.dia.ElementView = element.ElementView, window.joint.util = require("joint/src/core").util, window.joint.shapes = require("joint/plugins/shapes"), require("joint/src/joint.dia.paper"), require("joint/plugins/connectors/joint.connectors.normal"), module.exports = window.joint
    }, {
      "joint/plugins/connectors/joint.connectors.normal": 51,
      "joint/plugins/shapes": 52,
      "joint/src/core": 53,
      "joint/src/geometry": 54,
      "joint/src/joint.dia.cell": 55,
      "joint/src/joint.dia.element": 56,
      "joint/src/joint.dia.graph": 57,
      "joint/src/joint.dia.link": 58,
      "joint/src/joint.dia.paper": 59,
      "jquery.sortElements": "fo8krK",
      vectorizer: "k3mQBb"
    }
  ],
  42: [
    function(require, module) {
      var joint = require("jointjs"),
        graph = require("jointjs/graph"),
        paper = new joint.dia.Paper({
          el: document.getElementById("graphContainer"),
          width: "100%",
          height: "100%",
          gridSize: 1,
          model: graph
        });
      module.exports = paper
    }, {
      jointjs: 41,
      "jointjs/graph": 40
    }
  ],
  43: [
    function(require, module) {
      var Component = function(attributes) {
        "use strict";
        var self = this;
        this.custom = {}, this.links = [], angular.forEach(attributes.fields, function(field, fieldName) {
          self[fieldName] = self[fieldName] || field.default || ""
        }), angular.forEach(attributes.customFields, function(customField, customFieldName) {
          self.custom[customFieldName] = customField.default || ""
        });
        for (var name in attributes) attributes.hasOwnProperty(name) && (this[name] = attributes[name])
      };
      Component.prototype.createLink = function(target) {
        "use strict"; - 1 === this.links.indexOf(target.name) && this.links.push(target.name)
      }, Component.prototype.removeLink = function(oldTarget) {
        "use strict";
        var position, removed = !1;
        return void 0 !== oldTarget && (position = this.links.indexOf(oldTarget.name)) >= 0 && (this.links.splice(position, 1), removed = !0), removed
      }, Component.prototype.parseMapValue = function(map) {
        var key, value, mapDetails, results = {},
          rawValues = map.split(",");
        return angular.forEach(rawValues, function(rawValue) {
          "" !== rawValue && (mapDetails = rawValue.split(":"), key = mapDetails[0].trim(), value = mapDetails[1].trim(), /^\d+$/.test(value) && (value = parseInt(value, 10)), /^\d+$/.test(key) && (key = parseInt(key, 10)), results[key] = value)
        }), results
      }, Component.prototype.getFormattedValue = function(field, value) {
        return field.multiple === !0 && "string" == typeof value && "" !== value && (value = this.parseMapValue(value)), field.array === !0 && "string" == typeof value && "" !== value && (value = value.split(/,\s*/)), value
      }, Component.prototype.getOutputFields = function() {
        var self = this,
          results = {
            type: this.type,
            links: this.links,
            custom: {}
          };
        return angular.forEach(this.fields, function(field, fieldName) {
          results[fieldName] = self.getFormattedValue(field, self[fieldName])
        }), angular.forEach(this.customFields, function(customField, customFieldName) {
          results.custom[customFieldName] = self.getFormattedValue(customField, self.custom[customFieldName])
        }), results
      }, Component.prototype.changeLinkedComponentName = function(name, oldName) {
        var removed = Component.prototype.removeLink.apply(this, [{
          name: oldName
        }]);
        removed && Component.prototype.createLink.apply(this, [{
          name: name
        }])
      }, module.exports = Component
    }, {}
  ],
  44: [
    function(require, module) {
      var Component = require("models/components/component"),
        Database = function() {
          "use strict";
          this.__proto__.__proto__.constructor.apply(this, arguments), this.custom.repl = null, this.custom.master = null
        };
      Database.prototype.createLink = function(target) {
        "use strict";
        Component.prototype.createLink.apply(this, arguments), target.type === this.type && (null === this.custom.repl && (this.custom.repl = "master"), target.custom.repl || (target.custom.repl = "slave", target.custom.master = this.name))
      }, Database.prototype.removeLink = function(oldTarget) {
        "use strict";
        var result = Component.prototype.removeLink.apply(this, arguments);
        return oldTarget.type === this.type && ("master" === this.custom.repl && (this.custom.repl = null), "slave" === oldTarget.custom.repl && (oldTarget.custom.repl = null, oldTarget.custom.master = null)), result
      }, Database.prototype.changeLinkedComponentName = function(name, oldName) {
        "use strict";
        Component.prototype.changeLinkedComponentName.apply(this, arguments), this.custom.master === oldName && (this.custom.master = name)
      }, Database.prototype.__proto__ = Component.prototype, module.exports = Database
    }, {
      "models/components/component": 43
    }
  ],
  45: [
    function(require, module) {
      var Component = require("models/components/component"),
        HttpServer = function() {
          "use strict";
          Component.prototype.constructor.apply(this, arguments), this.custom.fastCgi = null
        };
      HttpServer.prototype.createLink = function(target) {
        "use strict";
        Component.prototype.createLink.apply(this, arguments), ("php-fpm" === target.type || "hhvm" === target.type) && (this.custom.fastCgi = target.name)
      }, HttpServer.prototype.removeLink = function(oldTarget) {
        "use strict";
        var result = Component.prototype.removeLink.apply(this, arguments);
        return ("php-fpm" === oldTarget.type || "hhvm" === oldTarget.type) && (this.custom.fastCgi = null), result
      }, HttpServer.prototype.changeLinkedComponentName = function(name, oldName) {
        "use strict";
        Component.prototype.changeLinkedComponentName.apply(this, arguments), this.custom.fastCgi === oldName && (this.custom.fastCgi = name)
      }, HttpServer.prototype.__proto__ = Component.prototype, module.exports = HttpServer
    }, {
      "models/components/component": 43
    }
  ],
  46: [
    function(require, module) {
      var HttpServer = require("models/components/httpServer"),
        LoadBalancer = function() {
          "use strict";
          this.__proto__.__proto__.constructor.apply(this, arguments), this.custom.backends = []
        };
      LoadBalancer.prototype.createLink = function(target) {
        "use strict";
        HttpServer.prototype.createLink.apply(this, arguments), "HttpServer" === target.class && -1 === this.custom.backends.indexOf(target.name) && this.custom.backends.push(target.name)
      }, LoadBalancer.prototype.removeLink = function(oldTarget) {
        "use strict";
        var result = HttpServer.prototype.removeLink.apply(this, arguments);
        return this.removeBackend(oldTarget), result
      }, LoadBalancer.prototype.removeBackend = function(oldTarget) {
        var removed = !1;
        if ("HttpServer" === oldTarget.class) {
          var pos = this.custom.backends.indexOf(oldTarget.name);
          pos > -1 && (this.custom.backends.splice(pos, 1), removed = !0)
        }
        return removed
      }, LoadBalancer.prototype.changeLinkedComponentName = function(name, oldName) {
        "use strict";
        HttpServer.prototype.changeLinkedComponentName.apply(this, arguments);
        var removed = this.removeBackend({
          name: oldName
        });
        removed && this.custom.backends.push({
          name: name
        })
      }, LoadBalancer.prototype.__proto__ = HttpServer.prototype, module.exports = LoadBalancer
    }, {
      "models/components/httpServer": 45
    }
  ],
  47: [
    function(require) {
      angular.module("gaudiBuilder").service("componentFactory", function() {
        "use strict";
        return {
          Component: require("models/components/component"),
          Database: require("models/components/database"),
          HttpServer: require("models/components/httpServer"),
          LoadBalancer: require("models/components/loadBalancer")
        }
      })
    }, {
      "models/components/component": 43,
      "models/components/database": 44,
      "models/components/httpServer": 45,
      "models/components/loadBalancer": 46
    }
  ],
  48: [
    function(require) {
      require("services/componentFactory");
      angular.module("gaudiBuilder").service("componentFetcher", ["$q", "$http", "componentFactory",
        function($q, $http, componentFactory) {
          "use strict";

          function getAllComponents() {
            var component, deferred = $q.defer();
            return availableComponents ? deferred.resolve(availableComponents) : $http.get("/builder/data/components.json").success(function(rawComponents) {
              availableComponents = {}, angular.forEach(rawComponents, function(rawComponent, type) {
                rawComponent.type = type, component = new componentFactory[rawComponent.class](rawComponent), availableComponents[type] = component
              }), deferred.resolve(availableComponents)
            }).error(deferred.reject), deferred.promise
          }
          var availableComponents = null;
          return {
            getAllComponents: getAllComponents
          }
        }
      ])
    }, {
      "services/componentFactory": 47
    }
  ],
  49: [
    function() {
      angular.module("gaudiBuilder").service("selectedComponents", function() {
        "use strict";
        this.components = {}, this.getElementName = function(type) {
          if (type = type.replace("-", "_"), void 0 === this.components[type]) return type;
          var newName, parts = type.split("_"),
            nbParts = parts.length;
          return newName = nbParts > 1 && parseInt(parts[nbParts - 1], 10) > 0 ? parts.slice(0, nbParts - 1).join("_") + "_" + (Number(parts[nbParts - 1]) + 1) : type + "_1", this.getElementName(newName)
        }
      })
    }, {}
  ],
  50: [
    function(require) {
      var yaml = require("yamljs/bin/yaml");
      YamlEscaper.prototype.requiresSingleQuoting = function() {
        "use strict";
        return !1
      }, angular.module("gaudiBuilder").service("yamlParser", function() {
        "use strict";

        function cleanEmptyObjects(object) {
          if (_.isEmpty(object)) return "";
          for (var prop in object) object.hasOwnProperty(prop) && "object" == typeof object[prop] && ("common" !== prop && "binary" !== prop ? (object[prop] = cleanEmptyObjects(object[prop]), _.isEmpty(object[prop]) && delete object[prop]) : delete object[prop]);
          return object
        }

        function cleanResult(object) {
          for (var prop in object) object.hasOwnProperty(prop) && ("binary" !== prop && "" !== object[prop] ? "object" == typeof object[prop] && (object[prop] = cleanResult(object[prop])) : delete object[prop]);
          return object
        }

        function dump(object, depth) {
          return _.isEmpty(object) ? "" : yaml.stringify(object, depth)
        }
        return {
          cleanEmptyObjects: cleanEmptyObjects,
          cleanResult: cleanResult,
          dump: dump
        }
      })
    }, {
      "yamljs/bin/yaml": 60
    }
  ],
  51: [
    function() {
      joint.connectors.normal = function(sourcePoint, targetPoint, vertices) {
        var d = ["M", sourcePoint.x, sourcePoint.y];
        return _.each(vertices, function(vertex) {
          d.push(vertex.x, vertex.y)
        }), d.push(targetPoint.x, targetPoint.y), d.join(" ")
      }
    }, {}
  ],
  52: [
    function(require, module) {
      module.exports = {
        basic: require("./joint.shapes.basic"),
        erd: require("./joint.shapes.erd"),
        pn: require("./joint.shapes.pn"),
        chess: require("./joint.shapes.chess"),
        fsa: require("./joint.shapes.fsa"),
        uml: require("./joint.shapes.uml"),
        devs: require("./joint.shapes.devs"),
        org: require("./joint.shapes.org")
      }
    }, {
      "./joint.shapes.basic": 15,
      "./joint.shapes.chess": 16,
      "./joint.shapes.devs": 17,
      "./joint.shapes.erd": 18,
      "./joint.shapes.fsa": 19,
      "./joint.shapes.org": 20,
      "./joint.shapes.pn": 21,
      "./joint.shapes.uml": 22
    }
  ],
  53: [
    function(require, module) {
      module.exports = require(23)
    }, {
      lodash: 33
    }
  ],
  54: [
    function(require, module) {
      module.exports = require(24)
    }, {}
  ],
  55: [
    function(require, module, exports) {
      if ("object" == typeof exports) var Backbone = require("backbone"),
        _ = require("lodash");
      joint.dia.Cell = Backbone.Model.extend({
        constructor: function(attributes, options) {
          var defaults, attrs = attributes || {};
          this.cid = _.uniqueId("c"), this.attributes = {}, options && options.collection && (this.collection = options.collection), options && options.parse && (attrs = this.parse(attrs, options) || {}), (defaults = _.result(this, "defaults")) && (attrs = _.merge({}, defaults, attrs)), this.set(attrs, options), this.changed = {}, this.initialize.apply(this, arguments)
        },
        toJSON: function() {
          var defaultAttrs = this.constructor.prototype.defaults.attrs || {},
            attrs = this.attributes.attrs,
            finalAttrs = {};
          _.each(attrs, function(attr, selector) {
            var defaultAttr = defaultAttrs[selector];
            _.each(attr, function(value, name) {
              _.isObject(value) && !_.isArray(value) ? _.each(value, function(value2, name2) {
                defaultAttr && defaultAttr[name] && _.isEqual(defaultAttr[name][name2], value2) || (finalAttrs[selector] = finalAttrs[selector] || {}, (finalAttrs[selector][name] || (finalAttrs[selector][name] = {}))[name2] = value2)
              }) : defaultAttr && _.isEqual(defaultAttr[name], value) || (finalAttrs[selector] = finalAttrs[selector] || {}, finalAttrs[selector][name] = value)
            })
          });
          var attributes = _.cloneDeep(_.omit(this.attributes, "attrs"));
          return attributes.attrs = finalAttrs, attributes
        },
        initialize: function(options) {
          options && options.id || this.set("id", joint.util.uuid(), {
            silent: !0
          }), this._transitionIds = {}, this.processPorts(), this.on("change:attrs", this.processPorts, this)
        },
        processPorts: function() {
          var previousPorts = this.ports,
            ports = {};
          _.each(this.get("attrs"), function(attrs) {
            attrs && attrs.port && (_.isUndefined(attrs.port.id) ? ports[attrs.port] = {
              id: attrs.port
            } : ports[attrs.port.id] = attrs.port)
          });
          var removedPorts = {};
          if (_.each(previousPorts, function(port, id) {
            ports[id] || (removedPorts[id] = !0)
          }), this.collection && !_.isEmpty(removedPorts)) {
            var inboundLinks = this.collection.getConnectedLinks(this, {
              inbound: !0
            });
            _.each(inboundLinks, function(link) {
              removedPorts[link.get("target").port] && link.remove()
            });
            var outboundLinks = this.collection.getConnectedLinks(this, {
              outbound: !0
            });
            _.each(outboundLinks, function(link) {
              removedPorts[link.get("source").port] && link.remove()
            })
          }
          this.ports = ports
        },
        remove: function(options) {
          var collection = this.collection;
          collection && collection.trigger("batch:start");
          var parentCellId = this.get("parent");
          if (parentCellId) {
            var parentCell = this.collection && this.collection.get(parentCellId);
            parentCell.unembed(this)
          }
          _.invoke(this.getEmbeddedCells(), "remove", options), this.trigger("remove", this, this.collection, options), collection && collection.trigger("batch:stop")
        },
        toFront: function() {
          this.collection && this.set("z", (this.collection.last().get("z") || 0) + 1)
        },
        toBack: function() {
          this.collection && this.set("z", (this.collection.first().get("z") || 0) - 1)
        },
        embed: function(cell) {
          if (this.get("parent") == cell.id) throw new Error("Recursive embedding not allowed.");
          this.trigger("batch:start"), cell.set("parent", this.id), this.set("embeds", _.uniq((this.get("embeds") || []).concat([cell.id]))), this.trigger("batch:stop")
        },
        unembed: function(cell) {
          this.trigger("batch:start");
          var cellId = cell.id;
          cell.unset("parent"), this.set("embeds", _.without(this.get("embeds"), cellId)), this.trigger("batch:stop")
        },
        getEmbeddedCells: function() {
          return this.collection ? _.map(this.get("embeds") || [], function(cellId) {
            return this.collection.get(cellId)
          }, this) : []
        },
        clone: function(opt) {
          opt = opt || {};
          var clone = Backbone.Model.prototype.clone.apply(this, arguments);
          if (clone.set("id", joint.util.uuid(), {
            silent: !0
          }), clone.set("embeds", ""), !opt.deep) return clone;
          var embeds = this.getEmbeddedCells(),
            clones = [clone],
            linkCloneMapping = {};
          return _.each(embeds, function(embed) {
            var embedClones = embed.clone({
              deep: !0
            });
            clone.embed(embedClones[0]), _.each(embedClones, function(embedClone) {
              if (clones.push(embedClone), !(embedClone instanceof joint.dia.Link)) {
                var inboundLinks = this.collection.getConnectedLinks(embed, {
                  inbound: !0
                });
                _.each(inboundLinks, function(link) {
                  var linkClone = linkCloneMapping[link.id] || link.clone();
                  linkCloneMapping[link.id] = linkClone;
                  var target = _.clone(linkClone.get("target"));
                  target.id = embedClone.id, linkClone.set("target", target)
                });
                var outboundLinks = this.collection.getConnectedLinks(embed, {
                  outbound: !0
                });
                _.each(outboundLinks, function(link) {
                  var linkClone = linkCloneMapping[link.id] || link.clone();
                  linkCloneMapping[link.id] = linkClone;
                  var source = _.clone(linkClone.get("source"));
                  source.id = embedClone.id, linkClone.set("source", source)
                })
              }
            }, this)
          }, this), clones = clones.concat(_.values(linkCloneMapping))
        },
        attr: function(attrs, value, opt) {
          var currentAttrs = this.get("attrs"),
            delim = "/";
          if (_.isString(attrs)) {
            if ("undefined" != typeof value) {
              var attr = {};
              return joint.util.setByPath(attr, attrs, value, delim), this.set("attrs", _.merge({}, currentAttrs, attr), opt)
            }
            return joint.util.getByPath(currentAttrs, attrs, delim)
          }
          return this.set("attrs", _.merge({}, currentAttrs, attrs), value, opt)
        },
        removeAttr: function(path, opt) {
          if (_.isArray(path)) return _.each(path, function(p) {
            this.removeAttr(p, opt)
          }, this), this;
          var attrs = joint.util.unsetByPath(_.merge({}, this.get("attrs")), path, "/");
          return this.set("attrs", attrs, _.extend({
            dirty: !0
          }, opt))
        },
        transition: function(path, value, opt, delim) {
          delim = delim || "/";
          var defaults = {
            duration: 100,
            delay: 10,
            timingFunction: joint.util.timing.linear,
            valueFunction: joint.util.interpolate.number
          };
          opt = _.extend(defaults, opt);
          var interpolatingFunction, pathArray = path.split(delim),
            property = pathArray[0],
            isPropertyNested = pathArray.length > 1,
            firstFrameTime = 0,
            setter = _.bind(function(runtime) {
              var id, progress, propertyValue;
              if (firstFrameTime = firstFrameTime || runtime, runtime -= firstFrameTime, progress = runtime / opt.duration, 1 > progress ? this._transitionIds[path] = id = joint.util.nextFrame(setter) : (progress = 1, delete this._transitionIds[path]), propertyValue = interpolatingFunction(opt.timingFunction(progress)), isPropertyNested) {
                var nestedPropertyValue = joint.util.setByPath({}, path, propertyValue, delim)[property];
                propertyValue = _.merge({}, this.get(property), nestedPropertyValue)
              }
              opt.transitionId = id, this.set(property, propertyValue, opt), id || this.trigger("transition:end", this, path)
            }, this),
            initiator = _.bind(function(callback) {
              this.stopTransitions(path), interpolatingFunction = opt.valueFunction(joint.util.getByPath(this.attributes, path, delim), value), this._transitionIds[path] = joint.util.nextFrame(callback), this.trigger("transition:start", this, path)
            }, this);
          return _.delay(initiator, opt.delay, setter)
        },
        getTransitions: function() {
          return _.keys(this._transitionIds)
        },
        stopTransitions: function(path, delim) {
          delim = delim || "/";
          var pathArray = path && path.split(delim);
          _(this._transitionIds).keys().filter(pathArray && function(key) {
            return _.isEqual(pathArray, key.split(delim).slice(0, pathArray.length))
          }).each(function(key) {
            joint.util.cancelFrame(this._transitionIds[key]), delete this._transitionIds[key], this.trigger("transition:end", this, key)
          }, this)
        }
      }), joint.dia.CellView = Backbone.View.extend({
        tagName: "g",
        attributes: function() {
          return {
            "model-id": this.model.id
          }
        },
        initialize: function() {
          _.bindAll(this, "remove", "update"), this.$el.data("view", this), this.listenTo(this.model, "remove", this.remove), this.listenTo(this.model, "change:attrs", this.onChangeAttrs)
        },
        onChangeAttrs: function(cell, attrs, opt) {
          return opt.dirty ? this.render() : this.update()
        },
        _configure: function(options) {
          options.id = options.id || joint.util.guid(this), Backbone.View.prototype._configure.apply(this, arguments)
        },
        _ensureElement: function() {
          var el;
          if (this.el) el = _.result(this, "el");
          else {
            var attrs = _.extend({
              id: this.id
            }, _.result(this, "attributes"));
            this.className && (attrs["class"] = _.result(this, "className")), el = V(_.result(this, "tagName"), attrs).node
          }
          this.setElement(el, !1)
        },
        findBySelector: function(selector) {
          var $selected = "." === selector ? this.$el : this.$el.find(selector);
          return $selected
        },
        notify: function(evt) {
          if (this.paper) {
            var args = Array.prototype.slice.call(arguments, 1);
            this.trigger.apply(this, [evt].concat(args)), this.paper.trigger.apply(this.paper, [evt, this].concat(args))
          }
        },
        getStrokeBBox: function(el) {
          var isMagnet = !!el;
          el = el || this.el;
          var strokeWidth, bbox = V(el).bbox(!1, this.paper.viewport);
          return strokeWidth = isMagnet ? V(el).attr("stroke-width") : this.model.attr("rect/stroke-width") || this.model.attr("circle/stroke-width") || this.model.attr("ellipse/stroke-width") || this.model.attr("path/stroke-width"), strokeWidth = parseFloat(strokeWidth) || 0, g.rect(bbox).moveAndExpand({
            x: -strokeWidth / 2,
            y: -strokeWidth / 2,
            width: strokeWidth,
            height: strokeWidth
          })
        },
        getBBox: function() {
          return V(this.el).bbox()
        },
        highlight: function(el) {
          el = el ? this.$(el)[0] || this.el : this.el, V(el).addClass("highlighted")
        },
        unhighlight: function(el) {
          el = el ? this.$(el)[0] || this.el : this.el, V(el).removeClass("highlighted")
        },
        findMagnet: function(el) {
          var $el = this.$(el);
          if (0 === $el.length || $el[0] === this.el) {
            var attrs = this.model.get("attrs") || {};
            return attrs["."] && attrs["."].magnet === !1 ? void 0 : this.el
          }
          return $el.attr("magnet") ? $el[0] : this.findMagnet($el.parent())
        },
        applyFilter: function(selector, filter) {
          var $selected = this.findBySelector(selector),
            filterId = filter.name + this.paper.svg.id + joint.util.hashCode(JSON.stringify(filter));
          if (!this.paper.svg.getElementById(filterId)) {
            var filterSVGString = joint.util.filter[filter.name] && joint.util.filter[filter.name](filter.args || {});
            if (!filterSVGString) throw new Error("Non-existing filter " + filter.name);
            var filterElement = V(filterSVGString);
            filterElement.attr("filterUnits", "userSpaceOnUse"), filter.attrs && filterElement.attr(filter.attrs), filterElement.node.id = filterId, V(this.paper.svg).defs().append(filterElement)
          }
          $selected.each(function() {
            V(this).attr("filter", "url(#" + filterId + ")")
          })
        },
        applyGradient: function(selector, attr, gradient) {
          var $selected = this.findBySelector(selector),
            gradientId = gradient.type + this.paper.svg.id + joint.util.hashCode(JSON.stringify(gradient));
          if (!this.paper.svg.getElementById(gradientId)) {
            var gradientSVGString = ["<" + gradient.type + ">", _.map(gradient.stops, function(stop) {
                return '<stop offset="' + stop.offset + '" stop-color="' + stop.color + '" stop-opacity="' + (_.isFinite(stop.opacity) ? stop.opacity : 1) + '" />'
              }).join(""), "</" + gradient.type + ">"].join(""),
              gradientElement = V(gradientSVGString);
            gradient.attrs && gradientElement.attr(gradient.attrs), gradientElement.node.id = gradientId, V(this.paper.svg).defs().append(gradientElement)
          }
          $selected.each(function() {
            V(this).attr(attr, "url(#" + gradientId + ")")
          })
        },
        getSelector: function(el, selector) {
          if (el === this.el) return selector;
          var index = $(el).index();
          return selector = el.tagName + ":nth-child(" + (index + 1) + ") " + (selector || ""), this.getSelector($(el).parent()[0], selector + " ")
        },
        pointerdblclick: function(evt, x, y) {
          this.notify("cell:pointerdblclick", evt, x, y)
        },
        pointerclick: function(evt, x, y) {
          this.notify("cell:pointerclick", evt, x, y)
        },
        pointerdown: function(evt, x, y) {
          this.model.collection && (this.model.trigger("batch:start"), this._collection = this.model.collection), this.notify("cell:pointerdown", evt, x, y)
        },
        pointermove: function(evt, x, y) {
          this.notify("cell:pointermove", evt, x, y)
        },
        pointerup: function(evt, x, y) {
          this.notify("cell:pointerup", evt, x, y), this._collection && (this._collection.trigger("batch:stop"), delete this._collection)
        }
      }), "object" == typeof exports && (module.exports.Cell = joint.dia.Cell, module.exports.CellView = joint.dia.CellView)
    }, {
      backbone: "pHOy1N",
      lodash: 33
    }
  ],
  56: [
    function(require, module) {
      module.exports = require(25)
    }, {
      backbone: "pHOy1N",
      lodash: 33
    }
  ],
  57: [
    function(require, module, exports) {
      if ("object" == typeof exports) var Backbone = require("backbone"),
        _ = require("lodash"),
        g = require("./geometry");
      joint.dia.GraphCells = Backbone.Collection.extend({
        initialize: function() {
          this.on("change:z", this.sort, this)
        },
        model: function(attrs, options) {
          if ("link" === attrs.type) return new joint.dia.Link(attrs, options);
          var module = attrs.type.split(".")[0],
            entity = attrs.type.split(".")[1];
          return joint.shapes[module] && joint.shapes[module][entity] ? new joint.shapes[module][entity](attrs, options) : new joint.dia.Element(attrs, options)
        },
        comparator: function(model) {
          return model.get("z") || 0
        },
        getConnectedLinks: function(model, opt) {
          opt = opt || {}, _.isUndefined(opt.inbound) && _.isUndefined(opt.outbound) && (opt.inbound = opt.outbound = !0);
          var links = [];
          return this.each(function(cell) {
            var source = cell.get("source"),
              target = cell.get("target");
            source && source.id === model.id && opt.outbound && links.push(cell), target && target.id === model.id && opt.inbound && links.push(cell)
          }), links
        }
      }), joint.dia.Graph = Backbone.Model.extend({
        initialize: function() {
          this.set("cells", new joint.dia.GraphCells), this.get("cells").on("all", this.trigger, this), this.get("cells").on("remove", this.removeCell, this)
        },
        toJSON: function() {
          var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
          return json.cells = this.get("cells").toJSON(), json
        },
        fromJSON: function(json) {
          if (!json.cells) throw new Error("Graph JSON must contain cells array.");
          var attrs = json,
            cells = json.cells;
          delete attrs.cells, this.set(attrs), this.resetCells(cells)
        },
        clear: function() {
          this.trigger("batch:start"), this.get("cells").remove(this.get("cells").models), this.trigger("batch:stop")
        },
        _prepareCell: function(cell) {
          return cell instanceof Backbone.Model && _.isUndefined(cell.get("z")) ? cell.set("z", this.maxZIndex() + 1, {
            silent: !0
          }) : _.isUndefined(cell.z) && (cell.z = this.maxZIndex() + 1), cell
        },
        maxZIndex: function() {
          var lastCell = this.get("cells").last();
          return lastCell ? lastCell.get("z") || 0 : 0
        },
        addCell: function(cell, options) {
          return _.isArray(cell) ? this.addCells(cell, options) : (this.get("cells").add(this._prepareCell(cell), options || {}), this)
        },
        addCells: function(cells, options) {
          return _.each(cells, function(cell) {
            this.addCell(cell, options)
          }, this), this
        },
        resetCells: function(cells) {
          return this.get("cells").reset(_.map(cells, this._prepareCell, this)), this
        },
        removeCell: function(cell, collection, options) {
          options && options.disconnectLinks ? this.disconnectLinks(cell) : this.removeLinks(cell), this.get("cells").remove(cell, {
            silent: !0
          })
        },
        getCell: function(id) {
          return this.get("cells").get(id)
        },
        getElements: function() {
          return this.get("cells").filter(function(cell) {
            return cell instanceof joint.dia.Element
          })
        },
        getLinks: function() {
          return this.get("cells").filter(function(cell) {
            return cell instanceof joint.dia.Link
          })
        },
        getConnectedLinks: function(model, opt) {
          return this.get("cells").getConnectedLinks(model, opt)
        },
        getNeighbors: function(el) {
          var links = this.getConnectedLinks(el),
            neighbors = [],
            cells = this.get("cells");
          return _.each(links, function(link) {
            var source = link.get("source"),
              target = link.get("target");
            if (!source.x) {
              var sourceElement = cells.get(source.id);
              sourceElement !== el && neighbors.push(sourceElement)
            }
            if (!target.x) {
              var targetElement = cells.get(target.id);
              targetElement !== el && neighbors.push(targetElement)
            }
          }), neighbors
        },
        disconnectLinks: function(model) {
          _.each(this.getConnectedLinks(model), function(link) {
            link.set(link.get("source").id === model.id ? "source" : "target", g.point(0, 0))
          })
        },
        removeLinks: function(model) {
          _.invoke(this.getConnectedLinks(model), "remove")
        },
        findModelsFromPoint: function(p) {
          return _.filter(this.getElements(), function(el) {
            return el.getBBox().containsPoint(p)
          })
        },
        findModelsInArea: function(r) {
          return _.filter(this.getElements(), function(el) {
            return el.getBBox().intersect(r)
          })
        }
      }), "object" == typeof exports && (module.exports.Graph = joint.dia.Graph)
    }, {
      "./geometry": 24,
      backbone: "pHOy1N",
      lodash: 33
    }
  ],
  58: [
    function(require, module) {
      module.exports = require(26)
    }, {
      "./geometry": 24,
      backbone: "pHOy1N",
      lodash: 33
    }
  ],
  59: [
    function() {
      joint.dia.Paper = Backbone.View.extend({
        options: {
          width: 800,
          height: 600,
          gridSize: 50,
          perpendicularLinks: !1,
          elementView: joint.dia.ElementView,
          linkView: joint.dia.LinkView,
          snapLinks: !1,
          defaultLink: new joint.dia.Link,
          validateMagnet: function(cellView, magnet) {
            return "passive" !== magnet.getAttribute("magnet")
          },
          validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end) {
            return ("target" === end ? cellViewT : cellViewS) instanceof joint.dia.ElementView
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
        initialize: function() {
          _.bindAll(this, "addCell", "sortCells", "resetCells", "pointerup"), this.svg = V("svg").node, this.viewport = V("g").node, V(this.svg).append(V("defs").node), V(this.viewport).attr({
            "class": "viewport"
          }), V(this.svg).append(this.viewport), this.$el.append(this.svg), this.setDimensions(), this.listenTo(this.model, "add", this.addCell), this.listenTo(this.model, "reset", this.resetCells), this.listenTo(this.model, "sort", this.sortCells), $(document).on("mouseup touchend", this.pointerup), this._mousemoved = !1
        },
        remove: function() {
          $(document).off("mouseup touchend", this.pointerup), Backbone.View.prototype.remove.call(this)
        },
        setDimensions: function(width, height) {
          width && (this.options.width = width), height && (this.options.height = height), V(this.svg).attr("width", this.options.width), V(this.svg).attr("height", this.options.height), this.trigger("resize")
        },
        fitToContent: function(gridWidth, gridHeight, padding) {
          gridWidth = gridWidth || 1, gridHeight = gridHeight || 1, padding = padding || 0;
          var bbox = V(this.viewport).bbox(!0, this.svg),
            calcWidth = Math.ceil((bbox.width + bbox.x) / gridWidth) * gridWidth,
            calcHeight = Math.ceil((bbox.height + bbox.y) / gridHeight) * gridHeight;
          calcWidth += padding, calcHeight += padding, (calcWidth != this.options.width || calcHeight != this.options.height) && this.setDimensions(calcWidth || this.options.width, calcHeight || this.options.height)
        },
        getContentBBox: function() {
          var crect = this.viewport.getBoundingClientRect(),
            ctm = this.viewport.getScreenCTM(),
            bbox = g.rect(Math.abs(crect.left - ctm.e), Math.abs(crect.top - ctm.f), crect.width, crect.height);
          return bbox
        },
        createViewForModel: function(cell) {
          var view, type = cell.get("type"),
            module = type.split(".")[0],
            entity = type.split(".")[1];
          return view = joint.shapes[module] && joint.shapes[module][entity + "View"] ? new joint.shapes[module][entity + "View"]({
            model: cell,
            interactive: this.options.interactive
          }) : cell instanceof joint.dia.Element ? new this.options.elementView({
            model: cell,
            interactive: this.options.interactive
          }) : new this.options.linkView({
            model: cell,
            interactive: this.options.interactive
          })
        },
        addCell: function(cell) {
          var view = this.createViewForModel(cell);
          V(this.viewport).append(view.el), view.paper = this, view.render(), $(view.el).find("image").on("dragstart", function() {
            return !1
          })
        },
        resetCells: function(cellsCollection) {
          $(this.viewport).empty();
          var cells = cellsCollection.models.slice();
          cells.sort(function(a) {
            return a instanceof joint.dia.Link ? 1 : -1
          }), _.each(cells, this.addCell, this), this.sortCells()
        },
        sortCells: function() {
          var $cells = $(this.viewport).children("[model-id]"),
            cells = this.model.get("cells");
          this.sortElements($cells, function(a, b) {
            var cellA = cells.get($(a).attr("model-id")),
              cellB = cells.get($(b).attr("model-id"));
            return (cellA.get("z") || 0) > (cellB.get("z") || 0) ? 1 : -1
          })
        },
        sortElements: function(elements, comparator) {
          var $elements = $(elements),
            placements = $elements.map(function() {
              var sortElement = this,
                parentNode = sortElement.parentNode,
                nextSibling = parentNode.insertBefore(document.createTextNode(""), sortElement.nextSibling);
              return function() {
                if (parentNode === this) throw new Error("You can't sort elements if any one is a descendant of another.");
                parentNode.insertBefore(this, nextSibling), parentNode.removeChild(nextSibling)
              }
            });
          return Array.prototype.sort.call($elements, comparator).each(function(i) {
            placements[i].call(this)
          })
        },
        scale: function(sx, sy, ox, oy) {
          return ox || (ox = 0, oy = 0), V(this.viewport).attr("transform", ""), (ox || oy) && V(this.viewport).translate(-ox * (sx - 1), -oy * (sy - 1)), V(this.viewport).scale(sx, sy), this.trigger("scale", ox, oy), this
        },
        rotate: function(deg, ox, oy) {
          if (_.isUndefined(ox)) {
            var bbox = this.viewport.getBBox();
            ox = bbox.width / 2, oy = bbox.height / 2
          }
          V(this.viewport).rotate(deg, ox, oy)
        },
        findView: function(el) {
          var $el = this.$(el);
          return 0 === $el.length || $el[0] === this.el ? void 0 : $el.data("view") ? $el.data("view") : this.findView($el.parent())
        },
        findViewByModel: function(cell) {
          var id = _.isString(cell) ? cell : cell.id,
            $view = this.$('[model-id="' + id + '"]');
          return $view.length ? $view.data("view") : void 0
        },
        findViewsFromPoint: function(p) {
          p = g.point(p);
          var views = _.map(this.model.getElements(), this.findViewByModel);
          return _.filter(views, function(view) {
            return g.rect(V(view.el).bbox(!1, this.viewport)).containsPoint(p)
          }, this)
        },
        findViewsInArea: function(r) {
          r = g.rect(r);
          var views = _.map(this.model.getElements(), this.findViewByModel);
          return _.filter(views, function(view) {
            return r.intersect(g.rect(V(view.el).bbox(!1, this.viewport)))
          }, this)
        },
        getModelById: function(id) {
          return this.model.getCell(id)
        },
        snapToGrid: function(p) {
          var localPoint = V(this.viewport).toLocalPoint(p.x, p.y);
          return {
            x: g.snapToGrid(localPoint.x, this.options.gridSize),
            y: g.snapToGrid(localPoint.y, this.options.gridSize)
          }
        },
        getDefaultLink: function(cellView, magnet) {
          return _.isFunction(this.options.defaultLink) ? this.options.defaultLink.call(this, cellView, magnet) : this.options.defaultLink.clone()
        },
        mousedblclick: function(evt) {
          evt.preventDefault(), evt = joint.util.normalizeEvent(evt);
          var view = this.findView(evt.target),
            localPoint = this.snapToGrid({
              x: evt.clientX,
              y: evt.clientY
            });
          view ? view.pointerdblclick(evt, localPoint.x, localPoint.y) : this.trigger("blank:pointerdblclick", evt, localPoint.x, localPoint.y)
        },
        mouseclick: function(evt) {
          if (!this._mousemoved) {
            evt.preventDefault(), evt = joint.util.normalizeEvent(evt);
            var view = this.findView(evt.target),
              localPoint = this.snapToGrid({
                x: evt.clientX,
                y: evt.clientY
              });
            view ? view.pointerclick(evt, localPoint.x, localPoint.y) : this.trigger("blank:pointerclick", evt, localPoint.x, localPoint.y)
          }
          this._mousemoved = !1
        },
        pointerdown: function(evt) {
          evt.preventDefault(), evt = joint.util.normalizeEvent(evt);
          var view = this.findView(evt.target),
            localPoint = this.snapToGrid({
              x: evt.clientX,
              y: evt.clientY
            });
          view ? (this.sourceView = view, view.pointerdown(evt, localPoint.x, localPoint.y)) : this.trigger("blank:pointerdown", evt, localPoint.x, localPoint.y)
        },
        pointermove: function(evt) {
          if (evt.preventDefault(), evt = joint.util.normalizeEvent(evt), this.sourceView) {
            this._mousemoved = !0;
            var localPoint = this.snapToGrid({
              x: evt.clientX,
              y: evt.clientY
            });
            this.sourceView.pointermove(evt, localPoint.x, localPoint.y)
          }
        },
        pointerup: function(evt) {
          evt = joint.util.normalizeEvent(evt);
          var localPoint = this.snapToGrid({
            x: evt.clientX,
            y: evt.clientY
          });
          this.sourceView ? (this.sourceView.pointerup(evt, localPoint.x, localPoint.y), this.sourceView = null) : this.trigger("blank:pointerup", evt, localPoint.x, localPoint.y)
        }
      })
    }, {}
  ],
  60: [
    function(require, module, exports) {
      ! function() {
        var YamlParseException = function(message, parsedLine, snippet, parsedFile) {
          this.rawMessage = message, this.parsedLine = void 0 !== parsedLine ? parsedLine : -1, this.snippet = void 0 !== snippet ? snippet : null, this.parsedFile = void 0 !== parsedFile ? parsedFile : null, this.updateRepr(), this.message = message
        };
        YamlParseException.prototype = {
          name: "YamlParseException",
          message: null,
          parsedFile: null,
          parsedLine: -1,
          snippet: null,
          rawMessage: null,
          isDefined: function(input) {
            return void 0 != input && null != input
          },
          getSnippet: function() {
            return this.snippet
          },
          setSnippet: function(snippet) {
            this.snippet = snippet, this.updateRepr()
          },
          getParsedFile: function() {
            return this.parsedFile
          },
          setParsedFile: function(parsedFile) {
            this.parsedFile = parsedFile, this.updateRepr()
          },
          getParsedLine: function() {
            return this.parsedLine
          },
          setParsedLine: function(parsedLine) {
            this.parsedLine = parsedLine, this.updateRepr()
          },
          updateRepr: function() {
            this.message = this.rawMessage;
            var dot = !1;
            "." === this.message.charAt(this.message.length - 1) && (this.message = this.message.substring(0, this.message.length - 1), dot = !0), null !== this.parsedFile && (this.message += " in " + JSON.stringify(this.parsedFile)), this.parsedLine >= 0 && (this.message += " at line " + this.parsedLine), this.snippet && (this.message += ' (near "' + this.snippet + '")'), dot && (this.message += ".")
          }
        };
        var YamlRunningUnderNode = !1,
          Yaml = function() {};
        Yaml.prototype = {
          parseFile: function(file, callback) {
            if (null == callback) {
              var input = this.getFileContents(file),
                ret = null;
              try {
                ret = this.parse(input)
              } catch (e) {
                throw e instanceof YamlParseException && e.setParsedFile(file), e
              }
              return ret
            }
            this.getFileContents(file, function(data) {
              callback((new Yaml).parse(data))
            })
          },
          parse: function(input) {
            var yaml = new YamlParser;
            return yaml.parse(input)
          },
          dump: function(array, inline, spaces) {
            null == inline && (inline = 2);
            var yaml = new YamlDumper;
            return spaces && (yaml.numSpacesForIndentation = spaces), yaml.dump(array, inline)
          },
          getXHR: function() {
            if (window.XMLHttpRequest) return new XMLHttpRequest;
            if (window.ActiveXObject)
              for (var names = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP"], i = 0; 4 > i; i++) try {
                return new ActiveXObject(names[i])
              } catch (e) {}
            return null
          },
          getFileContents: function(file, callback) {
            if (YamlRunningUnderNode) {
              var fs = require("fs");
              if (null == callback) {
                var data = fs.readFileSync(file);
                return null == data ? null : "" + data
              }
              fs.readFile(file, function(err, data) {
                callback(err ? null : data)
              })
            } else {
              var request = this.getXHR();
              if (null == callback) return request.open("GET", file, !1), request.send(null), 200 == request.status || 0 == request.status ? request.responseText : null;
              request.onreadystatechange = function() {
                4 == request.readyState && callback(200 == request.status || 0 == request.status ? request.responseText : null)
              }, request.open("GET", file, !0), request.send(null)
            }
          }
        };
        var YAML = {
          stringify: function(input, inline, spaces) {
            return (new Yaml).dump(input, inline, spaces)
          },
          parse: function(input) {
            return (new Yaml).parse(input)
          },
          load: function(file, callback) {
            return (new Yaml).parseFile(file, callback)
          }
        };
        "undefined" != typeof exports && "undefined" != typeof module && module.exports && (exports = module.exports = YAML, YamlRunningUnderNode = !0, function() {
          var require_handler = function(module, filename) {
            module.exports = YAML.load(filename)
          };
          void 0 !== require.extensions && (require.extensions[".yml"] = require_handler, require.extensions[".yaml"] = require_handler)
        }()), "undefined" != typeof window && (window.YAML = YAML);
        var YamlInline = function() {};
        YamlInline.prototype = {
          i: null,
          parse: function(value) {
            var result = null;
            if (value = this.trim(value), 0 == value.length) return "";
            switch (value.charAt(0)) {
              case "[":
                result = this.parseSequence(value);
                break;
              case "{":
                result = this.parseMapping(value);
                break;
              default:
                result = this.parseScalar(value)
            }
            if ("" != value.substr(this.i + 1).replace(/^\s*#.*$/, "")) throw console.log("oups " + value.substr(this.i + 1)), new YamlParseException('Unexpected characters near "' + value.substr(this.i) + '".');
            return result
          },
          dump: function(value) {
            if (void 0 == value || null == value) return "null";
            if (value instanceof Date) return value.toISOString();
            if ("object" == typeof value) return this.dumpObject(value);
            if ("boolean" == typeof value) return value ? "true" : "false";
            if (/^\d+$/.test(value)) return "string" == typeof value ? "'" + value + "'" : parseInt(value);
            if (this.isNumeric(value)) return "string" == typeof value ? "'" + value + "'" : parseFloat(value);
            if ("number" == typeof value) return 1 / 0 == value ? ".Inf" : value == -1 / 0 ? "-.Inf" : isNaN(value) ? ".NAN" : value;
            var yaml = new YamlEscaper;
            return yaml.requiresDoubleQuoting(value) ? yaml.escapeWithDoubleQuotes(value) : yaml.requiresSingleQuoting(value) ? yaml.escapeWithSingleQuotes(value) : "" == value ? '""' : this.getTimestampRegex().test(value) ? "'" + value + "'" : this.inArray(value.toLowerCase(), ["null", "~", "true", "false"]) ? "'" + value + "'" : value
          },
          dumpObject: function(value) {
            var i, keys = this.getKeys(value),
              output = null,
              len = keys.length;
            if (value instanceof Array) {
              for (output = [], i = 0; len > i; i++) output.push(this.dump(value[keys[i]]));
              return "[" + output.join(", ") + "]"
            }
            for (output = [], i = 0; len > i; i++) output.push(this.dump(keys[i]) + ": " + this.dump(value[keys[i]]));
            return "{ " + output.join(", ") + " }"
          },
          parseScalar: function(scalar, delimiters, stringDelimiters, i, evaluate) {
            void 0 == delimiters && (delimiters = null), void 0 == stringDelimiters && (stringDelimiters = ['"', "'"]), void 0 == i && (i = 0), void 0 == evaluate && (evaluate = !0);
            var output = null,
              pos = null,
              matches = null;
            if (this.inArray(scalar[i], stringDelimiters)) {
              if (output = this.parseQuotedScalar(scalar, i), i = this.i, null !== delimiters) {
                var tmp = scalar.substr(i).replace(/^\s+/, "");
                if (!this.inArray(tmp.charAt(0), delimiters)) throw new YamlParseException("Unexpected characters (" + scalar.substr(i) + ").")
              }
            } else {
              if (delimiters) {
                if (!(matches = new RegExp("^(.+?)(" + delimiters.join("|") + ")").exec((scalar + "").substring(i)))) throw new YamlParseException("Malformed inline YAML string (" + scalar + ").");
                output = matches[1], i += output.length
              } else output = (scalar + "").substring(i), i += output.length, pos = output.indexOf(" #"), -1 != pos && (output = output.substr(0, pos).replace(/\s+$/g, ""));
              output = evaluate ? this.evaluateScalar(output) : output
            }
            return this.i = i, output
          },
          parseQuotedScalar: function(scalar, i) {
            var matches = null;
            if (!(matches = new RegExp("^" + YamlInline.REGEX_QUOTED_STRING).exec((scalar + "").substring(i)))) throw new YamlParseException("Malformed inline YAML string (" + (scalar + "").substring(i) + ").");
            var output = matches[0].substr(1, matches[0].length - 2),
              unescaper = new YamlUnescaper;
            return output = '"' == (scalar + "").charAt(i) ? unescaper.unescapeDoubleQuotedString(output) : unescaper.unescapeSingleQuotedString(output), i += matches[0].length, this.i = i, output
          },
          parseSequence: function(sequence, i) {
            void 0 == i && (i = 0);
            var output = [],
              len = sequence.length;
            for (i += 1; len > i;) {
              switch (sequence.charAt(i)) {
                case "[":
                  output.push(this.parseSequence(sequence, i)), i = this.i;
                  break;
                case "{":
                  output.push(this.parseMapping(sequence, i)), i = this.i;
                  break;
                case "]":
                  return this.i = i, output;
                case ",":
                case " ":
                  break;
                default:
                  var isQuoted = this.inArray(sequence.charAt(i), ['"', "'"]),
                    value = this.parseScalar(sequence, [",", "]"], ['"', "'"], i);
                  if (i = this.i, !isQuoted && -1 != (value + "").indexOf(": ")) try {
                    value = this.parseMapping("{" + value + "}")
                  } catch (e) {
                    if (!(e instanceof YamlParseException)) throw e
                  }
                  output.push(value), i--
              }
              i++
            }
            throw new YamlParseException('Malformed inline YAML string "' + sequence + '"')
          },
          parseMapping: function(mapping, i) {
            void 0 == i && (i = 0);
            var output = {},
              len = mapping.length;
            i += 1;
            for (var done = !1, doContinue = !1; len > i;) {
              switch (doContinue = !1, mapping.charAt(i)) {
                case " ":
                case ",":
                  i++, doContinue = !0;
                  break;
                case "}":
                  return this.i = i, output
              }
              if (!doContinue) {
                var key = this.parseScalar(mapping, [":", " "], ['"', "'"], i, !1);
                for (i = this.i, done = !1; len > i;) {
                  switch (mapping.charAt(i)) {
                    case "[":
                      output[key] = this.parseSequence(mapping, i), i = this.i, done = !0;
                      break;
                    case "{":
                      output[key] = this.parseMapping(mapping, i), i = this.i, done = !0;
                      break;
                    case ":":
                    case " ":
                      break;
                    default:
                      output[key] = this.parseScalar(mapping, [",", "}"], ['"', "'"], i), i = this.i, done = !0, i--
                  }
                  if (++i, done) {
                    doContinue = !0;
                    break
                  }
                }
              }
            }
            throw new YamlParseException('Malformed inline YAML string "' + mapping + '"')
          },
          evaluateScalar: function(scalar) {
            scalar = this.trim(scalar);
            var raw = null,
              cast = null;
            return "null" == scalar.toLowerCase() || "" == scalar || "~" == scalar ? null : 0 == (scalar + "").indexOf("!str ") ? ("" + scalar).substring(5) : 0 == (scalar + "").indexOf("! ") ? parseInt(this.parseScalar((scalar + "").substr(2))) : /^\d+$/.test(scalar) ? (raw = scalar, cast = parseInt(scalar), "0" == scalar.charAt(0) ? this.octdec(scalar) : "" + raw == "" + cast ? cast : raw) : "true" == (scalar + "").toLowerCase() ? !0 : "false" == (scalar + "").toLowerCase() ? !1 : this.isNumeric(scalar) ? "0x" == (scalar + "").substr(0, 2) ? this.hexdec(scalar) : parseFloat(scalar) : ".inf" == scalar.toLowerCase() ? 1 / 0 : ".nan" == scalar.toLowerCase() ? 0 / 0 : "-.inf" == scalar.toLowerCase() ? -1 / 0 : /^(-|\+)?[0-9,]+(\.[0-9]+)?$/.test(scalar) ? parseFloat(scalar.split(",").join("")) : this.getTimestampRegex().test(scalar) ? new Date(this.strtotime(scalar)) : "" + scalar
          },
          getTimestampRegex: function() {
            return new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:(?:[Tt]|[ 	]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:.([0-9]*))?(?:[ 	]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?)?$", "gi")
          },
          trim: function(str) {
            return (str + "").replace(/^\s+/, "").replace(/\s+$/, "")
          },
          isNumeric: function(input) {
            return input - 0 == input && input.length > 0 && "" != input.replace(/\s+/g, "")
          },
          inArray: function(key, tab) {
            var i, len = tab.length;
            for (i = 0; len > i; i++)
              if (key == tab[i]) return !0;
            return !1
          },
          getKeys: function(tab) {
            var ret = [];
            for (var name in tab) tab.hasOwnProperty(name) && ret.push(name);
            return ret
          },
          octdec: function(input) {
            return parseInt((input + "").replace(/[^0-7]/gi, ""), 8)
          },
          hexdec: function(input) {
            return input = this.trim(input), "0x" == (input + "").substr(0, 2) && (input = (input + "").substring(2)), parseInt((input + "").replace(/[^a-f0-9]/gi, ""), 16)
          },
          strtotime: function(h, b) {
            var f, c, g, k, d = "";
            if (h = (h + "").replace(/\s{2,}|^\s|\s$/g, " ").replace(/[\t\r\n]/g, ""), "now" === h) return null === b || isNaN(b) ? (new Date).getTime() || 0 : b || 0;
            if (!isNaN(d = Date.parse(h))) return d || 0;
            b = b ? new Date(b) : new Date, h = h.toLowerCase();
            var e = {
                day: {
                  sun: 0,
                  mon: 1,
                  tue: 2,
                  wed: 3,
                  thu: 4,
                  fri: 5,
                  sat: 6
                },
                mon: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
              },
              a = function(i) {
                var o = i[2] && "ago" === i[2],
                  n = (n = "last" === i[0] ? -1 : 1) * (o ? -1 : 1);
                switch (i[0]) {
                  case "last":
                  case "next":
                    switch (i[1].substring(0, 3)) {
                      case "yea":
                        b.setFullYear(b.getFullYear() + n);
                        break;
                      case "wee":
                        b.setDate(b.getDate() + 7 * n);
                        break;
                      case "day":
                        b.setDate(b.getDate() + n);
                        break;
                      case "hou":
                        b.setHours(b.getHours() + n);
                        break;
                      case "min":
                        b.setMinutes(b.getMinutes() + n);
                        break;
                      case "sec":
                        b.setSeconds(b.getSeconds() + n);
                        break;
                      case "mon":
                        if ("month" === i[1]) {
                          b.setMonth(b.getMonth() + n);
                          break
                        }
                      default:
                        var l = e.day[i[1].substring(0, 3)];
                        if ("undefined" != typeof l) {
                          var p = l - b.getDay();
                          0 === p ? p = 7 * n : p > 0 ? "last" === i[0] && (p -= 7) : "next" === i[0] && (p += 7), b.setDate(b.getDate() + p), b.setHours(0, 0, 0, 0)
                        }
                    }
                    break;
                  default:
                    if (!/\d+/.test(i[0])) return !1;
                    switch (n *= parseInt(i[0], 10), i[1].substring(0, 3)) {
                      case "yea":
                        b.setFullYear(b.getFullYear() + n);
                        break;
                      case "mon":
                        b.setMonth(b.getMonth() + n);
                        break;
                      case "wee":
                        b.setDate(b.getDate() + 7 * n);
                        break;
                      case "day":
                        b.setDate(b.getDate() + n);
                        break;
                      case "hou":
                        b.setHours(b.getHours() + n);
                        break;
                      case "min":
                        b.setMinutes(b.getMinutes() + n);
                        break;
                      case "sec":
                        b.setSeconds(b.getSeconds() + n)
                    }
                }
                return !0
              };
            if (g = h.match(/^(\d{2,4}-\d{2}-\d{2})(?:\s(\d{1,2}:\d{2}(:\d{2})?)?(?:\.(\d+))?)?$/), null !== g) return g[2] ? g[3] || (g[2] += ":00") : g[2] = "00:00:00", k = g[1].split(/-/g), k[1] = e.mon[k[1] - 1] || k[1], k[0] = +k[0], k[0] = k[0] >= 0 && k[0] <= 69 ? "20" + (k[0] < 10 ? "0" + k[0] : k[0] + "") : k[0] >= 70 && k[0] <= 99 ? "19" + k[0] : k[0] + "", parseInt(this.strtotime(k[2] + " " + k[1] + " " + k[0] + " " + g[2]) + (g[4] ? g[4] : ""), 10);
            var j = "([+-]?\\d+\\s(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)|(last|next)\\s(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))(\\sago)?";
            if (g = h.match(new RegExp(j, "gi")), null === g) return !1;
            for (f = 0, c = g.length; c > f; f++)
              if (!a(g[f].split(" "))) return !1;
            return b.getTime() || 0
          }
        }, YamlInline.REGEX_QUOTED_STRING = "(?:\"(?:[^\"\\\\]*(?:\\\\.[^\"\\\\]*)*)\"|'(?:[^']*(?:''[^']*)*)')";
        var YamlParser = function(offset) {
          this.offset = void 0 !== offset ? offset : 0
        };
        YamlParser.prototype = {
          offset: 0,
          lines: [],
          currentLineNb: -1,
          currentLine: "",
          refs: {},
          parse: function(value) {
            this.currentLineNb = -1, this.currentLine = "", this.lines = this.cleanup(value).split("\n");
            for (var data = null, context = null; this.moveToNextLine();)
              if (!this.isCurrentLineEmpty()) {
                if ("	" == this.currentLine.charAt(0)) throw new YamlParseException("A YAML file cannot contain tabs as indentation.", this.getRealCurrentLineNb() + 1, this.currentLine);
                var isRef = !1,
                  isInPlace = !1,
                  isProcessed = !1,
                  values = null,
                  matches = null,
                  c = null,
                  parser = null,
                  block = null,
                  key = null,
                  parsed = null,
                  len = null,
                  reverse = null;
                if (values = /^\-((\s+)(.+?))?\s*$/.exec(this.currentLine)) {
                  if (context && "mapping" == context) throw new YamlParseException("You cannot define a sequence item when in a mapping", this.getRealCurrentLineNb() + 1, this.currentLine);
                  context = "sequence", this.isDefined(data) || (data = []), values = {
                    leadspaces: values[2],
                    value: values[3]
                  }, this.isDefined(values.value) && (matches = /^&([^ ]+) *(.*)/.exec(values.value)) && (matches = {
                    ref: matches[1],
                    value: matches[2]
                  }, isRef = matches.ref, values.value = matches.value), this.isDefined(values.value) && "" != this.trim(values.value) && "#" != values.value.replace(/^ +/, "").charAt(0) ? this.isDefined(values.leadspaces) && " " == values.leadspaces && (matches = new RegExp("^(" + YamlInline.REGEX_QUOTED_STRING + "|[^ '\"{[].*?) *:(\\s+(.+?))?\\s*$").exec(values.value)) ? (matches = {
                    key: matches[1],
                    value: matches[3]
                  }, c = this.getRealCurrentLineNb(), parser = new YamlParser(c), parser.refs = this.refs, block = values.value, this.isNextLineIndented() || (block += "\n" + this.getNextEmbedBlock(this.getCurrentLineIndentation() + 2)), data.push(parser.parse(block)), this.refs = parser.refs) : data.push(this.parseValue(values.value)) : (c = this.getRealCurrentLineNb() + 1, parser = new YamlParser(c), parser.refs = this.refs, data.push(parser.parse(this.getNextEmbedBlock())), this.refs = parser.refs)
                } else {
                  if (!(values = new RegExp("^(" + YamlInline.REGEX_QUOTED_STRING + "|[^ '\"[{].*?) *:(\\s+(.+?))?\\s*$").exec(this.currentLine))) {
                    if (2 == this.lines.length && this.isEmpty(this.lines[1])) {
                      try {
                        value = (new YamlInline).parse(this.lines[0])
                      } catch (e) {
                        throw e instanceof YamlParseException && (e.setParsedLine(this.getRealCurrentLineNb() + 1), e.setSnippet(this.currentLine)), e
                      }
                      if (this.isObject(value)) {
                        var first = value[0];
                        if ("string" == typeof value && "*" == first.charAt(0)) {
                          data = [], len = value.length;
                          for (var i = 0; len > i; i++) data.push(this.refs[value[i].substr(1)]);
                          value = data
                        }
                      }
                      return value
                    }
                    throw new YamlParseException("Unable to parse.", this.getRealCurrentLineNb() + 1, this.currentLine)
                  }
                  if (this.isDefined(data) || (data = {}), context && "sequence" == context) throw new YamlParseException("You cannot define a mapping item when in a sequence", this.getRealCurrentLineNb() + 1, this.currentLine);
                  context = "mapping", values = {
                    key: values[1],
                    value: values[3]
                  };
                  try {
                    key = (new YamlInline).parseScalar(values.key)
                  } catch (e) {
                    throw e instanceof YamlParseException && (e.setParsedLine(this.getRealCurrentLineNb() + 1), e.setSnippet(this.currentLine)), e
                  }
                  if ("<<" == key)
                    if (this.isDefined(values.value) && "*" == (values.value + "").charAt(0)) {
                      if (isInPlace = values.value.substr(1), void 0 == this.refs[isInPlace]) throw new YamlParseException('Reference "' + value + '" does not exist', this.getRealCurrentLineNb() + 1, this.currentLine)
                    } else {
                      value = this.isDefined(values.value) && "" != values.value ? values.value : this.getNextEmbedBlock(), c = this.getRealCurrentLineNb() + 1, parser = new YamlParser(c), parser.refs = this.refs, parsed = parser.parse(value), this.refs = parser.refs;
                      var merged = [];
                      if (!this.isObject(parsed)) throw new YamlParseException("YAML merge keys used with a scalar value instead of an array", this.getRealCurrentLineNb() + 1, this.currentLine);
                      if (this.isDefined(parsed[0])) {
                        reverse = this.reverseArray(parsed), len = reverse.length;
                        for (var i = 0; len > i; i++) {
                          {
                            reverse[i]
                          }
                          if (!this.isObject(reverse[i])) throw new YamlParseException("Merge items must be arrays", this.getRealCurrentLineNb() + 1, this.currentLine);
                          merged = this.mergeObject(reverse[i], merged)
                        }
                      } else merged = this.mergeObject(merged, parsed);
                      isProcessed = merged
                    } else this.isDefined(values.value) && (matches = /^&([^ ]+) *(.*)/.exec(values.value)) && (matches = {
                    ref: matches[1],
                    value: matches[2]
                  }, isRef = matches.ref, values.value = matches.value);
                  isProcessed ? data = isProcessed : this.isDefined(values.value) && "" != this.trim(values.value) && "#" != this.trim(values.value).charAt(0) ? isInPlace ? data = this.refs[isInPlace] : data[key] = this.parseValue(values.value) : this.isNextLineIndented() && !this.isNextLineUnIndentedCollection() ? data[key] = null : (c = this.getRealCurrentLineNb() + 1, parser = new YamlParser(c), parser.refs = this.refs, data[key] = parser.parse(this.getNextEmbedBlock()), this.refs = parser.refs)
                } if (isRef)
                  if (data instanceof Array) this.refs[isRef] = data[data.length - 1];
                  else {
                    var lastKey = null;
                    for (var k in data) data.hasOwnProperty(k) && (lastKey = k);
                    this.refs[isRef] = data[k]
                  }
              }
            return this.isEmpty(data) ? null : data
          },
          getRealCurrentLineNb: function() {
            return this.currentLineNb + this.offset
          },
          getCurrentLineIndentation: function() {
            return this.currentLine.length - this.currentLine.replace(/^ +/g, "").length
          },
          getNextEmbedBlock: function(indentation) {
            this.moveToNextLine();
            var newIndent = null,
              indent = null;
            if (this.isDefined(indentation)) newIndent = indentation;
            else {
              newIndent = this.getCurrentLineIndentation();
              var unindentedEmbedBlock = this.isStringUnIndentedCollectionItem(this.currentLine);
              if (!this.isCurrentLineEmpty() && 0 == newIndent && !unindentedEmbedBlock) throw new YamlParseException("Indentation problem A", this.getRealCurrentLineNb() + 1, this.currentLine)
            }
            var data = [this.currentLine.substr(newIndent)],
              isUnindentedCollection = this.isStringUnIndentedCollectionItem(this.currentLine),
              continuationIndent = -1;
            for (isUnindentedCollection === !0 && (continuationIndent = 1 + /^\-((\s+)(.+?))?\s*$/.exec(this.currentLine)[2].length); this.moveToNextLine();) {
              if (isUnindentedCollection && !this.isStringUnIndentedCollectionItem(this.currentLine) && this.getCurrentLineIndentation() != continuationIndent) {
                this.moveToPreviousLine();
                break
              }
              if (this.isCurrentLineEmpty()) this.isCurrentLineBlank() && data.push(this.currentLine.substr(newIndent));
              else {
                indent = this.getCurrentLineIndentation();
                var matches;
                if (matches = /^( *)$/.exec(this.currentLine)) data.push(matches[1]);
                else {
                  if (!(indent >= newIndent)) {
                    if (0 == indent) {
                      this.moveToPreviousLine();
                      break
                    }
                    throw new YamlParseException("Indentation problem B", this.getRealCurrentLineNb() + 1, this.currentLine)
                  }
                  data.push(this.currentLine.substr(newIndent))
                }
              }
            }
            return data.join("\n")
          },
          moveToNextLine: function() {
            return this.currentLineNb >= this.lines.length - 1 ? !1 : (this.currentLineNb++, this.currentLine = this.lines[this.currentLineNb], !0)
          },
          moveToPreviousLine: function() {
            this.currentLineNb--, this.currentLine = this.lines[this.currentLineNb]
          },
          parseValue: function(value) {
            if ("*" == (value + "").charAt(0)) {
              if (value = "#" == this.trim(value).charAt(0) ? (value + "").substr(1, value.indexOf("#") - 2) : (value + "").substr(1), void 0 == this.refs[value]) throw new YamlParseException('Reference "' + value + '" does not exist', this.getRealCurrentLineNb() + 1, this.currentLine);
              return this.refs[value]
            }
            var matches = null;
            if (matches = /^(\||>)(\+|\-|\d+|\+\d+|\-\d+|\d+\+|\d+\-)?( +#.*)?$/.exec(value)) {
              matches = {
                separator: matches[1],
                modifiers: matches[2],
                comments: matches[3]
              };
              var modifiers = this.isDefined(matches.modifiers) ? matches.modifiers : "";
              return this.parseFoldedScalar(matches.separator, modifiers.replace(/\d+/g, ""), Math.abs(parseInt(modifiers)))
            }
            try {
              return (new YamlInline).parse(value)
            } catch (e) {
              throw e instanceof YamlParseException && (e.setParsedLine(this.getRealCurrentLineNb() + 1), e.setSnippet(this.currentLine)), e
            }
          },
          parseFoldedScalar: function(separator, indicator, indentation) {
            void 0 == indicator && (indicator = ""), void 0 == indentation && (indentation = 0), separator = "|" == separator ? "\n" : " ";
            for (var text = "", diff = null, notEOF = this.moveToNextLine(); notEOF && this.isCurrentLineBlank();) text += "\n", notEOF = this.moveToNextLine();
            if (!notEOF) return "";
            var matches = null;
            if (!(matches = new RegExp("^(" + (indentation ? this.strRepeat(" ", indentation) : " +") + ")(.*)$").exec(this.currentLine))) return this.moveToPreviousLine(), "";
            matches = {
              indent: matches[1],
              text: matches[2]
            };
            var textIndent = matches.indent,
              previousIndent = 0;
            for (text += matches.text + separator; this.currentLineNb + 1 < this.lines.length;)
              if (this.moveToNextLine(), matches = new RegExp("^( {" + textIndent.length + ",})(.+)$").exec(this.currentLine)) matches = {
                indent: matches[1],
                text: matches[2]
              }, " " == separator && previousIndent != matches.indent && (text = text.substr(0, text.length - 1) + "\n"), previousIndent = matches.indent, diff = matches.indent.length - textIndent.length, text += this.strRepeat(" ", diff) + matches.text + (0 != diff ? "\n" : separator);
              else {
                if (!(matches = /^( *)$/.exec(this.currentLine))) {
                  this.moveToPreviousLine();
                  break
                }
                text += matches[1].replace(new RegExp("^ {1," + textIndent.length + "}", "g"), "") + "\n"
              }
            switch (" " == separator && (text = text.replace(/ (\n*)$/g, "\n$1")), indicator) {
              case "":
                text = text.replace(/\n+$/g, "\n");
                break;
              case "+":
                break;
              case "-":
                text = text.replace(/\n+$/g, "")
            }
            return text
          },
          isNextLineIndented: function() {
            for (var currentIndentation = this.getCurrentLineIndentation(), notEOF = this.moveToNextLine(); notEOF && this.isCurrentLineEmpty();) notEOF = this.moveToNextLine();
            if (0 == notEOF) return !1;
            var ret = !1;
            return this.getCurrentLineIndentation() <= currentIndentation && (ret = !0), this.moveToPreviousLine(), ret
          },
          isCurrentLineEmpty: function() {
            return this.isCurrentLineBlank() || this.isCurrentLineComment()
          },
          isCurrentLineBlank: function() {
            return "" == this.trim(this.currentLine)
          },
          isCurrentLineComment: function() {
            var ltrimmedLine = this.currentLine.replace(/^ +/g, "");
            return "#" == ltrimmedLine.charAt(0)
          },
          cleanup: function(value) {
            value = value.split("\r\n").join("\n").split("\r").join("\n"), /\n$/.test(value) || (value += "\n");
            for (var count = 0, regex = /^\%YAML[: ][\d\.]+.*\n/; regex.test(value);) value = value.replace(regex, ""), count++;
            if (this.offset += count, regex = /^(#.*?\n)+/, regex.test(value)) {
              var trimmedValue = value.replace(regex, "");
              this.offset += this.subStrCount(value, "\n") - this.subStrCount(trimmedValue, "\n"), value = trimmedValue
            }
            return regex = /^\-\-\-.*?\n/, regex.test(value) && (trimmedValue = value.replace(regex, ""), this.offset += this.subStrCount(value, "\n") - this.subStrCount(trimmedValue, "\n"), value = trimmedValue, value = value.replace(/\.\.\.\s*$/g, "")), value
          },
          isNextLineUnIndentedCollection: function() {
            for (var currentIndentation = this.getCurrentLineIndentation(), notEOF = this.moveToNextLine(); notEOF && this.isCurrentLineEmpty();) notEOF = this.moveToNextLine();
            if (!1 === notEOF) return !1;
            var ret = !1;
            return this.getCurrentLineIndentation() == currentIndentation && this.isStringUnIndentedCollectionItem(this.currentLine) && (ret = !0), this.moveToPreviousLine(), ret
          },
          isStringUnIndentedCollectionItem: function() {
            return 0 === this.currentLine.indexOf("- ")
          },
          isObject: function(input) {
            return "object" == typeof input && this.isDefined(input)
          },
          isEmpty: function(input) {
            return void 0 == input || null == input || "" == input || 0 == input || "0" == input || 0 == input
          },
          isDefined: function(input) {
            return void 0 != input && null != input
          },
          reverseArray: function(input) {
            for (var result = [], len = input.length, i = len - 1; i >= 0; i--) result.push(input[i]);
            return result
          },
          merge: function(a, b) {
            var i, c = {};
            for (i in a) a.hasOwnProperty(i) && (/^\d+$/.test(i) ? c.push(a) : c[i] = a[i]);
            for (i in b) b.hasOwnProperty(i) && (/^\d+$/.test(i) ? c.push(b) : c[i] = b[i]);
            return c
          },
          strRepeat: function(str, count) {
            var i, result = "";
            for (i = 0; count > i; i++) result += str;
            return result
          },
          subStrCount: function(string, subString, start, length) {
            var c = 0;
            string = "" + string, subString = "" + subString, void 0 != start && (string = string.substr(start)), void 0 != length && (string = string.substr(0, length));
            for (var len = string.length, sublen = subString.length, i = 0; len > i; i++) subString == string.substr(i, sublen) && c++, i += sublen - 1;
            return c
          },
          trim: function(str) {
            return (str + "").replace(/^ +/, "").replace(/ +$/, "")
          }
        }, YamlEscaper = function() {}, YamlEscaper.prototype = {
          requiresDoubleQuoting: function(value) {
            return new RegExp(YamlEscaper.REGEX_CHARACTER_TO_ESCAPE).test(value)
          },
          escapeWithDoubleQuotes: function(value) {
            value += "";
            for (var len = YamlEscaper.escapees.length, maxlen = YamlEscaper.escaped.length, esc = YamlEscaper.escaped, i = 0; len > i; ++i) i >= maxlen && esc.push("");
            var ret = "";
            return ret = value.replace(new RegExp(YamlEscaper.escapees.join("|"), "g"), function(str) {
              for (var i = 0; len > i; ++i)
                if (str == YamlEscaper.escapees[i]) return esc[i]
            }), '"' + ret + '"'
          },
          requiresSingleQuoting: function(value) {
            return /[\s'":{}[\],&*#?]|^[-?|<>=!%@`]/.test(value)
          },
          escapeWithSingleQuotes: function(value) {
            return "'" + value.replace(/'/g, "''") + "'"
          }
        }, YamlEscaper.REGEX_CHARACTER_TO_ESCAPE = "[\\x00-\\x1f]|Â|Â |â¨|â©", YamlEscaper.escapees = ["\\\\", '\\"', '"', "\x00", "", "", "", "", "", "", "", "\b", "	", "\n", "", "\f", "\r", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "Â", "Â ", "â¨", "â©"], YamlEscaper.escaped = ['\\"', "\\\\", '\\"', "\\0", "\\x01", "\\x02", "\\x03", "\\x04", "\\x05", "\\x06", "\\a", "\\b", "\\t", "\\n", "\\v", "\\f", "\\r", "\\x0e", "\\x0f", "\\x10", "\\x11", "\\x12", "\\x13", "\\x14", "\\x15", "\\x16", "\\x17", "\\x18", "\\x19", "\\x1a", "\\e", "\\x1c", "\\x1d", "\\x1e", "\\x1f", "\\N", "\\_", "\\L", "\\P"];
        var YamlUnescaper = function() {};
        YamlUnescaper.prototype = {
          unescapeSingleQuotedString: function(value) {
            return value.replace(/''/g, "'")
          },
          unescapeDoubleQuotedString: function(value) {
            var callback = function(m) {
              return (new YamlUnescaper).unescapeCharacter(m)
            };
            return value.replace(new RegExp(YamlUnescaper.REGEX_ESCAPED_CHARACTER, "g"), callback)
          },
          unescapeCharacter: function(value) {
            switch (value.charAt(1)) {
              case "0":
                return String.fromCharCode(0);
              case "a":
                return String.fromCharCode(7);
              case "b":
                return String.fromCharCode(8);
              case "t":
                return "	";
              case "	":
                return "	";
              case "n":
                return "\n";
              case "v":
                return String.fromCharCode(11);
              case "f":
                return String.fromCharCode(12);
              case "r":
                return String.fromCharCode(13);
              case "e":
                return "";
              case " ":
                return " ";
              case '"':
                return '"';
              case "/":
                return "/";
              case "\\":
                return "\\";
              case "N":
                return "\x00";
              case "_":
                return "\x00 ";
              case "L":
                return " (";
              case "P":
                return " )";
              case "x":
                return this.pack("n", (new YamlInline).hexdec(value.substr(2, 2)));
              case "u":
                return this.pack("n", (new YamlInline).hexdec(value.substr(2, 4)));
              case "U":
                return this.pack("N", (new YamlInline).hexdec(value.substr(2, 8)))
            }
          },
          pack: function(B) {
            for (var E, s, g = 0, o = 1, m = "", z = 0; g < B.length;) {
              for (E = B.charAt(g), s = "", g++; g < B.length && null !== B.charAt(g).match(/[\d\*]/);) s += B.charAt(g), g++;
              switch ("" === s && (s = "1"), E) {
                case "n":
                  if ("*" === s && (s = arguments.length - o), s > arguments.length - o) throw new Error("Warning:  pack() Type " + E + ": too few arguments");
                  for (z = 0; s > z; z++) m += String.fromCharCode(arguments[o] >> 8 & 255), m += String.fromCharCode(255 & arguments[o]), o++;
                  break;
                case "N":
                  if ("*" === s && (s = arguments.length - o), s > arguments.length - o) throw new Error("Warning:  pack() Type " + E + ": too few arguments");
                  for (z = 0; s > z; z++) m += String.fromCharCode(arguments[o] >> 24 & 255), m += String.fromCharCode(arguments[o] >> 16 & 255), m += String.fromCharCode(arguments[o] >> 8 & 255), m += String.fromCharCode(255 & arguments[o]), o++;
                  break;
                default:
                  throw new Error("Warning:  pack() Type " + E + ": unknown format code")
              }
            }
            if (o < arguments.length) throw new Error("Warning: pack(): " + (arguments.length - o) + " arguments unused");
            return m
          }
        }, YamlUnescaper.REGEX_ESCAPED_CHARACTER = '\\\\([0abt	nvfre "\\/\\\\N_LP]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})';
        var YamlDumper = function() {};
        YamlDumper.prototype = {
          dump: function(input, inline, indent) {
            null == inline && (inline = 0), null == indent && (indent = 0);
            var yaml, output = "",
              prefix = indent ? this.strRepeat(" ", indent) : "";
            if (this.numSpacesForIndentation || (this.numSpacesForIndentation = 2), 0 >= inline || !this.isObject(input) || this.isEmpty(input)) yaml = new YamlInline, output += prefix + yaml.dump(input);
            else {
              var willBeInlined, isAHash = !this.arrayEquals(this.getKeys(input), this.range(0, input.length - 1));
              for (var key in input) input.hasOwnProperty(key) && (willBeInlined = 0 >= inline - 1 || !this.isObject(input[key]) || this.isEmpty(input[key]), isAHash && (yaml = new YamlInline), output += prefix + "" + (isAHash ? yaml.dump(key) + ":" : "-") + (willBeInlined ? " " : "\n") + this.dump(input[key], inline - 1, willBeInlined ? 0 : indent + this.numSpacesForIndentation) + (willBeInlined ? "\n" : ""))
            }
            return output
          },
          strRepeat: function(str, count) {
            var i, result = "";
            for (i = 0; count > i; i++) result += str;
            return result
          },
          isObject: function(input) {
            return this.isDefined(input) && "object" == typeof input
          },
          isEmpty: function(input) {
            var ret = void 0 == input || null == input || "" == input || 0 == input || "0" == input || 0 == input;
            if (!(ret || "object" != typeof input || input instanceof Array)) {
              var propCount = 0;
              for (var key in input) input.hasOwnProperty(key) && propCount++;
              ret = !propCount
            }
            return ret
          },
          isDefined: function(input) {
            return void 0 != input && null != input
          },
          getKeys: function(tab) {
            var ret = [];
            for (var name in tab) tab.hasOwnProperty(name) && ret.push(name);
            return ret
          },
          range: function(start, end) {
            if (start > end) return [];
            for (var ret = [], i = start; end >= i; i++) ret.push(i);
            return ret
          },
          arrayEquals: function(a, b) {
            if (a.length != b.length) return !1;
            for (var len = a.length, i = 0; len > i; i++)
              if (a[i] != b[i]) return !1;
            return !0
          }
        }
      }()
    }, {
      fs: 12
    }
  ]
}, {}, [5]);
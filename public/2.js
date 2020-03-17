;(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  [2],
  {
    /***/ './node_modules/@material-ui/icons/Delete.js':
      /*!***************************************************!*\
  !*** ./node_modules/@material-ui/icons/Delete.js ***!
  \***************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        'use strict'

        var _interopRequireDefault = __webpack_require__(
          /*! @babel/runtime/helpers/interopRequireDefault */ './node_modules/@babel/runtime/helpers/interopRequireDefault.js'
        )

        Object.defineProperty(exports, '__esModule', {
          value: true
        })
        exports.default = void 0

        var _react = _interopRequireDefault(
          __webpack_require__(/*! react */ './node_modules/react/index.js')
        )

        var _createSvgIcon = _interopRequireDefault(
          __webpack_require__(
            /*! ./utils/createSvgIcon */ './node_modules/@material-ui/icons/utils/createSvgIcon.js'
          )
        )

        var _default = (0, _createSvgIcon.default)(
          _react.default.createElement('path', {
            d:
              'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z'
          }),
          'Delete'
        )

        exports.default = _default

        /***/
      },

    /***/ './node_modules/@material-ui/icons/Edit.js':
      /*!*************************************************!*\
  !*** ./node_modules/@material-ui/icons/Edit.js ***!
  \*************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        'use strict'

        var _interopRequireDefault = __webpack_require__(
          /*! @babel/runtime/helpers/interopRequireDefault */ './node_modules/@babel/runtime/helpers/interopRequireDefault.js'
        )

        Object.defineProperty(exports, '__esModule', {
          value: true
        })
        exports.default = void 0

        var _react = _interopRequireDefault(
          __webpack_require__(/*! react */ './node_modules/react/index.js')
        )

        var _createSvgIcon = _interopRequireDefault(
          __webpack_require__(
            /*! ./utils/createSvgIcon */ './node_modules/@material-ui/icons/utils/createSvgIcon.js'
          )
        )

        var _default = (0, _createSvgIcon.default)(
          _react.default.createElement('path', {
            d:
              'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z'
          }),
          'Edit'
        )

        exports.default = _default

        /***/
      },

    /***/ './resources/assets/js/views/OrderManagementDetails/OrderManagementDetails.js':
      /*!************************************************************************************!*\
  !*** ./resources/assets/js/views/OrderManagementDetails/OrderManagementDetails.js ***!
  \************************************************************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js'
        )
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
          react__WEBPACK_IMPORTED_MODULE_0__
        )
        /* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @material-ui/styles */ './node_modules/@material-ui/styles/esm/index.js'
        )
        /* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @material-ui/core */ './node_modules/@material-ui/core/esm/index.js'
        )
        !(function webpackMissingModule() {
          var e = new Error("Cannot find module 'utils/axios'")
          e.code = 'MODULE_NOT_FOUND'
          throw e
        })()
        !(function webpackMissingModule() {
          var e = new Error("Cannot find module 'components'")
          e.code = 'MODULE_NOT_FOUND'
          throw e
        })()
        /* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! ./components */ './resources/assets/js/views/OrderManagementDetails/components/index.js'
        )
        function _slicedToArray(arr, i) {
          return (
            _arrayWithHoles(arr) ||
            _iterableToArrayLimit(arr, i) ||
            _nonIterableRest()
          )
        }

        function _nonIterableRest() {
          throw new TypeError(
            'Invalid attempt to destructure non-iterable instance'
          )
        }

        function _iterableToArrayLimit(arr, i) {
          if (
            !(
              Symbol.iterator in Object(arr) ||
              Object.prototype.toString.call(arr) === '[object Arguments]'
            )
          ) {
            return
          }
          var _arr = []
          var _n = true
          var _d = false
          var _e = undefined
          try {
            for (
              var _i = arr[Symbol.iterator](), _s;
              !(_n = (_s = _i.next()).done);
              _n = true
            ) {
              _arr.push(_s.value)
              if (i && _arr.length === i) break
            }
          } catch (err) {
            _d = true
            _e = err
          } finally {
            try {
              if (!_n && _i['return'] != null) _i['return']()
            } finally {
              if (_d) throw _e
            }
          }
          return _arr
        }

        function _arrayWithHoles(arr) {
          if (Array.isArray(arr)) return arr
        }

        var useStyles = Object(
          _material_ui_styles__WEBPACK_IMPORTED_MODULE_1__['makeStyles']
        )(function(theme) {
          return {
            root: {
              padding: theme.spacing(3)
            },
            container: {
              marginTop: theme.spacing(3)
            }
          }
        })

        var OrderManagementDetails = function OrderManagementDetails() {
          var classes = useStyles()

          var _useState = Object(
              react__WEBPACK_IMPORTED_MODULE_0__['useState']
            )(null),
            _useState2 = _slicedToArray(_useState, 2),
            order = _useState2[0],
            setOrder = _useState2[1]

          Object(react__WEBPACK_IMPORTED_MODULE_0__['useEffect'])(function() {
            var mounted = true

            var fetchOrder = function fetchOrder() {
              !(function webpackMissingModule() {
                var e = new Error("Cannot find module 'utils/axios'")
                e.code = 'MODULE_NOT_FOUND'
                throw e
              })()
                .get('/api/orders/1')
                .then(function(response) {
                  if (mounted) {
                    setOrder(response.data.order)
                  }
                })
            }

            fetchOrder()
            return function() {
              mounted = false
            }
          }, [])

          if (!order) {
            return null
          }

          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            !(function webpackMissingModule() {
              var e = new Error("Cannot find module 'components'")
              e.code = 'MODULE_NOT_FOUND'
              throw e
            })(),
            {
              className: classes.root,
              title: 'Order Management Details'
            },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              _components__WEBPACK_IMPORTED_MODULE_4__['Header'],
              {
                order: order
              }
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              _material_ui_core__WEBPACK_IMPORTED_MODULE_2__['Grid'],
              {
                className: classes.container,
                container: true,
                spacing: 3
              },
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                _material_ui_core__WEBPACK_IMPORTED_MODULE_2__['Grid'],
                {
                  item: true,
                  md: 4,
                  xl: 3,
                  xs: 12
                },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                  _components__WEBPACK_IMPORTED_MODULE_4__['OrderInfo'],
                  {
                    order: order
                  }
                )
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                _material_ui_core__WEBPACK_IMPORTED_MODULE_2__['Grid'],
                {
                  item: true,
                  md: 8,
                  xl: 9,
                  xs: 12
                },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                  _components__WEBPACK_IMPORTED_MODULE_4__['OrderItems'],
                  {
                    order: order
                  }
                )
              )
            )
          )
        }

        /* harmony default export */ __webpack_exports__[
          'default'
        ] = OrderManagementDetails

        /***/
      },

    /***/ './resources/assets/js/views/OrderManagementDetails/components/Header/Header.js':
      /*!**************************************************************************************!*\
  !*** ./resources/assets/js/views/OrderManagementDetails/components/Header/Header.js ***!
  \**************************************************************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js'
        )
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
          react__WEBPACK_IMPORTED_MODULE_0__
        )
        /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! prop-types */ './node_modules/prop-types/index.js'
        )
        /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
          prop_types__WEBPACK_IMPORTED_MODULE_1__
        )
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js'
        )
        /* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @material-ui/styles */ './node_modules/@material-ui/styles/esm/index.js'
        )
        /* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @material-ui/core */ './node_modules/@material-ui/core/esm/index.js'
        )
        /* harmony import */ var _material_ui_icons_Delete__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! @material-ui/icons/Delete */ './node_modules/@material-ui/icons/Delete.js'
        )
        /* harmony import */ var _material_ui_icons_Delete__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/ __webpack_require__.n(
          _material_ui_icons_Delete__WEBPACK_IMPORTED_MODULE_5__
        )
        function _extends() {
          _extends =
            Object.assign ||
            function(target) {
              for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i]
                for (var key in source) {
                  if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                  }
                }
              }
              return target
            }
          return _extends.apply(this, arguments)
        }

        function _objectWithoutProperties(source, excluded) {
          if (source == null) return {}
          var target = _objectWithoutPropertiesLoose(source, excluded)
          var key, i
          if (Object.getOwnPropertySymbols) {
            var sourceSymbolKeys = Object.getOwnPropertySymbols(source)
            for (i = 0; i < sourceSymbolKeys.length; i++) {
              key = sourceSymbolKeys[i]
              if (excluded.indexOf(key) >= 0) continue
              if (!Object.prototype.propertyIsEnumerable.call(source, key))
                continue
              target[key] = source[key]
            }
          }
          return target
        }

        function _objectWithoutPropertiesLoose(source, excluded) {
          if (source == null) return {}
          var target = {}
          var sourceKeys = Object.keys(source)
          var key, i
          for (i = 0; i < sourceKeys.length; i++) {
            key = sourceKeys[i]
            if (excluded.indexOf(key) >= 0) continue
            target[key] = source[key]
          }
          return target
        }

        var useStyles = Object(
          _material_ui_styles__WEBPACK_IMPORTED_MODULE_3__['makeStyles']
        )(function(theme) {
          return {
            root: {},
            toolbar: {
              '& > * + *': {
                marginLeft: theme.spacing(1)
              }
            },
            deleteButton: {
              color: theme.palette.white,
              backgroundColor:
                _material_ui_core__WEBPACK_IMPORTED_MODULE_4__['colors']
                  .red[600],
              '&:hover': {
                backgroundColor:
                  _material_ui_core__WEBPACK_IMPORTED_MODULE_4__['colors']
                    .red[900]
              }
            },
            deleteIcon: {
              marginRight: theme.spacing(1)
            }
          }
        })

        var Header = function Header(props) {
          var order = props.order,
            className = props.className,
            rest = _objectWithoutProperties(props, ['order', 'className'])

          var classes = useStyles()
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'div',
            _extends({}, rest, {
              className: Object(clsx__WEBPACK_IMPORTED_MODULE_2__['default'])(
                classes.root,
                className
              )
            }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              _material_ui_core__WEBPACK_IMPORTED_MODULE_4__['Grid'],
              {
                alignItems: 'flex-end',
                container: true,
                justify: 'space-between',
                spacing: 3
              },
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                _material_ui_core__WEBPACK_IMPORTED_MODULE_4__['Grid'],
                {
                  item: true
                },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                  _material_ui_core__WEBPACK_IMPORTED_MODULE_4__['Typography'],
                  {
                    component: 'h2',
                    gutterBottom: true,
                    variant: 'overline'
                  },
                  'Orders'
                ),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                  _material_ui_core__WEBPACK_IMPORTED_MODULE_4__['Typography'],
                  {
                    component: 'h1',
                    variant: 'h3'
                  },
                  'Order #',
                  order.id.split('-').shift()
                )
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                _material_ui_core__WEBPACK_IMPORTED_MODULE_4__['Grid'],
                {
                  item: true
                },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                  _material_ui_core__WEBPACK_IMPORTED_MODULE_4__['Button'],
                  {
                    className: classes.deleteButton,
                    variant: 'contained'
                  },
                  react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    _material_ui_icons_Delete__WEBPACK_IMPORTED_MODULE_5___default.a,
                    {
                      className: classes.deleteIcon
                    }
                  ),
                  'Delete'
                )
              )
            )
          )
        }

        Header.propTypes = {
          className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
          order:
            prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
        }
        /* harmony default export */ __webpack_exports__['default'] = Header

        /***/
      },

    /***/ './resources/assets/js/views/OrderManagementDetails/components/Header/index.js':
      /*!*************************************************************************************!*\
  !*** ./resources/assets/js/views/OrderManagementDetails/components/Header/index.js ***!
  \*************************************************************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! ./Header */ './resources/assets/js/views/OrderManagementDetails/components/Header/Header.js'
        )
        /* harmony reexport (safe) */ __webpack_require__.d(
          __webpack_exports__,
          'default',
          function() {
            return _Header__WEBPACK_IMPORTED_MODULE_0__['default']
          }
        )

        /***/
      },

    /***/ './resources/assets/js/views/OrderManagementDetails/components/OrderInfo/OrderInfo.js':
      /*!********************************************************************************************!*\
  !*** ./resources/assets/js/views/OrderManagementDetails/components/OrderInfo/OrderInfo.js ***!
  \********************************************************************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js'
        )
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
          react__WEBPACK_IMPORTED_MODULE_0__
        )
        /* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! react-router-dom */ './node_modules/react-router-dom/esm/react-router-dom.js'
        )
        /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! prop-types */ './node_modules/prop-types/index.js'
        )
        /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __webpack_require__.n(
          prop_types__WEBPACK_IMPORTED_MODULE_2__
        )
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js'
        )
        /* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! moment */ './node_modules/moment/moment.js'
        )
        /* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/ __webpack_require__.n(
          moment__WEBPACK_IMPORTED_MODULE_4__
        )
        /* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! @material-ui/styles */ './node_modules/@material-ui/styles/esm/index.js'
        )
        /* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! @material-ui/core */ './node_modules/@material-ui/core/esm/index.js'
        )
        /* harmony import */ var _material_ui_icons_Edit__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! @material-ui/icons/Edit */ './node_modules/@material-ui/icons/Edit.js'
        )
        /* harmony import */ var _material_ui_icons_Edit__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/ __webpack_require__.n(
          _material_ui_icons_Edit__WEBPACK_IMPORTED_MODULE_7__
        )
        /* harmony import */ var _material_ui_icons_ReceiptOutlined__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! @material-ui/icons/ReceiptOutlined */ './node_modules/@material-ui/icons/ReceiptOutlined.js'
        )
        /* harmony import */ var _material_ui_icons_ReceiptOutlined__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/ __webpack_require__.n(
          _material_ui_icons_ReceiptOutlined__WEBPACK_IMPORTED_MODULE_8__
        )
        function _extends() {
          _extends =
            Object.assign ||
            function(target) {
              for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i]
                for (var key in source) {
                  if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                  }
                }
              }
              return target
            }
          return _extends.apply(this, arguments)
        }

        function _slicedToArray(arr, i) {
          return (
            _arrayWithHoles(arr) ||
            _iterableToArrayLimit(arr, i) ||
            _nonIterableRest()
          )
        }

        function _nonIterableRest() {
          throw new TypeError(
            'Invalid attempt to destructure non-iterable instance'
          )
        }

        function _iterableToArrayLimit(arr, i) {
          if (
            !(
              Symbol.iterator in Object(arr) ||
              Object.prototype.toString.call(arr) === '[object Arguments]'
            )
          ) {
            return
          }
          var _arr = []
          var _n = true
          var _d = false
          var _e = undefined
          try {
            for (
              var _i = arr[Symbol.iterator](), _s;
              !(_n = (_s = _i.next()).done);
              _n = true
            ) {
              _arr.push(_s.value)
              if (i && _arr.length === i) break
            }
          } catch (err) {
            _d = true
            _e = err
          } finally {
            try {
              if (!_n && _i['return'] != null) _i['return']()
            } finally {
              if (_d) throw _e
            }
          }
          return _arr
        }

        function _arrayWithHoles(arr) {
          if (Array.isArray(arr)) return arr
        }

        function _objectWithoutProperties(source, excluded) {
          if (source == null) return {}
          var target = _objectWithoutPropertiesLoose(source, excluded)
          var key, i
          if (Object.getOwnPropertySymbols) {
            var sourceSymbolKeys = Object.getOwnPropertySymbols(source)
            for (i = 0; i < sourceSymbolKeys.length; i++) {
              key = sourceSymbolKeys[i]
              if (excluded.indexOf(key) >= 0) continue
              if (!Object.prototype.propertyIsEnumerable.call(source, key))
                continue
              target[key] = source[key]
            }
          }
          return target
        }

        function _objectWithoutPropertiesLoose(source, excluded) {
          if (source == null) return {}
          var target = {}
          var sourceKeys = Object.keys(source)
          var key, i
          for (i = 0; i < sourceKeys.length; i++) {
            key = sourceKeys[i]
            if (excluded.indexOf(key) >= 0) continue
            target[key] = source[key]
          }
          return target
        }

        var useStyles = Object(
          _material_ui_styles__WEBPACK_IMPORTED_MODULE_5__['makeStyles']
        )(function(theme) {
          return {
            root: {},
            content: {
              padding: 0
            },
            actions: {
              flexDirection: 'column',
              alignItems: 'flex-start',
              '& > * + *': {
                marginLeft: 0
              }
            },
            buttonIcon: {
              marginRight: theme.spacing(1)
            }
          }
        })

        var OrderInfo = function OrderInfo(props) {
          var order = props.order,
            className = props.className,
            rest = _objectWithoutProperties(props, ['order', 'className'])

          var classes = useStyles()
          var options = ['Canceled', 'Completed', 'Rejected']

          var _useState = Object(
              react__WEBPACK_IMPORTED_MODULE_0__['useState']
            )(options[0]),
            _useState2 = _slicedToArray(_useState, 2),
            option = _useState2[0],
            setOption = _useState2[1]

          var handleChange = function handleChange(event) {
            event.persist()
            setOption(event.target.value)
          }

          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            _material_ui_core__WEBPACK_IMPORTED_MODULE_6__['Card'],
            _extends({}, rest, {
              className: Object(clsx__WEBPACK_IMPORTED_MODULE_3__['default'])(
                classes.root,
                className
              )
            }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              _material_ui_core__WEBPACK_IMPORTED_MODULE_6__['CardHeader'],
              {
                title: 'Order info'
              }
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              _material_ui_core__WEBPACK_IMPORTED_MODULE_6__['Divider'],
              null
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              _material_ui_core__WEBPACK_IMPORTED_MODULE_6__['CardContent'],
              {
                className: classes.content
              },
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                _material_ui_core__WEBPACK_IMPORTED_MODULE_6__['Table'],
                null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                  _material_ui_core__WEBPACK_IMPORTED_MODULE_6__['TableBody'],
                  null,
                  react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    _material_ui_core__WEBPACK_IMPORTED_MODULE_6__['TableRow'],
                    null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                      _material_ui_core__WEBPACK_IMPORTED_MODULE_6__[
                        'TableCell'
                      ],
                      null,
                      'Customer'
                    ),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                      _material_ui_core__WEBPACK_IMPORTED_MODULE_6__[
                        'TableCell'
                      ],
                      null,
                      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                        _material_ui_core__WEBPACK_IMPORTED_MODULE_6__['Link'],
                        {
                          component:
                            react_router_dom__WEBPACK_IMPORTED_MODULE_1__[
                              'Link'
                            ],
                          to: '/management/customers/1'
                        },
                        order.customer.name
                      ),
                      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                        'div',
                        null,
                        order.customer.address
                      ),
                      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                        'div',
                        null,
                        order.customer.city
                      ),
                      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                        'div',
                        null,
                        order.customer.country
                      )
                    )
                  ),
                  react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    _material_ui_core__WEBPACK_IMPORTED_MODULE_6__['TableRow'],
                    {
                      selected: true
                    },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                      _material_ui_core__WEBPACK_IMPORTED_MODULE_6__[
                        'TableCell'
                      ],
                      null,
                      'ID'
                    ),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                      _material_ui_core__WEBPACK_IMPORTED_MODULE_6__[
                        'TableCell'
                      ],
                      null,
                      '#',
                      order.id.split('-').shift()
                    )
                  ),
                  react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    _material_ui_core__WEBPACK_IMPORTED_MODULE_6__['TableRow'],
                    null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                      _material_ui_core__WEBPACK_IMPORTED_MODULE_6__[
                        'TableCell'
                      ],
                      null,
                      'Ref'
                    ),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                      _material_ui_core__WEBPACK_IMPORTED_MODULE_6__[
                        'TableCell'
                      ],
                      null,
                      order.ref
                    )
                  ),
                  react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    _material_ui_core__WEBPACK_IMPORTED_MODULE_6__['TableRow'],
                    {
                      selected: true
                    },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                      _material_ui_core__WEBPACK_IMPORTED_MODULE_6__[
                        'TableCell'
                      ],
                      null,
                      'Date'
                    ),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                      _material_ui_core__WEBPACK_IMPORTED_MODULE_6__[
                        'TableCell'
                      ],
                      null,
                      moment__WEBPACK_IMPORTED_MODULE_4___default()(
                        order.created_at
                      ).format('DD/MM/YYYY HH:MM')
                    )
                  ),
                  react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    _material_ui_core__WEBPACK_IMPORTED_MODULE_6__['TableRow'],
                    null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                      _material_ui_core__WEBPACK_IMPORTED_MODULE_6__[
                        'TableCell'
                      ],
                      null,
                      'Promotion Code'
                    ),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                      _material_ui_core__WEBPACK_IMPORTED_MODULE_6__[
                        'TableCell'
                      ],
                      null,
                      order.promoCode ? order.promoCode : 'N/A'
                    )
                  ),
                  react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    _material_ui_core__WEBPACK_IMPORTED_MODULE_6__['TableRow'],
                    {
                      selected: true
                    },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                      _material_ui_core__WEBPACK_IMPORTED_MODULE_6__[
                        'TableCell'
                      ],
                      null,
                      'Amount'
                    ),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                      _material_ui_core__WEBPACK_IMPORTED_MODULE_6__[
                        'TableCell'
                      ],
                      null,
                      order.currency,
                      order.value
                    )
                  ),
                  react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    _material_ui_core__WEBPACK_IMPORTED_MODULE_6__['TableRow'],
                    null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                      _material_ui_core__WEBPACK_IMPORTED_MODULE_6__[
                        'TableCell'
                      ],
                      null,
                      'Status'
                    ),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                      _material_ui_core__WEBPACK_IMPORTED_MODULE_6__[
                        'TableCell'
                      ],
                      null,
                      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                        _material_ui_core__WEBPACK_IMPORTED_MODULE_6__[
                          'TextField'
                        ],
                        {
                          fullWidth: true,
                          name: 'option',
                          onChange: handleChange,
                          select: true, // eslint-disable-next-line react/jsx-sort-props
                          SelectProps: {
                            native: true
                          },
                          value: option,
                          variant: 'outlined'
                        },
                        options.map(function(option) {
                          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                            'option',
                            {
                              key: option,
                              value: option
                            },
                            option
                          )
                        })
                      )
                    )
                  )
                )
              )
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              _material_ui_core__WEBPACK_IMPORTED_MODULE_6__['CardActions'],
              {
                className: classes.actions
              },
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                _material_ui_core__WEBPACK_IMPORTED_MODULE_6__['Button'],
                null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                  _material_ui_icons_Edit__WEBPACK_IMPORTED_MODULE_7___default.a,
                  {
                    className: classes.buttonIcon
                  }
                ),
                'Edit'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                _material_ui_core__WEBPACK_IMPORTED_MODULE_6__['Button'],
                null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                  _material_ui_icons_ReceiptOutlined__WEBPACK_IMPORTED_MODULE_8___default.a,
                  {
                    className: classes.buttonIcon
                  }
                ),
                'Resend invoice'
              )
            )
          )
        }

        OrderInfo.propTypes = {
          className: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
          order:
            prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired
        }
        /* harmony default export */ __webpack_exports__['default'] = OrderInfo

        /***/
      },

    /***/ './resources/assets/js/views/OrderManagementDetails/components/OrderInfo/index.js':
      /*!****************************************************************************************!*\
  !*** ./resources/assets/js/views/OrderManagementDetails/components/OrderInfo/index.js ***!
  \****************************************************************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony import */ var _OrderInfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! ./OrderInfo */ './resources/assets/js/views/OrderManagementDetails/components/OrderInfo/OrderInfo.js'
        )
        /* harmony reexport (safe) */ __webpack_require__.d(
          __webpack_exports__,
          'default',
          function() {
            return _OrderInfo__WEBPACK_IMPORTED_MODULE_0__['default']
          }
        )

        /***/
      },

    /***/ './resources/assets/js/views/OrderManagementDetails/components/OrderItems/OrderItems.js':
      /*!**********************************************************************************************!*\
  !*** ./resources/assets/js/views/OrderManagementDetails/components/OrderItems/OrderItems.js ***!
  \**********************************************************************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js'
        )
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
          react__WEBPACK_IMPORTED_MODULE_0__
        )
        /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! prop-types */ './node_modules/prop-types/index.js'
        )
        /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
          prop_types__WEBPACK_IMPORTED_MODULE_1__
        )
        /* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! clsx */ './node_modules/clsx/dist/clsx.m.js'
        )
        /* harmony import */ var react_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! react-perfect-scrollbar */ './node_modules/react-perfect-scrollbar/lib/index.js'
        )
        /* harmony import */ var react_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __webpack_require__.n(
          react_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_3__
        )
        /* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @material-ui/styles */ './node_modules/@material-ui/styles/esm/index.js'
        )
        /* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! @material-ui/core */ './node_modules/@material-ui/core/esm/index.js'
        )
        function _extends() {
          _extends =
            Object.assign ||
            function(target) {
              for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i]
                for (var key in source) {
                  if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                  }
                }
              }
              return target
            }
          return _extends.apply(this, arguments)
        }

        function _objectWithoutProperties(source, excluded) {
          if (source == null) return {}
          var target = _objectWithoutPropertiesLoose(source, excluded)
          var key, i
          if (Object.getOwnPropertySymbols) {
            var sourceSymbolKeys = Object.getOwnPropertySymbols(source)
            for (i = 0; i < sourceSymbolKeys.length; i++) {
              key = sourceSymbolKeys[i]
              if (excluded.indexOf(key) >= 0) continue
              if (!Object.prototype.propertyIsEnumerable.call(source, key))
                continue
              target[key] = source[key]
            }
          }
          return target
        }

        function _objectWithoutPropertiesLoose(source, excluded) {
          if (source == null) return {}
          var target = {}
          var sourceKeys = Object.keys(source)
          var key, i
          for (i = 0; i < sourceKeys.length; i++) {
            key = sourceKeys[i]
            if (excluded.indexOf(key) >= 0) continue
            target[key] = source[key]
          }
          return target
        }

        var useStyles = Object(
          _material_ui_styles__WEBPACK_IMPORTED_MODULE_4__['makeStyles']
        )(function() {
          return {
            root: {},
            content: {
              padding: 0
            },
            inner: {
              minWidth: 700
            }
          }
        })

        var OrderItems = function OrderItems(props) {
          var order = props.order,
            className = props.className,
            rest = _objectWithoutProperties(props, ['order', 'className'])

          var classes = useStyles()
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            _material_ui_core__WEBPACK_IMPORTED_MODULE_5__['Card'],
            _extends({}, rest, {
              className: Object(clsx__WEBPACK_IMPORTED_MODULE_2__['default'])(
                classes.root,
                className
              )
            }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              _material_ui_core__WEBPACK_IMPORTED_MODULE_5__['CardHeader'],
              {
                title: 'Order items'
              }
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              _material_ui_core__WEBPACK_IMPORTED_MODULE_5__['Divider'],
              null
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              _material_ui_core__WEBPACK_IMPORTED_MODULE_5__['CardContent'],
              {
                className: classes.content
              },
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                react_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_3___default.a,
                null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                  'div',
                  {
                    className: classes.inner
                  },
                  react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    _material_ui_core__WEBPACK_IMPORTED_MODULE_5__['Table'],
                    null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                      _material_ui_core__WEBPACK_IMPORTED_MODULE_5__[
                        'TableHead'
                      ],
                      null,
                      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                        _material_ui_core__WEBPACK_IMPORTED_MODULE_5__[
                          'TableRow'
                        ],
                        null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                          _material_ui_core__WEBPACK_IMPORTED_MODULE_5__[
                            'TableCell'
                          ],
                          null,
                          'Description'
                        ),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                          _material_ui_core__WEBPACK_IMPORTED_MODULE_5__[
                            'TableCell'
                          ],
                          null,
                          'Billing Cycle'
                        ),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                          _material_ui_core__WEBPACK_IMPORTED_MODULE_5__[
                            'TableCell'
                          ],
                          null,
                          'Status'
                        ),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                          _material_ui_core__WEBPACK_IMPORTED_MODULE_5__[
                            'TableCell'
                          ],
                          null,
                          'Amount'
                        )
                      )
                    ),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                      _material_ui_core__WEBPACK_IMPORTED_MODULE_5__[
                        'TableBody'
                      ],
                      null,
                      order.items.map(function(item) {
                        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                          _material_ui_core__WEBPACK_IMPORTED_MODULE_5__[
                            'TableRow'
                          ],
                          {
                            key: item.id
                          },
                          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                            _material_ui_core__WEBPACK_IMPORTED_MODULE_5__[
                              'TableCell'
                            ],
                            null,
                            item.name,
                            ' x ',
                            item.cuantity
                          ),
                          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                            _material_ui_core__WEBPACK_IMPORTED_MODULE_5__[
                              'TableCell'
                            ],
                            null,
                            item.billing
                          ),
                          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                            _material_ui_core__WEBPACK_IMPORTED_MODULE_5__[
                              'TableCell'
                            ],
                            null,
                            item.status
                          ),
                          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                            _material_ui_core__WEBPACK_IMPORTED_MODULE_5__[
                              'TableCell'
                            ],
                            null,
                            item.currency,
                            item.value
                          )
                        )
                      })
                    )
                  )
                )
              )
            )
          )
        }

        OrderItems.propTypes = {
          className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
          order:
            prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
        }
        /* harmony default export */ __webpack_exports__['default'] = OrderItems

        /***/
      },

    /***/ './resources/assets/js/views/OrderManagementDetails/components/OrderItems/index.js':
      /*!*****************************************************************************************!*\
  !*** ./resources/assets/js/views/OrderManagementDetails/components/OrderItems/index.js ***!
  \*****************************************************************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony import */ var _OrderItems__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! ./OrderItems */ './resources/assets/js/views/OrderManagementDetails/components/OrderItems/OrderItems.js'
        )
        /* harmony reexport (safe) */ __webpack_require__.d(
          __webpack_exports__,
          'default',
          function() {
            return _OrderItems__WEBPACK_IMPORTED_MODULE_0__['default']
          }
        )

        /***/
      },

    /***/ './resources/assets/js/views/OrderManagementDetails/components/index.js':
      /*!******************************************************************************!*\
  !*** ./resources/assets/js/views/OrderManagementDetails/components/index.js ***!
  \******************************************************************************/
      /*! exports provided: Header, OrderInfo, OrderItems */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! ./Header */ './resources/assets/js/views/OrderManagementDetails/components/Header/index.js'
        )
        /* harmony reexport (safe) */ __webpack_require__.d(
          __webpack_exports__,
          'Header',
          function() {
            return _Header__WEBPACK_IMPORTED_MODULE_0__['default']
          }
        )

        /* harmony import */ var _OrderInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ./OrderInfo */ './resources/assets/js/views/OrderManagementDetails/components/OrderInfo/index.js'
        )
        /* harmony reexport (safe) */ __webpack_require__.d(
          __webpack_exports__,
          'OrderInfo',
          function() {
            return _OrderInfo__WEBPACK_IMPORTED_MODULE_1__['default']
          }
        )

        /* harmony import */ var _OrderItems__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ./OrderItems */ './resources/assets/js/views/OrderManagementDetails/components/OrderItems/index.js'
        )
        /* harmony reexport (safe) */ __webpack_require__.d(
          __webpack_exports__,
          'OrderItems',
          function() {
            return _OrderItems__WEBPACK_IMPORTED_MODULE_2__['default']
          }
        )

        /***/
      },

    /***/ './resources/assets/js/views/OrderManagementDetails/index.js':
      /*!*******************************************************************!*\
  !*** ./resources/assets/js/views/OrderManagementDetails/index.js ***!
  \*******************************************************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony import */ var _OrderManagementDetails__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! ./OrderManagementDetails */ './resources/assets/js/views/OrderManagementDetails/OrderManagementDetails.js'
        )
        /* harmony reexport (safe) */ __webpack_require__.d(
          __webpack_exports__,
          'default',
          function() {
            return _OrderManagementDetails__WEBPACK_IMPORTED_MODULE_0__[
              'default'
            ]
          }
        )

        /***/
      }
  }
])

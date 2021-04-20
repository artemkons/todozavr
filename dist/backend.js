/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server/app.js":
/*!***************************!*\
  !*** ./src/server/app.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express-graphql */ \"express-graphql\");\n/* harmony import */ var express_graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express_graphql__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _schema_schema__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./schema/schema */ \"./src/server/schema/schema.js\");\n/* harmony import */ var _resolvers_root__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resolvers/root */ \"./src/server/resolvers/root.js\");\n\n\n\n\n\nvar URL = \"mongodb+srv://artemkons:123@cluster0.9mla7.mongodb.net/todos_db?retryWrites=true&w=majority\";\nmongoose__WEBPACK_IMPORTED_MODULE_2__.mongoose.connect(URL, {\n  useNewUrlParser: true,\n  useUnifiedTopology: true,\n  useFindAndModify: false\n});\nvar dbConnection = mongoose__WEBPACK_IMPORTED_MODULE_2__.mongoose.connection;\ndbConnection.on(\"error\", function (err) {\n  return console.log(\"Connection error \".concat(err));\n});\ndbConnection.once(\"open\", function () {\n  return console.log(\"Connected to DB!\");\n});\nvar app = express__WEBPACK_IMPORTED_MODULE_0___default()();\nvar PORT = 3000;\napp.get(\"/\", function (req, res) {\n  res.send(\"Hello World!\");\n});\napp.use(\"/api\", (0,express_graphql__WEBPACK_IMPORTED_MODULE_1__.graphqlHTTP)({\n  schema: _schema_schema__WEBPACK_IMPORTED_MODULE_3__.default,\n  rootValue: _resolvers_root__WEBPACK_IMPORTED_MODULE_4__.default,\n  graphiql: true\n}));\napp.listen(PORT, function () {\n  console.log(\"Example app listening at http://localhost:\".concat(PORT, \"/api\"));\n});\n\n//# sourceURL=webpack://todozavr/./src/server/app.js?");

/***/ }),

/***/ "./src/server/models/todo.js":
/*!***********************************!*\
  !*** ./src/server/models/todo.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar todoSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n  title: String,\n  text: String\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"Todo\", todoSchema));\n\n//# sourceURL=webpack://todozavr/./src/server/models/todo.js?");

/***/ }),

/***/ "./src/server/resolvers/root.js":
/*!**************************************!*\
  !*** ./src/server/resolvers/root.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/todo */ \"./src/server/models/todo.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\nvar root = {\n  allTodos: function () {\n    var _allTodos = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              _context.next = 2;\n              return _models_todo__WEBPACK_IMPORTED_MODULE_0__.default.find({});\n\n            case 2:\n              return _context.abrupt(\"return\", _context.sent);\n\n            case 3:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n\n    function allTodos() {\n      return _allTodos.apply(this, arguments);\n    }\n\n    return allTodos;\n  }(),\n  todo: function () {\n    var _todo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref) {\n      var id;\n      return regeneratorRuntime.wrap(function _callee2$(_context2) {\n        while (1) {\n          switch (_context2.prev = _context2.next) {\n            case 0:\n              id = _ref.id;\n              _context2.next = 3;\n              return _models_todo__WEBPACK_IMPORTED_MODULE_0__.default.findById(id);\n\n            case 3:\n              return _context2.abrupt(\"return\", _context2.sent);\n\n            case 4:\n            case \"end\":\n              return _context2.stop();\n          }\n        }\n      }, _callee2);\n    }));\n\n    function todo(_x) {\n      return _todo.apply(this, arguments);\n    }\n\n    return todo;\n  }(),\n  addTodo: function () {\n    var _addTodo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref2) {\n      var title, text, todo;\n      return regeneratorRuntime.wrap(function _callee3$(_context3) {\n        while (1) {\n          switch (_context3.prev = _context3.next) {\n            case 0:\n              title = _ref2.title, text = _ref2.text;\n              todo = new _models_todo__WEBPACK_IMPORTED_MODULE_0__.default({\n                title: title,\n                text: text ? text : \"\"\n              });\n              _context3.next = 4;\n              return todo.save();\n\n            case 4:\n              return _context3.abrupt(\"return\", _context3.sent);\n\n            case 5:\n            case \"end\":\n              return _context3.stop();\n          }\n        }\n      }, _callee3);\n    }));\n\n    function addTodo(_x2) {\n      return _addTodo.apply(this, arguments);\n    }\n\n    return addTodo;\n  }(),\n  deleteTodo: function () {\n    var _deleteTodo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref3) {\n      var id;\n      return regeneratorRuntime.wrap(function _callee4$(_context4) {\n        while (1) {\n          switch (_context4.prev = _context4.next) {\n            case 0:\n              id = _ref3.id;\n              _context4.next = 3;\n              return _models_todo__WEBPACK_IMPORTED_MODULE_0__.default.findByIdAndDelete(id);\n\n            case 3:\n              return _context4.abrupt(\"return\", _context4.sent);\n\n            case 4:\n            case \"end\":\n              return _context4.stop();\n          }\n        }\n      }, _callee4);\n    }));\n\n    function deleteTodo(_x3) {\n      return _deleteTodo.apply(this, arguments);\n    }\n\n    return deleteTodo;\n  }(),\n  editTodo: function () {\n    var _editTodo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref4) {\n      var id, title, text;\n      return regeneratorRuntime.wrap(function _callee5$(_context5) {\n        while (1) {\n          switch (_context5.prev = _context5.next) {\n            case 0:\n              id = _ref4.id, title = _ref4.title, text = _ref4.text;\n              _context5.next = 3;\n              return _models_todo__WEBPACK_IMPORTED_MODULE_0__.default.findByIdAndUpdate(id, {\n                title: title,\n                text: text\n              }, {\n                \"new\": true\n              });\n\n            case 3:\n              return _context5.abrupt(\"return\", _context5.sent);\n\n            case 4:\n            case \"end\":\n              return _context5.stop();\n          }\n        }\n      }, _callee5);\n    }));\n\n    function editTodo(_x4) {\n      return _editTodo.apply(this, arguments);\n    }\n\n    return editTodo;\n  }()\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (root);\n\n//# sourceURL=webpack://todozavr/./src/server/resolvers/root.js?");

/***/ }),

/***/ "./src/server/schema/schema.js":
/*!*************************************!*\
  !*** ./src/server/schema/schema.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql */ \"graphql\");\n/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_0__);\n\nvar schema = (0,graphql__WEBPACK_IMPORTED_MODULE_0__.buildSchema)(\"\\n  type Todo {\\n    id:ID!\\n    title: String!\\n    text: String!\\n  }\\n\\n  type Query {\\n    todo(id: ID!): Todo\\n    allTodos: [Todo!]!\\n  }\\n\\n  type Mutation {\\n    addTodo(title: String!, text: String): Todo!\\n    deleteTodo(id: ID!): Todo!\\n    editTodo(id: ID!, title: String!, text: String!): Todo! \\n  }\\n\");\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (schema);\n\n//# sourceURL=webpack://todozavr/./src/server/schema/schema.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");;

/***/ }),

/***/ "express-graphql":
/*!**********************************!*\
  !*** external "express-graphql" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("express-graphql");;

/***/ }),

/***/ "graphql":
/*!**************************!*\
  !*** external "graphql" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("graphql");;

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server/app.js");
/******/ 	
/******/ })()
;
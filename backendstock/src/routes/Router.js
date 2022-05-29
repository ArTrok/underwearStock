"use strict";
exports.__esModule = true;
var express_1 = require("express");
var CustomRouter = /** @class */ (function () {
    function CustomRouter() {
        this.router = (0, express_1.Router)();
    }
    CustomRouter.prototype.addRoute = function (controller, route) {
        if (route === void 0) { route = controller.route; }
        this.router.get(route, controller.read);
        this.router.get("".concat(route, "/:id"), controller.readOne);
        this.router.post(route, controller.create);
        this.router.put("".concat(route, "/:id"), controller.update);
        this.router["delete"]("".concat(route, "/:id"), controller["delete"]);
    };
    return CustomRouter;
}());
exports["default"] = CustomRouter;

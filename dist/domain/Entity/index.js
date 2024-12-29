"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
class Entity {
    constructor(props, id) {
        this.props = props;
        this._id = id;
    }
    updateProp(propsToUpdate) {
        this.props = Object.assign(Object.assign({}, this.props), propsToUpdate);
        return this;
    }
    getProps() {
        return this.props;
    }
}
exports.Entity = Entity;

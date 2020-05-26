"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const all_but_1 = require("../src/all-but");
const only_1 = require("../src/only");
const flatten_sinks_1 = require("../src/flatten-sinks");
const xstream_1 = __importDefault(require("xstream"));
mocha_1.describe('Filtering out sinks', () => {
    it('should filter out all but DOM1 from each component passed in', () => {
        // Mock sinks
        const s1 = { DOM: null, DOM1: null, DRV: null };
        const s2 = { DOM: null, DOM1: null, DRV: null };
        const combined = all_but_1.allBut(['DOM1', 'DRV'], s1, s2);
        chai_1.expect(combined).to.deep.equal([
            { DOM: null },
            { DOM: null }
        ]);
    });
    it('should filter out only DOM from each component passed in', () => {
        // Mock sinks
        const s1 = { DOM: null, DOM1: null, DRV: null };
        const s2 = { DOM: null, DOM1: null, DRV: null };
        const combined = only_1.only(['DOM'], s1, s2);
        chai_1.expect(combined).to.deep.equal([
            { DOM: null },
            { DOM: null }
        ]);
    });
    it('should flatten and unify multiple components into a single sink', () => {
        // Mock sinks
        const s1 = { S: xstream_1.default.of(1) };
        const s2 = { S: xstream_1.default.of(2) };
        const merged = flatten_sinks_1.flattenSinks(s1, s2);
        merged.S.take(1).addListener({
            next: value => chai_1.expect(value).to.equal(1)
        });
        merged.S.drop(1).take(1).addListener({
            next: value => chai_1.expect(value).to.equal(2)
        });
    });
});

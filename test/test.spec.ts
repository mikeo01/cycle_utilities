import { describe } from "mocha";
import { expect } from "chai";

import { allBut } from "../src/all-but";
import { only } from "../src/only";
import { flattenSinks } from "../src/flatten-sinks";
import xs from "xstream";

describe('Filtering out sinks', () => {
    it('should filter out all but DOM1 from each component passed in', () => {
        // Mock sinks
        const s1 = {DOM: null, DOM1: null, DRV: null };
        const s2 = {DOM: null, DOM1: null, DRV: null }

        const combined = allBut<Object>(['DOM1', 'DRV'], s1, s2);

        expect(combined).to.deep.equal([
            { DOM: null },
            { DOM: null }
        ]);
    });

    it('should filter out only DOM from each component passed in', () => {
        // Mock sinks
        const s1 = { DOM: null, DOM1: null, DRV: null };
        const s2 = { DOM: null, DOM1: null, DRV: null }

        const combined = only<Object>(['DOM'], s1, s2);

        expect(combined).to.deep.equal([
            { DOM: null },
            { DOM: null }
        ]);
    });

    it('should flatten and unify multiple components into a single sink', () => {
        // Mock sinks
        const s1 = { S: xs.of(1) };
        const s2 = { S: xs.of(2) };

        const merged = flattenSinks(s1, s2);

        merged.S.take(1).addListener({
            next: value => expect(value).to.equal(1)
        });

        merged.S.drop(1).take(1).addListener({
            next: value => expect(value).to.equal(2)
        });
    });
});
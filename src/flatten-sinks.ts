import xs, { Stream } from "xstream";

type Component = {[k: string]: any};

/**
 * Merges sinks - note, this assumes your stream is already flattened
 * @param key 
 */
function merge<S>(components: Array<S>, key: string): Stream<unknown> {
    return components
        .filter((stream: Component) => !!stream[key])
        .map((stream: Component): Stream<unknown> => stream[key])
        .reduce(function (previous, current) {
            return previous = xs.merge(previous, current);
        }, xs.empty());
}

/**
 * Flattens and unifies components into a single sink
 * @param sinks
 */
export function flattenSinks<S>(...sinks: Array<S>): S {
    // Retrieve properties of S at runtime
    const properties = sinks
        .map(component => Object.keys(component))
        .flat()
        .filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });

    // Merged sink
    let mergedSink: Component = {};
    properties.forEach(k => {
        mergedSink[k] = merge<S>(sinks, k);
    });
    
    return mergedSink as S;
}
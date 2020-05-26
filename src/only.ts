type SinkNames = Array<string>;

/**
 * Filter out sinks we interested in
 * @param sinks
 * @param sinkNames 
 */
export function only<S>(sinkNames: SinkNames, ...sinks: Array<S>): Array<S> {
    return sinks.map(sink => {
        return Object
            .entries(sink)
            .filter(([k, v]) => sinkNames.includes(k))
            .reduce(function (accumlator, [key, value]) {
                return Object.assign(accumlator, { [key]: value });
            }, {} as S);
    });
};
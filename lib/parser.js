/**
 *
 * @param args
 * @returns {{flag: (function(*=, *=)), get: (function()), command: (function(*=))}}
 */
const factory = (args) => {
    const parsed = {};

    // remove caller and entryPoint
    args.splice(0, 2);

    /**
     *
     * @param key
     * @param value
     */
    const set = (key, value) => {
        if (parsed[key]) {
            if (value === false) {
                // do nothing
            } else if (Array.isArray(parsed[key])) {
                if (Array.isArray(value)) {
                    parsed[key].push(...value)
                } else {
                    parsed[key].push(value)
                }
            } else {
                parsed[key] = [parsed[key], value];
            }
        } else {
            parsed[key] = value;
        }
    };

    /**
     *
     * @param prefix
     * @param name
     * @param alias
     * @returns {{flag: (function(*=, *=)), get: (function()), command: (function(*=))}}
     */
    const extract = (prefix = '', name, alias) => {
        const key = prefix + name;
        const index = args.indexOf(key);

        if (index === -1) {
            set(name, false);
            return context;
        }

        const indexes = args
            .map((_, i) => i)
            .filter((i) => i > (index))
            .filter((i) => args
                .slice(index + 1, i + 1)
                .every(arg => arg.indexOf('-') === -1),
            )
        ;

        if (indexes.length === 0) {
            set(name, true);
            return context;
        }

        const next = indexes.shift();
        const extracted = args.splice(next - 1, indexes.length + 2);
        extracted.shift();

        let value;

        if (index === -1 && !extracted.length || value === false) {
            value = false;
        } else if (index === 0 && extracted.length === 0) {
            value = true;
        } else if (extracted.length === 1) {
            value = extracted.shift();
        } else if (extracted.length > 1) {
            value = extracted;
        }

        set(alias || name, value);

        if (args.indexOf(key) !== -1) {
            extract(prefix, name, alias);
        }
    };

    /**
     *
     * @param name
     * @returns {{flag: (function(*, *=)), get: (function()), command: (function(*=))}}
     */
    const command = (name) => {
        extract('', name);

        return context;
    };

    /**
     *
     * @param flag
     * @param name
     * @returns {{flag: (function(*=, *=)), get: (function()), command: (function(*=))}}
     */
    const flag = (flag, name) => {
        extract('-', flag, name);

        (name !== undefined)
            && extract('--', name)
        ;

        return context;
    };

    /**
     *
     */
    const get = () => parsed;

    const context = {
        flag,
        command,
        get,
    };

    return context;
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.03.2019
 * Time: 23:09
 *
 * @type {function(*=): {flag: (function(*=, *=)), get: (function()), command: (function(*=))}}
 */
module.exports = factory;

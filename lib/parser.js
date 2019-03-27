/**
 *
 * @param args
 * @returns {{flag: (function(*, *=)), get: (function()), command: (function(*=))}}
 */
const factory = (args) => {
    const parsed = {};
    args.splice(0, 2);

    /**
     *
     * @param key
     */
    const extract = (key) => {
        const index = args.indexOf(key);

        const indexes = args
            .map((_, i) => i)
            .filter((i) => i >= (index + 1))
            .filter((i) => args
                .slice(index + 1, (index - 1) + i)
                .every(arg => arg.indexOf('-') === -1),
            )
        ;

        // broken logic
        const extracted = args.splice(indexes.shift(), indexes.length + 1);
        let value = extracted.shift();

        if (index === -1 && !extracted.length) {
            value = false;
        } else if (index === 0 && extracted.length === 0) {
            value = true;
        } else if (extracted.length === 1) {
            value = extracted.shift();
        } else if (extracted.length > 1) {
            value = extracted;
        }

        parsed[key] = value;

        if (args.indexOf(key) !== -1) {
            extract(key);
        }
    };

    /**
     *
     * @param name
     * @returns {{flag: (function(*, *=)), get: (function()), command: (function(*=))}}
     */
    const command = (name) => {
        extract(name);

        return context;
    };

    /**
     *
     * @param flag
     * @param key
     * @returns {{flag: (function(*, *=)), get: (function()), command: (function(*=))}}
     */
    const flag = (flag, key) => {
        if (!key) {
            key = flag;
        }

        extract('-' + key);

        return context;
    };

    /**d
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
 */
module.exports = factory;

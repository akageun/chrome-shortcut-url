class CommonUtil {
    constructor() {
    }

    getLocalItem(targetKey) {
        return new Promise((resoluve, reject) => {

            chrome.storage.local.get(targetKey, (res) => {
                resoluve(res);
            });

        });
    }

    getOption() {
        return {
            shouldSort: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
                "alias",
                "name",
                "url"
            ]
        };
    }
};

export default new CommonUtil();
import Fuse from 'fuse.js';

class CommonUtil {
    constructor() {
    }

    getAliasList(searchText) {
        return new Promise((resolve, reject) => {
            this.getLocalItem('json')
                .then((res) => {
                    const resJson = res.json;
                    if (!searchText) {
                        resolve(resJson);
                        return;
                    }

                    const fuse = new Fuse(resJson, this.getOption()); // "list" is the item array
                    resolve(fuse.search(searchText));
                });
        });
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
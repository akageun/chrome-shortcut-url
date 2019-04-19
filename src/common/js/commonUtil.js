import Fuse from 'fuse.js';

class CommonUtil {
    constructor() {
    }

    searchList(aliasList, searchText) {
        if (!searchText) {
            return aliasList;
        }
        const fuse = new Fuse(aliasList, this.getOption()); // "list" is the item array
        return fuse.search(searchText);
    }

    getAliasList(searchText) {
        return new Promise((resolve, reject) => {
            this.getLocalItem('json')
                .then((res) => {
                    resolve(this.searchList(res.json, searchText))
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
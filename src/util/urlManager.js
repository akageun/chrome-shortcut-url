import {getObjectFromLocalStorage, removeObjectFromLocalStorage, saveObjectInLocalStorage} from './storage.js';
import Fuse from 'fuse.js';

class UrlManager {
    constructor() {
        this.storageName = 'json';
    }

    searchList(aliasList, searchText) {
        if (!searchText) {
            return aliasList;
        }
        const fuse = new Fuse(aliasList, this._searchOption());

        const searchedList = [];
        fuse.search(searchText).map((alias) => {
            searchedList.push({
                url: alias.item.url,
                name: alias.item.name,
                alias: alias.item.alias,
                count: alias.item.count,
            })

        });

        return searchedList;
    }

    async findList(searchText) {
        const aliasList = await getObjectFromLocalStorage(this.storageName);
        return this.searchList(aliasList, searchText);
    }

    async updateClickCount(url) {
        const aliasList = await this.findList();
        for (const json of aliasList) {
            if (json.url === url) {

                if (!json.count) {
                    json.count = 1;
                } else {
                    json.count += 1;
                }

            }
        }
        await this.saveAliasList(aliasList);
    }

    async saveAliasList(aliasList) {
        for (const json of aliasList) {
            const url = json.url;
            const name = json.name;
            const alias = json.alias;

            if (!url || !name || !alias) {
                alert("필수 값을 입력해주세요.");
                return;
            }

            if (!json.count) {
                json.count = 0;
            }
        }

        const data = {};
        data[this.storageName] = aliasList;

        await saveObjectInLocalStorage(data)
    }

    async clearAliasList() {
        await removeObjectFromLocalStorage([this.storageName]);
    }

    _searchOption() {
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
}

export default new UrlManager();
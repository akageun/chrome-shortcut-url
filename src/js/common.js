var CmnFunc = function () {

    this.getLocalItem = function (targetKey) {
        return new Promise(function (resoluve, reject) {

            chrome.storage.local.get(targetKey, function (res) {
                console.log("res!! ", res);
                resoluve(res);
            });

        });
    };

    this.setLocalItem = function (targetKey, targetData) {
        chrome.storage.local.set({targetKey: targetData});
    };

    this.getFuseOptions = function () {
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


class CommonUtil {
    constructor() {
    }

    getLocalItem(targetKey) {
        return new Promise((resoluve, reject) => {

            chrome.storage.local.get(targetKey, function (res) {
                resoluve(res);
            });

        });
    }
};

export default new CommonUtil();
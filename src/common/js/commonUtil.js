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
};

export default new CommonUtil();
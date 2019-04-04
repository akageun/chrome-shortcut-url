function changeEventOmnibox(query, suggest) {

    chrome.storage.local.get('json', function (res) {
        var fuse = new Fuse(res.json, getFuseOptions()); // "list" is the item array
        var result = fuse.search(query);

        var suggestArr = [];
        for (var i = 0; i < result.length; i++) {
            var res = result[i];
            suggestArr.push({content: res.url, description: "<dim>[" + res.alias + "]</dim> " + res.name});
        }

        suggest(suggestArr);
    });

}

function selectEventOmnibox(url) {
    chrome.tabs.update({url: url});
}

function getFuseOptions() {
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

// 매니페스트에 설정한 키워드 URL 입력시 이벤트
chrome.omnibox.onInputChanged.addListener(changeEventOmnibox);

// omnibox를 선택시 이벤트
chrome.omnibox.onInputEntered.addListener(selectEventOmnibox);
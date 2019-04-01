function changeEventOmnibox(query, suggest) {

    var fuse = new Fuse(getJsonList(), getFuseOptions()); // "list" is the item array
    var result = fuse.search(query);

    var suggestArr = [];
    for (var i = 0; i < result.length; i++) {
        var res = result[i];
        suggestArr.push({content: res.url, description: "<dim>[" + res.alias + "]</dim> " + res.name});
    }

    suggest(suggestArr);
}

function selectEventOmnibox(url) {
    chrome.tabs.update({url: url});
}

function getJsonList() {
    return [
        {
            "alias": "n",
            "name": "naver",
            "url": "https://naver.com"
        },
        {
            "alias": "n w",
            "name": "Naver webtoon",
            "url": "https://comic.naver.com/index.nhn"
        },
        {
            "alias": "n t",
            "name": "네이버 TV",
            "url": "https://tv.naver.com/"
        },
        {
            "alias": "g",
            "name": "google",
            "url": "https://google.com"
        },
        {
            "alias": "g m",
            "name": "gmail",
            "url": "https://mail.google.com/mail/u/0/?tab=rm"
        },
        {
            "alias": "g d",
            "name": "Google Drive",
            "url": "https://drive.google.com/drive/u/0/my-drive"
        }
    ]
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
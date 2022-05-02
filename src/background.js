import UrlManager from '@/util/urlManager'

chrome.omnibox.setDefaultSuggestion({
    description: 'enter search alias(<match>shortcut</match>)'
});

// 매니페스트에 설정한 키워드 URL 입력시 이벤트
chrome.omnibox.onInputChanged.addListener((query, suggest) => {

    if (query.length < 2) {
        suggest([]);
        return;
    }

    UrlManager.findList(query).then((aliasList) => {
        let suggestArr = [];

        aliasList.map((item) => {
            suggestArr.push({
                content: item.url,
                description: '['+item.name + '] ' + item.alias
                //description: '<match>[' + item.alias + ']</match> ' + item.name + ' : <url>' + item.url + '</url>'
            });
        });
        suggest(suggestArr);
    });
});

// omnibox를 선택시 이벤트
chrome.omnibox.onInputEntered.addListener((url, disposition) => {
    UrlManager.updateClickCount(url).then(()=>{
        switch (disposition) {
            case "currentTab":
                chrome.tabs.update({url});
                break;
            case "newForegroundTab":
                chrome.tabs.create({url});
                break;
            case "newBackgroundTab":
                chrome.tabs.create({url, active: false});
                break;
        }
    })
});

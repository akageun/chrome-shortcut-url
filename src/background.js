import commonUtil from 'SrcRoot/common/js/commonUtil';

// 매니페스트에 설정한 키워드 URL 입력시 이벤트
chrome.omnibox.onInputChanged.addListener((query, suggest) => {

    commonUtil.getAliasList(query).then((result) => {
        let suggestArr = [];
        result.map((item) => {
            suggestArr.push({
                content: item.url,
                description: `<dim>[${item.alias}]</dim> ${item.name}`
            });
        });

        suggest(suggestArr);
    });
});

// omnibox를 선택시 이벤트
chrome.omnibox.onInputEntered.addListener((url) => {
    chrome.tabs.update({url: url});
});

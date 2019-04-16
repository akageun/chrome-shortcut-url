import commonUtil from 'SrcRoot/common/js/commonUtil';
import Fuse from 'fuse.js';

// 매니페스트에 설정한 키워드 URL 입력시 이벤트
chrome.omnibox.onInputChanged.addListener((query, suggest) => {

    commonUtil.getLocalItem('json')
        .then((res) => {
            const fuse = new Fuse(res.json, commonUtil.getOption()); // "list" is the item array
            const result = fuse.search(query);

            let suggestArr = [];
            for (let i = 0; i < result.length; i++) {
                const res = result[i];
                suggestArr.push({
                    content: res.url,
                    description: `<dim>[${res.alias}]</dim> ${res.name}`
                });
            }

            suggest(suggestArr);
        })
});

// omnibox를 선택시 이벤트
chrome.omnibox.onInputEntered.addListener((url) => {
    chrome.tabs.update({url: url});
});

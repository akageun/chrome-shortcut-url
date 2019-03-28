chrome.omnibox.onInputChanged.addListener(changeEventOmnibox); // 매니페스트에 설정한 키워드 URL 입력시 이벤트
chrome.omnibox.onInputEntered.addListener(selectEventOmnibox); // omnibox를 선택시 이벤트


function changeEventOmnibox(text, suggest) {
    console.log('inputChanged:' + text);
    suggest([
        {content: text + " ONE", description: "ONE LINE."},
        {content: text + " TWO", description: "TWO LINE."}, /* Feature : option, google search, naver search ... */
    ]);
}

function selectEventOmnibox(text) {
    console.log('inputEntered: ' + text);
}
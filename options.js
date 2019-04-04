(function () {
    addSaveBtnEvent();
    newLineBtnEvent();

    var resultEle = document.getElementById('tableResult');
    chrome.storage.local.get('json', function (res) {
        if (!res.json) {
            resultEle.appendChild(appendTr());
            return;
        }

        for (var i = 0; i < res.json.length; i++) {
            var data = res.json[i];
            resultEle.appendChild(appendTr(data.name, data.alias, data.url));
        }

    });


})();

function addSaveBtnEvent() {
    document.getElementById('saveBtn').addEventListener('click', function (e) {
        e.preventDefault();

        save();
    });
}

function newLineBtnEvent() {
    document.getElementById('newLineBtn').addEventListener('click', function (e) {
        e.preventDefault();

        var resultEle = document.getElementById('tableResult');
        resultEle.appendChild(appendTr());

    });
}

function save() {
    var resultCount = document.getElementById('tableResult').getElementsByTagName('tr').length;

    var urlArr = document.getElementsByName('url');
    var nameArr = document.getElementsByName('name');
    var aliasArr = document.getElementsByName('alias');

    var aliasUrlArr = [];

    for (var i = 0; i < resultCount; i++) {
        var url = urlArr[i].value;
        var name = nameArr[i].value;
        var alias = aliasArr[i].value;

        if (!url || !name || !alias) {
            alert("필수 값을 입력해주세요.");
            return;
        }

        aliasUrlArr.push({url: url, name: name, alias: alias});
        showMessage('Success save');
    }

    chrome.storage.local.set({'json': aliasUrlArr});
}


function appendTr(inputName, inputAlias, inputUrl) {
    var tr = document.createElement('tr');

    var td1 = createTd(true);
    td1.appendChild(createInput('name', 'Enter url Name', inputName));

    var td2 = createTd(true);
    td2.appendChild(createInput('alias', 'Enter alias', inputAlias));

    var td3 = createTd(false);
    td3.appendChild(createInput('url', 'Enter url', inputUrl));

    var td4 = createTd(true);
    createFunctionButtons(td4);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    return tr;
}

function createFunctionButtons(tdEle) {
    tdEle.appendChild(createButton('DELETE', function (e) {
        e.preventDefault();

        var resultEle = document.getElementById('tableResult');
        resultEle.removeChild(this.parentNode.parentNode);

        showMessage('Delete Line');
    }));

    tdEle.appendChild(createButton('GO', function (e) {
        e.preventDefault();

        var url = this.parentNode.parentNode.querySelector("[name='url']").value;
        if (!url) {
            showMessage('Url Empty!');
            return;
        }

        chrome.tabs.create({url: url}); //new Tabs
    }));
}

function createButton(innerTxt, onClickFunc) {
    var btn = document.createElement('button');
    btn.className = 'btn btn-orange btn-mini mb-1 mr-1';
    btn.innerText = innerTxt;
    btn.onclick = onClickFunc;

    return btn;
}

function createTd(isTextCenter) {
    var td = document.createElement('td');
    if (isTextCenter) {
        td.className = 'text-center';
    }

    return td;
}

function createInput(nameStr, placeholder, inputValue) {
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", nameStr);
    input.setAttribute("placeholder", placeholder);
    if (inputValue) {
        input.value = inputValue;
    }

    return input;
}

function showMessage(message) {
    var x = document.getElementById("snackbar");
    x.innerText = message;
    x.className = "show";
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);
}
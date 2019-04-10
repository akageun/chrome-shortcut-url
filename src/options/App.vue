<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col">
                <div class="btn-group float-right pb-1">
                    <button class="btn btn-secondary btn-sm" @click="clearData()">CLEAR</button>
                    <button class="btn btn-secondary btn-sm" @click="importJson($event)">IMPORT</button>
                    <button class="btn btn-secondary btn-sm" @click="exportJson($event)">EXPORT</button>
                </div>
                <table class="table">
                    <thead>
                    <tr>
                        <th style="text-align: center;">Name</th>
                        <th style="text-align: center;">Shortcut</th>
                        <th style="text-align: center;">URL</th>
                        <th style="text-align: center;">Functions</th>
                    </tr>
                    </thead>
                    <tbody id="tableResult">
                    <template v-for="item in aliasList">
                        <result-row-data :name="item.name" :url="item.url" :alias="item.alias"></result-row-data>
                    </template>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="float-right pb-1">
                    <button class="btn btn-primary btn-sm" @click="newLine()">New Line</button>
                    <button class="btn btn-primary btn-sm" @click="saveData()">SAVE</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import commonUtil from '@/common/js/commonUtil';
    import resultRowData from '@/common/components/resultRowData';

    export default {
        name: "App",
        components: {
            'result-row-data': resultRowData
        },
        data() {
            return {
                aliasList: []
            }
        },
        mounted() {
            this.initUrlList();
        },
        methods: {
            initUrlList() {
                commonUtil
                    .getLocalItem('json')
                    .then((res) => {
                        this.aliasList = res.json;
                    });
            },
            newLine() {
                this.aliasList.push({});
            },
            clearData() {

                if (confirm('저장된 데이터를 전체 삭제하시겠습니까?')) {
                    chrome.storage.local.clear(function () {
                        const error = chrome.runtime.lastError;
                        if (error) {
                            console.error(error);
                        }
                    });

                    window.location.reload();
                }

            },
            saveData() {

                const resultCount = document.getElementById('tableResult').getElementsByTagName('tr').length;

                const urlArr = document.getElementsByName('url');
                const nameArr = document.getElementsByName('name');
                const aliasArr = document.getElementsByName('alias');

                const aliasUrlArr = [];

                for (let i = 0; i < resultCount; i++) {
                    const url = urlArr[i].value;
                    const name = nameArr[i].value;
                    const alias = aliasArr[i].value;

                    if (!url || !name || !alias) {
                        alert("필수 값을 입력해주세요.");
                        return;
                    }

                    aliasUrlArr.push({url: url, name: name, alias: alias});
                }

                alert('Success save');

                chrome.storage.local.set({'json': aliasUrlArr});
            },
            exportJson(e) {
                e.preventDefault();

                commonUtil.getLocalItem('json')
                    .then(function (res) {

                        if (!res.json) {
                            alert('등록된 데이터가 없습니다.');
                            return;
                        }

                        const fileName = "shortcut_url_" + new Date().getTime() + ".json";
                        const result = JSON.stringify(res.json);

                        // Save as file
                        const url = 'data:application/json;base64,' + btoa(result);
                        chrome.downloads.download({
                            url: url,
                            filename: fileName
                        });
                    });
            },
            importJson(e) {

            }
        }
    };
</script>

<style scoped>
</style>

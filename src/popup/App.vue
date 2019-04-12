<template>
    <div class="container-fluid">

        <div class="row mt-2">
            <div class="col">
                <div class="float-right">
                    <button class="btn btn-info btn-sm" @click="openOptionPage($event)">Open Option Page</button>
                </div>
            </div>
        </div>
        <div class="row no-gutters mt-2">
            <table class="table table-sm table-bordered">
                <thead>
                <tr>
                    <th>
                        NAME
                    </th>
                    <th>
                        ALIAS
                    </th>
                    <th>
                        URL
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in aliasList">
                    <td>{{item.name}}</td>
                    <td>{{item.alias}}</td>
                    <td>
                        <a @click="goUrl($event, item.url)" href="#">{{item.url}}</a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import commonUtil from 'SrcRoot/common/js/commonUtil';

    export default {
        data() {
            return {
                aliasList: []
            }
        },
        mounted() {
            this.initUrlList();
        },
        methods: {
            goUrl(e, url) {
                e.preventDefault();
                chrome.tabs.create({url});
            },
            openOptionPage(e) {
                e.preventDefault();

                const optionsPageURL = chrome.extension.getURL('options/options.html');
                chrome.tabs.create({url: optionsPageURL});
            },
            initUrlList() {
                commonUtil
                    .getLocalItem('json')
                    .then((res) => {
                        if (res.json) {
                            this.aliasList = res.json;
                        } else {
                            this.aliasList.push({});
                        }
                    });
            },
        }
    }
</script>

<style>
    body {
        min-width: 600px; /* your desired width */
        max-width: 100%;
        min-height: 400px;
        max-height: 100%;
        position: relative;
        vertical-align: middle;
    }
</style>

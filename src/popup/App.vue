<template>
    <div class="container-fluid">

        <div class="row mt-2">
            <div class="col">
                <div class="card">
                    <div class="card-body">

                        <div class="btn-toolbar justify-content-between mb-1" role="toolbar">
                            <div class="input-group input-group-sm">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">@</div>
                                </div>
                                <input type="text" class="form-control form-control-sm" placeholder="Search Text!" v-model="searchText">
                            </div>

                            <button class="btn btn-info btn-sm" @click="openOptionPage($event)">Option</button>
                        </div>

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
                            <tr v-for="item in getAliasList">
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
            </div>
        </div>
    </div>
</template>

<script>
    import commonUtil from 'SrcRoot/common/js/commonUtil';

    export default {
        data() {
            return {
                searchText: '',
                aliasList: []
            }
        },
        mounted() {
            this.initUrlList();
        },
        computed: {
            getAliasList() {
                return commonUtil.searchList(this.aliasList, this.searchText);
            }
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
        min-height: 450px;
        max-height: 100%;
        position: relative;
        vertical-align: middle;
    }

</style>

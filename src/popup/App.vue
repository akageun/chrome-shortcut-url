<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <button @click="openOptionPage($event)">Open Option Page</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            openOptionPage(e) {
                e.preventDefault();

                const optionsPageURL = chrome.extension.getURL('options/options.html');
                chrome.tabs.create({url: optionsPageURL});
            }
        }
    }
</script>

<style>
    body {
        min-width: 600px; /* your desired width */
        max-width: 100%;
        min-height: 900px;
        max-height: 100%;
        position: relative;
        vertical-align: middle;
    }
</style>

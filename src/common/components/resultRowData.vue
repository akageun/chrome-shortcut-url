<template>
    <tr>
        <td style="text-align: center;">
            <input type="text" class="form-control" name="name" :value="name"/>
        </td>
        <td style="text-align: center;">
            <input type="text" class="form-control" name="alias" :value="alias"/>
        </td>
        <td>
            <input type="text" class="form-control" name="url" :value="url"/>
        </td>
        <td style="text-align: center;">
            <button class="btn btn-warning btn-sm" @click="deleteRow($event)">DELETE</button>
            <button class="btn btn-warning btn-sm" @click="goUrl($event)">Go</button>
        </td>
    </tr>
</template>

<script>
    export default {
        name: "resultRowData",
        props: ['name', 'alias', 'url'],
        methods: {
            deleteRow(event) {
                const resultEle = document.getElementById('tableResult');
                resultEle.removeChild(event.currentTarget.parentNode.parentNode);

                alert('Delete Line');
            },
            goUrl(event) {
                const url = event.currentTarget.parentNode.parentNode.querySelector("[name='url']").value;
                if (!url) {
                    alert('Url Empty!');
                    return;
                }

                chrome.tabs.create({url: url}); //new Tabs
            }
        }
    }
</script>

<style scoped>

</style>

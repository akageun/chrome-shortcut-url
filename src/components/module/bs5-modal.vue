<template>
    <transition name="bs5-modal">
        <div>
            <div :class="`modal fade show ${modalClasses}`" :id="`${modalId}`"
                 :data-backdrop="{'static':backdropEnable}" :data-keyboard="escCloseEnable" tabindex="-1"
                 :aria-labelledby="`${modalId}Label`"
                 aria-modal="true" role="dialog" style="display: block;">
                <div class="modal-dialog"
                     :class="[{ 'modal-dialog-scrollable' : bodyScrollEnable, 'modal-fullscreen':fullscreenEnable}, modalSizeClasses]"
                     >
                    <div class="modal-content">
                        <div class="modal-header" v-if="headerEnable">
                            <h5 class="modal-title" :id="`${modalId}Label`">{{ title }}</h5>
                            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"
                                    @click="close"></button>
                        </div>
                        <slot/>
                    </div>
                </div>
            </div>

            <div class="modal-backdrop fade show"></div>
        </div>

    </transition>
</template>

<script>

export default {
    name: "bs5-modal",
    props: {
        modalId: {
            type: String,
            required: false,
            default: Math.random().toString(10)
        },
        title: {
            type: String,
            required: false,
            default: "",
        },
        bodyScrollEnable: {
            type: Boolean,
            required: false,
            default: true
        },
        headerEnable: {
            type: Boolean,
            required: false,
            default: true
        },
        fullscreenEnable: {
            type: Boolean,
            required: false,
            default: false
        },
        backdropEnable: {
            type: Boolean,
            required: false,
            default: false
        },
        escCloseEnable: {
            type: Boolean,
            required: false,
            default: false
        },
        modalClasses: {
            type: String,
            required: false,
            default: ""
        },
        modalSizeClasses: {
            type: String,
            required: false,
            default: ""
        },

    },
    data: () => ({}),
    created() {
    },
    methods: {
        close() {
            this.$emit("close");
        }
    }

}
</script>

<style scoped>

</style>

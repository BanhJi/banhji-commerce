<template>
    <li class="k-item" @click="handleClick">
    <span :style="{ color: '#00F' }">
            {{ dataItem.number }} - {{ dataItem.name }}
    </span>
    </li>
</template>
<script>
export default {
    props: {
        id: String,
        index: Number,
        dataItem: [Object, String, Number],
        textField: String,
        focused: Boolean,
        selected: Boolean,

    },
    methods: {
        handleClick: function (e) {
            this.$emit('clickItem', e)
        }
    }
}
</script>

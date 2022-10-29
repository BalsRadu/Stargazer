<template>
    <footer class="footer">
        <button @click="goto('/admin')"><i class="material-icons">backspace</i></button>
        <button @click="goto('/admin/banuser')"><i class="material-icons" >block</i></button>
    </footer>
</template>

<script>
    export default{
        methods: {
            goto (path) {
                this.$router.push(path);
            }
        }
    }
</script>

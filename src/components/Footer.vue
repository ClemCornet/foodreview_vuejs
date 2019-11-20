<template>
    <div class="row footer">
        <div class="col-lg">
            <p class="text-muted">Made with <i class="fas fa-heart"></i> by <a href="https://vuejs.org">Vue.js</a></p>
        </div>
    </div>
</template>

<script>
export default {
    data (){
        return {
            msg: ''
        }
    }
}
</script>

<style scoped>
    .footer{
        height: 150px;
        display: flex;
        flex-direction: row;
        background: rgba(247, 247, 247, 0.6);
        align-items: center;
        text-align: center;
    }
</style>
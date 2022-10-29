<template>
    <header class="header">
        <h3 class="title">STAR<span>GAZER</span></h3>
        <button class="logout-btn" @click="this.$store.commit('adminLogout')">
            <i class="material-icons">power_off</i>
        </button>
    </header>
</template>

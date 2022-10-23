<template>
    <section class="view">
        <div class="form-group">

            <h3 class="updated" v-if="success" :class="(success) ? 'show' : 'hide'">Profile updated!</h3>

            <span>PROFILE PICTURE UPLOAD</span> <br>
            <div for="username">Username</div>
            <input type="text" v-model="username" placeholder="username">

            <div for="email">Email</div>
            <input type="text" v-model="email" placeholder="email">

            <!--
                <label for="password">Password</label>
                <input type="password" v-model="password" placeholder="pass">
            -->

            <button @click="update">Update</button>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password:'',
            username: '',
            profile_picture: '',
            success: false,
            msg:''
        }
    },
    methods: {
        update() {
            
            let api_url = this.$store.state.api_url;
            this.$http.post(api_url + 'user/editprofile', {
                auth_token: localStorage.getItem('jwt'),
                username: this.username,
                image: this.profile_picture,
                email: this.email,
                //password: this.password
            }).then(response => {
                this.success = true
                this.msg = response.data.msg
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .view{
        color: #fff
    }
    .form-group {
        input {
            width:50%;
        }
    }
    .show {
        display:block
    }
    .hide {
        display:none;
    }
    .updated {
        text-transform: uppercase;
        text-align: center;
        line-height:25px;
        color: #35495e;
        background-color: #42b883;
        border-radius: 6px;
        height:25px;
    }
</style>
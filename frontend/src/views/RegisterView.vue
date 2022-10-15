<template>
    <div class="register-page">
        <header>
            <h3>STAR<span>GAZER</span></h3>
            <h4>Register</h4>
        </header>
            <main class="form-group">
            <input type="text" v-model="username" placeholder="Username"/>
            <input type="text" v-model="email" placeholder="Email" :class="(hasErrors) ? 'err' : ''"/>
            <input type="password" v-model="password" placeholder="Password"/>
            <button class = "register-btn" @click="register">Register</button>
            <div class="error_msg" v-if="hasErrors">
                {{error}}
            </div>
        </main>
        <footer>
            <p>
                Already Registered? <router-link class="link" to="/login">Sign in</router-link>.
            </p>
        </footer>
    </div>
</template>

<script>
    export default{
        name: "registerPage",
        data() {
            return{
                username: "",
                email: "",
                password: "",
                hasErrors: false,
                error: ""
            }
        },
        methods:{
            register() {
                let api_url = this.$store.state.api_url
                if(
                this.username == "" || 
                this.email == ""  || 
                this.password == ""
                ) {
                    return alert('Please fill in all fields')
                }
                this.$http.post(api_url + 'user/register', {
                    username: this.username,
                    email: this.email,
                    password: this.password
                }).then(response => {
                    if(response.data.auth){
                        localStorage.setItem("jwt", response.data.token)
                        this.$router.push("/")
                    }else{
                        this.error = response.data.msg
                        this.hasErrors = true
                    }
                }).catch(err => {
                    this.error = err
                    this.hasErrors = true
                })
            }
        }
    }


</script>

<template>
    <div class="login-page">
        <header>
            <h3>STAR<span>GAZER</span></h3>
            <h4>Login</h4>
        </header>
      <main class="form-group">
        <input type="text" v-model="email" placeholder="Email" :class="(emailError) ? 'err' : ''"/>
        <input type="password" v-model="password" placeholder="Password" :class="(passError) ? 'err' : ''"/>
        <button class = "login-btn" @click="login">Log in</button>
        <div class="error_msg" v-if="hasErrors">
                {{error}}
        </div>
      </main>
      <footer>
        <p>
            Don't have an account? <router-link class="link" to="/register">Sign up</router-link>.
        </p>
      </footer>
    </div>
</template>

<script>
    export default{
        name: "loginPage",
        data() {
            return {
                email:"",
                password:"",
                hasErrors: false,
                emailError: false,
                passError: false,
                error:""
            }
        },

        methods:{
            login() {
                let api_url = this.$store.state.api_url
                if(this.email == '' || this.password == '') return alert('Please fill in all fields')
                this.$http.post(api_url + 'user/login', {
                    email: this.email,
                    password: this.password
                }).then(response => {
                    if(response.data.auth){
                        this.$store.commit("login", response.data.token);
                    }else{

                        if(response.data.emailError){
                            this.emailError = true
                        }else{
                            this.emailError = false
                        }

                        if(response.data.passError){
                            this.passError = true
                        }
                        else{
                            this.passError = false
                        }

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

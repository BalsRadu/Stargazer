<template>
    <div class="login-page">
        <header>
            <h3>STAR<span>GAZER</span></h3>
            <h4>Admin Login</h4>
            <img src="@/assets/images/admin.jpg" :class="$route.path !== '/admin/login' ? 'reg-admin-icon' : 'log-admin-icon'"/>
        </header>
      <main class="form-group">
        <input type="text" v-model="email" placeholder="Email" :class="(emailError) ? 'err' : ''"/>
        <input type="password" v-model="password" placeholder="Password" :class="(passError) ? 'err' : ''"/>
        <input type="text" v-model="token" placeholder="Token" :class="(tokenError) ? 'err' : ''"/>
        <button class = "login-btn" @click="login">Log in</button>
        <div class="error_msg" v-if="hasErrors">
                {{error}}
        </div>
      </main>
      <footer>
        <p>
            Don't have an account? <router-link class="link" to="/admin/register">Sign up</router-link>.
        </p>
      </footer>
    </div>
</template>

<script>
    import { useToast } from "vue-toastification";
    export default{
        name: "adminLoginPage",
        setup() {
          const toast = useToast();
          return { toast }
        },
        data() {
            return {
                email:"",
                password:"",
                token: "",
                hasErrors: false,
                emailError: false,
                passError: false,
                tokenError: false,
                error:""
            }
        },

        methods:{
            login() {
                let api_url = this.$store.state.api_url
                if(this.email == '' || this.password == '') {
                    this.toast.info("Please fill all fields")
                }
                this.$http.post(api_url + 'admin/login', {
                    email: this.email,
                    password: this.password,
                    token: this.token
                }).then(response => {
                    if(response.data.auth){
                        this.$store.commit("adminLogin", response.data.jwtToken);
                    }else{
                        this.emailError = (response.data.emailError) ? true : false
                        this.passError = (response.data.passError) ? true : false
                        this.tokenError = (response.data.tokenError) ? true : false
                        this.hasErrors = true
                        this.error = response.data.msg
                    }
                }).catch(err => {
                    this.error = err
                    this.hasErrors = true
                })
            }
        }
    }

</script>


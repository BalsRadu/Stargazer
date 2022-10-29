<template>
    <div class="register-page">
        <header>
            <h3>STAR<span>GAZER</span></h3>
            <h4>Admin Register</h4>
            <img src="@/assets/images/admin.jpg" :class="$route.path !== '/admin/login' ? 'reg-admin-icon' : 'log-admin-icon'"/>

        </header>
            <main class="form-group">
                <input type="text" v-model="adminName" placeholder="Username"/>
                <input type="text" v-model="email" placeholder="Email" :class="(hasErrors) ? 'err' : ''"/>
                <input type="password" v-model="password" placeholder="Password"/>
                <button class = "register-btn" @click="register">Register</button>
                <div class="error_msg" v-if="hasErrors">
                    {{error}}
                </div>
            </main>
        <footer>
            <p>
                Already have an account? <router-link class="link" to="/admin/login">Log in here!</router-link>
            </p>
        </footer>
    </div>
</template>

<script>
    import { useToast } from "vue-toastification";
    export default{
        name: "adminRegisterPage",
        setup() {
          const toast = useToast();
          return { toast }
        },
        data() {
            return{
                adminName: "",
                email: "",
                password: "",
                hasErrors: false,
                error: "",
                token: this.generateToken(),
            }
        },
        methods:{
            register() {
                let api_url = this.$store.state.api_url
                if(
                this.adminName == "" || 
                this.email == ""  || 
                this.password == ""
                ) {
                    this.toast.info("Please fill all fields")
                }
                this.$http.post(api_url + 'admin/register', {
                    adminName: this.adminName,
                    email: this.email,
                    password: this.password,
                    token : this.token
                }).then(response => {
                    if(response.data.auth){
                        localStorage.setItem("adminJwt", response.data.jwtToken)
                        let message = "Your admin token is: " + this.token;
                        this.toast.info(message,{
                            closeOnClick: false,
                        });
                        this.$router.push("/admin/login")
                    }else{
                        this.error = response.data.msg
                        this.hasErrors = true
                    }
                }).catch(err => {
                    this.error = err
                    this.hasErrors = true
                    this.token = this.generateToken()
                })
            },
            generateToken() {
                var length = 10;
                var result           = '';
                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < length; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            },
        }
    }


</script>

<style lang="scss">

    .log-admin-icon{
        width: 64px;
        height: 64px;
        position:  absolute;
        left: 80%;
        bottom: 90%;

    }
    .reg-admin-icon{
        width: 64px;
        height: 64px;
        position:  absolute;
        left: 80%;
        bottom: 87%;
    }
</style>
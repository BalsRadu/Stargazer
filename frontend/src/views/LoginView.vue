<template>
    <div class="login-page">
        <header>
            <h3>STAR<span>GAZER</span></h3>
            <h4>Login</h4>
        </header>
      <main class="form-group">
        <input type="text" v-model="email" placeholder="Email"/>
        <input type="text" v-model="password" placeholder="Password"/>
        <button class = "login-btn">Log in</button>
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
                password:""
            }
        }
    }

</script>

<style lang="scss" scoped>
.login-page {

    display: flex;
    flex-direction: column;
    height: 100vh;
    box-sizing: border-box;

    header{
        h3 {
            color: white;
            font-size: 28px;
            text-align: center;
            font-weight: 900;
            margin: 0;
            span{
                font-weight: 300;
            }
        }
        h4{
            color: #ccc;
            font-size: 24px;
            text-align: center;
            font-weight: 300;
            margin: 0;
            padding: 0;
            }
    }
    .form-group{
        flex: 1;
        display: flex;
        justify-content: flex-start;
        flex-flow: column;
        padding: 25px;

        input {
            width: 100%;
            height: 30px;
            border: 1px solid #000;
            margin-bottom: 15px;
            text-indent: 5px;
            background: #ddd;
            outline: none;

            &:focus{
                border: 1px solid #fff;
            }
        }
        button {
            width: 100%;
            height: 30px;
            background: #9F4C93;
            appearance: none;
            border: none;
            outline: none;
            border-radius: 8px;

            color:  #ddd;
            font-size: 18px;
            font-weight: 700;
        }
    }
    footer {

        width: calc(100% -50px);
        height: 15px;
        background-color: #303030;
        box-shadow: 0px -1px 3px rgba(255,255,255,0.2);
        padding: 10px 25px;
        display: flex;
        justify-content: center;
        align-items: center;

        color:  #888;

        p{
            color: #aaa;
            font-size: 16px;
            margin: 0px;
            padding: 0px;
            text-align: center;
        } 

        .link {
            color: #9F4C93;
            text-decoration: none;
            font-weight: 700;
        }

    }
}
</style>
<template>
    <main class="view global">
        <section class="found-user">
            <div class="user-content">
                <div class="found-user-text">Found users:</div>
                <div v-for="names in users" :key=names._id>
                    <span class="link" @click="gotoProfile(names[0])"> 
                         <img class="profile-picture" src="https://place-hold.it/50" />
                         <span class="profile-name">{{ names[1] }}</span>
                    </span>
                </div>
            </div>
        </section>
        <div class="error_msg" v-if="hasErrors">
                {{error}}
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            users: [],
            hasErrors: false,
            error: ""
        }
    },
    mounted() {
        this.getUsers();
    },
    methods: {
        getUsers() {
            let api_url = this.$store.state.api_url;
            this.$http.post(api_url + 'global/getusers')
            .then(response => {
                if(response.data.success && response.data.users.length > 0) {
                    this.hasErrors = false
                    this.currentUserId = response.data.currId
                    for(var i = 0; i < response.data.users.length; i++) {
                        this.users.push([response.data.users[i]._id, response.data.users[i].username])
                    }
                } else {
                    this.error = response.data.msg
                    this.hasErrors = true
                }
            })
        },
        gotoProfile(id) {
            this.$router.push('foundprofile/' + id)    
        }
    }
}
</script>

<style lang="scss" scoped>

    .found-user-text{
        color: white;
    }
    .error_msg{
        color: white;
    }
    .show {
    display:block;
    }
    .hide {
        display:none;
    }
    .searchBar {
        border: 1px solid #ddd;
        margin-bottom: 15px;
        width:90%;
        height: 30px;  
        text-indent: 5px;
        background-color: #eee;   
        outline: none;
        border-radius: 8px;
        
        &.err {
            background: rgba(200,0,0,0.4);
            border: 1px solid #AF1E2D;
        }
        &:focus {
            border: 1px solid #aaa;
        }       
    }
    .icon {
        position:relative;
        top: 5px;
        left: 10px;
        font-size:26px;
        color: white;
        padding-left:5px;
        margin-top:10px;
        z-index: 0;
        &:hover {
            transition: 0.5s; 
            color: #42b883;
        }
    }
    .link {
        text-decoration: none;
        color: #35495e;
        font-weight: 600;
        cursor: pointer;
        padding-bottom: 5px;
        display:block;
        .profile-picture {
            border-radius: 50%;
            box-shadow: 0 0 15px #35495e;
        }
        .profile-name {
            position: relative;
            top: -20px;
            left: 15px;
        }
    }
     
</style>
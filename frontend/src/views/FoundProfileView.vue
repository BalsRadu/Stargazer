<template>
    <main class="view profile">

        <section class="profile-head">
            <div class="profile-details-name">
                <div class="user-name">
                    <img class="profile-picture" src="https://place-hold.it/50" />
                    <span>{{ display_name }}</span>
                </div>
                <div class="user-description">
                    <p>
                      this is hardcoded test  
                    </p>
                </div>
            </div>

            <div class="profile-details-numerics">
                <div class="post-count">
                    <span>{{ post_count }}</span> <br>
                    POSTS
                </div>

                <div class="follower-count">
                    <span>{{followers_count}}</span> <br>
                    FOLLOWERS
                </div>

                <div class="following-count">
                    <span>{{following_count}}</span> <br>
                    FOLLOWING
                </div>
                
            </div>

            <div class="follow-profile-sec">
                <span class="follow-profile" @click="follow_user">
                    Follow
                </span>
                <span class="unfollow-profile" @click="unfollow_user">
                    Unfollow
                </span>
            </div>
            
        </section>

        <section class="posts">
            <div class="post" v-for="post in posts" :key="post._id">
                <img :src="post.image" :alt="post.desc" class="post-image">
            </div>
        </section>

    </main>
</template>

<script>
export default {
    name: 'profilePage',
    data() {
        return {
            display_name: '',
            posts: [],
            post_count: '',
            followers_count: 0,
            following_count: 0,
            logged_profile: {
                followers_count: 0,
                following_count: 0,
            }
        }
    },
    methods: {
        getSearchedProfile() {
            //todo get req params
            this.$http.post(this.$store.state.api_url + 'user/getsearchedprofile',{
                user_id: this.$route.params.id
            })
            .then(({ data }) => {
                    this.display_name = data.details.display_name;
                    this.posts = data.details.posts;
                    this.post_count = this.posts.length;
                    this.followers_count = data.details.followers_count;
                    this.following_count = data.details.following_count;
                });
        },
        getProfile() {
            this.$http.post(this.$store.state.api_url + 'user/getprofile')
                .then(({ data }) => {
                    this.logged_profile.followers_count = data.details.followers_count;
                    this.logged_profile.following_count = data.details.following_count;

                });
        },
        goto(path) {
            this.$router.push(path)
        },
        follow_user() {
            this.followers_count ++
            this.logged_profile.following_count ++
            this.$http.post(this.$store.state.api_url + 'user/follow',{
                user_id: this.$route.params.id,
                auth_token: localStorage.getItem("jwt"),
                followers_count: this.followers_count,
                following_count: this.logged_profile.following_count
                
            })
            .then(({ data }) => {
                    console.log(data);
                });
        },
        unfollow_user() {
            this.followers_count --
            this.logged_profile.following_count --
            this.$http.post(this.$store.state.api_url + 'user/unfollow',{
                user_id: this.$route.params.id,
                auth_token: localStorage.getItem("jwt"),
                followers_count: this.followers_count,
                following_count: this.logged_profile.following_count
            })
            .then(({ data }) => {
                    console.log(data);
                });
        }
    },
    beforeMount() {
        this.getSearchedProfile()
        this.getProfile()
    }
}
</script>

<style lang="scss" scoped>
    .profile {
        display: flex;
        flex-direction: column;
        .profile-head {
            background: white;
            padding: 15px;
            box-sizing: border-box;
            font-size:14px;
            .profile-details-name {
                float:left;
                .user-name {
                    font-weight:700;
                    .profile-picture {
                        border-radius: 50%;
                        box-shadow: 0 0 15px #35495e;
                    }
                    span {
                        position: relative;
                        top: -20px;
                        right: -10px;
                    }
                }
                .user-description {
                    font-size:12px;
                }
                &::after {
                    clear:both;
                }
            }
            .profile-details-numerics {
                position:relative;
                right:0;
                display:block;
                text-align: center;
                height: 35px;
                float:right;
                color: #9b9b9b;
                &::after {
                    clear:both;
                }
                span {
                    color: #000;
                    font-weight:700;
                }
                .post-count, .follower-count, .following-count {
                    float: left;
                    padding-right: 15px;
                    &::after {
                        clear:both;
                    }
                }
            }
            .follow-profile-sec {
                position: absolute;;
                right:10%;
                top:100px;
                display:block;
                text-align: center;
                height: 35px;
                float:right;
                &::after {
                    clear:both;
                }
                .follow-profile, .unfollow-profile {
                    position:relative;
                    border: 1px solid #9b9b9b;
                    padding-left: 25px;
                    padding-right:25px;
                    margin-right:15px;
                    cursor: pointer;
                }
            }
        }
        .posts {
            display:grid;
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: min-content;
            grid-gap: 5px;
            .post {
                margin:0;
                padding:0;
                .post-image {
                    width:100%;
                    display:block;
                    border-radius: 6px;
                    &:hover {
                        transition: ease .5s;
                        border-radius: 12px;
                    }
                }
                
            }
        }
    }
</style>
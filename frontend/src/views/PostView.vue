<template>
    <main class="view post">
        <section class="parameters">
            <div>Prompt</div>
            <input type="text" v-model="prompt" placeholder="Plese enter a prompt"/>
            <div>Image Height: {{ height }}</div>
            <vue-slider v-model="height" :min="256" :max="1024"/>
            <div>Image Width: {{ width }}</div>
            <vue-slider v-model="width" :min="256" :max="1024"/>
            <div>Number of inference steps: {{ numInferenceSteps }}</div>
            <vue-slider v-model="numInferenceSteps" :min="10" :max="100"/>
            <div>Guidance scale: {{ guidance_scale }}</div>
            <vue-slider v-model="guidance_scale" :min="5" :max="10"/>
            <div class="post-btns">
                <button class = "create-btn" @click="createImage" v-if="!generated">
                    <i class="material-icons icn-lg">auto_fix_high</i>
                </button>
                <button class = "upload-btn" @click="uploadImage" v-if="generated">
                    <i class="material-icons icn-lg">delete</i>
                </button>
                <button class = "cancel-btn" @click="cancel" v-if="generated">
                    <i class="material-icons  icn-lg">cloud_upload</i>
                </button>
            </div>
        </section>
        
        <section :class="(generated) ? 'show' : 'hide'">
            <canvas ref="canvas" id="canvas"></canvas>
            <div class="field-group">
                <label for="desc">Description: </label>
                <input type="text" id="desc" name="desc" v-model="desc" class="input-field" />
            </div>
        </section>
        
        
    </main>
</template>

<script>
    import VueSlider from 'vue-slider-component';
    import 'vue-slider-component/theme/antd.css'


    export default {
        components: {
            VueSlider
        },
        data () {
            return {
                prompt: "",
                height: 512,
                width: 512,
                numInferenceSteps: 50,
                guidance_scale: 7.5,
                canvas: {},
                imgSrc: "https://www.google.com/search?q=old+guy+stock+image&tbm=isch&ved=2ahUKEwjQnsmFw_b6AhVVi_0HHUVPD9wQ2-cCegQIABAA&oq=old+guy+sto&gs_lcp=CgNpbWcQARgAMgcIABCABBATMgcIABCABBATMgcIABCABBATMgcIABCABBATMgcIABCABBATMggIABAFEB4QEzIICAAQCBAeEBMyCAgAEAgQHhATMggIABAIEB4QEzIICAAQCBAeEBM6BwgAELEDEEM6BQgAEIAEOgQIIxAnOggIABCxAxCDAToICAAQgAQQsQM6BAgAEEM6CwgAEIAEELEDEIMBOgcIABCABBADOgQIABAeUOoFWOMfYJ8maAFwAHgAgAG0AogB_wySAQc2LjUuMS4xmAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=i0pVY5CtC9WW9u8PxZ694A0&bih=691&biw=768&rlz=1C1GCEU_enRO924RO924#imgrc=eaz19PG0E4RvaM",
                desc: "",
                generated: true,

            }
        },
        mounted () {

        if(this.$refs.canvas) {
            this.canvas = this.$refs.canvas;
        }
            
        },
        methods: {
            createImage () {
                let api_url = "http://3511-35-233-224-64.ngrok.io"
                if(this.prompt == "") {
                    return alert('Please enter a prompt')
                }
                this.$http.post(api_url + '/generate', {
                    prompt: this.prompt,
                    height: 512,
                    width: 512,
                    num_inference_steps: this.numInferenceSteps,
                    guidance_scale: this.guidance_scale
                },{
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    responseType: 'blob',
                }).then(response => {
                    let reader = new FileReader();
                    reader.readAsDataURL(response.data); 
                    reader.onload = () => {
                        const image = new Image();
                        image.src = reader.result;
                        this.canvas.width = this.width;
                        this.canvas.height = this.height;
                        image.onload = () => {
                            this.canvas.getContext("2d").drawImage(image, 0, 0, this.width, this.height)
                            this.imgSrc = this.canvas.toDataURL("image/png");
                            this.generated = true;           
                        };
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            cancel () {
                this.generated = false; 
            },
            uploadImage () {
                let api_url = this.$store.state.api_url;


                this.$http.post(api_url + "post/newpost", {
                    auth_token: localStorage.getItem("jwt"),
                    image: this.imgSrc,
                    desc: this.desc  
                }).then(() => {
                    this.generated = false;
                    this.imgSrc = "";
                    this.desc = "";

                }).catch(err => {
                    console.log(err)
                })
            }




           
    }
}

</script>


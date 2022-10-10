<template>
  <router-view/>
</template>

<style lang="scss">
  body{
    margin: 0;
    padding: 0;
    background: #212121;
    font-family: "Roboto",Helvetica, sans-serif;
  }

#app {
  width: 100vh;
  min-height: 100vh;
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

            &.err {
                border: 3px solid #AF1E2D;
                background-color: #f6a494;
                &:focus{
                  border: 3px solid #AF1E2D;
            }
            }

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
        .error_msg{
            margin: 15px 0px;
            padding: 10px;
            color: white;
            background-color: rgba(255, 0, 0, 0.8);
            font-weight: 700;
            border-radius: 8px;
        }
    }
</style>
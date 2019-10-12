<template>
    <div class="main-container">
        <div class="card-container">
            <div class="logo-wrapper">
                <div class="logo-title">system name</div>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    name: "index"
  }
</script>

<style lang="less">
    .main-container {
        background-color: #F2F3F5;
        height: 100vh;
        position: relative;
        .card-container {
            text-align: center;
            width: 368px;
            height: 340px;
            background-color: transparent;
            border-radius: 4px;
            margin: 0 auto;
            top: 110px;
            position: relative;
            .logo-wrapper {
                width: 338px;
                height: 78px;
                margin: 0 auto 40px auto;
                .logo-title{
                    font-size: 32px;
                    letter-spacing: 2px;
                }
            }
        }
    }
</style>

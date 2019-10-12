<template>
    <div class="b-b">
        <a-form>
            <h3 style="line-height:39px;">
                <a-row type="flex" justify="space-between">
                    <a-col>
                        <strong style="font-family: PingFangSC-Medium;color: rgba(0,0,0,0.85);">
                            <slot name="left"></slot>
                        </strong>
                    </a-col>
                    <a-col style="float:right;color:rgba(0,0,0,0.65);line-height:22px;text-align:center">
                        <slot name="right"></slot>
                    </a-col>
                </a-row>
            </h3>
        </a-form>
    </div>
</template>

<script>
  export default {
    name: "ccCardHeader"
  }
</script>

<style scoped>

</style>

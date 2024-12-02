<template>
    <div v-if="showProgress"  class="flex justify-end text-xs font-semibold mr-2 mb-1 ">
      {{ progress }} %
    </div>
  <div class="progressbar">
    <div class="progressbar__bar" :class="color" :style="{ width: progress + '%' }">
    </div>
  </div>


</template>

<script>
  export default {
    props: {
      progress: {
        type: Number,
        required: true,
        validator: (value) => value >= 0 && value <= 100,
      },

      color: {
        type: String,
        default: "bg-blue-500"
      },

      showProgress: {
        type: Boolean,
        default: false
      }
    
    },

    computed:{
        progressInHours() {
          return (this.progress / 200) * 100;
        }

      }
  };
</script>

<style scoped>
.progressbar {
  @apply bg-gray-200;

  width: 100%;
  height: 8px;

  border-radius: 5px;
  overflow: hidden;
}

.progressbar__bar {

  height: 100%;
  transition: width 0.3s;
}
</style>

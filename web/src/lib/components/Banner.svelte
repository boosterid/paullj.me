<script lang="ts">
  export let description: string = null;
</script>

<div class="flex flex-row">
  <div class="flex-none w-16 h-16 rounded-full bg-gradient-to-br from-green-600 to-green-900">
  </div>
  <div class="flex-1 ml-4 text-sm font-light sm:text-base">
    {description}
  </div>
</div>

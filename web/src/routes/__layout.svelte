<script lang="ts">
  import 'virtual:windi.css';
  import '../app.css'

  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";

</script>

<div class="flex flex-col max-w-screen-md min-h-screen px-4 py-2 mx-auto">
  <div class="flex-shrink-0 mt-6">
    <Header></Header>
  </div>

  <main class="flex-grow pt-4 sm:pt-16">
    <slot></slot>
  </main>

  <div class="flex-shrink-0">
    <Footer></Footer>
  </div>
</div>



<template>
  <nav class="p-2">
    <router-link to="/" class="flex items-center gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clip-rule="evenodd" />
      </svg>
      <span class="text-xl">Smart Start</span>
    </router-link>
  </nav>
  <router-view />
</template>

<style>
  body {
    background-color: theme("colors.emerald.900");
    color: white;
  }

  #app > div {
    max-width: 72rem;
    margin-left: auto !important;
    margin-right: auto !important;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
  }

  .router-link-exact-active {
    color: theme("colors.amber.500")
  }
</style>

<script lang="ts">
  const openLink = () => {
    chrome.tabs.create({ url: "https://twitter.com/jlwhoo7" });
  };
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Degen Extension</h1>
  <p>
    Build by <a href="https://twitter.com/jlwhoo7" on:click={openLink}>@superoo7</a>
  </p>
</main>

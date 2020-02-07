<script>
  export let text
</script>

<p class="tooltip">
  <slot></slot>
  <span class="tooltip-text">{@html text}</span>
</p>

<style>
  .tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
  }

  .tooltip .tooltip-text {
    visibility: hidden;

    font-size: 0.8em;
    max-width: 300px;
    padding: 3px 6px;
    margin-left: 2px;
    color: #fff;
    text-align: center;
    background-color: #000;
    border-radius: 4px;

    /* Position the tooltip */
    position: absolute;
    z-index: 1;
  }

  .tooltip:hover .tooltip-text {
    visibility: visible;
  }
</style>

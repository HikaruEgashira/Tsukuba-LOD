<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>made</strong> by
        <a href="https://egahika.dev">Hikaru Egashira</a>. The source code is
        licensed
        <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The
        website content is licensed
        <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
          >CC BY NC SA 4.0</a
        >.
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Index extends Vue {}
</script>

<style>
.footer {
  width: 100vw;
}
</style>

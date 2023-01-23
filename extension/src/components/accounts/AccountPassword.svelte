<script lang="ts">
import { equals, length } from 'ramda';

import { createAccountStore, passwordsMatch } from '$src/routes/accounts/store';

// check the verified pass
let repeatedPassword: string;
let repeatStatusCssClass = '';

function verifyPasswordLength() {
  if (length($createAccountStore.password) < 6) {
    return;
  } else {
    repeatedPassword = undefined;
    repeatStatusCssClass = '';
    passwordsMatch.set(false);
  }
}

function verifyPasswords() {
  if (length(repeatedPassword) < 6) {
    // notificationsStore.add('Password too short', 'error');
    return;
  }
  if (!equals(repeatedPassword, $createAccountStore.password)) {
    repeatStatusCssClass = 'input-error';
  } else {
    repeatStatusCssClass = 'input-success';
    passwordsMatch.set(true);
  }
}
</script>

<div class="form-control w-full gap-2">
  <label class="label" for="password">
    <span class="label-text">Minimum length is 6 characters</span>
  </label>
  <input
    bind:value="{$createAccountStore.password}"
    required
    on:input="{verifyPasswordLength}"
    class="input input-bordered w-full"
    placeholder="Password"
    id="password"
    name="password"
    autocomplete="new-password"
    type="password"
  />
  <input
    bind:value="{repeatedPassword}"
    on:input="{verifyPasswords}"
    required
    class="input input-bordered w-full {repeatStatusCssClass}"
    placeholder="Repeat Password"
    id="repeat_password"
    name="repeat_password"
    autocomplete="new-password"
    type="password"
  />
</div>

<script lang="ts">
import { checkingVerification, domainVerificationStore } from '$src/appStore';
import { chrome } from '$src/utils/utils';

import FrostBox from '../FrostBox.svelte';

let badgeCss = 'badge-info';
let domainName = '';
let tooltipForStatus = '';

$: {
  if (!$checkingVerification) {
    if ($domainVerificationStore) {
      badgeCss = $domainVerificationStore.badgeCss;
      tooltipForStatus = $domainVerificationStore.tooltipForStatus;
      domainName = $domainVerificationStore.domain[0];

      if ($domainVerificationStore.verified) {
        chrome.action.setIcon({
          tabId: $domainVerificationStore.activeTab.id,
          // do not import the asset, you already know where it will be
          path: '/assets/gradient_logo/icon32.png'
        });
      }
    }
  }
}
</script>

<a href="/verification" class="tooltip tooltip-bottom" data-tip="{tooltipForStatus}">
  <div class="indicator">
    <span
      class="indicator-item badge badge-sm p-2 {$checkingVerification ? 'animate-pulse ' : ''} {badgeCss}"
    >
      {$domainVerificationStore.verified ? 'Verified' : 'Not verified'}
    </span>

    <FrostBox class="grid w-64 h-8 bg-base-100 place-items-center rounded-lg">
      <p class="truncate text-white">{domainName}</p>
    </FrostBox>
    <!-- <div class="grid w-64 h-8 bg-base-100 place-items-center rounded-lg">
      <p class="truncate">{domainName}</p>
    </div> -->
  </div>
</a>

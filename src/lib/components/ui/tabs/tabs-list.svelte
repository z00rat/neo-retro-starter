<script lang="ts">
  import { cn } from '#lib/utils.ts';
  import { Tabs as TabsPrimitive } from 'bits-ui';

  let { ref = $bindable(null), class: className, ...restProps }: TabsPrimitive.ListProps = $props();
</script>

<TabsPrimitive.List
  bind:ref
  data-slot="tabs-list"
  class={cn(
    'flex h-12 w-full items-stretch rounded pr-[4px] pb-[4px] *:relative *:focus-visible:z-20 [&>*:not(:first-child)]:-ml-[2px] [&>*:not(:first-child)]:rounded-s-none [&>*:not(:last-child)]:rounded-e-none',
    className,
  )}
  {...restProps}
/>

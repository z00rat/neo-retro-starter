<script lang="ts">
  import { CalendarDate, getLocalTimeZone, today, type DateValue } from '@internationalized/date';
  import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
  import Boxes from '@lucide/svelte/icons/boxes';
  import Check from '@lucide/svelte/icons/check';
  import CircleDot from '@lucide/svelte/icons/circle-dot';
  import Layers3 from '@lucide/svelte/icons/layers-3';
  import LayoutTemplate from '@lucide/svelte/icons/layout-template';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import * as Accordion from '#lib/components/ui/accordion/index.js';
  import * as AlertDialog from '#lib/components/ui/alert-dialog/index.js';
  import * as Alert from '#lib/components/ui/alert/index.js';
  import * as Avatar from '#lib/components/ui/avatar/index.js';
  import { BackgroundPattern } from '#lib/components/ui/background-pattern/index.js';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { Button } from '#lib/components/ui/button/index.js';
  import * as Calendar from '#lib/components/ui/calendar/index.js';
  import * as Card from '#lib/components/ui/card/index.js';
  import * as Carousel from '#lib/components/ui/carousel/index.js';
  import ChartTooltip from '#lib/components/ui/chart/chart-tooltip.svelte';
  import * as Chart from '#lib/components/ui/chart/index.js';
  import { Checkbox } from '#lib/components/ui/checkbox/index.js';
  import CodeBlock from '#lib/components/ui/code-block/code-block.svelte';
  import * as Collapsible from '#lib/components/ui/collapsible/index.js';
  import * as Dialog from '#lib/components/ui/dialog/index.js';
  import * as Field from '#lib/components/ui/field/index.js';
  import * as HoverCard from '#lib/components/ui/hover-card/index.js';
  import * as ImageComponent from '#lib/components/ui/image/index.js';
  import * as InputGroup from '#lib/components/ui/input-group/index.js';
  import * as InputOTP from '#lib/components/ui/input-otp/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import * as Item from '#lib/components/ui/item/index.js';
  import Media from '#lib/components/ui/media/media.svelte';
  import * as NavigationMenu from '#lib/components/ui/navigation-menu/index.js';
  import * as Popover from '#lib/components/ui/popover/index.js';
  import { Progress } from '#lib/components/ui/progress/index.js';
  import QrCode from '#lib/components/ui/qrcode/qrcode.svelte';
  import * as RadioGroup from '#lib/components/ui/radio-group/index.js';
  import * as RangeCalendar from '#lib/components/ui/range-calendar/index.js';
  import * as Select from '#lib/components/ui/select/index.js';
  import { Separator } from '#lib/components/ui/separator/index.js';
  import * as Sheet from '#lib/components/ui/sheet/index.js';
  import { Slider } from '#lib/components/ui/slider/index.js';
  import { Spinner } from '#lib/components/ui/spinner/index.js';
  import { ThemePicker } from '#lib/components/ui/style/index.js';
  import { applyTheme, Themes } from '#lib/components/ui/style/themes.ts';
  import { Switch } from '#lib/components/ui/switch/index.js';
  import * as Table from '#lib/components/ui/table/index.js';
  import * as Tabs from '#lib/components/ui/tabs/index.js';
  import { Textarea } from '#lib/components/ui/textarea/index.js';
  import * as ToggleGroup from '#lib/components/ui/toggle-group/index.js';
  import { Toggle } from '#lib/components/ui/toggle/index.js';
  import * as Tooltip from '#lib/components/ui/tooltip/index.js';
  import { neoretroColors } from '#lib/utils.js';
  import { BarChart } from 'layerchart';
  import { theme } from 'mode-watcher';

  let themeInterval: ReturnType<typeof setInterval> | undefined;

  function selectRandomTheme() {
    const choices = Themes.filter((item) => item.id !== theme.current);
    if (choices.length === 0) return;

    applyTheme(choices[Math.floor(Math.random() * choices.length)].id);
  }

  function stopThemeShuffle() {
    if (themeInterval !== undefined) clearInterval(themeInterval);
    themeInterval = undefined;
  }

  function handleThemeShortcut(event: KeyboardEvent) {
    if (event.key.toLowerCase() !== 't' || !event.altKey || event.ctrlKey || event.metaKey || event.repeat) return;
    if (
      event.target instanceof HTMLElement &&
      (event.target.isContentEditable || event.target.closest('input, textarea, select, [role="textbox"]'))
    )
      return;

    event.preventDefault();
    selectRandomTheme();
    themeInterval = setInterval(selectRandomTheme, 500);
  }

  function handleThemeShortcutRelease(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 't') stopThemeShuffle();
  }

  const packages = [
    { name: 'Button', group: 'Actions', status: 'Stable', color: 'green', updated: 'Today' },
    { name: 'Card', group: 'Content', status: 'Stable', color: 'green', updated: 'Today' },
    { name: 'Tabs', group: 'Navigation', status: 'Review', color: 'yellow', updated: 'Yesterday' },
    { name: 'Data table', group: 'Data', status: 'In progress', color: 'cyan', updated: 'Oct 24' },
  ] as const;

  let notificationsEnabled = $state(true);
  let compactMode = $state(false);
  let previewLabels = $state(true);
  let keyboardHints = $state(false);
  let workspacePlan = $state('studio');
  let accentStrength = $state([65]);
  let selectedDate = $state<DateValue | undefined>(today(getLocalTimeZone()));
  let selectedRange = $state({ start: new CalendarDate(2026, 10, 20), end: new CalendarDate(2026, 10, 24) });
  let otp = $state('');
  let frequency = $state('weekly');
  let toggleValue = $state('cards');
  let range = $state([30, 70]);
  const chartData = [
    { month: 'May', installs: 18 },
    { month: 'Jun', installs: 27 },
    { month: 'Jul', installs: 23 },
    { month: 'Aug', installs: 38 },
    { month: 'Sep', installs: 32 },
  ];
  const catPreview = {
    id: 'unsplash-tabby-cat',
    name: 'Brown tabby cat sitting on concrete',
    description: 'Photo by Emre on Unsplash',
    thumbhash: '3fcFDYISSXgll4dvh8hajihwiFBX',
    width: 3000,
    height: 2000,
    aspectRatio: 1.5,
    urls: {
      original: {
        url: 'https://images.unsplash.com/photo-1490481920145-fc78891bbb99?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
        size: 567474,
      },
    },
  };
</script>

<svelte:window onkeydown={handleThemeShortcut} onkeyup={handleThemeShortcutRelease} onblur={stopThemeShuffle} />

<svelte:head>
  <title>Neo-Retro Studio — Component dashboard</title>
  <meta name="description" content="A sample component dashboard built with the Neo-Retro design system." />
</svelte:head>

{#snippet installsTooltip()}
  <ChartTooltip color="white" />
{/snippet}

<main class="bg-background text-foreground min-h-screen">
  <header class="neoretro-border-b bg-background">
    <div class="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
      <a href="#overview" class="font-black tracking-tight" aria-label="Neo-Retro Studio home">
        <Card.Root color="magenta" class="flex-row items-center gap-3 p-2">
          <span class="neoretro-border neoretro-clr rounded p-2" data-color="yellow"
            ><LayoutTemplate class="size-5" /></span
          >
          <span>NEO / STUDIO</span>
        </Card.Root>
      </a>
      <NavigationMenu.Root color="white" class="absolute left-1/2 hidden max-w-none -translate-x-1/2 px-3 py-1 md:flex">
        <NavigationMenu.List aria-label="Main navigation" class="gap-5">
          <NavigationMenu.Item
            ><NavigationMenu.Link href="#overview" class="px-3 py-2 text-base font-bold">Overview</NavigationMenu.Link
            ></NavigationMenu.Item
          >
          <NavigationMenu.Item
            ><NavigationMenu.Link href="#components" class="px-3 py-2 text-base font-bold"
              >Components</NavigationMenu.Link
            ></NavigationMenu.Item
          >
          <NavigationMenu.Item
            ><NavigationMenu.Link href="#settings" class="px-3 py-2 text-base font-bold">Settings</NavigationMenu.Link
            ></NavigationMenu.Item
          >
        </NavigationMenu.List>
      </NavigationMenu.Root>
      <div class="ml-auto">
        <ThemePicker />
      </div>
    </div>
  </header>

  <section id="overview" data-color="blue" class="bg-clr relative isolate overflow-hidden py-10 sm:py-14">
    <BackgroundPattern pattern="cross" size={22} rotation={45} opacity={0.4} />
    <div class="relative z-10 mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[1.3fr_0.7fr] lg:px-8">
      <Card.Root color="cyan" class="items-start justify-center gap-5 p-6 sm:p-8">
        <Badge color="yellow"><Sparkles class="size-3" /> COMPONENT PLAYGROUND / 01</Badge>
        <h1 class="max-w-3xl text-4xl leading-[1.05] font-black tracking-tight sm:text-6xl">
          Build bold interfaces.<br />Keep the details sharp.
        </h1>
        <p class="max-w-xl text-base leading-7 sm:text-lg">
          A working canvas for the Neo-Retro component system: crisp edges, useful patterns, and a palette with plenty
          of personality.
        </p>
        <div class="flex flex-wrap gap-3">
          <Button color="magenta" href="#components">Explore components <ArrowUpRight /></Button>
          <Button color="white" href="https://neo-retro.zurat.dev/">Read the docs</Button>
        </div>
      </Card.Root>

      <Card.Root color="green" class="relative overflow-hidden p-5 sm:p-7">
        <Card.Header class="relative z-10 p-0">
          <div class="flex items-center justify-between">
            <Badge color="cyan">SPRINT 08</Badge>
            <span class="font-mono text-xs">OCT 28 — NOV 08</span>
          </div>
          <Card.Title class="mt-4 text-2xl">Launch checklist</Card.Title>
          <Card.Description>Ship the new component showcase.</Card.Description>
        </Card.Header>
        <Card.Content class="relative z-10 space-y-4 p-0">
          <div class="flex items-center justify-between text-sm font-bold">
            <span>Overall progress</span><span>72%</span>
          </div>
          <Progress value={72} indicatorColor="blue" trackColor="yellow" aria-label="Overall progress" />
          <Item.Root color="cyan" size="sm" class="p-3">
            <Item.Media color="green"><Check class="size-4" /></Item.Media>
            <Item.Content
              ><Item.Title>Visual system approved</Item.Title><Item.Description>Updated 2 hours ago</Item.Description
              ></Item.Content
            >
            <Item.Actions><Badge color="green">Done</Badge></Item.Actions>
          </Item.Root>
          <Item.Root color="yellow" size="sm" class="p-3">
            <Item.Media color="yellow"><CircleDot class="size-4" /></Item.Media>
            <Item.Content
              ><Item.Title>Responsive pass</Item.Title><Item.Description>2 tasks remaining</Item.Description
              ></Item.Content
            >
            <Item.Actions><Badge color="yellow">Active</Badge></Item.Actions>
          </Item.Root>
        </Card.Content>
      </Card.Root>
    </div>
  </section>

  <section data-color="red" class="bg-clr relative isolate overflow-hidden py-10" aria-labelledby="stats-heading">
    <BackgroundPattern pattern="dots" size={18} opacity={0.4} />
    <div class="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
      <Card.Root color="cyan" class="mb-5 flex-row items-end justify-between p-4">
        <div>
          <p class="font-mono text-xs font-bold tracking-widest">AT A GLANCE</p>
          <h2 id="stats-heading" class="mt-1 text-2xl font-black">Studio snapshot</h2>
        </div>
        <span class="hidden text-sm sm:block">Last synced just now</span>
      </Card.Root>
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card.Root color="cyan" class="p-5"
          ><Card.Header class="p-0"
            ><Card.Description>Available components</Card.Description><Card.Title class="text-4xl">48</Card.Title
            ></Card.Header
          ><Card.Footer class="p-0 text-sm font-bold"><Boxes class="size-4" /> Across 12 categories</Card.Footer
          ></Card.Root
        >
        <Card.Root color="yellow" class="p-5"
          ><Card.Header class="p-0"
            ><Card.Description>Weekly installs</Card.Description><Card.Title class="text-4xl">2.4k</Card.Title
            ></Card.Header
          ><Card.Footer class="p-0 text-sm font-bold"><ArrowUpRight class="size-4" /> Up 18% this week</Card.Footer
          ></Card.Root
        >
        <Card.Root color="magenta" class="p-5"
          ><Card.Header class="p-0"
            ><Card.Description>Open contributions</Card.Description><Card.Title class="text-4xl">07</Card.Title
            ></Card.Header
          ><Card.Footer class="p-0 text-sm font-bold"><Layers3 class="size-4" /> 3 ready to review</Card.Footer
          ></Card.Root
        >
        <Card.Root color="green" class="p-5"
          ><Card.Header class="p-0"
            ><Card.Description>Build health</Card.Description><Card.Title class="text-4xl">100%</Card.Title
            ></Card.Header
          ><Card.Footer class="p-0 text-sm font-bold"><Check class="size-4" /> All systems go</Card.Footer></Card.Root
        >
      </div>
    </div>
  </section>

  <section
    id="components"
    data-color="yellow"
    class="bg-clr text-on-clr relative isolate overflow-hidden py-10"
    aria-labelledby="components-heading"
  >
    <BackgroundPattern pattern="grid" size={24} opacity={0.4} />
    <div class="relative z-10 mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-[1.4fr_0.6fr] lg:px-8">
      <Card.Root color="cyan" class="p-5 sm:p-6">
        <Card.Header class="p-0">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p class="font-mono text-xs font-bold tracking-widest">LIBRARY / INVENTORY</p>
              <Card.Title id="components-heading" class="mt-1 text-2xl">Component status</Card.Title>
            </div>
            <Button color="magenta" size="sm">View all <ArrowUpRight /></Button>
          </div>
        </Card.Header>
        <Card.Content class="p-0">
          <Table.Root headerColor="blue" rowColor="white" class="min-w-130">
            <Table.Caption>Recent component activity</Table.Caption>
            <Table.Header
              ><Table.Row
                ><Table.Head>Component</Table.Head><Table.Head>Group</Table.Head><Table.Head>Status</Table.Head
                ><Table.Head class="text-right">Updated</Table.Head></Table.Row
              ></Table.Header
            >
            <Table.Body>
              {#each packages as component (component.name)}
                <Table.Row
                  ><Table.Cell class="font-bold">{component.name}</Table.Cell><Table.Cell>{component.group}</Table.Cell
                  ><Table.Cell><Badge color={component.color}>{component.status}</Badge></Table.Cell><Table.Cell
                    class="text-right font-mono text-xs">{component.updated}</Table.Cell
                  ></Table.Row
                >
              {/each}
            </Table.Body>
          </Table.Root>
        </Card.Content>
      </Card.Root>

      <Card.Root id="settings" color="blue" class="p-5 sm:p-6">
        <Card.Header class="p-0"
          ><p class="font-mono text-xs font-bold tracking-widest">QUICK SETUP</p>
          <Card.Title class="text-2xl">Your workspace</Card.Title><Card.Description
            >Pick up where you left off.</Card.Description
          ></Card.Header
        >
        <Card.Content class="p-0">
          <Tabs.Root value="overview" activeColor="yellow" inactiveColor="white">
            <Tabs.List
              ><Tabs.Trigger value="overview">Overview</Tabs.Trigger><Tabs.Trigger value="activity"
                >Activity</Tabs.Trigger
              ></Tabs.List
            >
            <Tabs.Content value="overview" class="pt-4">
              <Field.Field>
                <Field.Label for="workspace-name">Workspace name</Field.Label>
                <Input id="workspace-name" value="Neo-Retro Studio" />
                <Field.Description>Shown to collaborators in your project.</Field.Description>
              </Field.Field>
            </Tabs.Content>
            <Tabs.Content value="activity" class="pt-4">
              <Item.Root color="cyan" class="p-3"
                ><Item.Content
                  ><Item.Title>Theme tokens refreshed</Item.Title><Item.Description>Today at 10:42 AM</Item.Description
                  ></Item.Content
                ><Item.Actions><Badge color="green">Synced</Badge></Item.Actions></Item.Root
              >
              <p class="mt-3 text-sm">Your workspace is up to date with the latest palette.</p>
            </Tabs.Content>
          </Tabs.Root>
        </Card.Content>
        <Card.Footer class="justify-end p-0"><Button color="yellow">Save workspace</Button></Card.Footer>
      </Card.Root>
    </div>
  </section>

  <section data-color="green" class="bg-clr relative isolate overflow-hidden py-10" aria-labelledby="controls-heading">
    <BackgroundPattern pattern="waves" size={26} opacity={0.4} />
    <div class="relative z-10 mx-auto max-w-7xl space-y-6 px-5 lg:px-8">
      <Card.Root color="cyan" class="p-5 sm:p-6">
        <p class="font-mono text-xs font-bold tracking-widest">COMPONENTS / CONTROLS</p>
        <h2 id="controls-heading" class="mt-1 text-2xl font-black">Tune your workspace</h2>
        <p class="mt-1">A few more building blocks, shown with their interactive states.</p>
      </Card.Root>

      <div class="grid gap-6 lg:grid-cols-2">
        <Card.Root color="red" class="p-5">
          <Card.Header class="p-0"
            ><Card.Title>Preferences</Card.Title><Card.Description>Choose how the studio behaves.</Card.Description
            ></Card.Header
          >
          <Card.Content class="space-y-4 p-0">
            <div class="flex items-center justify-between gap-4">
              <label for="notifications" class="font-bold">Email updates</label>
              <Switch id="notifications" color="green" bind:checked={notificationsEnabled} aria-label="Email updates" />
            </div>
            <Separator />
            <fieldset class="space-y-3">
              <legend class="font-bold">Preview options</legend>
              <div class="flex items-center gap-3">
                <Checkbox id="compact-mode" color="yellow" bind:checked={compactMode} /><label for="compact-mode"
                  >Compact spacing</label
                >
              </div>
              <div class="flex items-center gap-3">
                <Checkbox id="preview-labels" color="yellow" bind:checked={previewLabels} /><label for="preview-labels"
                  >Show component labels</label
                >
              </div>
              <div class="flex items-center gap-3">
                <Checkbox id="keyboard-hints" color="yellow" bind:checked={keyboardHints} /><label for="keyboard-hints"
                  >Show keyboard hints</label
                >
              </div>
            </fieldset>
          </Card.Content>
        </Card.Root>

        <Card.Root color="magenta" class="p-5">
          <Card.Header class="p-0"
            ><Card.Title>Accent strength</Card.Title><Card.Description>Adjust the visual emphasis.</Card.Description
            ></Card.Header
          >
          <Card.Content class="space-y-4 p-0">
            <div class="flex items-center justify-between font-bold">
              <span>Intensity</span><span>{accentStrength[0]}%</span>
            </div>
            <Slider color="yellow" bind:value={accentStrength} aria-label="Accent strength" />
            <Alert.Root color="cyan">
              <Sparkles />
              <div>
                <Alert.Title>Looking good</Alert.Title><Alert.Description
                  >Your preview uses the current theme colors.</Alert.Description
                >
              </div>
            </Alert.Root>
          </Card.Content>
        </Card.Root>

        <Card.Root color="blue" class="p-5">
          <Card.Header class="p-0"
            ><Card.Title>Workspace plan</Card.Title><Card.Description>Choose a sample plan tier.</Card.Description
            ></Card.Header
          >
          <Card.Content class="p-0">
            <RadioGroup.Root bind:value={workspacePlan} color="yellow" aria-label="Workspace plan">
              <label class="flex items-center gap-3 rounded p-2"
                ><RadioGroup.Item value="solo" /><span
                  ><span class="block font-bold">Solo</span><span class="text-sm">For personal projects</span></span
                ></label
              >
              <label class="flex items-center gap-3 rounded p-2"
                ><RadioGroup.Item value="studio" /><span
                  ><span class="block font-bold">Studio</span><span class="text-sm">For small teams</span></span
                ></label
              >
              <label class="flex items-center gap-3 rounded p-2"
                ><RadioGroup.Item value="collective" /><span
                  ><span class="block font-bold">Collective</span><span class="text-sm">For larger groups</span></span
                ></label
              >
            </RadioGroup.Root>
          </Card.Content>
        </Card.Root>

        <Card.Root color="black" class="p-5">
          <Card.Header class="p-0"
            ><Card.Title>Build status</Card.Title><Card.Description>Components are ready to use.</Card.Description
            ></Card.Header
          >
          <Card.Content class="space-y-4 p-0">
            <Item.Root color="cyan" class="p-3"
              ><Item.Media color="cyan"><Check class="size-4" /></Item.Media><Item.Content
                ><Item.Title>Type check passed</Item.Title><Item.Description>All components healthy</Item.Description
                ></Item.Content
              ></Item.Root
            >
            <div class="flex items-center gap-3">
              <Spinner /><span class="text-sm font-bold">Preparing preview…</span>
            </div>
          </Card.Content>
        </Card.Root>
      </div>
    </div>
  </section>

  <section data-color="blue" class="bg-clr relative isolate overflow-hidden py-10" aria-labelledby="forms-heading">
    <BackgroundPattern pattern="diamonds" size={24} opacity={0.4} />
    <div class="relative z-10 mx-auto max-w-7xl space-y-6 px-5 lg:px-8">
      <Card.Root color="yellow" class="p-5">
        <p class="font-mono text-xs font-bold tracking-widest">COMPONENTS / CONTROLS & FORMS</p>
        <h2 id="forms-heading" class="mt-1 text-2xl font-black">More ways to shape an interface</h2>
      </Card.Root>

      <div class="grid gap-6 lg:grid-cols-2">
        <Card.Root color="cyan" class="p-5">
          <Card.Header class="p-0"
            ><Card.Title>Form controls</Card.Title><Card.Description
              >Inputs, selectors, and compact choices.</Card.Description
            ></Card.Header
          >
          <Card.Content class="space-y-5 p-0">
            <Field.Field>
              <Field.Label for="project-url">Project URL</Field.Label>
              <InputGroup.Root>
                <InputGroup.Addon>https://</InputGroup.Addon>
                <InputGroup.Input id="project-url" value="neo-retro.dev" />
                <InputGroup.Addon align="inline-end"><Badge color="green">Available</Badge></InputGroup.Addon>
              </InputGroup.Root>
            </Field.Field>
            <Field.Field>
              <Field.Label for="digest-frequency">Digest frequency</Field.Label>
              <Select.Root type="single" bind:value={frequency} color="magenta">
                <Select.Trigger id="digest-frequency"><span class="capitalize">{frequency}</span></Select.Trigger>
                <Select.Content>
                  <Select.Item value="daily">Daily</Select.Item>
                  <Select.Item value="weekly">Weekly</Select.Item>
                  <Select.Item value="monthly">Monthly</Select.Item>
                </Select.Content>
              </Select.Root>
            </Field.Field>
            <Field.Field>
              <Field.Label for="project-notes">Project notes</Field.Label>
              <Textarea id="project-notes" value="Keep the next release focused and easy to scan." rows={3} />
            </Field.Field>
            <Field.Field>
              <Field.Label>Verification code</Field.Label>
              <InputOTP.Root bind:value={otp} maxlength={4} color="blue" aria-label="Verification code">
                {#snippet children({ cells })}
                  <InputOTP.Group>
                    {#each cells as cell, index (index)}<InputOTP.Slot {cell} />{/each}
                  </InputOTP.Group>
                {/snippet}
              </InputOTP.Root>
            </Field.Field>
          </Card.Content>
        </Card.Root>

        <Card.Root color="red" class="p-5">
          <Card.Header class="p-0"
            ><Card.Title>View options</Card.Title><Card.Description
              >Switch between presentation styles.</Card.Description
            ></Card.Header
          >
          <Card.Content class="space-y-5 p-0">
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="font-bold">Pin this view</p>
                <p class="text-sm">Keep it at the top of your workspace.</p>
              </div>
              <Toggle color="yellow" aria-label="Pin this view" bind:pressed={compactMode}><Sparkles /></Toggle>
            </div>
            <Field.Field>
              <Field.Label>Layout</Field.Label>
              <ToggleGroup.Root type="single" bind:value={toggleValue} color="cyan" aria-label="Choose layout">
                <ToggleGroup.Item value="cards">Cards</ToggleGroup.Item>
                <ToggleGroup.Item value="list">List</ToggleGroup.Item>
                <ToggleGroup.Item value="table">Table</ToggleGroup.Item>
              </ToggleGroup.Root>
            </Field.Field>
            <Field.Field>
              <Field.Label>Visible range</Field.Label>
              <Slider color="magenta" bind:value={range} aria-label="Visible range" />
            </Field.Field>
            <p class="text-sm">Selected layout: <span class="font-bold capitalize">{toggleValue}</span></p>
          </Card.Content>
        </Card.Root>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <Card.Root color="magenta" class="items-center p-5">
          <Card.Header class="w-full p-0"
            ><Card.Title>Date picker</Card.Title><Card.Description>Choose a single date.</Card.Description></Card.Header
          >
          <Calendar.Root bind:value={selectedDate} color="white" selectedColor="yellow" />
        </Card.Root>
        <Card.Root color="green" class="items-center p-5">
          <Card.Header class="w-full p-0"
            ><Card.Title>Date range</Card.Title><Card.Description>Select the dates for a sprint.</Card.Description
            ></Card.Header
          >
          <RangeCalendar.Root bind:value={selectedRange} color="white" selectedColor="cyan" />
        </Card.Root>
      </div>
    </div>
  </section>

  <section
    data-color="magenta"
    class="bg-clr relative isolate overflow-hidden py-10"
    aria-labelledby="disclosure-heading"
  >
    <BackgroundPattern pattern="checkerboard" size={22} opacity={0.4} />
    <div class="relative z-10 mx-auto max-w-7xl space-y-6 px-5 lg:px-8">
      <Card.Root color="cyan" class="p-5">
        <p class="font-mono text-xs font-bold tracking-widest">COMPONENTS / DISCLOSURE & OVERLAYS</p>
        <h2 id="disclosure-heading" class="mt-1 text-2xl font-black">Details when you need them</h2>
      </Card.Root>

      <div class="grid gap-6 lg:grid-cols-2">
        <Card.Root color="white" class="p-5">
          <Card.Header class="p-0"
            ><Card.Title>Expandable content</Card.Title><Card.Description
              >Accordion and collapsible patterns.</Card.Description
            ></Card.Header
          >
          <Card.Content class="space-y-5 p-0">
            <Accordion.Root type="single" triggerColor="yellow" contentColor="white">
              <Accordion.Item value="tokens">
                <Accordion.Trigger>How do theme tokens work?</Accordion.Trigger>
                <Accordion.Content
                  ><p>
                    A theme pairs the ANSI palette with foreground and background roles, so components stay consistent
                    across modes.
                  </p></Accordion.Content
                >
              </Accordion.Item>
              <Accordion.Item value="components">
                <Accordion.Trigger>Can components be composed?</Accordion.Trigger>
                <Accordion.Content
                  ><p>
                    Yes. Compound pieces keep their keyboard behavior and can be arranged around the needs of the page.
                  </p></Accordion.Content
                >
              </Accordion.Item>
            </Accordion.Root>
            <Collapsible.Root>
              <Collapsible.Trigger tabindex={0} class="font-bold underline">Show release notes</Collapsible.Trigger>
              <Collapsible.Content class="mt-3 rounded border-2 p-3"
                >Version 0.8 adds the new theme picker and refreshed controls.</Collapsible.Content
              >
            </Collapsible.Root>
          </Card.Content>
        </Card.Root>

        <Card.Root color="yellow" class="p-5">
          <Card.Header class="p-0"
            ><Card.Title>Menus and help</Card.Title><Card.Description
              >Contextual details and lightweight overlays.</Card.Description
            ></Card.Header
          >
          <Card.Content class="flex flex-wrap items-center gap-3 p-0">
            <Popover.Root>
              <Popover.Trigger>
                {#snippet child({ props })}<Button {...props} color="blue">Popover</Button>{/snippet}
              </Popover.Trigger>
              <Popover.Content color="cyan"
                ><p class="font-bold">Quick note</p>
                <p class="mt-1 text-sm">This content opens beside its trigger.</p></Popover.Content
              >
            </Popover.Root>
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger>
                  {#snippet child({ props })}<Button {...props} color="magenta" aria-label="More about themes"
                      >Theme help</Button
                    >{/snippet}
                </Tooltip.Trigger>
                <Tooltip.Content color="black">Switch the active palette.</Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            <HoverCard.Root>
              <HoverCard.Trigger>
                {#snippet child({ props })}<Button {...props} color="green">Hover preview</Button>{/snippet}
              </HoverCard.Trigger>
              <HoverCard.Content color="white"
                ><p class="font-bold">Neo-Retro</p>
                <p class="mt-1 text-sm">Bold surfaces with a terminal-inspired palette.</p></HoverCard.Content
              >
            </HoverCard.Root>
            <Dialog.Root>
              <Dialog.Trigger>
                {#snippet child({ props })}<Button {...props} color="cyan">Open dialog</Button>{/snippet}
              </Dialog.Trigger>
              <Dialog.Content color="white">
                <Dialog.Header
                  ><Dialog.Title>Quick preview</Dialog.Title><Dialog.Description
                    >A modal dialog keeps a short task in focus.</Dialog.Description
                  ></Dialog.Header
                >
                <Dialog.Footer>
                  <Dialog.Close>
                    {#snippet child({ props })}<Button {...props} color="blue">Done</Button>{/snippet}
                  </Dialog.Close>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Root>
            <AlertDialog.Root color="yellow" cancelColor="white" actionColor="red">
              <AlertDialog.Trigger>
                {#snippet child({ props })}<Button {...props} color="red">Reset preferences</Button>{/snippet}
              </AlertDialog.Trigger>
              <AlertDialog.Content color="yellow">
                <AlertDialog.Header
                  ><AlertDialog.Title>Reset preferences?</AlertDialog.Title><AlertDialog.Description
                    >This sample action restores the default view settings.</AlertDialog.Description
                  ></AlertDialog.Header
                >
                <AlertDialog.Footer>
                  <AlertDialog.Cancel>
                    {#snippet child({ props })}<Button {...props} color="white">Cancel</Button>{/snippet}
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                    {#snippet child({ props })}<Button {...props} color="red">Reset</Button>{/snippet}
                  </AlertDialog.Action>
                </AlertDialog.Footer>
              </AlertDialog.Content>
            </AlertDialog.Root>
            <Sheet.Root>
              <Sheet.Trigger>
                {#snippet child({ props })}<Button {...props} color="blue">Open side panel</Button>{/snippet}
              </Sheet.Trigger>
              <Sheet.Content color="cyan" side="right" class="p-6">
                <Sheet.Header
                  ><Sheet.Title>Project details</Sheet.Title><Sheet.Description
                    >A side panel for supporting information.</Sheet.Description
                  ></Sheet.Header
                >
                <Item.Root color="yellow"
                  ><Item.Content
                    ><Item.Title>Design review</Item.Title><Item.Description>Next Tuesday · 10:30 AM</Item.Description
                    ></Item.Content
                  ></Item.Root
                >
                <Sheet.Footer>
                  <Sheet.Close color="magenta">
                    {#snippet child({ props })}<Button {...props} color="magenta">Close panel</Button>{/snippet}
                  </Sheet.Close>
                </Sheet.Footer>
              </Sheet.Content>
            </Sheet.Root>
          </Card.Content>
        </Card.Root>
      </div>
    </div>
  </section>

  <section data-color="red" class="bg-clr relative isolate overflow-hidden py-10" aria-labelledby="content-heading">
    <BackgroundPattern pattern="hexagons" size={26} opacity={0.4} />
    <div class="relative z-10 mx-auto max-w-7xl space-y-6 px-5 lg:px-8">
      <Card.Root color="green" class="p-5">
        <p class="font-mono text-xs font-bold tracking-widest">COMPONENTS / CONTENT & MEDIA</p>
        <h2 id="content-heading" class="mt-1 text-2xl font-black">Show, share, and browse</h2>
      </Card.Root>

      <div class="grid gap-6">
        <Card.Root color="cyan" class="p-5">
          <Card.Header class="p-0"
            ><Card.Title>Team and imagery</Card.Title><Card.Description
              >DiceBear avatar and enhanced image preview.</Card.Description
            ></Card.Header
          >
          <Card.Content class="space-y-4 p-0">
            <div class="flex items-center gap-3">
              <Avatar.Root class="size-12">
                <Avatar.Image
                  src="https://api.dicebear.com/9.x/bottts/svg?seed=Neo-Retro"
                  alt="DiceBear robot avatar for Neo-Retro"
                />
              </Avatar.Root>
              <div>
                <p class="font-bold">Neo Retro</p>
                <p class="text-sm">Design systems</p>
              </div>
            </div>
            <ImageComponent.Image
              meta={catPreview}
              alt="Brown tabby cat sitting on concrete"
              color="white"
              cancelColor="red"
              resetColor="yellow"
              downloadColor="green"
              prevNextColor="blue"
              layout="grid"
              columns={2}
            />
          </Card.Content>
        </Card.Root>

        <Card.Root color="yellow" class="p-5">
          <Card.Header class="p-0"
            ><Card.Title>Media player</Card.Title><Card.Description
              >Video playback with Neo-Retro controls.</Card.Description
            ></Card.Header
          >
          <Card.Content class="p-0">
            <Media
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              title="Flower video sample"
              aspectRatio={16 / 9}
              playButtonColor="green"
              seekButtonColor="cyan"
              controlButtonColor="white"
              selectorColor="yellow"
              actionButtonColor="magenta"
              linkColor="blue"
              waveformColor="green"
            />
          </Card.Content>
        </Card.Root>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <Card.Root color="magenta" class="p-5 lg:col-span-2">
          <Card.Header class="p-0"
            ><Card.Title>Carousel and chart</Card.Title><Card.Description
              >Browse a small series and view sample activity.</Card.Description
            ></Card.Header
          >
          <Card.Content class="space-y-6 p-0">
            <Carousel.Root color="cyan" opts={{ loop: true }}>
              <Carousel.Content class="pb-3">
                <Carousel.Item
                  ><Card.Root color="blue" class="mx-1 p-5"
                    ><Card.Title>01 / Structure</Card.Title><Card.Description
                      >Start with clear sections.</Card.Description
                    ></Card.Root
                  ></Carousel.Item
                >
                <Carousel.Item
                  ><Card.Root color="green" class="mx-1 p-5"
                    ><Card.Title>02 / Contrast</Card.Title><Card.Description
                      >Keep every surface readable.</Card.Description
                    ></Card.Root
                  ></Carousel.Item
                >
                <Carousel.Item
                  ><Card.Root color="yellow" class="mx-1 p-5"
                    ><Card.Title>03 / Details</Card.Title><Card.Description>Give controls a clear job.</Card.Description
                    ></Card.Root
                  ></Carousel.Item
                >
              </Carousel.Content>
              <div class="mt-3 flex justify-end gap-2"><Carousel.Previous /><Carousel.Next /></div>
            </Carousel.Root>
            <Chart.Container
              config={{ installs: { label: 'Installs', color: neoretroColors.cyan } }}
              class="aspect-auto h-56 w-full min-w-0"
            >
              <BarChart
                data={chartData}
                x="month"
                y="installs"
                series={[{ key: 'installs', label: 'Installs', value: 'installs', color: neoretroColors.cyan }]}
                height={220}
                tooltip={installsTooltip}
              />
            </Chart.Container>
          </Card.Content>
        </Card.Root>

        <Card.Root color="blue" class="p-5">
          <Card.Header class="p-0"
            ><Card.Title>Share and copy</Card.Title><Card.Description
              >Code snippets and scannable project links.</Card.Description
            ></Card.Header
          >
          <Card.Content class="p-0">
            <CodeBlock
              color="white"
              headerColor="cyan"
              title="theme.ts"
              lang="typescript"
              code={'export const theme = {\n  palette: "neo-retro",\n  contrast: "bold"\n};'}
              theme="github-dark"
              themes={['github-dark']}
              langs={['typescript']}
              copy
              numbered
            />
          </Card.Content>
        </Card.Root>

        <Card.Root color="green" class="p-5">
          <Card.Header class="w-full p-0 text-center"
            ><Card.Title>Scan the docs</Card.Title><Card.Description
              >Keep the component reference handy.</Card.Description
            ></Card.Header
          >
          <Card.Content class="flex w-full flex-col items-center justify-center gap-4 p-0 sm:flex-row">
            <QrCode value="https://neo-retro.zurat.dev/" class="size-36 shrink-0" />
            <span class="text-sm font-bold whitespace-nowrap">neo-retro.zurat.dev</span>
          </Card.Content>
        </Card.Root>
      </div>
    </div>
  </section>

  <footer class="neoretro-border-t">
    <div class="mx-auto flex max-w-7xl flex-col justify-between gap-2 p-5 text-sm sm:flex-row sm:items-center lg:px-8">
      <span class="font-bold">NEO/RETRO STUDIO <span class="font-normal">· Component demo</span></span>
      <span class="font-mono text-xs">MADE FOR BUILDING THINGS THAT STAND OUT</span>
    </div>
  </footer>
</main>

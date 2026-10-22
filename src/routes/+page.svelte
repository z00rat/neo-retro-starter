<script lang="ts">
  import {
    ArrowDownRight,
    ArrowUpRight,
    Check,
    Code2,
    Github,
    Layers3,
    LayoutTemplate,
    Mail,
    MoveRight,
    Sparkles,
    Wrench,
  } from '@lucide/svelte';
  import * as Accordion from '#lib/components/ui/accordion/index.js';
  import { Alert } from '#lib/components/ui/alert/index.js';
  import * as Avatar from '#lib/components/ui/avatar/index.js';
  import { BackgroundPattern } from '#lib/components/ui/background-pattern/index.js';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { Button } from '#lib/components/ui/button/index.js';
  import * as Card from '#lib/components/ui/card/index.js';
  import * as Empty from '#lib/components/ui/empty/index.js';
  import * as Field from '#lib/components/ui/field/index.js';
  import * as HoverCard from '#lib/components/ui/hover-card/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import { Label } from '#lib/components/ui/label/index.js';
  import { Progress } from '#lib/components/ui/progress/index.js';
  import { RadioGroup, RadioGroupItem } from '#lib/components/ui/radio-group/index.js';
  import { Separator } from '#lib/components/ui/separator/index.js';
  import { Slider } from '#lib/components/ui/slider/index.js';
  import ThemePicker from '#lib/components/ui/style/theme-picker.svelte';
  import { Switch } from '#lib/components/ui/switch/index.js';
  import * as Table from '#lib/components/ui/table/index.js';
  import * as Tabs from '#lib/components/ui/tabs/index.js';
  import * as Tooltip from '#lib/components/ui/tooltip/index.js';

  let activePanel = $state('controls');
  let contrast = $state([68]);
  let soundOn = $state(true);
  let finish = $state('crisp');
  let contact = $state('');
  let mailtoHref = $derived(
    `mailto:hello@zurat.dev?subject=${encodeURIComponent('A project for Zurat')}&body=${encodeURIComponent(contact)}`,
  );

  const githubUrl = 'https://github.com/z00rat';

  const projects = [
    {
      name: 'Neo-Retro',
      kind: 'Design system',
      status: 'In the open',
      color: 'blue',
      href: `${githubUrl}/neo-retro`,
    },
    {
      name: 'Tiny tools',
      kind: 'Useful little utilities',
      status: 'Always tinkering',
      color: 'cyan',
      href: null,
    },
    {
      name: 'Web things',
      kind: 'Sites with character',
      status: 'Made to ship',
      color: 'magenta',
      href: null,
    },
  ] as const;
</script>

<svelte:head>
  <title>Zurat — software with a point of view</title>
  <meta name="description" content="The workbench of Zurat: useful software, open-source experiments, and Neo-Retro." />
</svelte:head>

<div class="bg-background text-foreground min-h-screen">
  <header
    class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 py-4 sm:flex-nowrap sm:px-8 sm:py-5"
  >
    <a href="#top" class="inline-flex items-center gap-2 text-lg font-black tracking-tight" aria-label="Zurat, home">
      <span class="neoretro-border bg-yellow text-on-yellow grid size-8 place-items-center rounded"
        ><LayoutTemplate class="size-4" /></span
      >
      <span>zurat<span class="text-blue">.dev</span></span>
    </a>
    <nav
      aria-label="Main navigation"
      class="order-3 flex w-full items-center justify-between gap-4 text-sm font-semibold sm:order-none sm:w-auto sm:gap-7"
    >
      <a class="neoretro-focus rounded" href="#work">Work</a>
      <a class="neoretro-focus rounded" href="#bench">The bench</a>
      <a class="neoretro-focus rounded" href="#about">About</a>
    </nav>
    <div class="flex items-center gap-3">
      <ThemePicker />
      <Button href={githubUrl} color="blue" size="sm" target="_blank" rel="noreferrer">
        <Github /> GitHub
      </Button>
    </div>
  </header>

  <main id="top">
    <section class="bg-blue text-on-blue relative isolate overflow-hidden border-y-2 border-black">
      <BackgroundPattern pattern="isometric" size={28} strokeWidth={1.25} />
      <div
        class="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
      >
        <div class="max-w-3xl">
          <div class="mb-7 flex flex-wrap items-center gap-3">
            <Badge color="yellow"><Sparkles /> Independent maker</Badge>
            <span class="text-sm font-medium">Building on the web, sharing the parts that work.</span>
          </div>
          <h1 class="max-w-3xl text-5xl leading-[0.96] font-black tracking-[-0.055em] sm:text-7xl lg:text-8xl">
            Software with a point of view.
          </h1>
          <p class="mt-7 max-w-xl text-lg leading-relaxed sm:text-xl">
            I’m Zurat. I make useful things for the web, and care about the details that make them feel right.
          </p>
          <div class="mt-9 flex flex-wrap gap-4">
            <Button href="#work" color="yellow" size="lg">See what I make <ArrowDownRight /></Button>
            <Button href="#about" color="white" size="lg" noShadow>How I work <MoveRight /></Button>
          </div>
        </div>

        <Card.Root color="yellow" class="relative mx-auto w-full max-w-md -rotate-1">
          <Card.Header class="flex-row items-start justify-between gap-4">
            <div>
              <Card.Description>Currently on the bench</Card.Description>
              <Card.Title class="mt-1 text-2xl">Neo-Retro</Card.Title>
            </div>
            <span class="neoretro-border bg-blue text-on-blue grid size-12 place-items-center rounded"
              ><Wrench class="size-6" /></span
            >
          </Card.Header>
          <Card.Content class="space-y-4">
            <p class="max-w-sm leading-relaxed">
              A Svelte component system with crisp borders, bright themes, and a little bit of bite.
            </p>
            <div class="flex items-center justify-between text-sm font-bold">
              <span>Progress demo</span><span>68%</span>
            </div>
            <Progress value={68} indicatorColor="green" trackColor="white" aria-label="Progress demo" />
          </Card.Content>
          <Card.Footer class="justify-between">
            <Badge color="green"><Check /> Open source</Badge>
            <a
              href="https://github.com/z00rat/neo-retro"
              target="_blank"
              rel="noreferrer"
              class="neoretro-link inline-flex items-center gap-1 font-bold"
            >
              Explore the repo <ArrowUpRight class="size-4" />
            </a>
          </Card.Footer>
        </Card.Root>
      </div>
    </section>

    <section id="work" class="bg-yellow text-on-yellow relative isolate overflow-hidden">
      <BackgroundPattern pattern="checkerboard" size={24} />
      <div class="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div class="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p class="text-on-yellow mb-3 inline-flex items-center gap-2 text-sm font-bold">
              <Code2 class="size-4" /> Things I make
            </p>
            <h2 class="text-4xl font-black tracking-tight sm:text-5xl">A few things, made well.</h2>
          </div>
          <p class="max-w-md leading-relaxed">
            A mix of tools, interfaces, and experiments. Some are finished; some are still becoming.
          </p>
        </div>
        <div class="grid gap-4 md:grid-cols-3">
          {#each projects as project (project.name)}
            <Card.Root color={project.color} class="h-full">
              <Card.Header>
                <Badge color="white">{project.kind}</Badge>
                <Card.Title class="mt-4 text-2xl">{project.name}</Card.Title>
                <Card.Description>{project.status}</Card.Description>
              </Card.Header>
              <Card.Footer>
                {#if project.href}
                  <Button href={project.href} color="blue" size="sm" target="_blank" rel="noreferrer"
                    >View the project <ArrowUpRight /></Button
                  >
                {:else}
                  <span class="text-sm font-semibold">A work in progress</span>
                {/if}
              </Card.Footer>
            </Card.Root>
          {/each}
        </div>
      </div>
    </section>

    <section id="bench" class="bg-magenta text-on-magenta relative isolate overflow-hidden border-y-2 border-black">
      <BackgroundPattern pattern="waves" size={32} />
      <div class="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div class="mb-9 grid gap-6 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div>
            <p class="text-on-magenta mb-3 inline-flex items-center gap-2 text-sm font-bold">
              <Layers3 class="size-4" /> Built with Neo-Retro
            </p>
            <h2 class="text-4xl font-black tracking-tight sm:text-5xl">The component bench.</h2>
          </div>
          <p class="max-w-lg leading-relaxed">
            Real pieces from the system, doing the jobs they were made for. Change the theme above to see the whole
            bench shift.
          </p>
        </div>

        <Tabs.Root bind:value={activePanel} activeColor="blue" inactiveColor="white">
          <Tabs.List aria-label="Component groups" class="max-w-2xl">
            <Tabs.Trigger value="controls">Controls</Tabs.Trigger>
            <Tabs.Trigger value="feedback">Feedback</Tabs.Trigger>
            <Tabs.Trigger value="structure">Structure</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="controls" class="mt-6">
            <div class="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <Card.Root color="yellow">
                <Card.Header>
                  <Card.Title>Small controls, clear jobs</Card.Title>
                  <Card.Description>Input, label, switch, slider, and radio group.</Card.Description>
                </Card.Header>
                <Card.Content class="grid gap-7 sm:grid-cols-2">
                  <Field.Field>
                    <Field.Label for="demo-email">Email address</Field.Label>
                    <Input id="demo-email" type="email" placeholder="you@example.com" autocomplete="email" />
                    <Field.Description>A labeled email input with supporting text.</Field.Description>
                  </Field.Field>
                  <div class="space-y-3">
                    <Label for="sound-toggle" class="font-bold">Sound preview</Label>
                    <div class="flex items-center gap-3">
                      <Switch id="sound-toggle" bind:checked={soundOn} color="green" />
                      <span class="text-sm">{soundOn ? 'On' : 'Off'}</span>
                    </div>
                  </div>
                  <div class="space-y-3 sm:col-span-2">
                    <div class="flex justify-between gap-4 text-sm font-bold">
                      <Label for="contrast-slider">Contrast</Label><span>{contrast[0]}%</span>
                    </div>
                    <Slider
                      id="contrast-slider"
                      bind:value={contrast}
                      color="magenta"
                      max={100}
                      min={0}
                      step={1}
                      aria-label="Contrast"
                    />
                  </div>
                  <Field.FieldSet class="space-y-3 sm:col-span-2">
                    <Field.Legend variant="label" class="mb-0 font-bold">Preferred finish</Field.Legend>
                    <RadioGroup bind:value={finish} color="blue" class="flex flex-wrap gap-x-6 gap-y-3">
                      <Field.Field orientation="horizontal" class="w-fit items-center gap-2">
                        <RadioGroupItem value="crisp" id="finish-crisp" />
                        <Field.Label for="finish-crisp">Crisp</Field.Label>
                      </Field.Field>
                      <Field.Field orientation="horizontal" class="w-fit items-center gap-2">
                        <RadioGroupItem value="soft" id="finish-soft" />
                        <Field.Label for="finish-soft">Soft</Field.Label>
                      </Field.Field>
                    </RadioGroup>
                  </Field.FieldSet>
                </Card.Content>
              </Card.Root>

              <Card.Root color="cyan">
                <Card.Header>
                  <Card.Title>Actions &amp; small signals</Card.Title>
                  <Card.Description>Buttons, badges, and a tooltip with keyboard support.</Card.Description>
                </Card.Header>
                <Card.Content class="space-y-6">
                  <div class="flex flex-wrap gap-3">
                    <Button color="blue">Primary action <MoveRight /></Button>
                    <Button color="white" size="sm">Quiet action</Button>
                    <Button color="magenta" size="icon" aria-label="Spark an idea"><Sparkles /></Button>
                  </div>
                  <Separator color="black" />
                  <div class="flex flex-wrap items-center gap-2">
                    <Badge color="green"><Check /> Ready</Badge>
                    <Badge color="yellow">In progress</Badge>
                    <Badge color="white">Svelte 5</Badge>
                  </div>
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger
                        class="neoretro-focus inline-flex items-center gap-2 rounded font-bold underline underline-offset-4"
                      >
                        What’s this? <span aria-hidden="true">ⓘ</span>
                      </Tooltip.Trigger>
                      <Tooltip.Content color="black">A tooltip that works with focus and hover.</Tooltip.Content>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </Card.Content>
              </Card.Root>
            </div>
          </Tabs.Content>

          <Tabs.Content value="feedback" class="mt-6">
            <div class="grid gap-5 lg:grid-cols-2">
              <Card.Root color="white">
                <Card.Header
                  ><Card.Title>Useful feedback</Card.Title><Card.Description
                    >Alerts, progress, and expandable detail.</Card.Description
                  ></Card.Header
                >
                <Card.Content class="space-y-5">
                  <Alert color="green">
                    <Check class="mt-0.5" />
                    <div>
                      <p class="font-bold">Everything is up to date.</p>
                      <p class="text-sm">Your local components match the registry.</p>
                    </div>
                  </Alert>
                  <div class="space-y-2">
                    <div class="flex justify-between text-sm font-bold">
                      <span>Sample task</span><span>82%</span>
                    </div>
                    <Progress value={82} indicatorColor="blue" trackColor="white" aria-label="Sample task progress" />
                  </div>
                  <Accordion.Root type="single" triggerColor="yellow" contentColor="yellow">
                    <Accordion.Item value="details">
                      <Accordion.Trigger>What makes it Neo-Retro?</Accordion.Trigger>
                      <Accordion.Content
                        >Solid colors, crisp borders, compact corners, and offset shadows. The components stay practical
                        while the surfaces bring the character.</Accordion.Content
                      >
                    </Accordion.Item>
                    <Accordion.Item value="themes">
                      <Accordion.Trigger>Can I change the palette?</Accordion.Trigger>
                      <Accordion.Content
                        >Yes. Use the theme picker in the header; each component reads from the active theme.</Accordion.Content
                      >
                    </Accordion.Item>
                  </Accordion.Root>
                </Card.Content>
              </Card.Root>
              <Empty.Root class="neoretro-border bg-yellow text-on-yellow rounded p-8 sm:p-12">
                <Empty.Header>
                  <Empty.Media variant="icon" class="bg-yellow text-on-yellow"><Sparkles /></Empty.Media>
                  <Empty.Title>No clutter. Just a next step.</Empty.Title>
                  <Empty.Description class="text-on-yellow"
                    >A useful empty state gives the person somewhere to go.</Empty.Description
                  >
                </Empty.Header>
                <Empty.Content><Button href="#contact" color="blue">Send a note <MoveRight /></Button></Empty.Content>
              </Empty.Root>
            </div>
          </Tabs.Content>

          <Tabs.Content value="structure" class="mt-6">
            <div class="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <Card.Root color="white">
                <Card.Header
                  ><Card.Title>Project list</Card.Title><Card.Description
                    >A compact table for things that benefit from comparison.</Card.Description
                  ></Card.Header
                >
                <Card.Content>
                  <Table.Root headerColor="yellow" rowColor="white">
                    <Table.Caption>Projects on the bench</Table.Caption>
                    <Table.Header>
                      <Table.Row
                        ><Table.Head>Project</Table.Head><Table.Head>Type</Table.Head><Table.Head>Status</Table.Head
                        ></Table.Row
                      >
                    </Table.Header>
                    <Table.Body>
                      <Table.Row
                        ><Table.Cell class="font-bold">Neo-Retro</Table.Cell><Table.Cell>Design system</Table.Cell
                        ><Table.Cell><Badge color="green">Open</Badge></Table.Cell></Table.Row
                      >
                      <Table.Row
                        ><Table.Cell class="font-bold">Tiny tools</Table.Cell><Table.Cell>Utilities</Table.Cell
                        ><Table.Cell><Badge color="yellow">In progress</Badge></Table.Cell></Table.Row
                      >
                    </Table.Body>
                  </Table.Root>
                </Card.Content>
              </Card.Root>
              <Card.Root color="magenta">
                <Card.Header
                  ><Card.Title>People make the work</Card.Title><Card.Description
                    >Avatar, hover card, and a link to the source.</Card.Description
                  ></Card.Header
                >
                <Card.Content class="flex items-center gap-4">
                  <Avatar.Root class="neoretro-border bg-yellow text-on-yellow size-14 rounded">
                    <Avatar.Fallback seed="Zurat" style="pixel-art" />
                  </Avatar.Root>
                  <div>
                    <HoverCard.Root>
                      <HoverCard.Trigger
                        class="neoretro-focus rounded text-lg font-black underline decoration-2 underline-offset-4"
                        >Zurat</HoverCard.Trigger
                      >
                      <HoverCard.Content color="yellow">
                        <p class="font-bold">Independent developer &amp; maker</p>
                        <p class="mt-2 text-sm">Building useful software and sharing the details in the open.</p>
                      </HoverCard.Content>
                    </HoverCard.Root>
                    <p class="text-sm">Independent developer &amp; maker</p>
                  </div>
                </Card.Content>
                <Card.Footer
                  ><Button href={githubUrl} color="white" target="_blank" rel="noreferrer"
                    ><Github /> Find me on GitHub <ArrowUpRight /></Button
                  ></Card.Footer
                >
              </Card.Root>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </section>

    <section id="about" class="bg-cyan text-on-cyan relative isolate overflow-hidden">
      <BackgroundPattern pattern="cross" size={28} />
      <div class="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-24 md:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p class="text-on-cyan mb-3 inline-flex items-center gap-2 text-sm font-bold">
            <Wrench class="size-4" /> A little about me
          </p>
          <h2 class="max-w-md text-4xl leading-tight font-black tracking-tight sm:text-5xl">
            Curiosity is part of the toolkit.
          </h2>
        </div>
        <div class="max-w-2xl space-y-6 text-lg leading-relaxed">
          <p>
            I like software that feels considered: direct language, clear feedback, and controls that make sense the
            first time you meet them.
          </p>
          <p>
            Neo-Retro grew from that belief. It brings familiar web components together with a visual language that
            feels physical, bright, and easy to make your own.
          </p>
          <a
            href="https://github.com/z00rat/neo-retro"
            target="_blank"
            rel="noreferrer"
            class="neoretro-link inline-flex items-center gap-2 font-bold"
            >Read the source <ArrowUpRight class="size-4" /></a
          >
        </div>
      </div>
    </section>

    <section id="contact" class="bg-green text-on-green relative isolate overflow-hidden border-y-2 border-black">
      <BackgroundPattern pattern="dots" size={22} />
      <div
        class="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 sm:py-20 md:grid-cols-[1fr_0.8fr] md:items-center"
      >
        <div>
          <p class="mb-3 inline-flex items-center gap-2 text-sm font-bold">
            <Mail class="size-4" /> Get in touch
          </p>
          <h2 class="max-w-xl text-4xl font-black tracking-tight sm:text-6xl">Have a good problem to solve?</h2>
          <p class="mt-4 max-w-lg leading-relaxed">
            Tell me what you’re making. I’m always interested in a thoughtful collaboration.
          </p>
        </div>
        <Card.Root color="white">
          <Card.Content class="p-6 sm:p-8">
            <div class="space-y-4">
              <Field.Field>
                <Field.Label for="contact-note">What are you working on?</Field.Label>
                <Input id="contact-note" bind:value={contact} placeholder="A short note is plenty" />
                <Field.Description>Your note will open as a draft in your email app.</Field.Description>
              </Field.Field>
              <Button href={mailtoHref} color="blue"><Mail /> Write to Zurat</Button>
            </div>
          </Card.Content>
        </Card.Root>
      </div>
    </section>
  </main>

  <footer
    class="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm font-semibold sm:flex-row sm:items-center sm:justify-between sm:px-8"
  >
    <a href="#top" class="inline-flex w-fit items-center gap-2"><LayoutTemplate class="size-4" /> zurat.dev</a>
    <p>Made with care, and a lot of component props.</p>
    <a
      href="https://github.com/z00rat/neo-retro"
      target="_blank"
      rel="noreferrer"
      class="neoretro-focus inline-flex w-fit items-center gap-2 rounded"
      >Neo-Retro on GitHub <ArrowUpRight class="size-4" /></a
    >
  </footer>
</div>

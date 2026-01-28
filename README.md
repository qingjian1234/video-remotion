# Video Sequence with Transitions

This Remotion project combines three videos with smooth transitions.

## Videos Included

1. **Welcome video** - Fades into...
2. **Before video** - Slides into...
3. **Countdown video**

## Setup

First, install dependencies (you'll need npm, yarn, pnpm, or bun):

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

## Run the Project

Start the Remotion Studio to preview your video:

```bash
npm start
# or
yarn start
# or
pnpm start
# or
bun start
```

## Render the Video

To render the final video:

```bash
npx remotion render VideoSequence out/video.mp4
# or
bunx remotion render VideoSequence out/video.mp4
# or
yarn remotion render VideoSequence out/video.mp4
# or
pnpm exec remotion render VideoSequence out/video.mp4
```

## Customization

### Change Transition Types

In [src/VideoSequence.tsx](src/VideoSequence.tsx), you can change the transitions:

```tsx
// Available transitions
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';
import { flip } from '@remotion/transitions/flip';
import { clockWipe } from '@remotion/transitions/clock-wipe';

// Slide directions: 'from-left', 'from-right', 'from-top', 'from-bottom'
```

### Adjust Duration

Each video is currently set to 5 seconds. Change the duration in [src/VideoSequence.tsx](src/VideoSequence.tsx):

```tsx
<TransitionSeries.Sequence durationInFrames={5 * fps}>
```

### Adjust Transition Speed

Change the transition duration (currently 20 frames):

```tsx
<TransitionSeries.Transition
  presentation={fade()}
  timing={linearTiming({ durationInFrames: 20 })} // Change this number
/>
```

## Video URLs

The videos are loaded from Cloudinary:
- Welcome: `2026-01-23_0_f604fef4_welcome.mp4`
- Before: `2026-01-23_1_f604fef4_before.mp4`
- Countdown: `2026-01-23_1_f604fef4_count_down.mp4`

To use different videos, edit the `videoUrls` array in [src/VideoSequence.tsx](src/VideoSequence.tsx).

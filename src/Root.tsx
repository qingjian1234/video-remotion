import { Composition, CalculateMetadataFunction } from 'remotion';
import { VideoSequence, VideoSequenceProps } from './VideoSequence';
import { getMediaMetadata } from './get-media-metadata';

// Default video URLs (can be overridden via props when rendering)
const defaultVideoUrlsString = "";

const calculateMetadata: CalculateMetadataFunction<VideoSequenceProps> = async ({ props }) => {
  const fps = 30;

  // Get video URLs from props (use default if not provided)
  const videoUrlsString = props.videoUrlsString || defaultVideoUrlsString;
  const videoUrls = videoUrlsString.split(',');

  // Fetch metadata for all videos in parallel
  const metadataPromises = videoUrls.map((url) => getMediaMetadata(url));
  const allMetadata = await Promise.all(metadataPromises);

  // Convert durations from seconds to frames
  const videoDurations = allMetadata.map((meta) => Math.ceil(meta.durationInSeconds * fps));

  // Calculate total duration
  // Videos with transitions (indices 0, 3, 6, 9) get extra 20 frames, but we subtract the overlap
  // Last video also gets a wipe transition that overlaps completely with the final blank sequence
  let totalDuration = 0;
  videoDurations.forEach((duration, index) => {
    const hasTransitionAfter = index % 3 === 0 && index < videoDurations.length - 1;
    const isLastVideo = index === videoDurations.length - 1;
    totalDuration += duration;
    if (hasTransitionAfter || isLastVideo) {
      totalDuration += 20; // Add transition duration
      totalDuration -= 20; // Subtract overlap
    }
  });
  // The final blank sequence overlaps completely with the wipe transition, so no extra duration needed

  return {
    durationInFrames: totalDuration,
    props: {
      ...props,
      videoUrls,
      videoDurations,
    },
  };
};

export const RemotionRoot: React.FC = () => {
  const fps = 30;

  return (
    <>
      <Composition
        id="VideoSequence"
        component={VideoSequence}
        durationInFrames={100} // Placeholder, will be calculated
        fps={fps}
        width={1280}
        height={720}
        defaultProps={{
          videoUrlsString: defaultVideoUrlsString,
          videoUrls: [],
          videoDurations: [],
        }}
        calculateMetadata={calculateMetadata}
      />
    </>
  );
};

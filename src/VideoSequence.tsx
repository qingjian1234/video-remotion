import React from 'react';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { flip } from '@remotion/transitions/flip';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';
import { Video, Audio } from '@remotion/media';
import { useVideoConfig, staticFile, Sequence } from 'remotion';

export type VideoSequenceProps = {
  videoUrlsString?: string; // Comma-separated video URLs
  videoUrls: string[];
  videoDurations: number[]; // durations in frames
};

export const VideoSequence: React.FC<VideoSequenceProps> = ({ videoUrls, videoDurations }) => {
  const { fps } = useVideoConfig();

  // Calculate when the first video finishes (accounting for its actual duration)
  const firstVideoDuration = videoDurations[0] || 5 * fps;
  const bgmStartFrame = firstVideoDuration;

  return (
    <>
      {/* Background Music - starts when first video finishes */}
      <Sequence from={bgmStartFrame}>
        <Audio src={staticFile('bgm_02.mp3')} volume={0.04} />
      </Sequence>

      <TransitionSeries>
        {videoUrls.map((url, index) => {
          // Check if this video will have a transition after it
          const hasTransitionAfter = index % 3 === 0 && index < videoUrls.length - 1;
          // Check if this is the last video
          const isLastVideo = index === videoUrls.length - 1;
          // Get the actual video duration from props
          const actualDuration = videoDurations[index] || 5 * fps;
          // Add transition duration to videos that have transitions after them (including last video)
          const videoDuration = (hasTransitionAfter || isLastVideo) ? actualDuration + 20 : actualDuration;

          return (
            <React.Fragment key={index}>
              {/* Video Sequence */}
              <TransitionSeries.Sequence durationInFrames={videoDuration}>
                <Video
                  src={url}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </TransitionSeries.Sequence>

              {/* Add transition after 1st, 4th, 7th, 10th, etc. videos */}
              {hasTransitionAfter && (
                <TransitionSeries.Transition
                  presentation={index === 0 ? flip() : slide({ direction: 'from-right' })}
                  timing={linearTiming({ durationInFrames: 20 })}
                />
              )}

              {/* Add wipe transition at the end */}
              {isLastVideo && (
                <TransitionSeries.Transition
                  presentation={wipe({ direction: 'from-right' })}
                  timing={linearTiming({ durationInFrames: 20 })}
                />
              )}
            </React.Fragment>
          );
        })}

        {/* Final blank sequence to complete the wipe transition */}
        <TransitionSeries.Sequence durationInFrames={20}>
          <div style={{ backgroundColor: 'black', width: '100%', height: '100%' }} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};

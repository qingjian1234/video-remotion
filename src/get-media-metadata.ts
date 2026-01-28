import { Input, ALL_FORMATS, UrlSource } from "mediabunny";

export const getMediaMetadata = async (src: string) => {
  const input = new Input({
    formats: ALL_FORMATS,
    source: new UrlSource(src, {
      getRetryDelay: () => null,
    }),
  });

  const durationInSeconds = await input.computeDuration();

  return {
    durationInSeconds,
  };
};

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const publicDir = join(process.cwd(), "public");
const videos = readdirSync(publicDir).filter((f) => f.endsWith(".mp4"));

/**
 * H.264 profiles every browser decodes: Baseline (66), Main (77), High (100), all with 4:2:0
 * colour. High 4:4:4 (244) plays in Chrome but not in Safari / iOS or on most phones.
 */
const PLAYABLE_PROFILES = [66, 77, 100];

describe("videos in public/", () => {
  it.each(videos)("%s is H.264 in a profile Safari and phones can play", (file) => {
    const data = readFileSync(join(publicDir, file));
    const avcC = data.indexOf("avcC");
    expect(avcC, "not H.264 (no avcC box)").toBeGreaterThan(0);
    // avcC payload: configurationVersion (1 byte), then AVCProfileIndication.
    expect(PLAYABLE_PROFILES).toContain(data[avcC + 5]);
  });

  it.each(videos)("%s starts playing before it is fully downloaded", (file) => {
    const data = readFileSync(join(publicDir, file));
    // "faststart": the index (moov) comes before the video data (mdat).
    expect(data.indexOf("moov")).toBeLessThan(data.indexOf("mdat"));
  });
});

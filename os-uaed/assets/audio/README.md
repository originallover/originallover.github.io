# OS-UAED audio examples

Add short, single-source excerpts using these exact filenames:

- `base-example-01.wav`
- `base-example-02.wav`
- `novel-example-01.wav`
- `novel-example-02.wav`
- `novel-example-03.wav`
- `novel-example-04.wav`

Recommended preparation:

- 4–10 seconds per clip;
- mono, 16 kHz WAV or high-quality MP3;
- normalize peak level without clipping;
- trim long leading/trailing silence;
- keep the target event dominant and avoid overlapping sources;
- record the Freesound/FSD50K ID and Creative Commons license in `../../data.js`.

After adding a file, update its entry in `../../data.js`:

1. set `enabled: true`;
2. change the slot label if needed;
3. keep the filename in sync with the file placed in this directory.

Enabled entries are rendered as playable audio controls. Disabled entries remain visible as simple placeholders.

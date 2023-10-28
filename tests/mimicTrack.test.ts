const isMimicSpecificBoss = require('../src/mimicTrack');
const setMimicSpecificBoss = require('../src/mimicTrack');

describe('testing index file', () => {
  test('unacceptable input should result in an exception', () => {
    expect(isMimicSpecificBoss('randomBossName')).toBe(RangeError); // unacceptable input
  });
});

describe('testing index file', () => {
  test('empty string should result in an exception', () => {
    expect(isMimicSpecificBoss('')).toBe(RangeError); // empty string
  });
});

describe('testing index file', () => {
  test('an acceptable input should result in an default false', () => {
    expect(isMimicSpecificBoss('MonstroMimic')).toBe(false);// an acceptable input
  });
});

setMimicSpecificBoss('MonstroMimic', true);

describe('testing index file', () => {
  test('an acceptable input should now result in true after it is re-valued.', () => {
    expect(isMimicSpecificBoss('MonstroMimic')).toBe(true);// an acceptable input
  });
});
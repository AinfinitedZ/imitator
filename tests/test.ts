import assert from "assert";
import test from 'node:test';
import { isMimicSpecificBoss } from "../src/mimicTrack";

test('default boss mimic is false', () => {
  assert.strictEqual(isMimicSpecificBoss("Monstro"), false);
});
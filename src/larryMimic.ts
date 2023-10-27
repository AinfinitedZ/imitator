import {
  addCollectible,
  doesEntityExist,
  findFreePosition,
  smeltTrinket,
  spawn,
  spawnCollectibleUnsafe,
} from "isaacscript-common";
import { iterateMimicTrack, removePreviousMimic, setMimicSpecificBoss } from "./mimicTrack";
import { CollectibleType, EffectVariant, EntityType, TrinketType } from "isaac-typescript-definitions";

export function ifPlayerPickupLarry() {
  const postMimic = iterateMimicTrack();
  removePreviousMimic(postMimic);
  smeltTrinket(Isaac.GetPlayer(), TrinketType.BRAIN_WORM);

  if (postMimic !== "Not found" && postMimic !== "LarryMimic") {
    spawnCollectibleUnsafe(
      Isaac.GetItemIdByName(postMimic),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
  setMimicSpecificBoss(postMimic, false);
  setMimicSpecificBoss("LarryMimic", true);
}

export function postBossLarryDefeated() {
  if(!doesEntityExist(5,100,Isaac.GetItemIdByName("LarryMimesis"))){
    spawnCollectibleUnsafe(
      Isaac.GetItemIdByName("LarryMimesis"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

export function larryMimesisOnUse() {
  Isaac.GetPlayer().UseActiveItem(CollectibleType.WHITE_PONY);
}

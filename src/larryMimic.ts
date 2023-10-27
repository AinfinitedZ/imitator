import {
  addCollectible,
  doesEntityExist,
  findFreePosition,
  smeltTrinket,
  spawn,
  spawnCollectibleUnsafe,
} from "isaacscript-common";
import { iterateMimicTrack, removePreviousMimic, setMimicSpecificBoss } from "./mimicTrack";
import { EffectVariant, EntityType, TrinketType } from "isaac-typescript-definitions";

export function ifPlayerPickupLarry() {
  smeltTrinket(Isaac.GetPlayer(), TrinketType.BRAIN_WORM);
  addCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("LarryMimesis"));
  const postMimic = iterateMimicTrack();

  if (postMimic !== "Not found" && postMimic !== "LarryMimic") {
    spawnCollectibleUnsafe(
      Isaac.GetItemIdByName(postMimic),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
  removePreviousMimic(postMimic);

  setMimicSpecificBoss("LarryMimic", true);
  setMimicSpecificBoss(postMimic, false);
}

export function postBossLarryDefeated() {
  if(!doesEntityExist(5,100,Isaac.GetItemIdByName("LarryMimic"))){
    spawnCollectibleUnsafe(
      Isaac.GetItemIdByName("LarryMimic"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

export function larryMimesisOnUse() {
  let target = spawn(EntityType.EFFECT, EffectVariant.TARGET, 0, Isaac.GetPlayer().Position,);

}

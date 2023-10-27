import {
  EffectVariant,
} from "isaac-typescript-definitions";
import {
  addCollectible,
  doesEntityExist,
  findFreePosition,
  getEntities,
  isActiveEnemy,
  spawnCollectibleUnsafe,
  spawnEffect,
} from "isaacscript-common";
import { iterateMimicTrack, removePreviousMimic, setMimicSpecificBoss } from "./mimicTrack";

export function ifPlayerPickupMonstro() {
  const postMimic = iterateMimicTrack();
  removePreviousMimic(postMimic);
  addCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("Monstro's Lung"));

  if (postMimic !== "Not found" && postMimic !== "MonstroMimic") {
    spawnCollectibleUnsafe(
      Isaac.GetItemIdByName(postMimic),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
  setMimicSpecificBoss("MonstroMimic", true);
  setMimicSpecificBoss(postMimic, false);
}

export function postBossMonstroDefeated() {
  if(!doesEntityExist(5,100,Isaac.GetItemIdByName("MonstroMimesis"))){
    spawnCollectibleUnsafe(
      Isaac.GetItemIdByName("MonstroMimesis"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

export function monstroMimesisOnUse() {
  const Entities = getEntities(-1,-1,-1,true);
  for (const entity of Entities) {
    if(entity !== undefined && isActiveEnemy(entity)) {
      spawnEffect(EffectVariant.MONSTROS_TOOTH, 0, entity.Position);
      break;
    }
  }
}

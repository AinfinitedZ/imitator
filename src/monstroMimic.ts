import {
  ButtonAction,
  EffectVariant,
  EntityType,
} from "isaac-typescript-definitions";
import {
  addCollectible,
  doesEntityExist,
  getPlayers,
  removeCollectible,
  setEntityVelocities,
  spawn,
  spawnCollectibleUnsafe,
} from "isaacscript-common";
import { iterateMimicTrack, setMimicSpecificBoss } from "./mimicTrack";
import { mod } from "./main"

export function ifPlayerPickupMonstro() {
  for (const player of getPlayers()) {
    addCollectible(player, Isaac.GetItemIdByName("Monstro's Lung"));
    addCollectible(player, Isaac.GetItemIdByName("MonstroMimesis"));
    const postMimic = iterateMimicTrack();
    if (postMimic !== "Not found" && postMimic !== "MonstroMimic" &&
        doesEntityExist(EntityType.PICKUP, 0, Isaac.GetItemIdByName("MonstroMimesis"))) {
      spawnCollectibleUnsafe(
        Isaac.GetItemIdByName(postMimic),
        Vector(300, 280),
        undefined,
      );
    }
    //TODO: function that remove previous mimic
    removeCollectible(player, Isaac.GetItemIdByName("LarryMimic"));
    setMimicSpecificBoss("MonstroMimic", true);
  }
}

export function postBossMonstroDefeated() {
  spawnCollectibleUnsafe(
    Isaac.GetItemIdByName("MonstroMimic"),
    Vector(300, 280),
    undefined,
  );
}

export function monstroMimicOnUse() {

}
/*
export function monstroMimicOnUse() {
  //TODO: implement surplex!
  for (const player of getPlayers()) {
    let target = spawn(
      EntityType.EFFECT,
      EffectVariant.TARGET,
      0,
      player.Position,
    );



    let targetArray = [target];
    const targetPtrHash = GetPtrHash(target);
    const NUM_FRAME_LEFT = 30;
    moveTargetUntilExplosion(
      target,
      NUM_FRAME_LEFT,
      targetPtrHash,
      targetArray,
    );
  }
}
function moveTargetUntilExplosion(
  target: Entity,
  numFramesLeft: int,
  targetPtrHash: PtrHash,
  targetArray: Entity[],
) {
  const velocity = Vector(
    Input.GetActionValue(ButtonAction.LEFT, 0),
    Input.GetActionValue(ButtonAction.LEFT, 0),
  );
  let targetMap = new Map([[targetPtrHash, velocity]]);
  setEntityVelocities(targetMap, targetArray);
  if (numFramesLeft > 0) {
    //mod.runNextGameFrame(() => {
    moveTargetUntilExplosion(
      target,
      (numFramesLeft -= 1),
      targetPtrHash,
      targetArray,
    );
    //});
  }
  for (const player of getPlayers()) {
    spawn(EntityType.EFFECT, EffectVariant.SHOCKWAVE, 0, player.Position);
  }
}
  */


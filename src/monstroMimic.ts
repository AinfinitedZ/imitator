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
import { mod } from "./main"

const player = Isaac.GetPlayer();

export function ifPlayerPickupMonstro() {
  addCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("Monstro's Lung"));
  addCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("MonstroMimesis"));
  const postMimic = iterateMimicTrack();

  if (postMimic !== "Not found" && postMimic !== "MonstroMimic") {
    spawnCollectibleUnsafe(
      Isaac.GetItemIdByName(postMimic),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
  removePreviousMimic(postMimic);

  setMimicSpecificBoss("MonstroMimic", true);
  setMimicSpecificBoss(postMimic, false);
}

export function postBossMonstroDefeated() {
  if(!doesEntityExist(5,100,Isaac.GetItemIdByName("MonstroMimic"))){
    spawnCollectibleUnsafe(
      Isaac.GetItemIdByName("MonstroMimic"),
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
/*
export function monstroMimicOnUse() {
//TODO: implement surplex!

  let target = spawn(
    EntityType.EFFECT,
    EffectVariant.TARGET,
    0,
    Isaac.GetPlayer().Position,
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


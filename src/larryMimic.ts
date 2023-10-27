import {
  addCollectible,
  doesEntityExist,
  getPlayers,
  removeCollectible,
  spawnCollectibleUnsafe,
} from "isaacscript-common";
import { iterateMimicTrack, setMimicSpecificBoss } from "./mimicTrack";
import { EntityType } from "isaac-typescript-definitions";

export function ifPlayerPickupLarry() {
  for (const player of getPlayers()) {
    //TODO: tear has brainnorm effect
    addCollectible(player, Isaac.GetItemIdByName("LarryMimesis"));
    const postMimic = iterateMimicTrack();
    print(postMimic);
    if (postMimic !== "Not found" && postMimic !== "LarryMimic" &&
        doesEntityExist(EntityType.PICKUP, 0, Isaac.GetItemIdByName("MonstroMimesis"))) {
      spawnCollectibleUnsafe(
        Isaac.GetItemIdByName(postMimic),
        Vector(300, 280),
        undefined,
      );
    }
    removeCollectible(player, Isaac.GetItemIdByName("Monstro's Lung"));
    removeCollectible(player, Isaac.GetItemIdByName("MonstroMimic"));
    setMimicSpecificBoss("LarryMimic", true);
  }
}

export function postBossLarryDefeated() {
  spawnCollectibleUnsafe(
    Isaac.GetItemIdByName("LarryMimic"),
    Vector(300, 280),
    undefined,
  );
}

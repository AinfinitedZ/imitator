import { EntityType, PickupVariant } from "isaac-typescript-definitions";
import { ModCallbackCustom, upgradeMod, addCollectible, getPlayers, getActiveItemSlots, hasCollectibleInActiveSlot,
  spawnCollectibleUnsafe,
  removeCollectible,
  hasCollectible} from "isaacscript-common";
import { iterateMimicTrack, setMimicSpecificBoss } from "./mimicTrack";

export function ifPlayerPickupLarry(){
  for(const player of getPlayers()) {
    //TODO: tear has brainnorm effect
    addCollectible(player, Isaac.GetItemIdByName("LarryMimesis"));
    const postMimic = iterateMimicTrack()
    print(postMimic);
    if(postMimic !== "Not found") {
      spawnCollectibleUnsafe(Isaac.GetItemIdByName(postMimic), Vector(300,280), undefined);
    }
    removeCollectible(player, Isaac.GetItemIdByName("Monstro's Lung"));
    removeCollectible(player, Isaac.GetItemIdByName("MonstroMimic"));
    setMimicSpecificBoss("LarryMimic", true);
  }
}

export function isBossLarry() {
  spawnCollectibleUnsafe(Isaac.GetItemIdByName("LarryMimic"), Vector(300,280), undefined);}

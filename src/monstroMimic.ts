import { EntityType, PickupVariant } from "isaac-typescript-definitions";
import { ModCallbackCustom, upgradeMod, addCollectible, getPlayers, getActiveItemSlots, hasCollectibleInActiveSlot,
  spawnCollectibleUnsafe,
  removeCollectible,
  hasCollectible} from "isaacscript-common";
import { iterateMimicTrack, setMimicSpecificBoss } from "./mimicTrack";

export function ifPlayerPickupMonstro(){
  for(const player of getPlayers()) {
    addCollectible(player, Isaac.GetItemIdByName("Monstro's Lung"));
    addCollectible(player, Isaac.GetItemIdByName("MonstroMimesis"));
    const postMimic = iterateMimicTrack()
    if(postMimic !== "Not found" ) {
      spawnCollectibleUnsafe(Isaac.GetItemIdByName(postMimic), Vector(300,280), undefined);
    }
    removeCollectible(player, Isaac.GetItemIdByName("LarryMimic"));
    setMimicSpecificBoss("MonstroMimic", true);
  }
}

export function isBossMonstro() {
  spawnCollectibleUnsafe(Isaac.GetItemIdByName("MonstroMimic"), Vector(300,280), undefined);
}

export function onuse(){

}
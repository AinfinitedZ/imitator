import { TrinketType } from "isaac-typescript-definitions";
import { removeCollectible, removeTrinketCostume, temporarilyRemoveTrinket } from "isaacscript-common";

let mimicTrack = new Map([
  ["MonstroMimic", false],
  ["LarryMimic", false],
]);

export function isMimicSpecificBoss(bossName: string): boolean | undefined {
  return mimicTrack.get(bossName);
}

export function setMimicSpecificBoss(bossName: string, value: boolean) {
  mimicTrack.set(bossName, value);
}

export function iterateMimicTrack(): string {
  for (let entry of mimicTrack.entries()) {
    if (entry[1] == true) {
      setMimicSpecificBoss(entry[0], false);
      return entry[0];
    }
  }
  return "Not found";
}

export function removePreviousMimic(postMimic:String){
  if(postMimic == "MonstroMimic") {
    removeCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("Monstro's Lung"));
    removeCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("MonstroMimic"));
  } else if(postMimic == "LarryMimic") {
    temporarilyRemoveTrinket(Isaac.GetPlayer(), TrinketType.BRAIN_WORM);
    removeCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("LarryMimic"))
  }
}
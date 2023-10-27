import { CollectibleType, ModCallback } from "isaac-typescript-definitions";
import { onuse } from "./mimesis";
import { ModCallbackCustom, upgradeMod, addCollectible, hasCollectibleInActiveSlot, ISCFeature} from "isaacscript-common";
import { ifPlayerPickupMonstro, monstroMimesisOnUse, postBossMonstroDefeated } from "./monstroMimic";
import { larryMimesisOnUse, ifPlayerPickupLarry, postBossLarryDefeated } from "./larryMimic";

const MOD_NAME = "imitator";
const modVanilla = RegisterMod(MOD_NAME, 1);
const features = [ISCFeature.RUN_IN_N_FRAMES, ISCFeature.DISABLE_INPUTS] as const;
export const mod = upgradeMod(modVanilla, features);
const player = Isaac.GetPlayer(0);

export function main(): void {
  mod.AddCallbackCustom(ModCallbackCustom.POST_ENTITY_KILL_FILTER, postBossMonstroDefeated, 20);
  mod.AddCallbackCustom(ModCallbackCustom.POST_ENTITY_KILL_FILTER, postBossLarryDefeated, 19);
  mod.AddCallbackCustom(ModCallbackCustom.POST_ITEM_PICKUP, ifPlayerPickupMonstro, 1, Isaac.GetItemIdByName("MonstroMimic"));
  mod.AddCallbackCustom(ModCallbackCustom.POST_ITEM_PICKUP, ifPlayerPickupLarry, 1, Isaac.GetItemIdByName("LarryMimic"));
  mod.AddCallbackCustom(ModCallbackCustom.POST_ITEM_DISCHARGE, monstroMimesisOnUse, Isaac.GetItemIdByName("MonstroMimesis"));
  mod.AddCallbackCustom(ModCallbackCustom.POST_ITEM_DISCHARGE, larryMimesisOnUse, Isaac.GetItemIdByName("LarryMimesis"));
}
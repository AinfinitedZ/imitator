import { CollectibleType, ModCallback } from "isaac-typescript-definitions";
import { onuse } from "./mimesis";
import { ModCallbackCustom, upgradeMod, addCollectible, hasCollectibleInActiveSlot} from "isaacscript-common";
import { ifPlayerPickupMonstro, isBossMonstro } from "./monstroMimic";
import { ifPlayerPickupLarry, isBossLarry } from "./larryMimic";

const MOD_NAME = "imitator";
const modVanilla = RegisterMod(MOD_NAME, 1);
const mod = upgradeMod(modVanilla);
const player = Isaac.GetPlayer(0);

export function main(): void {
  mod.AddCallbackCustom(ModCallbackCustom.POST_ENTITY_KILL_FILTER, isBossMonstro, 20);
  mod.AddCallbackCustom(ModCallbackCustom.POST_ENTITY_KILL_FILTER, isBossLarry, 19);
  mod.AddCallbackCustom(ModCallbackCustom.POST_ITEM_PICKUP, ifPlayerPickupMonstro, 1, Isaac.GetItemIdByName("MonstroMimic"));
  mod.AddCallbackCustom(ModCallbackCustom.POST_ITEM_PICKUP, ifPlayerPickupLarry, 1, Isaac.GetItemIdByName("LarryMimic"));
}
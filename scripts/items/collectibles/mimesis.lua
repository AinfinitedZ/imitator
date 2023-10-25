local mod = Imitator
local mimesis = {} 
mimesis.name = "mimesis"
mimesis.ID = Isaac.GetItemIdByName("mimesis")
local sfx = SFXManager()

function mimesis:onuse()
	local game = Game()
	local player = game:GetPlayer(0)
	mimesis:mimic(player)
	return {
		Discharge = true,
		Remove = false,	
		ShowAnim = true,
	}
end

function mimesis:mimic(player)
	IsMonstroDefeated = false
	player:AddCollectible(507, 0, true, ActiveSlot.SLOT_PRIMARY, 0)
	-- player:AddCollectible(229, 0, true, ActiveSlot.SLOT_PRIMARY, 0)
end

function mimesis:pickup(entity)
	local player = Game():GetPlayer(0)
	--if(~player.HasCollectible()) then
	--	player:AddCollectible(229, 0, true, ActiveSlot.SLOT_PRIMARY, 0)
	-- end
end

function mimesis:isBossMonstro(entity)
	Isaac.Spawn(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_COLLECTIBLE, Isaac.GetItemIdByName("MonstroMimic"), Vector(300,280), Vector(0,0), nil)
end

function mimesis:isPlayerPickupCollectible(entityId)
	print(1)
	if(~EntityPlayer.IsItemQueueEmpty()) then
		player:AddCollectible(229, 0, true, ActiveSlot.SLOT_PRIMARY, 0)
	end
end

mod:AddCallback(ModCallbacks.MC_USE_ITEM, mimesis.onuse, mimesis.ID)
mod:AddCallback(ModCallbacks.MC_POST_ENTITY_KILL, mimesis.isBossMonstro, EntityType.ENTITY_MONSTRO)
mod:AddCallback(ModCallbacks.MC_POST_ITEM_INIT, mimesis.isPlayerPickupCollectible, PickupVariant.PICKUP_COLLECTIBLE)

return mimesis
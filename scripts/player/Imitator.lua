local mod = Imitator
local game = Game()
NullItemID.ID_ALPHA_CAT_EARS = Isaac.GetCostumeIdByPath("gfx/characters/character_alpha_cat_ears.anm2")

function mod:imitatorGameStart(player)
	local Name = player:GetName()
	if Name == "Imitator" then
		player:AddCollectible(CollectibleType.COLLECTIBLE_SAD_ONION, 0, true, ActiveSlot.SLOT_PRIMARY, 0)
		player:AddTrinket(TrinketType.TRINKET_PETRIFIED_POOP, true)
		player:AddCard(Card.CARD_FOOL)
		player:AddNullCostume(NullItemID.ID_ALPHA_CAT_EARS)
		player:AddCacheFlags(CacheFlag.CACHE_DAMAGE)
		player:AddCacheFlags(CacheFlag.CACHE_FIREDELAY)
		player:AddCacheFlags(CacheFlag.CACHE_SHOTSPEED)
		player:AddCacheFlags(CacheFlag.CACHE_RANGE)
		player:AddCacheFlags(CacheFlag.CACHE_SPEED)
		player:AddCacheFlags(CacheFlag.CACHE_LUCK)
	else
		player:TryRemoveNullCostume(NullItemID.ID_ALPHA_CAT_EARS)
	end
end

function mod:imitatorInitStats(player, flag)
	local Name = player:GetName()
	if Name == "Imitator" then
		if flag == CacheFlag.CACHE_DAMAGE then
			player.Damage = player.Damage + 2
		end
		if flag == CacheFlag.CACHE_FIREDELAY then
			player.MaxFireDelay = player.MaxFireDelay - 1
		end
		if flag == CacheFlag.CACHE_SHOTSPEED then
			player.ShotSpeed = player.ShotSpeed + 1
		end
		if flag == CacheFlag.CACHE_RANGE then
			player.TearHeight = player.TearHeight + 1
			player.TearRange = player.TearRange - 50
		end
		if flag == CacheFlag.CACHE_SPEED then
			player.MoveSpeed = player.MoveSpeed - 0.1
		end
		if flag == CacheFlag.CACHE_LUCK then
			player.Luck = player.Luck - 1
		end
	end
end

mod:AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, mod.imitatorGameStart, 0)
mod:AddCallback(ModCallbacks.MC_EVALUATE_CACHE, mod.imitatorInitStats)
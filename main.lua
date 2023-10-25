Imitator = RegisterMod("Imitator", 1)

require("scripts.player.Imitator")

local Collectibles = {}
Collectibles.mimesis = require("scripts.items.collectibles.mimesis")
Imitator.Collectibles = Collectibles

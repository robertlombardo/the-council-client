const GameLogStoreFuncs = {
	getRoomDescription: room => {
	    const {description, players, exits} = room

	    return [
		    {
		        notification : true,
		        color        : `#bdbdbd`,
		        text         : description,
		    },
		    {
		        notification : true,
		        color        : `#469f95`,
		        text         : `People in the area: ${players.map(p => p.display_name).join(`, `)}`,
		    },
		    {
		        notification : true,
		        color        : `#1ab10c`,
		        text         : `Exits: ${Object.keys(exits).join(`, `)}`,
		    },
		]
	},
}
module.exports = GameLogStoreFuncs

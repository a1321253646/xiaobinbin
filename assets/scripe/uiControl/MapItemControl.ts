const {ccclass, property} = cc._decorator;
import GameControl from './GameControl';
@ccclass
export default class MapItemControl extends cc.Component {

	@property(cc.Sprite)
	icon: cc.Sprite = null;

	@property(cc.Button)
	bt: cc.Button = null;


	mGame: GameControl;
	mId: number;
	init(game: GameControl, id: number) {
		console.log("init map id= " + id);
		this.mGame = game;
		this.mId = id;
		var self = this;
		cc.loader.load("http://120.79.249.55/images/mapIcon/" + game.mUserInfo.mapInfo.get(id).icon + ".png", function (err, texture) {
			var sprite = new cc.SpriteFrame(texture);
			self.icon.spriteFrame = sprite;
		});
	}

	openMap() {
		//cc.find("Canvas").getComponent(GameControl).openMap(this.mId);
		this.mGame.openMap(this.mId);

	}

}

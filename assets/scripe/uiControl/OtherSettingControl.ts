const {ccclass, property} = cc._decorator;
import GameControl from './GameControl';
import MapItemControl from './MapItemControl';
@ccclass
export default class NewClass extends cc.Component {

	@property(cc.Label)
	mName: cc.Label = null;

	@property(cc.Sprite)
	mIcon: cc.Sprite = null;

	isShow = false;
	mStatus = 0;//表示没有运动，1表示伸出 2表示缩回去
	isInit = false;
	init(name:string,icon:string) {
		this.mName.string = name;
		var self = this;
		cc.loader.load({ url: icon, type: 'jpg' }, function (err, texture) {
			var sprite = new cc.SpriteFrame(texture);
			self.mIcon.spriteFrame = sprite;
		});
	}
	moveXIdel = 7
	update(dt) {
		if (this.mStatus ==0 ) {
			return;
		}
		if (this.mStatus == 1) {
			var p = this.node.getPosition();
			var x = p.x - this.moveXIdel;
			if (p.x + this.moveXIdel <= 190) {
				x = 190;
				this.mStatus = 0;
			}
			this.node.setPosition(x, p.y);
		} else if(this.mStatus == 2){
			var p = this.node.getPosition();
			var x = p.x + this.moveXIdel;
			if (p.x + this.moveXIdel >= 527) {
				x = 527;
				this.mStatus = 0;
			}
			this.node.setPosition(x, p.y);
		}
	}

	onclick() {
		if (this.mStatus != 0) {
			return;
		}
		if (this.isShow) {
			this.isShow = false;
			this.mStatus = 2;
		} else {
			this.isShow = true;
			this.mStatus = 1;
		}
	}
	disShow() {
		if (this.isShow) {
			this.isShow = false;
			this.mStatus = 2;
		}
	}
}

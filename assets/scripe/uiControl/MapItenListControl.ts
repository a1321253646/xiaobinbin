const {ccclass, property} = cc._decorator;
import GameControl from './GameControl';
import MapItemControl from './MapItemControl';
@ccclass
export default class NewClass extends cc.Component {
	isShow = false;
	mStatus = 0;//表示没有运动，1表示伸出 2表示缩回去
	isInit = false;
	init(game: GameControl) {
		if (this.isInit) {
			return;
		}
		var list = this.node.getComponentsInChildren(MapItemControl);
		var i = 0;
		game.mUserInfo.mapInfo.forEach((value, key) => {
			
			list[i].init(game, key);
			i++;
		});
	}
	moveXIdel = 7
	update(dt) {
		if (this.mStatus ==0 ) {
			return;
		}
		if (this.mStatus == 1) {
			var p = this.node.getPosition();
			var x = p.x + this.moveXIdel;
			if (p.x + this.moveXIdel >= -215) {
				x = -215;
				this.mStatus = 0;
			}
			this.node.setPosition(x, p.y);
		} else if(this.mStatus == 2){
			var p = this.node.getPosition();
			var x = p.x - this.moveXIdel;
			if (p.x + this.moveXIdel <= -475) {
				x = -475;
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

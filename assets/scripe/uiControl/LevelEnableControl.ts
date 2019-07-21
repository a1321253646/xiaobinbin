import GameControl from "./GameControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

	@property(cc.Label)
	tx: cc.Label = null;

	mTime = 0;
	isShow = false;
	show(skill: number, param: number,name :string, game: GameControl) {
		this.mTime = 0;
		this.node.setScale(1);
		var strId = 0;
		if (skill == 2) {
			strId = 1000018;
		} else if (skill == 4){
			strId = 1000017;
		}
		var str = game.mUserInfo.mString.get(strId);
		var date = 0;
		if (param > 10000) {
			date = param / 10000;
		} else {
			date = param / 100;
		}
		if (str.match("&p")) {
			str = str.replace("&p", date + "");
		}
		if (str.match("&n")) {
			str = str.replace("&n", name);
		}
		this.tx.string = str;
		this.isShow = true;
	}

	update(dt) {
		if (this.isShow) {
			this.mTime += dt;
			if (this.mTime > 2) {
				this.isShow = false;
				this.node.setScale(0);
			}
		}
	}
}

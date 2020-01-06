import GameControl from "./GameControl";
import NumberToString from "../ultis/NumberToString";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
	@property(cc.Label)
	mText: cc.Label = null;

	isInit = false;
	mAllTime = 0;
	leng = 0;
	mFlyTime = 0;
	mX = 0;
	mY = 0;
	mCount = 0;
	mScaleEnd = 0;
	init(count: number) {
		this.mText.string = "+"+NumberToString.numberToString(count);
		this.mFlyTime = 0;
		this.node.setScale(1);

		this.isInit = true;
	} 
	initStr(str: string) {
		this.mText.string = str;
		this.mFlyTime = 0;
		this.node.setScale(1);

		this.isInit = true;
	}

	update(dt) {
		if (!this.isInit) {
			return;
		}
		this.mFlyTime += dt;
		if (this.mFlyTime < 0.5) {
			this.node.setPosition(this.node.position.x, this.node.position.y + 1);
			this.node.setScale(1 + 0.5 * (this.mFlyTime / 0.5));
		} else {
			this.end();
		}
	}
	end() {
		this.isInit = false;
		this.node.setScale(0);
	}
}

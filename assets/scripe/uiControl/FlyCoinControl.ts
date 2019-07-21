import GameControl from "./GameControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


	isInit = false;
	mAllTime = 0;
	leng = 0;
	mFlyTime = 0;
	mX = 0;
	mY = 0;
	mCount = 0;
	mScaleEnd = 0;
	mGame: GameControl
	init(count: number, game: GameControl) {
		this.mGame = game;
		this.mCount = count;
		this.node.setScale(1);
		this.mScaleEnd = 50 / this.node.getContentSize().width;
		this.mScaleEnd = 1 - this.mScaleEnd;
		var x = -311.2 - this.node.position.x;
		
		var y = 605.7 - this.node.position.y;
		this.leng = x * x + y * y;
		this.leng = Math.sqrt(this.leng);
		this.mAllTime = this.leng / 1000;
		this.mFlyTime = 0;
		this.mX = this.node.position.x;
		this.mY = this.node.position.y;
		this.isInit = true;
	} 
	update(dt) {
		if (!this.isInit) {
			return;
		}
		this.mFlyTime += dt;
		if (this.mFlyTime < this.mAllTime) {
			var bili = this.mFlyTime / this.mAllTime;
			this.node.setPosition(this.mX + ((-311.2 - this.mX) * bili), this.mY + ((605.7 - this.mY) * bili));
			this.node.setScale(1 - bili * this.mScaleEnd);
		} else {
			this.node.setPosition(-311.2, 605.7)
			this.end();
		}
	}
	end() {
		this.isInit = false;
		this.node.setScale(0);
		this.mGame.flyCoinEnd(this.mCount);
	}
}

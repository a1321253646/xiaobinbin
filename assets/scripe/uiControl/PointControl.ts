import GameControl from "./GameControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
	@property(cc.Node)
	mPoint: cc.Node = null;
	@property(cc.Node)
	mCricle: cc.Node = null;

	@property(cc.MotionStreak)
	mMotion: cc.MotionStreak = null;
    // LIFE-CYCLE CALLBACKS:

	// onLoad () {}
	mGame: GameControl
	start() {
		this.mGame = cc.find("Canvas").getComponent(GameControl);
    }
	mStatus = 0;
	mTargetTime = 0.3;
	mTime = 0;
	mCricleTime = 0

	isWork = false;;

	click() {
		this.mCricle.setScale(0.3);
		this.isWork = true;
		this.mStatus = 0;
		this.mTime = 0;
		this.mTargetTime = 0.3;
		this.mCricleTime = 0;
		this.node.setScale(1);

	}
	x1 = 0;
	x2 = 0;
	y1 = 0;
	y2 = 0;
	delX = 0;
	delY = 0;
	moveMoney = 0;
	move(x1: number, y1: number, x2: number, y2: number) {
		this.mCricle.setScale(0);
		this.isWork = true;
		this.mStatus = 10; 
		this.mTime = 0;
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;
		this.delX = x2 - x1;
		this.delY = y2 - y1;
		this.x1 = this.x1 - this.delX * 0.3;
		this.y1 = this.y1 - this.delY * 0.3;
		this.delX = this.delX * 1.6;
		this.delY = this.delY * 1.6;
		this.node.setPosition(x1, y1);
		this.moveMoney = this.mGame.mUserInfo.money;
		this.node.setScale(1);
		this.mMotion.enabled = true;
	}

	unWork() {
		this.isWork = false;
		this.mMotion.enabled = false;
		this.node.setScale(0);
	}

	update(dt) {

		if (!this.isWork  ) {
			return;
		}
		if (this.mStatus == 10 &&(this.moveMoney != this.mGame.mUserInfo.money || this.mGame.isShowlevel)) {
			this.unWork();
			return;
		}
		if (this.mStatus == 0) {
			this.mTime += dt;
			if (this.mTime < this.mTargetTime) {
				this.mPoint.setRotation(-30 * this.mTime / this.mTargetTime)
			} else {
				this.mStatus = 1;
				this.mTime = 0;
				this.mTargetTime = 0.2;
			}
		}
		else if (this.mStatus == 1) {
			this.mTime += dt;
			if (this.mTime >= this.mTargetTime) {
				this.mStatus = 2;
				this.mTime = 0;
				this.mTargetTime = 0.3;
			}
		}
		else if (this.mStatus == 2) {
			this.mTime += dt;
			if (this.mTime < this.mTargetTime) {
				this.mPoint.setRotation(-30 * (this.mTargetTime - this.mTime) / this.mTargetTime);
			} else {
				this.mPoint.setRotation(0);
				this.mStatus = 3;
				this.mTime = 0;
				this.mTargetTime = 0.2;
			}
		}
		else if (this.mStatus == 3) {
			this.mTime += dt;
			if (this.mTime >= this.mTargetTime) {
				this.mStatus = 0;
				this.mTime = 0;
				this.mTargetTime = 0.3;
			}
		}
		else if (this.mStatus == 10) {
			this.mTime += dt;
			if (this.mTime < 1) {
				this.node.setPosition(this.x1 + this.delX * this.mTime, this.y1 + this.delY * this.mTime);
			} else {
				this.mTime = 0;
				this.mMotion.enabled = false;
				this.node.setPosition(this.x1, this.y1 );
				this.mMotion.enabled = true;
			}
		}
		if (this.mStatus < 10) {
			this.mCricleTime += dt;
			if (this.mCricleTime < 1) {

				if (this.mCricleTime < 0.5) {
					this.mCricle.setScale(0.3 + 1.2 * (this.mCricleTime / 0.5))
				} else if (this.mCricleTime < 1) {
					this.mCricle.setScale(0.3 + 1.2 * (1 - this.mCricleTime) / 0.5)
				}
			} else {
				this.mCricle.setScale(0.3)
				this.mCricleTime = 0;
			}
		}

	}
}

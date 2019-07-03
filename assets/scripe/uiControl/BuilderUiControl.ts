const { ccclass, property } = cc._decorator;
import BuilderStatusBean from '../bean/BuilderStatusBean';
import BuilderCoinControl from './BuilderCoinControl';
import LevelUpControl from './LevelUpControl';
import BuilderControl from './BuilderControl';
import BuilderJsonInfo from './BuilderControl';
import GameControl from './GameControl';
@ccclass
export default class NewClass extends cc.Component {

	@property(cc.Sprite)
	mLoading: cc.Sprite = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
	mId: number;
	mBean: BuilderStatusBean;
	mGame: GameControl;
	mCoinControl: BuilderCoinControl;
	mLevelUpControl: LevelUpControl;
	
	isShowLevel = false;
	unInit() {
		this.mGame = null;
		this.mLevelUpControl = null;
		if (this.mCoinControl != null) {
			this.mCoinControl.unInit();
		}
		if (this.mLevelUpControl != null) {
			this.mLevelUpControl.unInit();
		}
		this.node.setScale(0, 0);
	}
	init(id: number, game: GameControl) {
		this.mGame = game;
		this.mId = id;
		this.node.getComponentInChildren(BuilderCoinControl)
		//this.node.getComponentInChildren(LevelUpControl).init(this.mId, this.mGame);
		
		this.node.position = this.node.parent.position;
		this.node.parent = cc.find("Canvas/Main Camera/builderUi");

		this.mCoinControl = this.node.getComponentInChildren(BuilderCoinControl);
		this.mLevelUpControl = this.node.getComponentInChildren(LevelUpControl);

		this.mCoinControl.init(this.mId, this.mGame);
		this.mLevelUpControl.init(this.mId, this.mGame);
		this.node.setScale(1, 1);
		this.mCoinControl.node.setScale(1, 1);
		this.mLevelUpControl.node.setScale(0, 0);

		var status = this.mGame.mUserInfo.mapBuilderStatus.get(this.mId);
		if (status != null) {
			this.mCoinControl.setEnable();
			this.mLevelUpControl.setEnable();
		}


	}

	showLoaded() {
		this.mLevelUpControl.showLoaded();
		this.mLoading.node.setScale(0, 0);
		this.showLevelUpDeal()
	}


	showLoading() {
		this.mLoading.node.setScale(1, 1);
		this.mCoinControl.node.setScale(0, 0);
		this.mLevelUpControl.node.setScale(0, 0);
		this.mLevelUpControl.showLoad();
	}
	showLevel() {
		this.mLoading.node.setScale(0, 0);
		this.mCoinControl.node.setScale(0, 0);
		this.mLevelUpControl.node.setScale(1, 1);
	}
	showCoin() {
		this.mLoading.node.setScale(0, 0);
		this.mCoinControl.node.setScale(1, 1);
		this.mLevelUpControl.node.setScale(0, 0);
	}

	setEnable() {
		this.mBean = this.mGame.mUserInfo.mapBuilderStatus.get(this.mId);
		this.mCoinControl.setEnable();
		this.mLevelUpControl.setEnable();
	}
	showLevelUp() {
		this.isShowLevel = !this.isShowLevel;
		this.showLevelUpDeal();
	}

	levelUpDeal() {
		this.mCoinControl.levelUpDeal();
		this.mLevelUpControl.levelUpDeal();
	}

	showLevelUpDeal() {
		if (!this.isShowLevel) {
			this.mCoinControl.node.setScale(1, 1);
			this.mLevelUpControl.node.setScale(0, 0);
		} else if (this.mCoinControl.isEnable) {
			this.mCoinControl.node.setScale(0, 0);
			this.mLevelUpControl.node.setScale(1, 1);
		} else if (!this.mCoinControl.isEnable) {
			this.mCoinControl.node.setScale(0, 0);
			this.mLevelUpControl.node.setScale(0, 0);
		}
	}

    // update (dt) {}
}

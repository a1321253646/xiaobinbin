const { ccclass, property } = cc._decorator;
import BuilderStatusBean from '../bean/BuilderStatusBean';
import BuilderCoinControl from './BuilderCoinControl';
import LevelUpControl from './LevelUpControl';
import BuilderControl from './BuilderControl';
import BuilderUnitControl from './BuilderUnitControl';

import GameControl from './GameControl';
@ccclass
export default class NewClass extends cc.Component {

	@property(cc.Sprite)
	mLoading: cc.Sprite = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

	start() {
		console.log("ui start");
		this.node.position = this.node.parent.position;
		this.node.parent = cc.find("Canvas/Main Camera/builderUi");
    }
	mId: number;
	mBean: BuilderStatusBean;
	mGame: GameControl;
	mCoinControl: BuilderCoinControl;
	mLevelUpControl: LevelUpControl;
	mUnInit: BuilderUnitControl;
	
	isShowLevel = false;

	unInit(id: number, game: GameControl) {
		console.log("ui unInit");
		
		if (this.mCoinControl == null) {
			this.mCoinControl = this.node.getComponentInChildren(BuilderCoinControl);
		} else {
			this.mCoinControl.unInit();
		}
		this.mCoinControl.node.setScale(0, 0);

		if (this.mLevelUpControl == null) {
			this.mLevelUpControl = this.node.getComponentInChildren(LevelUpControl);
		} else {
			this.mLevelUpControl.unInit();
		}
		this.mLevelUpControl.node.setScale(0, 0);

		if (this.mUnInit == null) {
			this.mUnInit =  this.node.getComponentInChildren(BuilderUnitControl);
		}
		
		this.mUnInit.unInit(id, game);
		this.mUnInit.node.setScale(1,1);
		console.log("ui unInit end");
		this.mGame = null;
	}
	init(id: number, game: GameControl) {
		console.log("ui Init");
		this.mGame = game;
		this.mId = id;
		this.node.getComponentInChildren(BuilderCoinControl)
		//this.node.getComponentInChildren(LevelUpControl).init(this.mId, this.mGame);

		this.mCoinControl = this.node.getComponentInChildren(BuilderCoinControl);
		this.mLevelUpControl = this.node.getComponentInChildren(LevelUpControl);
		this.mUnInit = this.node.getComponentInChildren(BuilderUnitControl);

		this.mCoinControl.init(this.mId, this.mGame);
		this.mLevelUpControl.init(this.mId, this.mGame);
		this.node.setScale(1, 1);
		this.mCoinControl.node.setScale(1, 1);
		this.mLevelUpControl.node.setScale(0, 0);
		this.mUnInit.node.setScale(0, 0);

		var status = this.mGame.mUserInfo.mapBuilderStatus.get(this.mId);
		if (status != null) {
			this.mCoinControl.setEnable();
			this.mLevelUpControl.setEnable();
		}
		console.log("ui Init end");

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
		this.showLevelUpDeal();

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
		if (this.mCoinControl.isEnable) {
			if (!this.isShowLevel) {
				this.mCoinControl.node.setScale(1, 1);
				this.mLevelUpControl.node.setScale(0, 0);
			} else {
				this.mCoinControl.node.setScale(0, 0);
				this.mLevelUpControl.node.setScale(1, 1);
			}
		} else {
			/*if (!this.isShowLevel) {
				this.mCoinControl.node.setScale(0, 0);
				this.mLevelUpControl.node.setScale(0, 0);
				this.mUnInit.node.setScale(1, 1);
			} else {
				this.mCoinControl.node.setScale(0, 0);
				this.mLevelUpControl.node.setScale(0, 0);
				this.mUnInit.node.setScale(0, 0);
			}*/
		}
	}

    // update (dt) {}
}

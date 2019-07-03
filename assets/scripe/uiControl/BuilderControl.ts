const { ccclass, property } = cc._decorator;

import BuilderStatusBean from '../bean/BuilderStatusBean';
import BuilderBean from '../bean/BuilderBean';
import BuilderUiControl from './BuilderUiControl';
import BuilderListControl from './BuilderListControl';
import GameControl from './GameControl';
@ccclass
export default class NewClass extends cc.Component {

	@property(cc.Sprite)
	mIcon: cc.Sprite = null;

	mListControl: BuilderListControl;
	mUi:BuilderUiControl;
	mBean: BuilderStatusBean;
	mGame: GameControl;
	mId: number;
	init(id: number,game: GameControl,isInitUi :boolean) {
		this.mGame = game;
		this.mId = id;
		this.mUi = this.node.getComponentInChildren(BuilderUiControl);
		var level = 0;
		if (this.mGame.mUserInfo.mapBuilderStatus != null) {
			var status = this.mGame.mUserInfo.mapBuilderStatus.get(this.mId);

			if (status == null) {
				level = 0;
			} else {
				level = status.level;
			}

		} 
		this.node.setScale(1, 1);
		console.log("BuilderControl  init  level = " + level);
		console.log("BuilderControl  init  this.mId = " + this.mId);
		var map = this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId);
	

		console.log("this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(level).icon  " + this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(level).icon );
		var self = this;
		cc.loader.loadRes("jianzhu/" + this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(level).icon , cc.SpriteFrame, function (err, spriteFrame) {
			self.mIcon.spriteFrame = spriteFrame;
		});
		if (isInitUi) {
			this.mUi.init(this.mId, this.mGame);
			this.mUi.node.setScale(1, 1);
		} else {
			this.mUi.unInit();
			this.mUi.node.setScale(0, 0);
		}

		if (level == 0) {
			this.mIcon.setState(1);
		} else {
			this.mIcon.setState(0);
		}
	}
	unInit() {
		this.mGame = null;
		this.mId = 0;
		this.mBean = null;
		if (this.mUi != null) {
			this.mUi.unInit();
		}
		
		this.node.setScale(0, 0);
	}


	showLoaded() {
		var self = this;
		cc.loader.loadRes("jianzhu/" + this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mGame.mUserInfo.mapBuilderStatus.get(this.mId).level).icon, cc.SpriteFrame, function (err, spriteFrame) {
			self.mIcon.spriteFrame = spriteFrame;
		});

		this.mUi.showLoaded();
	}

	showLoading() {
		this.mUi.showLoading();
	}

	enableBuilder() {
		this.mBean = this.mGame.mUserInfo.mapBuilderStatus.get(this.mId);
		this.mIcon.setState(0);
		this.mUi.setEnable();
	}
	showLevelUp() {
		this.mUi.showLevelUp();
	}
	levelUpDeal() {
		this.mUi.levelUpDeal();
	}
}

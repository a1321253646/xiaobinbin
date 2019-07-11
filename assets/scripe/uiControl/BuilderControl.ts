const { ccclass, property } = cc._decorator;

import BuilderStatusBean from '../bean/BuilderStatusBean';
import BuilderBean from '../bean/BuilderBean';
import MapBuilderInfo from '../bean/MapBuilderInfo';
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
	iConPath = "";
	init(id: number, game: GameControl, isInitUi: boolean) {
		
		this.mGame = game;
		this.mId = id;
		if (this.mUi == null) {
			this.mUi = this.node.getComponentInChildren(BuilderUiControl);

		}
		
		var level = 0;
		if (this.mGame.mUserInfo.mapBuilderStatus != null) {
			var status = this.mGame.mUserInfo.mapBuilderStatus.get(this.mId);

			if (status == null) {
				level = 0;
			} else {
				level = status.level;
			}

		} 
		
		var icon = this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(level).icon;
		
		var info = this.mGame.mUserInfo.mapBuilderInfo.get(icon);
		
		var self = this;
		game.isLoadingCount++;
		cc.loader.load("http://120.79.249.55/images/jianzhu/" + info.icon + ".png", function (err, texture) {
			var sprite = new cc.SpriteFrame(texture);
			self.mIcon.spriteFrame = sprite;
			game.isLoadingCount--;
			console.log("this.isLoadingCoun= " + game.isLoadingCount);
			console.log(" info.icon = " + info.icon);
		});
		console.log("this.isLoadingCoun= " + game.isLoadingCount);
		console.log(" info.icon = " + info.icon);
		var x = Number(info.position.split(",")[0]);
		var y = Number(info.position.split(",")[1]);
		this.node.setPosition(new cc.Vec2(x, y));

		var w = Number(info.size.split(",")[0]);
		var l = Number(info.size.split(",")[1]);
		this.node.setContentSize(w, l);

		this.mUi.node.setScale(1, 1);
		this.node.setScale(1, 1);
		
		//this.node.setScale(1, 1);
		console.log("this.mUi = " + this.mUi);
		var map = this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId);

		if (isInitUi) {
		
			this.mUi.init(this.mId, this.mGame);
			this.mIcon.setState(0);
			//this.mUi.node.setScale(1, 1);
		} else {;
			this.mUi.unInit(this.mId, this.mGame);
			this.mIcon.setState(1);
			//this.mUi.node.setScale(0, 0);
		}
		
	}
	restart() {
		this.mUi.node.setScale(0, 0);
		this.node.setScale(0,0);
		this.mId = 0;
	}

	showLoaded() {
		var self = this;
		var icon = this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mGame.mUserInfo.mapBuilderStatus.get(this.mId).level).icon;
		console.log("showLoaded icon="+icon);
		var info = this.mGame.mUserInfo.mapBuilderInfo.get(icon);
		cc.loader.load("http://120.79.249.55/images/jianzhu/" + info.icon + ".png", function (err, texture) {
			var sprite = new cc.SpriteFrame(texture);
			self.mIcon.spriteFrame = sprite;
		});

	/*	cc.loader.loadRes("jianzhu/" + info.icon, cc.SpriteFrame, function (err, spriteFrame) {
			self.mIcon.spriteFrame = spriteFrame;
		});*/

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

	changeUpCount(game: GameControl) {
		this.mUi.changeUpCount(game);
	}
}

const {ccclass, property} = cc._decorator;
import GameControl from './GameControl';
import MapBuilderInfo from '../bean/MapBuilderInfo'
import BuilderBean from '../bean/BuilderBean';
import BuilderStatusBean from '../bean/BuilderStatusBean';
import BuilderControl from './BuilderControl';
@ccclass
export default class NewClass extends cc.Component {

	@property(cc.Prefab)
	myPrefab: cc.Prefab = null;

	mGame: GameControl;
	mBean: BuilderBean;
	mBuilderBeanList: Map<number, MapBuilderInfo>
	mControlList: Map<number, BuilderControl> = new Map<number, BuilderControl>();
	init(game: GameControl) {
		console.log("BuilderListControl  init  ");
		this.mGame = game;

		var currentMap = this.mGame.mUserInfo.current_map;
		var builderList = this.mGame.mUserInfo.mapInfo.get(currentMap).builde_id;

		var isInit = true;
		var strs: string[] = builderList.split(",")
		for (var i = 0; i < strs.length; i++) {
			var builderid = Number(strs[i]);
			var loadobj = null;
			var control = null;
			var keyTmp = 0;
			if (this.mControlList.size > 0) {

				for (var ii = 0; ii < this.mControlList.keys.length; ii++) {
					var key = this.mControlList.keys[ii];
					console.log("BuilderListControl  init  key=" + key);
					console.log("BuilderListControl  init  this.mControlList.get(key).mId=" + this.mControlList.get(key).mId);
					if (this.mControlList.get(key).mId == 0) {
						keyTmp = key;
						loadobj = this.mControlList.get(key).node;
						control = this.mControlList.get(key);
						break;
					}
				}
			}
			if (loadobj == null) {
				loadobj = cc.instantiate(this.myPrefab);
				this.node.addChild(loadobj);
				control = loadobj.getComponent(BuilderControl);
				this.mControlList.set(builderid, control);
			} else {
				this.mControlList.delete(keyTmp);
				this.mControlList.set(builderid, control);
			}
			if (this.mGame.mUserInfo.mapBuilderStatus.get(builderid) == null) {
				isInit = false;
			}
			control.init(builderid, this.mGame, isInit);
		}



		
	}
	restart() {
		if (this.mControlList.size > 0) {
			this.mControlList.forEach((value, key) => {
				value.restart();
			});
		}
	}

	showLoaded(id: number) {
		this.mControlList.get(id).showLoaded();
	}


	showLoading(id: number) {
		this.mControlList.get(id).showLoading();
	}

	enableBuilder(id: number) {
		
		var control = this.mControlList.get(id);

		control.init(id, this.mGame, true);

		control.enableBuilder();


		

	}
	showLevelUp() {
		this.mControlList.forEach((value, key) => {
			value.showLevelUp();
		});
	}
	levelUpDeal(id: number) {
		var control = this.mControlList.get(id);
		control.levelUpDeal();
	}

}

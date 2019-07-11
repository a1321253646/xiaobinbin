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
		var childs = this.node.getComponentsInChildren(BuilderControl);
		console.log("before childs.length =" + childs.length);
		if (childs.length > 0) {
			childs.forEach((value, key) => {
				value.restart();
			});
		}
		this.mControlList.clear();
		for (var i = 0; i < strs.length; i++) {
			var builderid = Number(strs[i]);
			var loadobj = null;
			var control = null;
			var keyTmp = 0;
			isInit = true;
			if (childs.length > 0) {

				for (var ii = 0; ii < childs.length; ii++) {
					var key = this.mControlList.keys[ii];
					console.log("childs[i] =" + childs[ii].mId);
					if (childs[ii].mId == 0) {
						keyTmp = key;
						loadobj = childs[ii].node;
						control = childs[ii];
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
				//this.mControlList.delete(keyTmp);
				this.mControlList.set(builderid, control);
			}
			console.log("builderid =" + builderid);
			if (this.mGame.mUserInfo.mapBuilderStatus.get(builderid) == null) {
				this.mGame.mUserInfo.mapBuilderStatus.forEach((value, key)=>{
					console.log("foreach  =" + key);
				});


				isInit = false;
			}
			console.log("isInit =" + isInit);
			control.init(builderid, this.mGame, isInit);
		}
		var childs2 = this.node.getComponentsInChildren(BuilderControl);
		console.log("before childs.length =" + childs2.length);


		
	}
	restart() {
	/*	if (this.mControlList.size > 0) {
			this.mControlList.forEach((value, key) => {
				value.restart();
				value.mId = 0;
			});
		}*/
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

	changeUpCount(game: GameControl) {
		this.mControlList.forEach((value, key) => {
			value.changeUpCount(game);
		});
	}

}

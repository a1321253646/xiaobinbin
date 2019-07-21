import GameControl from "./GameControl";
import NumberToString from "../ultis/NumberToString";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

	@property(cc.Label)
	money: cc.Label = null;

	show(game: GameControl) {
		
		var outMoney = 0;
		var beilv = game.mUserInfo.zichang * (0.02 +
			game.mMapZichang / 10000);
		//console.log("beilv = " + beilv);
		beilv = beilv + 1;
		var time = game.mUserInfo.net_time;
		game.mUserInfo.mHaveMap.forEach((value, key) => {
			var zichangBl = value.zibenbeilv;
			var moneyBl = value.moneybeilv;
			var timeBl = value.timebeilv;
			var beilv = game.mUserInfo.zichang * (0.02 +
				zichangBl / 10000);
			beilv = beilv + 1;
			var strs: string[] = game.mUserInfo.mapInfo.get(key).builde_id.split(",");
			for (var i = 0; i < strs.length; i++) {
				var builderid = Number(strs[i]);
				var b = game.mUserInfo.mapBuilderStatus.get(builderid);
				if (b != null) {
					var money = b.creatBase * (b.money_pre / 10000) * beilv * (moneyBl / 10000);
					var time = b.creatTime * (b.time_pre / 10000) * (timeBl / 10000);
					var left = game.mUserInfo.net_time - b.lastime;
					if (left >= time) {
						if (b.auto) {
							var count = Number(((left / time) + "").split(".")[0]);
							outMoney += money * count;
						} else {
							outMoney += money;
						}
					}
				}
			}
		});
		outMoney = Math.round(outMoney);
		this.money.string = NumberToString.numberToString(outMoney);
		if (outMoney > 0) {
			this.node.setScale(1);
		}

	}

	close() {
		this.node.setScale(0);
	}
}

const { ccclass, property } = cc._decorator;
import UserDateBean from "../bean/UserDateBean"
import MapBuilderInfo from '../bean/MapBuilderInfo'
import BuilderJsonInfo from '../bean/BuilderJsonInfo'
import BuilderStatusBean from '../bean/BuilderStatusBean'
import RequiteChangeBuilder from '../bean/RequiteChangeBuilder'
import RequiteCost from '../bean/RequiteCost'
import RequiteAddMoney from '../bean/RequiteAddMoney'
import MapInfo from '../bean/MapInfo'
import GameControl from '../uiControl/GameControl'
import RequiteMapInfoBean from '../bean/RequiteMapInfoBean'
import HaveMapInfo from '../bean/HaveMapInfo'
@ccclass
export default class HttpUtil {
	private static baseUrl: string = "http://120.79.249.55:9020/";
	public static get(url, params: object = {}, callback) {
		let dataStr = '';
		Object.keys(params).forEach(key => {
			dataStr += key + '=' + encodeURIComponent(params[key]) + '&';
		})
		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
		url = HttpUtil.baseUrl + url;
		let xhr = cc.loader.getXMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				let response = xhr.responseText;
				if (xhr.status >= 200 && xhr.status < 300) {
					let httpStatus = xhr.statusText;
					callback(true, JSON.parse(response));
				} else {
					callback(false, response);
				}
			}
		};
		xhr.send();
	}
	//Post请求新的地图等级数据
	public static getMap(url, parame: RequiteMapInfoBean, target: GameControl) {
		url = HttpUtil.baseUrl + url;
		var xhr = cc.loader.getXMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				let response = xhr.responseText;
				console.log("post response =" + response);
				
				if (xhr.status >= 200 && xhr.status < 300) {
					var  id = 0;
					let httpStatus = xhr.statusText;
					var param2 = JSON.parse(response);
					var levelMap = new Map<number, BuilderJsonInfo>();

					var data5 = param2["current"];
					var current = new BuilderJsonInfo();
					if (data5) {
						current.id = data5["id"];
						current.name = data5["name"];
						current.level = data5["level"];
						current.level_up_cost = Number(data5["level_up_cost"]);
						current.creatBase = Number(data5["creatBase"]);
						current.icon = data5["icon"];
						current.skill = data5["skill"];
						current.param = data5["param"];
						levelMap.set(current.level, current);
						id = current.id;
					}
					var data6 = param2["list"];
					if (data6) {
						var len6 = data6.length;
						for (var iii = 0; iii < len6; iii++) {
							var cl = new BuilderJsonInfo();
							cl.id = current.id;
							cl.name = current.name;
							cl.level = data6[iii]["level"];
							cl.level_up_cost = Number(data6[iii]["level_up_cost"]);
							cl.creatBase = Number(data6[iii]["creat_base"]);
							cl.icon = current.icon;
							cl.skill = current.skill;
							cl.param = current.param;
							levelMap.set(cl.level, cl);
						}
					}
					var data7 = param2["next"];
					if (data7) {
						var cl = new BuilderJsonInfo();
						cl.id = data7["id"];

						cl.name = data7["name"];

						cl.level = data7["level"];

						cl.level_up_cost = Number(data7["level_up_cost"]);

						cl.creatBase = Number(data7["creatBase"]);

						cl.icon = data7["icon"];

						cl.skill = data7["skill"];

						cl.param = data7["param"];

						levelMap.set(cl.level, cl);
					}

					if (levelMap.size > 0) {
						if (id != 0 && target.mUserInfo.mapBuilderLevelInfo.get(id) != null) {
							var m = target.mUserInfo.mapBuilderLevelInfo.get(id);
							target.mUserInfo.mapBuilderLevelInfo.delete(id);
							target.mUserInfo.mapBuilderLevelInfo.set(id, levelMap);
							target.showLoaded(id);
						}
					}

				}

			}
		}
		var js: string = JSON.stringify(parame);
		console.log("post json =" + js);
		xhr.send(js);

	}

	//Post请求添加建筑
	public static addBuilder(url, parame: RequiteChangeBuilder) {
		url = HttpUtil.baseUrl + url;
		var xhr = cc.loader.getXMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.onreadystatechange = function () {

		}
		var js: string = JSON.stringify(parame);
		console.log("post json =" + js);
		xhr.send(js);
		
	}
	//Post请求添加建筑
	public static addMoney(url, parame: RequiteAddMoney) {
		url = HttpUtil.baseUrl + url;
		var xhr = cc.loader.getXMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.onreadystatechange = function () {

		}
		var js: string = JSON.stringify(parame);
		console.log("post json =" + js);
		xhr.send(js);
	}
	public static addZichang(url, parame: RequiteAddMoney) {
		url = HttpUtil.baseUrl + url;
		var xhr = cc.loader.getXMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.onreadystatechange = function () {
			var g = cc.find("Canvas").getComponent(GameControl);
			g.reStart()
		}
		var js: string = JSON.stringify(parame);
		console.log("post json =" + js);
		xhr.send(js);
	}

	public static cost(url, parame: RequiteCost) {
		url = HttpUtil.baseUrl + url;
		var xhr = cc.loader.getXMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.onreadystatechange = function () {

		}
		var js: string = JSON.stringify(parame);
		console.log("post json =" + js);
		xhr.send(js);

	}


	//Post请求用户数据
	public static postLocal(url, param: object = {}, target: GameControl ) {
		url = HttpUtil.baseUrl + url;
		var xhr = cc.loader.getXMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.onreadystatechange = function () {
			console.log("post xhr.readyState =" + xhr.readyState);
			if (xhr.readyState === 4) {
				let response = xhr.responseText;
				console.log("post response =" + response);
				if (xhr.status >= 200 && xhr.status < 300) {
					let httpStatus = xhr.statusText;
					var param2 = JSON.parse(response);
					var userInfo = target.mUserInfo;
					console.log("post param1 =" + param2);
					userInfo.money = Number(param2["money"]);
					userInfo.each_money = Number(param2["each_money"]);
					userInfo.zichang = Number(param2["each_money"]);
					userInfo.zuanshi = Number(param2["each_money"]);
					userInfo.current_map = param2["current_map"];
					userInfo.leave_time = param2["leave_time"];
					userInfo.history = param2["history"];
					var data10 = param2["builders"];
					if (data10) {
						var len10 = data10.length;
						for (var i = 0; i < len10; i++) {
							var bsb = new BuilderStatusBean();
							bsb.allmoney = Number(data10[i]["allmoney"]);
							bsb.id = data10[i]["id"];
							bsb.level = data10[i]["level"];
							bsb.time_pre = data10[i]["time_pre"];
							bsb.money_pre = data10[i]["money_pre"];
							bsb.eachmoney = Number(data10[i]["eachmoney"]);
							bsb.lastime = data10[i]["lastime"];
							bsb.auto = 1;//data10[i]["auto"];
							userInfo.mapBuilderStatus.set(bsb.id, bsb);
						}
					}
					console.log(" builders  ");
					var data = param2["mapInfo"];
					if (data) {
						var data2 = data["allMapInfo"];
						if (data2) {
							var len2 = data2.length;
							for (var i = 0; i < len2; i++) {
								var map = new MapInfo();
								map.cost = Number(data2[i]["cost"]);
								map.name = data2[i]["name"];
								map.id = data2[i]["id"];
								map.salecd = data2[i]["salecd"];
								map.bg = "Bg";//data2[i]["bg"];
								userInfo.mapInfo.set(map.id, map);
							}
						}
						console.log(" allMapInfo  " );
						var data3 = data["weizhiList"];
						if (data3) {
							var len3 = data3.length;
							for (var i = 0; i < len3; i++) {
								var mpi = new MapBuilderInfo();

								mpi.id = data3[i]["id"];
								
								mpi.localid = data3[i]["localid"];
								
								mpi.position = data3[i]["position"];
								
								mpi.name = data3[i]["name"];
								
								mpi.creattime = data3[i]["creattime"];
								
								mpi.builderId = data3[i]["builderId"];
								
								userInfo.mapBuilderInfo.set(mpi.builderId, mpi);
							}
						}
						console.log(" weizhiList  ");
						var data41 = data["builderInfoList"];
						if (data41) {
							var len41 = data41.length;
							for (var ii = 0; ii < len41; ii++) {
								console.log(" builderInfoList  i=" + ii );
								var levelMap = new Map<number, BuilderJsonInfo>();

								var data5 = data41[ii]["current"];
								var current = new BuilderJsonInfo();
								if (data5) {
									current.id = data5["id"];
									current.name = data5["name"];
									current.level = data5["level"];
									current.level_up_cost = Number(data5["level_up_cost"]);
									current.creatBase = Number(data5["creatBase"]);
									current.icon = data5["icon"];
									current.skill = data5["skill"];
									current.param = data5["param"];
									levelMap.set(current.level, current);
								}

								userInfo.mapBuilderLevelInfo.set(current.id, levelMap);
								console.log(" builderInfoList  current");
								
								var data6 = data41[ii]["list"];
								if (data6) {
									var len6 = data6.length;
									for (var iii = 0; iii < len6; iii++) {
										var cl = new BuilderJsonInfo();
										cl.id = current.id;
										cl.name = current.name;
										cl.level = data6[iii]["level"];
										cl.level_up_cost = Number(data6[iii]["level_up_cost"]);
										cl.creatBase = Number(data6[iii]["creat_base"]);
										cl.icon = current.icon;
										cl.skill = current.skill;
										cl.param = current.param;
										levelMap.set(cl.level, cl);
									}

									
								}
								console.log(" builderInfoList  list");
								var data7 = data41[ii]["next"]; 
								if (data7) {
									var cl = new BuilderJsonInfo();
									cl.id = data7["id"];
									
									cl.name = data7["name"];
									
									cl.level = data7["level"];
									
									cl.level_up_cost = Number(data7["level_up_cost"]);
									
									cl.creatBase = Number(data7["creatBase"]);
									
									cl.icon = data7["icon"];
								
									cl.skill = data7["skill"];
									
									cl.param = data7["param"];
							
									levelMap.set(cl.level, cl);
								}
								console.log(" builderInfoList  next");
							}






						}
						console.log(" builderInfoList  ");

					}
					console.log(" builders  ");
					var data300 = param2["mMapHave"];
					if (data300) {
						var len300 = data300.length;
						for (var i = 0; i < len300; i++) {
							var haveMap = new HaveMapInfo();
							haveMap.id = data300[i]["id"];
							haveMap.time = data300[i]["time"];
							haveMap.creat = Number(data300[i]["creat"]);
							haveMap.cost = Number(data300[i]["cost"]);
							userInfo.mHaveMap.set(haveMap.id, haveMap);
						}
					}

					target.isInit = true;
				} else {
					//TODO
				}
			}
		};
		var js: string = JSON.stringify(param);
		console.log("post json =" + js);
		xhr.send(js);
	}

}
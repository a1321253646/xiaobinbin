const { ccclass, property } = cc._decorator;
import UserDateBean from "../bean/UserDateBean"
import MapBuilderInfo from '../bean/MapBuilderInfo'
import BuilderJsonInfo from '../bean/BuilderJsonInfo'
import BuilderStatusBean from '../bean/BuilderStatusBean'
import RequiteChangeBuilder from '../bean/RequiteChangeBuilder'
import RequiteZichang from '../bean/RequiteZichang'
import RequiteCost from '../bean/RequiteCost'
import RequiteWxUserInfo from '../bean/RequiteWxUserInfo'
import RequiteAddMoney from '../bean/RequiteAddMoney'
import MapInfo from '../bean/MapInfo'
import GameControl from '../uiControl/GameControl'
import RequiteMapInfoBean from '../bean/RequiteMapInfoBean'
import HaveMapInfo from '../bean/HaveMapInfo'
import RequiteBuyDaoju from '../bean/RequiteBuyDaoju'
import RequiteAddMap from '../bean/RequiteAddMap'
import ShopItemInfoBean from '../bean/ShopItemInfoBean'
import RequiteReplaceId from '../bean/RequiteReplaceId'
import OtherSettingControl from '../uiControl/OtherSettingControl'
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
						current.icon = data5["resid"];
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
							cl.skill =0;
							cl.param = 0;
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

						cl.icon = data7["resid"];

						cl.skill = data7["skill"];

						cl.param = data7["param"];

						levelMap.set(cl.level, cl);
					}

					var data8 = param2["resource"];
					if (data8) {
						var len8 = data8.length;
						for (var iiii = 0; iiii < len8; iiii++) {
							var mpi = new MapBuilderInfo();
							mpi.id = data8[iiii]["id"];

							mpi.position = data8[iiii]["position"];

							mpi.name = data8[iiii]["name"];

							mpi.creattime = data8[iiii]["creattime"];

							mpi.size = data8[iiii]["size"];
							mpi.icon = data8[iiii]["icon"];
							console.log("BuilderControl  mpi.id   = " + mpi.id);
							console.log("BuilderControl  mpi.position   = " + mpi.position);
							console.log("BuilderControl  mpi.name   = " + mpi.name);
							console.log("BuilderControl  mpi.creattime   = " + mpi.creattime);
							console.log("BuilderControl  mpi.size   = " + mpi.size);
							console.log("BuilderControl  mpi.icon   = " + mpi.icon);
							var userBuild = target.mUserInfo.mapBuilderInfo;
							if (userBuild.has(mpi.id)) {
								userBuild.delete(mpi.id);
							}
							target.mUserInfo.mapBuilderInfo.set(mpi.id, mpi);
						}
					}

					var data8 = param2["resource"];
					if (data8) {
						var mpi = new MapBuilderInfo();

						mpi.id = data8["id"];


						mpi.position = data8["position"];

						mpi.name = data8["name"];

						mpi.creattime = data8["creattime"];

						mpi.size = data8["size"];
						mpi.icon = data8["icon"];
			
						console.log("BuilderControl  mpi.id   = " + mpi.id);
						console.log("BuilderControl  mpi.position   = " + mpi.position);
						console.log("BuilderControl  mpi.name   = " + mpi.name);
						console.log("BuilderControl  mpi.creattime   = " + mpi.creattime);
						console.log("BuilderControl  mpi.size   = " + mpi.size);
						console.log("BuilderControl  mpi.icon   = " + mpi.icon);
						var userBuild = target.mUserInfo.mapBuilderInfo;
						if (userBuild.has(mpi.id)) {
							userBuild.delete(mpi.id);
						}
						target.mUserInfo.mapBuilderInfo.set(mpi.id, mpi);

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
	public static addMap(url, parame: RequiteAddMap) {
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

	public static addZichang(url, parame: RequiteZichang) {
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
	public static buy(url, parame: RequiteBuyDaoju) {
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
	private static replaceUserId(url, old: string, newid: string) {
		var req = new RequiteReplaceId();
		req.newId = newid;
		req.old = old;

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


				} else {
					//TODO
				}
			}
		};
		var js: string = JSON.stringify(req);
		console.log("post json =" + js);
		xhr.send(js);


	}

	public static postGetUserInfo(url, param: RequiteWxUserInfo , target: GameControl,isOld:boolean) {
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
					var userId = param2["openId"];
					var name = param2["nickName"];
					var icon = param2["avatarUrl"];
					console.log("post userId =" + userId);
					if (isOld) {
						target.usrId = userId;
						target.mUserInfo = new UserDateBean();
						HttpUtil.postLocal("getuser", { user: userId }, target);
					} else {
						HttpUtil.replaceUserId("replace", target.usrId, userId);
						target.usrId = userId;
					}
					cc.find("Canvas").getComponentInChildren(OtherSettingControl).init(name, icon);
				} else {
					//TODO
				}
			}
		};
		var js: string = JSON.stringify(param);
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
					var user: string = param2["userId"];
					console.log("post user =" + user);
					console.log("post target.usrId =" + target.usrId);
					/*if (user != target.usrId) {
						console.log(" user !=target.usrId");
						wx.setStorage({
							key: "userId",
							data: user
						})
					}*/
					target.usrId = user;
					console.log("post param1 =" + param2);
					userInfo.money = Number(param2["money"]);
					userInfo.each_money = Number(param2["each_money"]);
					userInfo.zichang = Number(param2["zichang"]);
					userInfo.zuanshi = Number(param2["zuanshi"]);
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
							bsb.auto = data10[i]["isAuto"];
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
								map.icon = data2[i]["icon"];
								map.bg = data2[i]["bg"];
								map.builde_id = data2[i]["builde_id"];
								userInfo.mapInfo.set(map.id, map);
							}
						}
						console.log(" allMapInfo  " );

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
									current.icon = data5["resid"];
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
										cl.skill = 0;
										cl.param = 0;
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
									
									cl.icon = data7["resid"];
								
									cl.skill = data7["skill"];
									
									cl.param = data7["param"];
							
									levelMap.set(cl.level, cl);
								}
								console.log(" builderInfoList  next");

								var data8 = data41[ii]["resource"];
								if (data8) {
									var len8 = data8.length;
									for (var iiii = 0; iiii < len8; iiii++) {
										var mpi = new MapBuilderInfo();
										mpi.id = data8[iiii]["id"];
							
										mpi.position = data8[iiii]["position"];

										mpi.name = data8[iiii]["name"];

										mpi.creattime = data8[iiii]["creattime"];

										mpi.size = data8[iiii]["size"];
										mpi.icon = data8[iiii]["icon"];
										console.log("BuilderControl  mpi.id   = " + mpi.id);
										console.log("BuilderControl  mpi.position   = " + mpi.position);
										console.log("BuilderControl  mpi.name   = " + mpi.name);
										console.log("BuilderControl  mpi.creattime   = " + mpi.creattime);
										console.log("BuilderControl  mpi.size   = " + mpi.size);
										console.log("BuilderControl  mpi.icon   = " + mpi.icon);
										if (!userInfo.mapBuilderInfo.has(mpi.id)) {
											userInfo.mapBuilderInfo.set(mpi.id, mpi)
										}
									}									
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
							haveMap.unlock = data300[i]["unlock"];
							haveMap.shopcount = data300[i]["shopcount"];
							haveMap.buy = data300[i]["buy"];
							haveMap.zibenbeilv = data300[i]["zibenbeilv"];
							userInfo.mHaveMap.set(haveMap.id, haveMap);
						}
					}
					console.log(" mMapHave  ");

					var data400 = param2["shop"];
					if (data400) {
						var len400 = data400.length;
						for (var i = 0; i < len400; i++) {
							var shop = new ShopItemInfoBean();
							shop.id = data400[i]["id"];
							shop.costtype = data400[i]["costtype"];
							shop.dealtype = data400[i]["dealtype"];
							shop.parame = Number(data400[i]["parame"]);
							shop.cost = Number(data400[i]["cost"]);
							shop.icon = data400[i]["icon"];
							shop.desc = data400[i]["desc"];
							userInfo.mShopItem.set(shop.id, shop);
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
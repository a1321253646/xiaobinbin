const {ccclass, property} = cc._decorator;

@ccclass
export default class NumberToString {
	static UINT_LIST = ["K","M","B","T","aa", "bb", "cc", "dd", "ee", "ff", "gg"
		, "hh", "ii", "jj", "kk", "ll", "mm", "nn"
		, "oo", "pp", "qq", "rr", "ss", "tt"
		, "uu", "vv", "ww", "xx", "yy", "zz"
		, "AA", "BB", "CC", "DD", "EE", "FF", "GG"
		, "HH", "II", "JJ", "KK", "LL", "MM", "NN"
		, "OO", "PP", "QQ", "RR", "SS", "TT"
		, "UU", "VV", "WW", "XX", "YY", "ZZ"];
	public static numberToString(num: number): string {
		console.log("numberToString num= " + num);
		var count = Math.log10(num);
		console.log("numberToString count= " + count);
		count = (count / 3) >> 0;
		console.log("numberToString count= " + count);
		var back = "";
		var uint = NumberToString.UINT_LIST[count-1];
		if (count >=1) {
			var a = Math.pow(10, count * 3);
			console.log("numberToString a= " + a);
			num = num / a;
			console.log("numberToString num= " + num);
			back = num.toFixed(2);
			num = Number(back);
			return num + uint;
		} else {
			return num + "";
		}
	}

}

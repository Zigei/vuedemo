module.exports = {
	checkLogin: (req, res, next) => {
		if (!req.session.user) {
			req.flash('error', '未登录');
		}
		next();
	},

	checkNotLogin: (req, res, next) => {
		if (req.session.user) {
			req.flash('error', '已登录');
		}
		next();
	}
}

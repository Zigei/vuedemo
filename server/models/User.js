const User = require('../lib/mongo').User;
const Reg = require('../middlewares/regular');

module.exports = {
	create: (user) => {
		return User.create(user).exec();
	},
	getUserByNames: (name) => {
		return User.findOne({
				name: name
			})
			.atCreateAt()
			.exec();
	},
	getUserById: (_id) => {
		return User.findById(`user._id`)
			.atCreateAt()
			.exec();
	},
	checkUserData: (req) => {
		const d = req.fields;
		let name = d.name;
		let access = d.access;
		let avatar = req.files.avatar.path.split(path.sep).pop();
		let bio = d.bio;
		let password = d.password;
		if (Reg.access(access) && access.length < 15 && name.length > 1) {
			return "账号不符合规则";
		}
		if (!(name.length > 1 && name.length < 15)) {
			return "用户名不符合规则";
		}
		if (password.length < 6) {
			errorMsg = '密码至少 6 个字符';
		}
	},
}

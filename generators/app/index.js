// 初始化目录
// 拷贝文件
// 第一次配置用户名/项目名/项目类型/
// 开发环境
// 打包工具
// 构建文件
// 记住用户配置
// 单元测试
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = class extends Generator{
	
	constructor(args,opts){
		super(args,opts);

		//this.option('babel');
	}
	initializing() {
		this.log(yosay("开始构建项目..."));
	}

	// install() {
 //        var done = this.async();
 //        this.spawnCommand('npm', ['install'])  //安装项目依赖
 //            .on('exit', function (code) {
 //                if (code) {
 //                    done(new Error('code:' + code));
 //                } else {
 //                    done();
 //                }
 //            })
 //            .on('error', done);
 //    }

	prompting(){
		var done = this.async();
		return this.prompt([
		{
			type : 'list',
			name : 'init',
			message : '初始化项目 or 页面',
			choices :["new project","new page"],
			default : ''
		},{
			type : 'input',
			name : 'your',
			message : 'your name',
			store : true,
			default :''
		},{
			type : 'input',
			name : 'project',
			message : 'your project name',
			default : this.appname
		}]).then((answers)=>{
			this.project = answers.project;
			this.log(this.project);
			done();
		});
	}
	writing(){
		mkdirp("css/img/slice",function(err){
			if (err) {
				//this.log(chalk.red(err))
			}
			else {
				//this.log("floder create ok")
			}
		});
		this.fs.copyTpl(
             this.templatePath('overview.html'),
             this.destinationPath('overview.html'),
             { title: this.project,
               cssName : this.appname
              }
           );
		this.log(chalk.red(this.project));
		this.fs.copyTpl(
			this.templatePath("css/demo.css"),
			this.destinationPath("css/"+this.appname + ".css")
			)
	}

};


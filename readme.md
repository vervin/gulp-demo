## gulp入门
> 在Javascript的开发过程中，经常会遇到一些重复性的任务，比如合并文件、压缩代码、检查语法错误、将Sass代码转成CSS代码等等。通常，我们需要使用不同的工具，来完成不同的任务，既重复劳动又非常耗时。grunt，gulp都是为了解决这个问题而发明的工具，可以帮助我们自动管理和运行各种任务，很多人认为，在操作上，它要比Grunt简单。

### 安装
gulp需要全局安装，然后再在项目的开发目录中安装为本地模块。先进入项目目录，运行下面的命令。
```
npm install -g gulp

npm install --save-dev gulp
```
### gulpfile.js
项目根目录下创建一个名为 gulpfile.js 的文件，此文件为gulp的配置文件：
```
var gulp = require('gulp');

gulp.task('mini', function() {
  // 将你的默认的任务代码放在这
});
```
然后使用下面命令即可：
```
$ gulp mini
```
如果任务名为默认的default，则直接使用gulp命令即可。

### 思想

```
gulp.task('js', function () {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build'));
});

```
> gulp是基于管道的思想，所以可以看出，gulp首先通过src读取文件产生数据流，然后经过一系列pipe操作，最后通过dest方法将数据流写入文件build.js中。

### API
#### src
用于产生数据流，参数为符合所提供的匹配模式（glob）或者匹配模式的数组（array of globs）的文件。

glob模式是匹配路径与文件的模式，类似正则表达式。下面为部分语法：

* \* 
匹配该路径段中 0 个或多个任意字符，

* ?
匹配该路径段中 1 个任意字符，

* [...]
匹配该路径段中在指定范围内字符，

* !(pattern|pattern|pattern)
匹配除所给出的模型以外的情况，
* ?(pattern|pattern|pattern)
匹配所给出的模型中的 0 个或任意 1 个，
* +(pattern|pattern|pattern)
匹配所给出的模型中的 1 个或者多个，
* *(pattern|pattern|pattern)
匹配所给出的模型中的 0 个或多个或任意个的组合.

* @(pattern|pat*|pat?erN)
匹配所给出的模型中的任意 1 个，

* \*\*  
与 * 一样可以匹配任何内容，但 **不仅匹配路径中的某一段,而且可以匹配 a/b/c 这样带有 / 的内容，所以，它还可以匹配子文件夹下的文件.

更加详细的，可以见glob-primer

#### dest
> 将管道的输出写入文件，而且这些输出还可以继续输出，所以可以多次调用dest方法，将输出写入到多个目录。目录不存在，也会被新建。
```
gulp.src('./client/templates/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('./build/templates'))
  .pipe(minify())
  .pipe(gulp.dest('./build/minified_templates'));
```
还可以接受对象作为第二个参数，其中对象有两个字段，cwd表示写入路径的基准目录，默认是当前目录，mode表示权限，默认为0777（这里是与linux文件权限相关，不懂可以见这个）

#### task
用于定义具体任务，它的第一个参数是任务名，第二个参数是任务函数。

task方法还可以指定按顺序运行的一组任务。
```
gulp.task('build', ['greet']);
```
这时，build会在后面任务完成之后开始。

#### watch
watch方法用于指定需要监视符合所提供的匹配模式（glob）或者匹配模式的数组（array of globs）的文件。一旦这些文件发生变动，就运行指定任务。
```
gulp.task('watch', function () {
   gulp.watch('templates/*.tmpl.html', ['build']);
});
```
上面代码指定，一旦templates目录中的模板文件发生变化，就运行build任务。

### 常用插件
gulp-load-plugins：自动加载 package.json 中的 gulp 插件，避免一个个require插件
gulp-rename： 重命名
gulp-uglify：文件压缩
gulp-concat：文件合并
gulp-less：编译 less
gulp-sass：编译 sass
gulp-clean-css：压缩 CSS 文件
gulp-htmlmin：压缩 HTML 文件
gulp-babel: 使用 babel 编译 JS 文件
gulp-jshint：jshint 检查
gulp-imagemin：压缩jpg、png、gif等图片
gulp-livereload：当代码变化时，它可以帮我们自动刷新页面，除在模块中需要安装外，还需要在浏览器中安装。
更多插件，可以去[官网](https://gulpjs.com/plugins/)搜索

### 参考

[gulp入门](https://juejin.im/post/593cf6efac502e006b3e2bc0)
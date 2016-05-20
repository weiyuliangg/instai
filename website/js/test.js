module.exports = function(grunt){  
grunt.initConfig({
	pkg:grunt.file.readJSON('package.json'), 
    //1、jshint——javascript语法错误检查
    jshint:{
      build: [ 'Gruntfile.js','ng/js-dev/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    //2、concat——合并多个js、css文件的代码到一个文件中  
    concat: {
      css:{
        src: 'ng/css-dev/*.css',
        dest: 'ng/css/mycss.css'
      },
      js:{
        src: 'ng/js-dev/*.js',
        dest: 'ng/js/global.js'
      }
    },
    //3、uglify——压缩javascript代码
    uglify: { 
      build: {
        src: 'ng/js/global.js',
        dest: 'ng/js/global.min.js'
      }
    },
    //4、cssmin——压缩css代码 
    cssmin: { 
      build: {
        src: 'ng/css/mycss.css',
        dest: 'ng/css/mycss.min.css'
      }
    },
    //5、imagemin——压缩图片工具    
    imagemin: {
            /* 压缩图片大小 */
            dist: {
                options: {
                    optimizationLevel: 3 //定义 PNG 图片优化水平
                },
                files: [
                       {
                    expand: true,
                    cwd: 'ng/images-dev/',
                    src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
                    dest: 'ng/images/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
                    }
                    ]
                }
    },
    //6、watch——实时监控文件变化、调用相应的任务重新执行
        watch: { 
      js: { 
        files: [
          'ng/js-dev/*.js'
        ], 
        tasks: [
          'concat', 
          'jshint', 
          'uglify' 
        ], 
        options: { spawn: false}
      },
      css:{
        files: [
          'ng/css-dev/*.css'
        ], 
        tasks: [
          'concat', 
          'cssmin' 
        ], 
        options: { spawn: false}
      }, 
client: { 
        options: {
          livereload: true
        },
        // '**' 表示包含所有的子目录
        // '*' 表示包含所有的文件
        files: ['ng/*.html', 'ng/css-dev/*', 'ng/js-dev/*', 'ng/images/**/*']
      }
    },
    //7、clean——清空文件、文件夹 
    clean: {
            cleanoutput: {
                files: [{
                    src: 'output/'
                }]
            }
        },
    //8、copy——复制文件、文件夹 
      copy: {
      main: {
        files:[
          //js
          {
            expand: true, 
            flatten: true,
            src: ['ng/js-dev/*.js'], 
            dest: 'dist/js/', 
            filter: 'isFile'
          },
          //less
          {
            expand: true, 
            flatten: true,
            src: ['ng/css-dev/*.less'], 
            dest: 'dist/css/', 
            filter: 'isFile'
          },
          //css
          {
            expand: true, 
            flatten: true,
            src: ['ng/css-dev/*.css'], 
            dest: 'dist/css/', 
            filter: 'isFile'
          }
        ]
      }
    },
    //9、karma——前端自动化测试工具
    //10、connect——服务器
/*    connect: {
            options: {
                port: 9000,
                hostname: '*', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
                //livereload: 35729  //声明给 watch 监听的端口
            },
            server: {
                options: { 
                    open: true, //自动打开网页 http://
                    base: [
                        './ng'  //主目录
                    ]
                }
            },
         
        }*/
    
}); 


//引入插件
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-copy');
//grunt.loadNpmTasks('grunt-contrib-connect');

//注册插件
grunt.registerTask('default',['jshint','uglify','concat','cssmin','watch']);
};
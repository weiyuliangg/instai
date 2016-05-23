module.exports = function(grunt){  
grunt.initConfig({
	pkg:grunt.file.readJSON('package.json'), 
    //1、jshint——javascript语法错误检查
    jshint:{
      build: [ 'Gruntfile.js','<%=pkg.website%>/js-dev/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    //2、concat——合并多个js、css文件的代码到一个文件中  
    concat: {
      css:{
        src: '<%=pkg.website%>/css-dev/*.css',
        dest: '<%=pkg.website%>/css/<%=pkg.concatcss%>.css'
      },
      js:{
        src: '<%=pkg.website%>/js-dev/*.js',
        dest: '<%=pkg.website%>/js/<%=pkg.concatjs%>.js'
      }
    },
    //3、uglify——压缩javascript代码
    uglify: { 
      build: {
        src: '<%=pkg.website%>/js/<%=pkg.concatjs%>.js',
        dest: '<%=pkg.website%>/js/<%=pkg.jsmin%>.js'
      }
    },
    //4、cssmin——压缩css代码 
    cssmin: { 
      build: {
        src: '<%=pkg.website%>/css/<%=pkg.concatcss%>.css',
        dest: '<%=pkg.website%>/css/<%=pkg.cssmin%>.css'
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
                    cwd: '<%=pkg.website%>/images/',
                    src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
                    dest: '<%=pkg.website%>/images/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
                    }
                    ]
                }
    },
    //6、watch——实时监控文件变化、调用相应的任务重新执行
        watch: { 
      js: { 
        files: [
          '<%=pkg.website%>/js-dev/*.js'
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
          '<%=pkg.website%>/css-dev/*.css'
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
        files: ['<%=pkg.website%>/*.html', '<%=pkg.website%>/css-dev/*', '<%=pkg.website%>/js-dev/*.js', '<%=pkg.website%>/images/**/*']
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
            src: ['<%=pkg.website%>/js-dev/*.js'], 
            dest: '<%=pkg.website%>/dist/js/', 
            filter: 'isFile'
          },
          //less
          {
            expand: true, 
            flatten: true,
            src: ['<%=pkg.website%>/css-dev/*.less'], 
            dest: '<%=pkg.website%>/dist/css/', 
            filter: 'isFile'
          },
          //css
          {
            expand: true, 
            flatten: true,
            src: ['<%=pkg.website%>/css-dev/*.css'], 
            dest: '<%=pkg.website%>/dist/css/', 
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
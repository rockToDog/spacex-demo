# Space X

**使用了MUI、react-router、react-hook-form等库。     
vite构建**

#### 启动程序
1. 安装依赖
```
npm install
```

2. 启动
```
npm run dev
```

#### 说明
1. 图片懒加载原来使用了IntersectionObserver，后改用img元素的lazy属性。
2. 图片未加载之前先用占位图占位。
3. 首页分页使用IntersectionObserver以及自己写的一个request hook实现。
4. message提示改为使用函数直接调用。
5. 整体结构
   * api 接口文件
   * components 公共组件
   * pages 具体页面
   * types 类型文件
   * utils 公共方法
# 如何使用

- 把.env.example 文件重命名为.env.local
- REACT_APP_LLM_SERVICE_URL 改成你的 tensorrtllm 端口
- npm install
- npm start
- 关闭浏览器同源
  - 创建一个 Chrome 快捷方式。右键点击桌面,选择"新建 > 快捷方式"。
  - 在"目标"栏中输入 Chrome 的安装路径,并在后面添加--disable-web-security --user-data-dir=c:\tmppath 这两个启动参数。其中 c:\tmppath 请替换为你自己的一个临时文件夹路径。
  - 例如: "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir=c:\tmppath
  - 点击"下一步",为快捷方式取一个名字,如"Chrome-NoSecurity"。点击"完成"。
  - 双击这个新建的快捷方式,打开 Chrome,同源限制就被关闭了。此时如果打开开发者工具的 Console,会看到明确的警告提示,表示当前已不受同源策略限制。
  - 需要注意的是: 仅在开发调试场景使用,线上或正式环境千万不要这样配置,否则会有严重的安全隐患。
  - 每次从这个快捷方式打开的 Chrome 都是一个独立的实例,不会影响到其他 Chrome 窗口。关闭该实例后,下次再打开就又恢复同源限制了。
  - --user-data-dir 指定的临时目录,会在 Chrome 退出时被删除。所以最好指定一个临时目录,不要指向重要的用户目录。
  - 总之,为了 Web 安全,同源策略非常重要

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential"],
  plugins: ['vue'],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // 最好使用const来声明变量
    "prefer-const": ["error", {
      "destructuring": "any",
      "ignoreReadBeforeAssign": false
    }],
    "no-const-assign": "error",
    // 不使用var
    "no-var": "error",
    // 使用字面量创建对象
    "no-new-object": "error",
    // 使用对象属性缩写
    "object-shorthand": "error",
    // 只用引号引无效标识符的属性
    "quote-props": ["error", "as-needed"],
    // 使用字面量创建数组
    "no-array-constructor": "error",
    // 在数组方法回调中使用 return 语句
    "array-callback-return": "error",
    // 使用对象解构
    "prefer-destructuring": ["error", {"object": true, "array": false}],
    // 引号
    "quotes": ["error", "single", { "allowTemplateLiterals": true }],
    // 字符串模板
    "prefer-template": "error",
    "template-curly-spacing": "error",
    // 不准使用 eval
    "no-eval": "error",
    // 函数申明
    "func-style": ["error", "declaration", { "allowArrowFunctions": true }],
    // 立即执行函数
    "wrap-iife": ["error", "inside"],
    // 避免在非代码块声明函数
    "no-loop-func": "error",
    // 不使用 arguments
    "prefer-rest-params": "error",
    // 不使用 new Function
    "no-new-func": "error",
    // 函数空格
    "space-before-function-paren": ["error", {"anonymous": "always", "named": "never", "asyncArrow": "always"}],
    // 块空格
    "space-before-blocks": ["error", { "functions": "always", "keywords": "never", "classes": "always" }],
    // 不允许改变参数
    // "no-param-reassign": "error",
    // 优先使用扩展运算符
    "prefer-spread": "error",
    // 箭头函数回调
    "prefer-arrow-callback": [ "error", { "allowNamedFunctions": true } ],
    "arrow-spacing": [ "error", { "before": true, "after": true }],
    // 不要空的构造函数
    "no-useless-constructor": "error",
    // 不允许声明重复的成员
    "no-dupe-class-members": "error",
    // 一个地方只在一个路径中 import
    "no-duplicate-imports": "error",
    // 不要导出可变绑定
    // "import/no-mutable-exports": "error",
    // 提升import
    // "import/first": "error",
    // 禁止使用webpack加载器语法
    // "import/no-webpack-loader-syntax": "error",
    // 不使用迭代器
    "no-iterator": "error",
    // "no-restricted-syntax": ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"],
    // 迭代器声明
    "generator-star-spacing": ["error", {"before": true, "after": false}],
    // 属性访问
    "dot-notation": "error",
    "no-undef": ["error", { "typeof": true }],
    // 变量声明
    "one-var": ["error", { let: "never" }],
    // 变量链式赋值
    "no-multi-assign": "error",
    // 避免递增递减
    "no-plusplus": "error",
    // 等号
    "eqeqeq": ["error", "smart"],
    // case, default
    "no-case-declarations": "error",
    // 三元表达式
    "no-nested-ternary": "error",
    "no-unneeded-ternary": "error",
    "no-mixed-operators": "error",
    // 代码块
    "nonblock-statement-body-position": "error",
    "brace-style": "error",
    // 多个if
    "no-else-return": ["error", {allowElseIf: false}],
    // comment
    "spaced-comment": ["error", "always", { "exceptions": ["-"] }],
    // 空格
    "indent": ["error", 2],
    // 关键词前的空格
    "keyword-spacing": ["error", { "before": true }],
    // 使用空格把运算符隔开
    "space-infix-ops": ["error", { "int32Hint": false }],
    "eol-last": ["error", "always"],
    // 链式调用方法换行
    "newline-per-chained-call": ["error", { "ignoreChainWithDepth": 2 }],
    // 不要用空白行
    // "padded-blocks": "error",
    // 不要在圆括号内加空格
    "space-in-parens": ["error", "never"],
    // 不要在中括号内添加空格
    "array-bracket-spacing": ["error", "never"],
    // 在大括号内添加空格
    "object-curly-spacing": ["error", "always"],
    // 避免有超过100个字符
    "max-len": ["error", { "code": 150 }],
    // 逗号
    "comma-style": ["error", "last"],
    // 结尾的逗号
    "comma-dangle": ["error", "never"],
    // 分号
    "semi": ["error", "always", { "omitLastInOneLineBlock": true}],
    // 类型转换
    "no-new-wrappers": "error",
    radix: ["error", "as-needed"],
    // 命名
    "id-length": ["error", { "min": 2 }],
    // 驼峰
    // "camelcase": ["error", {ignoreDestructuring: true}],
    // 当命名构造函数或类的时候使用 PascalCase 式命名
    // "new-cap": "error",
    // 不要使用下划线开头或结尾
    "no-underscore-dangle": "error"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};

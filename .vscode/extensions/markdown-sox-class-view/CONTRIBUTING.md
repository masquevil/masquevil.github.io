# 贡献指南 Contributing

## 🎯 核心原则

### 1. 命名结构

本插件遵循 [TextMate 标准作用域命名规范](https://macromates.com/manual/en/language_grammars#naming_conventions)，并采用域名空间隔离策略避免冲突。

```text
{type}.{qualifier}.{qualifier}....{domain}.{context}
```

### 2. 层级说明

- **type**: 基础类型（`meta`, `source`, etc.）
- **qualifier**: 修饰符（`embedded`, `block`, etc.）
- **domain**: 领域标识（`class-view`）
- **context**: 具体上下文

## 📋 完整命名体系

### 代码块命名

```text
meta.embedded.block.class-view
```

### 内容区域命名

```text
source.markdown.class-view
```

## 🔧 技术实现

本扩展使用 TextMate 语法注入机制，通过以下方式实现：

1. **injectionSelector**: `L:text.html.markdown` - 在 Markdown 文件中注入
2. **patterns**: 匹配 `class-view:className` 代码块
3. **include**: 将内部内容作为 Markdown 语法处理

## 📚 参考资料

- [TextMate官方命名规范](https://macromates.com/manual/en/language_grammars#naming_conventions)
- [VS Code语法高亮指南](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)
- [Sublime Text作用域系统](https://www.sublimetext.com/docs/3/scope_naming.html)

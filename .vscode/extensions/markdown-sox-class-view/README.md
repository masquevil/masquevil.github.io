# Markdown SOX Class View Syntax Highlighting

为使用 Markdown 书写的 `class-view` 代码块提供语法高亮支持。

## 功能特性

- 为 `class-view` 代码块提供语法高亮
- 代码块内的内容按照 Markdown 语法进行高亮显示

## 支持的语法

### SOX Class View 语法

```markdown
~~~class-view:className
Markdown 内容，会正常高亮显示

**加粗文本**、*斜体文本*

- 列表项 1
- 列表项 2
~~~
```

其中 `className` 是自定义的 CSS 类名，例如 `chart-view`。

## 验证安装

1. **重启 VS Code** 让新配置生效
2. **打开包含 class-view 的 Markdown 文件**
3. **检查高亮**：代码块内的 Markdown 语法应该正常高亮显示
4. **使用调试工具**：`Ctrl+Shift+P` → "Inspect Editor Tokens and Scopes"
5. **验证作用域**：点击代码块内的文本，应显示 `source.markdown.class-view` 作用域

## 示例

查看项目中的实际使用示例：

- [`test-syntax.md`](./test-syntax.md)

## 技术实现

该扩展使用 TextMate 语法注入机制，将 `class-view` 代码块内的内容识别为 Markdown 语法，从而获得完整的高亮支持。

## 贡献

欢迎提交 Issue 和 Pull Request！

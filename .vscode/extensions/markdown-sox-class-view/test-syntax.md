# Class View 语法高亮测试文件

## 测试基本用法

```markdown
~~~class-view:test-class
# 标题测试

这是一个**加粗**和*斜体*的测试。

- 列表项 1
- 列表项 2
  - 嵌套列表

1. 有序列表 1
2. 有序列表 2

[链接文本](https://example.com)

![图片描述](image.jpg)

> 引用文本

`行内代码`

---

水平线测试
~~~
```

## 验证步骤

1. **重启 VS Code** 让新配置生效
2. **打开此测试文件**
3. **检查高亮**：
   - 代码块标记 `sox-class-view:className` 应该被识别
   - 代码块内的 Markdown 语法应该正常高亮显示
   - **加粗**、*斜体*、列表等都应该有正确的颜色
4. **使用调试工具**：`Ctrl+Shift+P` → "Inspect Editor Tokens and Scopes"
5. **验证作用域**：
   - 点击代码块整体，应显示 `meta.embedded.block.sox-class-view`
   - 点击代码块内的文本，应显示 `source.markdown.sox-class-view`
   - 点击加粗文本，应显示 `markup.bold.markdown`

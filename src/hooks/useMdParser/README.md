# useMdParser

基于 Marked.js 的 Markdown 解析器，提供以下功能：

1. 自定义语法：
   1. **时效性标签** - `!:YYYY:M:!`
   2. **sox-class-view** - 自定义类名容器
   3. **Alert 容器** - `!!! ... !!!`
2. **CSS Class** - 为元素添加类名便于样式定制
3. **BaseUrl** - 自动处理相对路径

## 使用

```typescript
import useMdParser from '@/hooks/useMdParser';

const { parse } = useMdParser();
const html = parse('# Markdown\n\nContent');
```

## 时效性标签

```markdown
!:2024:3:!
```

渲染为：

```html
<span class="md-validity-tag">时效性：本文撰写于2024年3月</span>
```

## class-view

用于创建带有自定义类名的容器，内容会正常解析为 Markdown。

### 语法格式

```markdown
~~~class-view:className
Markdown 内容
~~~
```

### 示例

```markdown
~~~class-view:sox-chart-view
**标题**：内容
**标题**：内容
~~~
```

渲染为：

```html
<div class="sox-chart-view">
  <p class="md-p"><strong class="md-strong">标题</strong>：内容</p>
  <p class="md-p"><strong class="md-strong">标题</strong>：内容</p>
</div>
```

## Alert 容器

用于创建提示框，显示带有标题的警告/提示内容。

### 语法格式

```markdown
!!! 可选的标题
内容文本
!!!

!!!variant: 可选的标题
markdown 内容
!!!
```

### 示例

```markdown
!!!default: 注意
这是一个 **加粗** 内容，下面还有列表：
- 第一项
- 第二项
!!!
```

渲染为：

```html
<div class="md-alert md-alert-default">
  <div class="md-alert-title">注意</div>
  <div class="md-alert-content"><p>这是一个 <strong>加粗</strong> 内容，下面还有列表：</p><ul><li>第一项</li><li>第二项</li></ul></div>
</div>
```

## CSS 类名

- 标题：`md-h1` ~ `md-h4`（含 id 属性）
- 段落：`md-p`
- 水平线：`md-hr`
- 加粗：`md-strong`
- 列表：`md-ul`/`md-ol`、`md-li`
- 时效标签：`md-validity-tag`
- Alert 容器：`md-alert`、`md-alert-title`、`md-alert-content`

## VS Code 语法高亮

项目提供了 VS Code 扩展，为 `sox-class-view` 代码块提供语法高亮支持。

### 安装方法

在项目根目录的 `.vscode/extensions.json` 中已配置推荐扩展，VS Code 会自动提示安装。

或手动启用：

1. 按 `Ctrl+Shift+P`（Mac: `Cmd+Shift+P`）
2. 输入 "Extensions: Show Recommended Extensions"
3. 找到并安装本地扩展

### 验证安装

打开 [`test-syntax.md`](../../.vscode/extensions/markdown-sox-class-view/test-syntax.md) 文件，检查代码块内的 Markdown 语法是否正常高亮显示。

详见 [扩展说明文档](../../.vscode/extensions/markdown-sox-class-view/README.md)。

## 样式示例

```scss
.md-h1 { font-size: 36px; }
.md-p { line-height: 1.6; }
.md-validity-tag {
  color: #9286ab;
  border: 1px solid currentColor;
  border-radius: 4px;
}
.md-alert {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 12px;
  margin: 12px 0;
}
.md-alert-title {
  font-weight: 600;
  margin-bottom: 8px;
}
```

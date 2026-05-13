import {} from 'marked';

// 扩展 Tokens 命名空间，添加自定义 token 类型
declare module 'marked' {
  namespace Tokens {
    interface CodeCustomGeneric {
      type: string;
      raw: string;
      text: string;
    }

    interface ValidityTag {
      type: 'validity-tag';
      raw: string;
      year: string;
      month: string;
    }

    interface SoxClassView {
      type: 'sox-class-view';
      raw: string;
      className: string;
      content: string;
    }

    interface Alert {
      type: 'alert';
      raw: string;
      title: string;
      body: string;
      variant?: string;
    }
  }
}

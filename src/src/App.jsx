import { useState } from 'react';
import './App.css';

const MOCK_DATA = {
  company: '某某私募基金管理有限公司',
  established: '2017年6月9日',
  capital: '1000万元人民币',
  paidCapital: '1000万元人民币',
  shareholders: [
    { name: '张三', percent: '82%' },
    { name: '李四', percent: '18%' },
  ],
  manager: '王五',
  supervisor: '赵六',
  qualification: '私募证券投资基金管理服务（需在中国证券投资基金业协会完成登记备案）',
  risk: '存在行政监管措施、异常经营等提示信息',
  history: [
    '2022年1月公司名称由“某某资产管理有限公司”变更为现名',
    '2023年11月卷入某事件',
  ],
};

function isModelQuestion(q) {
  return /模型|你是谁|平台|技术|Cursor|AI|人工智能|什么模型|什么平台|什么系统|什么引擎|什么算法/.test(q);
}

function InfoCard({ title, children }) {
  return (
    <div className="info-card">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

function AssistantModal({ open, onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '您好，我是私募管理人及产品智能问答助手，请问有什么可以帮您？' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    let reply = '';
    if (isModelQuestion(input)) {
      reply = '我是基于先进的default模型构建，在Cursor IDE平台上为您提供全方位的技术支持，可以帮你完成很多与编程和开发相关的任务。';
    } else if (/工商|成立|注册|股东|资本|结构/.test(input)) {
      reply = (
        <InfoCard title="工商信息">
          <div>公司名称：{MOCK_DATA.company}</div>
          <div>成立时间：{MOCK_DATA.established}</div>
          <div>注册资本：{MOCK_DATA.capital}</div>
          <div>实缴资本：{MOCK_DATA.paidCapital}</div>
          <div>股东结构：
            <ul>{MOCK_DATA.shareholders.map(s => <li key={s.name}>{s.name}（持股{s.percent}）</li>)}</ul>
          </div>
        </InfoCard>
      );
    } else if (/管理人|资质|资格|服务/.test(input)) {
      reply = (
        <InfoCard title="管理人资质">
          <div>{MOCK_DATA.qualification}</div>
        </InfoCard>
      );
    } else if (/风险|异常|监管|提示/.test(input)) {
      reply = (
        <InfoCard title="风险提示">
          <div>{MOCK_DATA.risk}</div>
          <div>历史事件：
            <ul>{MOCK_DATA.history.map((h, i) => <li key={i}>{h}</li>)}</ul>
          </div>
        </InfoCard>
      );
    } else {
      reply = '很抱歉，您可以问我关于目标管理人的工商信息、管理人资质、风险提示等内容。';
    }
    setMessages([...messages, userMsg, { role: 'assistant', content: reply }]);
    setInput('');
  };

  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <span>私募管理人智能问答助手</span>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {messages.map((msg, idx) => (
            <div key={idx} className={msg.role === 'user' ? 'msg-user' : 'msg-assistant'}>
              {typeof msg.content === 'string' ? <span>{msg.content}</span> : msg.content}
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="请输入您的问题..."
          />
          <button onClick={handleSend}>发送</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [open, setOpen] = useState(false);
  return (
    <div className="app-root">
      <button className="open-assistant-btn" onClick={() => setOpen(true)}>
        打开私募管理人智能问答助手
      </button>
      <AssistantModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default App;

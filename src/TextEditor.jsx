import { useRef, useState } from 'react';
import './TextEditor.css';

const TextEditor = () => {
  const [text, setText] = useState('');
  const textAreaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  const lines = text.split('\n');

  const handleScroll = () => {
    lineNumbersRef.current.scrollTop = textAreaRef.current.scrollTop;
  };

  const handleJump = () => {
    const lineNum = parseInt(document.getElementById('lineInput').value);
    if (isNaN(lineNum) || lineNum < 1 || lineNum > lines.length) {
      alert('Invalid line number');
      return;
    }

    const linesBefore = lines.slice(0, lineNum - 1);
    const charPos = linesBefore.reduce((acc, cur) => acc + cur.length + 1, 0);
    textAreaRef.current.focus();
    textAreaRef.current.setSelectionRange(charPos, charPos);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📝 Text Editor with Line Numbers & Jump</h2>
      <div className="editor-container">
        <div className="line-numbers" ref={lineNumbersRef}>
          {lines.map((_, idx) => (
            <div key={idx} className="line-number">{idx + 1}</div>
          ))}
        </div>
        <textarea
          ref={textAreaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onScroll={handleScroll}
          className="text-area"
          placeholder="Start typing..."
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          type="number"
          id="lineInput"
          placeholder="Jump to line"
          style={{ width: '120px' }}
        />
        <button onClick={handleJump} style={{ marginLeft: '10px' }}>
          Jump
        </button>
      </div>
    </div>
  );
};

export default TextEditor;

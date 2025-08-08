<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cloudflare 加速面板</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

  :root {
    --bg-dark: #0d0d0d;
    --bg-light: #f9f9f9;
    --text-dark: #111;
    --text-light: #f5f5f5;
    --accent: #4da3ff;
    --card-bg-dark: rgba(255,255,255,0.04);
    --card-bg-light: rgba(255,255,255,0.9);
    --border-dark: rgba(255,255,255,0.08);
    --border-light: #e5e5e5;
  }

  body {
    font-family: 'Inter', sans-serif;
    background: var(--bg-dark);
    color: var(--text-light);
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    transition: background 0.4s ease, color 0.4s ease;
  }
  body.light-mode {
    background: var(--bg-light);
    color: var(--text-dark);
  }

  .container {
    width: 100%;
    max-width: 760px;
    background: var(--card-bg-dark);
    backdrop-filter: blur(20px);
    border-radius: 1rem;
    padding: 2.5rem;
    border: 1px solid var(--border-dark);
    box-shadow: 0 20px 50px rgba(0,0,0,0.4);
    transition: all 0.4s ease;
  }
  body.light-mode .container {
    background: var(--card-bg-light);
    border: 1px solid var(--border-light);
    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  }

  h1 {
    font-size: 2.4rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 2rem;
    letter-spacing: -0.5px;
  }

  .section-box {
    background: rgba(255,255,255,0.03);
    padding: 1.8rem;
    border-radius: 0.8rem;
    border: 1px solid rgba(255,255,255,0.06);
    margin-bottom: 2rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  body.light-mode .section-box {
    background: #fff;
    border: 1px solid #eee;
  }
  .section-box:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  }

  label {
    font-weight: 600;
    font-size: 0.95rem;
    display: block;
    margin-bottom: 0.5rem;
  }

  input, select, button {
    width: 100%;
    padding: 0.9rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.05);
    color: inherit;
    font-size: 1rem;
    transition: all 0.3s ease;
    outline: none;
  }
  body.light-mode input,
  body.light-mode select {
    background: #fafafa;
    border: 1px solid #ddd;
    color: var(--text-dark);
  }
  input:focus, select:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 2px rgba(77,163,255,0.3);
  }

  button {
    background: var(--accent);
    border: none;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  button:hover {
    background: #368ae6;
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(77,163,255,0.4);
  }

  .result-box {
    background: rgba(255,255,255,0.05);
    padding: 1rem;
    border-radius: 0.5rem;
    word-break: break-all;
    margin-top: 1rem;
    font-size: 0.95rem;
    border: 1px solid rgba(255,255,255,0.08);
  }
  body.light-mode .result-box {
    background: #f5f5f5;
    border: 1px solid #ddd;
  }

  .toggle-mode {
    display: inline-block;
    cursor: pointer;
    font-size: 0.9rem;
    margin-top: -1rem;
    margin-bottom: 1.5rem;
    text-align: right;
    width: 100%;
    color: var(--accent);
  }
</style>
</head>
<body>
<div class="container">
  <div class="toggle-mode" onclick="document.body.classList.toggle('light-mode')">🌙 切换模式</div>
  <h1>⚡ Cloudflare 加速面板</h1>

  <div class="section-box">
    <label for="target">目标网址</label>
    <input type="text" id="target" placeholder="例如：https://example.com">
  </div>

  <div class="section-box">
    <label for="speed">加速等级</label>
    <select id="speed">
      <option value="1">普通</option>
      <option value="2">快速</option>
      <option value="3">极速</option>
    </select>
  </div>

  <div class="section-box">
    <button onclick="startAccelerate()">🚀 开始加速</button>
    <div class="result-box" id="result">等待输入...</div>
  </div>
</div>

<script>
  function startAccelerate(){
    const url = document.getElementById('target').value.trim();
    const level = document.getElementById('speed').value;
    if(!url){
      document.getElementById('result').textContent = '❌ 请输入网址';
      return;
    }
    document.getElementById('result').textContent = `正在以等级 ${level} 加速 ${url} ...`;
    // 模拟处理逻辑
    setTimeout(()=>{
      document.getElementById('result').textContent = `✅ 加速完成：${url}`;
    },1500);
  }
</script>
</body>
</html>

'use strict'

// USING REGEX
const isUnique1 = str => !/(.).*\1/.test(str)

// |---~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---|

// O(N^2) TIME -- O(1) SPACE
function isUnique2(str) {
  const strLength = str.length

  for (let i = 0; i < strLength; i++) {
    for (let x = i + 1; x < strLength; x++) {
      if (str[i] === str[x]) return false
    }
  }

  return true
}

// |---~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---|

// O(N) TIME -- O(N) SPACE
function isUnique3(str) {
  const letterSet = new Set()

  for (const letter of str) {
    if (letterSet.has(letter)) return false
    letterSet.add(letter)
  }

  return true
}

const funcs = {1: isUnique1, 2: isUnique2, 3: isUnique3}

// <div className="code">
//   <span className="InlineComment">//&nbsp;USING&nbsp;REGEX</span><br />
//   const&nbsp;isUnique1&nbsp;=&nbsp;str&nbsp;=&gt;&nbsp;!/(.).*\1/.test(str)<br />
//   <br />
//   <span className="InlineComment">//&nbsp;|---~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---|</span><br />
//   <br />
//   <span className="InlineComment">//&nbsp;O(N^2)&nbsp;TIME&nbsp;--&nbsp;O(1)&nbsp;SPACE</span><br />
//   function&nbsp;isUnique2(str)&nbsp;&#121;<br />
//   &nbsp;&nbsp;const&nbsp;strLength&nbsp;=&nbsp;str.length<br />
//   <br />
//   &nbsp;&nbsp;<span className="Statement">for</span>&nbsp;(let&nbsp;i&nbsp;=&nbsp;0;&nbsp;i&nbsp;&lt;&nbsp;strLength;&nbsp;i++)&nbsp;&#121;<br />
//   &nbsp;&nbsp;&nbsp;&nbsp;<span className="Statement">for</span>&nbsp;(let&nbsp;x&nbsp;=&nbsp;i&nbsp;+&nbsp;1;&nbsp;x&nbsp;&lt;&nbsp;strLength;&nbsp;x++)&nbsp;&#121;<br />
//   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="Statement">if</span>&nbsp;(str[i]&nbsp;===&nbsp;str[x])&nbsp;<span className="Statement">return</span>&nbsp;<span className="Keyword">false</span><br />
//   &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
//   &nbsp;&nbsp;&#125;<br />
//   <br />
//   &nbsp;&nbsp;<span className="Statement">return</span>&nbsp;<span className="Keyword">true</span><br />
//   &#125;<br />
//   <br />
//   <span className="InlineComment">//&nbsp;|---~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---|</span><br />
//   <br />
//   <span className="InlineComment">//&nbsp;O(N)&nbsp;TIME&nbsp;--&nbsp;O(N)&nbsp;SPACE</span><br />
//   function&nbsp;isUnique3(str)&nbsp;&#121;<br />
//   &nbsp;&nbsp;const&nbsp;letterSet&nbsp;=&nbsp;<span className="Keyword">new</span>&nbsp;Set()<br />
//   <br />
//   &nbsp;&nbsp;<span className="Statement">for</span>&nbsp;(const&nbsp;letter&nbsp;of&nbsp;str)&nbsp;&#121;<br />
//   &nbsp;&nbsp;&nbsp;&nbsp;<span className="Statement">if</span>&nbsp;(letterSet.has(letter))&nbsp;<span className="Statement">return</span>&nbsp;<span className="Keyword">false</span><br />
//   &nbsp;&nbsp;&nbsp;&nbsp;letterSet.add(letter)<br />
//   &nbsp;&nbsp;&#125;<br />
//   <br />
//   &nbsp;&nbsp;<span className="Statement">return</span>&nbsp;<span className="Keyword">true</span><br />
//   &#125;
// </div>

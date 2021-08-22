import React from 'react';

export default function Component1() {
  return (
    <Spring
    from={{ opacity:0, marginTop: -500 }}
    to={{ opacity:1, marginTop: 0 }}
    >
    {props => (
      <div style={props}>
        <div style={c1Style}>
          <h1>Component 1 test</h1>
          <p>Test 1 </p>
      </div>
      </div>
    )}
    </Spring>
  )
}

const c1Style = {
  background: 'white'
}

import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function emailChange({target}) {
    setEmail(target.value);
  }

  function passwordChange({target}) {
    setPassword(target.value);
  }

  return (
    <div>
      <label htmlFor="email">
        <input type="text" onChange={ emailChange } id="email" />
      </label>
      <label htmlFor="password">
        <input type="password" onChange={ passwordChange } id="password" />
      </label>
    </div>
  )
}

export default LoginForm;
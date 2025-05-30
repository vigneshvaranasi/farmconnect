// components/InputBox.jsx
import React from 'react';

const InputBox = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = true,
  pattern,
  title,
  className = '',
  ...props 
}) => {
  return (
    <div className={className}>
      <label className='block text-lg font-semibold text-gray-900 mb-2'>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
        title={title}
        className='w-full px-4 py-3 border-l-4 border-l-green-800 outline-none bg-gray-100 text-gray-800 focus:ring-1 focus:ring-green-800 transition-all'
        style={{ borderLeftColor: 'black' }}
        {...props}
      />
    </div>
  );
};

export default InputBox;
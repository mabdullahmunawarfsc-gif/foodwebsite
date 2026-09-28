export default function Input({
  label,
  error,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-charcoal">
          {label} {required && <span className="text-brand-500">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input-field ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

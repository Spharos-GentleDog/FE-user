import React, { FC } from 'react';

export interface CheckboxProps {
  label?: string;
  subLabel?: string;
  className?: string;
  sizeClassName?: string;
  labelClassName?: string;
  name: string;
  isChecked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

/**
 * 체크박스
 * @param label 제목
 * @param name id와 name은 같게 설정
 * @param onChange
 * @returns
 */
const Checkbox: FC<CheckboxProps> = ({
  subLabel = '',
  label = '',
  name,
  className = '',
  sizeClassName = 'w-6 h-6',
  labelClassName = '',
  isChecked,
  defaultChecked,
  onChange,
}) => {
  return (
    <div className={`flex text-sm sm:text-base ${className}`}>
      <input
        id={name}
        name={name}
        type="checkbox"
        className={`focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-200 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 ${sizeClassName}`}
        checked={isChecked}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      {label && (
        <label
          htmlFor={name}
          className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center"
        >
          <span
            className={`text-slate-900 dark:text-slate-100 ${labelClassName} ${
              !!subLabel ? '-mt-0.5' : ''
            }`}
          >
            {label}
          </span>
          {subLabel && (
            <p className="mt-0.5 text-slate-500 dark:text-slate-400 text-sm font-light">
              {subLabel}
            </p>
          )}
        </label>
      )}
    </div>
  );
};

export default Checkbox;

import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import styles from "./FilterSelect.module.scss";
import clsx from "clsx";

interface FilterSelectProps {
  placeholder?: string;
  value: string | string[];
  options: string[];
  onChange: (value: string | string[]) => void;
  onClear: () => void;
  variant?: 'normal' | 'small';
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  placeholder,
  value,
  options,
  onChange,
  variant = 'normal'
}) => {
  const handleChange = (event: SelectChangeEvent<string | string[]>) => {
    onChange(event.target.value);
  };

  const isSmall = variant === 'small';
  const hasValue = (value as string[]).length > 0;

  return (
    <FormControl 
      size={isSmall ? "small" : "medium"}
      className={clsx(styles.formControl, {
        [styles.small]: isSmall,
        [styles.normal]: !isSmall,
      })}
    >
      <Select
        value={value}
        onChange={handleChange}
        displayEmpty
        input={<OutlinedInput />}
        className={styles.select}
        classes={{
          select: styles.input
        }}
        renderValue={(selected) => {
          if (!hasValue) {
            return <span className={styles.placeholder}>{placeholder}</span>;
          }
          return selected as string;
        }}
      >
        {options.map((option) => (
          <MenuItem 
            key={option} 
            value={option}
            className={styles.menuItem}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterSelect; 
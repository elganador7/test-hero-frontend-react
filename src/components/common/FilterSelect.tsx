import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Box,
  IconButton,
  SelectChangeEvent,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface FilterSelectProps {
  label: string;
  value: string | string[];
  options: string[];
  multiple?: boolean;
  onChange: (value: string | string[]) => void;
  onClear: () => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  value,
  options,
  multiple = false,
  onChange,
  onClear,
}) => {
  const handleChange = (event: SelectChangeEvent<string | string[]>) => {
    onChange(event.target.value);
  };

  const handleChipDelete = (chipToDelete: string) => {
    if (Array.isArray(value)) {
      onChange(value.filter((item) => item !== chipToDelete));
    }
  };

  const handleClearClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClear();
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        label={label}
        multiple={multiple}
        input={<OutlinedInput label={label} />}
        renderValue={multiple ? (selected: unknown) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {(selected as string[]).map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={() => handleChipDelete(value)}
              />
            ))}
          </Box>
        ) : undefined}
        endAdornment={
          (multiple ? (value as string[]).length > 0 : value) ? (
            <IconButton
              size="small"
              sx={{ mr: 4 }}
              onClick={handleClearClick}
            >
              <ClearIcon />
            </IconButton>
          ) : null
        }
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterSelect; 
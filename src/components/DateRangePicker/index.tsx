import * as React from "react";
import { Dayjs } from "dayjs";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ControllerRenderProps } from "react-hook-form";

const StyledDatePicker = styled(DatePicker)(() => ({
  "& .MuiInputBase-root .MuiInputBase-input": {
    padding: 8.5,
  },
}));

const DateRangePicker: React.FC<ControllerRenderProps> = ({
  onChange,
  value,
}) => {
  const [start, end] = value ?? [];

  const handleChange = (
    type: "start" | "end",
    newValue: Dayjs | null | unknown
  ) => {
    const newRangeValue = [start, end];
    newRangeValue[type === "start" ? 0 : 1] = newValue as Dayjs | null;
    if (
      newRangeValue[0] &&
      newRangeValue[1] &&
      newRangeValue[0].isAfter(newRangeValue[1])
    ) {
      console.warn("start date should before end date.");
    }
    onChange(newRangeValue);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StyledDatePicker
          value={start}
          onChange={(newValue) => handleChange("start", newValue)}
        />
        {"-"}
        <StyledDatePicker
          value={end}
          onChange={(newValue) => handleChange("end", newValue)}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DateRangePicker;

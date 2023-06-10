import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Button,
  SxProps,
  Box,
} from "@mui/material";
import DateRangePicker from "../../../../components/DateRangePicker";
import { Controller, useForm } from "react-hook-form";
import { Dayjs } from "dayjs";
import { SortType } from "../../../../types";

export type FormData = {
  date_utc?: [Dayjs | null, Dayjs | null];
  launchStatus?: string;
  search?: string;
  sort?: SortType;
};

const SearchForm: React.FC<{
  sx?: SxProps;
  onOk?: (values: FormData) => void;
  onCancel?: () => void;
}> = ({ onOk, onCancel, sx = {} }) => {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      // date_utc: [dayjs().subtract(1, 'month'), dayjs()],
      launchStatus: "ALL",
      sort: "desc",
    },
  });

  const onSubmit = handleSubmit((values) => {
    onOk && onOk(values);
  });

  const handleCancel = () => {
    onCancel && onCancel();
  };

  return (
    <Box sx={{ ...sx }} style={{ width: "100%" }}>
      <form onSubmit={onSubmit} style={{ width: "100%" }}>
        <Grid
          container
          spacing={{ xs: 1, md: 1 }}
          columns={{ xs: 4, sm: 4, md: 24 }}
        >
          <Grid item xs={4} sm={4} md={3}>
            <Controller
              name="search"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth={true}>
                  <FormLabel sx={{ fontSize: 12 }}>SEARCH</FormLabel>
                  <TextField size="small" {...field} />
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={8}>
            <Controller
              name="date_utc"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth={true}>
                  <FormLabel sx={{ fontSize: 12 }}>DATE</FormLabel>
                  <DateRangePicker {...field} />
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={6}>
            <Controller
              name="launchStatus"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth={true}>
                  <FormLabel sx={{ fontSize: 12 }}>LAUNCH STATUS</FormLabel>
                  <RadioGroup row {...field}>
                    <FormControlLabel
                      value={"ALL"}
                      control={<Radio size="small" />}
                      label="ALL"
                    />
                    <FormControlLabel
                      value={"SUCCESS"}
                      control={<Radio size="small" />}
                      label="SUCCESS"
                    />
                    <FormControlLabel
                      value={"FAIL"}
                      control={<Radio size="small" />}
                      label="FAIL"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <Controller
              name="sort"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth={true}>
                  <FormLabel sx={{ fontSize: 12 }}>
                    ORDER BY LAUNCH DATE{" "}
                  </FormLabel>
                  <RadioGroup row {...field}>
                    <FormControlLabel
                      value={"desc"}
                      control={<Radio size="small" />}
                      label="DESC"
                    />
                    <FormControlLabel
                      value={"asc"}
                      control={<Radio size="small" />}
                      label="ASC"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />
          </Grid>
          <Grid
            textAlign={"right"}
            item
            xs={4}
            sm={4}
            md={2}
            alignSelf={"center"}
          >
            <Button autoFocus variant="outlined" type="submit">
              Submit
            </Button>
            <Button
              onClick={handleCancel}
              sx={{
                display: {
                  sx: "inline-block",
                  md: "none",
                },
                marginLeft: "10px",
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default SearchForm;

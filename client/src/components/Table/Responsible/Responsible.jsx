import { Select, MenuItem, Chip } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import { useState, useCallback, useEffect } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Responsible = ({ workers, onChange, value }) => {

  const [workerName, setWorkerName] = useState('');
  const [worker_ID, setWorker_ID] = useState('');

  useEffect(() => {
    const selectedWorker = workers.find(worker => worker._id === value);
    if (selectedWorker) {
      setWorkerName(selectedWorker.name);
      setWorker_ID(selectedWorker._id);
    } else {
      setWorkerName('');
      setWorker_ID('');
    }
  }, [value, workers]);

  const handleChange = useCallback((event) => {
    onChange(event);
    const {
      target: { value },
    } = event;
    const selectedWorker = workers.find(worker => worker._id === value);
    setWorkerName(selectedWorker.name);
    setWorker_ID(selectedWorker._id);
  }, [workers, onChange]);

  return (
    <>
      <Select
        labelId="chip-label"
        id="chip"
        value={worker_ID}
        name='responsibleWorkers'
        onChange={handleChange}
        input={<OutlinedInput id="select-chip" label={"Responsible Worker"} />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            <Chip key={selected} label={workerName} />
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {workers.map((worker) => (
          <MenuItem
            key={worker._id}
            value={worker._id}
          >
            {worker.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

export default Responsible;

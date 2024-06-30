import { GlobalStyles } from '@mui/material';
import { PinnedPosition } from '@mui/x-data-grid/components/cell/GridCell';

const globalStyles = (
  <GlobalStyles
    styles={{
      '::-webkit-scrollbar': {
        right: '0px',
        width: '0px',
      }
    }}
  />
);

export default globalStyles;
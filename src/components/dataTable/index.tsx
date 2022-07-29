import React from 'react';
import DataTable from 'react-data-table-component';
import colors from '../../scss/badcss.module.scss';

//TODO move this shit to separate files

const customStyles = {
  table: {
    style: {
      background: 'transparent',
    },
  },
  head: {
    style: {
      color: '#ff1',
      zIndex: 0,
    },
  },
  headRow: {
    style: {
      background: 'transparent',
    },
  },
  expanderRow: {
    style: {
      background: colors.primary,
      width: '300%',
    },
  },
  headCells: {
    style: {
      paddingTop: '8px', // override the cell padding for head cells
      paddingBottom: '8px',
      fontSize: 15,
      fontWeight: 'bolder',
      background: 'transparent',
      color: colors.light,

      '&:hover': {
        color: colors.light,
      },
    },
    activeSortStyle: {
      color: colors.primary,
    },
    inactiveSortStyle: {
      color: colors.primary,
      '&:hover': {
        color: colors.light,
      },
    },
  },
  rows: {
    style: {
      background: 'transparent',
      color: 'white',
      '&:hover': {
        background: '#ff7f50',
      },
      '&:not(:last-of-type)': {
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: '#333',
      },
    },
    selectedHighlightStyle: {
      // use nth-of-type(n) to override other nth selectors
      '&:nth-of-type(n)': {
        color: '#ee1',
        borderBottomColor: colors.primary,
      },
    },
    highlightOnHoverStyle: {
      color: colors.light,
    },
  },
  noData: {
    style: {
      color: 'white',
      backgroundColor: 'transparent',
    },
  },
  pagination: {
    style: {
      background: 'transparent',
      color: 'white',
    },
    pageButtonsStyle: {
      color: colors.light,
      fill: colors.light,
      '&:disabled': {
        cursor: 'unset',
        color: '#333',
        fill: '#333',
      },
    },
  },
};

const customLightStyles = {
  table: {
    style: {
      background: 'transparent',
    },
  },
  head: {
    style: {
      color: '#ff1',
      zIndex: 0,
    },
  },
  headRow: {
    style: {
      background: 'transparent',
    },
  },
  expanderRow: {
    style: {
      background: colors.light_primary,
      width: '300%',
    },
  },
  headCells: {
    style: {
      paddingTop: '8px', // override the cell padding for head cells
      paddingBottom: '8px',
      fontSize: 15,
      fontWeight: 'bolder',
      background: 'transparent',
      color: colors.light,

      '&:hover': {
        color: colors.light_light,
      },
    },
    activeSortStyle: {
      color: '#3c3ce5',
    },
    inactiveSortStyle: {
      color: colors.light_primary,
      '&:hover': {
        color: colors.primary,
      },
    },
  },
  rows: {
    style: {
      background: colors.light_primary_dark,
      color: colors.light_dark,
      '&:hover': {
        background: '#ff7f50',
      },
      '&:not(:last-of-type)': {
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: '#333',
      },
    },
    selectedHighlightStyle: {
      // use nth-of-type(n) to override other nth selectors
      '&:nth-of-type(n)': {
        color: '#ee1',
        borderBottomColor: colors.light_primary,
      },
    },
    highlightOnHoverStyle: {
      color: colors.light_light,
    },
  },
  noData: {
    style: {
      color: colors.light_light,
      backgroundColor: 'transparent',
    },
  },
  pagination: {
    style: {
      background: colors.light_primary_dark,
      color: 'white',
    },
    pageButtonsStyle: {
      color: colors.light_light,
      fill: colors.light_light,
      '&:disabled': {
        cursor: 'unset',
        color: '#333',
        fill: '#333',
      },
    },
  },
};

type props = {
  openRecordings: any;
  columnDefs: any;
  rowData: any;
  theme?: any;
  expandableRows: boolean;
};

export default function ReactDataTable({
  columnDefs,
  rowData,
  expandableRows,
  openRecordings,
  theme,
}: props) {
  if (rowData !== null) {
    return (
      <DataTable
        columns={columnDefs}
        customStyles={theme !== 'Light' ? customStyles : customLightStyles}
        data={rowData}
        fixedHeader
        pagination
        pointerOnHover
        onRowClicked={(row) => (expandableRows ? openRecordings(row) : console.log('call clicked'))}
      />
    );
  } else {
    return null;
  }
}

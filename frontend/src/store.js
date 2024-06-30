import { create } from "zustand";

const useStore = create((set) => ({
  selectedDb: null,
  selectedTable: null,
  tabsTableRows: [],
  databasesMetaData: [],
  setDatabasesMetaData: ({ databaseNames, tableNames }) => {
    set(() => {
      return {
        databasesMetaData:{
            databaseNames,
            tableNames
        },
      };
    });
  },
  setSelectedDb: ({ _selectedDb }) =>
    set(() => {
      return {
        selectedDb: _selectedDb,
        openedTables: [],
      };
    }),
  setSelectedTable: ({ _selectedTable, wasTableOpenedInNewTab, tableRows }) =>
    set((state) => {
      return {
        selectedTable: _selectedTable,
        tabsTableRows: wasTableOpenedInNewTab
          ? state.tabsTableRows.push({ tableName: _selectedTable, tableRows })
          : state.tabsTableRows,
      };
    }),
}));

export default useStore;

export const CategoriesColumn = [
  {
    title: "ID",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    // sorter: (a: any, b: any) => a.name.localCompare(b.name),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Position",
    dataIndex: "position",
    key: "position",
    sorter: (a: any, b: any) => a.position - b.position,
  },
  {
    title: "Displayed",
    dataIndex: "displayed",
    key: "displayed",
  },
  {
    title: "Action",
    key: "action",
    sorter: true,
  },
];

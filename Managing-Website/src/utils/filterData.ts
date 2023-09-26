// filterData.js
export function filterData(data: any, searchText: any) {
  return data.filter((item: any) => {
    return (
      item.workOrder.toLowerCase().includes(searchText.toLowerCase()) ||
      item.certNo.toLowerCase().includes(searchText.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchText.toLowerCase()) ||
      item.dateOutOfLab.includes(searchText) ||
      item.worker.toLowerCase().includes(searchText.toLowerCase()) ||
      item.approver.toLowerCase().includes(searchText.toLowerCase()) ||
      item.status.toLowerCase().includes(searchText.toLowerCase())
    );
  });
}

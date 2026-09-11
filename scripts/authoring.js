/** Read field-per-row tables; repeated start fields delimit slides or articles. */
export default function readFieldRecords(rows, startField) {
  const fields = rows.map((row) => {
    const cells = [...row.children];
    if (cells.length !== 2) return null;
    const key = cells[0].textContent.trim().toLowerCase().replace(/\s+/g, '-');
    return /^[a-z][a-z-]*$/.test(key) ? { key, cell: cells[1] } : null;
  });
  if (fields.some((field) => !field) || !fields.some(({ key }) => key === startField)) {
    return null;
  }

  const header = { meta: {}, cells: {} };
  const items = [];
  let record = header;
  fields.forEach(({ key, cell }) => {
    if (key === startField) {
      record = { meta: {}, cells: {} };
      items.push(record);
    }
    record.meta[key] = cell.textContent.trim();
    record.cells[key] = cell;
  });
  return { header, items };
}

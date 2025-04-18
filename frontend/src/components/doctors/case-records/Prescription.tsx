import ICaseRecord from "../../../interfaces/CaseRecord";
import { Table } from "../../../ui/Table";

function Prescription({
  prescription,
}: {
  prescription: ICaseRecord["prescription"];
}) {
  return (
    <Table>
      <Table.Header>
        <Table.Columns headers={["Name", "Type", "Dosage"]} />
      </Table.Header>
      <Table.Body
        render={() =>
          prescription.map((item) => (
            <Table.Row key={item._id}>
              <td className="dark:text-white border border-gray-300 text-sm">
                {item.name}
              </td>
              <td className="dark:text-white border border-gray-300 text-sm">
                {item.type}
              </td>
              <td className="dark:text-white border border-gray-300 text-sm">
                {item.dosage}
              </td>
            </Table.Row>
          ))
        }
      />
    </Table>
  );
}

export default Prescription;

import ICaseRecord from "../../interfaces/CaseRecord";
import { Table } from "../current-shift/Table";

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
              <tr>
                <td className="border border-gray-300 text-sm">{item.name}</td>
                <td className="border border-gray-300 text-sm">{item.type}</td>
                <td className="border border-gray-300 text-sm">
                  {item.dosage}
                </td>
              </tr>
            </Table.Row>
          ))
        }
      />
    </Table>
  );
}

export default Prescription;

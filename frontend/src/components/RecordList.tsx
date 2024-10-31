import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Define the shape of a record
interface Record {
    _id: string;
    name: string;
    position: string;
    level: string;
}

// Define the props for the Record component
interface RecordProps {
    record: Record;
    deleteRecord: () => void;
}

// Record component
const Record: React.FC<RecordProps> = (props) => (
    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
            {props.record.name}
        </td>
        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
            {props.record.position}
        </td>
        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
            {props.record.level}
        </td>
        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
            <div className="flex gap-2">
                <Link
                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
                    to={`/edit/${props.record._id}`}
                >
                    Edit
                </Link>
                <button
                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
                    type="button"
                    onClick={props.deleteRecord}
                >
                    Delete
                </button>
            </div>
        </td>
    </tr>
);

// Main RecordList component
export default function RecordList() {
    const [records, setRecords] = useState<Record[]>([]);

    // Fetch records from the database
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5050/records/`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                console.error(message);
                return;
            }
            const recordsData: Record[] = await response.json();
            setRecords(recordsData);
        }
        getRecords();
    }, []);

    // Delete a record
    async function deleteRecord(id: string) {
        await fetch(`http://localhost:5050/records/${id}`, {
            method: "DELETE",
        });
        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }

    // Map out the records in the table
    function recordList() {
        return records.map((record) => (
            <Record
                record={record}
                deleteRecord={() => deleteRecord(record._id)}
                key={record._id}
            />
        ));
    }

    // Render the table with the records of individuals
    return (
        <>
            <h3 className="text-lg font-semibold p-4">Employee Records</h3>
            <div className="border rounded-lg overflow-hidden">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                Name
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                Position
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                Level
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                Action
                            </th>
                        </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                        {recordList()}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
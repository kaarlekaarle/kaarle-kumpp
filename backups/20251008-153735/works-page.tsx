import { getFields, getClients } from "@/lib/data";
import WorksClient from "./WorksClient";

export default async function Works() {
  const [fields, clients] = await Promise.all([
    getFields(),
    getClients(),
  ]);

  return <WorksClient fields={fields} clients={clients} />;
}
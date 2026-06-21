import { AdminEditor } from "@/components/app/admin/admin-editor";

export const metadata = { title: "Contenido · Admin" };

export default function AdminContenidoPage() {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Contenido del curso</h2>
      <AdminEditor />
    </div>
  );
}

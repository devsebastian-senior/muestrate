import { CourseSettings, CourseNews } from "@/components/app/admin/course-settings";
import { getCourseForAdmin } from "@/lib/data";

export const metadata = { title: "Ajustes · Admin" };

export default async function AdminAjustesPage() {
  const course = await getCourseForAdmin();
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Ajustes del curso</h2>
      {course ? (
        <div className="space-y-5">
          <CourseNews course={course} />
          <CourseSettings course={course} />
        </div>
      ) : (
        <p className="text-sm text-[var(--color-muted)]">No hay curso para editar.</p>
      )}
    </div>
  );
}

import { redirect } from "next/navigation";

// Sin auto-registro: la cuenta se crea al pagar. Mandamos a la compra.
export default function RegistroRedirect() {
  redirect("/comprar");
}

import FormationsAdminPage from "./formations";

export default async function Page({ searchParams }) {
  const sp = await searchParams;
  return <FormationsAdminPage formateurId={sp.id} />;
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "@/component/LogoutButton";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>You must be logged in to access this page.</p>;
  }

  return (
    <div>
      Welcome, {session.user?.name}!
      <LogoutButton />
    </div>
  );
}

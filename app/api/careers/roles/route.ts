import { validRoles } from "../../../careers-data";
export const dynamic = "force-static";
export function GET() {
  return Response.json({ roles: [...validRoles] });
}
